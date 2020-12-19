import firebase from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';

import 'firebase/storage';

class StorageService {

    static #st = firebase.storage();
    static #uid = uuidv4();

    static async uploadFileCart({ file, }){
        let response = await this.#st.ref().child("cars/" + this.#uid).put(file);
        return await response.ref.getDownloadURL();
    }
}


export default StorageService;