import { Test, TestingModule } from '@nestjs/testing';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { serviceMock } from '../mocks';
import { DeleteResult } from 'typeorm';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;
  let projectService: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectResolver,
        { provide: ProjectService, useValue: serviceMock },
      ],
    }).compile();

    resolver = module.get<ProjectResolver>(ProjectResolver);
    projectService = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return an array of customers', async () => {
    const result = [{ id: '1', name: 'Test Project', invoices: [] }]; // Mock response
    jest
      .spyOn(projectService, 'findAll')
      .mockImplementation(async () => result);

    expect(await resolver.findAllProjects()).toBe(result);
  });

  it('should return a single project', async () => {
    const result = { id: '1', name: 'Test Project', invoices: [] }; // Mock response
    jest
      .spyOn(projectService, 'findOne')
      .mockImplementation(async () => result);

    expect(await resolver.findOneProject({ id: '1' })).toBe(result);
  });

  it('should create a project', async () => {
    const result = { id: '1', name: 'Test Project', invoices: [] }; // Mock response
    jest
      .spyOn(projectService, 'createOne')
      .mockImplementation(async () => result);

    expect(await resolver.createOneProject({ name: 'Test Project' })).toBe(
      result,
    );
  });

  it('should update a project', async () => {
    const result = { id: '1', name: 'Test Project', invoices: [] }; // Mock response
    jest
      .spyOn(projectService, 'updateOne')
      .mockImplementation(async () => result);

    expect(
      await resolver.updateOneProject({ id: '1', name: 'Test Project' }),
    ).toBe(result);
  });

  it('should delete a project', async () => {
    jest
      .spyOn(projectService, 'deleteOne')
      .mockImplementation(async () => ({ affected: 1 }) as DeleteResult);

    expect(await resolver.deleteOneProject({ id: '1' })).toBe(true);
  });

  it('should return false if deleteOne fails', async () => {
    jest
      .spyOn(projectService, 'deleteOne')
      .mockImplementation(async () => ({ affected: 0 }) as DeleteResult);

    expect(await resolver.deleteOneProject({ id: '1' })).toBe(false);
  });

  it('should update a project', async () => {
    const result = { id: '1', name: 'Test Project', invoices: [] }; // Mock response
    jest
      .spyOn(projectService, 'updateOne')
      .mockImplementation(async () => result);

    expect(
      await resolver.updateOneProject({ id: '1', name: 'Test Project' }),
    ).toBe(result);
  });
});
