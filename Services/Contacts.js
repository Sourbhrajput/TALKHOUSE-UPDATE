const {ContactsModel} = require('../Database/Model/Model')

 

class Contacts{


  async  addDetails(req,resp)
    {
     try{
        const {name,email,message}=req.body; 
        const data=await new ContactsModel({name,email,message}).save();
        if(!data)
        {
         throw new Error();
        }
        return resp.send({error:false,message:"Deatails inserted"})
     }
     catch(e)
     {
        return resp.send({error:true,message:"Deatails not inserted"})
     }
    }



}


module.exports=new Contacts();