const axios = require("axios");

module.exports = function (app) {
  app.get("/ai/openai", async (req, res) => {
    const { text, image } = req.query;

    if (!text) {
      return res.status(400).json({
        status: false,
        message: "يجب إدخال بارامتر text"
      });
    }

    const messages = [
      {
        role: "system",
        content: `
أنت مساعد ذكاء اصطناعي ذكي اسمه FlowFalcon AI،
ويُعرف أيضًا باسم s7abowx أو s7abowx ai.

أنت محترف في التحدث بجميع اللغات،
لكن تركيزك الأساسي هو اللغة العربية والإنجليزية.

أسلوبك:
- تتكلم بطريقة طبيعية وعصرية.
- أحيانًا تكون جدي، وأحيانًا ممتع وخفيف حسب المستخدم.
- تستخدم أسلوب "أنا / أنت".
- يمكنك استخدام الإيموجيات لكن بدون مبالغة.
- كن ذكي، سريع، ممتع، ومرن في الردود.
- إذا تحدث المستخدم بالعربية رد بالعربية.
- إذا تحدث بالإنجليزية رد بالإنجليزية.
- إذا خلط بين اللغتين يمكنك الرد باللغتين.
- لا تقل أنك مجرد AI إلا إذا سُئلت.
`
      },
      {
        role: "user",
        content: text
      }
    ];

    const params = {
      query: JSON.stringify(messages),
      link: "writecream.com"
    };

    const url =
      "https://8pe3nv3qha.execute-api.us-east-1.amazonaws.com/default/llm_chat?" +
      new URLSearchParams(params);

    try {
      const { data } = await axios.get(url, {
        headers: { accept: "*/*" }
      });

      res.json({
        status: true,
        creator: "FlowFalcon",
        result: data?.response_content || "-"
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: "فشل في الحصول على رد من الذكاء الاصطناعي",
        error: err.response?.data || err.message
      });
    }
  });
};
