const mongoose = require("mongoose");
const _ = require("lodash");
const Users = require("./src/models/user.model");
const config = require("./src/config/config");

const users = [
  {
    name: "Mak",
    email: "mak.ovcina@test.com",
    password: "12345678",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "John",
    email: "john.doe@test.com",
    password: "12345678",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "John",
    email: "hugo_tutto_cammara@test.com",
    password: "12345678",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Larry ",
    email: "harry.lattam@test.com",
    password: "12345678",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "paragon",
    email: "paragon@paragon.ba",
    password: "Paragon202!",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },

  {
    name: "Luka",
    email: "luka.ovcina@test.com",
    password: "12345678",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Marina",
    email: "marina.ovcina@test.com",
    password: "12345678",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Adnan",
    email: "adnan.ovcina@test.com",
    password: "12345678",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((e) => console.log(e));

const createUsers = async () => {
  await Users.insertMany(users);
};

createUsers()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
