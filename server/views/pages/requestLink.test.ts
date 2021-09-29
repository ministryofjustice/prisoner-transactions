import fs from 'fs'
import cheerio from 'cheerio'
import nunjucks, { Template } from 'nunjucks'
import { registerNunjucks } from '../../utils/nunjucksSetup'

const snippet = fs.readFileSync('server/views/pages/requestLink.njk')

describe('Request Link View', () => {
  let compiledTemplate: Template
  let viewContext: Record<string, unknown>

  const njkEnv = registerNunjucks()

  beforeEach(() => {
    compiledTemplate = nunjucks.compile(snippet.toString(), njkEnv)
    viewContext = {}
  })

  it('should show an input for email', () => {
    const $ = cheerio.load(compiledTemplate.render(viewContext))

    expect($('#email').length).toEqual(1)
  })

  it('should show an error for email', () => {
    viewContext = {
      form: {
        email: 'invalid-email',
      },
      errors: [
        {
          href: '#email',
          text: 'Enter a valid email address',
        },
      ],
    }
    const $ = cheerio.load(compiledTemplate.render(viewContext))

    expect($('#email').attr('value')).toEqual('invalid-email')
    expect($('#email-error').text()).toContain('Enter a valid email address')
    expect($('.govuk-error-summary__list').find('a').text()).toContain('Enter a valid email address')
  })
})
