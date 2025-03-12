# Expo App Framework
This project is a monorepo for Expo apps. Core functionalities, UI components, constants and utilities are shared across all Expo app projects. Dependencies for the common framework are managed centrally per monorepo philosophy.

*What is a monorepo: A monorepo is a single repository containing multiple distinct projects, with well-defined relationships.*

## End Goals
The aim for this project is a quick and easy ready to use template to quickly build apps upon a common framework without having to define common app components/functionalities again for each new app project.

## Project Structure
### Overview
The monorepo is structured as follows:
```
/ExpoAppFramework
│
├── Framework
├── node_modules
├── Projects
│	├── TemplateApp
│	└── MyApp
└── package.json
```

All node modules, including expo, are managed in the **root** folder. All app projects are handled in the **Projects** folder. App projects will import core functionalities, UI elements, constants and utilities from **Framework**:

![Expo App Framework_ overview](https://github.com/yct37785/ExpoAppFramework/assets/8434189/abc3e4f2-9544-4154-b144-9c5aea95e4d3)

## Framework
Shared library of aforementioned core functionalities, UI elements, constants and utilities.

The Framework project is structured as follows:
```
/ExpoAppFramework
...
└── Framework
	├── Const.ts
	├── package.json
	├── Root.tsx
	├── Screen.ts
	├── Test.tsx
	├── Utility.ts
	├── Firebase
	├── Hook
	└── UI
```

**Const.ts:** Holds constant values.

**package.json:** Shared dependencies.

**Root.tsx:** Root component with navigation, contexts and providers setup. The launching point for an app.

**Screen.ts:** Screen type definitions and props for building React Navigation compatible screens.

**Test.tsx:** Optionally run test cases at start.

**Utility.ts:** Utility functions.

**Firebase:** Firebase functions.

**Hook:** Common hooks.

**UI:** UI elements.

## TemplateApp
TemplateApp serves as a quick start template for developing apps with examples for every element and function defined in Framework. It is also the platform for building new elements and functions.

The TemplateApp project is structured as follows:
```
/ExpoAppFramework
...
└── projects
	└── TemplateApp
		├── assets
		├── Screens
		│	├── ScreenMap.ts
		│	└── ~ screen files (.tsx)
		├── .env
		├── app.json
		├── App.tsx
		├── babel.config.js
		├── index.ts
		├── metro.config.js
		├── package.json
		└── tsconfig.json
```

### Screens

**screen files (.tsx):** This is where you define your app specific screens (see sample screens).

**ScreenMap.ts:** This is where you define your screen mapping for registration with the navigator (see sample screens).

### Config

**app.json:** Change the values under `expo.name`, `expo.slug` and any other app project specific values as you see fit

**package.json:** Install any app specific dependencies here

## Setup
Clone and navigate to **/Framework**:

````bash
git clone git@github.com:yct37785/ExpoAppFramework.git
cd ExpoAppFramework/Framework
````

Within **/Framework**, install all shared dependencies:

````bash
npm i
````
