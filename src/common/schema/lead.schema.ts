import * as z from "zod";

export const leadSchema = z.object({
  termination: z.object({
    percentageRefund: z.number(),
  }),
  requirements: z.object({
    budget: z.number(),
    timeFrame: z.number(),
    desires: z.array(z.string()),
  }),
  blockers: z.object({
    needs: z.array(z.string()),
    problems: z.array(z.string()),
    situation: z.array(z.string()),
  }),
  clientInfo: z.object({
    location: z.string(),
    industry: z.string(),
    companySize: z.number(),
    authority: z.object({
      activeInfluencers: z.array(
        z.object({
          name: z.string(),
          position: z.string(),
        }),
      ),
      stakeHolders: z.array(
        z.object({
          name: z.string(),
          position: z.string(),
        }),
      ),
    }),
    intelletualProperty: z.string(),
  }),
});

export type LeadInput = z.infer<typeof leadSchema>;
