### Setup and Run the Node server

1. Clone the project from following link

`https://github.com/fazeelmohamed/Country_API.git`

2. cd into the project folder
3. Run `npm install` to install the dependancies
4. Run node server `node server.js`

---

### API Calls

1. Get all currency symbols that are used by more than one country

`GET /api/countries/currency-symbols`

Ex:
> http://localhost:4000/api/countries/currency-symbols

---

2. Get the time differece between any two countries 

`GET /api/countries/time-difference?countryCode1=<code1>&countryCode2=<code1>`

Ex:
> http://localhost:4000/api/countries/time-difference?countryCode1=US&countryCode2=LK

---

1. Returns a list of countries in the region, orderd by highest population to lowest 

`GET /api/countries/names?region=<region>`

Ex:
> http://localhost:4000/api/countries/names?region=EU



