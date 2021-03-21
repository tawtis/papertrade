const client = new Discord.Client();
const config = require('../config.json');
const mongo = require('../mongo.js')
const holdingsSchema = require('../schemas/holdings-schema')
const Discord = require('discord.js');
client.config = config;

const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try{console.log('DB: Connected')}finally{mongoose.connection.close}})}



async function getPrices(message){
    const api_url = ('https://api.coingecko.com/api/v3/simple/price?ids=reef-finance%2C1inch%2Caave%2Cbinancecoin%2Cbitcoin%2Cbitcoin-cash%2Ccardano%2Cchainlink%2Cchiliz%2Ccosmos%2Cdash%2Cdoge%2Celrond-erd-2%2Ceos%2Cethereum%2Cethereum-classic%2Cfilecoin%2Clitecoin%2Cneo%2Cpolkadot%2Cravencoin%2Cripple%2Cstellar%2Csushi%2Cocean-protocol%2Ctheta%2Cuniswap%2Cvechain%2Cyearn-finance%2Czilliqa&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true');
    const response = await fetch(api_url);
    const data = await response.json();
//  const { binance coin } = data
//  const { 1inch }  = data 
    const { aave } = data
    const { bitcoin } = data
//  const { bitcoin-cash } = data 
    const { cardano } = data
    const { chainlink } = data
    const { chiliz } = data
    const { polkadot } = data
    const { cosmos } = data
    const { dash } = data
    const { dogecoin } = data
    const { ethereum } = data
//  const { ethereum classic } = data
    const { litecoin } = data
    const { neo } = data
    const { stellar } = data
    const { uniswap } = data
    const { theta } = data
    const { vechain } = data
    const { ripple } = data
    const { zilliqa } = data
    const { eos } = data  
    const { filecoin } = data
    const { elrond } = data
    const { sushiswap } = data
    const { ravencoin } = data
//  const { yearn-finance } = data
//  const { ocean protocol} = data
    const { reef } = data 

// --------------------------------------------------------------------
//it works?
    console.log(data[`binance-coin`].usd + '1')
    console.log(data[`1inch`].usd + '2')
    console.log(aave.usd + '3')
    console.log(bitcoin.usd + '4')
    console.log(data[`bitcoin-cash`].usd + '5')
    console.log(cardano.usd + '6') 
    console.log(chainlink.usd + '7')
    console.log(chiliz.usd + '8')
    console.log(polkadot.usd + '9')
    console.log(cosmos.usd + '10')
    console.log(dash.usd + '11')
    console.log(dogecoin.usd + '12')
    console.log(ethereum.usd +'13')
    console.log(data[`ethereum-classic`].usd + '14')
    console.log(litecoin.usd + '15')
    console.log(neo.usd + '16')
    console.log(stellar.usd + '17')
    console.log(uniswap.usd + '18')
    console.log(theta.usd + '19')
    console.log(vechain.usd + '20')
    console.log(ripple.usd + '21')
    console.log(zilliqa.usd + '22')
    console.log(eos.usd + '23')
    console.log(filecoin.usd + '24')
    console.log(elrond.usd + '25')
    console.log(sushiswap.usd + '26')
    console.log(ravencoin.usd + '27')
    console.log(data[`yearn.finance`].usd + '28')
    console.log(data[`ocean-protocol`].usd + '29')
    console.log(reef.usd + '30')} 

    

setInterval(getPrices, 1000)

// yep it works now all we need to do is call this function 
connectToMongoDB()