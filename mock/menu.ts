// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import * as menusData from '../config/menu.config';
import { GET_MENU_API } from '../src/utils/constants';

export default {
  [`GET ${GET_MENU_API}`]: (req: Request, res: Response) => {
    setTimeout(() => {
      const { userid } = req.query;
      if (userid) {
        res.send({
          status: 'ok',
          data: menusData,
        });
      } else {
        res.send({
          status: 'error',
          data: {
            username: 'guest',
            userid: 'sdfsdfewfds',
          },
        });
      }
    }, 1000);
  },
};
