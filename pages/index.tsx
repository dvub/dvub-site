import type { NextPage } from 'next'
import Navbar from '../components/navbar'
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
