---
title: React Developer Tools
---

<Intro>

ໃຊ້ React Developer Tools ເພື່ອ ກວດ React [components](/learn/your-first-component), ແກ້ໄຂ [props](/learn/passing-props-to-a-component) ແລະ [state](/learn/state-a-components-memory), ແລະ ລະບຸບັນຫາດ້ານປະສິດທິພາບ.


</Intro>

<YouWillLearn>

* ວິທີຕິດຕັ້ງ React Developer Tools

</YouWillLearn>

## Browser extension {/*browser-extension*/}

ວິທີການທີ່ງ່າຍທີ່ສຸດໃນການ debug ເວັບໄຊທີ່ເຮັດດ້ວຍ React ແມ່ນຕິດຕັ້ງ React Developer Tools browser extension. ໃຊ້ໄດ້ກັບ browser ທີ່ນິຍົມກັນຫຼາຍໂຕ:

* [ຕິດຕັ້ງສຳລັບ **Chrome**](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [ຕິດຕັ້ງສຳລັບ **Firefox**](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
* [ຕິດຕັ້ງສຳລັບ **Edge**](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)

ປັດຈຸບັນ, ຖ້າທ່ານເຂົ້າເວັບໄຊ **built with React,** ທ່ານຈະເຫັນ _Components_ ແລະ _Profiler_ panels.

![React Developer Tools extension](/images/docs/react-devtools-extension.png)

### Safari ແລະ browser ອື່ນ {/*safari-and-other-browsers*/}
ສຳລັບ browser ອື່ນ (ຕົວຢ່າງ, Safari), ຕິດຕັ້ງ [`react-devtools`](https://www.npmjs.com/package/react-devtools) npm package:
```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

ຈາກນັ້ນເປີດ developer tools ຜ່ານ terminal:
```bash
react-devtools
```

ຕໍ່ໄປແມ່ນເຊື່ອມຕໍ່ເວັບໄຊໂດຍການເພີ່ມ `<script>` tag ໃນບ່ອນເລີ່ມຕົ້ນ `<head>` ຂອງເວັບໄຊທ່ານ:
```html {3}
<html>
  <head>
    <script src="http://localhost:8097"></script>
```

ໂຫຼດເວັບໄຊຂອງທ່ານຄືນໃໝ່ໃນ browser ຕອນນີ້ ເພື່ອເບິ່ງໃນ developer tools.

![React Developer Tools standalone](/images/docs/react-devtools-standalone.png)

## ມືຖື (React Native) {/*mobile-react-native*/}
React Developer Tools ສາມາດໃຊ້ກວດແອັບຯທີ່ສ້າງດ້ວຍ [React Native](https://reactnative.dev/) ໄດ້ຄືກັນ.

ວິທີການທີ່ງ່າຍທີ່ສຸດແມ່ນໃຊ້ React Developer Tools ທີ່ຕິດຕັ້ງມັນໃນທົ່ວເຄື່ອງທ່ານ:
```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

ຈາກນັ້ນເປີດ developer tools ຜ່ານ terminal.
```bash
react-devtools
```

ມັນຄວນເຊື່ອມຕໍ່ກັບແອັບ React Native ໃນເຄື່ອງທີ່ກຳລັງເຮັດວຽກຢູ່.

> ລອງໂຫຼດແອັບໃໝ່ຖ້າ developer tools ບໍ່ມີການເຊື່ອມຕໍ່ໃນໄລຍະເວລາຕໍ່ມາ. 

[ຮຽນຮູ້ເພີ່ມເຕີມກ່ຽວກັບ debug ໃນ React Native.](https://reactnative.dev/docs/debugging)
