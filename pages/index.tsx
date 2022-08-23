import type { NextPage } from 'next'
import CustomNavBar from '../components/navbar'

// todo:
// add syntax highlighting to mdx - DONE
// use head to add titles to pages other than posts
// create a global header component with website title, navbar, etc.

const Home: NextPage = () => {

  return (
    <div>
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
