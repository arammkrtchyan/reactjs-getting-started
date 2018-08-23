import React, {Component} from 'react';
import './App.css';


const ProductCategoryRow = (props) => {

    return (
        <tr>
            <th colSpan="2">
                {props.category}
            </th>
        </tr>
    );

};

const ProductRow = (props) => {
    let {
        name,
        price,
        stocked
    } = props.product;

    return (
        <tr>
            <td>
                {
                    stocked ? name :
                        <span style={{color: "red"}}> {name}</span>
                }
            </td>
            <td>{price}</td>
        </tr>
    );
};

const SearchBox = (props) => {
    return (
        <form>
            <p>
                <input type="text" value={props.filterText}
                       onChange={(e) => props.onFilterTextChange(e.target.value)}/>
            </p>
            <p>
                <input type="checkbox" value={props.inStockOnly}
                       onChange={(e) => props.onInStockOnlyChange(e.target.checked)}/>
                {' '} Only show products in stock
            </p>
        </form>
    );
};

const ProductTable = (props) => {
    const rows = [];
    const {
        filterText,
        inStockOnly,
        products
    } = props;
    let lastCategory;
    products.forEach((product) => {
        if (product.name.indexOf(filterText) < 0) return;
        if (inStockOnly && !product.stocked) return;
        if (lastCategory !== product.category) {
            rows.push(
                <ProductCategoryRow category={product.category} key={product.category}/>
            );
        }
        rows.push(
            <ProductRow product={product} key={product.name}/>
        );
        lastCategory = product.category;
    });
    return (
        <table>
            <tbody>
            {rows}
            </tbody>
        </table>
    );

};

class FilterableProductTable extends React.Component {

    state = {
        filterText: '',
        inStockOnly: false
    };

    handleFilterTextChange = (filterText) => {
        this.setState(
            {
                filterText: filterText
            }
        );
    };

    handleStockOnlyChange = (inStockOnly) => {
        this.setState(
            {
                inStockOnly: inStockOnly
            }
        );
    };

    render() {
        return (
            <div>
                <SearchBox filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}
                           onFilterTextChange={this.handleFilterTextChange}
                           onInStockOnlyChange={this.handleStockOnlyChange}/>
                <ProductTable products={this.props.products} filterText={this.state.filterText}
                              inStockOnly={this.state.inStockOnly}/>
            </div>
        );
    }

}


class App extends Component {
    render() {
        return (
            <div className="App">
                <FilterableProductTable products={PRODUCTS}/>
            </div>
        );
    }
}


const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

export default App;
