import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import styles from "./CrudNet.module.scss";

import { ICrudNetProps } from "./ICrudNetProps";
import { IItem } from "../../../interface/IItem";
import { ServicesProvider } from "../../../services/servicios";
import { postItem } from "../../../services/PostItem";
// import Form from "./Form";

interface ICrudNetState {
  data: IItem[];
  item: IItem;
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      data: [],
      item: {
        // id: 0,
        nombre: "",
        correo: "",
        telefono: 0,
      },
    };
  }

  public render(): React.ReactElement<ICrudNetProps> {
    return (
      <section
        className={`${styles.crudNet} ${
          this.props.hasTeamsContext ? styles.teams : ""
        }`}
      >
        <h1 className={styles.welcome}>Lista de Contactos</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="nombre">
              <input
                type="text"
                id="nombre"
                placeholder="Introduce el Nombre"
                className="form-control mb-2"
                name="nombre"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="correo">
              <input
                type="email"
                id="correo"
                placeholder="Introduce el Correo"
                className="form-control mb-2"
                name="correo"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="telefono">
              <input
                type="tel"
                id="telefono"
                placeholder="Introduce el Telefono"
                className="form-control mb-2"
                name="telefono"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </div>
          </form>
        </div>

        <hr />

        <div className="text-center d-grid gap-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this._getAllItems()}
          >
            Mostrar
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
              <th>Actualizar</th>
              <th>Borrar</th>
            </tr>
            {this.state.data.map(({ id, nombre, correo, telefono }) => (
              <>
                <tr key={id}>
                  <td>{id}</td>
                  <td>{nombre}</td>
                  <td>{correo}</td>
                  <td>{telefono}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning me-4"
                      onClick={() => console.log("Actualizar" + id)}
                    >
                      Acualizar
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger  me-4"
                      onClick={() => console.log("Eliminar" + id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </table>
        </div>
      </section>
    );
  }

  public handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      data: [...this.state.data],
      item: { ...this.state.item, [event.target.name]: event.target.value },
    });
  }

  public async handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();

    try {
      console.log(`ESTES ES EL ESTADO: ${this.state.item}`);
      const result = await postItem(this.state.item, this.props.wpContext);
      console.log(result);
      // const result = await this.serviceProvider.postItem(this.state.item);
      // console.log(`ESTE ES EL RESULTADO: ${result}`);
    } catch (error) {
      throw new Error("La promesa tuvo este error: " + error);
    }
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
