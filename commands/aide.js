const Discord = require('discord.js');
const {staff, BOT} = require('../config.js'); 

module.exports.run = async (client, message, args) => {
    const guild = message.guild;
    messageToBot = args.join(" ");
    message.delete().catch();
    message.channel.send("Je viens de contacter " + staff + " pour ce(s) problème(s) : **" + messageToBot + "** | Par " + BOT);
    message.author.createDM(599862098255806464).then(channel => {
        channel.send(`${message.author.username} a besoin d'aide sur ${guild.name} pour : ${messageToBot}`)

    });
};

module.exports.help = {
    name: 'aide'
};