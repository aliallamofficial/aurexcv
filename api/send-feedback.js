// api/send-feedback.js

export default async function handler(req, res) {
    // إعدادات CORS للسماح لرابط جيت هاب بالاتصال بالسيرفر
    res.setHeader('Access-Control-Allow-Origin', 'https://aliallamofficial.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // التعامل مع طلبات التمهيد الأمنية المسبقة (Preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // السماح فقط بطلبات POST لحماية الدالة
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // استقبال البيانات القادمة من الواجهة الأمامية
        const { email, rating, message, language } = req.body;

        // التحقق من وجود المدخلات الأساسية لمنع الطلبات الفارغة
        if (!email || !message) {
            return res.status(400).json({ error: 'Missing email or message payload' });
        }

        // استدعاء الأسرار المشفرة من بيئة Vercel المحمية
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error('Environment variables missing on Vercel!');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // ترتيب تنسيق التاريخ والوقت تلقائياً لمنع التداخل العشوائي بالأرقام
        const dateObj = new Date();
        const formattedDate = dateObj.toLocaleDateString('en-GB'); // صيغة مقروءة: DD/MM/YYYY
        const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // صيغة مقروءة: HH:MM AM/PM
        const finalTimestamp = `${formattedDate} | ${formattedTime}`;

        // تحويل التقييم الرقمي إلى نجوم نصية في الرسالة
        const stars = "⭐".repeat(parseInt(rating || 5));

        // صياغة الرسالة بنظام HTML لضمان ثبات الخط العريض والترتيب المنسق
        const textMatrix = `🚀 <b>New AurexCV Feedback Wire</b>\n` +
                           `----------------------------------\n` +
                           `📧 <b>Email:</b> <code>${email}</code>\n` +
                           `⭐ <b>Rating:</b> ${stars} (${rating}/5)\n` +
                           `🌐 <b>Language:</b> <code>${language || 'Unknown'}</code>\n` +
                           `📅 <b>Timestamp:</b> <code>${finalTimestamp}</code>\n` +
                           `----------------------------------\n` +
                           `📝 <b>Message:</b>\n${message}`;

        // إرسال الطلب من خادم Vercel إلى تليجرام باستخدام التنسيق الجديد HTML
        const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: textMatrix,
                parse_mode: 'HTML' // تفعيل التفسير البرمجي كـ HTML
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
