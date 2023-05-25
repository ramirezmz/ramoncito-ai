const { OpenAi } = require('./services/openAI')
const Discord = require('./services/discord')


Discord.client.on('messageCreate', async (message: any) => {
  if (message.author.bot) return;
  if (message.channelId !== '1108763876549476423') return;
  if (message.content.startsWith('!')) return;

  try {
    await message.channel.sendTyping()

    let prevMessages = await message.channel.messages.fetch({ limit: 100 })
    prevMessages.sort((a: any, b: any) => a - b)

    let conversationLog = ""

    prevMessages.forEach((message: any) => {
      if (message.content.startsWith('!')) return

      conversationLog += `\n${message.author.username}: ${message.content}`
    })

    const result = await OpenAi.createCompletion({
      model: 'text-davinci-003',
      max_tokens: 64,
      temperature: 0.6,
      top_p: 1.0,
      prompt: `${Discord.client.user.username} is a friendly chatbot.
      ${Discord.client.user.username}: Hello, how can I help you?
      ${conversationLog}
      ${Discord.client.user.username}:
      `
    })
    message.reply(result.data.choices[0].text)
  } catch (error) {
    console.log(`Deu ruim, ${error}`);
  }
})
