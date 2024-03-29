const MenuItem = ({ item }) => {
  const { name, image, price, recipe } = item;
  return (
    <div className="flex justify-between   space-x-2">
      <div className="flex">
        <img
          style={{ borderRadius: "5px" }}
          className="w-[120px] h-[100px] object-cover"
          src={image}
          alt=""
        />
        <div className="p-2">
          <h3 className="uppercase font-bold">{name} </h3>
          <p>{recipe}</p>
        </div>
      </div>
      <p className="text-white p-2 rounded-md h-min font-bold end-0 bg-slate-600  ">${price}</p>
    </div>
  );
};

export default MenuItem;
