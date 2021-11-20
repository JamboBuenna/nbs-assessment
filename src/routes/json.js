const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  const inputArray = req.body;

  const reorderedJSONArray = inputArray.map(function(obj){
    return stringifySort(obj)
  });

  const uniqueArray = Array.from(new Set(reorderedJSONArray));
  const inputLength = inputArray.length;
  const uniqueLength = uniqueArray.length

  const response = {
    inputLength,
    uniqueLength,
    repeatedItems: inputLength - uniqueLength
  }

  res.send(response);
});

/**
 * An implementation of sort that can handle arrays &
 * //TODO - Work out what's going on here.
 * @param unordered The unordered JSON object
 * @param sortArrays: boolean Whether or not to reorder arrays
 * @returns {{}|*}
 */
function deepSortObject(unordered, sortArrays = false) {
  if (!unordered || typeof unordered !== 'object') {
    return unordered;
  }

  if (Array.isArray(unordered)) {
    const newArr = unordered.map((item) => deepSortObject(item, sortArrays));
    if (sortArrays) {
      newArr.sort();
    }
    return newArr;
  }

  const ordered = Object.keys(unordered).sort().reduce(
    (obj, key) => {
      obj[key] = unordered[key];
      return obj;
    },
    {}
  );

  Object.keys(ordered)
    .forEach((key) => {
      ordered[key] = deepSortObject(unordered[key], sortArrays);
    });
  return ordered;
}

/**
 * Reorganise the object using JSON stringify,
 * this inconsistently supports arrays though depending on Interpreter or ECMaScript version
 * therefore I've also created an alternate solution.
 * @param obj
 * @returns {string}
 */
function stringifySort(obj) {
  const keys = {};
  JSON.stringify(obj, (key, value) => {
    keys[key] = null;
    return value;
  });
  return JSON.stringify(obj, Object.keys(keys).sort());
};

module.exports = router;
