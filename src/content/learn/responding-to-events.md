---
title: ການ Respond ຕໍ່ Events
---

<Intro>

React ໃຫ້ທ່ານເພີ່ມ *event handlers* ໃນ JSX ຂອງທ່ານ. Event handler ແມ່ນຟັງຊັ່ນຂອງທ່ານເອງທີ່ຈະຖືກ trigger ໃຫ້ຕອບສະໜອງຕໍ່ interaction ເຊັ່ນ ການຄິກ, ການ hover, ການ focus form input ແລະ ອື່ນໆ.

</Intro>

<YouWillLearn>

* ວິທີຕ່າງໆໃນການຂຽນ event handler
* ວິທີການສົ່ງຜ່ານ logic ຂອງ event handler ຈາກ parent component
* Event ກະຈາຍແນວໃດ ແລະ ຈະຢຸດແນວໃດ

</YouWillLearn>

## ການເພີ່ມ event handlers {/*adding-event-handlers*/}

ໃນການເພີ່ມ event handler, ທຳອິດທ່ານຈະຕ້ອງກຳນົດຟັງຊັ່ນ ຈາກນັ້ນ [ສົ່ງຜ່ານເປັນ prop](/learn/passing-props-to-a-component) ໄປຫາແທັກ JSX ທີ່ເໝາະສົມ. ຕົວຢ່າງ, ນີ້ແມ່ນປຸ່ມທີ່ຍັງບໍ່ທັນໄດ້ເຮັດຫຍັງ:

<Sandpack>

```js
export default function Button() {
  return (
    <button>
      I don't do anything
    </button>
  );
}
```

</Sandpack>

ທ່ານສາມາດກຳນົດໃຫ້ສະແດງຂໍ້ຄວາມເມື່ອຜູ້ໃຊ້ຄິກໂດຍປະຕິບັດຕາມສາມຂັ້ນຕອນ:

1. ປະກາດຟັງຊັ່ນທີ່ເອີ້ນວ່າ `handleClick` *ພາຍໃນ* component `Button` ຂອງທ່ານ.
2. Implement logic ພາຍໃນຟັງຊັ່ນນັ້ນ (ໃຊ້ `alert` ເພື່ອສະແດງຂໍ້ຄວາມ).
3. ເພີ່ມ `onClick={handleClick}` ໃນ `<button>` JSX.

<Sandpack>

```js
export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

ທ່ານກຳນົດຟັງຊັ່ນ `handleClick` ຈາກນັ້ນ [ສົ່ງຜ່ານເປັນ prop](/learn/passing-props-to-a-component) ເປັນ `<botton>`. `handleClick` ເປັນ **event handler.** ຟັງຊັ່ນ Event handler:

* ມັກຖືກກຳນົດ *ພາຍໃນ* component ຂອງທ່ານ.
* ມີຊື່ຂຶ້ນຕົ້ນດ້ວຍ `handle`, ຕາມດ້ວຍຊື່ event.

ຕາມແບບແຜນ, ມັນເປັນເລື່ອງປົກະຕິທີ່ຈະຕັ້ງຊື່ event handler ເປັນ `handle` ຕາມດ້ວຍຊື່ event. ທ່ານມັກຈະເຫັນ `onClick={handleClick}`, `onMouseEnter={handleMouseEnter}`, ແລະ ອື່ນໆ

ຫຼື ທ່ານສາມາດກຳນົດ event handler ແບບແຖວດຽວໃນ JSX:

```jsx
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```

ຫຼື, ກະຊັບຫຼາຍຂຶ້ນ, ດ້ວຍການໃຊ້ arrow function:

```jsx
<button onClick={() => {
  alert('You clicked me!');
}}>
```

ຮູບແບບທັງໝົດນີ້ແມ່ນຄືກັນ. Event handler ແບບແຖວດຽວແມ່ນສະດວກສຳລັບຟັງຊັ່ນສັ້ນໆ.

<Pitfall>

ຟັງຊັ່ນທີ່ສົ່ງຜ່ານໄປຫາ event handler ຈະຕ້ອງຖືກສົ່ງຜ່ານ, ບໍ່ແມ່ນການເອີ້ນໃຊ້. ຕົວຢ່າງ:

| ການສົ່ງຜ່ານຟັງຊັ່ນ (ຖືກຕ້ອງ)     | ການເອີ້ນໃຊ້ຟັງຊັ່ນ (ບໍ່ຖືກຕ້ອງ)     |
| -------------------------------- | ---------------------------------- |
| `<button onClick={handleClick}>` | `<button onClick={handleClick()}>` |

ຄວາມແຕກຕ່າງນັ້ນລະອຽດອ່ອນ. ໃນຕົວຢ່າງທຳອິກ, ຟັງຊັ່ນ `handleClick` ຈະຖືກສົ່ງຜ່ານເປັນ event handler `onClick`. ສິ່ງນີ້ບອກໃຫ້ React ຈົດຈຳ ແລະ ເອີ້ນໃຊ້ຟັງຊັ່ນຂອງທ່ານເມື່ອຜູ້ໃຊ້ຄິກປຸ່ມເທົ່ານັ້ນ

ໃນຕົວຢ່າງທີ່ສອງ, `()` ດ້ານທ້າຍຂອງ `handleClick()` ຈະເລີ່ມການເຮັດວຽກຂອງຟັງຊັ່ນ *ທັນທີ* ລະຫວ່າງ [ການ render](/learn/render-and-commit), ໂດຍບໍ່ຕ້ອງຄິກ. ເນື່ອງຈາກ JavaScript ພາຍໃນ [JSX `{` ແລະ `}`](/learn/javascript-in-jsx-with-curly-braces) ດຳເນີນການທັນທີ.

ເມື່ອທ່ານຂຽນ code ແບບແຖວດຽວ, pitfall ດຽວກັນຈະນຳສະເໜີຕົວເອງໃນລັກສະນະທີ່ຕ່າງອອກໄປ:

| ການສົ່ງຜ່ານຟັງຊັ່ນ (ຖືກຕ້ອງ)     | ການເອີ້ນໃຊ້ຟັງຊັ່ນ (ບໍ່ຖືກຕ້ອງ)     |
| --------------------------------------- | --------------------------------- |
| `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>` |


ການສົ່ງຜ່ານ code ແບບແຖວດຽວແບບນີ້ຈະບໍ່ເລີ່ມເຮັດວຽກເມື່ອຄິກ-ຈະເລີ່ມເຮັດວຽກທຸກຄັ້ງທີ່ component render:

```jsx
// This alert fires when the component renders, not when clicked!
<button onClick={alert('You clicked me!')}>
```

ຖ້າທ່ານຕ້ອງການກຳນົດ event handler ແບບແຖວດຽວ, ໃຫ້ລວມມັນໄວ້ໃນຟັງຊັ່ນທີ່ບໍ່ລະບຸຊື່ດັ່ງນີ້:

```jsx
<button onClick={() => alert('You clicked me!')}>
```

ແທນທີ່ຈະ execute code ພາຍໃນທຸກໆການ render, ສິ່ງນີ້ຈະສ້າງຟັງຊັ່ນທີ່ເອີ້ນໃຊ້ພາຍຫຼັງ.

ໃນສອງກໍລະນີ, ສິ່ງທີ່ທ່ານຕ້ອງການສົ່ງຜ່ານແມ່ນຟັງຊັ່ນ:

* `<button onClick={handleClick}>` ຜ່ານຟັງຊັ່ນ `handleClick`.
* `<button onClick={() => alert('...')}>` ຜ່ານຟັງຊັ່ນ  `() => alert('...')`.

[ອ່ານເພີ່ມເຕີມກ່ຽວກັບ arrow functions.](https://javascript.info/arrow-functions-basics)

</Pitfall>

### ການອ່ານ props ໃນ event handlers {/*reading-props-in-event-handlers*/}

ເນື່ອງຈາກມີການປະກາດ event handler ພາຍໃນ component, ພວກມັນຈຶ່ງສາມາດເຂົ້າເຖິງ prop ຂອງ component. ນີ້ແມ່ນປຸ່ມທີ່, ເມື່ອທ່ານຄິກແລ້ວ, ຈະສະແດງການແຈ້ງເຕືອນພ້ອມກັບ `message` prop: 

<Sandpack>

```js
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">
        Play Movie
      </AlertButton>
      <AlertButton message="Uploading!">
        Upload Image
      </AlertButton>
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

ເຊິ່ງຈະເຮັດໃຫ້ປຸ່ມທັງສອງນີ້ສະແດງຂໍ້ຄວາມທີ່ແຕກຕ່າງກັນໄດ້. ລອງປ່ຽນຂໍ້ຄວາມທີ່ສົ່ງເຖິງພວກມັນ.

### ການສົ່ງ event handlers ເປັນ props {/*passing-event-handlers-as-props*/}

ຫຼາຍເທື່ອທີ່ທ່ານຕ້ອງການໃຫ້ parent component ລະບຸ child event handler. ຂຶ້ນຢູ່ກັບປຸ່ມ: ຂຶ້ນຢູ່ກັບວ່າທ່ານໃຊ້ component `Button` ບ່ອນໃດ, ທ່ານອາດຈ້ອງ execute ຟັງຊັ່ນອື່ນ ບາງເທື່ອຟັງຊັ່ນໜຶ່ງຫຼິ້ນວີດີໂອ ແລະ ອີກຟັງຊັ່ນໜໜຶ່ງອັບໂຫຼດຮູບພາບ.

ເພື່ອເຮັດສິ່ງນີ້, ໃຫ້ສົ່ງ prop ທີ່ component ໄດ້ຮັບຈາກ parent ເປັນ event handler ດັ່ງນີ້:

<Sandpack>

```js
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Play "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

ຈຸດນີ້, component `Toolbar` ທຳການ render `PlayButton` ແລະ `UploadButton`:

- `PlayButton` ສົ່ງ `handlePlayClick` ເປັນ prop `onClick` ໄປຍັງ `Button` ພາຍໃນ.
- `UploadButton` ສົ່ງ `() => alert('Uploading!')` ເປັນ prop ໄປຍັງ `Button` ພາຍໃນ.

ສຸດທ້າຍ, component `Button` ຂອງທ່ານພ້ອມຮັບ prop ທີ່ຊື່ວ່າ `onClick`. ມັນສົ່ງຜ່ານ prop ໂດຍກົງໄປຫາ built-in browser `<button>` ດ້ວຍ `onClick={onClick}`. ສິ່ງນີ້ຈະບອກໃຫ້ React ເອີ້ນໃຊ້ຟັງຊັ່ນທີ່ສົ່ງຜ່ານເມື່ອຄິກ.

ຖ້າທ່ານໃຊ້ [design system](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969), ເປັນເລື່ອງປົກະຕິທີ່ component ຕ່າງໆເຊັ່ນ ປຸ່ມຈະປະກອບມີ style ແຕ່ບໍ່ໄດ້ລະບຸລັກສະນະການເຮັດວຽກ. Component ເຊັ່ນ `PlayButton` ແລະ `UploadButton` ຈະສົ່ງ event handler ລົງມາແທນ.

### ການຕັ້ງຊື່ prop event handler {/*naming-event-handler-props*/}

Component built-in ເຊັ່ນ `<button>` ແລະ `<div>` ຮອງຮັບສະເພາະ [browser event names](/reference/react-dom/components/common#common-props) ເຊັ່ນ `onClick`. ເຖິງຢ່າງໃດກໍຕາມ, ເມື່ອທ່ານສ້າງ component ຂອງທ່ານເອງ, ທ່ານສາມາດຕັ້ງຊື່ prop event handler ໄດ້ຕາມທີ່ທ່ານຕ້ອງການ.

ຕາມແບບແຜນ, prop event handler ຄວນເລີ່ມຕົ້ນດ້ວຍ `on`, ຕາມດ້ວຍໜັງສືໂຕໃຫຍ່.

ຕົວຢ່າງ, prop `onClick` ຂອງ component `Button` ອາດຈະຖືກເອີ້ນ `onSmash`:

<Sandpack>

```js
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onSmash={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

ໃນຕົວຢ່າງນີ້, `<button onClick={onSmash}>` ສະແດງວ່າ browser `<button>` (ໂຕພິມນ້ອຍ) ຍັງຕ້ອງການ prop ຊື່ `onClick`, ແຕ່ຊື່ prop ທີ່ໄດ້ຮັບຈາກ component `Button` ທີ່ທ່ານກຳນົດເອງແມ່ນຂຶ້ນກັບທ່ານ! 

ເມື່ອ component ຂອງທ່ານຮອງຮັບຫຼາຍ interaction, ທ່ານອາດຕັ້ງຊື່ prop event handler ສຳລັບແນວຄິດສະເພາະແອັບ. ຕົວຢ່າງ, component `Toolbar` ນີ້ໄດ້ຮັບ event handler `onPlayMovie  ແລະ `onUploadImage`:

<Sandpack>

```js
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

ສັງເກດວ່າ component `App` ບໍ່ຈຳເປັນຕ້ອງຮູ້ວ່າ *ສິ່ງທີ່* `Toolbar` ຈະເຮັດຫຍັງກັບ `onPlayMovie` ຫຼື `onUploadImage`. ນັ້ນແມ່ນລາຍລະອຽດການ implementation ຂອງ `Toolbar`. ໃນນີ້, `Toolbar` ສົ່ງຜ່ານ `onClick` handler ໄປຍັງ `Button` ຂອງມັນ, ແຕ່ພາຍຫຼັງຍັງສາມາດ trigger ເທິງທາງລັດຄີບອດ. ການຕັ້ງຊື່ prop ຕາມການ interaction ສະເພາະແອັບເຊັ່ນ `onPlayMovie` ຊ່ວຍໃຫ້ທ່ານປ່ຽນວິທີໃຊ້ງານໃນພາຍຫຼັງໄດ້ຢ່າງຍືດຫຍຸ່ນ.
  
<Note>

ກວດສອບວ່າທ່ານໃຊ້ແທັກ HTML ທີ່ເໝາະສົມສຳລັບ event handler. ຕົວຢ່າງ, ເພື່ອຈັດການຄິກ, ໃຊ້ [`<button onClick={handleClick}>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) ແທນ `<div onClick={handleClick}>`. ການໃຊ້ບາວເຊີແທ້ `<button>` ເປີດໃຊ້ງານລັກສະນະການເຮັດວຽກຂອງ built-in browser ເຊັ່ນການນຳທາງດ້ວຍຄີບອດ. ຖ້າທ່ານບໍ່ມັກ style ບາວເຊີເລີ່ມຕົ້ນຂອງປຸ່ມ ແລະ ຕ້ອງການເຮັດໃຫ້ມັນຄືລີ້ງ ຫຼື UI element, ທ່ານສາມາດເຮັດໄດ້ດ້ວຍ CSS. [ຮຽນຮູ້ເພີມເຕີມກ່ຽວກັບການຂຽນ accessible markup.](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
  
</Note>

## ການເຜີຍແຜ່ Event {/*event-propagation*/}

Event handler ຈະຈັບ event ຈາກ children ທີ່ component ຂອງທ່ານທີ່ອາດມີ. ພວກເຮົາເວົ້າວ່າ event "bubbles" ຫຼື "propagates" ຂຶ້ນໄປເທິງ tree: ມັນເລີ່ມຈາກຈຸດທີ່ event ນັ້ນເກີດຂຶ້ນ, ຈາກນັ້ນຈຶ່ງຂຶ້ນໄປເທິງ tree.

`<div>` ປະກອບມີສອງປຸ່ມ. ທັງ `<div>` *ແລະ* ແຕ່ລະປຸ່ມມີ `onClick` handler ຂອງໂຕເອງ. ທ່ານຄິດວ່າ handler ໃດທີ່ຈະເລີ່ມເຮັດວຽກເມື່ອທ່ານຄິກ?

<Sandpack>

```js
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}
```

```css
.Toolbar {
  background: #aaa;
  padding: 5px;
}
button { margin: 5px; }
```

</Sandpack>

ຖ້າທ່ານຄິກປຸ່ມໃດໜຶ່ງ, `onClick` ຈະເຮັດວຽກກ່ອນ, ຕາມດ້ວຍ `onClick` ຂອງ parent `<div>`. ສະນັ້ນສອງຂໍ້ຄວາມຈະປະກົດຂຶ້ນ. ຖ້າທ່ານຄິກ toolbar, ສະເພາະ `onClick` ຂອງ `<div>` ຂອງ parent ເທົ່ານັ້ນທີ່ຈະເຮັດວຽກ

<Pitfall>

ການເຜີຍແຜ່ event ທັງໝົດໃນ React ຍົກເວັ້ນ `onScroll`, ເຊິ່ງໃຊ້ໄດ້ກັບແທັກ JSX ທີ່ທ່ານແນບມາເທົ່ານັ້ນ.

</Pitfall>

### ຢຸດການເຜີຍແຜ່ {/*stopping-propagation*/}

Event handler ຮັບ **event object** ເປັນ argument ພຽງຢ່າງດຽວ. ໂດຍທົ່ວໄປ, ຈະເອີ້ນວ່າ `e`, ທີ່ຫຍໍ້ມາຈາກ "event". ທ່ານສາມາດໃຊ້ object ນີ້ເພື່ອອ່ານຂໍ້ມູນກ່ຽວກັບ event.

Event object ນັ້ນຍັງຊ່ວຍໃຫ້ທ່ານຢຸດການເຜີຍແຜ່. ຫາກທ່ານຕ້ອງການປ້ອງກັນບໍ່ໃຫ້ event ເຂົ້າເຖິງ parent component, ທ່ານຕ້ອງເອີ້ນໃຊ້ `e.stopPropagation()` ຄືກັບ component `Button` ເຮັດ:

<Sandpack>

```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

```css
.Toolbar {
  background: #aaa;
  padding: 5px;
}
button { margin: 5px; }
```

</Sandpack>

ເມື່ອທ່ານຄິກທີ່ປຸ່ມ:

1. React ເອີ້ນໃຊ້ `onClick` handler ທີ່ສົ່ງຜ່ານໄປຍັງ `<button>`.
2. Handler, ຖືກກຳນົດໃນ `Button`, ເຮັດສິ່ງຕໍ່ໄປນີ້:
   * ເອີ້ນ `e.stopPropagation()`, ເພື່ອປ້ອງກັນບໍ່ໃຫ້ event ເດືອດອີກຕໍ່ໄປ.
   * ເອີ້ນໃຊ້ຟັງຊັ່ນ `onClick`, ເຊິ່ງເປັນ prop ທີ່ສົ່ງຜ່ານຈາກ component `Toolbar`
3. ຟັງຊັ່ນນັ້ນເຊິ່ງກຳນົດໄວ້ໃນ component `Toolbar`, ສະແດງການແຈ້ງເຕືອນຂອງປຸ່ມເອງ.
4. ເນື່ອງຈາກການເຜີດແຜ່ຢຸດລົງ, `onClick` handler ຂອງ parent `<div>` ຈຶ່ງ *ບໍ່* ເຮັດວຽກ.

ຈາກຜົນຂອງ `e.stopPropagation()`, ຕອນນີ້ການຄິກທີ່ປຸ່ມຈະສະແດງພຽງການແຈ້ງເຕືອນດຽວ (ຈາກ `<button>`) ແທນທີ່ຈະເປັນສອງປຸ່ມ (ຈາກ `<botton>` ແລະ parent toobar `<div>`). ການຄິກປຸ່ມບໍ່ຄືກັບການຄິກ toolbar ຮອບໆ, ສະນັ້ນການຢຸດເຜີຍແຜ່ຈິງເໝາະສົມສຳລັບ UI ນີ້.

<DeepDive>

#### ການບັນທຶກ phase events {/*capture-phase-events*/}

ໃນກໍລະນີທີ່ເກີດຂຶ້ນບໍ່ຫຼາຍ, ທ່ານອາດຈະຕ້ອງ catch event ທັງໝົດໃນ child element, *ເຖິງວ່າເຫດການເຫຼົ່ານັ້ນຈະຢຸດເຜີຍແຜ່ໄປແລ້ວກໍຕາມ*. ຕົວຢ່າງ, ບາງທີທ່ານອາດຕ້ອງການບັນທຶກທຸກການຄິກໄປຍັງການວິເຄາະ ໂດຍບໍ່ຄຳນຶງ logic ການເຜີຍແຜ່. ທ່ານສາມາດເຮັດໄດ້ໂດຍເພີ່ມ `Capture` ຕໍ່ທ້າຍຊື່ event:

```js
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

ແຕ່ລະ event ເຜີຍແຜ່ໃນສາມຂັ້ນຕອນ:

1. ມັນເຄື່ອນລົງມາ, ໂດຍການເອີ້ນ `onClickCapture` handler.
2. ມັນແລ່ນ `onClick` handler ຂອງ element ການຄິກ.
3. ມັນເຄື່ອນທີ່ຂຶ້ນທາງເທິງ, ເອີ້ນ `onClick` handler ທັງໝົດ.

Event Capture ມີປະໂຫຍດສຳລັບ code ເຊັ່ນ router ຫຼື ການວິເຄາະ, ແຕ່ທ່ານອາດບໍ່ແມ່ນ event ເຫຼົ່ານັ້ນໃນ code ຂອງແອັບ.

</DeepDive>

### ການສົ່ງ handler ເປັນທາງເລືອກໃນການເຜີຍແຜ່ {/*passing-handlers-as-alternative-to-propagation*/}

ສັງເກດວ່າ click handler ນີ້ແລ່ນ code _ແລ້ວ_ ເອີ້ນ prop `onClick` ທີ່ parent ສົ່ງໄດ້ແນວໃດ:

```js {4,5}
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

ທ່ານສາມາດເພີ່ມ code ໃຫ້ກັບ handler ນີ້ກ່ອນທີ່ຈະເອີ້ນ event handler `onClick` parent ໄດ້, ຄືກັນ. ຮູບແບບນີ້ໃຫ້ *ທາງເລືອກ* ໃນການເຜີຍແຜ່. ມັນອະນຸຍາດໃຫ້ child component ຈັດການ event, ໃນຂະນະທີ່ຍັງໃຫ້ parent component ລະບຸພຶດທິກຳເພີ່ມເຕີມບາງຢ່າງ. ບໍ່ຄືກັບການເຜີຍແຜ່, ມັນບໍ່ອັດຕະໂນມັດ. ແຕ່ຂໍ້ດີຂອງຮູບແບບນີ້ຄືທ່ານສາມາດຕິດຕາມຕ່ອງໂສ່ຂອງ code ທັງໝົດໄດ້ຢ່າງຊັດເຈນເຊິ່ງງດຳເນີນການໂດຍເປັນຜົນມາຈາກ event ບາງຢ່າງ.

ຖ້າທ່ານເພິ່ງພາການເຜີຍແຜ່ ແລະ ເປັນການຍາກທີ່ຈະຕິດຕາມວ່າ handler ໃດ execute ແລະ ຍ້ອນຫຍັງ, ໃຫ້ລອງໃຊ້ວິທີນີ້ແທນ.

### ການປ້ອງກັນພຶດທິກຳເລີ່ມຕົ້ນ {/*preventing-default-behavior*/}

Event ບາວເຊີບາງຢ່າງມີລັກສະນະການເຮັດວຽກເລີ່ມຕົ້ນທີ່ກ່ຽວຂ້ອງ. ຕົວຢ່າງ, event ການ submit `<form>`, ເຊິ່ງເກີດຂຶ້ນເມື່ອທ່ານຄິກປຸ່ມພາຍໃນນັ້ນ, ຈະໂຫຼດໜ້າໃໝ່ຕາມຄ່າເລີ່ມຕົ້ນ:

<Sandpack>

```js
export default function Signup() {
  return (
    <form onSubmit={() => alert('Submitting!')}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

ທ່ານສາມາດເອີ້ນ `e.preventDefault()` ເທິງ event object ເພື່ອຢຸດສິ່ງນີ້ບໍ່ໃຫ້ເກີດຂຶ້ນ:

<Sandpack>

```js
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

ຢ່າສັບສົນລະຫວ່າງ `e.stopPropagation()` ແລະ `e.preventDefault()`. ມີປະໂຫຍດໝົດສອງ, ແຕ່ບໍ່ກ່ຽວຂ້ອງກັນ:

* [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) ຢຸດ event handler ທີ່ແນບກັບແທັກທາງເທິງບໍ່ໃຫ້ເລີ່ມເຮັດວຽກ.
* [`e.preventDefault()` ](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) ປ້ອງກັນພຶດທິກຳເລີ່ມຕົ້ນຂອງບາວເຊີສຳລັບບາງ event ທີ່ມີ.

## Event handler ສາມາດມີ່ຜົນຂ້າງຄຽງໄດ້ ຫຼື ບໍ່? {/*can-event-handlers-have-side-effects*/}

ແນ່ນອນ! Event handler ເປັນບ່ອນທີ່ດີທີ່ສຸດສຳລັບຜົນຂ້າງຄຽງ.

Event handler ບໍ່ຈຳເປັນຕ້ອງ [pure](/learn/keeping-components-pure), ເຊິ່ງແຕກຕ່າງຈາກຟັງຊັ່ນການ render, ດັ່ງນັ້ນມັນຈຶ່ງເປັນບ່ອນທີ່ດີໃນການ *ປ່ຽນແປງ* ບາງຢ່າງ-ຕົວຢ່າງ, ປ່ຽນຄ່າ input ຕາມການພິມ, ຫຼື ປ່ຽນລາຍການຕາມການກົດປຸ່ມ. ເຖິງຢ່າງໃດກໍຕາມ, ໃນການປ່ຽນແປງຂໍ້ມູນບາງຢ່າງ, ທຳອິດທ່ານຕ້ອງມີວິທີໃນການຈັດເກັບ. ໃນ React, ສິ່ງນີ້ເຮັດໄດ້ໂດຍການໃຊ້ [state, memory ຂອງ component.](/learn/state-a-components-memory) ທ່ານຈະໄດ້ຮຽນຮູ້ທັງໝົດກ່ຽວກັບມັນໃນໜ້າຕໍ່ໄປ.

<Recap>

* ທ່ານສາມາດ handle event ໂດຍສົ່ງຟັງຊັ່ນເປັນ prop ໄປຫາ element ເຊັ່ນ `<button>`.
* Event handler ຕ້ອງຜ່ານ, **ບໍ່ເອີ້ນ!** `onClick={handleClick}`, ບໍ່ແມ່ນ `onClick={handleClick}`.
* ທ່ານສາມາດກຳນົດຟັງຊັ່ນ event handler ແຍກກັນ ຫຼື ໃນແຖວ.
* Event handler ແມ່ນຖືກກຳນົດໄວ້ໃນ component, ດັ່ງນັ້ນມັນຈຶ່ງສາມາດເຂົ້າເຖິງ prop ໄດ້.
* ທ່ານສາມາດປະກາດ event handler ໃນ parent ແລະ ສົ່ງຕໍ່ເປັນ prop ໄປຫາ child.
* ທ່ານສາມາດກຳນົດ event ຂອງທ່ານເອງດ້ວຍຊື່ສະເພາະຂອງແອັບພິເຄຊັ່ນ.
* Event ເຜີຍແຜ່ຂຶ້ນໄປ. ເອີ້ນວ່າ `e.stopPropagation()` ໃນ argument ທຳອິດເພື່ອປ້ອງກັນສິ່ງນັ້ນ.
* Event ອາດມີພຶດທິກຳເລີ່ມຕົ້ນຂອງບາວເຊີທີ່ບໍ່ຕ້ອງການ. ເອີ້ນ `e.preventDefault()` ເພື່ອຫຼີກຫຼ່ຽງມັນ.
* ການເອີ້ນ event handler ຢ່າງຊັດເຈນຈາກ child handler ແມ່ນເປັນທາງເລືອກທີ່ດີໃນການເຜີຍແຜ່.

</Recap>



<Challenges>

#### ແປງ event handler {/*fix-an-event-handler*/}

ການຄິກປຸ່ມນີ້ຄວນເປັນການສະຫຼັບພື້ນຫຼັງຂອງໜ້າລະຫວ່າງສີຂາວ ແລະ ສີດຳ. ເຖິງຢ່າງໃດກໍຕາມ, ຈະບໍ່ມີຫຍັງເກີດຂຶ້ນເມື່ອທ່ານຄິກມັນ. ແກ້ໄຂບັນຫາ. (ຢ່າກັງວົນກ່ຽວກັບ logic ພາຍໃນ `handleClick`-ສ່ວນນັ້ນເຮັດວຽກໄດ້.)

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick()}>
      Toggle the lights
    </button>
  );
}
```

</Sandpack>

<Solution>

ບັນຫາແມ່ນ `<button onClick={handleClick()}>` _ເອີ້ນ_ ຟັງຊັ່ນ `handleClick` ຂະນະ render ແທນ _ສົ່ງຜ່ານ_ ມັນ. ລຶບການເອີ້ນ `()` ເພື່ອໃຫ້ເປັນ `<button onClick={handleClick}>` ແກ້ໄຂບັນຫາ:

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick}>
      Toggle the lights
    </button>
  );
}
```

</Sandpack>

ຫຼຶ ທ່ານສາມາດລວມການເອີ້ນໄວ້ໃນຟັງຊັ່ນອື່ນເຊັ່ນ  `<button onClick={() => handleClick()}>`:

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={() => handleClick()}>
      Toggle the lights
    </button>
  );
}
```

</Sandpack>

</Solution>

#### ເຊື່ອມຕໍ່ events {/*wire-up-the-events*/}

Component `ColorSwitch` ນີ້ render ປຸ່ມ. ມັນຄວນຈະປ່ຽນສີ່ page. ເຊື່ອມຕໍ່ກັບ event handler `onChangeColor` ທີ່ໄດ້ຮັບຈາກ parent ເພື່ອໃຫ້ການຄິກປຸ່ມປ່ຽນສີ.

ຫຼັງຈາກທີ່ທ່ານເຮັດແບບນີ້, ສັງເກດວ່າການຄິກປຸ່ມຈະເພີ່ມຕົວນັບການຄິກໜ້າ page ນຳ. ເພື່ອນຮ່ວມງານຂອງທ່ານຂຽນ component ຢັ້ງຢືນວ່າ `onChangeColor` ຈະບໍ່ເພີ່ມຕົວນັບໃດໆ. ຈະເກີດຫຍັງຕື່ມ? ແກ້ໄຂເພື່ອໃຫ້ຄິກປຸ່ມ *ເທົ່ານັ້ນ* ປ່ຽນສີ ແລະ _ບໍ່_ ເພີ່ມຕົວນັບ.

<Sandpack>

```js ColorSwitch.js active
export default function ColorSwitch({
  onChangeColor
}) {
  return (
    <button>
      Change color
    </button>
  );
}
```

```js App.js hidden
import { useState } from 'react';
import ColorSwitch from './ColorSwitch.js';

export default function App() {
  const [clicks, setClicks] = useState(0);

  function handleClickOutside() {
    setClicks(c => c + 1);
  }

  function getRandomLightColor() {
    let r = 150 + Math.round(100 * Math.random());
    let g = 150 + Math.round(100 * Math.random());
    let b = 150 + Math.round(100 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleChangeColor() {
    let bodyStyle = document.body.style;
    bodyStyle.backgroundColor = getRandomLightColor();
  }

  return (
    <div style={{ width: '100%', height: '100%' }} onClick={handleClickOutside}>
      <ColorSwitch onChangeColor={handleChangeColor} />
      <br />
      <br />
      <h2>Clicks on the page: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>

<Solution>

ທຳອິດ, ທ່ານຕ້ອງເພິ່ມ event handler, ເຊັ່ນ `<button onClick={onChangeColor}>`.

ເຖິງຢ່າງໃດກໍຕາມ, ສິ່ງນີ້ເຮັດໃຫ້ເກີດບັນຫາຂອງຕົວນັບທີ່ເພີ່ມຂຶ້ນ. ຖ້າ `onChangeColor` ບໍ່ເຮັດແບບນີ້, ຕາມທີ່ເພື່ອນຮ່ວມງານຂອງທ່ານຢືນຢັນ, ບັນຫາແມ່ນ event ນີ້ເຜີຍແຜ່ອອກໄປ ແລະ handler ດ້ານເທິງກໍເຮັດແບບນັ້ນ. ເພື່ອແກ້ໄຂບັນຫານີ້, ທ່ານຕ້ອງຢຸດການເຜີຍແຜ. ແຕ່ຢ່າລືມວ່າທ່ານຍັງເອີ້ນ `onChangeColor` ຢູ່.

<Sandpack>

```js ColorSwitch.js active
export default function ColorSwitch({
  onChangeColor
}) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onChangeColor();
    }}>
      Change color
    </button>
  );
}
```

```js App.js hidden
import { useState } from 'react';
import ColorSwitch from './ColorSwitch.js';

export default function App() {
  const [clicks, setClicks] = useState(0);

  function handleClickOutside() {
    setClicks(c => c + 1);
  }

  function getRandomLightColor() {
    let r = 150 + Math.round(100 * Math.random());
    let g = 150 + Math.round(100 * Math.random());
    let b = 150 + Math.round(100 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleChangeColor() {
    let bodyStyle = document.body.style;
    bodyStyle.backgroundColor = getRandomLightColor();
  }

  return (
    <div style={{ width: '100%', height: '100%' }} onClick={handleClickOutside}>
      <ColorSwitch onChangeColor={handleChangeColor} />
      <br />
      <br />
      <h2>Clicks on the page: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
