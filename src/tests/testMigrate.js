const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app.js');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const newUser = {
            firstName: "tester name",
            lastName: "tester lastname",
            email: "tester@gmail.com",
            password: "tester1234",
            phone: "3144270591"
        }
        await request(app).post('/users').send(newUser)
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();