import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Inject, NotFoundException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async createOne(project: CreateProjectInput): Promise<Project> {
    return await this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
    });

    if (!project) {
      this.logger.error({ id, message: 'Invalid project id input on find project' });
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(
    id: string,
    updatedProject: UpdateProjectInput,
  ): Promise<Project> {
    const currentProject = await this.findOne(id);

    if (!currentProject) {
      this.logger.error({ id, message: 'Invalid project id input on update project' });
      throw new NotFoundException('Project not found');
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
