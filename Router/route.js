import userServices from "../Services/userServices.js";
import JoiMainMiddleware from "../middleware/joiMiddleware.js";
import authValidaton from "../middleware/authMiddleware.js";
//mport multer from "multer";
//import uploadImage from "../helpers/multerHelper";
//import MESSAGES from "../middleware/commonMessage.js";
//import addressService from "../Services/addressService.js";

const Route = (app) => {
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
  app.post("/fileUpload", userServices.multer);

  // add quotes
  app.post(
    "/quotesRegister",
    [authValidaton, JoiMainMiddleware.JoiMiddleware],
    userServices.addQuotes
  );

  // Details quotes
  app.get("/quotesDetails", authValidaton, userServices.userQuotes);

  //aggregate
  app.get("/allUserQuotesDetails", userServices.totalUserWithQuotes);

};

export default Route;
