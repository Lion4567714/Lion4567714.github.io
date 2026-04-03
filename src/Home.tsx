import './Home.css'
import headshot from './assets/nature-headshot.jpg'
import usa from './assets/usa.svg'
import washington from './assets/washington.svg'
import montana from './assets/montana.svg'
import indiana from './assets/indiana.svg'
import star from './assets/star.svg'
import star_half from './assets/star-half.svg'
import star_full from './assets/star-full.svg'

function StateReview({ image, rating, comment }: { image: string, rating: number, comment: string }) {
    const numFullStars = Math.floor(rating / 2);
    const numHalfStars = rating % 2;
    const numEmptyStars = 5 - numFullStars - numHalfStars;

    console.log(numFullStars, numHalfStars, numEmptyStars)

    return (
        <div className="review-card">
            <img src={image} className="state"/>
            <div>
                { [...Array(numFullStars)].map((_, i) => <img src={star_full} key={i} className="star"/>) }
                { [...Array(numHalfStars)].map((_, i) => <img src={star_half} key={numFullStars + i} className="star"/>) }
                { [...Array(numEmptyStars)].map((_, i) => <img src={star} key={numFullStars + numHalfStars + i} className="star"/>) }
            </div>
            <p>{comment}</p>
        </div>
    )
}

function Home() {
    return (
        <>
            <section className="horizontal-flex">
                <img id="headshot" src={headshot}/>
                <div id="headshot-text" className="vertical-flex">
                    <h1>Hey! I'm Anders.</h1>
                    <p>I'm a System Engineer that works with pharma and biotech data storage solutions.</p>
                    <p>While I love dabbling with my tech and creating&nbsp;
                        <span className="tooltip-text">projects
                            <span className="tooltip">Such as this website!</span>
                        </span>
                        &nbsp;for myself, I also enjoy bicycling, home improvement, googling various topics...and I possess a certain proclivity for vocabulary and geography.
                    </p>
                </div>
            </section>
            <section id="travel">
                <h2>places that i've been</h2>
                <img id="usa" src={usa}/>
                <div className="review-row">
                    <StateReview image={washington} rating={9} comment={"Great state."}/>
                    <StateReview image={montana} rating={8} comment={"Good state."}/>
                    <StateReview image={indiana} rating={6} comment={"Bad state."}/>
                </div>
            </section>
        </>
    )
}

export default Home