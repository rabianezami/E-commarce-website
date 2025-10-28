// productsWithDescription.js
export async function getProducts() {
  const res = await fetch("/products.json");
  const productsData = await res.json();

  function generateDescription(product) {
    const { title, category, price } = product;
    const cleanTitle = title.replace(/–/g, "-").trim();

    let desc = `Introducing "${cleanTitle}" — a premium ${category} outfit carefully crafted for style and comfort.\n`;

    if (category === "women") {
      desc += `Made from soft, breathable fabrics, it ensures elegance throughout your day.\n`;
      desc += `Perfect for casual outings, office wear, or special occasions.\n`;
      desc += `Its versatile design complements accessories and footwear, making it a must-have.\n`;
    } else if (category === "men") {
      desc += `Crafted with durable, high-quality materials, combining timeless style with comfort.\n`;
      desc += `Ideal for work, social events, or casual outings.\n`;
      desc += `Classic design allows easy pairing with shoes, belts, and jackets.\n`;
    } else if (category === "kids") {
      desc += `Soft, colorful, and playful, designed for children’s comfort and active lifestyle.\n`;
      desc += `Perfect for school, playdates, or family gatherings.\n`;
      desc += `Fun patterns and bright colors make it instantly loved by kids and parents alike.\n`;
    } else {
      desc += `High-quality and stylish, suitable for anyone seeking comfort and elegance.\n`;
    }

    desc += `Available now for only ${price}. Don’t miss adding this piece to your collection!`;

    return desc;
  }

  const products = productsData.map(p => ({
    ...p,
    description: p.description || generateDescription(p),
  }));

  return products;
}
