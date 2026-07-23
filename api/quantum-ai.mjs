// api/quantum-ai.js

export const config = {
    runtime: 'edge', // تفعيل بيئة Edge Runtime لدعم البث الصاروخي ومنع الـ Timeout التقليدي
};

// 1️⃣ مصفوفة المعمارية الذكية: نماذج مخصصة (أساسي + احتياطي) لكل لغة مع الـ System Prompts الاحترافية الموحدة
const ARCHITECTURE_MATRIX = {
    "en": {
        primary: "deepseek-v2.5",
        backup: "qwen2.5:14b",
        endpoint_primary: "https://api.deepinfra.com/v1/openai/chat/completions",
        endpoint_backup: "https://api.deepinfra.com/v1/openai/chat/completions",
        model_name_primary: "deepseek-ai/DeepSeek-V2.5",
        model_name_backup: "Qwen/Qwen2.5-14B-Instruct",
        systemPrompt: "You are an elite ATS-optimized resume writer and career architect. Transform the user's raw experience and skills into a highly professional, result-oriented, and executive-standard CV summary. Use strong action verbs, focus on quantifiable achievements, and ensure strict compliance with modern corporate recruitment metrics. Return ONLY the enhanced professional text without any conversational filler."
    },
    "ar": {
        primary: "qwen2.5:32b",
        backup: "qwen2.5:7b",
        endpoint_primary: "https://api.deepinfra.com/v1/openai/chat/completions",
        endpoint_backup: "https://api.deepinfra.com/v1/openai/chat/completions",
        model_name_primary: "Qwen/Qwen2.5-32B-Instruct",
        model_name_backup: "Qwen/Qwen2.5-7B-Instruct",
        systemPrompt: "أنت خبير محترف في صياغة السير الذاتية وأنظمة فحص المتقدمين (ATS). قم بتحويل خبرات ومهارات المستخدم الإدخالية إلى ملخص مهني رفيع المستوى وبمعايير تنفيذية. ركز على استخدام أفعال قوية تدل على الإنجاز، وإبراز النتائج القابلة للقياس، وضمان مطابقة المعايير الشركاتية الحديثة. أرجع النص المحسن فقط دون أي مقدمات أو هوامش حوارية."
    },
    "fr": {
        primary: "deepseek-v2.5",
        backup: "aya-expanse-23b",
        endpoint_primary: "https://api.deepinfra.com/v1/openai/chat/completions",
        endpoint_backup: "https://api.deepinfra.com/v1/openai/chat/completions",
        model_name_primary: "deepseek-ai/DeepSeek-V2.5",
        model_name_backup: "cohereai/Aya-Expanse-23B",
        systemPrompt: "Vous êtes un rédacteur de CV d'élite et un architecte de carrière expert en optimisation ATS. Transformez les compétences et expériences brutes de l'utilisateur en un résumé professionnel de haut niveau, axé sur les résultats. Utilisez des verbes d'action percutants, mettez en valeur les réalisations quantifiables et respectez strictement les critères de recrutement modernes. Renvoyez UNIQUEMENT le texte optimisé."
    },
    "de": {
        primary: "deepseek-v2.5",
        backup: "qwen2.5:14b",
        endpoint_primary: "https://api.deepinfra.com/v1/openai/chat/completions",
        endpoint_backup: "https://api.deepinfra.com/v1/openai/chat/completions",
        model_name_primary: "deepseek-ai/DeepSeek-V2.5",
        model_name_backup: "Qwen/Qwen2.5-14B-Instruct",
        systemPrompt: "Sie sind ein erstklassiger Experte für ATS-optimierte Lebensläufe und Karrierearchitektur. Transformieren Sie die Rohdaten zu Berufserfahrung und Fähigkeiten des Nutzers in eine hochprofessionelle, ergebnisorientierte Zusammenfassung auf Executive-Niveau. Verwenden Sie starke Aktionsverben, fokussieren Sie sich auf messbare Erfolge. Geben Sie ausschließlich den optimierten Text zurück."
    },
    "es": {
        primary: "qwen2.5:32b",
        backup: "llama3.1:8b",
        endpoint_primary: "https://api.deepinfra.com/v1/openai/chat/completions",
        endpoint_backup: "https://api.deepinfra.com/v1/openai/chat/completions",
        model_name_primary: "Qwen/Qwen2.5-32B-Instruct",
        model_name_backup: "meta-llama/Meta-Llama-3.1-8B-Instruct",
        systemPrompt: "Eres un redactor de currículos de élite y arquitecto de carreras experto en optimización ATS. Transforma la experiencia y habilidades brutas del usuario en un resumen profesional de estándar ejecutivo y orientado a resultados. Utiliza verbos de acción fuertes, resalta logros cuantificables y cumple estrictamente con las métricas corporativas. Devuelve SOLO el texto optimizado."
    },
    "pt": {
        primary: "qwen2.5:32b",
        backup: "llama3.1:8b",
        endpoint_primary: "https://api.deepinfra.com/v1/openai/chat/completions",
        endpoint_backup: "https://api.deepinfra.com/v1/openai/chat/completions",
        model_name_primary: "Qwen/Qwen2.5-32B-Instruct",
        model_name_backup: "meta-llama/Meta-Llama-3.1-8B-Instruct",
        systemPrompt: "Você é um redator de currículos de elite e arquiteto de carreira especialista em otimização ATS. Transforme as experiências e habilidades brutas do usuário em um resumo profissional de alto padrão executivo e orientado a resultados. Use verbos de ação fortes, foque em conquistas quantificáveis e cumpra as métricas corporativas modernas. Retorne APENAS o texto otimizado."
    },
    "tr": {
        primary: "qwen2.5:32b",
        backup: "qwen2.5:7b",
        endpoint_primary: "https://api.deepinfra.com/v1/openai/chat/completions",
        endpoint_backup: "https://api.deepinfra.com/v1/openai/chat/completions",
        model_name_primary: "Qwen/Qwen2.5-32B-Instruct",
        model_name_backup: "Qwen/Qwen2.5-7B-Instruct",
        systemPrompt: "Siz, ATS odaklı özgeçmiş yazımı ve kariyer mimarisi konusunda uzman bir elitsiniz. Kullanıcının ham deneyim ve yeteneklerini, sonuç odaklı ve yönetici standartlarında yüksek profesyonel bir CV özetine dönüştürün. Güçlü eylem fiilleri kullanın, ölçülebilir başarılara odaklanın ve modern kurumsal işe alım kriterlerine tam uyum sağlayın. SADECE optimize edilmiş metni döndürün."
    },
    "ru": {
        primary: "deepseek-v2.5",
        backup: "qwen2.5:14b",
        endpoint_primary: "https://api.deepinfra.com/v1/openai/chat/completions",
        endpoint_backup: "https://api.deepinfra.com/v1/openai/chat/completions",
        model_name_primary: "deepseek-ai/DeepSeek-V2.5",
        model_name_backup: "Qwen/Qwen2.5-14B-Instruct",
        systemPrompt: "Вы — элитный эксперт по составлению резюме, оптимизированных под системы ATS, и карьерный архитектор. Преобразуйте необработанный опыт и навыки пользователя в высокопрофессиональное, ориентированное на результат резюме исполнительного стандарта. Используйте сильные глаголы действия и ориентируйтесь на измеримые достижения. Возвращайте ТОЛЬКО оптимизированный текст."
    },
    "zh": {
        primary: "qwen2.5:32b",
        backup: "qwen2.5:7b",
        endpoint_primary: "https://api.deepinfra.com/v1/openai/chat/completions",
        endpoint_backup: "https://api.deepinfra.com/v1/openai/chat/completions",
        model_name_primary: "Qwen/Qwen2.5-32B-Instruct",
        model_name_backup: "Qwen/Qwen2.5-7B-Instruct",
        systemPrompt: "您是一位精通 ATS 优化的精英简历撰写人与职业规划构架师。请将用户的原始经历和技能转化为高度专业、结果导向且符合高管标准的简历总结。使用强有力的行动动词，重点突出可量化的成就，并严格符合现代企业招聘指标。请仅返回优化后的专业文本，不要包含任何寒暄或对话内容。"
    },
    "hi": {
        primary: "qwen2.5:32b",
        backup: "qwen2.5:7b",
        endpoint_primary: "https://api.deepinfra.com/v1/openai/chat/completions",
        endpoint_backup: "https://api.deepinfra.com/v1/openai/chat/completions",
        model_name_primary: "Qwen/Qwen2.5-32B-Instruct",
        model_name_backup: "Qwen/Qwen2.5-7B-Instruct",
        systemPrompt: "आप एक विशिष्ट ATS-अनुकूलित रिज्यूमे लेखक और करियर आर्किटेक्ट हैं। उपयोगकर्ता के कच्चे अनुभव और कौशल को एक अत्यधिक पेशेवर, परिणाम-उन्मुख और कार्यकारी-मानक सीवी सारांश में बदलें। मजबूत क्रियाओं का उपयोग करें, मापने योग्य उपलब्धियों पर ध्यान केंद्रित करें, और आधुनिक कॉर्पोरेट भर्ती मानदंडों का कड़ाई से पालन करें। केवल अनुकूलित पाठ ही वापस करें।"
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
        // قراءة بارامترات الإدخال من الفرونت-إند والتعرف على لغة الطلب (الافتراضي إنجليزي)
        const { userPrompt, lang = 'en', temperature, max_tokens, stream } = await req.json();

        // استخراج إعدادات التوجيه الخاصة باللغة المطلوبة
        const routingConfig = ARCHITECTURE_MATRIX[lang] || ARCHITECTURE_MATRIX['en'];
        
        // استخدام الـ System Prompt المترجم الموحد لضمان ثبات الهوية الفنية للمخرجات
        const activeSystemPrompt = routingConfig.systemPrompt;

        // جلب مفتاح الـ API المؤمن من إعدادات Vercel البيئية (متوافق مع OpenAI Format)
        const API_KEY = process.env.PROVIDER_API_KEY; 
        if (!API_KEY) {
            return new Response(JSON.stringify({ error: 'PROVIDER_API_KEY environment variable is missing.' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // --- 🚀 طَبَقَةُ الاسْتِدْلَالِ الأُولَى: الموديل الأساسي القوي (Active Primary Engine) ---
        try {
            console.log(`[Router] Attempting Primary Model (${routingConfig.model_name_primary}) for language: ${lang}`);
            
            // تهيئة مؤقت الإلغاء لـ 15 ثانية لمنع تجمد الواجهة أمام المستخدم
            const primaryController = new AbortController();
            const primaryTimeout = setTimeout(() => primaryController.abort(), 15000);

            const r1 = await fetch(routingConfig.endpoint_primary, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                signal: primaryController.signal,
                body: JSON.stringify({
                    model: routingConfig.model_name_primary,
                    messages: [
                        { role: "system", content: activeSystemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    temperature: temperature || 0.2, // حماية دقة مصطلحات الـ ATS
                    max_tokens: max_tokens || 1024,
                    stream: stream === true
                })
            });

            clearTimeout(primaryTimeout);

            if (r1.ok) {
                console.log(`[Router] Success via Primary Model.`);
                return new Response(r1.body, {
                    status: 200,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': stream ? 'text/event-stream' : 'application/json',
                        'Cache-Control': 'no-cache',
                    }
                });
            }
            throw new Error(`Primary engine status error: ${r1.status}`);

        } catch (primaryError) {
            console.warn(`[Failover] Primary Model (${routingConfig.model_name_primary}) failed or timed out. Reason:`, primaryError.message);
            console.log(`[Router] Activating Passive Backup Model (${routingConfig.model_name_backup}) immediately...`);
            
            // --- 🛡️ طَبَقَةُ الاسْتِدْلَالِ الثَّانِيَةِ: الموديل الاحتياطي السريع (Passive Backup Engine) ---
            const backupController = new AbortController();
            const backupTimeout = setTimeout(() => backupController.abort(), 10000); // مهلة الاحتياطي 10 ثوانٍ

            const r2 = await fetch(routingConfig.endpoint_backup, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                signal: backupController.signal,
                body: JSON.stringify({
                    model: routingConfig.model_name_backup,
                    messages: [
                        { role: "system", content: activeSystemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    temperature: temperature || 0.3,
                    max_tokens: max_tokens || 1024,
                    stream: stream === true
                })
            });

            clearTimeout(backupTimeout);

            if (r2.ok) {
                console.log(`[Router] Success via Backup Fallback Model.`);
                return new Response(r2.body, {
                    status: 200,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': stream ? 'text/event-stream' : 'application/json',
                        'Cache-Control': 'no-cache',
                    }
                });
            }
        }

        // إذا سقطت خيارات السحاب بالكامل، نترك الفرونت-إند يقوم بتشغيل الـ Local Fallback Engine (Tier-3)
        return new Response(JSON.stringify({ error: "All cloud infrastructure layers failed to respond within limits." }), {
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
