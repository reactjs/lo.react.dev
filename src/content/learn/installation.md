---
title: ການຕິດຕັ້ງ
---

<Intro>

React ໄດ້ຮັບການອອກແບບຕັ້ງແຕ່ເລີ່ມຕົ້ນເພື່ອການນຳໄປໃຊ້ຢ່າງຄ່ອຍເປັນຄ່ອຍໄປ. ທ່ານສາມາດໃຊ້ React ໜ້ອຍ ຫຼື ຫຼາຍຕາມໃຈຕ້ອງການ. ບໍ່ວ່າທ່ານຈະຕ້ອງການລອງ React, ເພີ່ມການໂຕ້ຕອບໃນໜ້າ HTML, ຫຼື ເລີ່ມແອັບທີ່ຊັບຊ້ອນທີ່ເຮັດດ້ວຍ React, ຫົວຂໍ້ນີ້ຈະຊ່ວຍທ່ານໃນການເລີ່ມຕົ້ນ.

</Intro>

<<<<<<< HEAD
<YouWillLearn isChapter={true}>

* [ວິທີການສ້າງ project React ໃໝ່](/learn/start-a-new-react-project)
* [ວິທີເພີ່ມ React ໃນ project ທີ່ມີຢູ່ແລ້ວ](/learn/add-react-to-an-existing-project)
* [ວິທີການຕັ້ງຄ່າ editor ຂອງທ່ານ](/learn/editor-setup)
* [ວິທີການຕິດຕັ້ງ React Developer Tools](/learn/react-developer-tools)

</YouWillLearn>

## ລອງ React {/*try-react*/}
=======
## Try React {/*try-react*/}
>>>>>>> d271a7ac11d2bf0d6e95ebdfacaf1038421f9be0

ທ່ານບໍ່ຈຳເປັນຕ້ອງຕິດຕັ້ງຫຍັງຖ້າຢາກລອງກ່ຽວກັບ React. ມາລອງຫຼິ້ນໃນ sandbox ນີ້ເລີຍ!

<Sandpack>

```js
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Greeting name="world" />
}
```

</Sandpack>

ທ່ານສາມາດແກ້ໄຂໄດ້ໂດຍກົງ ຫຼື ເປີດໃນແຖບໃໝ່ໂດຍການກົດປຸ່ມ "Fork" ທີ່ຢູ່ດ້ານຂວາທາງເທິງ.

<<<<<<< HEAD
ຫຼາຍໜ້າໃນ ເອກະສານ React ມີ sandbox ແບບນີ້. ນອກຈາກໃນເອກະສານ React ແລ້ວ, ຍັງມີອອນໄລ sandbox ອີກຫຼາກຫຼາຍທີ່ສະໜັບສະໜູນ React ຕົວຢ່າງ: [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), ຫຼື [CodePen.](https://codepen.io/pen?&editors=0010&layout=left&prefill_data_id=3f4569d1-1b11-4bce-bd46-89090eed5ddb)

### ລອງ React ໃນເຄື່ອງ {/*try-react-locally*/}
=======
Most pages in the React documentation contain sandboxes like this. Outside of the React documentation, there are many online sandboxes that support React: for example, [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), or [CodePen.](https://codepen.io/pen?template=QWYVwWN)
>>>>>>> d271a7ac11d2bf0d6e95ebdfacaf1038421f9be0

ຢາກໃຊ້ React ໃນເຄື່ອງຄອມພິວເຕີ້ຂອງທ່ານ, [ດາວໂຫຼດໜ້າ HTML ນີ້.](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html) ເປີດມັນໃນ editor ແລະ browser ຂອງທ່ານ!

<<<<<<< HEAD
## ສ້າງ project React ໃໝ່ {/*start-a-new-react-project*/}

ຖ້າທ່ານຕ້ອງການສ້າງແອັບ ຫຼື ເວັບໄຊຢ່າງເຕັມຮູບແບບດ້ວຍ React, [ສ້າງ project React ໃໝ່](/learn/start-a-new-react-project)
=======
## Creating a React App {/*creating-a-react-app*/}

If you want to start a new React app, you can [create a React app](/learn/creating-a-react-app) using a recommended framework.

## Build a React App from Scratch {/*build-a-react-app-from-scratch*/}

If a framework is not a good fit for your project, you prefer to build your own framework, or you just want to learn the basics of a React app you can [build a React app from scratch](/learn/build-a-react-app-from-scratch).
>>>>>>> d271a7ac11d2bf0d6e95ebdfacaf1038421f9be0

## ເພີ່ມ React ເຂົ້າໃນ project ທີ່ມີຢູ່ແລ້ວ {/*add-react-to-an-existing-project*/}

<<<<<<< HEAD
ຖ້າທ່ານຕ້ອງການໃຊ້ React ໃນແອັບ ຫຼື ເວັບໄຊທີ່ມີຢູ່ແລ້ວ, [ເພີ່ມ React ໃນ project ທີ່ມີຢູ່.](/learn/add-react-to-an-existing-project)
=======
If want to try using React in your existing app or a website, you can [add React to an existing project.](/learn/add-react-to-an-existing-project)


<Note>

#### Should I use Create React App? {/*should-i-use-create-react-app*/}

No. Create React App has been deprecated. For more information, see [Sunsetting Create React App](/blog/2025/02/14/sunsetting-create-react-app).

</Note>
>>>>>>> d271a7ac11d2bf0d6e95ebdfacaf1038421f9be0

## ຂັ້ນຕອນຕໍ່ໄປ {/*next-steps*/}

ໄປທີ່ຄູ່ມື [ເລີ່ມຕົ້ນຢ່າງໄວ](/learn) ສຳລັບການເບິ່ງແນວຄິດກ່ຽວກັບ React ທີ່ສຳຄັນທີ່ສຸດທີ່ທ່ານຈະໄດ້ພົບໃນແຕ່ລະມື້.
