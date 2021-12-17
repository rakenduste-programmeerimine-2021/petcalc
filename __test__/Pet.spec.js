const supertest = require('supertest');
const app = require('../server');

jest.useFakeTimers();

describe("Loomade API testimine", () => {

	it("uue lisamine", async () => {
		
		const response = await supertest(app).post('/api/user/signup').send({
            _id: '823598239827491',
            email: 'dflkef@edjie.com',
            password: '2524rfecsysuUHFD-,.,',
            againPassword: '2524rfecsysuUHFD-,.,',
            securityQuestion: "What's your favourite brand of cereal?",
            securityAnswer: 'Kelloggs',
          });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('message');
        

	});

	it("usisse logimine", async () => {

		const response = await supertest(app).post('/api/user/login').send({
            email: 'dflkef@edjie.com',
            password: '2524rfecsysuUHFD-,.,',
          });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('token');
		expect(response.body).toHaveProperty('user');

	});

	it("uue lisamine", async () => {

		const response = await supertest(app).post('/api/pet/create').send({
            _id: '34534534',
			name: 'X',
            dateOfBirth: 23534654262,
            type: 'Dog',
            user: '823598239827491', 
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

    

    it("kõigi kasutaja loomade vaatamine", async () => {

		const response = await supertest(app).get('/api/pet/user/823598239827491');

		expect(response.status).toBe(200);
        expect(response.body[0]._id).toBe('34534534');

	});
	
	it("kustutamine", async () => {

		const response = await supertest(app).delete('/api/pet/delete/34534534');

		expect(response.status).toBe(200);
        expect(response.body.deletedPetID).toBe('34534534');
        expect(response.body).toHaveProperty('message');

	});

	it("kustutamine", async () => {

		const response = await supertest(app).delete('/api/user/delete/823598239827491');

		expect(response.status).toBe(200);
        expect(response.body.deletedUserID).toBe('823598239827491');
        expect(response.body).toHaveProperty('message');

	});

	
});