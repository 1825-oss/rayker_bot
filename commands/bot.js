const Discord = require("discord.js");
const bdd = require('../bdd.json');
const { staff } = require("../config.js");




exports.run = (client, message, args) => {
    let PREFIX =';'
    const prefix = bdd[message.guild.id + " prefix"]
    if(prefix) PREFIX = prefix
    message.delete();
    var embed = new Discord.MessageEmbed()
    .setAuthor(`Invitation du Bot`)
    .setColor("#ff0000")
    .setDescription(`Pour inviter **Rayker** sur ton serveur [voici le lien](https://discord.com/oauth2/authorize?client_id=795749766381699073&scope=bot&permissions=2147483647)`)
    .setTimestamp()
    .setFooter(message.author.username, client.user.avatarURL());
    

    message.channel.send(embed)
    .then(message => {
        setTimeout(() => {
            message.delete();
        }, 20000);
    });
   
}

module.exports.help = {
    name: "bot"
}