---
title: ອະທິບາຍ UI
---

<Intro>

React ແມ່ນ JavaScript library ສຳລັບສະແດງຜົນໜ້າຕ່າງຜູ້ໃຊ້ (UI). UI ແມ່ນເຮັດມາຈາກຊີ້ນສ່ວນນ້ອຍໆເຊັ່ນ: ປຸ່ມກົດ, ຂໍ້ຄວາມ, ແລະ ຮູບພາບ. React ຊ່ວຍໃຫ້ທ່ານລວມມັນເຂົ້າກັນເປັນ *component* ທີ່ໃຊ້ຊໍ້າ ແລະ ຊ້ອນກັນຫຼາຍໆຊັ້ນໄດ້. ຕັ້ງແຕ່ເວັບໄຊໄປຈົນເຖິງແອັບພິເຄຊັ່ນເທິງມືຖື, ທຸກຢ່າງເທິງໜ້າຈໍແມ່ນສາມາດແຕກຍ່ອຍເປັນ component ໄດ້. ໃນບົດນີ້, ທ່ານຈະໄດ້ຮຽນກ່ຽວກັບການສ້າງ, ການປັບແຕ່ງ ແລະ ສະແດງ React component ແບບມີເງື່ອນໄຂ. 

</Intro>

<YouWillLearn isChapter={true}>

<<<<<<< HEAD
* [ວິທີຂຽນ React component ທຳອິດຂອງທ່ານ](/learn/your-first-component)
* [ເມືອໃດ ແລະ ວິທີການສ້າງຫຼາຍຟາຍ component](/learn/importing-and-exporting-components)
* [ວິທີການເພີ່ມ markup ໃສ່ JavaScript ດ້ວຍ JSX](/learn/writing-markup-with-jsx)
* [ວິທີໃຊ້ວົງປີກກາກັບ JSX ເພື່ອເຂົ້າເຖິງ function JavaScript ຈາກ component ຂອງທ່ານ](/learn/javascript-in-jsx-with-curly-braces)
* [ວິທີການປັບແຕ່ງ component ດ້ວຍ props](/learn/passing-props-to-a-component)
* [ວິທີການສະແດງ component ແບບມີເງື່ອນໄຂ](/learn/conditional-rendering)
* [ວິທີການສະແດງຫຼາຍ component ພ້ອມກັນ](/learn/rendering-lists)
* [ວິທີການຫຼີກເວັ້ນຂໍ້ຜິດພາດໂດຍການຮັກສາໃຫ້ component pure ທີ່ສຸດ](/learn/keeping-components-pure)
=======
* [How to write your first React component](/learn/your-first-component)
* [When and how to create multi-component files](/learn/importing-and-exporting-components)
* [How to add markup to JavaScript with JSX](/learn/writing-markup-with-jsx)
* [How to use curly braces with JSX to access JavaScript functionality from your components](/learn/javascript-in-jsx-with-curly-braces)
* [How to configure components with props](/learn/passing-props-to-a-component)
* [How to conditionally render components](/learn/conditional-rendering)
* [How to render multiple components at a time](/learn/rendering-lists)
* [How to avoid confusing bugs by keeping components pure](/learn/keeping-components-pure)
* [Why understanding your UI as trees is useful](/learn/understanding-your-ui-as-a-tree)
>>>>>>> a0cacd7d3a89375e5689ccfba0461e293bfe9eeb

</YouWillLearn>

## Component ທຳອິດຂອງທ່ານ {/*your-first-component*/}

ແອັບພິເຄຊັ່ນ React ສ້າງຂຶ້ນຈາກການແຍກສ່ວນຂອງ UI ທີ່ເອີ້ນວ່າ *components*. React component ແມ່ນ JavaScript function ທີ່ສາມາດໂຮຍໜ້າດ້ວຍ markup. Component ອາດມີຂະໜາດນ້ອຍເທົ່າປຸ່ມກົດ, ຫຼື ໃຫຍ່ເທົ່າກັບທັງໝົດໜ້າ. ນີ້ແມ່ນ Component `Gallery` ທີ່ສະແດງຜົນ component `Profile` ສາມລາຍການ:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>ນັກວິທະຍາສາດທີ່ໜ້າປະຫຼາດໃຈ</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

<LearnMore path="/learn/your-first-component">

ອ່ານ **[Component ທຳອິດຂອງທ່ານ](/learn/your-first-component)** ເພື່ອຮຽນຮູ້ວິທີການປະກາດ ແລະ ນຳໃຊ້ React component.

</LearnMore>

## ການ Import ແລະ Export component {/*importing-and-exporting-components*/}

ທ່ານສາມາດປະກາດຫຼາຍ Component ໃນໜຶ່ງຟາຍ, ແຕ່ຟາຍຂະໜາດໃຫຍ່ສາມາດເຮັດໃຫ້ຍາກໃນການຊອກຫາ. ເພື່ອແກ້ໄຂບັນຫານີ້, ທ່ານສາມາດ *export* component ເປັນຟາຍຂອງມັນເອງ, ແລ້ວ *import* component ນັ້ນຈາກຟາຍອື່ນ:


<Sandpack>

```js App.js hidden
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js Gallery.js active
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>ນັກວິທະຍາສາດທີ່ໜ້າປະຫຼາດໃຈ</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js Profile.js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

<LearnMore path="/learn/importing-and-exporting-components">

ອ່ານ **[ການ Import ແລະ Export Components](/learn/importing-and-exporting-components)** ເພື່ອຮຽນຮູ້ວິທີການແຍກ component ເຂົ້າໄປໃນຟາຍຂອງຕົນເອງ.

</LearnMore>

## ການຂຽນ markup ດ້ວຍ JSX {/*writing-markup-with-jsx*/}

ແຕ່ລະ React component ແມ່ນຟັງຊັ່ນ JavaScript ທີ່ອາດມີ markup ບາງສ່ວນທີ່ React ສະແດງຜົນໃນບາວເຊີ. Component React ໃຊ້ syntax extension ເອີ້ນວ່າ JSX ເພີ່ມສະແດງ markup ນັ້ນ. JSX ຄ້າຍຄື HTML ຫຼາຍ, ແຕ່ເຂັ້ມງວດກວ່ານ້ອຍໜຶ່ງ ແລະ ສາມາດສະແດງຂໍ້ມູນ dynamic ໄດ້. 

ຖ້າເຮົາວາງ markup HTML ທີ່ມີຢູ່ລົງໃນ React component, ມັນຈະບໍ່ເຮັດວຽກສະເໝີໄປ:

<Sandpack>

```js
export default function TodoList() {
  return (
    // ນີ້ມັນບໍ່ສາມາດເຮັດວຽກໄດ້ເລີຍ!
    <h1>Todos ຂອງ Hedy Lamarr</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      class="photo"
    >
    <ul>
      <li>ປະດິດໄຟສັນຍານຈາລະຈອນ
      <li>ຊ້ອມສາກໜັງ
      <li>ປັບປຸງເຕັກໂນໂລຊີ spectrum
    </ul>
  );
}
```

```css
img { height: 90px; }
```

</Sandpack>

ຖ້າທ່ານມີ HTML ແບບນີ້, ທ່ານສາມາດແປງໄດ້ໂດຍການໃຊ້ [converter](https://transform.tools/html-to-jsx):

<Sandpack>

```js
export default function TodoList() {
  return (
    <>
      <h1>Todos ຂອງ Hedy Lamarr</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>ປະດິດໄຟສັນຍານຈາລະຈອນ</li>
        <li>ຊ້ອມສາກໜັງ</li>
        <li>ປັບປຸງເຕັກໂນໂລຊີ spectrum</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px; }
```

</Sandpack>

<LearnMore path="/learn/writing-markup-with-jsx">

ອ່ານ **[ການຂຽນ Markup ດ້ວຍ JSX](/learn/writing-markup-with-jsx)** ເພື່ອຮຽນຮູ້ວິທີການຂຽນ JSX ທີ່ຖືກຕ້ອງ.

</LearnMore>

## JavaScript ໃນ JSX ດ້ວຍວົງປີກກາ {/*javascript-in-jsx-with-curly-braces*/}

JSX ໃຫ້ທ່ານຂຽນ markup ຄ້າຍ HTML ໃນຟາຍ JavaScript, ຮັກສາ logic ການສະແດງຜົນ ແລະ ເນື້ອຫາໃນບ່ອນດຽວ. ບາງເທື່ອທ່ານອາດຈະຕ້ອງເພີ່ມ logic JavaScript ໜ້ອຍໜຶ່ງ ຫຼື ອ້າງອີງ dynamic property ພາຍໃນ markup ນັ້ນ. ໃນສະຖານະການນີ້, ທ່ານສາມາດໃຊ້ວົງປີກາໃນ JSX ຂອງທ່ານເພື່ດ "ເປີດໜ້າຕ່າງ" ເປັນ JavaScript:

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
      <h1>Todos ຂອງ {person.name} </h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>ປັບປຸງວີດີໂອໂຟນ</li>
        <li>ກຽມບັນຍາຍການບິນ</li>
        <li>ເຮັດວຽກກັບເຄື່ອງຈັກທີ່ໃຊ້ແອວກໍຮໍເປັນເຊື້ອໄຟ</li>
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

<LearnMore path="/learn/javascript-in-jsx-with-curly-braces">

ອ່ານ **[JavaScript ໃນ JSX ດ້ວຍວົງປີກກາ](/learn/javascript-in-jsx-with-curly-braces)** ເພື່ອຮຽນຮູ້ກ່ຽວກັບການເຂົ້າເຖິງຂໍ້ມູນ JavaScript ຈາກ JSX.

</LearnMore>

## ສົ່ງຜ່ານ props ໃສ່ component {/*passing-props-to-a-component*/}

Component React ໃຊ້ *props* ເພື່ອສື່ສານລະຫວ່າງກັນ. ທຸກໆ parent component ສາມາດສົ່ງບາງຂໍ້ມູນຫາ child component ມັນເອງໄດ້ໂດຍການໃຊ້ props. Props ອາດເຮັດໃຫ້ທ່ານນຶກເຖິງ HTML attribute, ແຕ່ທ່ານສາມາດສົ່ງຄ່າ JavaScript ຫຍັງກໍໄດ້ຜ່ານມັນ, ປະກອບມີ objects, arrays, functions ແລະ JSX!

<Sandpack>

```js
import { getImageUrl } from './utils.js'

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

```

```js utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.card {
  width: fit-content;
  margin: 5px;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.avatar {
  margin: 20px;
  border-radius: 50%;
}
```

</Sandpack>

<LearnMore path="/learn/passing-props-to-a-component">

ອ່ານ **[ການສົ່ງຜ່ານ Props ໄປຫາ Component](/learn/passing-props-to-a-component)** ເພື່ອຮຽນຮູ້ວິທີການສົ່ງຜ່ານ ແລະ ອ່ານ props.

</LearnMore>

## ການສະແດງຜົນແບບມີເງື່ອນໄຂ {/*conditional-rendering*/}

Component ຂອງທ່ານສ່ວນຫຼາຍຈະສະແດງສິ່ງຕ່າງໆຂຶ້ນກັບແຕ່ລະເງື່ອນໄຂທີ່ແຕກຕ່າງກັນ. ໃນ React, ທ່ານສາມາດສະແດງ JSX ຢ່າງມີເງື່ອນໄຂໂດຍການໃຊ້ syntax JavaScript ເຊັ່ນ `if` statements, `&&`, ແລະ `? :` operators.

ໃນຕົວຢ່າງນີ້, JavaScript `&&` operator ແມ່ນໃຊ້ເພື່ອສະແດງເຄື່ອງໝາຍຕິກຕາມເງື່ອນໄຂ:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>ລາຍການຂອງ Sally Ride</h1>
      <ul>
        <Item
          isPacked={true}
          name="ຊຸດອາວະກາດ"
        />
        <Item
          isPacked={true}
          name="ໝວກກັນກະທົບທີ່ມີໃບສີທອງ"
        />
        <Item
          isPacked={false}
          name="ຮູບຂອງແທັມ"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<LearnMore path="/learn/conditional-rendering">

ອ່ານ **[ການສະແດງຜົນຕາມເງື່ອນໄຂ](/learn/conditional-rendering)** ເພື່ອຮຽນຮູ້ວິທີຕ່າງໆໃນການສະແດງເນື້ອຫາຕາມເງື່ອນໄຂ.

</LearnMore>

## ການສະແດງ lists {/*rendering-lists*/}

ທ່ານມັກຈະຕ້ອງການສະແດງ component ຄ້າຍກັນຈາກຂໍ້ມູນ collection. ທ່ານສາມາດໃຊ້ JavaScript `filter()` ແລະ `map()` ກັບ React ເພື່ອ filter ແລະ ປ່ຽນ array ຂອງຂໍ້ມູນໄປເປັນ array ຂອງ component.

ສຳລັບ array ແຕ່ລະລາຍການ , ທ່ານຈະຕ້ອງລະບຸ `key`. ສ່ວນຫຼາຍ, ທ່ານຈະຕ້ອງການ ID ຈາກ database ເປັນ `key`. Key ເຮັດໃຫ້ React ຕິດຕາມຕຳແໜ່ງຂອງແຕ່ລະລາຍການໃນ list ເຖິງວ່າ ລາຍການຈະປ່ຽນໄປກໍ່ຕາມ.

<Sandpack>

```js App.js
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
        ເປັນທີ່ຮູ້ຈັກສຳຫຼັບ {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>ນັກວິທະຍາສາດ</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

```js data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'ນັກຄະນິດສາດ',
  accomplishment: 'ການຄຳນວນການບິນໃນອາວະກາດ',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'ນັກເຄມີສາດ',
  accomplishment: 'ການຄົ້ນພົບຫຼຸມໂອໂຊນອາກຕິກ',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'ນັກຟີຊິກສາດ',
  accomplishment: 'ທິດສະດີແມ່ເຫຼັກໄຟຟ້າ',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'ນັກເຄມີສາດ',
  accomplishment: 'ຜູ້ບຸກເບີກຢາຄອກຕິໂຊນ, ສະເຕີລອຍ ແລະ ຢາຄຸມກຳເນີດ',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'ນັກຟີຊິກດາລາສາດ',
  accomplishment: 'ການຄຳນວນມວນດາວແຄະຂາວ',
  imageId: 'lrWQx8l'
}];
```

```js utils.js
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
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
h1 { font-size: 22px; }
h2 { font-size: 20px; }
```

</Sandpack>

<LearnMore path="/learn/rendering-lists">

ອ່ານ **[ການສະແດງ Lists](/learn/rendering-lists)** ເພື່ອຮຽນຮູ້ວິທີສະແດງ list ຂອງ component ແລະ ວິທີການເລືອກ key.

</LearnMore>

## ການຮັກສາ components ໃຫ້ pure {/*keeping-components-pure*/}

ບາງຟັງຊັ່ນ JavaScript ແມ່ນ *pure.* Pure function:

* **ຄຳນຶງເຖິງເລື່ອງໂຕມັນເອງ.** ມັນບໍ່ມີການປ່ຽນແປງ object ຫຼື ຕົວປ່ຽນໃດໆທີ່ມີຢູ່ກ່ອນທີ່ມັນຈະຖືກເອີ້ນໃຊ້.
* **input ດຽວກັນ, output ດຽວກັນ.** ຍ້ອນ input ດຽວກັນ, pure function ຄວນຈະ return ຜົນໄດ້ຮັບດຽວກັນຢູ່ສະເໝີ.

ໃຫ້ຂຽນ Component ຂອງທ່ານໃຫ້ເປັນຟັງຊັ່ນລ້ວນໆເທົ່ານັ້ນຢ່າງເຄັ່ງຄັດ, ທ່ານສາມາດຫຼີກຫຼ່ຽງ bug ທີ່ເຮັດໃຫ້ວຸ້ນວາຍ ແລະ ພຶດຕິກຳທີ່ບໍ່ຄາດຄິດເມື່ອ codebase ຂອງທ່ານໃຫຍ່ຂຶ້ນ. ນີ້ແມ່ນຕົວຢ່າງຂອງ component ທີ່ບໍ່ pure:

<Sandpack>

```js
let guest = 0;

function Cup() {
  // ບໍ່ດິ: ປ່ຽນຄ່າຕົວແປທີ່ມີຢູ່ກ່ອນ!
  guest = guest + 1;
  return <h2>ຊາສຳລັບແຂກ  #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

</Sandpack>

ທ່ານສາມາດເຮັດໃຫ້ component ນີ້ pure ໄດ້ ໂດຍການສົ່ງ prop ແທນທີ່ການແກ້ໄຂຕົວແປທີ່ມີຢູ່ແລ້ວ:

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>ຊາສຳລັບແຂກ #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

</Sandpack>

<LearnMore path="/learn/keeping-components-pure">

ອ່ານ **[ຮັກສາໃຫ້ Component pure](/learn/keeping-components-pure)** ເພື່ອຮຽນຮູ້ວິທີຂຽນ component ໃຫ້ pure, ແລະ ສາມາດຄາດເດົາຟັງຊັ່ນໄດ້.

</LearnMore>

<<<<<<< HEAD
## ຕໍ່ໄປແມ່ນຫຍັງ? {/*whats-next*/}
=======
## Your UI as a tree {/*your-ui-as-a-tree*/}

React uses trees to model the relationships between components and modules. 

A React render tree is a representation of the parent and child relationship between components. 

<Diagram name="generic_render_tree" height={250} width={500} alt="A tree graph with five nodes, with each node representing a component. The root node is located at the top the tree graph and is labelled 'Root Component'. It has two arrows extending down to two nodes labelled 'Component A' and 'Component C'. Each of the arrows is labelled with 'renders'. 'Component A' has a single 'renders' arrow to a node labelled 'Component B'. 'Component C' has a single 'renders' arrow to a node labelled 'Component D'.">An example React render tree.</Diagram>

Components near the top of the tree, near the root component, are considered top-level components. Components with no child components are leaf components. This categorization of components is useful for understanding data flow and rendering performance.

Modelling the relationship between JavaScript modules is another useful way to understand your app. We refer to it as a module dependency tree. 

<Diagram name="generic_dependency_tree" height={250} width={500} alt="A tree graph with five nodes. Each node represents a JavaScript module. The top-most node is labelled 'RootModule.js'. It has three arrows extending to the nodes: 'ModuleA.js', 'ModuleB.js', and 'ModuleC.js'. Each arrow is labelled as 'imports'. 'ModuleC.js' node has a single 'imports' arrow that points to a node labelled 'ModuleD.js'.">An example module dependency tree.</Diagram>

A dependency tree is often used by build tools to bundle all the relevant JavaScript code for the client to download and render. A large bundle size regresses user experience for React apps. Understanding the module dependency tree is helpful to debug such issues. 

<LearnMore path="/learn/understanding-your-ui-as-a-tree">

Read **[Your UI as a Tree](/learn/understanding-your-ui-as-a-tree)** to learn how to create a render and module dependency trees for a React app and how they're useful mental models for improving user experience and performance.

</LearnMore>


## What's next? {/*whats-next*/}
>>>>>>> a0cacd7d3a89375e5689ccfba0461e293bfe9eeb

ໄປທີ່ [Component ທຳອິດຂອງທ່ານ](/learn/your-first-component) ເພື່ອເລີ່ມອ່ານບົດນີ້ເທື່ອລະໜ້າ!

ຫຼຶ, ຖ້າທ່ານມີຄວາມຄຸ້ນເຄິຍກັບຫົວຂໍ້ເຫຼົ່ານີ້ແລ້ວ, ເປັນຫຍັງບໍ່ອ່ານ [ການເພີ່ມ Interactivity](/learn/adding-interactivity)?
