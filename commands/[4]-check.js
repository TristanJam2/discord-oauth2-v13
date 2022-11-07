const Discord = require("discord.js");
const config = require("../config");

module.exports = {
	name: 'check',
	description: 'check',
	aliases: [],
	usage: '<prefix>check',
    enabled: true,
    developerOnly: false,
    cooldown: 1,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	async execute(ctx, args, client, db) {

    if (db.get(`wl_${ctx.author.id}`) !== true && !config.owners.includes(ctx.author.id)) return;

    const embed = new Discord.MessageEmbed()
      .setColor("#2F3136")
      .setDescription(' ' + config.emoji.error2 + 'Mentioned users is not verified \n\n' + config.emoji.info + '*__How to verify?__*\n' + config.emoji.arrow + '`Click on the Verify button and authorize yourself.`')
    let btn = new Discord.MessageButton()
      .setStyle("LINK")
      .setURL(config.authLink)
      .setLabel("Verify");
    const row = new Discord.MessageActionRow()
      .addComponents([btn]);
    ctx.channel.send({ components: [row], embeds: [embed] })
    
	},
};