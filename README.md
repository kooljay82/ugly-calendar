# UGLY CALENDAR

## Why??

There are so many good and beautiful libraries of datepicker out there. But some of them are just made for specific framework or import some big library to use datepicker. So I decide to make datepicker in JS. It might be not easy and beautiful. But It will be powerful. (I hope...)

I hope it can be 'dev-kit' and 'library' both. It's up to you! If you have to edit lots of things, you can implement this codebase, or you can use files inside 'lib' directory.

## Example

https://codesandbox.io/s/github/kooljay82/ugly-calendar?file=/src/index.html

## How To Install

**Will be updated soon*

## How To Use

```
// Shortly after download this repository, you have to install packages.
npm run install

// When you wanna develop or see example.
npm run start

// When you wanna add some tests and excute your test code.
npm run test

// When you custmoize some codebase and use it directly.
npm run build

```

## Add Your Schedule Or Holidays

**Will be updated soon*

## Write Your Callback Function

index.html

```
<body>
  <div id="target"></div>
  <script>
    const element = document.getElementById('target');
    /* make your own callback function */
    function callbackFn () {
      console.log('실행할 기능을 등록한다. 반환 받을 데이터는 Ugly.DATA를 통해서 접근한다.', Ugly.DATA.START_DATE, Ugly.DATA.END_DATE);
    }
    Ugly.init(element, { callbackFn });
  </script>
</body>
```

You have to name it 'callbackFn'. * It's required!!!

## Custom Style Guide

```
#ugly-container
  ...

  .table-header
    * header of the calendar *

    .header-title
      ...

      .title-month
        * style of month *
      
      .title-year
        * style of year *
  
  .table-body
    ...

    tr
      ...

    th, td
      ...

    th:nth-child(1), th:nth-child(7), td:nth-child(1), td:nth-child(7)
      * font colors of the 'sunday' and 'saturday' *
    
    .disable
      * days of previous today *
    
    .today:after
      * today marker *

    .start-date, .end-date, .selected-dates
      * common colors and background colors *

    .start-date:after, .end-date:after
      ...

    .selected-dates:after
      * style of selected date *
    
    .start-date:after
      * style of start date *

    .end-date:after
      * style of end date *
```

## Consist Of...

Will be updated soon

## License

ISC License

Copyright (c) 2020, kooljay82

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.