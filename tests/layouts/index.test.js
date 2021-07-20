/* globals describe, expect, it, beforeAll */

import preloadAll from 'jest-next-dynamic'
import { render, screen, fireEvent } from '@testing-library/react'

import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import Main from '@/layouts/main'

import data from '../data'

jest.mock('next/link', () => {
  return ({children}) => {
    return children
  }
})

beforeAll(async () => {
  await preloadAll()
})

describe('Footer renders', () => {
  it('Footer', async () => {
    render(<Footer />)
    expect(screen.getByText(`©${new Date().getFullYear()} Ian Maroney`)).toBeInTheDocument()
  })
})

describe('Header renders', () => {
  it('Header: null', async () => {
    const menus = Object.assign({}, { main: data.navNavItems })
    render(<Header />)
    expect(screen.getByText('Show Menu')).toBeInTheDocument()
    expect(screen.getByText('aroney')).toBeInTheDocument()
    expect(screen.queryByText(new RegExp(menus.main[0].title, 'g'))).toBeNull()

    fireEvent.focus(screen.getByText('Show Menu'))
    expect(screen.getByRole('banner')).toHaveClass('t')

    fireEvent.click(screen.getByText('Show Menu'))
    expect(screen.getByText('Hide Menu')).toBeInTheDocument()

    fireEvent.click(screen.getByText('aroney'))
    expect(screen.getByText('Show Menu')).toBeInTheDocument()
  })

  it('Header: menus - incomplete', async () => {
    const incompleteNavItems = [ ...data.navNavItems, { title: 'Incomplete' } ]
    const menus = Object.assign({}, { main: incompleteNavItems })
    render(<Header menus={menus} />)
    expect(screen.getByText('Show Menu')).toBeInTheDocument()
    expect(screen.getByText('aroney')).toBeInTheDocument()
    expect(screen.getByText(menus.main[0].title)).toBeInTheDocument()

    expect(screen.queryByText(/Incomplete/)).toBeNull()
  })

  it('Header: menus', async () => {
    const menus = Object.assign({}, { main: data.navNavItems })
    render(<Header menus={menus} />)
    expect(screen.getByText('Show Menu')).toBeInTheDocument()
    expect(screen.getByText('aroney')).toBeInTheDocument()
    expect(screen.getByText(menus.main[0].title)).toBeInTheDocument()

    fireEvent.mouseOver(screen.getByText('Show Menu'))
    expect(screen.getByRole('banner')).toHaveClass('t')

    fireEvent.click(screen.getByText('Show Menu'))
    expect(screen.getByText('Hide Menu')).toBeInTheDocument()
  })
})

describe('Main renders', () => {
  it('null Main', async () => {
    render(<Main />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('Main: page', async () => {
    const page = Object.assign({}, data.moduleGroupsPage)
    render(<Main page={page} />)
    expect(screen.getByText(page.moduleGroups[0].modules[0].heading)).toBeInTheDocument()
  })

  it('Main: page (swap in: content-blocks)', async () => {
    const page = Object.assign({}, data.moduleGroupsPage)
    page.moduleGroups[0].modules[0].type = 'content-blocks'
    render(<Main page={page} />)
    expect(screen.getByText(page.moduleGroups[0].modules[0].heading)).toBeInTheDocument()
    expect(screen.getByText(page.moduleGroups[0].modules[0].blocks[0].heading)).toBeInTheDocument()
  })
})
