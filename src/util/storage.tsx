import { ITodoInfo } from '../interface/TodoInterface';


function getItem(key: string): any {
  return localStorage.getItem(key);
}

/**
 * localStorage 저장된 데이터 가져오기
 */
export function getStroage(key: string): ITodoInfo[] {
  const data = getItem(key);
  const decodeData = decodeURIComponent(data);
  return JSON.parse(decodeData);
}

/**
 * localStorage에 데이터 저장
 */
export function setStorage(key: string, value: ITodoInfo[]): void {
  const encodeData = encodeURIComponent(JSON.stringify(value));
  localStorage.setItem(key, encodeData);
}
