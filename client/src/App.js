
import { useEffect, useState } from 'react'
import axios from 'axios'
import ChartContiner from './componant/ChartContiner'
import './App.css'
function App() {
  const [tokenDatas, setTokenDatas] = useState([])
  const [network, setNetwork] = useState('bsc')
  useEffect(() => {
    axios.get('./api/tokens').then(res => {
      setTokenDatas(res.data)
    })
    setInterval(() => {
      console.log(tokenDatas.filter(item => { return item.network === network }))
      axios.get('./api/tokens').then(res => {
        setTokenDatas(res.data)

      })
    }, 60 * 1000);
  }, [])
  console.log(tokenDatas)
  return (
    <div className="App">
      <div className='token-list'>
        <div className='title'>
          <h2 className='tilte-name'>name/symdol</h2>
          <h2 className='tilte-address'>Address</h2>
        </div>
        <div className='filter-Cont'>
          <label htmlFor="network">
            network
            <select id="network" value={network} onChange={(e) => { setNetwork(e.target.value) }}>
              <option value="ethereum">ethereum</option>
              <option value="bsc">bsc</option>
            </select>
          </label>
        </div>
        {tokenDatas.filter(item => { return (item.network === network) ? item : null }).map(tokenData => <ChartContiner tokenData={tokenData} />)}
      </div>

    </div>
  );
}

export default App;
