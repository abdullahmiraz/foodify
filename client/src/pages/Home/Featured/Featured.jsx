import featuredImg from "../../../assets/home/featured.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./Featured.css";

const Featured = () => {
  return (
    <>
      <SectionTitle
        subHeading="Check This Out!"
        heading="Featured Item"
      ></SectionTitle>
      <div className="featured-item relative overflow-hidden bg-fixed bg-slate-500 bg-opacity-60 text-white pt-8 my-20">
        <div className="md:flex without-blur justify-center items-center pb-20 pt-12 px-36">
          <div className="featured-image-container  ">
            <img className="featured-image" src={featuredImg} alt="" />
          </div>
          <div className="md:ml-10">
            <p>Aug 20, 2029</p>
            <p className="uppercase">Where can I get some?</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              expedita hic dolorem, iusto vel suscipit nam excepturi debitis
              magnam nostrum! Ut eum dignissimos culpa doloremque eligendi
              consectetur blanditiis laboriosam fugiat ea quia similique quam
              nisi reprehenderit numquam magnam nemo vitae cupiditate, atque
              maiores dicta minus pariatur. Perspiciatis nobis vero quas?
            </p>
            <button className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-600 text-white">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
