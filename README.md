[![Netlify Status](https://api.netlify.com/api/v1/badges/e2adee17-47e6-427e-a83e-a6eeb9d01cb3/deploy-status)](https://app.netlify.com/sites/pomodoro-jacob-shuman/deploys)

# Pomodoro

### _Minimalistic web-based pomodoro timer_

## :triangular_flag_on_post: Table of Contents

- [:question: What is it?](#what-is-it)
- [:clipboard: Features](#features)
- [:speech_balloon: Contributing](#contributing)
  - [:electric_plug: Scripts](#scripts)
  - [:toolbox: Prerequisites](#prerequisites)
  - [:wrench: Setup](#setup)
  - [:computer: Running a development server](#running-a-development-server)

<a id='what-is-it'/>

## :question: What is it?

A clean web-based timer using the [pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique). The project was created due to a lack of a web-based timer using the pomodoro technique with a robust feature set.

<a id='features'/>

## :clipboard: Features

| Feature                             | State?                       |
| ----------------------------------- | ---------------------------- |
| Themes                              | :white_check_mark: Completed |
| Adjust Period Order (Drag and Drop) | :white_check_mark: Completed |
| Add Period                          | :white_check_mark: Completed |
| Delete Period                       | :white_check_mark: Completed |
| UI Audio                            | :warning: Partially          |
| Complete Storybook Coverage         | :x: On Roadmap               |
| PWA                                 | :x: On Roadmap               |
| Custom Themes                       | :x: On Roadmap               |
| Add Custom Period                   | :x: On Roadmap               |
| Change Period Title/Duration        | :x: On Roadmap               |
| P2P Device Sync                     | :x: On Roadmap               |

<a id='contributing'/>

## :speech_balloon: Contributing

The app is hosted on Netlify and I would appreciate any contributions! Please refer to the roadmap and other resources on this repository before creating a feature request issue to be sure it doesn't conflict with any current plans.

<a id='scripts'/>

### :electric_plug: Scripts

Any of the following scripts can be run from the terminal using the following format:

```bash
npm run SCRIPT_NAME
```

| Name              | Description                                     |
| ----------------- | ----------------------------------------------- |
| `dev`             | Runs all `dev:**` scripts simultaneously        |
| `dev:netlify`     | Runs a dev server with the netlify cli          |
| `dev:storybook`   | Runs a storybook dev server                     |
| `build`           | Builds the production-ready version of the site |
| `build:storybook` | Exports a static version of storybook           |

<a id='prerequisites'/>

### :toolbox: Prerequisites

- This project uses React, please make sure you have at least a fundamental understanding of React before contributing.
- In addition to React this project uses Next.js. It is also recommended to have some knowledge of Next.js before contributing. Please use the following links as reference for Next.js:
  - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
  - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
    d

<a id='setup'/>

### :wrench: Setup

1. Install [Node.js](https://nodejs.org/en/) (**Please make sure you install node version 10 or greater**).

2. Clone this repository to your computer and navigate to the project's root directory.

3. Run the following command to install all required node packages:
   ```bash
   npm i
   ```

<a id='running-a-development-server'/>

### :computer: Running a development server

1. If you haven't already, follow the [setup](#setup) instructions before continuing.

2. Run a development server using the following command (Reference the [scripts](#scripts) for a full list of all scripts):

   ```bash
   npm run dev:netlify
   ```

3. A browser tab will be opened automatically pointing to [http://localhost:8888](http://localhost:8888).
