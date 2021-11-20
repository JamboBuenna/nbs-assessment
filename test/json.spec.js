const request = require('supertest')
const app = require('../src/app') // the express server
const expect = require('chai').expect
const fs = require('fs')


// TODO - Work out why this logic didn't work.
function assertionHelper(inputArray) {
  return request(app)
    .post('/json')
    .send(inputArray)
}

describe('GET /json endpoint', () => {

    //Expect 1 result, 1 duplicate
    const shallowArray = [
      {
        a: 1,
        b: 1
      },
      {
        b: 1,
        a: 1
      }
    ]

  //Expect 1 result, 1 duplicate
  const deepArray = [
    {
      c: {
        a: 1,
        b: 1
      }
    },
    {
      c: {
        b: 1,
        a: 1
      }
    }
  ]

  //Expect 2 results, 1 duplicate
  const simpleDuplicates = [
    {
      a: 1,
      b: 1
    },
    {
      a: 1,
      b: 1
    },
    {
      a: 2,
      b: 1
    }
  ]

    it('verifies a shallow sort', () => {
      const expectedResponse = {
        inputLength: 2,
        uniqueLength: 1,
        repeatedItems: 1
      };
      return request(app)
        .post('/json')
        .send(shallowArray).then((response) => {
          expect(response.statusCode).to.equal(200)
          expect(response.text).to.equal(JSON.stringify(expectedResponse))
      })
    })

    it('verifies a deep sort', () => {
      const expectedResponse = {
        inputLength: 2,
        uniqueLength: 1,
        repeatedItems: 1
      };
      return request(app)
        .post('/json')
        .send(deepArray).then((response) => {
          expect(response.statusCode).to.equal(200)
          expect(response.text).to.equal(JSON.stringify(expectedResponse))
        })
    })

  it('verifies a simple sort', () => {
    const expectedResponse = {
      inputLength: 3,
      uniqueLength: 2,
      repeatedItems: 1
    };
    return request(app)
      .post('/json')
      .send(simpleDuplicates).then((response) => {
        expect(response.statusCode).to.equal(200)
        expect(response.text).to.equal(JSON.stringify(expectedResponse))
      })
  })


    it('tests nbs generated example', () => {
        const rawData = fs.readFileSync('assets/items.json');
        const json = JSON.parse(rawData);
        const expectedResponse = {
          inputLength: 1000,
          uniqueLength: 975,
          repeatedItems: 25
        };

      assertionHelper(json).then((response) => {
        expect(response.statusCode).to.equal(200)
        expect(response.text).to.equal(JSON.stringify(expectedResponse))
      })

      return request(app)
        .post('/json')
        .send(json).then((response) => {
          expect(response.statusCode).to.equal(200)
          expect(response.text).to.equal(JSON.stringify(expectedResponse))
        })
    })
})
