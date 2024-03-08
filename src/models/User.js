const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const User = {
  filename: path.join(__dirname, "../data/users.json"),
  getData: function () {
    return JSON.parse(fs.readFileSync(this.filename, "utf-8"));
  },
  create: (userData) => {
    let newUser = {
      id: Date.now(),
      ...userData,
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "), "utf-8");

    return newUser;
  },
  findByPk: (id) => {
    let userFound = users.find((user) => user.id === id);
    return userFound;
  },
  findByField: (field, text) => {
    let userFound = User.getData().find((user) => user[field] === text);
    return userFound;
  },
  delete: (id) => {
    let finalUsers = users.filter((user) => user.id !== id);
    fs.writeFileSync(
      usersFilePath,
      JSON.stringify(finalUsers, null, " "),
      "utf-8"
    );
    return true;
  },
};

module.exports = User;
