// api/quantum-ai.js

export const config = {
    runtime: 'edge', // تشغيل على الـ Edge لسرعة استجابة فائقة وتفادي الـ Timeout وضمان تدفق البث
};

export default async function handler(req) {
    // 1️⃣ تعريف ترويسات CORS الشاملة
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    };

    // 2️⃣ معالجة طلبات Pre-flight OPTIONS
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: corsHeaders
        });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    try {
        // جلب التوكنات بأمان
        const tokenPool = [
            process.env.HF_TOKEN_PRIMARY,
            process.env.HF_TOKEN_SECONDARY
        ].filter(Boolean);

        if (tokenPool.length === 0) {
            return new Response(JSON.stringify({ error: 'No HF_TOKEN configured in Vercel' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const activeToken = tokenPool[Math.floor(Math.random() * tokenPool.length)];
        
        // قراءة البيانات المرسلة من الفرونت-إند (بما فيها معاملات الأداء المضافة)
        const { systemPrompt, userPrompt, temperature, max_tokens, stream } = await req.json();

        const ENDPOINT_TIER1 = "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct";
        const ENDPOINT_TIER2 = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

        // تجهيز النصوص بنظام التوكنات الخاص بـ Qwen/ChatML
        const formattedInputs = `<|im_start|>system\n${systemPrompt}<|im_end|>\n<|im_start|>user\n${userPrompt}<|im_end|>\n<|im_start|>assistant\n`;

        const payload = {
            inputs: formattedInputs,
            parameters: { 
                max_new_tokens: max_tokens || 800, 
                temperature: temperature || 0.2,
                return_full_text: false
            },
            stream: stream === true // تفعيل البث في الطلب الذاهب لـ Hugging Face
        };

        // 3️⃣ محاولة تشغيل Tier 1: Qwen 2.5-72B
        try {
            const r1 = await fetch(ENDPOINT_TIER1, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${activeToken}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(payload)
            });

            if (r1.ok) {
                // إذا طلب الفرونت-إند بثاً وكان السيرفر يدعمه
                if (stream && r1.body) {
                    return new Response(r1.body, {
                        status: 200,
                        headers: {
                            ...corsHeaders,
                            'Content-Type': 'text/event-stream',
                            'Cache-Control': 'no-cache',
                            'Connection': 'keep-alive'
                        }
                    });
                } else {
                    const d1 = await r1.json();
                    const text1 = d1[0]?.generated_text || d1.generated_text || "";
                    return new Response(JSON.stringify({ result: text1 }), {
                        status: 200,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }
            }
        } catch (e) { 
            console.log("Qwen Tier 1 failed or timed out, shifting to Tier 2.");
        }

        // 4️⃣ محاولة تشغيل Tier 2: Mistral Fallback Block
        try {
            const r2 = await fetch(ENDPOINT_TIER2, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${activeToken}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(payload)
            });

            if (r2.ok) {
                if (stream && r2.body) {
                    return new Response(r2.body, {
                        status: 200,
                        headers: {
                            ...corsHeaders,
                            'Content-Type': 'text/event-stream',
                            'Cache-Control': 'no-cache'
                        }
                    });
                } else {
                    const d2 = await r2.json();
                    const text2 = d2[0]?.generated_text || d2.generated_text || "";
                    return new Response(JSON.stringify({ result: text2 }), {
                        status: 200,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }
            }
        } catch (e) { 
            console.log("Mistral Tier 2 failed");
        }

        return new Response(JSON.stringify({ error: "All cloud tiers failed to respond" }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (globalError) {
        return new Response(JSON.stringify({ error: globalError.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
}
