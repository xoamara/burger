// 3. Create an `orm.js` file inside `config` directory.

//    * Import (require) `connection.js` into `orm.js`

//    * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

//      * `selectAll()`
//      * `insertOne()`
//      * `updateOne()`

//    * Export the ORM object in `module.exports`.

let connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    selectAll: function (tableName, callback) {
        let queryString = "SELECT * FROM ??";
        console.log(queryString);
        connection.query(queryString, [tableName], function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
            console.log(result);

        });
    },
    insertOne: function (tableName, colName, colValue, callback) {
        let queryString = "INSERT INTO " + tableName;

        queryString += " (";
        queryString += colName.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(colValue.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, colValue, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
            console.log(result);
        });
    },
    updateOne: function (tableName, colName, colValue, idValue, callback) {
        let queryString = "UPDATE ?? SET ?? = ? WHERE id = ?"

        console.log(queryString);

        connection.query(queryString, [tableName, colName, colValue, idValue],
            function (err, result) {
                if (err) {
                    throw err;
                }
                callback(result);
                console.log(result);

            })
    },
};

module.exports = orm;





