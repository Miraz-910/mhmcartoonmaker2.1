/my-project
  ├── index.html
  └── api/
  export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { prompt } = req.body;
    const HF_TOKEN = "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"; // আপনার টোকেন এখানে থাকল

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Wan-AI/Wan2.1-T2V-1.3B",
            {
                headers: {
                    "Authorization": `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt + ", cartoon style, 3d animation, high quality" }),
            }
        );

        if (!response.ok) {
            return res.status(response.status).json({ error: "Hugging Face API Error" });
        }

        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', 'video/mp4');
        return res.send(Buffer.from(buffer));

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}    └── generate.js
