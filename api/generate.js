export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
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

        // যদি Hugging Face থেকে এরর আসে
        if (!response.ok) {
            const errorBody = await response.text();
            console.error("HF API Error:", errorBody);
            return res.status(response.status).json({ error: "API ব্যস্ত আছে, একটু পর চেষ্টা করুন।" });
        }

        const buffer = await response.arrayBuffer();
        
        // ইমেজ রিটার্ন করা
        res.setHeader('Content-Type', 'image/png');
        return res.send(Buffer.from(buffer));

    } catch (error) {
        console.error("Vercel Function Error:", error.message);
        return res.status(500).json({ error: "সার্ভারে সমস্যা হচ্ছে।" });
    }
}
