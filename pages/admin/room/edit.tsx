import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, AdminLayout } from 'components/layout';
import { ReactElement, useState, useEffect, ChangeEvent } from 'react';
import { useInput } from 'hooks';
import * as Index from 'styles/admin/index.style';
import * as Edit from 'styles/admin/edit.style';

/* 추후 input 입력 개선 방법 연습해보기 */
/* 브라우저 새로고침, 나가기 이벤트 잡아서 '나가시겠습니까? 변경된 내용은 저장되지 않습니다'  알려주기 */
interface AmenitiesDataType {
  name: string;
  value: string;
  notCheckedImgSrc?: string;
  checkedImgSrc?: string;
}
interface RoomDistanceDataType {
  name: string;
  value: RoomDistanceType;
}
interface RoomTypeDataType {
  name: string;
  value: RoomNumberType;
}
type RoomNumberType = 1 | 2 | 3 | 4;
type RoomDistanceType = 'walk_5' | 'walk_10' | 'walk_15';

const Page: NextPageWithLayout = () => {
  const amenitiyDataList: AmenitiesDataType[] = [
    {
      name: '조식',
      value: 'breakfast',
      notCheckedImgSrc: '/assets/img/admin/room_edit_svg/breakfast.svg',
      checkedImgSrc: '/assets/img/admin/room_edit_svg/breakfast_checked.svg',
    },
    {
      name: '이벤트',
      value: 'event',
      notCheckedImgSrc: '/assets/img/admin/room_edit_svg/event.svg',
      checkedImgSrc: '/assets/img/admin/room_edit_svg/event_checked.svg',
    },
    {
      name: '라운지/바',
      value: 'lounge_bar',
      notCheckedImgSrc: '/assets/img/admin/room_edit_svg/lounge_bar.svg',
      checkedImgSrc: '/assets/img/admin/room_edit_svg/lounge_bar_checked.svg',
    },
    {
      name: '조리가능',
      value: 'cookable',
      notCheckedImgSrc: '/assets/img/admin/room_edit_svg/cookable.svg',
      checkedImgSrc: '/assets/img/admin/room_edit_svg/cookable_checked.svg',
    },
    {
      name: '세탁',
      value: 'laundry',
      notCheckedImgSrc: '/assets/img/admin/room_edit_svg/laundry.svg',
      checkedImgSrc: '/assets/img/admin/room_edit_svg/laundry_checked.svg',
    },
    {
      name: '피트니스',
      value: 'fitness',
      notCheckedImgSrc: '/assets/img/admin/room_edit_svg/fitness.svg',
      checkedImgSrc: '/assets/img/admin/room_edit_svg/fitness_checked.svg',
    },
    {
      name: '수영장',
      value: 'swimming_pool',
      notCheckedImgSrc: '/assets/img/admin/room_edit_svg/swimming_pool.svg',
      checkedImgSrc: '/assets/img/admin/room_edit_svg/swimming_pool_checked.svg',
    },
    { name: '기타', value: 'etc' },
  ];
  const roomDistanceDataList: RoomDistanceDataType[] = [
    { name: '도보 5분 내', value: 'walk_5' },
    { name: '도보 5~10분 내', value: 'walk_10' },
    { name: '도보 10~15분 내', value: 'walk_15' },
  ];
  const roomTypeDataList: RoomTypeDataType[] = [
    { name: '호텔', value: 1 },
    { name: '펜션', value: 2 },
    { name: '모텔', value: 3 },
    { name: '게스트하우스', value: 4 },
  ];
  const regionDataList: string[] = ['제주도'];
  const spotDataList: string[] = [
    '제주국제공항',
    '성산일출봉',
    '신양섭지/섭지코지',
    '중문 관광단지',
    '이중섭거리/올레시장',
    '곽지해수욕장',
    '한담해변',
    '협재해수욕장',
    '금능해수욕장',
    '함덕해수욕장',
    '월정리해수욕장',
  ];
  const [amenitiyCheckList, setAmenitiyCheckList] = useState<boolean[]>([]); /* 편의 시설 존재 여부 리스트*/

  /* 숙소 정보 State , 변수명이 변경될 수 있음. 백엔드랑 맞추기 위해서 */
  const [roomName, setRoomName, clearRoomName, roomNameHandler] = useInput<string>(''); /* 숙소 이름 */
  const [roomAddress, setRoomAddress, clearRoomAddress, roomAddressHandler] = useInput<string>(''); /* 숙소 주소 */
  const [roomLink, setRoomLink, clearRoomLink, roomLinkHandler] = useInput<string>(''); /* 숙소 링크 */
  const [roomCharge, setRoomCharge, clearRoomCharge, roomChargeHandler] = useInput<string>(''); /* 숙소 최저가 */
  const [roomExplanation, setRoomExplanation, clearRoomExplation, roomExplationHandler] =
    useInput<string>(''); /* 숙소 설명*/

  /* 도보거리, 숙소 타입 radio Group State 관리 */
  const [roomDistance, setRoomDistance] =
    useState<RoomDistanceType>('walk_5'); /* 숙소 도보 거리 기본 값을 '도보 5분 내'로 설정*/
  const [roomType, setRoomType] = useState<RoomNumberType>(1); /* 숙소 타입. 기본 값을 '호텔'로 설정*/
  const [roomCheckInTime, setRoomCheckInTime, clearRoomCheckInTime, roomCheckInTimeHandler] =
    useInput<string>(''); /* 숙소 체크인 시간 */
  const [roomCheckOutTime, setRoomCheckOutTime, clearRoomCheckOutTime, roomCheckOutTimeHandler] =
    useInput<string>(''); /* 숙소 체크아웃 시간 */

  const [roomRegion, setRoomRegion, clearRoomRegion, roomRegionHandler] = useInput<string>('');
  const [roomSpot, setRoomSpot, clearRoomSpot, roomSpotHandler] = useInput<string>('');
  const roomTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const _value = Number(e.target.value);
    if (_value === 1 || _value === 2 || _value === 3 || _value === 4) setRoomType(_value);
  };

  const roomDistanceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const _value = e.target.value;
    if (_value === 'walk_5' || _value === 'walk_10' || _value === 'walk_15') setRoomDistance(_value);
  };

  const amenityIsCheck = (idx: number) => {
    let _amenitiyCheckList = [...amenitiyCheckList];
    _amenitiyCheckList[idx] = !_amenitiyCheckList[idx];
    setAmenitiyCheckList(_amenitiyCheckList);
  };

  const roomRegistration = () => {
    const roomTypeDataObj = { 1: '호텔', 2: '펜션', 3: '모텔', 4: '게스트하우스' };
    const roomDistanceDataObj = { walk_5: '도보 5분 내', walk_10: '도보 5~10분', walk_15: '도보 10~15분' };
    const verification =
      !!roomName &&
      !!roomAddress &&
      !!roomLink &&
      !!roomCharge &&
      !!roomExplanation &&
      !!roomCheckInTime &&
      !!roomCheckOutTime &&
      !!roomRegion &&
      !!roomSpot;
    if (verification)
      console.log({
        roomName,
        roomAddress,
        roomLink,
        roomCharge,
        roomExplanation,
        roomCheckInTime,
        roomCheckOutTime,
        roomRegion,
        roomSpot,
        roomType: roomTypeDataObj[roomType],
        roomDistnace: roomDistanceDataObj[roomDistance],
      });
  };

  useEffect(() => {
    setRoomRegion('제주도');
    setRoomSpot('제주국제공항');
    setRoomCheckInTime('00:00');
    setRoomCheckOutTime('00:00');
    setAmenitiyCheckList([false, false, false, false, false, false, false, false]);
  }, []);

  return (
    <Index.Wrapper>
      <div className="container">
        <Index.Title>숙소 등록하기</Index.Title>
        <Edit.FormWrapper>
          <Edit.InputRow rowCount={2}>
            <Edit.InputCol>
              <Edit.InputItem required>
                <label className="input-title">숙소 이름</label>
                <Edit.InputField type="text" value={roomName} onChange={roomNameHandler} />
              </Edit.InputItem>
              <Edit.InputItem required>
                <label className="input-title">숙소 타입</label>
                <div className="radio-group-wrapper">
                  {roomTypeDataList.map((_roomType: RoomTypeDataType, idx: number) => {
                    return (
                      <div key={idx}>
                        <input
                          type="radio"
                          name="room_type"
                          value={_roomType.value}
                          id={`${_roomType.name} ${_roomType.value}`}
                          onChange={roomTypeHandler}
                          checked={roomType === _roomType.value}
                        />
                        <label htmlFor={`${_roomType.name} ${_roomType.value}`}>{_roomType.name}</label>
                      </div>
                    );
                  })}
                </div>
              </Edit.InputItem>
              <Edit.InputItem required>
                <label className="input-title">주소</label>
                <Edit.InputField
                  type="text"
                  placeholder="OO시 OO구 OO로 OO길"
                  value={roomAddress}
                  onChange={roomAddressHandler}
                />
              </Edit.InputItem>
              <Edit.InputItem required>
                <label className="input-title">숙소 링크</label>
                <Edit.InputField type="text" placeholder="http:// ~ " value={roomLink} onChange={roomLinkHandler} />
              </Edit.InputItem>
              <Edit.InputRow rowCount={2}>
                <Edit.InputItem required>
                  <label className="input-title">체크인 시간</label>
                  <Edit.InputField type="time" value={roomCheckInTime} onChange={roomCheckInTimeHandler} />
                </Edit.InputItem>
                <Edit.InputItem required>
                  <label className="input-title">체크아웃 시간</label>
                  <Edit.InputField type="time" value={roomCheckOutTime} onChange={roomCheckOutTimeHandler} />
                </Edit.InputItem>
              </Edit.InputRow>
            </Edit.InputCol>
            <Edit.InputCol>
              <Edit.RoomThumbnailUpload>
                <input type="file" id="room-thumbnail-upload" />
                <label htmlFor="room-thumbnail-upload">
                  <div>
                    <img src={`/assets/img/admin/room_edit_svg/camera2.svg`} alt="카메라2 픽토그램" />
                    <p>썸네일 이미지를 업로드 해주세요</p>
                  </div>
                </label>
              </Edit.RoomThumbnailUpload>
            </Edit.InputCol>
          </Edit.InputRow>
          <Edit.InputRow rowCount={2}>
            <Edit.InputCol>
              <Edit.InputItem required>
                <label className="input-title">도보 소요시간</label>
                <div className="radio-group-wrapper">
                  {roomDistanceDataList.map((_roomDistance: RoomDistanceDataType, idx: number) => {
                    return (
                      <div key={idx}>
                        <input
                          type="radio"
                          name="walking_time"
                          value={_roomDistance.value}
                          id={_roomDistance.value}
                          onChange={roomDistanceHandler}
                          checked={_roomDistance.value === roomDistance}
                        />
                        <label htmlFor={_roomDistance.value}>{_roomDistance.name}</label>
                      </div>
                    );
                  })}
                </div>
              </Edit.InputItem>
              <Edit.InputRow rowCount={2}>
                <Edit.InputItem required>
                  <label className="input-title">지역</label>
                  <Edit.SelectField onChange={roomRegionHandler}>
                    <option value="" disabled hidden>
                      지역 선택
                    </option>
                    {regionDataList.map((region: string, idx: number) => {
                      return (
                        <option key={`region-${idx}`} value={region}>
                          {region}
                        </option>
                      );
                    })}
                  </Edit.SelectField>
                </Edit.InputItem>
                <Edit.InputItem required>
                  <label className="input-title">주변 관광지</label>
                  <Edit.SelectField onChange={roomSpotHandler}>
                    <option value="" disabled hidden>
                      관광지 선택
                    </option>
                    {spotDataList.map((spot: string, idx: number) => {
                      return (
                        <option key={`spot-${idx}`} value={spot}>
                          {spot}
                        </option>
                      );
                    })}
                  </Edit.SelectField>
                </Edit.InputItem>
              </Edit.InputRow>
              <Edit.InputItem required>
                <label className="input-title">가격</label>
                <Edit.InputField
                  type="text"
                  placeholder="최저가 입력"
                  value={roomCharge}
                  onChange={roomChargeHandler}
                />
              </Edit.InputItem>
            </Edit.InputCol>
            <Edit.InputCol></Edit.InputCol>
          </Edit.InputRow>
          <Edit.InputRow rowCount={1}>
            <Edit.InputItem>
              <label className="input-title">설명</label>
              <Edit.InputTextarea
                placeholder="숙소에 관한 설명을 입력해주세요."
                value={roomExplanation}
                onChange={roomExplationHandler}
              />
            </Edit.InputItem>
            <Edit.InputItem required>
              <label className="input-title">이미지 업로드</label>
              <div className="room-image-upload">
                <input type="file" multiple id="room-image-upload" />
                <div>
                  <div>
                    <img src={`/assets/img/admin/room_edit_svg/camera.svg`} alt="카메라 픽토그램" />
                    <p>숙소 상세 이미지를 업로드해주세요</p>
                  </div>

                  <label className="select-file-btn" htmlFor="room-image-upload">
                    Select File
                  </label>
                </div>
              </div>
            </Edit.InputItem>
            <Edit.InputItem>
              <label className="input-title">편의</label>
              <Edit.AmenitiesCheckBoxGrid>
                {amenitiyDataList.map((amenity: AmenitiesDataType, idx: number) => {
                  return (
                    <Edit.AmenitiesCheckBox key={idx}>
                      <input
                        type="checkbox"
                        name="amenities"
                        value={amenity.value}
                        id={amenity.value}
                        onChange={() => {
                          amenityIsCheck(idx);
                        }}
                      />
                      <label htmlFor={amenity.value}>
                        {amenity.checkedImgSrc && (
                          <div>
                            <img
                              src={amenitiyCheckList[idx] ? amenity.checkedImgSrc : amenity.notCheckedImgSrc}
                              alt={`${amenity.name} 픽토그램`}
                            />
                          </div>
                        )}
                        <p>{amenity.name}</p>
                      </label>
                    </Edit.AmenitiesCheckBox>
                  );
                })}
              </Edit.AmenitiesCheckBoxGrid>
            </Edit.InputItem>
          </Edit.InputRow>
        </Edit.FormWrapper>
        <Edit.ButtonWrapper>
          <Edit.SubmitButton onClick={roomRegistration}>등록하기</Edit.SubmitButton>
        </Edit.ButtonWrapper>
      </div>
    </Index.Wrapper>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <AdminLayout>{page}</AdminLayout>
    </AppLayout>
  );
};

export default Page;
