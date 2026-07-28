/*====================================
        TIENDA SILES
        admin.js
====================================*/

const CLAVE = "Siles2805";

/*=========================
    LOGIN
=========================*/

function login(){

    const pass = document.getElementById("password").value;

    if(pass === CLAVE){

        sessionStorage.setItem("admin","true");

        document.getElementById("login").style.display="none";
        document.getElementById("panel").style.display="block";

        cargarTabla();

    }else{

        alert("Contraseña incorrecta.");

    }

}

/*=========================
    SESION
=========================*/

window.onload = ()=>{

    if(sessionStorage.getItem("admin")=="true"){

        document.getElementById("login").style.display="none";
        document.getElementById("panel").style.display="block";

        cargarTabla();

    }

}

function cerrarSesion(){

    sessionStorage.removeItem("admin");

    location.reload();

}

/*=========================
    GUARDAR
=========================*/

function guardarProducto(){

    let lista = obtenerProductos();

    const id = document.getElementById("idProducto").value;

    const producto = {

        id: id=="" ? siguienteID() : Number(id),

        nombre: document.getElementById("nombre").value,

        marca: document.getElementById("marca").value,

        precio: Number(document.getElementById("precio").value),

        categoria: document.getElementById("categoria").value,

        descripcion: document.getElementById("descripcion").value,

        imagenes:[

            document.getElementById("imagen1").value,

            document.getElementById("imagen2").value,

            document.getElementById("imagen3").value

        ]

    };

    if(id==""){

        lista.push(producto);

    }else{

        lista = lista.map(p=>p.id==id ? producto : p);

    }

    guardarProductos(lista);

    limpiarFormulario();

    cargarTabla();

}

/*=========================
    TABLA
=========================*/

function cargarTabla(){

    const lista = obtenerProductos();

    const tabla = document.getElementById("tablaProductos");

    tabla.innerHTML="";

    let total=0;

    lista.forEach(producto=>{

        total += producto.precio;

        tabla.innerHTML +=`

        <tr>

        <td>

        <img
        class="mini"
        src="${producto.imagenes[0]}">

        </td>

        <td>${producto.nombre}</td>

        <td>${producto.marca}</td>

        <td>$${producto.precio}</td>

        <td>${producto.categoria}</td>

        <td class="acciones">

        <button
        class="editar"
        onclick="editar(${producto.id})">

        Editar

        </button>

        <button
        class="eliminar"
        onclick="eliminar(${producto.id})">

        Eliminar

        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById("cantidadProductos").textContent=lista.length;

    document.getElementById("valorInventario").textContent="$"+total;

}

/*=========================
    EDITAR
=========================*/

function editar(id){

    const lista = obtenerProductos();

    const p = lista.find(x=>x.id===id);

    document.getElementById("idProducto").value=p.id;

    document.getElementById("nombre").value=p.nombre;

    document.getElementById("marca").value=p.marca;

    document.getElementById("precio").value=p.precio;

    document.getElementById("categoria").value=p.categoria;

    document.getElementById("descripcion").value=p.descripcion;

    document.getElementById("imagen1").value=p.imagenes[0];

    document.getElementById("imagen2").value=p.imagenes[1];

    document.getElementById("imagen3").value=p.imagenes[2];

}

/*=========================
    ELIMINAR
=========================*/

function eliminar(id){

    if(!confirm("¿Eliminar este producto?")) return;

    let lista = obtenerProductos();

    lista = lista.filter(p=>p.id!==id);

    guardarProductos(lista);

    cargarTabla();

}

/*=========================
    LIMPIAR
=========================*/

function limpiarFormulario(){

    document.getElementById("idProducto").value="";

    document.getElementById("nombre").value="";

    document.getElementById("marca").value="";

    document.getElementById("precio").value="";

    document.getElementById("descripcion").value="";

    document.getElementById("imagen1").value="";

    document.getElementById("imagen2").value="";

    document.getElementById("imagen3").value="";

    document.getElementById("categoria").selectedIndex=0;

}