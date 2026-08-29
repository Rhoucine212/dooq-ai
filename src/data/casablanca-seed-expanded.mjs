export const CASABLANCA_EXPANDED_RESTAURANTS = [
  {
    source_key:'casablanca-maqam', name:'Restaurant maQam', address:'9 Place de la Mosquée, Casablanca 20250, Morocco', phone:'+212 5 22 44 44 04',
    cuisine_types:['moroccan'], atmosphere_tags:['romantic','quiet','upscale','rooftop','family'], service_modes:['dine_in'], service_tags:['reservations','breakfast','brunch'], price_level:3,
    rating:4.6, review_count:612, opening_hours:{mon:'closed',tue:'09:00-23:00',wed:'09:00-23:00',thu:'09:00-23:00',fri:'09:00-23:00',sat:'09:00-23:00',sun:'09:00-23:00'},
    source_url:'https://restaurantmaqam.ma/menu-restaurant', data_confidence:'verified', dishes:[
      d('maqam-salades','Assortiment de fines salades marocaines',90,['vegetables'],['salad','moroccan'],['fresh'],'https://restaurantmaqam.ma/menu-restaurant'),
      d('maqam-briouates','Assortiment de mini Briouates (5p)',100,['pastry'],['briouate','moroccan'],['crispy'],'https://restaurantmaqam.ma/menu-restaurant'),
      d('maqam-pastilla-chicken','Pastilla poulet et amandes torréfiées',90,['chicken','almonds','pastry'],['chicken','pastilla'],['sweet_savory','crispy'],'https://restaurantmaqam.ma/menu-restaurant'),
      d('maqam-pastilla-fish','Pastilla poisson et fruits de mer',105,['fish','seafood','pastry'],['fish','seafood','pastilla'],['savory','crispy'],'https://restaurantmaqam.ma/menu-restaurant'),
      d('maqam-harira','Harira',50,['tomato','legumes'],['soup','moroccan'],['savory'],'https://restaurantmaqam.ma/menu-restaurant'),
      d('maqam-tajine-beef','Tajine de bœuf aux pruneaux et amandes torréfiées',170,['beef','prunes','almonds'],['beef','tajine'],['sweet_savory'],'https://restaurantmaqam.ma/menu-restaurant'),
      d('maqam-tajine-chicken','Tajine de poulet mqali aux citrons confits et olives',160,['chicken','preserved_lemon','olives'],['chicken','tajine'],['citrus','savory'],'https://restaurantmaqam.ma/menu-restaurant'),
      d('maqam-tajine-whiting','Tajine de boulettes de merlan',160,['whiting'],['fish','tajine'],['savory'],'https://restaurantmaqam.ma/menu-restaurant'),
      d('maqam-tajine-veg','Tajine Douaz aux légumes de saison',140,['vegetables'],['vegetables','tajine'],['savory'],'https://restaurantmaqam.ma/menu-restaurant',['vegetarian']),
      d('maqam-couscous-beef','Couscous de bœuf aux sept légumes',160,['beef','semolina','vegetables'],['beef','couscous'],['savory'],'https://restaurantmaqam.ma/menu-restaurant'),
      d('maqam-couscous-chicken','Couscous de poulet tfaya et légumes',140,['chicken','semolina','vegetables','onion'],['chicken','couscous'],['sweet_savory'],'https://restaurantmaqam.ma/menu-restaurant'),
      d('maqam-couscous-veg','Couscous végétarien sept légumes et tfaya',160,['semolina','vegetables','onion'],['vegetables','couscous'],['sweet_savory'],'https://restaurantmaqam.ma/menu-restaurant',['vegetarian'])
    ]
  },
  {
    source_key:'casablanca-sforza-visconti', name:'Sforza Visconti', address:"12 Rue d'Ifrane, Casablanca 20200, Morocco", phone:'+212 5 22 36 46 66',
    cuisine_types:['italian','mediterranean','seafood','burger'], atmosphere_tags:['casual','family','romantic'], service_modes:['dine_in'], service_tags:['wood_fired_pizza'], price_level:2,
    rating:null, review_count:null, opening_hours:{}, source_url:'https://sforzavisconti.ma/menu/', data_confidence:'verified', dishes:[
      d('sforza-margherita','Pizza Margherita',90,['tomato','mozzarella','basil'],['pizza','italian'],['savory'],'https://sforzavisconti.ma/menu/',['vegetarian']),
      d('sforza-primavera','Pizza Primavera',95,['vegetables','mushrooms','pesto'],['pizza','vegetables'],['fresh','savory'],'https://sforzavisconti.ma/menu/',['vegetarian']),
      d('sforza-frutti-mare-pizza','Pizza Frutti di Mare',145,['shrimp','mussels','cuttlefish','white_fish'],['pizza','seafood'],['savory'],'https://sforzavisconti.ma/menu/'),
      d('sforza-burrata-pizza','Pizza Burrata',130,['burrata','tomato','arugula','pesto'],['pizza','cheese'],['creamy','fresh'],'https://sforzavisconti.ma/menu/',['vegetarian']),
      d('sforza-arrabbiata','Pasta all’Arrabbiata',80,['tomato','chili'],['pasta','italian'],['spicy'],'https://sforzavisconti.ma/menu/',['vegetarian'],3),
      d('sforza-bolognese','Pasta à la Bolognaise',95,['beef','tomato','pasta'],['pasta','beef'],['savory'],'https://sforzavisconti.ma/menu/'),
      d('sforza-seafood-pasta','Pasta aux fruits de mer',145,['seafood','pasta'],['pasta','seafood'],['savory'],'https://sforzavisconti.ma/menu/'),
      d('sforza-gamberi','Pasta Al Gamberi',150,['shrimp','garlic','olive_oil','parsley'],['pasta','seafood'],['savory'],'https://sforzavisconti.ma/menu/'),
      d('sforza-risotto-gambas','Risotto aux gambas et bisque de crustacés',180,['shrimp','rice','shellfish_bisque'],['risotto','seafood'],['rich','savory'],'https://sforzavisconti.ma/menu/'),
      d('sforza-risotto-chicken-truffle','Risotto poulet champignons crème de truffe noire',160,['chicken','rice','mushrooms','truffle_cream'],['risotto','chicken'],['creamy','rich'],'https://sforzavisconti.ma/menu/'),
      d('sforza-beef-filet','Filet de bœuf grillé sauce au poivre',180,['beef'],['beef','grill'],['grilled','savory'],'https://sforzavisconti.ma/menu/'),
      d('sforza-entrecote','Entrecôte grillée sauce Gorgonzola',170,['beef','gorgonzola'],['beef','grill'],['grilled','creamy'],'https://sforzavisconti.ma/menu/'),
      d('sforza-chicken-burger','Chicken César Burger',105,['chicken','turkey_bacon','cheddar','egg','lettuce'],['burger','chicken'],['crispy','savory'],'https://sforzavisconti.ma/menu/'),
      d('sforza-italian-burger','Italian Burger',115,['beef','gouda','arugula','tomato','pesto','onion'],['burger','beef'],['savory'],'https://sforzavisconti.ma/menu/'),
      d('sforza-salmon','Pavé de saumon, fondue de poireaux',180,['salmon','leek'],['fish','salmon'],['savory'],'https://sforzavisconti.ma/menu/'),
      d('sforza-seabass','Filet de loup bar grillé, crème de truffe',190,['seabass','truffle_cream'],['fish','grill'],['grilled','creamy'],'https://sforzavisconti.ma/menu/')
    ]
  },
  {
    source_key:'casablanca-sorento', name:'Restaurant Sorento', address:'5 Rue El Maidani, Casablanca 20330, Morocco', phone:'+212 5 29 93 69 29',
    cuisine_types:['italian','mediterranean','pizza','pasta'], atmosphere_tags:['warm','elegant','romantic','family'], service_modes:['dine_in'], service_tags:['wood_fired_pizza','vegetarian_options','gluten_free_options'], price_level:2,
    rating:null, review_count:null, opening_hours:{mon:'11:00-02:00',tue:'11:00-02:00',wed:'11:00-02:00',thu:'11:00-02:00',fri:'11:00-02:00',sat:'11:00-02:00',sun:'closed'},
    source_url:'https://sorento.ma/menu-sorento/', data_confidence:'verified', dishes:[
      d('sorento-bolognese-pasta','Pâtes Bolognaise',80,['beef','pasta','tomato'],['pasta','beef'],['savory'],'https://sorento.ma/menu-sorento/'),
      d('sorento-pollo-pesto','Pâtes Pollo et Pesto',70,['chicken','cream','garlic','basil'],['pasta','chicken'],['creamy','fresh'],'https://sorento.ma/menu-sorento/'),
      d('sorento-mediterranean-pasta','Pâtes Méditerranéennes',95,['seafood','pasta'],['pasta','seafood'],['savory'],'https://sorento.ma/menu-sorento/'),
      d('sorento-norwegian-pasta','Pâtes Norvégiennes',95,['salmon','cream','spinach'],['pasta','salmon'],['creamy'],'https://sorento.ma/menu-sorento/'),
      d('sorento-lasagne-bolognese','Lasagne Bolognaise',90,['beef','pasta','cheese'],['lasagna','beef'],['rich'],'https://sorento.ma/menu-sorento/'),
      d('sorento-pizza-bolognese','Pizza Bolognaise',75,['beef','tomato','mozzarella'],['pizza','beef'],['savory'],'https://sorento.ma/menu-sorento/'),
      d('sorento-pizza-vegetarian','Pizza Végétarienne',70,['vegetables','olive_oil'],['pizza','vegetables'],['grilled','fresh'],'https://sorento.ma/menu-sorento/',['vegetarian']),
      d('sorento-pizza-four-cheese','Pizza Quatre Fromages',80,['cheese'],['pizza','cheese'],['creamy','rich'],'https://sorento.ma/menu-sorento/',['vegetarian']),
      d('sorento-pizza-norwegian','Pizza Norvégienne',95,['salmon','shallot','capers'],['pizza','salmon'],['savory'],'https://sorento.ma/menu-sorento/'),
      d('sorento-pizza-diavola','Pizza Diavola',75,['merguez','spicy_salami','mushrooms'],['pizza','meat'],['spicy'],'https://sorento.ma/menu-sorento/',[],3),
      d('sorento-pizza-del-capo','Pizza Del Capo',120,['shrimp','squid','mussels','clams'],['pizza','seafood'],['savory'],'https://sorento.ma/menu-sorento/'),
      d('sorento-chicken-supreme','Suprême de Poulet',120,['chicken','raisins','honey'],['chicken'],['sweet_savory'],'https://sorento.ma/menu-sorento/'),
      d('sorento-chicken-escalope','Escalope de Poulet',95,['chicken'],['chicken'],['grilled','crispy'],'https://sorento.ma/menu-sorento/'),
      d('sorento-beef-filet','Filet Pur Bœuf',160,['beef'],['beef'],['savory'],'https://sorento.ma/menu-sorento/'),
      d('sorento-entrecote','Entrecôte',135,['beef'],['beef','grill'],['grilled'],'https://sorento.ma/menu-sorento/'),
      d('sorento-fish-daily','Poisson du jour',160,['fish'],['fish','seafood'],['grilled'],'https://sorento.ma/menu-sorento/')
    ]
  },
  {
    source_key:'casablanca-unisushi', name:'Uni Sushi Casablanca', address:'Casablanca, Morocco', phone:null,
    cuisine_types:['japanese','sushi','asian','fusion'], atmosphere_tags:['casual','trendy'], service_modes:['delivery','takeaway','dine_in'], service_tags:['sushi_delivery','vegan_options'], price_level:2,
    rating:null, review_count:null, opening_hours:{}, source_url:'https://order.unisushi.ma/casablanca/livraison/', data_confidence:'verified', dishes:[
      d('uni-miso','Soupe Miso',30,['miso'],['soup','japanese'],['umami'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-veg-nems','Nems Légumes (x4)',35,['vegetables'],['nems','vegetables'],['crispy'],'https://order.unisushi.ma/casablanca/livraison/',['vegetarian']),
      d('uni-karaage','Poulet Karaage',45,['chicken'],['chicken','japanese'],['crispy','savory'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-vegan-dumpling','Spicy Dumpling Vegan (x4)',50,['vegetables'],['dumpling','vegan'],['spicy'],'https://order.unisushi.ma/casablanca/livraison/',['vegan'],2),
      d('uni-katsu','Poulet Katsu',50,['chicken'],['chicken','japanese'],['crispy'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-gyoza-chicken','Gyoza Poulet (x4)',55,['chicken'],['gyoza','chicken'],['savory'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-dimsum-shrimp','Dim Sum Crevette (x4)',70,['shrimp'],['dim_sum','seafood'],['savory'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-taco-spicy-tuna','Taco Spicy Tuna (x3)',50,['tuna'],['tuna','sushi'],['spicy'],'https://order.unisushi.ma/casablanca/livraison/',[],3),
      d('uni-taco-spicy-salmon','Taco Spicy Salmon (x3)',65,['salmon'],['salmon','sushi'],['spicy'],'https://order.unisushi.ma/casablanca/livraison/',[],3),
      d('uni-california-original','California Original (x4)',40,[],['sushi','california'],['fresh'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-california-salmon-cheese','California Saumon Cheese (x4)',45,['salmon','cheese'],['salmon','sushi'],['creamy','fresh'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-sashimi-tuna','Sashimi Tuna (x4)',45,['tuna'],['tuna','sashimi'],['fresh'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-sashimi-salmon','Sashimi Saumon (x4)',60,['salmon'],['salmon','sashimi'],['fresh'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-nigiri-tuna','Nigiri Tuna (x2)',30,['tuna','rice'],['tuna','nigiri'],['fresh'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-nigiri-salmon','Nigiri Saké (x2)',40,['salmon','rice'],['salmon','nigiri'],['fresh'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-maki-cucumber','Maki Concombre (x6)',25,['cucumber','rice'],['maki','vegetables'],['fresh'],'https://order.unisushi.ma/casablanca/livraison/',['vegetarian','vegan']),
      d('uni-maki-avocado','Maki Abokado (x6)',30,['avocado','rice'],['maki','vegetables'],['fresh'],'https://order.unisushi.ma/casablanca/livraison/',['vegetarian','vegan']),
      d('uni-maki-salmon','Maki Saumon (x6)',40,['salmon','rice'],['maki','salmon'],['fresh'],'https://order.unisushi.ma/casablanca/livraison/'),
      d('uni-crispy-ebi-volcano','Crispy Ebi Volcano (x5)',60,['shrimp'],['crispy','seafood'],['crispy','spicy'],'https://order.unisushi.ma/casablanca/livraison/',[],2),
      d('uni-chirashi-sake','Chirashi Saké',140,['salmon','rice'],['chirashi','salmon'],['fresh'],'https://order.unisushi.ma/casablanca/livraison/')
    ]
  },
  {
    source_key:'casablanca-la-cantine-gauthier', name:'La Cantine de Gauthier', address:'3 Rue Abou Adil Allaf, Casablanca 20000, Morocco', phone:'+212 6 64 07 09 65',
    cuisine_types:['french','bistro','seafood'], atmosphere_tags:['warm','lively','casual'], service_modes:['dine_in'], service_tags:['bistro','reservations'], price_level:3,
    rating:null, review_count:null, opening_hours:{}, source_url:'https://www.lacantinedegauthier.com/', data_confidence:'verified', dishes:[
      d('cantine-gravlax','Gravlax de saumon',130,['salmon'],['salmon','starter'],['fresh'],'https://www.lacantinedegauthier.com/'),
      d('cantine-caesar','Salade César classique',115,['lettuce','chicken'],['salad','chicken'],['fresh','savory'],'https://www.lacantinedegauthier.com/'),
      d('cantine-carpaccio','Carpaccio de bœuf',125,['beef'],['beef','starter'],['fresh'],'https://www.lacantinedegauthier.com/'),
      d('cantine-burrata','Burrata duo de tomates',125,['burrata','tomato'],['cheese','salad'],['creamy','fresh'],'https://www.lacantinedegauthier.com/',['vegetarian']),
      d('cantine-entrecote','Entrecôte sauce béarnaise',215,['beef'],['beef','grill'],['grilled','rich'],'https://www.lacantinedegauthier.com/'),
      d('cantine-filet-beef','Filet de bœuf',225,['beef'],['beef'],['savory'],'https://www.lacantinedegauthier.com/'),
      d('cantine-duck','Confit de canard',225,['duck'],['duck'],['rich'],'https://www.lacantinedegauthier.com/'),
      d('cantine-chicken','Ballotine de volaille farcie',190,['chicken'],['chicken'],['savory'],'https://www.lacantinedegauthier.com/'),
      d('cantine-linguini-seafood','Linguini aux fruits de mer',195,['pasta','seafood'],['pasta','seafood'],['savory'],'https://www.lacantinedegauthier.com/'),
      d('cantine-salmon','Saumon grillé',195,['salmon'],['salmon','grill'],['grilled'],'https://www.lacantinedegauthier.com/'),
      d('cantine-sole','Sole meunière',230,['sole'],['fish'],['rich'],'https://www.lacantinedegauthier.com/'),
      d('cantine-seabass','Filet de loup bar',195,['seabass'],['fish'],['savory'],'https://www.lacantinedegauthier.com/'),
      d('cantine-chocolate','Fondant au chocolat',80,['chocolate'],['dessert'],['sweet','rich'],'https://www.lacantinedegauthier.com/'),
      d('cantine-tarte-tatin','Tarte Tatin aux pommes',80,['apple','pastry'],['dessert'],['sweet'],'https://www.lacantinedegauthier.com/'),
      d('cantine-creme-brulee','Crème brûlée à la vanille',80,['cream','vanilla'],['dessert'],['sweet','creamy'],'https://www.lacantinedegauthier.com/')
    ]
  },
  {
    source_key:'casablanca-bombay', name:'Bombay Restaurant Casablanca', address:'Maârif, Casablanca, Morocco', phone:'+212 6 13 72 73 62',
    cuisine_types:['indian','punjabi','north_indian'], atmosphere_tags:['elegant','modern','family'], service_modes:['dine_in'], service_tags:['halal','vegetarian_options','vegan_options','catering'], price_level:2,
    rating:null, review_count:null, opening_hours:{daily:'12:00-23:30'}, source_url:'https://www.bombaymaroc.com/menu', data_confidence:'verified', dishes:[
      d('bombay-veg-samosa','Vegetable Samosa (2 pcs)',50,['potato','green_peas','spices'],['indian','starter','vegetables'],['spicy','crispy'],'https://www.bombaymaroc.com/menu',['vegetarian','vegan']),
      d('bombay-chicken-samosa','Chicken Samosa (2 pcs)',55,['chicken','herbs'],['indian','starter','chicken'],['spicy','crispy'],'https://www.bombaymaroc.com/menu'),
      d('bombay-veg-pakora','Vegetable Pakora',55,['vegetables','chickpea_flour'],['indian','vegetables'],['crispy','spicy'],'https://www.bombaymaroc.com/menu',['vegetarian','vegan','gluten_free']),
      d('bombay-veg-cigars','Vegetable Cigars (2 pcs)',50,['vegetables','ginger','coriander'],['indian','vegetables'],['crispy','spicy'],'https://www.bombaymaroc.com/menu',['vegetarian']),
      d('bombay-chicken-cigars','Chicken Cigars (2 pcs)',55,['chicken','spices'],['indian','chicken'],['crispy','spicy'],'https://www.bombaymaroc.com/menu'),
      d('bombay-shrimp-cigars','Shrimp Cigars (2 pcs)',59,['shrimp'],['indian','seafood'],['crispy'],'https://www.bombaymaroc.com/menu'),
      d('bombay-chicken-salad','Chicken Salad',55,['chicken_tikka','cucumber','tomato','greens'],['salad','chicken'],['grilled','fresh'],'https://www.bombaymaroc.com/menu',['gluten_free']),
      d('bombay-garden-salad','Garden Fresh Salad',40,['lettuce','cucumber','tomato','pepper','carrot'],['salad','vegetables'],['fresh'],'https://www.bombaymaroc.com/menu',['vegetarian','vegan','gluten_free'])
    ]
  }
];

function d(source_key,name,price,ingredients,food_tags,flavor_tags,source_url,dietary_tags=[],spicy_level=null,photo_url=null){
  return { source_key,name,price,main_ingredients:ingredients,food_tags,flavor_tags,allergens:[],dietary_tags,spicy_level,source_url,photo_url,image_confidence:photo_url?'verified':'unknown',data_confidence:'verified' };
}

export async function seedExpandedCasablancaRestaurants(client){
  let restaurantCount=0,dishCount=0;
  for(const restaurant of CASABLANCA_EXPANDED_RESTAURANTS){
    const {rows}=await client.query(`INSERT INTO restaurants (source_key,name,address,cuisine_types,phone,rating,atmosphere_tags,opening_hours,active,last_verified_at,service_modes,service_tags,price_level,review_count,source_url,data_confidence,city) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,TRUE,NOW(),$9,$10,$11,$12,$13,$14,'Casablanca') ON CONFLICT (source_key) WHERE source_key IS NOT NULL DO UPDATE SET name=EXCLUDED.name,address=EXCLUDED.address,cuisine_types=EXCLUDED.cuisine_types,phone=EXCLUDED.phone,rating=EXCLUDED.rating,atmosphere_tags=EXCLUDED.atmosphere_tags,opening_hours=EXCLUDED.opening_hours,service_modes=EXCLUDED.service_modes,service_tags=EXCLUDED.service_tags,price_level=EXCLUDED.price_level,review_count=EXCLUDED.review_count,source_url=EXCLUDED.source_url,data_confidence=EXCLUDED.data_confidence,last_verified_at=NOW(),updated_at=NOW() RETURNING id`,[restaurant.source_key,restaurant.name,restaurant.address,restaurant.cuisine_types||[],restaurant.phone||null,restaurant.rating,restaurant.atmosphere_tags||[],JSON.stringify(restaurant.opening_hours||{}),restaurant.service_modes||[],restaurant.service_tags||[],restaurant.price_level||null,restaurant.review_count||null,restaurant.source_url||null,restaurant.data_confidence||'partial']);
    const restaurantId=rows[0].id; restaurantCount++;
    for(const item of restaurant.dishes||[]){
      await client.query(`INSERT INTO dishes (restaurant_id,source_key,name,description,price,photo_url,main_ingredients,food_tags,flavor_tags,allergens,dietary_tags,spicy_level,available,data_confidence,image_confidence,source_url,last_verified_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,TRUE,$13,$14,$15,NOW()) ON CONFLICT (source_key) WHERE source_key IS NOT NULL DO UPDATE SET restaurant_id=EXCLUDED.restaurant_id,name=EXCLUDED.name,description=EXCLUDED.description,price=EXCLUDED.price,photo_url=EXCLUDED.photo_url,main_ingredients=EXCLUDED.main_ingredients,food_tags=EXCLUDED.food_tags,flavor_tags=EXCLUDED.flavor_tags,allergens=EXCLUDED.allergens,dietary_tags=EXCLUDED.dietary_tags,spicy_level=EXCLUDED.spicy_level,available=TRUE,data_confidence=EXCLUDED.data_confidence,image_confidence=EXCLUDED.image_confidence,source_url=EXCLUDED.source_url,last_verified_at=NOW(),updated_at=NOW()`,[restaurantId,item.source_key,item.name,null,item.price,item.photo_url||null,item.main_ingredients||[],item.food_tags||[],item.flavor_tags||[],item.allergens||[],item.dietary_tags||[],item.spicy_level,item.data_confidence||'verified',item.image_confidence||'unknown',item.source_url||restaurant.source_url]);
      dishCount++;
    }
  }
  return {restaurantCount,dishCount};
}
