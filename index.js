const Discord = require('discord.js');
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
const fs = require('fs');
const {TOKEN} = require('./config.js');
const bdd = require("./bdd.json");
const cmb = require("./cmb.json");
const { BOT } = require('./config.js');
let PREFIX = ';'


client.login(process.env.TOKEN);

client.commands = new Discord.Collection();

console.log("Toutes les commandes on ete charger !")



fs.readdir("./commands/", (error, f) => {
  if(error) console.log(error);

  let commands = f.filter(f => f.split(".").pop() === "js");
  if(commands.length <= 0) return console.log("aucune commande trouvé dans le dossier");

  commands.forEach((f) => {
    let commands = require(`./commands/${f}`);
    console.log(`${f} commande chargée !`);
    client.commands.set(commands.help.name, commands);

  });
});

fs.readdir("./events/", (error, f) => {
  if(error) console.log(error);
  console.log(`${f.length} events en chargement`);

  f.forEach((f) => {
      const events = require(`./events/${f}`);
      const event = f.split(".")[0];
    console.log("Events Charger")
    client.on(event, events.bind(null, client));
  });

});


client.on("ready", async () => {
  console.log(`${client.user.tag} est on !`) 
  client.channels.cache.get("749193991077232720").send("[+] **Rayker ONLINE** [+]")
    .then(message => {
    setTimeout(() => {
        message.delete();
    }, 5000);
  });
  client.user.setStatus("dnd")
}, 100)


function Savebdd() {
  fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
    if (err) message.channel.send("Une erreur est survenue");
  });
}


function Savecmb() {
  fs.writeFile("./cmb.json", JSON.stringify(cmb, null, 4), (err) => {
    if (err) message.channel.send("Une erreur est survenue");
  });
}


client.on("message", message => {
  if (message.channel.type === "dm") return;
    const prefix = bdd[message.guild.id + " prefix"]
    if(prefix) PREFIX = prefix
      
    const guild = message.guild;
  
  

    


  // if(message.content == "join"){
  //   message.delete();
  //   message.channel.send("Validé")
  //   client.emit("guildMemberAdd", (message.member))}

    if(message.content.startsWith(PREFIX + "setup mb")){ 
      message.delete()
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous ne pouvez pas faire cela");
        if(message.content.length == 10) {message.channel.send('Veuillez specifiez votre nouveau message de bienvenue')}
        if(message.content.length == 12) {message.channel.send('Le message doit contenir minimum 2 lettres')}
        if(message.content.length > 12)
        {
        mb = message.content.slice(10)
        console.log('MB modifier  par '+ message.author.username + ' sur ' + guild.name + ' est en ' + mb);
        bdd[message.guild.id] = mb
        Savebdd()
        return (message.channel.send('**Message de bienvenue modifier par ' + message.author.username + ' executer avec succés et message modifier en ** `' + mb + '`'))
      }
    }
      if(message.content.startsWith(PREFIX + "setup cmb")){ 
        message.delete();
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous ne pouvez pas faire cela") ;
          if(message.content.length < 5) {message.channel.send('Veuillez specifiez l identifiant du salon')}
          if(message.content.length > 5) {
          m = message.content.slice(11)
          cmb[message.guild.id] = m
          Savecmb()
          return (message.channel.send('**Salon de bienvenue modifier par ' + message.author.username + ' executer avec succés et message modifier en ** <#' + m + '>'))
        }

        

      }

      if(message.content.startsWith(PREFIX + "setup prefix")){ 
        
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous ne pouvez pas faire cela"), message.delete();
          if(message.content.length === 13) return message.channel.send('Veuillez specifiez votre nouveau prefix')
          if(message.content.length > 13)
          message.delete();
          {
          mp = message.content.slice(14)
          console.log('Prefix modifier  par '+ message.author.username + ' sur ' + guild.name + ' est en [' + mp + ']');
          bdd[message.guild.id + " prefix"] = mp
          Savebdd()
          return (message.channel.send('**Prefix modifier par ' + message.author.username + '  en** ' + mp))
        }
        
    }
    if(message.content.startsWith(PREFIX + "setup logs")){ 
        
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous ne pouvez pas faire cela"), message.delete();
        if(message.content.length === 12) return message.channel.send('Veuillez specifiez l\'identifiant du salon de logs'), message.delete();
        if(message.content.length > 12)
        message.delete();
        { mp = message.content.slice(12)
        console.log('Salon logs modifier  par '+ message.author.username + ' sur ' + guild.name + ' est en [' + mp + ']');
        bdd[message.guild.id + " logs"] = mp
        Savebdd()
        return (message.channel.send('**Salon logs modifier par ' + message.author.username + '  en** ' + ' <#' + mp + '>'))
        }}
})
    

  


 client.on("guildMemberAdd", (member) => {
   const guild = message.guild;
     if(cmb[member.guild.id] && bdd[member.guild.id]){
        client.channels.cache.get(cmb[member.guild.id]).send(`${bdd[member.guild.id]} [${member.user.username}]`)
        //console.log(client.channels.cache.get("749193990808535130").send(bdd["msg-bienvenue"] + `[${member.username}]`))
      }
      else client.channels.cache.get(cmb[member.guild.id]).send('Bienvenue sur le serveur ' + member ` nous somme maintenant ${guild.members.chache.size} !`)
   })

  client.on("messageUpdate", (oldMessage, newMessage) => {
    
      if (newMessage.author.bot) return;
    const EmbedUpdate = new Discord.MessageEmbed()
      .setTitle('Update Message')
      .setDescription(`**Ancien :** ${oldMessage}\n**Nouveau :** ${newMessage}\n**Auteur :** ${newMessage.author.username}`)
      .setTimestamp()
      .setColor('#17b91f')
      if(bdd[newMessage.guild.id + ' logs']){
      client.channels.cache.get(bdd[newMessage.guild.id + " logs"]).send(EmbedUpdate);
     }
     else(newMessage.channel.send('Veuillez configurer le salon logs !'))
  })
  


  client.on("messageDelete", (message) =>{
    const embed = new Discord.MessageEmbed()
    .setTitle('Message Delete')
    .setDescription(`**Auteur :** ${message.author.username}\n**Channel :** ${message.channel.name} \n**Message :** ${message}`)
    if(bdd[message.guild.id + ' logs']){
      client.channels.cache.get(bdd[message.guild.id + ' logs']).send(embed)
    }
    else(message.channel.send('Veuillez configurer le salon logs !'))
  })

  /*client.on("channelCreate", (channel) =>{
    const guild = channel.guild;
    const embed = new Discord.MessageEmbed()
    .setTitle('Channel Create')
    .setDescription(`**Auteur :** ${guild.author.uesrname} \n**Channel Name :** ${channel.name}`)
    if(bdd[channel.guild.id + ' logs']){
      client.channels.cache.get(bdd[channel.guild.id + ' logs']).send(embed)
    }
    else(message.channel.send('Veuillez configurer le salon logs !'))
  })
  */
  
//  client.on("message", message => {
//    if(message.content.startsWith(PREFIX + 'msg')){
//      message.delete();
//     if(bdd["msg-bienvenue"]){
//      message.channel.send(bdd["msg-bienvenue"] + ' ' +  cmb["ID-salon"]);
//      }
//      else {
//        message.channel.send('Veuillez setup le message de bienvenue en faisant `;`**mb** <message>')
//      }
//    }
//  })

//  client.on("message", message => {
//   if(message.content.startsWith(PREFIX + 'g')){
//     message.delete();
//    if(cmb["ID-salon"]){
//     message.channel.send(cmb["ID-salon"]);
//     }
//     else {
//       message.channel.send('Veuillez setup l identifieant en faisant `;`**cmb** <identifiant>')
//     }
//   }
// })

 client.on("message", (message) => {
  if (message.channel.type === "dm") return;
  const prefix = bdd[message.guild.id + " prefix"]
  if(prefix) PREFIX = prefix
   
   if(message.content.startsWith(PREFIX + "bienvenue")) {
     message.delete();

     if(cmb[message.guild.id] && bdd[message.guild.id]) {
      client.channels.cache.get(`${cmb[message.guild.id]}`).send(bdd[message.guild.id])
    }
     else(message.channel.send("Veuilez configurer l identifiant du salon en faisent : `" + PREFIX + '`cmb <identifiant> ou de faire `' + PREFIX + '`mb <msg de bienvenue> ou les deux'))
   }

   if(message.content.startsWith(PREFIX + 'prefix')) {
     message.delete();
     if(bdd[message.guild.id + " prefix"]) {
       message.channel.send("Le prefix de Rayker est " + bdd[message.guild.id + " prefix"])
     }
     else(message.channel.send("Veuillez mettre un prefix custom en faisant " + PREFIX + 'setup prefix <prefix>'))
   }

   if(message.content.startsWith(PREFIX + 'logs')) {
     message.delete();
     if(bdd[message.guild.id + ' logs']) {
       message.channel.send('**Le salon logs mit est :** <#' + bdd[message.guild.id + ' logs'] + '> .')
     }
     else(message.channel.send('Veuillez configurer le salon logs en faisant `' + PREFIX + '`**setup logs <identifiant du salon>**'))
   }

  //  if(message.content.startsWith('<@795749766381699073>')) {
  //    message.channel.send('Mon prefix sur ce serveur est :' + PREFIX)
   //}

    if(message.mentions.has(client.user.id)){
      message.channel.send(`Mon prefix sur ce serveur est : **${bdd[message.guild.id + ' prefix']}**`)
    }
 })