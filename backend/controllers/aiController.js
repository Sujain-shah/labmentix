import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const aiReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    const prompt = `
You are an expert Senior Software Engineer.

Analyze this ${language} code.

Return your response in this format:

## Bugs
- ...

## Performance Improvements
- ...

## Security Issues
- ...

## Best Practices
- ...

## Refactoring Suggestions
- ...

## Documentation
- Explain what the code does.
- Explain each function.
- Explain each class.
- Mention inputs and outputs.
- Give a short example.

Code:
${code}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return res.json({
      success: true,
      review: response.text,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI Review Failed",
    });
  }
};