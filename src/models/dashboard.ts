import { Effect, Reducer, history, ImmerReducer } from 'umi';
import { message } from 'antd';
import { queryCard } from '@/services/dashboard';

import { ConnectState } from './connect.d';

export interface DashboardState {
  name: any;
  data: DataProps[];
  cardSource: any;
}

interface DataProps {
  id: string;
  name: string;
}

export interface DashboardType {
  namespace: 'dashboard';
  state: DashboardState;
  effects: {
    queryCard: Effect;
  };
  reducers: {
    // save: Reducer<DashboardState>;
    // 启用 immer 之后
    save: ImmerReducer<DashboardState>;
  };
}

const DashboardModel: DashboardType = {
  namespace: 'dashboard',
  state: {
    name: '',
    data: [],
    cardSource: {},
  },
  effects: {
    *queryCard(_, { call, put }) {
      const response = yield call(queryCard);
      yield put({
        type: 'save',
        payload: {
          cardSource: response.data,
        },
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
    save(state, action) {
      state.name = action.payload;
    },
  },
};

export default DashboardModel;
