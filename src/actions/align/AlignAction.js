// @flow

import Action from '../Action';
import DeleteFormatter from '../../DeleteFormatter';
import DefaultAligner from './DefaultAligner';
import { Aligner } from './Aligner';
import { Toolbar } from './Toolbar';
import DefaultToolbar from './DefaultToolbar';

export default class AlignAction extends Action {
  toolbar: Toolbar;
  aligner: Aligner;

  constructor(formatter: DeleteFormatter) {
    super(formatter);
    this.aligner = new DefaultAligner(formatter.options.align);
    this.toolbar = new DefaultToolbar();
  }

  onCreate() {
    // const toolbar = this.toolbar.create(this.formatter, this.aligner);
    // this.formatter.overlay.appendChild(toolbar);
  }

  onDestroy() {
    const toolbar = this.toolbar.getElement();
    if (!toolbar) {
      return;
    }

    this.formatter.overlay.removeChild(toolbar);
    this.toolbar.destroy();
  }
}
