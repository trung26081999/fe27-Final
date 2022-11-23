import {
    Pagination, Table
} from "antd";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { PRODUCT_LIMIT } from "stores/slices/product.slice";
import { fetchUserRegisterAction } from "stores/slices/user.slice";
import "../product/ProductManagement.scss";

export function UserManagement() {
    const userInfo = useSelector(state => state.users.userInfoState);
    console.log("userInfo:", userInfo.data);
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();

    const defaultPage = 1;

    const _page = searchParams.get("page") ?? `${defaultPage}`;
    const _limit = searchParams.get("limit") ?? `${PRODUCT_LIMIT}`;

    const loading = userInfo.loading;
    const total = userInfo?.pagination?.total;

    useEffect(() => {
        dispatch(fetchUserRegisterAction());
    }, [dispatch, _page, _limit]);

    const onPaginationChange = (page, limit) => {
        setSearchParams({ page, limit });
    };

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "name",
        },
    ]

    return (
        <div className="product-mangement-page">
            <h1>Users Management</h1>
            <Table
                pagination={false}
                loading={loading}
                columns={columns}
                dataSource={userInfo.data}
            />
            <Pagination
                onChange={onPaginationChange}
                pageSize={+_limit}
                current={+_page}
                total={total}
            />
        </div>
    );
}
