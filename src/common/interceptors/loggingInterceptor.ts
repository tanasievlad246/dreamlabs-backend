import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    const now = Date.now();
    const { req } = ctx.getContext();

    const operation = req.body.query;

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.info(operation)
        ),
      );
  }
}
