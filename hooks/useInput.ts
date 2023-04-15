/* 캐치캐치에서 작성한 useInput custom hooks 코드를 가져옴  */ 
/* 같은 text 타입인 InputElement와 TextArea 타입을 모두 사용할 수 있도록 유니온 타입 처리 */
import { useState, useCallback, ChangeEvent,useMemo } from 'react';
const useInput = <T>(
  initialState: T,
  callback?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => T,
): [
  T,
  (value: T) => void,
  () => void,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
] => {
  const [value, setValue] = useState<T>(initialState);

  const handler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const targetValue = callback ? callback(e) : (e.target.value as unknown as T);
    setValue(targetValue);
  }, []);
  const Setter = useCallback((value: T) => {
    setValue(value);
  }, []);

  const clearFunction = useCallback(() => {
    setValue(initialState);
  }, []);
  return [value, Setter, clearFunction, handler];
};

export default useInput;
