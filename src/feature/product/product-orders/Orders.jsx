import { Pagination, Table } from "antd";
import Column from "antd/lib/table/Column";
import { AppLayout } from "layout/AppLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getListOrdersAction } from "stores/slices/orders.slice";
import { PRODUCT_LIMIT } from "stores/slices/product.slice";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 115px`;

const P = styled.div`
  color: #000000`;

export default function Orders() {
    const ordersState = useSelector(state => state.orders.ordersState);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const defaultPage = 1;
    const _page = searchParams.get("page") ?? `${defaultPage}`;
    const _limit = searchParams.get("limit") ?? `${PRODUCT_LIMIT}`;

    const data = ordersState.data;
    const loading = ordersState.loading;
    const total = ordersState?.pagination?.total;

    useEffect(() => {
        dispatch(getListOrdersAction(_page, _limit))
    }, [dispatch, _page, _limit])

    const onPaginationChange = (page, limit) => {
        setSearchParams({ page, limit });
    };

    return (<AppLayout>
        <Container>
            <h1>Orders</h1>
            <Table
                pagination={false}
                loading={loading}
                dataSource={data ?? []}
            >
                <Column
                    title=""
                    dataIndex=""
                    key=""
                />
                <Column
                    title="Code Orders"
                    dataIndex="id"
                    key="code"
                />
                <Column
                    title="User Name"
                    dataIndex="userName"
                    key="userName"
                />
                <Column
                    title="User Phone"
                    dataIndex="userPhone"
                    key="userPhone"
                />
                <Column
                    title="User Address"
                    dataIndex="userAddress"
                    key="userAddress"
                />
                <Column
                    title="Products Total"
                    dataIndex="products"
                    key="products"
                    render={(products) => (
                        <P>{products?.length}</P>
                    )}
                />
                <Column
                    title="Total"
                    dataIndex="total"
                    key="total"
                />
                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                />
                <Column
                    title="Date"
                    dataIndex="date"
                    key="date"
                />
                <Column
                    title="Action"
                    dataIndex="data"
                    key="action"
                    render={() => <>
                        {data.map(item => <Link to={`/orders-detail/${item.id}`} key={item.id}>
                            Orders Detail
                        </Link>)}
                    </>}
                />
            </Table>
            <Pagination
                onChange={onPaginationChange}
                pageSize={+_limit}
                current={+_page}
                total={total}
            />

        </Container>
    </AppLayout>)
}