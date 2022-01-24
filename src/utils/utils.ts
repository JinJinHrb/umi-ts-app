import { formatTime, FormatType } from './dates';
import _ from 'lodash';
import { DVA_LOGGER } from '@/utils/constants';

// console.log('@@@UMI_ENV', process.env);

/**
 * menu Highlight key
 * @param pathname string
 */
export const queryKeysByPath = (pathname: string): { openKey: string; selectKey: string } => {
  const reg = /(^\/*)|(\/*$)/g; // 匹配字符串首尾斜杠
  const path = pathname.replace(reg, '');
  const routes = path.split('/');
  return { openKey: routes[0], selectKey: routes[1] || routes[0] };
};

/**
 * 本地打印自动带上时间戳
 * @returns
 */
export const umiConsole =
  process.env.NODE_ENV === 'development'
    ? (function (this: any) {
        const ctx = this;
        const getFn = function (op: string) {
          return function (...args: any[]) {
            /* args = args.map((el) => {
              if (Iterable.isIterable(el)) {
                return el.toJS();
              } else if (_.isObjectLike(el)) {
                const elCopy = {};
                Object.keys(el).forEach((k) => {
                  const val = el[k];
                  if (Iterable.isIterable(val)) {
                    elCopy[`${k}.toJS()`] = val.toJS();
                  } else {
                    elCopy[k] = val;
                  }
                });
                return elCopy;
              }
              return el;
            }); */
            const dateStr = formatTime(new Date(), FormatType.Y4M2D2_H2m2s2S3);
            args.unshift(dateStr);
            if (_.get(args, 1) === DVA_LOGGER) {
              const argSubArr1 = args.slice(0, 4);
              const argSubArr2 = args.slice(4);
              argSubArr1.splice(3, 1, `%c${argSubArr1[3]}`);
              argSubArr1.splice(2, 1, `%c${argSubArr1[2]}`);
              argSubArr1.splice(1, 1, `%c${argSubArr1[1]}`);
              args = [argSubArr1.join(' ')];
              args.push('color: grey');
              args.push('color: darkBlue');
              args.push('color: darkGreen');
              args.push(...argSubArr2);
            }
            (console as any)[op].apply(ctx, args);
          };
        };
        const rtn = {} as typeof console;
        Object.keys(console)
          .filter((k) => {
            const v = _.get(console, k);
            return _.isFunction(v);
          })
          .forEach((op) => {
            (rtn as any)[op] = getFn(op);
          });
        return rtn;
      })()
    : (function () {
        const nilFn = () => {};
        const rtn = {} as typeof console;
        Object.keys(console)
          .filter((k) => {
            const v = _.get(console, k);
            return _.isFunction(v);
          })
          .forEach((op) => {
            if (['log', 'warn'].includes(op)) {
              (rtn as any)[op] = nilFn;
            } else {
              (rtn as any)[op] = (console as any)[op];
            }
          });
        return rtn;
      })();
