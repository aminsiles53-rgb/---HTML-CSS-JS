/*=====================================
        TIENDA SILES
        app.js
======================================*/

const catalogo = document.getElementById("catalogo");
const buscar = document.getElementById("buscar");
const categoria = document.getElementById("categoria");
const orden = document.getElementById("orden");
const modoOscuro = document.getElementById("modoOscuro");

/*=========================
    CARGAR PRODUCTOS
=========================*/

mostrarProductos(obtenerProductos());

/*=========================
    MOSTRAR PRODUCTOS
=========================*/

function mostrarProductos(lista){

    catalogo.innerHTML = "";

    if(lista.length===0){

        catalogo.innerHTML=`
        <h2 style="grid-column:1/-1;text-align:center;">
        No se encontraron productos.
        </h2>
        `;

        return;
    }

    lista.forEach(producto=>{

        const tarjeta=document.createElement("div");

        tarjeta.className="tarjeta";

        tarjeta.innerHTML=`

        <img
        id="principal${producto.id}"
        src="${producto.imagenes[0]}"
        alt="${producto.nombre}">

        <div class="info">

            <h3>${producto.nombre}</h3>

            <h4>${producto.marca}</h4>

            <p class="precio">

                $${producto.precio}

            </p>

            <p class="descripcion">

                ${producto.descripcion}

            </p>

            <div class="galeria">

                ${producto.imagenes.map(img=>`

                <img
                src="${img}"
                onclick="cambiarImagen(${producto.id},'${img}')">

                `).join("")}

            </div>

            <button
            class="botonComprar"
            onclick="comprar('${producto.nombre}')">

            Comprar

            </button>

        </div>

        `;

        catalogo.appendChild(tarjeta);

    });

}

/*=========================
    CAMBIAR IMAGEN
=========================*/

function cambiarImagen(id,imagen){

    document
    .getElementById("principal"+id)
    .src=imagen;

}

/*=========================
    COMPRAR
=========================*/

function comprar(nombre){

    const mensaje=
`Hola, me interesa comprar el perfume ${nombre} que vi en su catálogo. ¿Está disponible?`;

    const url=
`https://wa.me/50576014631?text=${encodeURIComponent(mensaje)}`;

    window.open(url,"_blank");

}

/*=========================
    BUSCADOR
=========================*/

buscar.addEventListener("input",filtrar);

/*=========================
    CATEGORIAS
=========================*/

categoria.addEventListener("change",filtrar);

/*=========================
    ORDEN
=========================*/

orden.addEventListener("change",filtrar);

/*=========================
    FILTRAR
=========================*/

function filtrar(){

    let lista=obtenerProductos();

    const texto=
    buscar.value.toLowerCase();

    if(texto!=""){

        lista=lista.filter(p=>

            p.nombre.toLowerCase().includes(texto) ||

            p.marca.toLowerCase().includes(texto)

        );

    }

    if(categoria.value!="Todos"){

        lista=lista.filter(

            p=>p.categoria===categoria.value

        );

    }

    if(orden.value=="asc"){

        lista.sort(

        (a,b)=>a.precio-b.precio

        );

    }

    if(orden.value=="desc"){

        lista.sort(

        (a,b)=>b.precio-a.precio

        );

    }

    mostrarProductos(lista);

}

/*=========================
    MODO OSCURO
=========================*/

if(localStorage.getItem("tema")=="oscuro"){

    document.body.classList.add("dark");

    modoOscuro.innerHTML=

    '<i class="fa-solid fa-sun"></i>';

}

modoOscuro.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("tema","oscuro");

        modoOscuro.innerHTML=

        '<i class="fa-solid fa-sun"></i>';

    }else{

        localStorage.setItem("tema","claro");

        modoOscuro.innerHTML=

        '<i class="fa-solid fa-moon"></i>';

    }

});

/*=========================
    ANIMACIONES
=========================*/

window.addEventListener("load",()=>{

    document.querySelectorAll(".tarjeta")
    .forEach((tarjeta,index)=>{

        tarjeta.style.opacity="0";
        tarjeta.style.transform="translateY(30px)";

        setTimeout(()=>{

            tarjeta.style.transition=".4s";

            tarjeta.style.opacity="1";
            tarjeta.style.transform="translateY(0)";

        },index*100);

    });

});