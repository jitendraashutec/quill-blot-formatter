// @flow

import UnclickableBlotSpec from './UnclickableBlotSpec';
import DeleteFormatter from '../DeleteFormatter';

export default class IframeVideoSpec extends UnclickableBlotSpec {
  constructor(formatter: DeleteFormatter) {
    super(formatter, 'iframe.ql-video');
  }
}
