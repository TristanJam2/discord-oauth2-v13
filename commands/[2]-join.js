const Discord = require("discord.js");
const config = require("../config");

const fs = require('fs')

module.exports = {
  name: 'join',
  description: 'join',
  aliases: ['pull'],
  usage: '<prefix>join',
  enabled: true,
  developerOnly: false,
  cooldown: 1,
  /**@param {Discord.Message} messageCreate
   * @param {Array} args
   * @param {Discord.Client} client
   */
  async execute(ctx, args, client, db) {

    if (db.get(`wl_${ctx.author.id}`) !== true && !config.owners.includes(ctx.author.id)) return;

    let amt = parseInt(args[0]);

    let data = global.jsonDB.get('auths') || [];

      if (!amt || amt <= 0) return await ctx.channel.send("Please write join amount " + config.prefix + "join 100")

      try {

        if (data.length < amt) return await ctx.channel.send("Not enough users! Attempting to add " + data.length + " (max) users.")

        let msg = await ctx.channel.send({
          content: `${config.emoji.load} ** Joining users...** (\`0\`/${amt ? `\`${args[0]}\`` : `\`${args[0]}\``})`
        })

        const inter = setInterval(async () => {
          msg.edit({
            content: `${config.emoji.load} **Joining users...** (\`${success}\`/${amt ? `\`${args[0]}\`` : `\`${args[0]}\``})`
          })
        }, 10000)

        let json = data

        let error = 0;
        let success = 0;
        let already_joined = 0;
        let i = 0

        while (amt > 0) {

          let user = await client.users.fetch(json[i].id).catch(() => { })
          i++
          if (ctx.guild.members.cache.get(json[i].id)) {
            already_joined++
          }
          await ctx.guild.members.add(user, { accessToken: json[i].accessToken }).catch(() => {
            error++
          })
          success++

          amt--

        }

        clearInterval(inter);

        await msg.edit({
          embeds: [{
            title: `${config.emoji.user} OAuth2 Join`,
            description: `${config.emoji.new} **Already in server** : ${already_joined}\n${config.emoji.success} **Success**: ${success - error}\n${config.emoji.error} **Error**: ${error}`,
            footer: {
              "text": `${config.developerName} ・ ${config.footer} ・ ${config.supportServer}`,
              "icon_url": `https://cdn.discordapp.com/attachments/1004838076994035747/1005211367994830888/da9befcfe0c0796be1e0d1ee66b15d6c.png`

            },
            color: "2F3136"
          }]
        }).catch(() => { })
      } catch {

      }

  },
};