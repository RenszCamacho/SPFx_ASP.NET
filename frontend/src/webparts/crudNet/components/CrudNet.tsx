/* eslint-disable @typescript-eslint/no-explicit-any */
import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import styles from "./CrudNet.module.scss";

import { ICrudNetProps } from "./ICrudNetProps";
import { IItem } from "../../../interface/IItem";
import { ServicesProvider } from "../../../services/servicios";

interface ICrudNetState {
  data: IItem[];
}

export default class CrudNet extends React.Component<
  ICrudNetProps,
  ICrudNetState
> {
  private serviceProvider: ServicesProvider;
  /**
   *
   */
  constructor(props: ICrudNetProps, state: ICrudNetState) {
    super(props);

    this.serviceProvider = new ServicesProvider(this.props.wpContext);

    this.state = {
      data: [],
    };
  }

  // public async componentDidMount(): Promise<void> {
  //   try {
  //     await this._getAllItems();
  //   } catch (error) {
  //     throw new Error(error);
  //   }

  //   // this._getAllItems().then(console.log).catch(console.error);
  // }

  public render(): React.ReactElement<ICrudNetProps> {
    return (
      <section
        className={`${styles.crudNet} ${
          this.props.hasTeamsContext ? styles.teams : ""
        }`}
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
          <button
            type="button"
            className="btn btn-primary me-4"
            onClick={() => {
              console.log("first");
            }}
          >
            Agregar
          </button>
          <button
            type="button"
            className="btn btn-success me-4"
            onClick={() => this._getAllItems()}
          >
            Mostrar
          </button>
          <button
            type="button"
            className="btn btn-warning me-4"
            onClick={this._getAllItems}
          >
            Acualizar
          </button>
          <button
            type="button"
            className="btn btn-danger  me-4"
            onClick={() => console.log("Eliminar")}
          >
            Eliminar
          </button>
        </div>
        <hr />
        <div className="container" id="lista">
          <table>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Telefono</th>
            </tr>
            {this.state.data.map(({ id, nombre, correo, telefono }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{nombre}</td>
                <td>{correo}</td>
                <td>{telefono}</td>
              </tr>
            ))}
          </table>
        </div>
      </section>
    );
  }

  private async _getAllItems(): Promise<void> {
    try {
      const result = await this.serviceProvider.getItems();
      this.setState({ data: result });
    } catch (error) {
      throw new Error("La promesa tuvo este error: " + error);
    }
  }
}
