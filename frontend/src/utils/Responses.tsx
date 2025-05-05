export const Response = async (userInput: string): Promise<string> => {
  try {
    const normalizedInput = userInput.toLowerCase().trim();

    // Check for greetings
    const greetings = ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening'];
    if (greetings.some((greet) => normalizedInput.startsWith(greet))) {
      const dummyGreetings = [
        "Namaste! How can I guide you in your wellness journey?",
        "Hello there! Ask me anything about Ayurveda.",
        "Greetings! I'm here to help you explore ancient wisdom.",
        "Hey! Ready to discover Ayurvedic insights?",
      ];

      // Delay for 1 second before returning a greeting
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return dummyGreetings[Math.floor(Math.random() * dummyGreetings.length)];
    }

    // API call for non-greetings
    const response = await fetch('https://vedawell.onrender.com/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userInput }),
    });

    const data = await response.json();
    return data.answer || 'Sorry, I could not understand that.';
  } catch (error) {
    console.error('API error:', error);
    return 'Sorry, there was a problem connecting to the server.';
  }
};
