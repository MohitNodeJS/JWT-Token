import _user from "../Models/user.js";
import  Response  from "../helpers/responseHelper.js";

class userServices{
    adduser(req,res){
        
        let myUser =new _user(req.body);
        myUser.save().then((value)=>{
                let resPayload={
                    message:'successfully added data',
                    payload:myUser
                    
                }
                // console.log(resPayload);
                return Response.success(res,resPayload);
        }).catch(err =>
            {
                return  res.status(401).send("not working")
             })
    
    }
}
export default new userServices();