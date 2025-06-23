export interface ValidationResult {
    isValid: boolean;
    error?: string;
    projectName?: string;
    projectType?: string;
}
export declare function validateProject(projectPath: string): Promise<ValidationResult>;
//# sourceMappingURL=validator.d.ts.map