const request = require('supertest');
const app = require('../app.js');

let id;
let token;


test("POST /users should create an user", async () => {
    const newUser = {
        firstName: "Jhon",
        lastName: "Velasco",
        email: "jhon12345@gmail.com",
        password: "jhon1234",
        phone: "3144270591"
    }
    const res = await request(app).post("/users").send(newUser);
    id = res.body.id
	expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newUser.firstName);
    expect(res.body.id).toBeDefined()
})

test("POST /users/login should log an user", async () => {
    const credentials = {
        email: "jhon12345@gmail.com",
        password: "jhon1234"
    }
    const res = await request(app).post("/users/login").send(credentials);
    token = res.body.token
	expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined()
})

test("PUT /users should update an user", async () => {
    const updatedUser = {
    firstName: "Diego",
}
    const res = await request(app).put(`/users/${id}`).send(updatedUser).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updatedUser.firstName);
})



test("GET /users should return all users", async() => {
    const res = await request(app).get("/users").set('Authorization', `Bearer ${token}`);
	expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
})


test("DELETE /users/:id should delete an user", async () => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});