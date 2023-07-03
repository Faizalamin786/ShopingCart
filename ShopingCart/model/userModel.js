const mongoose=  require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type:"String",
    required:true,
    trim:true
    },
    lname:{
        type:"String",
        required:true,
        trim:true
    },
    email: {
        type: "String",
        required: true,
        unique: true,
        trim : true,
        validate: {
          validator: function(value) {
            // Regular expression to validate email format
            return  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value); //check
                ///^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  
          },
          message:"Invalid format"
        }
    },

profileImage:{
    type:"String",
    required:true,

},
phoneNumber:{
    type:Number,
    required:true,
    unique:true,

},
shipping: {
    street: {
        type:"String",
        required: true
    },

    city: 
    {type:"Sring",
    required:true
     
},
    pincode: 
    {type:Number, 
        required:true
    }
  },
  billing: {
    street: {
        type:"String", 
        required:true
    },
    city: {
        type:"string", 
        required:true,
    },
    pincode: 
    {type:Number, 
        requird:true
    }
  }

},{timeStamps:true});

module.exports = mongoose.model('user', userSchema);
