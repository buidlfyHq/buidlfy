import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className='flex flex-row min-h-screen'>
      <div className='fixed left-0 top-0 z-0 w-[250px] border-r bg-blue-300 h-full'>sidebar</div>
      <div className='flex-1'>
        <div className='fixed left-[250px] h-[60px] w-full top-0 bg-green-500'>navbar</div>
        <div className='fixed ml-[250px] bg-yellow-500'>main</div>
      </div>
    </div>
  )
}

export default Home
