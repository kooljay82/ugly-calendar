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
import { generateDefault } from './templates';

function ready(element, format = { month: ['ko', 'long'], day: ['ko', 'long'] }, range = 12, markedDays = [], template = 'default') {
  if (arguments.length < 2) {
    throw new Error('필수 매개변수가 전달되지 않았습니다.');
  }

  if (typeof element !== 'object' || !(element instanceof HTMLElement)) {
    throw new Error('첫번째 매개변수가 형식에 맞지 않습니다.');
  }

  if (typeof format !== 'object' || !(Object.prototype.hasOwnProperty.call(format, 'month') && Object.prototype.hasOwnProperty.call(format, 'day'))) {
    throw new Error('두번째 매개변수가 형식에 맞지 않습니다.');
  }

  if (typeof range !== 'number' || (range <= 0 || range > 24)) {
    throw new Error('세번째 매개변수가 형식에 맞지 않습니다.');
  }

  // 함수 안에서 사용할 플래그 및 변수를 선언한다.
  let monthsArr = []; /* 기본값으로 빈 배열 할당 */
  let daysArr = []; /* 기본값으로 빈 배열 할당 */
  let hasMarked = false; /* 기본값으로 빈 false 할당 */

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

  if (markedDays.length > 0) {
    hasMarked = true;
  }

  // 레이아웃과 관련한 요소 등은 프로토타입에서 최소한의 테스트 코드만 작성
  // 리팩토링 및 코드정리 시 기능별 스플릿팅 후 정리

  const container = document.createElement('div');
  container.setAttribute('id', 'ugly-container');
  element.appendChild(container);

  const TODAY = new Date();

  let currentYear = TODAY.getFullYear();
  let currentMonth = TODAY.getMonth();

  for (let i = 0; i < range; i += 1) {
    const table = document.createElement('div');
    const daysOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const idxFirstDayOfDate = new Date(currentYear, currentMonth).getDay();
    const rows = Math.ceil((daysOfMonth + idxFirstDayOfDate) / 7);
    let templateFn;

    switch (template) {
      case 'default':
        templateFn = generateDefault;
        break;
      default:
        templateFn = generateDefault;
        break;
    }

    table.setAttribute('class', 'container-table');
    table.innerHTML = templateFn(currentYear, currentMonth, monthsArr, daysArr);
    container.appendChild(table);
    for (let j = 0; j < rows; j++) {
      const targetRow = document.querySelector(`.days-of-${currentYear}-${currentMonth}`);
      const row = targetRow.parentNode.insertRow(-1);
      for (let k = 0; k < daysArr.length; k++) {
        const number = j * 7 + k - idxFirstDayOfDate + 1;
        let textNode;
        if (number >= 1 && number <= daysOfMonth) {
          textNode = document.createTextNode(number);
        } else {
          textNode = document.createTextNode('');
        }
        const cell = row.insertCell();
        cell.appendChild(textNode);
      }
    }
    currentMonth++;
    if (currentMonth >= 12) {
      currentMonth = 0;
      currentYear++;
    }
  }

  // eslint 에러로 인해 임시로 값 반환
  return {
    hasMarked,
  };
}

export { ready };
