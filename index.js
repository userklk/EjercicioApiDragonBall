let pagina = 1;
const limite = 10;

document.addEventListener('DOMContentLoaded', () => {
    const botonAnterior = document.getElementById('atrasBoton');
    const botonSiguiente = document.getElementById('siguienteBoton');
    const botonBuscar = document.getElementById('mostrarPersonaje');
    const botonBuscarPorGenero = document.getElementById('mostrarPersonaje');

    const obtenerDatos = () => {
        let url = `https://dragonball-api.com/api/characters?limit=${limite}&page=${pagina}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => mostrarDatos(data))
            .catch(error => console.log(error));
    };

    const buscarPorNombre = () => {
        const nombre = document.getElementById('personaje').value.trim();
        let url = `https://dragonball-api.com/api/characters?limit=${limite}&page=${pagina}&name=${nombre}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => mostrarDatos(data))
            .catch(error => console.log(error));
    };

    const buscarPorGenero = (genero) => {
        let url = `https://dragonball-api.com/api/characters?limit=${limite}&page=${pagina}&gender=${genero}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => mostrarDatos(data))
            .catch(error => console.log(error));
    };

    const mostrarDatos = (data) => {
        let cuerpo = "";
        const items = data.items;
        items.forEach(item => {
            cuerpo += `<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.race}</td>
                        <td>${item.gender}</td>
                        <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
                    </tr>`;
        });
        document.getElementById('data').innerHTML = cuerpo;
        botonAnterior.disabled = pagina === 1;
        botonSiguiente.disabled = items.length < limite;
    };

    botonAnterior.addEventListener('click', () => {
        if (pagina > 1) {
            pagina--;
            obtenerDatos();
        }
    });

    botonSiguiente.addEventListener('click', () => {
        pagina++;
        obtenerDatos();
    });

    botonBuscar.addEventListener('click', () => {
        buscarPorNombre();
    });

    botonBuscarPorGenero.addEventListener('click', () => {
        const genero = document.getElementById('genero').value.trim();
        buscarPorGenero(genero);
    });

    obtenerDatos();

});

