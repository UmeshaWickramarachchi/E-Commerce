import React, { useContext } from "react";
import "./CSS/Category.css";
import { ShopContext } from "../Context/ShopContext";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Item } from "../Components/Item/Item";

export const Category = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="category">
      <div className="category-indexSort d-flex justify-content-between align-items-center p-3">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>

        {/* Flex container to align "Sort by" text and dropdown */}
        <div className="d-flex align-items-center">
          <p className="mb-0 me-2">Sort by</p> {/* Sort by text */}

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Select
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">Price: Low to High</Dropdown.Item>
              <Dropdown.Item href="#">Price: High to Low</Dropdown.Item>
              <Dropdown.Item href="#">Newest Arrivals</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Display Product Images */}
      <div className="category-products">
        {all_product.map((item,i) => {
          if(props.category===item.category){
             return <Item
                            key={i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                          />
          }
          else{
            return null;
          }
})}
      </div>
    </div>
  );
};
