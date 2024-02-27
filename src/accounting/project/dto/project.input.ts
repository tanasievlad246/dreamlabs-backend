import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @IsString()
  @Field(() => String)
  name: string;
}
