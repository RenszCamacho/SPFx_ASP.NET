import * as React from "react";
import { IItem } from "../../../interface/IItem";

interface ICrudNetState {
  item: IItem;
}

export default class Form extends React.Component<{}, ICrudNetState> {
  /**
   *
   */
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      item: {
        nombre: "",
        correo: "",
        telefono: NaN,
      },
    };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    console.log(event.target.value);
    this.setState({
      item: { ...this.state.item, [event.target.name]: event.target.value },
    });
  }

  handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (this.state) console.log(this.state);
  }

  render(): React.ReactElement {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="nombre">
          <input
            type="text"
            id="nombre"
            placeholder="Introduce el Nombre"
            className="form-control mb-2"
            name="nombre"
            onChange={this.handleChange}
          />
        </div>
        <div className="correo">
          <input
            type="email"
            id="correo"
            placeholder="Introduce el Correo"
            className="form-control mb-2"
            name="correo"
            onChange={this.handleChange}
          />
        </div>
        <div className="telefono">
          <input
            type="tel"
            id="telefono"
            placeholder="Introduce el Telefono"
            className="form-control mb-2"
            name="telefono"
            onChange={this.handleChange}
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </div>
      </form>
    );
  }
}

// const Form: React.FC = () => {
//   const [item, setItem] = React.useState<IItem>({
//     nombre: "",
//     correo: "",
//     telefono: NaN,
//   });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     console.log(event.target.value);

//     setItem({
//       ...item,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = (event: React.SyntheticEvent): void => {
//     event.preventDefault();
//     if (item) console.log(item);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="nombre">
//         <input
//           type="text"
//           id="nombre"
//           placeholder="Introduce el Nombre"
//           className="form-control mb-2"
//           name="nombre"
//           onChange={handleChange}
//         />
//       </div>
//       <div className="correo">
//         <input
//           type="email"
//           id="correo"
//           placeholder="Introduce el Correo"
//           className="form-control mb-2"
//           name="correo"
//           onChange={handleChange}
//         />
//       </div>
//       <div className="telefono">
//         <input
//           type="tel"
//           id="telefono"
//           placeholder="Introduce el Telefono"
//           className="form-control mb-2"
//           name="telefono"
//           onChange={handleChange}
//         />
//       </div>
//       <div className="d-grid gap-2">
//         <button type="submit" className="btn btn-primary">
//           Agregar
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Form;
