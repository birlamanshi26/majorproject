// Generating sample data
let sampleListings = [
  {
    title: "Random House by the Beach",
    description: "Beautiful house located by the beach in Calangute, Goa.",
    price: 1200,
    location: "Calangute, Goa",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Historic Heritage Mansion",
    description:
      "Step back in time with a stay in this beautifully preserved heritage mansion in Jaipur, Rajasthan.",
    price: 1800,
    location: "Jaipur, Rajasthan",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Seaside Paradise Villa",
    description:
      "Relax and unwind in this seaside villa with direct access to a private beach in Varkala, Kerala.",
    price: 2000,
    location: "Varkala, Kerala",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Mountain Chalet Getaway",
    description:
      "Experience serenity in this mountain chalet surrounded by lush greenery in Shimla, Himachal Pradesh.",
    price: 1800,
    location: "Shimla, Himachal Pradesh",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Luxury Penthouse Skyline",
    description:
      "Indulge in luxury with this penthouse offering panoramic views of the city skyline in Mumbai.",
    price: 2500,
    location: "Mumbai, Maharashtra",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1523760957528-55d1d540360d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Cozy Cottage Retreat",
    description:
      "Escape to this charming cottage nestled in the peaceful hills of Munnar, Kerala.",
    price: 1000,
    location: "Munnar, Kerala",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1508325739122-c57a76313bf4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Tranquil Lakeside Cabin",
    description:
      "Unplug and unwind in this lakeside cabin surrounded by nature in Nainital, Uttarakhand.",
    price: 1500,
    location: "Nainital, Uttarakhand",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1526435174772-187680d297a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Modern City Apartment",
    description:
      "Experience urban living in this modern and stylish apartment in Bangalore, Karnataka.",
    price: 2000,
    location: "Bangalore, Karnataka",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1546592109-f2a1f53c3304?q=80&w=1858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Rustic Farmhouse Getaway",
    description:
      "Escape to the countryside with a stay in this rustic farmhouse near Ooty, Tamil Nadu.",
    price: 1600,
    location: "Ooty, Tamil Nadu",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1571168538867-ad36fe110cc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Artistic Loft Studio",
    description:
      "Immerse yourself in creativity in this artistic loft studio in Pondicherry, India.",
    price: 1800,
    location: "Pondicherry, India",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Elegant Beachfront Resort",
    description:
      "Enjoy a luxurious beachfront experience in this elegant resort in Goa, India.",
    price: 3000,
    location: "Goa, India",
    country: "India",
    image:
      "https://plus.unsplash.com/premium_photo-1661901419930-5c28fd9e54ee?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Serene Hilltop Retreat",
    description:
      "Escape the hustle and bustle with a retreat to this peaceful hilltop haven in Matheran, Maharashtra.",
    price: 1700,
    location: "Matheran, Maharashtra",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1558574555-f50ad3eea6d3?q=80&w=1820&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Chic Riverside Bungalow",
    description:
      "Experience elegance by the river in this chic bungalow near Rishikesh, Uttarakhand.",
    price: 2200,
    location: "Rishikesh, Uttarakhand",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Historic Colonial House",
    description:
      "Step back in time with a stay in this historic colonial house in Kochi, Kerala.",
    price: 1900,
    location: "Kochi, Kerala",
    country: "India",
    image:
      "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Tranquil Tea Estate Villa",
    description:
      "Immerse yourself in nature with a stay in this villa overlooking a tea estate in Coonoor, Tamil Nadu.",
    price: 2100,
    location: "Coonoor, Tamil Nadu",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1626249893783-cc4a9f66880a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Mountain View Penthouse",
    description:
      "Enjoy stunning mountain views from this luxurious penthouse in Manali, Himachal Pradesh.",
    price: 2800,
    location: "Manali, Himachal Pradesh",
    country: "India",
    image:
      "https://plus.unsplash.com/premium_photo-1682377521697-bc598b52b08a?q=80&w=1830&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

module.exports = {data: sampleListings}