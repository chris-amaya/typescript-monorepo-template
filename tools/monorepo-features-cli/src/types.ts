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
  deprecated?: boolean;
  deprecationMessage?: string;
  minNodeVersion?: string;
  minTemplateVersion?: string;
  license?: string;
  repository?: {
    type: 'git';
    url: string;
  };
  dependencies?: string[];
  conflicts?: string[];
  npmPackages?: NpmPackage[];
  templates?: TemplateDefinition[];
  scripts?: ScriptDefinition[];
  environmentVariables?: EnvironmentVariable[];
  configurationFiles?: ConfigurationFile[];
  postInstallInstructions?: string;
  documentation?: {
    url?: string;
    quickStart?: string;
    examples?: string[];
  };
}

export type FeatureCategory =
  | 'authentication'
  | 'database'
  | 'ui-components'
  | 'utilities'
  | 'integrations'
  | 'testing'
  | 'build-tools'
  | 'monitoring'
  | 'security'
  | 'api';

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
  mergeStrategy?: 'append' | 'prepend' | 'replace' | 'json-merge' | 'custom';
  permissions?: string;
}

export interface ScriptDefinition {
  name: string;
  command: string;
  description?: string;
  workspace?: string;
  replace?: boolean;
}

export interface EnvironmentVariable {
  name: string;
  value?: string;
  description?: string;
  required: boolean;
  example?: string;
  validation?: string;
}

export interface NpmPackage {
  name: string;
  version: string;
  dev?: boolean;
  workspace?: string;
  optional?: boolean;
}

export interface ConfigurationFile {
  path: string;
  content: string | Record<string, any>;
  format?: 'json' | 'yaml' | 'toml' | 'env' | 'text';
  merge?: boolean;
  mergeStrategy?: 'deep-merge' | 'shallow-merge' | 'append' | 'prepend' | 'replace';
}
