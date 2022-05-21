
const express = require("express");
const sqlite3 = require('sqlite3');
const cors = require("cors");

function createConnection() {
    let db = new sqlite3.Database('maindb.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err && err.code == "SQLITE_CANTOPEN") {
            db = createDatabase();
            createTable(db);
            return db;
            } else if (err) {
                console.log("Getting error " + err);
        }
    });
    createTable(db);
    return db;
}
function createDatabase() {
    let newdb = new sqlite3.Database('maindb.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
        }
        return newdb
    });
}

function createTable(newdb) {
    newdb.exec(`
    create table if not exists students (
        student_id integer primary key autoincrement,
        student_name text not null,
        student_sername text not null,
        student_patronymic text not null,
        student_date_of_birth text not null,
        student_group text not null);
        `, (err) => {
            if (err) {
                console.log("Getting error " + err);
            }
        }
    );
}

function insertStudent(db, name, sername, patronymic, date_of_birth, group) {
    db.exec(`
    insert into students (student_name, student_sername, student_patronymic, student_date_of_birth, student_group)
    values ('${name}', '${sername}', '${patronymic}', '${date_of_birth}', '${group}');
    `, (err) => {
        if (err) {
            throw err;
        }
    });
}

function deleteStudent(db, id) {
    db.exec (`
    delete from students
    where student_id = ${id};
    `, (err) => {
        if (err) {
            console.log("Getting error " + err);
        }
    })
}

function selectAllStudents(db, callback) {
    db.all(`
    select * from students;
    `, (err, result) => {
        if (err) {
            console.log("Getting error " + err);
        } else {
            callback(result);
        }
    });
}

const app = express();
const maindb = createConnection();
const jsonParser = express.json();
app.use(cors());

app.post("/insert", jsonParser, function (request, response) {
    console.log(request.body);
    let user = request.body;
    if(!request.body) return response.sendStatus(400);
    try {
        insertStudent(maindb,user.Name, user.Sername, user.Patronymic, user.Date, user.Group);
    } catch(err) {
        console.log("Getting error " + err);
        response.sendStatus(400);
    }
    response.sendStatus(200);
});

app.get("/update", function (request, response) {
    try {
        selectAllStudents(maindb, (result) => {
            console.log(result);
            response.json(result);
        });
    } catch(err) {
        console.log("Getting error " + err);
    }
});

app.post("/delete", jsonParser, function (request, response) {
    console.log(request.body);
    let userId = request.body.id;
    if(!request.body) return response.sendStatus(400);
    try {
        deleteStudent(maindb, userId);
    } catch(err) {
        console.log("Getting error " + err);
        response.sendStatus(400);
    }
    response.sendStatus(200);
});

app.listen(5000, () => {
    console.log(`Server running at port ${5000}`);
 });