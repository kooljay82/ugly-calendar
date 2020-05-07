# UGLY CALENDAR (mobile friendly / desktop is not considered)

## Why??

There are so many good and beautiful libraries of 'daterangepicker' out there. But some of them are just made for specific frameworks or import some big libraries to use 'daterangepicker'. So I decide to make 'daterangepicker' with JS. It might be not easy and beautiful. But It will be powerful. (That's my hope...)

I hope it can be 'dev-kit' and 'library' both. It's up to you! If you have to edit lots of things, you can implement this codebase, or you can use files inside 'lib' directory directly

## Example

https://codesandbox.io/s/github/kooljay82/ugly-calendar?file=/src/index.html

## How To Install

**Will be updated soon*

## How To Use

```
// Shortly after download this repository, you have to install packages.
npm install @kooljay82/ugly-calendar

// When you wanna develop or see example.
npm run start

// When you wanna add some tests and excute your test code.
npm run test

// When you custmoize some codebase and use it directly.
// Copy 'lib' directory into your 'some_directory'.
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
    function callbackFn() {
      console.log('You have to add event that will trigger after you chose dates.', Ugly.DATA.START_DATE, Ugly.DATA.END_DATE);
    }
    Ugly.init(element, { callbackFn });
  </script>
</body>
```

You can access START_DATE and END_DATE via Ugly.DATA
*You have to name it 'callbackFn'. (It's required!!!)

or framework such as Vue.js

```
import * as Ugly from '@kooljay82/ugly-calendar'
import '@kooljay82/ugly-calendar/lib/calendar.css'
export default {
  beforeMount() {
    this.$nextTick(() => {
      function callbackFn() {
        console.log('You have to add event that will trigger after you chose dates.', Ugly.DATA.START_DATE, Ugly.DATA.END_DATE);
      }
      Ugly.init(this.$refs['target'], { callbackFn });
    });
  }
}
```

## Option properties

| option | type | required? | default | description |
|--------|------|-----------|---------|-------------|
| element | HTMLElement | yes | none | Target element to append calendar |
| format | Objejct | no | ```{year: ['en', ''], month: ['en', 'short'], day: ['en', 'short'],};``` | Choose language, long, short, lz_digits (leading-zero), digits format |
| range | Number | no | 12 | Can edit range of months |
| markedDays | | | | * currently not supported |
| template | | | | * currently not supported |
| callbackFn | Function | no (but you have to)|console.log('You chose start and end dates.', DATA.START_DATE, DATA.END_DATE); | Event when you choose your start and end dates |

```
  // don't change names of properties!!!
  // options except element are properties of object

  Ugly.init(element, { format, range, markedDays, template, callbackFn });
```

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

**Will be updated soon*

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