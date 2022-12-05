import userServices from "../Services/userServices.js";
import JoiMainMiddleware from "../middleware/joiMiddleware.js";
import authValidaton from "../middleware/authMiddleware.js";
//mport multer from "multer";
import uploadImage from "../helpers/multerHelper";
import MESSAGES from "../middleware/commonMessage.js";
import addressService from "../Services/addressService.js";

const Route = (app) => {
  // app.post("/register", JoiMainMiddleware.JoiMiddleware, userServices.register);
  app.post("/register", JoiMainMiddleware.JoiMiddleware, userServices.register);
  app.post("/login", JoiMainMiddleware.JoiMiddleware, userServices.login);
  app.get("/profile", authValidaton, userServices.myprofile);
  app.put(
    "/profile",
    [authValidaton, JoiMainMiddleware.JoiMiddleware],
    userServices.updateById
  );
  app.post("/delete", authValidaton, userServices.softDelete);

  //Multer file uploded
  app.post("/fileUpload", (req, res, next) => {
    uploadImage(req, res, (err) => {
      if (err) {
        //res.send(err);
        res.status(500).send({
          message: MESSAGES.FILE_NOT_UPLOADED,
        });
      } else {
        res.status(200).send({
          message: MESSAGES.FILE_UPLOADED,
        });
        // res.send(req.files)
      }
    });
  });

  //address
  //app.post("/",JoiMainMiddleware.JoiMiddleware, addressService.addressRegister);
};

export default Route;
