import React, { useContext, useEffect, useState } from "react";
import "./CSS/Category.css";
import { ShopContext } from "../Context/ShopContext";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Item } from "../Components/Item/Item";

export const Category = (props) => {
  const { allItems, images } = useContext(ShopContext);
  
  return (
    <div className="category">
      <div className="category-indexSort d-flex justify-content-between align-items-center p-3">
        <p>
          <span>Showing 1-12</span> out of {allItems.length} products
        </p>

        <div className="d-flex align-items-center">
          <p className="mb-0 me-2">Sort by</p>

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
        {allItems.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={images[item.image]} // Get image by ID
                new_price={item.new_price}
                old_price={item.old_price}
                category={item.category}
              />
            );
          }
          return null; // Return null if the condition is not met
        })}
      </div>
    </div>
  );
};
