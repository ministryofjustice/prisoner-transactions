import { Request } from 'express'
import { RequestLinkForm } from 'forms'
import validate from './RequestLinkValidator'

describe('RequestLinkValidadtor', () => {
  const req = {
    flash: jest.fn() as (type: string, message: Array<Record<string, string>>) => number,
  } as Request

  const validForm: RequestLinkForm = {
    email: 'an.email@domain.com',
  }

  let submitService: jest.Mocked<(requestLinkForm: RequestLinkForm) => Promise<void>>
  beforeEach(() => {
    jest.resetAllMocks()
    submitService = jest.fn().mockResolvedValue(null)
  })

  describe('valid email address', () => {
    it('should return email sent as next page when valid', async () => {
      const form = { ...validForm }
      const nextPage = await validate(form, req, submitService)
      expect(nextPage).toEqual('/email-sent')
    })
    it('should call the submit service when valid', async () => {
      const form = { ...validForm }
      await validate(form, req, submitService)
      expect(submitService).toHaveBeenCalledWith(validForm)
    })
    it('should not display any errors when valid', async () => {
      const form = { ...validForm }
      await validate(form, req, submitService)
      expect(req.flash).not.toHaveBeenCalled()
    })
  })

  describe('invalid email address', () => {
    it('should return request link as next page when invalid', async () => {
      const form = {}
      const nextPage = await validate(form, req, submitService)
      expect(nextPage).toEqual('/request-link')
    })
    it('should not call submit service when invalid', async () => {
      const form = {}
      await validate(form, req, submitService)
      expect(submitService).not.toHaveBeenCalled()
    })
    it('should display error when email missing', async () => {
      const form = {}
      await validate(form, req, submitService)
      expect(req.flash).toHaveBeenCalledWith('errors', [{ href: '#email', text: 'Enter an email address' }])
    })
    it('should display error when email invalid', async () => {
      const form = { email: 'invalid-email' }
      await validate(form, req, submitService)
      expect(req.flash).toHaveBeenCalledWith('errors', [{ href: '#email', text: 'Enter a valid email address' }])
    })
  })
})
