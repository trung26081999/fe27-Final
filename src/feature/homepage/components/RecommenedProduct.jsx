import { LoadingOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 99%;
    margin: auto;
    height: 420px;
    display: flex;
    position: relative;
    overflow: hidden;
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction === "left" && "-17px"};
    right: ${(props) => props.direction === "right" && "-17px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`;

const Wrapper = styled.div`
    width: calc(200% + 30px);
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    width: 20vw;
    overflow-wrap: anywhere;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
    height: 100%;
    width: 90%;
    cursor: pointer;
    position: relative;
`;

const Image = styled.img`
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
`;

const InfoContainer = styled.div`
    color: #e0e3db;
    margin-top: 10px;
`;

const Title = styled.h1`
    color: #000;
    font-size: 14px;
    font-weight: 500;
`;

const Desc = styled.p`
    font-size: 16px;
    color: #ff652e;
    font-weight: bold;
`;

const P = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-bottom: 40px;
`;

const RecommenedProduct = ({ recommenedProduct, loading }) => {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 0);
        } else {
            setSlideIndex(slideIndex < 1 ? slideIndex + 1 : 1);
        }
    };

    return (<>
        <P>RECOMMENDED FOR YOU</P>
        {loading ? <div><LoadingOutlined /></div>
        : <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
            <ArrowLeftOutlined style={{ fontSize: "50px" }} />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {recommenedProduct.map((item) => (
                <Slide key={item.id}>
                    <Link to={`/products-detail/${item.id}`} style={{ textDecoration: 'none' }}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.name}</Title>
                            <Desc>{item.price}$</Desc>
                        </InfoContainer>
                    </Link>
                </Slide>
            ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
            <ArrowRightOutlined style={{ fontSize: "50px" }} />
        </Arrow>
    </Container>}
    </>
    );
};

export default RecommenedProduct;

