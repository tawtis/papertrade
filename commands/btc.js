const Discord = require('discord.js');

    module.exports = {
    run:  async function doshit(message) {
    const api_url = (`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
    const response = await fetch(api_url);
    const data = await response.json();
    const { bitcoin } = data
    const change = parseFloat(bitcoin.usd_24h_change).toFixed(2);
    const vol = parseFloat(bitcoin.usd_24h_vol).toFixed(0);
    const priceEmbed = new Discord.MessageEmbed()
        .setColor('ffff00')
        .setTitle('Bitcoin Live Statistics')
        .addFields(
            {name: 'Price', value: `$${bitcoin.usd}`, inline: true},
            {name: '24h Change', value: `${change}%`, inline: true },
            {name: '24h Volume', value: `${vol}`, inline: true})
    return message.channel.send(priceEmbed)}}
