const cardsPerPage = 8;
let currentPage = 1;
let totalPages = 1;
let juegos = [];

const fetchApiAll = async () => {
    try {
        const response = await fetch("https://proyecto-juegos-api.onrender.com/");
        const data = await response.json();
        console.log(data);

        juegos = data.games;
        totalPages = Math.ceil(juegos.length / cardsPerPage);
        createCards(currentPage);
    } catch (error) {
        console.log(error);
    }
};

const createCards = (page) => {
    const lista2 = document.getElementById('lista2');
    lista2.innerHTML = ''; 

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const juegosToShow = juegos.slice(start, end);

    juegosToShow.map((juego) => {
        console.log(juego.precio);
        const { id, Title, Image, Title_URL, Price } = juego;

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
             imgCard.classList.add('h-75');
             imgCard.src = Image;

        const divBody = document.createElement('div');
        divBody.classList.add('card-body');
        divBody.classList.add('text-center');
        divBody.classList.add('mx-auto');

             const tituloC = document.createElement('h5');
             tituloC.classList.add('card-title');
             tituloC.textContent = Title;

             

        const btnVer = document.createElement('button');
        btnVer.classList.add('btn');
        btnVer.classList.add('btn-primary');
        btnVer.classList.add('text-center');
        btnVer.classList.add('mx-auto');

        btnVer.textContent = 'Ver detalles';
        btnVer.addEventListener("click", () => enviarData(id, Title, Image, Title_URL, Price));

        divRow.appendChild(card);
        card.appendChild(imgCard);
        card.appendChild(divBody);

             divBody.appendChild(tituloC);
             divBody.appendChild(btnVer);

        lista2.appendChild(divRow);
    });

    renderPaginationControls();
};

const renderPaginationControls = () => {
    const paginationContainer = document.getElementById('pagination');

    paginationContainer.innerHTML = '';

    // Botón "Anterior"
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Anterior';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            createCards(currentPage);
        }
    });

    // Botón "Siguiente"
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Siguiente';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            createCards(currentPage);
        }
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
};

const enviarData = (id, Title, Image, Title_URL, Price) => {
    const rutaArchivoHTML = './detalles.html';

    console.log(id);
    console.log(Title);
    console.log(Image);
    console.log(Title_URL);
    console.log(Price);

    fetch(rutaArchivoHTML)
        .then((response) => response.text())
        .then(html => {


            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const imagePage = doc.getElementById('imagePage');
            imagePage.src = Image;

            const namePage = doc.getElementById('name');
            namePage.textContent = Title;

            const descPage = doc.getElementById('descripcion');
            descPage.textContent = Title_URL;

            const idPrecio = doc.getElementById('precio');
            idPrecio.textContent = Price;

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML;
        })

        .catch(error => {
            console.error('Error al cargar el archivo HTML:', error);
        });
}

fetchApiAll()
    .then(() => {
    })
    .catch((error) => {
        console.log(`El error es: ${error}`);
    });
