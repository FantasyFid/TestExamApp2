
const express = require("express");
const sqlite3 = require('sqlite3');

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
            console.log("Getting error " + err);
        }
    }
    );
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

insertStudent(maindb, 'Andrey', 'Sergeev', 'Dmitrievich', '19-10-2002', 'UPM-211');
insertStudent(maindb, 'Dmitri', 'Sergeev', 'Vycheslavovich', '27-2-1973', 'MPU-422');
selectAllStudents(maindb, (result) => console.log(result));

app.get("/", function(request, response){
    response.send("<h2>Привет Express!</h2>");
});

app.listen(3000);