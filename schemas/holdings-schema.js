const mongooes = require('mongoose')

const reqStr = {
    type: String,
    required: true,
  }
const reqNum = {
    type: Number,
    required: true,
}

const holdingsSchema = {

    oneinch: reqNum,
    aave: reqNum,
    bnb: reqNum,
    btc: reqNum,
    bch: reqNum,
    ada: reqNum,
    link: reqNum,
    chz: reqNum,
    dot: reqNum,
    atom: reqNum,
    dash: reqNum,
    doge: reqNum,
    eth: reqNum,
    etc: reqNum,
    ltc: reqNum,
    neo: reqNum,
    xlm: reqNum,
    usdt: reqNum,
    theta: reqNum,
    uni: reqNum,
    vet: reqNum,
    xrp: reqNum,
    zil: reqNum,
    fil: reqNum,
    eos: reqNum,
    sushi: reqNum,
    egld: reqNum,
    rvn: reqNum,
    yfi: reqNum,
    ocean: reqNum,
    reef: reqNum,

}

module.exports = mongoose.model('userHoldings', holdingsSchema)
