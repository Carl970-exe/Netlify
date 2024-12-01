const { Configuration, OpenAIApi } = require("openai");

// Initialize OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Add your OpenAI API key in Netlify environment variables
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event, context) => {
  const { topic } = event.queryStringParameters;

  if (!topic) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Topic is required as a query parameter." }),
    };
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give an inspiring quote about ${topic}.`,
      max_tokens: 60,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ quote: response.data.choices[0].text.trim() }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
