const fs = require('fs');
const path = require('path');

const imgMap = {
  'kebap': '1603360946369-dc9bb6258143',
  'pizza': '1513104890138-7c749659a591',
  'burger': '1568901346375-23c9450c58cd',
  'sushi': '1579871494447-9811cf80d66c',
  'tatli': '1563805042-7684c8e9e1cb',
  'baklava': '1563805042-7684c8e9e1cb',
  'salad': '1512621776951-a57141f2eefd',
  'coffee': '1497935586351-b67a49e012bf',
  'balik': '1615141982883-c7ad0e69fd62',
  'fish': '1615141982883-c7ad0e69fd62',
  'seafood': '1615141982883-c7ad0e69fd62',
  'doner': '1603360946369-dc9bb6258143',
  'ayran': '1544145945-f90425340c7e',
  'cola': '1622483767028-3f66f32aef97',
  'drink': '1544145945-f90425340c7e',
  'default': '1546069901-ba6ba6183a27' // generic food
};

function getUrl(seed) {
  let matchedId = imgMap['default'];
  for (const [key, val] of Object.entries(imgMap)) {
    if (seed.toLowerCase().includes(key)) {
      matchedId = val;
      break;
    }
  }
  return `https://images.unsplash.com/photo-${matchedId}?w=800&q=80`;
}

const files = [
  path.join(__dirname, 'src/data/restaurants.ts'),
  path.join(__dirname, 'src/data/menuItems.ts'),
  path.join(__dirname, 'src/data/orders.ts')
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace https://picsum.photos/seed/{seed}/{width}/{height}
    content = content.replace(/https:\/\/picsum\.photos\/seed\/([^\/]+)\/\d+\/\d+/g, (match, seed) => {
      return getUrl(seed);
    });

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
