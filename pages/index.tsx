import { DatePicker, RangeDatePicker } from '../src/index';
export default function Main(){
  return(
      <div style={{minWidth:'100vw',paddingTop:100,display:'flex',justifyContent:'space-around',height:'100vh',backgroundColor:'#aaaaaa'}}>
        <DatePicker default_value={{year:1402,month:6,day:5}} callback={(e)=>{
          console.log(e)
         }}/>
        <div>
         <RangeDatePicker start_default_value={{year:1403,month:3,day:21}} end_default_value={{year:1403,month:5,day:3}} callback={(e)=>{
          console.log(e?.start,e?.end)
         }}/>

        </div>
      </div>
  )
}
