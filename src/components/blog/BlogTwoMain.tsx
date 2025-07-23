"use client"
import React from 'react';
import Link from 'next/link';

interface BlogGridMainProps {
    Slug: string;
    blogImage: string;
    blogTitle?: string;
}

const BlogGridMain: React.FC<BlogGridMainProps> = ({
    Slug,
    blogImage,
    blogTitle,
}) => {
    return (
        <>

            <a href={`/blog/${Slug}`} className="thumbnail">
                <img src={`assets/images/blog/${blogImage}`} alt="blog-area" />
            </a>
            <div className="blog-body">
                <div className="top-area">
                    <div className="single-meta">
                        <i className="fa-light fa-clock" />
                        <span>15 Sep, 2023</span>
                    </div>
                    <div className="single-meta">
                        <i className="fa-regular fa-folder" />
                        <span>Modern Fashion</span>
                    </div>
                </div>
                <a href={`/blog/${Slug}`}>
                    <h4 className="title">
                        {blogTitle ? blogTitle : 'How to growing your business'}
                    </h4>
                </a>
                <a href={`/blog/${Slug}`} className="shop-now-goshop-btn">
                    <span className="text">Read Details</span>
                    <div className="plus-icon">
                        <i className="fa-sharp fa-regular fa-plus" />
                    </div>
                    <div className="plus-icon">
                        <i className="fa-sharp fa-regular fa-plus" />
                    </div>
                </a>
            </div>

        </>
    );
};

export default BlogGridMain;
