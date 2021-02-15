const Discord = require("discord.js");
const { staff } = require(`../config.js`);
const moment = require("moment");
const fs = require("fs");
const bdd = require('../bdd.json');



 
exports.run = (client, message, args) => {
    let PREFIX =';'
    if (message.channel.type === "dm") return;
    const prefix = bdd[message.guild.id + " prefix"]
    if(prefix) PREFIX = prefix
    const guild = message.guild;

    

    
    

    if (args[0] || args[1 == "help"])
        return message.reply("Syntaxe: **" + PREFIX + "**`serv-info`")
        const embed = new Discord.MessageEmbed()
        .setTitle('Information sur le serveur')
        .setColor("#0bedfa")
        .setTimestamp()
        .addField(`• **Nom**: ${guild.name}`,
         `• **Serveur ID**: \`${guild.id}\`
         • **Owner**: ${guild.owner} / **ID utilisateur**: (\`${guild.ownerID}\`)
         • **Nombre de channel**: \`${guild.channels.cache.size}\`
         • **Nombre de rôle**: \`${guild.roles.cache.size}\`
         • **Nombre de membre**: \`${guild.members.cache.size}\`
         • **Nombre d'émoji**: \`${guild.emojis.cache.size}\`
         • **Nombre de membre en ligne**: \`RIEN\`
         `
        )
        

        message.channel.send(embed)
       

    //let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

    //prefixes[message.guid.id] = {
        //prefixes: args[0]
    //}

    //fs.writeFile("./prefixes.json", JSON.stringify(prefixes), err => {
      //  if (err) console.log(err)
    //})
    message.delete()
    

    console.log('[' + PREFIX + "]serv : utiliser par => " + message.author.username + " sur ' " + guild.name +" ' !")
};

module.exports.help = {
    name: "serv"
};