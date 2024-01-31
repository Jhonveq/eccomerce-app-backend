const request = require('supertest');
const app = require('../app.js');

let id;
let token;

beforeAll(async () => {
    const testerCredentials = {
        email: "tester@gmail.com",
        password: "tester1234"
    }
    const res = await request(app).post('/users/login').send(testerCredentials)
    token = res.body.token
})

test("GET /categories should return all categories", async() => {
    const res = await request(app).get("/categories")
	expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
})

test("POST /categories should create a category", async () => {
    const newCategory = {
        name: "Sport"
    }
    const res = await request(app).post("/categories").send(newCategory).set('Authorization', `Bearer ${token}`);
    id = res.body.id
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newCategory.name);
    expect(res.body.id).toBeDefined()
})

test("PUT /categories should update a category", async () => {
    const updatedCategory = {
    name: "Furniture",
}
    const res = await request(app).put(`/categories/${id}`).send(updatedCategory).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedCategory.name);
})


test("DELETE /categories/:id should delete a category", async () => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});