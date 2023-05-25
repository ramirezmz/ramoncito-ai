const { Client, IntentsBitField } = require('discord.js');
const dotenv = require('dotenv')

dotenv.config()

const DISCORD_TOKEN = process.env.DISCORD_TOKEN

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
})
client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
})

client.login(DISCORD_TOKEN)

export default {
  client
}
