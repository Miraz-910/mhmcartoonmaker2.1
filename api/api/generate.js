export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { prompt } = req.body;
    // আপনার প্রোভাইড করা টোকেনটি এখানে সেট করা হয়েছে
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
                    inputs: prompt + ", 3d cartoon style, pixar character design, high resolution, vibrant" 
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', 'image/png');
        return res.send(Buffer.from(buffer));

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
