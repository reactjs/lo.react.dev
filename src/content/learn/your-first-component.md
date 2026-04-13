---
title: Component ທຳອິດຂອງທ່ານ
---

<Intro>

*Components* ແມ່ນໜຶ່ງໃນແນວຄິດຫຼັກຂອງ React. ເປັນພື້ນຖານທີ່ທ່ານສ້າງສ່ວນ user interface (UI), ຊື່ງເຮັດໃຫ້ມັນເປັນບ່ອນທີ່ດີທີ່ສຸດໃນການເລີ່ມເດີນທາງດ້ວຍ React ຂອງທ່ານ!

</Intro>

<YouWillLearn>

* Component ແມ່ນຫຍັງ
* Component ມີບົດບາດແນວໃດໃນແອັບພິເຄຊັ່ນ React
* ວິທີຂຽນ Component React ທຳອິດຂອງທ່ານ

</YouWillLearn>

## Components: Blocks ການສ້າງ UI {/*components-ui-building-blocks*/}

ຢູ່ໃນເວັບ, HTML ໃຫ້ພວກເຮົາສ້າງ document ທີ່ມີໂຄ່ງສ້າງສົມບູນດ້ວຍຊຸດ tags ເຊັ່ນ `<h1>` ແລະ `<li>`:

```html
<article>
  <h1>Component ທຳອິດຂອງຂ້ອຍ</h1>
  <ol>
    <li>Components: Blocks ການສ້າງ UI</li>
    <li>ການກຳນົດ Component</li>
    <li>ການໃຊ້ງານ Component</li>
  </ol>
</article>
```

Markup ທີ່ສະແດງໃນບົດຄວາມນີ້ `<article>`, ຫົວຂໍ້ `<h1>`, ແລະ ສາລະບານ (ແບບຫຍໍ້) ເປັນ order list `<ol>`. Markup ແບບນີ້, ຮ່ວມດ້ວຍ CSS ສຳລັບ style, ແລະ JavaScriopt ສຳລັບ interactivity, ຈະຢູ່ເບື້ອງຫຼັງທຸກໆ sidebar, avatar, modal, dropdown-ທຸກສ່ວນຂອງ UI ທີ່ທ່ານເຫັນໃນໜ້າເວັບ.

React ໃຫ້ທ່ານລວມ markup, CSS, ແລະ JavaScript ເຂົ້າເປັນ custom "components", **UI element ທີ່ໃຊ້ຊໍ້າກັນໄດ້ສຳລັບແອັບຂອງທ່ານ.** code ສາລະບານທີ່ທ່ານເຫັນດ້ານເທິງສາມາດປ່ຽນເປັນ component `<TableOfContents/>` ທ່ານສາມາດສະແດງໄດ້ໃນທຸກ page. ເຖິງຢ່າງໃດກໍ່ຕາມ, ມັນກໍຍັງໃຊ້ tag HTML ຄືເກົ່າເຊັ່ນ `<article>`, `<h1>`, ແລະ ອື່ນໆ.   

ຄືກັນກັບ tags HTML, ທ່ານສາມາດຂຽນ, ສັ່ງ ແລະ ຈັດຊັ້ນວາງ component ເພື່ອອອກແບບທັງໝົດ page. ຕົວຢ່າງ, ໜ້າເອກະສານທີ່ທ່ານກຳລັງອ່ານຢູ່ນີ້ແມ່ນໄດ້ສ້າງມາຈາກ component React:

```js
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

ເມື່ອ project ຂອງທ່ານໃຫຍ່ຂຶ້ນ, ທ່ານຈະສັງເກດເຫັນວ່າຫຼາຍໆ design ຂອງທ່ານສາມາດເຮັດຂຶ້ນໃໝ່ໂດຍໃຊ້ component ທີທ່ານຂຽນໄວ້ແລ້ວມາໃຊ້ຊໍ້າ, ເພື່ອຊ່ວຍເລັ່ງການພັດທະນາຂອງທ່ານ. ສາລະບານຂອງພວກເຮົາດ້ານເທິງສາມາດເພີ່ມໃນໜ້າຈໍໃດກໍໄດ້ດ້ວຍ `<TableOfContents />`! ທ່ານສາມາດເລີ່ມ project ຂອງທ່ານຢ່າງໄວດ້ວຍ component ນັບພັນທີ່ຖືກແບ່ງປັນໂດຍ React open source community ເຊັ່ນ [Chakra UI](https://chakra-ui.com/) ແລະ [Material UI.](https://material-ui.com/)

## ກຳນົດ component {/*defining-a-component*/}

ຕາມປົກະຕິເມື່ອສ້າງ web pages, ນັກພັດທະນາເວັບຈະ markup ເນື້ອຫາຂອງຕົນແລ້ວເພີ່ມ interaction ໂດຍການຕົບແຕ່ງດ້ວຍບາງ JavaScript. ສິ່ງນີ້ເຮັດວຽກໄດ້ດີເມື່ອ interaction ເປັນຫຍັງທີ່ມີກະໄດ້ໃນເວັບ. ປັດຈຸບັນເປັນທີ່ຕ້ອງການສຳລັບຫຼາຍເວັບໄຊ ແລະ ທຸກໆແອັບ. React ໃຫ້ຄວາມສຳຄັນກັບ interaction ເປັນອັນດັບທຳອິດໃນຂະນະທີ່ຍັງໃຊ້ເຕັກໂນໂລຊີເດີມ: **Component React ແມ່ນຟັ່ງຊັ່ນ JavaScript ທີ່ທ່ານສາມາດ _ຕົບແຕ່ງມັນດ້ວຍ markup_** ນີ້ຄືຮູບລັກສະນະທີ່ສະແດງ (ທ່ານສາມາດແກ້ໄຂຕົວຢ່າງດ້ານລຸ່ມນີ້):

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```

```css
img { height: 200px; }
```

</Sandpack>

ແລະ ນີ້ແມ່ນວິທີການສ້າງ Component:

### ຂັ້ນຕອນທີ 1: Export Component {/*step-1-export-the-component*/}

prefix `export default` ແມ່ນ [ມາດຕະຖານ syntax JavaScript](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (ບໍ່ສະເພາະແຕ່ React). ຊ່ວຍໃຫ້ທ່ານ mark ຟັງຊັ່ນຫຼັກໃນຟາຍເພື່ອໃຫ້ທ່ານສາມາດ import ຈາກຟາຍອື່ນໄດ້ໃນພາຍຫຼັງ. (ສຳລັບການ import ເພີ່ມເຕີມໃນ [ການ Import ແລະ Export Components](/learn/importing-and-exporting-components)!)

### ຂັ້ນຕອນທີ 2: ກຳນົດ function {/*step-2-define-the-function*/}

ດ້ວຍ `function Profile() { }` ທ່ານສ້າງຟັງຊັ່ນ JavaScript ດ້ວຍຊື່ `Profile`.

<Pitfall>

Component React ແມ່ນຟັງຊັ່ນ JavaScript ທຳມະດາ, ແຕ່ **ຊື່ຂອງມັນຕ້ອງຂຶ້ນຕົ້ນດ້ວຍໂຕອັກສອນໃຫຍ່** ຖ້າບໍ່ດັ່ງນັ້ນມັນຈະບໍ່ເຮັດວຽກ!

</Pitfall>

### ຂັ້ນຕອນທີ 3: ເພີ່ມ markup {/*step-3-add-markup*/}

Component return ແທັກ `<img />` ດ້ວຍ attribute `src` ແລະ `alt`. `<img />` ຖືກຂຽນຄືກັບ HTML, ແຕ່ອັນທີ່ຈິງແລ້ວມັນຄື JavaScript! Syntax ເຫຼົ່ານີ້ເອີ້ນວ່າ [JSX](/learn/writing-markup-with-jsx), ແລະ ມັນໃຫ້ທ່ານສາມາດ embed markup ໃນ JavaScript ໄດ້.

ສາມາດຂຽນ return statement ທັງໝົດໄດ້ໃນໜຶ່ງແຖວ, ເຊັ່ນດຽວກັບ component ນີ້:

```js
return <img src="https://react.dev/images/docs/scientists/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

ແຕ່ຖ້າ markup ຂອງທ່ານບໍ່ໄດ້ຢູ່ໃນແຖວດຽວກັບ keyword `return`, ທ່ານສາມາດລວມມັນດ້ວຍຄູ່ຂອງວົງເລັບ:

```js
return (
  <div>
    <img src="https://react.dev/images/docs/scientists/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<Pitfall>

ຖ້າບໍ່ມີວົງເລັບ, code ໃດໆທີ່ຢູ່ຫຼັງ `return` [ມັນຈະບໍ່ມີຜົນຫຍັງ](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

</Pitfall>

## ການນຳໃຊ້ component {/*using-a-component*/}

ເມື່ອທ່ານສ້າງ component `Profile` ຂອງທ່ານແລ້ວ, ທ່ານສາມາດຊ້ອນ component ນັ້ນໄວ້ໃນ component ອື່ນໆໄດ້. ຕົວຢ່າງ, ທ່ານສາມາດ export component `Gallery` ທີ່ໃຊ້ component `Profile` ຫຼາຍອັນ:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>ນັກວິທະຍາສາດທີ່ນ່າປະຫຼາດໃຈ</h1>
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

### ສິ່ງທີ່ browser ເຫັນ {/*what-the-browser-sees*/}

ສັງເກດຄວາມແຕກຕ່າງຂອງກໍລະນີ:

* `<section>` ແມ່ນໂຕອັນສອນນ້ອຍ, ສະນັ້ນ React ຮູ້ວ່າໝາຍເຖິງແທັກ HTML.
* `<Profile />` ເລີ່ມຕົ້ນດ້ວຍໂຕອັກສອນໃຫຍ່ `P`, ສະນັ້ນ React ຮູ້ວ່າພວກເຮົາຕ້ອງການໃຊ້ component ຂອງພວກເຮົາທີ່ຊື່ວ່າ `Profile`.

ແລະ `Profile` ມີ HTML ຫຼາຍຂຶ້ນ: `<img />`. ທ້າຍສຸດ, ນີ້ແມ່ນສິ່ງທີ browser ເຫັນ:

```html
<section>
<<<<<<< HEAD
  <h1>ນັກວິທະຍາສາດທີ່ນ່າປະຫຼາດໃຈ</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
=======
  <h1>Amazing scientists</h1>
  <img src="https://react.dev/images/docs/scientists/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://react.dev/images/docs/scientists/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://react.dev/images/docs/scientists/MK3eW3As.jpg" alt="Katherine Johnson" />
>>>>>>> abe931a8cb3aee3e8b15ef7e187214789164162a
</section>
```

### ການຊ້ອນ ແລະ ຈັດວາງ components {/*nesting-and-organizing-components*/}

Components ແມ່ນຟັງຊັ່ນ JavaScript ທຳມະດາ, ສະນັ້ນທ່ານສາມາດຮັກສາຫຼາຍ component ໃນຟາຍດຽວໄດ້. ວິທີນີ້ສະດວກເມື່ອ component ມີຂະໜາດນ້ອຍ ຫຼື ກ່ຽວພັນກັນຫຼາຍ. ຖ້າຟາຍນີ້ມີຈຳນວນຫຼາຍ, ທ່ານສາມາດຍ້າຍ `Profile` ແຍກໄປເປັນອີກຟາຍໄດ້ຕະຫຼອດເວລາ. ທ່ານຈະໄດ້ຮຽນວິທີດຳເນີນການນີ້ໄວໆໃນ [ໜ້າກ່ຽວກັບ imports.](/learn/importing-and-exporting-components)

ເພາະວ່າ component `Profile` ແມ່ນສະແດງໃນ `Gallery`-ເຖິງວ່າຫຼາຍຄັ້ງ!-ພວກເຮົາສາມາດເວົ້າໄດ້ວ່າ `Gallery` ແມ່ນ **parent component,** ສະແດງແຕ່ລະ `Profile` ເປັນ "child". ນີ້ເປັນສ່ວນໜຶ່ງຂອງຄວາມມະຫັດສະຈັນຂອງ React: ທ່ານສາມາດປະກາດ component ຄັ້ງໜຶ່ງ, ແລະ ສາມາດໃຊ້ມັນໃນຫຼາຍໆບ່ອນ ແລະ ຫຼາຍຄັ້ງຕາມທີ່ທ່ານຕ້ອງການ.

<Pitfall>

Component ສາມາດສະແດງ component ອື່ນ, ແຕ່ **ທ່ານຕ້ອງບໍ່ຊ້ອນຄວາມໝາຍຂອງມັນ:**

```js {2-5}
export default function Gallery() {
  // 🔴 ຢ່າປະກາດ component ໃນ component ອື່ນ!
  function Profile() {
    // ...
  }
  // ...
}
```

ຊຸດ snippet ດ້ານເທິງແມ່ນ [ຊ້າຫຼາຍ ແລະ ເຮັດໃຫ້ເກີດບັນຫາ](/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state) ແທນທີ, ກຳນົດທຸກໆ component ໃນດ້ານເທິງສຸດຂອງຊັ້ນ:

```js {5-8}
export default function Gallery() {
  // ...
}

// ✅ ປະກາດ component ຢູ່ຊັ້ນເທິງສຸດ
function Profile() {
  // ...
}
```

ເມື່ອ Component ລູກຕ້ອງການບາງຂໍ້ມູນຈາກແມ່, [ສົ່ງຜ່ານໂດຍ props](/learn/passing-props-to-a-component) ແທນທີ່ຈະຊ້ອນຄວາມໝາຍມັນ.

</Pitfall>

<DeepDive>

#### Components ທັງໝົດລົງໄປ {/*components-all-the-way-down*/}

<<<<<<< HEAD
ແອັບພິເຄຊັ່ນ React ຂອງທ່ານເລີ່ມຕົ້ນດ້ວຍ "root" component. ສ່ວນຫຼາຍ, ມັນຖືກສ້າງໂດຍອັດຕະໂນມັດຕອນທ່ານສ້າງ project ໃໝ່. ຕົວຢ່າງ, ຖ້າທ່ານເຫັນ [CodeSandbox](https://codesandbox.io/) ຫຼື [ສ້າງແອັບ React](https://create-react-app.dev/), root component ຖືກປະກາດໃນ `src/App.js`. ຖ້າທ່ານໃຊ້ framework, [Next.js](https://nextjs.org/), root component ຖືກປະກາດໃນ `pages/index.js`. ໃນຕົວຢ່າງນີ້, ທ່ານໄດ້ export root component.
=======
Your React application begins at a "root" component. Usually, it is created automatically when you start a new project. For example, if you use [CodeSandbox](https://codesandbox.io/) or if you use the framework [Next.js](https://nextjs.org/), the root component is defined in `pages/index.js`. In these examples, you've been exporting root components.
>>>>>>> 68f417a600c7d7b8c4131e39f8a843a856ae3909

ແອັບ React ສ່ວນຫຼາຍໃຊ້ compent ທັງໝົດລົງໄປ. ນີ້ໝາຍຄວາມວ່າທ່ານບໍ່ພຽງຈະໃຊ້ຊີ້ນສ່ວນ component ທີ່ສາມາດນຳໃຊ້ໄດ້ໃໝ່ເຊັ່ນ ປຸ່ມກົດ ເທົ່ານັ້ນ, ແຕ່ສຳລັບຊີ້ນສ່ວນທີ່ໃຫຍ່ຂຶ້ນເຊັ່ນ sidebars, list ແລະ ໃນທີ່ສຸດ, ໝົດ page! Component ເປັນວິທີທີ່ສະດວກໃນການຈັດລະບຽບ code UI ແລະ markup, ເຖິງວ່າບາງ component ແມ່ນໃຊ້ໄດ້ພຽງເທື່ອດຽວ. 

[React-based frameworks](/learn/start-a-new-react-project) ກ້າວໄປອີກຂັ້ນ. ແທນທີ່ຈະໃຊ້ຟາຍ HTML ເປົ່າ ແລະ ປ່ອຍໃຫ້ React "ເຂົ້າຄວບຄຸມ" ຈັດການ page ດ້ວຍ JavaScript, ມັນ *ຍັງ* ສ້າງ HTML ໂດຍອັດຕະໂນມັດຈາກ Component React. ສິ່ງນີ້ເຮັດໃຫ້ແອັບຂອງທ່ານສະແດງບາງເນື້ອຫາກ່ອນທີ່ code JavaScript ຈະໂຫຼດ.

ເຖິງວ່າ, ຫຼາຍເວັບໄຊຈະໃຊ້ React ເພື່ອ [ເພີ່ມ interactivity ໃສ່ HTML pages ທີ່ມີຢູ່ແລ້ວ.](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) ພວກເຂົາມີຫຼາຍ root components ແທນທີ່ຈະມີພຽງອັນດຽວສຳລັບໝົດ page. ທ່ານສາມາດໃຊ້ຫຼາຍ ຫຼື ໜ້ອຍຕາມທີ່ທ່ານຕ້ອງການ.

</DeepDive>

<Recap>

ທ່ານຫາກໍໄດ້ລອງລົດຊາດ React ເປັນເທື່ອທຳອິດ! ເຮົາມາສະຫຼຸບປະເດັນສຳຄັນກັນ.

* React ຊ່ວຍໃຫ້ທ່ານສ້າງ components, **UI elements ທີ່ໃຊ້ຊໍ້າກັນໄດ້ສຳລັບແອັບຂອງທ່ານ.**
* ໃນ React app, ທຸກໆສ່ວນຂອງ UI ແມ່ນ component.
* Component React ແມ່ນຟັງຊັ່ນ JavaScript ທຳມະດາ ຍົກເວັ້ນ:

  1. ຊື່ຂອງມັນຕ້ອງເລີ່ມຕົ້ນດ້ວຍໂຕອັກສອນໂຕໃຫຍ່.
  2. ມັນ return JSX markup.

</Recap>



<Challenges>

#### ການ Export component {/*export-the-component*/}

Sanbox ນີ້ບໍ່ເຮັດວຽກຍ້ອນວ່າ root component ບໍ່ຖືກ export:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

ລອງແກ້ໄຂດ້ວຍໂຕທ່ານເອງກ່ອນໄປເບິ່ງຄຳຕອບ!

<Solution>

ເພີ່ມ `export default` ກ່ອນຈຸດປະສົງຂອງຟັງຊັ່ນດັ່ງນີ້: 

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

You might be wondering why writing `export` alone is not enough to fix this example. You can learn the difference between `export` and `export default` in [Importing and Exporting Components.](/learn/importing-and-exporting-components)

</Solution>

#### ແກ້ return statement {/*fix-the-return-statement*/}

ມີບາງຢ່າງບໍ່ຖືກຕ້ອງກ່ຽວກັບ `return` statement. ທ່ານແກ້ໄດ້ບໍ່?

<Hint>

You may get an "Unexpected token" error while trying to fix this. In that case, check that the semicolon appears *after* the closing parenthesis. Leaving a semicolon inside `return ( )` will cause an error.

</Hint>


<Sandpack>

```js
export default function Profile() {
  return
    <img src="https://react.dev/images/docs/scientists/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

<Solution>

ທ່ານສາມາດແປງ component ນີ້ໂດຍການຍ້າຍ return statement ເປັນໜຶ່ງແຖວດັ່ງນີ້:

<Sandpack>

```js
export default function Profile() {
  return <img src="https://react.dev/images/docs/scientists/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

ຫຼຶ ໂດຍການລວມ return JSX markup ໃນວົງເລັບທີ່ເປີດຫຼັງຈາກ `return`:

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/jA8hHMpm.jpg"
      alt="Katsuko Saruhashi"
    />
  );
}
```

```css
img { height: 180px; }
```

</Sandpack>

</Solution>

#### ລະບຸຄວາມຜິດພາດ {/*spot-the-mistake*/}

ມີບາງຢ່າງຜິດປົກະຕິກັບວິທີການປະກາດ ແລະ ໃຊ້ component `Profile`. ທ່ານເຫັນຂໍ້ຜິດພາດ ຫຼື ບໍ່? (ພະຍາຍາມຈື່ວິທີທີ່ React ແຍກ component ຈາກແທັກ HTML ທຳມະດາ!)

<Sandpack>

```js
function profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>ນັກວິທະຍາສາດທີ່ນ່າປະຫຼາດໃຈ</h1>
      <profile />
      <profile />
      <profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

<Solution>

ຊື່ Component React ຕ້ອງຂຶ້ນຕົ້ນດ້ວຍໂຕອັກສອນໂຕໃຫຍ່.
React component names must start with a capital letter.

ປ່ຽນ `function profile()` ເປັນ `function Profile()`, ແລະ ຈາກນັ້ນປ່ຽນທຸກໆ `<profile />` ເປັນ `<Profile />`:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>ນັກວິທະຍາສາດທີ່ນ່າປະຫຼາດໃຈ</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

</Solution>

#### Component ຂອງທ່ານ {/*your-own-component*/}

ຂຽນ component ຈາກເລີ່ມຕົ້ນ. ທ່ານສາມາດຕັ້ງຊື່ທີ່ຖືກຕ້ອງ ແລະ return markup ໃດກໍ່ໄດ້. ຖ້າທ່ານຄິດບໍ່ອອກ, ທ່ານສາມາດຂຽນ component `Congratulations` ທີ່ສະແດງ `<h1>ເກັ່ງຫຼາຍ!</h1>`. ຢ່າລືມ export ມັນນຳ!

<Sandpack>

```js
// ຂຽນ component ຂອງທ່ານດ້ານລຸ່ມ!

```

</Sandpack>

<Solution>

<Sandpack>

```js
export default function Congratulations() {
  return (
    <h1>ເກັ່ງຫຼາຍ!</h1>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
