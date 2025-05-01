export const Response = async (userInput: string): Promise<string> => {
  try {
    const response = await fetch('https://vedawell.onrender.com/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userInput }),
    });

    const data = await response.json();

    // Assuming your API returns { answer: "..." }
    return data.answer || 'Sorry, I could not understand that.';
  } catch (error) {
    console.error('API error:', error);
    return 'Sorry, there was a problem connecting to the server.';
  }
};
