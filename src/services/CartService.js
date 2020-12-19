import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';


class CartService {

    static #db = firebase.database().ref();
    static #fr = firebase.firestore();
    static #ref = this.#db.child("rates").child("car_type");
    static #ref_ubications = this.#fr.collection('ubications');

    static async getCarts() {
        const results = (await this.#ref.get()).val();

        return Object.keys(results).map(key => {
            let data = results[key];

            return {
                id: key,
                ...data
            }
        });
    }

    static async getCartPlaces() {
        return (await this.#ref_ubications.get()).docs.map(element => {
            return {
                id: element.id,
                ...element.data(),
            }
        });
    }

    static async updateUbication(id, ubication){
        return await this.#ref.child(id).update({
            ubication
        });
    }

    static async updateCarImage(id, newCarImage){
        return await this.#ref.child(id).update({
            image: newCarImage
        })
    }
}

export default CartService;
