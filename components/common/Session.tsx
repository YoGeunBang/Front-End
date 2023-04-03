import Router from 'next/router';
import { useDispatch,useSelector } from 'react-redux';
import { deleteTokenAction } from 'store/token';
import { RootState } from 'store';
const session = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.token);
  
  // null 체크
  if (!token) {
    return null;
  }
  // 문자열을 객체로 변환
  const obj = JSON.parse(token);
  // 현재 시간과 localStorage의 expire 시간 비교
  if (Date.now() > obj.expire) {
    dispatch(deleteTokenAction());
    // 만료시간이 지난 토큰 삭제
    Router.push({
      pathname: '/',
    });
    alert('세션이 만료되었습니다.다시 로그인 해주세요!');
    return null;
  }
  // 만료기간이 남아있는 경우, value 값 리턴
  return (<></>);
};
export default session;