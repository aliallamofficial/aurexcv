// api/send-feedback.js

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://aliallamofficial.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // استقبال البيانات المضافة حديثاً
        const { email, rating, message, language, timestamp } = req.body;

        if (!email || !message) {
            return res.status(400).json({ error: 'Missing email or message payload' });
        }

        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error('Environment variables missing on Vercel!');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // تحويل التقييم الرقمي إلى نجوم نصية في الرسالة
        const stars = "⭐".repeat(parseInt(rating || 5));

        // تنسيق الرسالة الاحترافية لتليجرام
        const textMatrix = `🚀 *New AurexCV Feedback Wire* \n` +
                           `----------------------------------\n` +
                           `📧 *Email:* \`${email}\` \n` +
                           `⭐ *Rating:* ${stars} (${rating}/5)\n` +
                           `🌐 *Language:* \`${language || 'Unknown'}\` \n` +
                           `📅 *Timestamp:* \`${timestamp || 'Unknown'}\` \n` +
                           `----------------------------------\n` +
                           `📝 *Message:* \n${message}`;

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
