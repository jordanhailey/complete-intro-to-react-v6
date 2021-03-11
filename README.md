# Intro to React and Intermediate React Workshop
> [Frontend Masters workshop](https://frontendmasters.com/workshops/complete-react-v6/), lead by Brian Holt on Thursday 2021-03-11 - Friday 2021-03-12
>
> [Brian's repo](https://github.com/btholt/citr-v6-project), his [notes](https://btholt.github.io/complete-intro-to-react-v6/)

## Raw Notes
### Setup
- Setting up Brian's repo as a submodule, changed the remote name from origin to upstream, in case I wish to edit the repo and push the changes to my GitHub.
- I started about 2 hours late, missed the intro, came in when discussing tooling, will work from the beginning during the lunch break to get caught up.
- To format code, without globally installing prettier, run the cmd: `npx prettier`
  - With `prettier` installed as a dev dependency, and a script set with the name "format" in the `package.json` file, you can run `npm run format` and clean up your code.

### Hooks
- Hooks are always read in particular order by React, as mentioned in their docs, hooks should never be inside of for loops / if statements, it could completely cripple React's ability to re-render if it cannot count on specific state variables being available on re-rendering.
  - To avoid making this mistake, add the following eslint rule to `.eslintrc.json`
  ```json
  "extends": [
    ...,
    "plugin:react-hooks/recommended",
    ...
    ]
  ```
  > NOTE: `prettier` must come last in the `extends` array.
- To make an implicit return in JSX, wrap your return component in '()',
  - cannot return multiple children, must return one component, so if multiple elements, wrap in `<> fragments </>`

### Effects
- For async functions, and other things you might need to do upon rendering or re-rendering your app

### Custom Hooks
- Custom Hooks use built in Hooks, its important to remember you cannot break the nested state rules on anything inside custom hooks. If using state in your custom hook, is needs to be top level, not wrapped in a loop / conditional, or custom function.
### Handling User Events
- [Supported Synthetic events](https://reactjs.org/docs/events.html#supported-events)

### Component Composition
- Think small, but not too small that your code becomes hard to read / reason on.

### React Dev Tools
- Be sure to utilize NODE_ENV for development and production builds. A lot of extra weight is stripped out at build time (e.g. drops weight from debugger) when using a production env.
- `<StrictMode>` will give extra warnings for legacy features or soon to be deprecated features.
- Download the extension for Chromium/Firefox browsers for exploring a running React app from the Browser.

### React Router
