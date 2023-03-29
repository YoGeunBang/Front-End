import styled from 'styled-components';

interface paginationPropsType {
  total: number; // total : 데이터의 개수
  limit: number; // limit : 한 페이지에 보여질 데이터 최대 개수
  page: number; // page : 현재 페이지
  setPage: any; // setPage : 페이지를 제어하는 setState
}

const Pagination = ({ total, limit, page, setPage }: paginationPropsType) => {
  const totalPages = Math.ceil(total / limit); // 총 페이지 수
  const pagination_JSX = Array(totalPages)
    .fill(0)
    .map((_, i) => (
      <Button key={i + 1} onClick={() => setPage(i + 1)} aria-current={page === i + 1 ? 'page' : undefined}>
        {i + 1}
      </Button>
    ));

  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {pagination_JSX.slice((Math.ceil(page / 5) - 1) * 5, (Math.ceil(page / 5) - 1) * 5 + 5)}
      <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        &gt;
      </Button>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 56px;
  gap: 10px;
`;

const Button = styled.button`
  border: none;
  color: #bdbdbd;
  padding: 0;
  font-size: 1.2rem;
  background-color: transparent;
  width: 18px;
  height: 18px;
  &:hover {
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    border: 1px solid #212121;
    color:#212121;
    border-radius: 4px;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
