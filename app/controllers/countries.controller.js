const countries = require("../services/countries.service.js");

/**
 * Retrieve all currency symbols that are used by more than one country
 */
exports.findAllCurrencySymbols = async (req, res) => {

        try
        {
            const response = await countries.findAllCurrencySymbols();
            res.status(200).send({symbols: response})
        }
        catch(err)
        {
            res.status(500).send({message:err.message || "Some error occurred while fetch countries api."});
        }
};

/**
 * Retrieve all currency symbols that are used by more than one country
 */
 exports.findTimeDifference = async (req, res) => {
    
    const countryCode1 = req.query.countryCode1;
    const countryCode2 = req.query.countryCode2;

    try
    {
        const response = await countries.findTimeDifference(countryCode1, countryCode2);
        res.status(200).send({timeDifferenceInMinutes: response});
    }
    catch(err)
    {
        res.status(500).send({message:err.message || "Some error occurred while fetch countries api."});
    }
};


/**
 * Retrieve all country name list
 * region - query param for filter
 */
 exports.findCountryNameList = async (req, res) => {
    const region = req.query.region;
    try
    {
        const response = await countries.findCountryNameList(region);
        res.status(200).send({countries: response});
    }
    catch(err)
    {
        res.status(500).send({message:err.message || "Some error occurred while fetch countries api."});
    }
};


