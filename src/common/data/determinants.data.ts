import { SkillSet } from "generated/prisma/client";

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
  PROBLEM_SOLVING: [
    "analytical",
    "critical thinking",
    "troubleshooting",
    "innovation",
    "creativity",
    "situation",
    "risk",
    "security",
    "scope",
    "technology",
    "infrastructure",
  ],
  COMMUNICATION: [
    "verbal",
    "written",
    "presentation",
    "negotiation",
    "listening",
    "communication",
    "alignment",
    "stakeholders",
  ],
  TEAMWORK: [
    "collaboration",
    "cooperation",
    "support",
    "conflict resolution",
    "interpersonal",
    "culture",
    "bandwidth",
  ],
  LEADERSHIP: [
    "management",
    "mentoring",
    "strategic",
    "decision making",
    "delegation",
    "leadership",
    "companySize",
    "resources",
    "budget",
    "cost",
    "approval",
  ],
  ADAPTABILITY: [
    "flexibility",
    "resilience",
    "change management",
    "agile",
    "versatile",
    "experience",
    "market",
    "industry",
    "location",
  ],
  TIME_MANAGEMENT: [
    "organization",
    "planning",
    "prioritization",
    "efficiency",
    "punctuality",
    "time",
    "urgency",
  ],
  OTHER: ["compliance", "regulatory", "legal"],
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
