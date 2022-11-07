const Discord = require("discord.js");
const config = require("../config");

const fs = require('fs')

module.exports = {
  name: 'link',
  description: 'link',
  aliases: ['links'],
  usage: '<prefix>links',
  enabled: true,
  developerOnly: false,
  cooldown: 1,
  /**@param {Discord.Message} messageCreate
   * @param {Array} args
   * @param {Discord.Client} client
   */
  execute(ctx, args, client, db) {

    if (db.get(`wl_${ctx.author.id}`) !== true && !config.owners.includes(ctx.author.id)) return;
    ctx.channel.send({
      embeds: [{
        title: `${config.emoji.link} OAuth/Invite`,
        description: `${config.emoji.point2} ** Your OAuth2 Link:** ${config.authLink}\n\`\`\`${config.authLink}\`\`\`\n${config.emoji.point2} **Bot Invite:** https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\n \`\`\`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\`\`\` `,
        color: "2F3136",
        footer: {
          "text": `${config.developerName} ・ OAuth Bot V4 ・ ${config.supportServer}`,
          "icon_url": `https://cdn.discordapp.com/attachments/1004838076994035747/1005211367994830888/da9befcfe0c0796be1e0d1ee66b15d6c.png`

        }
      }]

    })

  },
};