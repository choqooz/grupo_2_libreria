module.exports = (sequelize, dataTypes) => {
  let alias = "User";
  let cols = {
    user_id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    surname: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    date: {
      type: dataTypes.DATEONLY,
      allowNull: false,
    },
    prefix: {
      type: dataTypes.STRING(10),
      allowNull: false,
    },
    phone: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(200),
      allowNull: false,
    },
    category: {
      type: dataTypes.TINYINT,
      allowNull: false,
    },
    information: {
      type: dataTypes.TINYINT,
      allowNull: true,
    },
    terms: {
      type: dataTypes.TINYINT,
      allowNull: true,
    },
    avatar: {
      type: dataTypes.BLOB,
      allowNull: true,
    },
  };
  let config = {
    timestamps: false,
    deletedAt: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.hasMany(models.Cart, {
      as: "carts",
      foreignKey: "user_id",
    });
  };

  return User;
};
