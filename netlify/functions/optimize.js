exports.handler = async (event, context) => {
    // السماح فقط بطلبات POST
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: "Method Not Allowed" }) 
        };
    }

    try {
        const { promptMessage } = JSON.parse(event.body);
        const API_KEY = "AQ.Ab8RN6KheAp9j_ESVIZg4F96dHcz1cCd3fYBq1UDw9hdA_SJyA";

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: promptMessage }]
            })
        });

        const data = await response.json();

        // التأكد من أن الرد يحتوي على خيارات الإجابة من الذكاء الاصطناعي
        if (data.choices && data.choices[0].message) {
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };
        } else {
            // في حال أرجعت شركة Groq خطأ في المفتاح أو الخدمة
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: data.error?.message || "فشل الذكاء الاصطناعي في الاستجابة، يرجى التحقق من الخادم." })
            };
        }

    } catch (error) {
        return { 
            statusCode: 500, 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "حدث خطأ أثناء الاتصال بالسيرفر الداخلي: " + error.message }) 
        };
    }
};
