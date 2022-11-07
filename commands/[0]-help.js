const Discord = require("discord.js");
const config = require("../config");

module.exports = {
  name: "help",
  description: "help",
  aliases: ["h"],
  usage: "<prefix>help",
  enabled: true,
  developerOnly: false,
  cooldown: 1,
  /**@param {Discord.Message} messageCreate
   * @param {Array} args
   * @param {Discord.Client} client
   */
  execute(ctx, args, client, db) {
    if (
      db.get(`wl_${ctx.author.id}`) !== true &&
      !config.owners.includes(ctx.author.id)
    )
      return;

    let button1 = new Discord.MessageButton()
      .setCustomId("rjoinall")
      .setLabel("Instant Joinall")
      .setEmoji(config.emoji.userjoin)
      .setStyle("PRIMARY");

    let button2 = new Discord.MessageButton()
      .setCustomId("rusers")
      .setLabel("Users")
      .setEmoji(config.emoji.user)
      .setStyle("PRIMARY");

    let button3 = new Discord.MessageButton()
      .setCustomId("rlink")
      .setLabel("Link")
      .setEmoji(config.emoji.link)
      .setStyle("PRIMARY");

    let row = new Discord.MessageActionRow().addComponents(
      button1,
      button2,
      button3
    );

    ctx.channel.send({
      components: [row],
      embeds: [
        {
          color: "2F3136",
          title: `${config.emoji.user} OAuth2 Dashboard`,
        /*  image: {
            url: "https://media.discordapp.net/attachments/1009941475099951124/1013237078819078245/Server_Banner_Very_Simple.png?width=691&height=389",
          },*/
          description: `**${config.emoji.point2} OAuth2**\n[\`users\`](${config.supportServer}), [\`join\`](${config.supportServer}),  [\`joinall\`](${config.supportServer})\n\n${config.emoji.point2} **Whitelist**\n[\`wl add\`](${config.supportServer}), [\`wl remove\`](${config.supportServer}), [\`wl list\`](${config.supportServer})\n\n${config.emoji.point2} **General**:\n [\`link\`](${config.supportServer}), [\`check\`](${config.supportServer}), [\`claim\`](${config.supportServer}), [\`list\`](${config.supportServer})\n\n**Prefix** [\`\` ${config.prefix} \`\`](${config.supportServer})\n${config.emoji.info} *for the advanced management panel:* \`\`\`${config.prefix}settings\`\`\``,
          footer: {
            text: `${config.developerName} ・ OAuth Bot V4 ・ ${config.supportServer}`,
            icon_url: `https://cdn.discordapp.com/attachments/1004838076994035747/1005211367994830888/da9befcfe0c0796be1e0d1ee66b15d6c.png`,
          },
        },
      ],
    });
  },
};
