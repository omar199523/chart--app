
import { useState} from 'react'
import TokenChart from "../TokenChart";
import './style.css'
const ChartContiner = ({tokenData}) => {
  const [isShow,setIsShow] = useState(false)
  return (
    <>
      {(<div className="list" onMouseEnter={()=> {setIsShow(true)}} onMouseLeave ={()=> {setIsShow(false)}} key={tokenData.key} >
        <div className='title'>
          <h2 className='tilte-name'>{tokenData.name}/{tokenData.symbol}</h2>
          <h2 className='tilte-address'>{tokenData.address}</h2>
        </div>
        {isShow && <div className="chart-con" key={tokenData._id}>
           <TokenChart id = {tokenData._id}/>
        </div>}
      </div>)}
    </>
  )
}

export default ChartContiner
