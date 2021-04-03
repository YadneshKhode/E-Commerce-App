import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-buttom/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
const CartDropDown = ({ cartItems, history, dispatch }) => {
  function handleChange() {
    const header = document.querySelector(".header");
    const logoContainer = document.querySelector(".logo-container");
    const menuBtn = document.querySelector(".menu-btn");
    const options = document.querySelector(".options");
    const html = document.querySelector("html");
    const menuBtnBurger = document.querySelector(".menu-btn__burger");
    header.classList.toggle("active");
    logoContainer.classList.toggle("active");
    menuBtn.classList.toggle("active");
    menuBtn.classList.toggle("open");
    options.classList.toggle("active");
    menuBtnBurger.classList.toggle("active");
    html.classList.toggle("noscroll");
  }
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          handleChange();
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};
// const mapStateToProps = (state) => ({
//   cartItems : selectCartItems(state)
// });
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// const mapDispatchToProps = (dispatch) => ({
//   toggleCartHidden: () => dispatch(toggleCartHidden()),
// });

export default withRouter(connect(mapStateToProps)(CartDropDown));
