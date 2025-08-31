import { AIResponse } from "@/types";

export const scoreAction = async (actionText: string): Promise<AIResponse> => {
    // For MVP, we'll simulate AI scoring with some logic
    // In production, this would call an LLM API

    // Simple category detection based on keywords
    const categories = {
        Work: [
            "work",
            "project",
            "task",
            "meeting",
            "deadline",
            "email",
            "presentation",
        ],
        Health: [
            "workout",
            "exercise",
            "gym",
            "run",
            "walk",
            "yoga",
            "sleep",
            "meditation",
        ],
        Learning: [
            "read",
            "study",
            "course",
            "book",
            "tutorial",
            "research",
            "practice",
        ],
        Social: [
            "friend",
            "family",
            "call",
            "visit",
            "date",
            "party",
            "networking",
        ],
        Creative: [
            "write",
            "draw",
            "design",
            "paint",
            "music",
            "create",
            "build",
        ],
        Finance: [
            "budget",
            "save",
            "invest",
            "pay",
            "bill",
            "money",
            "expense",
        ],
        Personal: [
            "clean",
            "organize",
            "plan",
            "journal",
            "reflection",
            "goal",
        ],
    };

    let detectedCategory = "General";
    let baseScore = 50;

    const lowerText = actionText.toLowerCase();

    // Detect category
    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some((keyword) => lowerText.includes(keyword))) {
            detectedCategory = category;
            break;
        }
    }

    // Score based on action indicators
    if (lowerText.includes("completed") || lowerText.includes("finished")) {
        baseScore += 20;
    }
    if (lowerText.includes("difficult") || lowerText.includes("challenging")) {
        baseScore += 15;
    }
    if (lowerText.includes("helped") || lowerText.includes("taught")) {
        baseScore += 10;
    }
    if (lowerText.includes("learned") || lowerText.includes("improved")) {
        baseScore += 10;
    }

    // Add some randomness (±15)
    const randomVariation = Math.floor(Math.random() * 31) - 15;
    const finalScore = Math.max(10, Math.min(100, baseScore + randomVariation));

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
        category: detectedCategory,
        score: finalScore,
    };
};
