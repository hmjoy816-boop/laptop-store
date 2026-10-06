// Demo product data + shared helpers. Images: free photos from Unsplash.
const img = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600'><rect width='100%' height='100%' fill='#eee'/><text x='50%' y='50%' text-anchor='middle' fill='#999' font-family='Arial' font-size='32'>Laptop Image</text></svg>");

const PRODUCTS = [
  {id:1,name:"AeroBook Pro 14",category:"Ultrabook",price:1499,image:img("photo-1517336714731-489689fd1ca8"),
   desc:"A slim, powerful ultrabook for people who work anywhere. All-day battery and a stunning display.",
   specs:{Processor:"Core i7 13th Gen",RAM:"16 GB",Storage:"512 GB SSD",Display:"14\" 2.8K OLED",Battery:"Up to 18 hours",Weight:"1.3 kg"}},
  {id:2,name:"Titan X Gaming 17",category:"Gaming",price:1899,image:img("photo-1603302576837-37561b2e2302"),
   desc:"Desktop-class performance with a high refresh display and advanced cooling for long gaming sessions.",
   specs:{Processor:"Ryzen 9",RAM:"32 GB",Storage:"1 TB NVMe SSD",Display:"17\" 165Hz QHD",Graphics:"RTX 4070",Weight:"2.5 kg"}},
  {id:3,name:"WorkMate Business 15",category:"Business",price:999,image:img("photo-1496181133206-80ce9b88a853"),
   desc:"Reliable and secure, built for office teams. Fingerprint reader and a spill-resistant keyboard.",
   specs:{Processor:"Core i5 13th Gen",RAM:"16 GB",Storage:"512 GB SSD",Display:"15.6\" Full HD",Security:"Fingerprint + TPM",Weight:"1.7 kg"}},
  {id:4,name:"Student Lite 14",category:"Student",price:549,image:img("photo-1593642632823-8f785ba67e45"),
   desc:"An affordable everyday laptop for classes, research and streaming.",
   specs:{Processor:"Ryzen 5",RAM:"8 GB",Storage:"256 GB SSD",Display:"14\" Full HD",Battery:"Up to 10 hours",Weight:"1.5 kg"}},
  {id:5,name:"Creator Studio 16",category:"Ultrabook",price:1699,image:img("photo-1525547719571-a2d4ac8945e2"),
   desc:"Color-accurate display and strong graphics for designers, editors and developers.",
   specs:{Processor:"Core i9",RAM:"32 GB",Storage:"1 TB SSD",Display:"16\" 4K",Graphics:"RTX 4060",Weight:"1.9 kg"}},
  {id:6,name:"Phantom G15",category:"Gaming",price:1299,image:img("photo-1588872657578-7efd1f1555ed"),
   desc:"Great value gaming with a fast display and RGB keyboard.",
   specs:{Processor:"Ryzen 7",RAM:"16 GB",Storage:"512 GB SSD",Display:"15.6\" 144Hz",Graphics:"RTX 4050",Weight:"2.2 kg"}},
  {id:7,name:"OfficePro Slim 13",category:"Business",price:1149,image:img("photo-1541807084-5c52b6b3adef"),
   desc:"Ultra-portable business laptop with a premium aluminium body.",
   specs:{Processor:"Core i7",RAM:"16 GB",Storage:"512 GB SSD",Display:"13.3\" QHD",Security:"Fingerprint",Weight:"1.1 kg"}},
  {id:8,name:"CodeBook Dev 15",category:"Student",price:799,image:img("photo-1498050108023-c5249f4df085"),
   desc:"Comfortable keyboard and plenty of memory for learning to code.",
   specs:{Processor:"Ryzen 7",RAM:"16 GB",Storage:"512 GB SSD",Display:"15.6\" Full HD",Battery:"Up to 12 hours",Weight:"1.6 kg"}}
];
const CATEGORIES = ["Gaming","Business","Ultrabook","Student"];
const money = n => "$" + n.toLocaleString();

function cardHTML(p){
  return `<a class="card" href="product.html?id=${p.id}">
    <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK">
    <div class="info"><small>${p.category}</small><h3>${p.name}</h3><div class="price">${money(p.price)}</div></div></a>`;
}

// Shared header + footer (edit once, updates every page)
function renderLayout(active){
  const links = [["index.html","Home","home"],["products.html","Laptops","products"],["product.html?id=1","Featured Laptop","product"]];
  document.getElementById("header").innerHTML = `<header><div class="container nav">
    <a class="logo" href="index.html">LAPTOPIA</a>
    <nav><ul>${links.map(l=>`<li><a href="${l[0]}" class="${l[2]===active?"active":""}">${l[1]}</a></li>`).join("")}</ul></nav>
  </div></header>`;
  document.getElementById("footer").innerHTML = `<footer><div class="container"><b>LAPTOPIA</b> &mdash; Quality laptops, honest prices.<br>&copy; ${new Date().getFullYear()} Laptopia. Demo website.</div></footer>`;
}
