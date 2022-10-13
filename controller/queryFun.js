const axios = require("axios");
const networks = ["bsc", "ethereum"];
const Tokens = require('../models/tokenModels')
function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}
const lastFiveMinDate = ()=>{
    let date = new Date();
    return `${date.getFullYear()}-${addLeadingZeros(date.getMonth()+1,2)}-${addLeadingZeros(date.getDate(),2)}T${addLeadingZeros(date.getHours(),2)}:${addLeadingZeros(date.getMinutes()-5,2)}:${addLeadingZeros(date.getSeconds(),2)}`;
};
const networkQuerys = (network)=>{
    return `query MyQuery {
      ethereum(network: ${network}) {
        dexTrades(
          date: {since: "${lastFiveMinDate()}"}
          options: {limit: 10,asc:"trades"}
        ) {
          trades: count
          sellCurrency {
            address
            name
            symbol
          }
          timeInterval {
            second(count: 10)
          }
        }
      }
    }`
};
const tokenQuery = (token) => {
  return `{
    ethereum(network: ${token.network}) {
      dexTrades(
        options: {asc: "timeInterval.minute", limit: 10}
        baseCurrency: {is: "${token.address}"}
      ) {
        timeInterval {
          minute(count: 1)
        }
        volume: quoteAmount(in: USD)
        high: quotePrice(calculate: maximum)
        low: quotePrice(calculate: minimum)
        open: minimum(of: block, get: quote_price)
        close: maximum(of: block, get: quote_price)
        baseCurrency {
          name
          address
        }
        quoteCurrency {
          name
          address
        }
        exchange {
          fullName
        }
      }
    }
  }`;
}

const axiosDataFun = async (query) => {
  const config ={
    method: 'post',
    url: 'https://graphql.bitquery.io',
    headers: { 
      'Content-Type': 'application/json', 
      'X-API-KEY': 'BQYh5IhPL57WRiNvTavzEpHM3RKhX6VZ'
    },
    data : {query}
    };
    return axios(config)
      .then((response) => {
         return response
      })
      // .catch((error)=> {
      //   console.log(error);
      // });
};



const fetchData = async ()=>{
  Tokens.deleteMany({},()=>{})
  networks.map((network)=>{
    const networkConfig = networkQuerys(network);
    axiosDataFun(networkConfig).then(res=>{
      const dexTrades = res.data.data.ethereum.dexTrades;
        let result =dexTrades.map(token=>{
          const {address,name,symbol} = token.sellCurrency;
          const tokenFun = tokenQuery({address,network});
          axiosDataFun(tokenFun).then(res=>{
            let data=res.data.data.ethereum.dexTrades;
            Tokens.create({
              network,name,symbol,address,data,sellTradeCount:token.trades,timestamp:token.timeInterval.second
            })
          })
        });
    })
    
  })
}
module.exports ={
  fetchData
}


