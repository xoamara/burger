// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

let burger = {
    selectAll: function (callback) {
        orm.selectAll("burgers", function (res) {
            callback(res);
        })
    },
    insertOne: function () {
        orm.insertOne("burgers"), function(res) {
            callback(res);
            console.log("I am the result!" + res);
        }
    },
    updateOne: function () {
        orm.updateOne("burgers"), function(res) {
            callback(res);
            console.log("I am the result!" + res);
        }
    }

};



module.exports = burger;