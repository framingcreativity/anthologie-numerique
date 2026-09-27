import type { Artwork } from '../../data/artworks';

import AbsenceExperiment from './experiments/AbsenceExperiment';
import CompressionExperiment from './experiments/CompressionExperiment';
import ErrorExperiment from './experiments/ErrorExperiment';
import MachineExperiment from './experiments/MachineExperiment';
import MemoryExperiment from './experiments/MemoryExperiment';
import RecursiveExperiment from './experiments/RecursiveExperiment';

type Props = {
  artwork: Artwork;
};

export default function ExperimentRenderer({
  artwork,
}: Props) {
  switch (artwork.experience) {
    case 'absence':
      return (
        <AbsenceExperiment artwork={artwork} />
      );

    case 'memory':
      return (
        <MemoryExperiment artwork={artwork} />
      );

    case 'machine':
      return (
        <MachineExperiment artwork={artwork} />
      );

    case 'recursion':
      return (
        <RecursiveExperiment artwork={artwork} />
      );

    case 'compression':
      return (
        <CompressionExperiment artwork={artwork} />
      );

    case 'error':
      return (
        <ErrorExperiment artwork={artwork} />
      );

    default:
      return null;
  }
}
