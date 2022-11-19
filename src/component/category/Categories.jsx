import styled from "styled-components";
import { categoryData } from "constant/CategoryData";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 20px;
    justify-content: center;
`;

const Categories = () => {
    return (
        <Container>
            {categoryData.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default Categories;
