import { Effect, Reducer, ImmerReducer } from 'umi';
import { querySelectedIndex, setSelectedIndex } from '@/services/formDemo';
// import { umiConsole } from '@/utils';
const FORM_DEMO = 'formDemo';

export interface ISelectedIndexState {
  pathname: string;
  index: number;
}

export interface ISelectedIndexModel {
  namespace: typeof FORM_DEMO;
  state: ISelectedIndexState;
  effects: {
    querySelectedIndex: Effect;
    setSelectedIndex: Effect;
  };
  reducers: {
    // save: Reducer<ISelectedIndexState>;
    // 启用 immer 之后
    setSelectedIndex4Model: ImmerReducer<ISelectedIndexState>;
  };
}

const SelectedIndexModel: ISelectedIndexModel = {
  namespace: FORM_DEMO,
  state: {
    pathname: '/',
    index: 0,
  },
  effects: {
    *querySelectedIndex({ payload }, { call, put }) {
      const { pathname, defaultIndex } = payload;
      const response = yield call(querySelectedIndex, {
        pathname,
        defaultIndex,
      });
      if (response.status === 'ok') {
        yield put({
          type: 'setSelectedIndex4Model',
          payload: response.data,
        });
      }
    },

    *setSelectedIndex({ payload }, { fork, put }) {
      const { pathname, index } = payload;
      yield fork(setSelectedIndex, {
        pathname,
        index,
      });
      yield put({
        type: 'setSelectedIndex4Model',
        payload,
      });
    },
  },
  reducers: {
    // save(state, action) {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
    // 启用 immer 之后
    setSelectedIndex4Model(state, action) {
      //   umiConsole.log('reducers/setSelectedIndex4Model #54 payload:', action.payload);
      Object.entries(action.payload).forEach(([k, v]) => {
        (state as any)[k] = v;
      });
    },
  },
};

export default SelectedIndexModel;
