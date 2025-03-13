# Expo App Framework
This project is a monorepo for Expo apps. Core functionalities, UI elements, hooks, constants and utilities (henceforth referred to as **components**) are shared across all Expo app projects.

Dependencies for the common framework are managed centrally per monorepo philosophy.

*What is a monorepo: A monorepo is a single repository containing multiple distinct projects, with well-defined relationships.*

## End Goals
The aim for this project is a quick and easy ready to use template to quickly build apps upon a common framework without having to define common components again for each new app project.

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

All node modules, including expo, are managed in the **root** folder. All app projects are handled in the **Projects** folder. App projects will import shared components from **Framework**:

![Expo App Framework_ overview](https://github.com/yct37785/ExpoAppFramework/assets/8434189/abc3e4f2-9544-4154-b144-9c5aea95e4d3)

## Framework
Shared library of aforementioned components.

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
TemplateApp serves as a quick start template for developing apps with examples for every component defined in **/Framework**. It is also the platform for building new components.

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

## Usage
### Running the TemplateApp
In root folder, run** Launch_TemplateApp.bat** or **Launch_TemplateApp - prod.bat**.

Scan the QR code from your Expo GO app to run on mobile or input w into the cmd window to launch the web version.

### Setup a client app
To set up a client app, simply duplicate **TemplateApp** in the same **/Projects** directory and rename all instances of TemplateApp to that of your client app:

```
/ExpoAppFramework
...
└── Projects
	├── TemplateApp
	└── MyNewApp
```

**app.json**:
````json
{
  "expo": {
    "name": "<NEW_APP_NAME>",
    "slug": "<NEW_APP_NAME>",
    ...
````

**package.json**:
````json
{
  "name": "<NEW_APP_NAME>"
  ...
````

To run the client app, run the `npx expo start` command from **within the root folder of the client app**:

````bash
cd Projects/MyNewApp
npx expo start
````

The .gitignore of the monorepo is set to ignore all projects within **/Projects** except for **TemplateApp**. So feel free to track your project in a separate repository.

## Building
### new common components/functionalities
To build a new components, simply define it within the proper directory under **/Framework**, test and run it from **TemplateApp**.

*Note: when installing new packages use *`npx expo install` *to get the latest expo compatibile version of each package*

Install new dependencies from within **/Framework**:

````bash
cd Framework
npx expo install <package1> <package2>
````

The packages will be installed to within the **node_modules** in root as per monorepo philosophy.

### new app-specific components/functionalities
To build a new **app specific** components, simply define it within  your app project and install required packages from your app project root.

````bash
cd Projects/<NEW_APP_NAME>
npx expo install <package1> <package2>
````
