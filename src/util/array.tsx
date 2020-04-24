import { ITodoInfo } from '../interface/TodoInterface';
/**
 * 선택한 요소 리스트의 date값(key) 리턴
 */
export function selectedList($root: HTMLElement, key: string) {
  return Array.from($root.children).reduce((acc: string[], cur: Element) => {
    const dateValue = cur.getAttribute(key);
    if (cur.className.indexOf('active') > -1 && dateValue) {
      acc.push(dateValue);
    }
    return acc;
  }, []);
}

/**
 * localStorage 데이터 중에 선택된 요소의 index 리턴
 */
export function findIndexList(storageData: ITodoInfo[], dateList: string[]): number[] {
  const filteredIndex: number[] = [];

  storageData.forEach((stored: ITodoInfo, index: number) => {
    dateList.forEach((date: string) => {
      if (date === stored.date) {
        filteredIndex.push(index);
        return;
      }
    });
  });
  return filteredIndex;
}