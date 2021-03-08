/* globals jest */

import { createRef } from 'react'

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

const content = 'Content.'
const contentTag = 'p'
const contentTagAttrClass = { className: 'content' }
const contentTagAttrOnClick = { onClick: jest.fn() }
const contentTagAttrClassRef = { className: 'content', ref: createRef(null) }
const contentInTag = '<p>Content in tag.</p>'
const children = 'Children.'

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
  ],
  success: {
    heading: 'Success',
    content: '<p>Success explanation.</p>'
  },
  error: {
    heading: 'Error',
    content: '<p>Error explanation.</p>'
  }
}

module.exports = {
  moduleData,
  experienceData,
  worksData,
  content,
  contentTag,
  contentTagAttrClass,
  contentTagAttrOnClick,
  contentTagAttrClassRef,
  contentInTag,
  navNavItems,
  navHandleClick,
  metaGlobals,
  metaPage,
  moduleGroupModuleGroup,
  moduleGroupExtras,
  moduleGroupsPage,
  formData,
  children
}
