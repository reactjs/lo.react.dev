---
title: ການສະແດງຜົນແບບມີເງື່ອນໄຂ
---

<Intro>

component ຂອງທ່ານມັກຈະຕ້ອງສະແດງສິ່ງຕ່າງໆຂຶ້ນກັບແຕ່ລະເງື່ອນໄຂ. ໃນ React ທ່ານສາມາດສະແດງຜົນ JSX ຢ່າງມີເງື່ອນໄຂໂດຍໃຊ້ syntax JavaScript ເຊັ່ນ `if` statement, `&&`, ແລະ `? :` operators.

</Intro>

<YouWillLearn>

* ວິທີ return JSX ທີ່ແຕກຕ່າງກັນຕາມເງື່ອນໄຂ
* ວິທີລວມ ຫຼື ແຍກຊີ້ນສ່ວນຂອງ JSX ຢ່າງມີເງື່ອນໄຂ
* ທາງລັດ syntax ທີ່ມີເງື່ອນໄຂທົ່ວໄປທີ່ທ່ານຈະໄດ້ພົບໃນ React codebases

</YouWillLearn>

## ສົ່ງຄືນ JSX ແບບມີເງື່ອນໄຂ {/*conditionally-returning-jsx*/}

ສົມມຸດວ່າທ່ານມີ component `PackingList` ທີ່ສະແດງ `Item` ຫຼາຍລາຍການ, ຊື່ງສາມາດເຮັດເຄື່ອງໝາຍວ່າແພັກແລ້ວ ຫຼື ບໍ່:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

ສັງເກດວ່າມີ component `Item` ບາງໂຕມີ prop `isPacked` ເປັນ `true` ແທນທີ່ຈະເປັນ `false`. ທ່ານຕ້ອງການເພີ່ມເຄື່ອງໝາຍຕິກ (✔) ລົງໃນລາຍການທີ່ຖືກແພັກຖ້າ `isPacked={true}`.

ທ່ານສາມາດຂຽນເປັນ [`if`/`else` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) ດັ່ງນີ້:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

ຖ້າ prop `isPacked` ເປັນ `true`, code ນີ້ **ຈະຄືນຄ່າ JSX tree ທີ່ແຕກຕ່າງກັນ.** ດ້ວຍການປ່ຽນແປງນີ້, ບາງລາຍການມີເຄື່ອງໝາຍຕິກໃນຕອນທ້າຍ:

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

ລອງແກ້ໄຂສິ່ງທີ່ return ໃນທັງສອງກໍລະນີ, ແລະ ເບິ່ງວ່າຜົນລັບຈະປ່ຽນແປງແນວໃດ!

ສັງເກດວ່າທ່ານກຳລັງສ້າງ branching logic ດ້ວຍ `if` ແລະ `return` statement ຂອງ JavaScript. ໃນ React, flow ການຄວບຄຸມ (ເຊັ່ນ ເງື່ອນໄຂ) ແມ່ນຈັດການໂດຍ JavaScript.

### ການ Return ທີ່ບໍ່ມີຄ່າດ້ວຍ `null` ຢ່າງມີເງື່ອນໄຂ {/*conditionally-returning-nothing-with-null*/}

ໃນບາງສະຖານະການ, ທ່ານບໍ່ສາມາດສະແດງສິ່ງຕ່າງໆໄດ້. ຕົວຢ່າງ, ທ່ານບໍ່ຕ້ອງການສະແດງລາຍການທີແພັກແລ້ວເລີຍ. Component ຕ້ອງ return ບາງຢ່າງ. ໃນກໍລະນີນີ້, ທ່ານສາມາດ return `null`:

```js
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```

ຖ້າ `isPacked` ເປັນ true, component ຈະບໍ່ return ຫຍັງ, `null`. ກົງກັນຂ້າມ, ມັນຈະ return JSX ເພື່ອສະແດງຜົນ.

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

ໃນທາງປະຕິບັດ, ການ return ດ້ວຍ `null` ຈາກ component ເປັນເລື່ອງທີ່ບໍ່ປົກະຕິເພາະມັນອາດຈະເຮັດໃຫ້ນັກພັດທະນາປະຫຼາດໃຈທີ່ພະຍາຍາມຈະສະແດງມັນ. ສ່ວນຫຼາຍ, ທ່ານຈະລວມ ຫຼື ແຍກ component ໃນ parent component ຂອງ JSX. ນີ້ແມ່ນວິທີການ!

## ແບບມີເງື່ອນໄຂລວມມີ JSX {/*conditionally-including-jsx*/}

ໃນຕົວຢ່າງກ່ອນໜ້ານີ້, ທ່ານໄດ້ຄວບຄຸມ (ຖ້າມີ!) JSX tree ທີ່ return ໂດຍ component. ທ່ານອາດຈະສັງເກດເຫັນການສະແດງຜົນທີ່ຊໍ້າກັນ:

```js
<li className="item">{name} ✔</li>
```

ຄ້າຍຄືກັບ

```js
<li className="item">{name}</li>
```

ທັງສອງເງື່ອນໄຂ branch ແມ່ນ return `<li className="item">...</li>`:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

ເຖິງວ່າການເຮັດຊໍ້ານີ້ຈະບໍ່ເປັນອັນຕະລາຍ, ແຕ່ມັນອາດຈະເຮັດໃຫ້ code ຂອງທ່ານຍາກໃນການ maintain. ຖ້າທ່ານຕ້ອງການປ່ຽນ `className` ເດ? ທ່ານຈະຕ້ອງໄດ້ເຮັດໃນສອງບ່ອນຂອງ code ທ່ານ! ໃນສະຖານະການແບບນີ້, ທ່ານສາມາດລວມ JSX ນ້ອຍແບບມີເງື່ອນໄຂເພື່ອເຮັດໃຫ້ code ຂອງທ່ານ [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) ຫຼາຍຂຶ້ນ.

### Conditional (ternary) operator (`? :`) {/*conditional-ternary-operator--*/}

JavaScript ມີ syntax ທີ່ກະຊັບສຳລັບຂຽນ expression ເງື່ອນໄຂ -- [conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) ຫຼື "ternary operator".

ແທນທີ່ຈະເປັນແບບນີ້:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

ທ່ານສາມາດຂຽນແບບນີ້:

```js
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```

ທ່ານສາມາດອ່ານເປັນ *"ຖ້າ `isPacked` ເປັນ true, ຈາກນັ້ນ (`?`) ສະແດງ `name + ' ✔'`, ຖ້າບໍ່ດັ່ງນັ້ນ (`:`) ສະແດງ `name`"*.

<DeepDive>

#### ທັງສອງຕົວຢ່າງນີ້ຄືກັນທັງໝົດບໍ່? {/*are-these-two-examples-fully-equivalent*/}

ຖ້າທ່ານມາຈາກພື້ນຖານການຂຽນໂປຣແກຣມເຊີງວັດຖຸ, ​ທ່ານອາດຈະຄິດວ່າສອງຕົວຢ່າງດ້ານເທິງມີຄວາມແຕກຕ່າງກັນໜ້ອຍໜຶ່ງເພາະວ່າຕົວຢ່າງໜຶ່ງອາດຈະສ້າງ "instance" ຂອງ `<li>` ສອງຕົວຢ່າງທີ່ແຕກຕ່າງກັນ. ແຕ່ JSX element ບໍ່ແມ່ນ "instances" ເພາະວ່າບໍ່ມີ state ພາຍໃນໃດໆ ແລະ ບໍ່ແມ່ນ DOM nodes ແທ້. ເປັນຄຳອະທິບາຍສັ້ນໆເຊັ່ນ blueprints. ສະນັ້ນສອງຕົວຢ່າງນີ້, ໃນຄວາມເປັນຈິງ, *ແມ່ນ* ທຽບເທົ່າກັນໝົດ. [ການຮັກສາ ແລະ ລີເຊັດ State](/learn/preserving-and-resetting-state) ມີລາຍລະອຽດກ່ຽວກັບວິທີການເຮັດວຽກນີ້.

</DeepDive>

ສົມມຸດວ່າທ່ານຕ້ອງການລວມຂໍ້ຄວາມລາຍການທີ່ສຳເລັດລົງໃນແທັກ HTML ເຊັ່ນ `<del>` ເພື່ອຂີດຂ້າ. ທ່ານສາມາດເພີ່ມແຖວໃໝ່ ແລະ ວົງເລັບເພື່ອໃຫ້ຊ້ອນ JSX ໃນແຕ່ລະກໍລະນີໄດ້ງ່າຍຂຶ້ນ.

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✔'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

ແບບນີ້ໃຊ້ໄດ້ດີກັບເງື່ອນໄຂງ່າຍໆ, ແຕ່ໃຊ້ໃນປະລິມານທີ່ເໝາະສົມ. ຖ້າ component ຂອງທ່ານເລີ່ມຫຍຸ້ງດ້ວຍ markup ແບບມີເງື່ອນໄຂທີ່ຊ້ອນກັນຫຼາຍເກີນໄປໃຫ້ລອງແຍກ child component ເພື່ອລ້າງຂໍ້ມູນ. ໃນ React, markup ເປັນສ່ວນໜຶ່ງຂອງ code ທ່ານ, ສະນັ້ນທ່ານສາມາດໃຊ້ເຄື່ອງມືເຊັ່ນ: ຕົວແປ ແລະ ຟັງຊັ່ນເພື່ອຈັດລະບຽບ expression ທີ່ຊັບຊ້ອນໄດ້.

### Logic ແລະ operator (`&&`) {/*logical-and-operator-*/}

ທາງລັດທົ່ວໄປທີ່ທ່ານຈະໄດ້ພົບຄືຕົວດຳເນີນການ [JavaScript logical ແລະ (`&&`) operator.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.) ພາຍໃນ component React, ມັກຈະເກີດເມື່ອທ່ານຕ້ອງການສະແດງຜົນບາງ JSX ເມື່ອພົບເງື່ອນໄຂທີ່ເປັນຈິງ, **ຫຼື ສະແດງຜົນຢ່າງອື່ນ.** ຍ້ອນ `&&` ທ່ານສາມາດສະແດງຜົນເຄື່ອງໝາຍຕິກຕາມເງື່ອນໄຂໃດກໍໄດ້ເມືອ `isPacked` ເປັນ `true`:

```js
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

ທ່ານສາມາດອ່ານສິ່ງນີ້ເປັນ *"ຖ້າ `isPacked`, ຈາກນັ້ນ (`&&`) ສະແດງຜົນເຄື່ອງໝາຍຕິກ, ນອກນັ້ນ, ບໍ່ສະແດງຜົນຫຍັງ"*.

ນີ້ຄືວິທີການ:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

[JavaScript && expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) ສົ່ງຄ່າທາງເບື້ອງຂວາ (ໃນກໍລະນີຂອງເຮົາ, ເຄື່ອງໝາຍຕິກ) ຖ້າເບື້ອງຊ້າຍ (ເງື່ອນໄຂຂອງເຮົາ) ເປັນ `true`. ແຕ່ຖ້າເງື່ອນໄຂເປັນ `false`, expression ທັງໝົດຈະເປັນ `false`. React ຖືວ່າ `false` ເປັນ "ຂຸມ" ໃນ JSX tree, ເຊັ່ນດຽວກັນກັບ `null` ຫຼື `undefined`, ແລະ ບໍ່ສະແດງຜົນຫຍັງເລີຍ.


<Pitfall>

**ຫ້າມໃສ່ໂຕເລກຢູ່ເບື້ອງຊ້າຍຂອງ `&&`.**

ເພື່ອທົດສອບເງື່ອນໄຂ, JavaScript ແປງເບື້ອງຊ້າຍມືໃຫ້ເປັນ boolean ໂດຍອັດຕະໂນມັດ. ເຖິງຢ່າງໃດກໍຕາມ, ຖ້າເບື້ອງຊ້າຍມືເປັນ `0`, ຈາກນັ້ນ expression ທັງໝົດຈະໄດ້ຮັບຄ່ານັ້ນ (`0`), ແລະ React ຈະສະແດງຄ່າ `0` ແທນທີ່ຈະບໍ່ມີຫຍັງເລີຍ.

ຕົວຢ່າງ, ຂໍ້ຜີດພາດທົ່ວໄປທີ່ຂຽນ code ເຊັ່ນ `messageCount && <p>New messages</p>`. ເປັນເລື່ອງງ່າຍທີ່ຈະສັນນິຖານວ່າມັນບໍ່ສະແດງຜົນຫຍັງເມື່ອ `messageCount` ເປັນ `0`, ແຕ່ຄວາມເປັນຈິງມັນສະແດງຜົນເປັນ `0` ເອງ!

ເພື່ອແກ້ໄຂ, ເຮັດໃຫ້ເບື້ອງຊ້າຍມືເປັນ boolean: `messageCount > 0 && <p>New messages</p>`.

</Pitfall>

### ການກຳນົດຄ່າ JSX ໃຫ້ຕົວແປແບບມີເງື່ອນໄຂ {/*conditionally-assigning-jsx-to-a-variable*/}

ເມື່ອທາງລັດຂັດຂວາງການຂຽນ code ແບບທຳມະດາ, ລອງໃຊ້ `if` statement ແລະ ຕົວແປ. ທ່ານສາມາດກຳນົດຕົວແປທີ່ຖືກປະກາດດ້ວຍ [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) ຄືນໃໝ່, ສະນັ້ນເລີ່ມຈາກການໃຫ້ຄ່າເລີ່ມຕົ້ນເນື້ອຫາທີ່ທ່ານຕ້ອງການສະແດງ, ຊື່:

```js
let itemContent = name;
```

ນຳໃຊ້ `if` statement ເພື່ອກຳນົດຄ່າ JSX expression ຄືນໃໝ່ໃຫ້ `itemContent` ຖ້າ `isPacked` ເປັນ `true`:

```js
if (isPacked) {
  itemContent = name + " ✔";
}
```

[ວົງປີກກາ "ໜ້າຕ່າງເຂົ້າສູ່ JavaScript".](/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world) Embed ຕົວແປດ້ວຍວົງປີກກາໃນການ return JSX tree, ຊ້ອນ expression ທີ່ຄຳນວນໄວ້ກ່ອນໜ້ານີ້ພາຍໃນ JSX:

```js
<li className="item">
  {itemContent}
</li>
```

ແບບນີ້ມີລາຍລະອຽດຫຼາຍທີ່ສຸດ, ແຕ່ກໍຍືດຍຸ່ນທີ່ສຸດເຊັ່ນກັນ. ນີ້ແມ່ນວິທີການ:

<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

ຄືກັບຜ່ານມາ, ນີ້ບໍ່ສະເພາະເຮັດວຽກໄດ້ນຳຂໍ້ຄວາມ, ແຕ່ສຳລັບ arbitrary JSX ກໍໄດ້ເຊັ່ນກັນ!

<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✔"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

ຖ້າທ່ານຍັງບໍ່ຄຸ້ນເຄີຍກັບ JavaScript, ຮູບແບບນີ້ອາດເບິ່ງຄືຫຼາຍໃນຕອນທຳອິດ. ເຖິງຢ່າງໃດກໍ່ຕາມ, ການຮຽນຮູ້ສິ່ງເຫຼົ່ານີ້ຈະຊ່ວຍໃຫ້ທ່ານອ່ານ ແລະ ຂຽນ code JavaScript ໃດກໍໄດ້ -- ແລະ ບໍ່ສະເພາະແຕ່ component React! ເລືອກອັນໜຶ່ງທີ່ທ່ານມັກສຳລັບເລີ່ມຕົ້ນ, ແລະ ເບິ່ງຂໍ້ມູນອ້າງອີງນີ້ອີກຄັ້ງຖ້າທ່ານລືມວິທິການທີ່ຮູບແບບອື່ນເຮັດ.

<Recap>

* ໃນ React, ທ່ານສາມາດຄວບຄຸມ branching logic ດ້ວຍ JavaScript.
* ທ່ານສາມາດ return JSX expression ແບບມີເງື່ອນໄຂດ້ວຍ `if` statement.
* ທ່ານສາມາດບັນທຶກບາງ JSX ໃສ່ຕົວແປຢ່າງມີເງື່ອນໄຂ ແລະ ລວມມັນພາຍໃນ JSX ອື່ນດ້ວຍການໃຊ້ວົງປີກກາ.
* ໃນ JSX, `{cond ? <A /> : <B />}` ໝາຍຄວາມວ່າ *"ຖ້າ `cond`, ສະແດງຜົນ `<A />`, ນອກນັ້ນ `<B />`"*.
* ໃນ JSX, `{cond && <A />}` ໝາຍຄວາມວ່າ *"if `cond`, ສະແດງຜົນ `<A />`, ນອກນັ້ນບໍ່ສະແດງຫຍັງ"*.
* ທາງລັດເປັນເລື່ອງປົກະຕິ, ແຕ່ທ່ານບໍ່ຈຳເປັນຕ້ອງໃຊ້ຫາກຕ້ອງການໃຊ້ `if` ທຳມະດາ.

</Recap>



<Challenges>

#### ສະແດງໄອຄອນສຳລັບລາຍການທີ່ບໍ່ສົມບູນດ້ວຍ `? :` {/*show-an-icon-for-incomplete-items-with--*/}

ນຳໃຊ້ conditional operator (`cond ? a : b`) ເພື່ອສະແດງຜົນ ❌ ຖ້າ `isPacked` ບໍ່ເປັນ `true`.

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked ? '✔' : '❌'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

</Solution>

#### ສະແດງ item ທີ່ສຳຄັນດ້ວຍ  `&&` {/*show-the-item-importance-with-*/}

ໃນຕົວຢ່າງນີ້, ແຕ່ລະ `Item` ຮັບຕົວເລກ prop `importance`. ໃຊ້ `&&` operator ເພື່ອສະແດງຜົນ "_(ຄວາມສຳຄັນ: X)_" ໃນຮູບແບບໂຕງ່ຽງ, ສະເພາະແຕ່ item ທີ່ມີຄວາມສຳຄັນບໍ່ເປັນສູນເທົ່ານັ້ນ. Item list ຂອງທ່ານຄວນຈະໜ້າຕາປະມານນີ້:

* Space suit _(ຄວາມສຳຄັນ: 9)_
* Helmet with a golden leaf
* Photo of Tam _(ຄວາມສຳຄັນ: 6)_

ຢ່າລືມເພີ່ມຍະວ່າງລະຫວ່າງສອງ label!

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

ນີ້ຄວນເປັນເຄັດລັບ:

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && ' '}
      {importance > 0 &&
        <i>(Importance: {importance})</i>
      }
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

ສັງເກດທ່ານຕ້ອງຂຽນ `importance > 0 && ...` ແທນທີ່ຈະເປັນ `importance && ...` ສະນັ້ນຫາກ `importance` ເປັນ `0`, ຜົນລັບຈະບໍ່ສະແດງ `0`!


ໃນວິທີການນີ້, ຈະໃຊ້ເງື່ອນໄຂສອງເງື່ອນໄຂແຍກກັນເພື່ອໃສ່ຊ່ອງວ່າງລະຫວ່າງຊື່ ແລະ label. ອີກວິທີໜຶ່ງ, ທ່ານສາມາດໃຊ້ fragment ທີ່ມີຊ່ອງວ່າງນຳໜ້າ: `importance > 0 && <> <i>...</i></>` ຫຼື ເພີ່ມຊ່ອງວ່າງພາຍໃນ `importance > 0 && <> <i>...</i></>`.


</Solution>

#### Refactor ຊຸດຂອງ `? :` ເປັນ `if` ແລະ ຕົວແປ {/*refactor-a-series-of---to-if-and-variables*/}

component `Drink` ໃຊ້ຊຸດຂອງເງື່ອນໄຂ `? :` ເພື່ອສະແດງຂໍ້ມູນທີ່ແຕກຕ່າງຂຶ້ນກັບວ່າ prop `name` ເປັນ `"tea"` ຫຼື `"coffee"`. ບັນຫາແມ່ນຂໍ້ມູນກ່ຽວກັບເຄື່ອງດື່ມແຕ່ລະຊະນິດກະຈາຍໄປໃນຫຼາຍເງື່ອນໄຂ. Refactor code ນີ້ເພື່ອໃຊ້ `if` statement ດຽວແທນທີ່ໃຊ້ 3 ເງື່ອນໄຂ `? :`.

<Sandpack>

```js
function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
        <dt>Caffeine content</dt>
        <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
        <dt>Age</dt>
        <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

ເມື່ອທ່ານ refactor code ເພື່ອໃຊ້ `if` ແລ້ວ, ທ່ານຈະມີແນວຄິດອື່ນເຮັດໃຫ້ມັນງ່າຍຂຶ້ນບໍ່?

<Solution>

ມັນມີຫຼາຍວິທີທີ່ທ່ານສາມາດເຮັດໄດ້, ແຕ່ນີ້ແມ່ນຈຸດເລີ່ມຕົ້ນ:

<Sandpack>

```js
function Drink({ name }) {
  let part, caffeine, age;
  if (name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else if (name === 'coffee') {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{part}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

ນີ້ແມ່ນຂໍ້ມູນກ່ຽວກັບແຕ່ລະປະເພດເຄື່ອງດື່ມທີ່ໄດ້ລວມເຂົ້າກັນແລ້ວແທນທີ່ຈະຖືກແຍກເປັນແຕ່ລະເງື່ອນໄຂ. ນີ້ເຮັດໃຫ້ມັນງ່າຍໃນການເພີ່ມເຄື່ອງດື່ມໃໝ່ໃນອະນາຄົດ.

ວິທີການອື່ນອາດເປັນການລຶບເງື່ອນໄຂທັງໝົດໂດຍການຍ້າຍຂໍ້ມູນໄປເປັນ object:

<Sandpack>

```js
const drinks = {
  tea: {
    part: 'leaf',
    caffeine: '15–70 mg/cup',
    age: '4,000+ years'
  },
  coffee: {
    part: 'bean',
    caffeine: '80–185 mg/cup',
    age: '1,000+ years'
  }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{info.part}</dd>
        <dt>Caffeine content</dt>
        <dd>{info.caffeine}</dd>
        <dt>Age</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
