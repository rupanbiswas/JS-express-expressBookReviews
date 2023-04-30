const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).send("userName or password not provided");
  }
  let existingUsers = users.filter((values) => {
    return values.userName == userName;
  });

  if (existingUsers.length > 0) {
    res.send(500).send("user already exists");
  }

  books.push({ userName, password });

  return res.status(300).json("successfully registered");
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(300).json(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  return res.status(300).json(JSON.stringify(books[isbn]));
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author;
  const asArray = Object.entries(obj);
  const filtered = asArray.filter(([key, value]) => value.author === author);
  const justStrings = Object.fromEntries(filtered);

  return res.status(300).json(JSON.stringify(justStrings));
});
9;

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  const asArray = Object.entries(obj);
  const filtered = asArray.filter(([key, value]) =>
    value.title?.toLowerCase().includes(title.toLocaleLowerCase())
  );
  const justStrings = Object.fromEntries(filtered);
  return res.status(300).json(JSON.stringify(justStrings));
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json(books[isbn].reviews);
});

const axios = require("axios");
const http = require("http");

function makeHttpRequest(options) {
  return new Promise((resolve, reject) => {
    const request = http.request(options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        resolve(data);
      });
    });

    request.on("error", (error) => {
      reject(error);
    });

    request.end();
  });
}

const optionsGetAllBooks = {
  hostname: "localhost",
  port: "5000",
  path: "/",
  method: "GET",
};

makeHttpRequest(optionsGetAllBooks)
  .then((data) => console.log(JSON.stringify(data, null, 4)))
  .catch((error) => console.error(error));

console.log("*******************************");

const optionsBooksByIsbn = {
  hostname: "localhost",
  port: "5000",
  path: "/isbn/2/",
  method: "GET",
};

makeHttpRequest(optionsBooksByIsbn)
  .then((data) => console.log(JSON.stringify(data, null, 4)))
  .catch((error) => console.error(error));

axios
  .get("http://localhost:5000/title/Things Fall Apart")
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

axios
  .get("http://localhost:5000/author/Unknown")
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

module.exports.general = public_users;
