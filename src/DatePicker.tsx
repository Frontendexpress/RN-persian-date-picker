import styles from '../styles/date-picker.module.css'
import React from 'react'
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io'
import {MdKeyboardDoubleArrowRight,MdKeyboardDoubleArrowLeft} from 'react-icons/md'
import {useEffect,useLayoutEffect,useState} from 'react'
import get_week_day from '../helper/get_week_day'
import get_number_of__days from '../helper/get_number_of_days'
import get_name_of_month from '../helper/get_name_of_month'

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
        <h4>{year} {get_name_of_month(month)}</h4>
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
function Days({year,month,day,selected,set_select,color}:{color:string,selected:number,set_select:React.Dispatch<React.SetStateAction<number>>,year:number,month:number,day:number}){
    const[padding,setpadding]=useState<number>(0)
    useEffect(()=>{
        let a=get_week_day(year,month,day)
        setpadding(a+1==7?0:a+1)
    },[year,month])
    return(
        <div className={styles.days}>
            {Array(padding).fill(null).map((e:any,index:number)=>{
            return(
            <div className={styles.day} key={index} style={{border:'none'}}>
            </div>
            )
           })} 
           {Array(get_number_of__days(month)).fill(null).map((e:any,index:number)=>{
            let score=year*1000+month*60+index+1
            return(
            <div className={styles.day} key={index} style={score==selected?{backgroundColor:color,color:'white',cursor:'pointer'}:{cursor:'pointer'}} onClick={()=>{
                set_select(score)
            }}>
                {index+1}
            </div>
            )
           })} 
        </div>
    )
}
export default function DatePicker({callback,default_value,color='black'}:{color?:string,callback:(e?:string | null | undefined)=>any,default_value:{year:number,month:number,day:number}}){
    const[year,set_year]=useState<number>(default_value.year)
    const[month,set_month]=useState<number>(default_value.month)
    const[day,set_day]=useState<number>(1)
    const[selected_day,set_select]=useState<number>(default_value.year*1000+default_value.month*60+default_value.day)
    return(
        <div>
        <div className={styles.container}>
            <Top_section setmonth={set_month} setyear={set_year} year={year} month={month} day={day}/>
            <Week_days/>
            <Days color={color} year={year} day={day} month={month} selected={selected_day} set_select={set_select}/>
            <div style={{display:'flex',marginTop:20,justifyContent:'space-between'}}>
                <div className={styles.cancel_btn} onClick={()=>{
                    callback()
                }}>
                    <p>لغو</p>
                </div>
                <div className={styles.apply_btn} style={{backgroundColor:color}} onClick={()=>{
                    callback(selected_day?''+Math.floor(selected_day/1000)+'/'+Math.floor((selected_day%1000)/60)+'/'+Math.floor((selected_day%1000)%60):null)
                }}>
                    <p>اعمال</p>
                </div>
            </div>
        </div>
        </div>
    )
}