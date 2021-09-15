import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import DefaultLayout from "./layouts/DefaultLayout.js";
import '../styles/style.scss'

export default function AllPostsByAuthor() {
  const [allPostsbyAuthorData, setAllPostsByAuthor] = useState(null);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "post" && author._ref in *[_type=="author" && name=="Stella Biliou"]._id] {
            title,
            slug,
            publishedAt,
            mainImage {
                asset->{
                    _id,
                    url
                }
            }
        }`
			)
			.then((data) => setAllPostsByAuthor(data))
			.catch(console.error);
	}, []);

	function formatDate(computerDate) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const date = new Date(computerDate).toLocaleDateString("sv-SE", options);

		return date;
	}

	return (
		<DefaultLayout>
			<div className="post-grid">
				<div className="post-grid-child-container">
					{
						allPostsbyAuthorData &&
						allPostsbyAuthorData.map((post, index) => (
							<div className="blog-post-card">
								<Link to={"/" + post.slug.current} key={post.slug.current}>
									<span key={index}>
										<img src={post.mainImage.asset.url} alt="" />
										<span>
											<h2>{post.title}</h2>
										</span>
									</span>
									<span className="date">{formatDate(post.publishedAt)}</span>
								</Link>
							</div>
						))}
				</div>
			</div>
		</DefaultLayout>
  );
}