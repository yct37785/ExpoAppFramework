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

## Setup
### Initialize the monorepo

````bash
mkdir my-monorepo && cd my-monorepo
yarn init -y
````

### Configure Yarn Workspaces in root
In root, create the root `packages.json` :

````json
{
	"name": "my-monorepo",
	"private": true,
	"workspaces":  [
		"packages/*"
	]
}
````

The `"private": true` is important because it prevents the root of your monorepo from being accidentally published to npm.

### Create ProjectA (your component)
Within your monorepo, create a packages directory where each package will live:

````bash
mkdir packages && cd packages
````

Now create ProjectA:

````bash
mkdir ProjectA && cd ProjectA
yarn init -y
````

Within ProjectA, create its own package.json, we will have `lodash` as a dependency for ProjectA:

````json
{
	"name": "@my-monorepo/project-a",
	"version": "1.0.0",
	"main": "index.js",
	"license": "MIT",
	"dependencies":  {
		"lodash": "^4.17.21"
	}
}
````

And the corresponding `index.js` file with a simple export:

````javascript
const _ = require('lodash');

const componentA = () => {
	console.log('This is component A with Lodash version:', _.VERSION);
};

module.exports = componentA;
````

### Create ProjectB (your app)
Create corresponding ProjectB back in the packages folder:

````bash
cd..
mkdir ProjectB && cd ProjectB
yarn init -y
````

Create the `package.json` for ProjectB:

````json
{
	"name": "@my-monorepo/project-b",
	"version": "1.0.0",
	"main": "index.js",
	"license": "MIT",
	"dependencies":  {
		"@my-monorepo/project-a": "1.0.0",
		"axios": "^1.6.1"
	}
}
````

ProjectA is linked here as a dependency as seen above. `Axios` is a dependency used only by ProjectB.

Create `index.js` for projectB that uses the component exported from ProjectA:

````javascript
const componentA = require('@my-monorepo/project-a');
const axios = require('axios');

componentA();

axios.get('https://api.github.com/users/github')
 	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.log(error);
	});
````

### Install dependencies
We will install dependencies in the root with the yarn managed root `package.json`.

Yarn will now install all dependencies in the root node_modules, linking projectA within projectB's node_modules:

````bash
cd ../../
yarn
````

## Run
All dependencies are now managed in the root of the Monorepo. You will hence run each of your projects individually from the packages folder.

To run Project B:

````bash
cd packages/ProjectB
node index.js
````

You should see the console.log from the component exported from ProjectA and the output from Axios in ProjectB:

````bash
This is component A with Lodash version: 4.17.21
{
	login: 'github',
	id: 9919,
	....
	created_at: '2008-05-11T04:37:31Z',
	updated_at: '2022-11-29T19:44:55Z'
}
````

