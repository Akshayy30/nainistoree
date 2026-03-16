export const SEARCH_ITEMS = [
  { icon: '🥟', name: 'Steam Momos (8 pcs)',  store: 'Tamang Momos',    price: 80  },
  { icon: '🥘', name: 'Fried Momos (8 pcs)',  store: 'Tamang Momos',    price: 100 },
  { icon: '🍗', name: 'Chicken Momos',         store: 'Tamang Momos',    price: 120 },
  { icon: '🍜', name: 'Hakka Noodles',         store: 'Tamang Momos',    price: 100 },
  { icon: '🍲', name: 'Thukpa Soup',           store: 'Tamang Momos',    price: 90  },
  { icon: '🍵', name: 'Masala Tea',            store: 'Tamang Momos',    price: 30  },
  { icon: '💊', name: 'Paracetamol Strip',     store: 'Himani Medicals', price: 28  },
  { icon: '🩹', name: 'Bandage Roll',          store: 'Himani Medicals', price: 45  },
  { icon: '🩺', name: 'First Aid Kit',         store: 'Himani Medicals', price: 350 },
  { icon: '🧴', name: 'Hand Sanitizer 500ml',  store: 'Himani Medicals', price: 120 },
  { icon: '🍮', name: 'Gulab Jamun 500g',      store: 'Saraswati Sweets',price: 120 },
  { icon: '🍰', name: 'Kaju Barfi 250g',       store: 'Saraswati Sweets',price: 280 },
  { icon: '🟡', name: 'Motichoor Laddu',       store: 'Saraswati Sweets',price: 150 },
  { icon: '🥜', name: 'Mix Namkeen 500g',      store: 'Saraswati Sweets',price: 90  },
  { icon: '🎁', name: 'Diwali Gift Box 1kg',   store: 'Saraswati Sweets',price: 550 },
  { icon: '🧶', name: 'Woollen Sweater',       store: 'Ram Lal & Sons',  price: 850 },
  { icon: '👔', name: 'Casual Shirt',          store: 'Ram Lal & Sons',  price: 480 },
  { icon: '🧥', name: 'Track Jacket',          store: 'Ram Lal & Sons',  price: 1200},
  { icon: '🎩', name: 'Pahadi Cap',            store: 'Ram Lal & Sons',  price: 250 },
  { icon: '🧥', name: 'Denim Jacket',          store: "Prince's",        price: 1400},
  { icon: '🧣', name: "Women's Shawl",         store: "Prince's",        price: 950 },
  { icon: '🕶️', name: 'Sunglasses UV400',     store: "Prince's",        price: 320 },
  { icon: '👖', name: 'Formal Trousers',       store: "Prince's",        price: 780 },
]

export const PRODUCTS = [
  { id:'p1', icon:'🥟', image:'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=400&h=300&fit=crop', name:'Steam Momos (8 pcs)',  store:'Tamang Momos · Veg with chutney', price:80,  orig:null,  discount:14, bg:'linear-gradient(135deg,#FFF8E1,#FFE082)' },
  { id:'p2', icon:'🍮', image:'https://picsum.photos/seed/sweets/400/300', name:'Gulab Jamun 500g',      store:'Saraswati Sweets',                 price:120, orig:null,  discount:null,bg:'linear-gradient(135deg,#FCE4EC,#F8BBD0)' },
  { id:'p3', icon:'🧶', image:'https://picsum.photos/seed/woollen/400/300', name:'Woollen Sweater',        store:'Ram Lal & Sons',                   price:850, orig:1100,  discount:23, bg:'linear-gradient(135deg,#E8EAF6,#C5CAE9)' },
  { id:'p4', icon:'🩺', image:'https://picsum.photos/seed/firstaid/400/300', name:'First Aid Kit',          store:'Himani Medicals',                  price:350, orig:420,   discount:17, bg:'linear-gradient(135deg,#E8F4FD,#B3D9F7)' },
  { id:'p5', icon:'🍜', image:'https://picsum.photos/seed/noodles/400/300', name:'Hakka Noodles',          store:'Tamang Momos',                     price:100, orig:null,  discount:null,bg:'linear-gradient(135deg,#FBE9E7,#FFCCBC)' },
  { id:'p6', icon:'🎁', image:'https://picsum.photos/seed/gift/400/300', name:'Diwali Gift Box',        store:'Saraswati Sweets',                 price:550, orig:null,  discount:null,bg:'linear-gradient(135deg,#FFF3E0,#FFE0B2)' },
  { id:'p7', icon:'🧣', image:'https://picsum.photos/seed/shawl/400/300', name:"Women's Shawl",          store:"Prince's Garments",                price:950, orig:null,  discount:null,bg:'linear-gradient(135deg,#F3E5F5,#E1BEE7)' },
  { id:'p8', icon:'💊', image:'https://picsum.photos/seed/medicine/400/300', name:'Paracetamol Strip',      store:'Himani Medicals',                  price:28,  orig:null,  discount:null,bg:'linear-gradient(135deg,#E8F5E9,#C8E6C9)' },
]

export const STORES = [
  { id:'tamang',    icon:'🥟', image:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop', name:'Tamang Momos',     eta:'20 min', featured:true  },
  { id:'himani',    icon:'💊', image:'https://picsum.photos/seed/medical/400/200', name:'Himani Medicals',   eta:'25 min', featured:false },
  { id:'saraswati', icon:'🍬', image:'https://picsum.photos/seed/sweetstore/400/200', name:'Saraswati Sweets',  eta:'30 min', featured:false },
  { id:'ramlal',    icon:'👔', image:'https://picsum.photos/seed/menswear/400/200', name:'Ram Lal & Sons',    eta:'35 min', featured:false },
  { id:'princes',   icon:'🧥', image:'https://picsum.photos/seed/womenswear/400/200', name:"Prince's Garments", eta:'30 min', featured:false },
]

export const CATEGORIES = [
  { id:'all',      icon:'🏪', image:'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200&h=200&fit=crop', label:'All',      isNew:false },
  { id:'food',     icon:'🥟', image:'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=200&h=200&fit=crop', label:'Food',     isNew:false },
  { id:'grocery',  icon:'🛒', image:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop', label:'Grocery',  isNew:true  },
  { id:'pharmacy', icon:'💊', image:'https://picsum.photos/seed/pharmacy-cat/200/200', label:'Pharmacy', isNew:false },
  { id:'clothing', icon:'👔', image:'https://picsum.photos/seed/clothing/200/200', label:'Clothing', isNew:false },
  { id:'sweets',   icon:'🍬', image:'https://picsum.photos/seed/dessert/200/200', label:'Sweets',   isNew:false },
]

export const BESTSELLERS = [
  { 
    images: [
      'https://picsum.photos/seed/momo1/400/400',
      'https://picsum.photos/seed/momo2/400/400',
      'https://picsum.photos/seed/momo3/400/400',
      'https://picsum.photos/seed/momo4/400/400'
    ], 
    count: '+8 items',  
    name: 'Momos & Snacks'     
  },
  { 
    images: [
      'https://picsum.photos/seed/sweet1/400/400',
      'https://picsum.photos/seed/sweet2/400/400',
      'https://picsum.photos/seed/sweet3/400/400',
      'https://picsum.photos/seed/sweet4/400/400'
    ], 
    count: '+12 items', 
    name: 'Sweets & Mithai'    
  },
  { 
    images: [
      'https://picsum.photos/seed/med1/400/400',
      'https://picsum.photos/seed/med2/400/400',
      'https://picsum.photos/seed/med3/400/400',
      'https://picsum.photos/seed/med4/400/400'
    ], 
    count: '+30 items', 
    name: 'Medicines'           
  },
  { 
    images: [
      'https://picsum.photos/seed/wool1/400/400',
      'https://picsum.photos/seed/wool2/400/400',
      'https://picsum.photos/seed/wool3/400/400',
      'https://picsum.photos/seed/wool4/400/400'
    ], 
    count: '+40 items', 
    name: 'Woollens & Clothes'  
  },
  { 
    images: [
      'https://picsum.photos/seed/snack1/400/400',
      'https://picsum.photos/seed/snack2/400/400',
      'https://picsum.photos/seed/snack3/400/400',
      'https://picsum.photos/seed/snack4/400/400'
    ], 
    count: '+20 items', 
    name: 'Namkeen & Snacks'   
  },
  { 
    images: [
      'https://picsum.photos/seed/acc1/400/400',
      'https://picsum.photos/seed/acc2/400/400',
      'https://picsum.photos/seed/acc3/400/400',
      'https://picsum.photos/seed/acc4/400/400'
    ], 
    count: '+15 items', 
    name: 'Accessories'        
  },
]
