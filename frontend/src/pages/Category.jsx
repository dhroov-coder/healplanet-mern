import "./Category.css";

export default function Category() {
  const categories = [
    {
      name: "Tableware",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1767792297/Tableware_category_1_uqulkt.png",
      link: "/products/tableware",
    },
    {
      name: "Toilet Roll",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1767792297/Toilet_paper_category_1_lhtcth.png",
      link: "/products/toilet-roll",
    },
    {
      name: "Napkins",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1767792297/Napkins_category_1_h6l1m8.png",
      link: "/products/napkins",
    },
    {
      name: "Tissues",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1767792298/Tissues_category_1_tucz0g.png",
      link: "/products/tissues",
    },
    {
      name: "Kitchen Towel",
      image: "https://res.cloudinary.com/duroecr2t/image/upload/v1767792297/kitchentowel_category_1_gf95yi.png",
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
