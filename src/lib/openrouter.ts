const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-3.1-flash-image-preview";

async function imageUrlToBase64(url: string): Promise<string> {
  // If already base64, return as-is
  if (url.startsWith('data:')) return url;
  
  // Fetch and convert to base64
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateImage(
  prompt: string, 
  referenceImageUrl?: string
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error("VITE_OPENROUTER_API_KEY not set");
  }

  const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];

  // Add reference image first if provided
  if (referenceImageUrl) {
    try {
      const base64 = await imageUrlToBase64(referenceImageUrl);
      content.push({
        type: "image_url",
        image_url: { url: base64 }
      });
    } catch (err) {
      console.warn('Failed to load reference image:', err);
    }
  }

  // Add text prompt
  const fullPrompt = referenceImageUrl
    ? `Study this reference image carefully. It shows the exact visual style, layout, typography, and brand identity for Team South Africa Commonwealth Games graphics.\n\nYour task: Generate a NEW image that MATCHES this exact design system.\n\n${prompt}\n\nCRITICAL: Match the reference style EXACTLY - same logo placement, typography hierarchy, color palette, texture treatment, layout structure.`
    : prompt;

  content.push({
    type: "text",
    text: fullPrompt
  });

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://teamsa.studio",
      "X-Title": "Team SA Studio"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content
        }
      ],
      modalities: ["image", "text"],
      image_config: { aspect_ratio: "4:5" }
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  
  if (!imageUrl) {
    throw new Error("No image in response");
  }

  return imageUrl;
}
