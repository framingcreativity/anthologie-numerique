import { lazy, Suspense } from 'react';
import type { Artwork } from '../../data/artworks';

const AbsenceExperiment = lazy(() => import('./experiments/AbsenceExperiment'));
const CompressionExperiment = lazy(() => import('./experiments/CompressionExperiment'));
const ErrorExperiment = lazy(() => import('./experiments/ErrorExperiment'));
const MachineExperiment = lazy(() => import('./experiments/MachineExperiment'));
const MemoryExperiment = lazy(() => import('./experiments/MemoryExperiment'));
const RecursiveExperiment = lazy(() => import('./experiments/RecursiveExperiment'));

type Props = {
  artwork: Artwork;
};

export default function ExperimentRenderer({
  artwork,
}: Props) {
  const experiments = {
    absence: AbsenceExperiment,
    memory: MemoryExperiment,
    machine: MachineExperiment,
    recursion: RecursiveExperiment,
    compression: CompressionExperiment,
    error: ErrorExperiment,
  };
  const Experiment = experiments[artwork.experience];

  return (
    <Suspense fallback={<p role="status" className="min-h-44 border-t border-white/12 py-10 text-muted">Chargement de l’expérience…</p>}>
      <Experiment artwork={artwork} />
    </Suspense>
  );
}
