//posts.spec.js

const request = require('supertest')
const app = require('../src/app') // the express server
const expect = require('chai').expect

describe('Health check endpoint', () => {
    // TODO - Implement a proper health-check using a library!
    it('successfully returns response', () => {
        return request(app)
            .get('/health')
            .then((response) => {
                expect(response.statusCode).to.equal(200)
                expect(response.text).to.equal('REST service working normally')
            })
    })
})
