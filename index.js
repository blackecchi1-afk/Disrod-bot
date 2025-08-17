import { Client, GatewayIntentBits, Partials, Events } from 'discord.js';
import express from 'express';
import http from 'http';
import { setupRoleHistory } from './role-historii.js';

const app = express();
app.get('/', (req, res) => res.send('Bot działa!'));

function startServer(port = 3000) {
  const server = http.createServer(app);
  server.listen(port)
    .on('listening', () => {
      console.log(`🌐 Serwer Express działa na porcie ${port}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} zajęty, próbuję ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error(err);
      }
    });
}

startServer();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.GuildMember]
});

// Wywołanie funkcji historii roli
setupRoleHistory(client);

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot online jako ${client.user.tag}`);
});

// Logowanie bota
client.login(process.env.BOT_TOKEN);
