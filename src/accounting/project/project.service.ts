import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/project.input';
import { NotFoundError } from 'rxjs';
import { UpdateProjectInput } from './dto/update-project.input';

export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async createOne(project: CreateProjectInput): Promise<Project> {
    return await this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    return await this.projectRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updatedProject: UpdateProjectInput,
  ): Promise<Project> {
    const currentProject = await this.findOne(id);

    if (!currentProject) {
      throw new NotFoundError('Project not found');
    }

    const _updatedProject = this.projectRepository.merge(
      currentProject,
      updatedProject,
    );

    return await this.projectRepository.save(_updatedProject);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.projectRepository.delete({
      id,
    });
  }
}
