export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { prompt } = req.body;
    const HF_TOKEN = "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"; 

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: {
                    "Authorization": `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ 
                    inputs: prompt + ", 3d cartoon style, pixar character design, high resolution" 
                }),
            }
        );

        if (!response.ok) return res.status(response.status).send("Hugging Face API Error");

        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', 'image/png');
        return res.send(Buffer.from(buffer));

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
