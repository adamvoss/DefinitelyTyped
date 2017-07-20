/**
 * All test code sample here come from the fast-csv README
 * https://github.com/C2FO/fast-csv/blob/master/README.md
 * Copyright (c) C2FO, MIT License
 */

import csv = require("fast-csv");
import * as fs from "fs";

// These examples are from the documentation.
// Modifying them to match all the rules here would make it harder to trace them
// to the original source.

// tslint:disable comment-format
// tslint:disable no-conditional-assignment
// tslint:disable only-arrow-functions
// tslint:disable no-var
// tslint:disable one-variable-per-declaration
// tslint:disable object-literal-shorthand

var stream = fs.createReadStream("my.csv");

var csvStream = csv()
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

stream.pipe(csvStream);

//or

var csvStream = csv
    .parse()
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

stream.pipe(csvStream);

fs.createReadStream("my.csv")
    .pipe(csv())
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

var fileStream = fs.createReadStream("my.csv"),
    parser = csv();

fileStream
    .on("readable", function() {
        var data: any;
        while ((data = fileStream.read()) !== null) {
            parser.write(data);
        }
    })
    .on("end", function() {
        parser.end();
    });

parser
    .on("readable", function() {
        var data: any;
        while ((data = parser.read()) !== null) {
            console.log(data);
        }
    })
    .on("end", function() {
        console.log("done");
    });

csv
    .fromPath("my.csv")
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

var CSV_STRING = 'a,b\n' +
    'a1,b1\n' +
    'a2,b2\n';

csv
    .fromString(CSV_STRING, { headers: true })
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

var stream = fs.createReadStream("my.csv");

csv
    .fromStream(stream)
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

var stream = fs.createReadStream("my.csv");

csv
    .fromStream(stream, { headers: true })
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

var stream = fs.createReadStream("my.csv");

csv
    .fromStream(stream, { headers: ["firstName", "lastName", "address"] })
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

var stream = fs.createReadStream("my.csv");

csv
    .fromStream(stream, { headers: ["firstName", , "address"] })
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

var stream = fs.createReadStream("my.csv");

csv
    .fromStream(stream, { ignoreEmpty: true })
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

var stream = fs.createReadStream("my.csv");

csv
    .fromStream(stream, { headers: true })
    .validate(function(data: any) {
        return data.age < 50; //all persons must be under the age of 50
    })
    .on("data-invalid", function(data) {
        //do something with invalid row
    })
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

var stream = fs.createReadStream("my.csv");

declare var MyModel: any;

csv
    .fromStream(stream)
    .validate(function(data: any, next: (err: any, result?: any) => void) {
        MyModel.findById(data.id, function(err: any, model: any) {
            if (err) {
                next(err);
            } else {
                next(null, !model); //valid if the model does not exist
            }
        });
    })
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

csv
    .fromStream(stream)
    .transform(function(data: any) {
        return data.reverse(); //reverse each row.
    })
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

var stream = fs.createReadStream("my.csv");

csv
    .fromStream(stream)
    .transform(function(data: any, next: (err: any, result?: any) => void) {
        MyModel.findById(data.id, next);
    })
    .on("data", function(data) {
        console.log(data);
    })
    .on("end", function() {
        console.log("done");
    });

function formattingExamples() {
    var stream = fs.createReadStream("my.csv");

    var csvStream = csv.createWriteStream({ headers: true }),
        writableStream = fs.createWriteStream("my.csv");

    writableStream.on("finish", function() {
        console.log("DONE!");
    });

    csvStream.pipe(writableStream);
    csvStream.write({ a: "a0", b: "b0" });
    csvStream.write({ a: "a1", b: "b1" });
    csvStream.write({ a: "a2", b: "b2" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.end();

    //or

    var csvStream = csv.format({ headers: true }),
        writableStream = fs.createWriteStream("my.csv");

    writableStream.on("finish", function() {
        console.log("DONE!");
    });

    csvStream.pipe(writableStream);
    csvStream.write({ a: "a0", b: "b0" });
    csvStream.write({ a: "a1", b: "b1" });
    csvStream.write({ a: "a2", b: "b2" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.end();

    var csvStream = csv
        .createWriteStream({ headers: true })
        .transform(function(row: any) {
            return {
                A: row.a,
                B: row.b
            };
        }),
        writableStream = fs.createWriteStream("my.csv");

    writableStream.on("finish", function() {
        console.log("DONE!");
    });

    csvStream.pipe(writableStream);
    csvStream.write({ a: "a0", b: "b0" });
    csvStream.write({ a: "a1", b: "b1" });
    csvStream.write({ a: "a2", b: "b2" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.end();

    //or
    var csvStream = csv
        .format({ headers: true })
        .transform(function(row: any) {
            return {
                A: row.a,
                B: row.b
            };
        }),
        writableStream = fs.createWriteStream("my.csv");

    writableStream.on("finish", function() {
        console.log("DONE!");
    });

    csvStream.pipe(writableStream);
    csvStream.write({ a: "a0", b: "b0" });
    csvStream.write({ a: "a1", b: "b1" });
    csvStream.write({ a: "a2", b: "b2" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.end();

    var csvStream = csv
        .createWriteStream({ headers: true })
        .transform(function(row: any, next: (err: any, result?: any) => void) {
            setImmediate(function() {
                next(null, { A: row.a, B: row.b });
            });
        }),
        writableStream = fs.createWriteStream("my.csv");

    writableStream.on("finish", function() {
        console.log("DONE!");
    });

    csvStream.pipe(writableStream);
    csvStream.write({ a: "a0", b: "b0" });
    csvStream.write({ a: "a1", b: "b1" });
    csvStream.write({ a: "a2", b: "b2" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.end();

    //or

    var csvStream = csv
        .format({ headers: true })
        .transform(function(row: any, next: (err: any, result?: any) => void) {
            setImmediate(function() {
                next(null, { A: row.a, B: row.b });
            });
        }),
        writableStream = fs.createWriteStream("my.csv");

    writableStream.on("finish", function() {
        console.log("DONE!");
    });

    csvStream.pipe(writableStream);
    csvStream.write({ a: "a0", b: "b0" });
    csvStream.write({ a: "a1", b: "b1" });
    csvStream.write({ a: "a2", b: "b2" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.end();
}

function writingDataExamples() {
    var ws = fs.createWriteStream("my.csv");
    csv
        .write([
            ["a", "b"],
            ["a1", "b1"],
            ["a2", "b2"]
        ], { headers: true })
        .pipe(ws);

    var ws = fs.createWriteStream("my.csv");
    csv
        .write([
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
        ], { headers: true })
        .pipe(ws);

    var ws = fs.createWriteStream("my.csv");
    csv
        .write([
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
        ], {
            headers: true,
            transform(row: any) {
                return {
                    A: row.a,
                    B: row.b
                };
            }
        })
        .pipe(ws);

    csv
        .writeToStream(fs.createWriteStream("my.csv"), [
            ["a", "b"],
            ["a1", "b1"],
            ["a2", "b2"]
        ], { headers: true });

    csv
        .writeToStream(fs.createWriteStream("my.csv"), [
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
        ], { headers: true })
        .pipe(ws);

    csv
        .writeToStream(fs.createWriteStream("my.csv"), [
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
        ], {
            headers: true,
            transform: function(row: any) {
                return {
                    A: row.a,
                    B: row.b
                };
            }
        })
        .pipe(ws);

    csv
        .writeToPath("my.csv", [
            ["a", "b"],
            ["a1", "b1"],
            ["a2", "b2"]
        ], { headers: true })
        .on("finish", function() {
            console.log("done!");
        });

    csv
        .writeToPath("my.csv", [
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
        ], { headers: true })
        .on("finish", function() {
            console.log("done!");
        });

    csv
        .writeToPath("my.csv", [
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
        ], {
            headers: true,
            transform: function(row: any) {
                return {
                    A: row.a,
                    B: row.b
                };
            }
        })
        .on("finish", function() {
            console.log("done!");
        });

    csv.writeToString(
        [
            ["a", "b"],
            ["a1", "b1"],
            ["a2", "b2"]
        ],
        { headers: true },
        function(err: any, data: any) {
            console.log(data); //"a,b\na1,b1\na2,b2\n"
        }
    );

    csv.writeToString(
        [
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
        ],
        { headers: true },
        function(err: any, data: any) {
            console.log(data); //"a,b\na1,b1\na2,b2\n"
        }
    );

    csv.writeToString(
        [
            { a: "a1", b: "b1" },
            { a: "a2", b: "b2" }
        ],
        {
            headers: true,
            transform: function(row: any) {
                return {
                    A: row.a,
                    B: row.b
                };
            }
        },
        function(err: any, data: any) {
            console.log(data); //"A,B\na1,b1\na2,b2\n"
        }
    );
}

function pipingFromParserToWriterExamples() {
    csv
        .fromPath("in.csv", { headers: true })
        .pipe(csv.createWriteStream({ headers: true }))
        .pipe(fs.createWriteStream("out.csv", { defaultEncoding: "utf8" }));

    csv
        .fromPath("in.csv", { headers: true })
        .transform(function(obj: any) {
            return {
                name: obj.Name,
                address: obj.Address,
                emailAddress: obj.Email_Address,
                verified: obj.Verified
            };
        })
        .pipe(csv.createWriteStream({ headers: true }))
        .pipe(fs.createWriteStream("out.csv", { defaultEncoding: "utf8" }));

    var formatStream = csv
        .createWriteStream({ headers: true })
        .transform(function(obj: any) {
            return {
                name: obj.Name,
                address: obj.Address,
                emailAddress: obj.Email_Address,
                verified: obj.Verified
            };
        });
    csv
        .fromPath("in.csv", { headers: true })
        .pipe(formatStream)
        .pipe(fs.createWriteStream("out.csv", { defaultEncoding: "utf8" }));
}

function quotingColumnsExamples() {
    //quote all columns including headers
    var objectData = [{ a: "a1", b: "b1" }, { a: "a2", b: "b2" }],
        arrayData = [["a", "b"], ["a1", "b1"], ["a2", "b2"]];
    csv.writeToString(objectData, { headers: true, quoteColumns: true }, function(err: any, data: any) {
        console.log(data); //"a","b"
        //"a1","b1"
        //"a2","b2"
    });

    //only quote the "a" column
    csv.writeToString(objectData, { headers: true, quoteColumns: { a: true } }, function(err: any, data: any) {
        console.log(data); //"a",b
        //"a1",b1
        //"a2",b2
    });

    //only quote the second column
    csv.writeToString(arrayData, { headers: true, quoteColumns: [false, true] }, function(err: any, data: any) {
        console.log(data); //a,"b"
        //a1,"b1"
        //a2,"b2"
    });

    //quote all columns including headers
    var objectData = [{ a: "a1", b: "b1" }, { a: "a2", b: "b2" }],
        arrayData = [["a", "b"], ["a1", "b1"], ["a2", "b2"]];
    csv.writeToString(objectData, { headers: true, quoteHeaders: true }, function(err: any, data: any) {
        console.log(data); //"a","b"
        //a1,b1
        //a2,b2
    });

    //only quote the "a" column
    csv.writeToString(objectData, { headers: true, quoteHeaders: { a: true } }, function(err: any, data: any) {
        console.log(data); //"a",b
        //a1,b1
        //a2,b2
    });

    //only quote the second column
    csv.writeToString(arrayData, { headers: true, quoteHeaders: [false, true] }, function(err: any, data: any) {
        console.log(data); //a,"b"
        //a1,b1
        //a2,b2
    });

    //quoting columns and not headers

    //only quote the second column
    csv.writeToString(arrayData, { headers: true, quoteHeaders: false, quoteColumns: true }, function(err: any, data: any) {
        console.log(data); //a,b
        //"a1","b1"
        //"a2","b2"
    });
}
