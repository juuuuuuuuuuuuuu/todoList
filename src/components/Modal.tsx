'use strict';
/**
 * Modal 클래스
 */

const dataAttrs = {
  container: 'data-container',
  element: 'data-element',
};

class Modal {
  $modal: HTMLElement;

  constructor() {
    this.$modal = document.querySelector(`[${dataAttrs.container}=modal]`) as HTMLElement;
  }

  /**
   * modal init
   */
  init(msg: string) {
    // 메세지 추가
    const $message = document.querySelector(`[${dataAttrs.element}=message]`) as HTMLElement;
    $message.innerHTML = msg;
    // 모달창 열기
    this.openModal();
    // 이벤트 바인딩
    this.modalEvent();
  }

  /**
   * 취소, 확인 버튼 이벤트
   */
  modalEvent() {
    const $closeButton = document.querySelector(`[${dataAttrs.element}=close]`) as HTMLElement;
    const $confirmButton = document.querySelector(`[${dataAttrs.element}=confirm]`) as HTMLElement;
    // 취소 / 확인 버튼 이벤트 바인딩
    $closeButton.addEventListener('click', () => this.closeModal());
    $confirmButton.addEventListener('click', () => this.closeModal());
  }

  /**
   * 모달창 열기
   */
  openModal() {
    this.$modal.style.display = 'block';
  }

  /**
   * 모달창 닫기
   */
  closeModal() {
    this.$modal.style.display = 'none';
  }
}

export default Modal;