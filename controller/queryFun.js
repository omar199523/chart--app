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
const networkQuerys = (network,address)=>{
    return `query MyQuery {
      ethereum(network: ${network}) {
        dexTrades(
					baseCurrency:{is:"${address}"}
          options: {limit: 1}
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
        options: {desc: "timeInterval.minute", limit: 10}
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
const converNumber = (num)=>{
  const result = Number(num)
  return (result)
} 

const axiosDataFun = async (query) => {
  const config ={
    method: 'post',
    url: 'https://graphql.bitquery.io',
    headers: { 
      'Content-Type': 'application/json', 
      'X-API-KEY': process.env.X-API-KEY
    },
    data : {query}
    };
    return axios(config)
      .then((response) => {
         return response
      })
      .catch((error)=> {
        console.log("error");
      });
};


const fetchData = async ()=>{
  const tokensData = await Tokens.find();

  tokensData.map(async(token)=>{
    let query = tokenQuery(token);
    let data = [] 
    let status = "DEPLOYED";
    await axiosDataFun(networkQuerys(token.network,token.address)).then(res=> {
      if(res.data.data.ethereum.dexTrades.length >0 && res.data.data.ethereum.dexTrades[0].trades >0){
        status = "LIVE"
      }
    })
    await axiosDataFun(query).then((res)=>{
      Tokens.findByIdAndUpdate(token._id,{data : res.data.data.ethereum.dexTrades ,status},{new:true})
      .then(()=>{console.log("token is update")})
      .catch(error=>{console.log("error")})
  })
})
}

module.exports ={
  fetchData
}


