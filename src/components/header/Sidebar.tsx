"use client"
import CategoryMenu from './CategoryMenu';
import MobileMenu from './MobileMenu';
import { useState } from 'react';
import SearchBar from './searchbar';

const Sidebar = () => {

    // tab
    const [activeTab, setActiveTab] = useState<string>('tab1');




    const handleMenuClickClose = () => {
        const sidebar = document.querySelector('.side-bar.header-two');
        if (sidebar) {
            sidebar.classList.remove('show');
        }
    };


    const handleSearchClose = () => {
        const sidebar = document.querySelector('.search-input-area');
        if (sidebar) {
            sidebar.classList.remove('show');
        }
    };



    return (
        <div>
            <div id="side-bar" className="side-bar header-two">
                <button className="close-icon-menu" onClick={handleMenuClickClose}>
                    <i className="far fa-times" />
                </button>
                
                <div className="mobile-menu-nav-area tab-nav-btn mt--20">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button
                               onClick={() => setActiveTab('tab1')}
                                                className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`}>
                                Menu
                            </button>
                            <button
                                onClick={() => setActiveTab('tab2')}
                                                className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`}>
                                Category
                            </button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        {activeTab === 'tab1' &&
                        <div>
                            {/* mobile menu area start */}
                            <div className="mobile-menu-main">
                                <MobileMenu/>
                            </div>
                            {/* mobile menu area end */}
                        </div>}
                        {activeTab === 'tab2' &&
                        <div>
                            <div className="category-btn category-hover-header menu-category">
                                <CategoryMenu/>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                {/* button area wrapper start */}
                <div className="button-area-main-wrapper-menuy-sidebar mt--50">
                    <div className="contact-area">
                        <div className="phone">
                            <i className="fa-light fa-headset" />
                            <a href="tel:+1 (347) 261-0362">+1 (347) 261-0362</a>
                        </div>
                        <div className="phone">
                            <i className="fa-light fa-envelope" />
                            <a href="mailto:info@darkhorse-ny.com">info@darkhorse-ny.com</a>
                        </div>
                    </div>
                    {/* <div className="buton-area-bottom">
                        <a href="/login" className="rts-btn btn-primary">
                            Sign In
                        </a>
                        <a href="/register" className="rts-btn btn-primary">
                            Sign Up
                        </a>
                    </div> */}
                </div>
                {/* button area wrapper end */}
            </div>
            <div className="search-input-area">
                <div className="container">
                    <div className="search-input-inner">
                    <SearchBar />
                    </div>
                </div>
                <div id="close" className="search-close-icon" onClick={handleSearchClose}>
                    <i className="far fa-times" />
                </div>
            </div>

        </div>
    )
}

export default Sidebar