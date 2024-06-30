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
├── projects
│	├── TemplateApp
│	└── MyApp
├── package.json
└── yarn.lock
```

All node modules, including expo, are managed in the root folder. All app projects are handled in the projects folder. App projects will import core functionalities, UI components, constants and utilities from Framework:

![Expo App Framework_ overview](https://github.com/yct37785/ExpoAppFramework/assets/8434189/abc3e4f2-9544-4154-b144-9c5aea95e4d3)

### Framework
Contains common app components/functionalities. Namely the aforementioned core functionalities, UI components, constants and utilities are defined here to be shared among all app projects.

The Framework project is structured as follows:
```
/ExpoCommonFramework
...
└── Framework
	├── APIs
	├── Contexts
	├── Managers
	├── UI
	├── Utilities
	├── CommonVals.js
	├── package.json
	└── RootComp.js
```

**APIs:** interfaces with APIs like AsyncStorage

**Contexts:** React context objects

**Managers:** Manages persistent state and mutates data for users, like LocalDataManager

**UI:** UI components like dropdown, tabs

**Utilities:** Utility functions like epochToDDMMYY

**CommonVals.js:** common values, like padSize

**package.json:** managed by Yarn, we do not list dependencies here but rather in the app projects itself

**RootComp.js:** Root component with navigation, contexts and providers setup. The launching point for an app.

### TemplateApp
TemplateApp serves as a quick start template for developing apps with examples for every defined component/functionality in Framework. It is also the platform for new components/functionality to be developed.

An example app easily clonable with sample screens and usages.

The TemplateApp project is structured as follows:
```
/ExpoAppFramework
...
└── projects
	└── TemplateApp
		├── Screens
		│	└── ~ screen files
		├── User
		│	├── ScreenMapper.js
		│	└── Schemas.js
		├── app.json
		├── package.json
		└── ~other stuff
```

**~other stuff:** Users can ignore, these are system files that are handled by the framework/Expo/NodeJS

**Screens:** This is where you define your app specific screens (see sample screens)

**User/ScreenMapper.js:** This is where you define your screen mapping for registration with the navigator (see sample screens)

**User/Schemas.js:** This is where you define schemas of your local user data etc

**app.json:** Change the values under `expo.name`, `expo.slug` and any other app project specific values as you see fit

**package.json:** Install any app specific dependencies here

## Setup
### Setup monorepo
Clone the repo and enter TemplatesApp from monorepo root

````bash
git clone git@github.com:yct37785/ExpoAppFramework.git
cd ExpoAppFramework/projects/TemplateApp
````

Run `yarn` to install dependencies (modules will be installed in root instead of TemplateApp):

````bash
yarn
````

## Usage
### Running the TemplateApp
To run the template app, run the `npx expo start` command from **within the root folder of the template app**:

````bash
cd projects/TemplateApp
npx expo start
````

Scan the QR code from your Expo GO app to run on mobile or input w into the cmd window to launch the web version

### Setup a client app
To set up a client app, in the monorepo root/projects, simply duplicate the TemplateApp within the /projects folder and rename all instances of TemplateApp to that of your client app:

````bash
mkdir projects/<NEW_APP_NAME>
cp -r projects/TemplateApp/* projects/<NEW_APP_NAME>/
````

app.json:
````json
{
  "expo": {
    "name": "<NEW_APP_NAME>",
    "slug": "<NEW_APP_NAME>",
    ...
  }
...
}
````

To run the client app, similiar to the template app, run the `npx expo start` command from **within the root folder of the client app**:

````bash
cd projects/<NEW_APP_NAME>
npx expo start
````

## Defining screens

![Expo App Framework_ screens](https://github.com/yct37785/ExpoAppFramework/assets/8434189/66c677d4-955b-47cb-9c5e-366f3c097630)

## Building
### new common components/functionalities
To build a new component/functionality, simply define it within the proper folder under Framework (see setup -> Framework), test and run it from TemplateApp and install required packages from TemplateApp.

Note: when installing new packages use `npx expo install` to get the latest expo compatibile version of each package

````bash
cd projects/TemplateApp
npx expo install <package1> <package2>
````

The packages will be installed to within the node_modules folder of root as per monorepo philosophy.
### new app-specific components/functionalities
To build a new component/functionality for a specific app project, simply define it within the LocalComps folder in your app project (which you will have when using TemplateApp as a base) and install required packages from your app project root.

````bash
cd projects/<NEW_APP_NAME>
npx expo install <package1> <package2>
````

## Contributing
### commit message formalities
commits are separated into the following categories, append the associated emojis to commit messages for organisation and standardisation purposes:
- **refactor** 🔄: code refactoring
- **feature** ✨: newly added components, UI elements, functionalities etc
- **bug fix** 🐛: code to fix errors
- **config** 🔧: updating dependencies, config files etc
- **documentation** 📝: comments, comment block, readme etc
- **stylizing** 💄: changing placement of UI, CSS etc
- **housekeeping** 🧹: remove obselete code or files
