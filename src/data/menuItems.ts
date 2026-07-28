import { MenuItem } from '../types';

export const demoMenuItems: MenuItem[] = [
  // ============ r1: Kebapçı Mehmet Usta ============
  { id: 'm1', restaurantId: 'r1', name: 'Adana Kebap', description: 'Acılı el kıyması, közlenmiş domates ve biber ile', price: 85, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Kebaplar', isAvailable: true },
  { id: 'm2', restaurantId: 'r1', name: 'İskender', description: 'Tereyağlı domates soslu, yoğurtlu İskender', price: 95, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Kebaplar', isAvailable: true },
  { id: 'm3', restaurantId: 'r1', name: 'Patlıcan Kebap', description: 'Közlenmiş patlıcan üzerinde dana kuşbaşı', price: 80, image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80', category: 'Kebaplar', isAvailable: true },
  { id: 'm4', restaurantId: 'r1', name: 'Urfa Kebap', description: 'Acısız el kıyması kebap, lavaş ekmek ile', price: 80, image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80', category: 'Kebaplar', isAvailable: true },
  { id: 'm5', restaurantId: 'r1', name: 'Lahmacun', description: 'İnce hamur, bol kıymalı Gaziantep lahmacunu', price: 35, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Hamur İşleri', isAvailable: true },
  { id: 'm6', restaurantId: 'r1', name: 'Mercimek Çorbası', description: 'Geleneksel kırmızı mercimek çorbası', price: 25, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Çorbalar', isAvailable: true },
  { id: 'm7', restaurantId: 'r1', name: 'Ayran', description: 'Taze yayık ayran', price: 15, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80', category: 'İçecekler', isAvailable: true },
  { id: 'm8', restaurantId: 'r1', name: 'Künefe', description: 'Hatay usulü peynirli künefe, kaymak ile', price: 55, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Tatlılar', isAvailable: true },

  // ============ r2: Pizza Roma ============
  { id: 'm9', restaurantId: 'r2', name: 'Margherita', description: 'Domates sos, mozzarella, fesleğen', price: 75, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pizzalar', isAvailable: true },
  { id: 'm10', restaurantId: 'r2', name: 'Karışık Pizza', description: 'Sucuk, sosis, mantar, biber, mısır, zeytin', price: 95, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80', category: 'Pizzalar', isAvailable: true },
  { id: 'm11', restaurantId: 'r2', name: 'Pepperoni', description: 'Bol pepperoni, mozzarella, domates sos', price: 85, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pizzalar', isAvailable: true },
  { id: 'm12', restaurantId: 'r2', name: 'Quattro Formaggi', description: 'Dört peynirli: mozzarella, parmesan, gorgonzola, ricotta', price: 90, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pizzalar', isAvailable: true },
  { id: 'm13', restaurantId: 'r2', name: 'Caesar Salata', description: 'Marul, parmesan, kruton, Caesar sos', price: 45, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Salatalar', isAvailable: true },
  { id: 'm14', restaurantId: 'r2', name: 'Tiramisu', description: 'İtalyan usulü mascarpone tiramisu', price: 50, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Tatlılar', isAvailable: true },
  { id: 'm15', restaurantId: 'r2', name: 'Cola', description: 'Coca Cola 330ml', price: 20, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80', category: 'İçecekler', isAvailable: true },

  // ============ r3: Burger House ============
  { id: 'm16', restaurantId: 'r3', name: 'Classic Burger', description: '180gr dana köfte, cheddar, marul, domates, turşu', price: 75, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', category: 'Burgerler', isAvailable: true },
  { id: 'm17', restaurantId: 'r3', name: 'Double Smash', description: 'İki kat smash patty, özel sos, karamelize soğan', price: 95, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', category: 'Burgerler', isAvailable: true },
  { id: 'm18', restaurantId: 'r3', name: 'Chicken Burger', description: 'Çıtır tavuk, coleslaw, ranch sos', price: 70, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', category: 'Burgerler', isAvailable: true },
  { id: 'm19', restaurantId: 'r3', name: 'Patates Kızartması', description: 'Çıtır dış, yumuşak iç. Özel baharat karışımı ile', price: 30, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Yan Lezzetler', isAvailable: true },
  { id: 'm20', restaurantId: 'r3', name: 'Soğan Halkası', description: 'Çıtır soğan halkaları, BBQ sos ile', price: 35, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Yan Lezzetler', isAvailable: true },
  { id: 'm21', restaurantId: 'r3', name: 'Milkshake', description: 'Çikolatalı milkshake', price: 35, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'İçecekler', isAvailable: true },

  // ============ r4: Sushi Master ============
  { id: 'm22', restaurantId: 'r4', name: 'Salmon Nigiri (6 adet)', description: 'Taze somon, sushi pirinci üzerinde', price: 75, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Nigiri', isAvailable: true },
  { id: 'm23', restaurantId: 'r4', name: 'California Roll (8 adet)', description: 'Yengeç, avokado, salatalık, susamlı', price: 65, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Maki', isAvailable: true },
  { id: 'm24', restaurantId: 'r4', name: 'Dragon Roll (8 adet)', description: 'Tempura karides, avokado, yılan balığı sosu', price: 95, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Özel Roller', isAvailable: true },
  { id: 'm25', restaurantId: 'r4', name: 'Sashimi Tabağı', description: 'Somon, ton, hamachi - 12 dilim', price: 120, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Sashimi', isAvailable: true },
  { id: 'm26', restaurantId: 'r4', name: 'Edamame', description: 'Tuzlu haşlanmış soya fasulyesi', price: 30, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Başlangıçlar', isAvailable: true },
  { id: 'm27', restaurantId: 'r4', name: 'Miso Çorbası', description: 'Geleneksel Japon miso çorbası, tofu ile', price: 25, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Çorbalar', isAvailable: true },
  { id: 'm28', restaurantId: 'r4', name: 'Matcha Latte', description: 'Japon matcha tozu, süt ile', price: 35, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'İçecekler', isAvailable: true },

  // ============ r5: Tatlıcı Hasan ============
  { id: 'm29', restaurantId: 'r5', name: 'Baklava (6 dilim)', description: 'Antep fıstıklı, bol şerbetli baklava', price: 65, image: 'https://images.unsplash.com/photo-1563805042-7684c8e9e1cb?w=800&q=80', category: 'Tatlılar', isAvailable: true },
  { id: 'm30', restaurantId: 'r5', name: 'Künefe', description: 'Tel kadayıf, özel peynir, Antep fıstığı ile', price: 55, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Tatlılar', isAvailable: true },
  { id: 'm31', restaurantId: 'r5', name: 'Kazandibi', description: 'Karamelli muhallebi, geleneksel tarif', price: 35, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Sütlü Tatlılar', isAvailable: true },
  { id: 'm32', restaurantId: 'r5', name: 'Sütlaç', description: 'Fırın sütlacı, tarçınlı', price: 30, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Sütlü Tatlılar', isAvailable: true },
  { id: 'm33', restaurantId: 'r5', name: 'Tavuk Göğsü', description: 'Geleneksel tavuk göğsü tatlısı', price: 35, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Sütlü Tatlılar', isAvailable: true },
  { id: 'm34', restaurantId: 'r5', name: 'Türk Kahvesi', description: 'Geleneksel pişirilmiş Türk kahvesi', price: 20, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'İçecekler', isAvailable: true },

  // ============ r6: Cafe Mocha ============
  { id: 'm35', restaurantId: 'r6', name: 'Latte', description: 'Espresso ve buharla ısıtılmış süt', price: 40, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Kahveler', isAvailable: true },
  { id: 'm36', restaurantId: 'r6', name: 'Cappuccino', description: 'Espresso, süt köpüğü, kakao tozu', price: 38, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Kahveler', isAvailable: true },
  { id: 'm37', restaurantId: 'r6', name: 'Mocha', description: 'Espresso, çikolata, süt, krema', price: 45, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Kahveler', isAvailable: true },
  { id: 'm38', restaurantId: 'r6', name: 'Cheesecake', description: 'New York usulü frambuaz soslu cheesecake', price: 55, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pastalar', isAvailable: true },
  { id: 'm39', restaurantId: 'r6', name: 'Brownie', description: 'Sıcak çikolatalı brownie, dondurma ile', price: 45, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pastalar', isAvailable: true },
  { id: 'm40', restaurantId: 'r6', name: 'Tost', description: 'Kaşarlı, domatesli tost', price: 35, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Atıştırmalıklar', isAvailable: true },

  // ============ r7: Balıkçı Ergun ============
  { id: 'm41', restaurantId: 'r7', name: 'Levrek Izgara', description: 'Taze levrek, ızgara sebzeler ile', price: 110, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Balıklar', isAvailable: true },
  { id: 'm42', restaurantId: 'r7', name: 'Çipura Buğulama', description: 'Çipura, sebze, limon sosu ile buğulama', price: 105, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Balıklar', isAvailable: true },
  { id: 'm43', restaurantId: 'r7', name: 'Karides Güveç', description: 'Karides, domates, biber, kaşar peyniri', price: 95, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Deniz Ürünleri', isAvailable: true },
  { id: 'm44', restaurantId: 'r7', name: 'Kalamar Tava', description: 'Çıtır kalamar, tarator sos ile', price: 75, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Deniz Ürünleri', isAvailable: true },
  { id: 'm45', restaurantId: 'r7', name: 'Meze Tabağı', description: 'Humus, haydari, acılı ezme, babaganuş', price: 60, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Mezeler', isAvailable: true },
  { id: 'm46', restaurantId: 'r7', name: 'Rakı (35cl)', description: 'Yeni Rakı', price: 85, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'İçecekler', isAvailable: true },

  // ============ r8: Salata Bahçesi ============
  { id: 'm47', restaurantId: 'r8', name: 'Akdeniz Salata', description: 'Roka, avokado, nar, ceviz, nar ekşili sos', price: 55, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Salatalar', isAvailable: true },
  { id: 'm48', restaurantId: 'r8', name: 'Protein Bowl', description: 'Kinoa, ızgara tavuk, avokado, edamame', price: 65, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Bowllar', isAvailable: true },
  { id: 'm49', restaurantId: 'r8', name: 'Detox Smoothie', description: 'Ispanak, elma, zencefil, limon', price: 35, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'İçecekler', isAvailable: true },
  { id: 'm50', restaurantId: 'r8', name: 'Wrap', description: 'Tam buğday lavaş, ızgara tavuk, sebze', price: 50, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Wraplar', isAvailable: true },

  // ============ r9: Tavukçu Ali ============
  { id: 'm51', restaurantId: 'r9', name: 'Çıtır Tavuk Menü', description: '6 parça çıtır tavuk, patates, içecek', price: 75, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Menüler', isAvailable: true },
  { id: 'm52', restaurantId: 'r9', name: 'Izgara Tavuk', description: 'Baharatlı ızgara tavuk göğüs, pilav ile', price: 65, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Izgaralar', isAvailable: true },
  { id: 'm53', restaurantId: 'r9', name: 'Tavuk Kanat', description: '10 adet acı soslu tavuk kanat', price: 60, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Kanatlar', isAvailable: true },
  { id: 'm54', restaurantId: 'r9', name: 'Tavuk Şiş', description: 'Marine edilmiş tavuk şiş, sebzeli', price: 55, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Izgaralar', isAvailable: true },

  // ============ r10: Waffle House İstanbul ============
  { id: 'm55', restaurantId: 'r10', name: 'Belçika Waffle', description: 'Çikolata sos, muz, dondurma ile', price: 55, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Waffle', isAvailable: true },
  { id: 'm56', restaurantId: 'r10', name: 'Serpme Kahvaltı', description: 'Peynir, zeytin, yumurta, reçel, tereyağı, bal', price: 120, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Kahvaltı', isAvailable: true },
  { id: 'm57', restaurantId: 'r10', name: 'Krep', description: 'Nutella, muz, çilek, krema ile krep', price: 45, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Krep', isAvailable: true },
  { id: 'm58', restaurantId: 'r10', name: 'Menemen', description: 'Domates, biber, yumurta, kaşar ile menemen', price: 40, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Kahvaltı', isAvailable: true },

  // ============ r11: Lahmacun Ustası ============
  { id: 'm59', restaurantId: 'r11', name: 'Lahmacun', description: 'İnce hamur, bol kıymalı lahmacun (adet)', price: 30, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Lahmacun', isAvailable: true },
  { id: 'm60', restaurantId: 'r11', name: 'Kuşbaşılı Pide', description: 'Dana kuşbaşı, kaşar peyniri ile pide', price: 85, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pideler', isAvailable: true },
  { id: 'm61', restaurantId: 'r11', name: 'Kaşarlı Pide', description: 'Bol kaşar peynirli pide', price: 60, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pideler', isAvailable: true },
  { id: 'm62', restaurantId: 'r11', name: 'Karışık Pide', description: 'Kuşbaşı, kaşar, mantar, biber ile', price: 90, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pideler', isAvailable: true },

  // ============ r12: Dragon Wok ============
  { id: 'm63', restaurantId: 'r12', name: 'Tavuklu Noodle', description: 'Wok tavuk, sebze, soya sosu, noodle', price: 65, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Noodle', isAvailable: true },
  { id: 'm64', restaurantId: 'r12', name: 'Karides Wok', description: 'Karides, sebze, teriyaki sos ile wok', price: 85, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Wok', isAvailable: true },
  { id: 'm65', restaurantId: 'r12', name: 'Dim Sum (6 adet)', description: 'Buharda pişirilmiş dim sum, soya sosu', price: 55, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Başlangıçlar', isAvailable: true },
  { id: 'm66', restaurantId: 'r12', name: 'Spring Roll (4 adet)', description: 'Sebzeli çıtır spring roll', price: 40, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Başlangıçlar', isAvailable: true },

  // ============ r13: Pide Sarayı ============
  { id: 'm67', restaurantId: 'r13', name: 'Sucuklu Pide', description: 'Sucuk, kaşar peyniri, yumurta ile pide', price: 75, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pideler', isAvailable: true },
  { id: 'm68', restaurantId: 'r13', name: 'Karadeniz Pidesi', description: 'Tereyağlı kuşbaşı et, kaşar peyniri', price: 90, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pideler', isAvailable: true },
  { id: 'm69', restaurantId: 'r13', name: 'Kıymalı Pide', description: 'Kıyma, domates, biber, soğan', price: 70, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pideler', isAvailable: true },
  { id: 'm70', restaurantId: 'r13', name: 'Peynirli Pide', description: 'Üç çeşit peynirli pide', price: 65, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Pideler', isAvailable: true },

  // ============ r14: Dondurma Dünyası ============
  { id: 'm71', restaurantId: 'r14', name: 'Maraş Dondurma (2 top)', description: 'Geleneksel Maraş usulü, sakızlı', price: 35, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Dondurma', isAvailable: true },
  { id: 'm72', restaurantId: 'r14', name: 'Gelato (3 top)', description: 'İtalyan gelato, çeşitli aromalarda', price: 45, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Dondurma', isAvailable: true },
  { id: 'm73', restaurantId: 'r14', name: 'Waffle Dondurma', description: 'Waffle üzerinde 3 top dondurma, çikolata sos', price: 60, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Özel', isAvailable: true },
  { id: 'm74', restaurantId: 'r14', name: 'Frozen Yogurt', description: 'Meyveli frozen yogurt, granola ile', price: 40, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Dondurma', isAvailable: true },

  // ============ r15: Lezzet Durağı ============
  { id: 'm75', restaurantId: 'r15', name: 'Kuru Fasulye', description: 'Geleneksel kuru fasulye, pilav ile', price: 45, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Ana Yemekler', isAvailable: true },
  { id: 'm76', restaurantId: 'r15', name: 'Karnıyarık', description: 'Patlıcan, kıyma, domates sosu', price: 50, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Ana Yemekler', isAvailable: true },
  { id: 'm77', restaurantId: 'r15', name: 'İmam Bayıldı', description: 'Zeytinyağlı imam bayıldı', price: 40, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Zeytinyağlılar', isAvailable: true },
  { id: 'm78', restaurantId: 'r15', name: 'Mantı', description: 'El yapımı Kayseri mantısı, yoğurt ve sos ile', price: 60, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Ana Yemekler', isAvailable: true },
  { id: 'm79', restaurantId: 'r15', name: 'Ezogelin Çorbası', description: 'Geleneksel Ezogelin çorbası', price: 25, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'Çorbalar', isAvailable: true },
  { id: 'm80', restaurantId: 'r15', name: 'Komposto', description: 'Karışık meyve kompostosu', price: 15, image: 'https://images.unsplash.com/photo-1546069901-ba6ba6183a27?w=800&q=80', category: 'İçecekler', isAvailable: true },
];

export const getMenuItemsByRestaurant = (restaurantId: string): MenuItem[] => {
  return demoMenuItems.filter((item) => item.restaurantId === restaurantId);
};

export const getMenuCategories = (restaurantId: string): string[] => {
  const items = getMenuItemsByRestaurant(restaurantId);
  return [...new Set(items.map((item) => item.category))];
};
