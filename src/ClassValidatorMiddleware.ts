/**
 * # Class Validator Middleware
 */
/** An additional comment to make sure Typedoc attributes the comment above to the file itself */
import { transformAndValidate } from 'class-transformer-validator'
import debugFactory, { IDebugger } from 'debug'
import middy from '@middy/core'
import {
  MiddlewareOptions,
  ValidationOptions
} from './interfaces/MiddlewareOptions'

/** The actual middleware */
export class ClassValidatorMiddleware
  implements middy.MiddlewareObject<any, any, any> {
  public static create (options: MiddlewareOptions): ClassValidatorMiddleware {
    return new ClassValidatorMiddleware(options)
  }

  /** The logger used in the module */
  private readonly logger: IDebugger

  /** Creates a new JSON error handler middleware */
  constructor (private readonly opts: MiddlewareOptions) {
    this.logger = debugFactory('middy-middleware-class-validator')
    this.logger('Setting up ClassValidatorMiddleware')
  }

  public before: middy.MiddlewareFunction<any, any> = async (
    handler: middy.HandlerLambda,
    next
  ) => {
    try {
      const validationPromises = Object.entries(this.opts).map(
        async ([handlerProp, config]: [string, ValidationOptions<object>]) => {
          handler.event[handlerProp] = await transformAndValidate(
            config.classType,
            handler.event[handlerProp],
            config.validatorOptions
          )
        }
      )
      await Promise.all(validationPromises)
    } catch (error) {
      error.statusCode = 400
      throw error
    }
  }
}

export default ClassValidatorMiddleware.create
