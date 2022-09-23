import { WebPartContext } from "@microsoft/sp-webpart-base";
import { HttpClient } from "@microsoft/sp-http";

export default class Servicios {
  private url = "http://localhost:7253/api";

  post(context: WebPartContext) {
    const _post = context.httpClient
      .post(this.url, HttpClient.configurations.v1, {
        method: "POST",

      }).then((response) => {

        if (response.ok) {
          response.json;
        }

      }).catch((error) => {
        throw new Error(error);
      });
  }

  get(context: WebPartContext) {
    const _get = context.httpClient
      .get(this.url, HttpClient.configurations.v1, {
        
       headers:{
        'Accept':'application/json;odata=nometadata',
        'odata-version':''
       }

      }).then((response) => {

        if (response.ok) {
          response.json;
        } 
      }).catch((error) => {
        throw new Error(error);
      });
  }





}
