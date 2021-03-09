/* globals describe, expect, it */

import { render, screen } from '@testing-library/react'

import Primary from '@/templates/primary'

import data from '../data'

describe('Templates render', () => {
  it('null Primary', async () => {
    render(<Primary />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Primary: page', async () => {
    render(<Primary page={data.moduleGroupsPage} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Primary: children', async () => {
    render(<Primary><p>{data.children}</p></Primary>)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Primary: globals', async () => {
    render(<Primary globals={data.metaGlobals} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Primary: menus', async () => {
    render(<Primary menus={Object.assign({}, { main: data.navNavItems })} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Primary: page + children', async () => {
    const page = Object.assign({}, data.moduleGroupsPage)
    render(<Primary page={page}><p>{data.children}</p></Primary>)
    expect(screen.getByText(data.children)).toBeInTheDocument()
  })

  it('null Primary: page + globals + menus + children', async () => {
    const page = Object.assign({}, data.moduleGroupsPage)
    const globals = Object.assign({}, data.metaGlobals)
    const menus = Object.assign({}, { main: data.navNavItems })
    render(<Primary page={page} globals={globals} menus={menus}><p>{data.children}</p></Primary>)
    expect(screen.getByText(data.children)).toBeInTheDocument()
  })
})
