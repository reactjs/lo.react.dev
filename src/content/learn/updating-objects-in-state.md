---
title: ການອັບເດດ Object ໃນ State
---

<Intro>

State ສາມາດເກັບຄ່າ JavaScript ຊະນິດໃດກໍໄດ້, ລວມເຖິງ object. ແຕ່ທ່ານບໍ່ຄວນປ່ຽນແປງ object ທີ່ທ່ານມີຢູ່ໃນ State React ໂດຍກົງ. ເມື່ອທ່ານຕ້ອງການອັບເດດ object ທ່ານຕ້ອງສ້າງ object ໃໝ່ (ຫຼື copy object ທີ່ມີຢູ່) ຈາກນັ້ນຕັ້ງຄ່າ state ເພື່ອໃຊ້ໂຕ copy ນັ້ນ.

</Intro>

<YouWillLearn>

- ວິທີອັບເດດ object ໃນ state React
- ວິທີອັບເດດ object ທີ່ຊ້ອນກັນໂດຍບໍ່ໄດ້ mutate ມັນ
- Immutability ແມ່ນຫຍັງ ແລະ ຈະທຳລາຍມັນໄດ້ແນວໃດ
- ວິທີໃຫ້ການ copy object ທີ່ຊໍ້າຊ້ອນກັນໜ້ອຍລົງດ້ວຍ Immer

</YouWillLearn>

## Mutation ແມ່ນຫຍັງ? {/*whats-a-mutation*/}

ທ່ານສາມາດເກັບຄ່າ JavaScript ຊະນິດໃດກໍໄດ້ໃນ state.

```js
const [x, setX] = useState(0);
```

ມາຮອດຕອນນີ້, ທ່ານໄດ້ເຮັດວຽກກ່ຽວກັບ number, string ແລະ boolean. ຄ່າ JavaScript ປະເພດນີ້ແມ່ນ "immutable", ໝາຍຄວາມວ່າບໍ່ສາມາດປ່ຽນແປງໄດ້ ຫຼື "read-only". ທ່ານສາມາດ trigger ການ render ໃໝ່ ເປັນ _ການແທນທີ_ ຄ່າ:

```js
setX(5);
```

state `x` ປ່ຽນຈາກ `0` ເປັນ `5`, ແຕ່ _ໂຕເລກ `0` ເອງ_ ບໍ່ປ່ຽນແປງ. ເປັນໄປບໍ່ໄດ້ທີ່ຈະປ່ຽນແປງຄ່າເບື້ອງຕົ້ນທີ່ສ້າງຂຶ້ນໃນໂຕເຊັ່ນ number, string ແລະ boolean ໃນ JavaScript.

ຕອນນີ້ມາເບິ່ງ object ໃນ state:


```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

ໃນດ້ານເຕັກນິກ, ສາມາດປ່ຽນເນື້ອຫາຂອງ _ໂຕ object ເອງໄດ້_ **ສິ່ງນີ້ເອີ້ນວ່າການ mutation:**

```js
position.x = 5;
```

ເຖິງຢ່າງໃດກໍຕາມ, ເຖິງວ່າ object ໃນ state React ນັ້ນສາມາດ mutate ໄດ້ໃນດ້ານເຕັກນິກ, ທ່ານຄວນປະຕິບັດ **ຄືກັບວ່າ** ພວກມັນບໍ່ສາມາດ mutate ໄດ້ --ເຊັ່ນ number, boolean, ແລະ string. ແທນທີຈະໃຫ້ໃຫ້ພວກມັນສາມາດ mutate ໄດ້, ທ່ານຄວນທຳການແທນທີພວກມັນສະເໝີ.

## ໃຫ້ຖືວ່າ State ເປັນແບບ read-only {/*treat-state-as-read-only*/}

ເວົ້າອີກແບບໜຶ່ງ, ທ່ານຄວນ **ຖືວ່າ object JavaScript ໃດໆທີ່ທ່ານກຳນົດໃສ່ໃນ state ໃຫ້ເປັນແບບ read-only.**

ຕົວຢ່າງນີ້ເກັບ object ໃນ state ເພື່ອສະແດງຕຳແໜ່ງ pointer ປັດຈຸບັນ. ຈຸດສີແດງຄວນຈະຍ້າຍເມື່ອທ່ານແຕະ ຫຼື ເລື່ອນ cursor ໄປເໜືອພື້ນທີ່ສະແດງຕົວຢ່າງ. ແຕ່ຈຸດນັ້ນຍັງຄົງຢູ່ໃນຕຳແໜ່ງເລີ່ມຕົ້ນ:

<Sandpack>

```js
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

```css
body { margin: 0; padding: 0; height: 250px; }
```

</Sandpack>

ບັນຫາແມ່ນຢູ່ໃນ code ບ່ອນນີ້.

```js
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```

code ສ່ວນນີ້ແກ້ໄຂ object ໃຫ້ກັບ `ຕຳແໜ່ງ` ຈາກ [ການ render ກ່ອນໜ້າ](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time) ແຕ່ບໍ່ມີການໃຊ້ຟັງຊັ່ນການຕັ້ງຄ່າ state, React ບໍ່ຮູ້ວ່າ object ມີການປ່ຽນແປງ. ສະນັ້ນ React ຈຶ່ງບໍ່ຕອບສະໜອງໃດໆ. ມັນເໝືອນກັບການພະຍາຍາມປ່ຽນລຳດັບຫຼັງຈາກທີ່ທ່ານໄດ້ກິນເຂົ້າແລ້ວ. ເຖິງວ່າການ mutate state ຈະເຮັດວຽກ ໃນບາງກໍລະນີ, ແຕ່ເຮົາບໍ່ແນະນຳ. ທ່ານຄວນປະຕິບັດຕໍ່ຄ່າ state ທີ່ທ່ານມີສິດເຂົ້າເຖິງໃນການ render ເປັນ read-only.

ຫາກຕ້ອງການ [ການ trigger ເພື່ອ render ໃໝ່](/learn/state-as-a-snapshot#setting-state-triggers-renders) ໃນກໍລະນີນີ້, **ສ້າງ object *ໃໝ່* ແລະ ສົ່ງໄປຍັງຟັງຊັ່ນການຕັ້ງຄ່າ state:**

```js
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

ດ້ວຍ `setPosition`, ທ່ານກຳລັງບອກ React:

* ແທນທີ `ຕຳແໜ່ງ` ດ້ວຍ object ໃໝ່ນີ້
* ແລະ render component ນີ້ອີກຄັ້ງ

ສັງເກດວ່າຕອນນີ້ຈຸດສີແດງເຄື່ອນໄຫວຕາມ cursor ຂອງທ່ານແນວໃດເມື່ອທ່ານແຕະ ຫຼື ວາງເມົ້າເໜືອພື້ນທີ່ຕົວຢ່າງ:

<Sandpack>

```js
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

```css
body { margin: 0; padding: 0; height: 250px; }
```

</Sandpack>

<DeepDive>

#### ການ mutate ແບບ local ແມ່ນບໍ່ເປັນຫຍັງ {/*local-mutation-is-fine*/}

Code ແບບນີ້ມີບັນຫາເພາະມັນແກ້ໄຂ object *ທີ່ມີຢູ່* ໃນ state:

```js
position.x = e.clientX;
position.y = e.clientY;
```

ແຕ່ code ແບບນີ້ **ໃຊ້ໄດ້ແນ່ນອນ** ເພາະວ່າທ່ານກຳລັງ mutate object ໃໝ່ທີ່ທ່ານ *ຫາກໍສ້າງຂຶ້ນ*:

```js
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

ໃນຄວາມເປັນຈິງ, ມັນທຽບເທົ່າກັບການຂຽນສິ່ງນີ້:

```js
setPosition({
  x: e.clientX,
  y: e.clientY
});
```

ການ Mutate ຈະເປັນບັນຫາເມື່ອທ່ານປ່ຽນແປງ object *ທີ່ມີຢູ່* ໃນ state ແລ້ວ. ການ mutate object ທີ່ທ່ານຫາກໍສ້າງຂຶ້ນນັ້ນບໍ່ເປັນຫຍັງເພາະວ່າ *ຍັງບໍ່ມີ code ອື່ນອ້າງອີງເຖິງມັນເທື່ອ.* ການປ່ຽນແປງຈະບໍ່ສົ່ງຜົນກະທົບຕໍ່ບາງສິ່ງທີ່ຂຶ້ນຢູ່ກັບ object ໂດຍບໍ່ໄດ້ຕັ້ງໃຈ. ສິ່ງນີ້ເອີ້ນວ່າ "ການ mutate local". ທ່ານສາມາດ mutate local [ໃນຂະນະ render.](/learn/keeping-components-pure#local-mutation-your-components-little-secret) ສະດວກ ແລະ ດີຫຼາຍ!

</DeepDive>  

## ການ copy object ດ້ວຍ spread syntax {/*copying-objects-with-the-spread-syntax*/}

ໃນຕົວຢ່າງກ່ອນໜ້າ, object `ຕຳແໜ່ງ` ຈະຖືກສ້າງຂຶ້ນໃໝ່ຈາກຕຳແໜ່ງ cursor ປັດຈຸບັນສະເໝີ. ແຕ່ສ່ວນຫຼາຍ, ທ່ານຈະຕ້ອງລວມຂໍ້ມູນ *ທີ່ມີຢູ່* ເປັນສ່ວນໜຶ່ງຂອງ object ໃໝ່ທີ່ທ່ານກຳລັງສ້າງ. ຕົວຢ່າງ, ທ່ານອາດຈະຕ້ອງການອັບເດດ *ພຽງໜຶ່ງ field* ໃນ form, ແຕ່ເກັບຄ່າກ່ອນໜ້າສຳລັບ field ອື່ນໆທັງໝົດ.

Field input ເຫຼົ່ານີ້ໃຊ້ງານບໍ່ໄດ້ເນື່ອງຈາກ handler `onChange` ໄດ້ mutate state:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

ຕົວຢ່າງ, ແຖວນີ້ໄດ້ mutate state ຈາກການ render ທີຜ່ານມາ:

```js
person.firstName = e.target.value;
```

ວິທີທີ່ເຊື່ອຖືໄດ້ໃນການຮັບພຶດທິກຳທີ່ທ່ານຕ້ອງການແມ່ນສ້າງ object ໃໝ່ ແລະ ສົ່ງຕໍ່ໄປຍັງ `setPerson`. ແຕ່ຕອນນີ້, ທ່ານຕ້ອງການ **copy ຂໍ້ມູນທີ່ມີຢູ່ລົງໄປນຳ** ເນື່ອງຈາກມີ field ດຽວເທົ່ານັ້ນທີ່ປ່ຽນແປງ:

```js
setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email
});
```

ທ່ານສາມາດໃຊ້ syntax `...` [object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) ເພື່ອທີ່ທ່ານຈະໄດ້ບໍ່ຕ້ອງ copy ທຸກ property ແຍກກັນ.

```js
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});
```

ຕອນນີ້ form ເຮັດວຽກໄດ້!

ສັງເກດວ່າທ່ານບໍ່ໄດ້ປະກາດຕົວແປ state ແຍກຕ່າງຫາກສຳລັບແຕ່ລະ field input. ສຳລັບ form ໃຫຍ່, ການເກັບກຸ່ມຂໍ້ມູນທັງໝົດໄວ້ໃນ object ຈະສະດວກກວ່າຫຼາຍ--ຖ້າວ່າທ່ານອັບເດດຂໍ້ມູນຢ່າງຖືກຕ້ອງ!

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

ຈື່ໄວ້ວ່າ syntax spread `...` ແມ່ນ "ຕື້ນ"--ເຊິ່ງຈະ copy ສະເພາະສິ່ງທີ່ຢູ່ເລິກລົງໄປລະດັບໜຶ່ງເທົ່ານັ້ນ. ສິ່ງນີ້ເຮັດໃຫ້ໄວ, ແຕ່ກໍໝາຍຄວາມວ່າຖ້າທ່ານຕ້ອງການອັບເດດ property ທີ່ຊ້ອນກັນ, ທ່ານຈະຕ້ອງໄດ້ໃຊ້ຫຼາຍກວ່າໜຶ່ງຄັ້ງ.

<DeepDive>

#### ການໃຊ້ event handler ດຽວສຳລັບຫຼາຍ field {/*using-a-single-event-handler-for-multiple-fields*/}

ທ່ານຍັງສາມາດໃຊ້ວົງຂໍ `[` ແລະ `]` ພາຍໃນການປະກາດ object ເພື່ອລະບຸ property ທີ່ມີຊື່ dynamic. ນີ້ແມ່ນຕົວຢ່າງດຽວກັນ, ແຕ່ມີ event handler ດຽວແທນທີຈະມີສາມໂຕ:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

ຕອນນີ້, `e.target.name` ອ້າງອີງເຖິງ property `name` ທີ່ກຳນົດໃຫ້ກັບ DOM element `<input>`.

</DeepDive>

## ການອັບເດດ object ທີ່ຊ້ອນກັນ {/*updating-a-nested-object*/}

ພິຈາລະນາໂຄ່ງສ້າງ object ທີ່ຊ້ອນກັນດັ່ງນີ້:

```js
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
```

ຖ້າທ່ານຕ້ອງການອັບເດດ `person.artwork.city`, ຊັດເຈນວ່າຈະເຮັດແນວໃດກັບການ mutate: 

```js
person.artwork.city = 'New Delhi';
```

ແຕ່ໃນ React, ທ່ານຖືວ່າ state ເປັນສິ່ງທີ່ mutate ບໍ່ໄດ້! ໃນການປ່ຽນແປງ `city`, ກ່ອນອື່ນທ່ານຕ້ອງສ້າງ object `artwork` ໃໝ່ (ຕື່ມຂໍ້ມູນໄວ້ລ່ວງໜ້າຈາກ object ກ່ອນໜ້າ), ແລ້ວຈຶ່ງສ້າງ object `person` ໃໝ່ເຊິ່ງ point ໄປທີ່ `artwork` ໃໝ່:

```js
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

ຫຼື, ຂຽນເປັນການເອີ້ນໃຊ້ຟັງຊັ່ນດຽວ:

```js
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

ນີ້ຄ່ອນຂ້າງໃຊ້ຫຼາຍຄຳ, ແຕ່ໃຊ້ໄດ້ດີກັບຫຼາຍໆກໍລະນີ:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

<DeepDive>

#### Object ບໍ່ໄດ້ຊ້ອນກັນແທ້ໆ {/*objects-are-not-really-nested*/}

Object ທີ່ "ຊ້ອນກັນ" ແບບນີ້ສະແດງໃນ code:

```js
let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
```

ເຖິງຢ່າງໃດກໍຕາມ, "ການຊ້ອນກັນ" ເປັນວິທີທີ່ບໍ່ຖືກຕ້ອງໃນການຄິດກ່ຽວກັບພຶດທິກຳຂອງ object. ເມື່ອ code ຂອງທ່ານເຮັດວຽກ, ຈະບໍ່ມີສິ່ງທີ່ເອີ້ນວ່າ "ຊ້ອນກັນ" ຂອງ object. ທ່ານກຳລັງເບິ່ງສອງ object ທີ່ແຕກຕ່າງກັນ:

```js
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};
```
Object `obj1` ບໍ່ໄດ້ຢູ່ໃນ `obj2`. ຕົວຢ່າງ, `obj3` ຄວນ point ໄປທີ່ `obj1` ໄດ້ເຊັ່ນກັນ:

```js
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};

let obj3 = {
  name: 'Copycat',
  artwork: obj1
};
```

ຖ້າທ່ານຕ້ອງ mutate `obj3.artwork.city`, ຈະມີຜົນກັບ `obj2.artwork.city` ແລະ `obj1.city`. ເນື່ອງຈາກ `obj3.artwork`, `obj3.artwork` ແລະ `obj1` ແມ່ນເປັນ object ດຽວກັນ. ສິ່ງນີ້ຍາກທີ່ຈະເບິ່ງເຫັນເມື່ອທ່ານຄິດວ່າ object ນັ້ນ "ຊ້ອນກັນ". ແຕ່ເປັນ object ທີ່ແຍກກັນມີການ "point" ເຊິ່ງກັນ ແລະ ກັນດ້ວຍ property.

</DeepDive>  

### ການຂຽນ logic ການອັບເດດແບບຫຍໍ້ດ້ວຍ Immer {/*write-concise-update-logic-with-immer*/}

ຖ້າ state ຂອງທ່ານຊ້ອນກັນເລິກ, ທ່ານອາດຈະຕ້ອງພິຈາລະນາ [ການເຮັດໃຫ້ງ່າຍຂຶ້ນ.](/learn/choosing-the-state-structure#avoid-deeply-nested-state) ແຕ່ຖ້າທ່ານບໍ່ຕ້ອງການປ່ຽນແປງໂຄ່ງສ້າງ state ຂອງທ່ານ, ທ່ານອາດຈະຕ້ອງການທາງລັດໄປຍັງ spread ທີ່ຊ້ອນກັນ. [Immer](https://github.com/immerjs/use-immer) ແມ່ນ library ຍອດນິຍົມທີ່ໃຫ້ທ່ານຂຽນ code ໂດຍໃຊ້ syntax ທີ່ສະດວກແຕ່ mutate  ແລະ ທຳການການ copy ໃຫ້ທ່ານ. ດ້ວຍ Immer, code ທີ່ທ່ານກຳລັງ "ແຫກກົດ" ແລະ mutate object:

```js
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

ແຕ່ແຕກຕ່າງຈາກການ mutate ທົ່ວໄປ, ມັນບໍ່ໄດ້ຂຽນທັບ state ທີ່ຜ່ານມາ!

<DeepDive>

#### Immer ເຮັດວຽກແນວໃດ? {/*how-does-immer-work*/}

`draft` ທີ່ມານຳ Immer ແມ່ນ object ພິເສດ, ທີ່ເອີ້ນວ່າ [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), ທີ່ "ບັນທຶກ" ສິ່ງທີ່ທ່ານເຮັດນຳມັນ. ນີ້ແມ່ນເຫດຜົນວ່າເປັນຫຍັງທ່ານຈຶ່ງສາມາດ mutate ມັນໄດ້ຢ່າງອິດສະຫຼະຫຼາຍຕາມໃຈທ່ານຕ້ອງການ! ເບື້ອງຫຼັງ, Immer ຈະຄຳນວນວ່າສ່ວນໃດຂອງ `draft` ມີການປ່ຽນແປງແລ້ວ,​ແລະ ສ້າງ object ໃໝ່ທັງໝົດທີ່ມີການແກ້ໄຂຂອງທ່ານ.

</DeepDive>

ລອງໃຊ້ Immer:

1. ແລ່ນ `npm install use-immer` ເພື່ອເພີ່ມ Immer ເປັນ dependency
2. ຈາກນັ້ນແທນທີ່ `import { useState } from 'react'` ດ້ວຍ `import { useImmer } from 'use-immer'`

ນີ້ແມ່ນຕົວຢ່າງຂ້າງເທິງທີ່ແປງເປັນ Immer ແລ້ວ:

<Sandpack>

```js
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

ສັງເກດວ່າ event handler ມີຄວາມຮັດກຸມຫຼາຍຂຶ້ນເທົ່າໃດ. ທ່ານສາມາດຜະສົມ ແລະ ຈັບຄູ່ `useState` ແລະ  `useImmer` ໃນໜຶ່ງ component ໄດ້ຫຼາຍຕາມໃຈທ່ານຕ້ອງການ. Immer ເປັນວິທີການທີ່ດີທີ່ສຸດໃນການເຮັດໃຫ້ event handler ມີຄວາມຮັດກຸມ,​ ໂດຍສະເພາະ ຖ້າມີການຊ້ອນກັນຢູ່ໃນ state ຂອງທ່ານ, ແລະ ການ copy object ທີ່ອາດນຳໄປສູ່ code ທີ່ມີຄວາມຊໍ້າຊ້ອນ.

<DeepDive>

#### ເປັນຫຍັງຈຶ່ງບໍ່ແນະນຳໃຫ້ມີການ mutate state ໃນ React? {/*why-is-mutating-state-not-recommended-in-react*/}

ມີບາງເຫດຜົນດັ່ງນີ້:

* **ການ debug:** ຖ້າທ່ານໃຊ້ `console.log` ແລະ ບໍ່ mutate state, log ທີ່ຜ່ານມາຂອງທ່ານຈະບໍ່ຖືກຂັດຂວາງໂດຍການປ່ຽນແປງ state ຫຼ້າສຸດ. ສະນັ້ນທ່ານຈຶ່ງເຫັນໄດ້ຢ່າງຊັດເຈນວ່າ state ມີການປ່ຽນແປງແນວໃດໃນລະຫວ່າງການ render.
* **ການເພີ່ມປະສິດທິພາບ:** React ທົ່ວໄປ [ກົນລະຍຸດໃນການເພີ່ມປະສິດທິພາບ](/reference/react/memo) ອາໄສການຂ້າມການເຮັດວຽກຖ້າ prop ຫຼື state ກ່ອນໜ້າຄືກັນກັບໂຕຕໍ່ໄປ. ຖ້າທ່ານຍັງບໍ່ທັນ mutate state, ການກວດສອບຢ່າງໄວວ່າມີການປ່ຽນແປງໃດໆ ຫຼື ບໍ່. ຖ້າ `prevObj === obj`, ທ່ານໝັ້ນໃຈໄດ້ວ່າຈະບໍ່ມີຫຍັງປ່ຽນແປງພາຍໃນນັ້ນ.
* **Feature ໃໝ່:** feature React ໃໝ່ທີ່ພວກເຮົາກຳລັງສ້າງນັ້ນຂຶ້ນຢູ່ກັບ state ທີ່ [ໄດ້ຮັບການປະຕິບັດຄືກັບການ snapshot.](/learn/state-as-a-snapshot) ຖ້າທ່ານກຳລັງ mutate state ຂອງເວິຊັ່ນທີ່ຜ່ານມາ ມັນອາດຈະກັນບໍ່ໃຫ້ທ່ານໃຊ້ feature ໃໝ່.
* **ການປ່ຽນແປງຂໍ້ກຳນົດ:** ບາງ feature ຂອງແອັບພິເຄຊັ່ນເຊັ່ນ: ການ Undo/Redo, ການສະແດງປະຫວັດຂອງການປ່ຽນແປງ, ຫຼື ການອະນຸຍາດໃຫ້ຜູ້ໃຊ້ສາມາດ reset form ເປັນຄ່າກ່ອນໜ້າ, ຈະເຮັດໄດ້ງ່າຍເມື່ອບໍ່ມີການ mutate. ນີ້ເປັນເພາະວ່າທ່ານສາມາດເກັບ copy ຂອງ state ທີ່ຜ່ານມາໄວ້ໃນ memory ແລະ ໃຊ້ຊໍ້າໄດ້ຕາມຄວາມເໝາະສົມ. ຖ້າທ່ານເລີ່ມຕົ້ນດ້ວຍວິທີການ mutate feature ແບບນີ້ອາດຈະເປັນເລື່ອງຍາກທີ່ຈະເພີ່ມໃນພາຍຫຼັງ.
* **ການ implement ທີ່ງ່າຍກວ່າ:** ເນື່ອງຈາກ React ບໍ່ຕ້ອງອາໄສການ mutate, ຈຶ່ງບໍ່ຈຳເປັນຕ້ອງເຮັດຫຍັງພິເສດກັບ object ຂອງທ່ານ. ບໍ່ຈຳເປັນຕ້ອງເຮັດການ hijack property ຂອງມັນ, ລວມມັນໄວ້ໃນ proxy ສະເໝີ ຫຼື ວຽກອື່ນໃນການເລີ່ມຕົ້ນຄືກັນກັບວິທີແກ້ໄຂການ "reactive" ຈຳນວນຫຼາຍ. ນີ້ແມ່ນເຫດຜົນທີ່ React ໃຫ້ທ່ານໃສ່ Object ຫຍັງກະໄດ້ລົງໃນ state--ບໍ່ວ່າຈະໃຫຍ່ສໍ່າໃດ--ໂດຍບໍ່ມີຂໍ້ຜິດພາດໃນດ້ານປະສິດທິພາບ ຫຼື ຄວາມຖືກຕ້ອງເພີ່ມເຕີມ.

ໃນທາງປະຕິບັດ, ທ່ານມັກຈະ "ຫຼົບຫຼີກ" ກັບການ mutate state ໃນ React ໄດ້, ແຕ່ເຮົາຂໍແນະນຳເປັນຢ່າງສູງໃຫ້ທ່ານບໍ່ຕ້ອງເຮັດແບບນັ້ນ ເພື່ອທີ່ທ່ານຈະສາມາດໃຊ້ feature ໃໝ່ຂອງ React ທີ່ພັດທະນາຂຶ້ນໂດຍຄຳນຶງເຖິງແນວທາງນີ້. ຜູ້ມີສ່ວນຮ່ວມໃນອະນາຄົດ ແລະ ບາງທີ່ລວມເຖິງໂຕທ່ານໃນອະນາຄົດກໍຈະຂໍຂອບໃຈ!

</DeepDive>

<Recap>

* ປະຕິບັດຕໍ່ state ທັງໝົດໃນ React ແບບ mutate ບໍ່ໄດ້.
* ເມື່ອທ່ານເກັບ object ໃນ state, ການ mutate ຈະບໍ່ trigger ການ render ແລະ ຈະປ່ຽນແປງ state ໃນການ render "snapshots" ກ່ອນໜ້າ.
* ແທນທີ່ຈະ mutate object, ໃຫ້ສ້າງເວີຊັ່ນ *ໃໝ່* ຂອງ object ນັ້ນ ແລະ trigger ການ render ໃໝ່ໂດຍການຕັ້ງຄ່າ state ໃຫ້ມັນ.
* ທ່ານສາມາດໃຊ້ syntax object spread `{...obj, something: 'newValue'}` ເພື່ອສ້າງ copy ຂອງ object. 
* Syntax spread ແມ່ນຕື້ນ: ມັນ copy ໄດ້ເລິກລະດັບດຽວເທົ່ານັ້ນ.
* ເພື່ອອັບເດດ object ທີ່ມີການຊ້ອນກັນ, ທ່ານຕ້ອງໄດ້ສ້າງ copy ຈາກຕຳແໜ່ງທີ່ທ່ານກຳລັງອັບເດດທັງໝົດ.
* ເພື່ອຫຼຸດການ copy code ຊໍ້າໆ, ໃຊ້ Immer.


</Recap>



<Challenges>

#### ແປງການອັບເດດ state ທີ່ບໍ່ຖືກຕ້ອງ {/*fix-incorrect-state-updates*/}

Form ນີ້ມີບັນຫາໜ້ອຍໜຶ່ງ. ຄິກປຸ່ມເພື່ອເພີ່ມຄະແນນສອງສາມຄັ້ງ. ສັງເກດວ່າມັນຈະບໍ່ມີການເພີ່ມຂຶ້ນ. ຈາກນັ້ນແກ້ໄຂຊື່ ແລະ ສັງເກດວ່າຄະແນນນັ້ນ "ທັນ" ກັບການປ່ຽນແປງຂອງທ່ານ. ສຸດທ້າຍ, ແກ້ໄຂນາມສະກຸນ ແລະ ສັງເກດວ່າຄະແນນຫາຍໄປຢ່າງສົມບູນ.

ວຽກຂອງທ່ານແມ່ນແກ້ໄຂບັນຫາເຫຼົ່ານີ້ທັງໝົດ. ຂະນະທີ່ທ່ານແກ້ໄຂ, ໃຫ້ອະທິບາຍວ່າເປັນຫຍັງມັນຈຶ່ງເກີດຂຶ້ນ.

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    player.score++;
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 10px; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

<Solution>

ນີ້ແມ່ນເວີຊັ່ນທີ່ໄດ້ຮັບການແກ້ໄຂແລ້ວ:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    setPlayer({
      ...player,
      score: player.score + 1,
    });
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      ...player,
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

ບັນຫາຂອງ `handlePlusClick` ມັນເຮັດໃຫ້ object `player` mutate. ຍ້ອນເຫດຜົນນີ້, React ບໍ່ຮູ້ວ່າມີເຫດຜົນຫຍັງທີ່ຕ້ອງ render ໃໝ່, ແລະ ບໍ່ໄດ້ອັບເດດຄະແນນເທິງໜ້າຈໍ. ນີ້ແມ່ນເຫດຜົນ, ເມື່ອທ່ານແກ້ໄຂຊື່ state ຈະໄດ້ຮັບການອັບເດດ, trigger ການ render ໃໝ່ ເຊິ່ງ _ຍັງ_ ອັບເດດຄະແນນເທິງໜ້າຈໍ.

ບັນຫາຂອງ `handleLastNameChange` ແມ່ນບໍ່ໄດ້ copy field `...player` ໃສ່ໃນ object ໃໝ່. ນີ້ເປັນສາເຫດທີ່ຄະແນນຫາຍໄປຫຼັງຈາກທີ່ທ່ານແກ້ໄຂນາມສະກຸນ.

</Solution>

#### ຄົ້ນຫາ ແລະ ແກ້ໄຂການ mutate {/*find-and-fix-the-mutation*/}

ມີກ່ອງທີ່ສາມາດລາກໄດ້ເທິງພື້ນຫຼັງແບບ static. ທ່ານສາມາດປ່ຽນສີຂອງກ່ອງໄດ້ໂດຍການໃຊ້ input ທີ່ເລືອກ.

ແຕ່ມັນຍັງມີບັນຫາ. ຖ້າທ່ານຍ້າຍກ່ອງກ່ອນ, ແລ້ວປ່ຽນສີມັນ, ພື້ນຫຼັງ (ມັນບໍ່ຄວນຍ້າຍ!) ຈະ "ຂ້າມ" ໄປຍັງຕຳແໜ່ງກ່ອງ. ສິ່ງນີ້ບໍ່ຄວນເກີດຂຶ້ນ: prop `position` ຂອງພື້ນຫຼັງຖືກຕັ້ງຄ່າເປັນຄ່າ `initialPosition`, ເຊິ່ງແມ່ນ `{ x: 0, y: 0 }`. ເປັນຫຍັງພື້ນຫຼັງຈຶ່ງເຄື່ອນທີ່ຫຼັງຈາກປ່ຽນສີ?

ຄົ້ນຫາບັນຫາ ແລະ ແກ້ໄຂ

<Hint>

ຫາກມີການປ່ຽນແປງໂດຍບໍ່ຄາດຄິດ, ສະແດງວ່າມີການ mutate. ຄົ້ນຫາການ mutate ໃນ `App.js` ແລະ ແກ້ໄຂມັນ.

</Hint>

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js src/Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js src/Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

</Sandpack>

<Solution>

ບັນຫາເກີດຈາກການ mutate ພາຍໃນ `handleMove`. ມັນ mutate `shape.position`, ແຕ່ນັ້ນແມ່ນ object ດຽວກັນກັບທີ່ `initialPosition` point ໄປ. ນີ້ແມ່ນເຫດຜົນທີ່ທັງຮູບຮ່າງ ແລະ ພື້ນຫຼັງຍ້າຍ. (ເປັນການ mutate, ສະນັ້ນການປ່ຽນແປງຈະບໍ່ສະແດງເທິງໜ້າຈໍຈົນກວ່າກຈະມີການອັບເດດທີ່ບໍ່ກ່ຽວຂ້ອງກັນເຊັ່ນ--ການປ່ຽນສີ--ການ trigger ເພື່ອ render ໃໝ.່)

ການແກ້ໄຂແມ່ນລຶບການ mutate ອອກຈາກ `handleMove`, ແລະ ໃຊ້ syntax spread ເພື່ອ copy ຮູບຮ່າງ. ໝາຍເຫດ `+=` ແມ່ນການ mutate, ດັ່ງນັ້ນທ່ານຕ້ອງໄດ້ຂຽນມັນໃໝ່ເພື່ອໃຊ້ການດຳເນີນການ `+` ທົ່ວໄປ.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    setShape({
      ...shape,
      position: {
        x: shape.position.x + dx,
        y: shape.position.y + dy,
      }
    });
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js src/Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js src/Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

</Sandpack>

</Solution>

#### ການອັບເດດ Object ດ້ວຍ Immer {/*update-an-object-with-immer*/}

ນີ້ແມ່ນຕົວຢ່າງແບບດຽວກັນທີ່ມີບັນຫາໃນໂຈດກ່ອນໜ້ານີ້. ຄັ້ງນີ້, ແກ້ໄຂການ mutate ໂດຍການໃຊ້ Immer. ເພື່ອຄວາມສະດວກຂອງທ່ານ, `useImmer` ແມ່ນຖືກ import ໃຫ້ແລ້ວ, ສະນັ້ນທ່ານຕ້ອງໄດ້ປ່ຽນຕົວແປ state `shape` ເພື່ອໃຊ້ງານ.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js src/Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js src/Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

<Solution>

ນີ້ແມ່ນວິທີແກ້ໄຂບັນຫາທີ່ຂຽນໃໝ່ດ້ວຍ Immer. ສັງເກດວິທີການຂຽນ event handler ໃນຮູບແບບການ mutate, ແຕ່ບັນຫາບໍ່ເກີດຂຶ້ນ. ນີ້ເປັນເພາະວ່າເບື້ອງຫຼັງຂອງ Immer ແມ່ນບໍ່ເຄີຍ mutate object ທີ່ມີຢູ່ແລ້ວ.

<Sandpack>

```js src/App.js
import { useImmer } from 'use-immer';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, updateShape] = useImmer({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    updateShape(draft => {
      draft.position.x += dx;
      draft.position.y += dy;
    });
  }

  function handleColorChange(e) {
    updateShape(draft => {
      draft.color = e.target.value;
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js src/Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js src/Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

</Solution>

</Challenges>
