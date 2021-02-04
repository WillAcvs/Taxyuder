import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import languageJson from "../config/language";
import {
  editCarType
} from "../actions/cartypeactions";
import Swal from 'sweetalert2';
import StorageService from '../services/StorageService';
import CartService from '../services/CartService';

export default function CarTypes() {
  const renderImage = (rowData) => (
    <img alt='Car' src={rowData.image} style={{ width: 50 }} onClick={()=> updateImage(rowData)} className="inputCarSelect"/>
  );

  

  const updateImage = async (rowData)=> {
    let { value } = await Swal.fire({
      title: "Actualizar Imagen",
      input: "file",
    });

    Swal.close();
    
    if(!!value && (value.type === "image/jpeg" || value.type === "image/png")){
      Swal.fire("Cargando ...");
      let url = await StorageService.uploadFileCart({ file: value });
      CartService.updateCarImage(rowData.id, url);
      getCars().then( _ => Swal.close())

    }else{
      return Swal.fire("Solo están permitidas imagenes PNG y JPEG/JPG");
    }
  }


  let { image, name, rate_per_km, rate_per_hour, min_fare, convenience_fee_percent, } = languageJson;
  const columns = [
    { title: image, field: 'image', render: rowData =>  renderImage(rowData)},
    { title: name, field: 'name' },
    { title: rate_per_km, field: 'rate_per_kilometer', type: 'numeric' },
    { title: rate_per_hour, field: 'rate_per_hour', type: 'numeric' },
    { title: "Ubicación", field: "ubication.name", type: "name", editable: "never", emptyValue: "No Configurado" },
    { title: "Tarifa PU", field: "ubication.value", type: "numeric", editable: "never", emptyValue: 0 },
    { title: min_fare, field: 'min_fare', type: 'numeric' },
    { title: convenience_fee_percent, field: 'convenience_fees', type: 'numeric' }
  ];
  const [data, setData] = useState([]);
  const cartypes = useSelector(state => state.cartypes);
  const dispatch = useDispatch();

  const getCars = ()=> {
    return     CartService.getCarts().then( cars => {
      if (cars) {
        setData(cars);
      }
    });
  }
  useEffect(() => {
    getCars();
  }, [cartypes.cars]);

  const removeExtraKeys = (tblData) => {
    for (let i = 0; i < tblData.length; i++) {
      const tableData = tblData[i];
      if (tableData.rate_per_kilometer) tableData.rate_per_kilometer = parseFloat(tableData.rate_per_kilometer);
      if (tableData.rate_per_hour) tableData.rate_per_hour = parseFloat(tableData.rate_per_hour);
      if (tableData.convenience_fees) tableData.convenience_fees = parseFloat(tableData.convenience_fees);
    }
    return tblData;
  }


  if (cartypes.loading) {
    return <CircularLoading />;
  }

  return <MaterialTable
    title={languageJson.car_type}
    columns={columns}
    data={data}
    options={{
      exportButton: true,
      pageSize: 10
    }}
    editable={{
      onRowAdd: newData =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
            const tblData = data;
            tblData.push(newData);
            dispatch(editCarType(removeExtraKeys(tblData), "Add"));
          }, 600);
        }),
      onRowUpdate: (newData, oldData) =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
            const tblData = data;
            tblData[tblData.indexOf(oldData)] = newData;
            dispatch(editCarType(removeExtraKeys(tblData), "Update"));
          }, 600);
        }),
      onRowDelete: oldData =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
            const tblData = data;
            tblData.splice(tblData.indexOf(oldData), 1);
            dispatch(editCarType(removeExtraKeys(tblData), "Delete"));
          }, 600);
        }),
    }}
  />;
}