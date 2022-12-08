import _user from "../Models/user.js";
import Response from "../helpers/responseHelper.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MESSAGES from "../helpers/commonMessage.js";
import uploadImage from "../helpers/multerHelper";
//import address from "../Models/address.js";
import Quote from "../Models/quotes.js";

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

  //Login user
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
      const idUser = req.user._id;
      const ExtUser = await _user
        .findOne({ email: req.body.email, _id: { $ne: idUser } })
        .lean();

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
        payload: user,
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
      // const user = await _user
      //   .findById(idUser)
      //   .select("firstName lastName email address");

      const user = await _user.findById(idUser);
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
      return Response.success(res, resPayload);
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
    try {
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
    } catch (err) {
      let resPayload = {
        message: err.message,
        payload: {},
      };
      return Response.error(res, resPayload);
    }
  }

  //Add Quotes
  async addQuotes(req, res) {
    try {
      const idUser = req.user._id;
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
          return Response.success(res, resPayload);
        })
        .catch((err) => {
          let resPayload = {
            message: err,
            payload: {},
          };
          return Response.error(res, resPayload);
        });
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SERVER_ERROR,
        payload: {},
      };
      return Response.error(res, resPayload, 500);
    }
  }

  //Quotes Details With user
  async userQuotes(req, res) {
    try {
      const idUser = req.user._id;
      const user = await _user.findById(idUser, { firstName: 1 });

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
      Response.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SERVER_ERROR,
        payload: {},
      };
      return Response.error(res, resPayload, 500);
    }
  }

  //aggregate : find all user data
  async totalUserWithQuotes(req, res) {
    try {
      //const idUser = req.user._id;
      //const user = await _user.findById(idUser);
      let allUserQuotes = await _user.aggregate([
        {
          $lookup: {
            from: "quotes",
            localField: "_id",
            foreignField: "userId",
            as: "Quotes",
          },
        },
        {
          '$project': {
              '_id':0,
              'firstName': 1, 
              'Quotes': {
                  'title': 1
              }
          }
      },
      
      ]);
      //return res.send(allUserQuotes)
      let resPayload = {
        message: MESSAGES.PROFILE,
        payload: allUserQuotes,
      };
      Response.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SERVER_ERROR,
        payload: {},
      };
      return Response.error(res, resPayload, 500);
    }
  }
}

export default new userServices();
