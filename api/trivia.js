const Anthropic = require("@anthropic-ai/sdk");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { prompt } = req.body;
    const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }]
    });
    const text = message.content[0].type === "text" ? message.content[0].text : "";
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
