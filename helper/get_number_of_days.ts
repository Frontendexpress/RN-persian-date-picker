
export default function get_number_of__days (month:number): number{
    if(month>=1 && month<=6)
    return 31
    if(month>=7 && month<=11)
    return 30
    return 29

}