import type { NextPage } from 'next'
import Navbar from '../components/navbar'

// todo:
// add syntax highlighting to mdx - DONE
// use head to add titles to pages other than posts
// create a global header component with website title, navbar, etc.

const Home: NextPage = () => {

  return (
    <div>
      <h1>Name</h1>
      <Navbar></Navbar>
      <div style={{textAlign: 'center'}}>
        <h1>Welcome To My Website!</h1>
        <p>
        more stuff will show up later
        </p>
      </div>
    </div>
  );
}

export default Home
