type Weights =
  | "price"
  | "urgency"
  | "industry"
  | "strategicValue"
  | "scopeClarity";
type Levels = "low" | "medium" | "high";
type LeadDecision = "REJECT" | "HOLD" | "PURSUE" | "PRIORITY_PURSUE";
type RiskLevel = Levels;

export type { Weights, LeadDecision, Levels, RiskLevel };
