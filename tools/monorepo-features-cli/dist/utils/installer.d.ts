export interface InstallResult {
    success: boolean;
    instructions?: string;
    filesCreated: string[];
    filesModified: string[];
}
export declare function installFeature(featureId: string, _options: {
    force?: boolean;
    yes?: boolean;
}): Promise<InstallResult>;
//# sourceMappingURL=installer.d.ts.map