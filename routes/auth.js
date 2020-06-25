const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requirelogin = require('../middleware/requirelogin')



router.get('/',(req,res)=>{
    res.send("Hello")
})

router.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body
    if(!email || !password || !name)
    {
       return res.status(422).json({error:"Please enter all the fields"})
    }
    User.findOne({email:email})
    .then((saved)=>{
        if(saved)
        {
            return res.status(422).json({error:"User already exist with the same email"})
        }

        bcrypt.hash(password,12)
        .then(hashedpass=>{
            const user = new User({
                name,
                email,
                password:hashedpass,
                pic:pic
            })
    
            user.save()
            .then(user=>{
                res.json({message:"Saved Successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })


})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password)
    {
       return res.status(422).json({error:"Please enter all the fields"})
    }
    User.findOne({email:email})
    .then((saved)=>{
        if(!saved)
        {
            return res.status(422).json({error:"Invalid email or password"})
        }

        bcrypt.compare(password,saved.password)
        .then(matched=>{
            if(matched)
            {
                // res.json({message:"Signin Successfully"})
                const token = jwt.sign({_id:saved._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = saved
                res.json({token:token,user:{_id,name,email,followers,following,pic}})
            }
            else
            {
                return res.status(422).json({error:"Invalid email or password"}) 
            }
            })
        .catch(err=>{
            console.log(err)
        })
    })    
})
    
 

module.exports = router