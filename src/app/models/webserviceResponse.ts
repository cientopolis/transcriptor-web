export class WebserviceResponse {
  status: string;
  message: string;
  data: Object;
  
  constructor(staus,message,data){
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
