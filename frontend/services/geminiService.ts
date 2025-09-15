import { GoogleGenAI } from "@google/genai";
import type { Project } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectReport = async (project: Project, refinementPrompt?: string): Promise<string> => {
  const projectData = {
    name: project.name,
    tasks: project.tasks.map(task => ({
      title: task.title,
      status: task.status,
      hasImage: !!task.imageUrl
    }))
  };

  let prompt = `
    You are a senior project management assistant. Based on the following project data in JSON format, generate a concise and professional status report.
    The report should include:
    1.  A brief overall summary of the project's status.
    2.  A list of completed tasks.
    3.  A list of tasks currently in progress.
    4.  A list of tasks that haven't been started.
    5.  Identify any potential risks or blockers (e.g., many tasks in 'To Do' and few in 'Done').
    6.  Suggest the next priority actions for the team.

    Note if a task has an image attached, as it might be a visual task (e.g., design, screenshot).

    Format the report using markdown with clear headings.

    Project Data:
    ${JSON.stringify(projectData, null, 2)}
  `;

  if (refinementPrompt) {
    prompt += `
      \n---
      A report has already been generated. Please refine it based on the following instructions. Generate a completely new report that incorporates these changes.
      
      Refinement Instructions: "${refinementPrompt}"
    `;
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating report:", error);
    return "An error occurred while generating the report. Please check the console for details.";
  }
};