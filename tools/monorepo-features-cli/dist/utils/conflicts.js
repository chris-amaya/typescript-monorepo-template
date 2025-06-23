"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConflicts = checkConflicts;
const features_1 = require("./features");
async function checkConflicts(featureId) {
    const conflicts = [];
    const installedFeatures = await (0, features_1.getInstalledFeatures)();
    // Check for feature-specific conflicts
    // This is a simplified implementation
    if (featureId.startsWith('authentication-') &&
        installedFeatures.some((f) => f.id.startsWith('authentication-'))) {
        conflicts.push('Another authentication system is already installed');
    }
    if (featureId.startsWith('database-') &&
        installedFeatures.some((f) => f.id.startsWith('database-'))) {
        conflicts.push('Another database integration is already installed');
    }
    return conflicts;
}
//# sourceMappingURL=conflicts.js.map