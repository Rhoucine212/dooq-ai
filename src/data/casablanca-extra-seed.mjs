export const CASABLANCA_EXTRA_RESTAURANTS = [
  {
    source_key: 'casablanca-niya',
    name: 'NIYA',
    address: '34 Rue Sebou, Casablanca, Morocco',
    phone: '+212 6 11 18 93 90',
    cuisine_types: ['vegan','healthy','mediterranean','fusion'],
    atmosphere_tags: ['casual','quiet','community','healthy'],
    service_modes: ['dine_in','takeaway'],
    service_tags: ['vegan','organic','homemade','gluten_free_options'],
    price_level: 2,
    rating: 4.5,
    review_count: 37,
    opening_hours: { mon:'closed', tue:'10:00-22:00', wed:'10:00-22:00', thu:'10:00-22:00', fri:'10:00-22:00', sat:'10:00-22:00', sun:'10:00-17:00' },
    source_url: 'https://niya-casablanca.com/menu',
    data_confidence: 'verified',
    dishes: [
      dish('niya-friend-chickn','Frie(n)d Chick’n',60,['oyster_mushroom','mango','pickles'],['vegan','starter'],['crispy','sweet_savory'],[],'https://niya-casablanca.com/menu',['vegan']),
      dish('niya-pide-figue','Pidé figue',60,['fig','almond_ricotta','balsamic','arugula'],['vegan','pizza'],['sweet_savory'],['tree_nuts'],'https://niya-casablanca.com/menu',['vegan']),
      dish('niya-carpaccio-watermelon','Carpaccio de pastèque',80,['watermelon','greek_salad','plant_ricotta'],['vegan','salad'],['fresh'],[],'https://niya-casablanca.com/menu',['vegan','gluten_free']),
      dish('niya-roasted-broccoli','Demi brocoli rôti',80,['broccoli','cashew_cream_cheese','chimichurri','kale','almonds','lemon'],['vegan','vegetables'],['grilled','fresh'],['tree_nuts'],'https://niya-casablanca.com/menu',['vegan','gluten_free']),
      dish('niya-green-risotto','Risotto vert',120,['rice','zucchini','peas','cucumber','lime','almond_ricotta'],['vegan','rice'],['fresh','creamy'],['tree_nuts'],'https://niya-casablanca.com/menu',['vegan','gluten_free']),
      dish('niya-pasta-norma','Pasta alla norma',120,['wholewheat_penne','tomato','basil','eggplant','almond_ricotta'],['vegan','pasta'],['savory'],['gluten','tree_nuts'],'https://niya-casablanca.com/menu',['vegan']),
      dish('niya-no-fish-burger','No-Fish Burger',120,['cauliflower','plant_cheddar','tartar_sauce','potato'],['vegan','burger'],['crispy','savory'],[],'https://niya-casablanca.com/menu',['vegan']),
      dish('niya-summer-cheeseburger','Summer Cheeseburger',120,['plant_patty','plant_cheddar','eggplant','caramelized_onion','harissa_mayo','potato'],['vegan','burger'],['spicy','savory'],[],'https://niya-casablanca.com/menu',['vegan'],2),
      dish('niya-seitan-shawarma','Seitan Shawarma',120,['pita','seitan','tomato','onion','cucumber','salad'],['vegan','shawarma'],['savory'],['gluten'],'https://niya-casablanca.com/menu',['vegan']),
      dish('niya-friday-couscous','Couscous revisité',100,['wholewheat_semolina_or_corn','vegetables','harissa','preserved_lemon','cashew_lben'],['vegan','couscous','moroccan'],['spicy','citrus','sweet_savory'],['tree_nuts'],'https://niya-casablanca.com/menu',['vegan'],2)
    ]
  },
  {
    source_key: 'casablanca-entrecote-cafe-de-paris',
    name: "L'Entrecôte Café de Paris",
    address: '78 Avenue Mers Sultan, Casablanca 20000, Morocco',
    phone: '+212 5 22 27 26 74',
    cuisine_types: ['french','steakhouse'],
    atmosphere_tags: ['cozy','quiet','casual','family'],
    service_modes: ['dine_in','takeaway'],
    service_tags: ['set_menu','steak'],
    price_level: 3,
    rating: 4.3,
    review_count: 508,
    opening_hours: { mon_fri:'12:00-15:30,20:00-00:00', sat_sun:'12:00-00:00' },
    source_url: 'https://www.lentrecotecafedeparis.com/notreformule.html',
    data_confidence: 'partial',
    dishes: [
      {
        source_key: 'entrecote-set-menu',
        name: 'Formule Entrecôte Café de Paris',
        price: 180,
        main_ingredients: ['walnut_salad','beef_sirloin','french_fries','cafe_de_paris_sauce'],
        food_tags: ['beef','steak','french'],
        flavor_tags: ['grilled','rich'],
        allergens: ['tree_nuts','milk'],
        dietary_tags: [],
        spicy_level: null,
        source_url: 'https://www.lentrecotecafedeparis.com/notreformule.html',
        photo_url: null,
        image_confidence: 'unknown',
        data_confidence: 'partial'
      }
    ]
  },
  partial('casablanca-boccaccio','Boccaccio','6 Rue Ahmed El Mokri, Casablanca 20250, Morocco','+212 5 22 39 84 45',['italian'],['upscale','romantic'],3,null,null,{ tue:'12:00-00:00' },null),
  partial('casablanca-brasserie-bavaroise','La Brasserie Bavaroise','131 Rue Allal Ben Abdellah, Casablanca 20250, Morocco','+212 5 22 31 17 60',['french'],['quiet','romantic','upscale'],3,4.4,801,{ mon_fri:'12:00-15:00', sat:'12:00-23:00', sun:'12:00-22:30' },null),
  partial('casablanca-iloli','ILOLI','Rue Najib Mahfoud, Casablanca 20250, Morocco','+212 6 08 86 66 33',['japanese','sushi'],['contemporary','upscale'],4,null,null,{},null),
  partial('casablanca-chez-michel-hafida','Chez Michel et Hafida','Stall 192, Marché Central, Bd Mohammed V, Casablanca 20000, Morocco','+212 6 61 40 08 23',['seafood'],['casual','market'],2,null,null,{ sun:'10:00-22:00' },null),
  partial('casablanca-la-bodega','La Bodega de Casablanca','129 Rue Allal Ben Abdellah, Casablanca 20250, Morocco','+212 5 22 54 18 42',['spanish','tapas'],['lively','casual'],3,null,null,{ wed:'12:00-01:00' },null),
  partial('casablanca-texas-burger','Texas Burger','Résidence Al Wafa 1 N°26, Angle Rue Stockholm et Rue Bruxelles, Av. 2 Mars, Casablanca 20000, Morocco','+212 6 43 97 02 83',['burger','american'],['casual','trendy','family'],1,4.6,112,{},null,['delivery','takeaway','dine_in'],['halal','kids_menu']),
  partial('casablanca-sakura','Sakura','100 Avenue des FAR, Casablanca 20000, Morocco','+212 5 22 43 94 94',['japanese'],['quiet','casual'],2,3.8,16,{ mon_sat:'19:00-23:30' },null,['takeaway','dine_in']),
  partial('casablanca-yawatcha','Yawatcha Thai Experience','35 Rue Hassan Souktani, Casablanca 20000, Morocco','+212 5 22 20 25 77',['thai','asian','japanese','sushi'],['family','groups'],3,4.2,109,{ daily:'12:00-00:00' },null),
  partial('casablanca-la-table-bavaroise','La Table de la Bavaroise','Tony Jacklin Club House, Bouskoura Golf City, Casablanca 27182, Morocco','+212 5 22 32 07 74',['french','european','international'],['family','special_occasion','golf_view'],4,3.4,105,{ mon_sat:'08:00-00:00', sun:'08:00-20:00' },null)
];

function dish(source_key, name, price, main_ingredients, food_tags, flavor_tags, allergens, source_url, dietary_tags = [], spicy_level = null) {
  return { source_key, name, price, main_ingredients, food_tags, flavor_tags, allergens, source_url, dietary_tags, spicy_level, photo_url:null, image_confidence:'unknown', data_confidence:'verified' };
}

function partial(source_key, name, address, phone, cuisine_types, atmosphere_tags, price_level, rating, review_count, opening_hours, source_url, service_modes=['dine_in'], service_tags=[]) {
  return { source_key, name, address, phone, cuisine_types, atmosphere_tags, price_level, rating, review_count, opening_hours, source_url, service_modes, service_tags, data_confidence:'partial', dishes:[] };
}

export async function seedCasablancaExtra(client) {
  let restaurantCount = 0;
  let dishCount = 0;
  for (const restaurant of CASABLANCA_EXTRA_RESTAURANTS) {
    const { rows } = await client.query(
      `INSERT INTO restaurants (
        source_key,name,address,cuisine_types,phone,rating,atmosphere_tags,opening_hours,active,last_verified_at,
        service_modes,service_tags,price_level,review_count,source_url,data_confidence,city
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,TRUE,NOW(),$9,$10,$11,$12,$13,$14,'Casablanca')
      ON CONFLICT (source_key) WHERE source_key IS NOT NULL DO UPDATE SET
        name=EXCLUDED.name,address=EXCLUDED.address,cuisine_types=EXCLUDED.cuisine_types,phone=EXCLUDED.phone,
        rating=EXCLUDED.rating,atmosphere_tags=EXCLUDED.atmosphere_tags,opening_hours=EXCLUDED.opening_hours,
        service_modes=EXCLUDED.service_modes,service_tags=EXCLUDED.service_tags,price_level=EXCLUDED.price_level,
        review_count=EXCLUDED.review_count,source_url=EXCLUDED.source_url,data_confidence=EXCLUDED.data_confidence,
        last_verified_at=NOW(),updated_at=NOW() RETURNING id`,
      [restaurant.source_key,restaurant.name,restaurant.address,restaurant.cuisine_types||[],restaurant.phone||null,restaurant.rating,
       restaurant.atmosphere_tags||[],JSON.stringify(restaurant.opening_hours||{}),restaurant.service_modes||[],restaurant.service_tags||[],
       restaurant.price_level||null,restaurant.review_count||null,restaurant.source_url||null,restaurant.data_confidence||'partial']
    );
    const restaurantId = rows[0].id;
    restaurantCount += 1;
    for (const item of restaurant.dishes || []) {
      await client.query(
        `INSERT INTO dishes (restaurant_id,source_key,name,description,price,photo_url,main_ingredients,food_tags,flavor_tags,allergens,dietary_tags,spicy_level,available,data_confidence,image_confidence,source_url,last_verified_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,TRUE,$13,$14,$15,NOW())
         ON CONFLICT (source_key) WHERE source_key IS NOT NULL DO UPDATE SET
           restaurant_id=EXCLUDED.restaurant_id,name=EXCLUDED.name,price=EXCLUDED.price,photo_url=EXCLUDED.photo_url,
           main_ingredients=EXCLUDED.main_ingredients,food_tags=EXCLUDED.food_tags,flavor_tags=EXCLUDED.flavor_tags,
           allergens=EXCLUDED.allergens,dietary_tags=EXCLUDED.dietary_tags,spicy_level=EXCLUDED.spicy_level,
           data_confidence=EXCLUDED.data_confidence,image_confidence=EXCLUDED.image_confidence,source_url=EXCLUDED.source_url,
           last_verified_at=NOW(),updated_at=NOW()`,
        [restaurantId,item.source_key,item.name,item.description||null,item.price,item.photo_url||null,item.main_ingredients||[],item.food_tags||[],item.flavor_tags||[],item.allergens||[],item.dietary_tags||[],item.spicy_level,item.data_confidence||'partial',item.image_confidence||'unknown',item.source_url||restaurant.source_url||null]
      );
      dishCount += 1;
    }
  }
  return { restaurantCount, dishCount };
}
