import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SideNav from './components/SideNav'
import IconController from './components/IconController'
import BackgroundController from './components/BackgroundController'
import LogoPreview from './components/LogoPreview'
import { UpdateStorageContext } from './assets/context/UpdateStorageContext'

function App() {
  const [selectedIndex,setSelectedIndex] = useState();
  const [updateStorage,setUpdateStorage] = useState({});
  const [downloadIcon,setDownloadIcon]=useState();
  return (
    <UpdateStorageContext.Provider value={{updateStorage,setUpdateStorage}}>
    <div className='w-full'>
      <Header DownloadIcon={setDownloadIcon}/>
      <div className='w-64 fixed'>
        <SideNav selectedIndex={(value)=>setSelectedIndex(value)} />
      </div>
      <div className='ml-64 grid grid-cols-1 md:grid-cols-6 fixed'>
        < div className='md:col-span-2 border h-screen shadow-sm p-5 overflow-auto'>
        {selectedIndex==0?
        <IconController/>:
        <BackgroundController/>
        }
        </div>
        <div className='md:col-span-3'>
          <LogoPreview downloadIcon={downloadIcon}/>
        
        </div>
        <div className='bg-black my-auto h-full '>
          <p className='text-3xl text-white p-4 font-bold hover:text-green-400 cursor-pointer '>MADE BY HIMANSHU SHARMA.</p>
        
        </div>
      </div>
      
    </div>
    </UpdateStorageContext.Provider>
  )
}

export default App
