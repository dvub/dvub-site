import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap';

const About = () => {
  const imgSize = 64;

  return (

    <div>
      <h1 className='animate'>About</h1>
      <div style={{ margin: '1rem' }}>
        <div className='animate' style={{ animationDelay: '0.125s', maxWidth: '100%' }}>
          <h2>
            Overview
          </h2>
          <p>
            My name is <b>dvub</b>. I am a student currently studying computer science. I build some projects for school, but most of the time I build projects for fun. (like this website) <b>Coding is one of my passions</b>; I not only see it as a hobby, but as a way to make change in the world.
          </p>
          <hr />
        </div>
        <div className='animate' style={{ animationDelay: '0.25s', maxWidth: '100%' }}>
          <h2>
            Background
          </h2>
          <p>
            For most of my life, I was interested in technology. I always messed around with old hardware and was fascinated by it. When I was younger I discovered Scratch, a simple, block-based programming language. I loved to build games and projects of different sorts, and was fascinated and amazed by what people could do with such a tool. I then started really programming because I wanted to write mods for the popular game, Terraria. From there, my passion for programming sparked, and now I hope to be a professional developer someday.
          </p>
          <hr />
        </div>
        <div className='animate' style={{ animationDelay: '0.375s', maxWidth: '100%' }}>
          <h2>Skills</h2>
          <div style={{ float: 'right', display: 'flex'}}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg" width={imgSize} height={imgSize} alt={''} />
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width={imgSize} height={imgSize} alt={''} />
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" width={imgSize} height={imgSize} alt={''} />
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width={imgSize} height={imgSize} alt={''} />
          </div>
          <p>
            I have about 2 years of Javascript and C# experience, and am currently learning TypeScript and Rust. I have about 1 year of full stack web development experience, using tools like Expressjs, Nextjs, React, etc. I have some experience with SQL databases as well.
          </p>
          <hr />
        </div>
        <div className='animate' style={{ animationDelay: '0.5s', maxWidth: '100%' }}>
          <h2>Goals</h2>
          Currently, my goal is to get through school and go to a good university. (and get through that, too) From there, I hope to find a job as a developer of some sort, maybe for we development, or for something else. I want to keep building projects and code as a hobby throughout this as well. In terms of development, I would like to work on more back-end projects. I would like to improve my webdev skills as well. I would like to learn more about Rust and build more projects with it. I would also like to learn other low-level languages, such as C++, at some point.
          <b>Above all, I want to learn more everyday and improve my skills, and myself overall.</b>
          <hr />
        </div>
        <div className='animate' style={{ animationDelay: '0.625s', maxWidth: '100%' }}>
          <h2>Other Passions</h2>
          <p>
            Other than programming, I have many other hobbies and passions. I love to play video games and play, as well as listen to music! I&apos;ve played piano and guitar for a good portion of my life, and I absolutely love music and need it in my life. I quite like to play jazz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About