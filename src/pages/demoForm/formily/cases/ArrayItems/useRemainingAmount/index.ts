/** @format */

// import { queryRemainingAmount } from 'foreignTradePlatform/api/settings/subAccount'
import { umiConsole } from '@/utils';
import { useEffect, useState } from 'react';
// import { PLATFORM_PRIVILEGE_CODE } from '../../StaffAll/Constant';

export enum PLATFORM_PRIVILEGE_CODE {
  FUND = 'FUND',
  CRM = 'CRM',
  ALL = 'ALL',
}

export enum SUB_ACCOUNT_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

interface PlatformState {
  endTime: number | null;
  platform: 'FUND' | 'CRM';
  remainingQuantity: number;
  startTime: number | null;
  totalQuantity: number;
}

export interface UseRemainingAmountRet {
  remainingAmount: {
    CRM: number;
    FUND: number;
  };
  platformState: {
    FUND: PlatformState;
    CRM: PlatformState;
  };
  loading: boolean;
  reloadRemainingAmountState: () => void;
}

const queryRemainingAmount = () =>
  new Promise((r) =>
    setTimeout(() => {
      r({
        records: [
          { platform: 'FUND', remainingQuantity: '10', startTime: null, endTime: null, totalQuantity: '10' },
          { platform: 'CRM', remainingQuantity: '0', startTime: null, endTime: null, totalQuantity: '0' },
        ],
      });
    }, 5000),
  );

const useRemainingAmount: () => UseRemainingAmountRet = () => {
  const [remainingAmount, setRemainingAmount] = useState({
    [PLATFORM_PRIVILEGE_CODE.CRM]: 0,
    [PLATFORM_PRIVILEGE_CODE.FUND]: 0,
  });

  const [loading, setLoading] = useState(true);

  const [platformState, setPlatformState] = useState<{
    [key in PLATFORM_PRIVILEGE_CODE]: PlatformState;
  }>({
    [PLATFORM_PRIVILEGE_CODE.CRM]: {
      endTime: null,
      platform: 'CRM',
      remainingQuantity: 0,
      startTime: null,
      totalQuantity: 0,
    },
    [PLATFORM_PRIVILEGE_CODE.FUND]: {
      endTime: null,
      platform: 'CRM',
      remainingQuantity: 0,
      startTime: null,
      totalQuantity: 0,
    },
  });

  const [reload, setReload] = useState(0);

  useEffect(() => {
    setLoading(true);
    umiConsole.log('formily/cases/ArrayItems/useRemainingAmount #83 start query');
    queryRemainingAmount()
      .then((res: any) => {
        const remaining = {} as any;
        const platform = {} as any;
        (res.records || []).forEach((r: any) => {
          r.remainingQuantity = Number(r.remainingQuantity);
          r.totalQuantity = Number(r.totalQuantity);
          remaining[r.platform] = r.remainingQuantity;
          platform[r.platform] = r;
        });
        umiConsole.log('formily/cases/ArrayItems/useRemainingAmount #92 platform:', platform, 'remaining:', remaining);
        setRemainingAmount(remaining);
        setPlatformState(platform);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reload]);

  return {
    remainingAmount,
    platformState,
    loading,
    reloadRemainingAmountState: () => {
      setReload(reload + 1);
    },
  };
};

export default useRemainingAmount;
