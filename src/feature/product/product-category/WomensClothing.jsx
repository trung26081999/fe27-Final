import { LoadingOutlined } from "@ant-design/icons";
import { WOMENSCLOTHING_FEATURE_DATA } from "constant/ProductFeatureData";
import { AppLayout } from "layout/AppLayout";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from "react-router-dom";
import { fetchProductAction } from 'stores/slices/product.slice';
import styled from "styled-components";
import BoxProduct from "../product-list/BoxProduct";

const Container1 = styled.div`
    width: 98%;
    margin: auto;
    display: flex;
    justify-content: center;
    margin-top:100px;

`;
const Container2 = styled.div`
    width: 98%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: calc(20% - 30px);
    border: 1px solid #ddd;
    margin: 5px;
    height: 100%;
`;

const ImgContainer = styled.div`
    position: relative;
    cursor: pointer;
`;

const Image = styled.img`
    width: 100%;
    position: relative;
    padding: 20px 10px;
`;

const InfoContainer = styled.div`
    color: #e0e3db;
`;

const Title = styled.h1`
    color: #000;
    font-size: 14px;
    font-weight: 500;
`;

const H2 = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-top: 25px;
`;

const P = styled.h1`
    font-size: 14px;
    font-weight: normal;
    color: #000;
`;

export default function MensClothing() {
    const productState = useSelector((state) => state.product.productState);
    const [productList, setProductList] = useState(productState.data);
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    let feature = searchParams.get('feature');

    const loading = productState.loading;

    useEffect(() => {
        dispatch(fetchProductAction(3));
    }, [dispatch]);

    useEffect(() => {
        switch (feature) {
            case "skirts":
                const skirtsWomensClothing = productState.data.filter(item => item.feature === "skirts");
                setProductList(skirtsWomensClothing);
                break;

            case "trisuits":
                const trisuitsWomensClothing = productState.data.filter(item => item.feature === "trisuits");
                setProductList(trisuitsWomensClothing);
                break;

            default:
                setProductList(productState.data);
                break;
        }
    }, [feature, productState.data])

    return (<AppLayout>
        <>
            <H2>Women´s clothing running and triathlon</H2>
            <P>Find a wide range of <b>Women´s clothing</b> products. Discover the best deals for your <b>running and triathlon</b> equipment at <b>runnerinn</b>. Fast shipping.</P>
            <Container1>
                {WOMENSCLOTHING_FEATURE_DATA.map((item, index) => {
                    return (<Wrapper key={index}>
                        <Link style={{ textDecoration: 'none' }} to={item.path}>
                            <ImgContainer>
                                <Image src={item.img} />
                                <InfoContainer>
                                    <Title>{item.title}</Title>
                                </InfoContainer>
                            </ImgContainer>
                        </Link>
                    </Wrapper>)
                })}
            </Container1>
            <H2>Featured products in Women´s clothing</H2>
            {loading && <div><LoadingOutlined /></div>}
            {!loading && <Container2>
                {productList.map((item) => {
                    return (<Link to={`/products-detail/${item.id}`} key={item.id} style={{ textDecoration: 'none', marginBottom: "10px" }}><BoxProduct data={item} /></Link>)
                })}
            </Container2>}


        </>
    </AppLayout>)
}