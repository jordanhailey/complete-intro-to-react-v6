# Intro to React v6 and Intermediate React v3 Workshop
> [Frontend Masters workshop](https://frontendmasters.com/workshops/complete-react-v6/), lead by Brian Holt on Thursday 2021-03-11 - Friday 2021-03-12
>
> [Brian's repo](https://github.com/btholt/citr-v6-project), his [notes](https://btholt.github.io/complete-intro-to-react-v6/)

## Raw Notes
### Intro to React v6
#### Setup
- Setting up Brian's repo as a submodule, changed the remote name from origin to upstream, in case I wish to edit the repo and push the changes to my GitHub.
- I started about 2 hours late, missed the intro, came in when discussing tooling, will work from the beginning during the lunch break to get caught up.
- To format code, without globally installing prettier, run the cmd: `npx prettier`
  - With `prettier` installed as a dev dependency, and a script set with the name "format" in the `package.json` file, you can run `npm run format` and clean up your code.
- `"devDependencies"` in the `package.json` file is for dependencies required to build the project, `dependencies` is for any software required to run it.

#### Core React Concepts
##### Hooks
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

##### Effects
- For async functions, and other things you might need to do upon rendering or re-rendering your app

##### Custom Hooks
- Custom Hooks use built in Hooks, its important to remember you cannot break the nested state rules on anything inside custom hooks. If using state in your custom hook, is needs to be top level, not wrapped in a loop / conditional, or custom function.
##### Handling User Events
- [Supported Synthetic events](https://reactjs.org/docs/events.html#supported-events)

##### Component Composition
- Think small, but not too small that your code becomes hard to read / reason on.

##### React Dev Tools
- Be sure to utilize NODE_ENV for development and production builds. A lot of extra weight is stripped out at build time (e.g. drops weight from debugger) when using a production env.
- `<StrictMode>` will give extra warnings for legacy features or soon to be deprecated features.
- Download the extension for Chromium/Firefox browsers for exploring a running React app from the Browser.

#### React Capabilities
##### React Router
- Similar to express, in the path you can assign param variables with `:VARNAME`

##### Class Components
- `class Foo extends React.Component`
  - `constructor`
    - `super()` is **required**, to call the `Contructor` class defined by React.
  - `this` is the object build by the class
- In functional components (what we've written up to this point), most of the "life cycle methods" have been wrapped into `useEffect`.

##### Class Properties
##### Managing State in Class Components
- [defaultProps](https://blog.logrocket.com/a-complete-guide-to-default-props-in-react-984ea8e6972d/)
- Arrow functions are bound to `this`, so there will be no need to specify with a `bind()` statement.

#### Special Case React Tools
##### Error Boundaries
- You cannot "catch" errors with Hooks the same way we can with Class Components. Class components offer a life cycle method `componentDidCatch` to handle this.

##### Context
##### Portals and Refs
- Refs are to "hang onto" state across re-renders

#### Wrapping Up

***
### Intermediate React v3
#### Hooks in Depth
> https://codesandbox.io/s/github/btholt/react-hooks-examples-v3/

##### useState
- Class components have `ShouldComponentUpdate()` Lifecycle method to reduce re-renders, it allows you to determine if a component should render at all.

##### useEffect
- `useEffect(()=>{},[])`, the `[]` essentially means "render once, don't re-render".
- Where you'll make your async function calls, e.g. `fetch()`
- The UseEffect callback cannot be an async function
- The return from a useEffect is something you should use for cleanup of things like timeouts, intervals, and web socket subscriptions

##### useContext
- The most simple solution to the prop drilling problem React presents. Hold state "up high", pull state "down" into the specific component that needs it. Avoiding the need to pass state variables / callbacks all the way down through containing components into the child element that will use it.
- Use sparingly. It adds indirection, so you may struggle to determine "where" the state was set.
- Most useful for *global application state*.
- You may be able to replace some / most of the functionality of Redux with Context.

##### useRef
- To make a piece of state to survive through re-rendering use `useRef`
- When the state value does not change, useRef will hold onto the exact object between re-renders, not just a copy of the object.
- Calls to `useRef` are scheduled on state changes, so they will always happen "after" state changes and not at the same time.

##### useReducer
- The most similar hook to Redux for state management
- You provide `useReducer` a callback reducer function, and an initial state. You get the current state back at index 0, and a dispatcher at index 1.
- The dispatch function sends either an object, or a primitive type value, commonly referred to as an "action".
- In some cases, makes reading state changes easier, because you know all of the possible state changes are contained within the reducer.
- Think Redux for global store, and useReducer to handle local view state.
- Always return **new object** from a reducer function, returning the same object with some new values will not work, useReducer only does a shallow "same object?" check.

##### useMemo
- Why use `useMemo`? e.g. computing the fibonacci sequence is expensive, especially when getting up to the 30+ range. `useMemo` can holds onto values.
	- Sort of like useEffect, you provide a variable that needs to change before a specific computation takes place.
	- Only introduce useMemo when you are dealing with a very computationally "heavy" component
- You should *have a memoization problem* before you try to solve it with `useMemo`

##### useCallback
- `useCallback` is part of the internals of `useMemo`
- Useful for performance optimization, perhaps two child components, one of which causes a state variable to change frequently, and another that performs heavy computation.

##### useLayoutEffect
- `useEffect` is scheduled, no exact way to know when it will run. `useLayoutEffect` happens **immediately after the component finishes rendering**. Important for animation, or referring to DOM elements in some way.

##### useImperativeHandle
- Likely won't need to use this unless developing a library. Go hand in hand with `useRef`. Child components can add functions that the parent can call.

##### useDebugValue
- Sort of like a `console.log` plugin for debug mode, probably something you would use for your custom hooks.

#### TailwindCSS
##### CSS and React
- PostCSS is like Babel for CSS
	- Parcel is already doing this with `autoprefixer` and the "browserslist", but PostCSS will handle more for us
-  Running `npx tailwindcss init` sets up required config file
	-  `npx tailwindcss init --full` populates tailwind.config.js with all the defaults, if you want them.
##### Tailwind Basics
- #til a clearer definition of `rem` ...
	- "root m" => width of the m character at root (html document) 

##### Tailwind Plugins
- Some plugins available from the tailwind team, eg for form styling

##### Grid and Breakpoints
- Breakpoints are styled by prefixing a class with `sm:` `md:` `lg:`

##### Positioning
#### Code Splitting
- The faster your app is, the more $ you make
	- Code splitting allows you to only send users the bare minimum that they need to get the application running, and send them the rest as they need it.
- React's `lazy` function and the `<Suspense>` component help to cut your bundle size on larger applications.
	- The `fallback` property on `<Suspense>` is for things like your loading spinners.
	- Do not lazy load your `fallback`
- Resource hinting (e.g. prefetch / preload ) is not what for Suspense / lazy are for. Service workers are better used for fetching data that the user will likely use next.
- In child components of the `<Suspense>` component, you do not need to re-import `<Suspense>`, only `lazy`.
- `es-build` does not handle `import` the way most bundlers do, they are working it.

#### Server Side Rendering
- Make sure you can measure the improvement in either code splitting / ssr before implementing it.
- No browser concerns can be in the component.
	- e.g. Analytics, window
- Build client, build server, then start server.

#### TypeScript
- Type checker for JS. More verbose, but extra assurance that your code will fail less often if you follow the types
- TS doesn't like `null`
- Generics are catered towards things like APIs
- Types vs Interface
	- Type: 
	- Interface: when you can use an interface, use an interface...

#### Redux
- Created by Dan Abramov 
- Redux came as a solution to the problems that using React with Flux presented.
- useContext and useReducer have vastly improved the state of React's state management
- Redux is very testable, big benefit of using it. Using `useReducer` also simplifies testing.

##### Reducers
- Every reducer requires a default state
- Every reducer must receive an action with a type (`action.type`)
	- Extra parameters are sent as the `action.payload`
- Always synchronous, middlewares are available to force async behavior
- Must be pure with no side-effects

##### Action Creators
- Effective way to "shape" your actions for redux dispatch calls

##### Providers
- Wrapper to access state store on your components

##### Dispatching Actions
- Sending messages to reducer to handle which state changes should occur, sending them to the state store.

##### Redux Dev Tools

#### Testing
- Write tests where you need them, don't go overkill with terrible tests.
	- Try to write tests for functionality, not implementation. Make your tests interact with components as a user would, not as a developer would.
	- UI changes a lot, so testing for that may just be a waste of time
	- When encountering a pesky bug, try writing a test that would have caught it.
	- Write tests for the important parts of your app, the ones that define user experience

##### Basic React Testing
- Adding a `__tests__` directory (`__` the dunders are important, `jest` will not work without this specifically named directory)
- `data-testid="foo"` is a much safer tag to use than finding elements by class name or id.
- From the command line, running `jest --watch` (which we wrote into a script) you can have your tests running as you make edits to files and can watch them go green was we code.

##### Testing UI Interactions
##### Testing Custom Hooks
##### Mocks
##### Snapshots
##### Istanbul
#### Wrapping Up
