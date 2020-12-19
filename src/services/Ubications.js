import firebase from 'firebase/app';
import 'firebase/firestore';

class UbicationsService {

    static  _fr = firebase.firestore();
    static _root = this._fr.collection("ubications");

    static async getUbications(){
        return await this._root.get();
    }

    static async addUbication(name, value){
        return await this._root.add({
            name,
            value,
            __date: new Date(), 
        });
    }

    static async deleteUbication(id){
        return await this._root.doc(id).delete();
    }
}

export default UbicationsService;