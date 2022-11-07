const Discord = require("discord.js");
const config = require("../config");

const fs = require('fs')

module.exports = {
	name: 'user',
	description: 'user',
	aliases: ['users'],
	usage: '<prefix>user',
    enabled: true,
    developerOnly: false,
    cooldown: 1,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(ctx, args, client, db) {

     if (db.get(`wl_${ctx.author.id}`) !== true && !config.owners.includes(ctx.author.id)) return;

      let data = global.jsonDB.get('auths') || [];
      return ctx.channel.send({
        embeds: [{
          title: config.emoji.user + ' OAuth2 Users:',
          description: `There are ${data > 1 ? `\`${data.length}\`` : `\`${data.length}\``} members\nType command \`link\` to check your OAuth2 link`,
          color: "2F3136",
          footer: {
            "text": `${config.developerName} ・ OAuth Bot V4 ・ ${config.supportServer}`,
            "icon_url": `https://cdn.discordapp.com/attachments/1004838076994035747/1005211367994830888/da9befcfe0c0796be1e0d1ee66b15d6c.png`
          }

        }]
      })
    

	},
};