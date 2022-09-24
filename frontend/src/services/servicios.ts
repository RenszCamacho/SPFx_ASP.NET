import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IItem } from "../interface/IItem";

export class ServicesProvider {
  private _wpContext: WebPartContext;

  public constructor(context: WebPartContext) {
    this._wpContext = context;
  }

  private _httpClientOptionsForGlobal: IHttpClientOptions = {
    headers: new Headers(),
    method: "GET",
    // mode: "cors",
  };

  public async getItems(): Promise<IItem[]> {
    try {
      const response: HttpClientResponse = await this._wpContext.httpClient.get(
        "https://localhost:7253/api/contactos",
        HttpClient.configurations.v1,
        this._httpClientOptionsForGlobal
      );
      const responseJson: IItem[] = await response.json();
      return responseJson;
    } catch (error) {
      throw new Error("La llamada httPClient tuvo un error" + error);
    }
  }
}
