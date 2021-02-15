const Discord = require('discord.js');
const bdd = require('../bdd.json');

module.exports = async(client, message) => {
    const guild = message.guild;
    let PREFIX = ';'
    if (message.channel.type === "dm") return;
    const prefix = bdd[message.guild.id + " prefix"]
    if(prefix) PREFIX = prefix
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const commande = args.shift();
    const cmd = client.commands.get(commande);

    if (!cmd) return;

    return cmd.run(client, message, args);
};