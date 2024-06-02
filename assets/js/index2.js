const fetchApiAll = async () => {
    try {
        const response = await fetch("https://proyecto-juegos-api.onrender.com/");
        const data = await response.json();
        console.log(data);

        return data.games;
    } catch (error) {
        console.log(error);
    }
};


const createCards =  (juegos) => {
    const lista2 = document.getElementById('lista2');

    juegos.map((juego) => {
        console.log(juego.precio);
        const { id, Title, Image ,Title_URL , Price } = juego;
        
        const divRow = document.createElement('div');
             divRow.classList.add("col-xl-3");
             divRow.classList.add("col-lg-3");
             divRow.classList.add("col-md-3");
             divRow.classList.add("col-sm-12");
             divRow.classList.add("col-xs-12");

             const card = document.createElement('div');
             card.classList.add('card');
             card.classList.add('mt-2');
             card.classList.add('mb-2');

             const imgCard = document.createElement('img');
             imgCard.classList.add('card-img-top');
             imgCard.classList.add('mt-2');
             imgCard.classList.add('mx-auto');
             imgCard.classList.add('w-75');
             imgCard.src = Image;

             const divBody = document.createElement('div');
             divBody.classList.add('card-body');
             divBody.classList.add('text-center');
             divBody.classList.add('mx-auto');

             const tituloC = document.createElement('h5');
             tituloC.classList.add('card-title');
             tituloC.textContent = name;

             const levelC = document.createElement('p');
             levelC.classList.add('card-text');
             levelC.textContent = id;

             const btnVer = document.createElement('button');
             btnVer.classList.add('btn');
             btnVer.classList.add('btn-primary');
             btnVer.classList.add('text-center');
             btnVer.classList.add('mx-auto');

             btnVer.textContent = 'Ver detalles';
             btnVer.addEventListener("click", () => enviarData(id,Title,Image,Title_URL,Price));             

             divRow.appendChild(card);
             card.appendChild(imgCard);
             card.appendChild(divBody);

             divBody.appendChild(tituloC);
             divBody.appendChild(levelC);
             divBody.appendChild(btnVer);

             lista2.appendChild(divRow);
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