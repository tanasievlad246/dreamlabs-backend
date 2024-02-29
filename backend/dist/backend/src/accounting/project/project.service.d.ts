import { Project } from './project.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { AccountingService } from '../types';
export declare class ProjectService implements AccountingService<Project> {
    private projectRepository;
    constructor(projectRepository: Repository<Project>);
    createOne(project: CreateProjectInput): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    updateOne(id: string, updatedProject: UpdateProjectInput): Promise<Project>;
    deleteOne(id: string): Promise<DeleteResult>;
}
