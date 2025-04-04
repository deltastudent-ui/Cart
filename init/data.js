
const cardData = [
    {
        image: "https://img.freepik.com/free-vector/brown-bag-chocolatechip-cookies_1308-71312.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
        
        shop: "",
        title: "Cookies",
        description:"NutriChoice Digestive",
        price: 199,
    }, 
    {
        image:"https://img.freepik.com/free-vector/crush-chips-abstract-background_52683-667.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
       
        shop: "",
        title:"Pattato Chips", 
        description:"Potato Flavour Chips",
        price:10,
    },
    {
        image:"https://img.freepik.com/free-vector/realistic-potato-chips-announcement-background_52683-4295.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
       
        shop: "",
        title:"Chips", 
        description:"Onion Flavour Chips",
        price:15,
    },

    {
        image: "https://img.freepik.com/free-vector/chips-advetisement-realistic-style_52683-140.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
        
        shop: "",
        title:"Tamatto Chips", 
        description:"Yummy Baffers",
        price:45,
    },
    {
        image: "https://img.freepik.com/free-vector/chips-advetisement-realistic-style_52683-140.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
       
        shop: "",
        title:"Chips", 
        description:"Snack & Munchies, Chips",
        price:299,
    },

    {
        image:"https://img.freepik.com/premium-vector/realistic-chips-package-with-snack-label-isolated-with-shadows-highlights-vector-illustration_809899-130.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
       
        shop: "",
        title:"patato Chips", 
        description:"Crunches Potato Chips",
        price:39,
    },
    
    
    {
        image:"https://img.freepik.com/premium-psd/chips-wrap-flower-isolated-paper-mockup-with-design_136956-14.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
       
        shop: "",
        title:"WHeate-Chips", 
        description:"Healthy Chips",
        price:15,
    },
    
    {
        image:"https://img.freepik.com/free-vector/breakfast-background-design_1294-50.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
       
        shop: "",
        title:"Chips", 
        description:"Healthy Chips",
        price:10,
    },
    {
        image:"https://img.freepik.com/premium-vector/cartoon-boxes-milk-give-strength-usefulness_29190-2905.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
       
        shop: "",
        title:"Amul Milk ", 
        description:"Amul Buttor- 500g",
        price:99,
    },
    {
        image:"https://img.freepik.com/premium-vector/milk-carton-box-with-glass-cup_53562-1342.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
       
        shop: "",
        title:" Milk ", 
        description:"Amul Buttor- 250g",
        price:129,
    },
    {
        image:"/image/BISKI7.AVIF", 
       
        shop: "",
        title:" Choklate ", 
        description:"Cadbury Dairy-Milk",
        price:199,
    },
    {
       image:"https://img.freepik.com/free-vector/set-bars-pieces-delicious-chocolate_23-2147801332.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
        
       shop: "",
       title:" Choklate ", 
        description:" Dairy-Milk Delicious",
        price:149,
    },
    {
        image:"https://img.freepik.com/free-vector/promotion-banner-package-milk-chocolate-with-hazelnuts-isolated-brown-background_1441-2198.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
       
        shop: "",
        title:"Nuts Choklate ", 
        description:"Nuts Chocklate",
        price:219,

    },

    {
        image:"https://img.freepik.com/free-vector/chocolate-bars-pieces-collection-realistic-style_23-2147822212.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
       
        shop: "",
        title:"Dairy Milk ", 
        description:" Dairy-Milk ",
        price:199,

    },

    {
        image:"https://img.freepik.com/free-vector/watercolor-indian-food-restaurant-annual-report_23-2149441501.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
        shop: "",

        title:"Spicy Baffers ", 
        description:"Crispy Baffer",
        price:49,

    },
          
    {
        image:"https://img.freepik.com/free-photo/advertisement-chips-with-bag_23-2151258077.jpg?uid=R189130842&ga=GA1.1.380120557.1723788524&semt=ais_hybrid",
        shop: "",
        title:"Spicy chips ", 
        description:"Onion & garlick Flavour",
        price:25,
    },
];

let card = cardData.map(item=>{
    if (!item.shop || item.shop.trim() === "") {
        item.shop = "Ajay's Store 🙂";
    }
    return item; 
})
module.exports = {data:card};


