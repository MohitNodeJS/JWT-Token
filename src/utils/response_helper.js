import MESSAGES from "./common_message.js";

//predefined strcture
class Response {
  success(res, data, statuscode = 200) {
    let resPayload = {
      status: true,
      message: data.message,
      payload: data.payload,
    };
    return res.status(statuscode).send(resPayload);
  }
  error(res, data = {}, statusCode = 500) {
    let resPayload = {
      status: false,
      message: MESSAGES.SERVER_ERROR,
      //message: data.message,
      payload: data.payload,
    };

    return res.status(statusCode).send(resPayload);
  }
}

export default new Response();
