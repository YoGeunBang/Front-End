import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, AdminLayout } from 'components/layout';
import { ReactElement } from 'react';
import * as Index from 'styles/admin/index.style';
import * as Edit from 'styles/admin/edit.style';
const Page: NextPageWithLayout = () => {
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
                <Edit.AmenitiesCheckBox>
                  <input type="checkbox" name="amenities" value="breakfast" id="breakfast" />
                  <label htmlFor="breakfast">
                    <div>
                      <img src={`/assets/img/admin/room_edit_svg/breakfast.svg`} alt="조식 픽토그램" />
                    </div>
                    <p>조식</p>
                  </label>
                </Edit.AmenitiesCheckBox>
                <Edit.AmenitiesCheckBox>
                  <input type="checkbox" name="amenities" value="event" id="event" />
                  <label htmlFor="event">
                    <div>
                      <img src={`/assets/img/admin/room_edit_svg/event.svg`} alt="이벤트 픽토그램" />
                    </div>
                    <p>이벤트</p>
                  </label>
                </Edit.AmenitiesCheckBox>
                <Edit.AmenitiesCheckBox>
                  <input type="checkbox" name="amenities" value="lounge_bar" id="lounge_bar" />
                  <label htmlFor="lounge_bar">
                    <div>
                      <img src={`/assets/img/admin/room_edit_svg/lounge_bar.svg`} alt="라운지/바 픽토그램" />
                    </div>
                    <p>라운지/바</p>
                  </label>
                </Edit.AmenitiesCheckBox>
                <Edit.AmenitiesCheckBox>
                  <input type="checkbox" name="amenities" value="cookable" id="cookable" />
                  <label htmlFor="cookable">
                    <div>
                      <img src={`/assets/img/admin/room_edit_svg/cookable.svg`} alt="조리가능 픽토그램" />
                    </div>
                    <p>조리가능</p>
                  </label>
                </Edit.AmenitiesCheckBox>
                <Edit.AmenitiesCheckBox>
                  <input type="checkbox" name="amenities" value="laundry" id="laundry" />
                  <label htmlFor="laundry">
                    <div>
                      <img src={`/assets/img/admin/room_edit_svg/laundry.svg`} alt="세탁 픽토그램" />
                    </div>
                    <p>세탁</p>
                  </label>
                </Edit.AmenitiesCheckBox>
                <Edit.AmenitiesCheckBox>
                  <input type="checkbox" name="amenities" value="fitness" id="fitness" />
                  <label htmlFor="fitness">
                    <div>
                      <img src={`/assets/img/admin/room_edit_svg/fitness.svg`} alt="피트니스 픽토그램" />
                    </div>
                    <p>피트니스</p>
                  </label>
                </Edit.AmenitiesCheckBox>
                <Edit.AmenitiesCheckBox>
                  <input type="checkbox" name="amenities" value="swimming_pool" id="swimming_pool" />
                  <label htmlFor="swimming_pool">
                    <div>
                      <img src={`/assets/img/admin/room_edit_svg/swimming_pool.svg`} alt="수영장 픽토그램" />
                    </div>
                    <p>수영장</p>
                  </label>
                </Edit.AmenitiesCheckBox>
                <Edit.AmenitiesCheckBox>
                  <input type="checkbox" name="amenities" value="etc" id="etc" />
                  <label htmlFor="etc">
                    <p>추가(기타)</p>
                  </label>
                </Edit.AmenitiesCheckBox>
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
