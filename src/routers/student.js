const express = require("express");
const { Student } = require("../models/students");

//1. We need to create a router
const router = new express.Router();

 // create a new student ...
router.post("/students", async (req,res) => {
    console.log(req.body);  
    try{
          // const user = new Student(req.body);
             const userData = new Student({
             name : req.body.name,
             email : req.body.email,
             phone : req.body.phone,
             address : req.body.address,
       });
   
       const createUserData = await userData.save();
       res.status(201).send(createUserData);

       console.log("name is = "+req.body.name+", email = "+userData.email+
                "\n Phone is = "+req.body.phone+", address = "+userData.address);
    }
    catch(err){
       res.status(404).send("Something went wrong : !! "+err);
    }
});

// GET all the students
 
router.get("/students", async (req,res) => {
   try{
      const studentsData = await Student.find();
      res.send(studentsData); 
   }
   catch(err){
      res.send("Something went wrong GET method... : "+err);
   }
});

// GET a specific student by id

router.get("/students/getStudentById/:id", async (req,res) => {
      try{
        const stuId = req.params;
        console.log(req.params.id+" : student's id : "+stuId.id);
        const studentsData = await Student.find({_id : req.params.id});
        res.send(studentsData);
      }
      catch(err){
        res.send("Something went wrong GET method... : "+err);
     }
});

// GET a specific student by name

router.get("/students/getStudentByName/:name", async (req,res) => {
      const stuName = req.params.name;
      console.log("Student's name is = "+stuName+", or = "+req.params.name);

      try{
        const nameResult = await Student.find({name : stuName});
        console.log(nameResult[0]);
        res.send(nameResult[0]);
      }catch(err){
          res.send("Something wrong happened in get method : name route, "+err);
      }
});

// Update or PATCH student by id

router.patch("/students/UpdateById/:id", async (req,res) => {
       try{
          const stuId = req.params.id;
          console.log("student's id = "+stuId+" = "+req.params.id);

          const updateStu = await Student.findOneAndUpdate({_id : stuId}, 
            {$set : 
               { 
                 name : req.body.name,
                 email : req.body.email,
                 phone : req.body.phone,
                 address : req.body.address,
               } 
            },
             {
               returnDocument : "after"
             }
            );
          console.log(updateStu);
          res.status(201).send(updateStu);

       }catch(err){
          res.status(404).send("You did something wrong !!! : "+err);
       }
});

// PATCH/update student by Name

router.patch("/students/UpdateByName/:userName", async (req,res) => {
   console.log("I am inside patch method by name !!!");
   try{
      const stuName = req.params.userName;
      console.log("Student's name is = "+stuName+" = "+req.params.userName);

      const nameResult = await Student.findOneAndUpdate({name : stuName}
                               ,{$set : 
                                 {
                                    name : req.body.name,
                                    email : req.body.email,
                                    phone : req.body.phone,
                                    address : req.body.address,
                                 }
                                 },
                                 {
                                    returnDocument : "after"
                                 });
         console.log(nameResult);
         res.status(201).send(nameResult);
   }catch(err){
        res.status(404).send("Any mistake has been done by you ??? : "+err);
   }

});

// DELETE a student by id

router.delete("/students/deleteById/:id", async (req,res) => {
           try{
            console.log("I am inside deleteById method : !!");
            const stuId = req.params.id;
            console.log("Deleted , Student's id = "+stuId+" = "+req.params.id);

            const idResult = await Student.findOneAndDelete({_id : stuId});
               if(!req.params.id){
                  return res.status(404).send("No id with this value found..");
               }
               res.status(201).send(idResult);   
           }
           catch(err){
             res.status(500).send("Somethething wrong happend in deleting : "+err);
           }
});

// DELETE a Student by name

router.delete("/students/deleteByName/:nameStudent", async (req,res) => {
   try{
    console.log("I am inside deleteByName method : !!");
    const stuName = req.params.nameStudent;
    console.log("Deleted , Student's Name is = "+stuName+" = "+req.params.nameStudent);

    const nameResult = await Student.findOneAndDelete({ name : stuName});
       if(!req.params.nameStudent){
          return res.status(404).send("No name with this value found..");
       }
       res.status(201).send(nameResult);   
   }
   catch(err){
     res.status(500).send("Somethething wrong happend in deleting : "+err);
   }
});

 module.exports = router;

