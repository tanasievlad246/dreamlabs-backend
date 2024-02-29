import { ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Logger } from 'winston';
export declare class GraphqlExceptionFilter<T extends Error> implements GqlExceptionFilter {
    private readonly logger;
    constructor(logger: Logger);
    catch(exception: T, host: ArgumentsHost): void;
}
