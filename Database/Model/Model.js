const mongoose=require("mongoose");
const RefreshSchema = require("../Schema/Token-Schema");
const UserSchema =require("../Schema/User-Schema");
const RoomsSchema= require("../Schema/Rooms-Schema");
const ContactsSchema= require("../Schema/Contacts");


const UserModel= mongoose.model("User",UserSchema);
const RefreshModel= mongoose.model("RefreshToken",RefreshSchema);
const RoomsModel= mongoose.model("Rooms",RoomsSchema);
const ContactsModel= mongoose.model("Contacts",ContactsSchema);
 

//  for delete in db
// (async()=>
// { 
//           const user=await UserModel.deleteMany();
//           const refresh=await RefreshModel.deleteMany();
//           const Rooms=await RoomsModel.deleteMany();
//           console.log([user,refresh,Rooms]);
// })();


module.exports={UserModel,RefreshModel,RoomsModel,ContactsModel};
 