import { Feature, InstalledFeature } from '../types';
export declare function getAvailableFeatures(): Promise<Feature[]>;
export declare function getInstalledFeatures(): Promise<InstalledFeature[]>;
export declare function validateFeatureIntegrity(): Promise<{
    issues: Array<{
        feature: string;
        message: string;
        severity: 'error' | 'warning';
    }>;
    missingDependencies: string[];
}>;
//# sourceMappingURL=features.d.ts.map