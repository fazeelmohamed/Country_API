const axios = require('axios');

const API_URL = `https://restcountries.eu/rest/v2/all`;


/**
 * Retrieve all currencies from countries
 * 
 * @param {*} countries 
 * @returns list of currencies
 */
const getAllCurrencies = (countries) => {
    if(!countries || !Array.isArray(countries)) return [];

    return countries.reduce((currencies, currentCountry) => {
        if(currentCountry?.currencies)
        {
            currencies = [...currencies, ...currentCountry.currencies];
        }
        return currencies;
    }, [])
}



const convertUTCTimeTo24HrsMinutes = (utcTime) => {
    if(!utcTime) return null;

    if(!utcTime.includes("UTC")) return 0;

    if(!utcTime.includes(":"))
    {
        utcTime = utcTime.trim() + ':00';
    }

    const parts = utcTime.replace("UTC", '').split(":");

    const hoursString = parts[0];
    const minutesString = parts[1];
    const plusOrMinus = hoursString.includes('+') ? "+" : "-";
    const onlyHoursString = hoursString.replace(plusOrMinus, '');

    const hoursInMinutes = plusOrMinus === '+' ? ((parseInt(onlyHoursString) + 12) * 60) :  (parseInt(onlyHoursString) * 60);

    const finalTimeInMinutes =  hoursInMinutes + parseInt(minutesString);

    return finalTimeInMinutes;
}

 const getCountryTimeZoneByCountryCode = (countryCode, countries) => {
    if(!countryCode) return null;
    if(!countries) return null;

    const found = countries.find(c => c.alpha2Code === countryCode );

    if(found?.timezones?.length > 0 )
    {
        return found.timezones[0];
    }

    return null;
}


/**
 * Retrieve all symbols with counts
 * 
 * @param {*} symbols 
 * @returns list of object with symbol and count
 */
const getSymbols = (symbols) => {
    if(!symbols || !Array.isArray(symbols)) return [];

    return symbols.reduce((symbolsAcc, current) => {
        if(current?.symbol)
        {
            const found = symbolsAcc.find(c => c.symbol === current.symbol);
            const filteredSymbols = symbolsAcc.filter(s => s.symbol !== current.symbol);

            if(found)
            {
                filteredSymbols.push({
                    symbol: found.symbol,
                    count: found?.count ? found.count + 1 : 1,
                });

                symbolsAcc = [...filteredSymbols];

            }
            else
            {
                symbolsAcc.push({
                    symbol: current.symbol,
                    count: 1,
                });
            }
        }
        return symbolsAcc;
    }, [])
}


/**
 * Retrieve all currency symbols that are used by more than one country
 */
exports.findAllCurrencySymbols = async () => {
    try
    {
        const response = await axios.get(API_URL);
        const countries = response.data;

        if(!Array.isArray(countries))  return Promise.reject("Country data is empty");

         // get all currencies from countries
        const currencies = getAllCurrencies(countries);
        if(currencies.length === 0) return Promise.reject("No currencies available");

        // get all symbols with counts from currencies
        const symbols =  getSymbols(currencies);
        if(symbols.length === 0) return Promise.reject("No symbols available");

        //get symbols wich are use by more than one countries
        const filteredSymbols = symbols.filter(symbol => symbol.count > 1);
        
        return Promise.resolve(filteredSymbols);
    }
    catch(err)
    {
        return Promise.reject(err);
    }
};


/**
 * Retrieve all currency symbols that are used by more than one country
 */
 exports.findTimeDifference = async (countryCode1, countryCode2) => {
    try
    {
        const response = await axios.get(API_URL);
        const countries = response.data;

        const timeZone1 = getCountryTimeZoneByCountryCode(countryCode1, countries);
        const timeZone2 = getCountryTimeZoneByCountryCode(countryCode2, countries);

        if( !timeZone1 ) return Promise.reject(`Country time zone not found for ${countryCode1}`);
        if( !timeZone2 ) return Promise.reject(`Country time zone not found for ${countryCode2}`);

        const time1InMinutes = convertUTCTimeTo24HrsMinutes(timeZone1);
        const time2InMinutes = convertUTCTimeTo24HrsMinutes(timeZone2);

        const timeDifferenceInMinutes = Math.abs(time1InMinutes - time2InMinutes);

        return Promise.resolve(timeDifferenceInMinutes);
    }
    catch(err)
    {
        return Promise.reject(err);
    }
};


/**
 * Retrieve all countries by region
 */
 exports.findCountryNameList = async (region) => {
    try
    {
        const response = await axios.get(API_URL);
        const countries = response.data;

        if(region)
        {
            const filteredCountries = countries
                                        .filter(country => country.regionalBlocs.findIndex(bloc => bloc.acronym === region) !== -1)
                                        .sort( (c1, c2 ) => c1.population > c2.population ? -1 : 1 );

            if(!filteredCountries || filteredCountries.length === 0) return Promise.reject("Countries not found");

            return Promise.resolve(filteredCountries.map(country => country.name));
        }
        else
        {
            return Promise.resolve(countries.map(country => country.name));
        }
        
    }
    catch(err)
    {
        return Promise.reject(err);
    }
};