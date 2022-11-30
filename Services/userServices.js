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

  //Login
  async login(req, res) {
    try {
      const ExtUser = await _user.findOne({ email: req.body.email });
      if (ExtUser.isDeleted == true) {
        let resPayload = {
          message: MESSAGES.LOGIN_USER_DELECTED,
        };
        return Response.error(res, resPayload);
      } else {
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
        const token = jwt.sign({ _id: ExtUser._id }, "mytoken", {
          expiresIn: "30s",
        });
        return res.status(200).send({
          message: MESSAGES.LOGIN_SUCCESS,
          Token: token,
        });
      }
    } catch (err) {
      let resPayload = {
        message: MESSAGES.LOGIN_DELETE,
        //message: err.message,
        //payload: {},
      };
      return Response.error(res, resPayload);
    }
  }

  // Update user
  async updateById(req, res) {
    try {
      const ExtUser = await _user.findOne({ email: req.body.email });
      if (ExtUser) {
        let resPayload = {
          message: MESSAGES.EMAIL,
        };
        return Response.error(res, resPayload);
      }
      const updateId = req.user._id;
      const user = await _user
        .findByIdAndUpdate(updateId, req.body)
        .select("firstName lastName email");
      let resPayload = {
        message: MESSAGES.UPDATED_SUCCESS,
        //payload: user,
      };
      return Response.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: err.UPDATED_ERROR,
        //message: err.message,
        //payload: {},
      };
      return Response.error(res, resPayload);
    }
  }

  //soft delete
  async softDelete(req, res) {
    try {
      const id = req.user._id;
      const okUser = await _user.findOne({ _id: id });
      if (okUser.isDeleted == true) {
        let resPayload = {
          message: MESSAGES.DELETE_NOT_FOUND,
          //payload: {},
        };
        return Response.error(res, resPayload);
      }
      const myUser = await _user
        .findByIdAndUpdate(id, { isDeleted: true })
        .then((item) => {
          let resPayload = {
            message: MESSAGES.DELETE_USER,
            //payload: {},
          };
          return Response.error(res, resPayload);
        });
    } catch (error) {
      res.status(500).send(MESSAGES.DELETE_ERROR);
    }
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
}
export default new userServices();
