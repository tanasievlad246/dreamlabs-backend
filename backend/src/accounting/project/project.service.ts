import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { NotFoundException } from '@nestjs/common';
import { AccountingService } from '../types';

export class ProjectService implements AccountingService<Project> {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async createOne(project: CreateProjectInput): Promise<Project> {
    return await this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['invoices'],
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async updateOne(
    id: string,
    updatedProject: UpdateProjectInput,
  ): Promise<Project> {
    const currentProject = await this.findOne(id);

    if (!currentProject) {
      throw new NotFoundException('Project not found');
    }

    const _updatedProject = this.projectRepository.merge(
      currentProject,
      updatedProject,
    );

    return await this.projectRepository.save(_updatedProject);
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.projectRepository.delete({
      id,
    });
  }
}