import { LoadingOutlined } from "@ant-design/icons";
import { Add, Remove } from "@material-ui/icons";
import { Image } from 'antd';
import { AppLayout } from "layout/AppLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { addProductToCartAction, getListCartAction, updateProductCartAction } from "stores/slices/cart.slice";
import { fetchProductAction } from "stores/slices/product.slice";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';


const Container = styled.div`
  margin-top: 115px`;

const Wrapper = styled.div`
  width: 100%;
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  width: 400px;
  flex: 1;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 600;
`;


const Price = styled.span`
  font-weight: 400;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 10px 0;
`;

const Filter = styled.div`
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 300;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
`;

const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  margin: 10px 0;
  cursor: pointer;
`;

const Amount = styled.span`
  width: 40px;
  border-radius: 10px;
  border: 1px solid teal;
  margin: 0px 5px;
  padding: 10px;
`;

const Button = styled.button`
  width: 60%;
  padding: 10px;
  background-color: #FF652E;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 2px;
  opacity: 1;

  &:hover{
    opacity: 0.8;
  }
`;

const ProductDetail = () => {
  const productState = useSelector(state => state.product.productState);
  const userInfo = useSelector(state => state.users.userInfoState);
  const cartState = useSelector(state => state.cart.cartState);

  const user = userInfo.data;
  const data = productState?.data;
  const loading = productState.loading;

  const [amount, setAmount] = useState(1);
  const [sizeOption, setSizeOption] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [productDetail, setProductDetail] = useState({
    name: "",
    price: null,
    img: "",
    category: "",
    feature: "",
    size: null,
    quantity: null,
    userEmail: ""
  });
  useEffect(() => {
    dispatch(fetchProductAction());
  }, [dispatch])

  useEffect(() => {
    dispatch(getListCartAction());
  }, [dispatch])

  useEffect(() => {
    const dataDetail = data?.find(item => item.id == id);
    setProductDetail(dataDetail)
  }, [data, id])

  const handleSizeChange = (e) => {
    setSizeOption(e.target.value);
    setProductDetail({
      ...productDetail,
      size: e.target.value,
    })
  }

  const handleAddAmount = () => {
    if (amount < 100) {
      setAmount(amount + 1);
      setProductDetail({
        ...productDetail,
        quantity: amount + 1,
      })
    }
  }
  const handleRemoveAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
      setProductDetail({
        ...productDetail,
        quantity: amount - 1,
      })
    }
  }

  const addToCart = () => {
    if (!user) {
      alert("Please login account.")
      navigate("/login");
    } else if (!productDetail?.size) {
      alert("Please choose size product !")
      return;
    } else {
      const checkProduct = cartState.data.some(item => item.productId == id);
      const checkProductUser = cartState.data.some(item => item.userEmail === user.email);
      const productFindId = checkProduct ? cartState.data.find(item => item.productId == id) : null;

      if (checkProduct && checkProductUser && productFindId && productDetail?.size === productFindId?.size) {
        dispatch(updateProductCartAction({ id: productFindId.id, data: { quantity: productFindId.quantity + productDetail?.quantity } }));
        dispatch(getListCartAction());
      } else {
        let dataParams = {
          ...productDetail,
          productId: id, id: uuidv4(),
          userEmail: user.email,
        }
        dispatch(addProductToCartAction(dataParams))
        dispatch(getListCartAction())
      }
    }
  }

  return (
    <AppLayout>
      <Container>
        <Wrapper>
          <ImgContainer>
            {loading ? <div> <LoadingOutlined style={{ fontSize: '30px', marginTop: '20px' }} /> </div>
              : <Image
                width={350}
                src={productDetail?.img}
              />
            }
          </ImgContainer>
          <InfoContainer>
            <Title>{productDetail?.name}</Title>
            <AddContainer>
              <AmountContainer>
                <Remove onClick={handleRemoveAmount} />
                <Amount>{amount}</Amount>
                <Add onClick={handleAddAmount} />
              </AmountContainer>
            </AddContainer>
            <Price>{productDetail?.price}$</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={handleSizeChange} value={sizeOption}>
                  <FilterSizeOption>Select size</FilterSizeOption>
                  <FilterSizeOption value={28}>28</FilterSizeOption>
                  <FilterSizeOption value={29}>29</FilterSizeOption>
                  <FilterSizeOption value={30}>30</FilterSizeOption>
                  <FilterSizeOption value={31}>31</FilterSizeOption>
                  <FilterSizeOption value={32}>32</FilterSizeOption>
                  <FilterSizeOption value={33}>33</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
          </InfoContainer>
        </Wrapper>

        <Wrapper>
        </Wrapper>
        <ToastContainer
          autoClose={1000}
          style={{ display: "block", position: "fixed", zIndex: "99999" }}
        />
      </Container>
    </AppLayout>
  );
};

export default ProductDetail;
