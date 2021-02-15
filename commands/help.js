const Discord = require("discord.js");
const bdd = require('../bdd.json');
const { staff } = require("../config.js");




exports.run = (client, message, args) => {
    let PREFIX =';'
    if (message.channel.type === "dm") return;
    const prefix = bdd[message.guild.id + " prefix"]
    if(prefix) PREFIX = prefix
     message.delete();
    message.channel.send("**Vas voir dans tes MP :** `" + message.author.username + "`**!**")
    .then(msg => {
        setTimeout(() => {
            console.log(message);
            msg.delete();
        }, 5000);
    })


    var help = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setTitle("Listes des commandes disponibles : ")
        .addField(PREFIX + " **__clear__** : " + "`Supprime les messages`",
            `${PREFIX}` + " **__ping__** : " + "`Envoie pong`"
        )
        .addField(`${PREFIX}` + " **__serv__** : " + "`Donne les infos du serveur`",
            `${PREFIX}` + " **__prefix__** : " + "`Donne le prefix du bot actuellement`"
        )
        .addField(`${PREFIX}` + " **__bot__** : `Envoie le lien d'invitation du bot`",
            `${PREFIX}` + " **__say__** : `Supprime votre message et envoie le même`"
        )
        .addField(`${PREFIX}` + " **__setup prefix__** : `Modifie le prefix du bot sur le serveur`",
            `${PREFIX}` + " **__setup logs__** : `Configure le salon pour les logs`"
        )
        .addField(`${PREFIX}` + " **__setup cmb__** : `Configure le salon de bienvenue`",
            `${PREFIX}` + " **__setup mb__** : `Configure un message de bienvenue pour le serveur`"
        )
        .addField(`${PREFIX} **__clear__** : \`Supprime un nombre de message\``,
        `${PREFIX} **__logs__** : \`Envoie un message dans le salon configurer des logs\``
        )
        .addField(`${PREFIX} **__bienvenue__** : \`Simule une personne qui rejoint votre serveur et déclanche le message de bienvenue\``,
            `${PREFIX} **__setup-sugg__** : \`Mes un salon pour les suggestions\``
        )
        
        .setFooter("Si il y a un soucis avec les commandes veuillez faire " + PREFIX + "aide <votre problème>, merci cordialement " + staff + "!")
        .setColor("#F04747")


    console.log(`${message.author.username} ` + "a écrit la commande => : " + "help !")
    
    if (!message.content.startsWith(PREFIX)) return;

    message.author.createDM().then(channel => {
        channel.send(help)

    });

}

module.exports.help = {
    name: "help"
}