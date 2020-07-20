// @flow

import { Aligner } from './Aligner';
import DeleteFormatter from '../../DeleteFormatter';

export interface Toolbar {
  create(formatter: DeleteFormatter, alignmentHelper: Aligner): HTMLElement;
  destroy(): void;
  getElement(): ?HTMLElement;
}
