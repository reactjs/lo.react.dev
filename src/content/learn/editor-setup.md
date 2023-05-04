---
title: ການຕັ້ງຄ່າ Editor
---

<Intro>

ການຕັ້ງຄ່າ editor ທີ່ເໝາະສົມສາມາດເຮັດໃຫ້ code ອ່ານໄດ້ຊັດເຈນຂຶ້ນ ແລະ ຂຽນໄດ້ໄວຂຶ້ນ. ມັນສາມາດຊ່ວຍທ່ານໃຫ້ສາມາດຫາ bugs ໄດ້ໃນຂະນະກຳລັງຂຽນມັນ! ຖ້ານີ້ແມ່ນຄັ້ງທຳອິດຂອງທ່ານໃນການຕັ້ງຄ່າ editor ຫຼື ທ່ານກຳລັງຫາວິທີປັບ editor ປັດຈຸບັນຂອງທ່ານ, ພວກເຮົາມີຄຳແນະນຳສອງສາມຂໍ້.

</Intro>

<YouWillLearn>

* Editor ທີ່ໄດ້ຮັບຄວາມນິຍົມສຸດແມ່ນໂຕໃດ
* ວິທີ format code ຂອງທ່ານໂດຍອັດຕະໂນມັດ

</YouWillLearn>

## Editor ຂອງທ່ານ {/*your-editor*/}

[VS Code](https://code.visualstudio.com/) ເປັນໜຶ່ງໃນ editor ທີ່ໄດ້ຮັບຄວາມນິຍົມສູງສຸດໃນປັດຈຸບັນ. ມັນມີຕະຫຼາດຂອງ extension ທີ່ໃຫຍ່ ແລະ ສາມາດເຮັດວຽກຮ່ວມກັນໄດ້ດີກັບບໍລິການທີ່ໄດ້ຮັບຄວາມນິຍົມຢ່າງເຊັນ Github. ຄຸນສົມບັດສ່ວນໃຫຍ່ທີ່ສະແດງດ້ານລຸ່ມແມ່ນສາມາດເພີ່ມລົງໃນ VS Code ໃນຮູບແບບ extension ໄດ້ຄືກັນ, ເຮັດໃຫ້ມັນສາມາດປັບແຕ່ງໄດ້ສູງສຸດ!

Editor ອື່ນທີ່ໄດ້ຮັບຄວາມນິຍົມໃນ React community ປະກອບມີ:

* [WebStorm](https://www.jetbrains.com/webstorm/) ເປັນ integrated development environment ທີ່ອອກແບບມາສຳລັບ JavaScript ໂດຍສະເພາະ.
* [Sublime Text](https://www.sublimetext.com/) ແມ່ນ support ສຳລັບ JSX ແລະ TypeScript, [syntax highlighting](https://stackoverflow.com/a/70960574/458193) ແລະ autocomplete ໃນໂຕ.
* [Vim](https://www.vim.org/) ແມ່ນ text editor ທີ່ສາມາດປັບແຕ່ງໄດ້ສູງ ຊື່ງສ້າງຂຶ້ນມາສຳລັບການສ້າງ ແລະ ແກ້ໄຂ text ທີ່ມີປະສິດທິພາບຫຼາຍ. ມັນລວມມີ "vi" ກັບລະບົບ UNIX ເປັນສ່ວນໃຫຍ່ ແລະ ກັບ Apple OS X.

## ແນະນຳຄຸນສົມບັດຂອງ text editor {/*recommended-text-editor-features*/}

ບາງ editor ມາພ້ອມກັບຄຸນສົມບັດເຫຼົ່ານີ້ໃນໂຕ, ແຕ່ໂຕອື່ນອາດຈະຕ້ອງໄດ້ລົງ extension. ກວດສອບເບິ່ງສິ່ງທີ່ editor ທີ່ທ່ານເລືອກ support ຫຍັງແນ່!
Some editors come with these features built in, but others might require adding an extension. Check to see what support your editor of choice provides to be sure!

### Linting {/*linting*/}

Code linters ຄົ້ນຫາບັນຫາໃນ code ຂອງທ່ານໃນຂະນະທີ່ທ່ານກຳລັງຂຽນ, ຊ່ວຍທ່ານແກ້ໄຂໄດ້ແຕ່ເນີ້ນໆ. [ESLint](https://eslint.org/) ແມ່ນໄດ້ຮັບຄວາມນິຍົມ, ເປັນ open source linter ສຳລັບ JavaScript. 

* [ຕິດຕັ້ງ ESLintr ພ້ອມກັບຄຳແນະນຳການຕັ້ງຄ່າສຳລັບ React](https://www.npmjs.com/package/eslint-config-react-app) (ໃຫ້ແນ່ໃຈວ່າທ່ານໄດ້ [ຕິດຕັ້ງ Node ແລ້ວ!](https://nodejs.org/en/download/current/))
* [Integrate ESLint ໃນ VSCode ກັບ extension ທາງການ](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

**ໃຫ້ໝັ້ນໃຈວ່າທ່ານໄດ້ເປີດ[`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) rules ທັງໝົດສຳລັບ project ທ່ານ.** ພວກມັນມີຄວາມສຳຄັນ ແລະ ກວດຫາ bug ໄດ້ແຕ່ເນີ້ນໆ. [`eslint-config-react-app`](https://www.npmjs.com/package/eslint-config-react-app) ທີ່ແນະນຳແມ່ນໄດ້ລວມໄວ້ແລ້ວ.

### Formatting {/*formatting*/}

ສິ່ງສຸດທ້າຍທີ່ທ່ານຕ້ອງເຮັດເມື່ອ share code ຮ່ວມກັບຜູ້ມີສ່ວນຮ່ວມອື່ນໆແມ່ນໃຫ້ລົມກັນກ່ຽວກັບ [tabs vs spaces](https://www.google.com/search?q=tabs+vs+spaces)! ໂຊກດີທີ່, [Prettier](https://prettier.io/) ຈະ clean up code ຂອງທ່ານ ໂດຍການ reformat ມັນເພື່ອໃຫ້ສອດຄ່ອງກັບ ກົດຂອງການຕັ້ງຄ່າ. ແລ່ນ Prettier, tab ທັງໝົດຂອງທ່ານຈະຖືກປ່ຽນເປັນ space ແລະ ການຍະຫ່າງຂອງທ່ານ, ເຄື່ອງໝາຍຂີດ ແລະ ອື່ນໆ ຈະຖືກປ່ຽນແປງໃຫ້ສອດຄ່ອງກັບ ກົດຂອງການຕັ້ງຄ່າ. ໃນການຕັ້ງຄ່າທີ່ເໝາະສົມທີ່ສຸດ, Prettier ຈະແລ່ນຟາຍຂອງທ່ານເມື່ອທ່ານບັນທຶກ ແລະ ທຳການແກ້ໄຂເຫຼົ່ານີ້ໃຫ້ທ່ານໄດ້ຢ່າງວ່ອງໄວ.

ທ່ານສາມາດຕິດຕັ້ງ [Prettier extension ໃນ VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) ໂດຍການປະຕິບັດຕາມຂັ້ນຕອນດັ່ງນີ້:

1. ເປີດ VS Code
2. ໃຊ້ Quick Open (ກົດ Ctrl/Cmd+P)
3. Paste ນີ້ `ext install esbenp.prettier-vscode`
4. ກົດ Enter

#### Formatting ຕອນບັນທຶກ {/*formatting-on-save*/}

ຕາມຫຼັການແລ້ວ, ທ່ານຄວນຈະ format code ຂອງທ່ານທຸກໆຄັ້ງຕອນບັນທຶກ. VS Code ມີການຕັ້ງຄ່າສຳລັບສິ່ງນີ້!

1. ໃນ VS Code, ກົດ `CTRL/CMD + SHIFT + P`.
2. ພິມ "settings"
3. ກົດ Enter
4. ໃນ search bar, ພິມ "format on save"
5. ໃຫ້ແນ່ໃຈວ່າຕົວເລືອກ "format on save" ຖືກຕິກແລ້ວ!

> ຖ້າຄ່າ ESLint ຂອງທ່ານມີກ format rule, ພວກມັນອາດຈະມີບັນຫາກັບ Prettier. ພວກເຮົາແນະນຳໃຫ້ທ່ານປິດ format rule ທັງໝົດໃນການຕັ້ງຄ່າ ESLint preset ໂດຍໃຊ້ [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) ດັ່ງນັ້ນ ESLint ຈຶ່ງຈະໃຊ້ສຳລັບຈັບຫາຂໍ້ຜິດພາດເຊີງຕັກກະ*ເທົ່ານັ້ນ*. ຖ້າທ່ານຕ້ອງການບັງຄັບໃຫ້ format file ກ່ອນ pull request ຈະຖືກ merged, ໃຊ້[`prettier --check`](https://prettier.io/docs/en/cli.html#--check) ສຳລັບ continuous integration ຂອງທ່ານ.
