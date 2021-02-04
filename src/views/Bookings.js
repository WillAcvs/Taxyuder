import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import CircularLoading from "../components/CircularLoading";
import { useSelector } from "react-redux";
import  languageJson  from "../config/language";
export default function Bookings() {
  let { booking_date,
    trip_start_time,
    trip_end_time,
    customer_name,
    car_type,
    vehicle_no,
    pickup_address,
    drop_address,
    assign_driver,
    booking_status,
    trip_cost_driver_share,
    convenience_fee,
    Gross_trip_cost,
    discount_ammount,
    Customer_paid,
    payment_status,
    payment_mode,
    payment_getway,
    cash_payment_amount,
    card_payment_amount,
    wallet_payment_amount, 
  } = languageJson;

    const columns =  [
        { title: booking_date, field: 'tripdate' },
        { title: trip_start_time, field: 'trip_start_time' },
        { title: trip_end_time, field: 'trip_end_time' },
        { title: customer_name,field: 'customer_name'},
        { title: car_type, field: 'carType' },
        { title: vehicle_no, field: 'vehicle_number' },  
        { title: pickup_address, field: 'pickupAddress' },
        { title: drop_address, field: 'dropAddress' },
        { title: assign_driver, field: 'driver_name' },
        { title: booking_status, field: 'status' },
        { title: trip_cost_driver_share, field: 'driver_share'},
        { title: convenience_fee, field: 'convenience_fees'},
        { title: Gross_trip_cost, field: 'trip_cost' },
        { title: discount_ammount, field: 'discount'},      
        { title: Customer_paid, field: 'customer_paid'},
        { title: payment_status, field: 'payment_status'},
        { title: payment_mode, field: 'payment_mode'},
        { title: payment_getway, field: 'getway'},
        { title: cash_payment_amount, field: 'cashPaymentAmount'},
        { title: card_payment_amount, field: 'cardPaymentAmount'},
        { title: wallet_payment_amount, field: 'usedWalletMoney'},
        
        ];

  const [data, setData] = useState([]);
  const bookingdata = useSelector(state => {
    return state.bookingdata;
  });

  useEffect(()=>{
        if(bookingdata.bookings){
            setData(bookingdata.bookings);
        }
  },[bookingdata.bookings]);


  
  if(bookingdata.loading){
    return <CircularLoading/>;
  }

  return <MaterialTable
    title={languageJson.booking_text}
    columns={columns}
    data={data}
    options={{ exportButton: true }} />;
}
