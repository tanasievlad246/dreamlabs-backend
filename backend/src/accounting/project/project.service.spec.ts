import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  EXAMPLE_INVOICE,
  EXAMPLE_PROJECT,
  invoiceServiceMock,
  mockInvoiceRepository,
  mockProjectRepository,
} from '../mocks';
import { NotFoundException } from '@nestjs/common';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './project.entity';
import { InvoiceServiceImpl } from '../invoice/invoice.service';
import { Invoice } from '../invoice/invoice.entity';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: InvoiceServiceImpl,
          useValue: invoiceServiceMock,
        },
        {
          provide: getRepositoryToken(Invoice),
          useFactory: mockInvoiceRepository,
        },
        {
          provide: getRepositoryToken(Project),
          useFactory: mockProjectRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOne', () => {
    it('should successfully create a project', async () => {
      const projectInput = { name: 'Project name' };
      const expectedSavedProject = { id: '1', ...projectInput, invoices: [] };

      const result = await service.createOne(projectInput);
      expect(result).toEqual(expectedSavedProject);
    });
  });

  describe('findOne', () => {
    it('should return a single project', async () => {
      const expectedProject = { id: '1', name: 'Test Project', invoices: [] };

      const result = await service.findOne('1');
      expect(result.id).toEqual(expectedProject.id);
      expect(result.name).toEqual(expectedProject.name);
    });

    it('should throw NotFoundException if project is not found', async () => {
      mockProjectRepository().findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteOne', () => {
    it('should delete a project and return affected result', async () => {
      const result = await service.deleteOne('1');
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('updateOne', () => {
    it('should update a project and return the updated entity', async () => {
      const initialProject = { id: '1', name: 'Project name', invoices: [] };
      const update = { name: 'New project name' };
      const expectedUpdatedProject = { ...initialProject, ...update };
      mockProjectRepository().findOne.mockResolvedValue(initialProject);
      mockProjectRepository().merge.mockReturnValue(expectedUpdatedProject);

      const result = await service.updateOne('1', update as UpdateProjectInput);
      expect(result).toEqual(expectedUpdatedProject);
    });

    it('should throw NotFoundException if project to update is not found', async () => {
      mockProjectRepository().findOne.mockResolvedValue(null);

      await expect(
        service.updateOne('non-existing', {} as UpdateProjectInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('addInvoiceToProject', () => {
    it('should add an invoice to a project', async () => {
      const project = { ...EXAMPLE_PROJECT };
      const invoice = { ...EXAMPLE_INVOICE };
      mockProjectRepository().findOne.mockResolvedValue(project);
      invoiceServiceMock.findOne.mockResolvedValue(invoice);

      mockProjectRepository().save.mockResolvedValue({
        ...project,
        invoices: [invoice],
      });

      const result = await service.addInvoice('1', 1);
      expect(result.invoices[0].id).toBe(invoice.id);
    });

    it('should throw error if invoice or project is undefined', () => {
      invoiceServiceMock.findOne.mockResolvedValue(null);

      expect(service.addInvoice('1', 2)).rejects.toThrow(NotFoundException);
    });
  });
});
