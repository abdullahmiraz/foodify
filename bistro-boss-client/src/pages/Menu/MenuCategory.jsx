import { Link } from "react-router-dom";
import Cover from "../Shared/Cover/Cover";
import MenuItem from "../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img, subTitle }) => {
  return (
    <div className="pt-8">
      {title && <Cover img={img} title={title} subTitle={subTitle}></Cover>}
      <div className="grid md:grid-cols-2 gap-10 my-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="  text-center my-8  ">
        <Link to={`/order/${title}`}>
          <button className="btn mx-auto btn-outline mt-4">Order Now</button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
