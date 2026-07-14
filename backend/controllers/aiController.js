import axios from "axios";

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
        // model: "openrouter/free",
        model: "cohere/north-mini-code:free",
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
        },
      }
    );

    return res.json({
      success: true,
      review: response.data.choices[0].message.content,
    });

  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "AI Review Failed",
    });
  }
};