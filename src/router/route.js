import userServices from "../services/user_services.js";
import JoiMainMiddleware from "../middleware/joi_middleware.js";
import authValidaton from "../middleware/auth_middleware.js";
import uploadImage from "../utils/multer_helper.js";

const Route = (app) => {
  app.post("/register", JoiMainMiddleware.JoiMiddleware, userServices.userRegister);
  app.post("/login", JoiMainMiddleware.JoiMiddleware, userServices.userLogin);
  app.get("/profile", authValidaton, userServices.userProfile);
  app.put(
    "/profile",
    [authValidaton, JoiMainMiddleware.JoiMiddleware],
    userServices.userUpdate
  );
  app.post("/delete", authValidaton, userServices.userDelete);

  //Multer file uploded
  app.post("/fileUpload",userServices.fileUpload)
  
  // add quotes
  app.post(
    "/quotesRegister",
    [authValidaton, JoiMainMiddleware.JoiMiddleware],
    userServices.addQuotes
  );

  // Details quotes
  app.get("/quotesDetails", authValidaton, userServices.userQuotes);

  //aggregate: all user without token
  app.get("/allUserQuotesDetails", userServices.totalUserQuotes);

  //aggregate: single user with token
  app.get(
    "/getAggregationQuotes",
    authValidaton,
    userServices.getAggregationQuotes
  );
};

export default Route;
