/*
 * 템플릿을 반환하는 함수를 만들어 여러 템플릿을 선택하여 사용할 수 있도록 확장 가능하게 설계
 */

export function generateDefault(yearNota, year, monthIdx, mArr, dArr) {
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

export function generateFixHeaderTmpl(yearNota, year, monthIdx, mArr) {
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

export function generateFixHeader(element, colWidth, daysArr) {
  const olWidth = colWidth * 7;
  const padding = (element.offsetWidth - olWidth) / 2;
  const html = `
    <ol style="width: ${olWidth}px; height: ${colWidth}px; line-height: ${colWidth}px; padding: 0 ${padding}px;">
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
