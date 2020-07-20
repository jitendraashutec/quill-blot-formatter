// @flow

import Action from './Action';
import Quill from 'quill';
import DeleteFormatter from '../DeleteFormatter';

export default class ResizeAction extends Action {
  topLeftHandle: HTMLElement;
  topRightHandle: HTMLElement;
  bottomRightHandle: HTMLElement;
  bottomLeftHandle: HTMLElement;
  dragHandle: ?HTMLElement;
  dragStartX: number;
  preDragWidth: number;
  targetRatio: number;
  deleteImageHandle: HTMLElement;

  constructor(formatter: DeleteFormatter) {
    super(formatter);
    // this.topLeftHandle = this.createHandle('top-left', 'nwse-resize');
    // this.topRightHandle = this.createHandle('top-right', 'nesw-resize');
    // this.bottomRightHandle = this.createHandle('bottom-right', 'nwse-resize');
    // this.bottomLeftHandle = this.createHandle('bottom-left', 'nesw-resize');
    this.deleteImageHandle = this.createHandle('top-tester', '');
    this.dragHandle = null;
    this.dragStartX = 0;
    this.preDragWidth = 0;
    this.targetRatio = 0;
  }

  onCreate() {
    // this.formatter.overlay.appendChild(this.topLeftHandle);
    this.formatter.overlay.appendChild(this.deleteImageHandle);
    // this.formatter.overlay.appendChild(this.topRightHandle);
    // this.formatter.overlay.appendChild(this.bottomRightHandle);
    // this.formatter.overlay.appendChild(this.bottomLeftHandle);

    this.repositionHandles(this.formatter.options.resize.handleStyle);
  }

  onDestroy() {
    this.setCursor('');
    console.log('on destory called');
    // this.formatter.overlay.removeChild(this.topLeftHandle);
    // this.formatter.overlay.removeChild(this.topRightHandle);
    // this.formatter.overlay.removeChild(this.bottomRightHandle);
    // this.formatter.overlay.removeChild(this.bottomLeftHandle);
    this.formatter.overlay.removeChild(this.deleteImageHandle);
  }

  createHandle(position: string, cursor: string): HTMLElement {
    const box = document.createElement('div');
    box.classList.add('blot-formatter__delete-handle');
    box.setAttribute('data-position', position);
    box.style.position = 'absolute';
    box.style.right = "0";
    box.style.bottom = "0";
    box.style.bottom = "0";
    box.style.background = 'white';
    box.style.marginRight = '4px';
    box.style.marginBottom = '4px';
    box.style.border = '1px solid #999999';
    box.style.verticalAlign = 'middle';

    // background: white;
    // margin-right: 4px;
    // margin-bottom: 4px;
    // border: 1px solid rgb(153, 153, 153);
    // vertical-align: middle;
    // box.style.cursor = cursor;

    if (this.formatter.options.resize.handleStyle) {
      // Object.assign(box.style, this.formatter.options.resize.handleStyle);
    }

    // if (position === 'top-right') {
    var deleteBox = document.createElement('img');
    // deleteBox.style.marginLeft = "8px";
    // deleteBox.style.marginTop = "8px";
    deleteBox.style.cursor = "pointer";
    deleteBox.style.width = "20px";
    deleteBox.style.height = "20px";



    deleteBox.src = 'https://firebasestorage.googleapis.com/v0/b/rwa-trivia-dev-e57fc.appspot.com/o/public%2Ftrash.svg?alt=media&token=6aadb488-3742-4912-bd4a-365a94977fe2';
  
    deleteBox.addEventListener('click', this.onDeleteImage)
    box.appendChild(deleteBox);
    // }
    // box.addEventListener('click', this.onDeleteImage)
    // box.addEventListener('mousedown', this.onMouseDown);

    return box;
  }

  repositionHandles(handleStyle: ?{}) {
    let handleXOffset = '0px';
    let handleYOffset = '0px';
    if (handleStyle) {
      if (handleStyle.width) {
        handleXOffset = `${-parseFloat(handleStyle.width) / 2}px`;
      }
      if (handleStyle.height) {
        handleYOffset = `${-parseFloat(handleStyle.height) / 2}px`;
      }
    }

    // Object.assign(this.topLeftHandle.style, { left: handleXOffset, top: handleYOffset });
    // Object.assign(this.topRightHandle.style, { right: handleXOffset, top: handleYOffset });
    // Object.assign(this.bottomRightHandle.style, { right: handleXOffset, bottom: handleYOffset });
    // Object.assign(this.bottomLeftHandle.style, { left: handleXOffset, bottom: handleYOffset });
  }

  setCursor(value: string) {
    if (document.body) {
      document.body.style.cursor = value;
    }

    if (this.formatter.currentSpec) {
      const target = this.formatter.currentSpec.getOverlayElement();
      if (target) {
        target.style.cursor = value;
      }
    }
  }


  onDeleteImage = (event) => {
    console.log(this.formatter);
    if (this.formatter.currentSpec) {
      console.log('QUill>>', Quill)
      console.log('elele>', this.formatter.currentSpec.getTargetElement());
      const blot = Quill.find(this.formatter.currentSpec.getTargetElement());
      if (blot) {
        blot.deleteAt(0);
      }
      this.formatter.hide();
      const formatterBlotter = document.getElementsByClassName("blot-formatter__overlay");
      if (formatterBlotter.length > 0) {
        // formatterBlotter[0].remove()
        formatterBlotter[0].style.display = "none";
      }

      const deleteBlotter = document.getElementsByClassName("blot-formatter__resize-handle");
      if (deleteBlotter.length > 0) {
        // deleteBlotter[0].remove()
        deleteBlotter[0].style.display = "none";
      }
      
    }
  }


  onMouseDown = (event: MouseEvent) => {
    console.log('mouse down');
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    this.dragHandle = event.target;
    // this.setCursor(this.dragHandle.style.cursor);

    if (!this.formatter.currentSpec) {
      return;
    }

    const target = this.formatter.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    const deleteBlotter = document.getElementsByClassName("blot-formatter__resize-handle");
    if (deleteBlotter.length > 0) {
      deleteBlotter[0].remove()
      // deleteBlotter[0].style.display = "none";
    }
    
    const rect = target.getBoundingClientRect();

    this.dragStartX = event.clientX;
    this.preDragWidth = rect.width;
    this.targetRatio = rect.height / rect.width;

    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onDrag = (event: MouseEvent) => {
    if (!this.formatter.currentSpec) {
      return;
    }

    const target = this.formatter.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    const deltaX = event.clientX - this.dragStartX;
    let newWidth = 0;

    if (this.dragHandle === this.topLeftHandle || this.dragHandle === this.bottomLeftHandle) {
      newWidth = Math.round(this.preDragWidth - deltaX);
    } else {
      newWidth = Math.round(this.preDragWidth + deltaX);
    }

    const newHeight = this.targetRatio * newWidth;

    target.setAttribute('width', `${newWidth}`);
    target.setAttribute('height', `${newHeight}`);

    this.formatter.update();
  };

  onMouseUp = () => {
    this.setCursor('');
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
}
