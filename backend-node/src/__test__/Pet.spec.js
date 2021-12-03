const supertest = require('supertest');
const Pets = require('../models/Pet.js');
const app = require('../server');

describe("Loomade API testimine", () => {

	it("uue lisamine", async () => {

		const response = await supertest(app).post('/api/pet/create').send({
            _id:' 34534534',
			name: 'X',
            dateOfBirth: 23534654262,
            type: 'Dog',
            user: 'Spfincei', 
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('message');
        

	});

    it("ühe vaatamine ", async () => {

        const response = await supertest(app).get('/api/pet/34534534');

        expect(response.status).toBe(200);
        expect(response.body._id).toBe('34534534');

    });

    it("kõigi vaatamine", async () => {

		const response = await supertest(app).get('/api/pet/');

		expect(response.status).toBe(200);
        expect(response.body[0]._id).toBe('34534534');

	});

    it("uuendamine", async () => {

		const response = await supertest(app).put('/api/pet/update/34534534').send({type: 'Cat'});

		expect(response.status).toBe(200);
        expect(response.body._id).toBe('34534534');
        expect(response.body.type).toBe('Cat');

	});

    it("kustutamine", async () => {

		const response = await supertest(app).delete('/api/pet/delete/34534534');

		expect(response.status).toBe(200);
        expect(response.body.deletedPetID).toBe('34534534');
        expect(response.body).toHaveProperty('message');

	});

    it("kõigi kasutaja loomade vaatamine", async () => {

		const response = await supertest(app).delete('/api/pet/user/Spfincei');

		expect(response.status).toBe(200);
        expect(response.body[0]._id).toBe('34534534');

	});

	afterEach(async () => {
		await Pets.deleteOne({
			name: 'X'
		})
	})

});