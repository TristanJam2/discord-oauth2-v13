const Discord = require("discord.js");
const config = require("../config");

const fs = require('fs')

module.exports = {
  name: 'joinall',
  description: 'joinall',
  aliases: ['pullall'],
  usage: '<prefix>joinall',
  enabled: true,
  developerOnly: false,
  cooldown: 1,
  /**@param {Discord.Message} messageCreate
   * @param {Array} args
   * @param {Discord.Client} client
   */
  async execute(ctx, args, client, db) {

    if (db.get(`wl_${ctx.author.id}`) !== true && !config.owners.includes(ctx.author.id)) return;

    let data = global.jsonDB.get('auths') || [];

      let msg = await ctx.channel.send({
        content: `${config.emoji.load} ** Joining users...** (\`0\`/${data.length > 1 ? `\`${data.length}\`` : `\`${data.length}\``})`
      })


      const inter = setInterval(async () => {
        msg.edit({
          content: `${config.emoji.load} **Joining users...** (\`${success}\`/${data.length > 1 ? `\`${data.length}\`` : `\`${data.length}\``})`
        })
      }, 10000);

      let json = data;
      let error = 0;
      let success = 0;
      let already_joined = 0;
      for (const i of json) {
        const user = await client.users.fetch(i.id).catch(() => { });
        if (ctx.guild.members.cache.get(i.id)) {
          already_joined++
        }
        await ctx.guild.members.add(user, { accessToken: i.accessToken }).catch(() => {
          error++
        })
        success++
      }

      clearInterval(inter);

      await msg.edit({
        embeds: [{
          title: `${config.emoji.user} OAuth2 Joinall`,
          description: `${config.emoji.new} **Already in server** : ${already_joined}\n${config.emoji.success} **Success**: ${success}\n${config.emoji.error} **Error**: ${error}`,
          footer: {
            "text": `${config.developerName} ・ OAuth Bot V4 ・ ${config.supportServer}`,
            "icon_url": `https://cdn.discordapp.com/attachments/1004838076994035747/1005211367994830888/da9befcfe0c0796be1e0d1ee66b15d6c.png`

          },
          color: "2F3136"
        }]
      }).catch(() => { })
    
  },
};