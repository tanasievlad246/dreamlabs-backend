import { ProjectIdInput } from './dto/project-id.input';
import { CreateProjectInput } from './dto/project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './project.entity';

export interface IProjectResolver {
  findAllProjects(): Promise<Project[]>;
  findOneProject(findOneProjectInput: ProjectIdInput): Promise<Project>;
  createOneProject(
    createProjectInputType: CreateProjectInput,
  ): Promise<Project>;
  updateOneProject(updateOneProjectInput: UpdateProjectInput): Promise<Project>;
  deleteOneProject(deleteOneProjectInput: ProjectIdInput): Promise<boolean>;
}
