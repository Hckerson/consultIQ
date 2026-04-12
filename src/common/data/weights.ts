import { Weights } from "../types/lead.type";

const LeadWeights: Record<Weights, number> = {
  price: 0.4,
  urgency: 0.3,
};

const LeadWeightsSum = Object.values(LeadWeights).reduce((a, b) => a + b, 0);
const sortedLeadweight = Object.fromEntries(
  Object.entries(LeadWeights).sort((a, b) => a[1] - b[1]),
);

export { LeadWeightsSum, sortedLeadweight };
