const Discord = require('discord.js');
const fs = require('fs');
const fetch = require("node-fetch");
const mongo = require('./mongo')
const userSchema = require('./schemas/user-schema')

const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const connectToMongoDB = async () => {
  await mongo().then(async (mongoose) => {
    try{
      console.log('Connected')


    }finally{
      mongoose.connection.close
    }
  })
}

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

  const user2 = {
    ID: `${id}`,
    User: `${user}`,
    UserID: `${userid}`,
    Capital: `${capital}`,
    Assets: `${assets}`
  }
  

  await new userSchema(user2).save()

  console.log(`${user}` + "'s info has been saved")
  message.channel.send("Data has been saved to the database")

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
        {name: 'Assets', value: `${assets}`, inline: false}

      )

    message.channel.send(dataEmbed)
  }
}

connectToMongoDB()

client.once('ready', () => {
	console.log('Ready!');
});














async function doshit(message) {

    const api_url = (`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
      const response = await fetch(api_url);
      const data = await response.json();
      const { bitcoin } = data

      const change = parseFloat(bitcoin.usd_24h_change).toFixed(2);
      const vol = parseFloat(bitcoin.usd_24h_vol).toFixed(0);

      const priceEmbed = new Discord.MessageEmbed()
        .setColor('ffff00')
        .setTitle('Bitcoin')
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

//Atomツ - no delete plez
