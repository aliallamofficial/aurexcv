export const config = {
    runtime: 'edge', 
};

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
    },
    "fr": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Vous êtes un rédacteur de CV d'élite expert en optimisation ATS. Transformez les compétences et expériences en un résumé professionnel. Renvoyez UNIQUEMENT le texte optimisé."
    },
    "de": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Sie sind ein erstklassiger Experte für ATS-optimierte Lebensläufe. Geben Sie ausschließlich den optimierten Text zurück."
    },
    "es": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Eres un redactor de currículos de élite experto en optimización ATS. Devuelve SOLO el texto optimizado."
    },
    "pt": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Você é um redator de currículos de elite especialista em otimização ATS. Retorne APENAS o texto otimizado."
    },
    "tr": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Siz, ATS odaklı özgeçmiş yazımı konusunda uzman bir elitsiniz. SADECE optimize edilmiş metni döndürün."
    },
    "ru": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Вы — элитный эксперт по составлению резюме, оптимизированных под системы ATS. Возвращайте ТОЛЬКО оптимизированный текст."
    },
    "zh": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "您是一位精通 ATS 优化的精英简历撰写人。请仅返回优化后的专业文本。"
    },
    "hi": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "आप एक विशिष्ट ATS-अनुकूलित रिज्यूमे लेखक हैं। केवल अनुकूलित पाठ ही वापस करें।"
    },
    "ja": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "あなたはATS最適化のプロのレジュメライターです。最適化されたテキストのみを返してください。"
    },
    "ko": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "당신은 엘리트 ATS 최적화 이력서 작성가입니다. 최적화된 텍스트만 반환하세요."
    },
    "it": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Sei uno scrittore di CV d'élite esperto in ottimizzazione ATS. Restituisci SOLO il testo ottimizzato."
    },
    "nl": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Je bent een elite ATS-geoptimaliseerde cv-schrijver. Geef ALLEEN de geoptimaliseerde tekst terug."
    },
    "pl": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Jesteś elitarnym edytorem życiorysów zoptymalizowanych pod kątem ATS. Zwróć TYLKO zoptymalizowany tekst."
    },
    "sv": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Du är en elit ATS-optimerad CV-skribent. Returnera ENDAST den optimerade texten."
    },
    "da": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Du er en elite ATS-optimeret CV-skribent. Returner KUN den optimerede tekst."
    },
    "no": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Du er en profesjonell ATS-optimalisert CV-skriver. Returner KUN den optimaliserte teksten."
    },
    "fi": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Olet eliitti ATS-optimoitu ansioluettelon kirjoittaja. Palauta VAIN optimoitu teksti."
    },
    "uk": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Ви — елітний експерт із написання резюме, оптимізованих під ATS. Повертайте ТІЛЬКИ оптимізований текст."
    }
};

export default async function handler(req) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    };

    if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers: corsHeaders });
    if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: corsHeaders });

    try {
        const { userPrompt, lang = 'en', temperature } = await req.json();
        const routingConfig = ARCHITECTURE_MATRIX[lang] || ARCHITECTURE_MATRIX['en'];
        const fullPrompt = `<|system|>\n${routingConfig.systemPrompt}\n<|user|>\n${userPrompt}\n<|assistant|>\n`;

        const API_KEY = process.env.PROVIDER_API_KEY; 
        if (!API_KEY) return new Response(JSON.stringify({ error: 'PROVIDER_API_KEY is missing.' }), { status: 500, headers: corsHeaders });

        try {
            const r1 = await fetch(routingConfig.endpoint_primary, {
                method: "POST",
                headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
                body: JSON.stringify({ inputs: fullPrompt, parameters: { temperature: temperature || 0.2, max_new_tokens: 1024 } })
            });

            if (r1.ok) {
                const data = await r1.json();
                let outputText = data[0]?.generated_text || data.generated_text || "";
                return new Response(outputText.replace(fullPrompt, "").trim(), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/plain' } });
            }
        } catch (e) {}

        // Fallback
        const r2 = await fetch(routingConfig.endpoint_backup, {
            method: "POST",
            headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: fullPrompt, parameters: { temperature: 0.3, max_new_tokens: 1024 } })
        });

        if (r2.ok) {
            const data = await r2.json();
            let outputText = data[0]?.generated_text || data.generated_text || "";
            return new Response(outputText.replace(fullPrompt, "").trim(), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/plain' } });
        }

        return new Response("Cloud Error", { status: 502, headers: corsHeaders });
    } catch (globalError) {
        return new Response(globalError.message, { status: 500, headers: corsHeaders });
    }
}
