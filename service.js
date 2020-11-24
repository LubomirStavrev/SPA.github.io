const userModel = firebase.auth();

const signIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'
const signUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
const addKeyForAuth = 'AIzaSyAhaRGiM4SgcMWETJb792iTk-tzDj9vj54';
const realTimeDataBase = 'https://workshop-2-88cca.firebaseio.com/.json';

const auth = {
    register(email, password) {

        return userModel.createUserWithEmailAndPassword(email, password)
            .then(function(data) {

                return data;
            }).catch(function(error) {

                return 'Already registered';
            });
    },
    login(email, password) {

        return userModel.signInWithEmailAndPassword(email, password)
            .then(function(data) {


                let userUsefulData = {
                    email: data.user.email,
                    uid: data.user.uid,
                }
                localStorage.setItem('isLogged', JSON.stringify(userUsefulData))

                return data;
            }).catch(function(error) {

                return 'User doesn`t exist';
            });
    },
    logout() {
        localStorage.removeItem('isLogged')
    },
    createOffer(name, price, imageUrl, description, brand) {
        let id = JSON.parse(localStorage.getItem('isLogged')).uid;
        return fetch(realTimeDataBase, {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    price,
                    imageUrl,
                    description,
                    brand,
                    id,
                    isBought: false
                })
            })
            .then(res => res.json())
            .then(data => {

            })
    },
    getAllOffers() {
        return fetch(realTimeDataBase)
            .then(res => res.json())
            .then(data => {
                let dataRes = [];
                if (data) {

                    Object.entries(data).forEach(el => {

                        dataRes.push({
                            idOffer: el[0],
                            name: el[1].name,
                            price: el[1].price,
                            imageUrl: el[1].imageUrl,
                            description: el[1].description,
                            brand: el[1].brand,
                        })
                    })
                }
                return dataRes;
            })
    },
    getUserData() {
        let data = JSON.parse(localStorage.getItem('isLogged'));
        if (data) {

            let obj = {
                isLogged: Boolean(data.email),
                email: data ? data.email : '',
            }
            return obj;
        } else {
            let obj = {
                isLogged: false,
                email: '',
            }
            return obj;

        }
    },
    deleteProduct(offerId) {
        return fetch(`https://workshop-2-88cca.firebaseio.com/${offerId}/.json`, {
            method: 'DELETE'
        }).then(res => res.json())
    },
    buyShoe(offerId) {
        return fetch(`https://workshop-2-88cca.firebaseio.com/${offerId}/.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                isBought: true
            })
        }).then(res => res.json())
    },
    getShoeDescription(id) {
        return fetch(realTimeDataBase)
            .then(res => res.json())
            .then(data => {
                let dataRes;
                if (data) {
                    Object.entries(data).forEach(el => {
                        if (el[0] == id) {
                            let isSalesmen = false;
                            if (localStorage.getItem('isLogged')) {

                                let currUserId = JSON.parse(localStorage.getItem('isLogged')).uid
                                if (currUserId == el[1].id) {
                                    isSalesmen = true;
                                }
                            }
                            dataRes = {
                                desc: true,
                                idOffer: el[0],
                                name: el[1].name,
                                price: el[1].price,
                                imageUrl: el[1].imageUrl,
                                description: el[1].description,
                                brand: el[1].brand,
                                isSalesmen,
                                isBought: el[1].isBought
                            }
                            return;
                        }
                    })
                }
                return dataRes;
            })
    }



}