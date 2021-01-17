import { MiddlewareOptions } from './MiddlewareOptions'

class Validator {}

describe('IMiddlewareOptions', () => {
  describe('interface', () => {
    it('accepts valid options', () => {
      const options: MiddlewareOptions = {
        body: {
          classType: Validator
        }
      }
      expect(options).toBeDefined()
    })
  })
})
