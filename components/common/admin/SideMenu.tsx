/* 관리자 페이지 사이드 메뉴 컴포넌트 */
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { ReactElement } from 'react';
import styled from 'styled-components';
/* router 관련 */
import { useRouter } from 'next/router';
import Link from 'next/link';

interface MenuType {
  id: string;
  name: string;
  path: string;
  subMenu?: MenuType[];
}

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const menuData: MenuType[] = [
    { id: 'region_manage', name: '지역 관리', path: '/admin/region' },
    { id: 'detail_manage', name: '관광지 관리', path: '/admin/detail' },
    {
      id: 'rooms_manage',
      name: '숙소 관리',
      path: '/admin/rooms',
      subMenu: [
        { id: 'rooms_registered', name: '등록된 숙소', path: '/admin/rooms/registered' },
        { id: 'rooms_crawled', name: '크롤링 데이터', path: '/admin/rooms/crawled' },
        { id: 'rooms_temp', name: '임시 저장', path: '/admin/rooms/temp' },
        { id: 'rooms_deleted', name: '휴지통', path: '/admin/rooms/deleted' },
      ],
    },
  ];

  return (
    <MenuWrapper>
      <ul>
        {menuData.map((menu) => {
          return (
            <li key={menu.id}>
              <Link href={menu.path} passHref>
                <a className={router.pathname === menu.path ? 'active' : ''}>{menu.name}</a>
              </Link>
              {menu.subMenu && (
                <ul>
                  {menu.subMenu.map((subMenu) => {
                    return (
                      <li key={subMenu.id}>
                        <Link href={subMenu.path} passHref>
                          <a className={router.pathname === subMenu.path ? 'active' : ''}>{subMenu.name}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </MenuWrapper>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const MenuWrapper = styled.nav`

  width: 300px;
  font-size: 20px;
  color: #212121;
  li {
    font-weight: 900;
    height: 80px;
    line-height: 80px;
    padding-left: 60px;
    ul {
      li {
        font-size: 18px;
        font-weight: 500;
        padding-left: 0px;
        color: #9e9e9e;
      }
    }
  }
  .active {
    color: #00c2d6;
  }
`;

export default Page;
