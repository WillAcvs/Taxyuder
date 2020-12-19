import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { firebaseConfig } from './dev';

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const authRef = firebase.auth();
export const FIREBASE_AUTH_PERSIST = firebase.auth.Auth.Persistence.LOCAL;
export const bookingRef = databaseRef.child("bookings");
export const carTypesRef = databaseRef.child("rates/car_type");
export const promoRef = databaseRef.child("offers");
export const userRef = databaseRef.child("users");
export const notifyRef = databaseRef.child("notifications/");
export const referralRef = databaseRef.child("referral/bonus/amount");
export const promoEditRef = (id) => databaseRef.child("offers/"+ id);
export const notifyEditRef = (id) => databaseRef.child("notifications/"+ id);
export const singleUserRef = (uid) => databaseRef.child("users/" + uid);



/**
 * La idea de trabajarlo asi es que no ejecutará firebase a menos que llames @name Methods.getUsers()
 * aqui siempre estará llamando firebase, si lo cambias así vuelves a inicializar firebase desde el index y lo quitas de aca,
 * alguna otra duda? entiendo un poco, vi que comentaste algo en el index?so se queda así
 */
// class Methods {
//     static getUsers(){

//     }
// }
/**
 * Te recomiendo hagas una clase con todos los metodos
 */


