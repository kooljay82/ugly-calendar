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

  test('FORMAT 하위 프로퍼티 확인', () => {
    expect(CONSTS.FORMAT.EN.YEAR).toBe('Year');
    expect(CONSTS.FORMAT.KO.LONG.MONTHS[1]).toBe('2월');
  });
});