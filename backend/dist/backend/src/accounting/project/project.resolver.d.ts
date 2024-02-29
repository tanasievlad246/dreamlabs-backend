import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectInput } from './dto/project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectIdInput } from './dto/project-id.input';
export declare class ProjectResolver {
    private readonly projectService;
    constructor(projectService: ProjectService);
    findAllProjects(): Promise<Project[]>;
    findOneProject(findOneProjectInput: ProjectIdInput): Promise<Project>;
    createOneProject(projectInputType: CreateProjectInput): Promise<Project>;
    updateOneProject(updateOneProjectInput: UpdateProjectInput): Promise<Project>;
    deleteOneProject(deleteOneProjectInput: ProjectIdInput): Promise<boolean>;
}
