---
title: ການສະແດງ Lists
---

<Intro>

ທ່ານຈະຕ້ອງການສະແດງ component ທີ່ຄ້າຍກັນຈາກຂໍ້ມູນຂອງ collection. ທ່ານສາມາດໃຊ້ [JavaScript array methods](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#) ເພື່ອຈັດການ array ຂອງຂໍ້ມູນ. ໃນ page ນີ້, ທ່ານຈະໄດ້ໃຊ້ [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) ແລະ [`map()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) ດ້ວຍ React ເພື່ອ filter ແລະ ແປງ array ຂໍ້ມູນຂອງທ່ານໃຫ້ເປັນ array ຂອງ component.

</Intro>

<YouWillLearn>

* ວິທີການສະແດງ component ຈາກ array ໂດຍໃຊ້ `map()` ຂອງ JavaScript 
* ວິທີການສະແດງສະເພາະ component ໂດຍໃຊ້ `filter()` ຂອງ JavaScript
* ເມື່ອໃດ ແລະ ເປັນຫຍັງຕ້ອງໃຊ້ React keys

</YouWillLearn>

## ການສະແດງຂໍ້ມູນຈາກ arrays {/*rendering-data-from-arrays*/}

ບອກວ່າທ່ານມີລາຍການຂອງເນື້ອຫາ.

```js
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```

ຂໍ້ແຕກຕ່າງລະຫວ່າງລາຍການເຫຼົ່ານີ້ແມ່ນເນື້ອຫາ ແລະ ຂໍ້ມູນ. ທ່ານຈະຕ້ອງສະແດງ component ດຽວກັນຫຼາຍລາຍການໂດຍໃຊ້ຂໍ້ມູນທີ່ແຕກຕ່າງກັນເມື່ອສ້າງ interface: ຈາກລາຍການ comment ໄປຈົນເຖິງ gallery ຮູບພາບ profile. ໃນກໍລະນີນີ້, ທ່ານສາມາດເກັບຂໍ້ມູນໃນ object JavaScript ແລະ array ແລະ ໃຊ້ method ເຊັ່ນ [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) ແລະ [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) ເພື່ອສະແດງລາຍການຂອງ component ຈາກມັນ.

ນີ້ແມ່ນຕົວຢ່າງຂອງວິທີສ້າງລາຍການຈາກ array:

1. **ຍ້າຍ** ຂໍ້ມູນໄປເປັນ array:

```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```

2. **Map** member `people` ໄປເປັນ array ໃໝ່ຂອງ node JSX, `listItems`:

```js
const listItems = people.map(person => <li>{person}</li>);
```

3. **Return** `listItems` ຈາກ component ທີລວມຢູ່ໃນ `<ul>`:

```js
return <ul>{listItems}</ul>;
```

ນີ້ແມ່ນຜົນລັບ:

<Sandpack>

```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```

```css
li { margin-bottom: 10px; }
```

</Sandpack>

ສັງເກດ sandbox ດ້ານເທິງສະແດງ console error:

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

ທ່ານຈະໄດ້ຮຽນວິທີແກ້ໄຂຂໍ້ຜິດພາດນີ້ໃນພາຍຫຼັງ. ກ່ອນຈະຮອດຂັ້ນຕອນນັ້ນ, ມາເພີ່ມໂຄ່ງສ້າງສຳລັບຂໍ້ມູນຂອງທ່ານ.

## ການ filter array ຂອງລາຍການ {/*filtering-arrays-of-items*/}

ຂໍ້ມູນນີ້ສາມາດຈັດໂຄ່ງສ້າງໄດ້ຫຼາຍຂຶ້ນ.

```js
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  name: 'Percy Lavon Julian',
  profession: 'chemist',  
}, {
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```

ສົມມຸດວ່າທ່ານຕ້ອງການວິທີສະແດງສະເພາະຄົນທີ່ມີອາຊີບເປັນ `'chemist'`. ທ່ານສາມາດໃຊ້ method JavaScript `filter()` ເພື່ອ return ສະເພາະແຕ່ຜູ້ຄົນເຫຼົ່ານັ້ນ. Method ນີ້ໃຊ້ array ຂອງລາຍການ, ສົ່ງຜ່ານ “test” (ຟັງຊັ່ນທີ່ returns `true` ຫຼື `false`), ແລະ return array ໃໝ່ສະເພາະລາຍການທີ່ຜ່ານການ test (returned `true`).

ທ່ານຕ້ອງການສະເພາະລາຍການທີ່ `profession` ເປັນ `chemist` ເທົ່ານັ້ນ. ຟັງຊັ່ນ "test" ຈະມີລັກສະນະດັ່ງນີ້ `(person) => person.profession === 'chemist'`. ນີ້ແມ່ນວິທີການລວມເຂົ້າກັນ:

1. **ສ້າງ** array ໃໝ່ທີ່ມີແຕ່ຄົນເປັນ “chemist”, `chemists`, ໂດຍການໃຊ້ `filter()` ໃນ `people` filter ໂດຍ `person.profession === 'chemist'`:

```js
const chemists = people.filter(person =>
  person.profession === 'chemist'
);
```

2. ທຳການ **map** ເທິງ `chemists`:

```js {1,13}
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
```

3. ສຸດທ້າຍ, **return** `listItems` ຈາກ component ຂອງທ່ານ:

```js
return <ul>{listItems}</ul>;
```

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<Pitfall>

Arrow ຟັງຊັ່ນຈະ return expression ທັນທີຫຼັງຈາກ `=>`, ສະນັ້ນທ່ານບໍ່ຈຳເປັນຕ້ອງໃຊ້ `return` statement:

```js
const listItems = chemists.map(person =>
  <li>...</li> // Implicit return!
);
```

ເຖິງຢ່າງໃດກໍຕາມ, **ທ່ານຕ້ອງຂຽນ `return` ທັນທີຖ້າ `=>` ທ່ານຕາມຫຼັງດ້ວຍ `{` ວົງປີກກາ!**

```js
const listItems = chemists.map(person => { // Curly brace
  return <li>...</li>;
});
```

Arrow ຟັງຊັ່ນປະກອບມີ `=> {` ແມ່ນຖືກເອີ້ນວ່າ ["block body".](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body) ມັນເຮັດໃຫ້ທ່ານສາມາດຂຽນ code ໄດ້ຫຼາຍກວ່າແຖວດຽວ, ແຕ່ວ່າທ່ານ *ຕ້ອງ* ໄດ້ຂຽນ `return` statement ດ້ວຍໂຕເອງ. ຖ້າທ່ານລືມ, ຈະບໍ່ມີຫຍັງຖືກ return!

</Pitfall>

## ການຈັດລະບຽບລາຍການດ້ວຍ `key` {/*keeping-list-items-in-order-with-key*/}

ສັງເກດວ່າ sandbox ທັງໝົດດ້ານເທິງສະແດງຂໍ້ຜິດພາດໃນ console:

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

ທ່ານຕ້ອງໄດ້ໃສ່ `key` ໃນແຕ່ລະລາຍການຂອງ array -- string ຫຼື number ທີ່ບໍ່ຊໍ້າກັບລາຍການອື່ນໆໃນ array ນັ້ນ:

```js
<li key={person.id}>...</li>
```

<Note>

element JSX ໂດຍກົງພາຍໃນການເອີ້ນ `map()` ຕ້ອງການ key ສະເໝີ!

</Note>

Key ຈະບອກ React ວ່າລາຍການ array ໃດທີ່ແຕ່ລະ component ສຳພັນກັນ, ເພື່ອໃຫ້ສາມາດຈັບຄູ່ໄດ້ໃນພາຍຫຼັງ. ນີ້ມີຄວາມສຳຄັນຫຼາຍຖ້າລາຍການ array ຂອງທ່ານສາມາດຍ້າຍ (ຕົວຢ່າງ ເນື່ອງຈາກການຮຽງລຳດັບ), ເພີ່ມ, ຫຼື ຖືກລຶບ. ການເລືອກ `key` ທີ່ດີສາມາດຊ່ວຍໃຫ້ React ສະຫຼຸບສິ່ງທີ່ເກີດຂຶ້ນແທ້, ແລະ ທຳການອັບເດດທີ່ຖືກຕ້ອງກັບ DOM tree.

ແທນທີ່ຈະສ້າງ key ທັນທີ, ທ່ານຄວນລວມມັນໄວ້ໃນຂໍ້ມູນຂອງທ່ານ:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

```js src/data.js active
export const people = [{
  id: 0, // Used in JSX as a key
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1, // Used in JSX as a key
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2, // Used in JSX as a key
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3, // Used in JSX as a key
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4, // Used in JSX as a key
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<DeepDive>

#### ການສະແດງຫຼາຍ DOM node ສຳລັບແຕ່ລະລາຍການ {/*displaying-several-dom-nodes-for-each-list-item*/}

ທ່ານຈະເຮັດແນວໃດເມືອແຕ່ລະລາຍການບໍ່ຈຳເປັນຕ້ອງສະແດງພຽງ node ດຽວ, ແຕ່ຕ້ອງມີຫຼາຍ DOM node?

Syntax ສັ້ນ [`<>...</>` Fragment](/reference/react/Fragment) ບໍ່ອະນຸຍາດໃຫ້ທ່ານສົ່ງ key, ສະນັ້ນທ່ານຕ້ອງ group ເຂົ້າເປັນ `<div>` ດຽວ, ຫຼື ໃຊ້ syntax ທີ່ຍາວຂຶ້ນໜ້ອຍໜຶ່ງ ແລະ  [ຊັດເຈນຫຼາຍຂຶ້ນ `<Fragment>`:](/reference/react/Fragment#rendering-a-list-of-fragments)

```js
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

Fragment ຫາຍໄປຈາກ DOM, ສະນັ້ນ, ນີ້ຈະສ້າງລາຍການຂອງ `<h1>`, `<p>`, `<h1>`, `<p>`, ແລະ ອື່ນໆ.

</DeepDive>

### ຈະຫາ `key` ໄດ້ຈາກບ່ອນໃດ {/*where-to-get-your-key*/}

ແຫຼ່ງຂອງຂໍ້ມູນທີ່ແຕກຕ່າງໃຫ້ແຫຼ່ງທີ່ມາຂອງ key ທີ່ຕ່າງກັນ:

* **ຂໍ້ມູນຈາກຖານຂໍ້ມູນ:** ຖ້າຂໍ້ມູນຂອງທ່ານແມ່ນມາຈາກຖານຂໍ້ມູນ, ທ່ານສາມາດໃຊ້ keys/IDs ຖານຂໍ້ມູນ, ທີ່ບໍ່ຊໍ້າກັນໂດຍທຳມະຊາດ.
* **ຂໍ້ມູນທີ່ສ້າງຂຶ້ນພາຍໃນເຄື່ອງ:** ຫາກຂໍ້ມູນຂອງທ່ານຖືກສ້າງຂຶ້ນ ແລະ ມີຢູ່ໃນເຄື່ອງ (ເຊັ່ນ: ບັນທຶກໃນແອັບຈົດບັນທຶກ), ໃຫ້ໃຊ້ໂຕນັບທີ່ເພີ່ມຂື້ນ [`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) ຫຼື package ເຊັ່ນ [`uuid`](https://www.npmjs.com/package/uuid) ເມື່ອສ້າງລາຍການ.

### ກົດຂອງ keys {/*rules-of-keys*/}

* **Key ຕ້ອງບໍ່ຊໍ້າກັນທຽບກັບໂຕອື່ນ.** ເຖິງຢ່າງໃດກໍຕາມ, ເປັນເລື່ອງປົກະຕິທີ່ຈະໃຊ້ key ດຽວກັນສຳລັບ JSX node ໃນ array _ທີ່ແຕກຕ່າງກັນ_.
* **Key ຕ້ອງບໍ່ປ່ຽນແປງ** ຫຼື ຜິດຈຸດປະສົງ! ຢ່າສ້າງມັນໃນຕອນທີ່ກຳລັງສະແດງຜົນ.

### ເປັນຫຍັງ React ຕ້ອງການ key? {/*why-does-react-need-keys*/}

ຈິນຕະນາການວ່າຟາຍຢູ່ desktop ຂອງທ່ານບໍ່ມີຊື່. ແຕ່ທ່ານຄວນອ້າງອີງເຖິງມັນຕາມລຳດັບ --ຟາຍທຳອິດ,  ຟາຍທີ່ສອງ, ແລະ ອື່ນໆ. ທ່ານອາດຈະລຶ້ງກັບມັນ, ແຕ່ເມື່ອທ່ານລຶບຟາຍ, ມັນຈະເຮັດໃຫ້ສັບສົນ. ຟາຍທີ່ສອງຈະກາຍເປັນຟາຍທຳອິດ, ຟາຍທີ່ສາມຈະກາຍເປັນຟາຍທີ່ສອງ ແລະ ອື່ນໆ.

ຊື່ຟາຍໃນໂຟນເດີ ແລະ key JSX ໃນ array ມີຈຸດປະສົງຄ້າຍຄືກັນ. ມັນລະບຸລາຍການລະຫວ່າງກັນໂດຍບໍ່ຊໍ້າກັນ. Key ທີ່ເລືອກມາຢ່າງດີຈະໃຫ້ຂໍ້ມູນຫຼາຍກວ່າຕຳແໜ່ງພາຍໃນ array. ເຖິງວ່າ _ຕຳແໜ່ງ_ ຈະປ່ຽນໄປເນື່ອງຈາກການຮຽງລຳດັບໃໝ່ `key` ຈະຊ່ວຍໃຫ້ React ກຳນົດລາຍການໄດ້ຕະຫຼອດອາຍຸການໃຊ້ງານ.

<Pitfall>

ທ່ານອາດຫຼົງໃຊ້ index ຂອງລາຍການເປັນ key. ໃນຄວາມເປັນຈິງ,​ React ຈະໃຊ້ຖ້າທ່ານບໍ່ໄດ້ກຳນົດ `key` ເລີຍ. ແຕ່ລຳດັບທີ່ທ່ານສະແດງລາຍການຈະປ່ຽນໄປເມື່ອເວລາຜ່ານໄປຖ້າລາຍການຖືກເພີ່ມ, ລຶບ ຫຼື ຖ້າ array ຖືກການຈັດລຳດັບໃໝ່. Index ທີ່ເປັນ key ສ່ວນຫຼາຍຈະເຮັດໃຫ້ເກີດບັນຫາ ແລະ ຍາກໃນການນຳຫາຂໍ້ຜິດພາດ.

ເຊັ່ນດຽວກັນ, ບໍ່ສ້າງ key ທັນທີ, ຕົວຢ່າງ ດ້ວຍ `key={Math.random()}`. ນີ້ຈະເຮັດໃຫ້ key ບໍ່ກົງກັນໃນລະຫວ່າງການສະແດງຜົນ, ເຮັດໃຫ້ component ທັງໝົດຂອງທ່ານ ແລະ DOM ຖືກສ້າງຂຶ້ນໃໝ່ທຸກຄັ້ງ. ບໍ່ພຽງແຕ່ຈະຊ້າເທົ່ານັ້ນ, ແຕ່ມັນຍັງຈະເສຍ user input ພາຍໃນລາຍການນຳອີກ. ໃຫ້ໃຊ້ ID ທີ່ສະຖຽນຕາມຂໍ້ມູນແທນ.

ສັງເກດວ່າ Component ຂອງທ່ານຈະບໍ່ໄດ້ຮັບ `key` ເປັນ prop. ມັນຈະໃຊ້ເປັນພຽງ hint ໂດຍ React ເອງ. ຖ້າ Component ທ່ານຕ້ອງການ ID, ທ່ານຕ້ອງໄດ້ສົ່ງເປັນ prop ແຍກຕ່າງຫາກ: `<Profile key={id} userId={id} />`.

</Pitfall>

<Recap>

ໃນ page ນີ້ທ່ານໄດ້ຮຽນ:

* ວິທີຍ້າຍຂໍ້ມູນອອກຈາກ component ແລະ ເຂົ້າສູ່ໂຄ່ງສ້າງຂໍ້ມູນເຊັ່ນ array ແລະ object.
* ວິທີສ້າງຊຸດຂອງ component ທີ່ຄ້າຍຄືກັນດ້ວຍ `map()` ຂອງ JavaScript.
* ວິທີສ້າງ array ຂອງລາຍການທີ່ filter ດ້ວຍ `filter()` ຂອງ JavaScript.
* ເຫດຜົນທີ່ຕ້ອງຕັ້ງຄ່າ `key` ໃນແຕ່ລະ component ໃນ collection ເພື່ອໃຫ້ React ສາມາດຕິດຕາມແຕ່ລະ component ໄດ້ເຖິງວ່າຕຳແໜ່ງ ຫຼື ຂໍ້ມູນຈະມີການປ່ຽນແປງ.

</Recap>



<Challenges>

#### ການແຍກ list ອອກເປັນສອງສ່ວນ {/*splitting-a-list-in-two*/}

ຕົວຢ່າງນີ້ສະແດງລາຍການຂອງ people ທັງໝົດ.

ປ່ຽນມັນເພື່ອສະແດງລາຍການແຍກກັນສອງລາຍການ: **Chemist** ແລະ **Everyone Else.** ຄືກັນກັບກ່ອນໜ້ານີ້, ທ່ານສາມາດກຳນົດໄດ້ວ່າບຸກຄົນເຫຼົ່ານີ້ເປັນ chemist ໂດຍການກວດວ່າ `person.profession === 'chemist'`.

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<Solution>

ທ່ານສາມາດໃຊ້ `filter()` ສອງເທື່ອ, ໂດຍສ້າງ array ແຍກກັນ 2 array ຈາກນັ້ນໃຊ້ `map` ໃສ່ທັງສອງ array:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <h2>Chemists</h2>
      <ul>
        {chemists.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
      <h2>Everyone Else</h2>
      <ul>
        {everyoneElse.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

ໃນວິທີການນີ້, ການເອີ້ນໃຊ້ `map` ຈະຖືກວາງໂດຍກົງໃນ `<ul>` element, ແຕ່ທ່ານສາມາດແນະນຳຕົວແປສຳລັບພວກມັນໄດ້ ຖ້າທ່ານພົບວ່າສາມາດອ່ານໄດ້ງ່າຍກວ່າ.

ຍັງມີການເຮັດຊໍ້າໜ້ອຍໜຶ່ງລະຫວ່າງລາຍການທີ່ສະແດງຜົນ. ທ່ານສາມາດໄປຕໍ່ ແລະ ແຍກຊີ້ນສ່ວນທີ່ຊໍ້າໆອອກເປັນ component `<ListSection>`:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

ຜູ້ອ່ານທີ່ເຂົ້າໃຈຈະສັງເກດທີ່ວ່າມີການເອີ້ນໃຊ້ `filter` ສອງເທື່ອ, ພວກເຮົາສາມາດກວດສອບອາຊີບແຕ່ລະຄົນສອງເທື່ອ. ການກວດສອບ property ແມ່ນໄວຫຼາຍ, ສະນັ້ນໃນຕົວຢ່າງນີ້ຈື່ງບໍ່ມີບັນຫາ. ຖ້າ logic ຂອງທ່ານມີຄວາມສຳຄັນຫຼາຍກວ່ານັ້ນ, ທ່ານສາມາດແທນທີການເອີ້ນໃຊ້ `filter` ດ້ວຍ loop ທີ່ສ້າງ array ດ້ວຍໂຕເອງ ແລະ ກວດສອບແຕ່ລະຄົນພຽງຄັ້ງດຽວ.

ຄວາມຈິງ, ຖ້າ `people` ບໍ່ມີການປ່ຽນແປງ, ທ່ານສາມາດຍ້າຍ code ນີ້ອອກຈາກ component ຂອງທ່ານ. ຈາກມຸມມອງຂອງ React, ສິ່ງທີ່ສຳຄັນຄືທ່ານໃຫ້ array ຂອງ JSX node ໃນຕອນທ້າຍ. ມັນບໍ່ສົນໃຈວ່າທ່ານສ້າງ array ນັ້ນແນວໃດ:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

let chemists = [];
let everyoneElse = [];
people.forEach(person => {
  if (person.profession === 'chemist') {
    chemists.push(person);
  } else {
    everyoneElse.push(person);
  }
});

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

</Solution>

#### ລາຍການທີ່ຊ້ອນກັນໃນໜຶ່ງ component {/*nested-lists-in-one-component*/}

ເຮັດລາຍການສູດອາຫານຈາກ array ນີ້! ສຳລັບແຕ່ລະສູດໃນ array, ສະແດງຊື່ມັນເປັນ `<h2>` ແລະ ລະບຸສ່ວນປະສົມໃນ `<ul>`.

<Hint>

ນີ້ຈະຕ້ອງມີການຊ້ອນການເອີ້ນ `map` ທີ່ແຕກຕ່າງກັນສອງຄັ້ງ.

</Hint>

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

<Solution>

ນີ້ແມ່ນວິທີທີ່ທ່ານສາມາດເຮັດໄດ້:

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

`recipe` ແຕ່ລະລາຍການມີ field `id`, ສະນັ້ນນອກ loop ຈຶ່ງໃຊ້ສຳລັບ `key` ຂອງມັນ. ບໍ່ມີ ID ທີ່ທ່ານສາມາດໃຊ້ເພື່ອ loop ສ່ວນປະສົມ. ເຖິງຢ່າງໃດກໍຕາມ, ມີເຫດຜົນທີ່ຈະສັນນິຖານໄດ້ວ່າສ່ວນປະສົມດຽວກັນຈະບໍ່ຖືກກຳນົດສອງຄັ້ງໃນສູດອາຫານດຽວກັນ, ດັ່ງນັ້ນຊື່ຈຶ່ງສາມາດໃຊ້ເປັນ `key` ໄດ້. ນອກນັ້ນ, ທ່ານສາມາດປ່ຽນແປງໂຄ່ງສ້າງຂໍ້ມູນເພື່ອເພີ່ມ ID, ຫຼື ໃຊ້ index ເປັນ `key` (ໂດຍມີຄຳເຕືອນວ່າທ່ານບໍ່ສາມາດຈັດລຳດັບສ່ວນປະສົມໃໝ່ໄດ້ຢ່າງປອດໄພ).

</Solution>

#### ການແຕກ component ລາຍການ {/*extracting-a-list-item-component*/}

Component `RecipeList` ປະກອບມີການເອີ້ນໃຊ້ `map` ທີ່ຊ້ອນກັນສອງລາຍການ. ເພື່ອໃຫ້ງ່າຍຂຶ້ນ, ໃຫ້ແຍກ component `Recipe` ອອກມາເຊິ່ງຈະຮັບ `id`, `name`, and `ingredients` props. ທ່ານຈະວາງ `key` ທາງນອກໄວ້ບ່ອນໃດ ແລະ ຍ້ອນເຫດຜົນຫຍັງ?

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

<Solution>

ທ່ານສາມາດ copy-paste JSX ຈາກພາຍນອກ `map` ເປັນ component `Recipe` ໃໝ່ ແລະ return JSX ນັ້ນ. ຈາກນັ້ນທ່ານສາມາດປ່ຽນ `recipe.name` ເປັນ `name`, `recipe.id` ເປັນ `id` ແລະ ອື່ນໆ  ສົ່ງຜ່ານມັນເປັນ prop ໄປຫາ `Recipe`:

<Sandpack>

```js
import { recipes } from './data.js';

function Recipe({ id, name, ingredients }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {ingredients.map(ingredient =>
          <li key={ingredient}>
            {ingredient}
          </li>
        )}
      </ul>
    </div>
  );
}

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <Recipe {...recipe} key={recipe.id} />
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

ຈຸດນີ້, `<Recipe {...recipe} key={recipe.id} />` ແມ່ນ shortcut syntax ທີ່ບອກວ່າ "ສົ່ງ property ທັງໝົດຂອງ `recipe` ເປັນ prop ໄປຫາ component `Recipe`". ທ່ານຍັງສາມາດຂຽນແຕ່ລະ prop ຢ່າງຊັດເຈນ: `<Recipe id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} key={recipe.id} />`.

**ສັງເກດວ່າ `key` ຖືກກຳນົດໃນ `<Recipe>` ເອງແທນທີ່ຈະກຳນົດໃນ root `<div>` ທີ່ return ຈາກ `Recipe`**. ເນື່ອງຈາກຈຳເປັນຕ້ອງໃຊ້ `key` ນີ້ໂດຍກົງພາຍໃນເງື່ອນໄຂຂອງ array. ກ່ອນໜ້ານີ້, ທ່ານມີ array ຂອງ `<div>` ດັ່ງນັ້ນແຕ່ລະ array ຈຳເປັນຕ້ອງມີ `key`, ແຕ່ຕອນນີ້ທ່ານມີ array ຂອງ `<Recipe>`. ເວົ້າອີກແບບໄດ້ວ່າ, ເມື່ອທ່ານແຍກ component, ຢ່າລືມປະ `key` ໄວ້ນອກ JSX ທີ່ທ່ານ copy ແລະ paste.

</Solution>

#### ລາຍການທີ່ມີໂຕຂັ້ນ {/*list-with-a-separator*/}

ຕົວຢ່າງນີ້ສະແດງ haiku ທີ່ມີຊື່ສຽງໂດຍ Katsushika Hokusai, ໂດຍແຕ່ລະແຖວຈະຢູ່ໃນແທັກ `<p>`. ວຽກຂອງທ່ານແມ່ນຕ້ອງເພີ່ມໂຕຂັ້ນ `<hr />` ລະຫວ່າງແຕ່ລະຫຍໍ້ໜ້າ. ໂຄ່ງສ້າງຜົນລັບຂອງທ່ານຄວນມີລັກສະນະນີ້:


```js
<article>
  <p>I write, erase, rewrite</p>
  <hr />
  <p>Erase again, and then</p>
  <hr />
  <p>A poppy blooms.</p>
</article>
```

Haiku ມີພຽງສາມແຖວ, ແຕ່ວິທີການຂອງທ່ານຄວນໃຊ້ໄດ້ກັບຈັກແຖວກໍໄດ້. ສັງເກດວ່າ `<hr />` element ຈະສະແດງ*ລະຫວ່າງ* `<p>` element, ບໍ່ແມ່ນໃນຕອນເລີ່ມຕົ້ນ ຫຼື ຕອນທ້າຍ!

<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) =>
        <p key={index}>
          {line}
        </p>
      )}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

(ກໍລະນີນີ້ບໍ່ຄ່ອຍເກີດຂຶ້ນທີ່ index ເປັນ key ຈະຍອມຮັບໄດ້ເນື່ອງຈາກແຖວຂອງກະວີຈະບໍ່ຮຽງລຳດັບໃໝ່.)

<Hint>

ທ່ານຈະຕ້ອງແປງ `map` ເປັນ loop ດ້ວຍໂຕເອງ, ຫຼື ໃຊ້ fragment.




</Hint>

<Solution>

ທ່ານສາມາດຂຽນ loop ດ້ວຍໂຕເອງ, ເພີ່ມ `<hr />` ແລະ `<p>...</p>` ເຂົ້າໃນ array output ທີ່ທ່ານດຳເນີນການ:  

<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  let output = [];

  // Fill the output array
  poem.lines.forEach((line, i) => {
    output.push(
      <hr key={i + '-separator'} />
    );
    output.push(
      <p key={i + '-text'}>
        {line}
      </p>
    );
  });
  // Remove the first <hr />
  output.shift();

  return (
    <article>
      {output}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

ການໃຊ້ index ແຖວເກົ່າເປັນ `key` ບໍ່ເຮັດວຽກອີກຕໍ່ໄປເພາະວ່າແຕ່ລະໂຕຂັ້ນ ແລະ ຫຍໍ້ໜ້າແຕ່ລະໂຕຢູ່ໃນ array ດຽວກັນ. ເຖິງຢ່າງໃດກໍຕາມ, ທ່ານສາມາດກຳນົດ key ທີ່ແຕກຕ່າງກັນໃຫ້ແຕ່ລະລາຍການໄດ້ໂດຍໃຊ້ຄຳຕໍ່ທ້າຍເຊັ່ນ `key={i + '-text'}`.


ອີກວິທີໜຶ່ງ, ທ່ານສາມາດສະແດງຜົນ collection ຂອງ fragment ທີ່ປະກອບມີ `<hr />` and `<p>...</p>`. ເຖິງຢ່າງໃດກໍຕາມ, syntax `<>...</>` ບໍ່ຮອງຮັບການສົ່ງຜ່ານ key, ດັ່ງນັ້ນທ່ານຕ້ອງໄດ້ຂຽນ `<Fragment>` ຢ່າງຊັດເຈນ:



<Sandpack>

```js
import { Fragment } from 'react';

const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, i) =>
        <Fragment key={i}>
          {i > 0 && <hr />}
          <p>{line}</p>
        </Fragment>
      )}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

ຈື່ໄວ້ວ່າ, fragment (ມັກຂຽນເປັນ `<> </>`) ໃຫ້ທ່ານ group JSX node ໂດຍບໍ່ຕ້ອງເພີ່ມ `<div>`!



</Solution>

</Challenges>
