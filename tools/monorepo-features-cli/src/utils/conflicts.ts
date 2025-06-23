import { getInstalledFeatures } from './features';

export async function checkConflicts(featureId: string): Promise<string[]> {
  const conflicts: string[] = [];
  const installedFeatures = await getInstalledFeatures();

  // Check for feature-specific conflicts
  // This is a simplified implementation
  if (
    featureId.startsWith('authentication-') &&
    installedFeatures.some((f) => f.id.startsWith('authentication-'))
  ) {
    conflicts.push('Another authentication system is already installed');
  }

  if (
    featureId.startsWith('database-') &&
    installedFeatures.some((f) => f.id.startsWith('database-'))
  ) {
    conflicts.push('Another database integration is already installed');
  }

  return conflicts;
}
