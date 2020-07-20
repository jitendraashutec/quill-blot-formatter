// @flow

import DeleteFormatter from '../DeleteFormatter';
import Action from '../actions/Action';
import AlignAction from '../actions/align/AlignAction';
import ResizeAction from '../actions/ResizeAction';
import DeleteAction from '../actions/DeleteAction';

export default class BlotSpec {
  formatter: DeleteFormatter;

  constructor(formatter: DeleteFormatter) {
    this.formatter = formatter;
  }

  init(): void {}

  getActions(): Class<Action>[] {
    return [AlignAction, ResizeAction, DeleteAction];
  }

  getTargetElement(): ?HTMLElement {
    return null;
  }

  getOverlayElement(): ?HTMLElement {
    return this.getTargetElement();
  }

  setSelection(): void {
    this.formatter.quill.setSelection(null);
  }

  onHide() {}
}
