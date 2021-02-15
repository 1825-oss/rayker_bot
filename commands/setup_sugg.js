const Discord = require("discord.js");
const bdd = require('../bdd.json');
const fs = require('fs');

function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
      if (err) message.channel.send("Une erreur est survenue");
    });
  }



exports.run = (client, message, args) => {


    const guild = message.guild;
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous ne pouvez pas faire cela"), message.delete();
    if(message.content.length === 12) return message.channel.send('Veuillez specifiez l\'identifiant du salon'), message.delete();
          if(message.content.length > 12)
          message.delete();
    mp = message.content.slice(12)
          console.log('Salon des suggestions modifier  par '+ message.author.username + ' sur ' + guild.name + ' est en <#' + mp + '>');
          bdd[message.guild.id + " sugg"] = mp
          Savebdd()
          return (message.channel.send('**Salon des suggestions modifier par ' + message.author.username + '  en** <#' + mp + '>'))


}

module.exports.help = {
    name: "setup-sugg"
}