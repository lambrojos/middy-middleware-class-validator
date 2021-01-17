import {
  ClassType,
  TransformValidationOptions
} from 'class-transformer-validator'
import Lambda from 'aws-lambda'

type EventKeys = keyof Lambda.APIGatewayProxyEvent

export type MiddlewareOptions = Partial<
  Record<EventKeys, ValidationOptions<object>>
>
export interface ValidationOptions<T extends object> {
  classType: ClassType<T>
  validatorOptions?: TransformValidationOptions
}
