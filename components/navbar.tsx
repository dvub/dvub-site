import Link from 'next/link'

const Navbar = () => {

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', paddingRight: '50%'}}>

            <Link href='../'>Main Page</Link>
            <Link href='../posts'>Posts</Link>
            <Link href='../about'>About</Link>
            <Link href='https://github.com/dvub'>My Projects</Link>
        </div>
    ); 

}
export default Navbar