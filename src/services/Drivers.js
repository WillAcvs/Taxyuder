import firebase from 'firebase/app';
import 'firebase/database';

class DriversService {
    static _rd = firebase.database().ref().child("users");
    static async getUsers(){
        return await this._rd.get();
    }

    /**
     * Este metodo lo que hace es buscar a todos los conductores de esta manera
     * si => @name driver/$uid/driverActiveStatus @isEquial true
     */
    static async getDrivers() {
        let users = (await this.getUsers()).val();
        var tempValue = [];
        for(let key of Object.keys(users)){
            const element = users[key];
            
            if(element.usertype === "driver"){
                tempValue.push({ ...element, id: key });
            }
        }
        return tempValue;
    }

    static async updateDriverMoneyMode({ id, mode }){
        this._rd.child(id).update({
            moneyMode: mode,
        });
    }
}

export default DriversService;