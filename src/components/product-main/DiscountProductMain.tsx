"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from "@/components/header/CartContext";
import { useWishlist } from "@/components/header/WishlistContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BlogGridMainProps {
    Slug: string;
    ProductImage: string;
    ProductTitle?: string;
    Price?: string;
}

const BlogGridMain: React.FC<BlogGridMainProps> = ({
    Slug,
    ProductImage,
    ProductTitle,
    Price,
}) => {
    const [added, setAdded] = useState(false);

    const { addToCart } = useCart();

    const handleAdd = () => {
        addToCart({
            id: Date.now(),
            image: `/assets/images/grocery/${ProductImage}`,
            title: ProductTitle ?? 'Default Product Title',
            price: parseFloat(Price ?? '0'),
            quantity: 1,
            active: true,
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 5000); // reset after 2 seconds
    };

    const { addToWishlist } = useWishlist();
    const handleWishlist = () => {
        addToWishlist({
            id: Date.now(),
            image: `/assets/images/grocery/${ProductImage}`,
            title: ProductTitle ?? 'Default Product Title',
            price: parseFloat(Price ?? '0'),
            quantity: 1,
        });
    };

    useEffect(() => {
        const handleQuantityClick = (e: Event) => {
            const button = e.currentTarget as HTMLElement;
            const parent = button.closest('.quantity-edit') as HTMLElement | null;
            if (!parent) return;

            const input = parent.querySelector('.input') as HTMLInputElement | null;
            const addToCart = parent.querySelector('a.add-to-cart') as HTMLElement | null;
            if (!input) return;

            let oldValue = parseInt(input.value || '1', 10);
            let newVal = oldValue;

            if (button.classList.contains('plus')) {
                newVal = oldValue + 1;
            } else if (button.classList.contains('minus')) {
                newVal = oldValue > 1 ? oldValue - 1 : 1;
            }

            input.value = newVal.toString();
            if (addToCart) {
                addToCart.setAttribute('data-quantity', newVal.toString());
            }
        };

        const buttons = document.querySelectorAll('.quantity-edit .button');

        buttons.forEach(button => {
            button.removeEventListener('click', handleQuantityClick);
            button.addEventListener('click', handleQuantityClick);
        });

        return () => {
            buttons.forEach(button => {
                button.removeEventListener('click', handleQuantityClick);
            });
        };
    }, []);


    // tostify
    const compare = () => toast('Successfully Add To Compare !');
    const addcart = () => toast('Successfully Add To Cart !');

    return (
        <>
            <a href={`/shop/${Slug}`} className="thumbnail-preview">
                <div className="badge">
                    <span>25% <br />Off</span>
                    <i className="fa-solid fa-bookmark" />
                </div>
                <img src={`/assets/images/grocery/${ProductImage}`} alt="grocery" />
            </a>
            <div className="body-content">
                <a href={`/shop/${Slug}`}>
                    <h4 className="title">{ProductTitle ?? 'How to growing your business'}</h4>
                </a>
                <span className="availability">500g Pack</span>
                <div className="price-area">
                    <span className="current">{`$${Price}`}</span>
                    <div className="previous">$36.00</div>
                </div>
                <div className="cart-counter-action">
                    <div className="quantity-edit">
                        <input type="text" className="input" defaultValue={1} />
                        <div className="button-wrapper-action">
                            <button className="button minus">
                                <i className="fa-regular fa-chevron-down" />
                            </button>
                            <button className="button plus">
                                +<i className="fa-regular fa-chevron-up" />
                            </button>
                        </div>
                    </div>
                    <a
                        href="#"
                        className="rts-btn btn-primary radious-sm with-icon add-to-cart"
                        onClick={e => {
                            e.preventDefault();
                            handleAdd();
                            addcart();
                        }}
                    >
                        <div className="btn-text">{added ? 'Added' : 'Add'}</div>
                        <div className="arrow-icon">
                            <i className={`fa-regular ${added ? 'fa-check' : 'fa-cart-shopping'}`} />
                        </div>
                        <div className="arrow-icon">
                            <i className={`fa-regular ${added ? 'fa-check' : 'fa-cart-shopping'}`} />
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
};

export default BlogGridMain;
