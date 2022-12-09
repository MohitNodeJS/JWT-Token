import validationHelper from "../utils/validation_helper.js";
import ResponseHelper from "../utils/response_helper.js";
import MESSAGES from "../utils/common_message.js";
class JoiMainMiddleware {
  JoiMiddleware(req, res, next) {
    // to get method from request------------tolowercase
    let route = req.route.path;
    let method = req.method.toLowerCase();
    // to get route from request

    let schema = validationHelper(route, method);
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      let errors = error.details.map((curr) => {
        let o = {};
        Object.assign(o, {
          message: curr.message.replace(/[\,"]/g, " "),
          path: curr.path.toString(),
        });
        return o;
      });
      let payload = {
        message: MESSAGES.PAYLOAD_ERROR,
        payload: errors,
      };
      return ResponseHelper.error(res, payload);
    }
    next();
  }
}

export default new JoiMainMiddleware();
