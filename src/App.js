import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import ProtectedRoute from './components/ProtectedRoute';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import CarTypes from './views/CarTypes';
import Bookings from './views/Bookings';
import Promos from './views/Promos';
import Users from './views/Users';
import Referral from './views/Referral';
import { fetchUser}  from "./actions/authactions";
import AuthLoading from './components/AuthLoading';
import Notifications from './views/Notifications';
import DriverEarning from './views/DriverEarning'
import Earningreports from './views/Earningreports'
import MoneyUser from './views/MoneyUser';
import Ubications from './views/Ubications';
import CartAssign from './views/CartAssign';
class App extends React.Component{

  componentDidMount(){
    store.dispatch(fetchUser());
  }

  render(){
    return (
      <Provider store={store}>
        <AuthLoading>
          <Router>
            <Switch>
              <ProtectedRoute exact component={Dashboard} path="/"/>
              <ProtectedRoute exact component={CarTypes} path="/cartypes"/>
              <ProtectedRoute exact component={Bookings} path="/bookings"/>
              <ProtectedRoute exact component={Promos} path="/promos"/>
              <ProtectedRoute exact component={Users} path="/drivers"/>
              <ProtectedRoute exact component={DriverEarning} path="/driverearning"/>
              <ProtectedRoute exact component={Referral} path="/referral"/>
              <ProtectedRoute exact component={Notifications} path="/notifications"/>
              <ProtectedRoute exact component={Earningreports} path="/earningreports"/>

              <ProtectedRoute exact component={CartAssign} path="/cartAssign" />
              
              <ProtectedRoute exact component={MoneyUser} path="/drivers/updateMoneyMode"/>
              <ProtectedRoute exact component={Ubications} path="/ubications" />

              <Route component={Login} path="/login"/>
            </Switch>
          </Router>
        </AuthLoading>
      </Provider>
    );
  }
}

//asi se queda comentado?, pues o puedes quitar, realmente no hace nada, lo unico que hice fue quitar el componente funcionaly pasarlo a una clase, es todo, a muy bien
//Gracias
// function App() {
//   store.dispatch(fetchUser());
//   return (
//     <Provider store={store}>
//       <AuthLoading>
//         <Router>
//           <Switch>
//             <ProtectedRoute exact component={Dashboard} path="/"/>
//             <ProtectedRoute exact component={CarTypes} path="/cartypes"/>
//             <ProtectedRoute exact component={Bookings} path="/bookings"/>
//             <ProtectedRoute exact component={Promos} path="/promos"/>
//             <ProtectedRoute exact component={Users} path="/drivers"/>
//             <ProtectedRoute exact component={DriverEarning} path="/driverearning"/>
//             <ProtectedRoute exact component={Referral} path="/referral"/>
//             <ProtectedRoute exact component={Notifications} path="/notifications"/>
//             <ProtectedRoute exact component={Earningreports} path="/earningreports"/>
//             <Route component={Login} path="/login"/>
//           </Switch>
//         </Router>
//       </AuthLoading>
//     </Provider>
//   );
// }

export default App;
