const express = require('express');
const cors = require('cors');
const openai = require('openai');
require('dotenv').config();

const openaiApi = new openai.OpenAIApi(new openai.Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CoderX'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openaiApi.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0
    });
    res.status(200).send({
      bot: response.data.choices[0].text
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
})

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on port http://localhost:${process.env.SERVER_PORT}`));