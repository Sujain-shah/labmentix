export const reviewCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        message: "Language and code are required",
      });
    }

    let suggestions = [];

    // Basic Static Analysis
    if (code.includes("var ")) {
      suggestions.push(
        "Avoid using 'var'. Use 'let' or 'const' instead."
      );
    }

    if (code.includes("console.log")) {
      suggestions.push(
        "Remove console.log statements before production."
      );
    }

    if (code.length < 20) {
      suggestions.push(
        "Code is too short for meaningful analysis."
      );
    }

    if (suggestions.length === 0) {
      suggestions.push(
        "No obvious issues found. Great job!"
      );
    }

    return res.json({
      success: true,
      language,
      suggestions,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};