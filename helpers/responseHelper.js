class Response {
  success(res, data, statuscode = 200) {
    let resPayload = {
      status: true,
      message: data.message,
      payload: data.payload,
    };
    return res.status(statuscode).send(resPayload);
  }
  error(res, data, statusCode = 200) {
    let resPayload = {
      status: false,
      message: data.message,
      payload: data.payload,
    };

    return res.status(statusCode).send(resPayload);
  }
}

export default new Response();
