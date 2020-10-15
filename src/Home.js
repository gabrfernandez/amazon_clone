import React from 'react'
import "./Home.css";
import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=""
                />

                <div className="home__row">
                    <Product
                        id="12321341"
                        title="Cracking the Coding Interview Paperback"
                        price={12.99}
                        rating={5}
                        image="https://miro.medium.com/max/476/1*P7pTGa-PMfCq1VWuNJioig.png"
                    />
                    <Product
                        id="49538094"
                        title="Apple 13-inch MacBook Pro(2019)"
                        price={1099.99}
                        rating={4}
                        image="https://zdnet3.cbsistatic.com/hub/i/r/2019/08/05/b2e40423-7c4c-48b5-9c7a-ea7ee92f96fe/thumbnail/770x433/c0942922b4c437cffdac1b9d2b0fd7e6/13-inch-mbpro-header.jpg"
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="4903850"
                        title="Beats by Dr.Dre Studio3 Wireless Over-Ear Headphones"
                        price={299.99}
                        rating={4}
                        image="https://www.adorama.com/images/Large/btmx422lla.jpg"
                    />
                    <Product
                        id="23445930"
                        title="Apple iPhone 128GB Purple"
                        price={649.99}
                        rating={5}
                        image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-purple-select-2019?wid=834&hei=1000&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1566960958082"
                    />
                    <Product
                        id="3254354345"
                        title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                        price={598.99}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="90829332"
                        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                        price={1094.98}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;