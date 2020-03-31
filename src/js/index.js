/*
 * UGLY CALENDAR / 2020.03.25 / 임진호
 * 캘린더를 네임스페이스 패턴을 이용하여 제작
 * 1. element 전달, 이를 통하여 타겟을 설정하여 해당 element 안에 달력을 노출
 * 2. 언어와 포맷 전달
 * 3. 등록한 이벤트와 리턴받을 값,포맷을 전달 / ex) return 받을 형식 -> [yyyy.mm.dd, yyyy.mm.dd]
 * 4. 특정 일자의 배열 전달 / 이는 달력에 마킹될 일자들
 */

// 스타일시트는 stylus 사용 / css 디렉토리 위치
// 추가 스타일시트 필요시 .css 혹은 .styl 확장자 파일을 css 디렉토리에 위치하고 순서에 맞게 import
import '../css/style.styl';
import * as CONSTS from './constants';

function ready(element, format, days = []) {
  if (arguments.length < 2) {
    throw new Error('필수 매개변수가 전달되지 않았습니다.');
  }

  if (typeof element !== 'object' || !(element instanceof HTMLElement)) {
    throw new Error('첫번째 매개변수가 형식에 맞지 않습니다.');
  }

  if (typeof format !== 'object' || !(Object.prototype.hasOwnProperty.call(format, 'month') && Object.prototype.hasOwnProperty.call(format, 'day'))) {
    throw new Error('두번째 매개변수가 형식에 맞지 않습니다.');
  }

  // 함수 안에서 사용할 플래그 및 변수를 선언한다.
  let hasPlan = false; /* 기본값으로 빈 false 할당 */
  let monthsArr = []; /* 기본값으로 빈 배열 할당 */
  let daysArr = []; /* 기본값으로 빈 배열 할당 */

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
      case 'month':
        monthsArr = CONSTS.FORMAT[lang][type].MONTHS;
        break;
      default:
        daysArr = CONSTS.FORMAT[lang][type].DAYS;
        break;
    }
  });

  if (days.length > 0) {
    hasPlan = true;
  }

  // eslint 에러로 인해 임시로 값 반환
  return { hasPlan, monthsArr, daysArr };
}
// eslint-disable-next-line
export { ready };
