const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());
app.use(express.json());

// تحديد الاستخدام: 3 مرات فقط في اليوم لكل مستخدم
const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 ساعة
    max: 3, 
    message: { error: "عذراً، لقد استهلكت حدك التجريبي اليومي (3 مرات). يمكنك المحاولة مجدداً غداً!" }
});

// مفتاح الـ API الخاص بك محمي هنا بأمان
const API_KEY = "AQ.Ab8RN6KheAp9j_ESVIZg4F96dHcz1cCd3fYBq1UDw9hdA_SJyA"; 

app.post('/api/optimize-cv', limiter, async (req, res) => {
    const { promptMessage } = req.body;

    try {
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
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "حدث خطأ في السيرفر أثناء الاتصال بالذكاء الاصطناعي" });
    }
});

// إعداد المنفذ ليتوافق مع استضافة الإنترنت تلقائياً
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`السيرفر يعمل بنجاح وآمن على المنفذ ${PORT}`));
