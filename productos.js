/*=====================================
        TIENDA SILES
        productos.js
======================================*/

// Si existen productos guardados por el administrador,
// se usan esos. De lo contrario se cargan productos de ejemplo.

let productos = JSON.parse(localStorage.getItem("productos")) || [

{
    id:1,
    nombre:"Dior Sauvage",
    marca:"Dior",
    precio:125,
    categoria:"Hombre",
    descripcion:"Fragancia fresca con notas cítricas y amaderadas.",
    imagenes:[
        "img/productos/sauvage1.jpg",
        "img/productos/sauvage2.jpg",
        "img/productos/sauvage3.jpg"
    ]
},

{
    id:2,
    nombre:"Bleu de Chanel",
    marca:"Chanel",
    precio:118,
    categoria:"Hombre",
    descripcion:"Elegancia clásica con aroma intenso y duradero.",
    imagenes:[
        "img/productos/chanel1.jpg",
        "img/productos/chanel2.jpg",
        "img/productos/chanel3.jpg"
    ]
},

{
    id:3,
    nombre:"Good Girl",
    marca:"Carolina Herrera",
    precio:130,
    categoria:"Mujer",
    descripcion:"Perfume femenino con notas dulces y florales.",
    imagenes:[
        "img/productos/goodgirl1.jpg",
        "img/productos/goodgirl2.jpg",
        "img/productos/goodgirl3.jpg"
    ]
},

{
    id:4,
    nombre:"Libre",
    marca:"YSL",
    precio:122,
    categoria:"Mujer",
    descripcion:"Fragancia sofisticada con lavanda y vainilla.",
    imagenes:[
        "img/productos/libre1.jpg",
        "img/productos/libre2.jpg",
        "img/productos/libre3.jpg"
    ]
},

{
    id:5,
    nombre:"CK One",
    marca:"Calvin Klein",
    precio:65,
    categoria:"Unisex",
    descripcion:"Aroma fresco para cualquier ocasión.",
    imagenes:[
        "img/productos/ck1.jpg",
        "img/productos/ck2.jpg",
        "img/productos/ck3.jpg"
    ]
},

{
    id:6,
    nombre:"212 VIP",
    marca:"Carolina Herrera",
    precio:115,
    categoria:"Hombre",
    descripcion:"Fragancia elegante para eventos especiales.",
    imagenes:[
        "img/productos/212vip1.jpg",
        "img/productos/212vip2.jpg",
        "img/productos/212vip3.jpg"
    ]
}

];

// Si es la primera vez, guardar los productos
if(!localStorage.getItem("productos")){

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}

/*=====================================
        FUNCIONES AUXILIARES
======================================*/

function obtenerProductos(){

    return JSON.parse(
        localStorage.getItem("productos")
    ) || [];

}

function guardarProductos(lista){

    localStorage.setItem(
        "productos",
        JSON.stringify(lista)
    );

}

function siguienteID(){

    let lista = obtenerProductos();

    if(lista.length===0){

        return 1;

    }

    return Math.max(
        ...lista.map(p=>p.id)
    ) + 1;

}