import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import styles from "./CrudNet.module.scss";
import { ICrudNetProps } from "./ICrudNetProps";
// import { escape } from '@microsoft/sp-lodash-subset';
// import Servicios from '../../../services/servicios';
// import { HttpClient } from "@microsoft/sp-http";
// import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export interface IItem {
  id: number;
  nombre: string;
  correo: string;
  telefono: number;
}

export default class CrudNet extends React.Component<ICrudNetProps, {}> {
  private url = "http://localhost:7253/api";

  public render(): React.ReactElement<ICrudNetProps> {
    const { description, hasTeamsContext, wpContext } = this.props;

    console.log(wpContext, description);

    return (
      <section
        className={`${styles.crudNet} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <h1 className={styles.welcome}>Lista de Contactos</h1>
        <div className="container">
          <div className="id">
            <input
              type="number"
              id="identificador"
              placeholder="Introduce el Id"
            />
          </div>
          <br />
          <div className="nombre">
            <input type="text" id="nombre" placeholder="Introduce el Nombre" />
          </div>
          <br />
          <div className="correo">
            <input type="email" id="correo" placeholder="Introduce el Correo" />
          </div>
          <br />
          <div className="telefono">
            <input
              type="tel"
              id="telefono"
              placeholder="Introduce el Telefono"
            />
            <hr />
          </div>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-primary me-4">
            Agregar
          </button>
          <button type="button" className="btn btn-success me-4">
            Mostrar
          </button>
          <button type="button" className="btn btn-warning me-4">
            Acualizar
          </button>
          <button type="button" className="btn btn-danger  me-4">
            Eliminar
          </button>
        </div>
        <hr />
        <div className="container" id="lista" />
      </section>
    );
  }

  // private get() {
  //   console.log(this.props);
  //   this.props.context.spHttpClient
  //     .get(this.url, SPHttpClient.configurations.v1, {
  //       headers: {
  //         Accept: "application/json;odata=nometadata",
  //         "odata-version": "",
  //       },
  //     })
  //     .then((response: SPHttpClientResponse) => {
  //       if (response.ok) {
  //         response.json().then((responseJSON: any) => {
  //           let html = `<table>
  //                           <tr>
  //                             <th>Id</th>
  //                             <th>Nombre</th>
  //                             <th>Correo</th>
  //                             <th>Telefono</th>
  //                           </tr>`;
  //           responseJSON.value.map((item: IItem, index: number) => {
  //             html += `
  //                         <tr>
  //                           <td>${item.id}</td>
  //                           <td>${item.nombre}</td>
  //                           <td>${item.correo}</td>
  //                           <td>${item.telefono}</td>
  //                         </tr>`;
  //           });
  //           html += `</table>`;
  //           document.getElementById("lista").innerHTML = html;
  //           console.log(responseJSON);
  //         });
  //       }
  //     })
  //     .catch((error: any) => {
  //       throw new Error(error);
  //     });
  // }
}
