import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import  languageJson  from "../config/language";
import {
    editPromo
  }  from "../actions/promoactions";

export default function Promos() {

    let { promo_name,
      description,
      title,
      promo_discount_value,
      max_limit,
      min_limit,
      start_date,
      end_date,
      promo_usage,
      promo_used_by, } = languageJson;
    const columns =  [
        { title: promo_name,field: 'promo_name'},
        { title: description, field: 'promo_description' },
        {
            title: title,
            field: 'promo_discount_type',
            lookup: { flat: 'Flat', percentage: 'Percentage' },
        },
        { title: promo_discount_value,field: 'promo_discount_value', type: 'numeric'},
        { title: max_limit, field: 'max_promo_discount_value', type: 'numeric' },
        { title: min_limit, field: 'min_order' , type: 'numeric'},
        { title: start_date,field: 'promo_start'},
        { title: end_date, field: 'promo_validity' },
        { title: promo_usage, field: 'promo_usage_limit', type: 'numeric' },
        { title: promo_used_by, field: 'promo_used_by', editable:'never' }
    ];

  const [data, setData] = useState([]);
  const promodata = useSelector(state => state.promodata);
  const dispatch = useDispatch();

  useEffect(()=>{
        if(promodata.promos){
            setData(promodata.promos);
        }
  },[promodata.promos]);

  const removeExtraKeys = (tblData) =>{
        if(tblData.promo_discount_value) tblData.promo_discount_value = parseFloat(tblData.promo_discount_value);
        if(tblData.max_promo_discount_value) tblData.max_promo_discount_value = parseFloat(tblData.max_promo_discount_value);
        if(tblData.min_order) tblData.min_order = parseFloat(tblData.min_order);
        if(tblData.promo_usage_limit) tblData.promo_usage_limit = parseFloat(tblData.promo_usage_limit);
    return tblData;
  }

  return (
    promodata.loading? <CircularLoading/>:
    <MaterialTable
      title={languageJson.promo_offer}
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tblData = data;
              tblData.push(newData);
              dispatch(editPromo(removeExtraKeys(newData),"Add"));
            }, 600);
          }),       
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tblData = data;
              tblData[tblData.indexOf(oldData)] = newData;
              dispatch(editPromo(removeExtraKeys(newData),"Update"));
            }, 600);
          }),
        onRowDelete: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              dispatch(editPromo(removeExtraKeys(newData),"Delete"));
            }, 600);
          }), 
      }} 
    />
  );
}
