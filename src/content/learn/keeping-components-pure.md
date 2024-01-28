---
title: ເຮັດໃຫ້ Components Pure
---

<Intro>

ບາງຟັງຊັ່ນ JavaScript ແມ່ນ *pure.* ຟັງຊັ່ນ Pure ເຮັດການຄຳນວນເທົ່ານັ້ນ ແລະ ບໍ່ມີຫຍັງເພີ່ມເຕີມ. ການຂຽນ component ຂອງທ່ານໃຫ້ເປັນຟັງຊັ່ນ pure ເທົ່ານັ້ນຢ່າງເຄັ່ງຄັດ, ທ່ານສາມາດຫຼີກລ່ຽງຂໍ້ຜິດພາດທັງ class ແລະ ສິ່ງທີ່ຄາດບໍ່ເຖິງເມື່ອ codebase ຂອງທ່ານໃຫຍ່ຂຶ້ນ. ເພື່ອໃຫ້ໄດ້ຮັບຜົນປະໂຫຍດເຫຼົ່ານີ້, ມີກົດຢູ່ສອງສາມຂໍ້ທີ່ທ່ານຕ້ອງປະຕິບັດ.

</Intro>

<YouWillLearn>

* Pure ແມ່ນຫຍັງ ແລະ ຊ່ວຍໃຫ້ທ່ານຫຼີກລ່ຽງຂໍ້ຜິດພາດໄດ້ແນວໃດ
* ວິທີເຮັດໃຫ້ component pure ໂດຍການປ້ອງກັນການປ່ຽນແປງຈາກຂັ້ນຕອນການສະແດງຜົນ
* ວິທີໃຊ້ Strict MOde ເພື່ອຫາຂໍ້ຜິດພາດໃນ component ຂອງທ່ານ

</YouWillLearn>

## ຄວາມ Pure: Components ເປັນ formulas {/*purity-components-as-formulas*/}

ໃນວິທະຍາສາດຄອມພີວເຕີ (ແລະ ໂດຍສະເພາະຄຳສັບຂອງ functinal programming), [pure function](https://wikipedia.org/wiki/Pure_function) ເປັນຟັງຊັ່ນທີ່ມີລັກສະນະດັ່ງນີ້:

* **ມັນຄິດເຖິງເລື່ອງຂອງໂຕເອງ.** ມັນຈະບໍ່ປ່ຽນແປງ object ຫຼື ຕົວແປໃດໆທີ່ມີຢູ່ກ່ອນຈະຖືກເອີ້ນ.
* **Input ດຽວກັນ, output ດຽວກັນ.** ເມື່ອພິຈາລະນາ input ດຽວກັນຟັງຊັ່ນ pure ຄວນ return ຜົນລັບດຽວກັນສະເໝີ.

ທ່ານອາດຄຸ້ນເຄີຍກັບຕົວຢ່າງໜຶ່ງຂອງຟັງຊັ່ນ pure: ສູດທາງຄະນິດສາດ.

ພິຈາລະນາສູດຄະນິດສາດນີ້: <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>.

ຖ້າ <Math><MathI>x</MathI> = 2</Math> ແລ້ວ <Math><MathI>y</MathI> = 4</Math>. ສະເໝີ. 

ຖ້າ <Math><MathI>x</MathI> = 3</Math> ແລ້ວ <Math><MathI>y</MathI> = 6</Math>. ສະເໝີ. 

ຖ້າ <Math><MathI>x</MathI> = 3</Math>, <MathI>y</MathI> ບາງເທື່ອຈະບໍ່ເປັນ <Math>9</Math> ຫຼື <Math>–1</Math> ຫຼື <Math>2.5</Math> ຂຶ້ນກັບຊ່ວງເວລາຂອງວັນ ຫຼື ສະຖານະການຂອງຕະຫຼາດຫຸ້ນ. 

ຖ້າ <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> ແລະ <Math><MathI>x</MathI> = 3</Math>, <MathI>y</MathI> ຈະເປັນ <Math>6</Math>  _ຢູ່ສະເໝີ_. 

ຖ້າເຮົາເອົາເຂົ້າເປັນຟັງຊັ່ນ JavScript, ໜ້າຕາຈະປະມານນີ້:

```js
function double(number) {
  return 2 * number;
}
```

ໃນຕົວຢ່າງດ້ານເທິງ, `double` ເປັນ **ຟັງຊັ່ນ pure.** ຖ້າທ່ານສົ່ງ `3`, ມັນຈະ return `6`. ສະເໝີ.

React ໄດ້ຮັບການອອກແບບຕາມແນວຄິດນີ້. **React ຈະຖືວ່າທຸກ component ທີ່ທ່ານຂຽນເປັນຟັງຊັ່ນ pure.** ເຊິ່ງໝາຍຄວາມວ່າ component React ທີ່ທ່ານຂຽນຈະຕ້ອງ return ຄ່າ JSX ດຽວກັນສະເໝີເມື່ອໄດ້ຮັບ input ດຽວກັນ:

<Sandpack>

```js src/App.js
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
```

</Sandpack>

ເມື່ອທ່ານສົ່ງ `drinker={2}` ຫາ `Recipe`. ມັນຈະ return JSX ທີ່ປະກອບມີ `2 cups of water`. ສະເໝີ.

ຖ້າທ່ານສົ່ງ `drinkers={4}`, ມັນຈະ return JSX ທີ່ປະກອບມີ `4 cups of water`. ສະເໝີ.

ຄືກັບສູດຄະນິດສາດ.

ທ່ານສາມາດຄິດວ່າ component ຂອງທ່ານເປັນສູດອາຫານ: ຖ້າທ່ານເຮັດຕາມ ແລະ ບໍ່ເພີ່ມສ່ວນປະສົມໃໝ່ລະຫວ່າງຂັ້ນຕອນການເຮັດອາຫານ, ທ່ານຈະໄດ້ອາຫານຈານເກົ່າທຸກເທື່ອ. "ຈານ" ເປັນ JSX ທີ່ component ເຮັດໜ້າທີ່ຕອບສະໜອງຕໍ່ React ເພື່ອ [ສະແດງຜົນ.](/learn/render-and-commit)

<Illustration src="/images/docs/illustrations/i_puritea-recipe.png" alt="A tea recipe for x people: take x cups of water, add x spoons of tea and 0.5x spoons of spices, and 0.5x cups of milk" />

## ຜົນຂ້າງຄຽງ: ຜົນທີ່ຕາມມາ(ໂດຍບໍ່ໄດ້ຕັ້ງໃຈ) {/*side-effects-unintended-consequences*/}

ຂະບວນການສະແດງຜົນຂອງ React ຕ້ອງ pure ຢຸ່ສະເໝີ. Component ຄວນ *return* JSX ຂອງມັນເທົ່ານັ້ນ, ແລະ ບໍ່ *ປ່ຽນແປງ* object ຫຼື ຕົວແປໃດໆທີ່ມີຢູ່ກ່ອນໜ້າການສະແດງຜົນ-ເຊິ່ງຈະເຮັດໃຫ້ມັນບໍ່ pure!

ນີ້ແມ່ນ component ທີ່ຝ່າຝືນກົດນີ້:

<Sandpack>

```js
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
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

Component ນີ້ກຳລັງອ່ານ ແລະ ຂຽນຕົວແປ `guest` ທີ່ປະກາດໄວ້ທາງນອກ. ໝາຍຄວາມວ່າ **ການເອີ້ນ component ນີ້ຫຼາຍເທື່ອມັນຈະສ້າງ JSX ທີ່ແຕກຕ່າງກັນ!** ແລະ ຫຼາຍໄປກວ່ານັ້ນ, ຖ້າ component _ອື່ນ_ ເອີ້ນ `guest`, ມັນຈະສ້າງ JSX ທີ່ແຕກຕ່າງກັນເຊັ່ນດຽວກັນ, ທັງນີ້ຂຶ້ນກັບເວລາສະແດງຜົນ! ນັ້ນບໍ່ສາມາດຄາດເດົາໄດ້.

ກັບມາທີ່ສູດຂອງເຮົາ <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>, ເຖິງວ່າຖ້າ <Math><MathI>x</MathI> = 2</Math>, ພວກເຮົາບໍ່ສາມາດເຊື່ອໄດ້ວ່າ <Math><MathI>y</MathI> = 4</Math>. ການທົດສອບຂອງພວກເຮົາຈະບໍ່ສຳເລັດ, ຜູ້ໃຊ້ຂອງເຮົາອາດຈະງົງ, ຄືກັບຍົນຈະຕົກລົງມາຈາກທ້ອງຟ້າ-ທ່ານຈະເຫັນໄດ້ວ່າສິ່ງນີ້ຈະເຮັດໃຫ້ເກີດຂໍ້ຜິດພາດທີ່ສັບສົນໄດ້ແນວໃດ!

ທ່ານສາມາດແກ້ໄຂ component ນີ້ໄດ້ໂດຍ [ການສົ່ງ `guest` ເປັນ prop ແທນ](/learn/passing-props-to-a-component):

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
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

ປັດຈຸບັນ component ຂອງທ່ານ pure, ເນື່ອງຈາກສິ່ງທີ່ JSX ມັນ return ຂຶ້ນກັບ prop `guest` ເທົ່ານັ້ນ.

ໂດຍທົ່ວໄປ, ທ່ານບໍ່ຄວນຄາດຫວັງໃຫ້ component ຂອງທ່ານສະແດງຜົນຕາມລຳດັບສະເພາະໃດໆ. ມັນບໍ່ສຳຄັນວ່າທ່ານຈະເອີ້ນ <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> ກ່ອນ ຫຼື ຫຼັງ <Math><MathI>y</MathI> = 5<MathI>x</MathI></Math>: ສູດທັງສອງຈະແຍກອອກຈາກກັນ. ໃນວິທີດຽວກັນ, ແຕ່ລະ component ຄວນ "ຄິດເພື່ອໂຕເອງເທົ່ານັ້ນ", ແລະ ບໍ່ພະຍາຍາມປະສານ ຫຼື ເພິ່ງພາຜູ້ອື່ນໃນລະຫວ່າງການ render. ການ render ກໍຄືກັບບົດເສັງໃນໂຮງຮຽນ: ແຕ່ລະ component ຄວນຄຳນວນ JSX ດ້ວຍໂຕເອງ!

<DeepDive>

#### ການກວດສອບຫາການຄຳນວນທີ່ບໍ່ pure ດ້ວຍ Strict Mode {/*detecting-impure-calculations-with-strict-mode*/}

ເຖິງວ່າທ່ານອາດຈະຍັງບໍ່ໄດ້ໃຊ້ທັງໝົດ, ແຕ່ໃນ React ມີ input ສາມປະເພດທີ່ທ່ານສາມາດອ່ານໃນຂະນະ render [props](/learn/passing-props-to-a-component), [state](/learn/state-a-components-memory), ແລະ [context.](/learn/passing-data-deeply-with-context) ທ່ານຄວນຖືວ່າ input ເຫຼົ່ານີ້ມີໄວ້ສະເພາະ read-only ສະເໝີ.

ເມື່ອທ່ານຕ້ອງການ *ປ່ຽນ* ບາງຢ່າງຕາມ user input, ທ່ານຄວນໃຊ້ [set state](/learn/state-a-components-memory) ແທນການຂຽນໄປຍັງຕົວແປ. ທ່ານບໍ່ຄວນປ່ຽນຕົວແປ ຫຼື object ທີ່ມີຢູ່ກ່ອນໃນຂະນະ component ຂອງທ່ານກຳລັງ render.

React ມີ "Strict Mode" ເຊິ່ງຈະເອີ້ນຟັງຊັ່ນຂອງແຕ່ລະ Component ສອງຄັ້ງລະຫວ່າງການພັດທະນາ. **ໂດຍການເອີ້ນຟັງຊັ່ນ component ສອງຄັ້ງ, Strict Mode ຈະຊ່ວຍຄົ້ນຫາ component ທີ່ຝ່າຝືນກົດເຫຼົ່ານີ້.**

ສັງເກດວ່າຕົວຢ່າງເກົ່າທີ່ສະແດງ "Guest #2", "Guest #4" ແລະ "Guest #6" ແທນ "Guest #1", "Guest #2", ແລະ "Guest #3". ຟັງຊັ່ນເດີມແມ່ນບໍ່ pure, ດັ່ງນັ້ນການເອີ້ນໃຊ້ມັນສອງຄັ້ງຈຶ່ງພັງ. ແຕ່ເວີຊັ່ນ pure ຈະເຮັດວຽກເຖິງວ່າຟັງຊັ່ນຈະຖືກເອີ້ນໃຊ້ສອງຄັ້ງທຸກຄັ້ງ. **ຟັງຊັ່ນ pure ຈະຄຳນວນເທົ່ານັ້ນ, ສະນັ້ນການເອີ້ນໃຊ້ມັນສອງຄັ້ງຈະບໍ່ປ່ຽນແປງຫຍັງ**--ຄືກັນກັບການເອີ້ນ `double(2)` ສອງຄັ້ງບໍ່ປ່ຽນແປງສິ່ງທີ່ return, ແລະ ການແກ້ໄຂ <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> ສອງຄັ້ງບໍ່ໄດ້ປ່ຽນ <MathI>y</MathI> ແມ່ນຫຍັງ. Input ດຽວກັນ, output ດຽວກັນສະເໝີ.

Strict Mode ບໍ່ມີຜົນຫຍັງໃນ production, ດັ່ງນັ້ນຈຶ່ງບໍ່ເຮັດໃຫ້ແອັບຊ້າລົງສຳລັບຜູ້ໃຊ້ຂອງທ່ານ. ຫາກຕ້ອງເລືອກໃຊ້ Strict Mode, ທ່ານສາມາດລວມ component root ຂອງທ່ານເປັນ `<React.StrictMode>`. ບາງ framework ແມ່ນເຮັດໂດຍເປັນຄ່າເລີ່ມຕົ້ນ.

</DeepDive>

### Local mutation: ຄວາມລັບເລັກໆນ້ອຍຂອງ Component ຂອງທ່ານ {/*local-mutation-your-components-little-secret*/}

ໃນຕົວຢ່າງດ້ານເທິງ, ບັນຫາຄື component ປ່ຽນຕົວແປ *ທີ່ມີຢູ່ກ່ອນແລ້ວ* ໃນຂະນະ render. ເຊິ່ງມັກເອີ້ນວ່າ **"mutation"** ເພື່ອໃຫ້ຟັງແລ້ວນ່າຢ້ານຂຶ້ນ. ຟັງຊັ່ນ pure ຈະບໍ່ mutate ຕົວແປນອກຂອບເຂດຂອງຟັງຊັ່ນ ຫຼື object ທີ່ຖືກສ້າງກ່ອນຖືກເອີ້ນໃຊ້-ເຮັດໃຫ້ຕົວແປເຫຼົ່ານັ້ນບໍ່ pure! 

ເຖີງຢ່າງໃດກໍຕາມ, **ມັນເປັນເລື່ອງປົກະຕິທີ່ຈະປ່ຽນຕົວແປ ແລະ object ທີ່ທ່ານ *ຫາກໍ* ສ້າງຂຶ້ນໃນລະຫວ່າງການ render.** ໃນຕົວຢ່າງນີ້, ທ່ານສ້າງ array `[]`, ກຳນົດໃຫ້ຕົວແປ `cups` ແລ້ວຕາມດ້ວຍ `push` dozen cups ເຂົ້າໄປ:

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

</Sandpack>

ຖ້າຕົວແປ `cups` ຫຼື array `[]` ຖືກສ້າງຢູ່ນອກຟັງຊັ່ນ `TeaGathering`, ນີ້ອາດເປັນບັນຫາໃຫຍ່! ທ່ານຈະປ່ຽນ object *ທີ່ມີຢູ່ແລ້ວ* ໂດຍການ push item ເຂົ້າໄປໃນ array.

ເຖິງຢ່າງໃດກໍຕາມ, ບໍ່ເປັນຫຍັງຖ້າທ່ານສ້າງ *ລະຫວ່າງການ render ດຽວກັນ*, ພາຍໃນ `TeaGathering`. ບໍ່ມີ code ຢູ່ດ້ານນອກຂອງ `TeaGathering` ຈະຮູ້ວ່າສິ່ງນີ້ເກີດຂຶ້ນ. ນີ້ເອີ້ນວ່າ **"local mutation"**-ມັນເໝືອນກັບຄວາມລັບເລັກໆນ້ອຍຂອງ component ຂອງທ່ານ.

## ບ່ອນທີ່ທ່ານ _ສາມາດ_ ເຮັດໃຫ້ເກີດຜົນຂ້າງຄຽງ {/*where-you-_can_-cause-side-effects*/}

ໃນຂະນະທີ່ functional programming ຕ້ອງອາໄສຄວາມ pure ເປັນຢ່າງຫຼາຍ, ໃນບາງຈຸດ,​ບາງບ່ອນ _ບາງສິ່ງ_ ກໍຕ້ອງປ່ຽນແປງ. ນີ້ເປັນຈຸດປະສົງຂອງການຂຽນໂປຣແກຣມ! ການປ່ຽນແປງເຫຼົ່ານີ້-ການອັບເດດໜ້າຈໍ, ການເລີ່ມ animation, ການປ່ຽນແປງຂໍ້ມູນ-ເອີ້ນວ່າ **ຜົນຂ້າງຄຽງ.** ສິ່ງເຫຼົ່ານີ້ຄືສິ່ງທີ່ເກີດຂຶ້ນ _"ດ້ານຂ້າງ"_ ບໍ່ແມ່ນລະຫວ່າງການສະແດງຜົນ.

ໃນ React, **ຜົນຂ້າງຄຽງມັກຈະຢູ່ໃນ [event handlers.](/learn/responding-to-events)** Event handler ແມ່ນຟັງຊັ່ນທີ່ React ເຮັດວຽກເມື່ອທ່ານດຳເນີນການບາງຢ່າງ-ຕົວຢ່າງ, ເມື່ອທ່ານຄິກປຸ່ມ. ເຖິງວ່າ event handler ແມ່ນຖືກປະກາດ *ພາຍໃນ* component ຂອງທ່ານ, ມັນບໍ່ເຮັດວຽກ *ລະຫວ່າງ* ການສະແດງຜົນ! **ສະນັ້ນ event handler ບໍ່ຈຳເປັນຕ້ອງ pure.** 

ຫາກທ່ານໃຊ້ຕົວເລືອກອື່ນໝົດແລ້ວ ແລະ ບໍ່ພົບ event handler ທີ່ເໝາະສົມສຳລັບຜົນຂ້າງຄຽງຂອງທ່ານ, ທ່ານຍັງສາມາດແນບມັນກັບ JSX ທີ່ return ດ້ວຍການເອີ້ນ [`useEffect`](/reference/react/useEffect) ໃນ component ຂອງທ່ານ. ສິ່ງນີ້ຈະບອກໃຫ້ React ດຳເນີນການພາຍຫຼັງ, ຫຼັງຈາກການ render, ເມື່ອອະນຸຍາດໃຫ້ມີຜົນຂ້າງຄຽງ. **ເຖິງຢ່າງໃດກໍຕາມ, ວິທີນີ້ຄວນເປັນທາງເລືອກສຸດທ້າຍຂອງທ່ານ**

ເມື່ອເປັນໄປໄດ້, ພະຍາຍາມສະແດງ logic ຂອງທ່ານດ້ວຍການ render ພຽງຢ່າງດຽວ. ທ່ານຈະປະຫຼາດໃຈວ່າສິ່ງນີ້ສາມາດພາທ່ານໄປໄກໄດ້ສໍ່າໃດ!

<DeepDive>

#### ເປັນຫຍັງ React ຈຶ່ງສົນໃຈເລື່ອງ pure? {/*why-does-react-care-about-purity*/}

ການຂຽນຟັງຊັ່ນ pure ຕ້ອງໃຊ້ນິໄສ ແລະ ລະບຽບວິໄນ. ແຕ່ມັນຍັງປົດລ໋ອກໂອກາດທີ່ນ່າອັດສະຈັນອີກດ້ວຍ:

* Component ຂອງທ່ານສາມາດເຮັດວຽກໃນສະພາບແວດລ້ອມທີ່ແຕກຕ່າງກັນ-ຕົວຢ່າງ, ເທິງເຊີເວີ! ເນື່ອງຈາກ return ຜົນລັບດຽວກັນສຳລັບ input ດຽວກັນ, ໜຶ່ງ component ສາມາດຕອບສະໜອງຄຳຂໍຂອງຜູ້ໃຊ້ຈຳນວນຫຼາຍໄດ້.
* ທ່ານສາມາດປັບປຸງປະສິດທິພາບໄດ້ໂດຍ [ການຂ້າມການ render](/reference/react/memo) component ທີ່ບໍ່ມີການປ່ຽນແປງ input. ສິ່ງນີ້ປອດໄພເພາະຟັງຊັ່ນ pure ຈະ return ຜົນລັບດຽວກັນສະເໝີ, ດັ່ງນັ້ນຈຶ່ງປອດໄພສຳລັບການ cache.
* ຫາກຂໍ້ມູນບາງສ່ວນປ່ຽນແປງລະຫວ່າງການ render deep component tree, React ສາມາດເລີ່ມການ render ໃໝ່ໂດຍບໍ່ເສຍເວລາໃນການ render ທີ່ຫຼ້າສະໄໝໃຫ້ສຳເລັດ. Pure ເຮັດໃຫ້ປອດໄພທີ່ຈະຢຸດຄຳນວນໄດ້ທຸກເວລາ. 

ທຸກໆ Feature React ໃໝ່ທີ່ເຮົາກຳລັງໃຊ້ປະໂຫຍດຈາກຄວາມ pure. ຕັ້ງແຕ່ການດຶງຂໍ້ມູນໄປຈົນເຖິງພາບເຄື່ອນໄຫວຈົນເຖິງປະສິດທິພາບ, ການຮັກສາ pure component ຈະຊ່ວຍປົດລັອກພະລັງຂອງ React paradigm.

</DeepDive>

<Recap>

* Component ຕ້ອງ pure, ໝາຍຄວາມວ່າ:
  * **ມັນຄິດເຖິງເລື່ອງຂອງໂຕເອງ.** ບໍ່ຄວນປ່ຽນແປງ object ຫຼື ຕົວແປໃດໆທີ່ມີຢູ່ກ່ອນການ render.
  * **input ດຽວກັນ, output ດຽວກັນ.** ເມື່ອພິຈາລະນາ input ດຽວກັນ, component ຄວນ return JSX ດຽວກັນສະເໝີ.
* ການ render ສາມາດເກີດຂຶ້ນໄດ້ຕະຫຼອດເວລາ, ສະນັ້ນ component ບໍ່ຄວນຂຶ້ນກັບລຳດັບການສະແດງຜົນຂອງກັນ ແລະ ກັນ.
* ທ່ານບໍ່ຄວນ mutate input ໃດໆທີ່ component ຂອງທ່ານໃຊ້ສຳລັບການ render. ຊື່ງລວມ prop, state ແລະ context. ເພື່ອອັບເດດໜ້າຈໍ, ["set" state](/learn/state-a-components-memory) ແທນການ mutate object ທີ່ມີຢູ່ກ່ອນ.
* ພະຍາຍາມສະແດງ logic ຂອງ component ທ່ານໃນ JSX ທີ່ທ່ານ return. ເມື່ອທ່ານຕ້ອງການ "ປ່ຽນແປງສິ່ງ", ທ່ານມັກຈະຕ້ອງເຮັດ event handler. ເປັນທາງເລືອກສຸດທ້າຍ, ທ່ານສາມາດໃຊ້ `useEffect`
* ການຂຽນຟັງຊັ່ນ pure ຕ້ອງອາໄສການເຝິກຊ້ອມໜ້ອຍໜຶ່ງ, ແຕ່ຈະປົດລ໋ອກພະລັງຂອງ React paradigm.

</Recap>


  
<Challenges>

#### ແປງໂມງເພ {/*fix-a-broken-clock*/}

Component ນີ້ພະຍາຍາມຕັ້ງຄ່າ class CSS ຂອງ `<h1>` ເປັນ `"night"` ໃນຊ່ວງເວລາຕັ້ງແຕ່ທ່ຽງຄືນຫາຫົກຊົ່ວໂມງໃນຕອນເຊົ້າ, ແລະ `"day"` ໃນຊ່ວງເວລາອື່ນໆ. ເຖິງຢ່າງໃດກໍຕາມ, ມັນບໍ່ເຮັດວຽກ. ທ່ານສາມາດແກ້ໄຂ component ນີ້ໄດ້ ຫຼື ບໍ່?

ທ່ານສາມາດກວດສອບວ່າວິທີແກ້ໄຂຂອງທ່ານເຮັດວຽກໄດ້ ຫຼື ບໍ່ ໂດຍການປ່ຽນ timezone ຂອງຄອມພີວເຕີຊົ່ວຄາວ. ເມື່ອເວລາປັດຈຸບັນຢູ່ລະຫວ່າງທ່ຽງຄືນຮອດຫົກໂມງເຊົ້າ, ໂມງຄວນປ່ຽນສີ!

<Hint>

ການສະແດງຜົນເປັນ *ການຄຳນວນ*, ບໍ່ຄວນພະຍາຍາມ "ເຮັດ" ສິ່ງຕ່າງໆ. ທ່ານສາມາດສະແດງຄວາມຄິດດຽວກັນແຕກຕ່າງກັນໄດ້ ຫຼື ບໍ່?

</Hint>

<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  let hours = time.getHours();
  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
    </h1>
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
    <Clock time={time} />
  );
}
```

```css
body > * {
  width: 100%;
  height: 100%;
}
.day {
  background: #fff;
  color: #222;
}
.night {
  background: #222;
  color: #fff;
}
```

</Sandpack>

<Solution>

ທ່ານສາມາດແກ້ໄຂ component ນີ້ໄດ້ໂດຍການຄຳນວນ `className` ແລະ ລວມໄວ້ໃນຜົນລັບຂອງການ render:

<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  let hours = time.getHours();
  let className;
  if (hours >= 0 && hours <= 6) {
    className = 'night';
  } else {
    className = 'day';
  }
  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
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
    <Clock time={time} />
  );
}
```

```css
body > * {
  width: 100%;
  height: 100%;
}
.day {
  background: #fff;
  color: #222;
}
.night {
  background: #222;
  color: #fff;
}
```

</Sandpack>

ໃນຕົວຢ່າງນີ້, ຜົນຂ້າງຄຽງ (ການແກ້ໄຂ DOM) ບໍ່ຈຳເປັນ. ທ່ານຕ້ອງ return JSX ເທົ່ານັ້ນ

</Solution>

#### ແປງ profile ເພ {/*fix-a-broken-profile*/}

Component `Profile` ສອງລາຍການ render ຂ້າງກັນດ້ວຍຂໍ້ມູນທີ່ແຕກຕ່າງກັນ. ກົດ "Collapse" ໃນ profile ທຳອິດ, ຈາກນັ້ນ "Expand" ມັນ. ທ່ານຈະສັງເກດເຫັນວ່າທັງສອງ profile ສະແດງບຸກຄົນດຽວກັນ. ນີ້ຄື bug.

ຫາສາເຫດຂອງ bug ແລະ ແກ້ໄຂ.

<Hint>

Code ທີ່ມີ bug ແມ່ນຢູ່ໃນ `Profile.js`. ຢ່າລືມອ່ານທັງໝົດແຕ່ເທິງລົງລຸ່ມ!

</Hint>

<Sandpack>

```js src/Profile.js
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

let currentPerson;

export default function Profile({ person }) {
  currentPerson = person;
  return (
    <Panel>
      <Header />
      <Avatar />
    </Panel>
  )
}

function Header() {
  return <h1>{currentPerson.name}</h1>;
}

function Avatar() {
  return (
    <img
      className="avatar"
      src={getImageUrl(currentPerson)}
      alt={currentPerson.name}
      width={50}
      height={50}
    />
  );
}
```

```js src/Panel.js hidden
import { useState } from 'react';

export default function Panel({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      {open && children}
    </section>
  );
}
```

```js src/App.js
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  )
}
```

```js src/utils.js hidden
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
.avatar { margin: 5px; border-radius: 50%; }
.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  width: 200px;
}
h1 { margin: 5px; font-size: 18px; }
```

</Sandpack>

<Solution>

ບັນຫາແມ່ນ component `Profile` ຂຽນໄປຍັງຕົວແປທີ່ມີຢູ່ແລ້ວເຊິ່ງເອີ້ນວ່າ `currentPerson`, ແລະ component `Header` ແລະ `Avatar` ອ່ານຈາກມັນ. ນີ້ເຮັດໃຫ້ *ທັງສາມຄົນ* ບໍ່ pure ແລະ ຄາດເດົາໄດ້ຍາກ.

ເພື່ອແກ້ bug, ໃຫ້ລຶບຕົວແປ `currentPerson` ອອກ. ໃຫ້ສົ່ງຂໍ້ມູນທັງໝົດຈາກ `Profile` ໄປຫາ `Header` ແລະ `Avatar` ຜ່ານ prop ແທນ. ທ່ານຈະຕ້ອງເພີ່ມ prop `person` ໃຫ້ກັບທັງສອງ component ແລະ ຜ່ານມັນລົງໄປລຸ່ມສຸດ.

<Sandpack>

```js src/Profile.js active
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

export default function Profile({ person }) {
  return (
    <Panel>
      <Header person={person} />
      <Avatar person={person} />
    </Panel>
  )
}

function Header({ person }) {
  return <h1>{person.name}</h1>;
}

function Avatar({ person }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  );
}
```

```js src/Panel.js hidden
import { useState } from 'react';

export default function Panel({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      {open && children}
    </section>
  );
}
```

```js src/App.js
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  );
}
```

```js src/utils.js hidden
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
.avatar { margin: 5px; border-radius: 50%; }
.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  width: 200px;
}
h1 { margin: 5px; font-size: 18px; }
```

</Sandpack>

ໃຫ້ຈື່ວ່າ React ບໍ່ຮັບປະກັນວ່າຟັງຊັ່ນ component ຈະເຮັດວຽກຕາມລຳດັບໃດໆ, ດັ່ງນັ້ນທ່ານຈຶ່ງບໍ່ສາມາດສື່ສານລະຫວ່າງຟັງຊັ່ນເຫຼົ່ານັ້ນດ້ວຍການຕັ້ງຄ່າຕົວແປໄດ້. ການສື່ສານທັງໝົດຕ້ອງເກີດຂຶ້ນຜ່ານ prop.

</Solution>

#### ແປງຖາດ story ທີ່ເພ {/*fix-a-broken-story-tray*/}

CEO ຂອງບໍລິສັດທ່ານກຳລັງຂໍໃຫ້ທ່ານເພີ່ມ "stories" ໃນແອັບໂມງອອນລາຍຂອງທ່ານ, ແລະ ທ່ານບໍ່ສາມາດຕອບປະຕິເສດໄດ້. ທ່ານໄດ້ຂຽນ cmponent `StoryTray` ທີ່ຮັບລາຍການຂອງ `stories`, ຕາມດ້ວຍ placeholder "Create Story".

ທ່ານໄດ້ implement placeholder "Create Story" ໂດຍເພີ່ມ fake story ທີ່ສ່ວນທ້າຍຂອງ array `stories` ທີ່ທ່ານໄດ້ຮັບເປັນ prop. ແຕ່ດ້ວຍເຫດຜົນໃດໜຶ່ງ, "Create Story" ສະແດງຫຼາຍກວ່າໜຶ່ງຄັ້ງ. ແກ້ໄຂບັນຫາ.

<Sandpack>

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  stories.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

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
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

</Sandpack>

<Solution>

ສັງເກດວ່າເມື່ອໃດກໍຕາມທີ່ໂມງອັບເດດ, ລະບົບຈະເພີ່ມ "Create Story"  *ສອງຄັ້ງ*. ນີ້ເປັນການບອກໃບ້ວ່າເຮົາມີການ mutate ລະຫວ່າງການ render-- Strict Mode ເອີ້ນ component ສອງຄັ້ງເພື່ອເຮັດໃຫ້ບັນຫາເຫຼົ່ານີ້ຊັດເຈນຂຶ້ນ.

ຟັງຊັ່ນ `StoryTray` ບໍ່ pure. ໂດຍການເອີ້ນ `push` ເທິງ array `stories` (prop!), ມັນ mutate object ທີ່ຖືກສ້າງ *ກ່ອນ* `StoryTray` ຈະ render. ນີ້ເຮັດໃຫ້ເກິດ bug ແລະ ຍາກໃນການຄາດເດົາ.

ການແກ້ໄຂທີ່ງ່າຍທີ່ສຸດຄືຢ່າແຕະ array ເລີຍ, ແລະ render "Create Story" ແຍກກັນ:

<Sandpack>

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
      <li>Create Story</li>
    </ul>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

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
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

ອີກວິທີໜຶ່ງ, ທ່ານສາມາສ້າງ array _ໃໝ່_ (ໂດຍການ copy array ທີ່ມີຢູ່) ກ່ອນທີ່ທ່ານຈະ push ລາຍການເຂົ້າໄປ:

<Sandpack>

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  // Copy the array!
  let storiesToDisplay = stories.slice();

  // Does not affect the original array:
  storiesToDisplay.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {storiesToDisplay.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

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
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

ນີ້ເຮັດໃຫ້ mutation local ຂອງທ່ານ ແລະ ຟັງຊັ່ນການ render ຂອງທ່ານ pure. ເຖິງຢ່າງໃດກໍຕາມ, ທ່ານຍັງຕ້ອງລະວັງ: ຕົວຢ່າງ, ຖ້າທ່ານພະຍາຍາມປ່ຽນແປງລາຍການທີ່ມີຢູ່ຂອງ array, ທ່ານຈະຕ້ອງ clone ລາຍການເຫຼົ່ານັ້ນນຳ.

ມີປະໂຫຍດໃນການຈື່ຈຳວ່າການດຳເນີນການໃດໆໃນ array ທີເຮັດໃຫ້ເກີດການ mutate, ແລະ ການດຳເນີນການໃດທີ່ບໍ່ເຮັດ. ຕົວຢ່າງ `push`, `pop`, `reverse`, ແລະ `sort` ຈະ mutate array ເດີມ, ແຕ່ `slice`, `filter`, ແລະ `map` ຈະສ້າງ array ໃໝ່.

</Solution>

</Challenges>
