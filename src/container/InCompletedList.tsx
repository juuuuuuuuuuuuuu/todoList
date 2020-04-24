'use strict';
/**
 * 미완료 리스트 클래스
 */

import { selectedList, findIndexList } from '../util/array';
import { ITodoInfo } from '../interface/TodoInterface';
import Modal from '../components/Modal';

const dataAttrs = {
  container: 'data-container',
  element: 'data-element',
  button: 'data-button',
  key: 'date-key',
};

const MSG = '할일 목록을 선택해주세요';

const defaultProps = {
  storedInfo: [],
  modal: null,
  callback: () => {},
};

interface IProps {
  storedInfo: ITodoInfo[];
  modal: Modal;
  callback: (type: string, list: number[]) => void;
};

class InCompletedList {
  props: IProps;
  $container: HTMLElement;
  $incompleted: HTMLElement;

  constructor(opts: IProps) {
    this.props = Object.assign({}, defaultProps, opts);
    this.$container = document.querySelector(`[${dataAttrs.container}=incompleted]`) as HTMLElement;
    this.$incompleted = document.querySelector(`[${dataAttrs.element}=incompletedList]`) as HTMLElement;
    // 이벤트 바인딩
    this.selectEvent();
    this.clickEvent();
  }

  /**
   * 요소 선택 이벤트
   */
  selectEvent() {
    this.$incompleted.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const element = target.closest('a') as HTMLElement;

      if (element.className.indexOf('active') > -1) {
        element.classList.remove('active');
      } else {
        element.classList.add('active');
      }
    });
  }

  /**
   * 완료하기 버튼 이벤트
   */
  clickEvent() {
    const $successBtn = document.querySelector(`[${dataAttrs.button}=success]`) as HTMLElement;

    $successBtn.addEventListener('click', () => {
      const filteredDate = selectedList(this.$incompleted, dataAttrs.key);

      // 선택된 데이터 없는 경우 모달창 띄우기
      if (filteredDate.length === 0) {
        this.props.modal.init(MSG);
        return;
      }

      // 업데이트해야할 indexList
      const indexList = findIndexList(this.props.storedInfo, filteredDate);
      // 콜백함수 호출
      this.props.callback('completed', indexList);
    });
  }

  /**
   * 미완료 리스트 show
   */
  show() {
    this.$container.style.display = 'block';
  }

  /**
   * 미완료 리스트 hide
   */
  hide() {
    this.$container.style.display = 'none';
  }

  /**
   * 미완료 리스트 render
   */
  render(data: ITodoInfo[]) {
    if (data.length === 0) {
      this.$incompleted.innerHTML = '<div>할일 목록이 없습니다.</div>';
      return;
    }

    this.$incompleted.innerHTML = data.map(list =>
      `<a href="javascript:void(0);" class="list-group-item list-group-item-primary list-group-item-action" data-element="inCompleted" date-key="${list.date}">
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${list.content}</h5>
        <small>${list.date}</small>
        </div>
      </a>`).join('');
  }
}

export default InCompletedList;