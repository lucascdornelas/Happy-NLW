//importando as dependencias, express
const express = require("express");
const path = require("path");
const { orphanage } = require("./pages.js");
const pages = require("./pages.js");

//iniciando o servidor
const server = express();

//utilizando body na requisição
server.use(express.urlencoded({ extended: true }));

//usando os arquivos estaticos (/public)
server.use(express.static("public"));

//configurando template engine
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "hbs");

//Rotas da aplicação
server.get("/", pages.index);
server.get("/orphanages", pages.orphanages);
server.get("/orphanage", pages.orphanage);
server.get("/create-orphanage", pages.createOrphanage);
server.post("/create-orphanage", pages.saveOrphanage);

//ligar o servidor!!
server.listen(5500);
