// api/send-feedback.js
export default async function handler(req, res) {
    // السماح فقط بطلبات POST لحماية الدالة
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, message } = req.body;

        // استدعاء الأسرار من بيئة Vercel المحمية وليس من الكود
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ error: 'Telegram API error' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
