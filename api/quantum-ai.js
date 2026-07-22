// api/quantum-ai.js

export const config = {
    runtime: 'edge', // تشغيل على الـ Edge لسرعة استجابة فائقة وتفادي الـ Timeout
};

export default async function handler(req) {
    // 1️⃣ تعريف ترويسات CORS الشاملة للسماح لـ GitHub Pages بالاتصال بالسيرفر
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*', // أو يمكنك تخصيصه إلى رابط موقعك بدقة لزيادة الأمان
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Content-Type': 'application/json'
    };

    // 2️⃣ معالجة طلبات الاستكشاف القبلي للمتصفح (Pre-flight OPTIONS Request)
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: corsHeaders
        });
    }

    // التحقق من نوع الطلب POST في بيئة Edge Runtime
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: corsHeaders
        });
    }

    try {
        // جلب التوكينات من Vercel بأمان
        const tokenPool = [
            process.env.HF_TOKEN_PRIMARY,
            process.env.HF_TOKEN_SECONDARY
        ].filter(Boolean);

        if (tokenPool.length === 0) {
            return new Response(JSON.stringify({ error: 'No HF_TOKEN configured in Vercel' }), {
                status: 500,
                headers: corsHeaders
            });
        }

        const activeToken = tokenPool[Math.floor(Math.random() * tokenPool.length)];
        
        // قراءة البيانات المرسلة بأمان
        const { systemPrompt, userPrompt } = await req.json();

        const ENDPOINT_TIER1 = "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct";
        const ENDPOINT_TIER2 = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

        const payload = {
            inputs: `<|im_start|>system\n${systemPrompt}<|im_end|>\n<|im_start|>user\n${userPrompt}<|im_end|>\n<|im_start|>assistant\n`,
            parameters: { max_new_tokens: 800, temperature: 0.4 }
        };

        // 3️⃣ Tier 1: Qwen Execution Block
        try {
            const r1 = await fetch(ENDPOINT_TIER1, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${activeToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (r1.ok) {
                const d1 = await r1.json();
                const text1 = d1[0]?.generated_text || d1.generated_text || "";
                return new Response(JSON.stringify({ result: text1 }), {
                    status: 200,
                    headers: corsHeaders // ✅ تمرير الترويسات الآمنة
                });
            }
        } catch (e) { 
            console.log("Qwen failed, trying Mistral");
        }

        // 4️⃣ Tier 2: Mistral Fallback Block
        try {
            const r2 = await fetch(ENDPOINT_TIER2, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${activeToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (r2.ok) {
                const d2 = await r2.json();
                const text2 = d2[0]?.generated_text || d2.generated_text || "";
                return new Response(JSON.stringify({ result: text2 }), {
                    status: 200,
                    headers: corsHeaders // ✅ تمرير الترويسات الآمنة
                });
            }
        } catch (e) { 
            console.log("Mistral failed");
        }

        return new Response(JSON.stringify({ error: "All cloud tiers failed" }), {
            status: 500,
            headers: corsHeaders
        });

    } catch (globalError) {
        return new Response(JSON.stringify({ error: globalError.message }), {
            status: 500,
            headers: corsHeaders
        });
    }
}
