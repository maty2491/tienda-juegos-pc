// Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaJuegos = document.querySelector('#lista-juegos')
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners() {
    // Cuando agregas un juego "Comprar"
    listaJuegos.addEventListener('click', agregarJuego)

    // Elimina juegos del carro
    carrito.addEventListener('click', eliminarJuego)

    // Vaciar el carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [] //resetear el arreglo
        limpiarHTML() // Eliminamos todo el panel del carrito
    })
}

// Funciones
function agregarJuego(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const juegoSeleccionado = e.target.parentElement.parentElement
        leerDatosJuegos(juegoSeleccionado)
    }
}
// Elimina un juego del carro
function eliminarJuego(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const juegoID = e.target.getAttribute('data-id')

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(juego => juego.id !== juegoID)
        carritoHTML() //Iteramos el carro
    }
}

// Lee el contenido del HTML y extrae la info del juego
function leerDatosJuegos(juego) {
    
    // Crear obj con el contenido actual
    const infoJuego = {
        imagen: juego.querySelector('img').src,
        titulo: juego.querySelector('h5').textContent,
        precio: juego.querySelector('.precio').textContent,
        id: juego.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si existe un elemento en el carrito
    const existe = articulosCarrito.some(juego => juego.id === infoJuego.id)
    if (existe) {
        //Actualizar la cantidad
        const juegos = articulosCarrito.map(juego => {
            if (juego.id === infoJuego.id) {
                juego.cantidad++
                return juego // retorna obj actualizado
            } else {
                return juego // retorna los ob que no son duplicados
            }
        })
        articulosCarrito = [...juegos]
    } else {
        // Agregar mas elementos al carro
        articulosCarrito = [...articulosCarrito, infoJuego]
    }
    carritoHTML()
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar HTML
    limpiarHTML()
    // Recorre el carro y genera el HTML
    articulosCarrito.forEach(juego => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td><img src='${juego.imagen}' width=50></td>
        <td>${juego.titulo}</td>
        <td>${juego.precio}</td>
        <td>${juego.cantidad}</td>
        <td><a class="btn btn-warning borrar-producto" data-id='${juego.id}'> X </a></td>
        `
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}

// Elimina los juegos del tbody
function limpiarHTML() {
    // Forma lenta de limpiar
    // contenedorCarrito.innerHTML = ''

    while (contenedorCarrito.firstChild)
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}
