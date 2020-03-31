import * as CONSTS from '../constants';

describe('상수관리 테스트', () => {
  test('FORMAT의 프로퍼티 확인', () => {
    expect(CONSTS.FORMAT.hasOwnProperty('EN')).toBeTruthy();
    expect(CONSTS.FORMAT.hasOwnProperty('KO')).toBeTruthy();
  });

  test('LANGS의 언어팩 확인', () => {
    expect(Array.isArray(CONSTS.LANGS)).toBeTruthy();
    expect(CONSTS.LANGS.length > 1).toBeTruthy();
  });

  test('FORMAT_INTERFACE 확인', () => {
    expect(CONSTS.FORMAT.EN.hasOwnProperty('DIGITS')).toBeTruthy();
    expect(CONSTS.FORMAT.KO.TXTS.LONG.MONTHS[0]).toBe('1월');
  });
});