---
title: ການເຂົ້າຄິວຊຸດອັບເດດ state
---

<Intro>

ການຕັ້ງຄ່າຕົວແປ state ຈະເປັນຄິວການ render ອື່ນ. ແຕ່ບາງເທື່ອທ່ານອາດຕ້ອງການດຳເນີນການຫຼາຍຢ່າງກັບຄ່າກ່ອນຈະເຂົ້າຄິວການ render ຕໍ່ໄປ. ເພື່ອເຮັດສິ່ງນີ້, ມັນຈະຊ່ວຍໃຫ້ທ່ານເຂົ້າໃຈວ່າ React ອັບເດດ state ຂອງ batch ແນວໃດ.

</Intro>

<YouWillLearn>

* "ການ batch" ແມ່ນຫຍັງ ແລະ React ໃຊ້ແນວໃດໃນການປະມວນຜົນການອັບເດດຫຼາຍ state
* ວິທີໃຊ້ການອັບເດດຫຼາຍຢ່າງກັບຕົວແປ state ດຽວກັນໃນແຖວ

</YouWillLearn>

## ການອັບເດດ batch state React {/*react-batches-state-updates*/}

ທ່ານອາດຄາດຫວັງວ່າການຄິກປຸ່ມ "+3" ຈະເພີ່ມຕົວນັບສາມຄັ້ງເພາະມັນເອີ້ນໃຊ້ `setNumber(number + 1)` ສາມຄັ້ງ:

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

ເຖິງຢ່າງໃດກໍຕາມ, ທ່ານອາດຈະຈື່ໄດ້ວ່າສ່ວນກ່ອນໜ້າ, [ຄ່າຂອງການ render ແຕ່ລະຄ່າຈະໄດ້ຮັບການແກ້ໄຂ](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time), ດັ່ງນັ້ນຄ່າຂອງ `number` ພາຍໃນ event handler ຂອງການ render ໂຕທຳອິດຈະເປັນ `0` ສະເໝີ, ບໍ່ວ່າທ່ານຈະເອີ້ນໃຊ້ `setNumber(1)` ຈັກເທື່ອກໍຕາມ:

```js
setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
```

ແຕ່ມີອີກໜຶ່ງປັດໄຈທີ່ຫຼິ້ນບ່ອນນີ້. **React ຈະລໍຖ້າຈົນກວ່າ code *ທັງໝົດ* ໃນ event handler ຈະເຮັດວຽກກ່ອນທີ່ຈະປະມວນຜົນການອັບເດດ state ຂອງທ່ານ** ນີ້ແມ່ນສາເຫດທີ່ການ render ຊໍ້າຈະເກີດຂຶ້ນ *ຫຼັງຈາກ* ການເອີ້ນໃຊ້ `setNumber()` ທັ້ງໝົດນີ້ເທົ່ານັ້ນ.

ສິ່ງນີ້ອາດເຮັດໃຫ້ທ່ານຄິດເຖິງບໍລິກອນທີ່ຮັບອໍເດີທີ່ຮ້ານອາຫານ. ບໍລິກອນຈະບໍ່ແລ່ນໄປທີ່ຫ້ອງຄົວເມື່ອເວົ້າເຖິງອາຫານຈານທຳອິດຂອງທ່ານ! ແຕ່ຈະໃຫ້ທ່ານສັ່ງອາຫານໃຫ້ແລ້ວກ່ອນ ໃຫ້ທ່ານເຮັດການປ່ຽນແປງ ແລະ ແມ້ແຕ່ຮັບອໍເດີຈາກຄົນອື່ນທີ່ໂຕະ.

<Illustration src="/images/docs/illustrations/i_react-batching.png"  alt="An elegant cursor at a restaurant places and order multiple times with React, playing the part of the waiter. After she calls setState() multiple times, the waiter writes down the last one she requested as her final order." />

ເຊິ່ງຈະຊ່ວຍໃຫ້ທ່ານອັບເດດຕົວແປ state ຫຼາຍຕົວ--ແມ້ແຕ່ຈາກ component ຫຼາຍໂຕ--ໂດຍບໍ່ຕ້ອງ trigger [ການ renders ຊໍ້າ.](/learn/render-and-commit#re-renders-when-state-updates) ຫຼາຍເກີນໄປ. ແຕ່ນີ້ໝາຍຄວາມວ່າ UI ຈະບໍ່ໄດ້ຮັບການອັບເດດຈົນກວ່າ _ຫຼັງຈາກ_ event handler ຂອງທ່ານ, ແລະ code ໃດໆໃນນັ້ນກໍຈະສຳເລັດ. ພຶດທິກຳນີ້ເອີ້ນວ່າ **ການ batch,** ເຮັດໃຫ້ແອັບ React ຂອງທ່ານເຮັດວຽກໄວຂຶ້ນຫຼາຍ. ນອກຈາກນີ້ຍັງຫຼີກຫຼ່ຽງການຈັດການກັບການ render ແບບ "ເຄິ່ງດຽວ" ທີ່ສັບສົນເຊິ່ງມີພຽງແຕ່ຕົວແປບາງໂຕເທົ່ານັ້ນທີ່ໄດ້ຮັບການອັບເດດ. 

**React ຈະບໍ່ batch ລະຫວ່າງ *event ຫຼາຍ event* ໂດຍເຈດຕະນາເຊັ່ນ ການຄິກ**--ການຄິກແຕ່ລະຄັ້ງຈະໄດ້ຮັບການຈັດການແຍກກັນ. ໝັ້ນໃຈໄດ້ວ່າ React ຈະເຮັດການ batch ສະເພາະເມື່ອໂດຍທົ່ວໄປແລ້ວປອດໄພເທົ່ານັ້ນ. ນີ້ເຮັດໃຫ້ໝັ້ນໃຈໄດ້ວ່າ, ຕົວຢ່າງ ຫາກການຄິກປຸ່ມທຳອິດປິດການໃຊ້ງານແບບຟອມ, ການຄິກຄັ້ງທີ່ສອງຈະບໍ່ສົ່ງອີກຄັ້ງ.

## ການອັບເດດ state ດຽວກັນຫຼາຍຄັ້ງກ່ອນການ render ຄັ້ງຕໍ່ໄປ {/*updating-the-same-state-multiple-times-before-the-next-render*/}

ເປັນກໍລະນີການໃຊ້ງານທີ່ຜິດປົກະຕິ, ແຕ່ຖ້າທ່ານຕ້ອງການອັບເດດຕົວແປ state ດຽວກັນຫຼາຍໆຄັ້ງກ່ອນທີ່ຈະ render ຄັ້ງຕໍ່ໄປ, ແທນທີ່ຈະສົ່ງ *ຄ່າ state ຕໍ່ໄປ* ເຊັ່ນ `setNumber(number + 1)`, ທ່ານສາມາດສົ່ງ *ຟັງຊັ່ນ* ທີ່ຄຳນວນ state ຕໍ່ໄປຈາກ state ກ່ອນໜ້າໃນຄິວເຊັ່ນ `setNumber(n => n + 1)`. ເປັນວິທີທີ່ຈະບອກ React ໃຫ້ "ເຮັດບາງຢ່າງກັບຄ່າ state" ແທນທີ່ຈະແທນມັນ.

ລອງເພີ່ມຕົວນັບທັນທີ:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
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

ຕອນນີ້, `n => n + 1` ເອີ້ນວ່າ **ຟັງຊັ່ນ updater.** ເມື່ອທ່ານສົ່ງຕໍ່ໄປຍັງ state setter:

1. React ຈັດຄິວຟັງຊັ່ນນີ້ໃຫ້ປະມວນຜົນຫຼັງຈາກທີ່ code ອື່ນໆທັງໝົດໃນ event handler ເຮັດວຽກແລ້ວ.
2. ໃນລະຫວ່າງການ render ຄັ້ງຕໍ່ໄປ, React ຈະຜ່ານຄິວ ແລະ ແຈ້ງ state ທີ່ອັບເດດສຸດທ້າຍໃຫ້ທ່ານຮູ້.

```js
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```

ນີ້ແມ່ນວິທີທີ່ Reacct ເຮັດວຽກຜ່ານແຖວ code ເຫຼົ່ານີ້ໃນຂະນະເອີ້ນໃຊ້ງານ event handler:

1. `setNumber(n => n + 1)`: `n => n + 1` ແມ່ນຟັງຊັ່ນ. React ເພີ່ມລົງໃນຄິວ.
1. `setNumber(n => n + 1)`: `n => n + 1` ແມ່ນຟັງຊັ່ນ. React ເພີ່ມລົງໃນຄິວ.
1. `setNumber(n => n + 1)`: `n => n + 1` ແມ່ນຟັງຊັ່ນ. React ເພີ່ມລົງໃນຄິວ.

ເມື່ອທ່ານເອີ້ນໃຊ້ `useState` ລະຫວ່າງການ render ຕໍ່ໄປ, React ຈະຕ້ອງຜ່ານຄິວ. State `number` ກ່ອນໜ້ານີ້ແມ່ນ `0`, ສະນັ້ນ, ນັ້ນແມ່ນສິ່ງທີ່ React ສົ່ງຜ່ານໄປຍັງຟັງຊັ່ນ updater ທຳອິດເປັນ argument `n`. ຈາກນັ້ນ React ຈະນຳຄ່າ return ຂອງຟັງຊັ່ນ updater ກ່ອນໜ້າຂອງທ່ານ ແລະ ສົ່ງຕໍ່ໄປຍັງ updater ໂຕຖັດໄປເປັນ `n` ແລະ ອື່ນໆ: 

| ຄິວການອັບເດດ | `n` | returns |
|--------------|---------|-----|
| `n => n + 1` | `0` | `0 + 1 = 1` |
| `n => n + 1` | `1` | `1 + 1 = 2` |
| `n => n + 1` | `2` | `2 + 1 = 3` |

React ເກັບ `3` ເປັນຜົນລັບສຸດທ້າຍ ແລະ return ຈາກ `useState`.

ນີ້ເປັນສາເຫດທີ່ການຄິກ "+3" ໃນຕົວຢ່າງດ້ານເທິງຈະເພີ່ມຄ່າທີ່ຖືກຕ້ອງເທື່ອລະ 3.
### ຈະເກີດຫຍັງຂຶ້ນຖ້າທ່ານອັບເດດ state ຫຼັງຈາກແທນທີ່ມັນ {/*what-happens-if-you-update-state-after-replacing-it*/}

ແລ້ວ event handler ນີ້ເດ? ທ່ານຄິດວ່າ `number` ຈະເປັນຫຍັງໃນການ render ຕໍ່ໄປ?

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```

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
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

ນີ້ແມ່ນສິ່ງທີ່ event handler ບອກໃຫ້ React ເຮັດ:

1. `setNumber(number + 5)`: `number` ເປັນ `0`, ສະນັ້ນ `setNumber(0 + 5)`. React ເພີ່ມ *"ແທນຄ່າດ້ວຍ `5`"* ໃນຄິວຂອງມັນ.
2. `setNumber(n => n + 1)`: `n => n + 1` ແມ່ນຟັງຊັ່ນ updater. React ເພີ່ມ *ຟັງຊັ່ນນັ້ນ* ໃນຄິວຂອງມັນ.

ໃນລະຫວ່າງການ render ຕໍ່ໄປ, React ຈະຕ້ອງຜ່ານຄິວ state:

|   ຄິວອັບເດດ       | `n` | returns |
|--------------|---------|-----|
| "replace with `5`" | `0` (unused) | `5` |
| `n => n + 1` | `5` | `5 + 1 = 6` |

React ເກັບ `6` ເປັນຜົນລັບສຸດທ້າຍ ແລະ return ຈາກ `useState`.

<Note>

ທ່ານອາດສັງເກດເຫັນວ່າ `setState(5)` ໃຊ້ງານໄດ້ແທ້ຄືກັບ `setState(n => 5)` ແຕ່ `n` ບໍ່ຖືກໃຊ້ງານ!

</Note>

### ຈະເກີດຫຍັງຂຶ້ນຖ້າທ່ານແທນທີ່ state ຫຼັງຈາກອັບເດດມັນ {/*what-happens-if-you-replace-state-after-updating-it*/}

ລອງອີກຕົວຢ່າງໜຶ່ງ. ທ່ານຄິດວ່າ `number` ຈະເປັນຫຍັງໃນການ render ຄັ້ງຕໍ່ໄປ?

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>
```

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
        setNumber(n => n + 1);
        setNumber(42);
      }}>Increase the number</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

ນີ້ແມ່ນວິທີທີ່ React ເຮັດວຽກຜ່ານແຖວຂອງ code ເຫຼົ່ານີ້ໃນຂະນະທີ່ເອີ້ນໃຊ້ງານ event handler ນີ້:

1. `setNumber(number + 5)`: `number` ເປັນ `0`, ສະນັ້ນ `setNumber(0 + 5)`. React ເພີ່ມ *"ແທນທີ່ດ້ວຍ `5`"* ໃສ່ຄິວຂອງມັນ.
2. `setNumber(n => n + 1)`: `n => n + 1` ເປັນຟັງຊັ່ນ updater. React ເພີ່ມ *ຟັງຊັ່ນນັ້ນ* ໃສ່ຄິວຂອງມັນ.
3. `setNumber(42)`: React ເພີ່ມ *"ແທນທີ່ດ້ວຍ `42`"* ໃສ່ຄິວຂອງມັນ.

ໃນລະຫວ່າງການ render ຕໍ່ໄປ, React ຈະຕ້ອງຜ່ານຄິວ state:

|   ຄິວອັບເດດ       | `n` | returns |
|--------------|---------|-----|
| "replace with `5`" | `0` (unused) | `5` |
| `n => n + 1` | `5` | `5 + 1 = 6` |
| "replace with `42`" | `6` (unused) | `42` |

ຈາກນັ້ນ React ຈະເກັບ `42` ເປັນຜົນລັບສຸດທ້າຍ ແລະ return ຈາກ `useState`.

ສະຫຼຸບ, ຕໍ່ໄປນີ້ແມ່ນວິທີທີ່ຄິດຂອງສິ່ງທີ່ທ່ານສົ່ງຜ່ານໄປຍັງ state setter `setNumber`:

* **ຟັງຊັ່ນ updater** (ເຊັ່ນ `n => n + 1`) ຈະຖືກເພີ່ມລົງໃນຄິວ.
* **ຄ່າອື່ນໆ** (ເຊັ່ນ number `5`) ເພີ່ມ "ແທນທີ່ດ້ວຍ `5`" ໃນຄິວ, ໂດຍບໍ່ສົນໃຈສິ່ງທີ່ຢູ່ໃນຄິວແລ້ວ.

ຫຼັງຈາກ event handler ສຳເລັດ, React ຈະ trigger ການ render ໃໝ່. ລະຫວ່າງການ render ໃໝ່, React ຈະປະມວນຜົນຄິວ. ຟັງຊັ່ນ updater ເຮັດວຽກລະຫວ່າງການ render, ສະນັ້ນ **ຟັງຊັ່ນ updater ຕ້ອງ [pure](/learn/keeping-components-pure)** ແລະ ມີພຽງການ *return* ຜົນລັບເທົ່ານັ້ນ. ຢ່າພະຍາຍາມຕັ້ງຄ່າ state ຈາກພາຍໃນ ຫຼື ເອີ້ນໃຊ້ຜົນຂ້າງຄຽງອື່ນໆ. ໃນ Strict Mode, React ຈະເອີ້ນໃຊ້ຟັງຊັ່ນ updater  ສອງເທື່ອ (ແຕ່ປະຜົນລັບທີ່ສອງ) ເພື່ອຊ່ວຍໃຫ້ທ່ານພົບຂໍ້ຜິດພາດ.

### ກົດຂອງການຕັ້ງຊື່ {/*naming-conventions*/}

ເປັນເລື່ອງປົກະຕິທີ່ຈະຕັ້ງຊື່ argument ຟັງຊັ່ນ updater ດ້ວຍຕົວອັກສອນໂຕທຳອິດຂອງຕົວແປ state ທີ່ກ່ຽວຂ້ອງ:

```js
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```

ຖ້າທ່ານຕ້ອງການ code ທີ່ລະອຽດເພີ່ມເຕີມ, ຫຼັກການທົ່ວໄປອີກແບບແມ່ນການເຮັດຊໍ້າຕົວແປ state ເຕັມເຊັ່ນ `setEnabled(enabled => !enabled)` ຫຼື ໃຊ້ຄຳນຳໜ້າເຊັ່ນ `setEnabled(prevEnabled => !prevEnabled)`.

<Recap>

* State ການຕັ້ງຄ່າບໍ່ປ່ຽນຕົວແປໃນການ render ທີ່ມີຢູ່ ແຕ່ຮ້ອງຂໍການ render ໃໝ່.
* ອັບເດດ state ຂະບວນການຕອບສະໜອງຫຼັງຈາກ event handler ເຮັດວຽກແລ້ວ. ສິ່ງນີ້ເອີ້ນວ່າການ batch.
* ຫາກຕ້ອງການອັບເດດ state ຫຼາຍຄັ້ງໃນ event ດຽວ, ທ່ານສາມາດໃຊ້ຟັງຊັ່ນ updater `setNumber(n => n + 1)`.

</Recap>



<Challenges>

#### ແກ້ໄຂຕົວນັບຄຳຂໍ {/*fix-a-request-counter*/}

ທ່ານກຳລັງເຮັດວຽກກັບແອັບຕະຫຼາດຊື້ຂາຍງານສິລະປະທີ່ໃຫ້ຜູ້ໃຊ້ສົ່ງຄຳຊື້ຫຼາຍລາຍການສຳລັບລາຍການສິລະປະພ້ອມກັນໄດ້. ທຸກຄັ້ງທີ່ຜູ້ໃຊ້ກົດປຸ່ມ "Buy", ຕົວນັບ "Pending" ຄວນເພີ່ມຂຶ້ນເທື່ອລະໜຶ່ງ. ຫຼັງຈາກສາມວິນາທີ, ຕົວນັບ "Pending" ຄວນຫຼຸດລົງ ແລະ ຕົວນັບ "Completed" ຄວນເພີ່ມຂຶ້ນ.

ເຖິງຢ່າງໃດກໍຕາມ, ຕົວນັບ "Pending" ບໍ່ເຮັດວຽກຕາມທີ່ຕັ້ງໃຈໄວ້. ເມື່ອທ່ານກົດ "Buy", ມັນຈະຫຼຸດລົງເປັນ `-1` (ເຊິ່ງບໍ່ຄວນເປັນໄປໄດ້!). ແລະ ຖ້າທ່ານຄິກໄວສອງຄັ້ງ, ຕົວນັບທັງສອງເບິ່ງຄືຈະເຮັດວຽກຢ່າງຄາດເດົາບໍ່ໄດ້.

ເກີດສິ່ງນີ້ໄດ້ແນວໃດ? ແກ້ໄຂໂຕນັບທັງສອງ.

<Sandpack>

```js
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending - 1);
    setCompleted(completed + 1);
  }

  return (
    <>
      <h3>
        Pending: {pending}
      </h3>
      <h3>
        Completed: {completed}
      </h3>
      <button onClick={handleClick}>
        Buy     
      </button>
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
```

</Sandpack>

<Solution>

ພາຍໃນ event handler `handleClick`, ຄ່າຂອງ `pending` ແລະ `completed` ຈະສອດຄ່ອງກັບຄ່າທີ່ເກີດຂຶ້ນໃນຂະນະທີ່ເກີດ click event. ສຳລັບການ render ຄັ້ງທຳອິດ `pending` ເປັນ `0`, ສະນັ້ນ `setPending(pending - 1)` ຈຶ່ງກາຍເປັນ `setPending(-1)`, ເຊິ່ງຜິດ. ເນື່ອງຈາກທ່ານຕ້ອງການ "ເພີ່ມ" ຫຼື "ຫຼຸດ" ຕົວນັບ, ແທນທີ່ຈະຕັ້ງຄ່າໃຫ້ເປັນຄ່າທີ່ເປັນຮູບປະທຳທີ່ກຳນົດລະຫວ່າງການຄິກ, ທ່ານຈິ່ງສາມາດສົ່ງຟັງຊັ່ນ updater ແທນໄດ້:

<Sandpack>

```js
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(p => p + 1);
    await delay(3000);
    setPending(p => p - 1);
    setCompleted(c => c + 1);
  }

  return (
    <>
      <h3>
        Pending: {pending}
      </h3>
      <h3>
        Completed: {completed}
      </h3>
      <button onClick={handleClick}>
        Buy     
      </button>
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
```

</Sandpack>

ສິ່ງນີ້ເຮັດໃຫ້ໝັ້ນໃຈໄດ້ວ່າເມື່ອທ່ານເພີ່ມ ຫຼື ຫຼຸດໂຕນັບ, ທ່ານຈະເຮັດໂດຍສຳພັນກັບ state *ຫຼ້າສຸດ* ຂອງໂຕນັບແທນທີ່ຈະເປັນ state ໃນຂະນະຄິກ.

</Solution>

#### Implement state ຄິວດ້ວຍໂຕທ່ານເອງ {/*implement-the-state-queue-yourself*/}

ໃນຄວາມທ້າທາຍນີ້, ທ່ານຈະໄດ້ປັບໃຊ້ສ່ວນນ້ອຍໆຂອງ React ໃໝ່ຕັ້ງແຕ່ເລີ່ມຕົ້ນ! ມັນບໍ່ຍາກດັ່ງທີ່ຄິດ.

ເລື່ອນເບິ່ງຕົວຢ່າງ sandbox. ສັງເກດວ່າມັນສະແດງ **ກໍລະນີທົດສອບສີ່ກໍລະນີ.** ເຊິ່ງສອດຄ່ອງກັບຕົວຢ່າງທີ່ທ່ານເຫັນກ່ອນໜ້ານີ້ໃນໜ້ານີ້. ໜ້າທີ່ຂອງທ່ານແມ່ນໃຫ້ຟັງຊັ່ນ `getFinalState` ເພື່ອໃຫ້ return ຜົນລັບທີ່ຖືກຕ້ອງສຳລັບແຕ່ລະກໍລະນີເຫຼົ່ານັ້ນ. ຖ້າທ່ານໃຊ້ຢ່າງຖືກຕ້ອງ, ການທົດສອງທັງສີ່ຄວນຈະຜ່ານ.

ທ່ານຈະໄດ້ຮັບສອງ argument: `baseState` ຄື state ເລີ່ມຕົ້ນ (ເຊັ່ນ `0`), ແລະ `queue` ຄື array ທີ່ປະກອບດ້ວຍຕົວເລກ (ເຊັ່ນ `5`) ແລະ ຟັງຊັ່ນ updater (ເຊັ່ນ `n => n + 1`) ຕາມລຳດັບທີ່ເພີ່ມເຂົ້າມາ.

ໜ້າທີ່ຂອງທ່ານຄື return state ສຸດທ້າຍ, ເຊັ່ນດຽວກັບຕາຕະລາງໃນໜ້ານີ້ທີ່ສະແດງ!

<Hint>

ຖ້າທ່ານຮູ້ສຶກຕິດຂັດ, ໃຫ້ເລີ່ມຕົ້ນດ້ວຍ code structure ນີ້:

```js
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // TODO: apply the updater function
    } else {
      // TODO: replace the state
    }
  }

  return finalState;
}
```

ຕື່ມແຖວທີ່ຫາຍໄປ!

</Hint>

<Sandpack>

```js src/processQueue.js active
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  // TODO: do something with the queue...

  return finalState;
}
```

```js src/App.js
import { getFinalState } from './processQueue.js';

function increment(n) {
  return n + 1;
}
increment.toString = () => 'n => n+1';

export default function App() {
  return (
    <>
      <TestCase
        baseState={0}
        queue={[1, 1, 1]}
        expected={1}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          increment,
          increment,
          increment
        ]}
        expected={3}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
        ]}
        expected={6}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
          42,
        ]}
        expected={42}
      />
    </>
  );
}

function TestCase({
  baseState,
  queue,
  expected
}) {
  const actual = getFinalState(baseState, queue);
  return (
    <>
      <p>Base state: <b>{baseState}</b></p>
      <p>Queue: <b>[{queue.join(', ')}]</b></p>
      <p>Expected result: <b>{expected}</b></p>
      <p style={{
        color: actual === expected ?
          'green' :
          'red'
      }}>
        Your result: <b>{actual}</b>
        {' '}
        ({actual === expected ?
          'correct' :
          'wrong'
        })
      </p>
    </>
  );
}
```

</Sandpack>

<Solution>

ນີ້ແມ່ນ algorithm ທີ່ແນ່ນອນເຊິ່ງອະທິບາຍໄວ້ວ່າໃນໜ້ານີ້ເຊິ່ງ React ໃຊ້ໃນການຄຳນວນ state ສຸດທ້າຍ:

<Sandpack>

```js src/processQueue.js active
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // Apply the updater function.
      finalState = update(finalState);
    } else {
      // Replace the next state.
      finalState = update;
    }
  }

  return finalState;
}
```

```js src/App.js
import { getFinalState } from './processQueue.js';

function increment(n) {
  return n + 1;
}
increment.toString = () => 'n => n+1';

export default function App() {
  return (
    <>
      <TestCase
        baseState={0}
        queue={[1, 1, 1]}
        expected={1}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          increment,
          increment,
          increment
        ]}
        expected={3}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
        ]}
        expected={6}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
          42,
        ]}
        expected={42}
      />
    </>
  );
}

function TestCase({
  baseState,
  queue,
  expected
}) {
  const actual = getFinalState(baseState, queue);
  return (
    <>
      <p>Base state: <b>{baseState}</b></p>
      <p>Queue: <b>[{queue.join(', ')}]</b></p>
      <p>Expected result: <b>{expected}</b></p>
      <p style={{
        color: actual === expected ?
          'green' :
          'red'
      }}>
        Your result: <b>{actual}</b>
        {' '}
        ({actual === expected ?
          'correct' :
          'wrong'
        })
      </p>
    </>
  );
}
```

</Sandpack>

ຕອນນີ້ທ່ານຮູ້ແລ້ວວ່າສ່ວນນີ້ເຮັດວຽກແນວໃດ!

</Solution>

</Challenges>