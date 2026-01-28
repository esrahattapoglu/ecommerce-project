import { Link } from 'react-router-dom';

const ProductCard = ({ image, title = "Graphic Design", department = "English Department", oldPrice = "16.48", newPrice = "6.48" }) => {
  return (
    <Link to="/product/1" className="flex flex-col group cursor-pointer">
      
      {/*ürünn görseli*/}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/*ürün bilgileri*/}
      <div className="flex flex-col items-center gap-2 pt-6 pb-8 px-4">
        
     
        <h3 className="text-[#252B42] font-bold text-base">
          {title}
        </h3>
        
     
        <p className="text-[#737373] font-bold text-sm">
          {department}
        </p>

     
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#BDBDBD] font-bold text-base line-through">
            ${oldPrice}
          </span>
          <span className="text-[#23856D] font-bold text-base">
            ${newPrice}
          </span>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;