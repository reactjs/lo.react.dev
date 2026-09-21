export const template = {
  '/src/index.js': {
    hidden: true,
    code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  },
  '/package.json': {
    hidden: true,
    code: JSON.stringify(
      {
        name: 'react.dev',
        version: '0.0.0',
        main: '/src/index.js',
        scripts: {
          start: 'react-scripts start',
          build: 'react-scripts build',
          test: 'react-scripts test --env=jsdom',
          eject: 'react-scripts eject',
        },
        dependencies: {
<<<<<<< HEAD
          react: '^18.0.0',
          'react-dom': '^18.0.0',
=======
          react: '19.3.0-canary-f1f7ed2a-20260904',
          'react-dom': '19.3.0-canary-f1f7ed2a-20260904',
>>>>>>> b011783fcc7a39da9eefd4274147a1444860a12b
          'react-scripts': '^5.0.0',
        },
      },
      null,
      2
    ),
  },
  '/public/index.html': {
    hidden: true,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  },
};
