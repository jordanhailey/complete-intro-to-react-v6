import { StaticRouter } from "react-router";
import { expect, test } from "@jest/globals";
import { create } from "react-test-renderer";
import { createRenderer } from "react-test-renderer/shallow";
import Results from "../components/Results";
import { PETS } from "../testData"



test("renders correctly with no pets", () => {
  const tree = create(<Results pets={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly with some pets - PROBLEMATIC", () => {
  const tree = create(
    <StaticRouter>
      <Results pets={PETS} />
    </StaticRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly with some pets - shallow rendered", () => {
  const r = createRenderer();
  r.render(<Results pets={PETS} />);
  expect(r.getRenderOutput()).toMatchSnapshot();
});
