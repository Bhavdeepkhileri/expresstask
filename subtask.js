const express = require('express')
const envVariable=require('dotenv')
envVariable.config();
const app = express()
const port = process.env.PORT;
app.get('/', (req, res) => {
    try{
        res.send('Hello World!')
    }
    catch(err){
        console.log("someone made a booo booo",err);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})