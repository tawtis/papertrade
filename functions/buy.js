//Buy a crypto
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const mongo = require('../mongo.js')
const holdingsSchema = require('../schemas/holdings-schema')
const getPrices = require('../functions/getprices')
const fetch = require("node-fetch");
client.config = config;

/*const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try{console.log('DB - buy: Connected')}finally{mongoose.connection.close}})}
}
connectToMongoDB()*/