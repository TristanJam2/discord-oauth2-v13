const Discord = require("discord.js");
const config = require("../config");

const fs = require('fs')

module.exports = {
  name: 'list',
  description: 'list',
  aliases: [],
  usage: '<prefix>list',
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
      let listData = data.map((value, index) => `\`\` ${index + 1} \`\` \`\` ${value.username}#${value.discriminator} \`\` - \`\` ${value.id} \`\` - ${value.locale ? value.locale : ":flag_us:"}`)

      let page = 0;
      let pages = Math.ceil(listData.length / 10);

      let slicedData = listData.slice(page * 10, (page +1) * 10);

      const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('previous')
          .setLabel("◀")
          .setStyle('PRIMARY')
          .setDisabled(page === 0),
        new Discord.MessageButton()
          .setCustomId('next')
          .setLabel("▶")
          .setStyle('PRIMARY')
          .setDisabled(page === pages - 1),
      );

      ctx.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("2F3136")
            .setDescription(slicedData.join("\n"))
            .setFooter({ text: `Page ${page + 1} of ${pages} | We have ${data.length} members` })

        ]
      }).then(async (msg) => {

        if (data.length > 10) {
          msg.edit({ components: [row2] })
        }

        var iFilter = x => x.user.id === ctx.author.id;
        const collector = msg.createMessageComponentCollector({ filter: iFilter, componentType: "BUTTON", time: 30000 })

        collector.on('collect', async (interaction) => {

          if(interaction.customId == "next") {

            page++;
            slicedData = listData.slice(page * 10, (page + 1) * 10);
            let embed = msg.embeds[0];
            embed.setDescription(slicedData.join("\n"));
            msg.edit({ embeds: [embed]})
            row.components[0].setDisabled(page === 0);
            row.components[1].setDisabled(page === pages - 1);
            
          } else if(interaction.customId == "previous") {
            
            page--;
            slicedData = listData.slice(page * 10, (page - 1) * 10);
            let embed = msg.embeds[0];
            embed.setDescription(slicedData.join("\n"));
            msg.edit({ embeds: [embed]})
            row.components[0].setDisabled(page === 0);
            row.components[1].setDisabled(page === pages - 1);
          }

          collector.on('end', async () => {

            row.components[0].disabled(true)
            row.components[1].disabled(true)

          })

        })

      })



  },
};