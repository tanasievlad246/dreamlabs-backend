import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { ProjectInputType } from './dto/project.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project])
  async findAllProjects(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Mutation(() => Project)
  async createOneProject(
    @Args('createProjectInput') projectInputType: ProjectInputType,
  ) {
    return await this.projectService.createOne(projectInputType);
  }
}
