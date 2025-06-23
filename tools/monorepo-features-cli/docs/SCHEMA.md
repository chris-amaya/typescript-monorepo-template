# Feature Definition Schema

This document describes the JSON schema used for defining features in the monorepo-features CLI.

## Schema Version

Current version: **1.0.0**

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (lowercase, numbers, hyphens only) |
| `name` | string | Human-readable feature name |
| `description` | string | Brief description of the feature |
| `version` | string | Semantic version (e.g., "1.0.0") |
| `author` | string | Author name or organization |
| `category` | enum | Feature category (see categories below) |
| `createdAt` | string | ISO 8601 creation date |
| `modifiedAt` | string | ISO 8601 last modified date |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `tags` | string[] | Tags for search and categorization |
| `isActive` | boolean | Whether feature is available (default: true) |
| `deprecated` | boolean | Whether feature is deprecated |
| `deprecationMessage` | string | Message for deprecated features |
| `minNodeVersion` | string | Minimum Node.js version required |
| `minTemplateVersion` | string | Minimum template version required |
| `license` | string | License identifier (e.g., "MIT") |
| `repository` | object | Repository information |
| `dependencies` | string[] | Required feature dependencies |
| `conflicts` | string[] | Conflicting features |
| `npmPackages` | NpmPackage[] | NPM packages to install |
| `templates` | Template[] | Template files to generate |
| `scripts` | Script[] | Scripts to add to package.json |
| `environmentVariables` | EnvVar[] | Required environment variables |
| `configurationFiles` | ConfigFile[] | Configuration files to create/modify |
| `postInstallInstructions` | string | Instructions after installation |
| `documentation` | object | Documentation links and examples |

## Categories

- `authentication`
- `database`
- `ui-components`
- `utilities`
- `integrations`
- `testing`
- `build-tools`
- `monitoring`
- `security`
- `api`

## Complex Types

### NpmPackage
```json
{
  "name": "string",          // Package name
  "version": "string",       // Version or range
  "dev": "boolean",          // Dev dependency (default: false)
  "workspace": "string",     // Target workspace
  "optional": "boolean"      // Optional dependency
}
```

### Template
```json
{
  "sourcePath": "string",    // Path to template file
  "targetPath": "string",    // Target path (supports variables)
  "variables": "object",     // Template variables
  "condition": "string",     // JS expression for conditional inclusion
  "merge": "boolean",        // Merge with existing file
  "mergeStrategy": "enum",   // How to merge: append|prepend|replace|json-merge|custom
  "permissions": "string"    // File permissions (e.g., "755")
}
```

### Script
```json
{
  "name": "string",          // Script name
  "command": "string",       // Command to execute
  "description": "string",   // Script description
  "workspace": "string",     // Target workspace
  "replace": "boolean"       // Replace existing script
}
```

### EnvironmentVariable
```json
{
  "name": "string",          // Variable name (UPPER_CASE)
  "value": "string",         // Default value
  "description": "string",   // Description
  "required": "boolean",     // Is required
  "example": "string",       // Example value
  "validation": "string"     // Regex pattern for validation
}
```

### ConfigurationFile
```json
{
  "path": "string",          // File path
  "content": "string|object", // File content
  "format": "enum",          // json|yaml|toml|env|text
  "merge": "boolean",        // Merge with existing
  "mergeStrategy": "enum"    // deep-merge|shallow-merge|append|prepend|replace
}
```

## Example Feature Definition

See [examples/auth-jwt.feature.json](../examples/auth-jwt.feature.json) for a complete example.

## Validation

Features are validated using JSON Schema (draft-07) with AJV. The schema includes:

- Pattern matching for IDs, versions, and environment variables
- Enum validation for categories and merge strategies
- Format validation for dates and URIs
- Dependency resolution and conflict checking

## Version Compatibility

Features specify their minimum template version requirement. The CLI checks compatibility before installation to ensure features work with the target project's template version.