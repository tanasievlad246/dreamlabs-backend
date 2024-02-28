import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class RequestLogger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request logged:', req.method, req.url);
    next();
  }
}
