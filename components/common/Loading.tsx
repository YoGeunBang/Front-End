import styled from "styled-components";

const Loading = () => {
    return (
        <Container>
            <ContentBox>
            <span>로그인 진행중</span>
            </ContentBox>
        </Container>
    )
}
const Container = styled.div`
position: fixed;
top: 0;
left: 0;
display: flex;
width: 100vw;
height: 100vh;
background-color: #ddd;
`;
const ContentBox =styled.div`
position: relative;
display: block;
`;

export default Loading;