//import {getSalesDetails} from './sales-service';
const {getSalesDetails, sortSalesDetails, url} = require('./sales-service');
//import axios from 'axios';
const axios = require("axios");

jest.mock('axios');

describe('sortSalesDetails', () => {
  it('Successfully parse sales Details', async () => {
    const mockResult = [
      {
          "fiscalyear": "2016-17",
          "sales": "300167811"
      },
      {
          "fiscalyear": "2017-18",
          "sales": "300779127"
      },
      {
          "fiscalyear": "2018-19",
          "sales": "309592819"
      }
    ];

    const data = [ {
      fips_state_code: '42',
      fips_county_code: '003',
      pennsylvania_county_code: '02',
      county: 'Allegheny',
      fiscal_year: '2016-17',
      sales: '300167811',
      latitude: '40.46735543',
      longitude: '-79.98619843',
      new_georeferenced_column: { type: 'Point', coordinates: [Array] }
  },
  {
      fips_state_code: '42',
      fips_county_code: '003',
      pennsylvania_county_code: '02',
      county: 'Allegheny',
      fiscal_year: '2018-19',
      sales: '309592819',
      latitude: '40.46735543',
      longitude: '-79.98619843',
      new_georeferenced_column: { type: 'Point', coordinates: [Array] }
  },
  {
      fips_state_code: '42',
      fips_county_code: '003',
      pennsylvania_county_code: '02',
      county: 'Allegheny',
      fiscal_year: '2017-18',
      sales: '300779127',
      latitude: '40.46735543',
      longitude: '-79.98619843',
      new_georeferenced_column: { type: 'Point', coordinates: [Array] }
    },
  ];

  const result = await sortSalesDetails(data); 

  expect(result).toEqual(JSON.stringify(mockResult));
  });
});

describe('getSalesDetails', () => {
    it('fetches sales data successfully from an API', async () => {
        const data2 = [ {
            fips_state_code: '42',
            fips_county_code: '003',
            pennsylvania_county_code: '02',
            county: 'Allegheny',
            fiscal_year: '2016-17',
            sales: '300167811',
            latitude: '40.46735543',
            longitude: '-79.98619843',
            new_georeferenced_column: { type: 'Point', coordinates: [Array] }
        },
        {
            fips_state_code: '42',
            fips_county_code: '003',
            pennsylvania_county_code: '02',
            county: 'Allegheny',
            fiscal_year: '2018-19',
            sales: '309592819',
            latitude: '40.46735543',
            longitude: '-79.98619843',
            new_georeferenced_column: { type: 'Point', coordinates: [Array] }
        },
        {
            fips_state_code: '42',
            fips_county_code: '003',
            pennsylvania_county_code: '02',
            county: 'Allegheny',
            fiscal_year: '2017-18',
            sales: '300779127',
            latitude: '40.46735543',
            longitude: '-79.98619843',
            new_georeferenced_column: { type: 'Point', coordinates: [Array] }
          },
        ];
     
        axios.get.mockImplementation(() => Promise.resolve({data: data2}));

        const salesData = await getSalesDetails('Allegheny');     

        expect(salesData.data).toEqual(data2);

        expect(axios.get).toHaveBeenCalledWith(url + '?county=Allegheny', { headers: { 'X-App-Token': 'apptoken' } });
      });

      it('Unsuccessful search of data', async () => {
        const data2 = [];
     
        axios.get.mockImplementation(() => Promise.resolve({data: data2}));

        const salesData = await getSalesDetails('Allegheny1');     

        expect(salesData.data).toEqual(data2);

      });
     
      it('fetches erroneously data from an API', async () => {
        const errorMessage = 'Network Error';
     
        axios.get.mockImplementationOnce(() =>
          Promise.reject(new Error(errorMessage)),
        );
     
        await expect(getSalesDetails('Westmoreland1')).rejects.toThrow(errorMessage);
      });
});

describe('My Test Suite', () => {
    it('My Test Case', () => {
      expect(true).toEqual(true);
    });
  });