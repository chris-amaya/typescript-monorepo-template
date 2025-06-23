"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableFeatures = getAvailableFeatures;
exports.getInstalledFeatures = getInstalledFeatures;
exports.validateFeatureIntegrity = validateFeatureIntegrity;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function getAvailableFeatures() {
    // This would typically load from a registry or local feature definitions
    // For now, returning mock data
    return [
        {
            id: 'authentication-jwt',
            name: 'JWT Authentication',
            description: 'Add JWT-based authentication with refresh tokens',
            version: '1.0.0',
            author: 'Monorepo Tools',
            category: 'authentication',
            tags: ['auth', 'jwt', 'security'],
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
            isActive: true,
            minNodeVersion: '16.0.0',
            license: 'MIT',
        },
        {
            id: 'database-postgres',
            name: 'PostgreSQL Integration',
            description: 'Add PostgreSQL database with Prisma ORM',
            version: '1.0.0',
            author: 'Monorepo Tools',
            category: 'database',
            tags: ['database', 'postgres', 'prisma'],
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
            isActive: true,
            minNodeVersion: '16.0.0',
            license: 'MIT',
        },
    ];
}
async function getInstalledFeatures() {
    const configPath = path_1.default.join(process.cwd(), '.monorepo-features', 'config.json');
    if (!(await fs_extra_1.default.pathExists(configPath))) {
        return [];
    }
    const config = await fs_extra_1.default.readJson(configPath);
    return config.installedFeatures || [];
}
async function validateFeatureIntegrity() {
    // This would check each installed feature's files and dependencies
    return {
        issues: [],
        missingDependencies: [],
    };
}
//# sourceMappingURL=features.js.map