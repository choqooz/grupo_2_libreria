"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Lápiz HB",
          description: "Lápiz grafito de dureza HB",
          image: "lapiz_hb.jpg",
          category: "Escritura",
          color: "Gris",
          price: 0.5,
        },
        {
          name: "Cuaderno Rayado",
          description: "Cuaderno de 100 hojas rayadas",
          image: "cuaderno_rayado.jpg",
          category: "Papelería",
          color: "Azul",
          price: 2.5,
        },
        {
          name: "Borrador",
          description: "Borrador de goma blanca",
          image: "borrador.jpg",
          category: "Escritura",
          color: "Blanco",
          price: 0.3,
        },
        {
          name: "Regla de 30 cm",
          description: "Regla de plástico transparente de 30 cm",
          image: "regla_30cm.jpg",
          category: "Herramientas",
          color: "Transparente",
          price: 1.0,
        },
        {
          name: "Estuche de lápices",
          description: "Estuche para guardar lápices y bolígrafos",
          image: "estuche_lapices.jpg",
          category: "Almacenamiento",
          color: "Rojo",
          price: 3.0,
        },
        {
          name: "Resaltador Amarillo",
          description: "Resaltador de tinta amarilla",
          image: "resaltador_amarillo.jpg",
          category: "Escritura",
          color: "Amarillo",
          price: 0.8,
        },
        {
          name: "Cinta Adhesiva",
          description: "Rollo de cinta adhesiva transparente",
          image: "cinta_adhesiva.jpg",
          category: "Pegamento",
          color: "Transparente",
          price: 1.2,
        },
        {
          name: "Calculadora Científica",
          description: "Calculadora científica con funciones avanzadas",
          image: "calculadora_cientifica.jpg",
          category: "Electrónicos",
          color: "Negro",
          price: 15.0,
        },
        {
          name: "Tijeras Escolares",
          description: "Tijeras escolares con punta redondeada",
          image: "tijeras_escolares.jpg",
          category: "Herramientas",
          color: "Azul",
          price: 1.5,
        },
        {
          name: "Pegamento en Barra",
          description: "Barra de pegamento sólido",
          image: "pegamento_barra.jpg",
          category: "Pegamento",
          color: "Blanco",
          price: 0.7,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
