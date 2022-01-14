import request from '@/utils/request';
import { UserInfoParamsType } from '@/services/login';

export async function queryMenusData(params: UserInfoParamsType) {
  return request('/api/menu/get', {
    method: 'GET',
    params,
  });
}
