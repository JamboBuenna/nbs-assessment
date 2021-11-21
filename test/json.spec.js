const request = require('supertest')
const app = require('../src/app') // the express server
const expect = require('chai').expect
const fs = require('fs')

/**
 * Helper function to quickly assess the state of inputs & outputs
 * TODO - This got a little over complex when added in assertions about the repeated items so may want a refactor
 * @param inputArray
 * @param expectedResponse
 * @returns {Promise<boolean>} Whether or not the assessment has passed or failed (I'm sure that Mocha must have
 * a better method of doing helper functions, so if developed further that should be looked into)
 */
async function assertionHelper(inputArray, expectedResponse, checkRepeatedItems = true) {
  return await request(app)
    .post('/json')
    .send(inputArray).then((response) => {
      if(response.statusCode == 200) {
        const responseObject = JSON.parse(response.text);

        if(
          responseObject.inputLength === expectedResponse.inputLength &&
          responseObject.uniqueLength === expectedResponse.uniqueLength &&
          responseObject.repeated.length === expectedResponse.repeated.length
        ) {
          // Helper function won't want to check this for large test cases
          if(checkRepeatedItems === false) {
            return true;
          }

          if(responseObject.repeated.items.toString()  == expectedResponse.repeated.items) {
            return true;
          }
        }
      }
      return false;
  })
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

  it('verifies a shallow sort',() => {
    const expectedResponse = {
      inputLength: 2,
      uniqueLength: 1,
      repeated: {
        items: [
          {
            a: 1,
            b: 1
          }
        ],
        length: 1
      }
    };
    return request(app)
      .post('/json')
      .send(shallowArray).then((response) => {

        expect(response.statusCode).to.equal(200)
        const responseObj = JSON.parse(response.text)
        expect(responseObj.inputLength).to.equal(expectedResponse.inputLength)
        expect(responseObj.uniqueLength).to.equal(expectedResponse.uniqueLength)
        expect(responseObj.repeated.length).to.equal(expectedResponse.repeated.length)
      })
    })

    it('verifies a deep sort', async () => {
      const expectedResponse = {
        inputLength: 2,
        uniqueLength: 1,
        repeated: {
          items: '{"c":{"a":1,"b":1}}',
          length: 1
        }
      };

      expect(await assertionHelper(deepArray, expectedResponse)).to.equal(true);
    })

  it('verifies a simple sort', async () => {
    const expectedResponse = {
      inputLength: 3,
      uniqueLength: 2,
      repeated: {
        items: '{"a":1,"b":1}',
        length: 1
      }
    };
    expect(await assertionHelper(simpleDuplicates, expectedResponse)).to.equal(true);
  })

    it('tests nbs generated example', async () => {
      const rawData = fs.readFileSync('assets/items.json');
      const json = JSON.parse(rawData);
      const expectedResponse = {
        inputLength: 1000,
        uniqueLength: 975,
        repeated: {
          length: 25
        }
      };
      expect(await assertionHelper(json, expectedResponse, false)).to.equal(true);
    })
})
