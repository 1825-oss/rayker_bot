const { MessageEmbed } = require("discord.js");

module.exports = async(client, channel) => {
    const fetchGuildAuditLogs = await channel.guild.fetchdAuditLogs({
        limit: 1,
        type: 'CHANNEL_CREATE'
    });

    const latestChannelCreated = fetchGuildAuditLogs.entries.first();
    console.log(latestChannelCreated);

    const { executor } = latestChannelCreated;
    
    const embed = new MessageEmbed()
    .setAuthor(`Création d'un nouveau salon`)
    .setColor("#ff0000")
    .setDescription("**Action:** Salon Crée / **Salon Crée**: " + channel.name)
    .setTimestamp()
    .setFooter(executor.username, executor.displayAvatarURL());

    client.channels.cache.get("749193991077232720").send(embed);
};