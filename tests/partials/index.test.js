/* globals describe, expect, it, beforeAll */

import striptags from 'striptags'
import preloadAll from 'jest-next-dynamic'
import { render, screen, fireEvent } from '@testing-library/react'

import HTMLRender from '@/partials/html-render'
import Nav from '@/partials/nav'
import Meta from '@/partials/meta'
import ModuleGroup from '@/partials/module-group'
import ModuleGroups from '@/partials/module-groups'
import Form from '@/partials/form'

import data from '../data'

beforeAll(async () => {
  await preloadAll()
})

describe('Partials HTMLRender', () => {
  it('null HTMLRender', async () => {
    render(<HTMLRender />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null HTMLRender: tag', async () => {
    render(<HTMLRender tag={data.contentTag} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('HTMLRender: content', async () => {
    render(<HTMLRender content={data.contentInTag} />)
    expect(screen.getByText(striptags(data.contentInTag))).toBeInTheDocument()
  })

  it('HTMLRender: content + tag', async () => {
    render(<HTMLRender content={data.content} tag={data.contentTag} />)
    expect(screen.getByText(data.content)).toBeInTheDocument()
  })

  it('HTMLRender: content + tag + tagAttr{onClick}', async () => {
    render(<HTMLRender content={data.content} tag={data.contentTag} tagAttr={data.contentTagAttrOnClick} />)
    expect(screen.getByText(data.content)).toBeInTheDocument()
    fireEvent.click(screen.getByText(data.content))
    expect(data.contentTagAttrOnClick.onClick).toHaveBeenCalledTimes(1)
  })

  it('HTMLRender: content + tag + tagAttr{className}', async () => {
    const tagAttr = Object.assign({}, data.contentTagAttrClass)
    const { container } = render(<HTMLRender content={data.content} tag={data.contentTag} tagAttr={tagAttr} />)
    expect(screen.getByText(data.content)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('HTMLRender: content + tag + tagAttr{className, ref}', async () => {
    const tagAttr = Object.assign({}, data.contentTagAttrClassRef)
    const { container } = render(<HTMLRender content={data.content} tag={data.contentTag} tagAttr={tagAttr} />)
    expect(screen.getByText(data.content)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

describe('Partials Form', () => {
  it('null Form', async () => {
    render(<Form />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Form: success', async () => {
    render(<Form success={Object.assign({}, data.formData.success)} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Form: error', async () => {
    render(<Form error={Object.assign({}, data.formData.error)} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Form: success + error', async () => {
    render(<Form success={Object.assign({}, data.formData.success)} error={Object.assign({}, data.formData.error)} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('Form: fields', async () => {
    const fields = [...data.formData.fields]
    render(<Form fields={fields} />)
    expect(screen.getByLabelText(fields[0].title)).toBeInTheDocument()
    expect(screen.getByLabelText(fields[1].title)).toBeInTheDocument()
    expect(screen.getByLabelText(fields[2].title)).toBeInTheDocument()
  })

  it('Form: fields + success', async () => {
    const fields = [...data.formData.fields]
    render(<Form fields={fields} success={Object.assign({}, data.formData.success)} />)
    expect(screen.getByLabelText(fields[0].title)).toBeInTheDocument()
    expect(screen.getByLabelText(fields[1].title)).toBeInTheDocument()
    expect(screen.getByLabelText(fields[2].title)).toBeInTheDocument()
  })

  it('Form: fields + error', async () => {
    const fields = [...data.formData.fields]
    render(<Form fields={fields} error={Object.assign({}, data.formData.error)} />)
    expect(screen.getByLabelText(fields[0].title)).toBeInTheDocument()
    expect(screen.getByLabelText(fields[1].title)).toBeInTheDocument()
    expect(screen.getByLabelText(fields[2].title)).toBeInTheDocument()
  })

  it('Form: fields success + error', async () => {
    const fields = [...data.formData.fields]
    render(<Form fields={fields} success={Object.assign({}, data.formData.success)} error={Object.assign({}, data.formData.error)} />)
    expect(screen.getByLabelText(fields[0].title)).toBeInTheDocument()
    expect(screen.getByLabelText(fields[1].title)).toBeInTheDocument()
    expect(screen.getByLabelText(fields[2].title)).toBeInTheDocument()
  })
})

describe('Partials Meta', () => {
  it('null Head', async () => {
    render(<Meta />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('null Head: globals', async () => {
    render(<Meta globals={Object.assign({}, data.metaGlobals)} />)
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
    const extras = Object.assign({}, data.moduleGroupExtras)
    render(<ModuleGroup extras={extras} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('ModuleGroup: moduleGroup', async () => {
    const moduleGroup = Object.assign({}, data.moduleGroupModuleGroup)
    moduleGroup.modules[0].type = 'content'
    render(<ModuleGroup moduleGroup={moduleGroup} />)
    expect(screen.getByText(moduleGroup.modules[0].heading)).toBeInTheDocument()
  })

  it('ModuleGroup: moduleGroup + extras', async () => {
    const moduleGroup = Object.assign({}, data.moduleGroupModuleGroup)
    moduleGroup.modules[0].type = 'experience'
    const extras = Object.assign({}, data.moduleGroupExtras)
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
    const page = Object.assign({}, data.moduleGroupsPage)
    render(<ModuleGroups page={page} />)
    expect(screen.getByText(page.moduleGroups[0].modules[0].heading)).toBeInTheDocument()
  })

  it('ModuleGroups: page w/extras', async () => {
    const page = Object.assign({}, data.moduleGroupsPage)
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
    render(<Nav setNavigating={data.navHandleClick} />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('Nav: navItems', async () => {
    const navItems = [...data.navNavItems]
    render(<Nav navItems={navItems} />)
    expect(screen.getByText(navItems[0].title)).toBeInTheDocument()
  })

  it('Nav: navItems + handleClick', async () => {
    const navItems = [...data.navNavItems]
    render(<Nav navItems={navItems} handleClick={data.navHandleClick} />)
    expect(screen.getByText(navItems[0].title)).toBeInTheDocument()

    fireEvent.click(screen.getByText(navItems[0].title))
    expect(data.navHandleClick).toHaveBeenCalledTimes(1)
  })
})
