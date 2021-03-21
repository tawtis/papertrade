const config = require('./config.json');
const mongo = require('./mongo')
const userSchema = require('./schemas/user-schema')
const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require("enmap");
const client = new Discord.Client();
client.config = config;
client.commands = new Discord.Collection();
client.commands = new Enmap();

x = 1;
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

// Connect to database
const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try{console.log('DB: Connected')}finally{mongoose.connection.close}})}

// Log information to database
async function insert(message, args){
    let user = message.author.username;
    let userid = message.author.id;

// Define information per user
const user2 = {
    id: ``,
    user: `${user}`,
    userID: `${userid}`,
    capital: ``,
    relisedprofits: ``,
    unrealisedprofits: ``}
    x += 1

// Getting stuff from user
await new userSchema('user' + x).save()
console.log(`USER LOGGED: ${user}`)
    const dataEmbed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle('Data Collected')
    .setDescription(`The following information has been logged to our database.`)
    .addFields(
        {name: 'id', value: `${id}`, inline: false},
        {name: 'user', value: `${user}`, inline: false},
        {name: 'userID', value: `${userid}`, inline: false},
        {name: 'capital', value: `${capital}`, inline: false})
        message.channel.send(dataEmbed)}
connectToMongoDB()

client.login(config.token)