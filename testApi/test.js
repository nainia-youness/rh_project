require("datejs")
let a=5
let b=6

/*let code = `
if(a<5){
    a+b
}
else{
    (a+b)*5
}
`*/
let code=`
    Math.round(1.75)
`

parameters=["a","b"]

operations=[
    '+','-','','*','/','%','>','<','!','&','|',
    '?',':','^','~','='
]

let numbers=['0','1','2','3','4','5','6','7','8','9','.']
let rubrique=[]
let employe_info=['date_entree','salaire_base']//la date doit etre de type Date




//
const is_code_valid=(code)=>{
    
    const accepted_Tokens=[
        'if','else','{','}',' ','Math.round',
        '(',')','\n',...operations,
        ...numbers,...rubrique,...parameters,...employe_info
    ]
    accepted_Tokens.forEach((token)=>{
        code=code.replaceAll(token,'')
    });
    if(code==='')
        return true
    return false
}
let result

function toString(date){
    return date.getFullYear()+'-'+(date.getMonth() + 1) + '-' + date.getDate()  
}

function getYearDiff(startDate, endDate) {
    let yearDiff = endDate.getFullYear() - startDate.getFullYear();
    if (startDate.getMonth() > endDate.getMonth()) {
        yearDiff--;
    } else if (startDate.getMonth() === endDate.getMonth()) {
        if (startDate.getDate() > endDate.getDate()) {
            yearDiff--;
        } else if (startDate.getDate() === endDate.getDate()) {
            if (startDate.getHours() > endDate.getHours()) {
                yearDiff--;
            } else if (startDate.getHours() === endDate.getHours()) {
                if (startDate.getMinutes() > endDate.getMinutes()) {
                    yearDiff--;
                }
            }
        }
    }
    return yearDiff;
}

now=new Date(Date.now())
let date = new Date('1986-09-18')
//dif=new Date(now-date)
console.log(getYearDiff(date,now))
//console.log(dif.getFullYear()+'-'+(dif.getMonth() + 1) + '-' + dif.getDate() )
//dif=now-d
//console.log(toString(dif))

/*try{
    if(is_code_valid(code)){
        result=eval(code)
        //check if the return type is valid
    }
    else{
        console.log("parametre ou expression non existantes")
    }
}
catch(e){
    console.log("erreur de syntaxe ( assurez vous que c bien en js )")
}*/


console.log(result)
//eval(code)
//console.log(result)
