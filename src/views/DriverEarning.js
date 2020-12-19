import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { useSelector } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import  languageJson  from "../config/language";

export default function DriverEarning() {
  let { year,
    months,
    driver_name,
    vehicle_type,
    earning_amount, } = languageJson;
    const columns =  [
        { title: year,field: 'year'},
        { title: months, field: 'monthsName' },
        { title: driver_name, field: 'driverName'},
        { title: vehicle_type, field: 'driverVehicleNo' },
        { title: earning_amount, field: 'driverShare' },
        
    ];

  const [data, setData] = useState([]);
  const driverearningdata = useSelector(state => state.driverearningdata);

  useEffect(()=>{
        if(driverearningdata.driverearnings){
            return setData(driverearningdata.driverearnings);
        }
  },[driverearningdata.driverearnings]);


  if(driverearningdata.loading){
    return <CircularLoading/>;
  }
  return <MaterialTable
      title={languageJson.driver_earning}
      columns={columns}
      data={data}
      options={{
        exportButton: true,
        grouping: true,
      }}
      
    />;
}
