import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useSelector } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import languageJson from "../config/language";

export default function Earningreports() {
  let { year,
    months,
    trip_cost_driver_share,
    convenience_fee,
    Gross_trip_cost,
    Discounts,
    Customer_paid,
    Profit, } = languageJson;
  const columns = [
    { title: year, field: 'year' },
    { title: months, field: 'monthsName' },
    { title: trip_cost_driver_share, field: 'rideCost' },
    { title: convenience_fee, field: 'convenienceFee' },
    { title: Gross_trip_cost, field: 'tripCost' },
    { title: Discounts, field: 'discountAmount' },
    { title: Customer_paid, field: 'customerPaid' },
    { title: Profit, field: 'myEarning' },

  ];

  const [data, setData] = useState([]);
  const Earningreportsdata = useSelector(state => state.Earningreportsdata);

  useEffect(() => {
    if (Earningreportsdata.Earningreportss) {
      setData(Earningreportsdata.Earningreportss);
    }
  }, [Earningreportsdata.Earningreportss]);


  if (Earningreportsdata.loading) {
    return <CircularLoading />;
  }
  return <MaterialTable
    title={languageJson.earning_reports}
    columns={columns}
    data={data}
    options={{
      exportButton: true,
    }}
  />;
}
