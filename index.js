const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000
const {mongourl} = require('./config/keys');
const bcrypt = require('bcryptjs')



mongoose.connect(mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to database");
})

mongoose.connection.on('error',(err)=>{
    console.log("error in connecting",err);
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.use(express.static(__dirname + '/client/build'));
// console.log(__dirname)


if(process.env.NODE_ENV=="production")
{
    const path = require('path')
    // console.log(__dirname)
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
else{
app.listen(port,()=>{
    console.log("server is running on ",port)
})
} 