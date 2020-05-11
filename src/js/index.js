/*
 * UGLY CALENDAR / 2020.03.25 / 임진호
 * 캘린더를 네임스페이스 패턴을 이용하여 제작
 * 1. element 전달, 이를 통하여 타겟을 설정하여 해당 element 안에 달력을 노출
 * 2. 언어와 포맷 전달
 * 3. 등록한 이벤트와 포맷 등 전달
 * 4. 특정 일자의 배열 전달 / 이는 달력에 마킹될 일자들
 */

// 스타일시트는 stylus 사용 / css 디렉토리 위치
// 추가 스타일시트 필요시 .css 혹은 .styl 확장자 파일을 css 디렉토리에 위치하고 순서에 맞게 import
import '../css/style.styl';
import * as CONSTS from './constants';
import { generateDefault } from './templates';

// 체크한 결과값을 등록할 부분
const DATA = {};

const defaultFormat = {
  year: ['en', ''],
  month: ['en', 'short'],
  day: ['en', 'short'],
};

const defaultRange = 12;

const defaultMarkedDays = [];

const defaultTemplate = 'default';

function defaultCallbackFn() {
  // eslint-disable-next-line
  console.log('You chose start and end dates.', DATA.START_DATE, DATA.END_DATE);
}

function ready(
  /* 매개변수의 기본값을 설정해 놓고 사용 */
  element,
  format = defaultFormat,
  range = defaultRange,
  markedDays = defaultMarkedDays,
  template = defaultTemplate,
  callbackFn = defaultCallbackFn,
) {
  if (arguments.length < 1) {
    throw new Error('Required parameter is not present');
  }

  if (typeof element !== 'object' || !(element instanceof HTMLElement)) {
    throw new Error('[element]: Parameter is not valid');
  }

  if (typeof format !== 'object' || !(Object.prototype.hasOwnProperty.call(format, 'year') && Object.prototype.hasOwnProperty.call(format, 'month') && Object.prototype.hasOwnProperty.call(format, 'day'))) {
    throw new Error('[format]: Parameter is not valid');
  }

  if (typeof range !== 'number' || (range <= 0 || range > 24)) {
    throw new Error('[range]: Parameter is not valid');
  }

  if (!Array.isArray(markedDays) || (markedDays === null || markedDays === undefined)) {
    throw new Error('[markedDays]: Parameter is not valid');
  }

  if (typeof callbackFn !== 'function') {
    throw new Error('[callbackFn]: Parameter is not valid');
  }

  // 함수 안에서 사용할 플래그 및 변수를 선언한다.
  let yearNotation = ''; /* 기본값으로 빈 문자열 할당 */
  let monthsArr = []; /* 기본값으로 빈 배열 할당 */
  let daysArr = []; /* 기본값으로 빈 배열 할당 */
  let hasMarked = false; /* 기본값으로 false 할당 */

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
        yearNotation = CONSTS.FORMAT[lang] && CONSTS.FORMAT[lang][type];
        break;
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
  const width = container.offsetWidth > 720 ? 720 : container.offsetWidth;
  const colWidth = Math.floor(width / 7);

  const TODAY = new Date();

  let currentYear = TODAY.getFullYear();
  let currentMonthIdx = TODAY.getMonth();

  for (let i = 0; i < range; i += 1) {
    const table = document.createElement('div');
    const daysOfMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();
    const idxFirstDayOfDate = new Date(currentYear, currentMonthIdx).getDay();
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
    table.style.cssText = `width: ${colWidth * 7}px;`;
    table.innerHTML = templateFn(yearNotation, currentYear, currentMonthIdx, monthsArr, daysArr);
    container.appendChild(table);
    for (let j = 0; j < rows; j++) {
      const targetRow = document.querySelector(`.days-of-${currentYear}-${currentMonthIdx + 1}`);
      const row = targetRow.parentNode.insertRow(-1);
      row.style.cssText = `width: ${colWidth * 7}px; height: ${colWidth}px;`;
      for (let k = 0; k < daysArr.length; k++) {
        const number = j * 7 + k - idxFirstDayOfDate + 1;
        const cell = row.insertCell();
        cell.style.cssText = `width: ${colWidth}px; height: ${colWidth}px;`;
        let textNode;
        if (number >= 1 && number <= daysOfMonth) {
          textNode = document.createTextNode(number);
          if (i === 0) {
            // iOS에서 지원되는 형식(ISO-8601)으로 바꿔서 오늘 날짜를 특정한다.
            const dateStr = `${TODAY.getFullYear()}-${TODAY.getMonth() + 1}-${TODAY.getDate()} 00:00:00`;
            const splitStr = dateStr.split(/[- :]/);
            const todayObj = new Date(
              splitStr[0],
              splitStr[1] - 1,
              splitStr[2],
              splitStr[3],
              splitStr[4],
              splitStr[5],
            );
            const currentDayObj = new Date(currentYear, currentMonthIdx, number);
            if (hasMarked) {
              // 마킹해야할 날짜를 여기서 구분하여 disable을 추가하고 별도의 클래스를 입힌다.
            }
            if (todayObj.getTime() > currentDayObj.getTime()) {
              cell.classList.add('disable');
            }
            if (todayObj.getTime() === currentDayObj.getTime()) {
              cell.classList.add('today');
            }
          }
          cell.dataset.year = currentYear;
          cell.dataset.month = currentMonthIdx < 9 ? `0${currentMonthIdx + 1}` : currentMonthIdx + 1;
          cell.dataset.date = number < 10 ? `0${number}` : number;
        } else {
          textNode = document.createTextNode('');
        }
        cell.appendChild(textNode);
      }
    }
    currentMonthIdx++;
    if (currentMonthIdx >= 12) {
      currentMonthIdx = 0;
      currentYear++;
    }
  }

  Object.defineProperties(DATA, {
    START_DATE: {
      get() {
        return this.$start;
      },
      set(val) {
        this.$start = val;
      },
    },
    END_DATE: {
      get() {
        return this.$end;
      },
      set(val) {
        this.$end = val;
        if (val.length !== 0) {
          callbackFn();
        }
      },
    },
  });

  let isChecked = false;

  container.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'td' && !(e.target.classList.contains('disable')) && 'year' in e.target.dataset) {
      const data = e.target.dataset;
      if (!isChecked) {
        const endDate = document.querySelector('.end-date');
        if (endDate != null) {
          const prevStart = document.querySelector('.start-date');
          prevStart.classList.remove('start-date');
          endDate.classList.remove('end-date');
          const prevSelctedDates = document.querySelectorAll('.selected-dates');
          prevSelctedDates.forEach((el) => {
            el.classList.remove('selected-dates');
          });
        }
        const startDate = e.target;
        startDate.classList.add('start-date');
        DATA.START_DATE = [data.year, data.month, data.date];
        DATA.END_DATE = [];
        isChecked = !isChecked;
      } else {
        const startDateTime = new Date(
          DATA.START_DATE[0],
          DATA.START_DATE[1] - 1,
          DATA.START_DATE[2],
        ).getTime();
        const endDateTime = new Date(data.year, data.month - 1, data.date).getTime();
        if (endDateTime - startDateTime <= 0) return false;
        const endDate = e.target;
        endDate.classList.add('end-date');
        DATA.END_DATE = [data.year, data.month, data.date];
        const days = (endDateTime - startDateTime) / (1000 * 3600 * 24);
        isChecked = !isChecked;
        let selectedYear = DATA.START_DATE[0];
        let selectedMonth = DATA.START_DATE[1];
        let selectedDate = DATA.START_DATE[2];
        for (let i = 0; i <= days; i++) {
          const el = document.querySelector(`[data-year="${selectedYear}"][data-month="${selectedMonth}"][data-date="${selectedDate}"]`);
          el.classList.add('selected-dates');
          const nextDate = new Date(
            selectedYear,
            Number(selectedMonth) - 1,
            Number(selectedDate) + 1,
          );
          selectedYear = String(nextDate.getFullYear());
          selectedMonth = nextDate.getMonth() + 1 > 9 ? String(nextDate.getMonth() + 1) : `0${nextDate.getMonth() + 1}`;
          selectedDate = nextDate.getDate() > 9 ? String(nextDate.getDate()) : `0${nextDate.getDate()}`;
        }
      }
      return true;
    }
    return false;
  });
}

function init(element, {
  format = defaultFormat,
  range = defaultRange,
  markedDays = defaultMarkedDays,
  template = defaultTemplate,
  callbackFn = defaultCallbackFn,
} = { }) {
  return ready(element, format, range, markedDays, template, callbackFn);
}

export {
  DATA, init,
};
