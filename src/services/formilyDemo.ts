import { getSelectedIndex, setSelectedIndex as sessUtl_setSelectedIndex } from '@/utils/sessionUtils';
// import { sleep } from '@/utils';

export interface ISelectedIndexState {
  pathname: string;
  defaultIndex: number;
}

export async function querySelectedIndex(params: ISelectedIndexState) {
  const { pathname, defaultIndex } = params;
  //   sleep(500);
  return {
    status: 'ok',
    data: {
      pathname,
      index: getSelectedIndex(pathname, defaultIndex),
    },
  };
}

export interface ISetIndexState {
  pathname: string;
  index: number;
}

export async function setSelectedIndex(params: ISetIndexState) {
  const { pathname, index } = params;
  //   sleep(500);
  sessUtl_setSelectedIndex(pathname, index);
  return {
    status: 'ok',
    data: {
      pathname,
      index: index,
    },
  };
}
