/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IItem } from "../interface/IItem";

export class ServicesProvider {
  private _URL = "https://localhost:7253/api";

  private _wpContext: WebPartContext;

  public constructor(context: WebPartContext) {
    this._wpContext = context;
  }

  private _httpClientOptionsForGlobal: IHttpClientOptions = {
    headers: new Headers(),
    method: "GET",
    mode: "no-cors",
  };

  public async getItems(): Promise<IItem[]> {
    try {
      const response: HttpClientResponse = await this._wpContext.httpClient.get(
        this._URL + "/contactos",
        HttpClient.configurations.v1,
        {
          headers: new Headers(),
          method: "GET",
        }
      );
      const responseJson: IItem[] = await response.json();
      return responseJson;
    } catch (error) {
      throw new Error("La llamada httPClient tuvo un error" + error);
    }
  }

  public async postItem(payload: IItem): Promise<IItem> {
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Accept", "*/*");
    requestHeaders.append("Content-type", "application/json");
    requestHeaders.append("Cache-Control", "no-cache");

    let httpClientOptions: IHttpClientOptions = {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      mode: "no-cors",
      method: "POST",
    };

    if (payload) {
      httpClientOptions = {
        ...httpClientOptions,
        body: JSON.stringify(payload),
      };
    }

    try {
      const response: HttpClientResponse =
        await this._wpContext.httpClient.post(
          "https://localhost:7253/api/contactos",
          HttpClient.configurations.v1,
          httpClientOptions
        );

      const responseJSON = await response.json();
      return responseJSON;

      // const responseJson: IItem = await response.json();
      // return responseJson;
    } catch (error) {
      throw new Error("La llamada httPClient tuvo un error" + error);
    }
  }
}
