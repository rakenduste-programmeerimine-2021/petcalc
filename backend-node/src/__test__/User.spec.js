const supertest = require('supertest');
const { login } = require('../controllers/user.js');
const Users = require('../models/User.js');
const app = require('../server');

describe("kasutaja API testimine", () => {

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

    it("ühe vaatamine ", async () => {

        const response = await supertest(app).get('/api/user/823598239827491');

        expect(response.status).toBe(200);
        expect(response.body._id).toBe('823598239827491');

    });

    it("uuendamine", async () => {

		const response = await supertest(app).put('/api/user/update/823598239827491').send({email: 'weifhwiue@wfihd.com'});

		expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');

	});

    it("kustutamine", async () => {

		const response = await supertest(app).delete('/api/pet/delete/823598239827491');

		expect(response.status).toBe(200);
        expect(response.body.deletedUserID).toBe('823598239827491');
        expect(response.body).toHaveProperty('message');

	});

    /* login */

	afterEach(async () => {
		await Users.deleteOne({
			_id: '823598239827491'
		})
	})

});