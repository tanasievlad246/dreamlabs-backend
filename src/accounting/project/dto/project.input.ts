import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ProjectInputType {
  @IsString()
  @Field(() => String)
  name: string;
}
