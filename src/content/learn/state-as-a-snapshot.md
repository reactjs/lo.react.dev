---
title: State ເປັນ Snapshot
---

<Intro>

ຕົວແປ state ອາດຄ້າຍຄືຕົວແປ JavaScript ທົ່ວໄປທີ່ທ່ານສາມາອ່ານ ແລະ ຂຽນໄດ້. ເຖິງຢ່າງໃດກໍຕາມ, state ຈະເຮັດວຽກຄື snapshot ຫຼາຍກວ່າ. ການຕັ້ງຄ່ານີ້ບໍ່ໄດ້ປ່ຽນຕົວແປ state ທີ່ທ່ານມີຢູ່ແລ້ວ, ແຕ່ຈະ trigger ການ render ໃໝ່ແທນ.

</Intro>

<YouWillLearn>

* state ການຕັ້ງຄ່າ trigger ການ render ໃໝ່ແນວໃດ
* state ອັບເດດຕອນໃດ ແລະ ແນວໃດ 
* ເປັນຫຍັງ state ຈຶ່ງບໍ່ອັບເດດທັນທີຫຼັງຈາກທີ່ທ່ານຕັ້ງຄ່າ
* Event handler ເຂົ້າເຖິງ "snapshot" ຂອງ state ໄດ້ແນວໃດ

</YouWillLearn>

## ການຕັ້ງຄ່າ state trigger ການ render {/*setting-state-triggers-renders*/}

ທ່ານອາດຄິດວ່າສ່ວນ user interaface ຂອງທ່ານປ່ຽນແປງໂດຍກົງເພື່ອຕອບສະໜອງ event ຂອງ user ເຊັ່ນການຄິກ. ໃນ React, ມັນເຮັດວຽກແຕກຕ່າງກັນຈາກ mental model ໜ້ອຍໜື່ງ. ໃນໜ້າທີ່ແລ້ວ, ທ່ານເຫັນວ່າ [state ການຕັ້ງຄ່າ request ຂອງການ render ຊໍ້າ](/learn/render-and-commit#step-1-trigger-a-render) ຈາກ React. ເຊິ່ງໝາຍຄວາມວ່າເພື່ອໃຫ້ interface ຕອບສະໜອງຕໍ່ event ໄດ້, ທ່ານຕ້ອງ *ອັບເດດ state*.

ໃນຕົວຢ່າງນີ້, ເມື່ອທ່ານກົດ "send", `setIsSent(true)` ຈະບອກ React ໃຫ້ render UI ໃໝ່:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

ນີ້ແມ່ນສິ່ງທີ່ເກີດຂຶ້ນເມື່ອທ່ານຄິກປຸ່ມ:

1. event hander `onSubmit` ດຳເນີນການ.
2. `setIsSent(true)` ຕັ້ງຄ່າ `isSent` ເປັນ `true` ແລະ ຈັດຄິວການ render ໃໝ່.
3. React ຈະ render component ໃໝ່ຕາມຄ່າ `isSent` ໃໝ່.

ມາເບິ່ງຄວາມສຳພັນລະຫວ່າງ state ແລະ ການ render ໃຫ້ລະອຽດຍິ່ງຂຶ້ນ.

## ການ Render ຈັບ snapshot ທັນເວລາ {/*rendering-takes-a-snapshot-in-time*/}

["ການ Render"](/learn/render-and-commit#step-2-react-renders-your-components) ແມ່ນ React ກຳລັງເອີ້ນໃຊ້ component ຂອງທ່ານ, ເຊິ່ງເປັນຟັງຊັ່ນ. JSX ທີ່ທ່ານ return ຈາກ ຟັງຊັ່ນນັ້ນເປັນເໝືອນ snapshot ຂອງ UI ໃນເວລາ. Prop ຂອງມັນ, event handler ແລະ ຕົວແປພາຍໃນທັງໝົດໄດ້ຮັບການຄຳນວນ **ໂດຍໃຊ້ status ຂອງມັນໃນເວລາ render**

UI "snapshot" ທີ່ທ່ານ return ເປັນແບບ interactive ບໍ່ຄືກັນກັບພາບຖ່າຍ ຫຼື ເຟມໜັງ. ມັນມີ logic ເຊັ່ນ event handler ທີ່ລະບຸສິ່ງທີ່ເກີດຂຶ້ນໃນການຕອບສະໜອງຕໍ່ input. React ອັບເດດໜ້າຈໍໃຫ້ກົງກັບ snapshot ນີ້ ແລະ ເຊື່ອມຕໍ່ event handler. ດ້ວຍເຫດນີ້, ການກົດປຸ່ມຈະເອີ້ນໃຊ້ click handler ຈາກ JSX ຂອງທ່ານ.

ເມື່ອ React ທຳການ render component ອີກຄັ້ງ:

<<<<<<< HEAD
1. React ເອີ້ນໃຊ້ຟັງຊັ່ນຂອງທ່ານອີກຄັ້ງ.
2. ຟັງຊັ່ນຂອງທ່ານ return snaptshot JSX ໃໝ່.
3. React ຈາກນັ້ນອັບເດດໜ້າຈໍໃຫ້ກົງກັບ snapshot ທີ່ທ່ານ return.
=======
1. React calls your function again.
2. Your function returns a new JSX snapshot.
3. React then updates the screen to match the snapshot your function returned.
>>>>>>> 2390627c9cb305216e6bd56e67c6603a89e76e7f

<IllustrationBlock sequential>
    <Illustration caption="React execute ຟັງຊັ່ນ" src="/images/docs/illustrations/i_render1.png" />
    <Illustration caption="ຄຳນວນ snapshot" src="/images/docs/illustrations/i_render2.png" />
    <Illustration caption="ອັບເດດ DOM tree" src="/images/docs/illustrations/i_render3.png" />
</IllustrationBlock>

ໃນຖານະໜ່ວຍຄວາມຈຳຂອງ component, state ບໍ່ຄືກັບຕົວແປທົ່ວໄປທີ່ຫາຍໄປຫຼັງຈາກທີ່ຟັງຊັ່ນຂອງທ່ານ return. ລະບຸວ່າ "ມັນຍັງມີຢູ່" ໃນ React ເອງ--ຄືກັບວ່າຢູ່ໃນຊັ້ນວາງ!--ນອກຟັງຊັ່ນຂອງທ່ານ. ເມື່ອ React ເອີ້ນ component ຂອງທ່ານ, ມັນຈະສະແດງພາບລວມຂອງ state ສຳລັບການ render ນັ້ນ. Component ຂອງທ່ານ return snapshot ຂອງ UI ພ້ອມຊຸດ prop ແລະ event handler ໃໝ່ໃນ JSX ເຊິ່ງຄຳນວນທັງໝົດ **ໂດຍໃຊ້ຄ່າ state ຈາກການ render ນັ້ນ!**

<IllustrationBlock sequential>
  <Illustration caption="ທ່ານບອກ React ອັບເດດ state" src="/images/docs/illustrations/i_state-snapshot1.png" />
  <Illustration caption="React ຄ່າຂອງ state" src="/images/docs/illustrations/i_state-snapshot2.png" />
  <Illustration caption="React ສົ່ງ snapshot ຂອງຄ່າ state ໄປຍັງ component" src="/images/docs/illustrations/i_state-snapshot3.png" />
</IllustrationBlock>

ນີ້ແມ່ນການທົດລອງນ້ອຍໆເພື່ອຈະສະແດງໃຫ້ທ່ານເຫັນວ່າມັນມີການເຮັດວຽກແນວໃດ. ໃນຕົວຢ່າງນີ້, ທ່ານອາດຄາດຫວັງວ່າການຄິກປຸ່ມ "+3" ຈະເພີ່ມຕົວນັບສາມຄັ້ງເນື່ອງຈາກປຸ່ມເອິ້ນໃຊ້ `setNumber(number + 1)` ສາມຄັ້ງ. 

ເບິ່ງວ່າຈະເກີດຫຍັງຂຶ້ນເມື່ອທ່ານຄິກປຸ່ມ "+3":

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

ສັງເກດວ່າ `number` ຈະເພີ່ມຂຶ້ນພຽງຄັ້ງດຽວຕໍ່ການຄິກ!

**State ການຕັ້ງຕ່າຈະປ່ຽນສະເພາະການ render *ຕໍ່ໄປ* ເທົ່ານັ້ນ.** ລະຫວ່າງການ render ຄັ້ງທຳອິດ, `number` ເປັນ `0`. ນີ້ແມ່ນເຫດຜົນທີ່ໃນ event handler `onClick` ຂອງ*ຕົວ render* ຄ່າຂອງ `number` ຍັງເປັນ `0` ເຖິງວ່າຈະເອີ້ນໃຊ້ `setNumber(number + 1)` ແລ້ວກໍ່ຕາມ:

```js
<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
```

ນີ້ແມ່ນສິ່ງທີ່ click handler ຂອງປຸ່ມນີ້ບອກໃຫ້ React ເຮັດ:

1. `setNumber(number + 1)`: `number` ເປັນ `0` ສະນັ້ນ `setNumber(0 + 1)`.
    - React ກຽມປ່ຽນ `number` ເປັນ `1` ໃນ render ຕໍ່ໄປ.
2. `setNumber(number + 1)`: `number` ເປັນ `0` ສະນັ້ນ `setNumber(0 + 1)`.
    - React ກຽມປ່ຽນ `number` ເປັນ `1` ໃນ render ຕໍ່ໄປ.
3. `setNumber(number + 1)`: `number` ເປັນ `0` ສະນັ້ນ `setNumber(0 + 1)`.
    - React ກຽມປ່ຽນ `number` ເປັນ `1` ໃນ render ຕໍ່ໄປ.

ເຖິງວ່າທ່ານຈະເອີ້ນໃຊ້ `setNumber(number + 1)` ສາມເທື່ອ, ແຕ່ໃນ event handler ຂອງ *ການ render* ນີ້ `number` ຈະເປັນ `0` ສະເໝີ, ທ່ານຈຶ່ງຕັ້ງຄ່າ state ເປັນ `1` ສາມຄັ້ງ. ນີ້ແມ່ນສາເຫດ, ຫຼັງຈາກ event handler ຂອງທ່ານສຳເລັດ, React ຈະ render component ອີກຄັ້ງດ້ວຍ `number` ເທົ່າກັບ `1` ແທນທີ່ຈະເປັນ `3`.

ທ່ານສາມາດເຮັດໃຫ້ເຫັນພາບໂດຍການແທນທີ່ຕົວແປ state ດ້ວຍຄ່າໃນ code ຂອງທ່ານ. ເນື່ອງຈາກຕົວແປ state `number` ເປັນ `0` ສຳລັບ *ການ render ນີ້*, event handler ຈຶ່ງມີລັກສະນະດັ່ງນີ້: 

```js
<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
```

ສຳລັບການ render ຕໍ່ໄປ, `number` ເປັນ `1`, ສະນັ້ນ click handler ຂອງ *render ນັ້ນ* ຈະມີລັກສະນະດັ່ງນີ້:

```js
<button onClick={() => {
  setNumber(1 + 1);
  setNumber(1 + 1);
  setNumber(1 + 1);
}}>+3</button>
```

ນີ້ຈຶ່ງເປັນເຫດຜົນວ່າການຄິກປຸ່ມອີກຄັ້ງຈະເຮັດໃຫ້ຕົວນັບເປັນ `2` ຈາກນັ້ນເປັນ `3` ໃນການຄິກຕໍ່ໄປ, ເປັນຕົ້ນ.

## State ເມື່ອເວລາຜ່ານໄປ {/*state-over-time*/}

ນັ້ນເປັນເລື່ອງທີ່ມ່ວນ. ລອງເດົາເບິງວ່າການຄິກປຸ່ມນີ້ຈະແຈ້ງເຕືອນຫຍັງ:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

ຖ້າທ່ານໃຊ້ວິທີການປ່ຽນແທນກ່ອນໜ້ານີ້, ທ່ານສາມາດຄາດເດົາໄດ້ວ່າການແຈ້ງເຕືອນສະແດງ "0":

```js
setNumber(0 + 5);
alert(0);
```

ແຕ່ຖ້າທ່ານໃຊ້ໂຕຈັບເວລາໃນການແຈ້ງເຕືອນ, ມັນຈຶ່ງເລີ່ມເຮັດວຽກສະເພາະ _ຫຼັງຈາກ_ component ທີ່ render ໃໝ່ ຈະບອກວ່າ "0" ຫຼື "5"? ລອງເດົາເບິ່ງ!

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

ປະຫຼາດໃຈບໍ່? ຖ້າທ່ານໃຊ້ວິທີການແທນທີ່,​ ທ່ານຈະເຫັນ "snapshot" ຂອງ state ທີ່ສົ່ງໄປຍັງການແຈ້ງເຕືອນ.

```js
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
```

State ທີ່ເກັບໄວ້ໃນ React ອາດມີການປ່ຽນແປງຕາມເວລາທີ່ການແຈ້ງເຕືອນເຮັດວຽກ, ແຕ່ມັນຖືກກຳນົດເວລາດ້ວຍ snapshot ຂອງ state ຕອນເວລາທີ່ຜູ້ໃຊ້ຕອບໂຕ້ກັບມັນ!

**ຄ່າຂອງຕົວແປ state ຈະບໍ່ປ່ຽນແປງພາຍໃນການ render,** ເຖິງວ່າ code ຂອງ event handler ຈະເປັນແບບ asynchronous ກໍຕາມ. ພາຍໃນ *ບ່ອນ render* `onClick` ຄ່າຂອງ `number` ຍັງເປັນ `0` ເຖິງວ່າຈະເອີ້ນ `setNumber(number + 5)` ກໍຕາມ. ຄ່າຂອງມັນ "fixed" ເມື່ອ React "ບັນທຶກ snapshot" ຂອງ UI ໂດຍເອີ້ນ component ຂອງທ່ານ.

ຕໍ່ໄປນີ້ຄືຕົວຢ່າງທີ່ເຮັດໃຫ້ event handler ຂອງທ່ານເກີດຂໍ້ຜິດພາດດ້ານເວລາໜ້ອຍລົງ. ດ້ານລຸ່ມນີ້ເປັນແບບຟອມທີ່ສົ່ງຂໍ້ຄວາມໂດຍມີການໜ່ວງເວລາ 5 ວິນາທີ. ຈິນຕະນາການສະຖານະການນີ້:

1. ທ່ານກົດປຸ່ມ "Send" ເພື່ອສົ່ງ "Hello" ຫາ Alice.
2. ກ່ອນທີ່ການໜ່ວງເວລາ 5ວິນາທີຈະສິ້ນສຸດລົງ, ທ່ານປ່ຽນຄ່າຂອງ field "To" ເປັນ "Bob".

ທ່ານຄາດຫວັງໃຫ້ `alert` ສະແດງຫຍັງ? ມັນຈະສະແດງຂໍ້ຄວາມວ່າ "You said Hello to Alice"? ຫຼື ບໍ່? ຫຼື ມັນສະແດງ "You said Hello to Bob"? ລອງເດົາເບິ່ງຕາມສິ່ງທີ່ທ່ານຮູ້ແລ້ວລອງ:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said ${message} to ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

**React ເກັບຄ່າ state "fixed" ພາຍໃນ event handler.** ທ່ານບໍ່ຈຳເປັນຕ້ອງກັງວົນວ່າ state ຈະປ່ຽນໄປ ຫຼື ບໍ່ ໃນຂະນະທີ່ code ກຳລັງເຮັດວຽກ.

ແຕ່ຖ້າທ່ານຕ້ອງການອ່ານ state ຫຼ້າສຸດກ່ອນການ render ໃໝ່ເດ? ທ່ານຈະຕ້ອງໃຊ້ [ຟັງຊັນ state updater](/learn/queueing-a-series-of-state-updates), ເຊິ່ງຈະກ່າວເຖິງໃນໜ້າຖັດໄປ!

<Recap>

* State ການຕັ້ງຄ່າ request ການ render ໃໝ່.
* React ຈັດເກັບ state ພາຍນອກ component ຂອງທ່ານ, ຄືກັບວ່າຢູ່ໃນຊັ້ນວາງ.
* ເມື່ອທ່ານເອີ້ນໃຊ້ `useState`, React ຈະສະແດງ snapshot ຂອງ state *ສຳລັບການ render ນັ້ນ*.
* ຕົວແປ ແລະ event handler ບໍ່ "survive" ການ render ໃໝ່. ການ render ທຸກຄັ້ງຈະມີ event handler ຂອງໂຕເອງ.
* ທຸກການ render (ແລະ ຟັງຊັ່ນພາຍໃນ) ຈະ "ເຫັນ" snapshot ຂອງ state ທີ່ React ໃຫ້ກັບການ ຳrender *ນັ້ນ* ສະເໝີ.
* ທ່ານສາມາດແທນທີ່ state ໃນ event handler ໄດ້ ເຊັ່ນດຽວກັບວິທີທີ່ທ່ານຄິດກ່ຽວກັບ JSX ທີ່ render.
* Event handler ທີ່ຖືກສ້າງຂຶ້ນໃນອະດີດມີຄ່າ state ຈາກການ render ທີ່ສ້າງຂຶ້ນ.

</Recap>



<Challenges>

#### Implement ໄຟສັນຍານຈາລະຈອນ {/*implement-a-traffic-light*/}

ນີ້ແມ່ນ component ໄຟທາງມ້າລາຍທີ່ຈະສະຫຼັບກັນເມື່ອກົດປຸ່ມ:

<Sandpack>

```js
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
```

```css
h1 { margin-top: 20px; }
```

</Sandpack>

ເພິ່ມ `alert` ໃຫ້ກັບ click handler. ເມື່ອໄຟເປັນສີ່ຂຽວ ແລະ ບອກວ່າ "Walk", ການຄິກປຸ່ມຄວນບອກວ່າ "Stop is next". ເມື່ອໄຟເປັນສີ່ແດງ ແລະ ບອກວ່າ "Stop", ການຄິກປຸ່ມຄວນບອກວ່າ "Walk is next".

ມັນສ້າງຄວາມແຕກຕ່າງ ຫຼື ບໍ່ວ່າທ່ານຈະໃສ່ `alert` ກ່ອນ ຫຼື ຫຼັງການເອີ້ນໃຊ້ `setWalk` ຫຼື ບໍ່?

<Solution>

`alert` ຂອງທ່ານຄວນມີລັກສະນະດັ່ງນີ້

<Sandpack>

```js
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
    alert(walk ? 'Stop is next' : 'Walk is next');
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
```

```css
h1 { margin-top: 20px; }
```

</Sandpack>

ບໍ່ວ່າທ່ານຈະໃສ່ກ່ອນ ຫຼື້ ຫຼັງການເອີ້ນໃຊ້ `setWalk` ກໍບໍ່ແຕກຕ່າງກັນ. ຄ່າການ render ຂອງ `walk` ໄດ້ຮັບການແກ້ໄຂແລ້ວ. ການເອີ້ນໃຊ້ `setWalk` ຈະປ່ຽນແປງສຳລັບການ render *ຕໍ່ໄປ* ເທົ່ານັ້ນ, ແຕ່ຈະບໍ່ສົ່ງຜົນຕໍ່ event handler ຈາກການ render ກ່ອນໜ້າ.

ແຖວນີ້ອາດຈະຂັດກັບຄວາມເຊື່ອໃນຕອນທຳອິດ:

```js
alert(walk ? 'Stop is next' : 'Walk is next');
```

ແຕ່ມັນສົມເຫດສົມຜົນຖ້າທ່ານອ່ານວ່າ: "ຖ້າໄຟຈາລະຈອນສະແດງ 'Walk now', ຂໍ້ຄວາມຄວນລະບຸວ່າ 'Stop is next.'" ຕົວແປ `walk` ພາຍໃນ event handler ກົງກັບຄ່າ render ຂອງ `walk` ແລະ ບໍ່ປ່ຽນແປງ.

ທ່ານສາມາດກວດສອບວ່າຖືກຕ້ອງໂດຍໃຊ້ວິທີການແທນທີ່. ເມື່ອ `walk` ເປັນ `true`, ທ່ານຈະໄດ້:
You can verify that this is correct by applying the substitution method. When `walk` is `true`, you get:

```js
<button onClick={() => {
  setWalk(false);
  alert('Stop is next');
}}>
  Change to Stop
</button>
<h1 style={{color: 'darkgreen'}}>
  Walk
</h1>
```

ດັ່ງນັ້ນການຄິກ "Change to Stop" ຈະຈັດຄິວການ render ໂດຍຕັ້ງຄ່າ `walk` ເປັນ `false`, ແລະ ແຈ້ງເຕືອນວ່າ "Stop is next".

</Solution>

</Challenges>
