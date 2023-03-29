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
      {pagination_JSX.slice((Math.ceil(page/5) -1)*5, ((Math.ceil(page/5) -1)*5) + 5)}
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
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
