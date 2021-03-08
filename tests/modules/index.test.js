/* globals describe, expect, it */

import striptags from 'striptags'
import { render, screen } from '@testing-library/react'

import ModuleContent from '@/modules/content'
import ModuleContentBlocks from '@/modules/content-blocks'
import ModuleExperience from '@/modules/experience'
import ModuleForm from '@/modules/form'
import ModuleWorks from '@/modules/works'

import data from '../data'

describe('Modules render', () => {
  it('renders content module', async () => {
    render(<ModuleContent moduleData={data.moduleData} />)
    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()
  })

  it('renders content-blocks module', async () => {
    render(<ModuleContentBlocks moduleData={data.moduleData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(data.moduleData.blocks[0].heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.blocks[0].content))).toBeInTheDocument()
  })

  it('renders experience module', async () => {
    render(<ModuleExperience moduleData={data.moduleData} experience={data.experienceData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(data.experienceData.content[0].company)).toBeInTheDocument()
    expect(screen.getByText(data.experienceData.content[0].role)).toBeInTheDocument()
    expect(screen.getByText(data.experienceData.content[0].location, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(striptags(data.experienceData.content[0].content))).toBeInTheDocument()
  })

  it('renders form module', async () => {
    data.moduleData.fields = data.formData.fields
    render(<ModuleForm moduleData={data.moduleData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(data.formData.fields[0].title)).toBeInTheDocument()
  })

  it('renders works module', async () => {
    render(<ModuleWorks moduleData={data.moduleData} works={data.worksData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(data.worksData.works[0].client)).toBeInTheDocument()
    expect(screen.getByText(data.worksData.works[0].project)).toBeInTheDocument()
    expect(screen.getByText(data.worksData.works[0].links[0].title)).toBeInTheDocument()
    expect(screen.getByText(data.worksData.works[0].links[0].label)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.worksData.works[0].content))).toBeInTheDocument()
  })
})
