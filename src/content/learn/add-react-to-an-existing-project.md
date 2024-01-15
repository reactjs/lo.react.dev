---
title: ເພີ່ມ React ໃສ່ Project ທີ່ມີຢູ່ແລ້ວ
---

<Intro>

ຖ້າທ່ານຕ້ອງການເພີ່ມ interactivity ໃສ່ໃນ project ທີ່ທ່ານມີຢູ່ແລ້ວ, ທ່ານບໍ່ຈຳເປັນຕ້ອງເລີ່ມຂຽນໃໝ່ຈາກ React. ເພີ່ມ React ໃສ່ໃນ stack ປັດຈຸບັນຂອງທ່ານ ແລະ render interactive React component ໃນທຸກບ່ອນ.

</Intro>

<Note>

**ທ່ານຕ້ອງໄດ້ລົງ [Node.js](https://nodejs.org/en/) ສຳລັບ local development.** ເຖິງວ່າທ່ານຈະສາມາດ [ລອງ React](/learn/installation#try-react) ອອນໄລ ຫຼື ຂຽນດ້ວຍ HTML page ງ່າຍໆ, JavaScript tooling ທີ່ແທດເໝາະທີ່ສຸດທີ່ທ່ານຕ້ອງການໃຊ້ສຳລັບພັດທະນາຕ້ອງໃຊ້ Node.js.

</Note>

## ການນຳໃຊ້ React ສຳລັບ subroute ທັງໝົດຂອງເວັບໄຊທີ່ທ່ານມີຢູ່ແລ້ວ {/*using-react-for-an-entire-subroute-of-your-existing-website*/}

ສົມມຸດວ່າທ່ານມີເວັບແອັບທີ່ມີຢູ່ແລ້ວທີ່ `example.com` ສ້າງໂດຍ server technology ອື່ນ (ເຊັ່ນ Rails), ແລະ ທ່ານຕ້ອງການ implement routes ທັງໝົດທີ່ຂຶ້ນຕົ້ນດ້ວຍ `example.com/some-app` ຢ່າງເຕັມທີດ້ວຍ React.

ນີ້ແມ່ນວິທີການທີ່ເຮົາແນະນຳໃນການຕັ້ງຄ່າ:

1. **ສ້າງສ່ວນ React ຂອງແອັບທ່ານ** ໂດຍໃຊ້ໜຶ່ງໃນ [React-based frameworks](/learn/start-a-new-react-project).
2. **ກຳນົດ `/some-app` ເປັນ *base path*** ໃນການຕັ້ງຄ່າ framework ຂອງທ່ານ (ນີ້ແມ່ນວິທີການ: [Next.js](https://nextjs.org/docs/api-reference/next.config.js/basepath), [Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/)).
3. **ຕັ້ງຄ່າ server ຂອງທ່ານ ຫຼື proxy** ເພື່ອໃຫ້ request ທັງໝົດພາຍໃຕ້ `/some-app/` ນັ້ນ handle ໂດຍ React app ຂອງທ່ານ.

ນີ້ເຮັດໃຫ້ໝັ້ນໃຈໄດ້ວ່າສ່ວນຂອງ React ຂອງແອັບທ່ານ [ຮັບຜົນປະໂຫຍດຈາກ best practices ທີ່ສຸດ](/learn/start-a-new-react-project#can-i-use-react-without-a-framework) ທີ່ຢູ່ໃນ framework ເຫຼົ່ານັ້ນ.

Framework ທີ່ໃຊ້ React ຈຳນວນຫຼາຍເປັນ full-stack ແລະ ເຮັດໃຫ້ React app ຂອງທ່ານໃຊ້ປະໂຫຍດຈາກ server. ເຖິງຢ່າງໃດກໍຕາມ, ທ່ານສາມາດໃຊ້ວິທີການດຽວກັນໄດ້ບໍ່ວ່າທ່ານຈະບໍ່ສາມາດ ຫຼື ບໍ່ຕ້ອງການທີ່ຈະແລ່ນ JavaScript ເທິງ server. ໃນກໍລະນີນີ້, serve HTML/CSS/JS export([`next export` output](https://nextjs.org/docs/advanced-features/static-html-export) ສຳລັບ Next.js, ຄ່າເລີ່ມຕົ້ນສຳລັບ Gatsby) ທີ່ `/some-app` ແທນ.

## ການໃຊ້ React ສຳລັບສ່ວນໜຶ່ງຂອງໜ້າທີ່ມີຢູ່ແລ້ວ {/*using-react-for-a-part-of-your-existing-page*/}

ສົມມຸດວ່າທ່ານມີ page ທີ່ສ້າງໂດຍເຕັກໂນໂລຊີອື່ນຢູ່ແລ້ວ (ບໍ່ວ່າຈະເປັນ server ເຊັ່ນ Rails, ຫຼື client ຢ່າງ Backbone), ແລະ ທ່ານຕ້ອງການ render interactive React components ບ່ອນໃດໜຶ່ງຂອງ page. ມັນເປັນວິທີທົ່ວໄປໃນການ integrate React--ໃນຄວາມເປັນຈິງ, ມັນເປັນວິທີທີ່ React ຖືກໃຊ້ຢູ່ Meta ມາຫຼາຍປີແລ້ວ!

ທ່ານສາມາດເຮັດໃນ 2 ຂັ້ນຕອນ:

1. **ຕັ້ງຄ່າ JavaScript environment** ທີ່ເຮັດໃຫ້ທ່ານສາມາດໃຊ້ [JSX syntax](/learn/writing-markup-with-jsx), ແຍະ code ຂອງທ່ານເປັນ module ດ້ວຍ [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) syntax, ແລະ ໃຊ້  packages (ຍົກຕົວຢ່າງ, React) ຈາກ [npm](https://www.npmjs.com/) package registry.
2. **Render React components ຂອງທ່ານ** ບ່ອນທີ່ທ່ານຕ້ອງການເຫັນມັນເທິງ page.

ວິທີການທີ່ແນ່ນອນແມ່ນຂຶ້ນກັບການຕັ້ງຄ່າຂອງ page ທີ່ທ່ານມີຢູ່ແລ້ວ, ສະນັ້ນເຮົາມາເບິ່ງລາຍລະອຽດກັນ.

### ຂັ້ນຕອນທີ 1: ຕັ້ງຄ່າ modular JavaScript environment {/*step-1-set-up-a-modular-javascript-environment*/}

 JavaScript environment ແບບແຍກສ່ວນ ຊ່ວຍໃຫ້ທ່ານສາມາດຂຽນ React components ຂອງທ່ານໃນແຕ່ລະຟາຍ, ແທນທີ່ຈະຂຽນ code ທັງໝົດຂອງທ່ານໄວ້ໃນຟາຍດຽວ. ນອກຈາກນີ້ຍັງໃຫ້ທ່ານໃຊ້ package ທີ່ຄັກທັງໝົດເຜີຍແຜ່ໂດຍນັກພັດທະນາອື່ນໃນ [npm](https://www.npmjs.com/) registry--ລວມທັງໂຕ React ເອງ! ວິທີເຮັດວຽກຂຶ້ນກັບການຕັ້ງຄ່າທີ່ມີຢູ່ແລ້ວຂອງທ່ານ:

* **ຖ້າແອັບຂອງທ່ານແມ່ນໄດ້ແຍກເປັນແຕ່ລະຟາຍຢູ່ແລ້ວ ໃຊ້`import` statements,** ລອງໃຊ້ການຕັ້ງຄ່າທີ່ທ່ານມີຢູ່ແລ້ວ. ກວດສອບວ່າການຂຽນ `<div />` ໃນ JS code ຂອງທ່ານກໍ່ໃຫ້ເກີດບັນຫາທາງ syntax ຫຼື ບໍ່?. ຖ້າມັນເກີດບັນຫາໂດຍ syntax, ທ່ານອາດຈະຕ້ອງການ [ປ່ຽນ JavaScript code ຂອງທ່ານ ດ້ວຍ Babel](https://babeljs.io/setup), ແລະ ເປີດ [Babel React preset](https://babeljs.io/docs/babel-preset-react) ເພື່ດໃຊ້ JSX.

* **ຖ້າແອັບຂອງທ່ານບໍ່ມີການຕັ້ງຄ່າທີ່ມີຢູ່ແລ້ວສຳລັບ compile JavaScript module,,** ຕັ້ງຄ່າດ້ວຍ[Vite](https://vitejs.devl). Vite community ເບິ່ງແຍງ [ການ integrations ກັບ backend frameworks ຢ່າງຫຼວງຫຼາຍ](https://github.com/vitejs/awesome-vite#integrations-with-backends), ລວມໄປເຖິງ Rails, Django, ແລະ Laravel. ຖ້າວ່າ backend framework ຂອງທ່ານບໍ່ມີໃນລາຍການ, [ປະຕິບັດຕາມຄູ່ມືນີ້](https://vitejs.dev/guide/backend-integration.html) ເພື່ດintegrate Vite builds ກັບກັບ backend ຂອງທ່ານດ້ວຍຕົນເອງ.

ເພື່ອກວດວ່າການຕັ້ງຄ່າຂອງທ່ານເຮັດວຽກໄດ້, ແລ່ນ command ນີ້ໃນ project folder ຂອງທ່ານ:

<TerminalBlock>
npm install react react-dom
</TerminalBlock>

ຫຼັງຈາກນັ້ນເພີ່ມ code ແຖວນີ້ໃນທາງເທິງສຸດຂອງຟາຍ JavaScript ຫຼັກຂອງທ່ານ (ມັນອາດຈະເອີ້ນວ່າ `index.js` ຫຼື `main.js`):

<Sandpack>

```html index.html hidden
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <!-- Your existing page content (in this example, it gets replaced) -->
  </body>
</html>
```

```js src/index.js active
import { createRoot } from 'react-dom/client';

// Clear ເນື້ອຫາ HTML ທີ່ມີຢູ່ແລ້ວ
document.body.innerHTML = '<div id="app"></div>';

// Render React component ຂອງທ່ານແທນ
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

</Sandpack>

ຫາກເນື້ອຫາທັງໝົດຂອງ page ທ່ານຖືກແທນທີໂດຍ "Hello, world!", ທຸກຢ່ງມັນເຮັດວຽກໄດ້! ອ່ານຕໍ່.

<Note>

Integrating a modular JavaScript environment ເຂົ້າໃນ project ທີ່ມີຢູ່ແລ້ວໃນຄັ້ງທຳອິດອາດເຮັດໃຫ້ຮູ້ສຶກຢ້ານ ແຕ່ກະຄຸ້ມຄ່າ! ຫາກທ່ານຕິດບັນຫາ, ລອງໃຊ້ [community resources](/community) ຫຼຶ [Vite Chat](https://chat.vitejs.dev/).

</Note>

### ຂັ້ນຕອນທີ 2: Render React components ໃນທຸກບ່ອນຂອງ page {/*step-2-render-react-components-anywhere-on-the-page*/}

ໃນຂັ້ນຕອນກ່ອນໜ້ານີ້, ທ່ານໄດ້ໃສ່ code ນີ້ຢູ່ທາງເທິງຂອງຟາຍຫຼັກຂອງທ່ານ:

```js
import { createRoot } from 'react-dom/client';

// Clear ເນື້ອຫາ HTML ທີ່ມີຢູ່ແລ້ວ
document.body.innerHTML = '<div id="app"></div>';

// Render React component ຂອງທ່ານແທນ
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

ແນ່ນອນ, ທ່ານບໍ່ຈຳເປັນຕ້ອງເຄຍເນື້ອຫາໃນຟາຍ HTML ທີ່ມີຢູ່ແລ້ວ!

ລຶບ code ນີ້.

ທ່ານອາດຈະຕ້ອງການ render React component ຂອງທ່ານຢູ່ບ່ອນສະເພາະໃນ HTML ຂອງທ່ານ. ເປັນ HTML page (ຫຼື server template ທີ່ generate ມັນ) ແລະ ເພີ່ມ attribute [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) ສະເພາະໃຫ້ກັບ tag ໃດໆ, ຕົວຢ່າງ:

```html
<!-- ... ບ່ອນໃດໜຶ່ງໃນ html ຂອງທ່ານ ... -->
<nav id="navigation"></nav>
<!-- ... html ຕື່ມ ... -->
```

ສິ່ງນີ້ຊ່ວຍໃຫ້ທ່ານຄົ້ນຫາ HTML element ດ້ວຍ [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) ແລະ ສົ່ງຕໍ່ໄປຍັງ [`createRoot`](/reference/react-dom/client/createRoot) ເພື່ອໃຫ້ທ່ານສາມາດ render React component ຂອງທ່ານເອງພາຍໃນ:

<Sandpack>

```html index.html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <p>This paragraph is a part of HTML.</p>
    <nav id="navigation"></nav>
    <p>This paragraph is also a part of HTML.</p>
  </body>
</html>
```

```js src/index.js active
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // TODO: Actually implement a navigation bar
  return <h1>Hello from React!</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
```

</Sandpack>

ສັງເກດວ່າເນື້ອຫາ original HTML content ຈາກ `index.html` ນັ້ນຖືກຮັກສາໄວ້ແນວໃດ, ແຕ່ຕອນນີ້ component `NavigationBar` ຂອງທ່ານຈະປະກົດໃນ `<nav id="navigation">` ຈາກ HTML ຂອງທ່ານ. ອ່ານ[ເອກະສານການນຳໃຊ້ `createRoot`](/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react) ເພື່ອຮຽນຮູ້ເພີມເຕີມກ່ຽວກັບການ render React component ພາຍໃນໜ້າ HTML ທີ່ມີຢູ່ແລ້ວ.

ເມື່ອທ່ານເອົາ React ມາໃຊ້ໃນ project ທີ່ມີຢູ່ແລ້ວຂອງທ່ານ. ມັນເປັນເລື່ອງປົກະຕິທີ່ຈະເລີ່ມຕົ້ນດ້ວຍ interactive components ນ້ອຍໆ (ເຊັ່ນ ປຸ່ມ), ຈາກນັ້ນຄ່ອຍໆ "ເລື່ອນຂຶ້ນໄປ" ຈົນກວ່າໝົດ page ຂອງທ່ານສ້າງດ້ວຍ React. ຖ້າຫານທ່ານເຄີຍຮອດຈຸດນັ້ນ, ພວກເຮົາຂໍແນະນຳໃຫ້ຍ້າຍໄປຍັງ [React framework](/learn/start-a-new-react-project) ທັນທີເພື່ອຮັບປະໂຫຍດສູງສຸດຈາກ React. 

## ການໃຊ້ React Native ໃນແອັບໂທລະສັບ native ທີ່ມີຢູ່ແລ້ວ {/*using-react-native-in-an-existing-native-mobile-app*/}

[React Native](https://reactnative.dev/) ສາມາດ integrated ກັບແອັບ native ທີ່ມີຢູ່ແລ້ວ. ຖ້າທ່ານຕ້ອງການ native app ທີ່ມີຢູ່ແລ້ວຂອງທ່ານສຳລັບແອນດອຍ(Java ຫຼື Kotlin) ຫຼື iOS (Objective-C ຫຼື Swift), [ປະຕິບັດຕາມຄູ່ມືນີ້](https://reactnative.dev/docs/integration-with-existing-apps) ເພື່ອເພີ່ມໜ້າຈໍ React Native screen ໃຫ້ມັນ.
