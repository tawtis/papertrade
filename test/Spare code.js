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

async function doothershit(message) {
    const api_url = (`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
    const response = await fetch(api_url);
    const data = await response.json();
    const { bitcoin } = data
    const change = parseFloat(bitcoin.usd_24h_change).toFixed(2);
    client.user.setActivity(`${bitcoin.usd} ${change}%)`, { type: 'WATCHING' })}
    setInterval(doothershit, 10000)
