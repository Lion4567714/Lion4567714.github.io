import { useState } from 'react'
import './Home.css'
import headshot from './assets/nature-headshot.jpg'
import usa from './assets/usa.svg'
import washington from './assets/washington.svg'
import montana from './assets/montana.svg'
import indiana from './assets/indiana.svg'
import star from './assets/star.svg'
import star_half from './assets/star-half.svg'
import star_full from './assets/star-full.svg'

interface Project {
    name: string,
    link?: string,
    desc?: string
}

function ProjectMenu() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuWidth, setMenuWidth] = useState(100)
    const [sProject, setSProject] = useState<Project>({name: ""})   // Selected Project

    const toggleMenu = (project: Project) => {
        if (!menuOpen) {
            setMenuOpen(true)
            setMenuWidth(40)
            setSProject(project)
        } else if (menuOpen && project.name != sProject.name) {
            setSProject(project)
        } else {
            setSProject({name: ""})
            setMenuOpen(false)
            setMenuWidth(100)
        }
    }

    function ProjectCard(project: Project) {
        return (
            <button 
                className={ project.name == sProject.name ? "project-card selected" : "project-card" }
                onClick={(_) => {toggleMenu(project)}} 
            >
                <h3>{project.name}</h3>
            </button>
        )
    }

    return (
        <div id="project-menu">
            <div id="project-selector" style={{width: `${menuWidth}%`}}>
                <div className="project-row">
                    <ProjectCard 
                        name="Discord Bot"
                        desc="This was part of an idea to add a little spice to my friends' Discord server. My bot can read messages, log them, and react via preprogrammed responses and the OpenAI API."
                        link="https://github.com/Lion4567714/lion_bot"/>
                    <ProjectCard 
                        name="OhMyPosh Theme"
                        desc="To customize my linux terminal a little bit, I created my own OhMyPosh terminal theme. The theme is available for anyone to use via OhMyPosh and my public GitHub repository."
                        link="https://github.com/Lion4567714/lions_posh"/>
                    <ProjectCard 
                        name="Mental Health App"
                        desc="Since I couldn't hold myself to keeping a paper journal, I decided to write a little mobile journaling app for myself. My focus was to make something very quick and easy to use to minimize the hassle of reviewing my day. More development work is required before I can fully make this project public."/>
                </div>
                <div className="project-row">
                    <ProjectCard 
                        name="Terrain Generator"
                        desc="A procedural terrain generation simulation built as part of my final project for computer graphics class. It can generate completely random terrain and adapt to user-specified terrain constraints."
                        link="https://github.com/Lion4567714/prodecural_terrain_generation"/>
                    <ProjectCard 
                        name="This Website" 
                        desc="This is my latest project. It's still a work in progress. Right now, I'm focusing on the content of the website. I plan to address the issue of different screen sizes later."
                        link="https://github.com/Lion4567714/Lion4567714.github.io"/>
                </div>
            </div>
            <div id="project-info">
                <div id="project-info-header">{sProject.name}</div>
                <div id="project-info-content">
                    <p>$ cat "{sProject.name}".txt</p>
                    <p>{sProject.desc}</p>
                    { sProject.desc == "" ? <br/> : <></> }
                    <p>Project link:&nbsp;
                        {sProject.link 
                         ? <a href={sProject.link} target="_blank">{sProject.link}</a>
                         : "this project is currently not publicly available."}
                    </p>
                    <span style={{display: "flex"}}>
                        <p>$&nbsp;</p>
                        <p className="blink">_</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

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
            <section id="projects">
                <h2 className="section-title">some of my projects</h2>
                <p className="section-subtitle">click a project to learn more</p>
                <ProjectMenu/>
            </section>
            <section id="travel">
                <h2>places that i've been</h2>
                <img id="usa" src={usa}/>
                <div className="review-row">
                    <StateReview image={washington} rating={9} comment={"Great state."}/>
                    <StateReview image={montana} rating={8} comment={"Good state."}/>
                    <StateReview image={indiana} rating={6} comment={"Meh state."}/>
                </div>
            </section>
        </>
    )
}

export default Home