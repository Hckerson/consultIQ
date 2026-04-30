import { Weights } from "../types/lead.type";

const leadWeights: Record<Weights, number> = {
  price: 0.35,
  urgency: 0.2,
  industry: 0.2,
  scopeClarity: 0.1,
  strategicValue: 0.15,
};

const industryRelevance: Record<string, number> = {
  technology: 0.8,
  healthcare: 0.4,
  finance: 0.6,
  education: 0.5,
  manufacturing: 0.6,
  retail: 0.6,
  other: 0.3,
};

const clientInfoWeights: Record<string, number> = {
  companySize: 0.2,
  location: 0.15,
  industry: 0.3,
  authority: 0.2,
  intelletualProperty: 0.15,
};

const leadWeightsSum = Object.values(leadWeights).reduce((a, b) => a + b, 0);
const sortedLeadweight = Object.fromEntries(
  Object.entries(leadWeights).sort((a, b) => a[1] - b[1]),
);

const idealConsultantSuccessRate = 0.7;

export {
  leadWeightsSum,
  sortedLeadweight,
  clientInfoWeights,
  industryRelevance,
  idealConsultantSuccessRate,
};
