import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectIdInput {
  @Field(() => String)
  id: string;
}
