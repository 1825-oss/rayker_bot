const Discord = require('discord.js');
const {staff} = require('../config.js'); 
const bdd = require('../bdd.json');


module.exports.run = async (client, message, args) => {
    let PREFIX =';'
    const prefix = bdd[message.guild.id + " prefix"]
    if(prefix) PREFIX = prefix
    const cmb = require('../cmb.json')
    message.delete()
    message.channel.send("test");
    client.channels.cache.get(cmb).send('ceci est un test, **Cordialement Blackknight**')
    
};

module.exports.help = {
    name: 'dev'
};