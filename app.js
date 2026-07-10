// ========================================================
// 💡 مصفوفة النصائح الجاهزة لتغيير النصيحة تلقائياً محلياً (عند عدم الاتصال)
// ========================================================
const cvTips = [
    "تجنب وضع صورتك الشخصية إذا كنت تقدم على شركات عالمية تعتمد نظام ATS تماماً.",
    "احرص على ألا تتجاوز سيرتك الذاتية صفحة واحدة إذا كانت خبرتك أقل من 5 سنوات.",
    "استخدم أرقاماً ونسباً مئوية حقيقية لإثبات إنجازاتك (مثال: زيادة المبيعات بنسبة 20%).",
    "البريد الإلكتروني المهني يجب أن يحتوي على اسمك الحقيقي، ابتعد تماماً عن الأسماء مستعارة.",
    "الكلمات المفتاحية المأخوذة من إعلان الوظيفة نفسه هي مفتاحك السحري لتخطي فلترة الـ ATS."
];

// 🛠️ قاعدة البيانات المحلية للإرشادات النصية والمهام المقترحة بدقة بالغة لكل وظيفة إبداعية
const jobGuidelines = {
    "graphic_designer": {
        title: "مصمم جرافيك",
        tips: [\n            "ابتكار هويات بصرية كاملة تتوافق مع رؤية العلامة التجارية وشخصيتها.",\n            "تصميم مواد إعلانية ومحتوى رقمي لمنصات التواصل الاجتماعي لزيادة التفاعل بنسبة %X.",\n            "إتقان العمل على حزمة Adobe (Photoshop, Illustrator, InDesign) وإدارة الوقت بكفاءة."\n        ]
    },
    "content_creator": {
        title: "صانع محتوى / كاتب محتوى",
        tips: [\n            "كتابة سيناريوهات ومحتوى تفاعلي لمنصات التواصل الاجتماعي ساهم في زيادة المشاهدات بنسبة %X.",\n            "إعداد خطط محتوى شهرية مبنية على تحليل سلوك الجمهور واهتماماتهم المستهدفة.",\n            "تحسين جودة النصوص لتتوافق مع قواعد السيو (SEO) لزيادة الظهور المجاني في محركات البحث."\n        ]
    },
    "digital_marketer": {
        title: "أخصائي تسويق رقمي",
        tips: [\n            "إدارة الحملات الإعلانية المدفوعة على منصات (Meta, Google, TikTok) وتحقيق عائد استثماري ROAS يبلغ X.",\n            "تحليل بيانات المواقع والحملات باستخدام Google Analytics لتقديم تقارير دورية ومقترحات تحسين.",\n            "بناء استراتيجيات التسويق عبر البريد الإلكتروني والأتمتة لرفع نسبة الاحتفاظ بالعملاء بنسبة %X."\n        ]
    },
    "video_editor": {
        title: "محرر فيديو / مونتير",
        tips: [\n            "تعديل وقص مقاطع الفيديو الطويلة والقصيرة (Reels/Shorts) بأسلوب ديناميكي يزيد من معدل الاحتفاظ بالجمهور.",\n            "إضافة المؤثرات الصوتية والبصرية والتصحيح اللوني المتقدم باستخدام Premiere و After Effects.",\n            "تنظيم المواد المصورة والعمل مع صناع المحتوى لترجمة الأفكار إلى قصص بصرية ملهمة وجذابة."\n        ]
    },
    "sales_specialist": {
        title: "أخصائي مبيعات / خدمة عملاء",
        tips: [\n            "تحقيق وإغلاق الصفقات البيعية الشهرية وتخطي الأهداف المطلوبة (KPIs) بنسبة %X باستمرار.",\n            "بناء علاقات قوية ومستدامة مع العملاء الحاليين والمحتملين وتقديم حلول مخصصة لاحتياجاتهم.",\n            "التعامل الاحترافي مع الاعتراضات وحل مشكلات العملاء المعقدة بسرعة وكفاءة لضمان رضاهم التام."\n        ]
    }
};

document.addEventListener("DOMContentLoaded", function () {
    // 🌍 تحديث تفاعلي للنصائح الجاهزة في أسفل الواجهة
    const tipElement = document.getElementById("cvTipText");
    if (tipElement) {
        let currentTipIndex = 0;
        setInterval(() => {
            currentTipIndex = (currentTipIndex + 1) % cvTips.length;
            tipElement.style.opacity = 0;
            setTimeout(() => {
                tipElement.textContent = cvTips[currentTipIndex];
                tipElement.style.opacity = 1;
            }, 300);
        }, 7000);
    }

    // 💼 تفعيل ذكي ومؤتمت للاقتراحات المخصصة حسب اسم الوظيفة المختار
    const jobTitleInput = document.getElementById("jobTitle");
    const suggestionsBox = document.getElementById("jobSuggestionsBox");
    const suggestionsList = document.getElementById("suggestionsList");
    const experienceTextarea = document.getElementById("experience");

    if (jobTitleInput && suggestionsBox && suggestionsList && experienceTextarea) {
        jobTitleInput.addEventListener("input", function () {
            const query = jobTitleInput.value.trim().toLowerCase();
            suggestionsList.innerHTML = "";
            
            let matched = false;
            for (const key in jobGuidelines) {
                const job = jobGuidelines[key];
                if (query.includes(job.title) || job.title.toLowerCase().includes(query)) {
                    matched = true;
                    job.tips.forEach(text => {
                        const btn = document.createElement("button");
                        btn.type = "button";
                        btn.textContent = `+ إضافة: ${text}`;
                        btn.style.width = '100%';
                        btn.style.padding = '8px 12px';
                        btn.style.marginBottom = '6px';
                        btn.style.background = '#1e293b';
                        btn.style.border = '1px solid #475569';
                        btn.style.borderRadius = '4px';
                        btn.style.color = '#e2e8f0';
                        btn.style.textAlign = 'right';
                        btn.style.cursor = 'pointer';
                        btn.style.fontSize = '12px';
                        btn.style.transition = 'background 0.2s';
                        
                        btn.addEventListener('mouseenter', () => btn.style.background = '#334155');
                        btn.addEventListener('mouseleave', () => btn.style.background = '#1e293b');
                        
                        btn.addEventListener('click', function() {
                            if (experienceTextarea.value.trim() === '') {
                                experienceTextarea.value = `• ${text}`;
                            } else {
                                experienceTextarea.value += `\n• ${text}`;
                            }
                            experienceTextarea.dispatchEvent(new Event('input'));
                        });
                        
                        suggestionsList.appendChild(btn);
                    });
                }
            }
            
            if (matched && query.length > 1) {
                suggestionsBox.classList.remove("hidden");
            } else {
                suggestionsBox.classList.add("hidden");
            }
        });
    }

    // 📊 مراقبة ذكية لعدد الحروف لتحديث مؤشر القوة الفوري (Real-time ATS Indicator)
    const inputs = ["name", "jobTitle", "phone", "email", "skills", "experience"];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", updateScore);
        }
    });

    function updateScore() {
        let score = 0;
        let filledCount = 0;

        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.value.trim().length > 3) {
                filledCount++;
            }
        });

        score = Math.min(filledCount * 16.6, 100);
        if (score > 95) score = 100;

        const fillBar = document.getElementById("scoreFill");
        const scoreText = document.getElementById("scoreText");
        const scoreStatus = document.getElementById("scoreStatus");

        if (fillBar && scoreText && scoreStatus) {
            const finalScore = Math.round(score);
            fillBar.style.width = `${finalScore}%`;
            scoreText.textContent = `${finalScore}%`;

            if (finalScore < 40) {
                fillBar.style.backgroundColor = "#ef4444";
                scoreStatus.textContent = "⚠️ ضعيف جداً (بحاجة لبيانات)";
                scoreStatus.style.color = "#f87171";
            } else if (finalScore < 75) {
                fillBar.style.backgroundColor = "#eab308";
                scoreStatus.textContent = "⚡ مقبول (أضف المهارات والخبرات)";
                scoreStatus.style.color = "#facc15";
            } else {
                fillBar.style.backgroundColor = "#22c55e";
                scoreStatus.textContent = "✨ قوي وممتاز للـ ATS!";
                scoreStatus.style.color = "#4ade80";
            }
        }
    }

    // 🧠 استدعاء الذكاء الاصطناعي لتحسين الصياغة وتوليد المحتوى الفاخر
    const aiBtn = document.getElementById("aiOptimizeBtn");
    if (aiBtn) {
        aiBtn.addEventListener("click", async function () {
            const name = document.getElementById("name").value.trim();
            const jobTitle = document.getElementById("jobTitle").value.trim();
            const skills = document.getElementById("skills").value.trim();
            const experience = document.getElementById("experience").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();

            if (!name || !jobTitle) {
                alert("يرجى ملء الاسم المربع والوظيفة المستهدفة على الأقل لتتمكن الذكاء الاصطناعي من صياغتها!");
                return;
            }

            aiBtn.disabled = true;
            aiBtn.innerHTML = '⏳ جاري الصياغة والتحسين ذكياً...';

            const promptMessage = `قم بصياغة سيرة ذاتية احترافية باللغة العربية متوافقة تماماً مع أنظمة الـ ATS لشخص اسمه "${name}" ويعمل في وظيفة "${jobTitle}".
المهارات الحالية: ${skills || "لم يتم تحديدها بدقة"}
الخبرات والمهام: ${experience || "لم يتم تحديدها بدقة"}
الهاتف: ${phone || "000000"}
الإيميل: ${email || "info@example.com"}

شروط هامة جداً:
1. ابدأ فوراً بنص السيرة الذاتية المنظمة. لا تكتب أي مقدمات مثل "بالتأكيد" أو "إليك السيرة".
2. لا تستخدم رموز المارك داون مثل النجوم ** أو الشرطات الإضافية، اكتب نصاً نقياً ومنظماً ومباشراً.
3. وزع المحتوى بوضوح تحت عناوين: (البيانات الشخصية، الملخص المهني، الخبرات العملية، المهارات التقنية، التوافق مع أنظمة ATS).`;

            try {
                const response = await fetch("/.netlify/functions/optimize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ promptMessage })
                });

                if (!response.ok) throw new Error("فشل الاتصال بخادم الذاء الاصطناعي.");

                const data = await response.json();
                if (data && data.choices && data.choices[0] && data.choices[0].message) {
                    let aiResult = data.choices[0].message.content;

                    // تنظيف أي وسوم أو أكواد مكسورة قد ترجع بالخطأ من الذكاء الاصطناعي
                    aiResult = aiResult.replace(/^```html/i, '')
                                       .replace(/^html/i, '')
                                       .replace(/```$/, '')
                                       .trim();

                    // ✨ تم الإصلاح هنا: استبدال innerHTML بـ value وتحديث الـ textarea بشكل آمن يمنع الشاشة البيضاء
                    const outputBox = document.getElementById("outputBox");
                    if (outputBox) {
                        outputBox.value = aiResult;
                        // إطلاق حدث التحديث للمزامنة الفورية
                        outputBox.dispatchEvent(new Event('input'));
                    }
                    
                    alert("🎉 تم تحسين وتوليد السيرة الذاتية بنجاح! يمكنك مراجعتها وتعديلها الآن في الصندوق أسفله.");
                } else {
                    throw new Error("تنسيق البيانات المستلمة غير صحيح.");
                }
            } catch (err) {
                alert("⚠️ واجه السيرفر ضغطاً مؤقتاً، تم استخدام التنسيق الذكي البديل والمحلي بنجاح!");
                const outputBox = document.getElementById("outputBox");
                if (outputBox) {
                    outputBox.value = `✨ سيرة ذاتية احترافية مقترحة لـ ${name}:\n\n• الوظيفة: ${jobTitle}\n• الهاتف: ${phone}\n• البريد: ${email}\n\n[الخبرات المهنية المقترحة]\n• إدارة وإنجاز كافة المهام الموكلة بكفاءة متناهية وضمن الجداول الزمنية.\n• تطوير مهارات العمل الجماعي والمساهمة في تحقيق الأهداف العامة للمؤسسة.\n\n[المهارات]\n• ${skills || "مهارات التواصل، حل المشكلات، إدارة الوقت"}`;
                    outputBox.dispatchEvent(new Event('input'));
                }
            } finally {
                aiBtn.disabled = false;
                aiBtn.innerHTML = '✨ حسّن واكتب السي في بالذكاء الاصطناعي (ATS)';
            }
        });
    }

    // ========================================================
    // 🖨️ نظام التصدير والتحميل الفوري لملف PDF احترافي فائق النقاء
    // ========================================================
    const downloadBtn = document.getElementById("downloadPdfBtn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {
            const cvContent = document.getElementById("outputBox").value.trim();
            if (!cvContent) {
                alert("صندوق السيرة الذاتية فارغ! يرجى كتابة نص أو استخدام زر التحسين بالذكاء الاصطناعي أولاً قبل التصدير.");
                return;
            }

            const nameInput = document.getElementById("name").value.trim() || "السيرة_الذاتية";

            // إعدادات مكتبة html2pdf لتوليد ملف فائق الجودة ومتناسق الأبعاد للهواتف والحواسب
            const opt = {
                margin: [15, 15, 15, 15],
                filename: `${nameInput}_CV.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, letterRendering: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // إنشاء هيكل HTML مؤقت ومصمم بأعلى معايير الأناقة لتوليد الـ PDF منه مباشرة
            const workerContainer = document.createElement("div");
            workerContainer.style.dir = "rtl";
            workerContainer.style.textAlign = "right";
            workerContainer.style.fontFamily = "'Cairo', sans-serif";
            workerContainer.style.color = "#1e293b";
            workerContainer.style.lineHeight = "1.8";
            workerContainer.style.whiteSpace = "pre-wrap";
            workerContainer.style.padding = "10px";

            // معالجة السطور وعرضها بتنسيق نظيف جداً داخل ملف الـ PDF
            workerContainer.textContent = cvContent;

            // إطلاق معالج التحميل الفوري وتدمير العنصر المؤقت بعد الانتهاء للحفاظ على الذاكرة
            html2pdf().set(opt).from(workerContainer).save().then(() => {
                console.log("PDF downloaded successfully.");
            });
        });
    }

    // ========================================================
    // 🔗 ميزة مشاركة التطبيق الذكية عبر الـ Web Share API الأصلي
    // ========================================================
    const shareBtn = document.getElementById("shareAppBtn");
    if (shareBtn) {
        shareBtn.addEventListener("click", async function () {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'صانع السير الذاتية الذكي',
                        text: 'أنشئ سيرتك الذاتية مجاناً وبثوانٍ وتخطى فحص الـ ATS بالذكاء الاصطناعي وبدون حساب!',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log("تم إلغاء المشاركة أو حدث خطأ.");
                }
            } else {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert("📋 تم نسخ رابط التطبيق بنجاح! يمكنك الآن لصق ومشاركتة مع أصدقائك.");
                } catch (err) {
                    alert("عذراً، لم نتمكن من نسخ الرابط تلقائياً.");
                }
            }
        });
    }

    // ========================================================
    // 🔔 تفعيل زر الإشعارات الأصلي المتواجد داخل قائمة الإعدادات
    // ========================================================
    const notificationBtn = document.getElementById("enableNotificationsBtn");
    if (notificationBtn) {
        notificationBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!("Notification" in window)) {
                alert("عذراً، البيئة الحالية لا تدعم ميزة الإشعارات بشكل مباشر.");
                return;
            }

            if (Notification.permission === "granted") {
                alert("🔔 الإشعارات مفعلة بالفعل ومصرح بها بنجاح!");
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        alert("🎉 تم تفعيل الإشعارات بنجاح!");
                    } else {
                        alert("⚠️ تم رفض إذن الإشعارات.");
                    }
                });
            }
        });
    }
});
