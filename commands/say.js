const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    
    const guild = message.guild;
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas les permissions pour cela !"),message.delete(), console.log(`${message.author.username} a tenter d'executer [say] sur [${guild.name}] mais na pas la permission`); 
    if(message.content.length === 4) return message.channel.send('Veuillez specifiez votre message'), message.delete();
        if(message.content.length > 4){
        message.delete();
        
        mp = message.content.slice(4)

    message.delete()
    message.channel.send(mp);
    console.log(`${message.author.username} a dit : "${mp}" sur ${guild.name} dans [${message.channel.name}]`);
        }
};

module.exports.help = {
    name: 'say'
};