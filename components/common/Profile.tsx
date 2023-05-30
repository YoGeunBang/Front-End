import Link from 'next/link';
import styled from 'styled-components';
interface ProfilePropsType {
  profile_img: string;
}
const Profile = ({ profile_img }: ProfilePropsType) => {
  
  const handleImgError = (e:React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/assets/img/profile_default.svg';
  }

  return (
    <Link href="/member/mypage">
      <ProfileImgBox>
        <img src={profile_img} alt="프로필이미지" onError={handleImgError}/>
      </ProfileImgBox>
    </Link>
  );
};

const ProfileImgBox = styled.a`
  position: relative;
  display: flex;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  overflow:hidden;
  background-color: transparent;
  cursor: pointer;
  img {
    position: relative;
    width: 100%;
    object-fit: cover;
  }
`;
export default Profile;
