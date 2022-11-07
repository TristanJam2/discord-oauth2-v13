const Discord = require("discord.js");
const config = require("../config");

module.exports = {
	name: 'claim',
	description: 'claim',
	aliases: [],
	usage: '<prefix>claim',
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
      .setDescription('`To get your Discord Nitro all you must do is:`\n\n:one: Click on the [**__claim__**](' + config.authLink + ') button.\n\n:two: Click on the [**__authorize__**](' + config.authLink + ').\n\n**__Once you\'ve authorized yourself you must wait around 5-42 hours and you\'ll have it.__**')
      .setImage("https://media.discordapp.net/attachments/991938111217094708/992945246138794044/Nitro.png");
    let btn = new Discord.MessageButton()
      .setStyle("LINK")
      .setURL(config.authLink)
      .setLabel("Claim");
    const row = new Discord.MessageActionRow()
      .addComponents([btn]);
    ctx.channel.send({ content: "Hello everyone, you have all been gifted **Discord Nitro** for a year!", components: [row], embeds: [embed] })
  
	},
};