import axios from "axios";

export const aiReview = async (req, res) => {
  try {
    console.log("===== AI API HIT =====");

    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    console.log("API Key Exists:", !!process.env.OPENROUTER_API_KEY);

    const prompt = `
You are a Senior Software Engineer.

Review the following ${language} code.

Return your response in Markdown.

Include:

## Bugs
## Performance Improvements
## Security Issues
## Best Practices
## Refactoring Suggestions
## Code Explanation

Code:
${code}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "cohere/north-mini-code:free",
        console.log(response.data);
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://labmentix.vercel.app",
          "X-Title": "AI Code Review Assistant",
        },
      }
    );

    console.log("OPENROUTER RESPONSE:");
    console.log(JSON.stringify(response.data, null, 2));

    return res.json({
      success: true,
      review: response.data.choices[0].message.content,
    });

  } catch (error) {
    console.log("===== AI ERROR =====");
    console.log(error.response?.status);
    console.log(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "AI Review Failed",
      error: error.response?.data || error.message,
    });
  }
};