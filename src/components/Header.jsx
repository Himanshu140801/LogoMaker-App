import { Button } from './ui/button'
import { Download } from 'lucide-react'

function Header({DownloadIcon}) {
  return (
    <div className='p-4 shadow-sm border flex justify-between items-center'>
      <img src='./logo.png' className='w-[200px]' />
      <Button className = "text-white flex gap-2 items-center rounded-2xl "  onClick={()=>DownloadIcon(Date.now)}> 
      <Download className='h-4 w-4' /> Download </Button>
    </div>
  )
}

export default Header
