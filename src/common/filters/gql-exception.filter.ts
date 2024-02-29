import { ArgumentsHost, Catch, Inject } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch()
export class GraphqlExceptionFilter<T extends Error>
  implements GqlExceptionFilter
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  catch(exception: T, host: ArgumentsHost) {
    this.logger.error(exception)
  }
}
