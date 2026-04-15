const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-3.1-flash-image-preview";

export async function generateImage(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error("VITE_OPENROUTER_API_KEY not set");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: prompt }]
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
