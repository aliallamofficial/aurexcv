// api/quantum-ai.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // جلب التوكينات بأمان من خوادم Vercel (لا تظهر للمستخدم أبداً)
    const tokenPool = [
        process.env.HF_TOKEN_PRIMARY,
        process.env.HF_TOKEN_SECONDARY
    ];

    // اختيار توكن عشوائي أو التدوير بينها
    const activeToken = tokenPool[Math.floor(Math.random() * tokenPool.length)];

    const { sysPrompt, userPrompt } = req.body;

    try {
        // هنا يتم استدعاء خوادم Hugging Face من الخلفية (Server-side)
        const response = await fetch("https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${activeToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: `<|im_start|>system\n${sysPrompt}<|im_end|>\n<|im_start|>user\n${userPrompt}<|im_end|>\n<|im_start|>assistant\n` })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Quantum Engine Error' });
    }
}
