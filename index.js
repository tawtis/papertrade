const Discord = require('discord.js');
const fs = require('fs');
const fetch = require("node-fetch");
const mongo = require('./mongo')
const userSchema = require('./schemas/user-schema')
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const Discord = require('discord.js');
const moment = require('moment');
const config = require('./config');
const client = new Discord.Client();
const fs = require("fs");
const Enmap = require("enmap");
client.config = config;
client.commands = new Enmap();


// Read events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split(".")[0];
    console.log(`LOADED: '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
  console.log("------------------------------------------------");
});

// Read commands
fs.readdir("./commands/", async (err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let cmdName = file.split(".")[0];
    console.log(`LOADED: '${cmdName}'`);
    client.commands.set(cmdName, props);
  });
  console.log("------------------------------------------------");
});

// Log UPRs
  process.on("unhandledRejection", (error) => {
  console.error("UNHANDLED PROMISE REJECTION:", error);
});
// END OF STARTUP PROCESS ---------------------------------------


// Connect to database
const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try{console.log('DB: Connected')}finally{mongoose.connection.close}})}

// Log information to database
async function insert(message, args){
    let id = args[0];
    let user = message.author.username;
    let userid = message.author.id;
    let capital = args[1];
    let assets = args.splice(2).join(" ")
    message.channel.send(`${user}`)
    message.channel.send(`${id}`);
    message.channel.send(`${userid}`)
    message.channel.send(`${capital}`)
    message.channel.send(`${assets}`)

// Define information per user
const user2 = {
    ID: `${id}`,
    User: `${user}`,
    UserID: `${userid}`,
    Capital: `${capital}`,
    Assets: `${assets}`
}
await new userSchema(user2).save()
console.log(`USER LOGGED: ${user}`)
message.channel.send("Data has been logged to the database")

if (!assets){
    return message.channel.send('Not enough info: $data <id> <capital> <assets>')
} else{
    const dataEmbed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle('Data')
    .addFields(
        {name: 'ID', value: `${id}`, inline: false},
        {name: 'User', value: `${user}`, inline: false},
        {name: 'UserID', value: `${userid}`, inline: false},
        {name: 'Capital', value: `${capital}`, inline: false},
        {name: 'Assets', value: `${assets}`, inline: false})
        message.channel.send(dataEmbed)}}
connectToMongoDB()

async function doshit(message) {

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
            {name: '24h Volume', value: `${vol}`, inline: true}

        )
      message.channel.send(priceEmbed)
      
}
async function doothershit(message) {

    const api_url = (`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
      const response = await fetch(api_url);
      const data = await response.json();
      const { bitcoin } = data
      const change = parseFloat(bitcoin.usd_24h_change).toFixed(2);

      client.user.setActivity("24H @ "+`${change}`+"%", { type: 'WATCHING' })
      message.guild.me.setNickname('BTC @ ' + `${bitcoin.usd}` + '.00');
      
}

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase()
    
    doothershit(message);
    
        if (command === 'btc'){
            doshit(message);      
        }
        if (command === 'ping'){
          message.channel.send('Pong!')
        }
        if (command === 'insert'){
          insert(message, args)
        }

});

client.login(token);
