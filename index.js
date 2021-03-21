const config = require('./config.json');
const mongo = require('./mongo')
const userSchema = require('./schemas/user-schema')
const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require("enmap");
const client = new Discord.Client();
client.config = config;
client.commands = new Discord.Collection();
const fetch = require("node-fetch");
//client.commands = new Enmap();
x = 2;

const commandFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./functions/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
// Read events
/*fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split(".")[0];
    console.log(`LOADED: '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
  console.log("------------------------------------------------");
}); *

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
}); */

// Log UPRs
  process.on("unhandledRejection", (error) => {
  console.error("UNHANDLED PROMISE REJECTION:", error);
});
x = x + 1;
// Connect to database
const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try{console.log('DB - index: Connected')}finally{mongoose.connection.close}})}





async function buy(message, args){
    const api_url = ('https://api.coingecko.com/api/v3/simple/price?ids=reef-finance%2C1inch%2Caave%2Cbinancecoin%2Cbitcoin%2Cbitcoin-cash%2Ccardano%2Cchainlink%2Cchiliz%2Ccosmos%2Cdash%2Cdogecoin%2Celrond-erd-2%2Ceos%2Cethereum%2Cethereum-classic%2Cfilecoin%2Clitecoin%2Cneo%2Cpolkadot%2Cravencoin%2Cripple%2Cstellar%2Csushi%2Cocean-protocol%2Ctheta%2Cuniswap%2Ctheta%2Cvechain%2Cyearn-finance%2Czilliqa&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true');
    const response = await fetch(api_url);
    const data = await response.json();
//  const { binance coin, 1inch, bitcoin-cash, ethereum-classic, yearn-finance, ocean-protocol } = data
    const { aave, bitcoin, cardano, chainlink, chiliz, polkadot, cosmos, dash, dogecoin, ethereum, litecoin, neo, stellar, uniswap, theta, vechain, ripple, zilliqa, eos, filecoin, elrond, sushi, ravencoin, reef } = data
    let amount = args[0];
    let coin = args[1];
    let user = message.author.username;
    let cost = parseFloat(bitcoin.usd * `${amount}`).toFixed(2);
    message.channel.send(`${amount} of ${coin} has been bought at $` + bitcoin.usd + ` for $` + `${cost}` );
    const price = bitcoin.usd * `${amount}`
    const result = await userSchema.find(
    {
      user: `${user}`,
    })
    await userSchema.updateOne(
        {
          user: `${user}`,
        },
        {
          capital: result[0].capital - `${cost}`,
        }
    )
    const resultAcc = await userSchema.find(
      {
        user : `${user}`,
      })
    message.channel.send(`$` + resultAcc[0].capital);
}


async function reset(message){
  const api_url = ('https://api.coingecko.com/api/v3/simple/price?ids=reef-finance%2C1inch%2Caave%2Cbinancecoin%2Cbitcoin%2Cbitcoin-cash%2Ccardano%2Cchainlink%2Cchiliz%2Ccosmos%2Cdash%2Cdogecoin%2Celrond-erd-2%2Ceos%2Cethereum%2Cethereum-classic%2Cfilecoin%2Clitecoin%2Cneo%2Cpolkadot%2Cravencoin%2Cripple%2Cstellar%2Csushi%2Cocean-protocol%2Ctheta%2Cuniswap%2Ctheta%2Cvechain%2Cyearn-finance%2Czilliqa&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true');
    const response = await fetch(api_url);
    const data = await response.json();
//  const { binance coin, 1inch, bitcoin-cash, ethereum-classic, yearn-finance, ocean-protocol } = data
    const { aave, bitcoin, cardano, chainlink, chiliz, polkadot, cosmos, dash, dogecoin, ethereum, litecoin, neo, stellar, uniswap, theta, vechain, ripple, zilliqa, eos, filecoin, elrond, sushi, ravencoin, reef } = data
    let user = message.author.username;
    const result = await userSchema.find(
    {
      user: `${user}`,
    })
    await userSchema.updateOne(
        {
          user: `${user}`,
        },
        {
          capital: `1000`,
        }
    )
    message.channel.send(`Your account has been reset to $1000`)
}
async function bal(message){
  let user = message.author.username;
  const result = await userSchema.find(
  {
    user: `${user}`,
  })
  message.channel.send(`You account balance is $` + result[0].capital);
}


// Log information to database
async function insert(message, args){//TEST COMMAND
    let user = message.author.username;
    let userid = message.author.id;
    let capital = '1000';

// Define information per user
  const userr = {

      user: `${user}`,
      userID: `${userid}`,
      capital: `1000`,
      relisedprofits: ``,
      unrealisedprofits: ``}

// Getting stuff from user
  await new userSchema(userr).save()
  console.log(`USER LOGGED: ${user}`)
      const dataEmbed = new Discord.MessageEmbed()
      .setColor('ff0000')
      .setTitle('Data Collected')
      .setDescription(`The following information has been logged to our database.`)
      .addFields(
          //{name: 'id', value: `${id}`, inline: false},
          {name: 'Username', value: `${user}`, inline: false},
          {name: 'UserID', value: `${userid}`, inline: false},
          {name: 'Capital', value: `${capital}`, inline: false})
          message.channel.send(dataEmbed)
}

async function findUser(message, args){
  let id = args[0];
  if (!id){
    return message.channel.send('No arguments provided.')
  }
  const result = await userSchema.find({
    userID: `${id}`
    })
  //message.channel.send(result)
  //message.channel.send(`Capital: ${result}`)
  message.channel.send(result[0].capital)
}
async function find(message, args){

  const result = await userSchema.find({});
  const capitalList = [];
  result.forEach(result => capitalList.push(result.capital.toString ())); //idk if toString is neccessary to join them

  message.channel.send(capitalList.join('\n'));
}



connectToMongoDB()

/*async function increment(){

  const inc = {
  _id: "id",
  sequence_values: 0
  }

  await new incSchema(inc).save()
  console.log('Increment schema recorded')
} */



client.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);    
  const command = args.shift().toLowerCase();

  if (command === 'account'){
    insert(message, args)
  }
  if (command === 'find'){
    find(message, args);
  }
  if (command === 'finduser'){
    findUser(message, args);
  }
  if (command === 'buy'){
    buy(message, args);
  }
  if (command === 'reset'){
    reset(message);
  }
  if (command === 'bal' || command === 'balance'){
    bal(message);
  }

});


client.login(config.token);