/**
 * Schema version management for feature definitions
 */

export const SCHEMA_VERSION = '1.0.0';

export interface SchemaVersion {
  version: string;
  releasedAt: string;
  changes: string[];
  breaking: boolean;
}

export const SCHEMA_VERSIONS: SchemaVersion[] = [
  {
    version: '1.0.0',
    releasedAt: '2025-06-23',
    changes: [
      'Initial schema release',
      'Support for templates, npm packages, scripts, and environment variables',
      'Comprehensive validation rules',
      'Dependency and conflict management',
    ],
    breaking: false,
  },
];

/**
 * Check if a feature schema version is compatible with the current version
 */
export function isCompatibleVersion(
  featureVersion: string,
  currentVersion: string = SCHEMA_VERSION,
): boolean {
  const [featureMajor] = featureVersion.split('.').map(Number);
  const [currentMajor] = currentVersion.split('.').map(Number);

  // Major version must match for compatibility
  return featureMajor === currentMajor;
}

/**
 * Get migration instructions between versions
 */
export function getMigrationInstructions(fromVersion: string, toVersion: string): string[] {
  const instructions: string[] = [];

  // Add migration logic here as schema evolves
  if (fromVersion === '0.9.0' && toVersion === '1.0.0') {
    instructions.push('Update "packages" field to "npmPackages"');
    instructions.push('Add required "createdAt" and "modifiedAt" fields');
  }

  return instructions;
}
