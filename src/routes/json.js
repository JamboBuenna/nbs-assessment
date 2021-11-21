const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /json:
 *   post:
 *     summary: Identifies duplicates in an array of JSON objects.
 *     description: Identifies duplicates in an array of JSON objects, to flesh out.
 */
router.post("/", (req, res, next) => {
  const inputArray = req.body;

  const reorderedJSONArray = inputArray.map(function(obj) {
    return stringifySort(obj);
  });

  // This set isn't really needed, as the logic below delivers a processing, slightly less efficiently as doesn't
  // use HashMaps. However if the requirements were simplified as repeated items weren't used I'd suggest using this
  // due to simpler to read code.
  const uniqueArray = Array.from(new Set(reorderedJSONArray));

  // By searching only forward of the item, it's a little more efficient
  const repeatedItems = reorderedJSONArray.filter((item,i) => reorderedJSONArray.includes(item, i+1))


  const response = {
    inputLength: inputArray.length,
    uniqueLength: uniqueArray.length,
    repeated: {
      items: repeatedItems,
      length: repeatedItems.length
    }
  };

  res.send(response);
});

/**
 * An implementation of making the objects consistent that can handle arrays.
 * TODO - Probably overkill, was interesting to play with, remove this.
 * @param unordered The unordered JSON object
 * @param sortArrays: boolean Whether or not to reorder arrays
 * @returns {{}|*}
 */
function deepSortObject(unordered, sortArrays = false) {
  if (!unordered || typeof unordered !== "object") {
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
