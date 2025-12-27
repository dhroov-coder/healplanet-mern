import "./Category.css";

export default function Category() {
  const categories = [
    {
      name: "Tableware",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424880/Tableware_category_lpkc9w.png",
      link: "/products/tableware",
    },
    {
      name: "Toilet Roll",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424881/Toilet_paper_category_ukhhau.png",
      link: "/products/toilet-roll",
    },
    {
      name: "Napkins",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424880/Napkins_category_o79vvf.png",
      link: "/products/napkins",
    },
    {
      name: "Tissues",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424881/Tissues_category_tc4skr.png",
      link: "/products/tissues",
    },
    {
      name: "Kitchen Towel",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1766424879/kitchentowel_category_xx54tc.png",
      link: "/products/kitchen-towel",
    },
  ];

  return (
    <div className="category-wrapper">
      <h1 className="category-title">Product Categories</h1>

      <div className="category-grid">
        {categories.map((c, index) => (
          <a key={index} href={c.link} className="category-card">
            <div className="category-img">
              <img src={c.image} alt={c.name} />
            </div>

            <div className="category-info">
              <h2>{c.name}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
