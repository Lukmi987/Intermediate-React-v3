
TypeScript is a thin layer on top of JavaScript that adds the power of a static checker to your code base. This means you'll have another layer of protection helping protect you against dumb bugs like var x = 5; x.toUpperCase(): things that a normal linter can't find but a type system can.

1.First thing, npm install -D typescript@4.2.2. Then run npx tsc --init. npx will run the TypeScript tool directly from your node_modules and init your project for you.

2. In tsconfig.json 
- tsconfig.json file and uncomment the jsx field. This lets TypeScript that you're writing React. Then update the target to be ES2020 so that you can use async / await and promises.


3. Next we need to install the types for our project. Not all projects are written in TypeScript 
- DefinitelyTyped, provides third party types for your library.
In order to install these types, run npm install -D @types/react@17.0.2 @types/react-dom@17.0.1 @types/react-router-dom@5.1.7. This will grab all these type definitions.

npm i -D @types/react@17.0.2 @types/react-dom@17.0.1 @types/react-router-dom@5.1.7

4. When converting js app to to typescript start with components with the least import and move your way up

5.TypeScript + ESLint
- Run npm uninstall @babel/eslint-parser
- Run npm install -D eslint-import-resolver-typescript@2.4.0 @typescript-eslint/eslint-plugin@4.16.1 @typescript-eslint/parser@4.16.1
- Change your package.json lint entry to "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\" --quiet",
- Add the following to .eslintrc.json
// inside extends, above prettier rules
"plugin:@typescript-eslint/recommended",

// inside rules, generally a good rule but we're going to disable it for now
"@typescript-eslint/no-empty-function": 0

// inside plugins
"@typescript-eslint"

// replace parser
"parser": "@typescript-eslint/parser",

// add to settings array
"import/parsers": {
  "@typescript-eslint/parser": [".ts", ".tsx"]
},
"import/resolver": {
  "typescript": {
    "alwaysTryTypes": true
  }
}