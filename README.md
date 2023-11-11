# Expo Common Framework
This project is a monorepo for Expo apps. The common framework: standard core functionalities, UI components and utilities are shared across all Expo app projects. Dependencies for the common framework are managed centrally.

*What is a monorepo: A monorepo is a single repository containing multiple distinct projects, with well-defined relationships.*

## End Goals
The aim for this project is a quick and easy ready to use template to quickly build apps upon a common framework with core functionalities (like navigation) setup and with a common set of UI elements.

## Project Structure
### Overview
The monorepo is structured as follows:
```
/ExpoCommonFramework
│
├── node_modules
├── projects
│	├── Framework
│	│	├── ~stuff
│	│	└── package.json
│	│
│	└── TemplateApp
│	│	├── ~stuff
│	│	└── package.json
│
└── package.json
└── yarn.lock
```

All node modules, including expo, are managed in the root folder. All app projects are handled in the projects folder.

### Framework
Contains all shared components and also handles all the common dependencies, including React, React Native and Expo.

The Framework project is structured as follows:
```
/ExpoCommonFramework
├── projects
		├── Framework
			├── APIs
			├── Common
			├── Contexts
			├── Managers
			├── UI
			├── Utilities
			├── package.json
			└── RootComp.js
```

**APIs:** interfaces with APIs like AsyncStorage

**Common:** common values, like padSize

**Contexts:** React context objects

**Managers:** Manages persistent state and mutates data for consumers, like LocalDataManager

**UI:** UI components like dropdown

**Utilities:** Utility functions like epochToDDMMYY

**package.json:** All core and common dependencies, including React, React Native and Expo

**RootComp.js:** Root component with navigation, contexts and providers setup. The launching point for an app.

### TemplateApp
TemplateApp (and any other app projects) will only handle dependencies that are specific to itself. It will also import shared components from Framework.

An example app easily clonable with sample screens and usages.

The TemplateApp project is structured as follows:
```
/ExpoCommonFramework
├── projects
		├── TemplateApp
			├── Pages
				└── ~ page files
			├── User
				├── PageMapper.js
				└── Schemas.js
			├── app.json
			├── package.json
			└── ~other stuff
```

**~other stuff:** Consumers can ignore, these are system files that are handled by the framework/Expo/NodeJS

**Pages:** This is where you define your app specific pages as well as any components required (see sample pages)

**User/PageMapper.js:** This is where you define your page mapping for registration with the navigator (see sample pages)

**User/Schemas.js:** This is where you define schemas of your local user data etc

**app.json:** Change the values under `expo.name`, `expo.slug` and any other app project specific values as you see fit

**package.json:** Install any app specific dependencies here

## Setup
### Setup monorepo
Clone the repo and enter the monorepo root

````bash
git clone git@github.com:yct37785/ExpoAppFramework.git
cd ExpoAppFramework
````

Run `yarn` to install dependencies:

````bash
yarn
````

## Usage
### Running the TemplateApp
To run the template app, run the `npx expo start` command from **within the root folder of the template app**:

````bash
# assuming from ExpoAppFramework root
cd projects/TemplateApp
npx expo start
````

Scan the QR code from your Expo GO app and the app will run

### Setup client app
To set up a client app, in the monorepo root/projects, simply duplicate the TemplateApp and rename all instances of TemplateApp the that of your client app:

````bash
# assuming from ExpoAppFramework root
mkdir projects/<NEW_APP_NAME>
cp -r projects/TemplateApp/* projects/<NEW_APP_NAME>/
````

package.json:
````json
{
	 "name": "@expo-app-framework/<NEW_APP_NAME>"
	 ...
}
````

app.json:
````json
{
	 "expo": {
		"name": "<NEW_APP_NAME>",
		"slug": "<NEW_APP_NAME>",
	 ...
}
````

To run the client app, similiar to the template app, run the `npx expo start` command from **within the root folder of the client app**:

````bash
# assuming from ExpoAppFramework root
cd projects/<NEW_APP_NAME>
npx expo start
````

To install additional dependencies specific to the client app:

````bash
# assuming from <NEW_APP_NAME> root
npx expo install <package1> <package2>
````

The dependencies will be installed to within the <NEW_APP_NAME> `node_modules`
