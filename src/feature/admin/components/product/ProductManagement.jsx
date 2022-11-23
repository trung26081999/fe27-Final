import {
  Button,
  Modal,
  Pagination,
  Popconfirm,
  Table,
  Typography
} from "antd";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addProductAction, deleteProductAction, fetchProductAction, PRODUCT_LIMIT } from "stores/slices/product.slice";
import "./ProductManagement.scss";

export function ProductManagement() {
  const productState = useSelector(state => state.product.productState);
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultPage = 1;

  const _page = searchParams.get("page") ?? `${defaultPage}`;
  const _limit = searchParams.get("limit") ?? `${PRODUCT_LIMIT}`;

  const loading = productState.loading;
  const data = productState?.data;
  const total = productState?.pagination?.total;

  useEffect(() => {
    dispatch(fetchProductAction(_page, _limit));
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        // const editable = isEditing(record);
        const onDelete = () => {
          dispatch(deleteProductAction(record.id));
          dispatch(fetchProductAction(_page, _limit));
        }
        return true ? (
          <span>
            <Typography.Link
              onClick={() => setShowEditModal(true)}
              style={{
                marginRight: 8,
              }}
            >
              Edit
            </Typography.Link>
            <Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={onDelete}>
                Cancel
              </Popconfirm>
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link onClick={() => { }}>Edit</Typography.Link>
        );
      },
    },
  ];
  const { register, handleSubmit } = useForm();

  const onSubmit = (database) => {
    // console.log("data:", database);
    dispatch(addProductAction(database));
    // dispatch(fetchProductAction(_page, _limit))
  }

  return (
    <div className="product-mangement-page">
      <h1>Product Management</h1>
      <Button onClick={() => setShowAddModal(true)}>+ Add Product</Button>
      <Modal
        title="Add Product Form"
        visible={showAddModal}
        onOk={handleSubmit(onSubmit)}
        onCancel={() => setShowAddModal(false)}
        okText={"submit"}
      >
        <form>
          <input {...register("name")} placeholder="Name of Product" />
          <input {...register("price")} type="number" placeholder="Price of Product" />
          <input {...register("img")} type="text" placeholder="Image of Product" />
          <input {...register("category")} placeholder="Category of Product" />
          <input {...register("feature")} placeholder="Feature of Product" />
          <input {...register("size")} type="number" placeholder="Size of Product" />
          <input {...register("quantity")} type="number" placeholder="Quantity of Product" />
        </form>
      </Modal>

      <Modal
        title="Edit Product Form"
        visible={showEditModal}
        onOk={handleSubmit(onSubmit)}
        onCancel={() => setShowEditModal(false)}
        okText={"submit"}
      >
        <form>
          <input {...register("name")} placeholder="Name of Product" />
          <input {...register("price")} type="number" placeholder="Price of Product" />
          <input {...register("img")} type="text" placeholder="Image of Product" />
          <input {...register("category")} placeholder="Category of Product" />
          <input {...register("feature")} placeholder="Feature of Product" />
          <input {...register("size")} type="number" placeholder="Size of Product" />
          <input {...register("quantity")} type="number" placeholder="Quantity of Product" />
        </form>
      </Modal>
      <Table
        pagination={false}
        loading={loading}
        columns={columns}
        dataSource={data}
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
