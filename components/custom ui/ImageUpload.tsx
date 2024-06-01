import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  const onRemoveImage = (url : any)=>{
    // console.log('url = ',url+'/destroy');
    const removeImageFromCloud = url+'/destroy'
    onRemove(url)
    
  }
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
            <Button onClick={()=> onRemoveImage(url)} size="sm" className="bg-red-1 text-white">
                <Trash className="h-4 w-4" />
            </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              key={url}
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="borcella_Shop" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button type='button' onClick={() => open()} className="bg-grey-1 text-white">
              <Plus className="h-4 w-4 mr-2" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
