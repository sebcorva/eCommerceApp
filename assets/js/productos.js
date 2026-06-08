const productos = [
    // TAZAS
    {
        id: "taza-main-character",
        nombre: "Main Character Energy",
        descripcion: "Una taza diseñada para aquellos que comienzan su día con energía.",
        precio: 12990,
        descuento: 0,
        imagen: "../assets/img/tazas/taza.jpg",
        categoria: "tazas",
        stock: 15
    },
    {
        id: "taza-first-coffee",
        nombre: "But First Coffee",
        descripcion: "Una taza diseñada para aquellos que no pueden conocer su día sin café.",
        precio: 12990,
        descuento: 0,
        imagen: "../assets/img/tazas/taza2.jpg",
        categoria: "tazas",
        stock: 20
    },
    {
        id: "taza-about-cat",
        nombre: "Ask Me About My Cat",
        descripcion: "Una taza diseñada para aquellos que aman hablar de sus gatos.",
        precio: 12990,
        descuento: 30,
        imagen: "../assets/img/tazas/taza3.jpg",
        categoria: "tazas",
        stock: 8
    },
    // PLATOS
    {
        id: "plato-diseno-clasico",
        nombre: "Diseño Clásico",
        descripcion: "Un plato con un diseño clásico y elegante.",
        precio: 13000,
        descuento: 45,
        imagen: "../assets/img/platos/plato.jpg",
        categoria: "platos",
        stock: 12
    },
    {
        id: "plato-gato-dormido",
        nombre: "Diseño Gato Dormido",
        descripcion: "Un plato con un diseño inspirado en los gatos que aman dormir.",
        precio: 12990,
        descuento: 0,
        imagen: "../assets/img/platos/plato2.jpg",
        categoria: "platos",
        stock: 10
    },
    {
        id: "plato-good-morning",
        nombre: "Diseño Good Morning",
        descripcion: "Un plato con un diseño inspirado en las mañanas alegres.",
        precio: 12990,
        descuento: 0,
        imagen: "../assets/img/platos/plato3.jpg",
        categoria: "platos",
        stock: 14
    },
    // MACETEROS
    {
        id: "macetero-diseno-montana",
        nombre: "Macetero de Diseño Montaña",
        descripcion: "Un macetero con un diseño inspirado en la naturaleza.",
        precio: 13000,
        descuento: 80,
        imagen: "../assets/img/maceteros/macetero.jpg",
        categoria: "maceteros",
        stock: 5
    },
    {
        id: "macetero-gato-negro",
        nombre: "Macetero de Diseño Gato Negro",
        descripcion: "Un macetero con un diseño inspirado en los gatos curiosos.",
        precio: 12990,
        descuento: 0,
        imagen: "../assets/img/maceteros/macetero2.jpg",
        categoria: "maceteros",
        stock: 18
    },
    {
        id: "macetero-pura-vida",
        nombre: "Macetero de Diseño Pura Vida",
        descripcion: "Un macetero con un diseño inspirado en la vida tranquila.",
        precio: 12990,
        descuento: 0,
        imagen: "../assets/img/maceteros/macetero3.jpg",
        categoria: "maceteros",
        stock: 9
    },
    //BOLWS
    {
        id: "bowl-abejas",
        nombre: "Bowl Abejas",
        descripcion: "Un bowl con un diseño inspirado en las abejas.",
        precio: 13000,
        descuento: 15,
        imagen: "../assets/img/bowls/bowl.jpg",
        categoria: "bowls",
        stock: 22
    },
    {
        id: "bowl-breakfast",
        nombre: "Bowl Breakfast",
        descripcion: "Un bowl con diseño inspirado en un desayuno americano.",
        precio: 13000,
        descuento: 15,
        imagen: "../assets/img/bowls/bowl2.jpg",
        categoria: "bowls",
        stock: 16
    },
    {
        id: "bowl-helado-cono",
        nombre: "Bowl Helado en Cono",
        descripcion: "Un bowl con un diseño inspirado en el helado en cono.",
        precio: 13000,
        descuento: 15,
        imagen: "../assets/img/bowls/bowl3.jpg",
        categoria: "bowls",
        stock: 11
    }
];

if (!localStorage.getItem("productos")) {
    localStorage.setItem("productos", JSON.stringify(productos));
    console.log("Catálogo de productos inicializado en LocalStorage con descuentos.");
}