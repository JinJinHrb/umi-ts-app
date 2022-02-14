import Immutable from 'immutable';

interface IDomain {
  imapHostname: string;
  imapPort: number;
  imapSsl: boolean;
  imapUsername: string;
  smtpHostname: string;
  smtpPort: number;
  smtpSsl: boolean;
  smtpUsername: string;
}

type TDomain = Partial<IDomain>;

const states: TDomain = {
  imapHostname: 'qq.com',
  imapPort: 25,
  imapSsl: true,
};
const initialState = Immutable.fromJS(states);

describe('Immutable', () => {
  it('set()', () => {
    const newState = Immutable.Map().merge(initialState, {
      imapHostname: '163.com',
    });
    console.log('utils/__test__/index.test.ts #25 newState:', newState.toJS());
    expect(newState.get('imapHostname') === '163.com');
  });
});
