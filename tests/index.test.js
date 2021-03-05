/* globals describe, expect, it, beforeAll */

import preloadAll from 'jest-next-dynamic'
import { getPage } from 'next-page-tester'
import { screen } from '@testing-library/react'

beforeAll(async () => {
  await preloadAll()
})

describe('Pages render', () => {
  it('renders home page', async () => {
    const { render } = await getPage({
      route: '/'
    })

    render()
    expect(await screen.findByText('Hey, I’m Ian!', { exact: false })).toBeInTheDocument()
  })

  it('renders experience page', async () => {
    const { render } = await getPage({
      route: '/experience'
    })

    render()
    expect(await screen.findByText('Truth Collective, LLC')).toBeInTheDocument()
  })

  it('renders works page', async () => {
    const { render } = await getPage({
      route: '/works'
    })

    render()
    expect(await screen.findByText('Selected works')).toBeInTheDocument()
  })

  it('renders contact page', async () => {
    const { render } = await getPage({
      route: '/contact'
    })

    await render()

    expect(screen.getByText('How to reach me')).toBeInTheDocument()
  })
})
