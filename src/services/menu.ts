import request from '@/utils/request';
import { UserInfoParamsType } from '@/services/login';
import { GET_MENU_API } from '@/utils/constants';

export async function queryMenusData(params: UserInfoParamsType) {
  return request(GET_MENU_API, {
    method: 'GET',
    params,
  });
}
