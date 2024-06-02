



const fetchApiAll = async () => {
    try {
        
        const response = await fetch(`https://api-de-zapatos.onrender.com`);
        const data = await response.json();
        console.log(data);
        return data.results;
        
    } catch (error) {
        console.log(error);
    }
};


fetchApiAll();