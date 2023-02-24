import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

const server = setupServer(
  rest.get('https://swapi.dev/api/people/1/', (req, res, ctx) => {
    return res(ctx.json({ name: "Luke Skywalker" }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('displays Luke Skywalker', async () => {
  render(<App />)
  expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument()
})

test('handles server error 500', async () => {
  server.use(
    rest.get('https://swapi.dev/api/people/1/', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  render(<App />)
  expect(await screen.findByText("Oops... something went wrong, try again")).toBeInTheDocument()
})

test('handles status 418', async () => {
  server.use(
    rest.get('https://swapi.dev/api/people/1/', (req, res, ctx) => {
      return res(ctx.status(418))
    }),
  )
  render(<App />)
  expect(await screen.findByText("418 I'm a tea pot 🫖, silly")).toBeInTheDocument()
})