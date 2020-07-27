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
import {
  generateDefault, generateFixHeader, generateFixHeaderTmpl, generateClock
} from './templates';

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
const defaultClock = false;
const defaultNoToday = false;

function defaultCallbackFn () {
  // eslint-disable-next-line
  console.log('You chose start and end dates.', DATA.START_DATE, DATA.END_DATE);
}

function ready (
  /* 매개변수의 기본값을 설정해 놓고 사용 */
  element,
  format = defaultFormat,
  range = defaultRange,
  markedDays = defaultMarkedDays,
  template = defaultTemplate,
  callbackFn = defaultCallbackFn,
  clock = defaultClock,
  noToday = defaultNoToday
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

  if (typeof clock !== 'boolean') {
    throw new Error('[clock]: Parameter is not valid');
  }

  if (typeof noToday !== 'boolean') {
    throw new Error('[noToday]: Parameter is not valid');
  }

  const container = document.createElement('div');
  let yearNotation = '';
  let monthsArr = [];
  let daysArr = [];
  let hasMarked = false;
  let width = 0;
  let colWidth = 0;
  // 만약 주워진 element가 input일 경우 wrapper에 달력을 담는다.
  let wrapper = null;

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

  container.setAttribute('id', 'ugly-container');
  if (element.tagName.toLowerCase() === 'input') {
    wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'ugly-wrapper');
    wrapper.appendChild(container);
    const top = element.offsetTop + element.offsetHeight;
    const left = element.offsetLeft;
    wrapper.style.cssText = `
      width: ${element.clientWidth}px;
      height: ${element.clientWidth}px;
      background: #fff;
      overflow: auto;
      position: absolute;
      top: ${top + 7}px;
      left: ${left}px;
      border: 1px solid #ddd;
      border-radius: 5px;
      visibility: hidden;
    `;
    document.body.appendChild(wrapper);
  } else {
    element.appendChild(container);
  }
  width = container.offsetWidth > 720 ? 720 : container.offsetWidth;
  colWidth = Math.floor(width / 7);

  if (template === 'fix-header') {
    const fixHeader = document.createElement('div');
    const htmlStr = generateFixHeader(colWidth, daysArr);

    fixHeader.innerHTML = htmlStr;
    fixHeader.setAttribute('class', 'fix-header-days');
    fixHeader.style.cssText = `height: ${colWidth}px;`;
    container.parentNode.prepend(fixHeader);
  }

  // 특정한 날자를 렌더링하기 위해서는 아래의 TODAY 상수를 수정 및 특정한다.
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
      case 'fix-header':
        templateFn = generateFixHeaderTmpl;
        container.classList.add('fix-header');
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
        let textNode;

        cell.style.cssText = `width: ${colWidth}px; height: ${colWidth}px;`;
        if (number >= 1 && number <= daysOfMonth) {
          textNode = document.createTextNode(number);
          if (i === 0) {
            // iOS에서 지원되는 형식(ISO-8601)으로 바꿔서 오늘 날짜를 특정한다.
            const dateStr = `${TODAY.getFullYear()}-${TODAY.getMonth()}-${TODAY.getDate()} 00:00:00`;
            const splitStr = dateStr.split(/[- :]/);
            const todayObj = new Date(
              splitStr[0],
              splitStr[1],
              splitStr[2],
              splitStr[3],
              splitStr[4],
              splitStr[5]
            );
            const currentDayObj = new Date(currentYear, currentMonthIdx, number);
            if (hasMarked) {
              // 마킹해야할 날짜를 여기서 구분하여 disable을 추가하고 별도의 클래스를 입힌다.
            }
            if (!noToday) {
              if (todayObj.getTime() > currentDayObj.getTime()) {
                cell.classList.add('disable');
              }
              if (todayObj.getTime() === currentDayObj.getTime()) {
                cell.classList.add('today');
              }
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

  let showClock;
  if (clock) {
    showClock = () => {
      const { clientHeight } = wrapper === null ? element : wrapper;
      const clockContainer = document.createElement('div');
      clockContainer.setAttribute('class', 'table-clock');
      clockContainer.style.cssText = `
        width: ${width + 30}px;
        height: ${clientHeight}px;
        left: -15px;
        right: 0;
        z-index: 11;
      `;
      const clockHtmlStr = generateClock();
      clockContainer.innerHTML = clockHtmlStr;
      if (element.tagName.toLowerCase() === 'input') {
        wrapper.prepend(clockContainer);
        wrapper.classList.add('scroll-freezing');
      } else {
        element.prepend(clockContainer);
        element.classList.add('scroll-freezing');
      }

      const tableClock = document.querySelector('.table-clock');
      tableClock.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'li') {
          const ol = e.target.parentNode;
          ol.childNodes.forEach((el) => {
            el.classList.remove('select');
          });
          e.target.classList.add('select');
          const selList = tableClock.querySelectorAll('.select');
          if (clock && DATA.START_TIME.length === 0) {
            if (selList.length > 1) {
              DATA.START_TIME = [selList[0].dataset.hourList, selList[1].dataset.minList];
              setTimeout(() => {
                if (wrapper !== null) {
                  wrapper.classList.remove('scroll-freezing');
                } else {
                  element.classList.remove('scroll-freezing');
                }
                tableClock.remove();
              }, 250);
            }
          } else if (selList.length > 1) {
            const startDateStr = `${DATA.START_DATE[0]}-${DATA.START_DATE[1] - 1}-${DATA.START_DATE[2]} ${DATA.START_TIME[0]}:${DATA.START_TIME[1]}:00`;
            const startDate = new Date(...startDateStr.split(/[- :]/));
            const endDateStr = `${DATA.END_DATE[0]}-${DATA.END_DATE[1] - 1}-${DATA.END_DATE[2]} ${selList[0].dataset.hourList}:${selList[1].dataset.minList}:00`;
            const endDate = new Date(...endDateStr.split(/[- :]/));
            if (startDate.getTime() < endDate.getTime()) {
              DATA.END_TIME = [selList[0].dataset.hourList, selList[1].dataset.minList];
              setTimeout(() => {
                if (wrapper !== null) {
                  wrapper.classList.remove('scroll-freezing');
                } else {
                  element.classList.remove('scroll-freezing');
                }
                tableClock.remove();
              }, 250);
            } else {
              ol.childNodes.forEach((el) => {
                el.classList.remove('select');
              });
              // eslint-disable-next-line
              window.alert('종료시각이 시작시각과 같거나 앞서 있습니다.');
            }
          }
        }
        return false;
      });
    };

    element.addEventListener('click', () => {
      if (wrapper.style.visibility === 'hidden') {
        setTimeout(() => {
          wrapper.style.visibility = 'visible';
        });
      }
    });

    window.addEventListener('click', (e) => {
      let flag = false;
      const path = [...e.path];
      if (wrapper.style.visibility === 'hidden') {
        path.some((el) => {
          if (el === element) {
            wrapper.style.visibility = 'visible';
            flag = true;
          }
          return flag === true;
        });
      } else if (wrapper.style.visibility === 'visible') {
        if (e.target === element) return;
        if (DATA.START_DATE === undefined) {
          path.forEach((el) => {
            if (el === wrapper) {
              flag = true;
            }
          });
          if (flag === false) {
            wrapper.style.visibility = 'hidden';
          }
        } else if (DATA.START_DATE.length > 2 && DATA.END_DATE.length > 2) {
          if (DATA.START_TIME.length > 1 && DATA.END_TIME.length > 1) {
            wrapper.style.visibility = 'hidden';
          }
        }
      }
    });
  }

  Object.defineProperties(DATA, {
    DAYS: {
      get () {
        return this.$days;
      },
      set (val) {
        this.$days = val;
      },
    },
    START_DATE: {
      get () {
        return this.$start;
      },
      set (val) {
        this.$start = val;
        if (clock) {
          DATA.START_TIME = [];
          DATA.END_TIME = [];
          showClock();
        }
      },
    },
    END_DATE: {
      get () {
        return this.$end;
      },
      set (val) {
        this.$end = val;
        if (val.length > 0) {
          if (clock) {
            showClock();
          }
          callbackFn();
        }
      },
    },
  });

  if (clock) {
    Object.defineProperties(DATA, {
      START_TIME: {
        get () {
          return this.$start_time;
        },
        set (val) {
          this.$start_time = val;
          if (element.tagName.toLowerCase() === 'input' && val.length > 0) {
            const input = element;
            input.value = `${this.$start[0]}-${this.$start[1]}-${this.$start[2]} ${this.$start_time[0]}:${this.$start_time[1]}`;
          }
        },
      },
      END_TIME: {
        get () {
          return this.$end_time;
        },
        set (val) {
          this.$end_time = val;
          if (element.tagName.toLowerCase() === 'input' && this.$start_time.length > 1) {
            const input = element;
            input.value = `${input.value} ~ ${this.$end[0]}-${this.$end[1]}-${this.$end[2]} ${this.$end_time[0]}:${this.$end_time[1]}`;
            if (wrapper.style.visibility === 'visible') {
              wrapper.style.visibility = 'hidden';
            }
          }
        },
      },
    });
  }

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
          DATA.START_DATE[2]
        ).getTime();
        const endDateTime = new Date(data.year, data.month - 1, data.date).getTime();
        if (!clock) {
          if (endDateTime - startDateTime < 0) return false;
        } else if (endDateTime - startDateTime < 0) return false;
        const endDate = e.target;
        const days = (endDateTime - startDateTime) / (1000 * 3600 * 24);
        let selectedYear = DATA.START_DATE[0];
        let selectedMonth = DATA.START_DATE[1];
        let selectedDate = DATA.START_DATE[2];

        endDate.classList.add('end-date');
        DATA.END_DATE = [data.year, data.month, data.date];
        DATA.DAYS = days + 1;

        isChecked = !isChecked;
        for (let i = 0; i <= days; i++) {
          const el = document.querySelector(`[data-year="${selectedYear}"][data-month="${selectedMonth}"][data-date="${selectedDate}"]`);
          el.classList.add('selected-dates');

          const nextDate = new Date(
            selectedYear,
            Number(selectedMonth) - 1,
            Number(selectedDate) + 1
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

function init (element, {
  format = defaultFormat,
  range = defaultRange,
  markedDays = defaultMarkedDays,
  template = defaultTemplate,
  callbackFn = defaultCallbackFn,
  clock = defaultClock,
  noToday = defaultNoToday,
} = { }) {
  return ready(element, format, range, markedDays, template, callbackFn, clock, noToday);
}

export {
  DATA, init
};
