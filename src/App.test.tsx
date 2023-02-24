import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { FETCH_ERROR_418, FETCH_ERROR_500 } from "./definitions/fetch_errors";
import { API_BASE_URL } from "./config/config";

const server = setupServer(
  rest.get(`${API_BASE_URL}/people/1/`, (req, res, ctx) => {
    return res(ctx.json({ name: "Luke Skywalker" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<App>", () => {
  test("on successful API call, displays character name", async () => {
    render(<App />);
    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
  });

  test("on server error 500, displays correct error message", async () => {
    server.use(
      rest.get(`${API_BASE_URL}/people/1/`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<App />);
    expect(await screen.findByText(FETCH_ERROR_500)).toBeInTheDocument();
  });

  test("on HTTP code 418, displays correct error message", async () => {
    server.use(
      rest.get(`${API_BASE_URL}/people/1/`, (req, res, ctx) => {
        return res(ctx.status(418));
      })
    );
    render(<App />);
    expect(await screen.findByText(FETCH_ERROR_418)).toBeInTheDocument();
  });
});
