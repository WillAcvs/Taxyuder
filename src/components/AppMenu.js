import React from 'react';
import {
  ListItemIcon,
  Divider,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

import logo from '../assets/sidemenu_logo.png';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CarIcon from '@material-ui/icons/DirectionsCar';
import ListIcon from '@material-ui/icons/ListAlt';
import ExitIcon from '@material-ui/icons/ExitToApp';
import OfferIcon from '@material-ui/icons/LocalOffer';
import PeopleIcon from '@material-ui/icons/People';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import MapOutlined from '@material-ui/icons/MapOutlined';
import NotifyIcon from '@material-ui/icons/NotificationsActive';
import {
  signOut
} from "../actions/authactions";


function AppMenu() {
  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(signOut());
  };

  const elements = [
    {
      name: "Panel de Contol",
      route: "/",
      icon: <DashboardIcon />
    },
    {
      name: "Usuarios",
      route: "/drivers",
      icon: <PeopleIcon />
    },
    {
      name: "Tipo de Cobro",
      route: "/drivers/updateMoneyMode",
      icon: <PeopleIcon />
    },
    {
      name: "Ubicaciones",
      route: "/ubications",
      icon: <MapOutlined />
    },
    {
      name: "Tipo de Vehiculo",
      route: "/cartypes",
      icon: <CarIcon />
    },
    {
      name: "(Vehiculo) Asignar Tarifa",
      route: "/cartAssign",
      icon: <CarIcon />
    },
    {
      name: "Historial de Reservas",
      route: "/bookings",
      icon: <ListIcon />
    },
    {
      name: "Ganancias",
      route: "/Earningreports",
      icon: <MoneyIcon />
    },
    {
      name: "Historial de Ganancia",
      route: "/driverearning",
      icon: <MoneyIcon />
    },
    {
      name: "Promociones",
      route: "/promos",
      icon: <OfferIcon />
    },
    {
      name: "Referidos",
      route: "/referral",
      icon: <MoneyIcon />
    },
    {
      name: "Notificaciones Push",
      route: "/notifications",
      icon: <NotifyIcon />
    },

    {
      name: "Salir",
      route: "/notifications",
      icon: <ExitIcon />,
      onClick: LogOut
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#444444' }}>
        <img style={{ marginTop: '20px', marginBottom: '20px', width: '120px', height: '120px' }} src={logo} alt="Logo" />
      </div>
      <Divider />
      <MenuList>
        {
          elements.map(element => {
            const child = (
              <>
                <ListItemIcon>
                  {element.icon}
                </ListItemIcon>
                <small>{element.name}</small>
              </>
            );
            const key = Math.random();
            if(element.onClick != null){
              return (
                <MenuItem onClick={element.onClick} key={key}>
                  {child}
                </MenuItem>
              );
            }
            return (
              <MenuItem component={Link} to={element.route} key={key}>
                {child}
              </MenuItem>
            );
          })
        }
      </MenuList>
    </div>
  );
}

export default AppMenu;