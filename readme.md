### Herramientas utilizadas

-   Node.js, express, sequelize
-   DBeaver
-   Postman

### Esquemas

1. <b>users</b>(id, first_name, last_name, email, phone, city)

2. <b>usuarios</b>(id, first_name, last_name, email, phone, <ins>ciudad_id</ins>) ; <b>ciudads</b>(id, name)

### Pruebas

1.  Insertar 5000 registros de usuarios en ambos esquemas <br/>

    1.

    - MySql = AVG(51124 + 54739 + 60911) = 55591,33 ms
    - PostgreSQL = AVG(94671 + 100439 + 98870) = 97993,33 ms

    2.

    Insertar 10 ciudades:

    - MySql = AVG(221 + 199 + 184) = 201,33 ms
    - PostgreSQL = AVG(205 + 196 + 226) = 209 ms

    Insertar usuarios:

    - MySql = AVG(61806 + 52964 + 53148) = 55972,67 ms
    - PostgreSQL = AVG(103757 + 104826) = 104291,5 ms

2.  Seleccionar un user (first_name, last_name, email = email2499@email.com, city) <br/>

    1.

    - MySql = AGV(156 + 30 + 14) = 66,67 ms
    - PostgreSQL = AVG(72 + 19 + 11) = 34 ms

    2.

    - MySql = AVG(170 + 28 + 22) = 73,33 ms
    - PostgreSQL = AVG(164 + 36 + 19) = 73 ms

Totales: <br/>

-   Mysql = 111,9 s
-   PostgreSQL = 202,6 s

Nota: el tiempo es el que da postman. Intente realizar la prueba con 10.000 registros, pero al usar el segundo esquema daba error la respuesta del servidor.
