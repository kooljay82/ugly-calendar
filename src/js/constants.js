export const FORMAT = {
  EN: {
    YEAR: 'Year',
    LONG: {
      MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    SHORT: {
      MONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      DAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    LZ_DIGITS: {
      MONTHS: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      DAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    },
    DIGITS: {
      MONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      DAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    },
  },
  KO: {
    YEAR: '년',
    LONG: {
      MONTHS: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      DAYS: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    },
    SHORT: {
      MONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      DAYS: ['일', '월', '화', '수', '목', '금', '토'],
    },
    LZ_DIGITS: {
      MONTHS: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      DAYS: ['일', '월', '화', '수', '목', '금', '토'],
    },
    DIGITS: {
      MONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      DAYS: ['일', '월', '화', '수', '목', '금', '토'],
    },
  },
};

export const LANGS = ['EN', 'KO']; /* 해당 배열은 2개 이상으로 관리하여 추후 언어가 추가될 때마다 함께 바꿔준다. */
