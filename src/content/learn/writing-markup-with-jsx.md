---
title: ຂຽນ Markup ດ້ວຍ JSX
---

<Intro>

*JSX* ແມ່ນ syntax extension ສຳລັບ JavaScript ທີ່ໃຫ້ທ່ານຂຽນ markup ຄ້າຍຄື HTML ພາຍໃນຟາຍ JavaScript. ເຖິງວ່າຈະມີຫຼາຍວິທີໃນການຂຽນ component, ນັກພັດທະນາ React ສ່ວນຫຼາຍມັກຄວາມງ່າຍຂອງ JSX, ແລະ codebase ສ່ວນຫຼາຍກໍໃຊ້ວິທີນີ້.

</Intro>

<YouWillLearn>

* ເປັນຫຍັງ React ຈິ່ງປົນ markup ກັບ logic ການສະແດງຜົນ
* JSX ແຕກຕ່າງຈາກ HTML ແນວໃດ
* ວິທີການສະແດງຂໍ້ມູນດ້ວຍ JSX

</YouWillLearn>

## JSX: ການໃສ່ markup ລົງໃນ JavaScript {/*jsx-putting-markup-into-javascript*/}

ເວັບຖືກສ້າງມາຈາກ HTML, CSS ແລະ JavaScript. ໃນເວລາຫຼາຍປີ, ນັກພັດທະນາເວັບໄຊເກັບເນື້ອຫາໄວ້ໃນ HTML, ອອກແບບໃນ CSS ແລະ ສ້າງ logic ໄວ້ໃນ JavaScript ເຊິ່ງມັກຈະຢູ່ຄົນລະຟາຍ! ເນື້ອຫາແມ່ນ markup ພາຍໃນ HTML ໃນຂະນະ logic ຂອງ page ແມ່ນຢູ່ຄົນລະຟາຍໃນ JavaScript:

<DiagramGroup>

<Diagram name="writing_jsx_html" height={237} width={325} alt="HTML markup with purple background and a div with two child tags: p and form. ">

HTML

</Diagram>

<Diagram name="writing_jsx_js" height={237} width={325} alt="Three JavaScript handlers with yellow background: onSubmit, onLogin, and onClick.">

JavaScript

</Diagram>

</DiagramGroup>

ແຕ່ເວັບໄຊມີການໂຕ້ຕອບຫຼາຍຂຶ້ນ, logic ກໍກຳນົດເນື້ອຫາຫຼາຍຂຶ້ນ. JavaScript ຮັບຜິດຊອບ HTML! ນີ້ຈິງເປັນເຫດຜົນທີ່ **ໃນ React, logic ຂອງການສະແດງຜົນ ແລະ markup ຢູ່ຮ່ວມກັນໃນບ່ອນດຽວກັນ-comopnents.**

<DiagramGroup>

<Diagram name="writing_jsx_sidebar" height={330} width={325} alt="React component with HTML and JavaScript from previous examples mixed. Function name is Sidebar which calls the function isLoggedIn, highlighted in yellow. Nested inside the function highlighted in purple is the p tag from before, and a Form tag referencing the component shown in the next diagram.">

`Sidebar.js` component React 

</Diagram>

<Diagram name="writing_jsx_form" height={330} width={325} alt="React component with HTML and JavaScript from previous examples mixed. Function name is Form containing two handlers onClick and onSubmit highlighted in yellow. Following the handlers is HTML highlighted in purple. The HTML contains a form element with a nested input element, each with an onClick prop.">

`Form.js` component React 

</Diagram>

</DiagramGroup>

ຮັກສາ logic ການສະແດງຂອງປຸ່ມ ແລະ markup ໄວ້ນຳກັນເຮັດໃຫ້ໝັ້ນໃຈໄດ້ວ່າປຸ່ມທັງສອງຈະ sync ກັນ ໃນທຸກການແກ້ໄຂ. ໃນທາງກົງກັນຂ້າມ, ລາຍລະອຽດທີ່ບໍ່ກ່ຽວຂ້ອງ, ເຊັ່ນ markup ຂອງປຸ່ມກົດ ແລະ markup ຂອງ sidebar, ແມ່ນຖືກແຍກກັນ, ເຮັດໃຫ້ປອດໄພໄດ້ກວ່າການປ່ຽນຢ່າງໃດຢ່າງໜຶ່ງດ້ວຍຕົວເອງ.

ແຕ່ລະ component React ແມ່ນຟັງຊັ່ນ JavaScript ທີ່ອາດປະກອບມີບາງ markup ທີ່ React ສະແດງໃນບາວເຊີ. Component React ໃຊ້ syntax extension ເອີ້ນວ່າ JSX ເພື່ອນຳສະເໜີ markup ນັ້ນ. JSX ແມ່ນຄ້າຍຄືກັບ HTML ຫຼາຍ, ແຕ່ມັນເຂັ້ມງວດກວ່າໜ້ອຍໜຶ່ງ ແລະ ສາມາດສະແດງຂໍ້ມູນທີ່ເປັນ dynamic. ວິທີທີ່ດີທີ່ສຸດໃນການທຳຄວາມເຂົ້າໃຈສິ່ງນີ້ຄືການແປງ markup HTML ມາເປັນ markup JSX.

<Note>

JSX ແລະ React ເປັນສອງຢ່າງທີ່ແຍກກັນ. ສ່ວນຫຼາຍມັນໃຊ້ຮ່ວມກັນ, ແຕ່ທ່ານ *ສາມາດ* [ໃຊ້ແຍກສ່ວນ](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) ຂອງກັນ ແລະ ກັນ. JSX ແມ່ນ syntax extension, ໃນຂະນະ React ແມ່ນ JavaScript library.

</Note>

## ການແປງ HTML ເປັນ JSX {/*converting-html-to-jsx*/}

ສົມມຸດວ່າທ່ານມີ HTML ບາງສ່ວນ (ຖືກຕ້ອງຄົບຖ້ວນ):

```html
<h1>Todos ຂອງ Hedy Lamarr</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>ປະດິດສັນຍານໄຟຈາລະຈອນໃໝ່
    <li>ຊ້ອມສາກຮູບເງົາ
    <li>ປັບປຸງເຕັກໂນໂລຊີ spectrum
</ul>
```

ແລະ ທ່ານຕ້ອງການເອົາໄປໃສ່ໃນ component ຂອງທ່ານ:

```js
export default function TodoList() {
  return (
    // ???
  )
}
```

ຖ້າທ່ານ copy ແລະ paste ຕາມທີ່ເປັນຢູ່, ມັນຈະບໍ່ເຮັດວຽກ:


<Sandpack>

```js
export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1>Todos ຂອງ Hedy Lamarr</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    >
    <ul>
      <li>ປະດິດສັນຍານໄຟຈາລະຈອນໃໝ່
      <li>ຊ້ອມສາກຮູບເງົາ
      <li>ປັບປຸງເຕັກໂນໂລຊີ spectrum
    </ul>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

ນີ້ເປັນເພາະວ່າ JSX ເຂັ້ມງວດກວ່າ ແລະ ມີກົດຫຼາຍກວ່າ HTML! ຖ້າທ່ານອ່ານຂໍ້ຄວາມສະແດງຄວາມຜິດພາດດ້ານເທິງ, ຂໍ້ຄວາມດັ່ງກ່າວຈະແນະນຳໃຫ້ທ່ານແກ້ໄຂ markup, ຫຼື ທ່ານສາມາດປະຕິບັດຕາມຄຳແນະນຳດ້ານລຸ່ມນີ້.

<Note>

ໂດຍສ່ວນຫຼາຍ, ຂໍ້ຄວາມສະແດງຂໍ້ຜິດພາດເທິງໜ້າຈໍຂອງ React ຈະຊ່ວຍໃຫ້ທ່ານຮູ້ວ່າບັນຫາຢູ່ຈຸດໃດ. ອ່ານໃຫ້ຈົບຖ້າທ່ານຕິດບັນຫາ!

</Note>

## ກົດຂອງ JSX {/*the-rules-of-jsx*/}

### 1. Return ໜຶ່ງ root element {/*1-return-a-single-root-element*/}

ເພື່ອ return ຫຼາຍ element ຈາກ component, **ໃຫ້ລວມມັນໄວ້ໃນ parent tag ດຽວ**

ຕົວຢ່າງ, ທ່ານສາມາດໃຊ້ `<div>`: 

```js {1,11}
<div>
  <h1>Todos ຂອງ Hedy Lamarr</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```


ຖ້າທ່ານບໍ່ຕ້ອງການເພີ່ມ `<div>` ອີກໃນ markup ຂອງທ່ານ, ທ່ານສາມາດຂຽນ `<>` ແລະ `</>` ແທນ:

```js {1,11}
<>
  <h1>Todos ຂອງ Hedy Lamarr</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

tag ເປົ່າວ່າງນີ້ເອີ້ນວ່າ *[Fragment.](/reference/react/Fragment)* Fragment ຊ່ວຍໃຫ້ທ່ານລວມສິ່ງຕ່າງໆໂດຍບໍ່ສະແດງຫຍັງໃນ  browser tree ຂອງ HTML.

<DeepDive>

#### ເປັນຫຍັງຫຼາຍ tags JSX ເຖິງຕ້ອງການລວມ? {/*why-do-multiple-jsx-tags-need-to-be-wrapped*/}

JSX ຄ້າຍຄື HTML, ແຕ່ເບື້ອງຫຼັງແມ່ນຈະຖືກປ່ຽນມາເປັນ object JavaScript ທຳມະດາ. ທ່ານບໍ່ສາມາດ return 2 object ຈາກຟັງຊັ່ນໂດຍບໍ່ລວມມັນຢູ່ array. ນີ້ອະທິບາຍວ່າເປັນຫຍັງທ່ານຈິງບໍ່ສາມາດ return 2 tag JSX ໂດຍບໍ່ລວມມັນເປັນ tag ອື່ນ ຫຼື Fragment.

</DeepDive>

### 2. ປິດ tags ທັງໝົດ {/*2-close-all-the-tags*/}

JSX ກຳນົດໃຫ້ tag ຕ້ອງປິດເທົ່ານັ້ນ: tag ທີ່ປິດດ້ວຍຕົວເອງເຊັ່ນ `<img>` ຕ້ອງເປັນ `<img />`, ແລະ ລວມ tag ເຊັ່ນ `<li>ໝາກກ້ຽງ` ຕ້ອງຖືກຂຽນແບບນີ້ `<li>ໝາກກ້ຽງ</li>`.

ນີ້ແມ່ນວິທີປິດ ຮູບ ແລະ list items ຂອງ Hedy Lamarr:

```js {2-6,8-10}
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
    <li>ປະດິດສັນຍານໄຟຈາລະຈອນໃໝ່</li>
    <li>ຊ້ອມສາກຮູບເງົາ</li>
    <li>ປັບປຸງເຕັກໂນໂລຊີ spectrum</li>
  </ul>
</>
```

### 3. camelCase <s>ເກືອບ</s> ທຸກຢ່າງ! {/*3-camelcase-salls-most-of-the-things*/}

JSX ປ່ຽນເປັນ JavaScript ແລະ attribute ທີ່ຂຽນດ້ວຍ JavScript ກາຍເປັນ key ຂອງ object JavaScript. ໃນ component ຂອງທ່ານ, ທ່ານຢາກຈະອ່ານ attribute ເຫຼົ່ານັ້ນເປັນຕົວແປຢູ່ສະເໝີ. ແຕ່ JavaScript ມີຂໍ້ຈຳກັດສຳລັບຊື່ຕົວແປ. ຕົວຢ່າງ, ຊື່ມັນບໍ່ສາມາດປະກອບມີເຄື່ອງໝາຍຂີດຕໍ່ ຫຼື ຊື່ທີສະຫງວນໄວ້ ເຊັ່ນ `class`.

ນີ້ແມ່ນເຫດຜົນວ່າເປັນຫຍັງ, ໃນ React, ຫຼາຍ attribute HTML ແລະ SVG ຖືກຂຽນເປັນແບບ camelCase. ຕົວຢ່າງ, ແທນທີ່ `stroke-width` ທ່ານໃຊ້ `strokeWidth`. ນັບແຕ່ `class` ຖືກສະຫງວນ, ໃນ React ທ່ານຂຽນ `className` ແທນ, ຊື່ຫຼັງຈາກ  [DOM property ທີ່ກ່ຽວຂ້ອງ](https://developer.mozilla.org/en-US/docs/Web/API/Element/className):

```js {4}
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```

ທ່ານສາມາດ [ຄົ້ນຫາ attribute ເຫຼົ່ານີ້ໃນ list ຂອງ DOM component props.](/reference/react-dom/components/common) ຖ້າທ່ານເຂົ້າໃຈອັນໃດອັນໜຶ່ງຜິດ, ບໍ່ຕ້ອງຢ້ານ-React ຈະສະແດງຂໍ້ຄວາມພ້ອມກັບສິ່ງທີ່ຈະເປັນໄປໄດ້ໃນ [browser console.](https://developer.mozilla.org/docs/Tools/Browser_Console)

<Pitfall>

ສຳລັບເຫດຜົນທາງປະຫວັດສາດ, [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) ແລະ [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) attribute ແມ່ນຖືກຂຽນໃນ HTML ດ້ວຍເຄື່ອງໝາຍຂີດຕໍ່.

</Pitfall>

### Pro-tip: ໃຊ້ JSX Converter {/*pro-tip-use-a-jsx-converter*/}

ການແປງ attribute ທັງໝົດໃນ markup ທີ່ມີຢູ່ອາດເປັນເລື່ອງທີ່ນ່າເບື່ອ! ພວກເຮົາແນະນຳໃຊ້ [converter](https://transform.tools/html-to-jsx) ເພື່ອແປງ HTML ແລະ SVG ທີ່ມີຢູ່ແລ້ວຂອງທ່ານເປັນ JSX. Converters ແມ່ນມີປະໂຫຍດຫຼາຍໃນທາງປະຕິບັດ, ແຕ່ກໍຍັງຄຸ້ມຄ່າທີ່ຈະທຳຄວາມເຂົ້າໃຈກັບສິ່ງທີ່ເກີດຂຶ້ນ ເພື່ອໃຫ້ທ່ານສາມາດຂຽນ JSX ດ້ວຍຕົນເອງຢ່າງສະບາຍໃຈ.

ນີ້ແມ່ນຜົນລັບສຸດທ້າຍຂອງທ່ານ:

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
        <li>ປະດິດສັນຍານໄຟຈາລະຈອນໃໝ່</li>
        <li>ຊ້ອມສາກຮູບເງົາ</li>
        <li>ປັບປຸງເຕັກໂນໂລຊີ spectrum</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

<Recap>

ຕອນນີ້ທ່ານຮູ້ແລ້ວວ່າເປັນຫຍັງຈື່ງມີ JSX ແລະ ວິທີການໃຊ້ມັນໃນ component:

* Logic ການສະແດງຜົນກຸ່ມ component ພ້ອມກັບ markup ເພາະວ່າມັນກ່ຽວຂ້ອງກັນ.
* JSX ຄ້າຍກັບ HTML, ແຕ່ມີຄວາມແຕກຕ່າງກັນໜ້ອຍໜຶ່ງ. ທ່ານສາມາດໃຊ້ [converter](https://transform.tools/html-to-jsx) ຖ້າທ່ານຕ້ອງການ.
* ຂໍ້ຄວາມສະແດງຂໍ້ຜິດພາດສ່ວນຫຼາຍຈະແນະນຳທ່ານໄປໃນທາງທີ່ຖືກຕ້ອງເພື່ອແກ້ໄຂ markup ຂອງທ່ານ.

</Recap>



<Challenges>

#### ແປງບາງ HTML ເປັນ JSX {/*convert-some-html-to-jsx*/}

HTML ນີ້ຖືກ paste ເປັນ component, ແຕ່ບໍ່ແມ່ນ JSX ທີ່ຖືກຕ້ອງ. ແກ້ມັນ:

<Sandpack>

```js
export default function Bio() {
  return (
    <div class="intro">
      <h1>ຍິນດີຕ້ອນຮັບສູ່ເວັບໄຊຂອງຂ້ອຍ</h1>
    </div>
    <p class="summary">
      ທ່ານສາມາດຄົ້ນຫາຄວາມຄິດຂ້ອຍໄດ້ບ່ອນນີ້
      <br><br>
      <b>ແລະ <i>ຮູບ</b></i> ຂອງນັກວິທະຍາສາດ!
    </p>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

ບໍ່ວ່າຈະເຮັດດ້ວຍຕົນເອງ ຫຼື ໃຊ້ converter ແມ່ນຂຶ້ນກັບໂຕທ່ານ!

<Solution>

<Sandpack>

```js
export default function Bio() {
  return (
    <div>
      <div className="intro">
        <h1>ຍິນດີຕ້ອນຮັບສູ່ເວັບໄຊຂອງຂ້ອຍ</h1>
      </div>
      <p className="summary">
        ທ່ານສາມາດຄົ້ນຫາຄວາມຄິດຂ້ອຍໄດ້ບ່ອນນີ້
        <br /><br />
        <b>And <i>pictures</i></b> of scientists!
      </p>
    </div>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

</Solution>

</Challenges>
