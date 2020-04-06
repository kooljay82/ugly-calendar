/*
 * 템플릿을 반환하는 함수를 만들어 여러 템플릿을 선택하여 사용할 수 있도록 확장 가능하게 설계
 */

export function generateDefault(yearNota, year, month, mArr, dArr) {
  let yearString;
  if (yearNota != null) {
    if (yearNota === '년') {
      yearString = `${year} ${yearNota}`;
    } else {
      yearString = `${yearNota} ${year}`;
    }
  } else {
    yearString = year;
  }
  const html = `
    <div class="table-header">
      <h2>${mArr[month]}</h2>
      <small>${yearString}</small>
    </div>
    <table class="table-body">
      <tr class="days-of-${year}-${month}">
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
