import { AppLayout } from 'layout/AppLayout';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 115px`;

function OrdersDetail() {
    return (<AppLayout>
        <Container>
            <h1>Orders Detail</h1>
        </Container>
    </AppLayout>)
};

export default OrdersDetail;