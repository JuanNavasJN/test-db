const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:123123@localhost:3306/test-db", {
    logging: false
});
// const sequelize = new Sequelize("postgres://postgres@localhost:5432/test-db", {
//     logging: false
// });

process.env.PORT = 3030;

//------------------------------------------- Esquema 1 ------------------------
class User extends Sequelize.Model {}
User.init(
    {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        city: Sequelize.STRING
    },
    { underscored: true, sequelize, modelName: "user" }
);

//------------------------------------------------- Esquema 2 --------------------------------

class Usuario extends Sequelize.Model {}
Usuario.init(
    {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING
    },
    { underscored: true, sequelize, modelName: "usuario" }
);
class Ciudad extends Sequelize.Model {}
Ciudad.init(
    {
        name: Sequelize.STRING
    },
    { underscored: true, sequelize, modelName: "ciudad" }
);
Usuario.belongsTo(Ciudad);
//-----------------------------------------------------------------------------------------------

app.get("/insert", async (req, res) => {
    for (let i = 0; i < 5000; i++) {
        await sequelize.sync().then(() =>
            User.create({
                first_name: "firstName" + i,
                last_name: "lastName" + i,
                email: "email" + i + "@email.com",
                phone: "394820023" + i,
                city: "City" + (i % 10)
            })
        );
    }
    res.json({
        message: "inserted"
    });
});

app.get("/select", (req, res) => {
    sequelize
        .query(
            `
            SELECT first_name, last_name, email, city
            FROM users
            WHERE email = 'email2499@email.com'
        `,
            { model: User }
        )
        .then(user => {
            res.json({
                user
            });
        });
});

//---------------------------------------------

app.get("/ciudades", async (req, res) => {
    for (let i = 0; i < 10; i++) {
        await sequelize.sync().then(() =>
            Ciudad.create({
                name: "name" + i
            })
        );
    }

    res.json({
        message: "Inserted cities"
    });
});

app.get("/insert2", async (req, res) => {
    try {
        console.log("empiezo");
        for (let i = 0; i < 5000; i++) {
            await sequelize.sync().then(() =>
                Usuario.create({
                    first_name: "firstName" + i,
                    last_name: "lastName" + i,
                    email: "email" + i + "@email.com",
                    phone: "394820023" + i,
                    ciudad_id: (i % 10) + 1
                })
            );
        }
        console.log("termino");
        res.json({
            message: "inserted2"
        });
    } catch (e) {
        res.json({
            error: e
        });
    }
});
app.get("/select2", (req, res) => {
    sequelize
        .query(
            `
            SELECT usuarios.first_name, usuarios.last_name, usuarios.email, ciudads.name
            FROM usuarios
            INNER JOIN ciudads ON usuarios.ciudad_id = ciudads.id
            WHERE email = 'email2499@email.com';
        `,
            { model: Usuario }
        )
        .then(user => {
            res.json({
                user
            });
        });
});
//-----------------------------------------------

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
});
