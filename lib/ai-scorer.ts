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
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not set");
    }

    const systemPrompt = `You are a ruthless but fair life coach inside a gamified productivity system.
    Your job is to judge the user's actions like they are logging moves in a real-life RPG.

    - Categorize the task into one of: ${CATEGORIES.join(", ")}.
    - Score the task 0-100 (higher = more valuable to long-term growth).
    - Label it as "good" if it meaningfully pushes the player forward,
      or "lazy" if it's entertainment, procrastination, or meaningless filler.
    - Provide a short, no-nonsense feedback message.
    - Be strict. Do NOT inflate scores to be nice. If they did something weak, punish them.
    - Treat obviously lazy actions (gaming, scrolling, junk food, oversleeping, etc.) with contempt.
    - Treat serious work (deep focus, building, outreach, training) as heroic.

    Respond ONLY in raw JSON, no extra text. Keys:
    { "score": number, "category": string, "taskQuality": "good" | "lazy", "feedback": string }`;

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

    const category =
        typeof parsed.category === "string" ? parsed.category : "General";
    const score = typeof parsed.score === "number" ? parsed.score : 50;
    const taskQuality = parsed.taskQuality === "good" ? "good" : "lazy";
    const feedback = typeof parsed.feedback === "string" ? parsed.feedback : "";

    return { category, score, taskQuality, feedback };
};
