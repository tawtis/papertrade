const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const mongo = require('../mongo.js')
const holdingsSchema = require('../schemas/holdings-schema')
const fetch = require("node-fetch");
client.config = config;

const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try{console.log('DB - getprices: Connected')}finally{mongoose.connection.close}})}


    async function getprices(message){
    const api_url = ('https://api.coingecko.com/api/v3/simple/price?ids=reef-finance%2C1inch%2Caave%2Cbinancecoin%2Cbitcoin%2Cbitcoin-cash%2Ccardano%2Cchainlink%2Cchiliz%2Ccosmos%2Cdash%2Cdogecoin%2Celrond-erd-2%2Ceos%2Cethereum%2Cethereum-classic%2Cfilecoin%2Clitecoin%2Cneo%2Cpolkadot%2Cravencoin%2Cripple%2Cstellar%2Csushi%2Cocean-protocol%2Ctheta%2Cuniswap%2Ctheta%2Cvechain%2Cyearn-finance%2Czilliqa&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true');
    const response = await fetch(api_url);
    const data = await response.json();
    const { test } = 'test'
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
    const { sushi } = data
    const { ravencoin } = data
//  const { yearn-finance } = data
//  const { ocean protocol} = data
    const { reef } = data 


// --------------------------------------------------------------------
/*
    //console.log(data[`binance-coin`].usd + '1')
    //console.log(data[`1inch`].usd + '2')
    console.log('AAVE:    $' +   aave.usd + '    3')
    console.log('BTC:     $' +   bitcoin.usd + '    4')
    //console.log(data[`bitcoin-cash`].usd + '5')
    console.log('ADA:     $' +   cardano.usd + '    6') 
    console.log('LINK:    $' +   chainlink.usd + '    7')
    console.log('CHZ:     $' +   chiliz.usd + '    8')
    console.log('DOT:     $' +   polkadot.usd + '   9')
    console.log('ATOM:    $' +   cosmos.usd + '    10')
    console.log('DASH:    $' +   dash.usd + '    11')
    console.log('DOGE:    $' +   dogecoin.usd + '    12')
    console.log('ETH:     $' +   ethereum.usd +'    13')
    //console.log(data[`ethereum-classic`].usd + '14')
    console.log('LTC:     $' +   litecoin.usd + '    15')
    console.log('NEO:     $' +   neo.usd + '    16')
    console.log('XLM:     $' +   stellar.usd + '    17')
    console.log('UNI:     $' +   uniswap.usd + '    18')
    //console.log(data[`theta-network.usd`]` + '19')
    console.log('VET:     $' +   vechain.usd + '    20')
    console.log('XRP:     $' +   ripple.usd + '    21')
    console.log('ZIL:     $' +   zilliqa.usd + '    22')
    console.log('EOS:     $' +   eos.usd + '    23')
    console.log('FIL:     $' +   filecoin.usd + '    24')
    //console.log(elrond.usd + '25')
    console.log('SUSHI:   $' +   sushi.usd + '    26')
    console.log('RVN:     $' +   ravencoin.usd + '    27')
    //console.log(data[`yearn.finance`].usd + '28')
    //console.log(data[`ocean-protocol`].usd + '29')
    //console.log(data[`reef-finance`].usd + '30')} 
//setInterval(getPrices, 1000)*/
}

connectToMongoDB()