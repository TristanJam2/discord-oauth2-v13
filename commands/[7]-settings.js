const Discord = require("discord.js");
const config = require("../config");

const fs = require('fs')

module.exports = {
  name: 'settings',
  description: 'settings',
  aliases: ['test'],
  usage: '<prefix>settings',
  enabled: true,
  developerOnly: false,
  cooldown: 1,
  /**@param {Discord.Message} messageCreate
   * @param {Array} args
   * @param {Discord.Client} client
   */
  async execute(ctx, args, client, db) {

    if (await db.get(`wl_${ctx.author.id}`) !== true && !config.owners.includes(ctx.author.id)) return;


    let row = new Discord.MessageActionRow()
      .addComponents(

        new Discord.MessageSelectMenu()
          .setCustomId('test')
          .setPlaceholder('Make a selection')
          .addOptions([
            {
              label: 'Configure Authorized Guilds',
              emoji: config.emoji.dotblue,
              value: 'authguild',
            },
            {
              label: 'Configure Auth Joiner',
              emoji: config.emoji.dotblue,
              value: 'authjoin',
            },
            {
              label: 'Configure Auth Messages',
              emoji: config.emoji.dotblue,
              value: 'authmessages',
            },
            {
              label: 'Configure Auth Roles',
              emoji: config.emoji.dotblue,
              value: 'authRole',
            }
          ]),

      )

    let authJoin = await db.get(`settings.authJoin`)

    let authRole = await db.get(`settings.authRole`)
    let authRoleName = await db.get(`settings.authRole.roleName`)
    let authRoleID = await db.get(`settings.authRole.roleID`)

    let authMessage = await db.get(`settings.authMessage`)
    let authMessages = await db.get(`settings.authMessage.message`)
    ctx.channel.send({
      components: [row],
      embeds: [{
        title: `Auths Client - Settings`,
        description: `${config.emoji.dotred} Block VPN and Proxies \`\`\` disabled\`\`\`
${config.emoji.dotblue} Redirect on authorize
\`\`\` ${config.client.redirect_uri}\`\`\`
${authJoin?.status === true ? config.emoji.dotgreen : config.emoji.dotred} Auth joiner on authorize
\`\`\`${authJoin?.status === true ? `Status: ${authJoin.status === true ? "enabled" : ""}\nMode: On first user authorize\nGuild: ${authJoin.guildName} (${authJoin.guildID})` : "disabled"}\`\`\`
${authMessage?.status === true ? config.emoji.dotgreen : config.emoji.dotred} Message on authorize
\`\`\`${authMessage?.status === true ? `Status: ${authMessage.status === true ? "enabled" : ""}\nMode: On first user authorize\nMessage: ${authMessages}` : "disabled"}\`\`\`
${authRole?.status === true ? config.emoji.dotgreen : config.emoji.dotred} Roles on authorize
\`\`\`${authRole?.status === true ? `Status: ${authRole.status === true ? "enabled" : ""}\nMode: On first user authorize\nGuild: ${client.guilds.cache.get(authRole.guildID).name || "Waiting roles"} (${client.guilds.cache.get(authRole.guildID).id || "Waiting roles"})\nRoles: ${authRoleName || "Waiting Roles"} (${authRoleID || "Waiting Roles"})` : "disabled"}\`\`\`
${config.emoji.dotblue} Soon
\`\`\` Auto Refresh, Refresh Command, New join & joinall command\`\`\``,
          thumbnail: "https://cdn.discordapp.com/avatars/995476386376585326/a4479e4b8e54b4e9b1e31173aa3535d8.webp",
        color: "2F3136",
        footer: { 
          "text": `${config.developerName} ・ OAuth Bot V4 ・ ${config.supportServer}`,
          "icon_url": `https://cdn.discordapp.com/attachments/1004838076994035747/1005211367994830888/da9befcfe0c0796be1e0d1ee66b15d6c.png`

        }
      }]

    })

  },
};