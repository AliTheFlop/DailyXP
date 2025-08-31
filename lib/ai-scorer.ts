import { AIResponse } from "@/types";

// List of available categories for the AI to choose from.
// The model must return one of these values in its response.
const CATEGORIES: string[] = [
  "Work",
  "Career",
  "Business",
  "Coding",
  "Design",
  "Writing",
  "Reading",
  "Research",
  "Learning",
  "Studying",
  "Exercise",
  "Fitness",
  "Running",
  "Weightlifting",
  "Yoga",
  "Meditation",
  "Health",
  "Nutrition",
  "Cooking",
  "Cleaning",
  "Chores",
  "Maintenance",
  "Gardening",
  "Errands",
  "Shopping",
  "Finance",
  "Investing",
  "Budgeting",
  "Saving",
  "Networking",
  "Social",
  "Family",
  "Friends",
  "Volunteering",
  "Travel",
  "Leisure",
  "Gaming",
  "Entertainment",
  "Music",
  "Art",
  "Creativity",
  "Hobbies",
  "Projects",
  "Education",
  "Teaching",
  "Planning",
  "Administration",
  "Self-Care",
  "Sleep",
  "Mindfulness",
];

export const scoreAction = async (actionText: string): Promise<AIResponse> => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const systemPrompt =
    `You are a serious life coach helping a user gain XP in life. ` +
    `Evaluate the user's action, assign a category from the provided list, ` +
    `score the action from 0-100 (higher is better), and judge whether it's a ` +
    `"good" or "lazy" task. Respond strictly in JSON with keys: ` +
    `score (number), category (string), taskQuality ("good" | "lazy"). ` +
    `Categories: ${CATEGORIES.join(", ")}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: actionText },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No response from AI");
  }

  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    throw new Error("Failed to parse AI response");
  }

  const category = typeof parsed.category === "string" ? parsed.category : "General";
  const score = typeof parsed.score === "number" ? parsed.score : 50;
  const taskQuality = parsed.taskQuality === "good" ? "good" : "lazy";

  return { category, score, taskQuality };
};

