---
title: ຄິດແບບ React
---

<Intro>

React ສາມາດປ່ຽນວິທີຄິດຂອງທ່ານກ່ຽວກັບການອອກແບບທີ່ທ່ານເບິ່ງ ແລະ ແອັບທີ່ທ່ານສ້າງ. ເມືອທ່ານສ້າງ user interface ດ້ວຍ React, ທຳອິດທ່ານຕ້ອງໄດ້ແຍກມັນອອກໃຫ້ເປັນຊີ້ນສ່ວນນ້ອຍໆທີ່ເອີ້ນວ່າ: *components*. ຈາກນັ້ນທ່ານຈະອະທິບາຍພາບທີ່ມີສະຖານະທີ່ແຕກຕ່າງກັນຂອງແຕ່ລະຊີ້ນສ່ວນ component ຂອງທ່ານ. ສຸດທ້າຍ, ທ່ານຈະເຊື່ອມຕໍ່ component ຂອງທ່ານເຂົ້າລວມກັນເພື່ອໃຫ້ຂໍ້ມູນຕ່າງໆໄຫຼຜ່ານ. ໃນບົດສອນນີ້, ພວກເຮົາຈະແນະນຳທ່ານຕະຫຼອດຮອດຂະບວນການຄິດໃນການສ້າງຕາຕະລາງຂໍ້ມູນຜະລິດຕະພັນດ້ວຍ React.

</Intro>

## ເລີ່ມຕົ້ນດ້ວຍແບບຈຳລອງ {/*start-with-the-mockup*/}

ຈິນຕະນາການວ່າທ່ານໄດ້ມີ JSON API ແລະ ແບບຈຳລອງຈາກ designer ແລ້ວ.

JSON API ສົ່ງບາງຂໍ້ມູນທີ່ມີລັກສະນະແບບນີ້:

```json
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
```

ແບບຈຳລອງໜ້າຕາປະມານນີ້:

<img src="/images/docs/s_thinking-in-react_ui.png" width="300" style={{margin: '0 auto'}} />

ໃນການ implement UI ໃນ React, ທ່ານຈະປະຕິບັດຕາມ 5 ຂັ້ນຕອນຄືກັນ.

## ຂັ້ນຕອນທີ 1: ແຕກ UI ໄປເປັນ component hierarchy {/*step-1-break-the-ui-into-a-component-hierarchy*/}

ເລີ່ມຈາກແຕ້ມກ່ອງອ້ອມທຸກໆ component ແລະ subcomponent ໃນແບບຈຳລອງ ແລະ ຕັ້ງຊື່ໃຫ້ມັນ. ຖ້າທ່ານເຮັດວຽກກັບ designer, ເຂົາເຈົ້າອາດຈະຕັ້ງຊື່ໃຫ້ component ພວກນັ້ນແລ້ວໃນເຄື່ອງມືອອກແບບຂອງພວກເຂົາ. ຖາມເຂົາເຈົ້າ!

ຂຶ້ນນຳພື້ນຖານຂອງທ່ານ, ທ່ານສາມາດຄິດກ່ຽວກັບການແຍກ design ໄປເປັນ component ໄດ້ໃນຫຼາຍແບບ:

* **Programming**--ໃຊ້ເທັກນິກດຽວກັບສຳລັບການຕັດສິນໃຈວ່າທ່ານຄວນຈະສ້າງຟັງຊັ່ນໃໝ່ ຫຼື ອອບເຈັກ. ໜຶ່ງເທັກນິກແມ່ນ [ຫຼັກການໜຶ່ງຄວາມຮັບຜິດຊອບ](https://en.wikipedia.org/wiki/Single_responsibility_principle), ນັ້ນແຫຼະ, component ຄວນເຮັດແຕ່ສິ່ງດຽວເທົ່ານັ້ນ. ຖ້າມັນໃຫຍ່ຂຶ້ນ, ມັນຄວນຈະຖືກແຕກຍ່ອຍໄປເປັນສ່ວນນ້ອຍໆເປັນ subcomponent.
* **CSS**--ຂຶ້ນກັບວ່າທ່ານຕ້ອງການສ້າງ class selector ສະເພາະ. (ເຖິງຢ່າງໃດກໍ່ຕາມ, component ມີລາຍລະອຽດນ້ອຍກວ່າໜ້ອຍໜຶ່ງ)
* **Design**--ຂຶ້ນກັບວ່າທ່ານຕ້ອງການຈັດການຊັ້ນການອອກແບບແນວໃດ.

ຖ້າ JSON ຂອງທ່ານມີໂຄ່ງສ້າງທີ່ດີ, ທ່ານຈະພົບວ່າມັນຈະ map ກັບ ໂຄ່ງສ້າງ component ຂອງ UI ທ່ານໄດ້ຢ່າງເປັນທຳມະຊາດ. ນັ້ນເປັນເພາະວ່າ UI ແລະ data model ມີສະຖາປັດຕະຍະກຳຂໍ້ມູນອັນດຽວກັນ, ໂຄງດຽວກັນ. ແຍກ UI ຂອງທ່ານໄປເປັນ component, ໂດຍທີ່ແຕ່ລະ component ຈະໄປກົງກັບຊີ້ນສ່ວນ data model ຂອງທ່ານ.

ມີ 5 components ເທິງໜ້າຈໍນີ້:

<FullWidth>

<CodeDiagram flip>

<img src="/images/docs/s_thinking-in-react_ui_outline.png" width="500" style={{margin: '0 auto'}} />

1. `FilterableProductTable` (ສີເທົາ) ປະກອບດ້ວຍແອັບທັງໝົດ.
2. `SearchBar` (ສີຟ້າ) ຮັບ user input.
3. `ProductTable` (ສີມ່ວງ) ສະແດງ ແລະ filter ລາຍການຕາມ user input.
4. `ProductCategoryRow` (ສີຂຽວ) ສະແດງ heading ໃນແຕ່ລະປະເພດ.
5. `ProductRow`	(ສີເຫຼືອງ) ສະແດງແຖວໃນແຕ່ລະຜະລິດຕະພັນ.

</CodeDiagram>

</FullWidth>

ຖ້າທ່ານເບິ່ງທີ່ `ProductTable` (ສີມ່ວງ), ທ່ານຈະເຫັນສ່ວນຫົວຂອງຕາຕະລາງ (ປະກອບມີ "Name" ແລະ "Price" ກຳກັບ) ບໍ່ແມ່ນ component ຂອງມັນເອງ. ນີ້ເປັນເລື່ອງຂອງຄວາມມັກ ແລະ ທ່ານສາມາດເລືອກທາງໃດໜຶ່ງກໍໄດ້. ສຳລັບຕົວຢ່າງນີ້, ເປັນສ່ວນໜຶ່ງຂອງ `ProductTable` ເພາະວ່າມັນສະແດງຢູ່ໃນ `ProductTable` list. ເຖິງຢ່າງໃດກໍຕາມ, ຖ້າຫາກສ່ວນຫົວຂອງຕາຕະລາງມີຄວາມຊັບຊ້ອນຫຼາຍຂຶ້ນ (ຕົວຢ່າງ: ຖ້າທ່ານເພີ່ມການຈັດຮຽງ), ທ່ານສາມາດແຍກມັນໄປເປັນ component `ProductTableHeader` ມັນເອງໄດ້.

ຕອນນີ້ທ່ານໄດ້ຮູ້ກ່ຽວກັບ component ໃນແບບຈຳລອງແລ້ວ, ໃຫ້ຈັດຮຽນມັນໃຫ້ເປັນລຳດັບຊັ້ນ. Component ທີ່ສະແດງໃນ component ອື່ນໃນແບບຈຳລອງຄວນຈະສະແດງເປັນລຳດັບຊັ້ນຍ່ອຍ.

* `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
        * `ProductCategoryRow`
        * `ProductRow`

## ຂັ້ນຕອນທີ 2: ສ້າງ static version ໃນ React {/*step-2-build-a-static-version-in-react*/}

ຕອນນີ້ທ່ານມີ component ທີ່ເປັນລຳດັບຊັ້ນແລ້ວ, ເຖິງເວລາສ້າງແອັບຂອງທ່ານເອງແລ້ວ. ວິທີການທີ່ກົງໄປກົງມາທີ່ສຸດຄືການສ້າງແອັບເວີຊັນທີ່ສະແດງຜົນ UI ຈາກ data model ຂອງທ່ານໂດຍບໍ່ຕ້ອງເພີ່ມການຕອບໂຕ້ໃດໆ... ແຕ່! ສ່ວນຫຼາຍການສ້າງເວີຊັນ static ກ່ອນແມ່ນງ່າຍແລ້ວຄ່ອຍໄປເພີ່ມການຕອບໂຕ້ນຳຫຼັງ. ເຮັດແບບເວີຊັນ static ແມ່ນຕ້ອງໄດ້ພິມຫຼາຍ ແລະ ບໍ່ຕ້ອງຄິດ ແຕ່ການເພີ່ມການຕອບໂຕ້ແມ່ນຕ້ອງໄດ້ໃຊ້ຄວາມຄິດຫຼາຍ ແລະ ບໍ່ຕ້ອງພິມຫຼາຍ.

ເພື່ອສ້າງເວີຊັນ static ແອັບຂອງທ່ານທີ່ຕ້ອງ render data model ຂອງທ່ານ, ທ່ານຢາກສ້າງ [components](/learn/your-first-component) ທີ່ສາມາດ reuse ກັບ component ອື່ນ ແລະ ສົ່ງຂໍ້ມູນໂດຍໃຊ້ [props.](/learn/passing-props-to-a-component) Props ແມ່ນວິທີການສົ່ງຂໍ້ມູນຈາກພໍ່ແມ່ໄປຫາລູກ. (ຖ້າທ່ານຄຸ້ນເຄີຍກັບແນວຄິດຂອງ [state](/learn/state-a-components-memory), ຢ່າໃຊ້ state ເພື່ອສ້າງເວີຊັນ static ນີ້. State ແມ່ນສະຫງວນໄວ້ສຳລັບການໂຕ້ຕອບເທົ່ານັ້ນ, ນັ້ນແມ່ນ, ຂໍ້ມູນທີ່ຖືກປ່ຽນແປງຕະຫຼອດເວລາ. ສະເພາະເວີຊັນ static ແອັບນີ້ຂອງທ່ານ, ທ່ານບໍ່ຕ້ອງການມັນ.)

ທ່ານສາມາດສ້າງ "ແຕ່ເທິງລົງລຸ່ມ" ໂດຍການເລີ່ມສ້າງຈາກ component ໃຫ້ສູງຂຶ້ນໃນລຳດັບຊັ້ນ (ເຊັ່ນ: `FilterableProductTable`) ຫຼື "ແຕ່ລຸ່ມຂຶ້ນເທິງ" ໂດຍການເຮັດວຽກຈາກ component ທີ່ຢູ່ທາງລຸ່ມ (ເຊັ່ນ: `ProductRow`). ໃນຕົວຢ່າງທີ່ງ່າຍກວ່າ, ໂດຍປົກະຕິແລ້ວການເຮັດແບບແຕ່ເທິງລົງລຸ່ມຈະງ່າຍກວ່າ ແລະ ສຳລັບ project ຂະໜາດໃຫຍ່, ການເຮັດແບບແຕ່ລຸ່ມຂຶ້ນເທິງຈະງ່າຍກວ່າ.

<Sandpack>

```jsx src/App.js
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 10px;
}
td {
  padding: 2px;
  padding-right: 40px;
}
```

</Sandpack>

(ຖ້າ code ນີ້ມັນເບິ່ງຄືຍາກ, ໄປເບິ່ງ [ເລີ່ມຕົ້ນຢ່າງໄວ](/learn/) ກ່ອນ!)

ຫຼັງຈາກການສ້າງ component ຂອງທ່ານ, ທ່ານຈະມີ library ຂອງ reusable component ທີ່ render data model ຂອງທ່ານ. ເພາະວ່ານີ້ເປັນ static app, component ຈະ return ແຕ່ JSX ເທົ່ານັ້ນ. Component ທີ່ຢູທາງເທິງສຸດຂອງລຳດັບຊັ້ນ (`FilterableProductTable`) ຈະໃຊ້ data model ຜ່ານ props. ນີ້ເອີ້ນວ່າ _one-way data flow_ ເພາະວ່າຂໍ້ມູນຖືກສົ່ງຈາກ component ຊັ້ນເທິງສຸດ ຫາ ຊັ້ນລຸ່ມສຸດຂອງໂຄ່ງສ້າງ.

<Pitfall>

ໃນຈຸດນີ້, ທ່ານບໍ່ຄວນໃຊ້ຄ່າໃດໆຂອງ state ເທື່ອ. ນັ້ນແມ່ນສຳລັບຂັ້ນຕອນຕໍ່ໄປ!

</Pitfall>

## ຂັ້ນຕອນທີ 3: ຄົ້ນຫາສິ່ງທີ່ນ້ອຍທີ່ສຸດແຕ່ສະແດງ UI state ຢ່າງສົມບູນ {/*step-3-find-the-minimal-but-complete-representation-of-ui-state*/}

ໃນການເຮັດໃຫ້ UI ສາມາດໂຕ້ຕອບໄດ້, ທ່ານຕ້ອງອະນຸຍາດໃຫ້ user ສາມາດປ່ຽນແປງ data model ພື້ນຖານໄດ້. ທ່ານຈະໄດ້ໃຊ້ *state* ສຳລັບສິ່ງນີ້.

ຄິດວ່າ state ເປັນຊຸດຂໍ້ມູນການປ່ຽນແປງຂັ້ນຕໍ່າທີ່ແອັບຂອງທ່ານຈຳເປັນຕ້ອງຈື່. ຫຼັກການສຳຄັນຂອງການຈັດໂຄ່ງສ້າງ state ແມ່ນຮັກສາໃຫ້ມັນ [DRY (ຢ່າເຮັດຊໍ້າ).](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) ພິຈາລະນາການສະແດງ state ຂັ້ນຕໍ່າສຸດຂອງແອັບພິເຄຊັ່ນຕ້ອງການ ແລະ ຄຳນວນທຸກຢ່າງຕາມຄວາມຕ້ອງການ. ຕົວຢ່າງ, ຖ້າທ່ານເຮັດ shopping list, ທ່ານສາມາດເກັບ item ເຂົ້າເປັນຮູບແບບ array ໃນ state. ຖ້າທ່ານຕ້ອງການສະແດງຈຳນວນ item ໃນ list, ບໍ່ຕ້ອງເກັບຕົວເລກເປັນ item ໃໝ່ໃນ state, ໃຫ້ອ່ານຄວາມຍາວຂອງ array ແທນ.

ຕອນນີ້ໃຫ້ຄິດຫາຂໍ້ມູນທັງໝົດໃນແອັບພິເຄຊັ່ນຕົວຢ່າງນີ້:

1. ລາຍການຕົ້ນສະບັບຂອງສິນຄ້າ 
2. ຂໍ້ຄວາມຄົ້ນຫາທີ່ user ປ້ອນ
3. ຄ່າຂອງ checkbox
4. ລາຍການຂອງສິນຄ້າທີ່ຜ່ານການ filter ແລ້ວ

ຂໍ້ໃດຄື state? ລະບຸສິ່ງທີ່ບໍ່ແມ່ນ:

* ມັນ **ຍັງຄົງບໍ່ປ່ຽນແປງ** ເມື່ອເວລາຜ່ານໄປ ຫຼື ບໍ່? ຖ້າແມ່ນ, ມັນບໍ່ແມ່ນ state.
* ມັນ **ຮັບຄ່າມາຈາກ parent** ຜ່ານ props ຫຼື ບໍ່? ຖ້າແມ່ນ, ມັນບໍ່ແມ່ນ state.
* **ທ່ານສາມາດຄຳນວນມັນໄດ້** ອີງຕາມ state ຫຼື props ປັດຈຸບັນໃນ component ຂອງທ່ານແມ່ນບໍ່? ຖ້າແມ່ນ, ມັນບໍ່ແມ່ນ state *ແນ່ນອນ*!

ແມ່ນຫຍັງທີ່ນ່າຈະເປັນ state ໄດ້.

ມາເບິ່ງກັນໃນແຕ່ລະຂໍ້ອີກຄັ້ງ:

1. ລາຍການດັ່ງເດີ່ມຂອງ products ແມ່ນ **ຖືກສົ່ງເຂົ້າມາຜ່ານ props, ສະນັ້ນ ມັນຈິງບໍ່ແມ່ນ state.** 
2. ຂໍ້ຄວາມຄົ້ນຫາເບິ່ງຄືຈະເປັນ state ໄດ້ເນື່ອງຈາກມັນມີການປ່ຽນແປງຕະຫຼອດເວລາ ແລະ ບໍ່ສາມາດຄຳນວນໄດ້ຈາກສິ່ງໃດ.
3. ຄ່າຂອງ checkbox ເບິ່ງຄືຈະເປັນ state ໄດ້ເນື່ອງຈາກມັນມີການປ່ຽນແປງຕະຫຼອດເວລາ ແລະ ບໍ່ສາມາດຄຳນວນໄດ້ຈາກສິ່ງໃດ.
4. ລາຍການຂອງ products ທີ filter ແລ້ວ **ບໍ່ແມ່ນ state ເພາະວ່າມັນສາມາດຄຳນວນໄດ້** ໂດຍນຳລາຍການ products ດັ່ງເດີມມາ filter ຕາມຂໍ້ຄວາມຄົ້ນຫາ ແລະ ຄ່າຂອງ checkbox.

ນີ້ໝາຍຄວາມວ່າ ຂໍ້ຄວາມຄົ້ນຫາ ແລະ ຄ່າຂອງ checkbox ແມ່ນ state! ເກັ່ງຫຼາຍ!

<DeepDive>

#### Props ທຽບກັບ State {/*props-vs-state*/}

ມີສອງປະເພດ "model" data ໃນ React ຄື: props ແລະ stae. ສອງສິ່ງນີ້ແມ່ນມີຄວາມແຕກຕ່າງກັນຫຼາຍ:

* [**Props** ເປັນເໝືອນ arguments ທີ່ທ່ານສົ່ງຜ່ານ](/learn/passing-props-to-a-component) ໄປຍັງ function. ມັນເຮັດໃຫ້ parent component ສາມາດສົ່ງ data ໄປຍັງ child component ແລະ ປັບແຕ່ງລັກສະນະທີ່ສະແດງ. ຕົວຢ່າງ, `Form` ສາມາດສົ່ງ prop ທີ່ເປັນຄ່າ `color` ໄປຍັງ `Button` ໄດ້.
* [**State** ແມ່ນ memory ຂອງ component.](/learn/state-a-components-memory) ມັນເຮັດໃຫ້ component ສາມາດຕິດຕາມຂໍ້ມູນບາງຢ່າງ ແລະ ປ່ຽນແປງຕາມການໂຕ້ຕອບໄດ້. ຕົວຢ່າງ, `Button` ອາດຈະຕິດຕາມ state ຂອງ `isHovered`.

Props ແລະ state ແມ່ນແຕກຕ່າງກັນ, ແຕ່ພວກເຂົາເຮັດວຽກຮ່ວມກັນ. parent component ມັກຈະເກັບຂໍ້ມູນບາງຢ່າງໄວ້ໃນ state (ສະນັ້ນ ຈິງສາມາດປ່ຽນແປງມັນໄດ້), ແລະ *ສົ່ງຕໍ່* ຫາ child component ເພື່ອເປັນ props. ບໍ່ເປັນຢ່າງຫາກຄວາມແຕກຕ່າງຍັງເບິ່ງຄືຊິສັບສົນໃນການອ່ານເທື່ອທຳອິດ. ລອງໃຊ້ເວລາຝຶກມັນນ້ອຍໜຶ່ງແລ້ວທ່ານຈະຕິດໃຈ!

</DeepDive>

## ຂັ້ນຕອນທີ 4: ກຳນົດວ່າ state ຂອງທ່ານຄວນຈະຢູ່ບ່ອນໃດ {/*step-4-identify-where-your-state-should-live*/}

ຫຼັງຈາກກຳນົດ state ນ້ອຍສຸດຂອງ ແອັບຯ, ທ່ານຈະຕ້ອງກຳນົດວ່າ component ໃດມີສ່ວນໃນການປ່ຽນແປງຂອງ state , ຫຼື *ເປັນເຈົ້າຂອງ* state. ຈືໄວ້ວ່າ: React ໃຊ້ one-way data flow, ສົ່ງຂໍ້ມູນຫາ component ເປັນລຳດັບຊັ້ນ ຈາກ parent ຫາ child component. ມັນອາດຈະບໍ່ຊັດເຈນທີ່ວ່າ component ໃດຄວນເປັນເຈົ້າຂອງ state. ນີ້ສາມາດເປັນຄວາມທ້າທາຍຖ້າມັນແມ່ນແນວຄວາມຄິດໃໝ່ຂອງທ່ານ, ແຕ່ທ່ານຈະຄົ້ນພົບຄຳຕອບໂດຍການເຮັດຕາມເທື່ອລະຂັ້ນຕອນນີ້!

ສຳລັບແຕ່ລະ state ໃນແອັບພິເຄຊັ່ນຂອງທ່ານ:

1. ກຳນົດ *ແຕ່ລະ* component ທີ່ renders ບາງຢ່າງອີງຕາມ state.
2. ຄົ້ນຫາ parent component ທີ່ໃກ້ຄຽງທີ່ສຸດ --component ທີ່ຢູ່ເທິງສຸດຂອງລຳດັບຊັ້ນ.
3. ຕັດສິນໃຈວ່າ state ຄວນຈະຢູ່ບ່ອນໃດແນ່:
    1. ສ່ວນຫຼາຍ, ທ່ານສາມາດໃສ່ state ລົງໃນ parent ທົ່ວໄປໄດ້ໂດຍກົງ.
    2. ທ່ານຍັງສາມາດໃສ່ state ລົງໃນບາງ component ເໜືອ parent ທົ່ວໄປ.
    3. ຖ້າທ່ານບໍ່ສາມາດຫາ component ທີ່ເໝາະສົມໃນການເປັນເຈົ້າຂອງ state ໄດ້, ໃຫ້ສ້າງ component ໃໝ່ສຳລັບການຖື state ໄວ້ພຽງຢ່າງດຽວ ແລະ ເພີ່ມມັນໄວ້ໃນບ່ອນໃດໜຶ່ງໃນລຳດັບຊັ້ນເໜືອ parent component ທົ່ວໄປ.

ໃນຂັ້ນຕອນກ່ອນໜ້ານີ້, ທ່ານເຫັນ 2 state ໃນແອັບພິເຄຊັ່ນນີ້: input ຂໍ້ຄວາມຄົ້ນຫາ ແລະ ຄ່າຂອງ checkbox. ໃນຕົວຢ່າງນີ້, ພວກມັນຈະສະແດງພ້ອມກັນ, ດັ່ງນັ້ນມັນຈິງສົມຄວນທີ່ຈະເອົາໄປໄວ້ບ່ອນດຽວກັນ.

ບາດນີ້ມາປັບໃສ່ວິທີການຂອງພວກເຮົາ: 

1. **ກຳນົດ component ທີ່ໃຊ້ state:**
    * `ProductTable` ຕ້ອງການ filter ລາຍການ product ອີງຕາມ state (ຂໍ້ຄວາມຄົ້ນຫາ ແລະ ຄ່າຂອງ checkbox). 
    * `SearchBar` ຕ້ອງການສະແດງ state ນັ້ນ (ຂໍ້ຄວາມຄົ້ນຫາ ແລະ ຄ່າຂອງ checkbox).
1. **ຄົ້ນຫາ common parent ຂອງພວກເຂົາ:** parent component ທຳອິດທີ່ສອງ component ໃຊ້ຮ່ວມກັນແມ່ນ `FilterableProductTable`.
2. **ຕັດສິນໃຈວ່າ state ຈະຢູ່ໃສ**: ພວກເຮົາຈະຮັກສາ filter text ແລະ checked ເປັນ state ໃນ `FilterableProductTable`.

ສະນັ້ນຄ່າຂອງ state ຈະຢູ່ໃນ `FilterableProductTable`. 

ເພີ່ມ state ໃສ່ໃນ component ດ້ວຍ [`useState()` Hook.](/reference/react/useState) Hooks ແມ່ນ function ພິເສດທີ່ທ່ານສາມາດ "ຂໍເຂົ້າໄປໃນ" React. ເພີ່ມຕົວແປ state 2 ອັນ ໃນດ້ານເທິງຂອງ `FilterableProductTable` ແລະ ລະບຸ state ເລີ່ມຕົ້ນ:

```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);  
```

ຈາກນັ້ນ, ສົ່ງ `filterText` ແລະ `inStockOnly` ໄປຍັງ `ProductTable` ແລະ `SearchBar` ເປັນ props:

```js
<div>
  <SearchBar 
    filterText={filterText} 
    inStockOnly={inStockOnly} />
  <ProductTable 
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```

ທ່ານສາມາດເລີ່ມເບິ່ງໄດ້ວ່າແອັບພິເຄຊັ່ນຂອງທ່ານເປັນແນວໃດ. ແກ້ໄຂຄ່າເລີ່ມຕົ້ນຂອງ `filterText` ຈາກ `useState('')` ໄປເປັນ `useState('fruit')` ໃນ sandbox code ດ້ານລຸ່ມ. ທ່ານຈະເຫັນວ່າ input ຂໍ້ຄວາມຄົ້ນຫາ ແລະ ຕາຕະລາງ ແມ່ນມີການອັບເດດ:

<Sandpack>

```jsx src/App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 5px;
}
td {
  padding: 2px;
}
```

</Sandpack>

ສັງເກດວ່າການແກ້ໄຂຟອມຍັງບໍ່ທັນໄດ້ຜົນເທື່ອ. ມັນມີ console error ໃນ sandbox ຂ້າງເທິງເພື່ອອະທິບາຍສາເຫດ:

<ConsoleBlock level="error">

You provided a \`value\` prop to a form field without an \`onChange\` handler. This will render a read-only field.

</ConsoleBlock>

ໃນ sandbox ດ້ານເທິງ, `ProductTable` ແລະ `SearchBar` ອ່ານ props `filterText` ແລະ `inStockOnly` ເພື່ອ render ຕາຕະລາງ, input ແລະ checkbox. ຕົວຢ່າງ, ນີ້ແມ່ນວິທີທີ່ `SearchBar `ຕື່ມຄ່າ input:

```js {1,6}
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
```

ເຖິງຢ່າງໃດກໍຕາມ, ທ່ານຍັງບໍ່ທັນໄດ້ເພີ່ມ code ໃດໆເພື່ອຕອບສະໜອງຕໍ່ການກະທຳຂອງ user ເຊັ່ນ: ການພີມ. ນີ້ຈະເປັນຂັ້ນຕອນສຸດທ້າຍຂອງທ່ານ.


## Step 5: ເພີ່ມການໄຫຂໍ້ມູນແບບ inverse {/*step-5-add-inverse-data-flow*/}

ຕອນນີ້ແອັບຂອງທ່ານສະແດງຜົນຢ່າງຖືກຕ້ອງດ້ວຍ props ແລະ state ໄຫຼລົງມາຕາມລຳດັບຊັ້ນ. ແຕ່ຫາກຕ້ອງການປ່ຽນ state ໃຫ້ອີງຕາມ user input, ທ່ານຈະຕ້ອງສະໜັບສະໜູນການໄຫຼຂໍ້ມູນໄປວິທີອື່ນ: form component ທີ່ຢູ່ເລິກລົງໄປໃນລຳດັບຊັ້ນຈຳເປັນຕ້ອງໄດ້ອັບເດດ state ໃນ `FilterableProductTable`.

React ເຮັດໃຫ້ການໄຫຼຂໍ້ມູນນີ້ຊັດເຈນ, ແຕ່ຕ້ອງອາໄສການພິມທີ່ຫຼາຍກວ່າ two-way data binding ນ້ອຍໜຶ່ງ. ຖ້າທ່ານພະຍາຍາມພິມ ຫຼື ໝາຍຕິກໃສ່ກ່ອງໃນຕົວຢ່າງດ້ານເທິງ, ທ່ານຈະເຫັນວ່າ React ບໍ່ໄດ້ສົນໃຈຂໍ້ຄວາມທີ່ທ່ານປ້ອນ. ນີ້ແມ່ນຄວາມຕັ້ງໃຈ, ການຂຽນ `<input value={filterText} />`, ທ່ານໄດ້ຕັ້ງ prop `value` ຂອງ `input` ທີໃຫ້ເທົ່າກັບຄ່າ `filterText` ທີ່ສົ່ງ state ຜ່ານ `FilterableProductTable`ຕະຫຼອດ. ນັບແຕ່ `filterText` staet ຍັງບໍ່ຖືກຕັ້ງ, ຄ່າ input ແມ່ນບໍ່ມີການປ່ຽນແປງ.

ທ່ານຕ້ອງການເຮັດ ໃຫ້ຕອນໃດທີ່ user ປ່ຽນແປງ form input, state ຈະອັບເດດເພື່ອສະແດງການປ່ຽນແປງເຫຼົ່ານັ້ນ. state ເປັນຂອງ `FilterableProductTable`, ດັ່ງນັ້ນ ຈິງມີພຽງມັນເທົ່ານັ້ນທີ່ສາມາດເອີ້ນໃຊ້ `setFilterText` ແລະ `setInStockOnly`. ເພື່ອເຮັດໃຫ້ `SearchBar` ອັບເດດ state ຂອງ `FilterableProductTable`, ທ່ານຕ້ອງໄດ້ສົ່ງ function ເຫຼົ່ານີ້ລົງໄປ `SearchBar`:

```js {2,3,10,11}
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

ພາຍໃນ `SearchBar`, ທ່ານຈະເພີ່ມ `onChange` event handler ແລະ ຕັ້ງຄ່າ parent state ຈາກຕົວຈັດການເຫຼົ່ານີ້:

```js {4,5,13,19}
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
```

ຕອນນີ້ແອັບພິເຄຊັ່ນເຮັດວຽກໄດ້ຢ່າງສົມບູນແບບ!

<Sandpack>

```jsx src/App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding: 4px;
}
td {
  padding: 2px;
}
```

</Sandpack>

ທ່ານສາມາດຮຽນຮູ້ທັງໝົດກ່ຽວກັບການ handling events ແລະ ການອັບເດດ state ໄດ້ໃນຫົວຂໍ້ [ເພີ່ມການໂຕ້ຕອບ](/learn/adding-interactivity).

## ໄປຕໍ່ໃສຈາກນີ້ {/*where-to-go-from-here*/}

ນີ້ເປັນການແນະນຳສັ້ນໆ ກ່ຽວກັບວິທີຄິດກ່ຽວກັບການສ້າງ component ແລະ ແອັບພິເຄຊັ່ນດ້ວຍ React. ທ່ານສາມາດ [ສ້າງ project React](/learn/installation)ດຽວນີ້ ຫຼື [ລົງເລິກກ່ຽວກັບ syntax ທັງໝົດ](/learn/describing-the-ui) ທີ່ໃຊ້ໃນບົດຮຽນນີ້.
