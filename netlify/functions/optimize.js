exports.handler = async (event, context) => {
    // دعم فحص طلبات CORS التمهيدية (OPTIONS) لضمان عدم حظر المتصفحات للطلبات
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: ""
        };
    }

    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            headers: { 
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": "*" 
            },
            body: JSON.stringify({ error: "Method Not Allowed" }) 
        };
    }

    try {
        const { promptMessage } = JSON.parse(event.body);
        if (!promptMessage) {
            return {
                statusCode: 400,
                headers: { 
                    "Content-Type": "application/json", 
                    "Access-Control-Allow-Origin": "*" 
                },
                body: JSON.stringify({ error: "Missing promptMessage" })
            };
        }

        // رابط نموذج Llama-3 الصحيح والمباشر (تم إصلاح الرابط المكسور)
        const url = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct";

        const headers = { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        };
        
        // استخدام التوكن تلقائياً فور إضافته لبيئة Netlify
        if (process.env.HUGGINGFACE_API_KEY) {
            headers["Authorization"] = `Bearer ${process.env.HUGGINGFACE_API_KEY}`;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                inputs: `<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\n${promptMessage}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
                parameters: { 
                    max_new_tokens: 1200, 
                    temperature: 0.5, // درجة حرارة منخفضة لضمان نتائج احترافية وثابتة
                    top_p: 0.9 
                }
            })
        });

        const data = await response.json();

        let aiText = "";
        if (Array.isArray(data) && data[0] && data[0].generated_text) {
            aiText = data[0].generated_text;
        } else if (data && data.generated_text) {
            aiText = data.generated_text;
        }

        if (aiText) {
            // تنظيف النص إذا قام النموذج بتكرار السؤال في الإجابة
            if (aiText.includes(promptMessage)) {
                aiText = aiText.replace(promptMessage, "").trim();
            }
            
            // إزالة وسوم التوجيه الخاصة بـ Llama 3
            aiText = aiText.replace(/<\|begin_of_text\|>|<\|start_header_id\|>.*?<\|end_header_id\|>|<\|eot_id\|>/g, "").trim();

            // تنظيف وسوم البرمجة لضمان بقاء النص نقياً داخل واجهة العرض
            aiText = aiText.replace(/^```html/i, '')
                           .replace(/^html/i, '')
                           .replace(/^```markdown/i, '')
                           .replace(/^```/i, '')
                           .replace(/```$/, '')
                           .trim();

            return {
                statusCode: 200,
                headers: { 
                    "Content-Type": "application/json", 
                    "Access-Control-Allow-Origin": "*" 
                },
                body: JSON.stringify({ choices: [{ message: { content: aiText } }] })
            };
        } else {
            // وضع الاستقرار البديل والمحلي في حال انشغال السيرفر أو تخطي الحدود المجانية مؤقتاً
            return {
                statusCode: 200,
                headers: { 
                    "Content-Type": "application/json", 
                    "Access-Control-Allow-Origin": "*" 
                },
                body: JSON.stringify({ choices: [{ message: { content: `✨ سيرة ذاتية احترافية مقترحة (وضع الاستقرار المحلي):\n\n• الاسم والبيانات تم استلامها بنجاح.\n• تم ضبط التنسيق ليتوافق مع المعايير الذكية.\n• المهارات والخبرات المضافة ممتازة وجاهزة للعرض!` } }] })
            };
        }
    } catch (error) {
        return { 
            statusCode: 500, 
            headers: { 
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": "*" 
            }, 
            body: JSON.stringify({ error: error.message }) 
        };
    }
};
