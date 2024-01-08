---
title: ການ Import ແລະ  Export Components
---

<Intro>

ຄວາມມະຫັດສະຈັນຂອງ component ແມ່ນຢູ່ບ່ອນທີ່ມັນສາມາດນຳກັບມາໃຊ້ໃໝ່ໄດ້: ທ່ານສາມາດສ້າງ components ທີ່ປະກອບດ້ວຍ component ອື່ນ. ແຕ່ເມື່ອທ່ານຊ້ອນ component ຫຼາຍຂຶ້ນເລື້ອຍໆ, ກໍຈະມີເຫດຜົນທີ່ຄວນເລີ່ມແຍກ component ອອກມາເປັນຟາຍຕ່າງໆ. ນີ້ຊ່ວຍໃຫ້ທ່ານສາມາດກວດ ແລະ ນຳ component ກັບມາໃຊ້ໃໝ່ໄດ້ໃນບ່ອນອື່ນໆຫຼາຍຂຶ້ນ.

</Intro>

<YouWillLearn>

* ຟາຍ Root component ແມ່ນຫຍັງ
* ວິທີການ import ແລະ export component
* ເມື່ອໃດທີ່ຕ້ອງໃຊ້ ການ import ແລະ export ເປັນຄ່າເລີ່ມຕົ້ນ ແລະ ການຕັ້ງຊື່
* ວິທີການ import ແລະ export ຫຼາຍ component ຈາກໜຶ່ງຟາຍ
* ວິທີການແຍກ components ອອກເປັນຫຼາຍຟາຍ

</YouWillLearn>

## ຟາຍ root component {/*the-root-component-file*/}

ໃນ [Component ທຳອິດຂອງທ່ານ](/learn/your-first-component), ທ່ານໄດ້ສ້າງ component `Profile` ແລະ component `Gallery` ເພື່ອສະແດງມັນ:

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

<<<<<<< HEAD
ປັດຈຸບັນຟາຍເຫຼົ່ານີ້ຢູ່ໃນ **ຟາຍ root component,** ຊື່ `App.js` ໃນຕົວຢ່າງນີ້. ໃນ [ການສ້າງແອັບ React](https://create-react-app.dev/), ແອັບຂອງທ່ານຢູ່ໃນ `src/App.js`. ຂຶ້ນກັບການຕັ້ງຄ່າຂອງທ່ານ, Root component ຂອງທ່ານສາມາດເປັນຟາຍອື່ນກໍໄດ້. ຖ້າທ່ານໃຊ້ framework ທີ່ມີການກຳນົດ routing ຕາມ file-based, ເຊັ່ນ Next.js, Root component ຂອງທ່ານຈະແຕກຕ່າງກັນໄປໃນແຕ່ລະ page.
=======
These currently live in a **root component file,** named `App.js` in this example. Depending on your setup, your root component could be in another file, though. If you use a framework with file-based routing, such as Next.js, your root component will be different for every page.
>>>>>>> 68f417a600c7d7b8c4131e39f8a843a856ae3909

## ການ import ແລະ export component {/*exporting-and-importing-a-component*/}

ຈະເຮັດແນວໃດຖ້າທ່ານຕ້ອງການປ່ຽນ landing screen ໃນອະນາຄົດ ແລະ ເອົາລາຍການຂອງປື້ມວິທະຍາສາດໃສ່ໃນນັ້ນ? ຫຼື ເອົາ profile ທັງໝົດໄວ້ບ່ອນອື່ນ? ການຍ້າຍ `Gallery` ແລະ `Profile` ອອກຈາກຟາຍ root component ເປັນເລື່ອງທີ່ສົມເຫດສົມຜົນ. ນີ້ຈະເຮັດໃຫ້ມັນແຍກເປັນ module ໄດ້ຫຼາຍຂື້ນ ແລະ ສາມາດນຳມາໃຊ້ຊໍ້າກັບຟາຍອື່ນໆ. ທ່ານສາມາດຍ້າຍ component ໃນ 3 ຂັ້ນຕອນ:


1. **ສ້າງ** ຟາຍ JS ໃໝ່ເພື່ອເອົາ component ເຂົ້າໄປ.
2. **Export** Component ຟັງຊັ່ນຂອງທ່ານຈາກຟາຍນັ້ນ (ໂດຍໃຊ້ [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) ຫຼື [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) exports).
3. **Import** ໃນຟາຍທີ່ທ່ານຈະໃຊ້ component (ໂດຍໃຊ້ເຕັກນິກທີ່ກ່ຽວຂ້ອງໃນການ import [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) ຫຼື [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module) exports).

ທັງ `Profile` ແລະ `Gallery` ຖືກຍ້າຍອອກຈາກ `App.js` ໄປໃນຟາຍໃໝ່ຊື່ `Gallery.js`. ຕອນນີ້ທ່ານສາມາດປ່ຽນ `App.js` ເພື່ອ import `Gallery` ຈາກ `Gallery.js`:

<Sandpack>
<<<<<<< HEAD
```js App.js
=======

```js src/App.js
>>>>>>> 315cb7a38a1645623fc55501429285ab680b8a6a
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js src/Gallery.js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
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

ສັງເກດ ຕົວຢ່າງນີ້ໄດ້ແຕກອອກເປັນ 2 ຟາຍ component ໄດ້ແນວໃດ:

1. `Gallery.js`:
     - ປະກາດ component `Profile` ທີ່ໃຊ້ສະເພາະໃນຟາຍດຽວກັນ ແລະ ບໍ່ຖືກ export.
     - Export component `Gallery` ເປັນ **default export.**
2. `App.js`:
     - Imports `Gallery` ເປັນ **default import** ຈາກ `Gallery.js`.
     - Exports root component ຂອງ `App` ເປັນ **default export.**


<Note>

ທ່ານອາດຈະພົບຟາຍທີ່ບໍ່ມີນາມສະກຸນຟາຍ `.js` ດັ່ງນີ້:

```js 
import Gallery from './Gallery';
```

`'./Gallery.js'` ຫຼື `'./Gallery'` ຈະເຮັດວຽກຮ່ວມກັບ React ໄດ້, ເຖິງວ່າອັນທຳອິດມັນຈະຄ້າຍກັບວິທີທີ່ [native ES Modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) ເຮັດວຽກ.

</Note>

<DeepDive>

#### default ແລະ named exports {/*default-vs-named-exports*/}

ມີສອງວິທີຫຼັກໃນການ export value ດ້ວຍ JavaScript: default exports ແລະ named exports. ຈົນເຖີງຕອນນີ້, ຕົວຢ່າງຂອງພວກເຮົາໃຊ້ default exports. ແຕ່ທ່ານສາມາດໃຊ້ຢ່າງໃດຢ່າງໜຶ່ງ ຫຼື ທັງສອງຢ່າງໃນຟາຍດຽວກັນ. **ໜຶ່ງຟາຍບໍ່ສາມາດມີຫຼາຍກວ່າໜຶ່ງ _default_ export, ແຕ່ມັນສາມາດມີຫຼາຍ _named_ export ຕາມທີ່ທ່ານຕ້ອງການ.**

![Default and named exports](/images/docs/illustrations/i_import-export.svg)

ວິທີທີ່ທ່ານ export component ເປັນຕົວກຳນົດວິທີທີ່ທ່ານຕ້ອງ import ມັນ. ທ່ານຈະໄດ້ຮັບຂໍ້ຜິດພາດຖ້າທ່ານພະຍາຍາມ import default export ແບບດຽວກັບທີ່ທ່ານໃຊ້ named export! Chart ນີ້ສາມາດຊ່ວຍໃຫ້ທ່ານຕິດຕາມ: 

| Syntax           | Export statement                           | Import statement                          |
| -----------      | -----------                                | -----------                               |
| Default  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named    | `export function Button() {}`         | `import { Button } from './Button.js';` |

ເມື່ອທ່ານຂຽນ _default_ import, ທ່ານສາມາດໃສ່ຊື່ໃດກໍໄດ້ທີ່ທ່ານຕ້ອງການຫຼັງ `import`. ຕົວຢ່າງ, ທ່ານສາມາດຂຽນ `import Banan from './Button.js'` ແທນໄດ້ ແລະ ມັນຈະຍັງໃຊ້ຄືກັນກັບ default export. ໃນທາງກົງກັນຂ້າມ, ດ້ວຍ named imports, ຊື່ຕ້ອງກົງກັນທັງສອງດ້ານ. ນັ້ນເປັນເຫດຜົນທີ່ເອີ້ນວ່າ _named_ import!

**ຜູ້ຄົນມັກຈະໃຊ້ default exports ຖ້າຟາຍ export ມີແຕ່ component ດຽວ, ແລະ ໃຊ້ named exports ຖ້າມັນ exports ຫຼາຍ component ແລະ value.** ບໍ່ວ່າທ່ານຈະມັກ style ການຂຽນ code ແບບໃດ, ໃຫ້ຕັ້ງຊື່ທີ່ມີຄວາມໝາຍໃຫ້ກັບຟັງຊັ່ນ component ແລະ ຟາຍທີ່ມີຢູ່ສະເໝີ. Components ທີ່ບໍ່ມີຊື່, ເຊັ່ນ: `export default () => {}`, ແມ່ນບໍ່ຮອງຮັບ ເພາະວ່າມັນຈະເຮັດໃຫ້ການ debug ຍາກຂຶ້ນ.

</DeepDive>

## ການ Export ແລະ import ຫຼາຍ components ຈາກຟາຍດຽວກັນ {/*exporting-and-importing-multiple-components-from-the-same-file*/}

ຈະເຮັດແນວໃດຖ້າທ່ານຕ້ອງການສະແດງໜຶ່ງ `Profile` ແທນ gallery? ທ່ານສາມາດ export Component `Profile` ຄືກັນ. ແຕ່ `Gallery.js` ແມ່ນເປັນ *default* export ຢູ່ແລ້ວ, ແລະ ທ່ານບໍ່ສາມາດມີ _ສອງ_ default exports. ທ່ານສາມາດສ້າງຟາຍໃໝ່ດ້ວຍ default export, ຫຼື ທ່ານສາມາດເພີ່ມ *named* export ສຳລັບ `Profile`. **ໜຶ່ງຟາຍສາມາດມີໄດ້ແຕ່ໜຶ່ງ default export ເທົ່ານັ້ນ, ແຕ່ສາມາດມີຫຼາຍ named exports!** 

<Note>

ເພື່ອຫຼຸດຄວາມສັບສົນທີ່ອາດຈະເກີດຂື້ນລະຫວ່າງ default ແລະ named exports, ບາງທີມເລືອກທີ່ຈະຢູ່ກັບແບບດຽວເທົ່ານັ້ນ (default ຫຼື named), ຫຼື ຫຼີກຫຼ່ຽງການປະສົມກັນໃນຟາຍດຽວ. ຫາສິ່ງທີ່ດີສຸດສຳລັບທ່ານ!

</Note>

ທຳອິດ, **export** `Profile` ຈາກ `Gallery.js` ໂດຍການໃຊ້ named export (ບໍ່ມີ keyword `default`):

```js
export function Profile() {
  // ...
}
```

ຈາກນັ້ນ, **import** `Profile` ຈາກ `Gallery.js` ໃສ່ໃນ `App.js` ນຳໃຊ້ named import (ດ້ວຍວົງປີກກາ):

```js
import { Profile } from './Gallery.js';
```

ສຸດທ້າຍ, **ສະແດງ** `<Profile />` ຈາກ component `App`:

```js
export default function App() {
  return <Profile />;
}
```

ຕອນນີ້ `Gallery.js` ປະກອບມີສອງ exports: default `Gallery` export, ແລະ named `Profile` export. `App.js` imports ທັງສອງ. ລອງແກ້ໄຂ `<Profile />` ໃສ່ `<Gallery />` ແລະ ກັບໄປຕົວຢ່າງນີ້:

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}
```

```js src/Gallery.js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
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

ຕອນນີ້ທ່ານໄດ້ໃຊ້ default ແລະ named exports ປົນກັນ:

* `Gallery.js`:
  - Exports Component `Profile` ເປັນ **named export ເອີ້ນວ່າ `Profile`.**
  - Exports Component `Gallery` ເປັນ **default export.**
* `App.js`:
  - Imports `Profile` ເປັນ **named import ເອີ້ນວ່າ `Profile`** ຈາກ `Gallery.js`.
  - Imports `Gallery` ເປັນ **default import** ຈາກ `Gallery.js`.
  - Exports  root component ຂອງ `App`  ເປັນ **default export.**

<Recap>

ໃນໜ້ານີ້ທ່ານໄດ້ຮຽນ:

* ຟາຍ Root component ແມ່ນຫຍັງ
* ວິທີການ import ແລະ export component
* ເມື່ອໃດທີ່ຕ້ອງໃຊ້ ການ import ແລະ export ເປັນຄ່າເລີ່ມຕົ້ນ ແລະ ການຕັ້ງຊື່
* ວິທີການ import ແລະ export ຫຼາຍ component ຈາກໜຶ່ງຟາຍ
* ວິທີການແຍກ components ອອກເປັນຫຼາຍຟາຍ

</Recap>



<Challenges>

#### ແຍກ components ຕື່ມ {/*split-the-components-further*/}

ປັດຈຸບັນ, `Gallery.js` exports ທັງ `Profile` ແລະ `Gallery`, ເຊິ່ງເຮັດໃຫ້ສັບສົນໜ້ອຍໜຶ່ງ.

ຍ້າຍ Component `Profile` ໄປທີ່ `Profile.js` ຂອງຕົວເອງ, ແລະ ຈາກນັ້ນປ່ຽນ component `App` ເພື່ອສະແດງທັງ `<Profile />` ແລະ `<Gallery />` ເທື່ອລະລາຍການ.

ທ່ານອາດໃຊ້ທັງ default ຫຼື named export ສຳລັບ `Profile`, ແຕ່ໃຫ້ແນ່ໃຈວ່າທ່ານໃຊ້ syntax import ທີ່ກ່ຽວຂ້ອງໃນທັງ `App.js` ແລະ `Gallery.js`! ທ່ານສາມາດອ້າງອີງຈາກຕາຕະລາງ ຫຼື ລົງເລິກດ້ານເທິງ:

| Syntax           | Export statement                           | Import statement                          |
| -----------      | -----------                                | -----------                               |
| Default  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named    | `export function Button() {}`         | `import { Button } from './Button.js';` |

<Hint>

ຢ່າລືມ import components ຂອງທ່ານບ່ອນທີມັນຖືກເອີ້ນ. `Gallery` ບໍ່ໄດ້ໃຊ້ `Profile`, ຄືກັນ?

</Hint>

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}
```

```js src/Gallery.js active
// Move me to Profile.js!
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
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

```js src/Profile.js
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

ຫຼັງຈາກທີ່ທ່ານເຂົ້າໃຈໜຶ່ງວິທີການເຮັດວຽກຂອງປະເພດການ exports ແລ້ວ, ເຮັດໃຫ້ມັນເຮັດວຽກໄດ້ກັບອີກປະເພດ.

<Solution>

ນີ້ແມ່ນວິທີແກ້ບັນຫາດ້ວຍ named exports:

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import { Profile } from './Profile.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
```

```js src/Gallery.js
import { Profile } from './Profile.js';

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

```js src/Profile.js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

ນີ້ແມ່ນວິທີແກ້ໄຂບັນຫາດ້ວຍ default exports:

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import Profile from './Profile.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
```

```js src/Gallery.js
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

```js src/Profile.js
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
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

</Solution>

</Challenges>
