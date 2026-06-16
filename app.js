document.getElementById('optimizeBtn').addEventListener('click', async () => {
    const fullName = document.getElementById('fullName').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const skills = document.getElementById('skills').value.trim();

    if (!fullName || !jobTitle) {
        alert('رجاءً أدخل الاسم والمسمى الوظيفي على الأقل!');
        return;
    }

    const loading = document.getElementById('loading');
    const resultBox = document.getElementById('resultBox');

    loading.classList.remove('hidden');
    resultBox.innerHTML = '';

    const promptMessage = `أنت خبير محترف في الموارد البشرية (HR). قم بصياغة سيرة ذاتية احترافية وجذابة باللغة العربية بناءً على البيانات التالية:
    الاسم: ${fullName}
    المسمى الوظيفي المستهدف: ${jobTitle}
    الخبرات: ${experience}
    المهارات: ${skills}
    نسق الإجابة بنقاط واضحة ومحترفة.`;

    // وضعنا مفتاحك الجديد المكتمل مباشرة هنا لتشغيل التطبيق فوراً بدون سيرفر Netlify
    const API_KEY = "AQ.Ab8RN6IMCQbiw-juUaKPoLCJsfHOgQK1WftEMdjLmGnuDQ0yiQ"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptMessage }] }] })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0].content) {
            const aiResult = data.candidates[0].content.parts[0].text;
            // تحويل النص إلى نقاط منسقة بشكل جميل
            resultBox.innerHTML = `<div style="white-space: pre-line; color: #fff; text-align: right; direction: rtl; line-height: 1.8;">${aiResult}</div>`;
        } else {
            resultBox.innerHTML = `<p style="color: #ff4a4a;">خطأ: ${data.error?.message || 'فشل الاتصال بجوجل'}</p>`;
        }
    } catch (error) {
        resultBox.innerHTML = `<p style="color: #ff4a4a;">خطأ في الاتصال: ${error.message}</p>`;
    } finally {
        loading.classList.add('hidden');
    }
});
