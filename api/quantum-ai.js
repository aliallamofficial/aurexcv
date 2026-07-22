// api/quantum-ai.js
export default async function handler(req, res) {
    if (req.method!== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 1. جلب التوكينات من Vercel بأمان
    const tokenPool = [
        process.env.HF_TOKEN_PRIMARY,
        process.env.HF_TOKEN_SECONDARY
    ].filter(Boolean); // فلترة الفاضي

    if (tokenPool.length === 0) {
        return res.status(500).json({ error: 'No HF_TOKEN configured in Vercel' });
    }

    const activeToken = tokenPool[Math.floor(Math.random() * tokenPool.length)];
    const { systemPrompt, userPrompt } = req.body; // عدلت الاسم عشان يطابق ai.js

    const ENDPOINT_TIER1 = "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct";
    const ENDPOINT_TIER2 = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

    const payload = {
        inputs: `<|im_start|>system\n${systemPrompt}<|im_end|>\n<|im_start|>user\n${userPrompt}<|im_end|>\n<|im_start|>assistant\n`,
        parameters: { max_new_tokens: 800, temperature: 0.4 }
    };

    // 2. Tier 1: Qwen
    try {
        const r1 = await fetch(ENDPOINT_TIER1, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${activeToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (r1.ok) {
            const d1 = await r1.json();
            return res.status(200).json({ result: d1[0]?.generated_text || d1.generated_text }); // مهم جدا
        }
    } catch (e) { console.log("Qwen failed, trying Mistral") }

    // 3. Tier 2: Mistral Fallback
    try {
        const r2 = await fetch(ENDPOINT_TIER2, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${activeToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (r2.ok) {
            const d2 = await r2.json();
            return res.status(200).json({ result: d2[0]?.generated_text || d2.generated_text });
        }
    } catch (e) { console.log("Mistral failed") }

    return res.status(500).json({ error: "All cloud tiers failed" });
}
