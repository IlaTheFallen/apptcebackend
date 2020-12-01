const router = require("express").Router();4
const bcrypt = require("bcryptjs");
const Student = require("../models/student");

router.post("/signup",async(req,res)=>{
    try{
    let {name,email,password,type} = req.body;
    const existingStudent = await Student.findOne({email:email});
    if(existingStudent)
        return res.status(400).json({msg:"You have already have an account"});
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt);
    
    const newStudent = new Student({
        name,
        email,
        password:passwordHash,
        type
    });
    const savedStudent = await newStudent.save();
    res.json(newStudent);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;

        const student = await Student.findOne({email:email});
        if(!student)
            return res.status(400).json({msg:"You don't have an account"});

        const isMatch = await bcrypt.compare(password,student.password);
        if(!isMatch)
            return res .status(400).json({msg:"Enter correct password"});

        res.json({
            student:{
                name:student.name,
                email:student.email,
                type:student.type
            }
        });
        
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

module.exports=router;