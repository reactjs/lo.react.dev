---
title: ເລີ່ມ Project React ໃໝ່
---

<Intro>

ຖ້າທ່ານຕ້ອງການສ້າງແອັບ ຫຼື ເວັບໄຊໃໝ່ທັງໝົດດ້ວຍ React, ພວກເຮົາຂໍແນະນຳໃຫ້ເລືອກໜຶ່ງໃນ Framework ທີ່ຂັບເຄື່ອນດ້ວຍ React ທີ່ໄດ້ຮັບຄວາມນິຍົມໃນຊຸມຊົມ. Framework ສະໜອງຄຸນສົມບັດທີ່ຫຼາຍແອັບ ແລະ ເວັບຕ້ອງການທີ່ສຸດ, ລວມມີ routing, data fetching ແລະ generate HTML.

</Intro>

<Note>

**ທ່ານຕ້ອງໄດ້ຕິດຕັ້ງ [Node.js](https://nodejs.org/en/) ສຳລັບ local development.** ທ່ານ *ຍັງສາມາດ* ເລືອກໃຊ້ Node.js ໃນ production, ແຕ່ທ່ານບໍ່ຈຳເປັນເລືອກ. Framework React ສ່ວນຫຼາຍຮອງຮັບການ export ເປັນ static HTML/CSS/JS ໂຟນເດີ.

</Note>

## Framework React ລະດັບ Production {/*production-grade-react-frameworks*/}

### Next.js {/*nextjs*/}

[Next.js](https://nextjs.org/) ເປັນ full-stack framework React.** ມັນໃຊ້ປະໂຫຍດໄດ້ຫຼາຍ ແລະ ໃຫ້ທ່ານສ້າງແອັບ React ໄດ້ທຸກຂະໜາດ ຕັ້ງແຕ່ static blog ໄປຈົນເຖິງແອັບພິເຄຊັ່ນທີ່ມີຄວາມຊັບຊ້ອນ. ເພື່ອສ້າງ Project Next.js ໃໝ່ມ ແລ່ນນີ້ໃນ terminal:

<TerminalBlock>
npx create-next-app@latest
</TerminalBlock>

<<<<<<< HEAD
ຖ້າທ່ານຍັງໃໝ່ສຳລັບ Next.js, ເບິ່ງ [ຄູ່ມື Next.js .](https://nextjs.org/learn/foundations/about-nextjs)
=======
If you're new to Next.js, check out the [learn Next.js course.](https://nextjs.org/learn)
>>>>>>> af54fc873819892f6050340df236f33a18ba5fb8

<<<<<<< HEAD
Next.js ດູແລໂດຍ [Vercel](https://vercel.com/). ທ່ານສາມາດ [deploy Next.js app](https://nextjs.org/docs/deployment) ໃສ່ໃນ Node.js ຫຼື   serverless hosting, ຫຼື server ຂອງທ່ານເອງ. [Fully static Next.js apps](https://nextjs.org/docs/advanced-features/static-html-export) ສາມາດ deploy ໃສ່ໃນ static hosting ໃດກໍ່ໄດ້.
=======
Next.js is maintained by [Vercel](https://vercel.com/). You can [deploy a Next.js app](https://nextjs.org/docs/app/building-your-application/deploying) to any Node.js or serverless hosting, or to your own server. Next.js also supports a [static export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) which doesn't require a server.
>>>>>>> 68f417a600c7d7b8c4131e39f8a843a856ae3909

### Remix {/*remix*/}

**[Remix](https://remix.run/) ເປັນ full-stack framework React ພ້ອມ nested routing.** ມັນໃຫ້ທ່ານແຕກແອັບຂອງທ່ານເປັນສ່ວນນ້ອຍໆທີ່ສາມາໂຫຼດຂໍ້ມູນເປັນ parallel ແລະ refresh ໃນການຕອບສະໜອງຕໍ່ກັບການກະທຳຂອງຜູ້ໃຊ້. ເພື່ອສ້າງ Project Remix ໃໝ່, ແລ່ນ:

<TerminalBlock>
npx create-remix
</TerminalBlock>

ຖ້າທ່ານຍັງໃໝ່ສຳລັບ Remix, ເບິ່ງ Remix [ຄູ່ມືບົດຄວາມ](https://remix.run/docs/en/main/tutorials/blog) (ສັ້ນ) ແລະ [app tutorial](https://remix.run/docs/en/main/tutorials/jokes) (ຍາວ).

Remix ດູແລໂດຍ [Shopify](https://www.shopify.com/). ເມື່ອທ່ານສ້າງ Project Remix, ທ່ານຕ້ອງໄດ້ [ເລືອກບ່ອນ deploy ](https://remix.run/docs/en/main/guides/deployment). ທ່ານສາມາດ deploy ແອັບ Remix ໄດ້ໃນ Node.js ຫຼື serverless hosting ໃດກໍ່ໄດ້ໂດຍການໃຊ້ ຫຼື ຂຽນ [adapter](https://remix.run/docs/en/main/other-api/adapter).

### Gatsby {/*gatsby*/}

**[Gatsby](https://www.gatsbyjs.com/) ເປັນ Framework React ສຳລັບເວັບໄຊທີ່ຮອງຮັບ CMS ທີ່ວ່ອງໄວ.** ມັນມີ ecosystem ຂອງ plugin ທີ່ຫຼາກຫຼາຍ ແລະ GraphQL data layer ຂອງມັນເປັນໃຫ້ງານໃນການ integrate ກັບ content, APIs, ແລະ services ເຂົ້າໄປໃນໜຶ່ງເວັບໄຊ. ເພື່ອສ້າງ Project Gatsby ໃໝ່, ແລ່ນ:

<TerminalBlock>
npx create-gatsby
</TerminalBlock>

ຖ້າທ່ານຍັງໃໝ່ສຳລັບ Gatsby, ເບິ່ງ [ຄູ່ມື Gatsby.](https://www.gatsbyjs.com/docs/tutorial/)

Gatsby ດູແລໂດຍ [Netlify](https://www.netlify.com/). ທ່ານສາມາດ [deploy static Gatsby site ໂດຍສົມບູນ](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting) ໃສ່ໃນ  static hosting ໃດກໍ່ໄດ້. ຖ້າທ່ານຕ້ອງການໃຊ້ແຕ່ຄຸນສົມບັດຂອງ server ພຽງແຕ່ຢ່າງດຽວ, ໝັ້ນໃຈວ່າຜູ້ໃຫ້ບໍລິການ hosting ຂອງທ່ານຮອງຮັບມັນສຳລັບ Gatsby.

### Expo (ສຳລັບແອັບເທິງມືຖື) {/*expo*/}

**[Expo](https://expo.dev/) ເປັນ Framework React ທີ່ໃຫ້ທ່ານສ້າງແອັບ Android, iOS ແລະ ເວັບແອັບດ້ວຍ Native UI ແທ້ໆ.** ມັນມີ SDK ສຳລັບ [React Native](https://reactnative.dev/) ທີ່ເຮັດໃຫ້ສ່ວນ Native ໃຊ້ງານງ່າຍຂຶ້ນ. ເພື່ອສ້າງ Project Expo ໃໝ່, ແລ່ນ:

<TerminalBlock>
npx create-expo-app
</TerminalBlock>

ຖ້າທ່ານຍັງໃໝ່ສຳລັບ Expo, ເບິ່ງ [ຄູ່ມື Expo](https://docs.expo.dev/tutorial/introduction/).

Expo ດູແລໂດຍ [Expo (ບໍລິສັດ)](https://expo.dev/about). ສ້າງແອັບດ້ວຍ Expo ແມ່ນຟຣີ, ແລະ ທ່ານສາມາດສົ່ງຂຶ້ນ Google ແລະ Apple store ໄດ້ໂດຍບໍ່ມີຂໍ້ຈຳກັດ. ນອກຈາກນີ້ Expo ຍັງໃຫ້ບໍລິການ cloud ແບບຊຳລະເງິນທີ່ສາມາດເລືອກໄດ້.

<DeepDive>

#### ຂ້ອຍສາມາດໃຊ້ react ໂດຍບໍ່ມີframework ໄດ້ບໍ່? {/*can-i-use-react-without-a-framework*/}

ທ່ານສາມາດໃຊ້ react ໂດຍບໍ່ມີ framework ໄດ້ --ນັ່ນຄືວິທີທີ່ທ່ານໃຊ້ [ໃຊ້ React ສຳລັບບາງສ່ວນຂອງ page ທ່ານ.](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) **ເຖິງຢ່າງໃດກໍ່ຕາມ, ຖ້າທ່ານສ້າງແອັບ ຫຼື ເວັບໃໝ່ດ້ວຍ React ທີ່ສົມບູນ, ພວກເຮົາແນະນຳໃຫ້ທ່ານມີ Framework.**

ເຫດຜົນແມ່ນ.

ເຖິງວ່າທ່ານບໍ່ຕ້ອງການ routing ຫຼື data fetching ໃນຕອນທຳອິດ, ທ່ານອາດຈະຕ້ອງການບາງ libary ສຳລັບມັນ. ດັ່ງທີ່ JavaScript bundle ຂອງທ່ານໃຫຍ່ຂຶ້ນໄປພ້ອມໆກັບຄຸນສົມບັດໃໝ່, ທ່ານອາດຕ້ອງການຫາວິທິແຍກ code ສຳລັບແຕ່ລະ route ສະເພາະ. ດັ່ງທີ່ Data fetching ຕ້ອງການຫຍັງທີ່ຊັບຊ້ອນ, ທ່ານອາດຕ້ອງຈັດການ server-clien network waterfall ທີ່ເຮັດໃຫ້ແອັບທ່ານຮູ້ສຶກຊ້າຫຼາຍ. ດັ່ງທີຜູ້ໃຊ້ຂອງທ່ານອາດຈະມີຄົນທີ່ມີ network ທີ່ຊ້າແຮງ ຫຼື ອຸປະກອນລຸ່ນຕໍ່າ, ທ່ານອາດຕ້ອງການ generate HTML ຈາກ component ເພືອສະແດງ content ກ່ອນ--ອາດຈະເທິງ sever, ຫຼື ລະຫວ່າງເວລາ build. ປ່ຽນການຕັ້ງຄ່າເພື່ອແລ່ນບາງໂຕຂອງ code ຂອງທ່ານເທິງ server ລະຫວ່າງ build ສາມາດເປັນຫຍັງທີ່ຫຍຸ້ງຍາກຫຼາຍ.

**ບັນຫາເຫຼົ່ານີ້ບໍ່ແມ່ນບັນຫາສະເພາະຂອງ React. ນີ້ຄືເຫດຜົນທີ່ Svelte ມີ SvelteKit, Vue ມີ Nuxt, ແລະ ອື່ນໆ.** ເພື່ອແກ້ໄຂບັນຫາເຫຼົ່ານີ້ດ້ວຍຕົວຂອງທ່ານເອງ, ທ່ານຈະຕ້ອງການ integrate bundler ຂອງທ່ານດ້ວຍ router ແລະ library data fetching ຂອງທ່ານ. ການຕັ້ງຄ່າເລີ່ມຕົ້ນບໍ່ແມ່ນເລື່ອງຍາກ, ແຕ່ມີລາຍລະອຽດປີກຍ່ອຍຫຼາຍກ່ຽວຂ້ອງກັບການສ້າງແອັບທີ່ໂຫຼດໄວເຖິງວ່າມັນຈະໃຫຍ່ຂຶ້ນເມື່ອເວລາຜ່ານໄປ. ທ່ານຈະຕ້ອງສົ່ງ app code ໃນຈຳນວນນ້ອຍສຸດແຕ່ສົ່ງໃນ client-server ດຽວໄປກັບ, ໃນຄູ່ຂະໜານໄປກັບຂໍ້ມູນອື່ນໆທີ່ຕ້ອງການສຳລັບ page. ທ່ານອາດຕ້ອງການໃຫ້ page ມີການຕອບໂຕ້ກ່ອນ code JavaScript ຈະເຮັດວຽກ, ເພື່ອຮອງຮັບການປັບປຸງທີ່ດີຂຶ້ນ. ທ່ານອາດຕ້ອງການ generate ໂຟນເດີທີ່ເກັບຟາຍ static HTML ສຳລັບ ໜ້າການຕະຫຼາດທີ່ host ຢູ່ໃສກໍໄດ້ ແລະ ສາມາດເຮັດວຽກໄດ້ເຖິງວ່າ JavaScript ຈະຖືກປິດ. ການສ້າງຄວາມສາມາດເຫຼົ່ານີ້ດ້ວຍຕົວທ່ານເອງແມ່ນຕ້ອງໄດ້ລົງມື.

**Framework React ໃນໜ້ານີ້ແມ່ນແກ້ໄຂບັນຫາເຫຼົ່ານີ້ເປັນຄ່າເລີ່ມຕົ້ນ, ໂດຍບໍ່ເພີ່ມວຽກຂອງເຈົ້າຕື່ມ.** ມັນເຮັດໃຫ້ທ່ານເລີ່ມຕົ້ນໄດ້ງ່າຍ ແລະ ສາມາດຂະຫຍາຍແອັບຕາມຄວາມຕ້ອງການຂອງທ່ານ. ແຕ່ລະ Framework React ມີຊຸມຊົນ, ສະນັ້ນການຫາຄຳຕອບໂດຍການຕັ້ງຄຳຖາມ ແລະ ການອັບເດດເຄື່ອງມືແມ່ນງ່າຍ. Frameworks ຍັງໃຫ້ໂຄ່ງສ້າງສຳລັບ code ຂອງທ່ານ, ຊ່ວຍທ່ານ ແລະ ຄົນອື່ນໆ ຮັກສາເນື້ອໃນ ແລະ ທັກສະລະຫວ່າງແຕ່ລະ Project ທີ່ແຕກຕ່າງກັນ.  ໃນທາງກົງກັນຂ້າມ, ດ້ວຍການຕັ້ງຄ່າແບບກຳນົດເອງ ມັນກໍເປັນເລື່ອງງ່າຍທີ່ຈະຕິດບັນຫາ ແລະ dependency version ທີ່ບໍ່ຮອງຮັບ,  ແລະ ຈະຈົບລົງດ້ວຍການສ້າງ Framework ຂອງທ່ານເອງ-ເຖິງວ່າຈະບໍ່ມີຊຸມຊົນ ຫຼື ເສັ້ນທາງອັບເກດ (ແລະ ຖ້າເປັນອັນດຽວກັບທີ່ເຮົາສ້າງໃນອະດີດ, ອອກແບບຕາມມີຕາມເກີດຫຼາຍຂຶ້ນ).

ຫາກທ່ານຍັງບໍ່ໝັ້ນໃຈ, ຫຼື ແອັບຂອງທ່ານມີຂໍ້ຈຳກັດທີ່ຜິດປົກະຕິເຊິ່ງ Framework ເຫຼົ່ານີ້ເຮັດວຽກບໍ່ໄດ້ດີ ແລະ ທ່ານຕ້ອງການຕັ້ງຄ່າແບບກຳນົດເອງ, ເຮົາຢຸດທ່ານບໍ່ໄດ້--ເຮັດໄປໂລດ! ເອົາ `react` ແລະ `react-dom` ຈາກ npm, ຕັ້ງຄ່າແບບກຳນົດເອງຂອງທ່ານດ້ວຍ bundler ເຊັ່ນ [Vite](https://vitejs.dev/) ຫຼື [Parcel](https://parceljs.org/), ແລະ ເຄື່ອງມືອື່ນໆທີ່ທ່ານຕ້ອງການສຳລັບ routing, static generation ຫຼື server-side rendering ແລະ ອື່ນໆ.
</DeepDive>

## Bleeding-edge React frameworks {/*bleeding-edge-react-frameworks*/}

ໃນຂະນະທີ່ພວກເຮົາໄດ້ສຳຫຼວດຫາວິທີການປັບປຸງ React, ພວກເຮົາຄົ້ນພົບວ່າການ integrate ຢ່າງໃກ້ຊິດກັບ Framework(ໂດຍສະເພາະ, ກັບ routing, bundling, ແລະ server technologies) ແມ່ນໂອກາດທີ່ໃຫຍ່ຫຼວງທີ່ຈະຊ່ວຍໃຫ້ຜູ້ໃຊ້ React ເຮັດແອັບທີ່ດີໄດ້. ທີມ Next.js ໄດ້ຕົກລົງທີ່ຈະຮ່ວມມືກັບພວກເຮົາໃນການຄົ້ນຄວ້າ, ພັດທະນາ, integrating, ແລະ ການທົດສອບຄຸນສົມບັດ Framework-agnostic bleeding-ege React ເຊັ່ນ [React Server Components.](/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)

ຄຸນສົມບັດເຫຼົ່ານີ້ໃກ້ຈະພ້ອມສຳລັບ Production ແລ້ວໃນແຕ່ລະມື້, ພວກເຮົາໄດ້ໂອ້ລົມກັບນັກພັດທະນາ bundler ແລະ ນັກພັດທະນາ Framework ກ່ຽວກັບການ integrate ມັນ. ເຮົາຫວັງວ່າໃນໜຶ່ງ ຫຼື ສອງປີ, ທຸກ Framework ທີ່ມີໃນ page ນີ້ຈະຮອງຮັບຢ່າງສົມບູນສຳລັບຄຸນສົມບັດນີ້. (ຫາກທ່ານເປັນຜູ້ຂຽນ Framework ທີ່ສົນໃຈເປັນຄູ່ຮ່ວມພັດທະນາກັບພວກເຮົາເພື່ອທົດລອງຄຸນສົມບັດເຫຼົ່ານີ້, ກະລຸນາແຈ້ງໃຫ້ເຮົາຮູ້!)

### Next.js (App Router) {/*nextjs-app-router*/}

<<<<<<< HEAD
**[App Router ຂອງ Next.js](https://beta.nextjs.org/docs/getting-started) ແມ່ນການ redesign ຂອງ Next.js APIs ທີ່ມີຈຸດປະສົງເຕີມເຕັມວິໄສທັດຂອງທີ React full-stack architecture.** ມັນເຮັດທ່ານ fetch data ເປັນ asynchronous ທີ່ແລ່ນເທິງ server ຫຼື ແມ້ແຕ່ລະຫວ່າງການ build.

Next.js ດູແລໂດຍ [Vercel](https://vercel.com/). ທ່ານສາມາດ [deploy a Next.js app](https://nextjs.org/docs/deployment) ໃສ່  Node.js ຫຼື serverless hosting ໃດກໍ່ໄດ້, ຫຼຶ ເຊີເວີຂອງທ່ານເອງ. Next.js ຍັງຮອງຮັບ [static export](https://beta.nextjs.org/docs/configuring/static-export) ຊື່ງບໍ່ໄດ້ຕ້ອງການເຊີເວີ.
<Pitfall>

App Router ຂອງ Next.js ແມ່ນ **ປັດຈຸບັນເປັນເບຕ້າ ແລະ ຍັງບໍ່ແນະນຳສຳລັບ production** (ນະ ເດືອນມີນາ 2023). ເພື່ອລອງມັນໃນ Project Next.js ທີ່ມີຢູ່ແລ້ວ, [ປະຕິບັດຕາມຄູ່ມື  incremental migration](https://beta.nextjs.org/docs/upgrade-guide#migrating-from-pages-to-app).

</Pitfall>
=======
**[Next.js's App Router](https://nextjs.org/docs) is a redesign of the Next.js APIs aiming to fulfill the React team’s full-stack architecture vision.** It lets you fetch data in asynchronous components that run on the server or even during the build.

Next.js is maintained by [Vercel](https://vercel.com/). You can [deploy a Next.js app](https://nextjs.org/docs/app/building-your-application/deploying) to any Node.js or serverless hosting, or to your own server. Next.js also supports [static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) which doesn't require a server.
>>>>>>> 68f417a600c7d7b8c4131e39f8a843a856ae3909

<DeepDive>

#### ຄຸນສົມບັດໃດທີປະກອບເປັນວິໄສທັດສະຖາປັດຕະຍະກຳແບບ full-stack ຂອງທີມ React? {/*which-features-make-up-the-react-teams-full-stack-architecture-vision*/}

App Router bundler ຂອງ Next.js  ໃຊ້ [React Server Components specification](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) ຢ່າງເປັນທາງການຢ່າງສົມບູນ. ສິ່ງນີ້ເຮັດໃຫ້ທ່ານສາມາດ  mix build-time, server-only, ແລະ interactive components ໃນ single React tree.

ຕົວຢ່າງ, ທ່ານສາມາດຂຽນ component React server-only ເປັນ `async` function ທີ່ສາມາດອ່ານຈາກ database ຫຼື ຈາກຟາຍ. ຈາກນັ້ນທ່ານສາມາດສົ່ງຜ່ານຂໍ້ມູນຈາກມັນໄປຫາ interactive components: 

```js
// component ນີ້ runs *only* ເທິງ server (ຫຼື ລະຫວ່າງການ build).
async function Talks({ confId }) {
  // 1. ທ່ານຢູ່ເທິງ server, ສະນັ້ນທ່ານຈິງສາມາດເວົ້າກັບຊັ້ນຂໍ້ມູນ. API endpoint ບໍ່ຕ້ອງການ.
  const talks = await db.Talks.findAll({ confId });

  // 2. ເພີ່ມຈຳນວນສຳລັບຕັກກະການ render. ມັນບໍ່ເຮັດໃຫ້  JavaScript bundle ຂອງທ່ານໃຫຍ່ຂຶ້ນ.
  const videos = talks.map(talk => talk.video);

  // 3. ສົ່ງຕໍ່ຂໍ້ມູນລົງໄປຫາ components ທີ່ເຮັດວຽກໃນບາວເຊີ.
  return <SearchableVideoList videos={videos} />;
}
```

App Router ຂອງ Next.js ຍັງ integrates [data fetching ດ້ວຍ Suspense](/blog/2022/03/29/react-v18#suspense-in-data-frameworks). ນີ້ເຮັດໃຫ້ທ່ານສາມາດລະບຸ loading state (ເຊັ່ນ skeleton placeholder) ສຳລັບສ່ວນຕ່າງໆຂອງ user interface ຂອງທ່ານໄດ້ໂດຍກົງໃນ React tree ຂອງທ່ານ:

```js
<Suspense fallback={<TalksLoading />}>
  <Talks confId={conf.id} />
</Suspense>
```

Server Components ແລະ Suspense ແມ່ນຄຸນສົມບັດຂອງ React ຫຼາຍກວ່າ ຄຸນສົມບັດຂອງ Next.js. ເຖິງຢ່າງໃດກໍ່ຕາມ, ການນຳມາໃຊ້ໃນລະດັບ framework ຈຳເປັນຕ້ອງມີການຊື້ ແລະ ການໃຊ້ງານທີ່ບໍ່ສຳຄັນ. ໃນຂະນະນີ້, the Next.js App Router ເປັນການໃຊ້ງານທີ່ສົມບູນທີ່ສຸດ. ທີມ React ກຳລັງເຮັດວຽກກັບນັກພັດທະນາ bundler ເພື່ອເຮັດໃຫ້ຄຸນສົມບັດເຫຼົ່ານີ້ງ່າຍໃນການໃຊ້ງານໃນ Framework ຍຸກຕໍ່ໄປ.

</DeepDive>
