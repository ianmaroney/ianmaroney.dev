/* globals describe, expect, it */

import striptags from 'striptags'
import { render, screen } from '@testing-library/react'

import ModuleContent from '@/modules/content'
import ModuleContentBlocks from '@/modules/content-blocks'
import ModuleExperience from '@/modules/experience'
import ModuleForm from '@/modules/form'
import ModuleWorks from '@/modules/works'

const moduleData = {
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
}

const experienceData = {
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

const formData = {
  fields: [
    {
      title: 'Name',
      type: 'text',
      size: '_12 md_6',
      attributes: {
        maxLength: 64,
        required: true
      }
    },
    {
      title: 'Email',
      type: 'email',
      size: '_12 md_6',
      attributes: {
        maxLength: 128,
        required: true
      }
    },
    {
      title: 'Message',
      type: 'textarea',
      size: '_12',
      attributes: {
        required: true,
        rows: 6
      }
    }
  ]
}

const worksData = {
  works: [
    {
      client: 'Works Client',
      project: 'Works Project',
      links: [
        {
          title: 'Campaign Website',
          label: 'View demo',
          url: 'https://google.com'
        }
      ],
      content: '<p>Works content.</p>'
    }
  ]
}

describe('Modules render', () => {
  it('renders content module', async () => {
    render(<ModuleContent moduleData={moduleData} />)
    expect(screen.getByText(moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(moduleData.content))).toBeInTheDocument()
  })

  it('renders content-blocks module', async () => {
    render(<ModuleContentBlocks moduleData={moduleData} />)

    expect(screen.getByText(moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(moduleData.blocks[0].heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(moduleData.blocks[0].content))).toBeInTheDocument()
  })

  it('renders experience module', async () => {
    render(<ModuleExperience moduleData={moduleData} experience={experienceData} />)

    expect(screen.getByText(moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(experienceData.content[0].company)).toBeInTheDocument()
    expect(screen.getByText(experienceData.content[0].role)).toBeInTheDocument()
    expect(screen.getByText(experienceData.content[0].location, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(striptags(experienceData.content[0].content))).toBeInTheDocument()
  })

  it('renders form module', async () => {
    moduleData.fields = formData.fields
    render(<ModuleForm moduleData={moduleData} />)

    expect(screen.getByText(moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(formData.fields[0].title)).toBeInTheDocument()
  })

  it('renders works module', async () => {
    render(<ModuleWorks moduleData={moduleData} works={worksData} />)

    expect(screen.getByText(moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(worksData.works[0].client)).toBeInTheDocument()
    expect(screen.getByText(worksData.works[0].project)).toBeInTheDocument()
    expect(screen.getByText(worksData.works[0].links[0].title)).toBeInTheDocument()
    expect(screen.getByText(worksData.works[0].links[0].label)).toBeInTheDocument()
    expect(screen.getByText(striptags(worksData.works[0].content))).toBeInTheDocument()
  })
})
