module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
  let cols = {
    product_id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING(150),
      allowNull: false,
    },
    image: {
      type: dataTypes.BLOB,
      allowNull: false,
    },
    category: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    color: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    price: {
      type: dataTypes.DOUBLE,
      allowNull: false,
    },
  };
  let config = {
    timestamps: false,
    deletedAt: false,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.hasMany(models.Cart, {
      as: "carts",
      foreignKey: "product_id",
    });
  };

  return Product;
};
