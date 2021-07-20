/* globals describe, expect, it, beforeAll */

import preloadAll from 'jest-next-dynamic'
import { getPage } from 'next-page-tester'
import { screen } from '@testing-library/react'

beforeAll(async () => {
  await preloadAll()
})

describe('Pages render', () => {
  it('/ - Home', async () => {
    const { render } = await getPage({
      route: '/',
      useDocument: true
    })

    render()
    expect(await screen.findByText('Hey, I’m Ian!', { exact: false })).toBeInTheDocument()
  })

  it('/experience - Experience', async () => {
    const { render } = await getPage({
      route: '/experience',
      useDocument: true
    })

    render()
    expect(await screen.findByText('Truth Collective, LLC')).toBeInTheDocument()
  })

  it('/works - Works', async () => {
    const { render } = await getPage({
      route: '/works',
      useDocument: true
    })

    render()
    expect(await screen.findByText('Selected works')).toBeInTheDocument()
  })

  it('/contact - Contact', async () => {
    const { render } = await getPage({
      route: '/contact',
      useDocument: true
    })

    render()
    expect(await screen.findByText('How to reach me')).toBeInTheDocument()
  })
})
