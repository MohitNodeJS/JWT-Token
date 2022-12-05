import multer from "multer";
// import util from "util";
// import Response from "../helpers/responseHelper.js";
// import MESSAGES from "../middleware/commonMessage.js";
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `public-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "png" ||
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "jpeg" ||
    file.mimetype.split("/")[1] === "gif" ||
    file.mimetype.split("/")[1] === "pdf" 
  ) {
    cb(null, true);
  } else {
    cb(new Error("invalid"), false);
    //const err = new Error("Only .png, .jpg and .jpeg format allowed!");
    //err.name = "ExtensionError";
    //return cb(err);
  }
};

const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
}).any("profile", 10); //profile its a field name & how many upload one time

//let uploadImage = util.promisify(uploadfile);
export default uploadImage;