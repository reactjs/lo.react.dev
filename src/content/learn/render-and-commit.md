---
title: Render ແລະ Commit
---

<Intro>

ກ່ອນທີ່ component ຂອງທ່ານຈະສະແດງເທິງໜ້າຈໍ, ຈະຕ້ອງ render ໂດຍ React. ການທຳຄວາມເຂົ້າໃຈໃນຂະບວນການນີ້ຈະຊ່ວຍໃຫ້ທ່ານຄິດຫາວິທີ execute code ແລະ ອະທິບາຍວິທີການເຮັດວຽກຂອງມັນໄດ້.

</Intro>

<YouWillLearn>

* ການ render ໃນ React ແມ່ນຫຍັງ
* ເມື່ອໃດ ແລະ ຍ້ອນຫຍັງ React ຈຶ່ງ render component
* ຂັ້ນຕອນທີ່ກ່ຽວຂ້ອງໃນການສະແດງ component ເທິງໜ້າຈໍ
* ເປັນຫຍັງການ render ຈຶ່ງບໍ່ສ້າງການອັບເດດ DOM ທຸກຄັ້ງ

</YouWillLearn>

ກ່ອນ Component ຂອງທ່ານຈະສະແດງເທິງໜ້າຈໍ, ມັນຕ້ອງ render ໂດຍ React. ການທຳຄວາມເຂົ້າໃຈຂັ້ນຕອນຕ່າງໆ ໃນຂະບວນການນີ້ຈະຊ່ວຍໃຫ້ທ່ານຄິດເຖິງວິທີທີ່ code execute ແລະ ອະທິບາຍລັກສະນະການເຮັດວຽກຂອງມັນໄດ້.

ຈິນຕະນາການວ່າ component ຂອງທ່ານແມ່ນພໍ່ຄົວໃນເຮືອນຄົວ, ກຳລັງເຮັດອາຫານຈານແຊບຈາກວັດຖຸດິບ. ໃນສະຖານະການສົມມຸດນີ້, React ແມ່ນພະນັກງານເສີບທີ່ສົ່ງຄຳຮ້ອງຈາກລູກຄ້າ ແລະ ນຳຄຳສັ່ງນັ້ນມາໃຫ້. ຂະບວນການຂໍ ແລະ ໃຫ້ບໍລິການ UI ມີສາມຂັ້ນຕອນ:

1. **ການ Trigger** render (ສົ່ງອາຫານຕາມສັ່ງໄປທີເຮືອນຄົວ)
2. **ການ Render** component (ກຽມອາຫານໃນເຮືອນຄົວ)
3. **ການ Commit** to the DOM (ສົ່ງອາຫານໄປທີ່ໂຕະ)

<IllustrationBlock sequential>
  <Illustration caption="Trigger" alt="React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="Render" alt="The Card Chef gives React a fresh Card component." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Commit" alt="React delivers the Card to the user at their table." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

## ຂັ້ນຕອນທີ 1: ການ Trigger render {/*step-1-trigger-a-render*/}

ມີສອງເຫດຜົນສຳລັບ component ໃນການ render:

1. ເປັນ **ການ render ເລີ່ມຕົ້ນ.** ຂອງ component
2. State **ຂອງ component (ຫຼື ໜຶ່ງໃນບັນພະບູລຸດຂອງມັນ) ໄດ້ຮັບການອັບເດດແລ້ວ.**

### ການ render ເລີ່ມຕົ້ນ {/*initial-render*/}

ເມື່ອແອັບຂອງທ່ານເລີ່ມເຮັດວຽກ, ທ່ານຈະຕ້ອງ trigger ການ render ເລີ່ມຕົ້ນ. Framework ແລະ sandbox ບາງເທື່ອຈະເຊື່ອງ code ນີ້, ແຕ່ເຮັດໄດ້ໂດຍການເອີ້ນ [`createRoot`](/reference/react-dom/client/createRoot) ກັບ DOM node ເປົ້າໝາຍ , ຈາກນັ້ນຈະເອີ້ນ method `render` ດ້ວຍ component ຂອງທ່ານ:

<Sandpack>

```js src/index.js active
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

```js src/Image.js
export default function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

</Sandpack>

ລອງ comment ໃນການເອີ້ນ `root.render()` ແລະ ເບິ່ງວ່າ component ນັ້ນຫາຍໄປ!

### ການ render ໃໝ່ເມື່ອ state ມີການອັບເດດ {/*re-renders-when-state-updates*/}

ເມື່ອ component ຂອງທ່ານໄດ້ຮັບການ render ທຳອິດແລ້ວ, ທ່ານສາມາດ trigger ການ render ເພີ່ມເຕີມໄດ້ໂດຍການອັບເດດ state ດ້ວຍ [ຟັງຊັ່ນ `set`.](/reference/react/useState#setstate) ການອັບເດດ state ຂອງ component ຈະຈັດການຄິວການ render ໂດຍອັດຕະໂນມັດ. (ຈິນຕະນາການວ່າແຂກໃນຮ້ານອາຫານສັ່ງຊາ, ຂອງຫວານ ແລະ ສິ່ງຕ່າງໆ ຫຼັງຈາກສັ່ງອາຫານເທື່ອທຳອິດ, ຂຶ້ນຢູ່ກັບລະດັບຂອງຄວາມກະຫາຍ ຫຼື ຄວາມຫິວ.)

<IllustrationBlock sequential>
  <Illustration caption="State update..." alt="React as a server in a restaurant, serving a Card UI to the user, represented as a patron with a cursor for their head. They patron expresses they want a pink card, not a black one!" src="/images/docs/illustrations/i_rerender1.png" />
  <Illustration caption="...triggers..." alt="React returns to the Component Kitchen and tells the Card Chef they need a pink Card." src="/images/docs/illustrations/i_rerender2.png" />
  <Illustration caption="...render!" alt="The Card Chef gives React the pink Card." src="/images/docs/illustrations/i_rerender3.png" />
</IllustrationBlock>

## ຂັ້ນຕອນທີ 2: React render component ຂອງທ່ານ {/*step-2-react-renders-your-components*/}

ຫຼັງຈາກທີ່ທ່ານ trigger ການ render, React ຈະເອີ້ນ component ຂອງທ່ານເພື່ອເບິ່ງວ່າຈະສະແດງຫຍັງແນ່ເທິງໜ້າຈໍ. **"ການ render" ແມ່ນ React ເອີ້ນໃຊ້ component ຂອງທ່ານ.**

* **ໃນການ render ເລີ່ມຕົ້ນ,** React ຈະເອີ້ນໃຊ້ root component.
* **ສຳລັບການ render ທີ່ຕາມມາ,** React ຈະເອີ້ນໃຊ້ component ຂອງຟັງຊັ່ນເຊິ່ງການອັບເດດ state ຈະ trigger ການ render.

ຂະບວນການນີ້ເປັນແບບເອີ້ນຊໍ້າ: ຖ້າ component ທີ່ອັບເດດ return component ອື່ນ, React ຈະ render component _ນັ້ນ_ ຕໍ່ໄປ, ແລະ ຖ້າ component ນັ້ນ return ບາງຢ່າງ, ມັນຈະ render component _ນັ້ນ_ ຕໍ່ໄປ, ແລະ ອື່ນໆ. ຂະບວນການຈະດຳເນີນຕໍ່ໄປຈົນກວ່າຈະບໍ່ມີ component ທີ່ຊ້ອນກັນອີກຕໍ່ໄປ ແລະ React ຮູ້ວ່າແມ່ນຫຍັງຈະສະແດງເທິງໜ້າຈໍ.

ໃນຕົວຢ່າງຕໍ່ໄປນີ້, React ຈະເອີ້ນໃຊ້ `Gallery()` ແລະ `Image()` ຫຼາຍຄັ້ງ:

<Sandpack>

```js src/Gallery.js active
export default function Gallery() {
  return (
    <section>
      <h1>Inspiring Sculptures</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

```js src/index.js
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Gallery />);
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

* **ລະຫວ່າງການ render ເລີ່ມຕົ້ນ,** React ຈະ [ສ້າງ DOM nodes](https://developer.mozilla.org/docs/Web/API/Document/createElement) ສຳລັບ `<section>`, `<h1>`, ແລະ ສາມແທັກ `<img>`.
* **ລະຫວ່າງການ render ໃໝ່,** React ຈະຄຳນວນວ່າ property ໃດຂອງພວກມັນ (ຖ້າມີ) ມີການປ່ຽນແປງຕັ້ງແຕ່ການ render ຄັ້ງກ່ອນ. ມັນຈະບໍ່ເຮັດຫຍັງກັບຂໍ້ມູນນັ້ນຈົນກວ່າຈະເຖິງຂັ້ນຕອນຕໍ່ໄປ, ຂັ້ນຕອນການ commit.

<Pitfall>

ການ render ຕ້ອງເປັນ [ການຄຳນວນ pure](/learn/keeping-components-pure):

* **input ດຽວກັນ, output ດຽວກັນ.** ເມື່ອພິຈາລະນາ input ດຽວກັນ, component ຄວນຈະ return ຄ່າ JSX ດຽວກັນສະເໝີ . (ເມື່ອມີຄົນສັ່ງສະລັດກັບໝາກເລັ່ນ, ພວກເຂົາບໍ່ຄວນໄດ້ຮັບສະລັດກັບຫອມບົວ!)
* **ຄຳນຶງເຖິງເລື່ອງຕົວເອງ.** ມັນຄວນບໍ່ປ່ຽນແປງ object ຫຼື ຕົວແປໃດໆ ທີ່ມີກ່ອນການ render. (ຄຳສັ່ງດຽວບໍ່ຄວນປ່ຽນຄຳສັ່ງຂອງຄົນອື່ນ.)

ຖ້າບໍ່ດັ່ງນັ້ນ, ທ່ານອາດຈະພົບ bug ທີ່ນ່າສັບສົນ ແລະ ພຶດທິກຳທີ່ຄາດເດົາບໍ່ໄດ້ເມື່ອ codebase ຂອງທ່ານມີຄວາມຊັບຊ້ອນຫຼາຍເກີນໄປ. ເມື່ອພັດທະນາໃນ "Strict Mode", React ຈະເອີ້ນໃຊ້ແຕ່ລະຟັງຊັ່ນຂອງ component ສອງຄັ້ງ, ເຊິ່ງສາມາດຊ່ວຍຫາຂໍ້ຜິດພາດເບື້ອງຕົ້ນທີ່ອາດຈະເກີດຂຶ້ນຈາກຟັງຊັ່ນທີ່ບໍ່ pure ໄດ້.

</Pitfall>

<DeepDive>

#### Optimizing performance {/*optimizing-performance*/}

ລັກສະນະການເຮັດວຽກເລີ່ມຕົ້ນຂອງການ render component ທັງໝົດທີຊ້ອນກັນຢູ່ພາຍໃນ component ທີ່ອັບເດດແລ້ວບໍ່ເໝາະສົມສຳລັບປະສິດທິພາບ ຖ້າ component ທີ່ອັບເດດແລ້ວນັ້ນຢູ່ສູງຫຼາຍໃນ tree. ຫາກທ່ານພົບບັນຫາດ້ານປະສິດທິພາບ, ມີວິທີເລືອກໃຊ້ຫຼາຍວິທີໃນການແກ້ໄຂບັນຫາຕາມທີ່ອະທິບາຍໄວ້ໃນຫົວຂໍ້ [ປະສິດທິພາບ](https://reactjs.org/docs/optimizing-performance.html). **ຢ່າເພີ່ມປະສິດທິພາບກ່ອນເວລາອັນຄວນ!** 

</DeepDive>

## ຂັ້ນຕອນທີ 3: React commit ການປ່ຽນແປງກັບ DOM {/*step-3-react-commits-changes-to-the-dom*/}

ຫຼັງຈາກການ render (ການເອີ້ນໃຊ້) component ຂອງທ່ານ, React ຈະແກ້ໄຂ DOM.

* **ສຳລັບການ render ເລີ່ມຕົ້ນ,** React ຈະໃຊ້ [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild)  DOM API ເພື່ອວາງ DOM node ທັງໝົດ ມັນຖືກສ້າງຂຶ້ນເທິງໜ້າຈໍ.
* **ສຳລັບການ render ໃໝ່,** React ຈະໃຊ້ການດຳເນີນການທີ່ຈຳເປັນໜ້ອຍທີ່ສຸດ (ຄຳນວນຂະນະ render!) ເພື່ອເຮັດໃຫ້ DOM ກົງກັບ output ການ render ຫຼ້າສຸດ.

**React ຈະປ່ຽນ DOM node ກໍຕໍ່ເມື່ອມີຄວາມແຕກຕ່າງລະຫວ່າງການ render ເທົ່ານັ້ນ.** ຕົວຢ່າງ, ນີ້ແມ່ນ component ທີ່ render ໃໝ່ດ້ວຍ prop ແຕກຕ່າງທີ່ຖືກສົ່ງຜ່ານມາຈາກ parent ທຸກໆວິນາທີ. ສັງເກດວິທີທີ່ທ່ານສາມາດເພີ່ມຂໍ້ຄວາມລົງໃນ `<input>`, ອັບເດດ `value` ຂອງມັນ, ແຕ່ຂໍ້ຄວາມຈະບໍ່ຫາຍໄປເມື່ອ component ມີການ render ໃໝ່:

<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

```js src/App.js hidden
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
  return (
    <Clock time={time.toLocaleTimeString()} />
  );
}
```

</Sandpack>

ມັນເຮັດວຽກໄດ້ເພາະໃນຂັ້ນຕອນສຸດທ້າຍນີ້, React ຈະອັບເດດເນື້ອຫາຂອງ `<h1>` ດ້ວຍ `time` ໃໝ່ເທົ່ານັ້ນ. ເຫັນວ່າ `<input>` ປະກົດໃນ JSX ໃນຕຳແໜ່ງດຽວກັນກັບຄັ້ງກ່ອນ, ສະນັ້ນ React ຈະບໍ່ແຕະ `<input>`-ຫຼື `value` ຂອງມັນ!
## ບົດສົ່ງທ້າຍ: ລະບາຍສີເທິງ Browser {/*epilogue-browser-paint*/}

ຫຼັງຈາກການ render ສຳເລັດແລ້ວ ແລະ React ອັບເດດ DOM ແລ້ວ, ບາວເຊີຈະທາສີໜ້າຈໍໃໝ່. ເຖິງວ່າຂະບວນການນີ້ເອີ້ນວ່າ "browser rendering", ແຕ່ເຮົາຈະເອີ້ນວ່າ "ການລະບາຍສີ" ເພື່ອຫຼີກຫຼ່ຽງຄວາມສັບສົນໃນເອກະສານ.

<Illustration alt="A browser painting 'still life with card element'." src="/images/docs/illustrations/i_browser-paint.png" />

<Recap>

* ການອັບເດດໜ້າຈໍໃດໆໃນແອັບ React ແມ່ນເກີດຈາກ 3 ຂັ້ນຕອນ:
  1. ການ Trigger
  2. ການ Render
  3. ການ Commit
* ທ່ານສາມາດໃຊ້ Strict Mode ເພື່ອຄົ້ນຫາຂໍ້ຜິດພາດໃນ component ຂອງທ່ານ
* React ຈະບໍ່ແຕະ DOM ຖ້າຜົນຂອງການ render ບໍ່ຄືກັບຄັ້ງທີ່ຜ່ານມາ

</Recap>

