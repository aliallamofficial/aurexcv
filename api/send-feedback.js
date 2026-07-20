// api/send-feedback.js

export default async function handler(req, res) {
    // 1. إعدادات CORS للسماح لرابط GitHub Pages بالاتصال بالسيرفر
    res.setHeader('Access-Control-Allow-Origin', 'https://aliallamofficial.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // التعامل مع طلبات التمهيد الأمنية المسبقة (Preflight) من المتصفح
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // السماح فقط بطلبات POST لحماية الدالة
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, message } = req.body;

        // التحقق من وجود المدخلات لمنع الطلبات الفارغة
        if (!email || !message) {
            return res.status(400).json({ error: 'Missing email or message payload' });
        }

        // استدعاء الأسرار من بيئة Vercel المحمية
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        // فحص إضافي: للتأكد من أن السيرفر يرى المتغيرات البيئية
        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error('Environment variables missing on Vercel!');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const textMatrix = `🚀 *New AurexCV Feedback Wire* \n\n📧 *Email:* \`${email}\` \n📝 *Message:* \n${message}`;

        // إرسال الطلب من الخادم إلى تليجرام (مخفي تماماً عن المتصفح)
        const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: textMatrix,
                parse_mode: 'Markdown'
            })
        });

        if (telegramResponse.ok) {
            // إرجاع استجابة ناجحة متوافقة تماماً مع شرط response.ok في الـ HTML
            return res.status(200).json({ success: true });
        } else {
            const errorData = await telegramResponse.json();
            console.error('Telegram API error:', errorData);
            return res.status(500).json({ error: errorData.description || 'Telegram API error' });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
