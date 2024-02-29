"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./project.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async createOne(project) {
        return await this.projectRepository.save(project);
    }
    async findAll() {
        return await this.projectRepository.find({
            relations: ['invoices'],
        });
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: {
                id,
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        return project;
    }
    async updateOne(id, updatedProject) {
        const currentProject = await this.findOne(id);
        if (!currentProject) {
            throw new common_1.NotFoundException('Project not found');
        }
        const _updatedProject = this.projectRepository.merge(currentProject, updatedProject);
        return await this.projectRepository.save(_updatedProject);
    }
    async deleteOne(id) {
        return await this.projectRepository.delete({
            id,
        });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectService);
//# sourceMappingURL=project.service.js.map