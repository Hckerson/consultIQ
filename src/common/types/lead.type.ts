type Weights =
  | "price"
  | "urgency"
  | "industry"
  | "strategicValue"
  | "scopeClarity";
type Levels = "low" | "medium" | "high";
type LeadDecision = "reject" | "hold" | "pursue" | "priority-pursue";
type RiskLevel = Levels;

export type { Weights, LeadDecision, Levels, RiskLevel };
