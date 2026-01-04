import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getVersion(): string;
  getSIndex(rrIntervals: number[]): number;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ShatkonaModule');