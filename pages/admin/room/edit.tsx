import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, AdminLayout } from 'components/layout';
import { ReactElement, useState, useEffect } from 'react';
import * as Index from 'styles/admin/index.style';
import * as Edit from 'styles/admin/edit.style';

interface amenitiesDataType {
  name: string;
  value: string;
  notCheckedImgSrc?: string;
  checkedImgSrc?: string;
}

const Page: NextPageWithLayout = () => {
  const [amenitiyCheckList, setAmenitiyCheckList] = useState<boolean[]>([]); /* 편의 시설 존재 여부 리스트*/

  const amenitiyDataList: amenitiesDataType[] = [
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

  const amenityIsCheck = (idx: number) => {
    let _amenitiyCheckList = [...amenitiyCheckList];
    _amenitiyCheckList[idx] = !_amenitiyCheckList[idx];
    setAmenitiyCheckList(_amenitiyCheckList);
  };

  useEffect(() => {
    setAmenitiyCheckList(new Array(8).fill(false));
  }, []);

  return (
    <Index.Wrapper>
      <div className="container">
        <Index.Title>숙소 등록하기</Index.Title>
        <Edit.FormWrapper>
          <Edit.InputCol>
            <Edit.InputRow>
              <Edit.InputItem required>
                <label className="input-title">숙소 이름</label>
                <Edit.InputField type="text" />
              </Edit.InputItem>
              <Edit.InputItem required>
                <label className="input-title">숙소 타입</label>
                <div className="radio-group-wrapper">
                  <div>
                    <input type="radio" name="room_type" value="hotel" id="hotel" />
                    <label htmlFor="hotel">호텔</label>
                  </div>
                  <div>
                    <input type="radio" name="room_type" value="rental_cottage" id="rental_cottage" />
                    <label htmlFor="rental_cottage">펜션</label>
                  </div>
                  <div>
                    <input type="radio" name="room_type" value="motel" id="motel" />
                    <label htmlFor="motel">모텔</label>
                  </div>
                  <div>
                    <input type="radio" name="room_type" value="guest_house" id="guest_house" />
                    <label htmlFor="guest_house">게스트하우스</label>
                  </div>
                </div>
              </Edit.InputItem>
              <Edit.InputItem required>
                <label className="input-title">주소</label>
                <Edit.InputField type="text" placeholder="OO시 OO구 OO로 OO길" />
              </Edit.InputItem>
              <Edit.InputItem required>
                <label className="input-title">숙소 링크</label>
                <Edit.InputField type="text" placeholder="http:// ~ " />
              </Edit.InputItem>
              <Edit.InputCol>
                <Edit.InputItem required>
                  <label className="input-title">체크인 시간</label>
                  <Edit.InputField type="text" />
                </Edit.InputItem>
                <Edit.InputItem required>
                  <label className="input-title">체크아웃 시간</label>
                  <Edit.InputField type="text" />
                </Edit.InputItem>
              </Edit.InputCol>
            </Edit.InputRow>
            <Edit.InputRow>
              <Edit.RoomThumbnailUpload>
                <input type="file" id="room-thumbnail-upload" />
                <label htmlFor="room-thumbnail-upload">
                  <div>
                    <img src={`/assets/img/admin/room_edit_svg/camera2.svg`} alt="카메라2 픽토그램" />
                    <p>썸네일 이미지를 업로드 해주세요</p>
                  </div>
                </label>
              </Edit.RoomThumbnailUpload>
            </Edit.InputRow>
          </Edit.InputCol>
          <Edit.InputCol>
            <Edit.InputRow>
              <Edit.InputItem required>
                <label className="input-title">도보 소요시간</label>
                <div className="radio-group-wrapper">
                  <div>
                    <input type="radio" name="walking_time" value="5minute" id="5minute" />
                    <label htmlFor="5minute">도보 5분 내</label>
                  </div>
                  <div>
                    <input type="radio" name="walking_time" value="10minute" id="10minute" />
                    <label htmlFor="10minute">도보 5~10분 내</label>
                  </div>
                  <div>
                    <input type="radio" name="walking_time" value="15minute" id="15minute" />
                    <label htmlFor="15minute">도보 10~15분 내</label>
                  </div>
                </div>
              </Edit.InputItem>
              <Edit.InputCol>
                <Edit.InputItem required>
                  <label className="input-title">지역</label>
                  <Edit.InputField type="text" />
                </Edit.InputItem>
                <Edit.InputItem required>
                  <label className="input-title">주변 관광지</label>
                  <Edit.InputField type="text" />
                </Edit.InputItem>
              </Edit.InputCol>
              <Edit.InputItem required>
                <label className="input-title">가격</label>
                <Edit.InputField type="text" placeholder="최저가 입력" />
              </Edit.InputItem>
            </Edit.InputRow>
            <Edit.InputRow></Edit.InputRow>
          </Edit.InputCol>
          <Edit.InputRow>
            <Edit.InputItem>
              <label className="input-title">설명</label>
              <Edit.InputTextarea placeholder="숙소에 관한 설명을 입력해주세요." />
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
                {amenitiyDataList.map((amenity:amenitiesDataType,idx:number)=>{return (
                  <Edit.AmenitiesCheckBox>
                    <input
                      type="checkbox"
                      name="amenities"
                      value={amenity.value}
                      id={amenity.value}
                      onChange={()=>{amenityIsCheck(idx)}}
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
                );})}
              </Edit.AmenitiesCheckBoxGrid>
            </Edit.InputItem>
          </Edit.InputRow>
        </Edit.FormWrapper>
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
