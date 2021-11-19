const request = require('supertest')
const app = require('../src/app') // the express server
const expect = require('chai').expect
const fs = require('fs')

describe('GET /json endpoint', () => {

    it('tests manually generated example', () => {
        const json = {
            hello: 'world'
        };
        return request(app)
            .post('/json')
            .send(json)
            .then((response) => {
                expect(response.statusCode).to.equal(200)
                expect(response.text).to.equal(JSON.stringify(json))
            })
    })


    it('tests nbs generated example', () => {
        const rawData = fs.readFileSync('assets/items.json');
        const json = JSON.parse(rawData);

        return request(app)
            .post('/json')
            .send(json)
            .then((response) => {
                expect(response.statusCode).to.equal(200)
                expect(response.text).to.equal(JSON.stringify(json))
            })
    })
})
