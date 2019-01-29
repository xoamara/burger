var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        let hbsObject = {
            burgers: data
        };
        console.log("From burgers_controller: ");
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name"], [req.body.name], function(result) {
        res.json({ id: result.insertId });
    });
});


router.put("/api/burgers/:id", function(req, res) {
    let status = "id = " + req.params.id;

    console.log("status", status);
    console.log(req.body);

    burger.updateOne(req.params.id, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;