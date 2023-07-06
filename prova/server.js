"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var porta = 3000;
app.use(express.json());
var id_universal = 1;
app.listen(porta, function () {
    console.log("Servidor est\u00E1 rodando na porta: ".concat(porta));
});
var Encurtador = /** @class */ (function () {
    function Encurtador() {
        this.links = [];
    }
    Encurtador.prototype.criar = function (link) {
        this.links.push(link);
    };
    Encurtador.prototype.retrieve = function (id) {
        return this.links.find(function (link) { return link.id === id; });
    };
    Encurtador.prototype.retrieveAll = function () {
        return this.links;
    };
    Encurtador.prototype.length = function () {
        return this.links.length;
    };
    Encurtador.prototype.verifica_url_antiga = function (link) {
        for (var i = 0; this.links.length; i++) {
            if (this.links[i].url_antiga === link.url_antiga) {
                return this.links[i].id;
            }
        }
        return -1;
    };
    return Encurtador;
}());
var id_teste = 1;
var id_teste2 = 2;
var link1 = { id: id_teste, url_antiga: "https://www.google.com/search?q=aliexpress&rlz=1C1VDKB_pt-PTBR1062BR1062&oq=aliexpress&gs_lcrp=EgZjaHJvbWUqDAgAEAAYQxjjAhiKBTIMCAAQABhDGOMCGIoFMg8IARAuGEMYxwEY0QMYigUyCQgCEAAYQxiKBTIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIECAcQBdIBCDIxNjdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8", new_url: "http://localhost:3000/u/".concat(id_teste) };
var link2 = { id: id_teste2, url_antiga: "https://www.google.com/search?q=aliexpress&rlz=1C1VDKB_pt-PTBR1062BR1062&oq=aliexpress&gs_lcrp=EgZjaHJvbWUqDAgAEAAYQxjjAhiKBTIMCAAQABhDGOMCGIoFMg8IARAuGEMYxwEY0QMYigUyCQgCEAAYQxiKBTIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIECAcQBdIBCDIxNjdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8", new_url: "http://localhost:3000/u/".concat(id_teste2) };
var e1 = new Encurtador();
e1.criar(link1);
e1.criar(link2);
app.get("/", function (req, res) {
    var all_links = e1.retrieveAll();
    res.json(all_links);
});
app.get("/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var link = e1.retrieve(id);
    if (!link) {
        res.status(404).json({ error: "Não existe esse id!" });
    }
    else {
        res.json(link);
    }
});
app.get("/u/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var link = e1.retrieve(id);
    if (!link) {
        res.status(404).json({ error: "Não existe esse url!" });
    }
    else {
        res.json(link.url_antiga);
    }
});
app.post("/", function (req, res) {
    var _a;
    var url_antiga = req.body.url_antiga;
    var id = id_universal;
    var new_url = "http://localhost:".concat(porta, "/u/").concat(id);
    var link = {
        id: id,
        url_antiga: url_antiga,
        new_url: new_url
    };
    if (url_antiga.trim() == "") {
        res.status(400).json({ mensagem: "Envie uma URL válida" });
    }
    else {
        if (new_url.length > url_antiga.length) {
            res.status(404).json({ mensagem: "A URL gerada é maior ou igual à original" });
        }
        else {
            if (e1.verifica_url_antiga(link) != -1) {
                (_a = e1.retrieve(e1.verifica_url_antiga(link))) === null || _a === void 0 ? void 0 : _a.url_antiga;
            }
            else {
                e1.criar(link);
                res.status(200).json(link);
                id_universal++;
            }
        }
    }
});
