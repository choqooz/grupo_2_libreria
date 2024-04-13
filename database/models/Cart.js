module.exports = (sequelize, dataTypes) => {
  let alias = "Cart";
  let cols = {
    cart_id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: dataTypes.BIGINT(10).UNSIGNED,
    user_id: dataTypes.BIGINT(10).UNSIGNED,
    quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: dataTypes.DOUBLE,
      allowNull: false,
    },
  };
  let config = {
    timestamps: false,
    deletedAt: false,
  };

  const Cart = sequelize.define(alias, cols, config);

  Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });
    Cart.belongsTo(models.Product, {
      as: "products",
      foreignKey: "product_id",
    });
  };

  return Cart;
};
