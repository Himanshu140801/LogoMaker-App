import { UpdateStorageContext } from '@/assets/context/UpdateStorageContext';
import html2canvas from 'html2canvas';
import { icons } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';

function LogoPreview({ downloadIcon }) {
  const [storageValue, setStorageValue] = useState(null);
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('value'));
    setStorageValue(storageData);
  }, [updateStorage]);

  useEffect(() => {
    if (downloadIcon) {
      downloadPngLogo();
    }
  }, [downloadIcon]);

  const downloadPngLogo = () => {
    const downloadLogodiv = document.getElementById('downloadLogoDiv');
    html2canvas(downloadLogodiv, {
      backgroundColor: null
    }).then((canvas) => {
      const pngImage = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngImage;
      downloadLink.download = 'Himanshu logo Express.png';
      downloadLink.click();
    });
  };

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
          transform: `rotate(${rotate}deg)`
        }}
      />
    );
  };

  return (
    <div className="flex items-center justify-center h-full overflow-scroll">
      <div
        className="h-[500px] w-[500px] bg-gray-200 outline-dotted outline-gray-300"
        style={{
          padding: storageValue?.bgPadding
        }}
      >
        <div
          id="downloadLogoDiv"
          className="h-full w-full flex items-center justify-center"
          style={{
            borderRadius: storageValue?.bgRounded,
            background: storageValue?.bgColor
          }}
        >
          {storageValue?.icon?.includes('.png') ? 
          <img src={'/png/' + storageValue?.icon} style={{
            height: storageValue?.iconSize,
            width: storageValue?.iconSize,
          }} /> :
          
          <Icon
            name={storageValue?.icon}
            color={storageValue?.iconColor}
            size={storageValue?.iconSize}
            rotate={storageValue?.iconRotate}
          />
          }
        </div>
      </div>
    </div>
  );
}

export default LogoPreview;
