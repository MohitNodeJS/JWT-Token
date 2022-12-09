import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MESSAGES from "../utils/common_message.js";
import uploadImage from "../utils/multer_helper";
import Quote from "../models/quotes.js";
import Helper from "../utils/helper.js";

class userServices {
  //Register User
  async userRegister(req, res) {
    try {
      //email validation check
      let email = await userModel.findOne({ email: req.body.email });
      if (email) {
        let resPayload = {
          message: MESSAGES.EMAIL,
        };
        return Helper.success(res, resPayload);
      }
      //save data
      let myUser = new userModel(req.body);
      myUser.save();
      let resPayload = {
        message: MESSAGES.EMAIL__SUCCESS,
      };
      return Helper.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: err.message,
        payload: {},
      };
      return Helper.error(res, resPayload);
    }
  }

  //Login user
  async userLogin(req, res) {
    try {
      const ExtUser = await userModel.findOne({ email: req.body.email });
      //user account deleted
      if (ExtUser.isDeleted == true) {
        let resPayload = {
          message: MESSAGES.LOGINuserModel_DELECTED,
        };
        return Helper.error(res, resPayload);
      } else {
        //Invalid Credentials
        if (!ExtUser) {
          let resPayload = {
            message: MESSAGES.LOGIN_ERROR,
          };
          return Helper.error(res, resPayload);
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
      return Helper.error(res, resPayload);
    }
  }

  // Update user
  async userUpdate(req, res) {
    try {
      const idUser = req.user._id;
      const ExtUser = await userModel
        .findOne({ email: req.body.email, _id: { $ne: idUser } })
        .lean();

      //EMail allready used
      if (ExtUser) {
        let resPayload = {
          message: MESSAGES.EMAIL,
        };
        return Helper.success(res, resPayload);
      }

      //Successfully updated data
      const updateId = req.user._id;
      const user = await userModel
        .findByIdAndUpdate(updateId, req.body)
        .select("firstName lastName email");

      let resPayload = {
        message: MESSAGES.UPDATED_SUCCESS,
        payload: user,
      };
      return Helper.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: err.message,
      };
      return Helper.error(res, resPayload);
    }
  }

  //soft delete
  async userDelete(req, res) {
    try {
      const id = req.user._id;
      const okUser = await userModel.findOne({ _id: id });

      //check it user DB isDeletted true or not
      //User Not Found
      if (okUser.isDeleted == true) {
        let resPayload = {
          message: MESSAGES.DELETE_NOT_FOUND,
        };
        return Helper.success(res, resPayload);
      }

      //User Deleted
      const myUser = await userModel
        .findByIdAndUpdate(id, { isDeleted: true })
        .then((item) => {
          let resPayload = {
            message: MESSAGES.DELETE_USER,
          };
          return Helper.success(res, resPayload);
        });
    } catch (error) {
      let resPayload = {
        message: err.message,
        payload: {},
      };
      return Helper.error(res, resPayload);
    }
  }

  //myprofile using token get method
  async userProfile(req, res) {
    try {
      //User Profile Details
      const idUser = req.user._id;
      // const user = await userModel
      //   .findById(idUser)
      //   .select("firstName lastName email address");

      const user = await userModel.findById(idUser);
      const addressDetails = {
        HouseNo: user.address.houseNo,
        City: user.address.city,
        State: user.address.state,
        PinCode: user.address.pincode,
        Country: user.address.country,
      };
      const displayData = {
        FirstName: user.firstName,
        LastName: user.lastName,
        Email: user.email,
        Address: addressDetails,
      };

      let resPayload = {
        message: MESSAGES.PROFILE,
        payload: displayData,
      };
      return Helper.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: err.message,
        payload: {},
      };
      return Helper.error(res, resPayload);
    }
  }

  //multer file upload
  fileUpload(req, res) {
    try {
      uploadImage(req, res, (err) => {
        if (err) {
          let resPayload = {
            message: MESSAGES.FILE_NOT_UPLOADED,
            payload: {},
          };
          return Helper.success(res, resPayload);
        } else {
          let resPayload = {
            message: MESSAGES.FILE_UPLOADED,
            payload: {},
          };
          return Helper.success(res, resPayload);
        }
      });
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SERVER_ERROR,
        payload: {},
      };
      return Helper.error(res, resPayload, 500);
    }
  }

  //Add Quotes
  async addQuotes(req, res) {
    try {
      const idUser = req.user._id;

      const okUser = await userModel.findOne({ _id: idUser });

      //check it user DB isDeletted true or not
      //User Not Found
      if (okUser.isDeleted == true) {
        let resPayload = {
          message: MESSAGES.DELETE_NOT_FOUND,
        };
        return Helper.success(res, resPayload);
      }

      //onsole.log(idUser)
      let attribute = {
        title: req.body.title,
        by: req.body.by,
        userId: idUser,
      };
      let myQuotes = new Quote(attribute);

      myQuotes
        .save()
        .then((value) => {
          let resPayload = {
            message: MESSAGES.QUOTES_SUCCESS,
            payload: value.title,
          };
          return Helper.success(res, resPayload);
        })
        .catch((err) => {
          let resPayload = {
            message: err,
            payload: {},
          };
          return Helper.error(res, resPayload);
        });
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SERVER_ERROR,
        payload: {},
      };
      return Helper.error(res, resPayload, 500);
    }
  }

  //Quotes Details With user
  async userQuotes(req, res) {
    try {
      const idUser = req.user._id;
      const user = await userModel.findById(idUser, { firstName: 1 });

      const findQuotes = await Quote.find(
        { userId: user._id },
        {
          title: 1, //projection title :true displaying
          _id: 0, //projection title :false not displaying
          // by:1,
          //_id: 0 ,userId:0,createdAt:0,updatedAt:0,__v:0// projection code
        }
      );

      //const findQuote = await Quote.find({ userId: user._id });
      // let findQuotes = findQuote.map((value) => {
      //   return { title: value.title, by: value.by };
      // });

      const finalUser = {
        Created_By: user.firstName,
        //lastName: user.lastName,
        //Email: user.email,
        Qoutes: findQuotes,
        //by:user
      };
      let resPayload = {
        message: MESSAGES.PROFILE,
        payload: finalUser,
      };
      Helper.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SERVER_ERROR,
        payload: {},
      };
      return Helper.error(res, resPayload, 500);
    }
  }

  //aggregate : find all user data
  async totalUserQuotes(req, res) {
    try {
      let allUserQuotes = await userModel.aggregate([
        {
          $lookup: {
            from: "quotes",
            localField: "_id",
            foreignField: "userId",
            as: "Quotes",
          },
        },
        {
          $project: {
            _id: 0,
            firstName: 1,
            Quotes: {
              title: 1,
            },
          },
        },
      ]);
      //return res.send(allUserQuotes)
      let resPayload = {
        message: MESSAGES.PROFILE,
        payload: allUserQuotes,
      };
      Helper.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SERVER_ERROR,
        payload: {},
      };
      return Helper.error(res, resPayload, 500);
    }
  }

  //aggregate : get token single user data with quotes
  async getAggregationQuotes(req, res) {
    try {
      let tokenId = req.user._id;
      let allUserQuotes = await userModel.aggregate([
        {
          $lookup: {
            from: "quotes",
            localField: "_id",
            foreignField: "userId",
            as: "Quotes",
          },
        },
        {
          $match: {
            _id: tokenId,
          },
        },
        {
          $project: {
            _id: 0,
            firstName: 1,
            Quotes: {
              title: 1,
              by: 1,
            },
          },
        },
      ]);

      //return res.send(allUserQuotes)
      let resPayload = {
        message: MESSAGES.PROFILE,
        payload: allUserQuotes,
      };
      return Helper.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SERVER_ERROR,
        payload: {},
      };
      return Helper.error(res, resPayload, 500);
    }
  }
}

export default new userServices();
