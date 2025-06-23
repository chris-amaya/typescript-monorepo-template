export interface Feature {
    id: string;
    name: string;
    description: string;
    version: string;
    author: string;
    category: FeatureCategory;
    createdAt: string;
    modifiedAt: string;
    tags?: string[];
    isActive: boolean;
    minNodeVersion?: string;
    license?: string;
    dependencies?: string[];
    conflicts?: string[];
    templates?: TemplateDefinition[];
    scripts?: ScriptDefinition[];
    environmentVariables?: EnvironmentVariable[];
}
export type FeatureCategory = 'authentication' | 'database' | 'ui-components' | 'utilities' | 'integrations' | 'testing' | 'build-tools' | 'monitoring' | 'security' | 'api';
export interface InstalledFeature {
    id: string;
    version: string;
    installedAt: string;
    description?: string;
    modifiedFiles?: string[];
    addedFiles?: string[];
}
export interface TemplateDefinition {
    sourcePath: string;
    targetPath: string;
    variables?: Record<string, string>;
    condition?: string;
    merge?: boolean;
}
export interface ScriptDefinition {
    name: string;
    command: string;
    description?: string;
    workspace?: string;
}
export interface EnvironmentVariable {
    name: string;
    value: string;
    description?: string;
    required: boolean;
}
//# sourceMappingURL=types.d.ts.map