const mongoose = require("mongoose");
const  ContactsSchema = new mongoose.Schema({

     name: {
          required: true,
          type: String
     },
     email: {
          required: true,
          type: String
     },
   
     message: {
          type: String,
          required: true,
     }

},
     {
          timestamps: true
     }
);
module.exports = ContactsSchema;