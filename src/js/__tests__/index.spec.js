import * as Ugly from '../index';
import * as CONSTS from '../constants';

describe('index.js 테스트', () => {
  test('sanity 테스트 실행', () => {
    expect(typeof Ugly.init).toBe('function');
  });

  test('매개변수 테스트', () => {
    expect(() => {
      Ugly.ready();
    }).toThrowError();
  });

  test('html element의 유효성을 검증하는 구현부 작성', () => {
    const testElement = document.createElement('div');
    testElement.setAttribute('id', 'target');
    expect(typeof testElement === 'object').toBeTruthy();
    expect(testElement instanceof HTMLElement).toBeTruthy();
  });

  test('첫번째 매개변수가 html element가 아닐 경운 false를 반환한다.', () => {
    function checkElement (element) {
      if (typeof element !== 'object' || !(element instanceof HTMLElement)) {
        throw new Error('Required parameter is not present');
      }
    }
    const testElement1 = { };
    expect(() => {
      checkElement(testElement1);
    }).toThrow(new Error('Required parameter is not present'));
    const testElement2 = document.createElement('div');
    expect(checkElement(testElement2)).toBe(undefined);
  });

  test('format을 확인한다. month와 day 프로퍼티가 있어야 함', () => {
    const testFormat = { };
    expect(typeof testFormat).toBe('object');
    expect(Object.prototype.hasOwnProperty.call(testFormat, 'month')).toBe(false);
    testFormat.month = ['en', 'long'];
    expect(Object.prototype.hasOwnProperty.call(testFormat, 'month')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(testFormat, 'day')).toBe(false);
    testFormat.day = ['ko', 'long'];
    expect(Object.prototype.hasOwnProperty.call(testFormat, 'day')).toBe(true);
  });

  test('format 기능 검사', () => {
    function checkForamt (format) {
      // eslint의 에러를 회피하기 위하여 prototype을 통해 접근한다.
      if (typeof format !== 'object' || !(Object.prototype.hasOwnProperty.call(format, 'month') && Object.prototype.hasOwnProperty.call(format, 'day'))) {
        throw new Error('[format]: Parameter is not valid');
      }
    }
    const testFormat1 = { };
    expect(() => {
      checkForamt(testFormat1);
    }).toThrow(new Error('[format]: Parameter is not valid'));
    const testFormat2 = {
      month: [],
      day: [],
    };
    expect(checkForamt(testFormat2)).toBe(undefined);
  });

  test('dateFormat 조합 구현', () => {
    const testFormat = {
      year: ['en', 'year'],
      month: ['ko', 'long'],
      day: ['ko', 'short'],
    };
    function setFormat (format) {
      let year;
      let monthsArr;
      let daysArr;
      Object.keys(format).forEach((prop) => {
        let lang = '';
        let type = '';
        format[prop].forEach((v, i) => {
          if (i === 0) {
            lang = v.toUpperCase();
          } else {
            type = v.toUpperCase();
          }
        });
        switch (prop) {
          case 'year':
            year = CONSTS.FORMAT[lang] && CONSTS.FORMAT[lang][type];
            break;
          case 'month':
            monthsArr = CONSTS.FORMAT[lang][type].MONTHS;
            break;
          default:
            daysArr = CONSTS.FORMAT[lang][type].DAYS;
            break;
        }
      });
      return {
        year,
        monthsArr,
        daysArr,
      };
    }
    const result = setFormat(testFormat);
    const { year, monthsArr, daysArr } = result;
    expect(year).toBe('Year');
    expect(monthsArr.length).toBe(12);
    expect(monthsArr[3]).toBe('4월');
    expect(daysArr.length).toBe(7);
    expect(daysArr[5]).toBe('금');
    testFormat.year = [];
    const otherResult = setFormat(testFormat);
    const otherYear = otherResult.year;
    expect(otherYear).toBe(undefined);
  });

  test('range 유효성 체크', () => {
    function checkRange (range) {
      if (typeof range !== 'number' || (range <= 0 || range > 24)) {
        throw new Error('[range]: Parameter is not valid');
      }
    }
    expect(() => {
      checkRange(0);
    }).toThrowError(new Error('[range]: Parameter is not valid'));
    expect(checkRange(10)).toBe(undefined);
    expect(() => {
      checkRange(25);
    }).toThrowError(new Error('[range]: Parameter is not valid'));
  });

  test('markedDays 유효성 체크', () => {
    function checkMarkedDays (markedDays) {
      if (!Array.isArray(markedDays) || (markedDays === null || markedDays === undefined)) {
        throw new Error('[markedDays]: Parameter is not valid');
      }
    }
    expect(checkMarkedDays([])).toBe(undefined);
    expect(() => {
      checkMarkedDays();
    }).toThrow(new Error('[markedDays]: Parameter is not valid'));
    expect(() => {
      checkMarkedDays({});
    }).toThrow(new Error('[markedDays]: Parameter is not valid'));
  });

  test('callbackFn 유효성 체크', () => {
    function checkCallbackFn (callbackFn) {
      if (typeof callbackFn !== 'function') {
        throw new Error('[callbackFn]: Parameter is not valid');
      }
    }
    expect(checkCallbackFn(() => {})).toBe(undefined);
    expect(() => {
      checkCallbackFn();
    }).toThrow(new Error('[callbackFn]: Parameter is not valid'));
  });

  test('clock 유효성 체크', () => {
    function checkClock(clock) {
      if (typeof clock !== 'boolean') {
        throw new Error('[clock]: Parameter is not valid');
      }
    }
    expect(() => {
      checkClock('true');
    }).toThrow(new Error('[clock]: Parameter is not valid'));
  });
});
