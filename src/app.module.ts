import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AccountingModule } from './accounting/accounting.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

console.log(process.env);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      password: process.env.DB_PASS,
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      logging: process.env.NODE_ENV !== 'production',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AccountingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
