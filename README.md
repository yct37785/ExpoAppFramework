# Expo App Framework
This project is a monorepo for building Expo apps with a shared framework.

Core functionality such as UI elements, hooks, constants, and utilities (collectively referred to as **components**) is centralized and reused across all Expo app projects.

By consolidating dependencies and common logic into a single framework, apps can be developed quickly without redefining the same building blocks.

*What is a monorepo: A monorepo is a single repository containing multiple distinct projects, with well-defined relationships.*

## End Goals
- Provide a ready-to-use template for quickly building new Expo apps.
- Maintain a shared framework of reusable components.
- Manage dependencies centrally (monorepo philosophy).
- Keep app projects lightweight by only adding app-specific code.

## Project Structure
### Overview
The monorepo is structured as follows:
```
root/
├── apps/
│   └── TemplateApp/          # example Expo app consuming the framework
├── packages/
│   └── Framework/            # core framework
│       ├── src/              # framework source code
│       ├── package.json
│       └── tsconfig.json
├── install.bat               # runs npm install in monorepo root
└── package.json              # Monorepo root (workspaces defined here)
```

## High Level Overview
- **Framework**: Centralized shared components.
- **TemplateApp**: Example app + testbed for new features.
- **New apps**: Created by duplicating TemplateApp.
- **Dependencies**: Installed at root for shared packages, or per-app for unique needs.

## TemplateApp
TemplateApp demonstrates how to build an app on top of **Framework**.
It also serves as a testbed for developing and validating new shared components.

The TemplateApp project is structured as follows:
```
apps/TemplateApp
├── assets/
├── src/
│   ├── Screens/
│   │   ├── <ScreenName>.tsx  # app-specific screen files
│   │   └── ScreenMap.ts      # maps and registers screens with navigator
│   ├── App.tsx               # root app entry point
│   └── index.ts
├── app.config.js             # Expo app configuration
├── babel.config.js           # Babel configuration
├── package.json              # App-specific dependencies (if any)
├── run-expo-go.bat           # shortcut to run app in Expo Go
└── tsconfig.json             # TypeScript config
```

### Screens
**screen files (.tsx):** This is where you define your app specific screens (see sample screens).

**ScreenMap.ts:** This is where you define your screen mapping for registration with the navigator (see sample screens).

### Config
**app.config.js:** Expo configuration (name, slug, etc.).

**babel.config.js:** Babel setup.

**package.json:** Only add app-specific dependencies here.

**tsconfig.json:** TypeScript setup.

## Setup
Clone monorepo:
````bash
git clone git@github.com:yct37785/ExpoAppFramework.git
cd ExpoAppFramework
````

Install all shared dependencies from **root**:
````bash
./install.bat
````

That's it, all setup complete!

## Usage
### Running TemplateApp
From inside **apps/TemplateApp**, run:
````bash
./run-expo-go.bat
````

- Scan the QR code with the Expo Go app to run on a device.
- Or press w in the terminal to launch the web version.

### Creating a New Client App
Duplicate **TemplateApp** under **apps/** and rename it:

```
apps/
├── TemplateApp
└── MyNewApp
```

Update app config values:

**app.config.js**:
````json
{
  "expo": {
    "name": "<NEW_APP_NAME>",
    "slug": "<NEW_APP_NAME>",
    ...
}
````

**package.json**:
````json
{
  "name": "<NEW_APP_NAME>"
  ...
}
````

The .gitignore of the monorepo is set to ignore all folders within **app/** except for **TemplateApp**. So feel free to track your project separately.

## Development
### Adding New Shared Components
- Add the new component to the appropriate folder in **packages/Framework/src**.
- Test and run it inside **TemplateApp**.

Install new dependencies from within **root**:

````bash
npx expo install <package1> <package2>
````

*Note: when installing new packages use *`npx expo install` *to get the latest expo compatibile version of each package*

The packages will be installed to the **node_modules** in root as per monorepo philosophy.

### Adding App-Specific Components
To build new **app specific** components, simply install from your app project root.

````bash
cd app/MyNewApp
npx expo install <package1> <package2>
````
