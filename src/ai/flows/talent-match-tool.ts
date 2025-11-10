'use server';

/**
 * @fileOverview AI-powered talent matching tool for brand managers.
 *
 * - talentMatchTool - A function that takes in aesthetic preferences and budget, and returns a list of talent suggestions.
 * - TalentMatchInput - The input type for the talentMatchTool function.
 * - TalentMatchOutput - The return type for the talentMatchTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TalentMatchInputSchema = z.object({
  aestheticPreferences: z
    .string()
    .describe('A description of the desired aesthetic for the talent.'),
  budget: z.string().describe('The budget for the campaign.'),
});
export type TalentMatchInput = z.infer<typeof TalentMatchInputSchema>;

const TalentMatchOutputSchema = z.object({
  talentSuggestions: z
    .string()
    .describe(
      'A list of talent suggestions based on the aesthetic preferences and budget.'
    ),
});
export type TalentMatchOutput = z.infer<typeof TalentMatchOutputSchema>;

export async function talentMatchTool(input: TalentMatchInput): Promise<TalentMatchOutput> {
  return talentMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'talentMatchPrompt',
  input: {schema: TalentMatchInputSchema},
  output: {schema: TalentMatchOutputSchema},
  prompt: `You are a talent scout. You will provide a list of talent suggestions based on the aesthetic preferences and budget provided by the brand manager.

Aesthetic Preferences: {{{aestheticPreferences}}}
Budget: {{{budget}}}`,
});

const talentMatchFlow = ai.defineFlow(
  {
    name: 'talentMatchFlow',
    inputSchema: TalentMatchInputSchema,
    outputSchema: TalentMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
