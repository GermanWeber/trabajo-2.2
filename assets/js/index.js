

const fetchApiAll = async () => {
    try {
        const response = await fetch("https://api-de-zapatos.onrender.com");
        const data = await response.json();
        console.log(data);
        return data.results;
    } catch (error) {
        console.log(error);
    }
};

const createCards = (zapatos) => {
    const lista = document.getElementById('lista');

    zapatos.map((zapato) => {
        console.log(zapato.precio);
        const { id, name, foto } = zapato;
        
        const divRow = document.createElement('div');
        divRow.classList.add("col-xl-3", "col-lg-3", "col-md-3", "col-sm-12", "col-xs-12");

        const card = document.createElement('div');
        card.classList.add('card', 'mt-2', 'mb-2');

        const imgCard = document.createElement('img');
        imgCard.classList.add('card-img-top', 'mt-2', 'mx-auto', 'w-75');
        imgCard.src = foto;

        const divBody = document.createElement('div');
        divBody.classList.add('card-body', 'text-center', 'mx-auto');

        const tituloC = document.createElement('h5');
        tituloC.classList.add('card-title');
        tituloC.textContent = name;

        const levelC = document.createElement('p');
        levelC.classList.add('card-text');
        levelC.textContent = id;            

        divRow.appendChild(card);
        card.appendChild(imgCard);
        card.appendChild(divBody);

        divBody.appendChild(tituloC);
        divBody.appendChild(levelC);
        

        lista.appendChild(divRow);
    });
}

fetchApiAll()
    .then((data) => {
        if (data) {
            createCards(data);
        }
    })
    .catch((error) => {
        console.log(`El error es: ${error}`);    
    });