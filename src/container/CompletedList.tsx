
'use strict';
/**
 * 완료 리스트 클래스
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

const MSG = '완료된 목록을 선택해주세요';

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

class CompletedList {
    props: IProps;
    $container: HTMLElement;
    $completed: HTMLElement;

  constructor(opts: IProps) {
    this.props = Object.assign({}, defaultProps, opts);
    this.$container = document.querySelector(`[${dataAttrs.container}=completed]`) as HTMLElement;
    this.$completed = document.querySelector(`[${dataAttrs.element}=completedList]`) as HTMLElement;
    // 요소 선택 이벤트
    this.selectEvent();
    // 버튼 이벤트 (복구, 삭제하기)
    this.buttonEvent();
  }

  /**
   * 요소 선택 이벤트
   */
  selectEvent() {
    this.$completed.addEventListener('click', (e: Event) => {
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
   * 버튼 이벤트 (복구, 삭제하기 버튼)
   */
  buttonEvent() {
    const $recoverBtn = document.querySelector(`[${dataAttrs.button}=recover]`) as HTMLElement;
    const $deleteBtn = document.querySelector(`[${dataAttrs.button}=delete]`) as HTMLElement;

    $recoverBtn.addEventListener('click', () => { this.handleUpdate('incompleted'); });
    $deleteBtn.addEventListener('click', () => { this.handleUpdate('delete'); });
  }

  /**
   * 업데이트해야할 indexList 리턴
   */
  handleUpdate(type: string) {
    const filteredDate = selectedList(this.$completed, dataAttrs.key);

    // 선택된 데이터 없는 경우 모달창 띄우기
    if (filteredDate.length === 0) {
      this.props.modal.init(MSG);
      return;
    }

    // 업데이트해야할 indexList
    const indexList = findIndexList(this.props.storedInfo, filteredDate);
    this.props.callback(type, indexList);
  }

  /**
   * 완료 리스트 show
   */
  show() {
    this.$container.style.display = 'block';
  }

  /**
   * 완료 리스트 hide
   */
  hide() {
    this.$container.style.display = 'none';
  }

  /**
   * 완료 리스트 render
   */
  render(data: ITodoInfo[]) {
    if (data.length === 0) {
      this.$completed.innerHTML = '<div>완료된 목록이 없습니다.</div>';
      return;
    }

    this.$completed.innerHTML = data.map(list =>
      `<a href="javascript:void(0);" class="list-group-item list-group-item-info list-group-item-action" data-element="completed" date-key="${list.date}">
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${list.content}</h5>
        <small>${list.date}</small>
        </div>
      </a>`).join('');
  }
}

export default CompletedList;
