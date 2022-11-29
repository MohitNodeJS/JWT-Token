class Response{
    success(req,data,statuscode=200){
        let resPayload={
                ststus:true,
                message:data.message,
                payload:data.payload
        }
        res.status(statuscode).send(resPayload)
     }
     error(res,data,statusCode=200) {
        let resPayload = {
            status: false,
            message: data.message,
            payload: data.payload
        }
        res.status(statusCode).send(resPayload);
    }
}

export default new Response();  