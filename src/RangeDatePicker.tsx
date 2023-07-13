import React from 'react'
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io'
import {MdKeyboardDoubleArrowRight,MdKeyboardDoubleArrowLeft} from 'react-icons/md'
import {useEffect,useLayoutEffect,useState} from 'react'
import get_week_day from '../helper/get_week_day'
import get_number_of__days from '../helper/get_number_of_days'
import get_name_of_month from '../helper/get_name_of_month'
const obj={}
const styles:any=new Proxy(obj,{
    get(target, p) {
        return p
    },
})
function Top_section({setyear,setmonth,year,month,day}:{setyear:React.Dispatch<React.SetStateAction<number>>,setmonth:React.Dispatch<React.SetStateAction<number>>,year:number,month:number,day:number}){
    return(
        <div className={styles.top_section}>
        <div className={styles.btn} style={{cursor:'pointer'}} onClick={()=>{
                setyear(perv=>perv+1)
            }}>
            <MdKeyboardDoubleArrowLeft size={18} color='#dbd8d8' />
        </div>
    <div className={styles.btn} style={{marginRight:20,cursor:'pointer'}} onClick={()=>{
                setmonth(perv=>perv+1<=12?perv+1:perv-11)
            }}>
            <IoIosArrowBack size={18} color='#dbd8d8'/>
        </div>
        <h4>{year}{get_name_of_month(month)}</h4>
        <div className={styles.btn} style={{marginLeft:20,cursor:'pointer'}} onClick={()=>{
                setmonth(perv=>perv-1>=1?perv-1:perv+11)
            }}>
            <IoIosArrowForward size={18} color='#dbd8d8' />
        </div>
        <div className={styles.btn} style={{cursor:'pointer'}} onClick={()=>{
                setyear(perv=>perv-1)
            }}>
            <MdKeyboardDoubleArrowRight size={18} color='#dbd8d8'/>
        </div>
    </div>
    )
}
function Week_days(){
    return(
        <div className={styles.week_days}>
            {['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', 'پنجشنبه', 'جمعه'].map((e:string)=>{
                return(<p key={e}>{e}</p>)
            })}
        </div>
    )
}
function Days({year,month,day,start,set_start,end,set_end,hover,set_hover}:{start:number,set_start:React.Dispatch<React.SetStateAction<number>>,end:number,set_end:React.Dispatch<React.SetStateAction<number>>,hover:number,set_hover:React.Dispatch<React.SetStateAction<number>>,year:number,month:number,day:number}){
    const[padding,setpadding]=useState<number>(0)
    useEffect(()=>{
        let a=get_week_day(year,month,day)
        setpadding(a+1==7?0:a+1)
    },[year,month])
    return(
        <div className={styles.days}>
            {Array(padding).fill(null).map((e:any,index:number)=>{
            return(
            <div className={styles.day} style={{border:'none'}} key={index}>
            </div>
            )
           })} 
           {Array(get_number_of__days(month)).fill(null).map((e:any,index:number)=>{
            let score=year*1000+month*60+index+1
            return(
            <div key={index} className={styles.day} style={(score==start || score==end)?{backgroundColor:'black',color:'white',cursor:'pointer'}:(score>start && score<end)?{backgroundColor:'#dbd8d8',color:'black',cursor:'pointer'}:(start && !end && score>start && score<=hover)?{backgroundColor:'#dbd8d8',color:'black',cursor:'pointer'}:{cursor:(start && !end && hover<start)?'no-drop':'pointer'}} onMouseEnter={()=>{
                set_hover(score)
            }} onMouseOut={()=>{
                set_hover(0)
            }} onClick={()=>{
                if((start && end)||(!start && !end)){
                    set_end(0)
                    set_start(score)
                }
                else if(start && !end){
                    if(score>=start  )
                    set_end(score)
                }
            }}>
                {index+1}
            </div>
            )
           })} 
        </div>
    )
}
export default function RangeDatePicker({callback,start_default_value,end_default_value}:{callback:(e?:{start:string | null ,end:string | null})=>any,start_default_value:{year:number,month:number,day:number},end_default_value:{year:number,month:number,day:number}}){
    const[year,set_year]=useState<number>(start_default_value.year)
    const[month,set_month]=useState<number>(start_default_value.month)
    const[day,set_day]=useState<number>(1)
    const[start_day,set_start]=useState<number>(start_default_value.year*1000+start_default_value.month*60+start_default_value.day)
    const[end_day,set_end]=useState<number>(end_default_value.year*1000+end_default_value.month*60+end_default_value.day)
    const[hover_day,set_hover]=useState<number>(0)
    return(
        <div>
        <div className={styles.container}>
            <Top_section setmonth={set_month} setyear={set_year} year={year} month={month} day={day}/>
            <Week_days/>
            <Days year={year} day={day} month={month} start={start_day} set_start={set_start} end={end_day} set_end={set_end} hover={hover_day} set_hover={set_hover}/>
            <div style={{display:'flex',marginTop:20,justifyContent:'space-between'}}>
                <div className={styles.cancel_btn} onClick={()=>{
                    callback()
                }}>
                    <p>لغو</p>
                </div>
                <div className={styles.apply_btn} onClick={()=>{
                  callback({
                    start:start_day?''+Math.floor(start_day/1000)+'/'+Math.floor((start_day%1000)/60)+'/'+Math.floor((start_day%1000)%60):null,
                    end:end_day?''+Math.floor(end_day/1000)+'/'+Math.floor((end_day%1000)/60)+'/'+Math.floor((end_day%1000)%60):null
                })
                }}>
                    <p>اعمال</p>
                </div>
            </div>
        </div>

        </div>
    )
}