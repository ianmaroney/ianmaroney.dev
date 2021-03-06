/* globals describe, expect, it, beforeAll, jest */

import { createRef } from 'react'
import striptags from 'striptags'
import preloadAll from 'jest-next-dynamic'
import { render, screen, fireEvent } from '@testing-library/react'

import ContentRender from '@/partials/content-render'
import Nav from '@/partials/nav'
import Meta from '@/partials/meta'
import ModuleGroup from '@/partials/module-group'
import ModuleGroups from '@/partials/module-groups'

const content = 'Content.'
const contentTag = 'p'
const contentTagAttrClass = { className: 'content' }
const contentTagAttrOnClick = { onClick: jest.fn() }
const contentTagAttrClassRef = { className: 'content', ref: createRef(null) }
const contentInTag = '<p>Content in tag.</p>'

const navNavItems = [{
  title: 'Home',
  url: '/'
}, {
  title: 'Test 1',
  url: '/test-1'
}, {
  title: 'Test 2',
  url: '/test-2'
}, {
  title: 'Test 3',
  url: '/test-3'
}]
const navHandleClick = jest.fn(e => e.preventDefault())

const metaGlobals = {
  titleExtras: [
    'Test <title> Ending'
  ]
}

const metaPage = {
  path: '/experience',
  slug: 'experience',
  title: 'Experience'
}

const moduleGroupModuleGroup = {
  modules: [{
    type: 'content',
    title: 'Content',
    heading: 'Heading',
    content: '<p>Content.</p>',
    blocks: [
      {
        title: 'Content Block',
        heading: 'Block Heading',
        content: '<p>Block content.</p>'
      }
    ]
  }]
}

const moduleGroupExtras = {
  experience: {
    content: [
      {
        company: 'Experience Company',
        role: 'Experience Role',
        start: '2021-03-01',
        current: true,
        location: 'Experience City, EX',
        content: '<p>Experience content.</p>'
      },
      {
        company: 'Experience Company 2',
        role: 'Experience Role 2',
        start: '2021-01-01',
        end: '2021-02-28',
        location: 'Experience City 2, EX2',
        content: '<p>Experience content 2.</p>'
      }
    ]
  }
}

const moduleGroupsPage = {
  ...metaPage,
  moduleGroups: [{
    title: 'ModuleGroup Title',
    modules: moduleGroupModuleGroup.modules
  }],
  extras: moduleGroupExtras
}

beforeAll(async () => {
  await preloadAll()
})

describe('Partials ContentRender', () => {
  it('null ContentRender', async () => {
    render(<ContentRender />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null ContentRender: tag', async () => {
    render(<ContentRender tag={contentTag} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('ContentRender: content', async () => {
    render(<ContentRender content={contentInTag} />)
    expect(screen.getByText(striptags(contentInTag))).toBeInTheDocument()
  })

  it('ContentRender: content + tag', async () => {
    render(<ContentRender content={content} tag={contentTag} />)
    expect(screen.getByText(content)).toBeInTheDocument()
  })

  it('ContentRender: content + tag + tagAttr{onClick}', async () => {
    render(<ContentRender content={content} tag={contentTag} tagAttr={contentTagAttrOnClick} />)
    expect(screen.getByText(content)).toBeInTheDocument()
    fireEvent.click(screen.getByText(content))
    expect(contentTagAttrOnClick.onClick).toHaveBeenCalledTimes(1)
  })

  it('ContentRender: content + tag + tagAttr{className}', async () => {
    const tagAttr = Object.assign({}, contentTagAttrClass)
    const { container } = render(<ContentRender content={content} tag={contentTag} tagAttr={tagAttr} />)
    expect(screen.getByText(content)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('ContentRender: content + tag + tagAttr{className, ref}', async () => {
    const tagAttr = Object.assign({}, contentTagAttrClassRef)
    const { container } = render(<ContentRender content={content} tag={contentTag} tagAttr={tagAttr} />)
    expect(screen.getByText(content)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

// TODO: Tests for <Form /> partial

describe('Partials Meta', () => {
  it('null Head', async () => {
    render(<Meta />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Head: globals', async () => {
    render(<Meta globals={Object.assign({}, metaGlobals)} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  // TODO: Can the <Meta /> component be tested with data? Does its unique intent prevent it from rendering directly into the DOM?
  // it('Head: page', async () => {
  //   render(<Nav page={metaPage} />)
  //   expect(screen.getByText(metaPage.title)).toBeInTheDocument()
  // })
})

describe('Partials ModuleGroup', () => {
  it('null ModuleGroup', async () => {
    render(<ModuleGroup />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null ModuleGroup: extras', async () => {
    const extras = Object.assign({}, moduleGroupExtras)
    render(<ModuleGroup extras={extras} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('ModuleGroup: moduleGroup', async () => {
    const moduleGroup = Object.assign({}, moduleGroupModuleGroup)
    moduleGroup.modules[0].type = 'content'
    render(<ModuleGroup moduleGroup={moduleGroup} />)
    expect(screen.getByText(moduleGroup.modules[0].heading)).toBeInTheDocument()
  })

  it('ModuleGroup: moduleGroup + extras', async () => {
    const moduleGroup = Object.assign({}, moduleGroupModuleGroup)
    moduleGroup.modules[0].type = 'experience'
    const extras = Object.assign({}, moduleGroupExtras)
    render(<ModuleGroup moduleGroup={moduleGroup} extras={extras} />)
    expect(screen.getByText(moduleGroup.modules[0].heading)).toBeInTheDocument()
    expect(screen.getByText(extras.experience.content[0].company)).toBeInTheDocument()
  })
})

describe('Partials ModuleGroups', () => {
  it('null ModuleGroups', async () => {
    render(<ModuleGroups />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('ModuleGroups: page', async () => {
    const page = Object.assign({}, moduleGroupsPage)
    render(<ModuleGroups page={page} />)
    expect(screen.getByText(page.moduleGroups[0].modules[0].heading)).toBeInTheDocument()
  })

  it('ModuleGroups: page w/extras', async () => {
    const page = Object.assign({}, moduleGroupsPage)
    page.moduleGroups[0].modules[0].type = 'experience'
    page.moduleGroups[0].modules[0].title = 'Content'
    render(<ModuleGroups page={page} />)
    expect(screen.getByText(page.moduleGroups[0].modules[0].heading)).toBeInTheDocument()
  })
})

describe('Partials Nav', () => {
  it('null Nav', async () => {
    render(<Nav />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Nav: setNavigating', async () => {
    render(<Nav setNavigating={navHandleClick} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('Nav: navItems', async () => {
    const navItems = [...navNavItems]
    render(<Nav navItems={navItems} />)
    expect(screen.getByText(navItems[0].title)).toBeInTheDocument()
  })

  it('Nav: navItems + handleClick', async () => {
    const navItems = [...navNavItems]
    render(<Nav navItems={navItems} handleClick={navHandleClick} />)
    expect(screen.getByText(navItems[0].title)).toBeInTheDocument()

    fireEvent.click(screen.getByText(navItems[0].title))
    expect(navHandleClick).toHaveBeenCalledTimes(1)
  })
})
