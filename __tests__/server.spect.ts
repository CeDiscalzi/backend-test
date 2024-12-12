import app from '../src/server.js';
import request from 'supertest';

describe("Conjunto de test de servidor", () => {

    test("test Enpoint /", async () => {
        return await request(app)
            .get('/')
            .send()
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("Hola mundo al usuario cdiscalzi");
            });
    });

    test("test Enpoint /key", async () => {
        return await request(app)
            .get('/key')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("la apikey de mi aplicacion es default-key");
            });
    });

    test("test Enpoint /validar-rut", async () => {
        return await request(app)
            .get('/validar-rut')
            .send({ rut: "16440646-6" })
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("El rut suministrado 16440646-6 es : valido");
            });
    });

    test("test Enpoint /buscar-subcadena", async () => {
        return await request(app)
            .get('/buscar-subcadena')
            .send({ cadena: "holaholahola", subcadena: "hola" })
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("La cadena holaholahola tiene 3 repeticiones de la subcadena hola");
            });
    });

});