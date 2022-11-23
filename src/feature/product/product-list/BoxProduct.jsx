import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: center; 
  transition: 0.5s;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  max-width: 350px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  border: 1px solid #ddd;

  // &:hover ${Image}{
  //   transform: scale(2) rotate(0deg);
  // }
`;

const Title = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin-top: 15px;
`
const Price = styled.p`
  font-size: 16px;
  color: #ff652e;
  font-weight: bold;
`
const ProductImage = styled.div`
  width: 100%;
  padding: 10px 10px 0;

`
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
`
const BoxProduct = ({ data }) => {
  return (
    <Container>
      <ProductInfo>
        <ProductImage>
        <Image src={data.img} />
        </ProductImage>
        <Title> {data.name}</Title>
        <Price>{data.price}$</Price>
      </ProductInfo>
    </Container>
  );
};

export default BoxProduct;