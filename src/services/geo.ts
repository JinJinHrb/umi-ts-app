import request from '@/utils/request';
import { GET_GEO_LOCATION_API } from '@/utils/constants';

export async function queryGeoLocationData() {
  return request(GET_GEO_LOCATION_API, {
    method: 'GET',
  });
}
