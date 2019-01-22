import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as util from "./utils/";

describe("smoke test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("buildQuery", () => {
  it("returns undefined when passed no query", () => {
    expect(util.buildQuery()).toEqual(undefined);
  });
  it("returns string of param when pass 1 param", () => {
    expect(util.buildQuery("foo")).toEqual("foo");
  });
  it("returns string of params joined with &", () => {
    expect(util.buildQuery("foo", "bar")).toEqual("foo&bar");
  });
});
