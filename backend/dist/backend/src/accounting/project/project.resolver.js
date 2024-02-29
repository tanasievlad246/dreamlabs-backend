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
exports.ProjectResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const project_service_1 = require("./project.service");
const project_entity_1 = require("./project.entity");
const project_input_1 = require("./dto/project.input");
const update_project_input_1 = require("./dto/update-project.input");
const project_id_input_1 = require("./dto/project-id.input");
let ProjectResolver = class ProjectResolver {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async findAllProjects() {
        return await this.projectService.findAll();
    }
    async findOneProject(findOneProjectInput) {
        return this.projectService.findOne(findOneProjectInput.id);
    }
    async createOneProject(projectInputType) {
        return await this.projectService.createOne(projectInputType);
    }
    async updateOneProject(updateOneProjectInput) {
        return await this.projectService.updateOne(updateOneProjectInput.id, updateOneProjectInput);
    }
    async deleteOneProject(deleteOneProjectInput) {
        if ((await this.projectService.deleteOne(deleteOneProjectInput.id)).affected >
            0) {
            return true;
        }
        return false;
    }
};
exports.ProjectResolver = ProjectResolver;
__decorate([
    (0, graphql_1.Query)(() => [project_entity_1.Project]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "findAllProjects", null);
__decorate([
    (0, graphql_1.Query)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Args)('findOneProjectInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_id_input_1.ProjectIdInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "findOneProject", null);
__decorate([
    (0, graphql_1.Mutation)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Args)('createProjectInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_input_1.CreateProjectInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "createOneProject", null);
__decorate([
    (0, graphql_1.Mutation)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Args)('updateOneProjectInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_project_input_1.UpdateProjectInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "updateOneProject", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('deleteOneProjectInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_id_input_1.ProjectIdInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "deleteOneProject", null);
exports.ProjectResolver = ProjectResolver = __decorate([
    (0, graphql_1.Resolver)(() => project_entity_1.Project),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectResolver);
//# sourceMappingURL=project.resolver.js.map