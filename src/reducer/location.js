export default function location (state = "Seattle, WA", action) { // need a default state, every reducer will run at store init to get default state
  switch (action.type) { // every action must have a type
    case "CHANGE_LOCATION":
      return action.payload; // extra parameters sent, extra e.g. primitive values or objects to update state with
    default:
      return state;
  }
}
