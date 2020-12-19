import React from 'react';
import CircularLoading from '../components/CircularLoading';
import DriversService from '../services/Drivers';
import Swal from 'sweetalert2';


class MoneyUser extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            staticUsers: null,
            currentUser: null,
            editableId: ""
        }
    }

    componentDidMount() {
        this._getData();
    }

    _getData() {
        DriversService.getDrivers().then(res => {
            this.setState({
                users: res,
                staticUsers: res,
            })
        })
    }

    getMoneyMode(mode) {
        if (!!mode === false) {
            return "No Definido";
        } else if (mode === "daily") {
            return "% de Servicio";
        } else {
            return "Valor Semanal";
        }
    }


    getModeOption(option) {
        var name;

        switch (option) {
            case "% DE SERVICIO": name = "daily"; break;
            case "VALOR SEMANAL": name = "mensual"; break;
            case "POR DEFECTO": name = "default"; break;
            default: name = "Error"; break;
        }
        return name;
    }

    renderMoneyOption({ moneyMode, id }) {
        if (id !== this.state.editableId) {
            return <h3 className="no-margin">Tipo de Cobro: {this.getMoneyMode(moneyMode)}</h3>;
        } else if (this.state.editableId === id) {
            return (
                <select className="select-mode-money" onChange={e => {
                    let value = e.target.value;
                    Swal.showLoading();
                    DriversService.updateDriverMoneyMode({ mode: this.getModeOption(value), id }).then((_) => {
                        this._getData();
                        this.setState({ editableId: "" })
                        Swal.hideLoading();
                    });

                }}>
                    {
                        ["Seleccionar ...", "POR DEFECTO", "% DE SERVICIO", "SUSCRIPCIÓN SEMANAL"].map(element => {
                            let key = Math.random();
                            return (<option key={key}>{element}</option>);
                        })
                    }
                </select>
            );
        } else return <></>;
    }


    renderSearchBar() {
        return (
            <input className="serachBar-money-mode" placeholder="Nombre, Telefono ..."  onChange={ e => {
                const lower = text => String (text).toLowerCase();
                let value = lower(e.target.value);

                if(value.length === 0){
                    this.setState({ users: this.state.staticUsers });
                    return;
                }

                var tempValues = [];
                for (let element of this.state.staticUsers) {
                    if(lower(element.firstName).includes(value) || lower(element.mobile).includes(value)){
                        tempValues.push(element);
                    }
                }
                this.setState({ users: tempValues })
            }} />
        );
    }

    renderContent(){
        if(this.state.users.length > 0){
            return (
                <div style={{ display: "flex", flexDirection: "row" }}>
                {
                    this.state.users.map(element => {
                        let key = Math.random();

                        return (
                            <div key={key} className="card">
                                <div className="chip-option" onClick={(_) => this.setState({ editableId: element.id })}>
                                    Editar Modo de Cobro
                            </div>
                                <h1 className="no-margin">{element.firstName}</h1>
                                {this.renderMoneyOption({ moneyMode: element.moneyMode, id: element.id })}
                                <p className="no-margin">Telefono: {element.mobile}</p>
                            </div>
                        );
                    })
                }
            </div>
            );
        }else {
            return (
                <h1>No hay resultados disponibles</h1>
            );
        }
    }
    render() {
        if (this.state.staticUsers === null) {
            return <CircularLoading />;
        }

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                {this.renderSearchBar()}
                {this.renderContent()}
            </div>
        );
    }
}

export default MoneyUser;