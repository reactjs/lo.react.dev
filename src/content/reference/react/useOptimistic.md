---
title: useOptimistic
canary: true
---

<Canary>

The `useOptimistic` Hook is currently only available in React's Canary and experimental channels. Learn more about [React's release channels here](/community/versioning-policy#all-release-channels).

</Canary>

<Intro>

`useOptimistic` is a React Hook that lets you optimistically update the UI.

```js
  const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

</Intro>

<InlineToc />

---

## Reference {/*reference*/}

### `useOptimistic(state, updateFn)` {/*use*/}

`useOptimistic` is a React Hook that lets you show a different state while an async action is underway. It accepts some state as an argument and returns a copy of that state that can be different during the duration of an async action such as a network request. You provide a function that takes the current state and the input to the action, and returns the optimistic state to be used while the action is pending.

This state is called the "optimistic" state because it is usually used to immediately present the user with the result of performing an action, even though the action actually takes time to complete.

```js
import { useOptimistic } from 'react';

function AppContainer() {
  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    // updateFn
    (currentState, optimisticValue) => {
      // merge and return new state
      // with optimistic value
    }
  );
}
```

[See more examples below.](#usage)

#### Parameters {/*parameters*/}

* `state`: the value to be returned initially and whenever no action is pending.
* `updateFn(currentState, optimisticValue)`: a function that takes the current state and the optimistic value passed to `addOptimistic` and returns the resulting optimistic state. It must be a pure function. `updateFn` takes in two parameters. The `currentState` and the `optimisticValue`. The return value will be the merged value of the `currentState` and `optimisticValue`.


#### Returns {/*returns*/}

* `optimisticState`: The resulting optimistic state. It is equal to `state` unless an action is pending, in which case it is equal to the value returned by `updateFn`.
* `addOptimistic`: `addOptimistic` is the dispatching function to call when you have an optimistic update. It takes one argument, `optimisticValue`, of any type and will call the `updateFn` with `state` and `optimisticValue`.

---

## Usage {/*usage*/}

### Optimistically updating forms {/*optimistically-updating-with-forms*/}

The `useOptimistic` Hook provides a way to optimistically update the user interface before a background operation, like a network request, completes. In the context of forms, this technique helps to make apps feel more responsive. When a user submits a form, instead of waiting for the server's response to reflect the changes, the interface is immediately updated with the expected outcome.

<<<<<<< HEAD
For example, when a user types a message into the form and hits the "Send" button, the `useOptimistic` Hook allows the message to immediately appear in the list with a "Sending..." label, even before the message is actually sent to a server. This "optimistic" approach gives the impression of speed and responsiveness. The form then attempts to truly send the message in the background. Once the server confirms the message has been received, the "Sending..." label is removed.

<Sandpack>

=======
```js [[1, 4, "age"], [1, 5, "name"], [1, 6, "todos"], [2, 4, "optimisticAge"], [2, 5, "optimisticName"], [2, 6, "optimisticTodos"], [3, 4, "setOptimisticAge"], [3, 5, "setOptimisticName"], [3, 6, "setOptimisticTodos"], [4, 6, "reducer"]]
import { useOptimistic } from 'react';

function MyComponent({age, name, todos}) {
  const [optimisticAge, setOptimisticAge] = useOptimistic(age);
  const [optimisticName, setOptimisticName] = useOptimistic(name);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, reducer);
  // ...
```

`useOptimistic` returns an array with exactly two items:

1. The <CodeStep step={2}>optimistic state</CodeStep>, initially set to the <CodeStep step={1}>value</CodeStep> provided.
2. The <CodeStep step={3}>set function</CodeStep> that lets you temporarily change the state during an [Action](reference/react/useTransition#functions-called-in-starttransition-are-called-actions).
   * If a <CodeStep step={4}>reducer</CodeStep> is provided, it will run before returning the optimistic state.

To use the <CodeStep step={2}>optimistic state</CodeStep>, call the `set` function inside an Action.

Actions are functions called inside `startTransition`:

```js {3}
function onAgeChange(e) {
  startTransition(async () => {
    setOptimisticAge(42);
    const newAge = await postAge(42);
    setAge(newAge);
  });
}
```

React will render the optimistic state `42` first while the `age` remains the current age. The Action waits for POST, and then renders the `newAge` for both `age` and `optimisticAge`.

See [How optimistic state works](#how-optimistic-state-works) for a deep dive.

<Note>

When using [Action props](/reference/react/useTransition#exposing-action-props-from-components), you can call the set function without `startTransition`:

```js [[3, 2, "setOptimisticName"]]
async function submitAction() {
  setOptimisticName('Taylor');
  await updateName('Taylor');
}
```

This works because Action props are already called inside `startTransition`.

For an example, see: [Using optimistic state in Action props](#using-optimistic-state-in-action-props).

</Note>

---

### Using optimistic state in Action props {/*using-optimistic-state-in-action-props*/}

In an [Action prop](/reference/react/useTransition#exposing-action-props-from-components), you can call the optimistic setter directly without `startTransition`.

This example sets optimistic state inside a `<form>` `submitAction` prop:

<Sandpack>

```js src/App.js
import { useState, startTransition } from 'react';
import EditName from './EditName';

export default function App() {
  const [name, setName] = useState('Alice');

  return <EditName name={name} action={setName} />;
}
```

```js src/EditName.js active
import { useOptimistic, startTransition } from 'react';
import { updateName } from './actions.js';

export default function EditName({ name, action }) {
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  async function submitAction(formData) {
    const newName = formData.get('name');
    setOptimisticName(newName);

    const updatedName = await updateName(newName);
    startTransition(() => {
      action(updatedName);
    })
  }

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change it: </label>
        <input
          type="text"
          name="name"
          disabled={name !== optimisticName}
        />
      </p>
    </form>
  );
}
```

```js src/actions.js hidden
export async function updateName(name) {
  await new Promise((res) => setTimeout(res, 1000));
  return name;
}
```

</Sandpack>

In this example, when the user submits the form, the `optimisticName` updates immediately to show the `newName` optimistically while the server request is in progress. When the request completes, `name` and `optimisticName` are rendered with the actual `updatedName` from the response.

<DeepDive>

#### Why doesn't this need `startTransition`? {/*why-doesnt-this-need-starttransition*/}

By convention, props called inside `startTransition` are named with "Action".

Since `submitAction` is named with "Action", you know it's already called inside `startTransition`.

See [Exposing `action` prop from components](/reference/react/useTransition#exposing-action-props-from-components) for the Action prop pattern.

</DeepDive>

---

### Adding optimistic state to Action props {/*adding-optimistic-state-to-action-props*/}

When creating an [Action prop](/reference/react/useTransition#exposing-action-props-from-components), you can add `useOptimistic` to show immediate feedback.

Here's a button that shows "Submitting..." while the `action` is pending:

<Sandpack>
>>>>>>> abe931a8cb3aee3e8b15ef7e187214789164162a

```js src/App.js
import { useOptimistic, useState, useRef } from "react";
import { deliverMessage } from "./actions.js";

<<<<<<< HEAD
function Thread({ messages, sendMessage }) {
  const formRef = useRef();
  async function formAction(formData) {
    addOptimisticMessage(formData.get("message"));
    formRef.current.reset();
    await sendMessage(formData);
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
=======
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button action={async () => {
        await submitForm();
        startTransition(() => {
          setCount(c => c + 1);
        });
      }}>Increment</Button>
      {count > 0 && <p>Submitted {count}!</p>}
    </div>
  );
}
```

```js src/Button.js active
import { useOptimistic, startTransition } from 'react';

export default function Button({ action, children }) {
  const [isPending, setIsPending] = useOptimistic(false);

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          setIsPending(true);
          await action();
        });
      }}
    >
      {isPending ? 'Submitting...' : children}
    </button>
  );
}
```

```js src/actions.js hidden
export async function submitForm() {
  await new Promise((res) => setTimeout(res, 1000));
}
```

</Sandpack>

When the button is clicked, `setIsPending(true)` uses optimistic state to immediately show "Submitting..." and disable the button. When the Action is done, `isPending` is rendered as `false` automatically.

This pattern automatically shows a pending state however `action` prop is used with `Button`:

```js
// Show pending state for a state update
<Button action={() => { setState(c => c + 1) }} />

// Show pending state for a navigation
<Button action={() => { navigate('/done') }} />

// Show pending state for a POST
<Button action={async () => { await fetch(/* ... */) }} />

// Show pending state for any combination
<Button action={async () => {
  setState(c => c + 1);
  await fetch(/* ... */);
  navigate('/done');
}} />
```

The pending state will be shown until everything in the `action` prop is finished.

<Note>

You can also use [`useTransition`](/reference/react/useTransition) to get pending state via `isPending`.

The difference is that `useTransition` gives you the `startTransition` function, while `useOptimistic` works with any Transition. Use whichever fits your component's needs.

</Note>

---

### Updating props or state optimistically {/*updating-props-or-state-optimistically*/}

You can wrap props or state in `useOptimistic` to update it immediately while an Action is in progress.

In this example, `LikeButton` receives `isLiked` as a prop and immediately toggles it when clicked:

<Sandpack>

```js src/App.js
import { useState, useOptimistic, startTransition } from 'react';
import { toggleLike } from './actions.js';

export default function App() {
  const [isLiked, setIsLiked] = useState(false);
  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(isLiked);

  function handleClick() {
    startTransition(async () => {
      const newValue = !optimisticIsLiked
      console.log('⏳ setting optimistic state: ' + newValue);

      setOptimisticIsLiked(newValue);
      const updatedValue = await toggleLike(newValue);

      startTransition(() => {
        console.log('⏳ setting real state: ' + updatedValue );
        setIsLiked(updatedValue);
      });
    });
  }

  if (optimisticIsLiked !== isLiked) {
    console.log('✅ rendering optimistic state: ' + optimisticIsLiked);
  } else {
    console.log('✅ rendering real value: ' + optimisticIsLiked);
  }


  return (
    <button onClick={handleClick}>
      {optimisticIsLiked ? '❤️ Unlike' : '🤍 Like'}
    </button>
  );
}
```

```js src/actions.js hidden
export async function toggleLike(value) {
  return await new Promise((res) => setTimeout(() => res(value), 1000));
  // In a real app, this would update the server
}
```

```js src/index.js hidden
import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById('root'));
// Not using StrictMode so double render logs are not shown.
root.render(<App />);
```

</Sandpack>

When the button is clicked, `setOptimisticIsLiked` immediately updates the displayed state to show the heart as liked. Meanwhile, `await toggleLike` runs in the background. When the `await` completes, `setIsLiked` parent updates the "real" `isLiked` state, and the optimistic state is rendered to match this new value.

<Note>

This example reads from `optimisticIsLiked` to calculate the next value. This works when the base state won't change, but if the base state might change while your Action is pending, you may want to use a state updater or the reducer.

See [Updating state based on the current state](#updating-state-based-on-current-state) for an example.

</Note>

---

### Updating multiple values together {/*updating-multiple-values-together*/}

When an optimistic update affects multiple related values, use a reducer to update them together. This ensures the UI stays consistent.

Here's a follow button that updates both the follow state and follower count:

<Sandpack>

```js src/App.js
import { useState, startTransition } from 'react';
import { followUser, unfollowUser } from './actions.js';
import FollowButton from './FollowButton';

export default function App() {
  const [user, setUser] = useState({
    name: 'React',
    isFollowing: false,
    followerCount: 10500
  });

  async function followAction(shouldFollow) {
    if (shouldFollow) {
      await followUser(user.name);
    } else {
      await unfollowUser(user.name);
    }
    startTransition(() => {
      setUser(current => ({
        ...current,
        isFollowing: shouldFollow,
        followerCount: current.followerCount + (shouldFollow ? 1 : -1)
      }));
    });
  }

  return <FollowButton user={user} followAction={followAction} />;
}
```

```js src/FollowButton.js active
import { useOptimistic, startTransition } from 'react';

export default function FollowButton({ user, followAction }) {
  const [optimisticState, updateOptimistic] = useOptimistic(
    { isFollowing: user.isFollowing, followerCount: user.followerCount },
    (current, isFollowing) => ({
      isFollowing,
      followerCount: current.followerCount + (isFollowing ? 1 : -1)
    })
  );

  function handleClick() {
    const newFollowState = !optimisticState.isFollowing;
    startTransition(async () => {
      updateOptimistic(newFollowState);
      await followAction(newFollowState);
    });
  }

  return (
    <div>
      <p><strong>{user.name}</strong></p>
      <p>{optimisticState.followerCount} followers</p>
      <button onClick={handleClick}>
        {optimisticState.isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}
```

```js src/actions.js hidden
export async function followUser(name) {
  await new Promise((res) => setTimeout(res, 1000));
}

export async function unfollowUser(name) {
  await new Promise((res) => setTimeout(res, 1000));
}
```

</Sandpack>

The reducer receives the new `isFollowing` value and calculates both the new follow state and the updated follower count in a single update. This ensures the button text and count always stay in sync.


<DeepDive>

#### Choosing between updaters and reducers {/*choosing-between-updaters-and-reducers*/}

`useOptimistic` supports two patterns for calculating state based on current state:

**Updater functions** work like [useState updaters](/reference/react/useState#updating-state-based-on-the-previous-state). Pass a function to the setter:

```js
const [optimistic, setOptimistic] = useOptimistic(value);
setOptimistic(current => !current);
```

**Reducers** separate the update logic from the setter call:

```js
const [optimistic, dispatch] = useOptimistic(value, (current, action) => {
  // Calculate next state based on current and action
});
dispatch(action);
```

**Use updaters** for calculations where the setter call naturally describes the update. This is similar to using `setState(prev => ...)` with `useState`.

**Use reducers** when you need to pass data to the update (like which item to add) or when handling multiple types of updates with a single hook.

**Why use a reducer?**

Reducers are essential when the base state might change while your Transition is pending. If `todos` changes while your add is pending (for example, another user added a todo), React will re-run your reducer with the new `todos` to recalculate what to show. This ensures your new todo is added to the latest list, not an outdated copy.

An updater function like `setOptimistic(prev => [...prev, newItem])` would only see the state from when the Transition started, missing any updates that happened during the async work.

</DeepDive>

---

### Optimistically adding to a list {/*optimistically-adding-to-a-list*/}

When you need to optimistically add items to a list, use a `reducer`:

<Sandpack>

```js src/App.js
import { useState, startTransition } from 'react';
import { addTodo } from './actions.js';
import TodoList from './TodoList';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' }
  ]);

  async function addTodoAction(newTodo) {
    const savedTodo = await addTodo(newTodo);
    startTransition(() => {
      setTodos(todos => [...todos, savedTodo]);
    });
  }

  return <TodoList todos={todos} addTodoAction={addTodoAction} />;
}
```

```js src/TodoList.js active
import { useOptimistic, startTransition } from 'react';

export default function TodoList({ todos, addTodoAction }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, newTodo) => [
      ...currentTodos,
      { id: newTodo.id, text: newTodo.text, pending: true }
>>>>>>> abe931a8cb3aee3e8b15ef7e187214789164162a
    ]
  );

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
<<<<<<< HEAD
=======
```

```js src/actions.js hidden
export async function addTodo(todo) {
  await new Promise((res) => setTimeout(res, 1000));
  // In a real app, this would save to the server
  return { ...todo, pending: false };
}
```

</Sandpack>

The `reducer` receives the current list of todos and the new todo to add. This is important because if the `todos` prop changes while your add is pending (for example, another user added a todo), React will update your optimistic state by re-running the reducer with the updated list. This ensures your new todo is added to the latest list, not an outdated copy.

<Note>

Each optimistic item includes a `pending: true` flag so you can show loading state for individual items. When the server responds and the parent updates the canonical `todos` list with the saved item, the optimistic state updates to the confirmed item without the pending flag.

</Note>

---

### Handling multiple `action` types {/*handling-multiple-action-types*/}

When you need to handle multiple types of optimistic updates (like adding and removing items), use a reducer pattern with `action` objects.

This shopping cart example shows how to handle add and remove with a single reducer:

<Sandpack>

```js src/App.js
import { useState, startTransition } from 'react';
import { addToCart, removeFromCart, updateQuantity } from './actions.js';
import ShoppingCart from './ShoppingCart';
>>>>>>> abe931a8cb3aee3e8b15ef7e187214789164162a

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello there!", sending: false, key: 1 }
  ]);
  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }
  return <Thread messages={messages} sendMessage={sendMessage} />;
}
```

```js src/actions.js
export async function deliverMessage(message) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}
```


```json package.json hidden
{
  "dependencies": {
    "react": "18.3.0-canary-6db7f4209-20231021",
    "react-dom": "18.3.0-canary-6db7f4209-20231021",
    "react-scripts": "^5.0.0"
  },
  "main": "/index.js",
  "devDependencies": {}
}
```

</Sandpack>
<<<<<<< HEAD
=======

Try deleting 'Deploy to production'. When the delete fails, the item automatically reappears in the list.

---

## Troubleshooting {/*troubleshooting*/}

### I'm getting an error: "An optimistic state update occurred outside a Transition or Action" {/*an-optimistic-state-update-occurred-outside-a-transition-or-action*/}

You may see this error:

<ConsoleBlockMulti>

<ConsoleLogLine level="error">

An optimistic state update occurred outside a Transition or Action. To fix, move the update to an Action, or wrap with `startTransition`.

</ConsoleLogLine>

</ConsoleBlockMulti>

The optimistic setter function must be called inside `startTransition`:

```js
// 🚩 Incorrect: outside a Transition
function handleClick() {
  setOptimistic(newValue);  // Warning!
  // ...
}

// ✅ Correct: inside a Transition
function handleClick() {
  startTransition(async () => {
    setOptimistic(newValue);
    // ...
  });
}

// ✅ Also correct: inside an Action prop
function submitAction(formData) {
  setOptimistic(newValue);
  // ...
}
```

When you call the setter outside an Action, the optimistic state will briefly appear and then immediately revert back to the original value. This happens because there's no Transition to "hold" the optimistic state while your Action runs.

### I'm getting an error: "Cannot update optimistic state while rendering" {/*cannot-update-optimistic-state-while-rendering*/}

You may see this error:

<ConsoleBlockMulti>

<ConsoleLogLine level="error">

Cannot update optimistic state while rendering.

</ConsoleLogLine>

</ConsoleBlockMulti>

This error occurs when you call the optimistic setter during the render phase of a component. You can only call it from event handlers, effects, or other callbacks:

```js
// 🚩 Incorrect: calling during render
function MyComponent({ items }) {
  const [isPending, setPending] = useOptimistic(false);

  // This runs during render - not allowed!
  setPending(true);

  // ...
}

// ✅ Correct: calling inside startTransition
function MyComponent({ items }) {
  const [isPending, setPending] = useOptimistic(false);

  function handleClick() {
    startTransition(() => {
      setPending(true);
      // ...
    });
  }

  // ...
}

// ✅ Also correct: calling from an Action
function MyComponent({ items }) {
  const [isPending, setPending] = useOptimistic(false);

  function action() {
    setPending(true);
    // ...
  }

  // ...
}
```

### My optimistic updates show stale values {/*my-optimistic-updates-show-stale-values*/}

If your optimistic state seems to be based on old data, consider using an updater function or reducer to calculate the optimistic state relative to the current state.

```js
// May show stale data if state changes during Action
const [optimistic, setOptimistic] = useOptimistic(count);
setOptimistic(5);  // Always sets to 5, even if count changed

// Better: relative updates handle state changes correctly
const [optimistic, adjust] = useOptimistic(count, (current, delta) => current + delta);
adjust(1);  // Always adds 1 to whatever the current count is
```

See [Updating state based on the current state](#updating-state-based-on-current-state) for details.

### I don't know if my optimistic update is pending {/*i-dont-know-if-my-optimistic-update-is-pending*/}

To know when `useOptimistic` is pending, you have three options:

1. **Check if `optimisticValue === value`**

```js
const [optimistic, setOptimistic] = useOptimistic(value);
const isPending = optimistic !== value;
```

If the values are not equal, there's a Transition in progress.

2. **Add a `useTransition`**

```js
const [isPending, startTransition] = useTransition();
const [optimistic, setOptimistic] = useOptimistic(value);

//...
startTransition(() => {
  setOptimistic(state);
})
```

Since `useTransition` uses `useOptimistic` for `isPending` under the hood, this is equivalent to option 1.

3. **Add a `pending` flag in your reducer**

```js
const [optimistic, addOptimistic] = useOptimistic(
  items,
  (state, newItem) => [...state, { ...newItem, isPending: true }]
);
```

Since each optimistic item has its own flag, you can show loading state for individual items.
>>>>>>> abe931a8cb3aee3e8b15ef7e187214789164162a
