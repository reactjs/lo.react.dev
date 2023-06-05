---
title: "State: Memory ຂອງ Component"
---

<Intro>

Component ມັກຈະຕ້ອງປ່ຽນສິ່ງທີ່ຢູ່ເທິງໜ້າຈໍອັນເປັນຜົນມາຈາກການ interact. ການພິມລົງໃນ form ຄວນອັບເດດປ່ອງ input, ການຄິກ "next" ເທິງຮູບພາບຄວນປ່ຽນຮູບພາບທີ່ຈະສະແດງ, ການຄິກ "buy" ຄວນໃສ່ສິນຄ້າລົງໃນກະຕ່າສິນຄ້າ. Component ຈຳເປັນຕ້ອງ "ຈື່" ສິ່ງຕ່າງໆ: ຄ່າ input ປັດຈຸບັນ, ຮູບພາບປັດຈຸບັນ, ກະຕ່າສິນຄ້າປັດຈຸບັນ. ໃນ React, memory ສະເພາະຂອງຂອງ component ປະເພດນີ້ເອີ້ນວ່າ *state*.

</Intro>

<YouWillLearn>

* ວິທີເພີ່ມຕົວແປ state ດ້ວຍ Hook[`useState`](/reference/react/useState)
* ຄ່າໃດທີ່ Hook `useState` return 
* ວິທີເພີ່ມຕົວແປ state ຫຼາຍກວ່າໜຶ່ງໂຕ
* ເປັນຫຍັງ state ຈຶ່ງເອີ້ນວ່າ local 

</YouWillLearn>

## ເມື່ອຕົວແປທົ່ວໄປບໍ່ພຽງພໍ {/*when-a-regular-variable-isnt-enough*/}

ນີ້ແມ່ນ component ທີ່ render ຮູບປັ້ນ. ການຄິກປຸ່ມ "Next" ຄວນສະແດງຮູບປັ້ນຕໍ່ໄປໂດຍປ່ຽນ `index` ເປັນ `1`, ຈາກນັ້ນ `2` ແລະ ອື່ນໆ. ເຖິງຢ່າງໃດກໍຕາມ, ມັນ **ໃຊ້ບໍ່ໄດ້** (ທ່ານສາມາດລອງໄດ້!):

<Sandpack>

```js
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

Event handler `handleClick` ກຳລັງອັບເດດຕົວແປ local, `index`. ແຕ່ມີສອງຢ່າງທີ່ຂັດຂວາງບໍ່ໃຫ້ເຫັນການປ່ຽນແປງນັ້ນ:

1. **ຕົວແປ local ບໍ່ຄົງຢູ່ລະຫວ່າງການ render.** ເມື່ອ React render component ນີ້ເປັນຄັ້ງທີ່ສອງ, ມັນ render ຕັ້ງແຕ່ເລີ່ມຕົ້ນ-ຈະບໍ່ສົນການປ່ຽນແປງໃດໆກັບຕົວແປ local.
2. **ການປ່ຽນແປງຕົວແປ local ຈະບໍ່ trigger ການ render.** React ບໍ່ຮູ້ວ່າຈຳເປັນຕ້ອງ render component ອີກຄັ້ງດ້ວຍຂໍ້ມູນໃໝ່.

ໃນການອັບເດດ component ດ້ວຍຂໍ້ມູນໃໝ່, ຈຳເປັນຕ້ອງມີສອງສິ່ງ:

1. **ການເກັບຮັກສາ** ຂໍ້ມູນລະຫວ່າງການ render.
2. **ການ trigger** React ເພື່ອ render component ດ້ວຍຂໍ້ມູນໃໝ່ (ການ render ໃໝ່). 

Hook [`useState`](/reference/react/useState) ໃຫ້ສອງສິ່ງນີ້:

1. **ຕົວແປ state** ເພື່ອເກັບຂໍ້ມູນລະຫວ່າງການ render.
2. **ຟັງຊັ່ນ state setter** ເພື່ອອັບເດດຕົວແປ ແລະ trigger React ເພື່ອ Render Component ອີກຄັ້ງ.

## ການເພີ່ມຕົວແປ state {/*adding-a-state-variable*/}

ເພື່ອເພີ່ມຕົວແປ state, ທຳການ import `useState` from React ເທິງສຸດຂອງຟາຍ:

```js
import { useState } from 'react';
```

ຈາກນັ້ນ, ແທນຄ່າແຖວນີ້:

```js
let index = 0;
```

ດ້ວຍ

```js
const [index, setIndex] = useState(0);
```

`index` ແມ່ນຕົວແປ state ແລະ `setIndex` ແມ່ນຟັງຊັ່ນ setter.

> Syntax `[` ແລະ `]` ນີ້ເອີ້ນວ່າ [array destructuring](https://javascript.info/destructuring-assignment) ແລະ ມັນຊ່ວຍໃຫ້ທ່ານອ່ານຄ່າຈາກ array ໄດ້,​ array ຖືກ return ໂດຍ `useState` ຈະມີສອງລາຍການສະເໝີ.

ນີ້ແມ່ນວິທີທີ່ມັນເຮັດວຽກຮ່ວມກັນໃນ `handleClick`:

```js
function handleClick() {
  setIndex(index + 1);
}
```

ຕອນນີ້ຄິກປຸ່ມ "Next" ເພື່ອສະຫຼັບຮູບປັ້ນປັດຈຸບັນ:

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
 margin-top: 5px;
 font-weight: normal;
 font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

### ພົບກັບ Hook ທຳອິດຂອງທ່ານ {/*meet-your-first-hook*/}

ໃນ React, `useState`, ລວມໄປເຖິງຟັງຊັ່ນອື່ນໆທີ່ຂຶ້ນຕົ້ນດ້ວຍ "`use`", ເອີ້ນວ່າ Hook.

*Hooks* ແມ່ນຟັງຊັ່ນພິເສດທີ່ໃຊ້ໄດ້ສະເພາະໃນຂະນະທີ່ React ເປັນ [ການ render](/learn/render-and-commit#step-1-trigger-a-render) (ເຊິ່ງເຮົາຈະລົງລາຍລະອຽດໃນໜ້າຕໍ່ໄປ). ມັນຊ່ວຍໃຫ້ທ່ານ "ເຊື່ອມຕໍ່" feature React ຕ່າງໆ.

State ເປັນພຽງໜຶ່ງໃນ feature ເຫຼົ່ານັ້ນ, ແຕ່ທ່ານຈະພົບກັບ Hook ອື່ນໆໃນພາຍຫຼັງ.

<Pitfall>

**Hooks—ຟັງຊັ່ນທີ່ຂຶ້ນຕົ້ນດ້ວຍ `use`—ສາມາດເອີ້ນໃຊ້ໄດ້ທີ່ລະດັບເທິງສຸດຂອງ component ຫຼື [Hook ຂອງທ່ານ.](/learn/reusing-logic-with-custom-hooks)** ທ່ານບໍ່ສາມາດເອີ້ນໃຊ້ Hook ພາຍໃນເງື່ອນໄຂ, loop ຫຼື ຟັງຊັ່ນທີ່ຊ້ອນກັນອື່ນໆ. Hook ເປັນຟັງຊັ່ນ, ແຕ່ຄວນຄິດວ່າເປັນການປະກາດທີ່ບໍ່ມີເງື່ອນໄຂກ່ຽວກັບຄວາມຕ້ອງການຂອງ component ຂອງທ່ານ. ທ່ານ "ໃຊ້" feature React ທີ່ດ້ານເທິງສຸດຂອງ component ຄ້າຍຄືກັບວິທີທີ່ທ່ານ "import" module ດ້ານເທິງສຸດຂອງຟາຍ.

</Pitfall>

### ໂຄ່ງສ້າງຂອງ `useState` {/*anatomy-of-usestate*/}

ເມື່ອທ່ານເອີ້ນ [`useState`](/reference/react/useState), ທ່ານກຳລັງບອກ React ວ່າທ່ານຕ້ອງການໃຫ້ component ນີ້ຈົດຈຳບາງສິ່ງ:

```js
const [index, setIndex] = useState(0);
```

ໃນກໍລະນີນີ້, ທ່ານຕ້ອງການໃຫ້ React ຈື່ `index`.

<Note>

Convention ແມ່ນການຕັ້ງຊື່ຄູ່ນີ້ວ່າ `const [something, setSomething]`. ທ່ານສາມາດຕັ້ງຊື່ຫຍັງກໍໄດ້ທີ່ທ່ານຕ້ອງການ, ແຕ່ convention ຈະເຮັດໃຫ້ທ່ານເຂົ້າໃຈໄດ້ງ່າຍຂຶ້ນໃນ project ຕ່າງໆ.

</Note>

Argument ດຽວສຳລັບ `useState` ແມ່ນ **ຄ່າເລີ່ມຕົ້ນ** ຂອງຕົວແປ state ຂອງທ່ານ. ໃນຕົວຢ່າງນີ້, ຄ່າເລີ່ມຕົ້ນຂອງ `index` ຖືກກຳນົດເປັນ `0` ດ້ວຍ `useState(0)`.

ທຸກຄັ້ງທີ່ component ຂອງທ່ານ render, `useState` ຈະໃຫ້ array ທີມີສອງຄ່າ:

1. **ຕົວແປ state** (`index`) ພ້ອມກັບຄ່າທີ່ທ່ານເກັບໄວ້.
2. **ຟັງຊັ່ນ state setter** (`setIndex`) ເຊິ່ງສາມາດອັບເດດຕົວແປ state ແລະ trigger React ເພື່ອ render component ອີກຄັ້ງ.

ນີ້ແມ່ນສິ່ງທີ່ເກີດຂຶ້ນ:

```js
const [index, setIndex] = useState(0);
```

1. **Component ຂອງທ່ານ render ໃນຄັ້ງທຳອິດ.** ເນື່ອງຈາກທ່ານສົ່ງ `0` ໄປຫາ `useState` ເປັນຄ່າເລີ່ມຕົ້ນຂອງ `index`, component ຈະ return `[0, setIndex]`. React ຈື່ `0` ເປັນຄ່າ state ຫຼ້າສຸດ.
2. **ທ່ານອັບເດດ state.** ເມື່ອຜູ້ໃຊ້ຄິກປຸ່ມ, ຈະເອີ້ນ `setIndex(index + 1)`. `index` ແມ່ນ `0`, ດັ່ງນັ້ນຈຶ່ງເປັນ `setIndex(1)`. ສິ່ງນີ້ບອກໃຫ້ React ຈື່ `index` ແມ່ນ `1` ໃນຕອນນີ້ ແລະ trigger ການ render ອື່ນ.
3. **ການ render ຄັ້ງທີ່ສອງຂອງ component ທ່ານ.** React ຍັງເຫັນ `useState(0)`, ແຕ່ເນື່ອງຈາກ React *ຈື່* ທີ່ທ່ານຕັ້ງຄ່າ `index` ເປັນ `1`, ຈຶ່ງ return `[1, setIndex]` ແທນ.
4. ແລະ ອື່ນໆ!

## ການໃຫ້ຕົວແປ state ໃນຫຼາຍ component {/*giving-a-component-multiple-state-variables*/}

ທ່ານສາມາດມີຕົວແປ state ຫຼາຍປະເພດໄດ້ເທົ່າທີ່ທ່ານຕ້ອງການໃນ component ດຽວ. Component ນີ້ມີຕົວແປ state ສອງໂຕ, ຕົວເລກ `index` ແລະ ຄ່າທີ່ເປັນຈິງ `showMore` ທີ່ຈະສະຫຼັບກັນເມື່ອທ່ານຄິກ "Show details":

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
 margin-top: 5px;
 font-weight: normal;
 font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

ມັນເປັນຄວາມຄິດທີ່ດີທີ່ຈະມີຕົວແປ state ຫຼາຍໂຕຖ້າ state ຂອງຕົວແປເຫຼົ່ານັ້ນບໍ່ກ່ຽວຂ້ອງກັນເຊັ່ນ, `index` ແລະ `showMore` ໃນຕົວຢ່າງນີ້. ແຕ່ຖ້າທ່ານພົບວ່າທ່ານມັກຈະປ່ຽນຕົວແປ state ສອງໂຕພ້ອມກັນ, ມັນອາດຈະງ່ານກວ່າທີ່ຈະລວມພວກມັນເປັນຕົວແປດຽວ. ຕົວຢ່າງ, ຖ້າທ່ານມີ form ທີ່ມີຫຼາຍ field, ການມີຕົວແປ state ດຽວທີ່ທ່ານເກັບ object ຈະສະດວກກວ່າຕົວແປ state ຕໍ່ field. ອ່ານ [ການເລືອກໂຄ່ງສ້າງຂອງ State](/learn/choosing-the-state-structure) ສຳລັບເຄັດລັບເພີ່ມເຕີມ.

<DeepDive>

#### React ຮູ້ໄດ້ແນວໃດວ່າຈະ return state ໃດ? {/*how-does-react-know-which-state-to-return*/}

ທ່ານອາດຈະສັງເກດເຫັນວ່າການເອີ້ນໃຊ້ `useState` ບໍ່ໄດ້ຮັບຂໍ້ມູນໃດໆກ່ຽວກັບຕົວແປ state *ເຊິ່ງ* ທີ່ອ້າງເຖິງບໍ່ມີ. "ຕົວລະບຸ" ທີ່ສົ່ງຜ່ານໄປຍັງ `useState`, ດັ່ງນັ້ນຈະຮູ້ໄດ້ແນວໃດວ່າຕົວແປ state ໃດຈະ return? ມັນອາໄສເຄັກລັບຫຍັງພິເສດເຊັ່ນການ parsing ຟັງຊັ່ນຂອງທ່ານ ຫຼຶ ບໍ່? ຄຳຕອບແມ່ນບໍ່.

ເພື່ອເປິດໃຊ້ງານ syntax ທີ່ກະຊັບ Hook **ໃຊ້ຄຳສັ່ງການເອີ້ນໃຊ້ທີ່ສະຖຽນໃນທຸກການ render ຂອງ component ດຽວກັນ.** ວິທີນີ້ໃຊ້ໄດ້ດີໃນທາງປະຕິບັດເພາະຖ້າທ່ານປະຕິບັດຕາມກົດດ້ານເທິງ ("ເອີ້ນ Hook ລະດັບເທິງສຸດເທົ່ານັ້ນ"), Hook ຈະຖືກເອີ້ນຕາມລຳດັບດຽວກັນສະເໝີ. ນອກຈາກນີ້ [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) ຈະຈັບຂໍ້ຜິດພາດເປັນສ່ວນໃຫຍ່.

ພາຍໃນ, React ມີ array ຄູ່ state ສຳລັບທຸກ component. ນອກຈາກນີ້ຍັງຮັກສາ index ຄູ່ປັດຈຸບັນເຊິ່ງຕັ້ງຄ່າເປັນ `0` ກ່ອນການ render. ທຸກຄັ້ງທີ່ທ່ານເອີ້ນໃຊ້ `useState`, React ຈະໃຫ້ຄູ່ state ຕໍ່ໄປ ແລະ ເພີ່ມ index. ທ່ານສາມາດອ່ານເພີ່ມເຕີມກ່ຽວກັບກົນໄກນີ້ໄດ້ໃນ [React Hooks: ບໍ່ວິເສດຫຍັງ, ເປັນພຽງ array.](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

ຕົວຢ່າງນີ້ **ບໍ່ໄດ້ໃຊ້ React** ແຕ່ຈະຊ່ວຍໃຫ້ທ່ານເຂົ້າໃຈວ່າ `useState` ເຮັດວຽກແນວໃດພາຍໃນ:

<Sandpack>

```js index.js active
let componentHooks = [];
let currentHookIndex = 0;

// How useState works inside React (simplified).
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // This is not the first render,
    // so the state pair already exists.
    // Return it and prepare for next Hook call.
    currentHookIndex++;
    return pair;
  }

  // This is the first time we're rendering,
  // so create a state pair and store it.
  pair = [initialState, setState];

  function setState(nextState) {
    // When the user requests a state change,
    // put the new value into the pair.
    pair[0] = nextState;
    updateDOM();
  }

  // Store the pair for future renders
  // and prepare for the next Hook call.
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

function Gallery() {
  // Each useState() call will get the next pair.
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  // This example doesn't use React, so
  // return an output object instead of JSX.
  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: `${sculpture.name} by ${sculpture.artist}`,
    counter: `${index + 1} of ${sculptureList.length}`,
    more: `${showMore ? 'Hide' : 'Show'} details`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt
  };
}

function updateDOM() {
  // Reset the current Hook index
  // before rendering the component.
  currentHookIndex = 0;
  let output = Gallery();

  // Update the DOM to match the output.
  // This is the part React does for you.
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = '';
  } else {
    description.style.display = 'none';
  }
}

let nextButton = document.getElementById('nextButton');
let header = document.getElementById('header');
let moreButton = document.getElementById('moreButton');
let description = document.getElementById('description');
let image = document.getElementById('image');
let sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];

// Make UI match the initial state.
updateDOM();
```

```html public/index.html
<button id="nextButton">
  Next
</button>
<h3 id="header"></h3>
<button id="moreButton"></button>
<p id="description"></p>
<img id="image">

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
button { display: block; margin-bottom: 10px; }
</style>
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

ທ່ານບໍ່ຈຳເປັນຕ້ອງເຂົ້າໃຈມັນເພື່ອໃຊ້ React, ແຕ່ທ່ານອາດຈະພົບວ່າສິ່ງນີ້ເປັນແບບຈຳລອງທາງຄວາມຄິດທີ່ເປັນປະໂຫຍດ.

</DeepDive>

## State ໂດດດ່ຽວ ແລະ ເປັນ private {/*state-is-isolated-and-private*/}

State ເປັນແບບ local ຂອງ component instance ເທິງໜ້າຈໍ. ເວົ້າອີກແບບໜຶ່ງ, **ຖ້າທ່ານ render component ດຽວກັນສອງເທື່ອ, ແຕ່ລະ copy ຈະມີ state ແຍກຈາກກັນໂດຍສິ້ນເຊິງ!** ການປ່ຽນໜຶ່ງໃນນັ້ນຈະບໍ່ສົ່ງຜົນກະທົບຕໍ່ກັບອີກ component ໜຶ່ງ.

ໃນຕົວຢ່າງນີ້, component `Gallery` ຈາກກ່ອນໜ້ານີ້ render ສອງເທື່ອໂດຍບໍ່ມີການປ່ຽນແປງ logic. ລອງຄິກປຸ່ມໃນແຕ່ລະ gallery. ສັງເກດວ່າ state ຂອງມັນເປັນອິດສະຫຼະ:

<Sandpack>

```js
import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}

```

```js Gallery.js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <section>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </section>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
button { display: block; margin-bottom: 10px; }
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

ນີ້ແມ່ນສິ່ງທີ່ເຮັດໃຫ້ state ແຕກຕ່າງຈາກຕົວແປທົ່ວໄປທີ່ທ່ານອາດປະກາດໄວ້ດ້ານເທິງສຸດຂອງ module. State ບໍ່ໄດ້ເຊື່ອມໂຍງກັບການເອີ້ນໃຊ້ຟັງຊັ່ນສະເພາະ ຫຼື ຕຳແໜ່ງໃນ ocde ແຕ່ເປັນ state "local" ກັບຕຳແໜ່ງສະເພາະເທິງໜ້າຈໍ. ທ່ານ render component `<Gallery/>` ສອງລາຍການດັ່ງນັ້ນ state ຈື່ງຖືກຈັກເກັບແຍກກັນ.

ນອກຈາກນີ້ ໃຫ້ສັງເກດວ່າ component `Page` ບໍ່ "ຮູ້" ຫຍັງກ່ຽວກັບ state `Gallery` ຫຼື ວ່າມັນມີ ຫຼື ບໍ່ມີ. ເຊິ່ງແຕກຕ່າງຈາກ prop, **state ເປັນ private ໂດຍສົມບູນ ສຳລັບ component ທີ່ປະກາດ.** Parent Component ບໍ່ສາມາດປ່ຽນແປງໄດ້. ນີ້ຊ່ວຍໃຫ້ທ່ານເພີ່ມ state ໃຫ້ກັບແຕ່ລະ component ຫຼື ລຶບອອກໄດ້ໂດຍບໍ່ກະທົບກັບ component ທີ່ເຫຼືອ.

ຈະເຮັດແນວໃດຖ້າທ່ານຕ້ອງການໃຫ້ທັງສອງ gallery ຮັກສາ state ໃຫ້ກົງກັນ? ວິທີທີ່ຖືກຕ້ອງໃນ React ແມ່ນ *ລຶບ* state ອອກຈາກ child component ແລະ ເພີ່ມມັນໄປຍັງ parent component ທີ່ໃກ້ຄຽງທີ່ສຸດ. ໃນໜ້າຖັດໄປທີ່ໃກ້ຈະມາຮອດຈະເນັ້ນໄປທີ່ການຈັດການ state ຂອງ component ດຽວ, ແຕ່ເຮົາກັບໄປທີ່ຫົວຂໍ້ນີ້ໃນ [ການແບ່ງປັນ State ລະຫວ່າງ Component.](/learn/sharing-state-between-components)

<Recap>

* ໃຊ້ຕົວແປ state ເມື່ອ component ຈຳເປັນຕ້ອງ "ຈື່" ຂໍ້ມູນາງຢ່າງລະຫວ່າງການ render.
* ຕົວແປ state ຖືກປະກາດໂດຍການເອີ້ນໃຊ້ Hook `useState`.
* Hook ເປັນຟັງຊັ່ນພິເສດທີ່ຂຶ້ນຕົ້ນດ້ວຍ `use`. ມັນເຮັດໃຫ້ທ່ານ "ເຊື່ອມຕໍ່" feature React ເຊັ່ນ state.
* Hook ອາດເຕືອນທ່ານກ່ຽວກັບການ import: ພວກມັນຈຳເປັນຕ້ອງເອີ້ນໃຊ້ໂດຍບໍ່ມີເງື່ອນໄຂ. ການເອີ້ນ Hook, ປະກອບມີ `useState` ໃຊ້ໄດ້ສະເພາະລະດັບເທິງສຸດຂອງ component  ຫຼື Hook ອື່ນເທົ່ານັ້ນ.
* Hook `useState` ຈະ return ຄ່າຄູ່ໜຶ່ງ: state ປັດຈຸບັນ ແລະ ຟັງຊັ່ນທີ່ຈະອັບເດດ.
* ທ່ານສາມາດມີຕົວແປ state ໄດ້ຫຼາຍກວ່າໜຶ່ງໂຕ. ພາຍໃນ, React ຈະຈັບຄູ່ພວກມັນຕາມລຳດັບ.
* State ເປັນ private ຂອງ component. ຖ້າທ່ານ render ໃນສອງບ່ອນ, ແຕ່ລະ copy ຈະໄດ້ຮັບ state ຂອງໂຕເອງ.

</Recap>



<Challenges>

#### ເຮັດ gallery ໃຫ້ແລ້ວ {/*complete-the-gallery*/}

ເມື່ອທ່ານກົດ "Next" ເທິງຮູບປັ້ນສຸດທ້າຍ, code ຈະພັງ. ແກ້ໄຂ logic ເພື່ອປ້ອງກັນບໍ່ໃຫ້ມີບັນຫາ. ທ່ານສາມາດເຮັດໄດ້ໂດຍການເພີ່ມ logic ພິເສດໃຫ້ກັບ event handler ຫຼື ປິດການໃຊ້ງານປຸ່ມເມື່ອບໍ່ສາມາດດຳເນີນການໄດ້.

ຫຼັງຈາກແກ້ໄຂບັນຫາແລ້ວ, ເພີ່ມປຸ່ມ "Previous" ທີ່ສະແດງຮູບປັ້ນກ່ອນໜ້າ. ມັນບໍ່ຄວນມີຂໍ້ຜິດພາດກັບຮູບປັ້ນອັນທຳອິດ. 

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
button { display: block; margin-bottom: 10px; }
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
```

</Sandpack>

<Solution>

ສິ່ງນີ້ຈະເພີ່ມເງື່ອນໄຂການປ້ອງກັນໃນ event handler ທັງສອງ ແລະ ປິດການໃຊ້ງານປຸ່ມເມື່ອຈຳເປັນ:

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button
        onClick={handlePrevClick}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        onClick={handleNextClick}
        disabled={!hasNext}
      >
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js data.js hidden
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
button { display: block; margin-bottom: 10px; }
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
```

</Sandpack>

ສັງເກດວ່າມີການໃຊ້ `hasPrev` ແລະ `hasNext` *ທັ້ງ* ສຳລັບ JSX ທີ່ return ແລະ ພາຍໃນ event handler ແນວໃດ! ຮູບແບບທີ່ມີປະໂຫຍດນີ້ໃຊ້ງານໄດ້ເນື່ອງຈາກຟັງຊັ່ນ event handler ເຮັດວຽກ ["ໃກ້ຊິດກັບ"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) ຕົວແປໃດໆທີ່ປະກາດຂະນະມີການ render.

</Solution>

#### ແກ້ໄຂ input ຂອງ form ຄ້າງ {/*fix-stuck-form-inputs*/}

ເມື່ອທ່ານພິມລົງໃນປ່ອງ input, ຈະບໍ່ມີຫຍັງປະກົດຂຶ້ນ. ມັນຄ້າຍກັບວ່າຄ່າຂອງ input "ຄ້າງ" ດ້ວຍ string ວ່າງ. `value` ຂອງ `<input>` ທຳອິດຖືກຕັ້ງຄ່າໃຫ້ກົງກັບຕົວແປ `firstName` ສະເໝີ, ແລະ `value` ສຳລັບ `<input>` ໂຕທີ່ສອງຖືກຕັ້ງຄ່າໃຫ້ກົງກັບຕົວແປ `lastName` ສະເໝີ. ນີ້ແມ່ນຖືກຕ້ອງ, input ທັງສອງມີ event handler `onChange` ເຊິ່ງພະຍາຍາມອັບເດດຕົວແປຕາມ input ຫຼ້າສຸດຂອງຜູ້ໃຊ້ (`e.target.value`). ເຖິງຢ່າງໃດກໍຕາມ, ຕົວແປເບິ່ງຄືວ່າຈະບໍ່ "ຈື່" ຄ່າລະຫວ່າງການ render ໃໝ່. ແກ້ໄຂໂດຍການໃຊ້ຕົວແປ state ແທນ.

<Sandpack>

```js
export default function Form() {
  let firstName = '';
  let lastName = '';

  function handleFirstNameChange(e) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = '';
    lastName = '';
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```

```css 
h1 { margin-top: 10px; }
```

</Sandpack>

<Solution>

ທຳອິດ, import `useState` from React. ຈາກນັ້ນແທນທີ `firstName` ແລະ `lastName` ດ້ວຍຕົວແປ state ທີ່ປະກາດໂດຍການເອີ້ນໃຊ້ `useState`. ສຸດທ້າຍ, ແທນທີທຸກໆການຕັ້ງຄ່າ `firstName = ...` ດ້ວຍ `setFirstName(...)`, ແລະ ເຮັດຄືກັນກັບ `lastName`. ຢ່າລືມອັບເດດ `handleReset` ນຳ ເພື່ອໃຫ້ປຸ່ມ reset ເຮັດວຽກໄດ້.  

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleReset() {
    setFirstName('');
    setLastName('');
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```

```css 
h1 { margin-top: 10px; }
```

</Sandpack>

</Solution>

#### ແກ້ໄຂຂໍ້ຂັດຂ້ອງ {/*fix-a-crash*/}

ນີ້ແມ່ນ form ນ້ອຍທີ່ຄວນໃຫ້ຜູ້ໃຊ້ສະແດງຄວາມຄິດເຫັນ. ເມື່ອມີການສົ່ງຄວາມຄິດເຫັນ, ມັນຄວນຈະສະແດງຂໍ້ຄວາມຂອບໃຈ. ເຖິງຢ່າງໃດກໍຕາມ, ມັນພັງໂດຍມີຂໍ້ຄວາມສະແດງຂໍ້ຜິດພາດວ່າ "Rendered fewer hooks than expected". ທ່ານເຫັນຂໍ້ຜິດພາດ ແລະ ແກ້ໄຂໄດ້ ຫຼື ບໍ່?

<Hint>

ມີຂໍ້ຈຳກັດຫຍັງແນ່ກ່ຽວກັບ _ບ່ອນທີ່_ Hook ອາດຈະຖືກເອີ້ນໃຊ້ ຫຼື ບໍ່? Component ນີ້ຜິດກົດ ຫຼື ບໍ່? ກວດວ່າມີຄວາມຄິດເຫັນໃດທີ່ປິດການໃຊ້ງານການກວດສອບ linter ຫຼື ບໍ່--ເຊິ່ງເປັນຈຸດທີ່ bug ມັກຖືກເຊື່ອງ!

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    // eslint-disable-next-line
    const [message, setMessage] = useState('');
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
      }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
```

</Sandpack>

<Solution>

ສາມາດເອີ້ນໃຊ້ Hook ໄດ້ທີ່ລະດັບສູງສຸດຂອງຟັງຊັ່ນ component ເທົ່ານັ້ນ. ຕອນນີ້, ຕົວແປ `isSent` ທຳອິດເປັນໄປຕາມກົດນີ້, ແຕ່ຕົວແປ `message` ເຊື່ອງຢູ່ໃນເງື່ອນໄຂ.

ຍ້າຍອອກຈາກເງື່ອນໄຂເພື່ອແກ້ໄຂບັນຫາ:

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
      }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
```

</Sandpack>

ຈື່ໄວ້ວ່າ, Hook ຕ້ອງຖືກເອີ້ນໂດຍບໍ່ມີເງື່ອນໄຂ ແລະ ຢູ່ໃນລຳດັບດຽວກັນສະເໝີ!

ທ່ານສາມາດລຶບເງື່ອນໄຂ `else` ທີ່ບໍ່ຈຳເປັນເພື່ອຫຼຸດການຊ້ອນກັນໄດ້. ເຖິງຢ່າງໃດກໍຕາມ, ການເອີ້ນໃຊ້ Hook ທັງໝົດຈະເກີດຂຶ້ນ *ກ່ອນ* ການ `return` ທຳອິດກໍຍັງເປັນສິ່ງສຳຄັນ.

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  if (isSent) {
    return <h1>Thank you!</h1>;
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert(`Sending: "${message}"`);
      setIsSent(true);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <br />
      <button type="submit">Send</button>
    </form>
  );
}
```

</Sandpack>

ລອງຍ້າຍການເອີ້ນໃຊ້ `useState` ຄັ້ງທີ່ສອງຫຼັງຈາກເງື່ອນໄຊ `if` ແລະ ສັງເກດວ່າສີ່ງນີ້ຈະຢຸດການເຮັດວຽກອີກຄັ້ງແນວໃດ.

ຫາກ linter ຂອງທ່ານ [ມີກຳນົດຄ່າສຳລັບ React ແລ້ວ](/learn/editor-setup#linting), ທ່ານຄວນເຫັນຂໍ້ຜິດພາດ lint ເມື່ອທ່ານເຮັດຜິດພາດແບບນີ້. ຖ້າທ່ານບໍ່ພົບຂໍ້ຜິດພາດເມື່ອທ່ານລອງຂຽນ code ທີ່ຜິດພາດໃນເຄື່ອງ, ທ່ານຕ້ອງຕັ້ງຄ່າ linting ສຳລັບ project ຂອງທ່ານ.

</Solution>

#### ລຶບ state ທີ່ບໍ່ຈຳເປັນອອກ {/*remove-unnecessary-state*/}

ເມື່ອຄິກປຸ່ມ, ຕົວຢ່າງນີ້ຄວນຖາມຊື່ຜູ້ໃຊ້ ຈາກນັ້ນຈຶ່ງສະແດງການທັກທາຍແຈ້ງເຕືອນ. ທ່ານພະຍາຍາມໃຊ້ state ເພື່ອຄົງຊື່ໄວ້, ແຕ່ດ້ວຍເຫດຜົນບາງຢ່າງ ມັນຈະສະແດງ "Hello, !" ສະເໝີ.

ເພື່ອແກ້ໄຂບັນຫານີ້, ລຶບຕົວແປ state ທີ່ບໍ່ຈຳເປັນອອກ. (ພວກເຮົາຈະເວົ້າເຖິງ [ເປັນຫຍັງສິ່ງນີ້ບໍ່ເຮັດວຽກ](/learn/state-as-a-snapshot) ໃນພາຍຫຼັງ.)

ທ່ານສາມາດອະທິບາຍໄດ້ບໍ່ວ່າເປັນຫຍັງຕົວແປ state ຈຶ່ງບໍ່ຈຳເປັນ?

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [name, setName] = useState('');

  function handleClick() {
    setName(prompt('What is your name?'));
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}
```

</Sandpack>

<Solution>

ຕໍ່ໄປນີ້ແມ່ນເວີຊັ່ນ fixed ທີ່ໃຊ້ຕົວແປ `name` ປົກະຕິທີ່ປະກາດໃນຟັງຊັ່ນທີ່ຕ້ອງການ:

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  function handleClick() {
    const name = prompt('What is your name?');
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}
```

</Sandpack>

ຕົວແປ state ມີຄວາມຈຳເປັນໃນການເກັບຂໍ້ມູນລະຫວ່າງການ render ຊໍ້າຂອງ component. ພາຍໃນໜື່ງ event handler, ຕົວແປປົກະຕິຈະເຮັດວຽກໄດ້ດີ. ຢ່າໃຊ້ຕົວແປ state ເມື່ອຕົວແປປົກະຕິເຮັດວຽກໄດ້ດີ.

</Solution>

</Challenges>
