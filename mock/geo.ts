// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import geoData from './geo/data.json';
import { GET_GEO_LOCATION_API } from '../src/utils/constants';

export default {
  [`GET ${GET_GEO_LOCATION_API}`]: (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(geoData);
    }, 1000);
  },
};
