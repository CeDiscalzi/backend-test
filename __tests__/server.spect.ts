import app from '../src/server.js';
import request from 'supertest';

describe("Conjunto de test de servidor", () => {

    test("test Enpoint /", async () => {
        return await request(app)
            .get('/')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("Hola mundo al usuario cdiscalzi desde el puerto 3001");
            });
    });

    test("test Enpoint /api-key", async () => {
        return await request(app)
            .get('/api-key')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("la apikey de mi aplicacion es: default-key");
            });
    });

    test("test Enpoint /validar-rut correcto", async () => {
        return await request(app)
            .get('/validar-rut')
            .query({ rut: '164406466' })
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("El rut suministrado (164406466) es : valido");
            });
    });

    test("test Enpoint /validar-rut incorrecto", async () => {
        return await request(app)
            .get('/validar-rut')
            .query({ rut: '164406460' })
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("El rut suministrado (164406460) es : invalido");
            });
    });

    test("test Enpoint /validar-rut rut largo incorrecto", async () => {
        return await request(app)
            .get('/validar-rut')
            .query({ rut: '1' })
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("El rut suministrado (1) es : invalido");
            });
    });

    test("test Enpoint /validar-rut no numero", async () => {
        return await request(app)
            .get('/validar-rut')
            .query({ rut: '1aaa' })
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("El rut suministrado (1aaa) es : invalido");
            });
    });

    test("test Enpoint /validar-rut digito K", async () => {
        return await request(app)
            .get('/validar-rut')
            .query({ rut: '76476806K' })
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("El rut suministrado (76476806K) es : valido");
            });
    });

    test("test Enpoint /validar-rut digito 0", async () => {
        return await request(app)
            .get('/validar-rut')
            .query({ rut: '154370870' })
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("El rut suministrado (154370870) es : valido");
            });
    });

    test("test Enpoint /buscar-subcadena", async () => {
        return await request(app)
            .get('/buscar-subcadena')
            .query({ cadena: 'holaholahola', subcadena: 'hola' })
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe('La cadena "holaholahola" tiene 3 repeticiones de la subcadena "hola"');
            });
    });

});