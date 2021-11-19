//posts.spec.js

const request = require('supertest')
const app = require('../src/app') // the express server
const expect = require('chai').expect

describe('GET /posts endpoint', () => {
    it('GET /posts endpoint successfully returns response', () => {
        return request(app)
            .get('/posts')
            .then((response) => {
                expect(response.statusCode).to.equal(200)
                expect(response.text).to.equal('You have hit GET /posts endpoint')
            })
    })
})
