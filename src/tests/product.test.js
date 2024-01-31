const request = require('supertest');
const app = require('../app.js');
require('../models')


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

test("GET /products should return all products", async() => {
    const res = await request(app).get("/products")
	expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
})

test("POST /products should create a product", async () => {
    const newProduct = {
        title: 'Gaming chair',
        description: 'Chair for gaming set up',
        brand: 'Walmart',
        price: '$1400'
    }
    const res = await request(app).post("/products").send(newProduct).set('Authorization', `Bearer ${token}`);
    id = res.body.id
	expect(res.status).toBe(201);
    expect(res.body.title).toBe(newProduct.title);
    expect(res.body.id).toBeDefined()
})

test("PUT /products should update a product", async () => {
    const updatedProduct = {
    brand: "Ikea",
}
    const res = await request(app).put(`/products/${id}`).send(updatedProduct).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.brand).toBe(updatedProduct.brand);
})


test("DELETE /products/:id should delete a product", async () => {
    const res = await request(app).delete(`/products/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});