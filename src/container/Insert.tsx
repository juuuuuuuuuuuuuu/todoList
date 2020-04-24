'use strict';
/**
 * 할 일 목록 입력 클래스
 */

import Modal from '../components/Modal';
import formatDate from '../util/formatDate';
import { ITodoInfo } from '../interface/TodoInterface';


const dataAttrs = {
  element: 'data-element',
};

const MSG = '할 일을 입력해주세요';

const defaultProps = {
  modal: null,
  callback: () => {},
};

interface IProps {
  modal: Modal;
  callback: (data: ITodoInfo) => void;
};

class Insert {
  props: IProps;

  constructor(opts: IProps) {
    this.props = Object.assign({}, defaultProps, opts);
    // 이벤트 바인딩
    this.insertEvent();
  }

  /**
   * 할 일 목록 추가 이벤트
   */
  insertEvent() {
    const $insertBtn =  document.querySelector(`[${dataAttrs.element}=insert]`) as HTMLElement;

    $insertBtn.addEventListener('click', () => {
      const $input = document.querySelector(`[${dataAttrs.element}=input]`) as HTMLInputElement;
      const inputValue = $input.value;

      // input이 빈값인 경우 modal 창 띄워주기
      if (!this.trim(inputValue)) {
        this.props.modal.init(MSG);
        return;
      }

      // 할일 list 생성
      const data = { content: inputValue.replace(/\n/g, '<br/>'), date: formatDate(new Date()), status: 'incompleted' };
      this.props.callback(data);

      // input 초기화
      $input.value = '';
    });
  }
  /**
   * 빈칸 제거 정규식
   */
  trim(value: string):string {
    return value.replace(/(^\s*)|(\s*$)/gi, "");
  }
}


export default Insert;