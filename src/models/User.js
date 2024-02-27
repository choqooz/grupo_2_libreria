const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const User = {
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
    let userFound = users.filter((user) => user[field] === text);
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
