import { tool as createTool, UITools } from "ai";
import { z } from "zod";

const dayCardTool = createTool({
  description: "Display a day card for a given date",
  inputSchema: z.object({
    date: z.string().describe("The date to display the card for"),
  }),
  execute: async ({ date }) => {
    // const dayCard = await getDayCard(date); // A request
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      date,
      temperature: 75,
      label: "Day card for " + date,
    };
  },
});

export const tools = {
  displayDayCard: dayCardTool,
};