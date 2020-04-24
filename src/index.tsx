import './scss/main.scss';
import Insert from './container/Insert';
import InCompletedList from './container/InCompletedList';
import CompletedList from './container/CompletedList';
import Option from './components/Option';
import Modal from './components/Modal';
import { getStroage, setStorage } from './util/storage';
import { ITodoInfo, IDivde } from './interface/TodoInterface';

// storage key
const STORAGE_KEY = 'todoList';

// localstroage에 저장된 데이터
const storedInfo: ITodoInfo[] = getStroage(STORAGE_KEY) || [];

window.onload = () => {
  // modal 생성
  const modal = new Modal();

  // insertCotainer 생성 (할일 목록 추가)
  void new Insert({
    modal,
    callback: list => handleInsert(list),
  });

  // inCompletedList 생성 (미완료 리스트)
  const inCompletedList = new InCompletedList({
    storedInfo,
    modal,
    callback: (type, data) => handleUpdate(type, data),
  });

  // completedList 생성 (완료 리스트)
  const completedList = new CompletedList({
    storedInfo,
    modal,
    callback: (type, data) => handleUpdate(type, data),
  });

  // option 생성 (필터링)
  void new Option({
    inCompletedList,
    completedList,
  });

  // init 실행
  init();

  /**
   * init 시점에만 호출
   */
  function init() {
    // localStorage에 저장된 데이터
    const { incompleted, completed } = divideData(storedInfo);

    // 각 리스트 렌더링
    inCompletedList.render(incompleted);
    completedList.render(completed);
  }


  /**
   * 할 일 데이터 추가
   */
  function handleInsert(data: ITodoInfo) {
    storedInfo.unshift(data);
    // storage 저장
    setStorage('todoList', storedInfo);

    const { incompleted } = divideData(storedInfo);
    // 미완료 목록 render
    inCompletedList.render(incompleted);
  }

  /**
   * 미완료, 완료 리스트 데이터 업데이트
   */
  function handleUpdate(type: string, filteredIndex: number[]) {
    switch (type) {
      // 미완료, 완료 리스트 변경
      case 'incompleted':
      case 'completed':
        filteredIndex.forEach((index) => {
          Object.assign(storedInfo[index], { status: type });
        });
        break;
      // 삭제
      case 'delete':
        filteredIndex.forEach((removeIdx, index) => {
          storedInfo.splice(removeIdx - index, 1);
        });
        break;
      default:
        break;
    }
    // localStorage 저장
    setStorage('todoList', storedInfo);
    // 렌더링
    const divide = divideData(storedInfo);
    inCompletedList.render(divide.incompleted);
    completedList.render(divide.completed);
  }

  /**
   * localStorage에 저장된 데이터 분리 (미완료, 완료 데이터)
   */
  function divideData(storageData: ITodoInfo[]) {
    return storageData.reduce((acc: IDivde , cur: ITodoInfo) => {
        acc[cur.status].push(cur);
      return acc;
    }, { 'incompleted': [], 'completed': [] });
  }
};







