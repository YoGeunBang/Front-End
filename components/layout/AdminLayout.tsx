import { AdminSideMenu } from 'components/common'
import styled from 'styled-components'
const AdminLayout = (props: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <AdminSideMenu/>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div` 
    padding-top:160px;
`
export default AdminLayout;