import {
  Catch,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch()
export class GraphqlExceptionFilter<T extends Error>
  implements GqlExceptionFilter
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  catch(exception: T) {
    if (exception instanceof NotFoundException) {
      throw exception;
    } else {
      this.logger.error(exception.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: exception.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
