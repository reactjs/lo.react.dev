---
title: JavaScript ໃນ JSX ດ້ວຍວົງປີກກາ
---

<Intro>

JSX ໃຫ້ທ່ານຂຽນ markup ຄ້າຍ HTML ພາຍໃນຟາຍ JavaScript, ເຮັດໃຫ້ logic ການສະແດງຜົນ ແລະ ເນື້ອຫາຢູ່ໃນບ່ອນດຽວກັນ. ບາງເທື່ອທ່ານອາດຈະຕ້ອງການເພີ່ມ logic JavaScript ໜ້ອຍໜຶ່ງ ຫຼື ອ້າງອີງ dynamic property ພາຍໃນ markup ນັ້ນ. ໃນສະຖານະການນີ້, ທ່ານສາມາດໃຊ້ວົງປີກກາໃນ JSX ຂອງທ່ານເພື່ອເປີດໜ້າຕ່າງໄປຍັງ JavaScript.

</Intro>

<YouWillLearn>

* ວິທີສົ່ງ string ດ້ວຍວົງຢືມ
* ວິທີອ້າງອີງຕົວແປ JavaScript ພາຍໃນ JSX ດ້ວຍວົງປີກກາ
* ວິທີເອີ້ນຟັງຊັ່ນ JavaScripot ພາຍໃນ JSX ດ້ວຍວົງປີກກາ
* ວີທີໃຊ້ object JavaScript ພາຍໃນ JSX ດ້ວຍວົງປີກກາ

</YouWillLearn>

##  ສົ່ງ string ດ້ວຍວົງຢືມ {/*passing-strings-with-quotes*/}

ເມື່ອທ່ານຕ້ອງການສົ່ງ attribute string ໄປຍັງ JSX, ໃຫ້ໃສ່ເຄື່ອງໝາຍຂີດດຽວ ຫຼື ວົງຢືມ:

<Sandpack>

```js
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

```css
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

ນີ້, `"https://i.imgur.com/7vQD0fPs.jpg"` ແລະ `"Gregorio Y. Zara"` ແມ່ນຖືກສົ່ງຜ່ານເປັນ string.

ແຕ່ຖ້າທ່ານຕ້ອງການລະບຸຂໍ້ຄວາມ `src` ຫຼື `alt` ແບບ dynamic ເດ? ທ່ານສາມາດ **ໃຊ້ຄ່າຈາກ JavaScript ໂດຍແທນທີ່ `"` ແລະ `"` ດ້ວຍ `{` ແລະ `}`**

<Sandpack>

```js
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

```css
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

ສັງເກດຄວາມແຕກຕ່າງລະຫວ່າງ `className="avatar"`, ເຊິ່ງກຳນົດ class CSS `"avatar"` ທີ່ເຮັດໃຫ້ຮູບພາບມົນ, ແລະ `src={avatar}` ທີ່ອ່ານຄ່າຂອງຕົວແປ JavaScript ເອີ້ນວ່າ `avatar`. ນັ້ນເພາະວ່າວົງປີກກາເຮັດໃຫ້ທ່ານສາມາດເຮັດວຽກກັບ JavaScript ໃນ markup ຂອງທ່ານໄດ້!

## ການນຳໃຊ້ວົງປີກກາ: ໜ້າຕ່າງສູ່ໂລກຂອງ JavaScript {/*using-curly-braces-a-window-into-the-javascript-world*/}

JSX ແມ່ນວິທີການພິເສດໃນການຂຽນ JavaScript. ໝາຍຄວາມວ່າສາມາດໃຊ້ JavaScript ພາຍໃນໄດ້-ດ້ວຍວົງປີກກາ `{ }`. ຕົວຢ່າງດ້ານລຸ່ມທຳອິດແມ່ນປະກາດຊື່ສຳລັບນັກວິທະຍາສາດ, `name`, ຈາກນັ້ນ embed ມັນດ້ວຍວົງປີກກາພາຍໃນ `<h1>`:

<Sandpack>

```js
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>To Do List ຂອງ {name} </h1>
  );
}
```

</Sandpack>

ລອງປ່ຽນຄ່າ `name` ຈາກ `'Gregorio Y. Zara'` ເປັນ `'Hedy Lamarr'`. ເບິ່ງວ່າລາຍການປ່ຽນແປງແນວໃດ?

Expression JavaScript ໃດໆຈະເຮັດວຽກລະຫວ່າງວົງປີກກາ, ລວມເຖິງການໃຊ້ຟັງຊັ່ນເຊັ່ນ `formatDate()`:

<Sandpack>

```js
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List ສຳລັບ {formatDate(today)}</h1>
  );
}
```

</Sandpack>

### ບ່ອນໃຊ້ວົງປີກກາ {/*where-to-use-curly-braces*/}

ທ່ານສາມາດໃຊ້ວົງປີກກາດ້ວຍ 2 ວິທີພາຍໃນ JSX ເທົ່ານັ້ນ:

1. **ເປັນຂໍ້ຄວາມ** ໂດຍກົງພາຍໃນແທັກ JSX: `<h1>To Do List ຂອງ {name}</h1>` ເຮັດວຽກ, ແຕ່ `<{tag}>To Do List ຂອງ Gregorio Y. Zara </{tag}>` ບໍ່ເຮັດວຽກ.
2. **ເປັນ attributes** ຕໍ່ທ້າຍດ້ວຍເຄື່ອງໝາຍ `=`: `src={avatar}` ຈະອ່ານຕົວແປ `avatar`, ແຕ່ `src="{avatar}"` ຈະສົ່ງ string `"{avatar}"`.

## ການໃຊ້ "ວົງປີກກາຄູ່": CSS ແລະ object ອື່ນໃນ JSX {/*using-double-curlies-css-and-other-objects-in-jsx*/}

ນອກຈາກ string, number ແລະ expression JavaScript ອື່ນແລ້ວ, ທ່ານສາມາດສົ່ງ object ໃນ JSX. Object ສະແດງດ້ວຍວົງປີກກາເຊັ່ນ `{ name: "Hedy Lamarr", inventions: 5 }`. ດັ່ງນັ້ນ, ເພື່ອສົ່ງ Object JS ໃນ JSX, ທ່ານຕ້ອງໄດ້ລວມ object ໃນດ້ວຍວົງປີກກາອື່ນ: `person={{ name: "Hedy Lamarr", inventions: 5 }}`.

ທ່ານອາດເຫັນສິ່ງນີ້ດ້ວຍ inline CSS style ໃນ JSX. React ບໍ່ຕ້ອງການໃຫ້ທ່ານໃຊ້ inline style (class CSS ເຮັດວຽກໄດ້ດີກັບກໍລະນີສ່ວນຫຼາຍ). ແຕ່ເມື່ອທ່ານຕ້ອງການ inline style, ທ່ານສົ່ງ object ໄປຫາ attribute `style`:

<Sandpack>

```js
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>ປັບປຸງວີດີໂອໂຟນ</li>
      <li>ກຽມບັນຍາຍການບິນ</li>
      <li>ເຮັດວຽກນຳເຄື່ອງຈັກທີ່ໃຊ້ alcohol ເປັນເຊື້ອໄຟ</li>
    </ul>
  );
}
```

```css
body { padding: 0; margin: 0 }
ul { padding: 20px 20px 20px 40px; margin: 0; }
```

</Sandpack>

ລອງປ່ຽນແປງຄ່າ `backgroundColor` ແລະ `color`.

ທ່ານສາມາດເຫັນ object JavaScript ພາຍໃນວົງປີກກາເມື່ອທ່ານຂຽນມັນປະມານນີ້:

```js {2-5}
<ul style={
  {
    backgroundColor: 'black',
    color: 'pink'
  }
}>
```

ຄັ້ງຕໍ່ໄປທ່ານຈະເຫັນ `{{` ແລະ `}}` ໃນ JSX, ຮູ້ວ່າມັນບໍ່ມີຫຍັງຫຼາຍໄປກວ່າ object ພາຍໃນວົງປີກກາ JSX!

<Pitfall>

Inline `style` properties ແມ່ນຖືກຂຽນແບບ camelCase. ຕົວຢ່າງ, HTML `<ul style="background-color: black">` ຄວນຖືກຂຽນເປັນ `<ul style={{ backgroundColor: 'black' }}>`  ໃນ component ຂອງທ່ານ.

</Pitfall>

## ມ່ວນຂື້ນຕື່ມດ້ວຍ object JavaScript ແລະ ວົງປີກກາ {/*more-fun-with-javascript-objects-and-curly-braces*/}

ທ່ານສາມາດຍ້າຍຫຼາຍ expression ໄປໄວ້ໃນໜຶ່ງ object, ແລະ reference ໃນ JSX ພາຍໃນວົງປີກກາ:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Todos ຂອງ {person.name}</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>ປັບປຸງວີດີໂອໂຟນ</li>
        <li>ກຽມບັນຍາຍການບິນ</li>
        <li>ເຮັດວຽກນຳເຄື່ອງຈັກທີ່ໃຊ້ alcohol ເປັນເຊື້ອໄຟ</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

ໃນຕົວຢ່າງນີ້, object JavaScript `person` ປະກອບມີ string `name` ແລະ object `theme`:

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
```

Component ສາມາດໃຊ້ຄ່າເຫຼົ່ານີ້ຈາກ `person` ເຊັ່ນ:

```js
<div style={person.theme}>
  <h1>Todos ຂອງ {person.name}</h1>
```

JSX ເປັນພາສາ template ທີ່ນ້ອຍຫຼາຍເພາະວ່າມັນຊ່ວຍໃຫ້ທ່ານຈັດລະບຽບຂໍ້ມູນ ແລະ logic ໂດຍໃຊ້ JavaScript.

<Recap>

ຕອນນີ້ທ່ານຮູ້ເກືອບໝົດທຸກຢ່າງກ່ຽວກັບ JSX ແລ້ວ: 

* attribute JSX ພາຍໃນວົງຢືມແມ່ນຖືກສົ່ງຜ່ານເປັນ string.
* ວົງປີກກາຊ່ວຍໃຫ້ທ່ານນຳ logic JavaScript ແລະ ຕົວແປໃສ່ໃນ markup ຂອງທ່ານ.
* ເຮັດວຽກໃນເນື້ອຫາແທັກ JSX ຫຼື ເຮັດວຽກທັນທີຫຼັງຈາກ `=` ໃນ attribute.
* `{{` ແລະ `}}` ບໍ່ແມ່ນ special syntax: ມັນເປັນ object JavaScript ທີ່ເຊື່ອງຢູ່ໃນວົງປີກກາ JSX.

</Recap>

<Challenges>

#### ແກ້ໄຂຂໍ້ຜິດພາດ {/*fix-the-mistake*/}

Code ນີ້ມັນພັງດ້ວຍຂໍ້ຜິດພາດ ແລະ ເວົ້າວ່າ  `Objects are not valid as a React child`: 

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Todos ຂອງ {person}</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>ປັບປຸງວີດີໂອໂຟນ</li>
        <li>ກຽມບັນຍາຍການບິນ</li>
        <li>ເຮັດວຽກນຳເຄື່ອງຈັກທີ່ໃຊ້ alcohol ເປັນເຊື້ອໄຟ</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

ທ່ານພົບບັນຫາບໍ່?

<Hint>ເບິ່ງວ່າມີຫຍັງພາຍໃນວົງປີກກາ. ພວກເຮົາວາງສິ່ງທີ່ຖືກຕ້ອງໃນນັ້ນແລ້ວບໍ່?</Hint>

<Solution>

ນີ້ເກີດຂຶ້ນເພາະວ່າຕົວຢ່າງນີ້ສະແດງຜົນ *object ເອງ* ລົງໃນ markup ແທນທີ່ຈະເປັນ string: `<h1>Todos ຂອງ {person}</h1>` ກຳລັງພະຍາຍາມສະແດງ object `person` ທັງໝົດ! ລວມທັງ object ດິບເນື່ອງຈາກເນື້ອຫາຂໍ້ຄວາມເຮັດໃຫ້ເກີດຂໍ້ຜິດພາດເນື່ອງຈາກ React ບໍ່ຮູ້ວ່າທ່ານຕ້ອງການສະແດງແນວໃດ.

ເພື່ອແປງມັນ, ແທນທີ `<h1>Todos ຂອງ {person}</h1>` ດ້ວຍ `<h1>Todos ຂອງ {person.name}</h1>`:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Todos ຂອງ {person.name}</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>ປັບປຸງວີດີໂອໂຟນ</li>
        <li>ກຽມບັນຍາຍການບິນ</li>
        <li>ເຮັດວຽກນຳເຄື່ອງຈັກທີ່ໃຊ້ alcohol ເປັນເຊື້ອໄຟ</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

</Solution>

#### ແຍກຂໍ້ມູນລົງໃນ object {/*extract-information-into-an-object*/}

ແຍກ image URL ລົງໃນ object `person`. 

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Todos ຂອງ {person.name}</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>ປັບປຸງວີດີໂອໂຟນ</li>
        <li>ກຽມບັນຍາຍການບິນ</li>
        <li>ເຮັດວຽກນຳເຄື່ອງຈັກທີ່ໃຊ້ alcohol ເປັນເຊື້ອໄຟ</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

<Solution>

ຍ້າຍ image URL ລົງໃນ property ເອີ້ນວ່າ `person.imageUrl` ແລະ ອ່ານມັນຈາກແທັກ `<img>` ໃຊ້ວົງປີກກາ:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  imageUrl: "https://i.imgur.com/7vQD0fPs.jpg",
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Todos ຂອງ {person.name}</h1>
      <img
        className="avatar"
        src={person.imageUrl}
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>ປັບປຸງວີດີໂອໂຟນ</li>
        <li>ກຽມບັນຍາຍການບິນ</li>
        <li>ເຮັດວຽກນຳເຄື່ອງຈັກທີ່ໃຊ້ alcohol ເປັນເຊື້ອໄຟ</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

</Solution>

#### ຂຽນ expression ພາຍໃນວົງເລັບ JSX {/*write-an-expression-inside-jsx-curly-braces*/}

ໃນ object ດ້ານລຸ່ມ, Image URL ເຕັມແມ່ນແຍກເປັນສີ່ສ່ວນ: base URL, `imageId`, `imageSize` ແລະ ຟາຍ extension.

ພວກເຮົາຕ້ອງການ image URL ເພື່ອປະສົມກັບ attribute ເຫຼົ່ານີ້ເຂົ້ານຳກັນ: base URL (ເປັນ `'https://i.imgur.com/'` ສະເໝີ), `imageId` (`'7vQD0fP'`), `imageSize` (`'s'`), ແລະ ຟາຍ  extension (ເປັນ `'.jpg'` ສະເໝີ). ເຖິງຢ່າງໃດກໍ່ຕາມ, ມີບາງຢ່າງຜິດປົກະຕິກັບວິທີທີ່ແທັກ `<img>` ກຳນົດ `src`.

ທ່ານແປງໄດ້ບໍ່?

<Sandpack>

```js

const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Todos ຂອງ {person.name}</h1>
      <img
        className="avatar"
        src="{baseUrl}{person.imageId}{person.imageSize}.jpg"
        alt={person.name}
      />
      <ul>
        <li>ປັບປຸງວີດີໂອໂຟນ</li>
        <li>ກຽມບັນຍາຍການບິນ</li>
        <li>ເຮັດວຽກນຳເຄື່ອງຈັກທີ່ໃຊ້ alcohol ເປັນເຊື້ອໄຟ</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; }
```

</Sandpack>

ຫາກຕ້ອງການການກວດສອບວ່າການແກ້ໄຂຂອງທ່ານໄດ້ຜົນ, ລອງປ່ຽນຄ່າຂອງ `imageSize` ເປັນ `'b'`. ຮູບພາບຄວນປັບຂະໜາດຫຼັງຈາກແກ້ໄຂ.

<Solution>

ທ່ານສາມາດຂຽນເປັນ `src={baseUrl + person.imageId + person.imageSize + '.jpg'}`.

1. `{` ເປີດ JavaScript expression
2. `baseUrl + person.imageId + person.imageSize + '.jpg'` ສ້າງ string ທີ່ຖືກຕ້ອງ
3. `}` ປິດ JavaScript expression

<Sandpack>

```js
const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Todos ຂອງ {person.name} </h1>
      <img
        className="avatar"
        src={baseUrl + person.imageId + person.imageSize + '.jpg'}
        alt={person.name}
      />
      <ul>
        <li>ປັບປຸງວີດີໂອໂຟນ</li>
        <li>ກຽມບັນຍາຍການບິນ</li>
        <li>ເຮັດວຽກນຳເຄື່ອງຈັກທີ່ໃຊ້ alcohol ເປັນເຊື້ອໄຟ</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; }
```

</Sandpack>

ທ່ານສາມາດຍ້າຍ expression ນີ້ເປັນຟັງຊັ່ນແຍກຕ່າງຫາກເຊັ່ນ `getImageUrl` ດ້ານລຸ່ມ:

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js'

const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Todos ຂອງ {person.name}</h1>
      <img
        className="avatar"
        src={getImageUrl(person)}
        alt={person.name}
      />
      <ul>
        <li>ປັບປຸງວີດີໂອໂຟນ</li>
        <li>ກຽມບັນຍາຍການບິນ</li>
        <li>ເຮັດວຽກນຳເຄື່ອງຈັກທີ່ໃຊ້ alcohol ເປັນເຊື້ອໄຟ</li>
      </ul>
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    person.imageSize +
    '.jpg'
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; }
```

</Sandpack>

ຕົວແປ ແລະ ຟັງຊັ່ນສາມາດຊ່ວຍໃຫ້ທ່ານເຮັດ markup ໄດ້ງ່າຍ!

</Solution>

</Challenges>
