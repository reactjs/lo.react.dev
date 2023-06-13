---
title: ການຈັດການ State
---

<Intro>

ເມື່ອແອັບພິເຄຊັ່ນຂອງທ່ານໃຫຍ່ຂຶ້ນ, ການມີຄວາມເອົາໃຈໃສ່ຫຼາຍຂຶ້ນກ່ຽວກັບວິທີຈັດລະບຽບ state ແລະ ວິທີການທີ່ຂໍ້ມູນຖືກສົ່ງຜ່ານລະຫວ່າງ component ຂອງທ່ານ. State ທີ່ຊໍ້າຊ້ອນ ຫຼື ຊໍ້າກັນແມ່ນແຫຼ່ງທີ່ມາຂອງຂໍ້ຜິດພາດທົ່ວໄປ. ໃນບົດນີ້, ທ່ານຈະໄດ້ຮຽນຮູ້ກ່ຽວກັບວິທີການຈັດໂຄ່ງສ້າງ state ຂອງທ່ານໃຫ້ດີ, ວິທີການຮັກສາ logic ການອັບເດດ state ໃຫ້ຄົງຢູ່ ແລະ ວິທີການແບ່ງປັນ state ລະຫວ່າງ component ທີ່ຢູ່ຫ່າງໄກ.


</Intro>

<YouWillLearn isChapter={true}>

* [ວິທີຄິດກ່ຽວກັບການປ່ຽນແປງ UI ເມື່ອ state ປ່ຽນ](/learn/reacting-to-input-with-state)
* [ວິທີການຈັດໂຄ່ງສ້າງ state ທີ່ດີ](/learn/choosing-the-state-structure)
* [ວິທີ "ຍົກ state ຂຶ້ນ" ເພື່ອແບ່ງປັນລະຫວ່າງ component](/learn/sharing-state-between-components)
* [ວິທີຄວບຄຸມວ່າ state ໃດໄດ້ຮັບການຮັກສາໄວ້ ຫຼື reset](/learn/preserving-and-resetting-state)
* [ວິທີລວມ logic ແລະ state ທີ່ຊັບຊ້ອນໃນຟັງຊັ່ນ](/learn/extracting-state-logic-into-a-reducer)
* [ວິທີສົ່ງຂໍ້ມູນໂດຍບໍ່ຕ້ອງ "ແກ້ໄຂ prop"](/learn/passing-data-deeply-with-context)
* [ວິທີການ scale ການຈັດການ state ເມື່ອແອັບຂອງທ່ານໃຫຍ່ຂຶ້ນ](/learn/scaling-up-with-reducer-and-context)

</YouWillLearn>

## ການໂຕ້ຕອບ input ດ້ວຍ state {/*reacting-to-input-with-state*/}

ດ້ວຍ React, ທ່ານບໍ່ແກ້ໄຂ UI ຈາກ code ໂດຍກົງ. ຕົວຢ່າງ, ທ່ານບໍ່ຂຽນຄຳສັ່ງເຊັ່ນ "ປິດການໃຊ້ງານປຸ່ມ", "ເປີດການໃຊ້ງານປຸ່ມ", "ສະແດງຂໍ້ຄວາມສຳເລັດ", ແລະ ອື່ນໆ. ແຕ່ຈະອະທິບາຍ UI ທີ່ທ່ານຕ້ອງການເຫັນສຳລັບ state ຕ່າງໆຂອງ component ຂອງທ່ານແທນ ("state ເລີ່ມຕົ້ນ", "state ການພິມ", "state ສຳເລັດ") ແລ້ວ trigger ການປ່ຽນແປງ state ເພື່ອຕອບສະໜອງຕໍ່ input ຂອງຜູ້ໃຊ້. ສິ່ງນີ້ຄ້າຍກັບທີ່ນັກອອກແບບຄິດກ່ຽວກັບ UI.

ນີ້ແມ່ນແບບທົດສອບທີ່ສ້າງໂດຍໃຊ້ React. ສັງເກດວ່າມັນໃຊ້ຕົວແປ state "status" ເພື່ອກຳນົດວ່າຈະເປີດ ຫຼື ປິດປຸ່ມສົ່ງ ຫຼື ບໍ່?, ແລະ ຈະສະແດງຂໍ້ຄວາມສະແດງຄວາມສຳເລັດແທນແນວໃດ.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

```css
.Error { color: red; }
```

</Sandpack>

<LearnMore path="/learn/reacting-to-input-with-state">

ອ່ານ **[ການຕອບສະໜອງຕໍ່ການປ້ອນຂໍ້ມູນດ້ວຍ state](/learn/reacting-to-input-with-state)** ເພື່ອຮຽນຮູ້ວິທີການເຂົ້າເຖິງການໂຕ້ຕອບດ້ວຍຊຸດຄວາມຄິດທີ່ຂັບເຄື່ອນດ້ວຍ state.

</LearnMore>

## ການເລືອກໂຄ່ງສ້າງຂອງ state {/*choosing-the-state-structure*/}

ໂຄ່ງສ້າງ state ທີ່ດີສາມາດສ້າງຄວາມແຕກຕ່າງລະຫວ່າງ component ທີ່ນ່າແກ້ໄຂ ແລະ debug ກັບສ່ວນປະກອບທີ່ເປັນແຫຼ່ງທີ່ມາຂອງຂໍ້ຜິດພາດຢ່າງຕໍ່ເນື່ອງ. ຫຼັກການສຳຄັນທີ່ສຸດແມ່ນ state ບໍ່ຄວນມີຂໍ້ມູນທີ່ຊໍ້າຊ້ອນ ຫຼື ຊໍ້າກັນ. ຖ້າມີ state ທີ່ບໍ່ຈຳເປັນ, ກໍເປັນເລື່ອງງ່າຍທີ່ຈະລືມອັບເດດ ແລະ ຫາຂໍ້ຜິດພາດ!

ຕົວຢ່າງ, ຟອມນີ້ມີຕົວແປ state `fullName` **ທີ່ຊໍ້າຊ້ອນ**:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 5px; }
```

</Sandpack>

ທ່ານສາມາດລຶບ ແລະ ເຮັດໃຫ້ code ງ່າຍຂຶ້ນໂດຍການຄຳນວນ `fullName` ໃນຂະນະທີ່ component ກຳລັງ render:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 5px; }
```

</Sandpack>

ມັນອາດເບິ່ງຄືມີການປ່ຽນແປງໜ້ອຍດຽວ, ແຕ່ bug ຈຳນວນຫຼາຍໃນແອັບ React ແມ່ນໄດ້ຮັບການແກ້ໄຂດ້ວຍວິທີນີ້.

<LearnMore path="/learn/choosing-the-state-structure">

ອ່ານ **[ການເລືອກໂຄ່ງສ້າງ state](/learn/choosing-the-state-structure)** ເພື່ອຮຽນຮູ້ວິທີການອອກແບບຮູບຮ່າງຂອງ state ແລະ ຫຼີກຫຼ່ຽງ bug.

</LearnMore>

## ການແບ່ງປັນ state ລະຫວ່າງ component {/*sharing-state-between-components*/}

ບາງເທື່ອ, ທ່ານຕ້ອງການໃຫ້ state ຂອງສອງ component ປ່ຽນແປງພ້ອມກັນສະເໝີ. ໃນການເຮັດແບບນີ້, ໃຫ້ລຶບ state ອອກໝົດສອງ, ແລ້ວຍ້າຍໄປຫາ parent ທີ່ໃກ້ຄຽງທີ່ສຸດ ຈາກນັ້ນສົ່ງຕໍ່ໄປຫາ component ດ້ວຍ prop. ສິ່ງນີ້ເອີ້ນວ່າ "ການຍົກ state ຂຶ້ນ" ແລະ ເປັນໜຶ່ງໃນສິ່ງທີ່ພົບຫຼາຍທີ່ສຸດທີ່ທ່ານຈະຂຽນ code React.

ໃນຕົວຢ່າງນີ້, ຄວນໃຊ້ງານພຽງໜຶ່ງ panel ໃນແຕ່ລະຄັ້ງ. ເພື່ອບັນລຸເປົ້າໝາຍ, ແທນທີ່ຈະເກັບ state ທີ່ active ໄວ້ໃນແຕ່ລະ panel, component parent ຈະເກັບ state ແລະ ລະບຸ prop ໃຫ້ແຕ່ລະ children ມັນ.

<Sandpack>

```js
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}
```

```css
h3, p { margin: 5px 0px; }
.panel {
  padding: 10px;
  border: 1px solid #aaa;
}
```

</Sandpack>

<LearnMore path="/learn/sharing-state-between-components">

ອ່ານ **[ການແບ່ງປັນ state ລະຫວ່າງ component](/learn/sharing-state-between-components)** ເພື່ອຮຽນຮູ້ກ່ຽວກັບການຍົກ state ຂຶ້ນ ແລະ ເຮັດໃຫ້ component sync ກັນ.

</LearnMore>

## ການຮັກສາ ແລະ ການ reset state {/*preserving-and-resetting-state*/}

ເມື່ອທ່ານ render component ຄືນໃໝ່, React ຈຳເປັນຕ້ອງຕັດສິນໃຈວ່າຈະເກັບສ່ວນໃດຂອງໂຄ່ງສ້າງ (ແລະ ອັບເດດ), ແລະ ສ່ວນໃດທີ່ຈະປະຖິ້ມ ຫຼື ສ້າງໃໝ່ຕັ້ງແຕ່ເລີ່ມຕົ້ນ. ໃນກໍລະນີສ່ວນໃຫຍ່, ພຶດທິກຳອັດຕະໂນມັດຂອງ React ແມ່ນເຮັດໄດ້ດີແລ້ວ. ໂດຍຄ່າເລີ່ມຕົ້ນ, React ຈະຮັກສາສ່ວນແຜນຜັງທີ່ "ຈັບຄູ່" ກັບແຜນຜັງ component ທີ່ render ໄວ້ກ່ອນໜ້າ.

ເຖິງຢ່າງໃດກໍຕາມ, ບາງຄັ້ງບໍ່ແມ່ນສິ່ງທີ່ທ່ານຕ້ອງການ. ໃນແອັບແຊັດນີ້, ການພິມຂໍ້ຄວາມແລ້ວສະຫຼັບຜູ້ຮັບຈະບໍ່ reset ຂໍ້ມູນທີ່ປ້ອນ. ສິ່ງນີ້ອາດຈະເຮັດໃຫ້ຜູ້ໃຊ້ສົ່ງຂໍ້ຄວາມຫາຜິດຄົນໂດຍບໍ່ໄດ້ຕັ້ງໃຈ:

<Sandpack>

```js App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat contact={to} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
```

```js ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.email}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

React ໃຫ້ທ່ານແທນທີ່ພຶດທິກຳເລີ່ມຕົ້ນ, ແລະ *ບັງຄັບ* component ເພື່ອ reset state ໂດຍສົ່ງ `key` ເຊັ່ນ `<Chat key={email} />`. ສິ່ງນີ້ບອກ React ວ່າຖ້າຫາກຜູ້ຮັບແຕກຕ່າງກັນ, ຄວນຈະພິຈາລະນາ component `Chat` *ທີ່ແຕກຕ່າງກັນ* ເຊິ່ງຈຳເປັນຕ້ອງສ້າງໃໝ່ຕັ້ງແຕ່ຕົ້ນດ້ວຍຂໍ້ມູນໃໝ່ (ແລະ UI ເຊັ່ນ input). ຕອນນີ້ການສະຫຼັບລະຫວ່າງຜູ້ຮັບຈະ reset field input--ເຖິງວ່າທ່ານຈະ render component ດຽວກັນກໍຕາມ.

<Sandpack>

```js App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.email} contact={to} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
```

```js ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.email}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

<LearnMore path="/learn/preserving-and-resetting-state">

ອ່ານ **[ການຮັກສາ ແລະ reset State](/learn/preserving-and-resetting-state)** ເພື່ອຮຽນຮູ້ອາຍຸການໃຊ້ງານຂອງ state ແລະ ວິທີຄວບຄຸມ.

</LearnMore>

## ການແຍກ logic state ເປັນ reducer {/*extracting-state-logic-into-a-reducer*/}

Component ທີ່ມີການອັບເດດ state ເປັນຈຳນວນຫຼາຍກະຈາຍໄປທົ່ວ event handler ຈຳນວນຫຼາຍສາມາດຖືກຄອບງຳໄດ້. ສຳລັບກໍລິນີນີ, ທ່ານສາມາດລວມ logic ການອັບເດດ state ທັງໝົດພາຍນອກ component ຂອງທ່ານໄວ້ໃນຟັງຊັ່ນດຽວ, ເອີ້ນວ່າ "reducer". Event handler ຂອງທ່ານຈະຮັດກຸມເນື່ອງຈາກລະບຸສະເພາະ "action" ຂອງຜູ້ໃຊ້. ດ້ານລຸ່ມຂອງຟາຍ, ຟັງຊັ່ນ reducer ຈະລະບຸວ່າ state ຄວນອັບເດດແນວໃດເພື່ອຕອບສະໜອງໃນແຕ່ລະ action! 

<Sandpack>

```js App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];
```

```js AddTask.js hidden
import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Add</button>
    </>
  )
}
```

```js TaskList.js hidden
import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
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
        checked={task.done}
        onChange={e => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
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

<LearnMore path="/learn/extracting-state-logic-into-a-reducer">

ອ່ານ **[ການແຍກ logic state ລົງໃນ Reducer](/learn/extracting-state-logic-into-a-reducer)** ເພື່ອຮຽນຮູ້ວິທີລວມ logic ໃນຟັງຊັ່ນ reducer.

</LearnMore>

## ການສົ່ງຂໍ້ມູນຢ່າງເລິກເຊິງດ້ວຍ context {/*passing-data-deeply-with-context*/}

ໂດຍປົກະຕິແລ້ວ, ທ່ານຈະສົ່ງຂໍ້ມູນຈາກ parent component ໄປຫາ child component ດ້ວຍ prop. ແຕ່ການສົ່ງ prop ອາດຈະບໍ່ສະດວກ ຖ້າທ່ານຕ້ອງສົ່ງ prop ຜ່ານຫຼາຍ component ຫຼື ຖ້າ component ຈຳນວນຫຼາຍຕ້ອງການຂໍ້ມູນ. Context ຊ່ວຍໃຫ້ parent component ໃຫ້ຂໍ້ມູນບາງຢ່າງພ້ອມໃຊ້ງານສຳລັບ component ອື່ນໆໃນແຜນຜັງທີ່ຢູ່ດ້ານລຸ່ມ-ບໍ່ວ່າຈະເລິກພຽງໃດ-ໂດຍບໍ່ຕ້ອງສົ່ງຜ່ານ prop ຢ່າງຊັດເຈນ.

ທີ່ນີ້, Component `Heading` ຈະກຳນົດລະດັບຂອງຫົວເລື່ອງໂດຍ "ຖາມ" ໄປຍັງ "Section" ທີ່ໃກ້ຄຽງທີ່ສຸດສຳລັບລະດັບຂອງມັນ. ແຕ່ລະ `Section` ຕິດຕາມລະດັບຂອງໂຕເອງໂດຍຖາມ parent `Section` ແລະ ເພີ່ມໜຶ່ງເຂົ້າໄປ. ທຸກ `Section` ສະໜອງຂໍ້ມູນກັບ compoent ທັງໝົດທີ່ຢູ່ດ້ານລຸ່ມໂດຍບໍ່ຕ້ອງສົ່ງຜ່ານ prop--ມັນເຮັດຜ່ານ context.

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

```js Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(0);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

<LearnMore path="/learn/passing-data-deeply-with-context">

ອ່ານ **[ການສົ່ງຜ່ານຂໍ້ມູນຢ່າງເລິກເຊິງດ້ວຍ Context](/learn/passing-data-deeply-with-context)** ເພື່ອຮຽນຮູ້ກ່ຽວກັບການໃຊ້ context ແທນການສົ່ງຜ່ານດ້ວຍ prop.

</LearnMore>

## ການ Scale ຂຶ້ນດ້ວຍ reducer ແລະ context {/*scaling-up-with-reducer-and-context*/}

Reducer ຊ່ວຍໃຫ້ທ່ານລວມ logic ການອັບເດດ state ຂອງ component ໄດ້. Context ເຮັດໃຫ້ທ່ານສາມາດສົ່ງຂໍ້ມູນລົງເລິກໄປຍັງ component ອື່ນໆ. ທ່ານສາມາດລວມ reducer ແລະ context ເຂົ້ານຳກັນເພື່ອຈັດການ state ຂອງໜ້າຈໍທີ່ຊັບຊ້ອນ.

ດ້ວຍວິທີການນີ້, parent component ທີ່ມີ state ທີ່ຊັບຊ້ອນຈະຈັດການດ້ວຍ reducer. Component ອື່ນໆໃນສ່ວນເລິກຂອງ tree ສາມາດອ່ານ state ຜ່ານ context ໄດ້. ນອກຈາກນີ້ ຍັງສາມາດສົ່ງ dispatch action ເພື່ອອັບເດດ state ນັ້ນໄດ້ອີກດ້ວຍ.

<Sandpack>

```js App.js
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

```js TasksContext.js
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider
        value={dispatch}
      >
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```js AddTask.js
import { useState, useContext } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        });
      }}>Add</button>
    </>
  );
}

let nextId = 3;
```

```js TaskList.js
import { useState, useContext } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
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
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
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

<LearnMore path="/learn/scaling-up-with-reducer-and-context">

ອ່ານ **[ການ scale up ດ້ວຍ Reducer ແລະ Context](/learn/scaling-up-with-reducer-and-context)** ເພື່ອຮຽນຮູ້ກ່ຽວກັບການ scale ການຈັດການ state ໃນແອັບທີ່ກຳລັງໃຫຍ່ຂຶ້ນ.

</LearnMore>

## ຕໍ່ໄປແມ່ນຫຍັງ? {/*whats-next*/}

ໄປທີ່ [ການຕ້ອງສະໜອງຕໍ່ການປ້ອນຂໍ້ມູນດ້ວຍ state](/learn/reacting-to-input-with-state) ເພື່ອເລີ່ມອ່ານບົດນີ້ເທື່ອລະໜ້າ!

ຫຼື ຖ້າທ່ານຄຸ້ນເຄີຍກັບຫົວຂໍ້ເຫຼົ່ານີ້ແລ້ວ, ລອງອ່ານກ່ຽວກັບ [Escape Hatches](/learn/escape-hatches)?
