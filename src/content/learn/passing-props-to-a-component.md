---
title: ການສົ່ງ Props ໄປຫາ Component
---

<Intro>

Component React ໃຊ້ *props* ເພື່ອສື່ສານລະຫວ່າງກັນ ແລະ ກັນ. ທຸກໆ parent component ສາມາດສົ່ງບາງຂໍ້ມູນໄປຫາ child component ມັນເອງໂດຍການໃຫ້ props. Props ອາດເຕືອນທ່ານກ່ຽວກັບ attribute HTML, ແຕ່ທ່ານສາມາດສົ່ງຄ່າຂອງ JavaScript ໃດກໍໄດ້ຜ່ານມັນລວມເຖິງ objects, arrays, ແລະ ຟັງຊັ່ນ.

</Intro>

<YouWillLearn>

* ວິທີສົ່ງ props ໄປຫາ component 
* ວິທີອ່ານ props ຈາກ component 
* ວິທີກຳນົດຄ່າເລີ່ມຕົ້ນສຳລັບ props 
* ວິທີສົ່ງບາງ JSX ໄປຫາ component 
* ວິທີທີ່ props ປ່ຽນແປງຕະຫຼອດເວລາ

</YouWillLearn>

## ຄຸ້ນເຄີຍກັບ props {/*familiar-props*/}

Props ແມ່ນຂໍ້ມູນທີ່ທ່ານສົ່ງຜ່ານແທັກ JSX. ຕົວຢ່າງ, `className`, `src`, `alt`, `width`, ແລະ `height` ແມ່ນບາງ props ທີ່ທ່ານສາມາດສົ່ງຜ່ານ `<img>`:

<Sandpack>

```js
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```

```css
body { min-height: 120px; }
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

Props ສາມາດສົ່ງຜ່ານແທັກ `<img>` ນັ້ນຖືກກຳນົດແລ້ວ (ReactDOM conforms to [the HTML standard](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element)). ແຕ່ທ່ານສາມາດສົ່ງ props ໃດກໍ່ໄດ້ໄປຫາ component *ຂອງທ່ານເອງ*, ເຊັ່ນ `<Avatar>`, ເພື່ອປັບແຕ່ງ. ນີ້ແມ່ນວິທີ!

## ການສົ່ງ props ໄປຫາ component {/*passing-props-to-a-component*/}

ໃນ code ນີ້, Component `Profile` ບໍ່ສາມາດສົ່ງ props ໃດກໍໄດ້ໄປຫາ child component, `Avatar`:

```js
export default function Profile() {
  return (
    <Avatar />
  );
}
```

ທ່ານສາມາດໃຫ້ props `Avatar` ໃນສອງຂັ້ນຕອນ.

### ຂັ້ນຕອນທີ 1: ສົ່ງ props ໄປຫາ child component {/*step-1-pass-props-to-the-child-component*/}

ທຳອິດ, ສົ່ງ props ໄປຫາ `Avatar`. ຕົວຢ່າງ, ສົ່ງ 2 props: `person` (ເປັນ object), ແລະ `size` (ເປັນ number):

```js
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

<Note>

ຖ້າສອງວົງປີກກາຢູ່ຫຼັງ `person=` ເຮັດໃຫ້ທ່ານສັບສົນ, ໃຫ້ຈື່ໄວ້ວ່າ [ມັນເປັນ object](/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx) ຢູ່ພາຍໃນວົງປີກກາ JSX.

</Note>

ທ່ານສາມາດອ່ານ props ນີ້ພາຍໃນ component `Avatar`

### ຂັ້ນຕອນທີ 2: ການອ່ານ props ພາຍໃນ child component {/*step-2-read-props-inside-the-child-component*/}

ທ່ານສາມາດອ່ານ props ໂດຍລະບຸຊື່ `person, size` ແຍກກັນໂດຍໃສ່ເຄື່ອງໝາຍຈຸດພາຍໃນ `({` ແລະ `})` ໂດຍກົງຫຼັງຈາກ `function Avatar`. ນີ້ເຮັດໃຫ້ທ່ານສາມາດນຳໃຊ້ພາຍໃນ code `Avatar`, ຄືກັບທີທ່ານໃຊ້ກັບຕົວແປ.

```js
function Avatar({ person, size }) {
  // person and size are available here
}
```

ເພີ່ມ logic ໃສ່ `Avatar` ທີ່ໃຊ້ props `person` ແລະ `size` ສຳລັບການສະແດງຜົນເທົ່ານີ້ກໍສຳເລັດ.

ຕອນນີ້ທ່ານສາມາດຕັ້ງຄ່າ `Avatar` ເພື່ອສະແດງໄດ້ຫຼາຍວິທີດ້ວຍຫຼາຍ prop ທີ່ແຕກຕ່າງກັນ. ລອງປັບຫຼິ້ນເບິ່ງ!

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

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

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
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
body { min-height: 120px; }
.avatar { margin: 10px; border-radius: 50%; }
```

</Sandpack>

Props ເຮັດໃຫ້ທ່ານຄິດກ່ຽວກັບ parent ແລະ child component ຢ່າງອິດສະຫຼະ. ຕົວຢ່າງ, ທ່ານສາມາດປ່ຽນ prop `person` ຫຼື `size` ພາຍໃນ `Profile` ໂດຍບໍ່ຈຳເປັນຕ້ອງຄິດວ່າ `Avatar` ໃຊ້ສິ່ງນີ້ແນວໃດ. ຄ້າຍຄືກັນ, ທ່ານສາມາດປ່ຽນວິທີທີ່ `Avatar` ໃຊ້ props, ໂດຍບໍ່ຕ້ອງເບິ່ງທີ່ `Profile`.

ທ່ານສາມາດຄິດວ່າ props ຄືກັບລູກບິດທີ່ທ່ານສາມາດປັບໄດ້. ມັນເຮັດໜ້າທີ່ເປັນ argument ທີ່ເຮັດວຽກສຳລັບຟັງຊັ່ນ-ຄວາມຈິງ, props _ເປັນ_ argument ດຽວສຳລັບ component ຂອງທ່ານ! ຟັງຊັ່ນ component React ຮັບ argument ດຽວ, `props` object:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

ປົກະຕິແລ້ວທ່ານບໍ່ຈຳເປັນຕ້ອງໃຊ້ `props` object ທັງໝົດ, ສະນັ້ນ ທ່ານສາມາດແຕກມັນອອກເປັນ props ຍ່ອຍແຕ່ລະອັນ.

<Pitfall>

**ຢ່າລືມວົງປີກກາ `{` ແລະ `}`** ພາຍໃນຂອງ `(` ແລະ `)` ເມື່ອປະກາດ props:

```js
function Avatar({ person, size }) {
  // ...
}
```

Syntax ເອີ້ນວ່າ ["destructuring"](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter) ແລະ ເທົ່າກັນກັບການອ່ານຄ່າ propertie ຈາກ function parameter:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

</Pitfall>

## ການລະບຸຄ່າເລີ່ມຕົ້ນສຳລັບ prop {/*specifying-a-default-value-for-a-prop*/}

ຫາກທ່ານຕ້ອງການໃຫ້ຄ່າ prop ເລີ່ມຕົ້ນເພື່ອໃຊ້ແທນເມື່ອບໍ່ໄດ້ລະບຸຄ່າໄວ້, ທ່ານສາມາດເຮັດໄດ້ໂດຍການ destructuring ໂດຍໃສ່ `=` ແລະ ຄ່າເລີ່ມຕົ້ນໄວ້ຫຼັງ parameter:

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

ຕອນນີ້, ຖ້າ `<Avatar person={...} />`  ສະແດງໂດຍບໍ່ມີ prop `size`, `size` ຈະຖືກຕັ້ງຄ່າເປັນ `100`.

ຄ່າເລີ່ມຕົ້ນຈະຖືກໃຊ້ກໍຕໍ່ເມືອບໍ່ມີ prop `size` ຫຼື ຖ້າທ່ານສົ່ງ `size={undefined}`. ແຕ່ຖ້າທ່ານສົ່ງ `size={null}` ຫຼື `size={0}`, ຄ່າເລີ່ມຕົ້ນຈະ **ບໍ່ຖືກ** ໃຊ້.

## ການສົ່ງຕໍ່ props ດ້ວຍ spread syntax JSX {/*forwarding-props-with-the-jsx-spread-syntax*/}

ບາງເທື່ອ, ການສົ່ງ props ແມ່ນຊໍ້າກັນຫຼາຍ: 

```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

ມັນບໍ່ມີຫຍັງຜິດຖ້າ code ຊໍ້າ-ມັນສາມາດອ່ານໄດ້ຊັດເຈນຂຶ້ນ. ແຕ່ບາງຄັ້ງທ່ານອາດໃຫ້ຄວາມສຳຄັນກັບຄວາມກະທັດຮັດ. ບາງ component ສົ່ງຜ່ານ props ທັງໝົດໄປຫາ children ຂອງມັນທັງໝົດ, ເຊັ່ນດຽວກັບວິທີ `Profile` ນີ້ເຮັດກັບ `Avatar`. ເພາະວ່າພວກມັນບໍ່ໃຊ້ prop ໂດຍກົງ, ຈຶ່ງເໝາະສົມທີ່ຈະໃຊ້ syntax "spread" ທີກະທັດຮັດກວ່ານີ້:

```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

ນີ້ສົ່ງຕໍ່ prop ທັງໝົດຂອງ `Profile` ໄປຫາ `Avatar` ໂດຍບໍ່ລະບຸຊື່ແຕ່ລະລາຍການ.

**ໃຊ້ spread syntax ດ້ວຍຄວາມລະມັດລະວັງ.** ຖ້າທ່ານໃຊ້ມັນທຸກໆ component ອື່ນ, ສະແດງວ່າມີບາງຢ່າງຜິດປົກະຕິ. ສ່ວນຫຼາຍ, ມັນບົ່ງບອກວ່າທ່ານຄວນຈະແຍກ component ແລະ ສົ່ງ children ເປັນ JSX. ເພີ່ມເຕີມຕໍ່ໄປ!

## ການສົ່ງ JSX ເປັນ children {/*passing-jsx-as-children*/}

ມັນເປັນເລື່ອງປົກະຕິທີ່ຈະຊ້ອນ built-in ແທັກບາວເຊີ:

```js
<div>
  <img />
</div>
```

ບາງເທື່ອທ່ານຕ້ອງການຊ້ອນ component ຂອງທ່ານດ້ວຍຮູບແບບດຽວກັນ:

```js
<Card>
  <Avatar />
</Card>
```

ເມື່ອທ່ານຊ້ອນເນື້ອຫາພາຍໃນແທັກ JSX, parent component ຈະຮັບເນື້ອຫາໃນ prop ເອີ້ນວ່າ `children`. ຕົວຢ່າງ, component `Card` ດ້ານລຸ່ມຈະຮັບ prop `children` ຕັ້ງຄ່າໃຫ້ `<Avatar />` ແລະ ສະແດງຜົນທາງໃນ div ທີ່ຄອບ:

<Sandpack>

```js App.js
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

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
```

```js Avatar.js
import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
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

ລອງແທນທີ່ `<Avatar>` ພາຍໃນ `<Card>` ດ້ວຍຂໍ້ຄວາມເພື່ອເບິ່ງວ່າ component `Card` ສາມາດຄອບເນື້ອຫາທີ່ຊ້ອນກັນ. ມັນບໍ່ຈຳເປັນຕ້ອງ "ຮູ້" ສິ່ງທີ່ກຳລັງສະແດງພາຍໃນມັນ. ທ່ານຈະເຫັນຮູບແບບທີ່ຢືດຫຍຸ່ນນີ້ຫຼາຍບ່ອນ.

ທ່ານສາມາດຄິດວ່າ component ທີ່ມີ prop `children` ວ່າມີ "ຂຸມ" ທີ່ສາມາດ "ເຕິມລົງ" ໂດຍ parent component ດ້ວຍ JSX ຕາມໃຈ. ທ່ານຈະໄດ້ໃຊ້ prop `children` ເລື້ອຍໆສຳລັບການຫໍ່ຫຸ້ມພາບເຊັ່ນ: panels, grids, ແລະ ອື່ນໆ.


<Illustration src="/images/docs/illustrations/i_children-prop.png" alt='A puzzle-like Card tile with a slot for "children" pieces like text and Avatar' />

## props ປ່ຽນແປງແນວໃດເມື່ອເວລາຜ່ານໄປ {/*how-props-change-over-time*/}

Component `Clock` ດ້ານລຸ່ມຈະໄດ້ຮັບສອງ prop ຈາກ parent component ມັນເອງ: `color` ແລະ `time`. (Code ຂອງ parent component ແມ່ນຖືກປະໄວ້ເພາະວ່າມັນໃຊ້[state](/learn/state-a-components-memory), ທີ່ພວກເຮົາຍັງບໍ່ທັນເຈາະລົງເລິກໄປຕື່ມເທື່ອ.)

ລອງປ່ຽນສີໃນ select box ດ້ານລຸ່ມ:

<Sandpack>

```js Clock.js active
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        ເລືອກສີ:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

</Sandpack>

ໃນຕົວຢ່າງນີ້ສະແດງໃຫ້ເຫັນວ່າ **component ອາດໄດ້ຮັບ prop ທີ່ແຕກຕ່າງເມື່ອເວລາຜ່ານໄປ.** Props ບໍ່ເປັນ static ສະເໝີໄປ! ນີ້, prop `time` ປ່ຽນແປງທຸກວິນາທີ, ແລະ prop `color` ປ່ຽນເມື່ອທ່ານເລືອກສີອື່ນ. Prop ສະທ້ອນຂໍ້ມູນ component ໃນເວລາໃດໜຶ່ງ, ແທນທີ່ຈະສະແດງສະເພາະໃນຊ່ວງເລີ່ມຕົ້ນ.

ເຖິງຢ່າງໃດກໍຕາມ, props ແມ່ນ [immutable](https://en.wikipedia.org/wiki/Immutable_object)—ຄຳສັບຈາກວິທະຍາສາດຄອມພິວເຕີມີຄວາມໝາຍວ່າ "ບໍ່ປ່ຽນແປງ". ເມື່ອ component ຕ້ອງການປ່ຽນແປງ prop ມັນເອງ (ຍົກຕົວຢ່າງ, ໃນຕອນ response ຫາການໂຕ້ຕອບຜູ້ໃຊ້ ຫຼື ຂໍ້ມູນໃໝ່), ມັນຕ້ອງໄດ້ "ຂໍ" parent component ຂອງມັນເອງເພື່ອສົ່ງ _prop ທີ່ແຕກຕ່າງ_—object ໃໝ່! prop ເກົ່າຈະຖືກຖີ້ມ ແລະ ໃນທີ່ສຸດ JavaScript engine ຈະເອີ້ນຄືນ memory ທີ່ພວກມັນເອົາໄປ.

**ຢ່າພາຍາຍາມ "ປ່ຽນ props".** ເມື່ອທ່ານຕ້ອງການ respond ຄືນຫາ user input (ເຊັ່ນ ປ່ຽນສີທີ່ເລືອກ), ທ່ານຈະຕ້ອງການ "set state", ທີ່ທ່ານໄດ້ຮຽນກ່ຽວກັບ [State: A Component's Memory.](/learn/state-a-components-memory)

<Recap>

* ຫາກຕ້ອງການສົ່ງ props, ໃຫ້ເພີ່ມລົງໃນ JSX, ເຊັ່ນດຽວກັບທີ່ທ່ານເຮັດກັບ attribute HTML.
* ຫາກຕ້ອງການອ່ານ props, ໃຊ້ destructuring syntax `function Avatar({ person, size})`.
* ທ່ານສາມາດກຳນົດຄ່າເລີ່ມຕົ້ນເຊັ່ນ `size = 100`, ເຊິ່ງໃຊ້ສຳລັບ props ທີ່ບໍ່ມີ ຫຼື ເປັນ `undefined`.
* ທ່ານສາມາດສົ່ງຕໍ່ທຸກ props ດ້ວຍ JSX spread syntax `<Avatar {...props} />`, ແຕ່ຢ່າໃຊ້ມັນຫຼາຍ!
* JSX ທີ່ຊ້ອນກັນຫຼາຍເຊັ່ນ `<Card><Avatar /></Card>` ຈະປະກົດເປັນ `children` component ຂອງ component `Card`.
* Props ແມ່ນ snapshot ທີ່ອ່ານໄດ້ຢ່າງດຽວໃນເວລາ: ທຸກໆການສະແດງຜົນຈະຮັບເວີຊັ່ນໃໝ່ຂອງ props.
* ທ່ານບໍ່ສາມາດປ່ຽນ props. ເມື່ອທ່ານຕ້ອງການ ການໂຕ້ຕອບ, ທ່ານຈະຕ້ອງຕັ້ງຄ່າ state.

</Recap>



<Challenges>

#### ແຕກ component {/*extract-a-component*/}

Component `Gallery` ນີ້ມີ markup ທີ່ຄ້າຍກັນຫຼາຍສຳລັບສອງ profile. ແຕກ component `Profile` ອອກມາເພື່ອຫຼຸດຄວາມຊໍ້າຊ້ອນ. ທ່ານຕ້ອງເລືອກ prop ທີ່ຈະສົ່ງໄປຫາມັນ.

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b> 
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (chemical element)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
```

```js utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

<Hint>

ເລີ່ມຕົ້ນໂດຍການແຕກ markup ຂອງນັກວິທະຍາສາດ ຄົນໃດໜຶ່ງ. ຈາກນັ້ນຄົ້ນຫາສ່ວນທີ່ບໍ່ກົງກັນໃນຕົວຢ່າງທີ່ສອງ, ແລະ ເຮັດໃຫ້ມັນສາມາດປັບໄດ້ໂດຍໃຊ້ props.

</Hint>

<Solution>

ໃນທາງອອກນີ້, component `Profile` ຮັບຫຼາຍ props: `imageId` (ເປັນ string), `name` (ເປັນ string), `profession` (ເປັນ string), `awards` (ເປັນ array ຂອງ string), `discovery` (ເປັນ string), ແລະ `imageSize` (ເປັນ number).

ໝາຍເຫດ ທີ່ prop `imageSize` ມີຄ່າເລີ່ມຕົ້ນ, ນັ້ນເປັນເຫດຜົນທີ່ເຮົາບໍ່ສົ່ງມັນຫາ component.

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Profile({
  imageId,
  name,
  profession,
  awards,
  discovery,
  imageSize = 70
}) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageId)}
        alt={name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li><b>Profession:</b> {profession}</li>
        <li>
          <b>Awards: {awards.length} </b>
          ({awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {discovery}
        </li>
      </ul>
    </section>
  );
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        imageId="szV5sdG"
        name="Maria Skłodowska-Curie"
        profession="physicist and chemist"
        discovery="polonium (chemical element)"
        awards={[
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ]}
      />
      <Profile
        imageId='YfeOqp2'
        name='Katsuko Saruhashi'
        profession='geochemist'
        discovery="a method for measuring carbon dioxide in seawater"
        awards={[
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ]}
      />
    </div>
  );
}
```

```js utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

ສັງເກດວ່າທ່ານບໍ່ຈຳເປັນຕ້ອງແຍກ prop `awardCount` ຖ້າ `awards` ເປັນ array. ຈາກນັ້ນທ່ານໃຊ້ `awards.length` ເພື່ອນັບຈຳນວນຂອງ awards. ໃຫ້ຈື່ໄວ້ວ່າ prop ສາມາດຮັບຄ່າໃດກໍໄດ້,​ແລະ ສາມາດລວມໃນ array ໄດ້ນຳ!

ວິທີການອື່ນ, ຊື່ງຄ້າຍຄືກັບຕົວຢ່າງກ່ອນໜ້າໃນ page ນີ້, ແມ່ນ group ຂໍ້ມູນທັງໝົດກ່ຽວກັບ person ໃນ object ດຽວ, ແລະ ສົ່ງ object ດັ່ງກ່າວເປັນໜຶ່ງ prop:

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Profile({ person, imageSize = 70 }) {
  const imageSrc = getImageUrl(person)

  return (
    <section className="profile">
      <h2>{person.name}</h2>
      <img
        className="avatar"
        src={imageSrc}
        alt={person.name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li>
          <b>Profession:</b> {person.profession}
        </li>
        <li>
          <b>Awards: {person.awards.length} </b>
          ({person.awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {person.discovery}
        </li>
      </ul>
    </section>
  )
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile person={{
        imageId: 'szV5sdG',
        name: 'Maria Skłodowska-Curie',
        profession: 'physicist and chemist',
        discovery: 'polonium (chemical element)',
        awards: [
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ],
      }} />
      <Profile person={{
        imageId: 'YfeOqp2',
        name: 'Katsuko Saruhashi',
        profession: 'geochemist',
        discovery: 'a method for measuring carbon dioxide in seawater',
        awards: [
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ],
      }} />
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
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

ເຖິງວ່າ syntax ຈະແຕກຕ່າງໜ້ອຍໜຶ່ງເພາະວ່າທ່ານກຳລັງອະທິບາຍ propertie ຂອງ JavaScript object ແທນທີ່ຈະເປັນ collection ຂອງ attribute JSX, ໃນຕົວຢ່າງເຫຼົ່ານີ້ສ່ວນຫຼາຍແມ່ນຈະທຽບເທົ່າກັນ, ແລະ ທ່ານສາມາດເລືອກວິທີໃດກໍໄດ້.

</Solution>

#### ປັບຂະໜາດຮູບໂດຍອີງຕາມ prop {/*adjust-the-image-size-based-on-a-prop*/}

ໃນຕົວຢ່າງນີ້, `Avatar` ຮັບຕົວເລກ prop `size` ທີ່ສະແດງຂະໜາດຄວາມກວ້າງ ແລະ ຄວາມສູງ ຂອງ `<img>`. prop `size` ຕັ້ງເປັນ `40` ໃນຕົວຢ່າງນີ້. ເຖິງຢ່າງໃດກໍຕາມ, ຖ້າທ່ານເປີດຮູບໃນແຖບໃໝ່, ທ່ານຈະສັງເກດວ່າໂຕຮູບເອງແມ່ນໃຫຍ່ (`160` pixels). ຂະໜາດຮູບທີ່ແທ້ຈິງຈະພິຈາລະນາຈາກຂະໜາດພາບ thumbnail ທີ່ທ່ານຕ້ອງການ.

ປ່ຽນ component `Avatar` ເພື່ອຂໍຂະໜາດພາບທີ່ໃກ້ຄຽງທີ່ສຸດອີງຕາມ prop `size`. ໂດຍສະເພາະ, ຖ້າ `size` ນ້ອຍກວ່າ `90`, ສົ່ງ `'s'` ("ນ້ອຍ") ແທນທີ່ຈະເປັນ `'b'` ("ໃຫຍ່") ໄປຫາຟັງຊັ່ນ `getImageUrl`. ກວດສອບວ່າການປ່ຽນແປງຂອງທ່ານໄດ້ຜົນໂດຍການສະແດງ avatar ທີ່ມີຄ່າແຕກຕ່າງກັນຂອງ prop `size` ແລະ ເປີດຮູບໃນແຖບໃໝ່.

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, 'b')}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Gregorio Y. Zara', 
        imageId: '7vQD0fP'
      }}
    />
  );
}
```

```js utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

<Solution>

ນີ້ແມ່ນວິທີທີ່ທ່ານສາມາດເຮັດ:

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

ທ່ານສາມາດສະແດງຮູບທີ່ຄົມຊັດສຳລັບ ຈໍ ທີ່ມີ DPI ສູງໂດຍການ [`window.devicePixelRatio`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) ໄປຫາ account:

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

const ratio = window.devicePixelRatio;

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size * ratio > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={70}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

Props ໃຫ້ທ່ານສາມາດຫໍ່ຫຸ້ມ logic ເຊັ່ນ ພາຍໃນ component `Avatar` ນີ້ (ແລະ ປ່ຽນມັນພາຍຫຼັງຖ້າຕ້ອງການ) ເພື່ອໃຫ້ທຸກຄົນສາມາດໃຊ້ component `<Avatar>` ໂດຍບໍ່ຕ້ອງຄິດເຖິງວິທີທີ່ຮູບມີການຮ້ອງຂໍ ແລະ ການປັບຂະໜາດຮູບພາບ.

</Solution>

#### ການສົ່ງ JSX ໃນ prop `children` {/*passing-jsx-in-a-children-prop*/}

ແຕກ `Card` component ຈາກ markup ດ້ານລຸ່ມ, ແລະ ໃຊ້ prop `children` ເພື່ອສົ່ງ JSX ທີ່ຕ່າງກັນຫາມັນ:

<Sandpack>

```js
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
        </div>
      </div>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

<Hint>

໋JSX ໃດໆທີ່ທ່ານໃສ່ໄວ້ໃນແທັກ component ຈະຖືກສົ່ງເປັນ prop `children` ຫາ component ນັ້ນ.

</Hint>

<Solution>

ນີ້ແມ່ນວິທີທີ່ທ່ານສາມາດໃຊ້ component `Card` ໃນສອງບ່ອນ:

<Sandpack>

```js
function Card({ children }) {
  return (
    <div className="card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card>
        <h1>Photo</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card>
        <h1>About</h1>
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

ທ່ານຍັງສາມາດແຍກ prop `title` ຖ້າທ່ານຕ້ອງການໃຫ້ທຸກໆ `Card` ນັ້ນມີ title:

<Sandpack>

```js
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card title="Photo">
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card title="About">
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

</Solution>

</Challenges>
