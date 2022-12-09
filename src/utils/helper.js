import response from "./response_helper";
class Helper{
    success(res,data,statuscode=200){
        return response.success(res,data,statuscode)
    }
    error(res,data,statuscode=500){
        return response.error(res,data,statuscode)
    }
}
export default new Helper;