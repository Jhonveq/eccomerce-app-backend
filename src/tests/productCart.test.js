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

test("GET /cart should return all products in cart", async() => {
    const res = await request(app).get("/cart").set('Authorization', `Bearer ${token}`)
	expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
})

test("POST /cart should add a product in the cart", async () => {
    const newProduct = {
        quantity: "8"
    }
    const res = await request(app).post("/cart").send(newProduct).set('Authorization', `Bearer ${token}`);
    id = res.body.id
	expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(newProduct.quantity);
    expect(res.body.id).toBeDefined()
})

test("PUT /products should update a product", async () => {
    const updatedProduct = {
    quantity: "2",
}
    const res = await request(app).put(`/cart/${id}`).send(updatedProduct).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(updatedProduct.quantity);
})


test("DELETE /carts/:id should delete a product", async () => {
    const res = await request(app).delete(`/cart/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});