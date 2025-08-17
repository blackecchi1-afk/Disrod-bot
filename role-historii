import { Events, EmbedBuilder } from 'discord.js';

export function setupRoleHistory(client) {
  const HISTORIA_CHANNEL_ID = '1397991865613287485';

  const trackedRoles = {
    '1384953903275053076': { title: '', description: '', color: '', image: '', footer: '' },
    '1384954393182339132': { title: '', description: '', color: '', image: '', footer: '' },
    '1384954839632445561': { title: '', description: '', color: '', image: '', footer: '' },
    '1398603882434658344': { title: '', description: '', color: '', image: '', footer: '' },
    '1384955625561395220': { title: '', description: '', color: '', image: '', footer: '' },
    '1384955525837361262': { title: '', description: '', color: '', image: '', footer: '' },
    '1384954533003923609': { title: '', description: '', color: '', image: '', footer: '' },
    '1384955257548836935': { title: '', description: '', color: '', image: '', footer: '' },
    '1384954327084302446': { title: '', description: '', color: '', image: '', footer: '' },
    '1384954624720502884': { title: '', description: '', color: '', image: '', footer: '' },
    '1398603908686942208': { title: '', description: '', color: '', image: '', footer: '' },
    '1398603912944025681': { title: '', description: '', color: '', image: '', footer: '' },
    '1398603919684403250': { title: '', description: '', color: '', image: '', footer: '' },
    '1398603923605950567': { title: '', description: '', color: '', image: '', footer: '' },
    '1398603929109004420': { title: '', description: '', color: '', image: '', footer: '' },
    '1398603932996993077': { title: '', description: '', color: '', image: '', footer: '' },
    '1384955711120736276': { title: '', description: '', color: '', image: '', footer: '' },
    '1384961319710621726': { title: '', description: '', color: '', image: '', footer: '' },
    '1398603936889307196': { title: '', description: '', color: '', image: '', footer: '' },
    '1384955885436141590': { title: '', description: '', color: '', image: '', footer: '' },
  };

  const PREFIX = '/';

  // Funkcja wysyłająca embed dla danej roli
  async function sendRoleHistory(member, roleId) {
    const data = trackedRoles[roleId];
    if (!data) return;

    const embed = new EmbedBuilder()
      .setTitle(data.title || 'Brak tytułu')
      .setDescription(data.description || 'Brak opisu')
      .setColor(data.color || '#FF6F59')
      .setImage(data.image || '')
      .setFooter({ text: data.footer || '' })
      .setTimestamp();

    const channel = await client.channels.fetch(HISTORIA_CHANNEL_ID).catch(() => null);
    if (!channel) return;

    await channel.send({ content: `<@${member.id}>`, embeds: [embed] });
  }

  // Nasłuch zmian ról
  client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    for (const [roleId] of addedRoles) {
      await sendRoleHistory(newMember, roleId);
    }
  });

  // Przy dołączeniu nowego członka
  client.on(Events.GuildMemberAdd, async (member) => {
    for (const roleId of member.roles.cache.keys()) {
      await sendRoleHistory(member, roleId);
    }
  });

  // Komenda do ustawiania historii ról
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const [command, ...args] = message.content.trim().substring(PREFIX.length).split(' ');

    if (command === 'addrolehistory') {
      const [roleID, ...rest] = args;
      const parts = rest.join(' ').split('|').map(p => p.trim());

      if (parts.length !== 4) {
        return message.reply('Poprawny format: /addrolehistory <roleID> <title> | <description> | <imageURL> | <footer>');
      }

      const [title, description, image, footer] = parts;

      trackedRoles[roleID] = { title, description, image, footer, color: '#FF6F59' };
      message.reply(`✅ Historia dla roli \`${roleID}\` została ustawiona.`);
    }
  });
}
