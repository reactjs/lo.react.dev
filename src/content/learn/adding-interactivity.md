---
title: ການເພີ່ມ Interactivity
---

<Intro>

ບາງສິ່ງເທິງໜ້າຈໍອັບເດດຕາມການປ້ອນຂໍ້ມູນຂອງຜູ້ໃຊ້. ຕົວຢ່າງ, ການຄິກ image gallery ຈະເປັນການສະຫຼັບຮູບພາບທີ່ໃຊ້ງານຢູ່. ໃນ React, ຂໍ້ມູນທີ່ປ່ຽນແປງເມື່ອເວລາຜ່ານໄປເອີ້ນວ່າ *state.* ທ່ານສາມາດເພີ່ມ state ໃຫ້ກັບ component ໃດກໍໄດ້, ແລະ ອັບເດດມັນເມື່ອຕ້ອງການ. ໃນບົດນີ້, ທ່ານຈະໄດ້ຮຽນຮູ້ວິທີຂຽນ component ທີ່ handle interaction, ອັບເດດ state ແລະ ສະແດງ output ຕ່າງໆເມື່ອເວລາຜ່ານໄປ.

</Intro>

<YouWillLearn isChapter={true}>

* [ວິທີ handle user-initiated event](/learn/responding-to-events)
* [ວິທີເຮັດໃຫ້ component "ຈື່" ຂໍ້ມູນດ້ວຍ state](/learn/state-a-components-memory)
* [React ອັບເດດ UI ໃນສອງຂັ້ນຕອນແນວໃດ](/learn/render-and-commit)
* [ຍ້ອນເຫດຜົນຫຍັງ state ຈຶ່ງບໍ່ອັບເດດທັນທີຫຼັງຈາກທ່ານແປງມັນ](/learn/state-as-a-snapshot)
* [ວິທີການຈັດຄິວການອັບເດດຫຼາຍ state](/learn/queueing-a-series-of-state-updates)
* [ວິທິການອັບເດດ object ໃນ state](/learn/updating-objects-in-state)
* [ວິທີການອັບເດດ array ໃນ state](/learn/updating-arrays-in-state)

</YouWillLearn>

## ການຕອບສະໜອງຕໍ່ກັບ event {/*responding-to-events*/}

React ໃຫ້ທ່ານເພີ່ມ *event handler* ໃນ JSX ຂອງທ່ານ. Event handler ເປັນຟັງຊັ່ນຂອງທ່ານທີ່ຈະ trigger ໃຫ້ຕອບສະໜອງຕໍ່ການໂຕ້ຕອບຂອງຜູ້ໃຊ້ເຊັ່ນ: ການຄິກ, ການ hover, ການ focus ເທິງ form input ແລະ ອື່ນໆ.

Component built-in ເຊັ່ນ `<button>` ຮອງຮັບສະເພາະ built-in browser event ເຊັ່ນ `onClick`. ເຖິງຢ່າງໃດກໍຕາມ, ທ່ານຍັງສາມາດສ້າງ component ຂອງໂຕເອງ, ແລະ ໃຫ້ props event handler ຊື່ສະເພາະແອັບພິເຄຊັ່ນທີ່ທ່ານຕ້ອງການ.

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

<LearnMore path="/learn/responding-to-events">

ອ່ານ **[ການຕອບສະໜອງຕໍ່ກັບ  Events](/learn/responding-to-events)** ເພື່ອຮຽນຮູ້ວິທີການເພີ່ມ event handler.

</LearnMore>

## State: memory ຂອງ component {/*state-a-components-memory*/}

Component ມັກຈະຕ້ອງປ່ຽນສິ່ງທີ່ຢູ່ເທິງໜ້າຈໍອັນເປັນຜົນມາຈາກ interaction. ການພິມລົງໃນ form ຄວນອັບເດດປ່ອງຕື່ມຂໍ້ມູນ, ການຄິກ "next" ເທິງ carousel image ຄວນປ່ຽນຮູບພາບທີ່ຈະສະແດງ, ການຄິກ "buy" ໃສ່ສິນຄ້າລົງໃນກະຕ່າສິນຄ້າ. Component ຕ້ອງການ "ຈື່ຈຳ" ສິ່ງຕ່າງໆ: ຄ່າ input ຫຼ້າສຸດ, ຮູບຫຼ້າສຸດ, ກະຕ່າສິນຄ້າ. ໃນ React ໜ່ວຍຄວາມຈຳສະເພາະ component ນີ້ເອີ້ນວ່າ *state.*

ທ່ານສາມາດເພີ່ມ state ໃຫ້ກັບ component ດ້ວຍ [`useState`](/reference/react/useState) Hook. *Hook* ເປັນຟັງຊັ່ນພິເສດທີ່ຊ່ວຍໃຫ້ component ຂອງທ່ານໃຊ້ feature React (state ເປັນໜຶ່ງໃນ feature ເຫຼົ່ານັ້ນ). Hook `useState` ໃຫ້ທ່ານປະກາດຕົວແປ state. ໃຊ້ state ເລີ່ມຕົ້ນ ແລະ return ຄູ່ຂອງຄ່າ: state ຫຼ້າສຸດ ແລະ ຟັງຊັ່ນ state setter ທີ່ໃຫ້ທ່ານອັບເດດມັນ. 

```js
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
```

ນີ້ແມ່ນວິທີທີ່ gallery ຮູບພາບໃຊ້ ແລະ ອັບເດດ state ຕອນຄິກ:

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
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

```js src/data.js
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

<LearnMore path="/learn/state-a-components-memory">

ອ່ານ **[State: Memory ຂອງ Component](/learn/state-a-components-memory)** ເພື່ອຮຽນຮູ້ວິທີຈົດຈຳຄ່າ ແລະ ອັບເດດມັນຕອນ interaction.

</LearnMore>

## Render ແລະ commit {/*render-and-commit*/}

ກ່ອນ Component ຂອງທ່ານຈະສະແດງເທິງໜ້າຈໍ, ມັນຕ້ອງ render ໂດຍ React. ການທຳຄວາມເຂົ້າໃຈຂັ້ນຕອນຕ່າງໆ ໃນຂະບວນການນີ້ຈະຊ່ວຍໃຫ້ທ່ານຄິດເຖິງວິທີທີ່ code execute ແລະ ອະທິບາຍລັກສະນະການເຮັດວຽກຂອງມັນໄດ້.

ຈິນຕະນາການວ່າ component ຂອງທ່ານແມ່ນພໍ່ຄົວໃຫ້ເຮືອນຄົວ, ກຳລັງເຮັດອາຫານຈານແຊບຈາກວັດຖຸດິບ. ໃນສະຖານະການສົມມຸດນີ້, React ແມ່ນພະນັກງານເສີບທີ່ສົ່ງຄຳຮ້ອງຈາກລູກຄ້າ ແລະ ນຳຄຳສັ່ງນັ້ນມາໃຫ້. ຂະບວນການຂໍ ແລະ ໃຫ້ບໍລິການ UI ມີສາມຂັ້ນຕອນ:

1. **ການ Trigger** render (ສົ່ງອາຫານຕາມສັ່ງໄປທີເຮືອນຄົວ)
2. **ການ Render** component (ກຽມອາຫານໃນເຮືອນຄົວ)
3. **ການ Commit** to the DOM (ສົ່ງອາຫານໄປທີ່ໂຕະ)

<IllustrationBlock sequential>
  <Illustration caption="Trigger" alt="React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="Render" alt="The Card Chef gives React a fresh Card component." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Commit" alt="React delivers the Card to the user at their table." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

<LearnMore path="/learn/render-and-commit">

ອ່ານ **[Render ແລະ Commit](/learn/render-and-commit)** ເພື່ອຮຽນຮູ້ກ່ຽວກັບວົງຈອນຂອງການອັບດດ UI.

</LearnMore>

## State ເປັນ snapshot {/*state-as-a-snapshot*/}

ແຕກຕ່າງຈາກຕົວແປ JavaScript ທົ່ວໄປ, state React ຈະເຮັດວຽກຄືກັບ snapshot. ການຕັ້ງຄ່ານີ້ບໍ່ໄດ້ປ່ຽນຕົວແປ state ທີ່ທ່ານມີ, ແຕ່ມັນຈະ trigger ເພື່ອ render ໃໝ່ແທນ. ນີ້ອາດເປັນເລື່ອງປະຫຼາດໃຈໃນທຳອິດ!

```js
console.log(count);  // 0
setCount(count + 1); // Request a re-render with 1
console.log(count);  // Still 0!
```

ລັກສະນະການເຮັດວຽກນີ້ຊ່ວຍໃຫ້ທ່ານຫຼີກຫຼ່ຽງ bug ໜ້ອຍໜຶ່ງ. ນີ້ແມ່ນແອັບແຊັດນ້ອຍ. ລອງເດົາເບິ່ງວ່າຈະເກີດຫຍັງຂຶ້ນຖ້າທ່ານກົດ "Send" ໃນຕອນທຳອິດ ແລະ *ຈາກນັ້ນ* ປ່ຽນຜູ້ຮັບເປັນ Bob. ຊື່ຂອງໃຜຈະປະກົດໃນ `alert` ໃນອີກຫ້າວິນາທີຕໍ່ມາ?

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said ${message} to ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>


<LearnMore path="/learn/state-as-a-snapshot">

ອ່ານ **[State ເປັນ Snapshot](/learn/state-as-a-snapshot)** ເພື່ອຮຽນຮູ້ວ່າຍ້ອນຫຍັງ state ຈຶ່ງສະແດງເປັນ "fixed" ແລະ ບໍ່ມີການປ່ຽນແປງພາຍໃນ event handlers.

</LearnMore>

## ການເຂົ້າຄິວອັບເດດ state {/*queueing-a-series-of-state-updates*/}

Component ນີ້ມີບັນຫາ: ການຄິກ "+3" ຈະເພີ່ມຄະແນນພຽງເທື່ອດຽວ.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(score + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Score: {score}</h1>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
```

</Sandpack>

[State ເປັນ Snapshot](/learn/state-as-a-snapshot) ອະທິບາຍວ່າເປັນຫຍັງສິ່ງນີ້ຈຶ່ງເກີດຂຶ້ນ. State ການຕັ້ງຄ່າ request ການ render ໃໝ່, ແຕ່ຈະບໍ່ປ່ຽນແປງໃນ code ທີ່ກຳລັງເຮັດວຽກ. ສະນັ້ນ `score` ຍັງເປັນ `0` ທັນທີຫຼັງຈາກທີ່ທ່ານເອີ້ນໃຊ້ `setScore(score +1)`.


```js
console.log(score);  // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score);  // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score);  // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score);  // 0
```

ທ່ານສາມາດແກ້ໄຂບັນຫາໄດ້ໂດຍການສົ່ງ *ຟັງຊັ່ນ updater* ເມື່ອຕັ້ງຄ່າ state. ສັງເກດວິທີປ່ຽນແທນ `setScore(score + 1)` ດ້ວຍ `setScore(s => s + 1)` ຈະແກ້ໄຂປຸ່ມ "+3" ໄດ້ແນວໃດ. ສິ່ງນີ້ຈະເຮັດໃຫ້ທ່ານສາມາດຈັດການຄິວການອັບເດດຫຼາຍ state ໄດ້.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(s => s + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Score: {score}</h1>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
```

</Sandpack>

<LearnMore path="/learn/queueing-a-series-of-state-updates">

ອ່ານ **[ການເຂົ້າຄິວອັບເດດ State](/learn/queueing-a-series-of-state-updates)** ເພື່ອຮຽນຮຸ້ວິທີການຈັດຄິວຊຸດອັບເດດ state.

</LearnMore>

## ການອັບເດດ object ໃນ state {/*updating-objects-in-state*/}

State ສາມາດເກັບຄ່າ JavaScript ຊະນິດໃດກໍໄດ້, ລວມເຖິງ object. ແຕ່ທ່ານບໍ່ຄວນປ່ຽນ object ແລະ array ທີ່ທ່ານເກັບໃນ state React ໂດຍກົງ. ເມື່ອທ່ານຕ້ອງການອັບເດດ object ແລະ array, ທ່ານຕ້ອງສ້າງອັນໃໝ່ (ຫຼຶ ສຳເນົາຂອງສິ່ງທີ່ມີຢູ່) ຈາກນັ້ນອັບເດດ state ເພື່ອໃຊ້ສຳເນົານັ້ນ.

ໂດຍປົກະຕິ, ທ່ານຈະໃຊ້ syntax spread `...` ເພື່ອສຳເນົາ object ແລະ array ທີ່ທ່ານຕ້ອງການປ່ຽນ. ຕົວຢ່າງ, ການອັບເດດ object ທີ່ຊ້ອນກັນອາດມີລັກສະນະດັ່ງນີ້:

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

ຫາກການສຳເນົາ object ໃນ code ເປັນເລື່ອງນ່າເບື່ອ, ທ່ານສາມາດໃຊ້ library ເຊັ່ນ [Immer](https://github.com/immerjs/use-immer) ເພື່ອຫຼຸດການໃຊ້ code ຊໍ້າ:

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

<LearnMore path="/learn/updating-objects-in-state">

ອ່ານ **[ການອັບເດດ Object ໃນ State](/learn/updating-objects-in-state)** ເພື່ອຮຽນຮູ້ວິທີອັບເດດ object ຢ່າງຖືກຕ້ອງ.

</LearnMore>

## ການອັບເດດ array ໃນ state {/*updating-arrays-in-state*/}

Array ເປັນ object JavaScript ທີ່ບໍ່ແນ່ນອນອີກປະເພດໜຶ່ງທີ່ທ່ານສາມາດເກັບໄວ້ໃນ state ແລະ ຄວນຖືເປັນ read-only. ແບບດຽວກັບ object, ເມື່ອທ່ານຕ້ອງການອັບເດດ array ທີ່ເກັບໄວ້ໃນ state, ທ່ານຕ້ອງສ້າງ array ໃໝ່ (ຫຼື ສຳເນົາຂອງ array ທີ່ມີຢູ່), ຈາກນັ້ນຕັ້ງ state ເພື່ອໃຊ້ array ໃໝ່:

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
  const [list, setList] = useState(
    initialList
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen };
      } else {
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
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

ຖ້າການສຳເນົາ array ໃນ code ເປັນເລື່ອງນ່າເບື່ອ, ທ່ານສາມາດໃຊ້ library ເຊັ່ນ [Immer](https://github.com/immerjs/use-immer) ເພື່ອຫຼຸດການໃຊ້ code ຊໍ້າ:

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
  const [list, updateList] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft => {
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
        artworks={list}
        onToggle={handleToggle} />
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

<LearnMore path="/learn/updating-arrays-in-state">

ອ່ານ **[ການອັບເດດ Array ໃນ State](/learn/updating-arrays-in-state)** ເພື່ອຮຽນຮູ້ວິທີອັບເດດ arrat ຢ່າງຖືກຕ້ອງ.

</LearnMore>

## ຕໍ່ໄປແມ່ນຫຍັງ? {/*whats-next*/}

ໄປທີ່ [ການ Respond ຈາກ Events](/learn/responding-to-events) ເພີ່ມເລີ່ມອ່ານບົດນີ້ເທື່ອລະໜ້າ!

ຫຼື, ຖ້າທ່ານຄຸ້ນເຄີຍກັບຫົວຂໍ້ເຫຼົ່ານີ້ແລ້ວ, ລອງອ່ານກ່ຽວກັບ [ການ manage State](/learn/managing-state) ເບິ່ງ
