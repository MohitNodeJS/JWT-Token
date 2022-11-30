import _user from "../Models/user.js";
import Response from "../helpers/responseHelper.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MESSAGES from "../middleware/commonMessage.js";

class userServices {
  //Register User
  register(req, res) {
    let myUser = new _user(req.body);
    myUser
      .save()
      .then((value) => {
        let resPayload = {
          message: MESSAGES.REGISTER_SUCCESS,
          //payload:myUser
        };
        return Response.success(res, resPayload);
      })
      .catch((err) => {
        let resPayload = {
          message: MESSAGES.REGISTER_ERROR,
        };
        return Response.error(res, resPayload);
      });
  }

  //Login User email & pwd
  async login(req, res) {
    const ExtUser = await _user.findOne({ email: req.body.email });
    if (!ExtUser) {
      let resPayload = {
        message: MESSAGES.LOGIN_ERROR,
      };
      return Response.error(res, resPayload);
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      ExtUser.password
    );

    if (!validPassword)
      return res.status(400).send(MESSAGES.LOGIN_PASSWORD_IN_CORRECT);
    const token = jwt.sign({ _id: ExtUser._id }, "mytoken");
    return res.status(200).send({
      message: MESSAGES.LOGIN_SUCCESS,
      Token: token,
    });
  }

  //myprofile using token get method
  async myprofile(req, res) {
    try {
      const idUser = req.user._id;
      const user = await _user.findById(idUser);
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

  async updateById(req, res) {
    try{
        const updateId = req.user._id
        const user = await _user.findByIdAndUpdate(updateId,req.body).select("firstName lastName email")
        let resPayload = {
            message: MESSAGES.UPDATED_SUCCESS,
            payload: user,
          };
          return Response.success(res, resPayload);
    }
    catch (err) {
        let resPayload = {
          message:MESSAGES.UPDATED_ERROR
          //message: err.message,
          //payload: {},
        };
        return Response.error(res, resPayload);
      }
  }
  //soft delete
  //const options = { validateBeforeSave: false };
  async softDelete(req, res){
    const options = { validateBeforeSave: false };
    _user.softDelete({ _id: _user._id, name: _user.firstName }, options);
  }
}

export default new userServices();
