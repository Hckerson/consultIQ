import type { SkillSet } from "../types/types";

const favourableLocation = ["USA", "UK", "Canada", "Australia", "New Zealand"];
const unfavourableLocation = [
  "India",
  "Pakistan",
  "Bangladesh",
  "Nepal",
  "Sri Lanka",
];

const favourableIndustry = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
];

const unfavourableIndustry = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
];



const timeline = {
  short: 3,
  medium: 6,
  long: 12,
};

const desireLength = {
  small: 3,
  medium: 6,
  large: 9,
};

const skillSetKeywords: Record<SkillSet, string[]> = {
  "Problem_Solving": [
    "analytical", "critical thinking", "troubleshooting", "innovation", "creativity", 
    "situation", "risk", "security", "scope", "technology", "infrastructure"
  ],
  "Communication": [
    "verbal", "written", "presentation", "negotiation", "listening", 
    "communication", "alignment", "stakeholders"
  ],
  "Teamwork": [
    "collaboration", "cooperation", "support", "conflict resolution", "interpersonal", 
    "culture", "bandwidth"
  ],
  "Leadership": [
    "management", "mentoring", "strategic", "decision making", "delegation", 
    "leadership", "companySize", "resources", "budget", "cost", "approval"
  ],
  "Adaptability": [
    "flexibility", "resilience", "change management", "agile", "versatile", 
    "experience", "market", "industry", "location"
  ],
  "Time_Management": [
    "organization", "planning", "prioritization", "efficiency", "punctuality", 
    "time", "urgency"
  ],
  "Other": [
    "compliance", "regulatory", "legal"
  ]
};

export {
  timeline,
  desireLength,
  skillSetKeywords,
  favourableLocation,
  favourableIndustry,
  unfavourableIndustry,
  unfavourableLocation,
};
