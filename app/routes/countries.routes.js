module.exports = app => {
    const countries = require("../controllers/countries.controller.js");

    var router = require("express").Router();

    // Retrieve all currency symbols that are used by more than one country
    router.get("/currency-symbols", countries.findAllCurrencySymbols);

    // Retrieve time differece between any two contries
    router.get("/time-difference", countries.findTimeDifference);

    // Retrieve list of country name list in the region, orderd by highest population to lowest
    router.get("/names", countries.findCountryNameList);

    app.use('/api/countries', router);
}