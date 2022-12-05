// import address from "../Models/address";
// import Response from "../helpers/responseHelper.js";
// import MESSAGES from "../middleware/commonMessage";
// //import _user from "../Models/user.js";

// class addressService {
//   //Register User
//   async addressRegister(req, res) {
//     try {
      
//       let myAddress = new address(req.body);
//       myAddress.save();
//       let resPayload = {
//         message:MESSAGES.ADDRESS_UPLOADED,
//       };
//       return Response.success(res, resPayload);
//     } catch (err) {
//       let resPayload = {
//         message: err.message,
//         payload: {},
//       };
//       return Response.error(res, resPayload);
//     }
//   }
// }
// export default new addressService();