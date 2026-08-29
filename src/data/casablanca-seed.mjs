export const CASABLANCA_RESTAURANTS = [
  {
    source_key: 'casablanca-dar-dada',
    name: 'Dar Dada',
    address: '31 Rue El Arsa, Casablanca 20250, Morocco',
    phone: '+212 6 61 60 26 02',
    cuisine_types: ['moroccan','mediterranean','fusion'],
    atmosphere_tags: ['romantic','cozy','historic','upscale','family'],
    service_modes: ['dine_in'],
    service_tags: ['reservations','live_music','vegetarian_options'],
    price_level: 3,
    rating: 4.1,
    review_count: 2912,
    opening_hours: { mon:'12:00-15:30,19:00-01:00', tue:'12:00-15:30,19:00-01:00', wed:'12:00-15:30,19:00-01:00', thu:'12:00-15:30,19:00-01:00', fri:'12:00-15:30,19:00-01:00', sat:'12:00-15:30,19:00-01:00', sun:'closed' },
    source_url: 'https://dardada.com/menus/',
    data_confidence: 'verified',
    dishes: [
      dish('dar-dada-kefta-tajine','Tajine de viande hachée aux œufs',120,['beef','eggs'],['meat','tajine'],['savory'],['eggs'],'https://dardada.com/menus/'),
      dish('dar-dada-lamb-prunes','Tajine d’agneau aux pruneaux, abricots & amandes',190,['lamb','prunes','apricots','almonds'],['lamb','tajine'],['sweet_savory','rich'],['tree_nuts'],'https://dardada.com/menus/'),
      dish('dar-dada-beef-shank','Tajine de jarret de bœuf aux légumes de saison',180,['beef','vegetables'],['beef','tajine'],['savory'],[],'https://dardada.com/menus/'),
      dish('dar-dada-chicken-mcharmel','Tajine de poulet m’charmel',160,['chicken','preserved_lemon','olives'],['chicken','tajine'],['savory','citrus'],[],'https://dardada.com/menus/'),
      dish('dar-dada-veg-couscous','Couscous aux légumes & tfaya',100,['vegetables','semolina','onion'],['couscous','vegetables'],['sweet_savory'],['gluten'],'https://dardada.com/menus/',null,['vegetarian']),
      dish('dar-dada-veg-tajine','Tajine berbère de légumes',110,['vegetables'],['tajine','vegetables'],['savory'],[],'https://dardada.com/menus/',null,['vegetarian','vegan'])
    ]
  },
  {
    source_key: 'casablanca-la-sqala',
    name: 'La Sqala',
    address: 'Boulevard des Almohades, Casablanca 20250, Morocco',
    phone: '+212 5 22 26 09 60',
    cuisine_types: ['moroccan'],
    atmosphere_tags: ['historic','quiet','romantic','outdoor','family'],
    service_modes: ['dine_in','takeaway'],
    service_tags: ['breakfast','brunch','vegetarian_options','vegan_options'],
    price_level: 2,
    rating: 4.2,
    review_count: 11036,
    opening_hours: { daily:'08:00-22:30' },
    source_url: 'https://sqala.ma/wp-content/uploads/2025/04/cartecomplete2025.pdf',
    data_confidence: 'verified',
    dishes: [
      dish('sqala-breakfast','F’tor Sqala',95,['eggs','khlii','jben','moroccan_pancakes','fruit'],['breakfast','moroccan'],['savory','sweet_savory'],['eggs','milk','gluten'],'https://sqala.ma/wp-content/uploads/2025/04/cartecomplete2025.pdf'),
      dish('sqala-beef-shank','Tagine de jarret de bœuf à l’abricot',160,['beef','apricot'],['beef','tajine'],['sweet_savory'],[],'https://sqala.ma/wp-content/uploads/2025/04/cartecomplete2025.pdf'),
      dish('sqala-chicken-lemon','Tagine de poulet au citron confit',175,['chicken','preserved_lemon'],['chicken','tajine'],['citrus','savory'],[],'https://sqala.ma/wp-content/uploads/2025/04/cartecomplete2025.pdf'),
      dish('sqala-fish-tajine','Tagine de poisson',140,['fish','potato','pepper','tomato','olives'],['fish','tajine'],['savory'],['fish'],'https://sqala.ma/wp-content/uploads/2025/04/cartecomplete2025.pdf'),
      dish('sqala-lamb-tajine','Tagine d’agneau',160,['lamb','peas','seasonal_vegetables'],['lamb','tajine'],['savory'],[],'https://sqala.ma/wp-content/uploads/2025/04/cartecomplete2025.pdf'),
      dish('sqala-veg-tajine','Tagine de légumes de saison',65,['vegetables','spices'],['tajine','vegetables'],['savory'],[],'https://sqala.ma/wp-content/uploads/2025/04/cartecomplete2025.pdf',null,['vegetarian','vegan']),
      dish('sqala-friday-couscous','Couscous aux sept légumes, tfaya',145,['semolina','vegetables','onion'],['couscous','vegetables'],['sweet_savory'],['gluten'],'https://sqala.ma/wp-content/uploads/2025/04/cartecomplete2025.pdf')
    ]
  },
  {
    source_key: 'casablanca-organic-kitchen',
    name: 'Organic Kitchen',
    address: '6-8 Rue Ahmed El Mokri, Casablanca 20000, Morocco',
    phone: '+212 5 22 94 37 75',
    cuisine_types: ['healthy','international','fusion','mediterranean'],
    atmosphere_tags: ['casual','quiet','romantic','trendy','family'],
    service_modes: ['dine_in','delivery','takeaway'],
    service_tags: ['healthy_options','organic','vegan_options','vegetarian_options','kids_menu'],
    price_level: 2,
    rating: 4.6,
    review_count: 1313,
    opening_hours: { mon:'10:00-22:30', tue:'10:00-22:30', wed:'10:00-22:30', thu:'10:00-22:30', fri:'10:00-22:30', sat:'10:00-22:30', sun:'10:00-17:00' },
    source_url: 'https://organickitchen.ma/menu/',
    data_confidence: 'verified',
    dishes: [
      dish('organic-avocado-toast','Avocado Toast',85,['rye_bread','avocado','tomato','onion','egg'],['breakfast','toast','healthy'],['fresh'],['eggs','gluten'],'https://organickitchen.ma/menu/',null,['vegetarian']),
      dish('organic-shakshuka','Shakshuka Mexicana',115,['pepper','tomato','red_beans','egg','avocado'],['breakfast','healthy'],['spicy','fresh'],['eggs'],'https://organickitchen.ma/menu/',null,['vegetarian','gluten_free'],2),
      dish('organic-buddha-bowl','Buddha Bowl',125,['quinoa','spinach','chicken','avocado','beet_hummus','green_beans'],['bowl','chicken','healthy'],['fresh','savory'],[],'https://organickitchen.ma/menu/'),
      dish('organic-salmon-tartare','Salmon Tartare',155,['salmon','avocado','mango','onion','nori','sesame_oil'],['salmon','fish','healthy'],['fresh','umami'],['fish','sesame'],'https://organickitchen.ma/menu/'),
      dish('organic-super-veggie','Super Veggie Bowl',155,['quinoa','avocado','broccoli','mushroom','spinach','lentils'],['vegetables','healthy','bowl'],['fresh','savory'],[],'https://organickitchen.ma/menu/',null,['vegetarian']),
      dish('organic-yummy-chicken','Yummy Diet Chicken',185,['chicken','brown_rice','broccoli','salad','tomato','cucumber','onion'],['chicken','healthy'],['grilled','fresh'],[],'https://organickitchen.ma/menu/'),
      dish('organic-pokai-chicken','Pokai Bowl Chicken',185,['brown_rice','kimchi','avocado','carrot','cucumber','mango','peanuts','coconut_milk','teriyaki','chicken'],['chicken','bowl'],['sweet_savory','umami'],['peanuts','soy'],'https://organickitchen.ma/menu/')
    ]
  },
  {
    source_key: 'casablanca-clay-oven',
    name: 'Clay Oven Casablanca',
    address: '245 Boulevard Ghandi, Casablanca 20000, Morocco',
    phone: '+212 6 61 26 58 34',
    cuisine_types: ['indian'],
    atmosphere_tags: ['cozy','romantic','family'],
    service_modes: ['dine_in','delivery','takeaway'],
    service_tags: ['vegetarian_options','vegan_options','live_music'],
    price_level: 2,
    rating: 4.2,
    review_count: 177,
    opening_hours: { daily:'12:00-23:00' },
    source_url: 'https://clayoven.ma/menu',
    data_confidence: 'verified',
    dishes: [
      dish('clay-malai-broccoli','Malai Broccoli',80,['broccoli','cream','indian_spices'],['vegetables','indian'],['grilled','creamy'],['milk'],'https://clayoven.ma/menu','https://clayoven.ma/assets/media/menu/MALAI-BROCCOLI.jpg',['vegetarian'],1),
      dish('clay-tandoori-prawn','Tandoori Prawn',120,['prawns','tandoori_masala','mint','coriander'],['seafood','indian'],['grilled','smoky','spicy'],['shellfish'],'https://clayoven.ma/menu','https://clayoven.ma/assets/media/menu/TANDOORI-PRAWN.jpg',[],2),
      dish('clay-chicken-tikka','Chicken Tikka',95,['chicken','yogurt','indian_spices'],['chicken','indian'],['grilled','smoky'],['milk'],'https://clayoven.ma/menu','https://clayoven.ma/assets/media/menu/CHICKEN-TIKKA.jpg',[],2),
      dish('clay-chicken-tikka-masala','Chicken Tikka Masala',95,['chicken','tomato','onion','cream','indian_spices'],['chicken','indian'],['creamy','spicy'],['milk'],'https://clayoven.ma/menu','https://clayoven.ma/assets/media/menu/CHICKEN-TIKKA-MASALA.jpg',[],2),
      dish('clay-butter-chicken','Butter Chicken',95,['chicken','tomato','cream','butter','indian_spices'],['chicken','indian'],['creamy','rich'],['milk'],'https://clayoven.ma/menu','https://clayoven.ma/assets/media/menu/BUTTER-CHICKEN.jpg',[],1),
      dish('clay-chicken-biryani','Chicken Dum Biryani',130,['chicken','basmati_rice','indian_spices','onion'],['chicken','rice','indian'],['savory','spicy'],[],'https://clayoven.ma/menu','https://clayoven.ma/assets/media/menu/CHICKEN-DUM-BIRYANI.jpg',[],2),
      dish('clay-dal-tadka','Dal Tadka',80,['yellow_lentils','garlic','cumin','mustard','ghee'],['lentils','indian','vegetables'],['savory'],['milk'],'https://clayoven.ma/menu','https://clayoven.ma/assets/media/menu/DAL-TADKA.jpg',['vegetarian'],1)
    ]
  },
  {
    source_key: 'casablanca-pestana-madeira',
    name: 'Madeira Restaurant - Pestana Casablanca',
    address: 'Anfa Place Living Resort, Boulevard de la Corniche, Casablanca 20200, Morocco',
    phone: '+212 5 22 79 57 00',
    cuisine_types: ['international','moroccan','pizza'],
    atmosphere_tags: ['casual','seaside','family'],
    service_modes: ['dine_in'],
    service_tags: ['hotel_restaurant'],
    price_level: 2,
    rating: null,
    review_count: null,
    opening_hours: {},
    source_url: 'https://www.pestana.com/content/dam/pestana/en_us/destinations/morocco/casablanca/pestana-casablanca/documents/pestana-casablanca-restaurant-menu-pestana-casablanca.pdf',
    data_confidence: 'verified',
    dishes: [
      dish('pestana-veg-tajine','Vegetable Tagine',75,['vegetables'],['tajine','vegetables'],['savory'],[],'https://www.pestana.com/content/dam/pestana/en_us/destinations/morocco/casablanca/pestana-casablanca/documents/pestana-casablanca-restaurant-menu-pestana-casablanca.pdf',null,['vegetarian']),
      dish('pestana-chicken-tajine','Chicken Tagine with Lemon',120,['chicken','lemon'],['chicken','tajine'],['citrus','savory'],[],'https://www.pestana.com/content/dam/pestana/en_us/destinations/morocco/casablanca/pestana-casablanca/documents/pestana-casablanca-restaurant-menu-pestana-casablanca.pdf'),
      dish('pestana-beef-tajine','Beef Tagine',140,['beef'],['beef','tajine'],['savory'],[],'https://www.pestana.com/content/dam/pestana/en_us/destinations/morocco/casablanca/pestana-casablanca/documents/pestana-casablanca-restaurant-menu-pestana-casablanca.pdf'),
      dish('pestana-burger','Pestana Burger',130,['beef','bread'],['burger','beef'],['savory'],['gluten'],'https://www.pestana.com/content/dam/pestana/en_us/destinations/morocco/casablanca/pestana-casablanca/documents/pestana-casablanca-restaurant-menu-pestana-casablanca.pdf'),
      dish('pestana-margarita-pizza','Margarita Pizza',80,['pizza_dough','tomato','cheese'],['pizza'],['savory'],['gluten','milk'],'https://www.pestana.com/content/dam/pestana/en_us/destinations/morocco/casablanca/pestana-casablanca/documents/pestana-casablanca-restaurant-menu-pestana-casablanca.pdf',null,['vegetarian']),
      dish('pestana-fish-day','Fish of the Day',165,['fish'],['fish','seafood'],['savory'],['fish'],'https://www.pestana.com/content/dam/pestana/en_us/destinations/morocco/casablanca/pestana-casablanca/documents/pestana-casablanca-restaurant-menu-pestana-casablanca.pdf')
    ]
  },
  partialRestaurant('casablanca-ricks-cafe',"Rick's Café",'Place du jardin public, 248 Bd Sour Jdid, Casablanca 20250, Morocco','+212 5 22 27 42 07',['international','mediterranean','moroccan'],['romantic','historic','upscale','live_music'],3,4.2,6215,{ lunch:'12:00-15:00', dinner:'18:30-00:30' },'https://www.rickscafe.ma/'),
  partialRestaurant('casablanca-cabestan','Cabestan Ocean View',"90 Boulevard de la Corniche, Phare d'El Hank, Casablanca 20000, Morocco",'+212 5 22 39 11 90',['seafood','mediterranean','french'],['romantic','ocean_view','upscale','lively'],4,3.8,1906,{ daily:'12:00-03:00' },'https://www.le-cabestan.com/'),
  partialRestaurant('casablanca-dar-el-kaid','Restaurant Dar El Kaid','Rue Mohamed El Alaoui, Casablanca 20000, Morocco','+212 6 62 86 19 99',['moroccan'],['romantic','historic','rooftop','live_music'],3,4.3,1032,{ daily:'08:30-00:00' },'https://www.darelkaid.ma/'),
  partialRestaurant('casablanca-nkoa','NKOA','11 Abou Kacem Chabi, Casablanca 20060, Morocco','+212 7 76 53 88 45',['international','fusion'],['romantic','quiet','trendy','rooftop'],2,4.5,532,{ daily:'12:00-15:30' },null),
  partialRestaurant('casablanca-blend','Blend Gourmet Burger','9 Rue Théophile Gauthier, Casablanca 20100, Morocco','+212 6 64 59 97 99',['burger','american','contemporary'],['casual','trendy'],2,4.4,950,{ daily:'12:00-23:00' },'https://www.tripadvisor.com/Restaurant_Review-g293732-d4787260-Reviews-Blend_Gourmet_Burger-Casablanca_Casablanca_Settat.html'),
  partialRestaurant('casablanca-bondi','Bondi Coffee Kitchen','31 Rue Sebou, Casablanca 20600, Morocco','+212 6 51 68 77 07',['healthy','international','cafe'],['casual','quiet','family'],1,4.4,209,{ daily:'09:00-21:00' },'https://bondicoffeekitchen.com/')
];

function dish(source_key, name, price, ingredients, food_tags, flavor_tags, allergens, source_url, photo_url = null, dietary_tags = [], spicy_level = null) {
  return {
    source_key, name, price, main_ingredients: ingredients,
    food_tags, flavor_tags, allergens: Array.isArray(allergens) ? allergens : [],
    dietary_tags, spicy_level, source_url, photo_url,
    image_confidence: photo_url ? 'verified' : 'unknown',
    data_confidence: 'verified'
  };
}

function partialRestaurant(source_key, name, address, phone, cuisine_types, atmosphere_tags, price_level, rating, review_count, opening_hours, source_url) {
  return {
    source_key, name, address, phone, cuisine_types, atmosphere_tags,
    service_modes: ['dine_in'], service_tags: [], price_level, rating,
    review_count, opening_hours, source_url, data_confidence: 'partial', dishes: []
  };
}

export async function seedCasablancaRestaurants(client) {
  let restaurantCount = 0;
  let dishCount = 0;

  for (const restaurant of CASABLANCA_RESTAURANTS) {
    const { rows } = await client.query(
      `INSERT INTO restaurants (
         source_key, name, address, cuisine_types, phone, rating, atmosphere_tags,
         opening_hours, active, last_verified_at, service_modes, service_tags,
         price_level, review_count, source_url, data_confidence, city
       ) VALUES (
         $1,$2,$3,$4,$5,$6,$7,$8::jsonb,TRUE,NOW(),$9,$10,$11,$12,$13,$14,'Casablanca'
       )
       ON CONFLICT (source_key) WHERE source_key IS NOT NULL
       DO UPDATE SET
         name=EXCLUDED.name, address=EXCLUDED.address, cuisine_types=EXCLUDED.cuisine_types,
         phone=EXCLUDED.phone, rating=EXCLUDED.rating, atmosphere_tags=EXCLUDED.atmosphere_tags,
         opening_hours=EXCLUDED.opening_hours, service_modes=EXCLUDED.service_modes,
         service_tags=EXCLUDED.service_tags, price_level=EXCLUDED.price_level,
         review_count=EXCLUDED.review_count, source_url=EXCLUDED.source_url,
         data_confidence=EXCLUDED.data_confidence, last_verified_at=NOW(), updated_at=NOW()
       RETURNING id`,
      [
        restaurant.source_key, restaurant.name, restaurant.address,
        restaurant.cuisine_types || [], restaurant.phone || null, restaurant.rating,
        restaurant.atmosphere_tags || [], JSON.stringify(restaurant.opening_hours || {}),
        restaurant.service_modes || [], restaurant.service_tags || [],
        restaurant.price_level || null, restaurant.review_count || null,
        restaurant.source_url || null, restaurant.data_confidence || 'partial'
      ]
    );

    const restaurantId = rows[0].id;
    restaurantCount += 1;

    for (const item of restaurant.dishes || []) {
      await client.query(
        `INSERT INTO dishes (
           restaurant_id, source_key, name, description, price, photo_url,
           main_ingredients, food_tags, flavor_tags, allergens, dietary_tags,
           spicy_level, available, data_confidence, image_confidence, source_url,
           last_verified_at
         ) VALUES (
           $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,TRUE,$13,$14,$15,NOW()
         )
         ON CONFLICT (source_key) WHERE source_key IS NOT NULL
         DO UPDATE SET
           restaurant_id=EXCLUDED.restaurant_id, name=EXCLUDED.name,
           description=EXCLUDED.description, price=EXCLUDED.price,
           photo_url=EXCLUDED.photo_url, main_ingredients=EXCLUDED.main_ingredients,
           food_tags=EXCLUDED.food_tags, flavor_tags=EXCLUDED.flavor_tags,
           allergens=EXCLUDED.allergens, dietary_tags=EXCLUDED.dietary_tags,
           spicy_level=EXCLUDED.spicy_level, available=TRUE,
           data_confidence=EXCLUDED.data_confidence,
           image_confidence=EXCLUDED.image_confidence,
           source_url=EXCLUDED.source_url, last_verified_at=NOW(), updated_at=NOW()`,
        [
          restaurantId, item.source_key, item.name, item.description || null,
          item.price, item.photo_url || null, item.main_ingredients || [],
          item.food_tags || [], item.flavor_tags || [], item.allergens || [],
          item.dietary_tags || [], item.spicy_level, item.data_confidence || 'partial',
          item.image_confidence || 'unknown', item.source_url || restaurant.source_url || null
        ]
      );
      dishCount += 1;
    }
  }

  return { restaurantCount, dishCount };
}
