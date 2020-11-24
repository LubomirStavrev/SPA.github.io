function registerPartials() {
    let headerElem = document.getElementById('header-template').innerHTML;
    let footerElem = document.getElementById('footer-template').innerHTML;
    let shoeElem = document.getElementById('shoe-template').innerHTML;
    Handlebars.registerPartial('header', headerElem)
    Handlebars.registerPartial('footer', footerElem)
    Handlebars.registerPartial('shoe', shoeElem)

}

function headerEventListener(e) {

    if (e.target.tagName == 'A') {
        navigateHandler(e);
    } else if (e.target.tagName == 'IMG') {
        e.preventDefault();
        navigate('/home');
    } else {
        return;
    }

}


function registerForm(e) {
    e.preventDefault()
    let email = document.getElementById('register-Email');
    let password = document.getElementById('register-Password');
    let rePassword = document.getElementById('register-Re-Password');

    if (password.value != rePassword.value) {
        return;
    }

    auth.register(email.value, password.value)
        .then(function(data) {
            if (data == 'Already registered') {
                password.value = '';
                rePassword.value = '';
                return;
            }
            navigate('/login');
        })
}

function loginForm(e) {
    e.preventDefault()
    let email = document.getElementById('login-Email');
    let password = document.getElementById('login-Password');

    auth.login(email.value, password.value)
        .then(function(data) {
            if (data == 'User doesn`t exist') {
                password.value = '';
                return;
            }
            navigate('/home');
        })
}

function createOfferForm(e) {
    e.preventDefault();
    let name = document.getElementById('createOffer-Name');
    let price = document.getElementById('createOffer-Price');
    let imageUrl = document.getElementById('createOffer-ImageUrl');
    let description = document.getElementById('createOffer-Description');
    let brand = document.getElementById('createOffer-Brand');

    auth.createOffer(name.value, price.value, imageUrl.value, description.value, brand.value)
        .then(data => {
            navigate('/home');
        })

}

function deleteProductBtn(e) {
    e.preventDefault();
    let url = new URL(window.location.href);
    let offerId = url.pathname.split('/')[2];

    auth.deleteProduct(offerId)
        .then(data => {
            console.log(data);

            navigate('/home');
        })

}

function buyProductBtn(e) {
    e.preventDefault();
    let url = new URL(window.location.href);
    let offerId = url.pathname.split('/')[2];

    auth.buyShoe(offerId)
        .then(data => {
            console.log(data);

            navigate('/home');
        })

}
//Really Cool shoes please buy them now cousI dont have any money but i have to buy bread so i can make some sandwiches with tuna and chocolate xd just kidding
registerPartials();