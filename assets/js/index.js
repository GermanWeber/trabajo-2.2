const fetchApiAll = async () => {
    try {
        const response = await fetch("https://api-de-zapatos.onrender.com");
        const data = await response.json();
        console.log(data);
        return data.zapatos;
    } catch (error) {
        console.log(error);
    }
};

const createCards =  (zapatos) => {
    const lista = document.getElementById('lista');

    zapatos.map((zapato) => {
        console.log(zapato.precio);
        const { id, name, foto ,descripcion , precio } = zapato;
        
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
             imgCard.src = foto;

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
             btnVer.addEventListener("click", () => enviarData(id, name, foto, descripcion, precio ));             

             divRow.appendChild(card);
             card.appendChild(imgCard);
             card.appendChild(divBody);

             divBody.appendChild(tituloC);
             divBody.appendChild(levelC);
             divBody.appendChild(btnVer);

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



    const enviarData = (id , name , foto, descripcion, precio) => {
        const rutaArchivoHTML = './detalles.html';
        
        console.log(id);
        console.log(name);
        console.log(foto);
        console.log(descripcion);
        console.log(precio);
        //Realiza una solicitud para obtener el contenido del archivo HTML
        fetch(rutaArchivoHTML)
             .then((response) => response.text())
             .then(html => {
    
                // Una vez que hayas obtenido el contenido del archivo HTML, puedes manipularlo
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
    
    //         // Modifica el contenido del archivo HTML como desees
               const imagePage = doc.getElementById('imagePage');
               imagePage.src = foto;
    
               const namePage = doc.getElementById('name');
                namePage.textContent = name;

                const descPage = doc.getElementById('descripcion');
                descPage.textContent = descripcion;
    
               const idPrecio = doc.getElementById('precio');
               idPrecio.textContent = precio;
    
               const nuevoHTML = new XMLSerializer().serializeToString(doc);               

          // Finalmente, puedes usar el nuevo HTML como desees, por ejemplo, inyectándolo en tu página actual
            document.body.innerHTML = nuevoHTML;
             })
    
        .catch(error => {
          console.error('Error al cargar el archivo HTML:', error);
        });
    }    