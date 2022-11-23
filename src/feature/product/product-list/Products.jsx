import styled from "styled-components";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAction, PRODUCT_LIMIT } from "stores/slices/product.slice";
import BoxProduct from "./BoxProduct";
import { AppLayout } from "layout/AppLayout";
import { Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 200px;
`;

const AllProducts = () => {
  const productState = useSelector((state) => state.product.productState);
  // console.log(productState.data);
  const dispatch = useDispatch();

  const page = productState.pagination.page;
  const total = productState.pagination.total;
  const loading = productState.loading;

  useEffect(() => {
    dispatch(fetchProductAction(1));
  }, [dispatch]);

  const onPaginationChange = (page, pageSize) => {
    dispatch(fetchProductAction(page));
  };

  return (
    <AppLayout>
      {loading ? (
        <div>
          {" "}
          <LoadingOutlined
            style={{ fontSize: "30px", marginTop: "20px" }}
          />{" "}
        </div>
      ) : (
        <>
          <Container>
            {productState.data.map((item) => (
              <Link
                to={`/products-detail/${item.id}`}
                key={item.id}
                style={{ marginBottom: "10px" }}
              >
                <BoxProduct data={item} />
              </Link>
            ))}
          </Container>
          <Pagination
            onChange={onPaginationChange}
            pageSize={PRODUCT_LIMIT}
            current={page}
            total={total}
          />
        </>
      )}
    </AppLayout>
  );
};

export default AllProducts;
