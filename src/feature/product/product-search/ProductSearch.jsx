import { LoadingOutlined } from "@ant-design/icons";
import { AppLayout } from "layout/AppLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { searchProductAction } from "stores/slices/product.slice";
import styled from "styled-components";
import BoxProduct from "../product-list/BoxProduct";

const Container = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
const EmptySearch = styled.div`
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin-top: 20px;
`
export default function ProductSearch() {
    const productState = useSelector(state => state.product.productState);
    const dispatch = useDispatch();
    const loading = productState.loading;
    const dataLength = productState.data.length;

    const { q } = useParams();

    useEffect(() => {
        dispatch(searchProductAction(q));
    }, [q, dispatch])

    return (<AppLayout>
        {loading ? <div> <LoadingOutlined style={{ fontSize: '30px', marginTop: '20px' }} /> </div> :
        dataLength ? <Container>
            {productState.data.map((item) => (
                <Link to={`/products-detail/${item.id}`} key={item.id} style={{ textDecoration: 'none', marginBottom: "10px" }}><BoxProduct data={item} /></Link>
            ))}
        </Container>
            : <EmptySearch>No results</EmptySearch>}
    </AppLayout>)
}