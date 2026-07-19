exports.handler = async (event, context) => {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Content-Type": "application/json"
    };

    if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: corsHeaders, body: "" };
    if (event.httpMethod !== "POST") return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ success: false, error: "Method Not Allowed" }) };

    try {
        const bodyData = JSON.parse(event.body);
        const { title, currentCv, jd, lang, mode, query } = bodyData;

        let systemPrompt = "You are an expert ATS optimizer and resume architect. Return ONLY the final clear resume content text, no conversational text.";
        let userPrompt = "";

        if (mode === "chat") {
            systemPrompt = "You are Ali AI, a premium built-in Career Coach. Answer clearly and concisely.";
            userPrompt = query || "";
        } else if (mode === "keywords") {
            userPrompt = `Extract and enrich strategic ATS keywords for ${title}.\nJob Details: ${jd}\nResume Context: ${currentCv}. Language: ${lang}`;
        } else {
            userPrompt = `Construct a masterfully tailored strategic ATS-optimized resume text.\nJob Title: ${title}\nHistory: ${currentCv}\nTarget JD: ${jd}.\nLanguage: ${lang}. Focus on action verbs and professional output layout.`;
        }

        const url = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct";
        const hfHeaders = { 'Content-Type': 'application/json' };
        if (process.env.HUGGINGFACE_API_KEY) hfHeaders["Authorization"] = `Bearer ${process.env.HUGGINGFACE_API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: hfHeaders,
            body: JSON.stringify({
                inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${systemPrompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${userPrompt}<|eot_id|><|start_header_id|>assistant<|end_header_id| trim>`,
                parameters: { max_new_tokens: 1500, temperature: 0.4 }
            })
        });

        const data = await response.json();
        let aiText = (Array.isArray(data) && data[0]) ? data[0].generated_text : (data.generated_text || "");

        aiText = aiText.replace(/<\|begin_of_text\|>|<\|start_header_id\|>.*?<\|end_header_id\|>|<\|eot_id\|>/g, "").trim();
        aiText = aiText.replace(/^```html|^html|^```markdown|^```text|^```|```$/gi, '').trim();

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ success: true, result: aiText || "Compilation Successful." })
        };
    } catch (error) {
        return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ success: false, error: error.message }) };
    }
};
