import userServices from "../Services/userServices.js";
import JoiMainMiddleware from "../middleware/joiMiddleware.js";
import authValidaton from "../middleware/authMiddleware.js";

const Route = (app) => {
  app.post("/register", JoiMainMiddleware.JoiMiddleware, userServices.register);
  app.post("/login", JoiMainMiddleware.JoiMiddleware, userServices.login);
  app.get("/profile", authValidaton, userServices.myprofile);
  app.put(
    "/profile",
    [authValidaton, JoiMainMiddleware.JoiMiddleware],
    userServices.updateById
  );
  app.delete("/delete",userServices.softDelete)
  // app.delete("/delete",
  // userServices.deleteByID)
};

export default Route;
