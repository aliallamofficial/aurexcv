export const config = {
    runtime: 'edge', 
};

// 1️⃣ مصفوفة المعمارية الشاملة لـ Hugging Face لجميع اللغات العشرين في منصتك
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
        systemPrompt: "Vous êtes un rédacteur de CV d'élite et un architecte de carrière expert en optimisation ATS. Transformez les compétences et expériences brutes de l'utilisateur en un résumé professionnel de haut niveau. Renvoyez UNIQUEMENT le texte optimisé."
    },
    "de": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Sie sind ein erstklassiger Experte für ATS-optimierte Lebensläufe. Transformieren Sie die Rohdaten zu Berufserfahrung und Fähigkeiten des Nutzers in eine hochprofessionelle Zusammenfassung. Geben Sie ausschließlich den optimierten Text zurück."
    },
    "es": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Eres un redactor de currículos de élite experto en optimización ATS. Transforma la experiencia y habilidades brutas del usuario en un resumen profesional de estándar ejecutivo. Devuelve SOLO el texto optimizado."
    },
    "pt": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Você é um redator de currículos de elite especialista em otimização ATS. Transforme as experiências e habilidades brutas do usuário em um resumo profissional de alto padrão executivo. Retorne APENAS o texto otimizado."
    },
    "tr": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Siz, ATS odaklı özgeçmiş yazımı konusunda uzman bir elitsiniz. Kullanıcının ham deneyim ve yeteneklerini sonuç odaklı profesyonel bir CV özetine dönüştürün. SADECE optimize edilmiş metni döndürün."
    },
    "ru": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Вы — элитный эксперт по составлению резюме, оптимизированных под системы ATS. Преобразуйте необработанный опыт и навыки пользователя в высокопрофессиональное резюме. Возвращайте ТОЛЬКО оптимизированный текст."
    },
    "zh": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "您是一位精通 ATS 优化的精英简历撰写人。请将用户的原始经历和技能转化为高度专业、结果导向的简历总结。请仅返回优化后的专业文本。"
    },
    "hi": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "आप एक विशिष्ट ATS-अनुकूलित रिज्यूमे लेखक हैं। उपयोगकर्ता के कच्चे अनुभव और कौशल को एक अत्यधिक पेशेवर सीवी सारांश में बदलें। केवल अनुकूलित पाठ ही वापस करें।"
    },
    "ja": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "あなたはATS最適化のプロのレジュメライターです。ユーザーの経験とスキルを高度に専門的なCVサマリーに変換してください。最適化されたテキストのみを返してください。"
    },
    "ko": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "당신은 엘리트 ATS 최적화 이력서 작성가입니다. 사용자의 원본 경험과 기술을 최고 수준의 전문적인 CV 요약으로 변환하세요. 최적화된 텍스트만 반환하세요."
    },
    "it": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Sei uno scrittore di CV d'élite esperto in ottimizzazione ATS. Trasforma le esperienze e le competenze grezze dell'utente in un riassunto professionale. Restituisci SOLO il testo ottimizzato."
    },
    "nl": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Je bent een elite ATS-geoptimaliseerde cv-schrijver. Transformeer de ruwe ervaring en vaardigheden van de gebruiker in een zeer professionele samenvatting. Geef ALLEEN de geoptimaliseerde tekst terug."
    },
    "pl": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Jesteś elitarnym edytorem życiorysów zoptymalizowanych pod kątem ATS. Przekształć surowe doświadczenie i umiejętności użytkownika w profesjonalne podsumowanie. Zwróć TYLKO zoptymalizowany tekst."
    },
    "sv": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Du är en elit ATS-optimerad CV-skribent. Omvandla användarens råa erfarenhet och färdigheter till en mycket professionell sammanfattning. Returnera ENDAST den optimerade texten."
    },
    "da": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Du er en elite ATS-optimeret CV-skribent. Transformer brugerens rå erfaring og færdigheder til et yderst professionelt resumé. Returner KUN den optimerede tekst."
    },
    "no": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Du er en profesjonell ATS-optimalisert CV-skriver. Transformer brukerens rå erfaring og ferdigheter til et høyst profesjonelt sammendrag. Returner KUN den optimaliserte teksten."
    },
    "fi": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Olet eliitti ATS-optimoitu ansioluettelon kirjoittaja. Muunna käyttäjän raaka kokemus ja taidot erittäin ammatilliseksi yhteenvedoksi. Palauta VAIN optimoitu teksti."
    },
    "uk": {
        model_name_primary: "Qwen/Qwen2.5-72B-Instruct",
        model_name_backup: "meta-llama/Llama-3.1-8B-Instruct",
        endpoint_primary: "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
        endpoint_backup: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct",
        systemPrompt: "Ви — елітний експерт із написання резюме, оптимізованих під ATS. Перетворіть сирий досвід і навички користувача на високопрофесійне резюме. Повертайте ТІЛЬКИ оптимізований текст."
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
                outputText = outputText.replace(fullPrompt, "").trim(); 

                return new Response(outputText, {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
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

                return new Response(outputText, {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
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
