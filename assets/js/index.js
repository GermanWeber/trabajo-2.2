const cardsPerPage = 8;
let currentPage = 1;
let totalPages = 1;
let zapatos = [];

const fetchApiAll = async () => {
    try {
        const response = await fetch("https://api-de-zapatos.onrender.com");
        const data = await response.json();
        console.log(data);

        zapatos = data.zapatos;
        totalPages = Math.ceil(zapatos.length / cardsPerPage);
        createCards(currentPage);
    } catch (error) {
        console.log(error);
    }
};

const createCards = (page) => {
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; 

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const zapatosToShow = zapatos.slice(start, end);

    zapatosToShow.map((zapato) => {
        console.log(zapato.precio);
        const { id, name, foto, descripcion, precio } = zapato;

        const divRow = document.createElement('div');
        divRow.classList.add("col-xl-3");
        divRow.classList.add("col-lg-3");
        divRow.classList.add("col-md-4");
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
        imgCard.classList.add('w-85');
        imgCard.src = foto;

        const divBody = document.createElement('div');
        divBody.classList.add('card-body');
        divBody.classList.add('text-center');
        divBody.classList.add('mx-auto');

        const tituloC = document.createElement('h5');
        tituloC.classList.add('card-title');
        tituloC.textContent = name;

        const btnVer = document.createElement('button');
        btnVer.classList.add('btn');
        btnVer.classList.add('btn-primary');
        btnVer.classList.add('text-center');
        btnVer.classList.add('mx-auto');

        btnVer.textContent = 'Ver detalles';
        btnVer.addEventListener("click", () => enviarData(id, name, foto, descripcion, precio));

        divRow.appendChild(card);
        card.appendChild(imgCard);
        card.appendChild(divBody);

        divBody.appendChild(tituloC);
        divBody.appendChild(btnVer);

        lista.appendChild(divRow);
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

const enviarData = (id, name, foto, descripcion, precio) => {
    const rutaArchivoHTML = './detalles.html';

    console.log(id);
    console.log(name);
    console.log(foto);
    console.log(descripcion);
    console.log(precio);

    fetch(rutaArchivoHTML)
        .then((response) => response.text())
        .then(html => {


            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const imagePage = doc.getElementById('imagePage');
            imagePage.src = foto;

            const namePage = doc.getElementById('name');
            namePage.textContent = name;

            const descPage = doc.getElementById('descripcion');
            descPage.textContent = descripcion;

            const idPrecio = doc.getElementById('precio');
            idPrecio.textContent = precio;

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
