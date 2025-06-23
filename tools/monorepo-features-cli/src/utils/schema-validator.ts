import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Feature } from '../types';
import featureSchema from '../schemas/feature.schema.json';

// Create and configure AJV instance
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
});

// Add format validators (for date-time, uri, etc.)
addFormats(ajv);

// Compile the schema
const validateFeature = ajv.compile(featureSchema);

/**
 * Validates a feature definition against the JSON schema
 */
export function validateFeatureDefinition(feature: unknown): { valid: boolean; errors?: string[] } {
  const valid = validateFeature(feature);

  if (!valid && validateFeature.errors) {
    const errors = validateFeature.errors.map((error) => {
      const path = error.instancePath || 'root';
      const message = error.message || 'validation error';
      return `${path}: ${message}`;
    });

    return { valid: false, errors };
  }

  return { valid: true };
}

/**
 * Type guard to check if an object is a valid Feature
 */
export function isValidFeature(obj: unknown): obj is Feature {
  const result = validateFeatureDefinition(obj);
  return result.valid;
}

/**
 * Validates multiple feature definitions
 */
export function validateFeatureDefinitions(features: unknown[]): {
  valid: boolean;
  errors?: { feature: string; errors: string[] }[];
} {
  const invalidFeatures: { feature: string; errors: string[] }[] = [];

  features.forEach((feature, index) => {
    const result = validateFeatureDefinition(feature);
    if (!result.valid && result.errors) {
      const featureId = (feature as any).id || `feature-${index}`;
      invalidFeatures.push({
        feature: featureId,
        errors: result.errors,
      });
    }
  });

  return {
    valid: invalidFeatures.length === 0,
    errors: invalidFeatures.length > 0 ? invalidFeatures : undefined,
  };
}

/**
 * Get the JSON schema for features
 */
export function getFeatureSchema() {
  return featureSchema;
}

/**
 * Validate a partial feature definition (for updates)
 */
export function validatePartialFeature(partialFeature: Partial<Feature>): {
  valid: boolean;
  errors?: string[];
} {
  // For partial validation, we create a temporary validator that doesn't require all fields
  const partialSchema = {
    ...featureSchema,
    required: [],
  };

  const validatePartial = ajv.compile(partialSchema);
  const valid = validatePartial(partialFeature);

  if (!valid && validatePartial.errors) {
    const errors = validatePartial.errors.map((error) => {
      const path = error.instancePath || 'root';
      const message = error.message || 'validation error';
      return `${path}: ${message}`;
    });

    return { valid: false, errors };
  }

  return { valid: true };
}
