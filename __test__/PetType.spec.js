const supertest = require('supertest');
const app = require('../server');

jest.useFakeTimers();

describe("Loomatüüpidede API testimine", () => {


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

		const response = await supertest(app).post('/api/pettype/create').send({
            _id: '3534634533432',
            species: 'Turtle or Tortoise',
            youngUntilXMonths: 6,
            minInMorning: 30, 
            minInEvening: 30, 
            minInDay: 30, 
            hInWeek: 10, 
            dInMonth: 5, 
            moneyInMonth: 100, 
        });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('message');
        

	});

    it("ühe vaatamine ", async () => {

        const response = await supertest(app).get('/api/pettype/Turtle or Tortoise');

        expect(response.status).toBe(200);
        expect(response.body._id).toBe('3534634533432');

    });

    it("kõigi vaatamine", async () => {

		const response = await supertest(app).get('/api/pet/');

		expect(response.status).toBe(200);
        expect(response.body[0]._id).toBe('3534634533432');

	});

    it("uuendamine", async () => {

		const response = await supertest(app).put('/api/pet/update/3534634533432').send({dInMonth: 6});

		expect(response.status).toBe(200);
        expect(response.body._id).toBe('3534634533432');
        expect(response.body.dInMonth).toBe(6);

	});

    it("kustutamine", async () => {

		const response = await supertest(app).delete('/api/pet/delete/3534634533432');

		expect(response.status).toBe(200);
        expect(response.body.deletedPetTypeID).toBe('3534634533432');
        expect(response.body).toHaveProperty('message');

	});

    it("kustutamine", async () => {

		const response = await supertest(app).delete('/api/pet/delete/823598239827491');

		expect(response.status).toBe(200);
        expect(response.body.deletedUserID).toBe('823598239827491');
        expect(response.body).toHaveProperty('message');

	});

});