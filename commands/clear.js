const Discord = require("discord.js");
const bdd = require('../bdd.json');
let PREFIX =';'

module.exports.run = (client, message, args) => {
    
    const prefix = bdd[message.guild.id + " prefix"]
    if(prefix) PREFIX = prefix
    message.delete();
    if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) { return message.channel.send('Vous n\'avez pas la permission !'); }
    
    if (!args[0]) { return message.channel.send('Vous devez spécifier un nombre de messages à supprimer !'); }
    else if (isNaN(args[0])) { return message.channel.send('Veuillez spécifier un nombre !'); }
    const guild = message.guild;
    message.channel.bulkDelete(args[0])
    
    message.channel.send(`**${args[0]}** messages ont été supprimés !`)
     .then(message => {
        setTimeout(() => {
            message.delete();
        }, 5000);
    console.log(`${message.author.username} a suprimée ${args[0]} message(s) dans [${message.channel.name}] sur ${guild.name}`);

    const embed = new Discord.MessageEmbed()
    .setTitle('Clear')
    .setTimestamp()
    .setDescription(`**${args[0]}** messages ont été supprimés dans ${message.channel.name} !`)

    client.channels.cache.get(bdd[message.guild.id + ' logs']).send(embed)
})};








module.exports.help = {
    name: 'clear'
};

