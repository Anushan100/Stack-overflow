const express = require("express");
const router = express.Router();
const bcrypt=require('bcryptjs');
const jsonwt=require('jsonwebtoken');
const passport=require('passport');
const key=require("../../setup/myurl");


//Schema importing
const Person=require("../../models/Person");

//testing route
router.get("/", (req, res) => res.json({ test: "Auth is success" }));


//registration route

router.post('/register',(req,res)=>{
    Person.findOne({email:req.body.email})
    .then(anushan=>{
        if(anushan){
            return res.json({error:"already exist"})
        }
        else{
            const newPerson=new Person({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password

            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPerson.password, salt, (err, hash) => {
                  if (err) throw err;
                  newPerson.password = hash;
                  newPerson
                    .save()
                    .then(person => res.json(person))
                    .catch(err => console.log(err));
                });
              });
        }
    })
    .catch(err=>console.log("cannot connect"))
})

module.exports = router;