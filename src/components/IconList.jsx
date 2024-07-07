import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { icons } from 'lucide-react';
import { iconList } from '@/constants/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from 'axios';

export const BASE_URL = "https://logoexpress.tubeguruji.com";

function IconList({ selectedIcon }) {
  const storageValue = JSON.parse(localStorage.getItem('value'));
  const [openDialog, setOpenDialog] = useState(false);
  const [icon, setIcon] = useState(storageValue?.icon || '');
  const [pngIconList, setPngIconList] = useState([]);

  const Icon = ({ name, color, size, rotate }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return null;
    }
    return (
      <LucidIcon
        color={color}
        size={size}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      />
    );
  };

  const getPngIcons = () => {
    axios.get(BASE_URL + '/getIcons.php').then((resp) => setPngIconList(resp.data));
  }

  useEffect(() => {
    getPngIcons();
  }, []);

  return (
    <div>
      <div>
        <label>Icon</label>
        <div
          onClick={() => setOpenDialog(true)}
          className='p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] my-2 flex items-center justify-center'
        >
          {icon?.includes('.png') ? <img src={BASE_URL + '/png/'+ icon}/> : 
          <Icon name={icon} color={'#000'} size={20} />
          }
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-red-200 w-full">
          <DialogHeader>
            <DialogTitle>Pick Your Favourite Icon</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="icon">
            <TabsList>
              <TabsTrigger value="icon">Icons</TabsTrigger>
              <TabsTrigger value="Color-icon">Color Icons</TabsTrigger>
            </TabsList>
            <TabsContent value="icon">
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6'>
                {iconList.map((icon, index) => (
                  <div
                    className='border p-3 flex rounded-sm items-center justify-center cursor-pointer bg-white'
                    key={index}
                    onClick={() => {
                      selectedIcon(icon);
                      setOpenDialog(false);
                      setIcon(icon);
                    }}
                  >
                    <Icon name={icon} color={'#000'} size={20} />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="Color-icon">
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6'>
                {pngIconList.map((icon, index) => (
                  <div
                    className='border p-3 flex rounded-sm items-center justify-center cursor-pointer bg-white'
                    key={index}
                    onClick={() => {
                      selectedIcon(icon);
                      setOpenDialog(false);
                      setIcon(icon);
                    }}
                  >
                    <img src={BASE_URL+ "/png/"+ icon} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default IconList;
