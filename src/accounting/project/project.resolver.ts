import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectInput } from './dto/project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project])
  async findAllProjects(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Query(() => Project)
  async findOneProject(
    @Args('findOneProjectInput') findOneProjectInput: { id: string },
  ): Promise<Project> {
    return this.projectService.findOne(findOneProjectInput.id);
  }

  @Mutation(() => Project)
  async createOneProject(
    @Args('createProjectInput') projectInputType: CreateProjectInput,
  ) {
    return await this.projectService.createOne(projectInputType);
  }

  @Mutation(() => Project)
  async updateOneProject(
    @Args('updateOneProjectInput') updateOneProjectInput: UpdateProjectInput,
  ): Promise<Project> {
    return await this.projectService.update(
      updateOneProjectInput.id,
      updateOneProjectInput,
    );
  }
}
