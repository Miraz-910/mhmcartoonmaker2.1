export default async function handler(req, res) {
    const { prompt } = req.body;
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt + ", 3d cartoon style")}?width=1024&height=1024&seed=42&model=flux`;

    try {
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', 'image/png');
        return res.send(Buffer.from(buffer));
    } catch (error) {
        return res.status(500).json({ error: "ছবি তৈরি করা যাচ্ছে না।" });
    }
}
