export default async function handler(req, res) {
    // শুধুমাত্র POST রিকোয়েস্ট এলাও করবে
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

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

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ error: errorText });
        }

        const buffer = await response.arrayBuffer();
        
        // ইমেজ রিটার্ন করার সঠিক নিয়ম
        res.setHeader('Content-Type', 'image/png');
        return res.send(Buffer.from(buffer));

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
