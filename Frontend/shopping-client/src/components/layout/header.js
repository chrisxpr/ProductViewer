import { useContext, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { shoppingConfig } from '../../shoppingConfig';
import { Store } from '../../store/provider';
import { Link } from 'react-router-dom';
import { changeCountryAction } from '../../store/actions/cart';
import { cartItemCount } from '../../helper/cartHelper';

function Header() {
  const { state, dispatch } = useContext(Store);
  const { cartItems, countryList, countryInfo } = state;
  const [mobileMenuHidden, setMobileMenuHidden] = useState(true);

  const itemCount = useMemo(() => cartItemCount(cartItems), [cartItems]);

  const toggleMobileMenu = (e) => {
    setMobileMenuHidden(!mobileMenuHidden);
    if (e) e.stopPropagation();
  };

  useEffect(() => {
    const hideMenuIfVisible = () => {
      if (!mobileMenuHidden) {
        setMobileMenuHidden(true);
      }
    };

    window.addEventListener('click', hideMenuIfVisible);

    return () => {
      window.removeEventListener('click', hideMenuIfVisible);
    };
  }, [mobileMenuHidden]);

  const TopRightNavLink = ({ link, title }) => {
    return (
      <>
        <Link to={link} className="py-2 px-4 text-black">
          {title}
        </Link>
      </>
    );
  };

  const TopRightMenuLinks = () => {
    return (
      <>
        <TopRightNavLink link="/" title="Product List" />
        {itemCount === 0 ? (
          <>Cart Empty</>
        ) : (
          <>
            <TopRightNavLink link="/cart" title="Go to basket" />
            <div>Items [{itemCount}]</div>
          </>
        )}
      </>
    );
  };

  const countryHandler = (e) => {
    if (e && e.target && e.target.value) {
      console.log('country changed to:' + e.target.value);
      changeCountryAction(e.target.value, dispatch);
    }
  };

  return (
    <>
      <nav className="border-b-2 border-gray-100">
        <div className="mx-auto px-10">
          <div className="flex justify-between">
            {/* 
            LHS 
            */}
            <div className="flex space-x-4">
              <div>
                <Link
                  to="/"
                  className="flex items-center py-5 text-gray-700 hover:text-gray-900"
                >
                  <span className="font-bold">{shoppingConfig.siteName}</span>
                </Link>
              </div>

              {countryList && countryList.length > 0 && (
                <>
                  <div>
                    <div className="flex items-center px-4 py-5 text-gray-700">
                      Choose country:
                    </div>
                  </div>
                  <div>
                    <div className="flex items-left py-5 text-gray-700">
                      <select
                        defaultValue={countryInfo.countryCode}
                        className=" block
                        w-full
                        px-3
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="quantity"
                        onChange={countryHandler}
                      >
                        {countryList.map((item) => (
                          <option
                            key={item.countryCode}
                            value={item.countryCode}
                          >
                            {item.countryCode}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 
            RHS 
            */}
            <div className="hidden md:flex items-center space-x-1">
              <TopRightMenuLinks />
            </div>
            {/* Responsive menu toggle icon */}
            <div className="md:hidden flex items-center">
              <button
                className="mobile-menu-button"
                onClick={(e) => toggleMobileMenu(e)}
              >
                <FontAwesomeIcon icon={faBars} size="lg" />
              </button>
            </div>
          </div>
        </div>
        {!mobileMenuHidden && (
          <div className="mobile-menu md:hidden px-5">
            <>
              <Link
                to="/"
                className="block py-2 px-6 text-sm hover:bg-gray-200"
              >
                Product List
              </Link>
              <Link
                to="/cart"
                className="block py-2 px-6 text-sm hover:bg-gray-200"
              >
                Shopping Cart
              </Link>
            </>
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
