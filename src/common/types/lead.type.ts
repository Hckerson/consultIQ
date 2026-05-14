type Weights =
  | "price"
  | "urgency"
  | "industry"
  | "strategicValue"
  | "scopeClarity";
type Levels = "LOW" | "MEDIUM" | "HIGH";
type LeadDecision = "REJECT" | "HOLD" | "PURSUE" | "PRIORITY_PURSUE";
type RiskLevel = Levels;

export type { Weights, LeadDecision, Levels, RiskLevel };
