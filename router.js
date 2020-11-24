const appElement = document.getElementById('app')


const routs = {
    'home': '../templates/homePageGuests.hbs',
    'register': '../templates/registerPage.hbs',
    'login': '../templates/loginPage.hbs',
    'createOffer': '../templates/createOffer.hbs',
    'logout': '../templates/homePageGuests.hbs',
    'details': '../templates/buyShoePage.hbs'
}

function router(path) {
    if (path == 'logout') {
        auth.logout();
    }
    let requestPath = routs[path];
    let idOffer = ''
    if (path.includes('details/')) {
        requestPath = routs['details'];
        idOffer = path.split('/')[1];
    }
    getTemplate(requestPath)
        .then(data => {

            let temp = Handlebars.compile(data);
            let info = auth.getUserData();

            auth.getAllOffers().then(shoe => {
                auth.getShoeDescription(idOffer).then(desc => {
                    Object.assign(info, desc);
                    info.shoes = shoe;
                    let htmlRes = temp(info);
                    appElement.innerHTML = htmlRes;

                })
            })


        })

}

function navigate(path) {

    history.pushState('', {}, path)

    router(path.slice(1));
}

function navigateHandler(e) {
    e.preventDefault();

    let url = new URL(e.target.href)

    navigate(url.pathname);
}

function errorHandler(err) {
    console.log(err);
}

function getTemplate(requestPath) {
    return fetch(requestPath)
        .then(res => res.text());
}


navigate('/home');