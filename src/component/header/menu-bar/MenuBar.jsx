import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './menubar.scss';

const items = [
    {
        label: 'All Categories',
        key: '1',
        children: [
            {
                type: 'group',
                label: (<Link to="/kids-shoes">Kid's Shoes</Link>),
                children: [
                    {
                        label: (<Link to="/kids-shoes?feature=casual">Casual</Link>),
                        key:"2"
                    },
                    {
                        label: (<Link to="/kids-shoes?feature=runningshoes">Running Shoes</Link>),
                        key:"3"
                    },
                    {
                        label: (<Link to="/kids-shoes?feature=trailrunningshoes">Trail Running Shoes</Link>),
                        key:"4"
                    },
                ],
            },
            {
                type: 'group',
                label: (<Link to="/kids-clothing">Kid's Clothing</Link>),
                children: [
                    {
                        label: (<Link to="/kids-clothing?feature=jackets">Jackets</Link>),
                        key:"5"
                    },
                    {
                        label: (<Link to="/kids-clothing?feature=pants">Pants</Link>),
                        key:"6"
                    },
                ],
            },
            {
                type: 'group',
                label: (<Link to="/womens-shoes">Women's Shoes</Link>),
                children: [
                    {
                        label: (<Link to="/womens-shoes?feature=casual">Casual</Link>),
                        key:"7"
                    },
                    {
                        label: (<Link to="/womens-shoes?feature=sandals">Sandals</Link>),
                        key:"8"
                    },
                    {
                        label: (<Link to="/womens-shoes?feature=trackshoes">Track Shoes</Link>),
                        key:"9"
                    },
                    {
                        label: (<Link to="/womens-shoes?feature=runningshoes">Running Shoes</Link>),
                        key:"10"
                    },
                    {
                        label: (<Link to="/womens-shoes?feature=trailrunningshoes">Trail Running Shoes</Link>),
                        key:"11"
                    },
                ],
            },
            {
                type: 'group',
                label: (<Link to="/womens-clothing">Women's Clothing</Link>),
                children: [
                    {
                        label: (<Link to="/womens-clothing?feature=skirts">Skirts</Link>),
                        key:"12"
                    },
                    {
                        label: (<Link to="/womens-clothing?feature=trisuits">Trisuits</Link>),
                        key:"13"
                    },
                ],
            },
            {
                type: 'group',
                label: (<Link to="/mens-shoes">Men's Shoes</Link>),
                children: [
                    {
                        label: (<Link to="/mens-shoes?feature=casual">Casual</Link>),
                        key:"14"
                    },
                    {
                        label: (<Link to="/mens-shoes?feature=sandals">Sandals</Link>),
                        key:"15"
                    },
                    {
                        label: (<Link to="/mens-shoes?feature=trackshoes">Track Shoes</Link>),
                        key:"16"
                    },
                    {
                        label: (<Link to="/mens-shoes?feature=runningshoes">Running Shoes</Link>),
                        key:"17"
                    },
                    {
                        label: (<Link to="/mens-shoes?feature=trailrunningshoes">Trail Running Shoes</Link>),
                        key:"18"
                    },
                ],
            },
            {
                type: 'group',
                label: (<Link to="/mens-clothing">Men's Clothing</Link>),
                children: [
                    {
                        label: (<Link to="/mens-clothing?feature=fleeces">Fleeces</Link>),
                        key:"19"
                    },
                    {
                        label: (<Link to="/mens-clothing?feature=gloves">Gloves</Link>),
                        key:"20"
                    },
                ],
            },
        ],
    },
    {
        label: (<Link to="/">Home</Link>),
        key: 'home',
    },
    {
        label: (<Link to="/all-products">All Products</Link>),
        key: 'allProducts',

    },
    {
        label: (<Link to="/womens-shoes">Women's Shoes</Link>),
        key: 'womens-shoes',
    },
    {
        label: (<Link to="/mens-shoes">Men's Shoes</Link>),
        key: 'mens-shoes',
    },
    {
        label: (<Link to="/womens-clothing">Women's Clothing</Link>),
        key: 'womens-clothing',
    },
    {
        label: (<Link to="/mens-clothing">Men's Clothing</Link>),
        key: 'mens-clothing',
    },
];

const MenuBar = () => {
    return (<>
        <Menu mode="horizontal" items={items} 
        />
    </>);
};

export default MenuBar;