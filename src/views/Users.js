import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import  languageJson  from "../config/language";
import {
     editUser, deleteUser
  }  from "../actions/usersactions";
import DriversService from '../services/Drivers';

export default function Users() {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState({});

  //const usersdata = useSelector(state => state.usersdata);
  const cartypes = useSelector(state => state.cartypes);
  const dispatch = useDispatch();

  useEffect(()=>{
    DriversService.getDrivers().then( res => {
      if(!!res && data.length === 0){
        console.log(res);
        setData(res);
      }
    })
  },[data]);

  useEffect(()=>{
    if(cartypes.cars){
        let obj =  {};
        cartypes.cars.map((car)=> obj[car.name]=car.name)
        setCars(obj);
    }
  },[cartypes.cars]);


  let { first_name,
    last_name,
    user_type,
    email,
    mobile,
    profile_image,
    vehicle_model,
    vehicle_no,
    car_type,
    account_approve,
    driver_active,
    lisence_image,
    wallet_balance,
    signup_via_refferal,
    refferal_id, } = languageJson;

  const columns = [
      { title: first_name, field: 'firstName', editable:'never'},
      { title: last_name, field: 'lastName', editable:'never'},
      { title: user_type, field: 'usertype', editable:'never'},
      { title: email, field: 'email', editable:'never'},
      { title: mobile, field: 'mobile', editable:'never'},
      { title: profile_image, field: 'profile_image',render: rowData => rowData.profile_image?<img alt='Profile' src={rowData.profile_image} style={{width: 50,borderRadius:'50%'}}/>:null, editable:'never'},
      { title: vehicle_model, field: 'vehicleModel', editable:'never'},
      { title: vehicle_no, field: 'vehicleNumber', editable:'never'},
      { title: car_type, field: 'carType',lookup: cars},
      { title: account_approve, field: 'approved', type:'boolean'},
      { title: driver_active, field: 'driverActiveStatus', type:'boolean'},
      { title: lisence_image, field: 'licenseImage',render: rowData => rowData.licenseImage?<img alt='License' src={rowData.licenseImage} style={{width: 100}}/>:null, editable:'never'},
      { title: wallet_balance, field: 'walletBalance', type:'numeric', editable:'never'},
      { title: signup_via_refferal, field: 'signupViaReferral', type:'boolean', editable:'never'},
      { title: refferal_id, field: 'refferalId', editable:'never'}
  ];

  if(data.length === 0){
    return <CircularLoading/>;
  }

  return (
    <MaterialTable
      title={languageJson.all_user}
      columns={columns}
      data={data}
      options={{
        exportButton: true,
        pageSize: 20
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              dispatch(editUser(oldData.id,newData));
            }, 600);
          }),
        

        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              dispatch(deleteUser(oldData.id));
            }, 600);
          }),
      }}
    />
  );
}
