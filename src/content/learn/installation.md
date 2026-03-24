---
title: ການຕິດຕັ້ງ
---

<Intro>

React ໄດ້ຮັບການອອກແບບຕັ້ງແຕ່ເລີ່ມຕົ້ນເພື່ອການນຳໄປໃຊ້ຢ່າງຄ່ອຍເປັນຄ່ອຍໄປ. ທ່ານສາມາດໃຊ້ React ໜ້ອຍ ຫຼື ຫຼາຍຕາມໃຈຕ້ອງການ. ບໍ່ວ່າທ່ານຈະຕ້ອງການລອງ React, ເພີ່ມການໂຕ້ຕອບໃນໜ້າ HTML, ຫຼື ເລີ່ມແອັບທີ່ຊັບຊ້ອນທີ່ເຮັດດ້ວຍ React, ຫົວຂໍ້ນີ້ຈະຊ່ວຍທ່ານໃນການເລີ່ມຕົ້ນ.

</Intro>

<YouWillLearn isChapter={true}>

* [ວິທີການສ້າງ project React ໃໝ່](/learn/start-a-new-react-project)
* [ວິທີເພີ່ມ React ໃນ project ທີ່ມີຢູ່ແລ້ວ](/learn/add-react-to-an-existing-project)
* [ວິທີການຕັ້ງຄ່າ editor ຂອງທ່ານ](/learn/editor-setup)
* [ວິທີການຕິດຕັ້ງ React Developer Tools](/learn/react-developer-tools)

</YouWillLearn>

## ລອງ React {/*try-react*/}

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

ຫຼາຍໜ້າໃນ ເອກະສານ React ມີ sandbox ແບບນີ້. ນອກຈາກໃນເອກະສານ React ແລ້ວ, ຍັງມີອອນໄລ sandbox ອີກຫຼາກຫຼາຍທີ່ສະໜັບສະໜູນ React ຕົວຢ່າງ: [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), ຫຼື [CodePen.](https://codepen.io/pen?&editors=0010&layout=left&prefill_data_id=3f4569d1-1b11-4bce-bd46-89090eed5ddb)

### ລອງ React ໃນເຄື່ອງ {/*try-react-locally*/}

ຢາກໃຊ້ React ໃນເຄື່ອງຄອມພິວເຕີ້ຂອງທ່ານ, [ດາວໂຫຼດໜ້າ HTML ນີ້.](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html) ເປີດມັນໃນ editor ແລະ browser ຂອງທ່ານ!

## ສ້າງ project React ໃໝ່ {/*start-a-new-react-project*/}

ຖ້າທ່ານຕ້ອງການສ້າງແອັບ ຫຼື ເວັບໄຊຢ່າງເຕັມຮູບແບບດ້ວຍ React, [ສ້າງ project React ໃໝ່](/learn/start-a-new-react-project)

## ເພີ່ມ React ເຂົ້າໃນ project ທີ່ມີຢູ່ແລ້ວ {/*add-react-to-an-existing-project*/}

ຖ້າທ່ານຕ້ອງການໃຊ້ React ໃນແອັບ ຫຼື ເວັບໄຊທີ່ມີຢູ່ແລ້ວ, [ເພີ່ມ React ໃນ project ທີ່ມີຢູ່.](/learn/add-react-to-an-existing-project)

## ຂັ້ນຕອນຕໍ່ໄປ {/*next-steps*/}

ໄປທີ່ຄູ່ມື [ເລີ່ມຕົ້ນຢ່າງໄວ](/learn) ສຳລັບການເບິ່ງແນວຄິດກ່ຽວກັບ React ທີ່ສຳຄັນທີ່ສຸດທີ່ທ່ານຈະໄດ້ພົບໃນແຕ່ລະມື້.
