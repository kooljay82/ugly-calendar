/*
 * 템플릿을 반환하는 함수를 만들어 여러 템플릿을 선택하여 사용할 수 있도록 확장 가능하게 설계
 */

/**
 * generateDefault
 * @function generateDefault
 * @param { String } yearNota - 연도 표기법
 * @param { Number } year - 실제 연도
 * @param { Number } monthIdx - 월의 인덱스
 * @param { Array } mArr - 표기법에 맞춘 달의 문자열 배열
 * @param { Array } dArr - 표기법에 맞춘 요일의 문자열 배열
 * @returns { String } - HTMLElement를 담은 문자열 리터럴
 */

export function generateDefault (yearNota, year, monthIdx, mArr, dArr) {
  let yearString;
  if (yearNota != null) {
    if (yearNota === '년') {
      yearString = `${year}${yearNota}`;
    } else {
      yearString = `${yearNota} ${year}`;
    }
  } else {
    yearString = year;
  }
  const html = `
    <div class="table-header">
      <h2 class="header-title">
        <span class="title-month">${mArr[monthIdx]}</span>
        <span class="title-year">${yearString}</span>
      </h2>
    </div>
    <table class="table-body">
      <tr class="days-of-${year}-${monthIdx + 1}">
        <th>${dArr[0]}</th>
        <th>${dArr[1]}</th>
        <th>${dArr[2]}</th>
        <th>${dArr[3]}</th>
        <th>${dArr[4]}</th>
        <th>${dArr[5]}</th>
        <th>${dArr[6]}</th>
      </tr>
    </table>
  `;
  return html;
}

export function generateFixHeader (colWidth, daysArr) {
  const olWidth = colWidth * 7;
  const html = `
    <ol style="width: ${olWidth}px; height: ${colWidth}px; line-height: ${colWidth}px;">
      <li style="width: ${colWidth}px; height: ${colWidth}px;">${daysArr[0]}</li>
      <li style="width: ${colWidth}px; height: ${colWidth}px;">${daysArr[1]}</li>
      <li style="width: ${colWidth}px; height: ${colWidth}px;">${daysArr[2]}</li>
      <li style="width: ${colWidth}px; height: ${colWidth}px;">${daysArr[3]}</li>
      <li style="width: ${colWidth}px; height: ${colWidth}px;">${daysArr[4]}</li>
      <li style="width: ${colWidth}px; height: ${colWidth}px;">${daysArr[5]}</li>
      <li style="width: ${colWidth}px; height: ${colWidth}px;">${daysArr[6]}</li>
    <ol>
  `;
  return html;
}

export function generateFixHeaderTmpl (yearNota, year, monthIdx, mArr) {
  let yearString;
  if (yearNota != null) {
    if (yearNota === '년') {
      yearString = `${year}${yearNota}`;
    } else {
      yearString = `${yearNota} ${year}`;
    }
  } else {
    yearString = year;
  }
  const html = `
    <div class="table-header">
      <h2 class="header-title">${yearString}.${mArr[monthIdx]}</h2>
    </div>
    <table class="table-body">
      <tr class="days-of-${year}-${monthIdx + 1}"></tr>
    </table>
  `;
  return html;
}

export function generateClock () {
  function passLZ (num) {
    return num > 9 ? `${String(num)}` : `0${num}`;
  }
  function listIterator (max) {
    let htmlStr = '';
    for (let i = 0; i < max; i++) {
      htmlStr = `${htmlStr}<li data-${max === 24 ? 'hour' : 'min'}-list="${passLZ(i)}">${passLZ(i)}</li>`;
    }
    return htmlStr;
  }
  const html = `
    <div class="clock-hour">
      <ol>${listIterator(24)}</ol>
    </div>
    <div class="clock-min">
      <ol>${listIterator(60)}</ol>
    </div>
  `;
  return html;
}
