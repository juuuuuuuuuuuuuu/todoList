'use strict';
/**
 * 필터링 클래스 (전체 / 할일 / 완료)
 */

import InCompletedList from '../container/InCompletedList';
import CompletedList from '../container/CompletedList';

const dataAttrs = {
  element: 'data-element',
  role: 'data-role',
};

const defaultProps = {
  inCompletedList: null,
  completedList: null,
};

interface IProps {
  inCompletedList: InCompletedList;
  completedList: CompletedList;
};

class Option {
  props: IProps;

  constructor(opts: IProps) {
    this.props = Object.assign({}, defaultProps, opts);
    // filter 이벤트 바인딩
    this.filterEvent();
  }

  /**
   * 필터링 이벤트 (전체 / 할일 / 완료)
   */
  filterEvent() {
    const $filterBtn = document.querySelector(`[${dataAttrs.element}=filter]`) as HTMLElement;

    $filterBtn.addEventListener('change', (e: Event) => {
      const { inCompletedList, completedList } = this.props;

      const type = (e.target as HTMLSelectElement).value;

      // 전체선택
      if (type === 'total') {
        inCompletedList.show();
        completedList.show();
      } else {
        // 할일
        if (type === 'incompleted') {
          inCompletedList.show()
          completedList.hide()
        } else {
        // 완료
          inCompletedList.hide()
          completedList.show()
        }
      }
    });
  }
}
export default Option;