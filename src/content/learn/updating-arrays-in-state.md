---
title: ການອັບເດດ Array ໃນ State
---

<Intro>

Array ແມ່ນມີການ mutate ໃນ JavaScript, ແຕ່ທ່ານຄວນຖືວ່າມັນບໍ່ມີການ mutate ເມື່ອທ່ານຈັດເກັບໄວ້ໃນ state. ຄືກັນກັບ object, ເມື່ອທ່ານຕ້ອງການອັບເດດ array ທີ່ເກັບໄວ້ໃນ state, ທ່ານຕ້ອງສ້າງ array ໃໝ່ (ຫຼື ເຮັດ copy ຂອງ array ທີ່ມີຢູ່),​ ຈາກນັ້ນຕັ້ງຄ່າ state ເພື່ອໃຊ້ array ໃໝ່.

</Intro>

<YouWillLearn>

- ວິທີເພີ່ມ, ລຶບ ຫຼື ປ່ຽນແປງລາຍການໃນ array ໃນ state React
- ວິທີອັບເດດ object ພາຍໃນ array
- ວິທີເຮັດໃຫ້ການ copy array ທີ່ຊໍ້າຊ້ອນໃຫ້ນ້ອຍລົງດ້ວຍ Immer

</YouWillLearn>

## ການອັບເດດ Array ໂດຍບໍ່ທຳການ mutate {/*updating-arrays-without-mutation*/}

ໃນ JavaScript, array ເປັນພຽງ object ປະເພດໜຶ່ງ. [ຄືກັນກັບ object](/learn/updating-objects-in-state), **ທ່ານຄວນຖືວ່າ array ໃນ state ເປັນ read-only.** ເຊິ່ງໝາຍຄວາມວ່າທ່ານບໍ່ຄວນກຳນົດ item ໃໝ່ພາຍໃນ array ເຊັ່ນ `arr[0] = 'bird'`, ແລະ ທ່ານບໍ່ຄວນໃຊ້ວິທີທີ່ mutate array ເຊັ່ນ: `push()` ແລະ `pop()`.

ແຕ່ທຸກຄັ້ງທີ່ທ່ານອັບເດດ array, ທ່ານຈະຕ້ອງສົ່ງ array *ໃໝ່* ໄປຍັງຟັງຊັ່ນການຕັ້ງຄ່າ state ຂອງທ່ານ. ເພື່ອເຮັດສິ່ງນີ້, ທ່ານສາມາດສ້າງ array ໃໝ່ຈາກ array ເກົ່າໃນ state ຂອງທ່ານໂດຍການເອີ້ນໃຊ້ method ທີ່ບໍ່ mutate ເຊັ່ນ: `filter()` ແລະ `map()`. ຈາກນັ້ນທ່ານສາມາດຕັ້ງຄ່າ state ຂອງທ່ານເປັນ array ໃໝ່ໄດ້.

ນີ້ແມ່ນຕາຕະລາງການອ້າງອີງຂອງການດຳເນີນການ array ທົ່ວໄປ. ເມື່ອຈັດການກັບ array ໃນ state React, ທ່ານຈະຕ້ອງຫຼີກຫຼ່ຽງ method ໃນຖັນດ້ານຊ້າຍ ແລະ ເລືອກ method ໃນຖັນດ້ານຂວາແທນ:

|           | ຫຼີກຫຼ່ຽງ (ການ mutate array)           | ແນະນຳ (return array ໃໝ່)                                        |
| --------- | ----------------------------------- | ------------------------------------------------------------------- |
| ການເພີ່ມ    | `push`, `unshift`                   | `concat`, `[...arr]` spread syntax ([ຕົວຢ່າງ](#adding-to-an-array)) |
| ການລຶບ| `pop`, `shift`, `splice`            | `filter`, `slice` ([ຕົວຢ່າງ](#removing-from-an-array))              |
| ການແທນທີ່| `splice`, `arr[i] = ...` ການກຳນົດຄ່າ | `map` ([ຕົວຢ່າງ](#replacing-items-in-an-array))                     |
| ການຈັດຮຽງ| `reverse`, `sort`                   | copy array ທຳອິດ ([ຕົວຢ່າງ](#making-other-changes-to-an-array)) |

ອີກວິທີ,​ ທ່ານສາມາດ [ໃຊ້ Immer](#write-concise-update-logic-with-immer) ເຊິ່ງໃຫ້ທ່ານໃຊ້ method ຈາກສອງຖັນ.

<Pitfall>

ນ່າເສຍດາຍທີ່ [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) ແລະ [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) ມີຊື່ຄ້າຍກັນແຕ່ວ່າຕ່າງກັນຫຼາຍ:

* `slice` ໃຫ້ທ່ານ copy array ຫຼື ບາງສ່ວນ.
* `splice` ສາມາດ **mutate** array (ເພື່ອເພີ່ມ ຫຼື ລຶບ item).

ໃນ React, ທ່ານຈະໃຊ້ `slice` (ບໍ່ມີ `p`!) ຫຼາຍຂຶ້ນ ເພາະວ່າທ່ານບໍ່ mutate object ຫຼື array ໃນ state. [ການອັບເດດ Object](/learn/updating-objects-in-state) ອະທິບາຍວ່າການ mutate ແມ່ນຫຍັງ ແລະ ຍ້ອນຫຍັງຈື່ງບໍ່ແນະນຳໃຫ້ໃຊ້ກັບ state.

</Pitfall>

### ການເພີ່ມໄປຍັງ array {/*adding-to-an-array*/}

`push()` ຈະ mutate array, ເຊິ່ງທ່ານບໍ່ໄດ້ຕ້ອງການ:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        artists.push({
          id: nextId++,
          name: name,
        });
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

ໃຫ້ສ້າງ array *ໃໝ່* ເຊິ່ງມີ item ທີ່ມີຢູ່ *ແລະ* item ໃໝ່ຕໍ່ທ້າຍແທນ. ມີຫຼາຍວິທີໃນການເຮັດແບບນີ້, ແຕ່ວິທີທີ່ງ່າຍທີ່ສຸດແມ່ນໃຊ້ `...` syntax [spread array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals):

```js
setArtists( // Replace the state
  [ // with a new array
    ...artists, // that contains all the old items
    { id: nextId++, name: name } // and one new item at the end
  ]
);
```

ດຽວນີ້ເຮັດວຽກໄດ້ຖືກຕ້ອງ:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

Syntax spread ຂອງ array ຍັງຊ່ວຍໃຫ້ທ່ານເພີ່ມ item ໂດຍການວາງ *ກ່ອນ* ໂຕຕົ້ນສະບັບ `...artists`:

```js
setArtists([
  { id: nextId++, name: name },
  ...artists // Put old items at the end
]);
```

ຍ້ອນວິທີນີ້, spread ສາມາດເຮັດວຽກຂອງທັງ `push()` ໂດຍການເພີ່ມບ່ອນທ້າຍຂອງ array ແລະ `unshift()` ໂດຍການເພີ່ມຈຸດເລີ່ມຕົ້ນຂອງ array. ລອງໃຊ້ໃນ sandbox ດ້ານເທິງ!

### ການລຶບອອກຈາກ array {/*removing-from-an-array*/}

ວິທີທີ່ງ່າຍທີ່ສຸດໃນການລຶບ item ອອກຈາກ array ແມ່ນການ *filter ມັນອອກ*. ເວົ້າໄດ້ວ່າ, ທ່ານຈະສ້າງ array ໃໝ່ທີ່ບໍ່ມີ item ນັ້ນ. ໃນການເຮັດແບບນີ້, ໃຫ້ໃຊ້ວິທີ method `filter`, ຕົວຢ່າງ:

<Sandpack>

```js
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

ຄິກປຸ່ມ "Delete" ສອງສາມຄັ້ງ, ແລ້ວເບິ່ງທີ່ click handler ຂອງມັນ.

```js
setArtists(
  artists.filter(a => a.id !== artist.id)
);
```

ໃນນີ້, `artists.filter(a => a.id !== artist.id)` ໝາຍເຖິງ "ການສ້າງ array ທີ່ປະກອບມີ `artist` ເຊິ່ງມີ ID ທີ່ແຕກຕ່າງຈາກ `artist.id`". ເວົ້າໄດ້ວ່າ, ປຸ່ມ "Delete" ຂອງ artist ຈະ filter artist _ນັ້ນ_ ອອກຈາກ array, ແລະ ຈາກນັ້ນຈະມີການຮ້ອງຂໍໃຫ້ render ໃໝ່ດ້ວຍ array ທີ່ມີຄ່າໃໝ່. ສັງເກດວ່າ `filter` ບໍ່ໄດ້ແກ້ໄຂ array ເດີມ. 

### ການແປງ array {/*transforming-an-array*/}

ຖ້າທ່ານຕ້ອງການປ່ຽນບາງ item ຫຼື ທັງໝົດຂອງ array, ທ່ານສາມາດໃຊ້ `map()` ເພື່ອສ້າງ array **ໃໝ່**. ຟັງຊັ່ນທີ່ທ່ານສົ່ງຜ່ານ `map` ສາມາດຕັດສິນໃຈໄດ້ວ່າຈະເຮັດຫຍັງແນ່ກັບແຕ່ລະ item, ໂດຍພິຈາລະນາຈາກຂໍ້ມູນ ຫຼື index ຂອງມັນເອງ (ຫຼື ທັງສອງ). 

ໃນຕົວຢ່າງນີ້, array ມີພິກັດຂອງວົງມົນສອງວົງ ແລະ ສີ່ຫຼ່ຽມຈະຕຸລັດ. ເມື່ອທ່ານກົດປຸ່ມ, ປຸ່ມຈະເລື່ອນສະເພາະວົງມົນລົງ 50pixel. ມັນເຮັດໄດ້ໂດຍການສ້າງ array ໃໝ່ໂດຍໃຊ້ `map()`:

<Sandpack>

```js
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // No change
        return shape;
      } else {
        // Return a new circle 50px below
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // Re-render with the new array
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        Move circles down!
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}
```

```css
body { height: 300px; }
```

</Sandpack>

### ການແທນທີ item ໃນ array {/*replacing-items-in-an-array*/}

ມັນເປັນເລື່ອງປົກະຕິທີ່ຈະຕ້ອງການແທນທີ່ໜຶ່ງລາຍການຂຶ້ນໄປໃນ array. ການກຳນົດເຊັ່ນ `arr[0] = 'bird'` ກຳລັງ mutate array ເດີມ, ສະນັ້ນທ່ານຄວນໃຊ້ `map` ສຳລັບສິ່ງນີ້ແທນ.

ຫາກຕ້ອງການແທນທີ item, ໃຫ້ສ້າງ array ໃໝ່ດ້ວຍ `map`. ໃນການເອີ້ນໃຊ້ `map` ຂອງທ່ານ, ທ່ານຈະໄດ້ຮັບ index item ເປັນ argument ທີ່ສອງ. ໃຊ້ມັນເພື່ອຕັດສິນໃຈວ່າຈະ return item ດັ້ງເດີມ (argument ທຳອິດ) ຫຼື ຢ່າງອື່ນ:

<Sandpack>

```js
import { useState } from 'react';

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

### ການເພີ່ມຂໍ້ມູນໃສ່ໃນ array {/*inserting-into-an-array*/}

ບາງເທື່ອ, ທ່ານອາດຈະຕ້ອງເພີ່ມ item ໃນຕຳແໜ່ງໃດໜຶ່ງເຊິ່ງບໍ່ແມ່ນຈຸດເລີ່ມຕົ້ນ ແລະ ຈຸດສຸດທ້າຍ. ເພື່ອເຮັດສິ່ງນີ້, ທ່ານສາມາດໃຊ້ syntax spread array `...` ຮ່ວມກັບ method `slice()`. Method `slice()` ຊ່ວຍໃຫ້ທ່ານ "ຕັດ" ບາງສ່ວນຂອງ array ໄດ້. ເພື່ອເພີ່ມ item, ທ່ານຕ້ອງສ້າງ array ທີ່ແບ່ງສ່ວນ _ກ່ອນ_ ຈຸດທີ່ຈະເພີ່ມ, ຈາກນັ້ນຈຶ່ງເພີ່ມລາຍການໃໝ່ ແລະ ສ່ວນທີ່ເຫຼືອຂອງ array ເກົ່າ.

ໃນຕົວຢ່າງນີ້, ປຸ່ມເພີ່ມຈະເພີ່ມທີ່ index `1` ສະເໝີ:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Insert
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

### ການປ່ຽນແປງອື່ນໆກັບ array {/*making-other-changes-to-an-array*/}

ມີບາງສິ່ງທີ່ທ່ານບໍ່ສາມາດເຮັດໄດ້ໂດຍ syntax spread ແລະ  ວິທີການທີ່ບໍ່ເຮັດໃຫ້ມີການ mutate ເຊັ່ນ `map()` ແລະ `filter()` ພຽງຢ່າງດຽວ. ຕົວຢ່າງ, ທ່ານອາດຈະຕ້ອງການ reverse ຫຼື ຮຽງລຳດັບ array. Method JavaScriopt `reverse()` ແລະ `sort()` ກຳລັງ mutate array ເດີມ, ດັ່ງນັ້ນທ່ານຈຶ່ງບໍ່ສາມາດໃຊ້ມັນໂດຍກົງໄດ້.

**ເຖິງຢ່າງໃດກໍຕາມ, ທ່ານສາມາດ copy array ກ່ອນ, ຈາກນັ້ນຈຶ່ງທຳການປ່ຽນແປງມັນ.**

ຕົວຢ່າງ:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        Reverse
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

ທີ່ນີ້, ທ່ານໃຊ້ syntax spread `[...list]` ເພື່ອສ້າງ copy ຂອງ array ເດີມກ່ອນ. ຕອນນີ້ທ່ານມີ copy ແລ້ວ, ທ່ານສາມາດໃຊ້ວິທີ mutate method ເຊັ່ນ: `nextList.reverse()` ຫຼື `nextList.sort()` ຫຼື ແມ້ແຕ່ກຳນົດແຕ່ລະ item ດ້ວຍ `nextList[0] = "ບາງຢ່າງ"`.

ເຖິງຢ່າງໃດກໍຕາມ, **ເຖິງວ່າທ່ານຈະ copy array, ທ່ານບໍ່ສາມາດ mutate item ທີ່ມີຢູ່ _ພາຍໃນ_ ຂອງ array ໂດຍກົງໄດ້.** ເນື່ອງຈາກການ copy ນັ້ນມີລຳດັບຊັ້ນບໍ່ເລິກ--array ໃໝ່ຈະມີ item ຄືກັບຂອງເດີມ.​ ດັ່ງນັ້ນຖ້າທ່ານແກ້ໄຂ object ພາຍໃນ array ທີ່ຖືກ copy, ທ່ານກຳລັງ mutate state ທີ່ມີຢູ່. ຕົວຢ່າງ, code ແບບນີ້ທີ່ມີບັນຫາ.

```js
const nextList = [...list];
nextList[0].seen = true; // Problem: mutates list[0]
setList(nextList);
```

ເຖິງວ່າ `nextList` ແລະ `list` ຈະເປັນສອງ array ທີ່ແຕກຕ່າງກັນ, ແຕ່ **`nextList[0]` ແລະ `list[0]` ຈະ point ໄປທີ່ object ດຽວກັນ.** ສະນັ້ນ, ການປ່ຽນແປງ `nextList[0].seen` ນຳ. ນີ້ແມ່ນການ mutate state, ເຊິ່ງທ່ານຄວນຫຼີກຫຼ່ຽງ! ທ່ານສາມາດແກ້ບັນຫານີ້ໄດ້ດ້ວຍຫຼາຍວິທີທີ່ຄ້າຍຄືກັບ [ການອັບເດດ Object JavaScript ທີ່ຊ້ອນກັນ](/learn/updating-objects-in-state#updating-a-nested-object)--ໂດຍການ copy ແຕ່ລະ item ທີ່ທ່ານຕ້ອງການປ່ຽນແປງແທນການ mutate. ນີ້ແມ່ນວິທີການ.

## ການອັບເດດ object ພາຍໃນ array {/*updating-objects-inside-arrays*/}

Object ບໍ່ໄດ້ຢູ່ "ພາຍໃນ" array _ແທ້_. ອາດເບິ່ງວ່າເປັນ "ພາຍໃນ" code, ແຕ່ວ່າແຕ່ລະ object ໃນ array ເປັນຄ່າທີ່ແຍກກັນ, ເຊິ່ງເປັນ array "point". ນີ້ເປັນເຫດຜົນທີ່ທ່ານຕ້ອງລະວັງເມື່ອປ່ຽນ field ທີ່ຊ້ອນກັນເຊັ່ນ `list[0]`. ລາຍການ artwork ຂອງບຸກຄົນອື່ນອາດ point ໄປທີ່ element ດຽວກັນຂອງ array!

**ເມື່ອອັບເດດ state ທີ່ຊ້ອນກັນ, ທ່ານຕ້ອງສ້າງ copy ຈາກຈຸດທີ່ທ່ານຕ້ອງການອັບເດດ ແລະ ໄປຈົນເຖິງລະດັບເທິງສຸດ.** ມາເບິ່ງວິທີການເຮັດວຽກ.

ໃນຕົວຢ່າງນີ້, ລາຍການ artwork ສອງລາຍການທີ່ແຍກກັນມີ state ເລີ່ມຕົ້ນຄືກັນ. ພວກມັນຄວນຖືກແຍກອອກຈາກກັນ, ແຕ່ເນື່ອງຈາກມີການ mutate, state ຂອງພວກມັນຈຶ່ງຖືກແບ່ງປັນກັນໂດຍບັງເອີນ ແລະ ການໝາຍຕິກທີ່ກ່ອງໃນລາຍການໃດໜຶ່ງຈະສົ່ງຜົນຕໍ່ອີກລາຍການໜຶ່ງ:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

</Sandpack>

ບັນຫາແມ່ນຢູ່ໃນ code ແບບນີ້:

```js
const myNextList = [...myList];
const artwork = myNextList.find(a => a.id === artworkId);
artwork.seen = nextSeen; // Problem: mutates an existing item
setMyList(myNextList);
```

ເຖິງວ່າ array `myNextList` ຈະເປັນອັນໃໝ່, ແຕ່ໂຕ *item ເອງ* ກໍຄືກັນກັບ array `myList` ເດີມ. ສະນັ້ນການປ່ຽນແປງ `artwork.seen` ຈຶ່ງປ່ຽນ item ຂອງ artwork *ຕົ້ນສະບັບ*. item artwork ນັ້ນຢູ່ໃນ `yourList`, ເຊິ່ງເຮັດໃຫ້ເກີດຂໍ້ຜິດພາດ. ຂໍ້ຜິດພາດນີ້ອາດເປັນເລື່ອງຍາກທີ່ຈະຄິດເຖິງ, ແຕ່ໂຊກດີທີ່ມັນຫາຍໄປຫາກທ່ານຫຼີກຫຼ່ຽງການ mutate state.

**ທ່ານສາມາດໃຊ້ `map` ເພື່ອແທນທີ່ item ເກົ່າດ້ວຍເວີຊັ່ນທີ່ອັບເດດໂດຍບໍ່ມີການ mutate.**

```js
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // Create a *new* object with changes
    return { ...artwork, seen: nextSeen };
  } else {
    // No changes
    return artwork;
  }
}));
```

ໃນນີ້, `...` ເປັນ syntax spread ຂອງ object ທີ່ໃຊ້ເພື່ອ [ສ້າງ copy ຂອງ object.](/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax)

ດ້ວຍວິທີນີ້, item state ທີ່ມີຢູ່ຈະບໍ່ຖືກ mutate, ແຕ່ໄດ້ຮັບການແກ້ໄຂແລ້ວ:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // Create a *new* object with changes
        return { ...artwork, seen: nextSeen };
      } else {
        // No changes
        return artwork;
      }
    }));
  }

  function handleToggleYourList(artworkId, nextSeen) {
    setYourList(yourList.map(artwork => {
      if (artwork.id === artworkId) {
        // Create a *new* object with changes
        return { ...artwork, seen: nextSeen };
      } else {
        // No changes
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

</Sandpack>

ໂດຍທົ່ວໄປແລ້ວ, **ທ່ານຄວນ mutate ສະເພາະ object ທີ່ທ່ານຫາກໍສ້າງຂຶ້ນເທົ່ານັ້ນ.** ຖ້າທ່ານກຳລັງເພີ່ມ artwork *ໃໝ່*, ທ່ານສາມາດ mutate ມັນ, ແຕ່ທ່ານກຳລັງຈັດການກັບບາງສິ່ງທີ່ມີຢູ່ແລ້ວໃນ state, ທ່ານຕ້ອງເຮັດການ copy.

### ຂຽນ logic ການອັບເດດທີ່ເຂົ້າໃຈງ່າຍດ້ວຍ Immer {/*write-concise-update-logic-with-immer*/}

ການອັບເດດ array ທີ່ຊ້ອນກັນໂດຍບໍ່ມີການ mutate ອາດເຮັດໃຫ້ມີການຊໍ້າກັນໜ້ອຍໜຶ່ງ. [ຄືກັນກັບ object](/learn/updating-objects-in-state#write-concise-update-logic-with-immer):

- ໂດຍທົ່ວໄປ, ທ່ານບໍ່ຈຳເປັນຕ້ອບອັບເດດ state ຫຼາຍກວ່າສອງຫາສາມລະດັບ. ຖ້າ object state ຂອງທ່ານຢູ່ເລິກຫຼາຍ, ທ່ານອາດຈະຕ້ອງການ [restructure ມັນໃຫ້ແຕກຕ່າງອອກໄປ](/learn/choosing-the-state-structure#avoid-deeply-nested-state) ເພື່ອໃຫ້ object ເຫຼົ່ານັ້ນຮຽບງ່າຍ.
- ຖ້າທ່ານບໍ່ຕ້ອງການປ່ຽນໂຄ່ງສ້າງ state ຂອງທ່ານ, ທ່ານອາດຈະຕ້ອງການໃຊ້ [Immer](https://github.com/immerjs/use-immer), ເຊິ່ງຊ່ວຍໃຫ້ທ່ານຂຽນໂດຍໃຊ້ syntax ທີ່ສະດວກແຕ່ມີການ mutate ແລະ ດູແລໃນການສ້າງ copy ສຳລັບທ່ານ.

ນີ້ແມ່ນຕົວຢ່າງ Art Bucket List ທີ່ຂຽນໃໝ່ດ້ວຍ Immer:

<Sandpack>

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
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

</Sandpack>

ຈື່ໄວ້ວ່າ Immer, **ການ mutate ເຊັ່ນ `artwork.seen = nextSeen` ແມ່ນບໍ່ເປັນຫຍັງ:**

```js
updateMyTodos(draft => {
  const artwork = draft.find(a => a.id === artworkId);
  artwork.seen = nextSeen;
});
```

ນີ້ເປັນເພາະວ່າທ່ານບໍ່ໄດ້ mutate state _ເດີມ_, ແຕ່ທ່ານກຳລັງ mutate object `draft` ພິເສດທີ່ເຮັດໂດຍ Immer. ໃນແບບດຽວກັນ, ທ່ານສາມາດໃຊ້ method mutate ເຊັ່ນ: `push()` ແລະ `pop()` ກັບເນື້ອຫາຂອງ `draft`.

ເບື້ອງຫຼັງ, Immer ມັກຈະສ້າງ state ຕໍ່ໄປຕັ້ງແຕ່ເລີ່ມຕົ້ນຕາມການປ່ຽນແປງທີ່ທ່ານໄດ້ເຮັດກັບ `draft`. ສິ່ງນີ້ເຮັດໃຫ້ event handler ຂອງທ່ານຮັດກຸມຫຼາຍໂດຍບໍ່ມີການ mutate state.

<Recap>

- ທ່ານສາມາດເຮັດໃຫ້ array ເຂົ້າໄປຢູ່ໃນ state, ແຕ່ທ່ານບໍ່ສາມາດປ່ຽນແປງມັນໄດ້.
- ແທນທີ່ຈະ mutate array, ໃຫ້ສ້າງເວີຊັ່ນ *ໃໝ່* ແລະ ອັບເດດ state ເປັນ array.
- ທ່ານສາມາດໃຊ້ syntax spread array `[...arr, newItem]` ເພື່ອສ້າງ array ທີ່ມີລາຍການໃໝ່.
- ທ່ານສາມາດໃຊ້ `filter()` ແລະ `map()` ເພື່ອສ້າງ array ໃໝ່ດ້ວຍ item ທີ່ filter ແລ້ວ ຫຼື ມີການປ່ຽນແປງ.
- ທ່ານສາມາດໃຊ້ Immer ເພື່ອໃຫ້ code ຂອງທ່ານສາມາດເຂົ້າໃຈງ່າຍ.

</Recap>



<Challenges>

#### ອັບເດດ item ໃນ shopping cart {/*update-an-item-in-the-shopping-cart*/}

ເພີ່ມ logic `handleIncreaseClick` ເພື່ອໃຫ້ການກົດ "+" ເພີ່ມຈຳນວນທີ່ກ່ຽວຂ້ອງ:

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {

  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

<Solution>

ທ່ານສາມາດໃຊ້ຟັງຊັ່ນ `map` ເພື່ອສ້າງ array ໃໝ່, ແລະ ຫຼັງຈາກນັ້ນໃຊ້ syntax spread ຂອງ object `...` ເພື່ອສ້າງ copy ຂອງ object ທີ່ປ່ຽນແປງສຳລັບ array ໃໝ່:

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

</Solution>

#### ລຶບ item ຈາກ shopping cart {/*remove-an-item-from-the-shopping-cart*/}

shopping cart ມີປຸ່ມ "+" ທີ່ເຮັດວຽກໄດ້, ແຕ່ປຸ່ມ "-" ບໍ່ເຮັດວຽກຫຍັງ. ທ່ານຕ້ອງເພີ່ມ event handler ເພື່ອໃຫ້ການກົດຫຼຸດ `count` ຂອງສິນຄ້າທີ່ກ່ຽວຂ້ອງ. ຖ້າທ່ານກົດ "-" ເມື່ອຈຳນວນເປັນ 1, ສິນຄ້າຄວນຖືກລຶບອອກຈະກະຕ່າ. ກວດສອບໃຫ້ແນ່ໃຈວ່າມັນບໍ່ເຄີຍສະແດງ 0.

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

<Solution>

ທ່ານສາມາດໃຊ້ `map` ເພື່ອສ້າງ array ໃໝ່ກ່ອນ, ຈາກນັ້ນໃຊ້ `filter` ເພື່ອລຶບສິນຄ້າໂດຍຕັ້ງຄ່າ `count` ເປັນ `0`:

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  function handleDecreaseClick(productId) {
    let nextProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count - 1
        };
      } else {
        return product;
      }
    });
    nextProducts = nextProducts.filter(p =>
      p.count > 0
    );
    setProducts(nextProducts)
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button onClick={() => {
            handleDecreaseClick(product.id);
          }}>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

</Solution>

#### ແກ້ໄຂການ mutate ໂດຍໃຊ້ method ທີ່ບໍ່ມີການ mutate {/*fix-the-mutations-using-non-mutative-methods*/}

ໃນຕົວຢ່າງນີ້, event handler ທັງໝົດໃນ `App.js` ໃຊ້ການ mutate. ດ້ວຍເຫດນີ້, ການແກ້ໄຂ ແລະ ການລຶບ todo ຈຶ່ງບໍ່ເຮັດວຽກ. ຂຽນ `handleAddTodo`, `handleChangeTodo` ແລະ `handleDeleteTodo` ໃໝ່ ເພື່ອໃຊ້ method ທີ່ບໍ່ມີການ mutate:

<Sandpack>

```js App.js
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    todos.push({
      id: nextId++,
      title: title,
      done: false
    });
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.find(t =>
      t.id === nextTodo.id
    );
    todo.title = nextTodo.title;
    todo.done = nextTodo.done;
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

<Solution>

ໃນ `handlerAddTodo`, ທ່ານສາມາດໃຊ້ syntax spread ຂອງ array ໄດ້. ໃນ `handleChangeTodo`, ທ່ານສາມາດສ້າງ array ໃໝ່ດ້ວຍ `map`. ໃນ `handleDeleteTodo`, ທ່ານສາມາດສ້າງ array ໃໝ່ດ້ວຍ `filter`. ຕອນນີ້ list ເຮັດວຽກໄດ້ຢ່າງຖືກຕ້ອງ:

<Sandpack>

```js App.js
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
  }

  function handleChangeTodo(nextTodo) {
    setTodos(todos.map(t => {
      if (t.id === nextTodo.id) {
        return nextTodo;
      } else {
        return t;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    setTodos(
      todos.filter(t => t.id !== todoId)
    );
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

</Solution>


#### ແກ້ໄຂການ mutate ດ້ວຍການໃຊ້ Immer {/*fix-the-mutations-using-immer*/}

ນີ້ເປັນຕົວຢ່າງດຽວກັນກັບໂຈດກ່ອນໜ້າ. ຕອນນີ້, ແກ້ໄຂການ mutate ດ້ວຍການໃຊ້ Immer. ເພື່ອຄວາມສະດວກຂອງທ່ານ, `useImmer` ແມ່ນຖືກ import ແລ້ວ, ສະນັ້ນທ່ານຕ້ອງປ່ຽນຕົວແປ state `todos` ເພື່ອໃຊ້ງານ.

<Sandpack>

```js App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    todos.push({
      id: nextId++,
      title: title,
      done: false
    });
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.find(t =>
      t.id === nextTodo.id
    );
    todo.title = nextTodo.title;
    todo.done = nextTodo.done;
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
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

ດ້ວຍ Immer, ທ່ານສາມາດຂຽນ code ໃນຮູບແບບການ mutate ໄດ້, ຈົນກວ່າການ mutate ສະເພາະບາງສ່ວນຂອງ `draft` ທີ່ Immer ມອບໃຫ້ທ່ານ. ຕອນນີ້, ການ mutate ທັງໝົດຈະດຳເນີນການໃນ `draft` ເພື່ອໃຫ້ code ເຮັດວຽກ:

<Sandpack>

```js App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  function handleAddTodo(title) {
    updateTodos(draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    updateTodos(draft => {
      const todo = draft.find(t =>
        t.id === nextTodo.id
      );
      todo.title = nextTodo.title;
      todo.done = nextTodo.done;
    });
  }

  function handleDeleteTodo(todoId) {
    updateTodos(draft => {
      const index = draft.findIndex(t =>
        t.id === todoId
      );
      draft.splice(index, 1);
    });
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
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

ທ່ານສາມາດປະສົມ ແລະ ຈັບຄູ່ແນວທາງການ mutate ທີ່ໄດ້ ແລະ ການ mutate ບໍ່ໄດ້ດ້ວຍ Immer.

ຕົວຢ່າງ, ໃນເວີຊັ່ນນີ້ `handleAddTodo` ຖືກນຳມາໃຊ້ໂດຍການ mutate ຂອງ Immer `draft`. ໃນຂະນະທີ່ `handleChangeTodo` ແລະ `handleDeleteTodo` ໃຊ້ method `map` ແລະ `filter` ແບບບໍ່ mutate:

<Sandpack>

```js App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  function handleAddTodo(title) {
    updateTodos(draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    updateTodos(todos.map(todo => {
      if (todo.id === nextTodo.id) {
        return nextTodo;
      } else {
        return todo;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    updateTodos(
      todos.filter(t => t.id !== todoId)
    );
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
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

ດ້ວຍ Immer, ທ່ານສາມາດເລືອກ style ທີ່ໃຫ້ຄວາມຮູ້ສຶກເປັນທຳມະຊາດທີ່ສຸດສຳລັບແຕ່ລະກໍລະນີ.

</Solution>

</Challenges>
