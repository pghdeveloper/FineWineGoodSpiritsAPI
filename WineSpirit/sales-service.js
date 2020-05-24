const axios = require("axios");
const url = "https://data.pa.gov/resource/fhz7-8ncd.json"

const getSalesDetails = (county) => {
    return axios.get(url + '?county=' + county, { headers: { 'X-App-Token': 'apptoken' } })
}

const sortSalesDetails = async (data) => {
    data.sort((a, b) => (a.fiscal_year > b.fiscal_year) ? 1 : -1);
    var result = [];
    for(let i = 0; i < data.length; i++)
    {
        result.push({fiscalyear: data[i].fiscal_year, sales: data[i].sales });
    }

    return JSON.stringify(result);
}

module.exports = {
    getSalesDetails,
    sortSalesDetails,
    url
}