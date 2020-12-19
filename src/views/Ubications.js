import { CircularProgress } from "@material-ui/core";
import { CloseOutlined, MapRounded } from "@material-ui/icons";
import React from "react";
import Swal from "sweetalert2";
import UbicationsService from "../services/Ubications";





class Ubications extends React.Component {
  constructor() {
    super();
    this.state = {
      ubications: null,
      query: "",
      autoComplete: null,
    }
  }


  componentDidMount() {
    this.getData();

    this.loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyC0xyQOvHWcnnrpGO1pe7Ty2O9O6tueFEQ&v=3.exp&libraries=geometry,drawing,places`,
      () => this.handleScriptLoad()
    );
  }

  handleScriptLoad() {
    console.log(this.autoCompleteRef);

    var ref = this.autoCompleteRef;

    if (ref == null) {
      ref = document.querySelector("#search-input");
    }

    var tempAutoComplete = new window.google.maps.places.Autocomplete(ref, { types: ["(cities)"], });

    tempAutoComplete.setFields(["address_components", "formatted_address"]);
    tempAutoComplete.addListener("place_changed", () =>
      this.handlePlaceSelect()
    );

    this.setState({
      autoComplete: tempAutoComplete
    });

  }

  async getData() {
    return await UbicationsService.getUbications().then(res => {
      return this.setState({ ubications: res.docs });
    });
  }

  async handlePlaceSelect() {
    const addressObject = this.state.autoComplete.getPlace();
    const query = addressObject.formatted_address;

    this.setState({ query });

    const nameUbication = query.split(",")[0];

    let response = await Swal.fire({
      title: "Ingresa el Valor de la Tarifa para: " + nameUbication,
      input: "number",
      showCancelButton: true,
      inputAttributes: {
        autocapitalize: "on"
      },
      allowOutsideClick: false
    });

    if(!!response.value === false){
      Swal.fire("El valor es obligatorio");
      return;
    }
    let value = response?.value;

    if (value.search(/[a-z]/i) <= 0) {
      Swal.showLoading();

      UbicationsService.addUbication(nameUbication, parseInt(value)).then(async () => {
        this.getData().then(() => {
          Swal.hideLoading();
        });
      })
    } else {
      Swal.fire("El Valor Ingresado no es Valido.");
    }
  }

  loadScript(url, callback) {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }


  async alertDelete({ name, id }) {
    console.log("Nombre: " + name + " id: " + id);
    const response = await Swal.fire({
      title: "¿Estás Seguro de Eliminar a " + name + "?",
      text: "Este proceso es irreversible",
      showCancelButton: true
    });

    if (response.isConfirmed) {
      Swal.showLoading();
      UbicationsService.deleteUbication(id).then(async () => {
        await this.getData();
        Swal.close();
      });
    }
  }

  renderUbication() {

    if (this.state.ubications === null) {
      return (
        <div className="box-loading">
          <CircularProgress />
        </div>
      );
    }

    if ((this.state.ubications).length === 0) {
      return <h1>No existen ubicaciones registradas</h1>
    }

    return (
      <section className="ubications-list">
        {
          this.state.ubications.map(element => {
            let data = element.data();
            let key = Math.random();
            return (
              <div className="ubication-item" key={key}>
                <div className="container-close-item" onClick={() => {
                    return this.alertDelete({ name: data.name, id: element.id });
                  }}>
                  <CloseOutlined className="ubication-icon" />
                  ELIMINAR
                </div>
                <br />
                <strong>{data.value}</strong>

                <div className="content">
                  <MapRounded />
                  <p>{data.name}</p>
                </div>
                
              </div>
            );
          })
        }
      </section>
    );
  }

  autoCompleteRef = null;

  render() {

    return (
      <>
        <h1>Añadir una Ubicacion</h1>
        <div className="search-location-input">
          <input
            ref={this.autoCompleteRef}
            id="search-input"
            onChange={event => {
              let name = event.target.value;
              this.setState({
                query: name
              });
            }}
            placeholder="Buscar ... (Mexico, Nombre lugar)"
            value={this.state.query}
          />
        </div>
        <br />
        {this.renderUbication()}
      </>
    );
  }
}



export default Ubications;