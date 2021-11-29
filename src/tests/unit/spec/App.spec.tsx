import { render, screen } from '@testing-library/react'
import { App } from '../../../App'

test('renders application title', () => {
  render(<App title={ 'Invoice Manager Application on test' }/>)

  const linkElement = screen.getByText(/Invoice Manager Application on test/i)
  expect(linkElement).toBeInTheDocument()
})
