import jalaali from 'jalaali-js'

//helper return weekday of persian day
export default function get_week_day (year:number,month:number,day:number): number{
    var gregorianDate = jalaali.toGregorian(year,month,day);

    // Create a Date object from the Gregorian date
    var date = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
    
    // Get the weekday
    var weekday = date.getDay();

    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return(weekday);
    
}