const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

const studentSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        minlength : 3,
    },

    email : {
        type : String,
        required : [true, "Plaese fill the email field"],
        unique : [true , "email id already present"],
        validate: {
            validator: function(val) {
              return validator.isEmail(val);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
    },
    phone : {
        type : Number,
        required : true,
        unique : true,
    },
    address : {
        type : String,
        required : true,
    }
  });

  const Student = mongoose.model('Student', studentSchema);

    module.exports = {Student};

