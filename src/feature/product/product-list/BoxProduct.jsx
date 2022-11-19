import styled from "styled-components";

// const Info = styled.div`
//   opacity: 0;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.2);
//   z-index: 3;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.5s ease;
//   cursor: pointer;
// `;
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

// const Icon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 10px;
//   transition: all 0.5s ease;
//   &:hover {
//     background-color: #e9f5f5;
//     transform: scale(1.1);
//   }
// `;
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
        {/* <Info>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <SearchOutlined />
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info> */}
        <Title> {data.name}</Title>
        <Price>{data.price}$</Price>
      </ProductInfo>
    </Container>
  );
};

export default BoxProduct;
