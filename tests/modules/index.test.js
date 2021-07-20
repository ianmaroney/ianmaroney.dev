/* globals describe, expect, it */

import striptags from 'striptags'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import ModuleContent from '@/modules/content'
import ModuleContentBlocks from '@/modules/content-blocks'
import ModuleExperience from '@/modules/experience'
import ModuleForm from '@/modules/form'
import ModuleWorks from '@/modules/works'

import data from '../data'

describe('Modules render', () => {
  it('ModuleContent: null', async () => {
    render(<ModuleContent />)
    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('ModuleContent', async () => {
    render(<ModuleContent moduleData={data.moduleData} />)
    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()
  })

  it('ModuleContentBlocks: null', async () => {
    render(<ModuleContentBlocks />)

    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('ModuleContentBlocks: no blocks', async () => {
    render(<ModuleContentBlocks moduleData={data.moduleDataNoBlocks} />)

    expect(screen.getByText(data.moduleDataNoBlocks.heading)).toBeInTheDocument()
    expect(screen.queryByText(new RegExp(data.moduleData.blocks[0].heading))).toBeNull()
  })

  it('ModuleContentBlocks', async () => {
    render(<ModuleContentBlocks moduleData={data.moduleData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(data.moduleData.blocks[0].heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.blocks[0].content))).toBeInTheDocument()
  })

  it('ModuleExperience: null', async () => {
    render(<ModuleExperience />)

    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('ModuleExperience: no experience', async () => {
    render(<ModuleExperience moduleData={data.moduleData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.queryByText(new RegExp(data.experienceData.content[0].company))).toBeNull()
  })

  it('ModuleExperience', async () => {
    render(<ModuleExperience moduleData={data.moduleData} experience={data.experienceData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(data.experienceData.content[0].company)).toBeInTheDocument()
    expect(screen.getByText(data.experienceData.content[0].role)).toBeInTheDocument()
    expect(screen.getByText(data.experienceData.content[0].location, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(striptags(data.experienceData.content[0].content))).toBeInTheDocument()
  })

  it('ModuleForm: null', async () => {
    render(<ModuleForm />)

    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('ModuleForm: submit - fail', async () => {
    data.moduleData.fields = data.formData.fields
    data.moduleData.success = data.formData.success
    data.moduleData.error = data.formData.error
    data.moduleData.user = '123456'
    render(<ModuleForm moduleData={data.moduleData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(data.formData.fields[0].title)).toBeInTheDocument()

    const nameField = screen.getByLabelText(data.formData.fields[0].title)
    fireEvent.change(nameField, { target: { value: 'test' } })
    expect(nameField.value).toBe('test')

    const emailField = screen.getByLabelText(data.formData.fields[1].title)
    fireEvent.change(emailField, { target: { value: 'testingBadEmail' } })
    expect(emailField.value).toBe('testingBadEmail')

    const messageField = screen.getByLabelText(data.formData.fields[2].title)
    fireEvent.change(messageField, { target: { value: 'A message.' } })
    expect(messageField.value).toBe('A message.')

    const button = screen.getByRole('button')
    fireEvent.submit(button)
    expect(await screen.findByText(/valid email address/gi)).toBeInTheDocument()

    fireEvent.change(emailField, { target: { value: 'test@testing.test' } })
    fireEvent.submit(button)

    await waitFor(() => expect(screen.queryAllByText(/valid email address/gi)).toHaveLength(0))
    const findByButton = await screen.findByText(/try again/gi, { timeout: 5000 })
    fireEvent.click(findByButton)

    await waitFor(() => expect(screen.queryAllByRole('form')).toHaveLength(1), { timeout: 5000 })
  })

  it('ModuleForm: submit - pass', async () => {
    data.moduleData.fields = data.formData.fields
    data.moduleData.success = data.formData.success
    data.moduleData.error = data.formData.error
    delete(data.moduleData.user)
    render(<ModuleForm moduleData={data.moduleData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(data.formData.fields[0].title)).toBeInTheDocument()

    const nameField = screen.getByLabelText(data.formData.fields[0].title)
    fireEvent.change(nameField, { target: { value: 'test' } })
    expect(nameField.value).toBe('test')

    const emailField = screen.getByLabelText(data.formData.fields[1].title)
    fireEvent.change(emailField, { target: { value: 'testingBadEmail' } })
    expect(emailField.value).toBe('testingBadEmail')

    const messageField = screen.getByLabelText(data.formData.fields[2].title)
    fireEvent.change(messageField, { target: { value: 'A message.' } })
    expect(messageField.value).toBe('A message.')

    const button = screen.getByRole('button')
    fireEvent.submit(button)
    expect(await screen.findByText(/valid email address/gi)).toBeInTheDocument()

    fireEvent.change(emailField, { target: { value: 'test@testing.test' } })
    fireEvent.submit(button)

    await waitFor(() => expect(screen.queryAllByText(/valid email address/gi)).toHaveLength(0))
    await waitFor(() => expect(screen.queryAllByText(/send another/gi)).toHaveLength(1), { timeout: 5000 })
  })

  it('ModuleWorks: null', async () => {
    render(<ModuleWorks />)

    expect(screen.queryByText(/\w/)).toBeNull()
  })

  it('ModuleWorks: no works', async () => {
    render(<ModuleWorks moduleData={data.moduleData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.queryByText(new RegExp(data.worksData[0].client))).toBeNull()
  })

  it('ModuleWorks: no links', async () => {
    render(<ModuleWorks moduleData={data.moduleData} works={data.worksDataNoLinks} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(data.worksDataNoLinks[0].client)).toBeInTheDocument()
    expect(screen.getByText(data.worksDataNoLinks[0].project)).toBeInTheDocument()
    expect(screen.queryByText(new RegExp(data.worksData[0].links[0].title))).toBeNull()
    expect(screen.queryByText(new RegExp(data.worksData[0].links[0].label))).toBeNull()
    expect(screen.getByText(striptags(data.worksDataNoLinks[0].content))).toBeInTheDocument()
  })

  it('ModuleWorks', async () => {
    render(<ModuleWorks moduleData={data.moduleData} works={data.worksData} />)

    expect(screen.getByText(data.moduleData.heading)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.moduleData.content))).toBeInTheDocument()

    expect(screen.getByText(data.worksData[0].client)).toBeInTheDocument()
    expect(screen.getByText(data.worksData[0].project)).toBeInTheDocument()
    expect(screen.getByText(data.worksData[0].links[0].title)).toBeInTheDocument()
    expect(screen.getByText(data.worksData[0].links[0].label)).toBeInTheDocument()
    expect(screen.getByText(striptags(data.worksData[0].content))).toBeInTheDocument()

    const clientNode = screen.getByText(data.worksData[0].client)
    fireEvent.keyDown(clientNode, { key: 'p', code: 'KeyP' })
    fireEvent.keyUp(clientNode, { key: 'p', code: 'KeyP' })
    fireEvent.keyDown(clientNode, { key: 'Enter', code: 'Enter' })
    fireEvent.keyUp(clientNode, { key: 'Enter', code: 'Enter' })

    fireEvent.keyDown(clientNode, { key: 'p', code: 'KeyP' })
    fireEvent.keyUp(clientNode, { key: 'p', code: 'KeyP' })
    fireEvent.keyDown(clientNode, { key: 's', code: 'KeyS' })
    fireEvent.keyUp(clientNode, { key: 's', code: 'KeyS' })
    fireEvent.keyDown(clientNode, { key: 's', code: 'KeyS' })
    fireEvent.keyUp(clientNode, { key: 's', code: 'KeyS' })
    fireEvent.keyDown(clientNode, { key: 't', code: 'KeyT' })
    fireEvent.keyUp(clientNode, { key: 't', code: 'KeyT' })
    fireEvent.keyDown(clientNode, { key: 'Enter', code: 'Enter' })
    fireEvent.keyUp(clientNode, { key: 'Enter', code: 'Enter' })
  })
})
