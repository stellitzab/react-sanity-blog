import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import DefaultLayout from "./layouts/DefaultLayout.js";
import { Link } from "react-router-dom";
import '../styles/style.scss';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function AboutPage() {
  const [authorData, setAboutData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="author"]{
          name,
          bio,
          image{
          asset->{
            _id,
            url
            }
          }
        }`
      )
      .then((data) => setAboutData(data))
      .catch(console.error);
  }, []); 

  if(!authorData) return <div> hi hi </div>

    return (
        <DefaultLayout>
            <div className="about-page">
                <h2> Om oss </h2>
                <ul>
                    <li>
                        <p>2012 - Vi båda köpte en Nikon D7000 + Tokina 11-16 mm objektiv.</p>
                    </li>
                    <li>
                        <p>2017 - Vi träffades för första gången när vi började i samma klass på Civilingenjörsprogrammet i interaktion och design. </p>
                    </li>
                    <li>
                        <p>2019 - Vi ansökte om utbytesstudier med förstahandsvalet National Taiwan University tillsammans med Matilda och Martin. </p>
                    </li>
                    <li>
                        <p>2020 - Vi fick glädjande besked om att fyra alla var antagna till NTU. Men så kom coronapandemin och eftersom framtiden var oviss erbjöd Umeå universitet oss alternativet att skjuta upp utbytet ett år. Vi nappade på det erbjudandet och ställde in siktet på att åka hösten 2021. </p>
                    </li>
                    <li>
                        <p>2021 - Allt såg lovande ut fram till att Taiwan fick ett coronautbrott i maj. Det kom ett besked tidigt i augusti om att utbytesterminen skulle ske på distans / var inställd. I slutet på augusti nås vi båda av nyheten om att vi fått ett stipendium som ger oss tillstånd att resa in i landet även under stränga coronarestriktioner.</p>
                    </li>
                </ul>
                {authorData &&
                    authorData.map((author, index) => (
                        <div className="dudu">
                            <Link to={"/about/" + author.name} key={author.name}>
                                <span key={index}>
                                    <img src={urlFor(author.image.asset).width(400).url()} alt="" />
                                    <span>
                                        <span className="author">{author.name}</span>
                                    </span>
                                </span>
                            </Link>
                        </div>
                    ))}
            </div>
        </DefaultLayout>
    );
}