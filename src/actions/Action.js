// @flow

import DeleteFormatter from '../DeleteFormatter';

export default class Action {
  formatter: DeleteFormatter;

  constructor(formatter: DeleteFormatter) {
    this.formatter = formatter;
  }

  onCreate() {}

  onDestroy() {}

  onUpdate() {}
}
