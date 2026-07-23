export const config = {
    runtime: 'edge', // تفعيل بيئة Edge Runtime
};

// 1️⃣ مصفوفة المعمارية لـ Hugging Face (موديل Qwen 2.5 72B الأقوى وموديل Llama 3.1 الاحتياطي)
const ARCHITECTURE_MATRIX = {
    "en": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "You are an elite ATS-optimized resume writer and career architect. Transform the user's raw experience and skills into a highly professional, result-oriented, and executive-standard CV summary. Use strong action verbs, focus on quantifiable achievements, and ensure strict compliance with modern corporate recruitment metrics. Return ONLY the enhanced professional text without any conversational filler."
    },
    "ar": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "أنت خبير محترف في صياغة السير الذاتية وأنظمة فحص المتقدمين (ATS). قم بتحويل خبرات ومهارات المستخدم الإدخالية إلى ملخص مهني رفيع المستوى وبمعايير تنفيذية. ركز على استخدام أفعال قوية تدل على الإنجاز، وإبراز النتائج القابلة للقياس، وضمان مطابقة المعايير الشركاتية الحديثة. أرجع النص المحسن فقط دون أي مقدمات أو هوامش حوارية."
    }
};

export default async function handler(req) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    try {
        const { userPrompt, lang = 'en', temperature } = await req.json();
        const routingConfig = ARCHITECTURE_MATRIX[lang] || ARCHITECTURE_MATRIX['en'];
        
        // صياغة النص المدمج لأن الـ Inference API العادي يفضل دمج النظام والمستخدم معاً
        const fullPrompt = `<|system|>\n${routingConfig.systemPrompt}\n<|user|>\n${userPrompt}\n<|assistant|>\n`;

        const API_KEY = process.env.PROVIDER_API_KEY; 
        if (!API_KEY) {
            return new Response(JSON.stringify({ error: 'PROVIDER_API_KEY is missing.' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // --- 🚀 المحرك الأساسي (Qwen 72B) ---
        try {
            const r1 = await fetch(routingConfig.endpoint_primary, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: fullPrompt,
                    parameters: { temperature: temperature || 0.2, max_new_tokens: 1024 }
                })
            });

            if (r1.ok) {
                const data = await r1.json();
                let outputText = data[0]?.generated_text || data.generated_text || "";
                outputText = outputText.replace(fullPrompt, "").trim(); // تنظيف النص من الـ Prompt الأصلي

                return new Response(JSON.stringify({ choices: [{ message: { content: outputText } }] }), {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
            throw new Error(`Primary failed status: ${r1.status}`);

        } catch (error) {
            // --- 🛡️ المحرك الاحتياطي (Llama 8B) ---
            const r2 = await fetch(routingConfig.endpoint_backup, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: fullPrompt,
                    parameters: { temperature: 0.3, max_new_tokens: 1024 }
                })
            });

            if (r2.ok) {
                const data = await r2.json();
                let outputText = data[0]?.generated_text || data.generated_text || "";
                outputText = outputText.replace(fullPrompt, "").trim();

                return new Response(JSON.stringify({ choices: [{ message: { content: outputText } }] }), {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        return new Response(JSON.stringify({ error: "All Hugging Face models failed." }), {
            status: 502,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (globalError) {
        return new Response(JSON.stringify({ error: globalError.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
}
