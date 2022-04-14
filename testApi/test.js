
let a=5
let b=6

let code = `
if(a<5){
    a+b
}
else{
    (a+b)*5
}
`

parameters=["a","b"]

operations=[
    '+','-','','*','/','%','>','<','!','&','|',
    '?',':','^','~','='
]

let numbers=[0,1,2,3,4,5,6,7,8,9]
let rubrique=[]

const is_code_valid=(code)=>{
    
    const accepted_Tokens=[
        'if','else','{','}',' ',...parameters,
        '(',')','\n',...operations,
        ...numbers,...rubrique
    ]
    accepted_Tokens.forEach((token)=>{
        code=code.replaceAll(token,'')
    });
    if(code==='')
        return true
    return false
}
let result



try{
    if(is_code_valid(code)){
        result=eval(code)
    }
    else{
        console.log("parametre ou expression non existantes")
    }
}
catch(e){
    console.log("erreur de syntaxe ( assurez vous que c bien en js )")
}


console.log(result)
//eval(code)
//console.log(result)
