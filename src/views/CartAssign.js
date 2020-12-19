import { CircularProgress } from '@material-ui/core';
import React from 'react';
import CartService from '../services/CartService';
import { Edit } from '@material-ui/icons';
import Swal from 'sweetalert2';

class CartAssign extends React.Component {
    constructor() {
        super();

        this.state = {
            cars: null,
            places: null,
            selected: ""
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const places = await CartService.getCartPlaces();
        return CartService.getCarts().then(response => {
            var tempPlaces = {};

            for (let element of places) {
                tempPlaces[element.name] = element;
            }

            this.setState({ cars: response, places: tempPlaces });
        });
    }


    async onChangeSelect(value, id) {

        const response = await Swal.fire({
            title: "¿Estás Seguro@ de Cambiar a: " + value + "?",
            showCancelButton: true,
            showConfirmButton: true,
        });

        if (response.isConfirmed) {
            Swal.showLoading();

            CartService.updateUbication(id, this.state.places[value]).then(() => {
                return this.getData().then(() => Swal.hideLoading());
            });
        }

        this.setState({ selected: "" });
    }

    render() {
        if (this.state.cars === null && this.state.places === null) {
            return <CircularProgress />;
        }

        if (this.state.cars?.length === 0 || this.state.places.length === 0) {
            return (<strong>Verifica la Cantidad de Vehiculos o de Ubicaciones</strong>);
        }

        const renderPlace = (place, id) => {

            if (this.state.selected === id) {
                return (
                    <select onChange={e => this.onChangeSelect(e.target.value, id)} className="select-ubications">
                        <option>Seleccionar ...</option>
                        {
                            Object.keys(this.state.places).map(key => {
                                const element = this.state.places[key];
                                return <option>{element.name}</option>;
                            })
                        }
                    </select>
                );
            }

            return (
                <>
                                    {
                        place === null || this.state.places[place] === undefined
                            ? (<strong>Valor no Encontrado, Actualizar</strong>)
                            : (<strong>Valor: {this.state.places[place].value || "0"}</strong>)
                    }
                <div onClick={() => this.setState({ selected: id })} className="container-ubication-selected">
                    <p className="ubication-setted">{place || "No Definido"}</p>
                    <Edit />
                </div>
                
                </>
            );
        }

        return (
            <section style={{ textAlign: "center" }}>
                {
                    this.state.cars.map(element => {
                        return (
                            <div className="container-cart">
                                <strong>Nombre: {element.name}</strong>
                                <p className="percent-convenience">Porcentaje de Conveniencia: {element.convenience_fees}</p>
                                {renderPlace(element.ubication?.name, element.id)}
                            </div>
                        );
                    })
                }
            </section>
        );
    }
}

export default CartAssign;