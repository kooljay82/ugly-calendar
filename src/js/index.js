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

const language = CONSTS.LANGS[0];

function ready(element, format, days = []) {
  if (arguments.length < 2) {
    throw new Error('매개변수가 전달되지 않았습니다.');
  }

  if (typeof element !== 'object' || !(element instanceof HTMLElement)) {
    throw new Error('첫번째 매개변수가 형식에 맞지 않습니다.');
  }

  if (typeof format !== 'object' || !(Object.prototype.hasOwnProperty.call(format, 'lang') && Object.prototype.hasOwnProperty.call(format, 'type'))) {
    throw new Error('두번째 매개변수가 형식에 맞지 않습니다.');
  }

}
// eslint-disable-next-line
export { ready };
