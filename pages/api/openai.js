const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async (req, res) => {
  // Constructing the prompt
  let prompt = `${req.body.name}`;

  // Logging the promt
  console.log(prompt);

  // Call API*
  const openai = new OpenAIApi(configuration);

  const gptResponse = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${prompt}`,
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  best_of: 1,
  });

  res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
};
