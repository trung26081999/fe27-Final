import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import Logos from "assets/Clothing-store.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutCart } from "stores/slices/cart.slice";
import { searchProductAction } from "stores/slices/product.slice";
import { logoutAction } from "stores/slices/user.slice";
import styled from "styled-components";
import MenuBar from "./menu-bar/MenuBar";
import  HeaderTop  from './header-top/HeaderTop';

const Container = styled.div`
  width: 100%;
  min-width: 1200px;
  background: #fff;
  display: block;
  position: fixed;
  top: 0;
  z-index: 1000;

  @media (min-width: 767px) and (max-width: 1024px) {
    width: 100%;
    min-width: 767px;
  }

  @media (max-width: 426px) {
    width: 46%;
    min-width: 320px;
  }
`;

const Wrapper = styled.div`
  color: black;
  padding: 10px 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 767px) and (max-width: 1024px) {
    padding: 5px;
  }

  @media (max-width: 426px) {
    padding: 3px;
  }
`;

const Center = styled.div`
  flex: 60%;
  display: flex;
  align-items: center;
`;
const Left = styled.div`
  flex: 30%;
  text-align: center;
`;
const Right = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Language = styled.div`
  flex: 10%;
  font-size: 14px;
  cursor: pointer;
  margin-left: 5px;

  @media (max-width: 426px) {
    font-size: 11px;
  }
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 25px;
  padding: 10px;
  border-radius: 10px;
  flex: 90%;
  background: white;

  @media (max-width: 426px) {
    margin-left: 5px;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  color: #000;

  @media (max-width: 426px) {
    font-size: 11px;
  }
`;

const Logo = styled.img`
  width: 100%;

  @media (max-width: 426px) {
    height: 35px;
  }

  @media (min-width: 767px) and (max-width: 1024px) {
  }
`;
const ButtonLogout = styled.div`
  display: none;
  border: 1px solid #ffffff;
  border-radius: 5px 0 5px;
  color: black;
`;
const MenuItem = styled.div`
  font-size: 17px;
  color: black;
  cursor: pointer;
  margin-left: 25px;
  &:hover ${ButtonLogout} {
    display: block;
  }

  @media (max-width: 426px) {
    font-size: 11px;
    margin-left: 10px;
  }
`;

const Header = () => {
  const userInfo = useSelector((state) => state.users.userInfoState);
  const cartState = useSelector((state) => state.cart.cartState);
  const [dataCart, setDataCart] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = userInfo.data;
  // console.log('user', user);

  useEffect(() => {
    if (cartState.data.length >= 0) {
      const dataFilter = cartState?.data?.filter(
        (item) => item?.userEmail === user?.email
      );
      setDataCart(dataFilter);
    }
  }, [cartState.data, user]);

  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  const onSubmit = (newFilters) => {
    if (newFilters.searchTerm === "") {
      navigate("/");
    } else {
      navigate(`/products-search/${newFilters.searchTerm}`);
      dispatch(searchProductAction(newFilters.searchTerm));
    }
  };

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 1000);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(logOutCart());
    navigate("/login");
  };

  return (
    <Container>
        <HeaderTop/>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo src={Logos} />
          </Link>
        </Left>
        <Center>
          <SearchContainer>
            <Input
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Search 1000 products"
            />
            <SearchOutlined style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Center>
        <Right>
          {user ? (
            <MenuItem>
              {user.email}
              <ButtonLogout onClick={handleLogout}>LOG OUT</ButtonLogout>
              <Link style={{ textDecoration: "none" }} to="/orders">
                <ButtonLogout>ORDERS</ButtonLogout>
              </Link>
            </MenuItem>
          ) : (
            <>
              <Link style={{ textDecoration: "none" }} to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
          <Link style={{ textDecoration: "none" }} to="/cart">
            <MenuItem>
              <Badge count={dataCart.length}>
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "black" }}
                />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
      <MenuBar />
    </Container>
  );
};

export default Header;
