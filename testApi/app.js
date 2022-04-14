const express = require('express')
const app = express()
const port = 3000
const request = require('request');
const cors = require('cors')

const keycloakHost = 'localhost';
const keycloakPort = '8080';
const realmName = 'myrealm';
const bodyParser = require('body-parser');
app.use(cors({origin: 'http://localhost:4200',credentials:true,allowedHeaders:['Content-Type', 'Authorization','Set-Cookie'],
exposedHeaders:['Content-Type', 'Authorization','Set-Cookie']
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json('application/json'));


let data=[
  {firstName:"peter",email:"dqsdqs546",password:"123",age:15,lastName:"dsds"},
  {firstName:"Sam",email:"dqsdqscxcx546",password:"123",age:18,lastName:"dsds"},
  {firstName:"Jonas",email:"dqqsqsdqs54qsdqsd6",password:"123",age:15,lastName:"dsds"},
  {firstName:"Josag",email:"dqsdccccqs546",password:"123",age:15,lastName:"dsds"},
]


app.post('/api/v1/auth/login/',(req, res) => {
  const password=req.body.password
  const email= req.body.email

  res.setHeader('Set-Cookie', 'Testttttttttttttttttttttttt')
  //console.log(password)
  //throw new Error('database failed to connect')
  //res.status(404).json({error: 'Internal server error',message:"OUPS! y'a un probleme"})
  res.send({firstName:"youness",lastName:"nainia",email:email})
})




app.get('/fonctions',(req, res) => {

  //throw new Error('database failed to connect')
  //res.status(404).json({error: 'Internal server error',message:"OUPS! y'a un probleme"})
  const fonctions=[
    {id: 1, label: 'Hydrogen', description: 'H'},
    {id: 2, label: 'Helium',description: 'He'},
    {id: 3, label: 'Lithium',description: 'Li'},
    {id: 4, label: 'Beryllium', description: 'Be'},
    {id: 3, label: 'Lithium',description: 'Li'},
    {id: 4, label: 'Beryllium', description: 'Be'},
    {id: 3, label: 'Lithium',description: 'Li'},
    {id: 4, label: 'Last one', description: 'Be'},
  ]

  //"field_type": "boolean"
  //"field_type": "date_time"
  const metaData={
    fields:[
      {
        name:"id",
        field_type:"integer" //=> 1 input ou 2 inputs
      },
      {
        name:"designation",
        field_type: "string",
        values:["v1","v2","v3","v4"] //=>  1 dropdown
      },
      {
        name:"description",
        field_type: "string"//=> 1 input
      }
    ]
}

  //console.log(req.query)
  res.send(
    {
      data:fonctions,
      metaData,
      maxPages:1
    }
  )
})


app.get('/fonctions/logs',(req, res) => {

  res.send(
    {
      userName:'youness',
      changeDate:new Date("2019-10-11"),
      changeOperation:'update'
    }
  )

})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
