import * as Ugly from '../index';

describe('index.js 테스트', () => {
  test('sanity 테스트 실행', () => {
    expect(typeof Ugly.ready).toBe('function');
  });

  test('매개변수 테스트', () => {
    expect(() => {
      Ugly.ready()
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
        return false;
      }
      return true;
    }
    
    const testElement1 = { };
    expect(checkElement(testElement1)).toBe(false);

    const testElement2 = document.createElement('div');
    expect(checkElement(testElement2)).toBe(true);
  });

  test('format을 확인한다. lang과 format 프로퍼티가 있어야 함', () => {
    const testFormat = { };
    expect(typeof testFormat).toBe('object');
    expect(testFormat.hasOwnProperty('lang')).toBe(false);
    testFormat.lang = ''
    expect(testFormat.hasOwnProperty('lang')).toBe(true);
    expect(testFormat.hasOwnProperty('type')).toBe(false);
    testFormat.type = 'digits';
    expect(testFormat.hasOwnProperty('type')).toBe(true);
  });

  test('format 기능 검사', () => {
    function checkForamt (format) {
      // eslint의 에러를 회피하기 위하여 prototype을 통해 접근한다.
      if (typeof format !== 'object' || !(Object.prototype.hasOwnProperty.call(format, 'lang') && Object.prototype.hasOwnProperty.call(format, 'type'))) {
        return false;
      }
      return true;
    }

    const testFormat1 = { };
    expect(checkForamt(testFormat1)).toBe(false);

    const testFormat2 = {
      lang: 'en',
      type: ['txts', '']
    }
  })
})
