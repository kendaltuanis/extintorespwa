var express = require('express');
var router = express.Router();

var pg = require('pg');

pg.defaults.ssl = process.env.DATABASE_URL != undefined;
var conString = process.env.DATABASE_URL || "postgres://localhost:5432/extintoresuniversales"; // Cadena de conexión a la base de datos



// add query functions



function signIn(req, res, next) {
    var client = new pg.Client(conString);
    client.connect();
    var query = client.query('SELECT * FROM usuario.usuarios');
    query.on("row", function(row, result) {
        result.addRow(row);
    });
    query.on("end", function(result) {
        res.json(result.rows[0].row_to_json);
        res.end();
    });
}