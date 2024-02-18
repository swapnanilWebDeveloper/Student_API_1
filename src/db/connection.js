const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    try{
        const mess =  await mongoose.connect('mongodb://127.0.0.1:27017/StudentApi');
        console.log("Database connection is successfull : "); 
    }
    catch(error){
       console.log("something went wrong : "+error);
    }
  
}