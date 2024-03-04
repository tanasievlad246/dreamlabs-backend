import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectInput } from './dto/project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectIdInput } from './dto/project-id.input';
import { IProjectResolver } from './project-resolver.interface';
import { AddInvoiceToProjectInput } from './dto/project-add-invoice.input';

@Resolver(() => Project)
export class ProjectResolver implements IProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project])
  async findAllProjects(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Query(() => Project)
  async findOneProject(
    @Args('findOneProjectInput') findOneProjectInput: ProjectIdInput,
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
    return await this.projectService.updateOne(
      updateOneProjectInput.id,
      updateOneProjectInput,
    );
  }

  @Mutation(() => Boolean)
  async deleteOneProject(
    @Args('deleteOneProjectInput') deleteOneProjectInput: ProjectIdInput,
  ): Promise<boolean> {
    if (
      (await this.projectService.deleteOne(deleteOneProjectInput.id)).affected >
      0
    ) {
      return true;
    }
    return false;
  }

  @Mutation(() => Project)
  async addInvoiceToProject(
    @Args('addInvoiceToProjectInput')
    addInvoiceToProjectInput: AddInvoiceToProjectInput,
  ) {
    return await this.projectService.addInvoice(
      addInvoiceToProjectInput.projectId,
      addInvoiceToProjectInput.invoiceId,
    );
  }
}
