const cheerio = require('cheerio');
const axios = require('axios').default;
const express = require('express');
const fs = require('fs')


const app = express()

interface ScrapperData { online: string, members: string, timestamp: number };
const urls = [
  'https://www.reddit.com/r/Bitcoin/',
  'https://www.reddit.com/r/cryptocurrency/',
  'https://www.reddit.com/r/btc/',
  "https://www.reddit.com/r/Bitcoin/",
  "https://www.reddit.com/r/cryptocurrency/",
  "https://www.reddit.com/r/btc/",
  "https://www.reddit.com/r/CryptoMarkets/",
  "https://www.reddit.com/r/BitcoinBeginners/",
  "https://www.reddit.com/r/CryptoCurrencies/",
  "https://www.reddit.com/r/altcoin/",
  "https://www.reddit.com/r/icocrypto/",
  "https://www.reddit.com/r/CryptoCurrencyTrading/",
  "https://www.reddit.com/r/Crypto_General/",
  "https://www.reddit.com/r/ico/",
  "https://www.reddit.com/r/blockchain",
]

const scrapper = (item: string) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await axios.get(item);
      let html = response.data;
      const $ = cheerio.load(html);

      let online = $('p:contains("Online")').siblings('div').text()
      let members = $('p:contains("Members")').siblings('div').text()
      let timestamp = Date.now()
      console.log('before resolve')

      const data:ScrapperData =  { online, members, timestamp }
      resolve(data)

    } catch (error) {
      console.log('before reject')
      reject(error)
      console.log(error);
    }
  });
}

(async () => {
  try {
    urls.forEach(async item => {
      let data = await scrapper(item)

      fs.appendFile('data.json', `${ JSON.stringify(data) } \n`, function (err) {
        if (err) return console.log(err);
      });
    })
  } catch (error) {
    console.log(error);
  }
})()

app.get('/', (req,res) => {
  res.setHeader('Content-Type','application/json;charset=UTF-8;');
  var readable = fs.createReadStream('data.json');
  readable.on('open', () => {
    readable.pipe(res);
  } );
  readable.on('error', ()=>{
    res.end('[]');
  });
} );

app.listen(8000, () => { console.log('app running at 8000 port') })
