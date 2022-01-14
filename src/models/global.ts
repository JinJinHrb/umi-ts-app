import { Effect, Reducer, Subscription, ImmerReducer } from 'umi';
import { queryUserInfo } from '@/services/login';
import { queryMenusData } from '@/services/menu';
// import menusSource from '../../config/menu.config';
import { MenusDate, LoginUserInfoState } from './connect.d';

export interface GlobalModelState {
  menusData: MenusDate[];
  userInfo: LoginUserInfoState;
}

export interface MenusDataState {
  title: string;
  link: string;
  key: string;
  icon: string;
  children?: MenusDataState[];
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    init: Effect;
    // queryMenusData: Effect;
    // queryUserInfo: Effect;
  };
  reducers: {
    // save: Reducer<GlobalModelState>;
    // 启用 immer 之后
    save: ImmerReducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    menusData: /* menusSource */ [],
    userInfo: {
      id: '',
      name: '',
    },
  },
  effects: {
    *init({ payload }, { call, put }) {
      const userid = localStorage.getItem('userid');
      const [rspMenu, rspUser] = yield [
        call(queryMenusData, { ...payload, userid }),
        call(queryUserInfo, { ...payload, userid }),
      ];
      const menusData = rspMenu.status === 'ok' ? rspMenu.data?.default : undefined;
      if (rspUser.status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            userInfo: rspUser.data,
            menusData: menusData,
          },
        });
      }
    },

    /* queryMenusData({ payload }, { call, put }) {
      const userid = localStorage.getItem('userid');
      const response = yield call(queryMenusData, { ...payload, userid });
      if (response.status === 'ok') {
        yield put({
          type: 'setMenusData',
          payload: {
            userInfo: response.data,
          },
        });
      }
    },

    *queryUserInfo({ payload }, { call, put }) {
      const userid = localStorage.getItem('userid');
      const response = yield call(queryUserInfo, { ...payload, userid });
      if (response.status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            userInfo: response.data,
          },
        });
      }
    }, */
  },
  reducers: {
    // save(state, action) {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
    // 启用 immer 之后
    save(state, action) {
      state.userInfo = action.payload?.userInfo;
      state.menusData = action.payload?.menusData;
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const reg = /^\/login/g;
        if (!reg.test(pathname)) {
          dispatch({
            type: 'init',
            payload: {},
          });
        }
      });
    },
  },
};

export default GlobalModel;
