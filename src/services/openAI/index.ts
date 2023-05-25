const { Configuration, OpenAIApi } = require('openai')
const dotenv = require('dotenv')

dotenv.config()

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default openai
