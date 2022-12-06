import _user from "../Models/user.js";
import Response from "../helpers/responseHelper.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MESSAGES from "../helpers/commonMessage.js";
import uploadImage from "../helpers/multerHelper";

class userServices {
  //Register User
  async register(req, res) {
    try {
      //email validation check
      let email = await _user.findOne({ email: req.body.email });
      if (email) {
        let resPayload = {
          message: MESSAGES.EMAIL,
        };
        return Response.success(res, resPayload);
      }
      //save data
      let myUser = new _user(req.body);
      myUser.save();
      let resPayload = {
        message: MESSAGES.EMAIL__SUCCESS,
      };
      return Response.success(res, resPayload);

    } catch (err) {
      let resPayload = {
        message: err.message,
        payload: {},
      };
      return Response.error(res, resPayload);
    }
  }

  //Login
  async login(req, res) {
    try {
      const ExtUser = await _user.findOne({ email: req.body.email });
      //user account deleted
      if (ExtUser.isDeleted == true) {
        let resPayload = {
          message: MESSAGES.LOGIN_USER_DELECTED,
        };
        return Response.error(res, resPayload);
      } else {
        //Invalid Credentials
        if (!ExtUser) {
          let resPayload = {
            message: MESSAGES.LOGIN_ERROR,
          };
          return Response.error(res, resPayload);
        }
        //Password Compare
        const validPassword = await bcrypt.compare(
          req.body.password,
          ExtUser.password
        );

        //Valid Passoword or not
        if (!validPassword)
          return res.status(400).send(MESSAGES.LOGIN_PASSWORD_IN_CORRECT);
        const token = jwt.sign({ _id: ExtUser._id }, "mytoken", {
          expiresIn: "30m",
        });
        return res.status(200).send({
          message: MESSAGES.LOGIN_SUCCESS,
          Token: token,
        });
      }
    } catch (err) {
      let resPayload = {
        message: MESSAGES.LOGIN_DELETE,
      };
      return Response.error(res, resPayload);
    }
  }

  // Update user
  async updateById(req, res) {
    try {
      const ExtUser = await _user.findOne({ email: req.body.email });
      //EMail allready used 
      if (ExtUser) {
        let resPayload = {
          message: MESSAGES.EMAIL,
        };
        return Response.success(res, resPayload);
      }

      //Successfully updated data
      const updateId = req.user._id;
      const user = await _user
        .findByIdAndUpdate(updateId, req.body)
        .select("firstName lastName email");
      let resPayload = {
        message: MESSAGES.UPDATED_SUCCESS,
      };
      return Response.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: err.message,
      };
      return Response.error(res, resPayload);
    }
  }

  //soft delete
  async softDelete(req, res) {
    try {
      const id = req.user._id;
      const okUser = await _user.findOne({ _id: id });

      //check it user DB isDeletted true or not
      //User Not Found
      if (okUser.isDeleted == true) {
        let resPayload = {
          message: MESSAGES.DELETE_NOT_FOUND,
        };
        return Response.success(res, resPayload);
      }

      //User Deleted
      const myUser = await _user
        .findByIdAndUpdate(id, { isDeleted: true })
        .then((item) => {
          let resPayload = {
            message: MESSAGES.DELETE_USER,
          };
          return Response.success(res, resPayload);
        });
    } catch (error) {
      let resPayload = {
        message: err.message,
        payload: {},
      };
      return Response.error(res, resPayload);
    }
  }

  //myprofile using token get method
  async myprofile(req, res) {
    try {
      //User Profile Details
      const idUser = req.user._id;
      const user = await _user
        .findById(idUser)
        .select("firstName lastName email address");
      let resPayload = {
        message: MESSAGES.PROFILE,
        payload: user,
      };
      Response.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: err.message,
        payload: {},
      };
      return Response.error(res, resPayload);
    }
  }

  //multer file upload
  async multer(req, res) {
   try{
    //upload Image
    await uploadImage(req, res, (err) => {

      //File Not Uploaded
      if (err) {
        res.status(500).send({
          message: MESSAGES.FILE_NOT_UPLOADED,
        });
      } else {
        //File Uploaded
        res.status(200).send({
          message: MESSAGES.FILE_UPLOADED,
        });
      }
    });
   }catch(err){
    let resPayload = {
      message: err.message,
      payload: {},
    };
    return Response.error(res, resPayload);
  }
  }
}
export default new userServices();
