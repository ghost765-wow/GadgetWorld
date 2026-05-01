// --- КОНФИГУРАЦИЯ КАТЕГОРИЙ ---
const categories = [
    { id: 'tvs', name: 'Телевизоры', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&auto=format' },
    { id: 'phones', name: 'Смартфоны', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format' },
    { id: 'laptops', name: 'Ноутбуки', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format' },
    { id: 'microwaves', name: 'Микроволновки', image: 'https://www.gastroma.se/wp-content/uploads/2024/05/WEB_MOE25X_3.jpg.jpg' },
    { id: 'fridges', name: 'Холодильники', image: 'https://th.bing.com/th/id/R.ee65bb1e89d4fcf58d771e69cff2b499?rik=DHY1h65aAlv6ew&pid=ImgRaw&r=0' },
    { id: 'dishwashers', name: 'Посудомойки', image: 'https://st1.stranamam.ru/data/cache/2013nov/10/30/10025441_71135-700x500.jpg' },
    { id: 'coffee', name: 'Кофемашины', image: 'https://s13emagst.akamaized.net/products/64478/64477650/images/res_3b20a23a5cf3dd80b900369c151f85f3.jpg' },
    { id: 'vacuums', name: 'Пылесосы', image: 'https://opis-cdn.tinkoffjournal.ru/mercury/best-robot-vacuum-6.jpg' },
    { id: 'washers', name: 'Стиральные машины', image: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400&h=300&fit=crop&auto=format' },
    { id: 'headphones', name: 'Наушники', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format' },
    { id: 'tablets', name: 'Планшеты', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&auto=format' },
    { id: 'airfryers', name: 'Аэрогрили', image: 'https://tse2.mm.bing.net/th/id/OIP.7lyBN7xdMrvlyULdQbj_rQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' }
];

// --- ФИЛЬТРЫ (ПОЛНЫЙ СПИСОК) ---
const categoryFilters = {
    tvs: ["Все", "LG", "Samsung", "TCL", "HAIER", "Xiaomi", "KIVI"],
    phones: ["Все смартфоны", "iPhone", "Samsung", "Xiaomi","POCO", "Vivo", "Realme"],
    laptops: ["Все ноутбуки", "Игровые", "Ультрабуки", "MacBook", "ASUS","ASUS TUF Gaming", "LENOVO", "HONOR", "HP", "THUNDEROBOT"],
    microwaves: ["Все микроволновки", "Samsung", "LG", "Panasonic", "Haier", "Bosch", "Maunfeld", "Hyundai"],
    fridges: ["Все холодильники", "LG", "Beko", "ATLANT", "Haier", "TECHNO", "Samsung", "Midea"],
    dishwashers: ["Все посудомойки", "Haier", "Korting", "Bosch", "MAUNFELD", "Hotpoint", "Weissgauff", "Electrolux"],
    coffee: ["Все кофемашины", "DELONGHI", "NIVONA", "PHILIPS", "POLARIS", "Krups", "JURA", "SIEMENS", "Kitfort"],
    vacuums: ["Все пылесосы",  "Dreame", "SAMSUNG", "Karcher", "LG", "Xiaomi"],
    washers: ["Все стиральные машины", "LG", "HAIER", "ATLANT", "SAMSUNG", ],
    headphones: ["Все наушники", "Apple", "JBL", "Xiaomi", "Samsung","MARSHALL","Sony" ],
    tablets: ["Все планшеты", "APPLE", "SAMSUNG", "XIAOMI","Honor"],
    airfryers: ["Все аэрогрили", "XIAOMI", "TEFAL", "KITFORT", "Dreame"]
};
// Функция для сброса состояния приложения
function resetApplicationState() {
    console.log('Сброс состояния приложения...');
    
    currentCategory = '';
    currentProduct = null;
    currentMemoryOption = null;
    currentGpuOption = null;
    currentSort = 'default';
    currentFilteredItems = [];
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    // Сбрасываем фильтры брендов
    document.querySelectorAll('.brand-filter.active').forEach(f => f.classList.remove('active'));
    
    // Активируем "Все"
    document.querySelectorAll('.brand-filter').forEach(f => {
        if (f.textContent === "Все" || f.textContent === "Все смартфоны" || 
            f.textContent === "Все ноутбуки" || f.textContent === "Все микроволновки" ||
            f.textContent === "Все холодильники" || f.textContent === "Все посудомойки" ||
            f.textContent === "Все кофемашины" || f.textContent === "Все пылесосы" ||
            f.textContent === "Все стиральные машины" || f.textContent === "Все наушники" ||
            f.textContent === "Все планшеты" || f.textContent === "Все аэрогрили") {
            f.classList.add('active');
        }
    });
    
    // Сбрасываем сортировку
    document.querySelectorAll('.sort-filter.active').forEach(f => f.classList.remove('active'));
    const defaultSort = document.querySelector('.sort-filter[data-sort="default"]');
    if (defaultSort) defaultSort.classList.add('active');
    
    // Сбрасываем чипы памяти
    document.querySelectorAll('.product-memory-chip.active').forEach(chip => chip.classList.remove('active'));
    
    console.log('Состояние приложения успешно сброшено');
}
// --- ТОВАРЫ С РАСШИРЕННЫМ КАТАЛОГОМ ---
const products = {
    tvs: [
        // Samsung (10 моделей)
        // Samsung (модели из файла)
        { id: 125, name: "Телевизор Samsung UE43U8000FUXRU 43\" 4K UHD", price: 2049.00, brand: "Samsung", image: "images/3415824cfb048516776165ae743ef31e.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 126, name: "Телевизор Samsung QE65Q6FAAUXRU 65\" 4K UHD", price: 3599.00, brand: "Samsung", image: "images/720ef9da8cfa7d388e89aa92c789cb21.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Dual LED." },
        { id: 127, name: "Телевизор Samsung QE55Q6FAAUXRU 55\" 4K UHD", price: 2899.00, brand: "Samsung", image: "images/152433b82ebc7c3bd2cec8d2568182bc.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Dual LED." },
        { id: 128, name: "Телевизор Samsung UE50U8000FUXRU 50\" 4K UHD", price: 2499.00, brand: "Samsung", image: "images/12a183db2f6e1e736b4c966be6f17686.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160)." },
        { id: 129, name: "Телевизор Samsung QE55Q7FAAUXRU 55\" 4K UHD", price: 3699.00, brand: "Samsung", image: "images/3c9c5bfcac437c33c3a43c54e59cdf05.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Edge LED." },
        { id: 130, name: "Телевизор Samsung UE65U8000FUXRU 65\" 4K UHD", price: 3399.00, brand: "Samsung", image: "images/26807364fdc4f11d1c99d4a95e90cec2.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160)." },
        { id: 131, name: "Телевизор Samsung UE32F6000FUXRU 32\" Full HD", price: 1899.00, brand: "Samsung", image: "images/fcd410766b607bfe41fc8600cc5e4d59.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Tizen. Разрешение: Full HD (1920x1080). Тип подсветки: LED." },
        { id: 132, name: "Телевизор Samsung QE55QN70FAUXRU 55\" 4K UHD", price: 4999.00, brand: "Samsung", image: "images/71e527815821430fdf7e5052008a6711.avif", desc: "Тип экрана: Neo QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160)." },
        { id: 133, name: "Телевизор Samsung QE55S90FAUXRU 55\" 4K UHD", price: 6999.00, brand: "Samsung", image: "images/efaa9430687749a0fde606dd33adf4e4.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: OLED." },
        { id: 134, name: "Телевизор Samsung QE55Q8FAAUXRU 55\" 4K UHD", price: 4299.00, brand: "Samsung", image: "images/8d30044ac828ec9fd1a685dd7c988592.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Dual LED." },
        { id: 135, name: "Телевизор Samsung QE50QN80FAUXRU 50\" 4K UHD", price: 5399.00, brand: "Samsung", image: "images/8b5f33aae1434f3a3752d8253e71982b.avif", desc: "Тип экрана: Neo QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 136, name: "Телевизор Samsung QE65QN70FAUXRU 65\" 4K UHD", price: 6299.00, brand: "Samsung", image: "images/1e16333fa287b420793599e54787f463.avif", desc: "Тип экрана: Neo QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 137, name: "Телевизор Samsung QE65Q7FAAUXRU 65\" 4K UHD", price: 4599.00, brand: "Samsung", image: "images/b1a4995fb89938c94cfed4378bebb10e.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Edge LED." },
        { id: 138, name: "Телевизор Samsung QE50Q7FAAUXRU 50\" 4K UHD", price: 3299.00, brand: "Samsung", image: "images/b1a4995fb89938c94cfed4378bebb10e.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Edge LED." },
        { id: 139, name: "Телевизор Samsung UE75DU8000UXRU 75\" 4K UHD", price: 4595.00, brand: "Samsung", image: "images/f07fc0ea5781aa832d858f93eff690bd.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Edge LED." },
        { id: 140, name: "Телевизор Samsung QE55Q7F5AUXRU 55\" 4K UHD", price: 3799.00, brand: "Samsung", image: "images/45c79c646fac74c9b8071dde14a385dd.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Edge LED." },
        { id: 141, name: "Телевизор Samsung QE75QN70FAUXRU 75\" 4K UHD", price: 8599.00, brand: "Samsung", image: "images/9a60233d53e75630db231c84da1aadcc.avif", desc: "Тип экрана: Neo QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 142, name: "Телевизор Samsung QE65S85FAEXRU 65\" 4K UHD", price: 7999.00, brand: "Samsung", image: "images/645e600a464a4cd7a29552bda909609b.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: OLED." },
        { id: 143, name: "Телевизор Samsung QE55QN80FAUXRU 55\" 4K UHD", price: 4807.00, brand: "Samsung", image: "images/9d6603a2ba359b6814f9bdfe1a49f4a8.avif", desc: "Тип экрана: Neo QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 144, name: "Телевизор Samsung UE32H5000FUXRU 32\" HD", price: 1963.00, brand: "Samsung", image: "images/9fcf8fa3d0f37112b2e5b66054605070.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Tizen. Разрешение: HD (1366x768). Тип подсветки: LED." },
        { id: 145, name: "Телевизор Samsung QE55S85FAEXRU 55\" 4K UHD", price: 6399.00, brand: "Samsung", image: "images/dd62beadc49cc1e9c0c70306da64d625.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: OLED." },
        { id: 146, name: "Телевизор Samsung QE50QN90DAUXRU 50\" 4K UHD", price: 5395.00, brand: "Samsung", image: "images/b003f04d727d8a9bc8b881da7354c510.avif", desc: "Тип экрана: Neo QLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 147, name: "Телевизор Samsung QE48S90FAEXRU 48\" 4K UHD", price: 6699.00, brand: "Samsung", image: "images/2531359de99eb969f7a8dcb138253c77.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160)." },
        { id: 148, name: "Телевизор Samsung QE77S90FAEXRU 77\" 4K UHD", price: 14599.00, brand: "Samsung", image: "images/5ed53ce65379e9f3bbd4f5d64ad90eec.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: Tizen. Разрешение: Ultra HD 4K (3840x2160)." },

        //KIVI
        // KIVI (10 моделей с реальными названиями, ценами и фотографиями)
        // KIVI (модели из файла)
        { id: 149, name: "Телевизор KIVI M55UD75B 55\" 4K UHD", price: 2599.00, brand: "KIVI", image: "images/2a909d8af356b44a8798386baec1fb64.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 150, name: "Телевизор KIVI 32H750NB 32\" HD", price: 1598.00, brand: "KIVI", image: "images/249b5d70dc4f386027946d87b4624cc3.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: HD (1366x768). Тип подсветки: Direct LED." },
        { id: 151, name: "Телевизор KIVI K65UD60B 65\" 4K UHD", price: 2799.00, brand: "KIVI", image: "images/d570aa53068320df8bf40acfb7cdaa99.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 152, name: "Телевизор KIVI Kids TV 32 32\" Full HD", price: 1599.00, brand: "KIVI", image: "images/621da698c670a84223bdeab126ff03be.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 153, name: "Телевизор KIVI K43FD60B 43\" Full HD", price: 1799.00, brand: "KIVI", image: "images/3b845dcc0c7be4618e650d595530bc72.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 154, name: "Телевизор KIVI 24H750NW 24\" HD", price: 1558.00, brand: "KIVI", image: "images/31217094b6911953093a530b049adc6a.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: HD (1366x768). Тип подсветки: Direct LED." },
        { id: 155, name: "Телевизор KIVI K32HD60B 32\" HD", price: 1599.00, brand: "KIVI", image: "images/f562c1721a24c9c26b32b1a14d4cbc2a.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: HD (1366x768). Тип подсветки: Direct LED." },
        { id: 156, name: "Телевизор KIVI M43UD70B 43\" 4K UHD", price: 1998.00, brand: "KIVI", image: "images/f8946edabc00a49d304468093a7f9658.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 157, name: "Телевизор KIVI M50UD70B 50\" 4K UHD", price: 2199.00, brand: "KIVI", image: "images/fa8cb4706de363fe7fa0c06f44ac1f96.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 158, name: "Телевизор KIVI M55UD70B 55\" 4K UHD", price: 2689.00, brand: "KIVI", image: "images/69088c1518e2df4f1f854a7f08bf1108.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 159, name: "Телевизор KIVI K50UD60B 50\" 4K UHD", price: 1999.00, brand: "KIVI", image: "images/c6de3d9c12774cbe57c1af7b5902cc73.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 160, name: "Телевизор KIVI K43UD60B 43\" 4K UHD", price: 1934.00, brand: "KIVI", image: "images/ef529d1f9bb8dad5e17431ec1bb9e8a9.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 161, name: "Телевизор KIVI M75UD70B 75\" 4K UHD", price: 3499.00, brand: "KIVI", image: "images/d401d8afb03c35094df91965dc9afa84.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 162, name: "Телевизор KIVI 43U750NB 43\" 4K UHD", price: 1998.00, brand: "KIVI", image: "images/407ac3b3d24d75f005bb61d4319403fc.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 163, name: "Телевизор KIVI M32HD70B 32\" HD", price: 1679.00, brand: "KIVI", image: "images/b257f55a95005a6b63d0a8e8d1a14582.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: HD (1366x768). Тип подсветки: Direct LED." },
        { id: 164, name: "Телевизор KIVI M55UD70W 55\" 4K UHD", price: 2759.00, brand: "KIVI", image: "images/25fb7a8b078b2070a153d585ae3bd839.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 165, name: "Телевизор KIVI 24H750NB 24\" HD", price: 1498.00, brand: "KIVI", image: "images/93b093eeea71dd5b02b139466fc7ee20.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: HD (1366x768). Тип подсветки: Direct LED." },
        { id: 166, name: "Телевизор KIVI 55U750NB 55\" 4K UHD", price: 2499.00, brand: "KIVI", image: "images/ca327b71e5d4546ea2eedf232754bd40.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 167, name: "Телевизор KIVI M65UD70B 65\" 4K UHD", price: 2599.00, brand: "KIVI", image: "images/bebbd2fa1bcd3cc8cc5ab0f78ade0011.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 168, name: "Телевизор KIVI M32FD70B 32\" Full HD", price: 1738.00, brand: "KIVI", image: "images/bebbd2fa1bcd3cc8cc5ab0f78ade0011.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 169, name: "Телевизор KIVI M40FD70B 40\" Full HD", price: 1726.96, brand: "KIVI", image: "images/779882e066b43581dff11ace5c45f31e.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 170, name: "Телевизор KIVI 50U750NB 50\" 4K UHD", price: 2349.00, brand: "KIVI", image: "images/9dd83280ceaa47a2af8722ccf46f4319.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 171, name: "Телевизор KIVI 32F750NB 32\" Full HD", price: 1600.00, brand: "KIVI", image: "images/15efcf8b60617060025c9dd2b02878bc.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 172, name: "Телевизор KIVI 43F750NB 43\" Full HD", price: 1788.00, brand: "KIVI", image: "images/ac638a7c9dedea8d97265e5a4b1bd525.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        // LG (10 моделей)
    

       // LG (модели из файла)
       // LG (модели из файла)
      // LG (модели из файла)
        { id: 101, name: "Телевизор LG 32LQ63506LA 32\" Full HD", price: 1899.00, brand: "LG", image: "images/a5a1c79b11dc90afe9c5f388b2f681cd.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: WebOS. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 102, name: "Телевизор LG 50NANO80A6B 50\" 4K UHD", price: 2899.00, brand: "LG", image: "images/d163d9fca63d1fc9fed7e37d23aff4a1.avif", desc: "Тип экрана: NanoCell. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 103, name: "Телевизор LG 55NANO80A6B 55\" 4K UHD", price: 3199.00, brand: "LG", image: "images/917e06ede285e846270375da73634219.avif", desc: "Тип экрана: NanoCell. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 104, name: "Телевизор LG 50UA73006LA 50\" 4K UHD", price: 2599.00, brand: "LG", image: "images/38820be8500b2309bd7ca4bc680c5004.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 105, name: "Телевизор LG 65QNED86A6A 65\" 4K UHD", price: 5899.00, brand: "LG", image: "images/2e745fbee63e79b65031a506f5aff16d.avif", desc: "Тип экрана: QNED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 106, name: "Телевизор LG 32LQ63006LA 32\" Full HD", price: 1869.00, brand: "LG", image: "images/13375cf3a04f2869fb199e7d72c6ba67.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: WebOS. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 107, name: "Телевизор LG 65NANO80A6B 65\" 4K UHD", price: 3899.00, brand: "LG", image: "images/99f945dcc145966444136e17d3b03e29.avif", desc: "Тип экрана: NanoCell. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 108, name: "Телевизор LG 55QNED80A6A 55\" 4K UHD", price: 3699.00, brand: "LG", image: "images/e97b4640c1817a0359f24d9221b80ca7.avif", desc: "Тип экрана: QNED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Edge LED." },
        { id: 109, name: "Телевизор LG 65UA73006LA 65\" 4K UHD", price: 3499.00, brand: "LG", image: "images/3d82741a78f767836a93fb459781280a.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 110, name: "Телевизор LG OLED65G5RLA 65\" 4K UHD", price: 9999.00, brand: "LG", image: "images/78c916678cf8af42010b43707e96dac0.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: OLED." },
        { id: 111, name: "Телевизор LG 43QNED80A6A 43\" 4K UHD", price: 2849.00, brand: "LG", image: "images/6ef4cf5f72d273f92b6d2379a1bb46f1.avif", desc: "Тип экрана: QNED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Edge LED." },
        { id: 112, name: "Телевизор LG 50QNED80A6A 50\" 4K UHD", price: 3099.00, brand: "LG", image: "images/ee8315b6ef4b731fff4a2f48ae04994e.avif", desc: "Тип экрана: QNED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Edge LED." },
        { id: 113, name: "Телевизор LG OLED55C5RLA 55\" 4K UHD", price: 6499.00, brand: "LG", image: "images/7770ca71e7b11938d1c0abf231a7201a.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: OLED." },
        { id: 114, name: "Телевизор LG OLED48C5RLA 48\" 4K UHD", price: 5699.00, brand: "LG", image: "images/6aab43bc7f1262a9ee599dd104e57075.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: OLED." },
        { id: 115, name: "Телевизор LG 65QNED80A6A 65\" 4K UHD", price: 3999.00, brand: "LG", image: "images/647907721fe2d9301c1ba8abe044ca2d.avif", desc: "Тип экрана: QNED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Edge LED." },
        { id: 116, name: "Телевизор LG 24TQ520S-PZ 23.6\" HD", price: 1799.00, brand: "LG", image: "images/59cc9c80bb318508028db44541ea4543.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: WebOS. Разрешение: HD (1366x768). Тип подсветки: Edge LED." },
        { id: 117, name: "Телевизор LG 55QNED86A6A 55\" 4K UHD", price: 4699.00, brand: "LG", image: "images/db69093f02ec017460d025bff29ce850.avif", desc: "Тип экрана: QNED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 118, name: "Телевизор LG OLED65C5RLA 65\" 4K UHD", price: 8999.00, brand: "LG", image: "images/7b2b15269e369646bad875e5ade4e3f0.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: OLED." },
        { id: 119, name: "Телевизор LG OLED42C5RLA 42\" 4K UHD", price: 4899.00, brand: "LG", image: "images/1be8d420fb8db714d396d9050733fa4d.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: OLED." },
        { id: 120, name: "Телевизор LG OLED42C4RLA 42\" 4K UHD", price: 3999.00, brand: "LG", image: "images/efd197a1aa4a13525101293753f6a44f.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: OLED." },
        { id: 121, name: "Телевизор LG 43UT80006LA 43\" 4K UHD", price: 2099.00, brand: "LG", image: "images/24334cbfbb89d7a36d290634c99eeb0a.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 122, name: "Телевизор LG 55UT80006LA 55\" 4K UHD", price: 2599.00, brand: "LG", image: "images/a9e824da2e6384aa18110fe753201d0d.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 123, name: "Телевизор LG 32LQ63806LC 32\" Full HD", price: 1899.00, brand: "LG", image: "images/831c4f700ff0a73445f596e91b0bd767.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: WebOS. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 124, name: "Телевизор LG 100QNED86A6 100\" 4K UHD", price: 20999.00, brand: "LG", image: "images/2722d5b8db76244c838a5dfb58f29daa.avif", desc: "Тип экрана: QNED. Smart TV: Да. Операционная система: WebOS. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
       
       
        // Xiaomi (10 моделей)
        // Xiaomi (модели из файла)
        { id: 173, name: "Телевизор Xiaomi TV A Pro 43\" 2026 4K UHD", price: 2055.00, brand: "Xiaomi", image: "images/23d217abb44e6481d0c935e9b4fd7cf3.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 174, name: "Телевизор Xiaomi TV A 43\" FHD 2026", price: 1889.00, brand: "Xiaomi", image: "images/1479c7ce14f484d37bc8cce15fd2bdda.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 175, name: "Телевизор Xiaomi TV A Pro 32\" 2026 HD", price: 1645.00, brand: "Xiaomi", image: "images/10898c075ade7ebc4c163e2ec0e94cca.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Android TV. Разрешение: HD (1366x768). Тип подсветки: Direct LED." },
        { id: 176, name: "Телевизор Xiaomi TV S Pro Mini LED 65\" 2026 4K UHD", price: 4149.00, brand: "Xiaomi", image: "images/669be46d11d8589610a03ab19fcd2e13.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 177, name: "Телевизор Xiaomi TV S Pro Mini LED 55\" 2026 4K UHD", price: 3299.00, brand: "Xiaomi", image: "images/bf60b73f3d1386b77498fad2d61749f0.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 178, name: "Телевизор Xiaomi TV A 32\" 2026 HD", price: 1625.00, brand: "Xiaomi", image: "images/6dc8b2d32be67df153d4e5a38655f613.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Google TV. Разрешение: HD (1366x768). Тип подсветки: Direct LED." },
        { id: 179, name: "Телевизор Xiaomi TV A Pro 55\" 2026 4K UHD", price: 2699.00, brand: "Xiaomi", image: "images/936359bf85f5febe69776c2a8138b6fe.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 180, name: "Телевизор Xiaomi TV S Pro Mini LED 75\" 2026 4K UHD", price: 4999.00, brand: "Xiaomi", image: "images/4c48d004737f3dff7539c04b88f9185a.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 182, name: "Телевизор Xiaomi TV A 50\" 2026 4K UHD", price: 2379.00, brand: "Xiaomi", image: "images/a34c24aaf38982e3f39c31035e0637aa.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 181, name: "Телевизор Xiaomi TV A Pro 50\" 2026 4K UHD", price: 2459.00, brand: "Xiaomi", image: "images/a34c24aaf38982e3f39c31035e0637aa (1).avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 182, name: "Телевизор Xiaomi TV A 50\" 2026 4K UHD", price: 2379.00, brand: "Xiaomi", image: "images/a4b766c4e1e24b5e87d6431ead0c6e7b.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 183, name: "Телевизор Xiaomi TV A 55\" 2026 4K UHD", price: 2599.00, brand: "Xiaomi", image: "images/14b76faed2d525d3ee43998d85ef0fc7.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },

       
        // TCL (10 моделей)
        // TCL (модели из файла)
        { id: 184, name: "Телевизор TCL 55P69K 55\" 4K UHD", price: 2299.00, brand: "TCL", image: "images/97215279a9f3a8b86e691866db09ae60.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 185, name: "Телевизор TCL 32S59K 32\" Full HD", price: 1649.00, brand: "TCL", image: "images/567d098d96e250d041c10e0c45e677fe.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Full HD (1920x1080). Тип подсветки: LED." },
        { id: 186, name: "Телевизор TCL 65MQLED75K 65\" 4K UHD", price: 4635.00, brand: "TCL", image: "images/bbaffa299baa3c191268bdaca96b5691.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 187, name: "Телевизор TCL 43QLED780K 43\" 4K UHD", price: 2155.00, brand: "TCL", image: "images/3b531fd9db62764b10141972ad039b38.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 188, name: "Телевизор TCL 55QLED780K 55\" 4K UHD", price: 2999.00, brand: "TCL", image: "images/9cab3606d2081212e4bb3d6708567362.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 189, name: "Телевизор TCL 55MQLED75K 55\" 4K UHD", price: 3899.00, brand: "TCL", image: "images/12536802dc15080b21829f4e1bb78c1f.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 190, name: "Телевизор TCL 65MQLED85K 65\" 4K UHD", price: 5499.00, brand: "TCL", image: "images/9403022fb772e15c35b1ef1661f4ac51.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 191, name: "Телевизор TCL 50QLED780K 50\" 4K UHD", price: 2699.00, brand: "TCL", image: "images/698ee536dff3773618fd85ee06900bfb.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 192, name: "Телевизор TCL 50MQLED70K 50\" 4K UHD", price: 2980.00, brand: "TCL", image: "images/5d00d075acbd5528bdf8e1feb3f72e45.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 193, name: "Телевизор TCL 65C89K 65\" 4K UHD", price: 6999.00, brand: "TCL", image: "images/d86110be77142f008d5ba3d025e3de36.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 194, name: "Телевизор TCL 65QLED780K 65\" 4K UHD", price: 3699.00, brand: "TCL", image: "images/8abd6d4d0fb780f1bbea05a6b1f89ed8.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 195, name: "Телевизор TCL 75QLED780K 75\" 4K UHD", price: 5399.00, brand: "TCL", image: "images/0658899e030eac10288d1c8a203f3e03.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 196, name: "Телевизор TCL 75MQLED70K 75\" 4K UHD", price: 6699.00, brand: "TCL", image: "images/816c237667f073eaf04028bc3ccbee5a.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 197, name: "Телевизор TCL 65P79B 65\" 4K UHD", price: 3299.00, brand: "TCL", image: "images/64f16582a34b97dbfd4d605753885fa4.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 198, name: "Телевизор TCL 55MQLED70K 55\" 4K UHD", price: 3799.00, brand: "TCL", image: "images/54ab39c3efb4c14fca835bb45840226b.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 199, name: "Телевизор TCL 65MQLED70K 65\" 4K UHD", price: 4299.00, brand: "TCL", image: "images/1861855573e55d8c2ec9a9cd4fc34caf.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 200, name: "Телевизор TCL 55MQLED80 55\" 4K UHD", price: 4399.00, brand: "TCL", image: "images/21e8b839ab156bea6a2e4f15f263b8f2.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 201, name: "Телевизор TCL 55MQLED85K 55\" 4K UHD", price: 4899.00, brand: "TCL", image: "images/21e8b839ab156bea6a2e4f15f263b8f2.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 202, name: "Телевизор TCL 40S59K 40\" Full HD", price: 1832.00, brand: "TCL", image: "images/0fd94b0687d6e6d2b5185be2dbceb08b.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Full HD (1920x1080). Тип подсветки: LED." },
        { id: 203, name: "Телевизор TCL 98MQLED75K 98\" 4K UHD", price: 10599.00, brand: "TCL", image: "images/0fd94b0687d6e6d2b5185be2dbceb08b.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 204, name: "Телевизор TCL 43QLED780 43\" 4K UHD", price: 2399.00, brand: "TCL", image: "images/2a5573ea83c8c65795971a3978348f72.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 205, name: "Телевизор TCL 75MQLED80 75\" 4K UHD", price: 6899.00, brand: "TCL", image: "images/9cffa2cb0e33ed6c752e889eb4eb1be1.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 206, name: "Телевизор TCL 65MQLED80 65\" 4K UHD", price: 5208.00, brand: "TCL", image: "images/9984023571dc64d5b89d473f9057f82e.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 207, name: "Телевизор TCL 65QLED780 65\" 4K UHD", price: 3599.00, brand: "TCL", image: "images/2f0e3782f8ca098f70e615f62ced92c3.avif", desc: "Тип экрана: QLED. Smart TV: Да. Операционная система: Google TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },

        // Haier (10 моделей)
       // HAIER (модели из файла)
        { id: 208, name: "Телевизор Haier 50 LED S2 50\" 4K UHD", price: 2499.00, brand: "HAIER", image: "images/38a645202ca503a16db0f5fccf7585f9 (1).avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 209, name: "Телевизор Haier 32 Smart TV S2 Pro 32\" Full HD", price: 1745.00, brand: "HAIER", image: "images/e15282e0179d9ba233f7dd14ba1f881d.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 210, name: "Телевизор Haier 55 MiniLED M4 55\" 4K UHD", price: 3199.00, brand: "HAIER", image: "images/4a86b36925af3c3947f870b7d78ccb22.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 211, name: "Телевизор Haier 32 LED S2 32\" Full HD", price: 1649.00, brand: "HAIER", image: "images/b5ad0a66fe43c0e7d6b61e89045b8b64.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Full HD (1920x1080). Тип подсветки: Direct LED." },
        { id: 212, name: "Телевизор Haier 50 Smart TV S2 Pro 50\" 4K UHD", price: 2499.00, brand: "HAIER", image: "images/b150d3da05c151aed92284ca52750c8d.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 213, name: "Телевизор Haier 43 HQLED S2 Pro 43\" 4K UHD", price: 1949.00, brand: "HAIER", image: "images/72f659432d428317fb43a1857c85751f.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 214, name: "Телевизор Haier 65 MiniLED M4 65\" 4K UHD", price: 3699.00, brand: "HAIER", image: "images/0a6834fed6db7d595fb5b606b34d3ff6.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 215, name: "Телевизор Haier 55 Smart TV S2 Pro 55\" 4K UHD", price: 2899.00, brand: "HAIER", image: "images/f2990533306900fa1e7e1ad484a8b31f.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 216, name: "Телевизор Haier 43 Smart TV S4 43\" 4K UHD", price: 2179.00, brand: "HAIER", image: "images/43ea9b4facc3bcdc91bbfda6e6922962.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 217, name: "Телевизор Haier 55 LED H1 55\" 4K UHD", price: 2499.00, brand: "HAIER", image: "images/ae640ce3341f5daabba41b132275378e.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 218, name: "Телевизор Haier 50 LED H1 50\" 4K UHD", price: 2249.00, brand: "HAIER", image: "images/78819968fb2cc2d7b7077902c9969eb4.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 219, name: "Телевизор Haier 85 MiniLED M4 85\" 4K UHD", price: 6199.00, brand: "HAIER", image: "images/3fb585eb57a1a18c5c8275a6ba3d8c21.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 220, name: "Телевизор Haier 65 MiniLED M7 65\" 4K UHD", price: 4999.00, brand: "HAIER", image: "images/b826b5526694913ec62f7ce4dcd2ecd2.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 221, name: "Телевизор Haier 55 Smart TV S6 55\" 4K UHD", price: 3799.00, brand: "HAIER", image: "images/f5f7842fb7e9580dd0130119f384f7d9.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 222, name: "Телевизор Haier 65 Smart TV S2 Pro 65\" 4K UHD", price: 3599.00, brand: "HAIER", image: "images/a1d077bd13a37468daaa7ac92d6335ee.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 223, name: "Телевизор Haier 65 Smart TV S6 65\" 4K UHD", price: 4499.00, brand: "HAIER", image: "images/be611d5d216f17af97c2f3e028076ecd.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 224, name: "Телевизор Haier 43 LED S2 43\" 4K UHD", price: 2119.00, brand: "HAIER", image: "images/43356f698ec61b8707c6f3480a4a7011.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 225, name: "Телевизор Haier 43 Smart TV S2 43\" 4K UHD", price: 2119.00, brand: "HAIER", image: "images/4d91693c0a5abd97a199248ed5b44539.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 226, name: "Телевизор Haier 65 Mini LED 65\" 4K UHD", price: 5599.00, brand: "HAIER", image: "images/938c75bbf085bef3472da81ef33ca1d8.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 227, name: "Телевизор Haier 43 LED H1 43\" 4K UHD", price: 1987.00, brand: "HAIER", image: "images/afe934c1b0ed9b623b0bb7189e1d8009.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },
        { id: 228, name: "Телевизор Haier 77 OLED S9 Pro 77\" 4K UHD", price: 14999.00, brand: "HAIER", image: "images/7382fc99ab898e51833181d6af0a2be9.avif", desc: "Тип экрана: OLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: OLED." },
        { id: 229, name: "Телевизор Haier 32 LED H1 32\" HD", price: 1649.00, brand: "HAIER", image: "images/5a9ce6a4e7e3415f1566bb356fad15e8.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: HD (1366x768). Тип подсветки: Direct LED." },
        { id: 230, name: "Телевизор Haier 65 Mini LED Pro 65\" 4K UHD", price: 5799.00, brand: "HAIER", image: "images/5a9ce6a4e7e3415f1566bb356fad15e8.avif", desc: "Тип экрана: HQLED. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Mini LED." },
        { id: 231, name: "Телевизор Haier 55 Smart TV S2 55\" 4K UHD", price: 2810.00, brand: "HAIER", image: "images/cca1bfb313b5e3047a16c774a990a7c1.avif", desc: "Тип экрана: LCD. Smart TV: Да. Операционная система: Android TV. Разрешение: Ultra HD 4K (3840x2160). Тип подсветки: Direct LED." },

        
    ],


    // --- РАСШИРЕННЫЙ КАТАЛОГ СМАРТФОНОВ (ПО 10 МОДЕЛЕЙ НА БРЕНД) ---
    phones: [
        // === APPLE iPhone (10 МОДЕЛЕЙ) ===
        // iPhone 17 Pro Max (3 цвета)
 // === APPLE iPhone (ПОЛНАЯ ЛИНЕЙКА 2024-2026) ===

  // === iPhone 17 Pro Max (флагман 2026) ===
    {
        id: 1001,
        name: "Смартфон Apple iPhone 17 Pro Max 256GB (Silver)",
        brand: "iPhone",
        image: "https://static.a1.by/smartphones/Apple_iPhone_17_Pro_Max_256_Silver_1028295/ecf7498d-bbb8-44ee-a622-eddaddbdc6d2.webp",
        desc: "Флагман 2026. Чип A19 Pro (12 ГБ RAM), 6.9-дюймовый дисплей 120 Гц, тройная камера 48 МП с 8x оптическим зумом, корпус из алюминия unibody, система охлаждения Vapor Chamber, аккумулятор 4823 мАч, iOS 26, Apple Intelligence.",
        memoryOptions: [
            { size: "256GB", price: 6500, color: "Silver" },
            { size: "512GB", price: 7200 , color: "Silver" },
            { size: "1TB", price: 7800 , color: "Silver" }
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1002,
        name: "Смартфон Apple iPhone 17 Pro Max 256GB (Deep Blue)",
        brand: "iPhone",
        image: "https://images.5element.by/resize/f87/f879fe41ac6e3927c9854ec0d222abd9/600_600_1/0e3fb7b589d16ce54dea852010eac968.jpg",
        desc: "Флагман 2026. Чип A19 Pro (12 ГБ RAM), 6.9-дюймовый дисплей 120 Гц, тройная камера 48 МП с 8x оптическим зумом, корпус из алюминия unibody, система охлаждения Vapor Chamber, аккумулятор 4823 мАч, iOS 26, Apple Intelligence.",
        memoryOptions: [
            { size: "256GB", price: 6470 , color: "Deep Blue" },
            { size: "512GB", price: 7170 , color: "Deep Blue" },
            { size: "1TB", price: 7770 , color: "Deep Blue" }
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1003,
        name: "Смартфон Apple iPhone 17 Pro Max 256GB (Cosmic Orange)",
        brand: "iPhone",
        image: "https://static.a1.by/smartphones/Apple_iPhone_17_Pro_Max_256_Orange_1028298/c85040c3-6a50-4b13-b4f5-d9a2233eba9a.webp",
        desc: "Флагман 2026. Чип A19 Pro (12 ГБ RAM), 6.9-дюймовый дисплей 120 Гц, тройная камера 48 МП с 8x оптическим зумом, корпус из алюминия unibody, система охлаждения Vapor Chamber, аккумулятор 4823 мАч, iOS 26, Apple Intelligence.",
        memoryOptions: [
            { size: "256GB", price: 6450, color: "Cosmic Orange" },
            { size: "512GB", price: 7150, color: "Cosmic Orange" },
            { size: "1TB", price: 7750, color: "Cosmic Orange" }
        ],
        defaultMemory: "256GB"
    },

    // === iPhone 17 Pro (флагман 2026, меньший размер) ===
    {
        id: 1004,
        name: "Смартфон Apple iPhone 17 Pro 256GB (темно-синий)",
        brand: "iPhone",
        image: "https://shop.mts.by/upload/resize_cache/webp/iblock/ad3/823tmkf3k7ogpnz2bw445pua49sh6huo/270_520_1/iPhone-17-Pro-Max-blue-1.webp",
        desc: "Чип A19 Pro, 6.3-дюймовый дисплей Super Retina XDR 120 Гц, тройная камера 48 МП, титановый корпус, iOS 26.",
        memoryOptions: [
            { size: "256GB", price: 5750 , color: "Titanium Black" },
            { size: "512GB", price: 6350, color: "Titanium Black" },
            { size: "1TB", price: 7050, color: "Titanium Black" }
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1005,
        name: "Смартфон Apple iPhone 17 Pro 256GB (серый)",
        brand: "iPhone",
        image: "https://shop.mts.by/upload/resize_cache/webp/iblock/b5b/sq1lpfy5krn595bsw33rb7wgmkn9kezv/270_520_1/iPhone-17-Pro-Max-silver-1.webp",
        desc: "Чип A19 Pro, 6.3-дюймовый дисплей Super Retina XDR 120 Гц, тройная камера 48 МП, титановый корпус, iOS 26.",
        memoryOptions: [
            { size: "256GB", price: 5700 , color: "Natural Titanium" },
            { size: "512GB", price: 6300 , color: "Natural Titanium" },
            { size: "1TB", price: 6999, color: "Natural Titanium" }
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1006,
        name: "Смартфон Apple iPhone 17 Pro 256GB (оранжевый)",
        brand: "iPhone",
        image: "https://shop.mts.by/upload/resize_cache/webp/iblock/3e9/h12ajx1cc9moxiw0ee56rex4lm44wsvu/270_520_1/iPhone-17-Pro-orange-1.webp",
        desc: "Чип A19 Pro, 6.3-дюймовый дисплей Super Retina XDR 120 Гц, тройная камера 48 МП, титановый корпус, iOS 26.",
        memoryOptions: [
            { size: "256GB", price:  5640, color: "Desert Titanium" },
            { size: "512GB", price: 6240 , color: "Desert Titanium" },
            { size: "1TB", price: 6939 , color: "Desert Titanium" }
        ],
        defaultMemory: "256GB"
    },


    // === iPhone 17 (базовая модель 2026) ===

    {
        id: 1008,
        name: "Смартфон Apple iPhone 17 128GB (Sage)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-finish-select-202509-sage_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=90&.v=WGdCRlQ0YVlqbTdXTEkxRnVQb0oxZ3VBTlNROXF1MzBwZUoyNEVtMWw3aEtLUmpmVEZhTFpRYkxNWDZBb1R3dGd2S3NaRzcrU0dmYjNHTUFiMnlsWFUxSlgrVWMrMzU1OXo2c2JyNjJZTGcvWXoydVhtUUJyekgyU21tRjFxUUM&traceId=1",
        desc: "Чип A19, 6.1-дюймовый дисплей Super Retina XDR, двойная камера 48 МП, аккумулятор 3870 мАч, iOS 26.",
        memoryOptions: [
            { size: "256GB", price: 3900 , color: "Starlight" },
            { size: "512GB", price: 4800 , color: "Starlight" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1009,
        name: "Смартфон Apple iPhone 17 128GB (Blue)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-finish-select-202509-mistblue_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=90&.v=WGdCRlQ0YVlqbTdXTEkxRnVQb0oxcFYyWWhPSUg0YytZdmJ2dmY4d09xckN0VFdyaFlNakY5MGMxMWhINEhMWmxjZnhHRHJyenVmME5KTm9Sd1ZaU3NqbWRhTGpRM2xxVWJRWUhSaDlCQ3JHYmE3Q0tucGdwdjhDQ1JZbjRxQXRka0xmckVNVTBkS20yTzkwa0dhU09n&traceId=1",
        desc: "Чип A19, 6.1-дюймовый дисплей Super Retina XDR, двойная камера 48 МП, аккумулятор 3870 мАч, iOS 26.",
        memoryOptions: [
            { size: "256GB", price: 3860, color: "Blue" },
            { size: "512GB", price: 4760, color: "Blue" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1010,
        name: "Смартфон Apple iPhone 17 128GB (Pink)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-finish-unselect-gallery-2-202509_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=90&.v=WGdCRlQ0YVlqbTdXTEkxRnVQb0oxdFgrSXpWVEhWaW9YTGlWRHFoSHU0L0hjYzcwVTh6bFdGNjBORUNFZExDN0FOL1haWCt6TDJ0UWlLb09XajVNdENYR1ZZZnEyMVlVQUliTThGMjNyaFFjaE5Ma1FxV0FmWVdKcWNtSkIrcnJaRkEweU5DMHdUaEdXcnlYQU5Yc0V3&traceId=1",
        desc: "Чип A19, 6.1-дюймовый дисплей Super Retina XDR, двойная камера 48 МП, аккумулятор 3870 мАч, iOS 26.",
        memoryOptions: [
            { size: "256GB", price: 3900 , color: "Pink" },
            { size: "512GB", price: 4800 , color: "Pink" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 17 Plus (2026) ===
    {
        id: 1011,
        name: "Смартфон Apple iPhone 17 Air 128GB (LightGold)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-202509-lightgold?wid=5120&hei=2880&fmt=webp&qlt=90&.v=NUpaQVl1bitSNmJWZUdKdi9QZHhsQnMyOXpiUEVyWXc0UFVFMUg1R1ZtcGFDdFMvVG1KZ1loaks5VzlLRGZIZkpFd0xhWDVibStLdGRYRmxkNGI4VTR2UjRaSC9URTlmd0FSb1ZTWjRnb3NmclJJZnl5SmNFYUJGS2w3dHkrT2M&traceId=1",
        desc: "Чип A19, 6.7-дюймовый дисплей Super Retina XDR, двойная камера 48 МП, большой аккумулятор 4323 мАч, iOS 26.",
        memoryOptions: [
            { size: "256GB", price: 4300 , color: "LightGold" },
            { size: "512GB", price: 4700 , color: "LightGold" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1012,
        name: "Смартфон Apple iPhone 17 Air 128GB (Black)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-202509-spaceblack?wid=5120&hei=2880&fmt=webp&qlt=90&.v=NUpaQVl1bitSNmJWZUdKdi9QZHhsQnMyOXpiUEVyWXc0UFVFMUg1R1Ztcit0SFUxZzlOYjFnK2g1TG9hVnNYcmd2S3NaRzcrU0dmYjNHTUFiMnlsWFUxSlgrVWMrMzU1OXo2c2JyNjJZTGlaMVdFU2dmejhESzZKZmZKVm4vRFY&traceId=1",
        desc: "Чип A19, 6.7-дюймовый дисплей Super Retina XDR, двойная камера 48 МП, большой аккумулятор 4323 мАч, iOS 26.",
        memoryOptions: [
            { size: "256GB", price: 4400 , color: "Black" },
            { size: "512GB", price: 4715, color: "Black" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 16 Pro Max (2024) ===
   {
        id: 1014,
        name: "Смартфон Apple iPhone 16 Pro Max 256GB (Desert Titanium)",
        brand: "iPhone",
        image: "images/af52a9d697cc2df5dfc32643c5f2b8a7.webp",
        desc: "Чип A18 Pro, 6.9-дюймовый OLED-дисплей Super Retina XDR с ProMotion 120 Гц, тройная камера 48 МП (основная) + 12 МП (ультраширокоугольная) + 12 МП (телефото с 5-кратным оптическим зумом), фронтальная камера 12 МП, титановый корпус, кнопка Capture Button, Face ID, защита IP68, аккумулятор до 33 часов видео, USB-C, Wi-Fi 7, Bluetooth 5.4, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            
        ],
        defaultMemory: "256GB"
    },
    
    {
        id: 1016,
        name: "Смартфон Apple iPhone 16 Pro Max 256GB (Black Titanium)",
        brand: "iPhone",
        image: "https://images.5element.by/resize/b24/b24a4e2125e1f5f322225f6046cf9d75/246_246_1/ec0653d5348325465bbdec1639a91ab8.jpg",
        desc: "Чип A18 Pro, 6.9-дюймовый OLED-дисплей Super Retina XDR с ProMotion 120 Гц, тройная камера 48 МП (основная) + 12 МП (ультраширокоугольная) + 12 МП (телефото с 5-кратным оптическим зумом), фронтальная камера 12 МП, титановый корпус, кнопка Capture Button, Face ID, защита IP68, аккумулятор до 33 часов видео, USB-C, Wi-Fi 7, Bluetooth 5.4, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            
        ],
        defaultMemory: "256GB"
    },

    // === iPhone 16 Pro (2024) ===

    {
        id: 1018,
        name: "Смартфон Apple iPhone 16 Pro 256GB (Desert Titanium)",
        brand: "iPhone",
        image: "images/af52a9d697cc2df5dfc32643c5f2b8a7.webp",
        desc: "Чип A18 Pro, 6.3-дюймовый OLED-дисплей Super Retina XDR с ProMotion 120 Гц, тройная камера 48 МП (основная) + 12 МП (ультраширокоугольная) + 12 МП (телефото с 5-кратным оптическим зумом), фронтальная камера 12 МП, титановый корпус, кнопка Capture Button, Face ID, защита IP68, аккумулятор до 27 часов видео, USB-C, Wi-Fi 7, Bluetooth 5.4, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1019,
        name: "Смартфон Apple iPhone 16 Pro 256GB (White Titanium)",
        brand: "iPhone",
        image: "images/4d17b546265d6b94dcd47ca19e7de319.webp",
        desc: "Чип A18 Pro, 6.3-дюймовый OLED-дисплей Super Retina XDR с ProMotion 120 Гц, тройная камера 48 МП (основная) + 12 МП (ультраширокоугольная) + 12 МП (телефото с 5-кратным оптическим зумом), фронтальная камера 12 МП, титановый корпус, кнопка Capture Button, Face ID, защита IP68, аккумулятор до 27 часов видео, USB-C, Wi-Fi 7, Bluetooth 5.4, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
           
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1020,
        name: "Смартфон Apple iPhone 16 Pro 256GB (Black Titanium)",
        brand: "iPhone",
        image: "https://images.5element.by/resize/b24/b24a4e2125e1f5f322225f6046cf9d75/246_246_1/ec0653d5348325465bbdec1639a91ab8.jpg",
        desc: "Чип A18 Pro, 6.3-дюймовый OLED-дисплей Super Retina XDR с ProMotion 120 Гц, тройная камера 48 МП (основная) + 12 МП (ультраширокоугольная) + 12 МП (телефото с 5-кратным оптическим зумом), фронтальная камера 12 МП, титановый корпус, кнопка Capture Button, Face ID, защита IP68, аккумулятор до 27 часов видео, USB-C, Wi-Fi 7, Bluetooth 5.4, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            
        ],
        defaultMemory: "256GB"
    },

    // === iPhone 16 (2024) ===
    {
        id: 1021,
        name: "Смартфон Apple iPhone 16 128GB (Ultramarine)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-128gb-ultramarin_1.jpg",
        desc: "Чип A18, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, кнопка Action Button, Face ID, защита IP68, аккумулятор 3561 мАч до 22 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, поддержка Apple Intelligence, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
         
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1022,
        name: "Смартфон Apple iPhone 16 128GB (Pink)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-128gb-rozovyj_1.jpg",
        desc: "Чип A18, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, кнопка Action Button, Face ID, защита IP68, аккумулятор 3561 мАч до 22 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, поддержка Apple Intelligence, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
          
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1023,
        name: "Смартфон Apple iPhone 16 128GB (Teal)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-128gb-biryuzovyj_1.jpg",
        desc: "Чип A18, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, кнопка Action Button, Face ID, защита IP68, аккумулятор 3561 мАч до 22 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, поддержка Apple Intelligence, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
         
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1024,
        name: "Смартфон Apple iPhone 16 128GB (Black)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/smartfon-apple-iphone-16-128gb-chernyj_1.jpg",
        desc: "Чип A18, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, кнопка Action Button, Face ID, защита IP68, аккумулятор 3561 мАч до 22 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, поддержка Apple Intelligence, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
          
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1025,
        name: "Смартфон Apple iPhone 16 128GB (White)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-256gb-belyj_1.jpg",
        desc: "Чип A18, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, кнопка Action Button, Face ID, защита IP68, аккумулятор 3561 мАч до 22 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, поддержка Apple Intelligence, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "White" },
            { size: "256GB", color: "White" },
            { size: "512GB", color: "White" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 16 Plus (2024) ===
    {
        id: 1026,
        name: "Смартфон Apple iPhone 16 Plus 128GB (Ultramarine)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-plus-128gb-ultramarin_1.jpg",
        desc: "Чип A18, 6.7-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, кнопка Action Button, Face ID, защита IP68, аккумулятор 4323 мАч до 27 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, поддержка Apple Intelligence, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Ultramarine" },
            { size: "256GB", color: "Ultramarine" },
            { size: "512GB", color: "Ultramarine" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1027,
        name: "Смартфон Apple iPhone 16 Plus 128GB (Pink)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-plus-128gb-rozovyj_1.jpg",
        desc: "Чип A18, 6.7-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, кнопка Action Button, Face ID, защита IP68, аккумулятор 4323 мАч до 27 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, поддержка Apple Intelligence, iOS 18. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Pink" },
            { size: "256GB", color: "Pink" },
            { size: "512GB", color: "Pink" }
        ],
        defaultMemory: "128GB"
    },
   

    // === iPhone 15 Pro Max (2023) ===
    {
        id: 1029,
        name: "Смартфон Apple iPhone 15 Pro Max 256GB (Natural Titanium)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-pro-max-256gb-prirodnyj-titan_1.jpg",
        desc: "Чип A17 Pro, 6.7-дюймовый OLED-дисплей Super Retina XDR с ProMotion 120 Гц, тройная камера 48 МП (основная) + 12 МП (ультраширокоугольная) + 12 МП (телефото с 5-кратным оптическим зумом), фронтальная камера 12 МП, титановый корпус, Face ID, защита IP68, аккумулятор до 29 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, Dynamic Island, iOS 17. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "256GB", color: "Natural Titanium" },
            { size: "512GB", color: "Natural Titanium" },
            { size: "1TB", color: "Natural Titanium" }
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1030,
        name: "Смартфон Apple iPhone 15 Pro Max 256GB (Blue Titanium)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-pro-max-256gb-sinij-titan_1.jpg",
        desc: "Чип A17 Pro, 6.7-дюймовый OLED-дисплей Super Retina XDR с ProMotion 120 Гц, тройная камера 48 МП (основная) + 12 МП (ультраширокоугольная) + 12 МП (телефото с 5-кратным оптическим зумом), фронтальная камера 12 МП, титановый корпус, Face ID, защита IP68, аккумулятор до 29 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, Dynamic Island, iOS 17. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "256GB", color: "Blue Titanium" },
            { size: "512GB", color: "Blue Titanium" },
            { size: "1TB", color: "Blue Titanium" }
        ],
        defaultMemory: "256GB"
    },

    // === iPhone 15 Pro (2023) ===
    {
        id: 1031,
        name: "Смартфон Apple iPhone 15 Pro 256GB (Natural Titanium)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-pro-128gb-prirodnyj-titan_1.jpg",
        desc: "Чип A17 Pro, 6.1-дюймовый OLED-дисплей Super Retina XDR с ProMotion 120 Гц, тройная камера 48 МП (основная) + 12 МП (ультраширокоугольная) + 12 МП (телефото с 3-кратным оптическим зумом), фронтальная камера 12 МП, титановый корпус, Face ID, защита IP68, аккумулятор до 23 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, Dynamic Island, iOS 17. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "256GB", color: "Natural Titanium" },
            { size: "512GB", color: "Natural Titanium" },
            { size: "1TB", color: "Natural Titanium" }
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1032,
        name: "Смартфон Apple iPhone 15 Pro 256GB (Black Titanium)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-pro-128gb-chernyj-titan_1.jpg",
        desc: "Чип A17 Pro, 6.1-дюймовый OLED-дисплей Super Retina XDR с ProMotion 120 Гц, тройная камера 48 МП (основная) + 12 МП (ультраширокоугольная) + 12 МП (телефото с 3-кратным оптическим зумом), фронтальная камера 12 МП, титановый корпус, Face ID, защита IP68, аккумулятор до 23 часов видео, USB-C, Wi-Fi 6E, Bluetooth 5.3, Dynamic Island, iOS 17. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "256GB", color: "Black Titanium" },
            { size: "512GB", color: "Black Titanium" },
            { size: "1TB", color: "Black Titanium" }
        ],
        defaultMemory: "256GB"
    },

    // === iPhone 15 (2023) ===
    {
        id: 1033,
        name: "Смартфон Apple iPhone 15 128GB (Black)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-128gb-chernyj_1.jpg",
        desc: "Чип A16 Bionic, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 20 часов видео, USB-C, Wi-Fi 6, Bluetooth 5.3, Dynamic Island, iOS 17. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Black" },
            { size: "256GB", color: "Black" },
            { size: "512GB", color: "Black" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1034,
        name: "Смартфон Apple iPhone 15 128GB (Blue)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-256gb-goluboj_1.jpg",
        desc: "Чип A16 Bionic, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 20 часов видео, USB-C, Wi-Fi 6, Bluetooth 5.3, Dynamic Island, iOS 17. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Blue" },
            { size: "256GB", color: "Blue" },
            { size: "512GB", color: "Blue" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1035,
        name: "Смартфон Apple iPhone 15 128GB (Green)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-256gb-zelenyj_1.jpg",
        desc: "Чип A16 Bionic, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 20 часов видео, USB-C, Wi-Fi 6, Bluetooth 5.3, Dynamic Island, iOS 17. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Green" },
            { size: "256GB", color: "Green" },
            { size: "512GB", color: "Green" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 15 Plus (2023) ===
    {
        id: 1036,
        name: "Смартфон Apple iPhone 15 Plus 128GB (Black)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-plus-128gb-chernyj_1.jpg",
        desc: "Чип A16 Bionic, 6.7-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 26 часов видео, USB-C, Wi-Fi 6, Bluetooth 5.3, Dynamic Island, iOS 17. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Black" },
            { size: "256GB", color: "Black" },
            { size: "512GB", color: "Black" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1037,
        name: "Смартфон Apple iPhone 15 Plus 128GB (Blue)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-plus-256gb-goluboj_1.jpg",
        desc: "Чип A16 Bionic, 6.7-дюймовый OLED-дисплей Super Retina XDR, двойная камера 48 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 26 часов видео, USB-C, Wi-Fi 6, Bluetooth 5.3, Dynamic Island, iOS 17. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Blue" },
            { size: "256GB", color: "Blue" },
            { size: "512GB", color: "Blue" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone SE (2022) ===
    {
        id: 1038,
        name: "Смартфон Apple iPhone SE (2022) 64GB (Midnight)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-se-2022-64gb-polnochnyj_1.jpg",
        desc: "Чип A15 Bionic, 4.7-дюймовый Retina HD дисплей LCD, камера 12 МП (основная) с оптической стабилизацией, фронтальная камера 7 МП, алюминиево-стеклянный корпус, Touch ID, защита IP67, аккумулятор до 15 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, iOS 15. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "64GB", color: "Midnight" },
            { size: "128GB", color: "Midnight" },
            { size: "256GB", color: "Midnight" }
        ],
        defaultMemory: "64GB"
    },
    {
        id: 1039,
        name: "Смартфон Apple iPhone SE (2022) 64GB (Starlight)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-se-2022-64gb-zvezdnyj_1.jpg",
        desc: "Чип A15 Bionic, 4.7-дюймовый Retina HD дисплей LCD, камера 12 МП (основная) с оптической стабилизацией, фронтальная камера 7 МП, алюминиево-стеклянный корпус, Touch ID, защита IP67, аккумулятор до 15 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, iOS 15. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "64GB", color: "Starlight" },
            { size: "128GB", color: "Starlight" },
            { size: "256GB", color: "Starlight" }
        ],
        defaultMemory: "64GB"
    },
    {
        id: 1040,
        name: "Смартфон Apple iPhone SE (2022) 64GB (RED)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-se-2022-128gb-product-red_1.jpg",
        desc: "Чип A15 Bionic, 4.7-дюймовый Retina HD дисплей LCD, камера 12 МП (основная) с оптической стабилизацией, фронтальная камера 7 МП, алюминиево-стеклянный корпус, Touch ID, защита IP67, аккумулятор до 15 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, iOS 15. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "64GB", color: "RED" },
            { size: "128GB", color: "RED" },
            { size: "256GB", color: "RED" }
        ],
        defaultMemory: "64GB"
    },

    // === iPhone 14 (2022) ===
    {
        id: 1041,
        name: "Смартфон Apple iPhone 14 128GB (Midnight)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-14-128gb-polunochnyj_1.jpg",
        desc: "Чип A15 Bionic, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП с автофокусом, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 20 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.3, Emergency SOS через спутник, iOS 16. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Midnight" },
            { size: "256GB", color: "Midnight" },
            { size: "512GB", color: "Midnight" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1042,
        name: "Смартфон Apple iPhone 14 128GB (Purple)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-14-128gb-fioletovyj_1.jpg",
        desc: "Чип A15 Bionic, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП с автофокусом, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 20 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.3, Emergency SOS через спутник, iOS 16. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Purple" },
            { size: "256GB", color: "Purple" },
            { size: "512GB", color: "Purple" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 14 Plus (2022) ===
    {
        id: 1043,
        name: "Смартфон Apple iPhone 14 Plus 128GB (Midnight)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-14-plus-128gb-polunochnyj_1.jpg",
        desc: "Чип A15 Bionic, 6.7-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП с автофокусом, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 26 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.3, Emergency SOS через спутник, iOS 16. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Midnight" },
            { size: "256GB", color: "Midnight" },
            { size: "512GB", color: "Midnight" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1044,
        name: "Смартфон Apple iPhone 14 Plus 128GB (Purple)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-14-plus-128gb-fioletovyj_1.jpg",
        desc: "Чип A15 Bionic, 6.7-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП с автофокусом, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 26 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.3, Emergency SOS через спутник, iOS 16. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Purple" },
            { size: "256GB", color: "Purple" },
            { size: "512GB", color: "Purple" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 13 (2021) ===
    {
        id: 1045,
        name: "Смартфон Apple iPhone 13 128GB (Midnight)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A15 Bionic, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 19 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, iOS 15. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Midnight" },
            { size: "256GB", color: "Midnight" },
            { size: "512GB", color: "Midnight" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1046,
        name: "Смартфон Apple iPhone 13 128GB (Blue)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-blue-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A15 Bionic, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 19 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, iOS 15. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Blue" },
            { size: "256GB", color: "Blue" },
            { size: "512GB", color: "Blue" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1047,
        name: "Смартфон Apple iPhone 13 128GB (Pink)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A15 Bionic, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 19 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, iOS 15. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Pink" },
            { size: "256GB", color: "Pink" },
            { size: "512GB", color: "Pink" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 13 mini (2021) ===
    {
        id: 1048,
        name: "Смартфон Apple iPhone 13 mini 128GB (Midnight)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-midnight-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A15 Bionic, 5.4-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 17 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, компактный дизайн, iOS 15. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Midnight" },
            { size: "256GB", color: "Midnight" },
            { size: "512GB", color: "Midnight" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1049,
        name: "Смартфон Apple iPhone 13 mini 128GB (Blue)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A15 Bionic, 5.4-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус, Face ID, защита IP68, аккумулятор до 17 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, компактный дизайн, iOS 15. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "128GB", color: "Blue" },
            { size: "256GB", color: "Blue" },
            { size: "512GB", color: "Blue" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 12 (2020) ===
    {
        id: 1050,
        name: "Смартфон Apple iPhone 12 64GB (Black)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A14 Bionic, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус с Ceramic Shield, Face ID, защита IP68, аккумулятор до 17 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, MagSafe, iOS 14. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "64GB", color: "Black" },
            { size: "128GB", color: "Black" },
            { size: "256GB", color: "Black" }
        ],
        defaultMemory: "64GB"
    },
    {
        id: 1051,
        name: "Смартфон Apple iPhone 12 64GB (Purple)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-purple-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A14 Bionic, 6.1-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус с Ceramic Shield, Face ID, защита IP68, аккумулятор до 17 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, MagSafe, iOS 14. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "64GB", color: "Purple" },
            { size: "128GB", color: "Purple" },
            { size: "256GB", color: "Purple" }
        ],
        defaultMemory: "64GB"
    },

    // === iPhone 12 mini (2020) ===
    {
        id: 1052,
        name: "Смартфон Apple iPhone 12 mini 64GB (Black)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-black-select-2020?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A14 Bionic, 5.4-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус с Ceramic Shield, Face ID, защита IP68, аккумулятор до 15 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, MagSafe, компактный дизайн, iOS 14. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "64GB", color: "Black" },
            { size: "128GB", color: "Black" },
            { size: "256GB", color: "Black" }
        ],
        defaultMemory: "64GB"
    },
    {
        id: 1053,
        name: "Смартфон Apple iPhone 12 mini 64GB (Blue)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-blue-select-2020?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A14 Bionic, 5.4-дюймовый OLED-дисплей Super Retina XDR, двойная камера 12 МП (основная) + 12 МП (ультраширокоугольная), фронтальная камера 12 МП, алюминиевый корпус с Ceramic Shield, Face ID, защита IP68, аккумулятор до 15 часов видео, Lightning, Wi-Fi 6, Bluetooth 5.0, 5G, MagSafe, компактный дизайн, iOS 14. Цену и наличие уточняйте у менеджера.",
        memoryOptions: [
            { size: "64GB", color: "Blue" },
            { size: "128GB", color: "Blue" },
            { size: "256GB", color: "Blue" }
        ],
        defaultMemory: "64GB"
    },

        // === SAMSUNG (10 МОДЕЛЕЙ) - добавляем недостающие ===
        {
            id: 1011,
            name: "Смартфон Samsung Galaxy S24 Ultra 512GB (Titanium Black)",
            brand: "Samsung",
            image: "https://imgproxy.onliner.by/08CY3YyfI4iHmgLLXFhPEWxb3fyxbjZeHErTz1XDTi8/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMjI0ODQ3NDJm/ZDVjZDVkZDk4OTgw/ZTgzYzgzZGM1ZjEu/anBn",
            desc: "Искусственный интеллект Galaxy AI, титановая рамка, стилус S Pen в комплекте, 200 МП камера, 12 ГБ RAM.",
            memoryOptions: [
                { size: "256GB", price: 4500 + 1000, color: "Titanium Black" },
                { size: "512GB", price: 5000 + 1000, color: "Titanium Black" },
                { size: "1TB", price: 5800 + 1000, color: "Titanium Black" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1012,
            name: "Смартфон Samsung Galaxy S24+ 256GB (Cobalt Violet)",
            brand: "Samsung",
            image: "https://i-gadget.by/image/cache/catalog/tovary/Samsung/samsung-s-24-fiolet-468x468.webp",
            desc: "Galaxy AI, Dynamic AMOLED 2X 120 Гц, 12 ГБ RAM, аккумулятор 4900 мАч.",
            memoryOptions: [
                { size: "256GB", price: 3500 + 1000, color: "Cobalt Violet" },
                { size: "512GB", price: 3900 + 1000, color: "Cobalt Violet" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1013,
            name: "Смартфон Samsung Galaxy S24 128GB (Amber Yellow)",
            brand: "Samsung",
            image: "https://imgproxy.onliner.by/sWNsqfs7WBmDQ8r9ACZqpCaCtQD88UlBBU9uGqcgmZY/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvN2ExZmRmMDU1/ZmE3ZTdkNDkzZTEy/OTY1MWZjZjVmZTcu/anBn",
            desc: "Galaxy AI, 6.2-дюймовый Dynamic AMOLED 2X, 120 Гц, 8 ГБ RAM.",
            memoryOptions: [
                { size: "128GB", price: 2700 + 1000, color: "Amber Yellow" },
                { size: "256GB", price: 3000 + 1000, color: "Amber Yellow" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1014,
            name: "Смартфон Samsung Galaxy A55 128GB (Awesome Blue)",
            brand: "Samsung",
            image: "https://imgproxy.onliner.by/GtttIimZhI1GYgoLj6HYf4_h3g5XeM980b4SxrN0nss/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTJlMmEyOTQ2/MjVhMjFlN2Y5NTJm/YTE0ZmM5YzliNWMu/anBn",
            desc: "Super AMOLED 120 Гц, защита Gorilla Glass Victus+, 50 МП камера, аккумулятор 5000 мАч.",
            memoryOptions: [
                { size: "128GB", price: 1600 + 1000, color: "Awesome Blue" },
                { size: "256GB", price: 1850 + 1000, color: "Awesome Blue" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1015,
            name: "Смартфон Samsung Galaxy A35 128GB (Awesome Lilac)",
            brand: "Samsung",
            image: "https://img.sila.by/catalog/img14/tovar149092.jpg",
            desc: "Super AMOLED 120 Гц, камера 50 МП с OIS, аккумулятор 5000 мАч, защита IP67.",
            memoryOptions: [
                { size: "128GB", price: 1200 + 1000, color: "Awesome Lilac" },
                { size: "256GB", price: 1450 + 1000, color: "Awesome Lilac" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1016,
            name: "Смартфон Samsung Galaxy Z Fold 6 256GB (Silver Shadow)",
            brand: "Samsung",
            image: "https://i-gadget.by/image/cache/catalog/tovary/Samsung/Galaxy-Z-Fold6-Ser-468x468.webp",
            desc: "Складной смартфон, 7.6-дюймовый Dynamic AMOLED 2X, 120 Гц, Snapdragon 8 Gen 3, 12 ГБ RAM.",
            memoryOptions: [
                { size: "256GB", price: 6800 + 1000, color: "Silver Shadow" },
                { size: "512GB", price: 7400 + 1000, color: "Silver Shadow" },
                { size: "1TB", price: 8200 + 1000, color: "Silver Shadow" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1017,
            name: "Смартфон Samsung Galaxy Z Flip 6 256GB (Blue)",
            brand: "Samsung",
            image: "https://imgproxy.onliner.by/6xriZCKT1i1Z6r6IwU4YHRqqDkzv2niVcJMD29x8g5M/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMmViNmU3Yzk5/NjI1MTY4MTNmM2Q3/MzFiYjk4NTVhNGEu/anBn",
            desc: "Складной смартфон, 6.7-дюймовый Dynamic AMOLED 2X, 120 Гц, Snapdragon 8 Gen 3, 12 ГБ RAM.",
            memoryOptions: [
                { size: "256GB", price: 4900 + 1000, color: "Blue" },
                { size: "512GB", price: 5500 + 1000, color: "Blue" }
            ],
            defaultMemory: "256GB"
        },
  
        // Добавляем еще 1 модель Samsung до 10 (S23 FE)
        {
            id: 1020_1,
            name: "Смартфон Samsung Galaxy S23 FE 128GB (Mint)",
            brand: "Samsung",
            image: "https://imgproxy.onliner.by/B3ipZ1Mq-Js7Ht0U9UUVFJgsvL2WwpIp-2y2_OfOyT4/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYTdmMGUzN2Vl/ODg0NDZkNDE3M2Zj/NDJkOTdkNGJlODEu/anBn",
            desc: "Dynamic AMOLED 2X 120 Гц, тройная камера 50 МП, Exynos 2200, IP68.",
            memoryOptions: [
                { size: "128GB", price: 2200 + 1000, color: "Mint" },
                { size: "256GB", price: 2500 + 1000, color: "Mint" }
            ],
            defaultMemory: "128GB"
        },

        // === XIAOMI (10 МОДЕЛЕЙ) - уже есть 10, оставляем как есть ===
        {
            id: 1021,
            name: "Смартфон Xiaomi 14 Ultra 512GB (Black)",
            brand: "Xiaomi",
            image: "https://imgproxy.onliner.by/iS9GAVyhpNkZEUt3CEOcmb7NWfjmYsRdM7sEypuWURI/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMGEyN2I1NjY3/ODFlOWFjZGYwOGMy/ZDRiNTM2MGRmOGEu/anBn",
            desc: "Leica Quad Camera 50 МП, Snapdragon 8 Gen 3, AMOLED WQHD+ 120 Гц, HyperOS, IP68.",
            memoryOptions: [
                { size: "256GB", price: 3300 + 1000, color: "Black" },
                { size: "512GB", price: 3600 + 1000, color: "Black" },
                { size: "1TB", price: 4100 + 1000, color: "Black" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1022,
            name: "Смартфон Xiaomi 14 256GB (White)",
            brand: "Xiaomi",
            image: "https://imgproxy.onliner.by/xeLF00reFuJCkvEYTHbPzTT24fAlnhF60euIbDV4QJ8/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvOWEwNzk3NmU1/ZGZhNjY0MTJjN2I3/NzJhMmIyYjc0Yjku/anBn",
            desc: "Leica камера 50 МП, Snapdragon 8 Gen 3, 6.36-дюймовый AMOLED 120 Гц, HyperOS.",
            memoryOptions: [
                { size: "256GB", price: 2600 + 1000, color: "White" },
                { size: "512GB", price: 2900 + 1000, color: "White" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1023,
            name: "Смартфон Xiaomi 13T Pro 512GB (Alpine Blue)",
            brand: "Xiaomi",
            image: "https://imgproxy.onliner.by/P2ctCcKxd8KZYQlRg7-XbTUMwaJiJCqpDH5kXxtVFVc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYWM2MjkwNWY4/ZWMyZjMzZDc3Nzlm/OTE5NjAyMmQ5NjIu/anBn",
            desc: "Leica камера, Dimensity 9200+, 120 Вт HyperCharge, IP68.",
            memoryOptions: [
                { size: "256GB", price: 2100 + 1000, color: "Alpine Blue" },
                { size: "512GB", price: 2400 + 1000, color: "Alpine Blue" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1024,
            name: "Смартфон Xiaomi Redmi Note 13 Pro 256GB (Midnight Black)",
            brand: "Xiaomi",
            image: "https://shop.mts.by/upload/resize_cache/webp/iblock/241/y1ax7auvtohj262udve0axrb7emki875/500_926_1/Black1.webp",
            desc: "Камера 200 МП с OIS, турбозарядка 67 Вт, AMOLED экран 120 Гц.",
            memoryOptions: [
                { size: "128GB", price: 1000 + 1000, color: "Midnight Black" },
                { size: "256GB", price: 1200 + 1000, color: "Midnight Black" },
                { size: "512GB", price: 1400 + 1000, color: "Midnight Black" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1025,
            name: "Смартфон Xiaomi Redmi Note 13 128GB (Ice Blue)",
            brand: "Xiaomi",
            image: "https://imgproxy.onliner.by/qffxgwTXLSOBKQPKWpWl1fqQZkpD32PU-6DNlAhjTF4/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMDBhOTQ2NGI4/ODE4OTQ3OWRlNGFi/NmFkYjk3MTAyOWEu/anBn",
            desc: "AMOLED экран 120 Гц, камера 108 МП, аккумулятор 5000 мАч, зарядка 33 Вт.",
            memoryOptions: [
                { size: "128GB", price: 750 + 1000, color: "Ice Blue" },
                { size: "256GB", price: 900 + 1000, color: "Ice Blue" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1026,
            name: "Смартфон Xiaomi POCO F6 Pro 512GB (Black)",
            brand: "POCO",
            image: "https://imgproxy.onliner.by/Ad5H4PNmJ6bHGiQQD8BTRogwHlnggjB6rX0P7mwFzpM/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNTVkMDAwNTI2/MThjOTc3NDk5Nzll/Njg3ZTQ5ZDYwMmUu/anBn",
            desc: "Snapdragon 8 Gen 2, 120 Гц AMOLED, 120 Вт зарядка, 5000 мАч.",
            memoryOptions: [
                { size: "256GB", price: 1800 + 1000, color: "Black" },
                { size: "512GB", price: 2100 + 1000, color: "Black" }
            ],
            defaultMemory: "256GB"
        },
    
        {
            id: 1027,
            name: "Смартфон Xiaomi POCO X6 Pro 256GB (Yellow)",
            brand: "POCO",
            image: "https://imgproxy.onliner.by/VhuhOoA7lmLemToX1UOsZ19hMsfKjBeRcjbT8DZPNzc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNWE0MTdhNWZk/YzhkM2MyMTc3Mjky/YWQyOWNiM2FlNGEu/anBn",
            desc: "Dimensity 8300-Ultra, 120 Гц AMOLED, 67 Вт зарядка, 5100 мАч.",
            memoryOptions: [
                { size: "256GB", price: 1400 + 1000, color: "Yellow" },
                { size: "512GB", price: 1650 + 1000, color: "Yellow" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1028,
            name: "Смартфон Xiaomi POCO M6 Pro 128GB (Black)",
            brand: "POCO",
            image: "https://foxstore.by/upload/resize_cache/iblock/cac/500_500_140cd750bba9870f18aada2478b24840a/4zl2zog8f0zydh147ha60l2zaw4orryp.jpg",
            desc: "AMOLED экран 90 Гц, камера 64 МП, NFC, аккумулятор 5000 мАч.",
            memoryOptions: [
                { size: "128GB", price: 650 + 1000, color: "Black" },
                { size: "256GB", price: 800 + 1000, color: "Black" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1029,
            name: "Смартфон Xiaomi Redmi 13C 128GB (Navy Blue)",
            brand: "Xiaomi",
            image: "https://imgproxy.onliner.by/1D22-xyWoh1xz-AIDoHa3iWWDCe23-rr3wguny4JYcQ/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMWI3MjNiOTFm/ZjlkMTQxNmM5M2Nm/MDg2NGE1M2IyYzYu/anBn",
            desc: "Бюджетный смартфон, экран 90 Гц, камера 50 МП, аккумулятор 5000 мАч.",
            memoryOptions: [
                { size: "128GB", price: 350 + 1000, color: "Navy Blue" },
                { size: "256GB", price: 450 + 1000, color: "Navy Blue" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1030,
            name: "Смартфон Xiaomi Mix Flip 512GB (Black)",
            brand: "Xiaomi",
            image: "https://imgproxy.onliner.by/fgWJHZqKRduUFvIXQPhHrK795FlqQUcu1L--nuaBkR4/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvN2ViNjQ1NjM0/YTU3OTkzY2M3NWNj/ZmI5Y2UxMmYwYzku/anBn",
            desc: "Складной смартфон, 6.86-дюймовый AMOLED 120 Гц, Snapdragon 8 Gen 3, Leica камера.",
            memoryOptions: [
                { size: "256GB", price: 4900 + 1000, color: "Black" },
                { size: "512GB", price: 5500 + 1000, color: "Black" },
                { size: "1TB", price: 6200 + 1000, color: "Black" }
            ],
            defaultMemory: "512GB"
        },

  
        // Добавляем еще 1 модель Huawei до 10 (Mate 60)
        {
            id: 1050_1,
            name: "Смартфон HUAWEI Mate 60 256GB (Silver)",
            brand: "HUAWEI",
            image: "images/загружено.jpg",
            desc: "Kirin 9000s, 6.69-дюймовый OLED 120 Гц, тройная камера 50 МП, 4750 мАч.",
            memoryOptions: [
                { size: "256GB", price: 3300 + 1000, color: "Silver" },
                { size: "512GB", price: 3800 + 1000, color: "Silver" }
            ],
            defaultMemory: "256GB"
        },


        // === VIVO (10 МОДЕЛЕЙ) - добавляем недостающие ===
        {
            id: 1061,
            name: "Смартфон Vivo X100 Pro 512GB (Blue)",
            brand: "Vivo",
            image: "https://imgproxy.onliner.by/UgNiXT0ZCwwD-FdyNV8hm8tHnFgP7kJxM4zWpwT0Dio/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTE4Zjg5MDBm/M2ExNDFkZDViZmI1/ZWQzNTMxZGNjM2Mu/anBn",
            desc: "ZEISS камера 50 МП, Dimensity 9300, 100 Вт зарядка, IP68, 5000 мАч.",
            memoryOptions: [
                { size: "256GB", price: 3800 + 1000, color: "Blue" },
                { size: "512GB", price: 4300 + 1000, color: "Blue" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1062,
            name: "Смартфон Vivo X100 256GB (Black)",
            brand: "Vivo",
            image: "https://imgproxy.onliner.by/B9zZ7iMjW0yUTmsGo7YFQMj-pabo-xI7MsrcZD_JhMY/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvOWY3ZTVjM2Y2/NTU2MDQxMmM4N2Iw/YjBmN2Q3OTFkNTIu/anBn",
            desc: "ZEISS камера, Dimensity 9300, 120 Гц AMOLED, 120 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 3100 + 1000, color: "Black" },
                { size: "512GB", price: 3600 + 1000, color: "Black" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1063,
            name: "Смартфон Vivo V30e 256GB (Red)",
            brand: "Vivo",
            image: "https://imgproxy.onliner.by/rzcAgufMhp5I0wtWyRHNBZFUnCOXTDZ7mg7_YupHAFc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNTllZWVjNzUx/MzUwYTEzZWE0NGYz/MzY3NzZmZGZlM2Mu/anBn",
            desc: "50 МП камера с Aura Light, AMOLED 120 Гц, 5000 мАч, 44 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 1450 + 1000, color: "Red" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1064,
            name: "Смартфон Vivo V29e 256GB ",
            brand: "Vivo",
            image: "https://imgproxy.onliner.by/gGvJEaIWRMhECZvvyrHaDTfu-Ow35Xy0CRcWEDiojKs/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvOGI2ODk4NTAy/YzNjYjgxZTMyODE5/ZTRlODNlNDZjZjQu/anBn",
            desc: "AMOLED экран 120 Гц, камера 64 МП с OIS, 5000 мАч, 44 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 1250 + 1000 }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1065,
            name: "Смартфон Vivo Y100 128GB (Gold)",
            brand: "Vivo",
            image: "https://m.media-amazon.com/images/I/414UmXkNOAL._SY300_SX300_QL70_FMwebp_.jpg",
            desc: "AMOLED экран 90 Гц, камера 64 МП, 5000 мАч, 44 Вт зарядка.",
            memoryOptions: [
                { size: "128GB", price: 900 + 1000, color: "Gold" },
                { size: "256GB", price: 1050 + 1000, color: "Gold" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1066,
            name: "Смартфон Vivo Y36 128GB (Black)",
            brand: "Vivo",
            image: "https://imgproxy.onliner.by/3kF7qn2sW4ncWNHxnmReIaMywWjyEi6pxxijAU-209k/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZGQwN2JmZWI5/NGRiZGMyNTlhNTEw/ZDdiODQxYTRmMDUu/anBlZw",
            desc: "6.56-дюймовый экран 90 Гц, камера 50 МП, 5000 мАч, 44 Вт зарядка.",
            memoryOptions: [
                { size: "128GB", price: 650 + 1000, color: "Black" },
                { size: "256GB", price: 800 + 1000, color: "Black" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1067,
            name: "Смартфон Vivo X Fold 2 512GB (Blue)",
            brand: "Vivo",
            image: "https://bludiode.com/42390-large_default/vivo-x-fold-2-12gb512gb-blue.jpg",
            desc: "Складной смартфон, 8.03-дюймовый AMOLED 120 Гц, Snapdragon 8 Gen 2, 12 ГБ RAM.",
            memoryOptions: [
                { size: "256GB", price: 5500 + 1000, color: "Blue" },
                { size: "512GB", price: 6100 + 1000, color: "Blue" }
            ],
            defaultMemory: "512GB"
        },
        {
            id: 1068,
            name: "Смартфон Vivo T2 Pro 5G 256GB (Black)",
            brand: "Vivo",
            image: "https://newton.by/upload/delight.webpconverter/upload/resize_cache/iblock/1cf/647_650_16c292005ec91514f5757ea1480bc3f98/wgdlaa411zr7cdu02s39ofvb0l1n2u6r.jpg.webp?174839870118708",
            desc: "Dimensity 7200, 120 Гц AMOLED, 64 МП камера с OIS, 66 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 1400 + 1000, color: "Black" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1069,
            name: "Смартфон Vivo Y22 64GB (Blue)",
            brand: "Vivo",
            image: "https://imgproxy.onliner.by/q5VMt8sbSLSLpcC_brVKfMbRfHnf0GvKokV2IBgx10E/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNTFmOWQ2OWEy/NTU1Njc3NTUwMmEx/ZGZjMGEzYThkZDIu/anBlZw",
            desc: "6.55-дюймовый экран, камера 50 МП, 5000 мАч, 18 Вт зарядка.",
            memoryOptions: [
                { size: "64GB", price: 400 + 1000, color: "Blue" },
                { size: "128GB", price: 500 + 1000, color: "Blue" }
            ],
            defaultMemory: "64GB"
        },
        {
            id: 1070,
            name: "Смартфон Vivo X80 Pro 512GB (Orange)",
            brand: "Vivo",
            image: "images/загружено (1).jpg",
            desc: "ZEISS камера, Snapdragon 8 Gen 1, 6.78-дюймовый AMOLED 120 Гц, 80 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 2900 + 1000, color: "Orange" },
                { size: "512GB", price: 3400 + 1000, color: "Orange" }
            ],
            defaultMemory: "256GB"
        },
        // Добавляем еще 1 модель Vivo до 10 (V29 Pro)
        {
            id: 1070_1,
            name: "Смартфон Vivo V29 Pro 256GB (Blue)",
            brand: "Vivo",
            image: "https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1696928355419/21de8166d1b17d49dd2c46f6dcbf13a4.png",
            desc: "AMOLED экран 120 Гц, камера 50 МП с Aura Light, Dimensity 8200, 66 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 2100 + 1000, color: "Blue" },
                { size: "512GB", price: 2500 + 1000, color: "Blue" }
            ],
            defaultMemory: "256GB"
        },

        // === REALME (10 МОДЕЛЕЙ) - добавляем недостающие ===
        {
            id: 1071,
            name: "Смартфон Realme GT 6 512GB (Silver)",
            brand: "Realme",
            image: "https://imgproxy.onliner.by/appVvFlfhI7QNoIkxAjtk1XGop-vn7P5bGpwSfK7HI8/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvY2Q3NzdiMTRm/MGEyNzM4MGExNTcx/OWU2MTg1MWJlYmUu/anBn",
            desc: "Snapdragon 8s Gen 3, 120 Гц AMOLED, 120 Вт зарядка, 5500 мАч.",
            memoryOptions: [
                { size: "256GB", price: 2300 + 1000, color: "Silver" },
                { size: "512GB", price: 2700 + 1000, color: "Silver" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1072,
            name: "Смартфон Realme 12 Pro+ 512GB (Blue)",
            brand: "Realme",
            image: "https://imgproxy.onliner.by/YbTI7jJswT3y-TnB8sZxKvDR7vQfYS-fQE45wxwUgt8/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvODQwMjE5ODkz/ODgxNDMxMWI4Mjkw/MDQ3YjEwZTBjYjQu/anBn",
            desc: "Камера 50 МП с портретным режимом, 120 Гц AMOLED, 100 Вт зарядка, IP65.",
            memoryOptions: [
                { size: "256GB", price: 1650 + 1000, color: "Bluevy" },
                { size: "512GB", price: 1950 + 1000, color: "Blue" }
            ],
            defaultMemory: "256GB"
        },

        {
            id: 1074,
            name: "Смартфон Realme 11 Pro+ 512GB (Green)",
            brand: "Realme",
            image: "https://imgproxy.onliner.by/KbB8wRcNtzAthA4bzuFOP31x5a9HYbliHtiLLW0iNnw/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNWRiNTJiZDIx/MTgzNjUyNGJiNWY2/NWE2ZjliOTQ3NjMu/anBlZw",
            desc: "Камера 200 МП, 120 Гц AMOLED, 100 Вт зарядка, 5000 мАч.",
            memoryOptions: [
                { size: "256GB", price: 1500 + 1000, color: "Green" },
                { size: "512GB", price: 1800 + 1000, color: "Green" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1075,
            name: "Смартфон Realme C67 128GB (Black)",
            brand: "Realme",
            image: "https://imgproxy.onliner.by/uqhcGxBFK3fDV123EmfmjaUHLcnxxuyNmoT7UmgBrHw/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNGRmMzYwODQ1/ZTM0YTYzMzc0OTJj/NjIzOTFiNmYyZjQu/anBn",
            desc: "6.72-дюймовый экран 90 Гц, камера 108 МП, 5000 мАч, 33 Вт зарядка.",
            memoryOptions: [
                { size: "128GB", price: 550 + 1000, color: "Black" },
                { size: "256GB", price: 700 + 1000, color: "Black" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1076,
            name: "Смартфон Realme C53 128GB (Gold)",
            brand: "Realme",
            image: "https://imgproxy.onliner.by/R0YrY-txjbhrwBrW2T83NDPtfDoqm5VuDWZG1W4d74Q/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvODFhMjZjNmM2/YTM4MmEyM2ZiMTJj/YTUzOTI2NGNhNzMu/anBlZw",
            desc: "6.74-дюймовый экран 90 Гц, камера 50 МП, 5000 мАч, 18 Вт зарядка.",
            memoryOptions: [
                { size: "128GB", price: 450 + 1000, color: "Gold" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1077,
            name: "Смартфон Realme GT Neo 6 512GB (Silver)",
            brand: "Realme",
            image: "https://imgproxy.onliner.by/appVvFlfhI7QNoIkxAjtk1XGop-vn7P5bGpwSfK7HI8/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvY2Q3NzdiMTRm/MGEyNzM4MGExNTcx/OWU2MTg1MWJlYmUu/anBn",
            desc: "Snapdragon 8s Gen 3, 144 Гц AMOLED, 100 Вт зарядка, 5500 мАч.",
            memoryOptions: [
                { size: "256GB", price: 2100 + 1000, color: "Silver" },
                { size: "512GB", price: 2500 + 1000, color: "Silver" }
            ],
            defaultMemory: "256GB"
        },

        {
            id: 1079,
            name: "Смартфон Realme 10 128GB (Blue)",
            brand: "Realme",
            image: "https://imgproxy.onliner.by/2vQJ7lYFx-D4ZdhknHaDPT2tkZkNXaE0vKlPAqh5G8A/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMmE0ZTUyYWU5/MmZhNWEyMzY2YTg0/ZTE0NGM2ZDlmNTIu/anBlZw",
            desc: "6.4-дюймовый AMOLED 90 Гц, камера 50 МП, 5000 мАч, 33 Вт зарядка.",
            memoryOptions: [
                { size: "128GB", price: 600 + 1000, color: "Blue" },
                { size: "256GB", price: 750 + 1000, color: "Blue" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1080,
            name: "Смартфон Realme Note 50 64GB (Blue)",
            brand: "Realme",
            image: "https://imgproxy.onliner.by/nhJYLO7xTLSfq4Q5XzgX5_qf4QsOOgRfL4T2mlHdK3o/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNDg1MDRjZmU0/YzhhMGVmZTk1Mzg2/ZTEzZGEyYTM0YjAu/anBn",
            desc: "6.74-дюймовый экран 90 Гц, камера 13 МП, 5000 мАч, начальный уровень.",
            memoryOptions: [
                { size: "64GB", price: 250 + 1000, color: "Blue" },
                { size: "128GB", price: 320 + 1000, color: "Blue" }
            ],
            defaultMemory: "64GB"
        },
        // Добавляем еще 1 модель Realme до 10 (Realme GT 5)
        {
            id: 1080_1,
            name: "Смартфон Realme GT 5 256GB (White)",
            brand: "Realme",
            image: "https://imgproxy.onliner.by/UDOFgRTdu3ow2irD3wCLWHGXEi2k1KaKmgjVmKrgmY8/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNWYzNWJmNTk4/ODY0ZjdiNzc4MDg3/NjVjMzRlYzZjNGMu/anBlZw",
            desc: "Snapdragon 8 Gen 2, 144 Гц AMOLED, 240 Вт зарядка, 4600 мАч.",
            memoryOptions: [
                { size: "256GB", price: 2800 + 1000, color: "White" },
                { size: "512GB", price: 3300 + 1000, color: "White" }
            ],
            defaultMemory: "256GB"
        },

 
    ],

    laptops: [
        // === APPLE MacBook (уже 10 моделей, оставляем как есть) ===
        {
            id: 301,
            name: "Ноутбук Apple MacBook Pro 16 M3 Max 48/1TB (Space Black)",
            brand: "MacBook",
            image: "https://imgproxy.onliner.by/jol0RDl4TglDxW1AoAhjxsgTMMeeJf0WvzNHQegrqvk/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYTgwYWVlMjE0/ZmE4OTZlOTRhMjBk/OGU5ZmVmYzU5MGMu/anBn",
            desc: "Флагманский чип M3 Max с 16‑ядерным CPU и 40‑ядерным GPU, 48 ГБ RAM, 1 ТБ SSD, дисплей Liquid Retina XDR 16.2\", 22 ч работы, Thunderbolt 4.",
            memoryOptions: [
                { size: "36GB/1TB", price: 7200 + 1000, color: "Space Black" },
                { size: "48GB/1TB", price: 8200 + 1000, color: "Space Black" },
                { size: "64GB/2TB", price: 9500 + 1000, color: "Space Black" },
                { size: "128GB/4TB", price: 12500 + 1000, color: "Space Black" }
            ],
            defaultMemory: "48GB/1TB"
        },
        {
            id: 302,
            name: "Ноутбук Apple MacBook Pro 14 M3 Pro 18/512GB (Silver)",
            brand: "MacBook",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202410?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип M3 Pro с 12‑ядерным CPU и 18‑ядерным GPU, 18 ГБ RAM, 512 ГБ SSD, дисплей Liquid Retina XDR 14.2\", до 18 часов работы.",
            memoryOptions: [
                { size: "18GB/512GB", price: 5400 + 1000, color: "Silver" },
                { size: "36GB/1TB", price: 6400 + 1000, color: "Silver" },
                { size: "48GB/2TB", price: 7600 + 1000, color: "Silver" }
            ],
            defaultMemory: "18GB/512GB"
        },
        {
            id: 303,
            name: "Ноутбук Apple MacBook Air 15 M3 16/512GB (Midnight)",
            brand: "MacBook",
            image: "https://imgproxy.onliner.by/o21EOwFYwmmeXNOlItfK6itQfAT1uRW2z3VDKoQMDi8/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYzVmODQxMzZl/ZDUyNWFlOGY2ODlm/ZTBjMWU1MWJmYzAu/anBn",
            desc: "Чип M3, 16 ГБ RAM, 512 ГБ SSD, дисплей Liquid Retina 15.3\", до 18 часов работы, два порта Thunderbolt, MagSafe.",
            memoryOptions: [
                { size: "8GB/256GB", price: 3900 + 1000, color: "Midnight" },
                { size: "16GB/512GB", price: 4700 + 1000, color: "Midnight" },
                { size: "24GB/1TB", price: 5500 + 1000, color: "Midnight" }
            ],
            defaultMemory: "16GB/512GB"
        },
        {
            id: 304,
            name: "Ноутбук Apple MacBook Pro 16 M3 Pro 18/512GB (Space Gray)",
            brand: "MacBook",
            image: "https://imgproxy.onliner.by/jol0RDl4TglDxW1AoAhjxsgTMMeeJf0WvzNHQegrqvk/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYTgwYWVlMjE0/ZmE4OTZlOTRhMjBk/OGU5ZmVmYzU5MGMu/anBn",
            desc: "Чип M3 Pro, 18 ГБ RAM, 512 ГБ SSD, дисплей Liquid Retina XDR 16.2\", идеален для профессиональных задач.",
            memoryOptions: [
                { size: "18GB/512GB", price: 5900 + 1000, color: "Space Gray" },
                { size: "36GB/1TB", price: 6900 + 1000, color: "Space Gray" },
                { size: "48GB/2TB", price: 8200 + 1000, color: "Space Gray" }
            ],
            defaultMemory: "18GB/512GB"
        },
        {
            id: 305,
            name: "Ноутбук Apple MacBook Air 13 M2 8/256GB (Starlight)",
            brand: "MacBook",
            image: "https://i-center.by/images/b/apple-macbook-air-13-m2-2022-starlight_1.jpg",
            desc: "Чип M2, 8 ГБ RAM, 256 ГБ SSD, дисплей Liquid Retina 13.6\", до 18 часов работы, тонкий и легкий корпус.",
            memoryOptions: [
                { size: "8GB/256GB", price: 4200, color: "Starlight" },
                { size: "16GB/512GB", price: 4800, color: "Starlight" },
                { size: "24GB/1TB", price: 5700, color: "Starlight" }
            ],
            defaultMemory: "8GB/256GB"
        },
        {
            id: 306,
            name: "Ноутбук Apple MacBook Pro 14 M3 Max 36/1TB (Black)",
            brand: "MacBook",
            image: "https://imgproxy.onliner.by/oJ0GivijZLLe1dVr0igQPqlU2FLvkimEAvz9eXzRaP8/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNDJmY2QyNGRj/MTY4ZTBjNWQzN2Fk/OTRiZmY5NzkzNDIu/anBn",
            desc: "Чип M3 Max, 36 ГБ RAM, 1 ТБ SSD, дисплей Liquid Retina XDR 14.2\", профессиональная рабочая станция.",
            memoryOptions: [
                { size: "36GB/1TB", price: 6700 + 1000, color: "Space Black" },
                { size: "48GB/1TB", price: 7500 + 1000, color: "Space Black" },
                { size: "64GB/2TB", price: 8900 + 1000, color: "Space Black" }
            ],
            defaultMemory: "36GB/1TB"
        },
        {
            id: 307,
            name: "Ноутбук Apple MacBook Air 15 M2 16/512GB (Silver)",
            brand: "MacBook",
            image: "https://techzone.by/wp-content/uploads/2023/06/silver1-680x679.png",
            desc: "Чип M2, 16 ГБ RAM, 512 ГБ SSD, большой дисплей Liquid Retina 15.3\", отличная автономность.",
            memoryOptions: [
                { size: "8GB/256GB", price: 3500 + 1000, color: "Silver" },
                { size: "16GB/512GB", price: 4300 + 1000, color: "Silver" },
                { size: "24GB/1TB", price: 5100 + 1000, color: "Silver" }
            ],
            defaultMemory: "16GB/512GB"
        },
        {
            id: 308,
            name: "Ноутбук Apple MacBook Pro 16 M2 Max 32/1TB (Silver)",
            brand: "MacBook",
            image: "https://appstudio.by/wp-content/uploads/2023/02/apple-macbook-pro-m2-2023-silver-1.png.webp",
            desc: "Чип M2 Max, 32 ГБ RAM, 1 ТБ SSD, отличный выбор для профессионалов, надежный и производительный.",
            memoryOptions: [
                { size: "32GB/1TB", price: 12000 + 1000, color: "Silver" },
                { size: "64GB/2TB", price: 7200 + 1000, color: "Silver" },
                { size: "96GB/4TB", price: 9200 + 1000, color: "Silver" }
            ],
            defaultMemory: "32GB/1TB"
        },
        {
            id: 309,
            name: "Ноутбук Apple MacBook Air 13 M3 8/256GB (Gold)",
            brand: "MacBook",
            image: "https://imgproxy.onliner.by/_Z1_CJ8r0x7oZIqpmGi72trUmzN2_Cp8p2T-BlDcw48/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMjA3MjVhMmY0/ZmM3ODFkNjJlYmM4/M2E4MmY3N2M4NDUu/anBn",
            desc: "Чип M3, 8 ГБ RAM, 256 ГБ SSD, компактный и стильный ноутбук для повседневных задач.",
            memoryOptions: [
                { size: "8GB/256GB", price: 3400 + 1000, color: "Gold" },
                { size: "16GB/512GB", price: 4100 + 1000, color: "Gold" },
                { size: "24GB/1TB", price: 4900 + 1000, color: "Gold" }
            ],
            defaultMemory: "8GB/256GB"
        },
        {
            id: 310,
            name: "Ноутбук Apple MacBook Pro 14 M2 Pro 16/512GB (Space Gray)",
            brand: "MacBook",
            image: "https://appstudio.by/wp-content/uploads/2023/02/apple-macbook-pro-m2-2023-space-gray-1.png.webp",
            desc: "Чип M2 Pro, 16 ГБ RAM, 512 ГБ SSD, отличное соотношение цены и производительности.",
            memoryOptions: [
                { size: "16GB/512GB", price: 4500 + 1000, color: "Space Gray" },
                { size: "32GB/1TB", price: 5500 + 1000, color: "Space Gray" },
                { size: "32GB/2TB", price: 6500 + 1000, color: "Space Gray" }
            ],
            defaultMemory: "16GB/512GB"
        },

        // === ASUS (уже 10 моделей, оставляем как есть) ===
        {
            id: 311,
            name: "Ноутбук ASUS ROG Strix Scar 18 (2026) RTX 5090",
            brand: "ASUS ROG",
            image: "https://imgproxy.onliner.by/WIlJejl3qqg5RKvYxh7gibDTn3LW_CSISFNgHfUXjNc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMTM5YTg0OTUx/NjdjNTg1NzQ5YzQ3/MDA0MDlhYjAwYTQu/anBn",
            desc: "Флагманский игровой ноутбук. Intel Core Ultra 9 285HX, 64 ГБ RAM, NVIDIA GeForce RTX 5090 24 ГБ, экран Mini-LED 18\" 240 Гц, 4 ТБ SSD.",
            memoryOptions: [
                { size: "32GB/1TB", price: 8200 + 1000, color: "Black" },
                { size: "64GB/2TB", price: 9500 + 1000, color: "Black" },
                { size: "64GB/4TB", price: 11200 + 1000, color: "Black" }
            ],
            defaultMemory: "32GB/1TB"
        },
        {
            id: 312,
            name: "Ноутбук ASUS ROG Zephyrus G16 (2026) OLED",
            brand: "ASUS ROG",
            image: "https://imgproxy.onliner.by/WIlJejl3qqg5RKvYxh7gibDTn3LW_CSISFNgHfUXjNc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMTM5YTg0OTUx/NjdjNTg1NzQ5YzQ3/MDA0MDlhYjAwYTQu/anBn",
            desc: "Тонкий игровой ноутбук. Intel Core Ultra 7 255H, 32 ГБ RAM, NVIDIA GeForce RTX 5080 16 ГБ, OLED экран 16\" 240 Гц, 1 ТБ SSD, алюминиевый корпус.",
            memoryOptions: [
                { size: "16GB/1TB", price: 4800 + 1000, color: "Eclipse Gray" },
                { size: "32GB/1TB", price: 5500 + 1000, color: "Eclipse Gray" },
                { size: "32GB/2TB", price: 6200 + 1000, color: "Eclipse Gray" }
            ],
            defaultMemory: "32GB/1TB"
        },
        {
            id: 313,
            name: "Ноутбук ASUS ProArt Studiobook 16 OLED",
            brand: "ASUS",
            image: "https://imgproxy.onliner.by/Yw0QGMXyiGYwOjzhGCC-QckYimzrf8Brx6WeHuTeT-I/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvOWJkOTI2OGNm/OGU2OGMzMGI5Njhi/NzhmOWNhNDBkZTQu/anBlZw",
            desc: "Для профессионалов творчества. Intel Core i9-14900HX, 64 ГБ RAM, NVIDIA RTX 4080 12 ГБ, 4K OLED экран 16\", калибровка Pantone, 2 ТБ SSD.",
            memoryOptions: [
                { size: "32GB/1TB", price: 5200 + 1000, color: "Black" },
                { size: "64GB/2TB", price: 6200 + 1000, color: "Black" },
                { size: "64GB/4TB", price: 7200 + 1000, color: "Black" }
            ],
            defaultMemory: "64GB/2TB"
        },
        {
            id: 314,
            name: "Ноутбук ASUS TUF Gaming A16 (2026)",
            brand: "Asus TUF Gaming",
            image: "https://imgproxy.onliner.by/OCWpHmvQE3-JL5qUnxTbMcgl0cLnbk94T22_xJtPhJ4/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvM2MyYzZkMGI3/ZjU1MTVhYjE4NDU0/N2U5ZTJmYmYwOWIu/anBn",
            desc: "Игровой ноутбук среднего сегмента. AMD Ryzen 9 8945HX, 32 ГБ RAM, NVIDIA RTX 5070 Ti 12 ГБ, 16\" 165 Гц, 1 ТБ SSD, MIL-STD.",
            memoryOptions: [
                { size: "16GB/512GB", price: 2900 + 1000, color: "Jaeger Gray" },
                { size: "32GB/1TB", price: 3500 + 1000, color: "Jaeger Gray" },
                { size: "32GB/2TB", price: 4100 + 1000, color: "Jaeger Gray" }
            ],
            defaultMemory: "16GB/512GB"
        },
        {
            id: 315,
            name: "Ноутбук ASUS Zenbook S 16 OLED",
            brand: "Ультрабуки",
            image: "https://imgproxy.onliner.by/8Yoayi5TymFDpRNJPP9-be5yOhVpglJfykwl2fiPQB0/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZWU4NmEyYjlh/MDAyZWM3NzhlY2Mx/NTVjYjYzMmM4N2Uu/anBn",
            desc: "Ультрабук премиум-класса. AMD Ryzen AI 9 HX 370, 32 ГБ RAM, 1 ТБ SSD, 16\" 3.2K OLED 120 Гц, вес 1.35 кг, керамический корпус.",
            memoryOptions: [
                { size: "16GB/1TB", price: 3600 + 1000, color: "Scandinavian White" },
                { size: "32GB/1TB", price: 4300 + 1000, color: "Scandinavian White" },
                { size: "32GB/2TB", price: 5000 + 1000, color: "Scandinavian White" }
            ],
            defaultMemory: "32GB/1TB"
        },
        {
            id: 316,
            name: "Ноутбук ASUS ROG Flow X13 (2026)",
            brand: "ASUS ROG",
            image: "https://imgproxy.onliner.by/WIlJejl3qqg5RKvYxh7gibDTn3LW_CSISFNgHfUXjNc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMTM5YTg0OTUx/NjdjNTg1NzQ5YzQ3/MDA0MDlhYjAwYTQu/anBn",
            desc: "Компактный игровой трансформер. AMD Ryzen 9 8940HS, 32 ГБ RAM, NVIDIA RTX 5070 8 ГБ, 13.4\" 165 Гц, 1 ТБ SSD, поддержка XG Mobile.",
            memoryOptions: [
                { size: "16GB/1TB", price: 4100 + 1000, color: "Black" },
                { size: "32GB/1TB", price: 4800 + 1000, color: "Black" },
                { size: "32GB/2TB", price: 5500 + 1000, color: "Black" }
            ],
            defaultMemory: "32GB/1TB"
        },
        {
            id: 317,
            name: "Ноутбук ASUS Vivobook Pro 15 OLED",
            brand: "ASUS",
            image: "https://imgproxy.onliner.by/WNPEtFPMuP3vMA_p8hFLKkIHjxzqEd6Eo_6XMUmfsM8/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMDkwZDJjMjZl/NjlkZDk4MDczNTg2/ODVlYTM0ODEyMzcu/anBn",
            desc: "Для творчества и работы. Intel Core Ultra 7 155H, 16 ГБ RAM, NVIDIA RTX 4050, 15.6\" OLED 120 Гц, 512 ГБ SSD, DialPad.",
            memoryOptions: [
                { size: "16GB/512GB", price: 2100 + 1000, color: "Silver" },
                { size: "16GB/1TB", price: 2500 + 1000, color: "Silver" },
                { size: "24GB/1TB", price: 3000 + 1000, color: "Silver" }
            ],
            defaultMemory: "16GB/512GB"
        },
        {
            id: 318,
            name: "Ноутбук ASUS ExpertBook B9 OLED",
            brand: "Ультрабуки",
            image: "https://imgproxy.onliner.by/43oxfLhbqGlI7QnDcN7ztVuH8FE2r-39TybPdpfrE8Y/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTQ3ZmJjYmY5/NmMwMzY1N2E1OTUz/NmM0YjRjZWY2NmEu/anBn",
            desc: "Бизнес-ультрабук премиум-класса. Intel Core Ultra 7 165U, 32 ГБ RAM, 1 ТБ SSD, 14\" OLED 2.8K, вес 980 г, корпус из магниевого сплава.",
            memoryOptions: [
                { size: "16GB/512GB", price: 3400 + 1000, color: "Black" },
                { size: "32GB/1TB", price: 4100 + 1000, color: "Black" },
                { size: "32GB/2TB", price: 4800 + 1000, color: "Black" }
            ],
            defaultMemory: "32GB/1TB"
        },
        //ASUS TUF Gaming (2026)
        {
    id: 600,
    name: "Игровой ноутбук ASUS TUF Gaming A16 2024 FA607NUG-WH73",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/ab9fa0bd0d128aa8eea3b0ffae4772c7.avif",
    desc: "AMD Ryzen 7 7445HS (6 ядер, до 4.7 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 4050 6 ГБ, 16\" IPS 1920x1200 144 Гц, Windows 10 Home, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 3499 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 601,
    name: "Игровой ноутбук ASUS TUF Gaming F16 FX608JPR-RV019 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/93a6ffcb22968d9111f17515c66d01ac.avif",
    desc: "Intel Core i7-14650HX (16 ядер, до 5.2 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 5070 8 ГБ, 16\" IPS 1920x1200 165 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 6999 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 602,
    name: "Игровой ноутбук ASUS TUF Gaming F16 FX608JMR-RV179",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/c6aadb80362699681257fad5965982da.avif",
    desc: "Intel Core i5-14450HX (10 ядер, до 4.8 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 5060 8 ГБ, 16\" IPS 1920x1200 165 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 5050 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 603,
    name: "Игровой ноутбук Asus TUF Gaming A16 FA607NUG-RL203 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/6588115c61a6a22a8dd240916fffe23b.avif",
    desc: "AMD Ryzen 7 7445HS (6 ядер, до 4.7 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 4050 6 ГБ, 16\" IPS 1920x1200 144 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 4099 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 604,
    name: "Игровой ноутбук Asus TUF Gaming F16 FX607VU-RL046 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/a09ca46ee9496aea56141052b454bed1.avif",
    desc: "Intel Core 5 210H (8 ядер, до 4.8 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 4050 6 ГБ, 16\" IPS 1920x1200 144 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 3799 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 605,
    name: "Игровой ноутбук ASUS TUF Gaming F16 FX608JM-RV048",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/ebd6efb2c347059a21d38f05ffb17c43.avif",
    desc: "Intel Core i5-13450HX (10 ядер, до 4.6 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 5060 8 ГБ, 16\" IPS 1920x1200 165 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4670 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 606,
    name: "Игровой ноутбук ASUS TUF Gaming A16 FA607NUG-RL144",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/30abc0251fdee21b5bfee2f9425a3aac.avif",
    desc: "AMD Ryzen 7 7445HS (6 ядер, до 4.7 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 4050 6 ГБ, 16\" IPS 1920x1200 144 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 4266 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 607,
    name: "Игровой ноутбук Asus TUF Gaming F16 FX608JH-RV065",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/4b6f54aeeebe1959f5b2c256f415ab2f.avif",
    desc: "Intel Core i5-13450HX (10 ядер, до 4.6 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 5050 8 ГБ, 16\" IPS 1920x1200 165 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4641 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 608,
    name: "Игровой ноутбук Asus TUF Gaming F16 FX607VU-RL148",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/a0e89451200b3700661f9415c42c0513.avif",
    desc: "Intel Core 5 210H (8 ядер, до 4.8 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 4050 6 ГБ, 16\" IPS 1920x1200 144 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 3691 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 609,
    name: "Игровой ноутбук Asus TUF Gaming A16 FA608PP-RV019",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/b8541c8c76e4ca79f98ce073960015c2.avif",
    desc: "AMD Ryzen 9 8940HX (16 ядер, до 5.3 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 5070 8 ГБ, 16\" IPS 1920x1200 165 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 6588 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 610,
    name: "Игровой ноутбук ASUS TUF Gaming F16 FX608JM-RV041",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/d7b8577aaca3db4b6c587c392880722f.avif",
    desc: "Intel Core i5-13450HX (10 ядер, до 4.6 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 5060 8 ГБ, 16\" IPS 1920x1200 165 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 5537 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 611,
    name: "Игровой ноутбук Asus TUF Gaming F16 FX608JM-RV059",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/f918df81ea35435e139c9f620d23dfe7.avif",
    desc: "Intel Core i5-13450HX (10 ядер, до 4.6 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 5060 8 ГБ, 16\" IPS 1920x1200 165 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4761 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 612,
    name: "Игровой ноутбук Asus TUF Gaming F16 FX608JP-RV023",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/840fd8ba62bb2ab74da8d5a94e61e9fd.avif",
    desc: "Intel Core i5-13450HX (10 ядер, до 4.6 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 5070 8 ГБ, 16\" IPS 1920x1200 165 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 5501 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 613,
    name: "Игровой ноутбук ASUS TUF Gaming F16 FX608JHR-RV088 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/0386ff1da03f584f513a632766aa6a23.avif",
    desc: "Intel Core i5-14450HX (10 ядер, до 4.8 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 5050 8 ГБ, 16\" IPS 1920x1200 165 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4888 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 614,
    name: "Игровой ноутбук ASUS TUF Gaming F16 FX608JHR-RV140 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/7dbdc83f06ea597db032655c74fb91bc.avif",
    desc: "Intel Core i5-14450HX (10 ядер, до 4.8 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 5050 8 ГБ, 16\" IPS 1920x1200 165 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4877 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 615,
    name: "Игровой ноутбук ASUS TUF Gaming A16 2025 FA608PM-RV041 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/a1e43c82844ca8ae11d20143218309fc.avif",
    desc: "AMD Ryzen 9 8940HX (16 ядер, до 5.3 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 5060 8 ГБ, 16\" IPS 1920x1200 165 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 5946 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 616,
    name: "Игровой ноутбук Asus TUF Gaming A16 FA608UP-RV100",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/d20d8af1ab19f80d68805035d67d18c3.avif",
    desc: "AMD Ryzen 7 260 (8 ядер, до 5.1 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 5070 8 ГБ, 16\" IPS 1920x1200 165 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 5999 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 617,
    name: "Игровой ноутбук Asus TUF Gaming F16 FX608JPR-RV077",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/12d3bf20aa3634886c8f0744a06bdab4.avif",
    desc: "Intel Core i7-14650HX (16 ядер, до 5.2 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 5070 8 ГБ, 16\" IPS 1920x1200 165 Гц, без ОС, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 6910 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 618,
    name: "Игровой ноутбук Asus TUF Gaming A16 FA607NUG-RL144 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/1da77de81196d6633ceff2806b4443dc.avif",
    desc: "AMD Ryzen 7 7445HS (6 ядер, до 4.5 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 4050 6 ГБ, 16\" IPS 1920x1200 144 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 4299 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 619,
    name: "Игровой ноутбук Asus TUF Gaming F16 FX607VU-RL112 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/d60954b2392d63baa6380d2ec937b8ec.avif",
    desc: "Intel Core i7-13620H (10 ядер, до 4.9 ГГц), 16 ГБ DDR5 RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 4050 6 ГБ, 16\" IPS 1920x1200 144 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 4499 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 620,
    name: "Игровой ноутбук ASUS TUF Gaming A16 2024 FA607NUG-RL124 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/6e00799972b3cb0dff961ac44a94c898.avif",
    desc: "AMD Ryzen 7 7445HS (6 ядер, до 4.7 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 4050 6 ГБ, 16\" IPS 1920x1200 144 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 3999 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 621,
    name: "Игровой ноутбук ASUS TUF Gaming F16 FX608JHR-RV141 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/46bfea73826af03374fdb5a9da75a6f3.avif",
    desc: "Intel Core i5-14450HX (10 ядер, до 4.8 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 5050 8 ГБ, 16\" IPS 1920x1200 165 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4599 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 622,
    name: "Игровой ноутбук Asus TUF Gaming F16 FX607VJ-RL198 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/8982d83caea4102efa1672226c348d7e.avif",
    desc: "Intel Core 5 210H (8 ядер, до 4.8 ГГц), 16 ГБ DDR4 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 3050 6 ГБ, 16\" IPS 1920x1200 144 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 3599 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 623,
    name: "Игровой ноутбук ASUS TUF Gaming F16 FX608JM-RV061 Win11Pro",
    brand: "ASUS TUF Gaming/Игровые",
    image: "images/c7cdcba4051bc4f5eb4da347ce1fac9a.avif",
    desc: "Intel Core i5-13450HX (10 ядер, до 4.6 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, NVIDIA GeForce RTX 5060 8 ГБ, 16\" IPS 1920x1200 165 Гц, Windows 11 Pro, вес 2.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 5399 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
}, 

        // === LENOVO (уже 10 моделей, оставляем как есть) ===
        {
            id: 321,
            name: "Ноутбук Lenovo Legion 9i Gen 9 (16″ Intel)",
            brand: "Игровые",
            image: "https://imgproxy.onliner.by/fW6PZa4nF0i_yqv4NFM_3c--3Ehfbg7fl65VP4swE3E/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvN2JlMGZiMTRm/ZmM2NmZjMWQ3MDJj/OGIwYWM0ZmViMWMu/anBn",
            desc: "Премиум игровой ноутбук. Intel Core i9-14900HX, 64 ГБ RAM, NVIDIA GeForce RTX 4090 16 ГБ, Mini-LED 3.2K 165 Гц, жидкостное охлаждение.",
            memoryOptions: [
                { size: "32GB/1TB", price: 6800 + 1000, color: "Carbon Black" },
                { size: "64GB/2TB", price: 7900 + 1000, color: "Carbon Black" },
                { size: "64GB/4TB", price: 9200 + 1000, color: "Carbon Black" }
            ],
            defaultMemory: "32GB/1TB"
        },
        {
            id: 322,
            name: "Ноутбук Lenovo ThinkPad X1 Carbon Gen 12",
            brand: "Ультрабуки",
            image: "https://www.cl.by/content/5/images/2508/1/72/95/10329572/UftxZATME8.jpg",
            desc: "Бизнес-ультрабук. Intel Core Ultra 7 165U, 32 ГБ RAM, 1 ТБ SSD, 14\" OLED 2.8K, вес 1.07 кг, корпус из углеродного волокна.",
            memoryOptions: [
                { size: "16GB/512GB", price: 5100 + 1000, color: "Black" },
                { size: "32GB/1TB", price: 6900 + 1000, color: "Black" },
                { size: "32GB/2TB", price: 7700 + 1000, color: "Black" }
            ],
            defaultMemory: "32GB/1TB"
        },
        {
            id: 323,
            name: "Ноутбук Lenovo Yoga Pro 9i (16″)",
            brand: "Ультрабуки",
            image: "https://imgproxy.onliner.by/qIgMtTKSIEnFX-2bAayn0qWPDkYbSBzkeupJ1qY0zXQ/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMDg4N2NjMzQy/NGViNDJiN2YyYTAz/NDdkYjQ0YWRkMzku/anBn",
            desc: "Универсальный ноутбук-трансформер. Intel Core i9-14900H, 32 ГБ RAM, NVIDIA RTX 4070, 16\" 3.2K Mini-LED, сенсорный экран.",
            memoryOptions: [
                { size: "16GB/1TB", price: 3900 + 1000, color: "Storm Grey" },
                { size: "32GB/1TB", price: 4600 + 1000, color: "Storm Grey" },
                { size: "32GB/2TB", price: 5300 + 1000, color: "Storm Grey" }
            ],
            defaultMemory: "32GB/1TB"
        },
        {
            id: 324,
            name: "Ноутбук Lenovo Legion 5 Pro 16″",
            brand: "Игровые",
            image: "https://imgproxy.onliner.by/fW6PZa4nF0i_yqv4NFM_3c--3Ehfbg7fl65VP4swE3E/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvN2JlMGZiMTRm/ZmM2NmZjMWQ3MDJj/OGIwYWM0ZmViMWMu/anBn",
            desc: "Популярный игровой ноутбук. AMD Ryzen 9 7945HX, 32 ГБ RAM, NVIDIA RTX 5070 Ti, 16\" 2.5K 240 Гц, 1 ТБ SSD.",
            memoryOptions: [
                { size: "16GB/512GB", price: 3400 + 1000, color: "Storm Grey" },
                { size: "32GB/1TB", price: 4100 + 1000, color: "Storm Grey" },
                { size: "32GB/2TB", price: 4800 + 1000, color: "Storm Grey" }
            ],
            defaultMemory: "32GB/1TB"
        },
        {
            id: 325,
            name: "Ноутбук Lenovo ThinkPad T14s Gen 5",
            brand: "LENOVO",
            image: "https://www.cl.by/content/5/images/2508/1/72/95/10329572/UftxZATME8.jpg",
            desc: "Корпоративный ноутбук. AMD Ryzen 7 PRO 8840U, 32 ГБ RAM, 1 ТБ SSD, 14\" IPS, отличная безопасность, автономность.",
            memoryOptions: [
                { size: "16GB/512GB", price: 2800 + 1000, color: "Black" },
                { size: "32GB/1TB", price: 3500 + 1000, color: "Black" },
                { size: "32GB/2TB", price: 4200 + 1000, color: "Black" }
            ],
            defaultMemory: "16GB/512GB"
        },

        {
            id: 327,
            name: "Ноутбук Lenovo ThinkBook 16p Gen 5",
            brand: "LENOVO",
            image: "https://imgproxy.onliner.by/JS1xmwRMx2a-FDb3g9iuxfOC6St_vmMY4LT6B58HV_g/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMzhmZDlkY2Nk/NWYyYzNjZDY3ZDBi/ZGU2ZjkxZmY0ZTAu/anBn",
            desc: "Для создателей контента. Intel Core i7-14650HX, 32 ГБ RAM, NVIDIA RTX 4060, 16\" 3.2K IPS, 1 ТБ SSD, стильный дизайн.",
            memoryOptions: [
                { size: "16GB/1TB", price: 3100 + 1000, color: "Dual Tone" },
                { size: "32GB/1TB", price: 3800 + 1000, color: "Dual Tone" },
                { size: "32GB/2TB", price: 4500 + 1000, color: "Dual Tone" }
            ],
            defaultMemory: "32GB/1TB"
        },
        {
            id: 328,
            name: "Ноутбук Lenovo Legion Slim 5",
            brand: "Игровые",
            image: "https://imgproxy.onliner.by/fW6PZa4nF0i_yqv4NFM_3c--3Ehfbg7fl65VP4swE3E/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvN2JlMGZiMTRm/ZmM2NmZjMWQ3MDJj/OGIwYWM0ZmViMWMu/anBn",
            desc: "Тонкий игровой ноутбук. AMD Ryzen 7 8845HS, 16 ГБ RAM, NVIDIA RTX 5060, 16\" 165 Гц, 512 ГБ SSD.",
            memoryOptions: [
                { size: "16GB/512GB", price: 2600 + 1000, color: "White" },
                { size: "16GB/1TB", price: 3000 + 1000, color: "White" },
                { size: "32GB/1TB", price: 3500 + 1000, color: "White" }
            ],
            defaultMemory: "16GB/512GB"
        },
        {
            id: 329,
            name: "Ноутбук Lenovo Yoga 7i 2-in-1",
            brand: "Ультрабуки",
            image: "https://p3-ofp.static.pub//fes/cms/2025/11/24/a4ycjqi47flcgjizgn413cs1yaxm8l790879.png?width=400&height=400",
            desc: "Трансформер для учебы. Intel Core Ultra 5 125U, 16 ГБ RAM, 512 ГБ SSD, 14\" 2.2K сенсор, стилус в комплекте.",
            memoryOptions: [
                { size: "16GB/512GB", price: 1900 + 1000, color: "Arctic Grey" },
                { size: "16GB/1TB", price: 2300 + 1000, color: "Arctic Grey" }
            ],
            defaultMemory: "16GB/512GB"
        },


        // === HP (уже 10 моделей, оставляем как есть) ===
        {
            id: 331,
            name: "Ноутбук HP OMEN Transcend 16 (2026)",
            brand: "Игровые/HP",
            image: "https://imgproxy.onliner.by/uimbBYe2BJTKJ0KiMGhmb21xIOSXRrTPTklSwOXsRsc/w:700/h:550/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2UvMjAyNC9k/ODIxODk0YWNiZDI3/ZTI3MDU0M2FmNGNm/ZTQ4MWMzOS5qcGVn",
            desc: "Игровой ноутбук. Intel Core Ultra 9 285H, 32 ГБ RAM, NVIDIA GeForce RTX 5090 16 ГБ, 16\" Mini-LED 240 Гц, 2 ТБ SSD.",
            memoryOptions: [
                { size: "16GB/1TB", price: 4700 + 1000, color: "Shadow Black" },
                { size: "32GB/1TB", price: 5500 + 1000, color: "Shadow Black" },
                { size: "32GB/2TB", price: 6300 + 1000, color: "Shadow Black" }
            ],
            defaultMemory: "32GB/1TB"
        },
       
        {
            id: 333,
            name: "Ноутбук HP Envy 17 (2026)",
            brand: "HP",
            image: "https://imgproxy.onliner.by/BN4GDtUpLcGEcbMytTs_s5FEvggLiAVKOl3_SRk3jUM/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYmQ0MWJhNDJj/NWZmZmExOWZjOTMx/MWFiNmIwMzM3MjIu/anBlZw",
            desc: "Мультимедийный ноутбук. Intel Core Ultra 7 155H, 32 ГБ RAM, NVIDIA RTX 4050, 17.3\" 4K, 1 ТБ SSD, отличный звук.",
            memoryOptions: [
                { size: "16GB/1TB", price: 2900 + 1000, color: "Silver" },
                { size: "32GB/1TB", price: 3500 + 1000, color: "Silver" },
                { size: "32GB/2TB", price: 4200 + 1000, color: "Silver" }
            ],
            defaultMemory: "16GB/1TB"
        },
        {
            id: 334,
            name: "Ноутбук HP ZBook Power G11",
            brand: "HP",
            image: "https://imgproxy.onliner.by/12zidUPlp4sVTDa_W_jPsixUQawVnNU-UUnm81SonHE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYjk2ZjE4NjBj/YWRkMzE0ZjhkMzEw/YTBmNDE2MGY1ZjMu/anBn",
            desc: "Мобильная рабочая станция. Intel Core i7-14650HX, 64 ГБ RAM, NVIDIA RTX 3000 Ada, 15.6\" FHD, 1 ТБ SSD, сертифицирована ISV.",
            memoryOptions: [
                { size: "32GB/512GB", price: 4100 + 1000, color: "Black" },
                { size: "64GB/1TB", price: 5200 + 1000, color: "Black" },
                { size: "64GB/2TB", price: 6200 + 1000, color: "Black" }
            ],
            defaultMemory: "32GB/512GB"
        },
        {
            id: 335,
            name: "Ноутбук HP Victus 16 (2026)",
            brand: "HP",
            image: "https://imgproxy.onliner.by/k32l6vlCnfnn1sHQ4foQaFzhAEGQapG4C0jeNOpbg_Q/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYzkwNDljNDFh/YTdhNWFkM2I1NjAx/NTJiNGU4ZDRhNjYu/anBn",
            desc: "Доступный игровой ноутбук. AMD Ryzen 7 8845HS, 16 ГБ RAM, NVIDIA RTX 5060, 16.1\" 144 Гц, 512 ГБ SSD.",
            memoryOptions: [
                { size: "16GB/512GB", price: 2100 + 1000, color: "Blue" },
                { size: "16GB/1TB", price: 2500 + 1000, color: "Blue" },
                { size: "32GB/1TB", price: 3000 + 1000, color: "Blue" }
            ],
            defaultMemory: "16GB/512GB"
        },

        
        {
            id: 338,
            name: "Ноутбук HP Chromebook x360 14c",
            brand: "HP",
            image: "https://imgproxy.onliner.by/_Yt1QK3Ad11t9_6CmGqUsJfbil-Jv3BbEa53V9xnWu0/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZDM4OGQ2YzNh/NzQxZjI1ZmIyMWY1/MTgxYjA5NjY4NDIu/anBlZw",
            desc: "Трансформер на ChromeOS. Intel Core i5-1235U, 8 ГБ RAM, 256 ГБ SSD, 14\" сенсорный, стилус, быстрая загрузка.",
            memoryOptions: [
                { size: "8GB/256GB", price: 950 + 1000, color: "Silver" }
            ],
            defaultMemory: "8GB/256GB"
        },
        {
            id: 339,
            name: "Ноутбук HP ProBook 450 G11",
            brand: "HP",
            image: "https://hp-service.by/wp-content/uploads/2024/11/HP-ProBook-460-G11.png",
            desc: "Надежный рабочий ноутбук. Intel Core i5-1335U, 16 ГБ RAM, 512 ГБ SSD, 15.6\" FHD, отличная эргономика.",
            memoryOptions: [
                { size: "16GB/512GB", price: 1400 + 1000, color: "Silver" },
                { size: "16GB/1TB", price: 1800 + 1000, color: "Silver" }
            ],
            defaultMemory: "16GB/512GB"
        },
        {
            id: 340,
            name: "Ноутбук HP OMEN 17 (2026)",
            brand: "Игровые",
            image: "https://imgproxy.onliner.by/GRD3rB0op9cbB5s48OFFq4-SjRjZpjUQlEzwPYCv6oc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvY2MwNDBjM2U0/Nzk3YjAyY2U0Mzll/MjZiNTY5OWQ3MDAu/anBlZw",
            desc: "Мощный игровой ноутбук. Intel Core i9-14900HX, 32 ГБ RAM, NVIDIA RTX 5080, 17.3\" 240 Гц, 2 ТБ SSD, механическая клавиатура.",
            memoryOptions: [
                { size: "32GB/1TB", price: 5800 + 1000, color: "Black" },
                { size: "32GB/2TB", price: 6600 + 1000, color: "Black" },
                { size: "64GB/2TB", price: 7600 + 1000, color: "Black" }
            ],
            defaultMemory: "32GB/1TB"
        },

   
        // === THUNDEROBOT (уже 10 моделей, оставляем как есть) ===
{
    id: 351,
    name: "Thunderobot 911S Core D",
    brand: "THUNDEROBOT",
    image: "images/11e6ec47f021c4343a79e6172d41d7f4.avif",
    desc: "Intel Core i5-12450H, 16 ГБ RAM, RTX 3050 4 ГБ, 15.6\" 144 Гц, SSD 512 ГБ.",
    memoryOptions: [
        { size: "16GB/512GB", price: 2899 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 352,
    name: "Thunderobot 911X Wild Hunter G3 Evo",
    brand: "THUNDEROBOT",
    image: "images/1a92841b44912180385557b4f3bdb7b3.avif",
    desc: "Intel Core i5-13420H, 16 ГБ RAM, RTX 5050 8 ГБ, 15.6\" 165 Гц, SSD 512 ГБ.",
    memoryOptions: [
        { size: "16GB/512GB", price: 3999 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 353,
    name: "Thunderobot 911 Plus G3 XD",
    brand: "THUNDEROBOT",
    image: "images/a929d094f21b85221487137a2ee0183c.avif",
    desc: "Intel Core i5-13420H, 16 ГБ RAM, RTX 4050 6 ГБ, 17.3\" 144 Гц, SSD 512 ГБ.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4299 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 354,
    name: "Thunderobot Range 17 G2 Max",
    brand: "THUNDEROBOT",
    image: "images/86801fc44d1ba1a19b264e1db319cf43.avif",
    desc: "Intel Core i7-13620H, 32 ГБ RAM, RTX 5070, 17.3\" 2K 165 Гц, SSD 1 ТБ.",
    memoryOptions: [
        { size: "32GB/1TB", price: 6999 + 1000, color: "Black" }
    ],
    defaultMemory: "32GB/1TB"
},
{
    id: 355,
    name: "Thunderobot Gravity 16 G2 Pro",
    brand: "THUNDEROBOT",
    image: "images/2f361e50426784efadae5e05dc7ae06a.avif",
    desc: "Intel Core i9-13900HX, 32 ГБ RAM, RTX 5060, 16\" 300 Гц, SSD 1 ТБ.",
    memoryOptions: [
        { size: "32GB/1TB", price: 7499 + 1000, color: "Black" }
    ],
    defaultMemory: "32GB/1TB"
},
{
    id: 356,
    name: "Thunderobot 911X Wild Hunter G3 Pro",
    brand: "THUNDEROBOT",
    image: "images/837d08a0aa918260e67ab99d8ef037f6.avif",
    desc: "Intel Core i5-13420H, 16 ГБ RAM, RTX 5060, 15.6\" 165 Гц, SSD 1 ТБ.",
    memoryOptions: [
        { size: "16GB/1TB", price: 4899 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 357,
    name: "Thunderobot 911 Plus SD",
    brand: "THUNDEROBOT",
    image: "images/0e93947acb9294a6b96a547263d8600d.avif",
    desc: "Intel Core i5-12450H, 16 ГБ RAM, RTX 3050, 17.3\" 144 Гц, SSD 512 ГБ.",
    memoryOptions: [
        { size: "16GB/512GB", price: 3499 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 358,
    name: "Thunderobot Range 17 G2 Evo",
    brand: "THUNDEROBOT",
    image: "images/6a7ba668dbb64af1cfda2d6e16b8da7b.avif",
    desc: "Intel Core i5-13420H, 16 ГБ RAM, RTX 5050, 17.3\" 144 Гц, SSD 1 ТБ.",
    memoryOptions: [
        { size: "16GB/1TB", price: 4799 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 359,
    name: "Thunderobot Range 16 Max",
    brand: "THUNDEROBOT",
    image: "images/75310239a198d39d91094d0edf087035.avif",
    desc: "Intel Core i7-13620H, 16 ГБ RAM, RTX 5070, 16\" 2.5K 180 Гц, SSD 1 ТБ.",
    memoryOptions: [
        { size: "16GB/1TB", price: 6199 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 360,
    name: "Thunderobot Zero 16 Ultra",
    brand: "THUNDEROBOT",
    image: "images/44c206cc4f037444da977a3cc63961bb.avif",
    desc: "Intel Core Ultra 7, 32 ГБ RAM, RTX 5080, 16\" 360 Гц, SSD 1 ТБ.",
    memoryOptions: [
        { size: "32GB/1TB", price: 12255 + 1000, color: "Black" }
    ],
    defaultMemory: "32GB/1TB"
},

     

     

        // === HONOR (уже 10 моделей, оставляем как есть) ===
     {
    id: 391,
    name: "Ноутбук Honor MagicBook X16 2025 GOH-X 5301APLM",
    brand: "HONOR",
    image: "images/cc28d7ad4cbafd4fb197989bd8ec96ec (1).avif",
    desc: "AMD Ryzen 5 6600H (6 ядер, до 4.5 ГГц), 16 ГБ LPDDR5X RAM, SSD 512 ГБ, AMD Radeon Graphics, 16\" IPS 1920x1200 60 Гц, без ОС, вес 1.74 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 1999 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 392,
    name: "Ноутбук Honor MagicBook X16 2025 GOH-X 5301APLL",
    brand: "HONOR",
    image: "images/f2ec312cbe7e2e6be69f24d649649e3a (1).avif",
    desc: "AMD Ryzen 5 6600H (6 ядер, до 4.5 ГГц), 16 ГБ LPDDR5X RAM, SSD 512 ГБ, AMD Radeon Graphics, 16\" IPS 1920x1200 60 Гц, Windows 11 Home, вес 1.74 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 2299 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 393,
    name: "Ноутбук Honor MagicBook X16 2025 BRG-565 5301ALWS",
    brand: "HONOR",
    image: "images/9c326e1603e611d337cc59ac6e6fafb5 (1).avif",
    desc: "Intel Core i5-13420H (8 ядер, до 4.6 ГГц), 16 ГБ LPDDR4X RAM, SSD 512 ГБ, Intel UHD Graphics, 16\" IPS 1920x1200 60 Гц, Windows 11 Home, вес 1.68 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 2699 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 394,
    name: "Ноутбук Honor MagicBook X16 2025 BRG-565 5301ALXN",
    brand: "HONOR",
    image: "images/f208b11f59b63ba0aa390f66ca5acb0f.avif",
    desc: "Intel Core i5-13420H (8 ядер, до 4.6 ГГц), 16 ГБ LPDDR4X RAM, SSD 512 ГБ, Intel UHD Graphics, 16\" IPS 1920x1200 60 Гц, без ОС, вес 1.68 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 2399 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 395,
    name: "Ноутбук Honor MagicBook X14 Plus 2025 FRB-X 5301ALWA",
    brand: "HONOR",
    image: "images/84132b23fb64d0eefb695a75ca8096d2.avif",
    desc: "Intel Core 5 220H (12 ядер, до 4.9 ГГц), 16 ГБ LPDDR4X RAM, SSD 1024 ГБ, Intel Iris Xe Graphics, 14\" IPS 2880x1800 60 Гц, Windows 11 Home, вес 1.34 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 3539 + 1000, color: "Silver" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 396,
    name: "Ноутбук Honor MagicBook X16 2026 BRG-X 5301ARGM",
    brand: "HONOR",
    image: "images/d67a9106a6ae4f65d2b4699a94444b61.avif",
    desc: "Intel Core Ultra 5 125H (14 ядер, до 4.5 ГГц), 16 ГБ LPDDR5X RAM, SSD 1024 ГБ, Intel Arc Graphics, 16\" IPS 1920x1200 60 Гц, Windows 11 Home, вес 1.75 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 3702 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 397,
    name: "Ноутбук Honor MagicBook X16 Plus 2024 BRI-76",
    brand: "HONOR",
    image: "images/cecbc6bf6d43357efd5feed8b57ed78f.avif",
    desc: "AMD Ryzen 7 8845HS (8 ядер, до 5.1 ГГц), 16 ГБ LPDDR5X RAM, SSD 512 ГБ, AMD Radeon Graphics, 16\" IPS 1920x1080 60 Гц, Windows 11 Home, вес 1.75 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4381 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 398,
    name: "Ноутбук Honor MagicBook X14 2025 FRG-X 5301ALWG",
    brand: "HONOR",
    image: "images/c51aabf96f736c68d54d75a62ea08203.avif",
    desc: "Intel Core i5-13420H (8 ядер, до 4.6 ГГц), 16 ГБ LPDDR4X RAM, SSD 512 ГБ, Intel UHD Graphics, 14\" IPS 1920x1200 60 Гц, Windows 11 Home, вес 1.4 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 3189 + 1000, color: "Silver" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 399,
    name: "Ноутбук Honor MagicBook Art 14 2025 MRB-A 5301AQHF",
    brand: "Ультрабуки",
    image: "images/ff4281b5339507e2b85c2c3111ce3578.avif",
    desc: "Intel Core Ultra 7 255H (16 ядер, до 5.1 ГГц), 32 ГБ LPDDR5X RAM, SSD 1024 ГБ, Intel Arc Graphics, 14.6\" OLED 3120x2080, Windows 11 Home, вес 1.03 кг.",
    memoryOptions: [
        { size: "32GB/1TB", price: 6999 + 1000, color: "Silver" }
    ],
    defaultMemory: "32GB/1TB"
},
{
    id: 400,
    name: "Ноутбук Honor MagicBook X14 2025 GDG-X 5301ALWY",
    brand: "HONOR",
    image: "images/d040a1a0a290a513004586eb5824b48d.avif",
    desc: "Intel Core i5-12450H (8 ядер, до 4.4 ГГц), 8 ГБ LPDDR4X RAM, SSD 512 ГБ, Intel UHD Graphics, 14\" IPS 1920x1200 60 Гц, без ОС, вес 1.5 кг.",
    memoryOptions: [
        { size: "8GB/512GB", price: 1999 + 1000, color: "Silver" }
    ],
    defaultMemory: "8GB/512GB"
},
{
    id: 401,
    name: "Ноутбук Honor MagicBook Pro 16 DRA-54 5301AJJG",
    brand: "HONOR",
    image: "images/d86c5ef7fe206b56b7c26cae0945ba46.avif",
    desc: "Intel Core Ultra 5 125H (14 ядер, до 4.5 ГГц), 24 ГБ LPDDR5X RAM, SSD 1024 ГБ, Intel Arc Graphics, 16\" IPS 3072x1920 165 Гц, Windows 11 Home, вес 1.8 кг.",
    memoryOptions: [
        { size: "24GB/1TB", price: 4499 + 1000, color: "Gray" }
    ],
    defaultMemory: "24GB/1TB"
},
{
    id: 402,
    name: "Ноутбук Honor MagicBook Pro 16 DRA-54 5301AJJE",
    brand: "HONOR",
    image: "images/1f0952fd4307f1cd1d062445b0f5db51.avif",
    desc: "Intel Core Ultra 5 125H (14 ядер, до 4.5 ГГц), 24 ГБ LPDDR5X RAM, SSD 1024 ГБ, Intel Arc Graphics, 16\" IPS 3072x1920 165 Гц, Windows 11 Home, вес 1.8 кг.",
    memoryOptions: [
        { size: "24GB/1TB", price: 4499 + 1000, color: "Gray" }
    ],
    defaultMemory: "24GB/1TB"
},
{
    id: 403,
    name: "Ноутбук Honor MagicBook Pro 16 2025 DRB-P 5301APWK",
    brand: "HONOR",
    image: "images/06c6515b682d45d148e746a4a77b296f.avif",
    desc: "Intel Core Ultra 9 285H (16 ядер, до 5.4 ГГц), 32 ГБ LPDDR5X RAM, SSD 1024 ГБ, NVIDIA GeForce RTX 5060 8 ГБ, 16\" IPS 3072x1920 165 Гц, Windows 11 Home, вес 1.89 кг.",
    memoryOptions: [
        { size: "32GB/1TB", price: 7999 + 1000, color: "Black" }
    ],
    defaultMemory: "32GB/1TB"
},
{
    id: 404,
    name: "Ноутбук Honor MagicBook X16 2025 BRG-385 5301ALXS",
    brand: "HONOR",
    image: "images/987d5e3a01b3e1b1eb2fcf13962da53e.avif",
    desc: "Intel Core i3-1315U (6 ядер, до 4.5 ГГц), 8 ГБ LPDDR4X RAM, SSD 512 ГБ, Intel UHD Graphics, 16\" IPS 1920x1200 60 Гц, без ОС, вес 1.68 кг.",
    memoryOptions: [
        { size: "8GB/512GB", price: 1699 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/512GB"
},
{
    id: 405,
    name: "Ноутбук Honor MagicBook X14 2025 GDG-X 5301ALXB",
    brand: "HONOR",
    image: "images/16cad8670d501deb3b5dd322a94e4615.avif",
    desc: "Intel Core i3-1315U (6 ядер, до 4.5 ГГц), 8 ГБ LPDDR4X RAM, SSD 512 ГБ, Intel UHD Graphics, 14\" IPS 1920x1200 60 Гц, FreeDos, вес 1.4 кг.",
    memoryOptions: [
        { size: "8GB/512GB", price: 1784 + 1000, color: "Silver" }
    ],
    defaultMemory: "8GB/512GB"
},
{
    id: 406,
    name: "Ультрабук Honor MagicBook Art 14 MRA-721 5301AKXJ",
    brand: "HONOR",
    image: "images/32e13800da407abd016f7e31c6c33bcc.avif",
    desc: "Intel Core Ultra 7 155H (16 ядер, до 4.8 ГГц), 32 ГБ LPDDR5X RAM, SSD 1024 ГБ, Intel Arc Graphics, 14.6\" OLED 3120x2080 120 Гц, Windows 11 Home, вес 1.03 кг.",
    memoryOptions: [
        { size: "32GB/1TB", price: 6199 + 1000, color: "Silver" }
    ],
    defaultMemory: "32GB/1TB"
},
{
    id: 407,
    name: "Ноутбук Honor MagicBook X16 Plus 2025 BRB-X 5301ALVV",
    brand: "HONOR",
    image: "images/2b786fa6537665c22ed6764a6b6921b7.avif",
    desc: "Intel Core 5 220H (12 ядер, до 4.9 ГГц), 16 ГБ LPDDR4X RAM, SSD 1024 ГБ, Intel Iris Xe Graphics, 16\" IPS 1920x1200 120 Гц, Windows 11 Home, вес 1.75 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 3799 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 408,
    name: "Ультрабук Honor MagicBook Art 14 MRA-521 5301AKXN",
    brand: "Ультрабуки/HONOR",
    image: "images/f0b6a1121434ffae348b23cf9ce3bbf1.avif",
    desc: "Intel Core Ultra 5 125H (14 ядер, до 4.5 ГГц), 32 ГБ LPDDR5X RAM, SSD 1024 ГБ, Intel Arc Graphics, 14.6\" OLED 3120x2080 120 Гц, Windows 11 Home, вес 1.03 кг.",
    memoryOptions: [
        { size: "32GB/1TB", price: 5499 + 1000, color: "Silver" }
    ],
    defaultMemory: "32GB/1TB"
},

     

        // === ДОБАВЛЯЕМ НЕДОСТАЮЩИЕ БРЕНДЫ ДО 10 МОДЕЛЕЙ ===

        // Игровые ноутбуки (добавляем до 10)
      

        // Ультрабуки (добавляем до 10)
       {
    id: 500,
    name: "Ультрабук Apple MacBook Air 13\" M2 16/256 Midnight MC7X4HN/A A2681 + Адаптер Red Line BS-01 16A",
    brand: "Ультрабуки/MacBook",
    image: "images/9a012019e290c28df22f766eea845261.avif",
    desc: "Apple M2 (8 ядер, до 3.2 ГГц), 16 ГБ RAM, SSD 256 ГБ, Apple M2 GPU (8 ядер), 13.6\" IPS 2560x1664 60 Гц, вес 1.24 кг.",
    memoryOptions: [
        { size: "16GB/256GB", price: 2999 + 1000, color: "Midnight" }
    ],
    defaultMemory: "16GB/256GB"
},
{
    id: 501,
    name: "Ультрабук Apple MacBook Air 13\" M2 16/256 Starlight MC7W4HN/A A2681 + Адаптер Red Line BS-01 16A",
    brand: "Ультрабук/MacBook",
    image: "images/24907c1b6ec1acfd714e6719aaf4b9cf.avif",
    desc: "Apple M2 (8 ядер, до 3.2 ГГц), 16 ГБ RAM, SSD 256 ГБ, Apple M2 GPU (8 ядер), 13.6\" IPS 2560x1664 60 Гц, вес 1.24 кг.",
    memoryOptions: [
        { size: "16GB/256GB", price: 2999 + 1000, color: "Starlight" }
    ],
    defaultMemory: "16GB/256GB"
},
{
    id: 502,
    name: "Ультрабук Apple MacBook Air 13\" M4 16/256 Midnight MW123 A3240 + Адаптер Red Line BS-01 16А",
    brand: "Ультрабуки/MacBook",
    image: "images/9234db95cab56c5bd1216eb8c6a59084.avif",
    desc: "Apple M4 (10 ядер), 16 ГБ RAM, SSD 256 ГБ, Apple M4 GPU (8 ядер), 13.6\" IPS 2560x1664 60 Гц, вес 1.24 кг.",
    memoryOptions: [
        { size: "16GB/256GB", price: 3899 + 1000, color: "Midnight" }
    ],
    defaultMemory: "16GB/256GB"
},
{
    id: 503,
    name: "Ноутбук Horizont H-book 14 14IPK4 TU4E4WO",
    brand: "Ультрабуки",
    image: "images/c34f96569d8a038d976bfcd223c9aa77.avif",
    desc: "Intel Core Ultra 5 115U (8 ядер, до 4.2 ГГц), 16 ГБ LPDDR5 RAM, SSD 512 ГБ, Intel Iris Xe Graphics, 14\" IPS 1920x1200 60 Гц, Windows 11 Pro, вес 0.97 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 2491 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 504,
    name: "Ультрабук Apple MacBook Air 13\" M3 16/512 Midnight MXCV3HN/A A3113 + Адаптер Red Line BS-01 16А",
    brand: "Ультрабуки/MacBook",
    image: "images/9420d186ab182aa5e71501802b760e1a.avif",
    desc: "Apple M3 (8 ядер), 16 ГБ RAM, SSD 512 ГБ, Apple M3 GPU (10 ядер), 13.6\" IPS 2560x1664 60 Гц, вес 1.24 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4199 + 1000, color: "Midnight" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 505,
    name: "Ноутбук Apple MacBook Air 15\" M4 2025 A3241 MW1J3LL/A + Адаптер Red Line BS-01 16А",
    brand: "Ультрабуки/MacBook",
    image: "images/a32c109a338a1d9f2ad98b09c1f31376.avif",
    desc: "Apple M4 (10 ядер), 16 ГБ RAM, SSD 256 ГБ, Apple M4 GPU (10 ядер), 15.3\" IPS 2880x1864 60 Гц, вес 1.51 кг.",
    memoryOptions: [
        { size: "16GB/256GB", price: 4999 + 1000, color: "Silver" }
    ],
    defaultMemory: "16GB/256GB"
},
{
    id: 506,
    name: "Ультрабук Asus ZenBook A14 OLED UX3407QA-QD197W",
    brand: "Ультрабуки/ASUS",
    image: "images/ebe473846b51b1b2d6ad1f4fbe940037.avif",
    desc: "Qualcomm Snapdragon X1-26-100 (8 ядер, до 2.97 ГГц), 16 ГБ LPDDR5X RAM, SSD 512 ГБ, Qualcomm Adreno, 14\" OLED 1920x1200 60 Гц, Windows 11 Home, вес 0.98 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 3761 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 507,
    name: "Ноутбук ASUS Zenbook 14 OLED UM3406KA-QD331 Win11Pro",
    brand: "Ультрабуки/ASUS",
    image: "images/5e4fe7b7bc42135c86f2e1c9bee6654a.avif",
    desc: "AMD Ryzen AI 5 340 (6 ядер, до 4.8 ГГц), 16 ГБ LPDDR5X RAM, SSD 512 ГБ, AMD Radeon Graphics, 14\" OLED 1920x1200 60 Гц, Windows 11 Pro, вес 1.2 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 3599 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 508,
    name: "Ноутбук Asus Zenbook 14 UX3405CA-QL708 90NB14W4-M011J0 Win11Pro",
    brand: "Ультрабуки/ASUS",
    image: "images/f42aae7302a4a170a5024e511656d827.avif",
    desc: "Intel Core Ultra 7 255H (16 ядер, до 5.1 ГГц), 32 ГБ LPDDR5X RAM, SSD 1024 ГБ, Intel Arc Graphics, 14\" OLED 1920x1200 60 Гц, Windows 11 Pro, вес 1.22 кг.",
    memoryOptions: [
        { size: "32GB/1TB", price: 5399 + 1000, color: "Gray" }
    ],
    defaultMemory: "32GB/1TB"
},
{
    id: 509,
    name: "Ноутбук ASUS VivoBook S16 S3607VA-RP096 Win11Pro",
    brand: "Ультрабуки/ASUS",
    image: "images/80ff04a9a01be6374fa821d9597fd0ae.avif",
    desc: "Intel Core 5 210H (8 ядер, до 4.8 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, Intel Iris Xe Graphics, 16\" IPS 1920x1200 144 Гц, Windows 11 Pro, вес 1.8 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 2899 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 510,
    name: "Ноутбук Huawei MateBook D 14 MDG-X 53014MUB",
    brand: "Ультрабуки",
    image: "images/e4c5a6e47528524606f1d02885aa859d.avif",
    desc: "Intel Core i5-13420H (8 ядер, до 4.6 ГГц), 16 ГБ LPDDR4X RAM, SSD 1024 ГБ, Intel UHD Graphics, 14\" IPS 1920x1200 60 Гц, без ОС, вес 1.39 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 2299 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 511,
    name: "Ноутбук Chuwi CoreBook Air 14 (CWI652-R5660016G512G) Windows 11 Home",
    brand: "Ультрабуки",
    image: "images/298fc22a3e666f9f26f92f693987dbf5.avif",
    desc: "AMD Ryzen 5 6600H (6 ядер, до 4.5 ГГц), 16 ГБ LPDDR5 RAM, SSD 512 ГБ, AMD Radeon Graphics, 14\" IPS 1920x1080 60 Гц, Windows 11 Home, вес 1.5 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 1899 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 512,
    name: "Ноутбук Horizont H-book 14 14IPK4 T54E4WO",
    brand: "Ультрабуки",
    image: "images/f29bee56bd057fa899768fda1778f97e.avif",
    desc: "Intel Core i5-13500H (12 ядер, до 4.7 ГГц), 16 ГБ LPDDR5 RAM, SSD 512 ГБ, Intel Iris Xe Graphics, 14\" IPS 1920x1200 60 Гц, Windows 11 Pro, вес 0.97 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 2549 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 513,
    name: "Ноутбук Apple Macbook Pro 14.2\" M5 2025 MDE04LL/A + Адаптер Red Line BS-01 16А",
    brand: "Ультрабуки/MacBook",
    image: "images/925cc9623ebe940fb4d109a9095fe8b1.avif",
    desc: "Apple M5 (10 ядер), 16 ГБ LPDDR5X RAM, SSD 512 ГБ, Apple M5 GPU (10 ядер), 14.2\" IPS 3024x1964 120 Гц, Mac OS, вес 1.55 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 6999 + 1000, color: "Silver" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 514,
    name: "Ноутбук Apple MacBook Air 13\" M4 2025 A3240 MW0W3PA/A + Адаптер Red Line BS-01 16А",
    brand: "Ультрабуки/MacBook",
    image: "images/3a0011d96fe550dabc382ce563c7a301.avif",
    desc: "Apple M4 (10 ядер), 16 ГБ RAM, SSD 256 ГБ, Apple M4 GPU (8 ядер), 13.6\" IPS 2560x1664 60 Гц, вес 1.24 кг.",
    memoryOptions: [
        { size: "16GB/256GB", price: 3899 + 1000, color: "Silver" }
    ],
    defaultMemory: "16GB/256GB"
},
{
    id: 515,
    name: "Ультрабук Apple MacBook Air 13\" M4 16/256 Space Gray MW0W3 A3240 + Red Line BS-01 16А",
    brand: "Ультрабуки/MacBook",
    image: "images/c0b17307ef95f405a22cd3e389ba1e5e (1).avif",
    desc: "Apple M4 (10 ядер), 16 ГБ RAM, SSD 256 ГБ, Apple M4 GPU (8 ядер), 13.6\" IPS 2560x1664 60 Гц, вес 1.24 кг.",
    memoryOptions: [
        { size: "16GB/256GB", price: 3899 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "16GB/256GB"
},
{
    id: 516,
    name: "Ноутбук Apple Macbook Pro 14.2\" M5 2025 MDE44LL/A + Адаптер Red Line BS-01 16А",
    brand: "Ультрабуки/MacBook",
    image: "images/ca886a9555029a06a108e07adeb178f7.avif",
    desc: "Apple M5 (10 ядер), 16 ГБ LPDDR5X RAM, SSD 512 ГБ, Apple M5 GPU (10 ядер), 14.2\" IPS 3024x1964 120 Гц, Mac OS, вес 1.55 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 6999 + 1000, color: "Silver" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 517,
    name: "Ноутбук Apple MacBook Air 13\" M4 2025 A3240 MW0W3HN/A + Адаптер Red Line BS-01 16А",
    brand: "Ультрабуки/MacBook",
    image: "images/9cd313667b1a61153059f763c4b2c2a1.avif",
    desc: "Apple M4 (10 ядер), 16 ГБ RAM, SSD 256 ГБ, Apple M4 GPU (8 ядер), 13.6\" IPS 2560x1664 60 Гц, вес 1.24 кг.",
    memoryOptions: [
        { size: "16GB/256GB", price: 3899 + 1000, color: "Silver" }
    ],
    defaultMemory: "16GB/256GB"
},
{
    id: 518,
    name: "Ноутбук Apple MacBook Air 15\" M4 16/256 A3241 MW1L3LL/A Midnight",
    brand: "Ультрабуки/MacBook",
    image: "images/6eb11f3ece12457af6edbfa760621239.avif",
    desc: "Apple M4 (10 ядер, до 4 ГГц), 16 ГБ RAM, SSD 256 ГБ, Apple M4 GPU (10 ядер), 15.3\" IPS 2880x1864 60 Гц, Mac OS, вес 1.51 кг.",
    memoryOptions: [
        { size: "16GB/256GB", price: 5680 + 1000, color: "Midnight" }
    ],
    defaultMemory: "16GB/256GB"
},
{
    id: 519,
    name: "Ноутбук Honor MagicBook X14 Plus 2025 FRB-X 5301ALWA",
    brand: "Ультрабуки/HONOR",
    image: "images/84132b23fb64d0eefb695a75ca8096d2 (1).avif",
    desc: "Intel Core 5 220H (12 ядер, до 4.9 ГГц), 16 ГБ LPDDR4X RAM, SSD 1024 ГБ, Intel Iris Xe Graphics, 14\" IPS 2880x1800 60 Гц, Windows 11 Home, вес 1.34 кг.",
    memoryOptions: [
        { size: "16GB/1TB", price: 3539 + 1000, color: "Silver" }
    ],
    defaultMemory: "16GB/1TB"
},
{
    id: 520,
    name: "Ультрабук Lenovo ThinkPad E14 G7 21SX004TFW",
    brand: "Ультрабуки/LENOVO",
    image: "images/124639f5f8a446d9c81ad9f9bbdec584.avif",
    desc: "Intel Core Ultra 7 255H (16 ядер, до 5.1 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, Intel Arc Graphics, 14\" IPS 1920x1200 60 Гц, без ОС, вес 1.34 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4710 + 1000, color: "Black" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 521,
    name: "Ультрабук Asus ZenBook A14 OLED UX3407QA-QD267W",
    brand: "Ультрабуки/ASUS",
    image: "images/e5f4762553c4f66533c50742ff5b962a.avif",
    desc: "Qualcomm Snapdragon X1-26-100 (8 ядер, до 2.97 ГГц), 16 ГБ LPDDR5X RAM, SSD 512 ГБ, Qualcomm Adreno, 14\" OLED 1920x1200 60 Гц, Windows 11 Home, вес 0.98 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 4049 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 522,
    name: "Ноутбук ASUS VivoBook S16 S3607VA-RP174",
    brand: "Ультрабуки/ASUS",
    image: "images/2001cce4b8a544239cb31751eb70155b.avif",
    desc: "Intel Core 5 210H (8 ядер, до 4.8 ГГц), 16 ГБ DDR5 RAM, SSD 512 ГБ, Intel Iris Xe Graphics, 16\" IPS 1920x1200 144 Гц, без ОС, вес 1.7 кг.",
    memoryOptions: [
        { size: "16GB/512GB", price: 2844 + 1000, color: "Gray" }
    ],
    defaultMemory: "16GB/512GB"
},
{
    id: 523,
    name: "Ультрабук Lenovo ThinkPad X1 Carbon G13 Aura Edition 21NX00F8FW",
    brand: "Ультрабуки/LENOVO",
    image: "images/cfb52a09c4d61e0c4119b60c861280be.avif",
    desc: "Intel Core Ultra 7 255U (12 ядер, до 5.2 ГГц), 32 ГБ LPDDR5X RAM, SSD 1024 ГБ, Intel Arc Graphics, 14\" IPS 1920x1200 60 Гц, Windows 11 Pro, вес 1 кг.",
    memoryOptions: [
        { size: "32GB/1TB", price: 10340 + 1000, color: "Black" }
    ],
    defaultMemory: "32GB/1TB"
},
  


       

  
        // HP Omen (добавляем до 10)
        {
            id: 432,
            name: "Ноутбук HP Omen 16 (2026)",
            brand: "HP Omen",
            image: "images/43d993f21ef21f7bade86588067f587f.webp",
            desc: "Игровой ноутбук. Intel Core i9-14900HX, 32 ГБ RAM, NVIDIA RTX 5080, 16\" 240 Гц, 2 ТБ SSD.",
            memoryOptions: [
                { size: "16GB/1TB", price: 4200 + 1000, color: "Black" },
                { size: "32GB/1TB", price: 4900 + 1000, color: "Black" }
            ],
            defaultMemory: "16GB/1TB"
        },
        {
            id: 433,
            name: "Ноутбук HP Omen Transcend 14",
            brand: "HP Omen",
            image: "images/8071e4f522448714e9f6250483fe1730.webp",
            desc: "Компактный игровой. Intel Core Ultra 9 185H, 32 ГБ RAM, NVIDIA RTX 5070, 14\" OLED 120 Гц, 1 ТБ SSD.",
            memoryOptions: [
                { size: "16GB/1TB", price: 3800 + 1000, color: "White" },
                { size: "32GB/1TB", price: 4500 + 1000, color: "White" }
            ],
            defaultMemory: "16GB/1TB"
        },
        {
            id: 434,
            name: "Ноутбук HP Omen 17 (2025)",
            brand: "HP Omen",
            image: "images/hp-omen-17-2025-mini.jpeg",
            desc: "Мощный игровой. Intel Core i9-13900HX, 32 ГБ RAM, NVIDIA RTX 4090, 17.3\" 165 Гц, 2 ТБ SSD.",
            memoryOptions: [
                { size: "32GB/1TB", price: 5100 + 1000, color: "Black" },
                { size: "32GB/2TB", price: 5900 + 1000, color: "Black" }
            ],
            defaultMemory: "32GB/1TB"
        }
    ],

    microwaves: [
        // Samsung (10 моделей)
       {
    id: 675,
    name: "Микроволновая печь Samsung MS23K3513AK/BW",
    brand: "Samsung",
    image: "images/2e2c0676d93b3218766bae2cbcbfff16.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 359 + 1000,
    memoryOptions: [
        { size: "23L", price: 359 + 1000, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 676,
    name: "Микроволновая печь Samsung MS23K3614AW/BW",
    brand: "Samsung",
    image: "images/8e85a87ac63a985883faca477d63328b.avif",
    desc: "23 л, мощность 800 Вт, механическое управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 399 + 1000,
    memoryOptions: [
        { size: "23L", price: 399 + 1000, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 677,
    name: "Микроволновая печь Samsung MS23A7013AB/BW",
    brand: "Samsung",
    image: "images/8f014d77c3676c79b018a47770462b14.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, керамика, диаметр тарелки 288 мм, встраиваемая.",
    price: 739 + 1000,
    memoryOptions: [
        { size: "23L", price: 739 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 678,
    name: "Микроволновая печь Samsung MG23K3515AW/BW",
    brand: "Samsung",
    image: "images/1ebdfe7b220df7960ad8bb5535f48ef5.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 479 + 1000,
    memoryOptions: [
        { size: "23L", price: 479 + 1000, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 679,
    name: "Микроволновая печь Samsung MS23T5018AC/BW",
    brand: "Samsung",
    image: "images/d3a28e0007353860fb537914585e780f.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 489 + 1000,
    memoryOptions: [
        { size: "23L", price: 489 + 1000, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 680,
    name: "Микроволновая печь встраиваемая SAMSUNG MG22M8054AK/BW",
    brand: "Samsung",
    image: "images/fb703fe8f62e30a73fcb1ff73b0ad5ac.avif",
    desc: "22 л, мощность 850 Вт, электронное управление, гриль, биокерамическое покрытие, диаметр тарелки 255 мм, встраиваемая.",
    price: 949 + 1000,
    memoryOptions: [
        { size: "22L", price: 949 + 1000, color: "Black" }
    ],
    defaultMemory: "22L"
},
{
    id: 681,
    name: "Микроволновая печь Samsung MS23A7118AK/BW",
    brand: "Samsung",
    image: "images/dad8f1d03bc6c0aa6137ab8c3aa41052.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, керамика, диаметр тарелки 288 мм, встраиваемая.",
    price: 929 + 1000,
    memoryOptions: [
        { size: "23L", price: 929 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 682,
    name: "Встраиваемая микроволновая печь Samsung MS23A7118AW/BW",
    brand: "Samsung",
    image: "images/3e71d5370e12b8bb145fae4a9ef2e64a.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, встраиваемая.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "23L", price: 899 + 1000, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 683,
    name: "Микроволновая печь Samsung MS23K3614AK/BW черный",
    brand: "Samsung",
    image: "images/b8d60a5e7a9fe48812595cb47bedf688.avif",
    desc: "23 л, мощность 800 Вт, механическое управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 399 + 1000,
    memoryOptions: [
        { size: "23L", price: 399 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 684,
    name: "Микроволновая печь Samsung MS23K3513AS/BW",
    brand: "Samsung",
    image: "images/3a67226b03ab40f26ba71d2e6e119d1a.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 449 + 1000,
    memoryOptions: [
        { size: "23L", price: 449 + 1000, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 685,
    name: "Микроволновая печь Samsung MG23T5018AK/BW",
    brand: "Samsung",
    image: "images/4a48f2fea9edaa7e4b8b930511406331.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 529 + 1000,
    memoryOptions: [
        { size: "23L", price: 529 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 686,
    name: "Микроволновая печь Samsung MG23T5018AN/BW",
    brand: "Samsung",
    image: "images/8b5f09fea091dd01573bf4202545a21a.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 509 + 1000,
    memoryOptions: [
        { size: "23L", price: 509 + 1000, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 687,
    name: "Микроволновая печь Samsung MG23DG4524ATBW",
    brand: "Samsung",
    image: "images/1b6415f09e95c404c642661eb36761a0.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 529 + 1000,
    memoryOptions: [
        { size: "23L", price: 529 + 1000, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 688,
    name: "Микроволновая печь Samsung MG23K3513AK/BW",
    brand: "Samsung",
    image: "images/34774f2fb1860a3df6050155c9ee0890.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 495 + 1000,
    memoryOptions: [
        { size: "23L", price: 495 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 689,
    name: "Микроволновая печь SAMSUNG MC28H5013AK/BW",
    brand: "Samsung",
    image: "images/b5d0e7f5336e14134e0ac3d114cd41de.avif",
    desc: "28 л, мощность 900 Вт, электронное управление, гриль, конвекция, биокерамика, диаметр тарелки 320 мм, отдельностоящая.",
    price: 679 + 1000,
    memoryOptions: [
        { size: "28L", price: 679 + 1000, color: "Black" }
    ],
    defaultMemory: "28L"
},
{
    id: 690,
    name: "Микроволновая печь встраиваемая SAMSUNG MG22M8074AT/BW",
    brand: "Samsung",
    image: "images/228c886b546cd3bed890fb1e4708ef34.avif",
    desc: "22 л, мощность 850 Вт, электронное управление, гриль, биокерамическое покрытие, диаметр тарелки 255 мм, встраиваемая.",
    price: 949 + 1000,
    memoryOptions: [
        { size: "22L", price: 949 + 1000, color: "White" }
    ],
    defaultMemory: "22L"
},
{
    id: 691,
    name: "Микроволновая печь встраиваемая SAMSUNG MQ8000M (MS22M8054AK/BW)",
    brand: "Samsung",
    image: "images/727050202d3c3c006dd3b5d95b80851e.avif",
    desc: "22 л, мощность 850 Вт, электронное управление, биокерамическое покрытие, диаметр тарелки 255 мм, встраиваемая.",
    price: 949 + 1000,
    memoryOptions: [
        { size: "22L", price: 949 + 1000, color: "Black" }
    ],
    defaultMemory: "22L"
},
{
    id: 692,
    name: "Микроволновая печь Samsung MG30T5018AK/BW",
    brand: "Samsung",
    image: "images/cac905abb602d3e15a67678188f41746.avif",
    desc: "30 л, мощность 900 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 318 мм, отдельностоящая.",
    price: 649 + 1000,
    memoryOptions: [
        { size: "30L", price: 649 + 1000, color: "Black" }
    ],
    defaultMemory: "30L"
},
{
    id: 693,
    name: "Микроволновая печь Samsung MG23DG4524AGBW",
    brand: "Samsung",
    image: "images/6c8f8e41be03edd0cb5abc098d377155.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 529 + 1000,
    memoryOptions: [
        { size: "23L", price: 529 + 1000, color: "Gray" }
    ],
    defaultMemory: "23L"
},
{
    id: 694,
    name: "Микроволновая печь Samsung MS32DG4504AGBW",
    brand: "Samsung",
    image: "images/b9a6db7b02eda7ff7b8731a57949e6fc.avif",
    desc: "32 л, мощность 800 Вт, электронное управление, биокерамика, отдельностоящая.",
    price: 579 + 1000,
    memoryOptions: [
        { size: "32L", price: 579 + 1000, color: "Gray" }
    ],
    defaultMemory: "32L"
},
{
    id: 695,
    name: "Встраевамая микроволновая печь Samsung MG23A7013AA/BW",
    brand: "Samsung",
    image: "images/8c714d1d3c7c8b389bba220a30c34075.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, керамика, диаметр тарелки 288 мм, встраиваемая.",
    price: 979 + 1000,
    memoryOptions: [
        { size: "23L", price: 979 + 1000, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 696,
    name: "Микроволновая печь Samsung MS23T5018AG/BW",
    brand: "Samsung",
    image: "images/7d80ba0dfd41d2fd5dfda2a1bc42ac25.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 489 + 1000,
    memoryOptions: [
        { size: "23L", price: 489 + 1000, color: "Gray" }
    ],
    defaultMemory: "23L"
},
{
    id: 697,
    name: "Микроволновая печь Samsung MS23DG4504ATBW",
    brand: "Samsung",
    image: "images/b781264461354f11a2e587dd6e658a01.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 489 + 1000,
    memoryOptions: [
        { size: "23L", price: 489 + 1000, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 698,
    name: "Микроволновая печь Samsung MG23K3515AK/BW",
    brand: "Samsung",
    image: "images/820aa8daddc04baf60f1f5e4fa635358.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 499 + 1000,
    memoryOptions: [
        { size: "23L", price: 499 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},

        // LG (10 моделей)
{
    id: 651,
    name: "Микроволновая печь LG MS2042DARB",
    brand: "LG",
    image: "images/8629b46a796ae9888d333c94546adb4f.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, легкоочищаемое покрытие, диаметр тарелки 245 мм, отдельностоящая.",
    price: 316 + 1000,
    memoryOptions: [
        { size: "20L", price: 316 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 652,
    name: "Микроволновая печь LG MS2042DY",
    brand: "LG",
    image: "images/d48f0c7373ed5e9399368809b4702153.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, легкоочищаемое покрытие, диаметр тарелки 245 мм, отдельностоящая.",
    price: 316 + 1000,
    memoryOptions: [
        { size: "20L", price: 316 + 1000, color: "Yellow" }
    ],
    defaultMemory: "20L"
},
{
    id: 653,
    name: "Микроволновая печь LG MS2042DB",
    brand: "LG",
    image: "images/f3ffa3b80aadf9f1bc9625af645c9398.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, легкоочищаемое покрытие, диаметр тарелки 245 мм, отдельностоящая.",
    price: 316 + 1000,
    memoryOptions: [
        { size: "20L", price: 316 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 654,
    name: "Микроволновая печь LG MS2032GAS",
    brand: "LG",
    image: "images/01ae2d051744f14cab50afe307e28e69.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, диаметр тарелки 245 мм, отдельностоящая.",
    price: 408 + 1000,
    memoryOptions: [
        { size: "20L", price: 408 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 655,
    name: "Микроволновая печь с технологией Smart Inverter LG MW23R35GIB",
    brand: "LG",
    image: "images/a6572e785816c32098198b99b876ac03.avif",
    desc: "23 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 469 + 1000,
    memoryOptions: [
        { size: "23L", price: 469 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 656,
    name: "Микроволновая печь с технологией Smart Inverter LG MS2596CIT",
    brand: "LG",
    image: "images/f4813ece9c333202365dbe99f423c624.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 552 + 1000,
    memoryOptions: [
        { size: "25L", price: 552 + 1000, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 657,
    name: "Микроволновая печь LG MS20R42D",
    brand: "LG",
    image: "images/406c0465be5d9cc44ee6dcb156c9e1ac.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, легкоочищаемое покрытие, диаметр тарелки 245 мм, отдельностоящая.",
    price: 317 + 1000,
    memoryOptions: [
        { size: "20L", price: 317 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 658,
    name: "Микроволновая печь LG MW23D35GIH",
    brand: "LG",
    image: "images/5ec329ee578cfca80b87be38fabd808e.avif",
    desc: "23 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 469 + 1000,
    memoryOptions: [
        { size: "23L", price: 469 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 659,
    name: "Микроволновая печь LG MH6336GIB",
    brand: "LG",
    image: "images/ff810d95b68f6d399b61a42fdb826750.avif",
    desc: "23 л, мощность 1000 Вт, электронное управление, гриль, эмаль, диаметр тарелки 292 мм, отдельностоящая.",
    price: 509 + 1000,
    memoryOptions: [
        { size: "23L", price: 509 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 660,
    name: "Микроволновая печь LG MW23R35GIH",
    brand: "LG",
    image: "images/bce447f97ebf79a59c163efd95970526.avif",
    desc: "23 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 485 + 1000,
    memoryOptions: [
        { size: "23L", price: 485 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 661,
    name: "Микроволновая печь LG MW25R35GISL",
    brand: "LG",
    image: "images/304938cd040abb88465d81494c4ba996.avif",
    desc: "25 л, мощность 1150 Вт, электронное управление, инвертор, антибактериальное покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 575 + 1000,
    memoryOptions: [
        { size: "25L", price: 575 + 1000, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 662,
    name: "Микроволновая печь LG MS2535GIS",
    brand: "LG",
    image: "images/92ebcdc3f47bb1f71a8dff4a64810147.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 534 + 1000,
    memoryOptions: [
        { size: "25L", price: 534 + 1000, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 663,
    name: "Микроволновая печь LG MS2044V",
    brand: "LG",
    image: "images/a543d1084ae1b7abae42966eb924fb21.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 317 + 1000,
    memoryOptions: [
        { size: "20L", price: 317 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 664,
    name: "Микроволновая печь с технологией Smart Inverter LG MH63M38GISW",
    brand: "LG",
    image: "images/05d9f052464fbfdf93f922536894759e.avif",
    desc: "23 л, мощность 1000 Вт, сенсорное управление, инвертор, гриль, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 504 + 1000,
    memoryOptions: [
        { size: "23L", price: 504 + 1000, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 665,
    name: "Микроволновая печь LG MW25R35GIS",
    brand: "LG",
    image: "images/665c9d07e63b9b8b536ab1846417535a.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 563 + 1000,
    memoryOptions: [
        { size: "25L", price: 563 + 1000, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 666,
    name: "Микроволновая печь LG MW23W35GIB",
    brand: "LG",
    image: "images/035be05cc8707c5a219ef3d886dbb93a.avif",
    desc: "23 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 478 + 1000,
    memoryOptions: [
        { size: "23L", price: 478 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 667,
    name: "Микроволновая печь LG MH6032GAS",
    brand: "LG",
    image: "images/9a60fb41c778d76776128257c2fe2152.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, гриль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 438 + 1000,
    memoryOptions: [
        { size: "20L", price: 438 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 668,
    name: "Микроволновая печь LG MB65W65DIR",
    brand: "LG",
    image: "images/e434b1114d1cd3cfbc8ab4c6735cb207 (1).avif",
    desc: "25 л, мощность 1000 Вт, электронное управление, гриль, антибактериальное покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 621 + 1000,
    memoryOptions: [
        { size: "25L", price: 621 + 1000, color: "White" }
    ],
    defaultMemory: "25L"
},
{
    id: 669,
    name: "Микроволновая печь LG MJ3966ACT",
    brand: "LG",
    image: "images/0fb69732fb6dde3f560f58bf31c8886b.avif",
    desc: "39 л, мощность 1100 Вт, сенсорное управление, гриль, конвекция, легкоочищаемое покрытие, диаметр тарелки 360 мм, отдельностоящая.",
    price: 999 + 1000,
    memoryOptions: [
        { size: "39L", price: 999 + 1000, color: "Black" }
    ],
    defaultMemory: "39L"
},
{
    id: 670,
    name: "Микроволновая печь LG MW25R35GISH",
    brand: "LG",
    image: "images/da21a6831330abae71565819d7fc4664.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 561 + 1000,
    memoryOptions: [
        { size: "25L", price: 561 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 671,
    name: "Микроволновая печь LG MS2535GISH",
    brand: "LG",
    image: "images/f070216f1af2384b049d285ffaffa8e7.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 539 + 1000,
    memoryOptions: [
        { size: "25L", price: 539 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 672,
    name: "Микроволновая печь LG MJ3965BIS",
    brand: "LG",
    image: "images/146dc22d5a3666532403c200e63b83c4.avif",
    desc: "39 л, мощность 1100 Вт, сенсорное управление, гриль, конвекция, легкоочищаемое покрытие, диаметр тарелки 360 мм, отдельностоящая.",
    price: 1266 + 1000,
    memoryOptions: [
        { size: "39L", price: 1266 + 1000, color: "Black" }
    ],
    defaultMemory: "39L"
},
{
    id: 673,
    name: "Встраиваемая микроволновая печь LG MS2595CIST",
    brand: "LG",
    image: "images/9f9f79af8c7db137d29c4f59fdba88c0.avif",
    desc: "25 л, мощность 1150 Вт, электронное управление, антибактериальное покрытие, эмаль, диаметр тарелки 292 мм, встраиваемая.",
    price: 889 + 1000,
    memoryOptions: [
        { size: "25L", price: 889 + 1000, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 674,
    name: "Микроволновая печь с технологией Smart Inverter LG MB65R95DIS",
    brand: "LG",
    image: "images/44d87f6441747e51f52e32c6b70186f2.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, инвертор, гриль, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 603 + 1000,
    memoryOptions: [
        { size: "25L", price: 603 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},

        // PANASONIC (10 моделей)
    {
    id: 645,
    name: "Печь свч с грилем PANASONIC NN-GT261WZPE",
    brand: "Panasonic",
    image: "images/c28d83f2588dc107a8595e2d0433a2b0.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 715 + 1000,
    memoryOptions: [
        { size: "20L", price: 715 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 646,
    name: "Микроволновая печь Panasonic NN-C69MSZPE",
    brand: "Panasonic",
    image: "images/1b4bebb0fa7941f9812595fd173ee627.avif",
    desc: "30 л, мощность 1000 Вт, электронное управление, гриль, конвекция, нержавеющая сталь, диаметр тарелки 315 мм, отдельностоящая.",
    price: 1395 + 1000,
    memoryOptions: [
        { size: "30L", price: 1395 + 1000, color: "Silver" }
    ],
    defaultMemory: "30L"
},
{
    id: 647,
    name: "Микроволновая печь Panasonic NN-CS89LBZPE",
    brand: "Panasonic",
    image: "images/a16b8e108c7ee689b741724deef6adc5.avif",
    desc: "31 л, мощность 1000 Вт, электронное управление, нержавеющая сталь, отдельностоящая.",
    price: 4162 + 1000,
    memoryOptions: [
        { size: "31L", price: 4162 + 1000, color: "Black" }
    ],
    defaultMemory: "31L"
},
{
    id: 648,
    name: "Микроволновая печь Panasonic NN-SD36HBZPE",
    brand: "Panasonic",
    image: "images/dbbf9b89076a68a7084d838ea7dfafd9.avif",
    desc: "23 л, мощность 1000 Вт, электронное управление, эмаль, диаметр тарелки 285 мм, отдельностоящая.",
    price: 892 + 1000,
    memoryOptions: [
        { size: "23L", price: 892 + 1000, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 649,
    name: "Микроволновая печь PANASONIC NN-GD38HSZPE",
    brand: "Panasonic",
    image: "images/0ce1da028820f996e3dba318c5e77ade.avif",
    desc: "23 л, мощность 1000 Вт, электронное управление, гриль, эмаль, диаметр тарелки 285 мм, отдельностоящая.",
    price: 801 + 1000,
    memoryOptions: [
        { size: "23L", price: 801 + 1000, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 650,
    name: "Микроволновая печь PANASONIC NN-GT264MZPE",
    brand: "Panasonic",
    image: "images/b1f82b880eea4b5b044a572b80778e6a.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 559 + 1000,
    memoryOptions: [
        { size: "20L", price: 559 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},

        // Haier (10 моделей)
      {
    id: 629,
    name: "Встраиваемая микроволновая печь Haier HMX-BTG259B",
    brand: "Haier",
    image: "images/10130462135f9ed084005ec6f804017c.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1066 + 1000,
    memoryOptions: [
        { size: "25L", price: 1066 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 630,
    name: "Встраиваемая микроволновая печь Haier HMX-BTG259W",
    brand: "Haier",
    image: "images/25a1d986bcc4d708d6b073940d47169c.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1069 + 1000,
    memoryOptions: [
        { size: "25L", price: 1069 + 1000, color: "White" }
    ],
    defaultMemory: "25L"
},
{
    id: 631,
    name: "Микроволновая печь Haier HMX-BPG259B",
    brand: "Haier",
    image: "images/695bc2fce3f76bfdd07163256869c7d5.avif",
    desc: "25 л, мощность 900 Вт, сенсорное управление, гриль, конвекция, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1246 + 1000,
    memoryOptions: [
        { size: "25L", price: 1246 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 632,
    name: "Микроволновая печь Haier HMB-MM207SA",
    brand: "Haier",
    image: "images/e51303dbef348b6330e4e9adbbab8cab.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 293 + 1000,
    memoryOptions: [
        { size: "20L", price: 293 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 633,
    name: "Микроволновая печь Haier HMB-MM207WA",
    brand: "Haier",
    image: "images/add9550a30d9b22e5cd91df195993773.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 273 + 1000,
    memoryOptions: [
        { size: "20L", price: 273 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 634,
    name: "Микроволновая печь Haier HMX-BTG259LX",
    brand: "Haier",
    image: "images/9ad0dba8c57eb1c597310e50d81d7113.avif",
    desc: "25 л, мощность 900 Вт, сенсорное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1016 + 1000,
    memoryOptions: [
        { size: "25L", price: 1016 + 1000, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 635,
    name: "Микроволновая печь Haier HMB-DM208SA",
    brand: "Haier",
    image: "images/255a916dd74640a0d2f4381f4db0d72e.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 342 + 1000,
    memoryOptions: [
        { size: "20L", price: 342 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 636,
    name: "Микроволновая печь Haier HMB-DM208BA",
    brand: "Haier",
    image: "images/33cd415e79cfa42c08bbb3ad8054584a.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 323 + 1000,
    memoryOptions: [
        { size: "20L", price: 323 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 637,
    name: "Микроволновая печь Haier HMB-MM208SA",
    brand: "Haier",
    image: "images/077b6d274840b1e3546fb8dee70ea7da.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 313 + 1000,
    memoryOptions: [
        { size: "20L", price: 313 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 638,
    name: "Микроволновая печь Haier HMB-MM208BA",
    brand: "Haier",
    image: "images/9c09e9d76959e385594c1af6975255ed.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 295 + 1000,
    memoryOptions: [
        { size: "20L", price: 295 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 639,
    name: "Встраиваемая микроволновая печь Haier HMX-BDC399B",
    brand: "Haier",
    image: "images/384e081be32d5618c0aabf66d48b71e9.avif",
    desc: "40 л, мощность 900 Вт, электронное управление, гриль, конвекция, эмаль, встраиваемая.",
    price: 2291 + 1000,
    memoryOptions: [
        { size: "40L", price: 2291 + 1000, color: "Black" }
    ],
    defaultMemory: "40L"
},
{
    id: 640,
    name: "Микроволновая печь Haier HMB-DG208SA",
    brand: "Haier",
    image: "images/6f041cbcabe55ae3dfdc40184cc3988b.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 362 + 1000,
    memoryOptions: [
        { size: "20L", price: 362 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 641,
    name: "Встраиваемая микроволновая печь Haier HMX-BDC399W",
    brand: "Haier",
    image: "images/4ad50e3467cd679287ccb1551ac923f4.avif",
    desc: "40 л, мощность 900 Вт, электронное управление, гриль, конвекция, эмаль, встраиваемая.",
    price: 2064 + 1000,
    memoryOptions: [
        { size: "40L", price: 2064 + 1000, color: "White" }
    ],
    defaultMemory: "40L"
},
{
    id: 642,
    name: "Микроволновая печь Haier HMX-BTG207X",
    brand: "Haier",
    image: "images/6b0a5d412581394e6fa3b15630e82015.avif",
    desc: "20 л, мощность 700 Вт, сенсорное управление, гриль, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 931 + 1000,
    memoryOptions: [
        { size: "20L", price: 931 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 643,
    name: "Встраиваемая микроволновая печь Haier HMX-BDG259LX",
    brand: "Haier",
    image: "images/d30931d88df9890d7174d7e8682c8f9f.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 832 + 1000,
    memoryOptions: [
        { size: "25L", price: 832 + 1000, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 644,
    name: "Микроволновая печь Haier HMG-DG207BA",
    brand: "Haier",
    image: "images/0f7f8d4311944f31f87b0aba3a41baab.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, гриль, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 563 + 1000,
    memoryOptions: [
        { size: "20L", price: 563 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
        // Bosch (10 моделей)
    {
    id: 609,
    name: "Встраиваемая микроволновая печь Bosch BFL524MB0",
    brand: "Bosch",
    image: "images/dd2ccc9a08d0dbeab12a10b56c3b6e54.avif",
    desc: "20 л, мощность 800 Вт, сенсорное управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 1095 + 1000,
    memoryOptions: [
        { size: "20L", price: 1095 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 610,
    name: "Встраиваемая микроволновая печь Bosch BFL554MB0",
    brand: "Bosch",
    image: "images/9e7d4a30edbe65843a4af0c1fb993156.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1392 + 1000,
    memoryOptions: [
        { size: "25L", price: 1392 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 611,
    name: "Микроволновая печь Bosch BFL520MB0",
    brand: "Bosch",
    image: "images/a11067e5c4de0eac3a5bfc2fd570a004.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 1102 + 1000,
    memoryOptions: [
        { size: "20L", price: 1102 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 612,
    name: "Микроволновая печь Bosch BFL523MB3",
    brand: "Bosch",
    image: "images/9d0d10d20fa511e760d6af1b2f6e5427.avif",
    desc: "20 л, мощность 800 Вт, сенсорное управление, эмаль, диаметр тарелки 270 мм, встраиваемая.",
    price: 838 + 1000,
    memoryOptions: [
        { size: "20L", price: 838 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 613,
    name: "Микроволновая печь Bosch BFL524MW0",
    brand: "Bosch",
    image: "images/6eb0a36910f91fa536d9c0bacf48c6e8.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 1225 + 1000,
    memoryOptions: [
        { size: "20L", price: 1225 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 614,
    name: "Встраиваемая микроволновая печь Bosch BFL524MS0",
    brand: "Bosch",
    image: "images/97139555b8097a6e85dc41a549a72c7c.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 1083 + 1000,
    memoryOptions: [
        { size: "20L", price: 1083 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 615,
    name: "Встраиваемая микроволновая печь Bosch BFL520MS0",
    brand: "Bosch",
    image: "images/2aa7052242322a9a224a4c6f0bc74673.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 880 + 1000,
    memoryOptions: [
        { size: "20L", price: 880 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 616,
    name: "Встраиваемая микроволновая печь Bosch BEL554MB0",
    brand: "Bosch",
    image: "images/0441400d9e5ec25f7c016e821f4d9168.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1316 + 1000,
    memoryOptions: [
        { size: "25L", price: 1316 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 617,
    name: "Встраиваемая микроволновая печь Bosch BFL7221B1",
    brand: "Bosch",
    image: "images/ae7e4c557be85225e68e3baf2b72a65e.avif",
    desc: "21 л, мощность 900 Вт, электронное управление, нержавеющая сталь, без поворотного стола, встраиваемая.",
    price: 2755 + 1000,
    memoryOptions: [
        { size: "21L", price: 2755 + 1000, color: "Black" }
    ],
    defaultMemory: "21L"
},
{
    id: 618,
    name: "Встраиваемая микроволновая печь Bosch BFL623MB3",
    brand: "Bosch",
    image: "images/93eb944e1a7b74ff233ce52210bc4337.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 270 мм, встраиваемая.",
    price: 977 + 1000,
    memoryOptions: [
        { size: "20L", price: 977 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 619,
    name: "Встраиваемая микроволновая печь Bosch BEL554MS0",
    brand: "Bosch",
    image: "images/280481cb15b5288a40d0f9aa9e9a7a6a.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1762 + 1000,
    memoryOptions: [
        { size: "25L", price: 1762 + 1000, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 620,
    name: "Встраиваемая микроволновая печь Bosch BEL653MW3",
    brand: "Bosch",
    image: "images/2c813e5bed071fabdf27a1d19379f1e5.avif",
    desc: "25 л, мощность 800 Вт, сенсорное управление, гриль, эмаль, диаметр тарелки 290 мм, встраиваемая.",
    price: 1152 + 1000,
    memoryOptions: [
        { size: "25L", price: 1152 + 1000, color: "White" }
    ],
    defaultMemory: "25L"
},
{
    id: 621,
    name: "Встраиваемая микроволновая печь Bosch BFL7221W1",
    brand: "Bosch",
    image: "images/1df25b6cefcc106477b09d0f42f6dfa1.avif",
    desc: "21 л, мощность 900 Вт, электронное управление, нержавеющая сталь, без поворотного стола, встраиваемая.",
    price: 2934 + 1000,
    memoryOptions: [
        { size: "21L", price: 2934 + 1000, color: "White" }
    ],
    defaultMemory: "21L"
},
{
    id: 622,
    name: "Встраиваемая микроволновая печь Bosch BEL7321B1",
    brand: "Bosch",
    image: "images/6f8d4cc24be1bb4c5194e1968e5ec195.avif",
    desc: "21 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, встраиваемая.",
    price: 3021 + 1000,
    memoryOptions: [
        { size: "21L", price: 3021 + 1000, color: "Black" }
    ],
    defaultMemory: "21L"
},
{
    id: 623,
    name: "Встраиваемая микроволновая печь Bosch BFR7221B1",
    brand: "Bosch",
    image: "images/7bb321a1a6f2446383992e94677eea16.avif",
    desc: "21 л, мощность 900 Вт, электронное управление, нержавеющая сталь, встраиваемая.",
    price: 2741 + 1000,
    memoryOptions: [
        { size: "21L", price: 2741 + 1000, color: "Black" }
    ],
    defaultMemory: "21L"
},
{
    id: 624,
    name: "Встраиваемая микроволновая печь Bosch BEL623MD3",
    brand: "Bosch",
    image: "images/0ccbe394bd55f1490c64adb83295191e.avif",
    desc: "20 л, мощность 800 Вт, сенсорное управление, гриль, эмаль, диаметр тарелки 270 мм, встраиваемая.",
    price: 1259 + 1000,
    memoryOptions: [
        { size: "20L", price: 1259 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 625,
    name: "Микроволновая печь Bosch BFL523MW3",
    brand: "Bosch",
    image: "images/f49a97debd948659192fbeb4a727271f.avif",
    desc: "20 л, мощность 800 Вт, сенсорное управление, эмаль, диаметр тарелки 270 мм, встраиваемая.",
    price: 1288 + 1000,
    memoryOptions: [
        { size: "20L", price: 1288 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 626,
    name: "Встраиваемая микроволновая печь Bosch BFL623MW3",
    brand: "Bosch",
    image: "images/b13867e1d6934875f2d6994261c61820.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 270 мм, встраиваемая.",
    price: 1377 + 1000,
    memoryOptions: [
        { size: "20L", price: 1377 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 627,
    name: "Встраиваемая микроволновая печь Bosch BFL524MB2",
    brand: "Bosch",
    image: "images/bb1c40265a7890b2e7c2e93e886e735a.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 1581 + 1000,
    memoryOptions: [
        { size: "20L", price: 1581 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 628,
    name: "Микроволновая печь Bosch BFL623MS3",
    brand: "Bosch",
    image: "images/9e79866e3cd13c0c033000b1acde5beb.avif",
    desc: "20 л, мощность 800 Вт, сенсорное управление, эмаль, диаметр тарелки 270 мм, встраиваемая.",
    price: 1428 + 1000,
    memoryOptions: [
        { size: "20L", price: 1428 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},

        // Maunfeld (10 моделей)
 {
    id: 585,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO.20.8GB",
    brand: "Maunfeld",
    image: "images/42427d6c0cd55a5db78ce861307c3915.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 541 + 1000,
    memoryOptions: [
        { size: "20L", price: 541 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 586,
    name: "Микроволновая печь MAUNFELD MFSMO.20.7SGB",
    brand: "Maunfeld",
    image: "images/7b952dee43b84b43b9504e499fa3723c.avif",
    desc: "20 л, мощность 700 Вт, сенсорное управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 269 + 1000,
    memoryOptions: [
        { size: "20L", price: 269 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 587,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO820SGB10",
    brand: "Maunfeld",
    image: "images/ed74336c415e2231bea938cbcb0e44cc.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 535 + 1000,
    memoryOptions: [
        { size: "20L", price: 535 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 588,
    name: "Встраиваемая микроволновая печь MAUNFELD JBMO155SGB02",
    brand: "Maunfeld",
    image: "images/1cd092339ea2bdfc62bdfaf8068c60dd.webp",
    desc: "15 л, мощность 600 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 364 + 1000,
    memoryOptions: [
        { size: "15L", price: 364 + 1000, color: "Silver" }
    ],
    defaultMemory: "15L"
},
{
    id: 589,
    name: "Встраиваемая микроволновая печь MAUNFELD XBMO251GB Glossy",
    brand: "Maunfeld",
    image: "images/ffab850d603b92ee180626d0787c54b5.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, конвекция, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 699 + 1000,
    memoryOptions: [
        { size: "25L", price: 699 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 590,
    name: "Встраиваемая микроволновая печь MAUNFELD XBMO202S",
    brand: "Maunfeld",
    image: "images/e194275e4a60d17cb1681582c08a64e1.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 270 мм, встраиваемая.",
    price: 459 + 1000,
    memoryOptions: [
        { size: "20L", price: 459 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 591,
    name: "Микроволновая печь MAUNFELD MBMO.20.1PGB",
    brand: "Maunfeld",
    image: "images/5a71101a40d6ee6088ed080a50d2db38.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 444 + 1000,
    memoryOptions: [
        { size: "20L", price: 444 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 592,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO925SGB11",
    brand: "Maunfeld",
    image: "images/b46d74723726a6ea8229f7393637f9ef.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 753 + 1000,
    memoryOptions: [
        { size: "25L", price: 753 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 593,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO.25.7GG",
    brand: "Maunfeld",
    image: "images/801c5b8c2c45b245977b3625a0a4d4fc.avif",
    desc: "25 л, мощность 900 Вт, сенсорное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 784 + 1000,
    memoryOptions: [
        { size: "25L", price: 784 + 1000, color: "Gray" }
    ],
    defaultMemory: "25L"
},
{
    id: 594,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO349GB201",
    brand: "Maunfeld",
    image: "images/dd7af81856cf5f331f678d4e85969988.avif",
    desc: "34 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 345 мм, встраиваемая.",
    price: 928 + 1000,
    memoryOptions: [
        { size: "34L", price: 928 + 1000, color: "Black" }
    ],
    defaultMemory: "34L"
},
{
    id: 595,
    name: "Микроволновая печь MAUNFELD JFSMO.20.5.ERIB",
    brand: "Maunfeld",
    image: "images/6982e4ebf6ac20432d7760985073d2e6.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, гриль, нержавеющая сталь, без поворотного стола, отдельностоящая.",
    price: 421 + 1000,
    memoryOptions: [
        { size: "20L", price: 421 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 596,
    name: "Встраиваемая микроволновая печь MAUNFELD XBMO252GB Glossy",
    brand: "Maunfeld",
    image: "images/984c312a3c01d52dac60a7a545befe53.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, конвекция, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 852 + 1000,
    memoryOptions: [
        { size: "25L", price: 852 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 597,
    name: "Микроволновая печь MAUNFELD MBMO349GB",
    brand: "Maunfeld",
    image: "images/91565f36d0dbe2cb9ca4e15f22944808.avif",
    desc: "34 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 345 мм, встраиваемая.",
    price: 911 + 1000,
    memoryOptions: [
        { size: "34L", price: 911 + 1000, color: "Black" }
    ],
    defaultMemory: "34L"
},
{
    id: 598,
    name: "Встраиваемая микроволновая печь MAUNFELD XBMO252GB Matt",
    brand: "Maunfeld",
    image: "images/3ed9ba1573b99a87ce61f8f3789adc08.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, конвекция, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 914 + 1000,
    memoryOptions: [
        { size: "25L", price: 914 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 599,
    name: "Микроволновая печь MAUNFELD MBMO349DGB",
    brand: "Maunfeld",
    image: "images/10546de090d5079ff809841cf87c4b3e.avif",
    desc: "34 л, сенсорное управление, гриль, нержавеющая сталь, диаметр тарелки 345 мм, встраиваемая.",
    price: 958 + 1000,
    memoryOptions: [
        { size: "34L", price: 958 + 1000, color: "Black" }
    ],
    defaultMemory: "34L"
},
{
    id: 600,
    name: "Встраиваемая микроволновая печь MAUNFELD JBMO155GB01",
    brand: "Maunfeld",
    image: "images/JBMO155Gb01_1-90.png",
    desc: "15 л, мощность 600 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 337 + 1000,
    memoryOptions: [
        { size: "15L", price: 337 + 1000, color: "Black" }
    ],
    defaultMemory: "15L"
},
{
    id: 601,
    name: "Микроволновая печь ретро MAUNFELD JFSMO.20.5.GRBG",
    brand: "Maunfeld",
    image: "images/633dbabd5e46f3f85e6528027a8e266f.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, гриль, нержавеющая сталь, отдельностоящая, ретро дизайн.",
    price: 418 + 1000,
    memoryOptions: [
        { size: "20L", price: 418 + 1000, color: "Green" }
    ],
    defaultMemory: "20L"
},
{
    id: 602,
    name: "Микроволновая печь ретро MAUNFELD JFSMO.20.5.GRIB",
    brand: "Maunfeld",
    image: "images/cadd26893e3e6219687b6d9cf1d63f5f.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, гриль, нержавеющая сталь, отдельностоящая, ретро дизайн.",
    price: 411 + 1000,
    memoryOptions: [
        { size: "20L", price: 411 + 1000, color: "Red" }
    ],
    defaultMemory: "20L"
},
{
    id: 603,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO.25.7GB",
    brand: "Maunfeld",
    image: "images/e69e6f3a0ae91cda1d9452892972c1da.avif",
    desc: "25 л, мощность 900 Вт, сенсорное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 784 + 1000,
    memoryOptions: [
        { size: "25L", price: 784 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 604,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO.20.8GW",
    brand: "Maunfeld",
    image: "images/aba84af7e90937d6dc58ca8a232816f7.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 556 + 1000,
    memoryOptions: [
        { size: "20L", price: 556 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 605,
    name: "Микроволновая печь MAUNFELD MBMO.20.1PGB2",
    brand: "Maunfeld",
    image: "images/7aacc43b0016ccfaa9834d5e0be6463c.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 449 + 1000,
    memoryOptions: [
        { size: "20L", price: 449 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 606,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO820SGW09",
    brand: "Maunfeld",
    image: "images/d0eea2b0556b2d7f5ba20cc95148f890.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 556 + 1000,
    memoryOptions: [
        { size: "20L", price: 556 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 607,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO349GW",
    brand: "Maunfeld",
    image: "images/53a7ba82b9a6ef9468826ca6223cbc37.avif",
    desc: "34 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 345 мм, встраиваемая.",
    price: 956 + 1000,
    memoryOptions: [
        { size: "34L", price: 956 + 1000, color: "White" }
    ],
    defaultMemory: "34L"
},
{
    id: 608,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO.20.1PGW",
    brand: "Maunfeld",
    image: "images/5ab976110c6c8060761fb6148adea2c0.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 449 + 1000,
    memoryOptions: [
        { size: "20L", price: 449 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},

        // Hyundai (10 моделей)
       {
    id: 561,
    name: "Микроволновая печь Hyundai HYM-M2096",
    brand: "Hyundai",
    image: "images/539a9d43a82379fedbfd15017f1f5d11.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 181 + 1000,
    memoryOptions: [
        { size: "20L", price: 181 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 562,
    name: "Микроволновая печь Hyundai HYM-M2042",
    brand: "Hyundai",
    image: "images/14ff037bed2d21841988b4b131ba2d89.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 189 + 1000,
    memoryOptions: [
        { size: "20L", price: 189 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 563,
    name: "Микроволновая печь Hyundai HYM-M2044",
    brand: "Hyundai",
    image: "images/530aa3b0778d7c92ccab9775d7919ea3.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 171 + 1000,
    memoryOptions: [
        { size: "20L", price: 171 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 564,
    name: "Микроволновая печь Hyundai HYM-D3002",
    brand: "Hyundai",
    image: "images/ec7075e37c89c2ed71007354b27181db.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 269 + 1000,
    memoryOptions: [
        { size: "20L", price: 269 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 565,
    name: "Микроволновая печь Hyundai HYM-M2093",
    brand: "Hyundai",
    image: "images/4c2a2de4c9ec110dbb6acdae57b29f33.avif",
    desc: "19 л, мощность 700 Вт, механическое управление, эмалированная сталь, диаметр тарелки 245 мм, отдельностоящая.",
    price: 229 + 1000,
    memoryOptions: [
        { size: "19L", price: 229 + 1000, color: "White" }
    ],
    defaultMemory: "19L"
},
{
    id: 566,
    name: "Микроволновая печь Hyundai HYM-D3007",
    brand: "Hyundai",
    image: "images/d42eb7edb9ec1112d56a183eba603ae4.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, эмаль, диаметр тарелки 270 мм, отдельностоящая.",
    price: 390 + 1000,
    memoryOptions: [
        { size: "23L", price: 390 + 1000, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 567,
    name: "Микроволновая печь Hyundai HYM-M2058",
    brand: "Hyundai",
    image: "images/8c329a21a1e0011f3d1364334cf6d45c.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 248 + 1000,
    memoryOptions: [
        { size: "20L", price: 248 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 568,
    name: "Микроволновая печь Hyundai HYM-M2059",
    brand: "Hyundai",
    image: "images/8577c845631ef090ed03f4afead91a94.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмалированная сталь, диаметр тарелки 255 мм, отдельностоящая.",
    price: 231 + 1000,
    memoryOptions: [
        { size: "20L", price: 231 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 569,
    name: "Микроволновая печь Hyundai HYM-M2045 (черный)",
    brand: "Hyundai",
    image: "images/32e389e688983df99999717d62b0a610.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, черный цвет, отдельностоящая.",
    price: 190 + 1000,
    memoryOptions: [
        { size: "20L", price: 190 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 570,
    name: "Микроволновая Печь Hyundai HYM-D3026",
    brand: "Hyundai",
    image: "images/d1a87c104c6c62ed0a1dc085e1e5bd4d.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 358 + 1000,
    memoryOptions: [
        { size: "20L", price: 358 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 571,
    name: "Микроволновая печь Hyundai HYM-D3034",
    brand: "Hyundai",
    image: "images/e7859ffb79952c05188e397931a89c4f.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 355 + 1000,
    memoryOptions: [
        { size: "20L", price: 355 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 572,
    name: "Микроволновая печь Hyundai HYM-D2074",
    brand: "Hyundai",
    image: "images/08d9d0c66309bb9b68a4ed8aa79f556c.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, эмаль, отдельностоящая.",
    price: 298 + 1000,
    memoryOptions: [
        { size: "20L", price: 298 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 573,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2040 BG (черный)",
    brand: "Hyundai",
    image: "images/d9847ff9aa08642be94c53222d6e20a7.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, эмаль, диаметр тарелки 245 мм, встраиваемая.",
    price: 669 + 1000,
    memoryOptions: [
        { size: "20L", price: 669 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 574,
    name: "Встраиваемая микроволновая печь HYUNDAI HBW 2030S BG (черный)",
    brand: "Hyundai",
    image: "images/d64901cbbf6c534f28219fcabe80bcef.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, гриль, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 649 + 1000,
    memoryOptions: [
        { size: "20L", price: 649 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 575,
    name: "Микроволновая печь Hyundai HYM-M2062",
    brand: "Hyundai",
    image: "images/59a9bc41305339ceb5f96e7d70086121.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 378 + 1000,
    memoryOptions: [
        { size: "23L", price: 378 + 1000, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 576,
    name: "Встраиваемая микроволновая печь HYUNDAI HBW 2030S WG (белый)",
    brand: "Hyundai",
    image: "images/f5e2bb7d37d3870e38c7bf8f48d8a421.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, гриль, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 639 + 1000,
    memoryOptions: [
        { size: "20L", price: 639 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 577,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2030 BG (черный)",
    brand: "Hyundai",
    image: "images/64064b0cc604922c55fbe577722e315b.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, гриль, эмаль, диаметр тарелки 245 мм, встраиваемая.",
    price: 669 + 1000,
    memoryOptions: [
        { size: "20L", price: 669 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 578,
    name: "Микроволновая печь Hyundai HYM-M2064",
    brand: "Hyundai",
    image: "images/3e1a9c4c6908396286ada35762dfd3b8.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 239 + 1000,
    memoryOptions: [
        { size: "20L", price: 239 + 1000, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 579,
    name: "Микроволновая печь Hyundai HYM-D3044",
    brand: "Hyundai",
    image: "images/c152eef70bc37f6ff92e5f9c0724ea2d.avif",
    desc: "23 л, мощность 700 Вт, электронное управление, эмаль, диаметр тарелки 270 мм, отдельностоящая.",
    price: 449 + 1000,
    memoryOptions: [
        { size: "23L", price: 449 + 1000, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 580,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2560 WG (белый)",
    brand: "Hyundai",
    image: "images/5ed3942a07e3cc32f4aa5dcc0934d555.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, эмаль, диаметр тарелки 315 мм, встраиваемая.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "25L", price: 899 + 1000, color: "White" }
    ],
    defaultMemory: "25L"
},
{
    id: 581,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2544 IX (серебристый)",
    brand: "Hyundai",
    image: "images/47bc6d36303bd0c9e21ce1cd1dfd792a.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, эмаль, диаметр тарелки 315 мм, встраиваемая.",
    price: 759 + 1000,
    memoryOptions: [
        { size: "25L", price: 759 + 1000, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 582,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2560 BG (черный)",
    brand: "Hyundai",
    image: "images/3c8648ef15d777198e08755cf8f2f527.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, эмаль, диаметр тарелки 315 мм, встраиваемая.",
    price: 979 + 1000,
    memoryOptions: [
        { size: "25L", price: 979 + 1000, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 583,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2030 IX (нержавеющая сталь)",
    brand: "Hyundai",
    image: "images/b059d1cae145673f9cb163af5265eca8.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, гриль, эмаль, диаметр тарелки 245 мм, встраиваемая.",
    price: 649 + 1000,
    memoryOptions: [
        { size: "20L", price: 649 + 1000, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 584,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2544 WG белый",
    brand: "Hyundai",
    image: "images/242117ab449dc3c7621fd07c6fa6d61c.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1059 + 1000,
    memoryOptions: [
        { size: "25L", price: 1059 + 1000, color: "White" }
    ],
    defaultMemory: "25L"
},
    ],

    fridges: [
        // LG (10 моделей)
   {
    id: 808,
    name: "Холодильник-морозильник LG GC-Q257CBFV",
    brand: "LG",
    image: "images/5ca4975a0b87bcdad00d2701978f077f.avif",
    desc: "694 л (424 л + 270 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 179 см.",
    price: 6249 + 1000,
    memoryOptions: [
        { size: "694L", price: 6249 + 1000, color: "Black" }
    ],
    defaultMemory: "694L"
},
{
    id: 809,
    name: "Холодильник LG DoorCooling+ GA-B509CBTL",
    brand: "LG",
    image: "images/95d629a8485e6c958dbd33aaf573dee0.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 203 см.",
    price: 2623 + 1000,
    memoryOptions: [
        { size: "384L", price: 2623 + 1000, color: "Black" }
    ],
    defaultMemory: "384L"
},
{
    id: 810,
    name: "Холодильник LG DoorCooling+ GA-B509CMUM",
    brand: "LG",
    image: "images/4535fe403d0160d3930a95bdedf8a9ba.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, серебристый, высота 203 см.",
    price: 2753 + 1000,
    memoryOptions: [
        { size: "384L", price: 2753 + 1000, color: "Silver" }
    ],
    defaultMemory: "384L"
},
{
    id: 811,
    name: "Холодильник LG DoorCooling+ GA-B509CQWL",
    brand: "LG",
    image: "images/dce6db851f0f4ac0abe17781ac4593c7.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, белый, высота 203 см.",
    price: 2299 + 1000,
    memoryOptions: [
        { size: "384L", price: 2299 + 1000, color: "White" }
    ],
    defaultMemory: "384L"
},
{
    id: 812,
    name: "Холодильник LG DoorCooling+ GA-B509MLSL",
    brand: "LG",
    image: "images/1347f9630e1de9e0e19b7212d8892701.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, графитовый, высота 203 см.",
    price: 2449 + 1000,
    memoryOptions: [
        { size: "384L", price: 2449 + 1000, color: "Graphite" }
    ],
    defaultMemory: "384L"
},
{
    id: 813,
    name: "Холодильник LG GA-B419SLGL",
    brand: "LG",
    image: "images/aca873fdc7c288290efb01a28055ce02.avif",
    desc: "302 л (223 л + 79 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, темный графит, высота 190.6 см.",
    price: 2049 + 1000,
    memoryOptions: [
        { size: "302L", price: 2049 + 1000, color: "Dark Graphite" }
    ],
    defaultMemory: "302L"
},
{
    id: 814,
    name: "Холодильник LG DoorCоoling+ GC-B509QG9M",
    brand: "LG",
    image: "images/721a8875d38ad1a56782923d7a8946aa.avif",
    desc: "387 л (277 л + 110 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, бежевый, высота 203 см.",
    price: 3670 + 1000,
    memoryOptions: [
        { size: "387L", price: 3670 + 1000, color: "Beige" }
    ],
    defaultMemory: "387L"
},
{
    id: 815,
    name: "Холодильник LG DoorCooling+ GA-B459SMQM",
    brand: "LG",
    image: "images/90299a3f3e35c421640fee38000ec64b.avif",
    desc: "341 л (234 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, серебристый, высота 186 см.",
    price: 2299 + 1000,
    memoryOptions: [
        { size: "341L", price: 2299 + 1000, color: "Silver" }
    ],
    defaultMemory: "341L"
},
{
    id: 816,
    name: "Холодильник LG DoorCooling+ GA-B509CMTL",
    brand: "LG",
    image: "images/806508be0bbc7ce2c75c8bcbfa8a8fca.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, серебристый, высота 203 см.",
    price: 2650 + 1000,
    memoryOptions: [
        { size: "384L", price: 2650 + 1000, color: "Silver" }
    ],
    defaultMemory: "384L"
},
{
    id: 817,
    name: "Холодильник LG GA-B419SQGL",
    brand: "LG",
    image: "images/af96b553b125d20aad41ebae150cebb1.avif",
    desc: "302 л (223 л + 79 л), полный No Frost, инверторный компрессор, электронное управление, белый, высота 190.7 см.",
    price: 1999 + 1000,
    memoryOptions: [
        { size: "302L", price: 1999 + 1000, color: "White" }
    ],
    defaultMemory: "302L"
},
{
    id: 818,
    name: "Холодильник LG DoorCooling+ GA-B459SQQM",
    brand: "LG",
    image: "images/1af685082a54584c71c99f5ef3ddc1ce.avif",
    desc: "341 л (234 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, белый, высота 186 см.",
    price: 2272 + 1000,
    memoryOptions: [
        { size: "341L", price: 2272 + 1000, color: "White" }
    ],
    defaultMemory: "341L"
},
{
    id: 819,
    name: "Холодильник LG DoorCooling+ GC-B569PMCM",
    brand: "LG",
    image: "images/ab2050f3497bd3439eaa0bca84db1609.avif",
    desc: "451 л (329 л + 122 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, серебристый, высота 185 см.",
    price: 3421 + 1000,
    memoryOptions: [
        { size: "451L", price: 3421 + 1000, color: "Silver" }
    ],
    defaultMemory: "451L"
},
{
    id: 820,
    name: "Холодильник LG DoorCooling+ GA-B509CEQM",
    brand: "LG",
    image: "images/533fcf26fe9b2feae547ca0bfbee8ca2.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, бежевый, высота 203 см.",
    price: 2561 + 1000,
    memoryOptions: [
        { size: "384L", price: 2561 + 1000, color: "Beige" }
    ],
    defaultMemory: "384L"
},
{
    id: 821,
    name: "Холодильник LG GA-B509CQCL",
    brand: "LG",
    image: "images/1ff5f49a1c3f431eea772a132246c78b.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, электронное управление, белый, высота 203 см.",
    price: 2240 + 1000,
    memoryOptions: [
        { size: "384L", price: 2240 + 1000, color: "White" }
    ],
    defaultMemory: "384L"
},
{
    id: 822,
    name: "Холодильник LG GC-L257CBEV",
    brand: "LG",
    image: "images/8b912481cbbcf5610d74303d460e320e.avif",
    desc: "674 л (424 л + 250 л), полный No Frost, инверторный компрессор, электронное управление, серый, высота 179 см.",
    price: 6385 + 1000,
    memoryOptions: [
        { size: "674L", price: 6385 + 1000, color: "Gray" }
    ],
    defaultMemory: "674L"
},
{
    id: 823,
    name: "Холодильник LG GC-V22FFBMB",
    brand: "LG",
    image: "images/947317b7423af7aaf6745bbb91e4697b.avif",
    desc: "458 л (315 л + 143 л), полный No Frost, инверторный компрессор, электронное управление, черный, высота 178.7 см.",
    price: 5499 + 1000,
    memoryOptions: [
        { size: "458L", price: 5499 + 1000, color: "Black" }
    ],
    defaultMemory: "458L"
},
{
    id: 824,
    name: "Холодильник LG DoorCooling+ GC-B459AQQW",
    brand: "LG",
    image: "images/264c314181fc04f4942e3fec3423ccd7.avif",
    desc: "344 л (234 л + 110 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, белый, высота 186 см.",
    price: 2350 + 1000,
    memoryOptions: [
        { size: "344L", price: 2350 + 1000, color: "White" }
    ],
    defaultMemory: "344L"
},
{
    id: 825,
    name: "Холодильник LG DoorCooling+ GA-B509SVUM",
    brand: "LG",
    image: "images/f8eb3bfe2a6778d1a476ca6309fda86b.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, белый, высота 203 см.",
    price: 2760 + 1000,
    memoryOptions: [
        { size: "384L", price: 2760 + 1000, color: "White" }
    ],
    defaultMemory: "384L"
},
{
    id: 826,
    name: "Холодильник LG DoorCooling+ GA-B509SAUM",
    brand: "LG",
    image: "images/6b811e231e84a3bcace610bb69302f74.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, серебристый, высота 203 см.",
    price: 2799 + 1000,
    memoryOptions: [
        { size: "384L", price: 2799 + 1000, color: "Silver" }
    ],
    defaultMemory: "384L"
},
{
    id: 827,
    name: "Холодильник LG DoorCooling+ GA-B459MLSL",
    brand: "LG",
    image: "images/872d7f18be1386a6e9983fb60ae0c8f7.avif",
    desc: "341 л (234 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, графитовый, высота 186 см.",
    price: 2149 + 1000,
    memoryOptions: [
        { size: "341L", price: 2149 + 1000, color: "Graphite" }
    ],
    defaultMemory: "341L"
},
{
    id: 828,
    name: "Холодильник LG GC-X24FFCBB",
    brand: "LG",
    image: "images/18fe7c40832f140651f7ae00af90fa51.avif",
    desc: "570 л (371 л + 199 л), полный No Frost, инверторный компрессор, электронное управление, черный, высота 179.2 см.",
    price: 7699 + 1000,
    memoryOptions: [
        { size: "570L", price: 7699 + 1000, color: "Black" }
    ],
    defaultMemory: "570L"
},
{
    id: 829,
    name: "Холодильник LG GC-B257KEHW",
    brand: "LG",
    image: "images/15a9a84de6e858625a013f789e0a256c.avif",
    desc: "658 л (422 л + 206 л), полный No Frost, инверторный компрессор, электронное управление, бежевый, высота 179 см.",
    price: 4949 + 1000,
    memoryOptions: [
        { size: "658L", price: 4949 + 1000, color: "Beige" }
    ],
    defaultMemory: "658L"
},
{
    id: 830,
    name: "Холодильник LG GC-B509AEMW",
    brand: "LG",
    image: "images/3c1482f3e6c735d37eff4e48cba97e9d.avif",
    desc: "387 л (277 л + 110 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, бежевый, высота 203 см.",
    price: 2849 + 1000,
    memoryOptions: [
        { size: "387L", price: 2849 + 1000, color: "Beige" }
    ],
    defaultMemory: "387L"
},
{
    id: 831,
    name: "Холодильник LG DoorCooling+ GA-B509SEUM",
    brand: "LG",
    image: "images/3a67e25b478bc2e85e6fbe31502be4b4.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, бежевый, высота 203 см.",
    price: 2699 + 1000,
    memoryOptions: [
        { size: "384L", price: 2699 + 1000, color: "Beige" }
    ],
    defaultMemory: "384L"
},

        // Beko (10 моделей)
{
    id: 785,
    name: "Холодильник Beko B5RCNK403ZXBR KZ RU",
    brand: "Beko",
    image: "images/608e61bf75a82e1e5a9f3ca3d7889708.avif",
    desc: "300 л (200 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, антрацит, высота 201 см.",
    price: 2148 + 1000,
    memoryOptions: [
        { size: "300L", price: 2148 + 1000, color: "Anthracite" }
    ],
    defaultMemory: "300L"
},
{
    id: 786,
    name: "Холодильник Beko RCNK335E20VW",
    brand: "Beko",
    image: "images/403f126819e3686613749b95a1172c44.avif",
    desc: "300 л (200 л + 100 л), полный No Frost, стандартный компрессор, электронное управление, белый, высота 201 см.",
    price: 1547 + 1000,
    memoryOptions: [
        { size: "300L", price: 1547 + 1000, color: "White" }
    ],
    defaultMemory: "300L"
},
{
    id: 787,
    name: "Холодильник BEKO BCNE400I35ZS",
    brand: "Beko",
    image: "images/1d4d000506126654028932a5c4417901.avif",
    desc: "355 л (280 л + 75 л), полный No Frost, зона свежести, электронное управление, белый, высота 194 см.",
    price: 3413 + 1000,
    memoryOptions: [
        { size: "355L", price: 3413 + 1000, color: "White" }
    ],
    defaultMemory: "355L"
},
{
    id: 788,
    name: "Холодильник Beko HarvestFresh CNMV5335E20VXR",
    brand: "Beko",
    image: "images/d5d43a8508c4d660663eaea0b772e60d.avif",
    desc: "300 л (200 л + 100 л), полный No Frost, зона свежести, электронное управление, антрацит, высота 201 см.",
    price: 1671 + 1000,
    memoryOptions: [
        { size: "300L", price: 1671 + 1000, color: "Anthracite" }
    ],
    defaultMemory: "300L"
},
{
    id: 789,
    name: "Холодильник Beko RCNK310E20VS",
    brand: "Beko",
    image: "images/20cb2abe2280592be86f03298c2c6b6d.avif",
    desc: "276 л (200 л + 76 л), полный No Frost, стандартный компрессор, электронное управление, серебристый, высота 184 см.",
    price: 1505 + 1000,
    memoryOptions: [
        { size: "276L", price: 1505 + 1000, color: "Silver" }
    ],
    defaultMemory: "276L"
},
{
    id: 790,
    name: "Холодильник Beko B3RCNK402HX KZ RU",
    brand: "Beko",
    image: "images/4f5c7668f83820161d56896832a75704.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, зона свежести, электронное управление, нержавеющая сталь, высота 201 см.",
    price: 1779 + 1000,
    memoryOptions: [
        { size: "357L", price: 1779 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "357L"
},
{
    id: 791,
    name: "Холодильник Beko B5RCNK363ZXBR KZ RU",
    brand: "Beko",
    image: "images/82e2a98e2bce730b9dc890c243b936a2.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, антрацит, высота 186 см.",
    price: 1835 + 1000,
    memoryOptions: [
        { size: "320L", price: 1835 + 1000, color: "Anthracite" }
    ],
    defaultMemory: "320L"
},
{
    id: 792,
    name: "Холодильник Beko B3R0CNK362HW RU",
    brand: "Beko",
    image: "images/66509a9c319d45a52fc8b88d22305aba.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, электронное управление, белый, высота 186 см.",
    price: 1676 + 1000,
    memoryOptions: [
        { size: "320L", price: 1676 + 1000, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 793,
    name: "Холодильник Beko B3RCNK362HS KZ RU",
    brand: "Beko",
    image: "images/3a65b79eae33057ec2a0ad1dc868c53d.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, серебристый, высота 186 см.",
    price: 1849 + 1000,
    memoryOptions: [
        { size: "320L", price: 1849 + 1000, color: "Silver" }
    ],
    defaultMemory: "320L"
},
{
    id: 794,
    name: "Холодильник BEKO B3R1CNK363HXBR",
    brand: "Beko",
    image: "images/3758580c2e5ce96114ec1e359fc9e20a.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, инверторный компрессор, сенсорное управление, темная сталь, высота 186 см.",
    price: 1808 + 1000,
    memoryOptions: [
        { size: "320L", price: 1808 + 1000, color: "Dark Steel" }
    ],
    defaultMemory: "320L"
},
{
    id: 795,
    name: "Холодильник Beko B3DRCNK402HW KZ RU",
    brand: "Beko",
    image: "images/03b3c7f611808ca4598d3fe9030afd00.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, зона свежести, электронное управление, белый, высота 201 см.",
    price: 1837 + 1000,
    memoryOptions: [
        { size: "357L", price: 1837 + 1000, color: "White" }
    ],
    defaultMemory: "357L"
},
{
    id: 796,
    name: "Холодильник Beko B3RCNK362HX",
    brand: "Beko",
    image: "images/ba36cd6141b083fd0895873f6973ac6c.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, зона свежести, электронное управление, нержавеющая сталь, высота 186 см.",
    price: 1843 + 1000,
    memoryOptions: [
        { size: "320L", price: 1843 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "320L"
},
{
    id: 797,
    name: "Холодильник Beko B5RCNK403ZW RU",
    brand: "Beko",
    image: "images/da76658716db59203cd056cee1e2a969.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, белый, высота 201 см.",
    price: 2148 + 1000,
    memoryOptions: [
        { size: "357L", price: 2148 + 1000, color: "White" }
    ],
    defaultMemory: "357L"
},
{
    id: 798,
    name: "Холодильник Beko B5RCNK403ZWB KZ RU",
    brand: "Beko",
    image: "images/647ada5580a38600dba245bc7df5d230.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 201 см.",
    price: 2180 + 1000,
    memoryOptions: [
        { size: "357L", price: 2180 + 1000, color: "Black" }
    ],
    defaultMemory: "357L"
},
{
    id: 799,
    name: "Холодильник Beko RCNK310E20VW",
    brand: "Beko",
    image: "images/951b0d14a86b7239cb8b5adf10ebfe02.avif",
    desc: "276 л (200 л + 76 л), полный No Frost, стандартный компрессор, электронное управление, белый, высота 184 см.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "276L", price: 1499 + 1000, color: "White" }
    ],
    defaultMemory: "276L"
},
{
    id: 800,
    name: "Холодильник Beko B5RCNK363ZWB KZ RU",
    brand: "Beko",
    image: "images/6301e5622c116b07a4f7bb68772926dc.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 186 см.",
    price: 1872 + 1000,
    memoryOptions: [
        { size: "320L", price: 1872 + 1000, color: "Black" }
    ],
    defaultMemory: "320L"
},
{
    id: 801,
    name: "Холодильник Beko B3DRCNK402HXBR",
    brand: "Beko",
    image: "images/fe7e50b5c2473dcb08d03e76f137a53b.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, антрацит, высота 201 см.",
    price: 1817 + 1000,
    memoryOptions: [
        { size: "357L", price: 1817 + 1000, color: "Anthracite" }
    ],
    defaultMemory: "357L"
},
{
    id: 802,
    name: "Холодильник BEKO B3DRCNK362HW",
    brand: "Beko",
    image: "images/caebc50273b4591ad944c8f6c0d59e57.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, зона свежести, электронное управление, белый, высота 186 см.",
    price: 1799 + 1000,
    memoryOptions: [
        { size: "320L", price: 1799 + 1000, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 803,
    name: "Холодильник Beko HarvestFresh B1RCNK402W RU",
    brand: "Beko",
    image: "images/9298fb0e746ad5da058fe6ff199430f2.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 201 см.",
    price: 1621 + 1000,
    memoryOptions: [
        { size: "357L", price: 1621 + 1000, color: "White" }
    ],
    defaultMemory: "357L"
},
{
    id: 804,
    name: "Холодильник BEKO B3R1CNK363HW",
    brand: "Beko",
    image: "images/aaaa0bd3e1e56e1318628babfee905b1.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, инверторный компрессор, сенсорное управление, белый, высота 186 см.",
    price: 1608 + 1000,
    memoryOptions: [
        { size: "320L", price: 1608 + 1000, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 805,
    name: "Холодильник BEKO RDSK240M00W",
    brand: "Beko",
    image: "images/dd8c8322b43386309e3acbe1a714fd94.avif",
    desc: "223 л (177 л + 46 л), без No Frost, стандартный компрессор, механическое управление, белый, высота 145.8 см.",
    price: 1079 + 1000,
    memoryOptions: [
        { size: "223L", price: 1079 + 1000, color: "White" }
    ],
    defaultMemory: "223L"
},
{
    id: 806,
    name: "Холодильник BEKO B3R0CNK332HXBR",
    brand: "Beko",
    image: "images/3ec3157a244ff0a80c1b662173bf5253.avif",
    desc: "300 л (200 л + 100 л), полный No Frost, стандартный компрессор, электронное управление, черный, высота 201 см.",
    price: 1839 + 1000,
    memoryOptions: [
        { size: "300L", price: 1839 + 1000, color: "Black" }
    ],
    defaultMemory: "300L"
},
{
    id: 807,
    name: "Холодильник-морозильник BEKO B5RCNK403ZX BIO",
    brand: "Beko",
    image: "images/03fa21fa5512b04e390517b055d2f201.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 201 см.",
    price: 2190 + 1000,
    memoryOptions: [
        { size: "357L", price: 2190 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "357L"
},

        // Атлант (10 моделей)
 {
    id: 761,
    name: "Холодильник ATLANT XM-4624-109-ND",
    brand: "ATLANT",
    image: "images/60048f56339d4dbaf47b6b6f853779db.avif",
    desc: "329 л (235 л + 94 л), полный No Frost, стандартный компрессор, зона свежести, сенсорное управление, белый, высота 196.8 см.",
    price: 1659 + 1000,
    memoryOptions: [
        { size: "329L", price: 1659 + 1000, color: "White" }
    ],
    defaultMemory: "329L"
},
{
    id: 762,
    name: "Холодильник ATLANT XM-4008-022",
    brand: "ATLANT",
    image: "images/9e31eec8d5ab9277748a586540fabd9a.avif",
    desc: "226 л (163 л + 63 л), без No Frost, стандартный компрессор, электромеханическое управление, высота 142 см.",
    price: 1099 + 1000,
    memoryOptions: [
        { size: "226L", price: 1099 + 1000, color: "White" }
    ],
    defaultMemory: "226L"
},
{
    id: 763,
    name: "Холодильник ATLANT XM-4625-109-ND",
    brand: "ATLANT",
    image: "images/62cf77a29b6fa32d7363392aa02ad4cc.avif",
    desc: "336 л (211 л + 125 л), полный No Frost, зона свежести, сенсорное управление, белый, высота 206.8 см.",
    price: 1999 + 1000,
    memoryOptions: [
        { size: "336L", price: 1999 + 1000, color: "White" }
    ],
    defaultMemory: "336L"
},
{
    id: 764,
    name: "Холодильник ATLANT ХМ-4624-101",
    brand: "ATLANT",
    image: "images/3ecfae4501e2d1acc356f748d01565c0.avif",
    desc: "347 л (228 л + 119 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 196.8 см.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "347L", price: 1399 + 1000, color: "White" }
    ],
    defaultMemory: "347L"
},
{
    id: 765,
    name: "Встраиваемый холодильник ATLANT ХМ-4319-101",
    brand: "ATLANT",
    image: "images/468c9c23db27056a2d761a6d04a2c64e.avif",
    desc: "245 л (175 л + 70 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 178.5 см, встраиваемый.",
    price: 1686 + 1000,
    memoryOptions: [
        { size: "245L", price: 1686 + 1000, color: "White" }
    ],
    defaultMemory: "245L"
},
{
    id: 766,
    name: "Холодильник ATLANT ХМ-4625-101",
    brand: "ATLANT",
    image: "images/7e26b41249d0065006a01cc494687781.avif",
    desc: "364 л (205 л + 159 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 206.8 см.",
    price: 1519 + 1000,
    memoryOptions: [
        { size: "364L", price: 1519 + 1000, color: "White" }
    ],
    defaultMemory: "364L"
},
{
    id: 767,
    name: "Холодильник ATLANT XM-6023-031",
    brand: "ATLANT",
    image: "images/cb5a8c1db32ed7dd1e5f72b2626ffbae.avif",
    desc: "340 л (201 л + 139 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 195 см.",
    price: 1486 + 1000,
    memoryOptions: [
        { size: "340L", price: 1486 + 1000, color: "White" }
    ],
    defaultMemory: "340L"
},
{
    id: 768,
    name: "Холодильник ATLANT ХМ-4625-181",
    brand: "ATLANT",
    image: "images/40b6e76d66dd5d13b3ecc252fc433b2e.avif",
    desc: "378 л (205 л + 159 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, серебристый, высота 206.8 см.",
    price: 1782 + 1000,
    memoryOptions: [
        { size: "378L", price: 1782 + 1000, color: "Silver" }
    ],
    defaultMemory: "378L"
},
{
    id: 769,
    name: "Холодильник ATLANT MXM-2835-90",
    brand: "ATLANT",
    image: "images/884a40ebbd77125af3fa6b22f5a41446.avif",
    desc: "272 л (202 л + 70 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 163 см.",
    price: 1126 + 1000,
    memoryOptions: [
        { size: "272L", price: 1126 + 1000, color: "White" }
    ],
    defaultMemory: "272L"
},
{
    id: 770,
    name: "Холодильник ATLANT XM-4010-022",
    brand: "ATLANT",
    image: "images/f88dd89b60b2ed812e9bc8c161d2cb55.avif",
    desc: "264 л (163 л + 101 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 161 см.",
    price: 1215 + 1000,
    memoryOptions: [
        { size: "264L", price: 1215 + 1000, color: "White" }
    ],
    defaultMemory: "264L"
},
{
    id: 771,
    name: "Холодильник ATLANT ХМ-4619-101",
    brand: "ATLANT",
    image: "images/6727effc99db6e496d3737996798b724.avif",
    desc: "301 л (182 л + 119 л), без No Frost, стандартный компрессор, электронное управление, белый, высота 176.8 см.",
    price: 1356 + 1000,
    memoryOptions: [
        { size: "301L", price: 1356 + 1000, color: "White" }
    ],
    defaultMemory: "301L"
},
{
    id: 772,
    name: "Холодильник ATLANT ХМ-4625-151",
    brand: "ATLANT",
    image: "images/2c53260db301d03943087cb052a8ecbb.avif",
    desc: "364 л (205 л + 159 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, черный, высота 206.8 см.",
    price: 1646 + 1000,
    memoryOptions: [
        { size: "364L", price: 1646 + 1000, color: "Black" }
    ],
    defaultMemory: "364L"
},
{
    id: 773,
    name: "Холодильник ATLANT ХМ-4621-101",
    brand: "ATLANT",
    image: "images/atlant-hm-4621-101-nl.webp",
    desc: "324 л (205 л + 119 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 186.8 см.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "324L", price: 1399 + 1000, color: "White" }
    ],
    defaultMemory: "324L"
},
{
    id: 774,
    name: "Холодильник ATLANT ХМ-4423-000-N",
    brand: "ATLANT",
    image: "images/a890c65b316b47eebb9dd77341133e5c.avif",
    desc: "292 л (181 л + 111 л), полный No Frost, стандартный компрессор, электронное управление, высота 196.5 см.",
    price: 1827 + 1000,
    memoryOptions: [
        { size: "292L", price: 1827 + 1000, color: "White" }
    ],
    defaultMemory: "292L"
},
{
    id: 775,
    name: "Холодильник ATLANT MXM-2835-08 СЕРЕБРИСТЫЙ",
    brand: "ATLANT",
    image: "images/fa0dfac11e8cf395e2e3423fb85a48c9.avif",
    desc: "272 л (202 л + 70 л), без No Frost, стандартный компрессор, электромеханическое управление, серебристый, высота 163 см.",
    price: 1179 + 1000,
    memoryOptions: [
        { size: "272L", price: 1179 + 1000, color: "Silver" }
    ],
    defaultMemory: "272L"
},
{
    id: 776,
    name: "Холодильник ATLANT ХМ-6621-109",
    brand: "ATLANT",
    image: "images/9523a9ec5107ba329ddab6f3bd948820.avif",
    desc: "324 л (205 л + 119 л), без No Frost, зона свежести, электронное управление, белый, высота 186.8 см.",
    price: 1688 + 1000,
    memoryOptions: [
        { size: "324L", price: 1688 + 1000, color: "White" }
    ],
    defaultMemory: "324L"
},
{
    id: 777,
    name: "Холодильник Atlant XM-4621-109-ND",
    brand: "ATLANT",
    image: "images/b4dd9d45bedf6a391eb77dc39cbdae65.avif",
    desc: "305 л (211 л + 94 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 186.8 см.",
    price: 1709 + 1000,
    memoryOptions: [
        { size: "305L", price: 1709 + 1000, color: "White" }
    ],
    defaultMemory: "305L"
},
{
    id: 778,
    name: "Холодильник ATLANT MX-2822-80",
    brand: "ATLANT",
    image: "images/a58d0f26559673cde57350ab712b75c7.avif",
    desc: "205 л (175 л + 30 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 131 см.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "205L", price: 899 + 1000, color: "White" }
    ],
    defaultMemory: "205L"
},
{
    id: 779,
    name: "Холодильник ATLANT XM-4012-022",
    brand: "ATLANT",
    image: "images/7b69408f55561cfc2483bd31e4921ce7.avif",
    desc: "302 л (201 л + 101 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 176 см.",
    price: 1259 + 1000,
    memoryOptions: [
        { size: "302L", price: 1259 + 1000, color: "White" }
    ],
    defaultMemory: "302L"
},
{
    id: 780,
    name: "Холодильник ATLANT XM-4623-109-ND",
    brand: "ATLANT",
    image: "images/6610e5b98238c30adb88ed00c0de1c9a.avif",
    desc: "312 л (187 л + 125 л), полный No Frost, стандартный компрессор, электронное управление, белый, высота 196.8 см.",
    price: 1749 + 1000,
    memoryOptions: [
        { size: "312L", price: 1749 + 1000, color: "White" }
    ],
    defaultMemory: "312L"
},
{
    id: 781,
    name: "Холодильник ATLANT XM-4208-000",
    brand: "ATLANT",
    image: "images/8707ddcdde5edf1d96b5f14c5572999e.avif",
    desc: "173 л (131 л + 42 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 142.5 см.",
    price: 1089 + 1000,
    memoryOptions: [
        { size: "173L", price: 1089 + 1000, color: "White" }
    ],
    defaultMemory: "173L"
},
{
    id: 782,
    name: "Холодильник ATLANT XM-4626-109-ND",
    brand: "ATLANT",
    image: "images/c76c1ff6f13d258b0533f1b8449625db.avif",
    desc: "348 л (254 л + 94 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 206.8 см.",
    price: 1999 + 1000,
    memoryOptions: [
        { size: "348L", price: 1999 + 1000, color: "White" }
    ],
    defaultMemory: "348L"
},
{
    id: 783,
    name: "Холодильник ATLANT ХМ-4524-040-ND",
    brand: "ATLANT",
    image: "images/2405b4f1f8c956e5e6d19546452ffc1b.avif",
    desc: "371 л (271 л + 100 л), полный No Frost, стандартный компрессор, электронное управление, нержавеющая сталь, высота 196 см.",
    price: 2078 + 1000,
    memoryOptions: [
        { size: "371L", price: 2078 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "371L"
},
{
    id: 784,
    name: "Холодильник ATLANT ХМ-4624-181",
    brand: "ATLANT",
    image: "images/fbb61165ef5cde1e840e8c57df9f6224.avif",
    desc: "347 л (228 л + 119 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, серебристый, высота 196.8 см.",
    price: 1608 + 1000,
    memoryOptions: [
        { size: "347L", price: 1608 + 1000, color: "Silver" }
    ],
    defaultMemory: "347L"
},

        // HAIER (10 моделей)
     {
    id: 737,
    name: "Холодильник Haier C4F640CXU1",
    brand: "Haier",
    image: "images/2bf156b8fb48815a9f10f79308c4c89b.avif",
    desc: "400 л (285 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, нержавеющая сталь, высота 200 см.",
    price: 2900 + 1000,
    memoryOptions: [
        { size: "400L", price: 2900 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "400L"
},
{
    id: 738,
    name: "Холодильник HAIER C2F636CFRGU1",
    brand: "Haier",
    image: "images/d4efe3b602d8bca18aa95c78b7eb08e4.avif",
    desc: "364 л (256 л + 108 л), полный No Frost, зона свежести, сенсорное управление, серебристый, высота 190.5 см.",
    price: 2282 + 1000,
    memoryOptions: [
        { size: "364L", price: 2282 + 1000, color: "Silver" }
    ],
    defaultMemory: "364L"
},
{
    id: 739,
    name: "Холодильник Haier C4F740CDBGU1",
    brand: "Haier",
    image: "images/74b11d248c738f90c34bfbfd05f774cf.avif",
    desc: "401 л (286 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, графитовый, высота 200 см.",
    price: 3048 + 1000,
    memoryOptions: [
        { size: "401L", price: 3048 + 1000, color: "Graphite" }
    ],
    defaultMemory: "401L"
},
{
    id: 740,
    name: "Холодильник Haier C4F640CWU1",
    brand: "Haier",
    image: "images/26994a63df8d2f64465ef1c28cbb8ff0.avif",
    desc: "400 л (285 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, белый, высота 200 см.",
    price: 2636 + 1000,
    memoryOptions: [
        { size: "400L", price: 2636 + 1000, color: "White" }
    ],
    defaultMemory: "400L"
},
{
    id: 741,
    name: "Встраиваемый холодильник-морозильник Haier BCF5261WRU",
    brand: "Haier",
    image: "images/8edc0a26ae12ca4caa2351e5600cbaa2.avif",
    desc: "261 л (185 л + 76 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, белый, высота 177.2 см, встраиваемый.",
    price: 3565 + 1000,
    memoryOptions: [
        { size: "261L", price: 3565 + 1000, color: "White" }
    ],
    defaultMemory: "261L"
},
{
    id: 742,
    name: "Холодильник Haier MSR115L",
    brand: "Haier",
    image: "images/cbe7d9863f3f8e36edd03ff142323982.avif",
    desc: "91 л (8 л морозильник), без No Frost, стандартный компрессор, механическое управление, белый, высота 83.2 см.",
    price: 799 + 1000,
    memoryOptions: [
        { size: "91L", price: 799 + 1000, color: "White" }
    ],
    defaultMemory: "91L"
},
{
    id: 743,
    name: "Холодильник Haier C2F637CFMVU1",
    brand: "Haier",
    image: "images/086f87785346a79559a0bae2189b4b80.avif",
    desc: "386 л (278 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 199.8 см.",
    price: 2567 + 1000,
    memoryOptions: [
        { size: "386L", price: 2567 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "386L"
},
{
    id: 744,
    name: "Холодильник HAIER CEF535ASD",
    brand: "Haier",
    image: "images/1b6b1ce1aee05565ea83e87b308e542a.avif",
    desc: "346 л (241 л + 105 л), полный No Frost, стандартный компрессор, электронное управление, серебристый, высота 190 см.",
    price: 1933 + 1000,
    memoryOptions: [
        { size: "346L", price: 1933 + 1000, color: "Silver" }
    ],
    defaultMemory: "346L"
},
{
    id: 745,
    name: "Холодильник Haier C4F740CLBGU1",
    brand: "Haier",
    image: "images/28fa5b72429a8d7ae3e231c0890f641d.avif",
    desc: "401 л (286 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, коричневый, высота 200 см.",
    price: 2970 + 1000,
    memoryOptions: [
        { size: "401L", price: 2970 + 1000, color: "Brown" }
    ],
    defaultMemory: "401L"
},
{
    id: 746,
    name: "Холодильник HAIER A4F639CGGU1",
    brand: "Haier",
    image: "images/0f476c4e6071334d4d78ec6ee70c2179.avif",
    desc: "388 л (285 л + 103 л), полный No Frost, инверторный компрессор, электронное управление, золотистый, высота 200 см.",
    price: 2835 + 1000,
    memoryOptions: [
        { size: "388L", price: 2835 + 1000, color: "Gold" }
    ],
    defaultMemory: "388L"
},
{
    id: 747,
    name: "Холодильник Haier HRF-600DB7RU",
    brand: "Haier",
    image: "images/e3841d6d47a01e803a396c920223bd91.avif",
    desc: "598 л (388 л + 210 л), полный No Frost, инверторный компрессор, электронное управление, черный, высота 177.5 см.",
    price: 4660 + 1000,
    memoryOptions: [
        { size: "598L", price: 4660 + 1000, color: "Black" }
    ],
    defaultMemory: "598L"
},
{
    id: 748,
    name: "Холодильник HAIER HTF-456DM6RU",
    brand: "Haier",
    image: "images/8a9c48e05f21574dfda15f1a128c646f.avif",
    desc: "456 л (316 л + 140 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, нержавеющая сталь, высота 180 см.",
    price: 4254 + 1000,
    memoryOptions: [
        { size: "456L", price: 4254 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "456L"
},
{
    id: 749,
    name: "Холодильник Haier C2F637CWMVU1",
    brand: "Haier",
    image: "images/5175da0267144f80e06c9002e5893690.avif",
    desc: "386 л (278 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 199.8 см.",
    price: 2425 + 1000,
    memoryOptions: [
        { size: "386L", price: 2425 + 1000, color: "White" }
    ],
    defaultMemory: "386L"
},
{
    id: 750,
    name: "Холодильник Haier C2F636CRRGU1",
    brand: "Haier",
    image: "images/93557ed1da2206193ee764313d08e1a9.avif",
    desc: "364 л (256 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, сенсорное управление, красный, высота 190.5 см.",
    price: 2505 + 1000,
    memoryOptions: [
        { size: "364L", price: 2505 + 1000, color: "Red" }
    ],
    defaultMemory: "364L"
},
{
    id: 751,
    name: "Холодильник Haier C4F640CCGU1",
    brand: "Haier",
    image: "images/918c42ea542c92cda1bdebcaca2b24b6.avif",
    desc: "400 л (285 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, бежевый, высота 200 см.",
    price: 2580 + 1000,
    memoryOptions: [
        { size: "400L", price: 2580 + 1000, color: "Beige" }
    ],
    defaultMemory: "400L"
},
{
    id: 752,
    name: "Холодильник Haier C2F637CCGU1",
    brand: "Haier",
    image: "images/851a4d376edb20748d09970aecd8a2cd.avif",
    desc: "386 л (278 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, бежевый, высота 199.8 см.",
    price: 2519 + 1000,
    memoryOptions: [
        { size: "386L", price: 2519 + 1000, color: "Beige" }
    ],
    defaultMemory: "386L"
},
{
    id: 753,
    name: "Холодильник Haier C2F636CWRGU1",
    brand: "Haier",
    image: "images/1bc8b08e8e10e8555098937a5fef1871.avif",
    desc: "364 л (256 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 190.5 см.",
    price: 2222 + 1000,
    memoryOptions: [
        { size: "364L", price: 2222 + 1000, color: "White" }
    ],
    defaultMemory: "364L"
},
{
    id: 754,
    name: "Холодильник Haier C4F740CBXGU1",
    brand: "Haier",
    image: "images/8726b754d10e6e2a81900e2591bd8adf.avif",
    desc: "401 л (286 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, черная нержавеющая сталь, высота 200 см.",
    price: 3014 + 1000,
    memoryOptions: [
        { size: "401L", price: 3014 + 1000, color: "Black Stainless Steel" }
    ],
    defaultMemory: "401L"
},
{
    id: 755,
    name: "Холодильник Haier HB18FGSAAARU",
    brand: "Haier",
    image: "images/37c1c0c850d18d908b2358238846d14a.avif",
    desc: "508 л (351 л + 157 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 190 см.",
    price: 6461 + 1000,
    memoryOptions: [
        { size: "508L", price: 6461 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "508L"
},
{
    id: 756,
    name: "Холодильник HAIER CEF535AWD",
    brand: "Haier",
    image: "images/66c9b8190ed47cd8cb835fc5ca8c2bf2.avif",
    desc: "346 л (241 л + 105 л), полный No Frost, стандартный компрессор, электронное управление, белый, высота 190 см.",
    price: 1863 + 1000,
    memoryOptions: [
        { size: "346L", price: 1863 + 1000, color: "White" }
    ],
    defaultMemory: "346L"
},
{
    id: 757,
    name: "Холодильник HAIER HRF-541DM7RU",
    brand: "Haier",
    image: "images/e04c87e06a637bfe60faf0a7101f949d.avif",
    desc: "504 л (337 л + 167 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, серебристый, высота 177.5 см.",
    price: 4252 + 1000,
    memoryOptions: [
        { size: "504L", price: 4252 + 1000, color: "Silver" }
    ],
    defaultMemory: "504L"
},
{
    id: 758,
    name: "Холодильник Haier C2F636CCRGU1",
    brand: "Haier",
    image: "images/8ea20f2f92f20a2202d1de9cda70c074.avif",
    desc: "364 л (256 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, сенсорное управление, бежевый, высота 190.5 см.",
    price: 2315 + 1000,
    memoryOptions: [
        { size: "364L", price: 2315 + 1000, color: "Beige" }
    ],
    defaultMemory: "364L"
},
{
    id: 759,
    name: "Холодильник Haier HTF-425DM7RU",
    brand: "Haier",
    image: "images/f7151e9313d47b90b73de2ea21360a94.avif",
    desc: "425 л (308 л + 117 л), полный No Frost, инверторный компрессор, электронное управление, серебристый, высота 181.5 см.",
    price: 4130 + 1000,
    memoryOptions: [
        { size: "425L", price: 4130 + 1000, color: "Silver" }
    ],
    defaultMemory: "425L"
},
{
    id: 760,
    name: "Холодильник HAIER A4F739CBXGU1",
    brand: "Haier",
    image: "images/5d6bc504fff89110dc475bdae233f0d9.avif",
    desc: "389 л (286 л + 103 л), полный No Frost, инверторный компрессор, электронное управление, черный, высота 200 см.",
    price: 3485 + 1000,
    memoryOptions: [
        { size: "389L", price: 3485 + 1000, color: "Black" }
    ],
    defaultMemory: "389L"
},

        // TECHNO (10 моделей)
      {
    id: 721,
    name: "Холодильник TECHNO FF2-55N BI IV",
    brand: "TECHNO",
    image: "images/71b18a2bc8b7916631814f370f795351.avif",
    desc: "436 л (291 л + 145 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 177 см.",
    price: 2099 + 1000,
    memoryOptions: [
        { size: "436L", price: 2099 + 1000, color: "Black" }
    ],
    defaultMemory: "436L"
},
{
    id: 722,
    name: "Холодильник TECHNO DE2-34",
    brand: "TECHNO",
    image: "images/df43ba22f3f64b51280adc3d0d18e279.avif",
    desc: "250 л (183 л + 62 л), без No Frost, электронное управление, белый, высота 180 см.",
    price: 1018 + 1000,
    memoryOptions: [
        { size: "250L", price: 1018 + 1000, color: "White" }
    ],
    defaultMemory: "250L"
},
{
    id: 723,
    name: "Холодильник TECHNO DF1-11S",
    brand: "TECHNO",
    image: "images/0cdbbd0eb8a18d3f92f940a38b4aa60d.avif",
    desc: "92 л, без No Frost, стандартный компрессор, механическое управление, белый, высота 85 см.",
    price: 442 + 1000,
    memoryOptions: [
        { size: "92L", price: 442 + 1000, color: "White" }
    ],
    defaultMemory: "92L"
},
{
    id: 724,
    name: "Холодильник TECHNO FS4-36 BI",
    brand: "TECHNO",
    image: "images/68e826557e2a20bd09d48a4875f4dd01.avif",
    desc: "300 л (185 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 186 см.",
    price: 1921 + 1000,
    memoryOptions: [
        { size: "300L", price: 1921 + 1000, color: "Black" }
    ],
    defaultMemory: "300L"
},
{
    id: 725,
    name: "Холодильник TECHNO FF4-73 SS",
    brand: "TECHNO",
    image: "images/6361c7821fcf85c9dc19b6579bee0bc7.avif",
    desc: "512 л (364 л + 148 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 190.6 см.",
    price: 3114 + 1000,
    memoryOptions: [
        { size: "512L", price: 3114 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "512L"
},
{
    id: 726,
    name: "Встраиваемый холодильник TECHNO DE2-34.BI",
    brand: "TECHNO",
    image: "images/Group-186.webp",
    desc: "250 л (185 л + 65 л), без No Frost, стандартный компрессор, электронное управление, белый, высота 178 см, встраиваемый.",
    price: 1516 + 1000,
    memoryOptions: [
        { size: "250L", price: 1516 + 1000, color: "White" }
    ],
    defaultMemory: "250L"
},
{
    id: 727,
    name: "Холодильник TECHNO FF4-73 BI",
    brand: "TECHNO",
    image: "images/f61e2c98f8a647ae4c588ddce9592941.avif",
    desc: "512 л (364 л + 148 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 190.6 см.",
    price: 3114 + 1000,
    memoryOptions: [
        { size: "512L", price: 3114 + 1000, color: "Black" }
    ],
    defaultMemory: "512L"
},
{
    id: 728,
    name: "Холодильник TECHNO FN2-47S SS",
    brand: "TECHNO",
    image: "images/954e339e82d33735ef9610d47adf8e70.avif",
    desc: "342 л (245 л + 97 л), полный No Frost, линейный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 193.5 см.",
    price: 1654 + 1000,
    memoryOptions: [
        { size: "342L", price: 1654 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "342L"
},
{
    id: 729,
    name: "Холодильник TECHNO DD2-27",
    brand: "TECHNO",
    image: "images/f673d01df25a336cd0c65f1f998597c3.avif",
    desc: "207 л (141 л + 66 л), No Frost только в холодильной камере, механическое управление, белый, высота 151 см.",
    price: 1043 + 1000,
    memoryOptions: [
        { size: "207L", price: 1043 + 1000, color: "White" }
    ],
    defaultMemory: "207L"
},
{
    id: 730,
    name: "Холодильник TECHNO FF4-65",
    brand: "TECHNO",
    image: "images/c4b92a392820bf5081be8f3a7c6c8927.avif",
    desc: "491 л (419 л + 72 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, темно-серый, высота 190.5 см.",
    price: 2955 + 1000,
    memoryOptions: [
        { size: "491L", price: 2955 + 1000, color: "Dark Gray" }
    ],
    defaultMemory: "491L"
},
{
    id: 731,
    name: "Холодильник TECHNO FN2-46S",
    brand: "TECHNO",
    image: "images/118f9e2d23b54eab5826f78be3864f27.avif",
    desc: "320 л (225 л + 95 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 184 см.",
    price: 1508 + 1000,
    memoryOptions: [
        { size: "320L", price: 1508 + 1000, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 732,
    name: "Холодильник TECHNO FN2-31 (серебристый)",
    brand: "TECHNO",
    image: "images/af1450da6c98f48a509bafc61f8081b1.avif",
    desc: "247 л (165 л + 82 л), полный No Frost, стандартный компрессор, механическое управление, серебристый, высота 180 см.",
    price: 1560 + 1000,
    memoryOptions: [
        { size: "247L", price: 1560 + 1000, color: "Silver" }
    ],
    defaultMemory: "247L"
},
{
    id: 733,
    name: "Холодильник TECHNO FN2-47S BI",
    brand: "TECHNO",
    image: "images/ae02e93f30845e7a8ef62ee1f7269b87.avif",
    desc: "342 л (245 л + 97 л), полный No Frost, линейный компрессор, зона свежести, электронное управление, черный, высота 193.5 см.",
    price: 1932 + 1000,
    memoryOptions: [
        { size: "342L", price: 1932 + 1000, color: "Black" }
    ],
    defaultMemory: "342L"
},
{
    id: 734,
    name: "Холодильник TECHNO DF1-20N",
    brand: "TECHNO",
    image: "images/df120n_techno__9752668_822bb3c063bbe60a904a4b87d6315416.webp",
    desc: "128 л (110 л), без No Frost, механическое управление, белый, высота 114.5 см.",
    price: 778 + 1000,
    memoryOptions: [
        { size: "128L", price: 778 + 1000, color: "White" }
    ],
    defaultMemory: "128L"
},
{
    id: 735,
    name: "Холодильник TECHNO FN2-43",
    brand: "TECHNO",
    image: "images/8c291dd863539e19c0dd74cc3375164d.avif",
    desc: "319 л (243 л + 76 л), полный No Frost, электронное управление, белый, высота 201 см.",
    price: 1576 + 1000,
    memoryOptions: [
        { size: "319L", price: 1576 + 1000, color: "White" }
    ],
    defaultMemory: "319L"
},
{
    id: 736,
    name: "Холодильник TECHNO EF1-16",
    brand: "TECHNO",
    image: "images/7b79bb901e3c83f20e3552e7d9e02d9b.avif",
    desc: "109 л (95 л + 14 л), без No Frost, стандартный компрессор, механическое управление, белый, высота 85 см.",
    price: 730 + 1000,
    memoryOptions: [
        { size: "109L", price: 730 + 1000, color: "White" }
    ],
    defaultMemory: "109L"
},

        // SAMSUNG (10 моделей)
    {
    id: 710,
    name: "Холодильник Samsung RS80F65J1FWR",
    brand: "Samsung",
    image: "images/086b0f7c1c549e939c36910d867f477d.avif",
    desc: "646 л (414 л + 202 л), полный No Frost, инверторный компрессор, сенсорное управление, черный, высота 178.6 см.",
    price: 9549 + 1000,
    memoryOptions: [
        { size: "646L", price: 9549 + 1000, color: "Black" }
    ],
    defaultMemory: "646L"
},
{
    id: 711,
    name: "Холодильник Samsung RB30A30N0SA/WT",
    brand: "Samsung",
    image: "images/8378296fa475b7014fbeb9a2bb196cdb.avif",
    desc: "311 л (213 л + 98 л), полный No Frost, инверторный компрессор, электронное управление, серебристый, высота 178 см.",
    price: 1839 + 1000,
    memoryOptions: [
        { size: "311L", price: 1839 + 1000, color: "Silver" }
    ],
    defaultMemory: "311L"
},
{
    id: 712,
    name: "Холодильник SAMSUNG RF48A4000B4/WT",
    brand: "Samsung",
    image: "images/7ea8be9aa2072363148cf88a59887bfd.avif",
    desc: "468 л (328 л + 140 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 179.3 см.",
    price: 5499 + 1000,
    memoryOptions: [
        { size: "468L", price: 5499 + 1000, color: "Black" }
    ],
    defaultMemory: "468L"
},
{
    id: 713,
    name: "Холодильник Samsung RF65DB970012WR",
    brand: "Samsung",
    image: "images/ea356e0fea14f0262517764dd2ed5053.avif",
    desc: "551 л (362 л + 189 л), полный No Frost, инверторный компрессор, сенсорное управление, белый, высота 185.3 см.",
    price: 13990 + 1000,
    memoryOptions: [
        { size: "551L", price: 13990 + 1000, color: "White" }
    ],
    defaultMemory: "551L"
},
{
    id: 714,
    name: "Холодильник Samsung RS70F65Q1TWR",
    brand: "Samsung",
    image: "images/6dea7ae8fdeb47afaa986eb522898e51.avif",
    desc: "647 л (418 л + 229 л), полный No Frost, инверторный компрессор, сенсорное управление, нержавеющая сталь, высота 178 см.",
    price: 6839 + 1000,
    memoryOptions: [
        { size: "647L", price: 6839 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "647L"
},
{
    id: 715,
    name: "Холодильник SAMSUNG RF48A4000M9/WT",
    brand: "Samsung",
    image: "images/a5b2af6c58ff8da04fcc1149ce59c5fd.avif",
    desc: "468 л (328 л + 140 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 179.3 см.",
    price: 5499 + 1000,
    memoryOptions: [
        { size: "468L", price: 5499 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "468L"
},
{
    id: 716,
    name: "Холодильник Samsung RS90F65D1FWR",
    brand: "Samsung",
    image: "images/bd355832774a24126317d2d168edb07d.avif",
    desc: "594 л (392 л + 202 л), полный No Frost, инверторный компрессор, сенсорное управление, черный, высота 178.6 см.",
    price: 10369 + 1000,
    memoryOptions: [
        { size: "594L", price: 10369 + 1000, color: "Black" }
    ],
    defaultMemory: "594L"
},
{
    id: 717,
    name: "Холодильник Samsung RS70F65Q1FWR",
    brand: "Samsung",
    image: "images/b47179f84f5663cd416b923c716bf8f1.avif",
    desc: "647 л (418 л + 229 л), полный No Frost, инверторный компрессор, сенсорное управление, черный, высота 178 см.",
    price: 6879 + 1000,
    memoryOptions: [
        { size: "647L", price: 6879 + 1000, color: "Black" }
    ],
    defaultMemory: "647L"
},
{
    id: 718,
    name: "Холодильник Samsung RS80F65M1WWR",
    brand: "Samsung",
    image: "images/b70ec109a0e7387c53b6aef3073508ad.avif",
    desc: "646 л (417 л + 229 л), полный No Frost, инверторный компрессор, сенсорное управление, белый, высота 178.6 см.",
    price: 9169 + 1000,
    memoryOptions: [
        { size: "646L", price: 9169 + 1000, color: "White" }
    ],
    defaultMemory: "646L"
},
{
    id: 719,
    name: "Холодильник Samsung RS80F65M1BWR",
    brand: "Samsung",
    image: "images/a4910213d799fc966815e493ed619d8e.avif ",
    desc: "646 л (417 л + 229 л), полный No Frost, инверторный компрессор, сенсорное управление, черный, высота 178.6 см.",
    price: 9169 + 1000,
    memoryOptions: [
        { size: "646L", price: 9169 + 1000, color: "Black" }
    ],
    defaultMemory: "646L"
},
{
    id: 720,
    name: "Холодильник SAMSUNG RF65DG90B0SRWR",
    brand: "Samsung",
    image: "images/cafc353a870b49654660c370227b29eb.avif",
    desc: "602 л (399 л + 203 л), полный No Frost, инверторный компрессор, электронное управление, нержавеющая сталь, высота 183 см.",
    price: 11999 + 1000,
    memoryOptions: [
        { size: "602L", price: 11999 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "602L"
},

        // Midea (10 моделей)
       {
    id: 699,
    name: "Холодильник Midea MDRB521MGE22ODM",
    brand: "Midea",
    image: "images/43be1a008cfc1413aa5a9b837e0a364c.avif",
    desc: "360 л (256 л + 104 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, черный, высота 201.8 см.",
    price: 2409 + 1000,
    memoryOptions: [
        { size: "360L", price: 2409 + 1000, color: "Black" }
    ],
    defaultMemory: "360L"
},
{
    id: 700,
    name: "Холодильник Midea MDRB521MIE28OD",
    brand: "Midea",
    image: "images/d6169973ae190364afc83010c4ac556e.avif",
    desc: "360 л (256 л + 104 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, черный, высота 201.8 см.",
    price: 2046 + 1000,
    memoryOptions: [
        { size: "360L", price: 2046 + 1000, color: "Black" }
    ],
    defaultMemory: "360L"
},
{
    id: 701,
    name: "Холодильник-морозильник Midea MDRF692MIE46",
    brand: "Midea",
    image: "images/e23ed680276ffef36aa6c6aa993230d0.avif",
    desc: "531 л (357 л + 174 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, темный металлик, высота 189.8 см.",
    price: 4507 + 1000,
    memoryOptions: [
        { size: "531L", price: 4507 + 1000, color: "Dark Metallic" }
    ],
    defaultMemory: "531L"
},
{
    id: 702,
    name: "Холодильник Midea MDRF692MIE28",
    brand: "Midea",
    image: "images/ce6074d092ebb3456b761cad3c11c136.avif",
    desc: "531 л (347 л + 174 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, темная нержавеющая сталь, высота 189.8 см.",
    price: 4485 + 1000,
    memoryOptions: [
        { size: "531L", price: 4485 + 1000, color: "Dark Stainless Steel" }
    ],
    defaultMemory: "531L"
},
{
    id: 703,
    name: "Холодильник Midea MDRS791MIE46",
    brand: "Midea",
    image: "images/58607ea27a7b13e2032c0adda53e81f6.avif",
    desc: "604 л (384 л + 220 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, нержавеющая сталь, высота 177.5 см.",
    price: 4028 + 1000,
    memoryOptions: [
        { size: "604L", price: 4028 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "604L"
},
{
    id: 704,
    name: "Холодильник Midea MDRB470MGF01OM",
    brand: "Midea",
    image: "images/bcd07d2c854d73f5e655f15be84325b3.avif",
    desc: "320 л (216 л + 104 л), полный No Frost, стандартный компрессор, зона свежести, сенсорное управление, белый, высота 185 см.",
    price: 1964 + 1000,
    memoryOptions: [
        { size: "320L", price: 1964 + 1000, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 705,
    name: "Холодильник-морозильник Midea MDRB470MGF01O",
    brand: "Midea",
    image: "images/99fe64daaec60be8966bcf28fb3e841c.avif",
    desc: "320 л (216 л + 104 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 185 см.",
    price: 1955 + 1000,
    memoryOptions: [
        { size: "320L", price: 1955 + 1000, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 706,
    name: "Холодильник Midea MDRB470MGF46O",
    brand: "Midea",
    image: "images/48ef22fdeec809359b561a744338b9f4.avif",
    desc: "320 л (216 л + 104 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 185 см.",
    price: 1899 + 1000,
    memoryOptions: [
        { size: "320L", price: 1899 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "320L"
},
{
    id: 707,
    name: "Холодильник-морозильник Midea MDRB470MGF46OM",
    brand: "Midea",
    image: "images/087a9e00864c6098c4f1b200af56170d.avif",
    desc: "320 л (216 л + 104 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, серебристый, высота 185 см.",
    price: 1829 + 1000,
    memoryOptions: [
        { size: "320L", price: 1829 + 1000, color: "Silver" }
    ],
    defaultMemory: "320L"
},
{
    id: 708,
    name: "Холодильник Midea MDRF692MIE22",
    brand: "Midea",
    image: "images/78a79990e50a90c2d9d321a36a48f4c3.avif",
    desc: "531 л (357 л + 174 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, черный, высота 189.8 см.",
    price: 4861 + 1000,
    memoryOptions: [
        { size: "531L", price: 4861 + 1000, color: "Black" }
    ],
    defaultMemory: "531L"
},
{
    id: 709,
    name: "Холодильник Midea MDRB521MIE46ODM",
    brand: "Midea",
    image: "images/c7b7933a2f533ca4c2353661b1c8c4d1.avif",
    desc: "360 л (256 л + 104 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, нержавеющая сталь, высота 201.8 см.",
    price: 2277 + 1000,
    memoryOptions: [
        { size: "360L", price: 2277 + 1000, color: "Stainless Steel" }
    ],
    defaultMemory: "360L"
},

      
    ],

    dishwashers: [
        // Korting (10 моделей)
       {
    id: 933,
    name: "Встраиваемая посудомоечная машина Korting KDI 45977",
    brand: "Korting",
    image: "images/b7acfb714efcccb69d3f8d18537f7a62.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 8 программ, класс A+++, проекция дисплея, автооткрывание, встраиваемая.",
    price: 1259 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1259 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 934,
    name: "Посудомоечная машина Korting KDI 60977",
    brand: "Korting",
    image: "images/3860db41357450e514ad8f3b106721f3.avif",
    desc: "Активная сушка, третий короб, защита от протечек, 8 программ, класс A+++, луч на полу, автооткрывание.",
    price: 1429 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1429 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 935,
    name: "Посудомоечная машина Korting KDI 45984",
    brand: "Korting",
    image: "images/4934ebd2e9fac02e0398c74cf65c94e0.avif",
    desc: "Активная сушка, третий короб, защита от протечек, 8 программ, класс A+++, без луча на полу, автооткрывание.",
    price: 1329 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1329 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 936,
    name: "Посудомоечная машина Korting KDCI 4559",
    brand: "Korting",
    image: "images/e6dd882f0e27092da2a43e0f2138b2a0.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, класс A+, без автооткрывания, без третьего короба.",
    price: 1159 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1159 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 937,
    name: "Посудомоечная машина Korting KDI 60984",
    brand: "Korting",
    image: "images/67bee8abeb2fdc438d5205e7ff4fd0f0.avif",
    desc: "Активная сушка, третий короб, защита от протечек, 8 программ, класс A+++, без луча на полу, автооткрывание.",
    price: 1479 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1479 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 938,
    name: "Встраиваемая посудомоечная машина Korting KDI 60110",
    brand: "Korting",
    image: "images/5488c9219bb5b4b10f62e78058c785ca.avif",
    desc: "Сушка с теплообменником, защита от протечек, 5 программ, класс A+, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 1199 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1199 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 939,
    name: "Посудомоечная машина Korting KDI 60017",
    brand: "Korting",
    image: "images/54099800b84e2239030912d22a0f3962.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 5 программ, класс A++, луч на полу, автооткрывание.",
    price: 1599 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1599 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 940,
    name: "Встраиваемая посудомоечная машина Korting KDI 45570",
    brand: "Korting",
    image: "images/3c69a50f98d92b6284ce86fb0d6786e2.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 8 программ, класс A++, луч на полу, без автооткрывания, встраиваемая.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1499 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 941,
    name: "Встраиваемая посудомоечная машина Korting KDI 45140",
    brand: "Korting",
    image: "images/94aab459c4c849d520cdd58ecb1e2aae.avif",
    desc: "Сушка с теплообменником, защита от протечек, 5 программ, класс A++, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 1229 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1229 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 942,
    name: "Посудомоечная машина Korting KDI 45017",
    brand: "Korting",
    image: "images/c12b95c10c29378e9916a8d5bf0ade07.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 5 программ, класс A++, луч на полу, автооткрывание.",
    price: 1449 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1449 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},

        // Haier (10 моделей)
      {
    id: 943,
    name: "Посудомоечная машина Haier HDWE11-595RU",
    brand: "Haier",
    image: "images/3438d2d3112a66de6518ac4a400b17d0.avif",
    desc: "Сушка с открыванием дверцы, третий короб, защита от протечек, 8 программ, класс A+, луч на полу, автооткрывание.",
    price: 2199 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2199 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 944,
    name: "Встраиваемая посудомоечная машина Haier HDWE9-394RU",
    brand: "Haier",
    image: "images/18710c1bb92aa641e5ea9a248c37f8ea.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A, автооткрывание, без третьего короба, без луча на полу, встраиваемая.",
    price: 1219 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1219 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 945,
    name: "Посудомоечная машина Haier HDWE10-395RU",
    brand: "Haier",
    image: "images/5b21914060ae646d37b37f98f4ffdc49.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 3 программы, класс A, луч на полу, без автооткрывания.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1499 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 946,
    name: "Встраиваемая посудомоечная машина Haier HDWE13-191RU",
    brand: "Haier",
    image: "images/5ae7bd8b21d265e07a33156943efe047.avif",
    desc: "Конденсационная сушка, защита от протечек, 3 программы, класс A, автооткрывание, без третьего короба, без луча на полу, встраиваемая.",
    price: 1649 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1649 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 947,
    name: "Встраиваемая посудомоечная машина Haier HDWE10-292RU",
    brand: "Haier",
    image: "images/b5e11b7fdf59e535aae6c190a9ade23b.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A, автооткрывание, без третьего короба, без луча на полу, встраиваемая.",
    price: 1319 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1319 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 948,
    name: "Встраиваемая посудомоечная машина Haier HDWE11-395RU",
    brand: "Haier",
    image: "images/c1d4aec421659f53be5505f3f8e7f518.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 8 программ, класс A, луч на полу, без автооткрывания, встраиваемая.",
    price: 1619 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1619 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 949,
    name: "Встраиваемая посудомоечная машина Haier HDWE14-094RU",
    brand: "Haier",
    image: "images/21d27e208c33ea9170542bdd4608bc09.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 7 программ, класс A, луч на полу, без автооткрывания, встраиваемая.",
    price: 1899 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1899 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 950,
    name: "Посудомоечная машина Haier HDWE16-595RU",
    brand: "Haier",
    image: "images/1023f241b57d79eb1e53899fe535d313.avif",
    desc: "Сушка с открыванием дверцы, третий короб, защита от протечек, 8 программ, класс A+++, луч на полу, автооткрывание.",
    price: 2699 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2699 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 951,
    name: "Встраиваемая посудомоечная машина Haier HDWE11-396RU",
    brand: "Haier",
    image: "images/e346b4d36b626d46fa3f637e6362b82f.avif",
    desc: "Конденсационная сушка, третий короб, 8 программ, класс A, автооткрывание, встраиваемая.",
    price: 1799 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1799 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},

        // Bosch (10 моделей)
 {
    id: 909,
    name: "Встраиваемая посудомоечная машина Bosch Serie 4 SPV4HMX10E",
    brand: "Bosch",
    image: "images/f5b59fa474c597135428a793f69f3565.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, класс A++, луч на полу, без автооткрывания, встраиваемая.",
    price: 1648 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1648 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 910,
    name: "Посудомоечная машина Bosch SPV2IKX10E",
    brand: "Bosch",
    image: "images/fb0649f4522d05474a4a4efcb0c7ce9f.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A+, луч на полу, без автооткрывания, без третьего короба.",
    price: 1398 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1398 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 911,
    name: "Встраиваемая посудомоечная машина Bosch Serie 2 SMV25EX02E",
    brand: "Bosch",
    image: "images/2d327dc3f5ee3ef90bafb3216000b19e.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 5 программ, луч на полу, без автооткрывания, встраиваемая.",
    price: 1358 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1358 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 912,
    name: "Посудомоечная машина Bosch SMV4HVX07E",
    brand: "Bosch",
    image: "images/7f331ee01828a8e0422d8bbc3381eade.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, класс A+++, луч на полу, без автооткрывания.",
    price: 1640 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1640 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 913,
    name: "Встраиваемая посудомоечная машина Bosch Serie 4 SMV4HVX03E",
    brand: "Bosch",
    image: "images/3373910803cd4c3ef47aaab9c7e76f27.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, класс A+++, луч на полу, без автооткрывания, встраиваемая.",
    price: 1650 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1650 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 914,
    name: "Встраиваемая посудомоечная машина Bosch Serie 4 SPV4EMX10E",
    brand: "Bosch",
    image: "images/dabe27faf140cb34744a3aead06c9905.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, луч на полу, автооткрывание двери, встраиваемая.",
    price: 1764 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1764 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 915,
    name: "Посудомоечная машина Bosch Serie 4 SMV4EVX04E",
    brand: "Bosch",
    image: "images/84d5b1b2fcb3c9b3c24fa85d85c0a5f9.avif",
    desc: "Сушка с открыванием дверцы и теплообменником, третий короб, защита от протечек, 6 программ, класс A+++ (новый D), луч на полу, автооткрывание.",
    price: 2369 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2369 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 916,
    name: "Посудомоечная машина Bosch Serie 4 SMV4EVX00E",
    brand: "Bosch",
    image: "images/abe06a590783f0cb880861c784e5bed0.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, луч на полу, автооткрывание двери.",
    price: 2369 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2369 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 917,
    name: "Встраиваемая посудомоечная машина Bosch Serie 8 SMV8YCX02E",
    brand: "Bosch",
    image: "images/94129f9b20c2688cd9a8e3b2cef0cb1d.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 8 программ, класс A, луч на полу, автооткрывание, встраиваемая.",
    price: 3599 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 3599 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 918,
    name: "Посудомоечная машина Bosch Serie 4 SMV4EVX11E",
    brand: "Bosch",
    image: "images/58af699c601c2cefaffd07d962de349d.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, класс B, луч на полу, автооткрывание.",
    price: 2599 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2599 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 919,
    name: "Встраиваемая посудомоечная машина Bosch Serie 4 SPV4EMX25E",
    brand: "Bosch",
    image: "images/bddce75e9b6c07233e217320ae05a9e5.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, класс A+++, проекция дисплея, автооткрывание, встраиваемая.",
    price: 2563 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2563 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 920,
    name: "Встраиваемая посудомоечная машина Bosch Serie 2 SMV25AX06",
    brand: "Bosch",
    image: "images/6c7dec377391bc463c923c4d908cf41d.avif",
    desc: "Сушка с теплообменником, защита от протечек, 5 программ, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1771 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1771 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 921,
    name: "Встраиваемая посудомоечная машина Bosch Serie 2 SMV24AX04E",
    brand: "Bosch",
    image: "images/b4b0641f54a6fe128895218551f370c9.avif",
    desc: "Сушка с теплообменником, защита от протечек, 4 программы, класс E, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1455 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1455 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 922,
    name: "Посудомоечная машина Bosch SMV46KX55E",
    brand: "Bosch",
    image: "images/deeaad9a412ef0f6b49d5c95653a90f0.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 6 программ, луч на полу, без автооткрывания.",
    price: 1877 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1877 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 923,
    name: "Встраиваемая посудомоечная машина Bosch Serie 4 SPV4HKX10E",
    brand: "Bosch",
    image: "images/633932cde34afb4c4cb6a98ec917ac17.avif",
    desc: "Сушка с теплообменником, защита от протечек, 5 программ, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1699 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1699 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 924,
    name: "Посудомоечная машина Bosch SPV6YMX08E",
    brand: "Bosch",
    image: "images/be9131581acbab548f47222cf20be70d.avif",
    desc: "Сушка Zeolith, третий короб, защита от протечек, 6 программ, класс B, луч на полу, автооткрывание.",
    price: 3199 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 3199 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 925,
    name: "Встраиваемая посудомоечная машина Bosch SMV25BX02R",
    brand: "Bosch",
    image: "images/aa247337aa827392c9d80a27d14d74fb.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 1709 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1709 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 926,
    name: "Встраиваемая посудомоечная машина Bosch Serie 4 SPV4HMX49E",
    brand: "Bosch",
    image: "images/c4ac5553d16dd9c02ae36ff6f3273c85.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, класс A, луч на полу, без автооткрывания, встраиваемая.",
    price: 1939 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1939 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 927,
    name: "Посудомоечная машина Bosch SPV6ZMX17E",
    brand: "Bosch",
    image: "images/d2842e497a97236afaee2be2f13e8f89.avif",
    desc: "Сушка Zeolith, третий короб, защита от протечек, 5 программ, класс C, луч на полу, без автооткрывания.",
    price: 2899 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2899 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 928,
    name: "Встраиваемая посудомоечная машина Bosch Serie 4 SPV4HMX65Q",
    brand: "Bosch",
    image: "images/f8d56a6efefd21f20fe099aab5b176d5.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, класс A+, луч на полу, без автооткрывания, встраиваемая.",
    price: 2259 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2259 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 929,
    name: "Посудомоечная машина Bosch Serie 6 SMD6ECX12E",
    brand: "Bosch",
    image: "images/ab262d9ff9a4d1af490c532c36f28135.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 8 программ, класс A (новый G), луч на полу, автооткрывание.",
    price: 3299 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 3299 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 930,
    name: "Посудомоечная машина Bosch Serie 8 SMD8TCX04E",
    brand: "Bosch",
    image: "images/aba462fc22592913bd82177ef56476d1.avif",
    desc: "Сушка Zeolith, третий короб, защита от протечек, 8 программ, класс A (новый G), луч на полу, без автооткрывания.",
    price: 4999 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 4999 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 931,
    name: "Посудомоечная машина Bosch Serie 4 SPV4HMX55Q",
    brand: "Bosch",
    image: "images/5655a3a496c3be390b86afa0594edef2.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, класс A+, без автооткрывания, без луча на полу.",
    price: 2039 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2039 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 932,
    name: "Встраиваемая посудомоечная машина Bosch Seria 6 SPV6EMX05E",
    brand: "Bosch",
    image: "images/ee96a89fede535cda1b27a53046bff04.avif",
    desc: "Сушка с теплообменником, третий короб, защита от протечек, 6 программ, проекция дисплея, автооткрывание, встраиваемая.",
    price: 2869 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2869 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},

        // MAUNFELD (10 моделей)
      {
    id: 885,
    name: "Посудомоечная машина MAUNFELD MLP45230 Light Beam Wi-Fi",
    brand: "MAUNFELD",
    image: "images/67cc12dba890dec4081184da9e88bd6b.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A+++, луч на полу, Wi-Fi.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1399 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 886,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP45230 Light Beam Inverter Wi-Fi",
    brand: "MAUNFELD",
    image: "images/54c239e7d2860ade9c4628020d028f85.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 7 программ, класс A+++, луч на полу, инвертор, Wi-Fi, встраиваемая.",
    price: 1859 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1859 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 887,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-12IMR",
    brand: "MAUNFELD",
    image: "images/1785b95d4ef6ae7192336bfa7bdb1440.avif",
    desc: "Конденсационная сушка, защита от протечек, 9 программ, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1749 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1749 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 888,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-08I Light Beam",
    brand: "MAUNFELD",
    image: "images/f4f95be12d794d62b0c8a8b912b2bd06.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1229 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1229 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 889,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-083D Light Beam",
    brand: "MAUNFELD",
    image: "images/eef6d33414e23d26662f70106888f216.avif",
    desc: "Конденсационная сушка, третий короб, 6 программ, класс A++, луч на полу, без автооткрывания, встраиваемая.",
    price: 1529 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1529 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 890,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-06IM",
    brand: "MAUNFELD",
    image: "images/b3c68ca84d79c6336057703d0e5df22a.avif",
    desc: "Конденсационная сушка, защита от протечек корпуса, 6 программ, класс A+, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 1189 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1189 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 891,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-12IMRO",
    brand: "MAUNFELD",
    image: "images/aaaefef215d871f2a8fbe946f9719387.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 9 программ, класс A+++, луч на полу, встраиваемая.",
    price: 2269 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2269 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 892,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-08IMR",
    brand: "MAUNFELD",
    image: "images/591afacbeb906599cffe85b77b28dfa8.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 8 программ, класс A++, луч на полу, без автооткрывания, встраиваемая.",
    price: 1449 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1449 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 893,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-123D Light Beam",
    brand: "MAUNFELD",
    image: "images/0aff4a5a24a3cbf7f6e51d8bc61cc7a6.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 6 программ, класс A++, луч на полу, без автооткрывания, встраиваемая.",
    price: 1639 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1639 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 894,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-08B",
    brand: "MAUNFELD",
    image: "images/8cdc07925d01c25d63e84ce05b9519f0.avif",
    desc: "Конденсационная сушка, защита от протечек, 7 программ, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1629 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1629 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 895,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-12IM",
    brand: "MAUNFELD",
    image: "images/5f88f40c39fc99fb655a1554e62180ae.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 9 программ, класс A++, луч на полу, без автооткрывания, встраиваемая.",
    price: 2059 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2059 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 896,
    name: "Посудомоечная машина MAUNFELD MLP-08IM",
    brand: "MAUNFELD",
    image: "images/914575129980ca38b91cda5d7f2212c3.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 9 программ, класс A++, луч на полу, без автооткрывания.",
    price: 1779 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1779 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 897,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-12I Light Beam",
    brand: "MAUNFELD",
    image: "images/bef3c2ecd344b50fe5ad9e63e92e459c.avif",
    desc: "Конденсационная сушка, защита от протечек, 4 программы, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1659 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1659 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 898,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP6242G02 Light Beam",
    brand: "MAUNFELD",
    image: "images/f5f4cfbf5b481afde4910d9d853c5ba3.avif",
    desc: "Конденсационная сушка, защита от протечек, 4 программы, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1579 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1579 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 899,
    name: "Посудомоечная машина MAUNFELD MLP-083I Light Beam",
    brand: "MAUNFELD",
    image: "images/dba20a2ab3032c0a0ac104290006c9d2.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 5 программ, класс A++, луч на полу, без автооткрывания.",
    price: 1519 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1519 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 900,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-08IMROI",
    brand: "MAUNFELD",
    image: "images/23b15922e6962acfaf3b92a66930b57b.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A+++, луч на полу, встраиваемая.",
    price: 2039 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2039 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 901,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP4529A01 Light Beam",
    brand: "MAUNFELD",
    image: "images/da41816e9eeb931348ba6f6848075005.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1229 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1229 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 902,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-08S Light Beam",
    brand: "MAUNFELD",
    image: "images/9bd8f0c2761cf33f87ea1b082f152474.avif",
    desc: "Конденсационная сушка, защита от протечек, 4 программы, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1339 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1339 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 903,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-122D Light Beam",
    brand: "MAUNFELD",
    image: "images/a50da083dd3911fde92a1bb482e14c45.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1579 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1579 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 904,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-08IMRO",
    brand: "MAUNFELD",
    image: "images/044e55470b831a6c6d7f67f49dd638c6.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A++, луч на полу, встраиваемая.",
    price: 1929 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1929 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 905,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-12IMROI",
    brand: "MAUNFELD",
    image: "images/cfe8990afac213bf43a1ae849dd58d2c.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A++, луч на полу, встраиваемая.",
    price: 2389 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2389 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 906,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP45130 Light Beam",
    brand: "MAUNFELD",
    image: "images/764448b8378028da196d8a994611ad17.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 6 программ, класс A++, луч на полу, без автооткрывания, встраиваемая.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1499 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 907,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP4249G02 Light Beam",
    brand: "MAUNFELD",
    image: "images/8a6f375d12d5ae29e8e54183a9840480.avif",
    desc: "Конденсационная сушка, защита от протечек, 4 программы, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1249 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1249 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 908,
    name: "Встраиваемая посудомоечная машина MAUNFELD MLP-082D Light Beam",
    brand: "MAUNFELD",
    image: "images/01a75ae39ec229902f5c3f478dbd554e.avif",
    desc: "Конденсационная сушка, 6 программ, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1359 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1359 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},

        // HOTPOINT (10 моделей)
        {
    id: 866,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 2D85 DWT",
    brand: "Hotpoint",
    image: "images/d8e0cfc5ee3b3061c30b5f6fb395943a.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A, луч на полу, встраиваемая.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1499 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 867,
    name: "Посудомоечная машина Hotpoint HI 5D83 DWT",
    brand: "Hotpoint",
    image: "images/e2c7259b1b9945278a88df24071025c1.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A, луч на полу.",
    price: 1899 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1899 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 868,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 2D86 D",
    brand: "Hotpoint",
    image: "images/bd423bf19c332e7a68f535730c55fdac.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, луч на полу, встраиваемая.",
    price: 1549 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1549 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 869,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 1D67",
    brand: "Hotpoint",
    image: "images/402333604e2dc8c6504369c130622a33.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1189 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1189 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 870,
    name: "Посудомоечная машина Hotpoint HI 5D69 AWSM",
    brand: "Hotpoint",
    image: "images/7c121d3775beebaa15cd4ea7dd4dcec9.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A++, луч на полу.",
    price: 1819 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1819 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 871,
    name: "Встраиваемая посудомоечная машина Hotpoint HI 4C56W",
    brand: "Hotpoint",
    image: "images/898d93abcbf86fcf86f34489bcb0cdcb.avif",
    desc: "Вентиляционная сушка, защита от протечек, 5 программ, класс A+, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1239 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1239 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 872,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 2D87 D",
    brand: "Hotpoint",
    image: "images/da7b7bd403bfa9ce919bf952aff45965.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A, луч на полу, встраиваемая.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1399 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 873,
    name: "Встраиваемая посудомоечная машина Hotpoint HI 4C66",
    brand: "Hotpoint",
    image: "images/29ee47ef171ebebb1640d4c02776559c.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1449 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1449 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 874,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 1C56W",
    brand: "Hotpoint",
    image: "images/9485f636690cb6ea0ed19ba9c7a773bf.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1139 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1139 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 875,
    name: "Встраиваемая посудомоечная машина Hotpoint HI 5D84 DW",
    brand: "Hotpoint",
    image: "images/30fea047a1963c272dd270dd71aea33f.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 8 программ, класс A, луч на полу, без автооткрывания, встраиваемая.",
    price: 1749 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1749 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 876,
    name: "Встраиваемая посудомоечная машина Hotpoint HI 4D66",
    brand: "Hotpoint",
    image: "images/f64d7e72d9ddcacfcb163575705e54b0.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1409 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1409 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 877,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 2C69 S",
    brand: "Hotpoint",
    image: "images/878408bb8dfcd2aac6b3a8ac2d572d14.avif",
    desc: "Конденсационная сушка, защита от протечек, 8 программ, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1919 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1919 + 1000, color: "Silver" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 878,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 6D59",
    brand: "Hotpoint",
    image: "images/8fa94fae9100f3d05dfda20ba7957027.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 1159 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1159 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 879,
    name: "Встраиваемая посудомоечная машина Hotpoint HI 4D66 DW",
    brand: "Hotpoint",
    image: "images/dfbbdbf661a2acae2d846f5467493da8.avif",
    desc: "Вентиляционная сушка, автооткрывание двери, защита от протечек, 6 программ, класс A, луч на полу, без третьего короба, встраиваемая.",
    price: 1849 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1849 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 880,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 1C69",
    brand: "Hotpoint",
    image: "images/cbb309245d487cfce6546239aa64d2bb.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 1449 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1449 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 881,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 1C55 D",
    brand: "Hotpoint",
    image: "images/ab91ea523b6f6e9de4a5a7b14508c6dd.avif",
    desc: "Сушка с открыванием дверцы, третий короб, защита от протечек корпуса, 5 программ, класс A, без автооткрывания, без луча на полу, встраиваемая.",
    price: 1099 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1099 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 882,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 6C59",
    brand: "Hotpoint",
    image: "images/c157e4cc2aa4ab7728ce25b94ab81067.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 989 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 989 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 883,
    name: "Посудомоечная машина HOTPOINT HI 5D85 DW",
    brand: "Hotpoint",
    image: "images/62d7a05df3288b51485cce0f0afef69e.avif",
    desc: "Активная вентиляция, автооткрывание двери, защита от протечек, 8 программ, класс A, луч на полу, без третьего короба.",
    price: 1479 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1479 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 884,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 2D86 W",
    brand: "Hotpoint",
    image: "images/79fa9e05fb84c0e9459810abb5cdcacc.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, класс A, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1299 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},

        // WEISSGAUFF (10 моделей)
       {
    id: 856,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 6036 D AutoOpen",
    brand: "Weissgauff",
    image: "images/0ca6d1db37ff70e0efee02dda9a32ed3 (1).avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 6 программ, класс A+++, без луча на полу, встраиваемая.",
    price: 999 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 999 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 857,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 6038 D Autoopen",
    brand: "Weissgauff",
    image: "images/5949882b5ad6efcd37ba1c0b3fb04113.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A++, луч на полу, встраиваемая.",
    price: 1199 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1199 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 858,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 4525 Infolight",
    brand: "Weissgauff",
    image: "images/d328e0bc3d383e3e6980d0dbb9f3df9b.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 899 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 859,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 6026 D",
    brand: "Weissgauff",
    image: "images/0bef2d76e636f221ab29f13b4aaa82c6.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, класс A++, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 899 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 860,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 4536 D Infolight",
    brand: "Weissgauff",
    image: "images/7dc28895d7e57402eddda7bbe721b082.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 6 программ, класс A++, луч на полу, без автооткрывания, встраиваемая.",
    price: 1099 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1099 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 861,
    name: "Посудомоечная машина Weissgauff BDW 4535 Autoopen Timer Floor",
    brand: "Weissgauff",
    image: "images/beed7e8030b068e3410cda15c924f10d.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 5 программ, класс A+++, проекция дисплея на пол.",
    price: 1199 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1199 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 862,
    name: "Посудомоечная машина Weissgauff BDW 6035",
    brand: "Weissgauff",
    image: "images/ba63e2d25004bbf0bb7e161292a1d7f7.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 5 программ, класс A++, без автооткрывания, без луча на полу.",
    price: 1449 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1449 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 863,
    name: "Встраиваемая посудомоечная машина WEISSGAUFF BDW4543D",
    brand: "Weissgauff",
    image: "images/69a43ed3fce67eff1205b7d24f87d0ec.avif",
    desc: "Конденсационная сушка, защита от протечек, 7 программ, класс A+, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 1128 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1128 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 864,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 4536 D",
    brand: "Weissgauff",
    image: "images/a5854a3f7d005b309a74fa14ad9319ea.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 6 программ, класс A++, без автооткрывания, без луча на полу, встраиваемая.",
    price: 1042 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1042 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 865,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 6136 D Inverter AutoOpen Infolight",
    brand: "Weissgauff",
    image: "images/2e66032ec63f223011cec310feb82c46.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 6 программ, класс A+++, луч на полу, инвертор, встраиваемая.",
    price: 2075 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2075 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},

        // ELECTROLUX (10 моделей)
  {
    id: 832,
    name: "Посудомоечная машина Electrolux EEG48300L",
    brand: "Electrolux",
    image: "images/aa8cab847702b3dfcd7e60bd35964523.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс D.",
    price: 1731 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1731 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 833,
    name: "Встраиваемая посудомоечная машина Electrolux EES848200L",
    brand: "Electrolux",
    image: "images/4bca21bb09142ca7c840a1b12f7082d4.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс E, встраиваемая.",
    price: 1744 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1744 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 834,
    name: "Посудомоечная машина Electrolux EEA17200L",
    brand: "Electrolux",
    image: "images/0dfb2f566e4d47616cca877cab7916f3.avif",
    desc: "Конденсационная сушка, автооткрывание двери, защита от протечек, 5 программ, без третьего короба, без луча на полу.",
    price: 1257 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1257 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 835,
    name: "Встраиваемая посудомоечная машина Electrolux EEM48300L",
    brand: "Electrolux",
    image: "images/3aaac9bb3c2fda5623eb6525e869da5a.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, встраиваемая.",
    price: 1648 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1648 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 836,
    name: "Встраиваемая посудомоечная машина Electrolux AirDry 300 KEAC3200L",
    brand: "Electrolux",
    image: "images/a88ddc51fc5ad217e5f33944034d492c.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, встраиваемая.",
    price: 1463 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1463 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 837,
    name: "Встраиваемая посудомоечная машина Electrolux EEA23200L",
    brand: "Electrolux",
    image: "images/78f8bdb28fc0973953faff98a0da0fa2.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 6 программ, класс E, встраиваемая.",
    price: 1383 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1383 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 838,
    name: "Посудомоечная машина ELECTROLUX EEA43211L",
    brand: "Electrolux",
    image: "images/e00e77bbe204720e41daf3eefd8821c2.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс E.",
    price: 1599 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1599 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 839,
    name: "Встраиваемая посудомоечная машина Electrolux EES47320L",
    brand: "Electrolux",
    image: "images/aa40c34d6d2aab16b6a5d28fa8df2036.avif",
    desc: "Конденсационная сушка, автооткрывание двери, защита от протечек, луч на полу, 8 программ, класс A+++, без третьего короба, встраиваемая.",
    price: 1654 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1654 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 840,
    name: "Встраиваемая посудомоечная машина Electrolux EEM48221L",
    brand: "Electrolux",
    image: "images/48f4d9202c660c51dee16894d8918b90.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс A++, встраиваемая.",
    price: 2499 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2499 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 841,
    name: "Встраиваемая посудомоечная машина Electrolux EEM48320L",
    brand: "Electrolux",
    image: "images/da59c194c37cbb66e6fae214f4ad44c4.avif",
    desc: "Конденсационная сушка, автооткрывание двери, защита от протечек, луч на полу, 7 программ, класс A+++ (новый D), без третьего короба, встраиваемая.",
    price: 2099 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2099 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 842,
    name: "Встраиваемая посудомоечная машина Electrolux EEM69310L",
    brand: "Electrolux",
    image: "images/e470fca1b440e28221448fc2ab78d641.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, встраиваемая.",
    price: 2795 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2795 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 843,
    name: "Встраиваемая посудомоечная машина Electrolux EEA12100L",
    brand: "Electrolux",
    image: "images/980ee5f2f135a5046cdd08d02e6ea867.avif",
    desc: "Конденсационная сушка, автооткрывание двери, защита от протечек, 5 программ, класс A, без третьего короба, без луча на полу, встраиваемая.",
    price: 1385 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1385 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 844,
    name: "Посудомоечная машина ELECTROLUX EES27200L",
    brand: "Electrolux",
    image: "images/445a2b503aca62487ae103cafae33fb4.avif",
    desc: "Сушка с открыванием дверцы, автооткрывание двери, защита от протечек, 5 программ, класс E, без третьего короба.",
    price: 1606 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1606 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 845,
    name: "Посудомоечная машина Electrolux EEC87400W",
    brand: "Electrolux",
    image: "images/28bddf8f9ed5b139f0e55e4e15d76923.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс A+++ (новый D).",
    price: 4440 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 4440 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 846,
    name: "Посудомоечная машина Electrolux EEA71210L",
    brand: "Electrolux",
    image: "images/7afddc2c7bc96da36bed8fda4cb2d201.avif",
    desc: "Сушка AirDry, автооткрывание двери, защита от протечек, 5 программ, без третьего короба, без луча на полу.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1499 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 847,
    name: "Встраиваемая посудомоечная машина Electrolux EEQ47210L",
    brand: "Electrolux",
    image: "images/791adf23c3ed4b9aefa38815ece5d24c.avif",
    desc: "Конденсационная сушка, защита от протечек, луч на полу, 8 программ, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1746 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1746 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 848,
    name: "Встраиваемая посудомоечная машина Electrolux EEM63310L",
    brand: "Electrolux",
    image: "images/0faf36f87df46b23ffe47c4858742bab.avif",
    desc: "Сушка с теплообменником, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, встраиваемая.",
    price: 2555 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2555 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 849,
    name: "Встраиваемая посудомоечная машина Electrolux KEMB3301L",
    brand: "Electrolux",
    image: "images/6f51605e888972e61344e6ca6e5e1059.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, луч на полу, 8 программ, без автооткрывания, встраиваемая.",
    price: 2586 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2586 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 850,
    name: "Встраиваемая посудомоечная машина Electrolux EEM43200L",
    brand: "Electrolux",
    image: "images/загружено.webp",
    desc: "Конденсационная сушка, третий короб, защита от протечек, луч на полу, 8 программ, класс E, без автооткрывания, встраиваемая.",
    price: 2169 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2169 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 851,
    name: "Встраиваемая посудомоечная машина Electrolux EEG62300L",
    brand: "Electrolux",
    image: "images/0936149ffa91c3f912fa934e2b486061.avif",
    desc: "Конденсационная сушка, защита от протечек, луч на полу, 8 программ, без автооткрывания, без третьего короба, встраиваемая.",
    price: 2199 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 2199 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 852,
    name: "Посудомоечная машина Electrolux EEA727200L",
    brand: "Electrolux",
    image: "images/54f45669d79865ad582b808cc200906a.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, класс A++, без автооткрывания, без третьего короба, без луча на полу.",
    price: 1484 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1484 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 853,
    name: "Встраиваемая посудомоечная машина Electrolux EEM69410W",
    brand: "Electrolux",
    image: "images/439a7e0c83889b81e6846b9a742ae2df.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, луч на полу, 8 программ, без автооткрывания, встраиваемая.",
    price: 3001 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 3001 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 854,
    name: "Встраиваемая посудомоечная машина Electrolux EEA23210L",
    brand: "Electrolux",
    image: "images/7e32a1b0ffc67c71f590070ed044d54a.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 6 программ, класс E, встраиваемая.",
    price: 1682 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 1682 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 855,
    name: "Посудомоечная машина Electrolux EEC87315L",
    brand: "Electrolux",
    image: "images/cb971b3f917cddf9ad780c605efe0024.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс D.",
    price: 4091 + 1000,
    memoryOptions: [
        { size: "Full Size", price: 4091 + 1000, color: "White" }
    ],
    defaultMemory: "Full Size"
},

    ],

    coffee: [
        // DeLonghi (10 моделей)
{
    id: 1036,
    name: "Кофемашина DeLonghi Eletta Explore ECAM 450.55 G",
    brand: "DELONGHI",
    image: "images/75f24b9eb13eb5787c4f923ab720b4c3.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, автоматический капучинатор.",
    price: 2689 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2689 + 1000, color: "Gold" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1037,
    name: "Кофемашина DeLonghi Eletta Explore ECAM450.65.S",
    brand: "DELONGHI",
    image: "images/db742aee07fe034e452f6aa93ff32cc3.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола (13 ступеней), автоматический капучинатор, металлические жернова.",
    price: 2859 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2859 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1038,
    name: "Кофемашина Delonghi Magnifica S ECAM220.60.B",
    brand: "DELONGHI",
    image: "images/743ac9263d1a651b2a6a39da9146452b.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор.",
    price: 1549 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1549 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1039,
    name: "Кофемашина DeLonghi Magnifica Evo ECAM290.61.B",
    brand: "DELONGHI",
    image: "images/83f8b22add18c929a5e362c50df86255.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор.",
    price: 2049 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2049 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1040,
    name: "Кофемашина DeLonghi Magnifica Start ECAM 220.30.SB",
    brand: "DELONGHI",
    image: "images/2eefbe4824e2b7768480e740640782ac.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола (13 ступеней), ручной капучинатор.",
    price: 1699 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1699 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1041,
    name: "Кофемашина DeLonghi Eletta Explore ECAM 450.55 S",
    brand: "DELONGHI",
    image: "images/51abb7d2302db08f7a4eb0d1be211f79.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, автоматический капучинатор.",
    price: 2689 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2689 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1042,
    name: "Кофемашина DeLonghi Magnifica Plus ECAM320.60.B",
    brand: "DELONGHI",
    image: "images/9df534b6cb85b613f253a1f64f63034a.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор.",
    price: 2279 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2279 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1043,
    name: "Кофемашина DeLonghi Dinamica Plus ECAM 380.95.TB",
    brand: "DELONGHI",
    image: "images/6143fa9395e9e2c8b18fbe45d05a4137.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола (13 ступеней), автоматический капучинатор.",
    price: 3299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3299 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1044,
    name: "Кофемашина DELONGHI ECAM220.80.SB",
    brand: "DELONGHI",
    image: "images/e09cc8ffb4584dc254ff7391e7bbce42.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор.",
    price: 1699 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1699 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1045,
    name: "Кофемашина DeLonghi Eletta Explore ECAM450.65.G",
    brand: "DELONGHI",
    image: "images/588789ab2a4b91c6d8864aa65da0f0bb.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола (13 ступеней), автоматический капучинатор, металлические жернова.",
    price: 2859 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2859 + 1000, color: "Gold" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1046,
    name: "Кофемашина Delonghi EXAM440.55.W Rivelia",
    brand: "DELONGHI",
    image: "images/fd46cdfb59855effb51c432fcb4ec2ff.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, автоматический капучинатор, металлические жернова.",
    price: 2819 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2819 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1047,
    name: "Кофемашина DeLonghi Magnifica S ECAM22.110.B",
    brand: "DELONGHI",
    image: "images/848c2c50232f8c6aa36f81518ff7a24e.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола (13 ступеней), ручной капучинатор, жернова из нержавеющей стали.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1499 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1048,
    name: "Кофемашина Delonghi EXAM440.55.G Rivelia",
    brand: "DELONGHI",
    image: "images/89fd78b9c73f4f3803e25a174877c32b.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, капучинатор, металлические жернова.",
    price: 2819 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2819 + 1000, color: "Gold" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1049,
    name: "Кофемашина DeLonghi ECAM320.61.G Magnifica Plus",
    brand: "DELONGHI",
    image: "images/a4b04cc081c6a99f758f88d754592dcc.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор.",
    price: 2279 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2279 + 1000, color: "Gold" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1050,
    name: "Кофемашина DeLonghi Eletta Explore ECAM450.86.T",
    brand: "DELONGHI",
    image: "images/31b7584d7308cc6b8c02059ad7870938.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, автоматический капучинатор, металлические жернова.",
    price: 3949 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3949 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1051,
    name: "Кофемашина DeLonghi PrimaDonna Aromatic ECAM630.75.TSM",
    brand: "DELONGHI",
    image: "images/4123ad17e00f6c13242ea1aa8a270286.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, автоматический капучинатор.",
    price: 5399 + 1000,
    memoryOptions: [
        { size: "Standard", price: 5399 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1052,
    name: "Кофемашина Delonghi Rivelia EXAM440.55.B",
    brand: "DELONGHI",
    image: "images/a69df2870a25b0165c6467fe97cc7336.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, капучинатор, металлические жернова.",
    price: 2819 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2819 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1053,
    name: "Кофемашина DeLonghi Rivelia EXAM440.35.B",
    brand: "DELONGHI",
    image: "images/26acd753a268638589c1191ff413b995.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, ручной капучинатор, металлические жернова.",
    price: 2414 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2414 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1054,
    name: "Кофемашина DeLonghi ECAM250.31.SB",
    brand: "DELONGHI",
    image: "images/b8e11c8c43db225e95a56162b6ba9357.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, ручной капучинатор.",
    price: 1588 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1588 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1055,
    name: "Кофемашина DeLonghi Dinamica ECAM350.75.S",
    brand: "DELONGHI",
    image: "images/2f141167e219895b468ba7f8e44a4251.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола (13 ступеней), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 2499 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2499 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1056,
    name: "Кофемашина DeLonghi Magnifica Start ECAM220.22.GB",
    brand: "DELONGHI",
    image: "images/94ae89b3383e348ac234a2f3e5fe3188.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола (13 ступеней), ручной капучинатор.",
    price: 1699 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1699 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1057,
    name: "Кофемашина Delonghi Rivelia EXAM440.55.BG",
    brand: "DELONGHI",
    image: "images/66067d82855a74915dab4775aeecaf50.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, капучинатор, металлические жернова.",
    price: 2819 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2819 + 1000, color: "Beige" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1058,
    name: "Кофемашина DeLonghi EXAM440.35.W",
    brand: "DELONGHI",
    image: "images/c6f65353217984703b44b6207ba151a4.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, капучинатор, металлические жернова.",
    price: 2414 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2414 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1059,
    name: "Кофемашина DeLonghi EXAM440.35.BG",
    brand: "DELONGHI",
    image: "images/9015d190b957bb095ac14f798b801657.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 19 бар, регулировка помола, ручной капучинатор, металлические жернова.",
    price: 2462 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2462 + 1000, color: "Beige" }
    ],
    defaultMemory: "Standard"
},

        // NIVONA (10 моделей)
  {
    id: 1017,
    name: "Кофемашина Nivona CafeRomatica NICR 555",
    brand: "NIVONA",
    image: "images/fbc91a787bb9cf332e33c7d3fe95c47b.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола, капучинатор, жернова из нержавеющей стали.",
    price: 1799 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1799 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1018,
    name: "Кофемашина Nivona CafeRomatica 960",
    brand: "NIVONA",
    image: "images/c696f4f9b587a9602463bc8991368f26.avif",
    desc: "Кофе в зернах и молотый, мощность 1465 Вт, давление 15 бар, регулировка помола, капучинатор, жернова из нержавеющей стали, приготовление двух молочных напитков одновременно.",
    price: 5999 + 1000,
    memoryOptions: [
        { size: "Standard", price: 5999 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1019,
    name: "Кофемашина Nivona CafeRomatica 756",
    brand: "NIVONA",
    image: "images/591c5a3d38d6323554945b460fbfa145.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола, капучинатор, жернова из нержавеющей стали.",
    price: 2699 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2699 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1020,
    name: "Кофемашина Nivona CafeRomatica NICR 550",
    brand: "NIVONA",
    image: "images/eb0be42135f501da434147b01efa90db.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 2099 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2099 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1021,
    name: "Кофемашина Nivona CafeRomatica NICR 790",
    brand: "NIVONA",
    image: "images/dba4b2131140cf432cd33855b64a13dc.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали, приготовление двух молочных напитков одновременно.",
    price: 3599 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3599 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1022,
    name: "Кофемашина Nivona CafeRomatica NICR 690",
    brand: "NIVONA",
    image: "images/521aef07f1728d1dd5f8d132e1cea277.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 2399 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2399 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1023,
    name: "Кофемашина Nivona CafeRomatica NICR 796",
    brand: "NIVONA",
    image: "images/491f7397c9a8d32db022e1bd67bb47e2.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола, капучинатор, жернова из нержавеющей стали.",
    price: 3699 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3699 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1024,
    name: "Кофемашина Nivona CafeRomatica NICR 795",
    brand: "NIVONA",
    image: "images/8133421f004d13c022eca8fe96dd7161.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали, приготовление двух молочных напитков одновременно.",
    price: 3999 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3999 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1025,
    name: "Кофемашина Nivona CafeRomatica NICR 759",
    brand: "NIVONA",
    image: "images/f8d583740f162a8d7cbe431cf0ec1dca.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 3099 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3099 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1026,
    name: "Кофемашина Nivona CafeRomatica NICR 825",
    brand: "NIVONA",
    image: "images/c0a7a43407268030ea08e80304128593.avif",
    desc: "Кофе в зернах, мощность 1465 Вт, давление 15 бар, регулировка помола (5 ступеней), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 4199 + 1000,
    memoryOptions: [
        { size: "Standard", price: 4199 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1027,
    name: "Кофемашина Nivona CafeRomatica NICR 560",
    brand: "NIVONA",
    image: "images/75ed0bb0d4436f13264e2d3405951380.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 2159 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2159 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1028,
    name: "Кофемашина Nivona CafeRomatica NICR 793",
    brand: "NIVONA",
    image: "images/a86566a899d5c1b6a1e5ad65989f9f46.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола (3 ступени), капучинатор, жернова из нержавеющей стали.",
    price: 3499 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3499 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1029,
    name: "Кофемашина Nivona CafeRomatica NICR 820",
    brand: "NIVONA",
    image: "images/b8e21ee809cc2671da8b52a477ae60da.avif",
    desc: "Кофе в зернах и молотый, мощность 1465 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали, приготовление двух молочных напитков одновременно.",
    price: 3999 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3999 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1030,
    name: "Кофемашина Nivona CafeRomatica NICR 799",
    brand: "NIVONA",
    image: "images/ecd3f5096d12abd1dec677be5ac1a8c5.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 3999 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3999 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1031,
    name: "Кофемашина Nivona CafeRomatica NICR 930",
    brand: "NIVONA",
    image: "images/95e66c75814ab5cb4606fa6349212394.avif",
    desc: "Кофе в зернах и молотый, мощность 1465 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 4880 + 1000,
    memoryOptions: [
        { size: "Standard", price: 4880 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1032,
    name: "Кофемашина Nivona CafeRomatica NIVO 8107",
    brand: "NIVONA",
    image: "images/399c99cec0943c9e223a5d942f4df704.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 5899 + 1000,
    memoryOptions: [
        { size: "Standard", price: 5899 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1033,
    name: "Кофемашина Nivona CafeRomatica NIVO 8103",
    brand: "NIVONA",
    image: "images/399c99cec0943c9e223a5d942f4df704 (1).avif",
    desc: "Кофе в зернах и молотый, мощность 1465 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 5699 + 1000,
    memoryOptions: [
        { size: "Standard", price: 5699 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1034,
    name: "Кофемашина Nivona CafeRomatica NICR 970",
    brand: "NIVONA",
    image: "images/65d6b155e841709632fc2a8fcff773f6.avif",
    desc: "Кофе в зернах и молотый, мощность 1455 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 5999 + 1000,
    memoryOptions: [
        { size: "Standard", price: 5999 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1035,
    name: "Кофемашина Nivona CafeRomatica NIVO 8101",
    brand: "NIVONA",
    image: "images/59d821f84f340b5c3f1ab2bb6e94020a.avif",
    desc: "Кофе в зернах и молотый, мощность 1465 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 4699 + 1000,
    memoryOptions: [
        { size: "Standard", price: 4699 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},

        // PHILIPS (10 моделей)
    {
    id: 999,
    name: "Кофемашина Philips EP2331/10",
    brand: "PHILIPS",
    image: "images/aa2c5bd9bf4f013edf2988a7c5241a06.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), автоматический капучинатор, керамические жернова.",
    price: 1549 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1549 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1000,
    name: "Кофемашина PHILIPS EP1220/00",
    brand: "PHILIPS",
    image: "images/7af0d467a9f7676aaa8e5da947a3a452.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), ручной капучинатор, керамические жернова.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1299 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1001,
    name: "Кофемашина PHILIPS EP1224/00",
    brand: "PHILIPS",
    image: "images/24c76d43710d4d1c27ea29d74eb5a9e6.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), ручной капучинатор, керамические жернова.",
    price: 1301 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1301 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1002,
    name: "Кофемашина Philips LatteGo EP4449/70",
    brand: "PHILIPS",
    image: "images/6a397a8cdd643b14f348bb9a808e1a3b.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола, капучинатор, керамические жернова.",
    price: 2999 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2999 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1003,
    name: "Кофемашина Philips Series 3300 LatteGo EP3347/90",
    brand: "PHILIPS",
    image: "images/28937fbd5640ab5d1abddd7e341f5589.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), капучинатор, керамические жернова.",
    price: 2299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2299 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1004,
    name: "Кофемашина PHILIPS EP2231/40",
    brand: "PHILIPS",
    image: "images/f7a74345462cd9d24ad6818ea1a7c749.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), автоматический капучинатор, керамические жернова.",
    price: 1971 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1971 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1005,
    name: "Кофемашина Philips LatteGo EP5544/50",
    brand: "PHILIPS",
    image: "images/b568e90c7e14b9f98b04b02a4f4636e5.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола, капучинатор, керамические жернова.",
    price: 3199 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3199 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1006,
    name: "Кофемашина Philips Series 800 EP0820/00",
    brand: "PHILIPS",
    image: "images/6d5506f78f392848eb2d79b6b3c9b006.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), ручной капучинатор, керамические жернова.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1299 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1007,
    name: "Кофемашина Philips Series 3200 LatteGo EP3546/70",
    brand: "PHILIPS",
    image: "images/a1d420399f091cfc548feba98366c58f.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), капучинатор, керамические жернова.",
    price: 3244 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3244 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1008,
    name: "Кофемашина Philips EP3323/90",
    brand: "PHILIPS",
    image: "images/c672068b1a7ea6390e14c763ce32b1d4.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), ручной капучинатор, керамические жернова.",
    price: 2200 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2200 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1009,
    name: "Кофемашина Philips Series 3300 LatteGo EP3343/70",
    brand: "PHILIPS",
    image: "images/7b4de495e7935c65baf38f7c387a25dc.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), капучинатор, керамические жернова.",
    price: 3033 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3033 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1010,
    name: "Кофемашина Philips EP2224/10",
    brand: "PHILIPS",
    image: "images/8ceb4651b5bb053250d9218bfc06491f.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола, ручной капучинатор, керамические жернова.",
    price: 1662 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1662 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1011,
    name: "Кофемашина Philips serie 3300 EP3343/50",
    brand: "PHILIPS",
    image: "images/e989460a60ca706b29ca0d8b6b6b690b.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), автокапучинатор, керамические жернова.",
    price: 2681 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2681 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1012,
    name: "Кофемашина Philips EP3321/40",
    brand: "PHILIPS",
    image: "images/35d6c8c4ff966f7cfca54d103c96e254.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола, ручной капучинатор.",
    price: 2117 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2117 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1013,
    name: "Кофемашина Philips EP2334/10",
    brand: "PHILIPS",
    image: "images/d5a832004035b8e3d180482232aa1ea0.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), капучинатор.",
    price: 2059 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2059 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1014,
    name: "Кофемашина Philips Series 4300 LatteGo EP4341/51",
    brand: "PHILIPS",
    image: "images/27f3e15c5ada5f0317f03a3cf6362aac.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), капучинатор.",
    price: 3225 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3225 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1015,
    name: "Кофемашина Philips EP2236/40",
    brand: "PHILIPS",
    image: "images/23f4c2a83d26f3bb8a8c2a792b88b9e1.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), капучинатор.",
    price: 1899 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1899 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1016,
    name: "Кофемашина Philips EP2230/10",
    brand: "PHILIPS",
    image: "images/30d93aa9f837314e98de4586c59c7445.avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, регулировка помола (12 ступеней), автоматический капучинатор, керамические жернова.",
    price: 2185 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2185 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},

        // POLARIS (10 моделей)
{
    id: 993,
    name: "Кофемашина Polaris PACM 2055AC (черный/серебряный)",
    brand: "POLARIS",
    image: "images/33cffed884a4d035edf16e13eb2d273e.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 20 бар, регулировка помола, автоматический капучинатор.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1399 + 1000, color: "Black/Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 994,
    name: "Кофемашина POLARIS PACM 2081AC WIFI IQ Home Черный",
    brand: "POLARIS",
    image: "images/7bc1d742c743b9f18f76c4d44dea02ec.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 20 бар, регулировка помола, капучинатор, керамические жернова, Wi-Fi.",
    price: 2699 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2699 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 995,
    name: "Кофемашина Polaris PACM 2070AC",
    brand: "POLARIS",
    image: "images/b7e455104e07179fb106c81a9bacd4f4.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 20 бар, регулировка помола, капучинатор, жернова из нержавеющей стали.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1499 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 996,
    name: "Кофемашина POLARIS PACM 2080AC WIFI IQ Home (графитовый)",
    brand: "POLARIS",
    image: "images/12dc9afe40b16fd0802434291b7a4f32 (1).avif",
    desc: "Кофе в зернах, мощность 1500 Вт, давление 20 бар, регулировка помола, автоматический капучинатор, жернова из нержавеющей стали, приготовление двух молочных напитков одновременно, Wi-Fi.",
    price: 2999 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2999 + 1000, color: "Graphite" }
    ],
    defaultMemory: "Standard"
},
{
    id: 997,
    name: "Кофемашина POLARIS PACM 2085GC WIFI IQ Home (Графитовый)",
    brand: "POLARIS",
    image: "images/7f8aeb23ac6381eb31eb4ff0c567b162.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 20 бар, регулировка помола, автоматический капучинатор, жернова из нержавеющей стали, Wi-Fi.",
    price: 2499 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2499 + 1000, color: "Graphite" }
    ],
    defaultMemory: "Standard"
},
{
    id: 998,
    name: "Кофемашина Polaris PACM 2071AC",
    brand: "POLARIS",
    image: "images/31d5071ba688e9c6cf83872dbbe9d3cb (2).avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 20 бар, регулировка помола, капучинатор.",
    price: 2599 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2599 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},

        // Krups (10 моделей)
{
    id: 977,
    name: "Автоматическая KRUPS Intuition Preference EA873810",
    brand: "Krups",
    image: "images/3b6e3c371ead0d0e6666cf472b3a59d0.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола (5 ступеней), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 3099 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3099 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 978,
    name: "Кофемашина Krups Evidence EA891810",
    brand: "Krups",
    image: "images/91188602dbde6b027c7f2253bbdd4003.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали, приготовление двух молочных напитков одновременно.",
    price: 2699 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2699 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 979,
    name: "Кофемашина KRUPS ESSENTIAL EA810870",
    brand: "Krups",
    image: "images/14c0d62e4691ae505282bcadc2f22a25.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола (3 ступени), ручной капучинатор, металлические жернова.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1299 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 980,
    name: "Кофемашина KRUPS EVIDENCE EA891C10",
    brand: "Krups",
    image: "images/48f3ee717773470088210d7d413cfc8a.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали, приготовление двух молочных напитков одновременно.",
    price: 3179 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3179 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 981,
    name: "Кофемашина KRUPS EVIDENCE EA891D10",
    brand: "Krups",
    image: "images/df0314ee79d44290d55cce209cb33033.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали, приготовление двух молочных напитков одновременно.",
    price: 3179 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3179 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 982,
    name: "Автоматическая кофемашина KRUPS EVIDENCE EA894T10",
    brand: "Krups",
    image: "images/2f0d2d20c2d62520e484705e1dfd9be7.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали, приготовление двух молочных напитков одновременно.",
    price: 3499 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3499 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 983,
    name: "Кофемашина KRUPS EA810B70",
    brand: "Krups",
    image: "images/f7dab1674cba8401c60d571db7fbf3f9.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола (3 ступени), ручной капучинатор, металлические жернова.",
    price: 1799 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1799 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 984,
    name: "Автоматическая кофемашина KRUPS Intuition Experience + EA877D10",
    brand: "Krups",
    image: "images/17bd495e6e0b9ca8da693f6093a08ed4.avif",
    desc: "Кофе в зернах, мощность 1550 Вт, давление 15 бар, регулировка помола (5 ступеней), капучинатор, приготовление двух молочных напитков одновременно.",
    price: 4199 + 1000,
    memoryOptions: [
        { size: "Standard", price: 4199 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 985,
    name: "Автоматическая кофемашина KRUPS Arabica EA819N10",
    brand: "Krups",
    image: "images/39acac4ca7bb8d6e6849ff3b1378cadf.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола (3 ступени), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 2399 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2399 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 986,
    name: "Автоматическая кофемашина KRUPS Intuition Preference+ EA875E10",
    brand: "Krups",
    image: "images/736f54d8bc929bb8304f7c4549b848be.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола (5 ступеней), автоматический капучинатор, жернова из нержавеющей стали.",
    price: 3299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3299 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 987,
    name: "Кофемашина Krups EA815070",
    brand: "Krups",
    image: "images/1706a6cde510516229231975e6515ab4.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола, ручной капучинатор, металлические жернова.",
    price: 1859 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1859 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 988,
    name: "Эспрессо кофемашина Krups Evidence Plus EA894810",
    brand: "Krups",
    image: "images/1bb0bc01e91e1d95c64031b86a65f259.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор, жернова из нержавеющей стали.",
    price: 3599 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3599 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 989,
    name: "Кофемашина Krups Evidence One EA895N10",
    brand: "Krups",
    image: "images/685b55389f7a269b7154241f5dc778e6.avif",
    desc: "Молотый кофе, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор, приготовление двух молочных напитков одновременно.",
    price: 2899 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2899 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 990,
    name: "Кофемашина KRUPS EA898GF0",
    brand: "Krups",
    image: "images/d29528c0dae1410236066e0242f28cb2.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола, капучинатор, металлические жернова.",
    price: 2999 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2999 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 991,
    name: "Автоматическая кофемашина KRUPS EVIDENCE EA89W410",
    brand: "Krups",
    image: "images/7070cb28a25d0fdf4c5a1d46b03032a4.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола, капучинатор, металлические жернова, приготовление двух молочных напитков одновременно.",
    price: 3799 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3799 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 992,
    name: "Кофемашина Krups Intuition Preference EA872B10",
    brand: "Krups",
    image: "images/ebb374f2532ea743386ed5968a782d69.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор, приготовление двух молочных напитков одновременно.",
    price: 2899 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2899 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},

        // JURA (10 моделей)
    {
    id: 968,
    name: "Кофемашина JURA E8 Platin",
    brand: "JURA",
    image: "images/1f951282081ff8f1a0aadf142d71a993.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, капучинатор.",
    price: 5499 + 1000,
    memoryOptions: [
        { size: "Standard", price: 5499 + 1000, color: "Platinum" }
    ],
    defaultMemory: "Standard"
},
{
    id: 969,
    name: "Кофемашина JURA E8 Piano Black",
    brand: "JURA",
    image: "images/7c0d9c92717ac64336c76010db4a638d.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, капучинатор.",
    price: 5499 + 1000,
    memoryOptions: [
        { size: "Standard", price: 5499 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 970,
    name: "Кофемашина JURA E6 Piano Black",
    brand: "JURA",
    image: "images/537f8856c5aba2479f3cea2a12718adf.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола, капучинатор.",
    price: 4299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 4299 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 971,
    name: "Кофемашина JURA Ena 8 Full Metropolitan Black (15493)",
    brand: "JURA",
    image: "images/69bf7ab8644bf571de98e2f496aa2f9c.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор.",
    price: 4369 + 1000,
    memoryOptions: [
        { size: "Standard", price: 4369 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 972,
    name: "Кофемашина JURA E6 Platin",
    brand: "JURA",
    image: "images/0d7bdb142a0256f890f20e181d9520f2.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола, капучинатор.",
    price: 4299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 4299 + 1000, color: "Platinum" }
    ],
    defaultMemory: "Standard"
},
{
    id: 973,
    name: "Кофемашина JURA Ena 8 Full Nordic White (15491)",
    brand: "JURA",
    image: "images/e1e56264bdecf8c40b8d6efc3fa21cfa.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор.",
    price: 4868 + 1000,
    memoryOptions: [
        { size: "Standard", price: 4868 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 974,
    name: "Кофемашина JURA ENA 4 Full Metropolitan Black EB 15501",
    brand: "JURA",
    image: "images/0e75c56a5bf405243435faeec329b35e.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, без капучинатора.",
    price: 3299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3299 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 975,
    name: "Кофемашина JURA E8 Piano белый",
    brand: "JURA",
    image: "images/1e795babbdaca9e4880df2dd4bb1ab7b.avif",
    desc: "Кофе в зернах, мощность 1450 Вт, давление 15 бар, регулировка помола (10 ступеней), автоматический капучинатор.",
    price: 5499 + 1000,
    memoryOptions: [
        { size: "Standard", price: 5499 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 976,
    name: "Кофемашина JURA C9 Piano Black",
    brand: "JURA",
    image: "images/d5618558fffdabfd9e47a2c24c9dc39f.avif",
    desc: "Кофе в зернах и молотый, мощность 1450 Вт, давление 15 бар, регулировка помола, автоматический капучинатор.",
    price: 4399 + 1000,
    memoryOptions: [
        { size: "Standard", price: 4399 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},

        // SIEMENS (10 моделей)
     {
    id: 964,
    name: "Автоматическая кофемашина Siemens EQ.6 plus s400 TE654319RW",
    brand: "SIEMENS",
    image: "images/5acf77c1395b546315d4057e3ed51d57 (1).avif",
    desc: "Кофе в зернах и молотый, мощность 1500 Вт, давление 15 бар, многоступенчатая регулировка помола, автоматический капучинатор, керамические жернова, приготовление двух молочных напитков одновременно.",
    price: 3599 + 1000,
    memoryOptions: [
        { size: "Standard", price: 3599 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 965,
    name: "Кофемашина Siemens EQ.300 TI351209RW",
    brand: "SIEMENS",
    image: "images/b15416430be05a63d33511ffe11d6278.avif",
    desc: "Кофе в зернах, мощность 1300 Вт, давление 15 бар, регулировка помола, автоматический капучинатор.",
    price: 2294 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2294 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 966,
    name: "Кофемашина SIEMENS EQ.300 TF301E09",
    brand: "SIEMENS",
    image: "images/de34ae97544385cbccb1366178a32342.avif",
    desc: "Кофе в зернах, мощность 1300 Вт, давление 15 бар, регулировка помола, ручной капучинатор, керамические жернова.",
    price: 2299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2299 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 967,
    name: "Кофемашина Siemens EQ.300 TI353204RW",
    brand: "SIEMENS",
    image: "images/6afbcba35bd5e800031d855bcd9ee7db (1).avif",
    desc: "Кофе в зернах, мощность 1300 Вт, давление 15 бар, регулировка помола, ручной капучинатор, жернова из нержавеющей стали.",
    price: 2919 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2919 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},

        // Kitfort (10 моделей)
       {
    id: 952,
    name: "Кофемашина Kitfort KT-7371",
    brand: "Kitfort",
    image: "images/4729ae62e3ae4f0f488cd99775ee3eec.avif",
    desc: "Кофе в зернах и молотый, мощность 1000 Вт, регулировка помола, без капучинатора.",
    price: 461 + 1000,
    memoryOptions: [
        { size: "Standard", price: 461 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 953,
    name: "Кофемашина Kitfort КТ-7622",
    brand: "Kitfort",
    image: "images/bb7ca02cbac515d58678c9952e6addb9.avif",
    desc: "Кофе в зернах и молотый, мощность 1050 Вт, регулировка помола, без капучинатора.",
    price: 499 + 1000,
    memoryOptions: [
        { size: "Standard", price: 499 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 954,
    name: "Кофемашина Kitfort КТ-7366",
    brand: "Kitfort",
    image: "images/d5d3028a3050c112057f856d43796faf.avif",
    desc: "Кофе в зернах и молотый, мощность 1000 Вт, регулировка помола, без капучинатора.",
    price: 523 + 1000,
    memoryOptions: [
        { size: "Standard", price: 523 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 955,
    name: "Автоматическая кофемашина Kitfort КТ-7166",
    brand: "Kitfort",
    image: "images/5e4b76ca1b7e06f20be35ad9b49907b8.avif",
    desc: "Кофе в зернах, мощность 1350 Вт, давление 20 бар, регулировка помола (15 ступеней), капучинатор.",
    price: 1483 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1483 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 956,
    name: "Кофемашина Kitfort КТ-7256",
    brand: "Kitfort",
    image: "images/b8a0bc5e5422f4e15b98a4c8953cacc9.avif",
    desc: "Кофе в зернах и молотый, мощность 1350 Вт, давление 15 бар, регулировка помола, капучинатор.",
    price: 1443 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1443 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 957,
    name: "Кофемашина Kitfort КТ-7424",
    brand: "Kitfort",
    image: "images/6696f835541e5e5039a33685e7c03234.avif",
    desc: "Кофе в зернах, мощность 1480 Вт, давление 19 бар, регулировка помола, без капучинатора.",
    price: 1264 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1264 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 958,
    name: "Кофемашина Kitfort КТ-7373",
    brand: "Kitfort",
    image: "images/8c7df2e86c00496054bef7f5755182f5.avif",
    desc: "Кофе в зернах и молотый, мощность 1350 Вт, давление 19 бар, регулировка помола, капучинатор, металлические жернова.",
    price: 2615 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2615 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 959,
    name: "Кофемашина Kitfort КТ-7465",
    brand: "Kitfort",
    image: "images/fed6c65bf6b3614fcf54c729e175a643.avif",
    desc: "Кофе в зернах, мощность 1480 Вт, давление 19 бар, регулировка помола, капучинатор.",
    price: 1422 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1422 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 960,
    name: "Кофемашина Kitfort КТ-7319",
    brand: "Kitfort",
    image: "images/964691ad87ed1482bdf4238f860e4a3d.avif",
    desc: "Кофе в зернах и молотый, мощность 1400 Вт, давление 15 бар, регулировка помола, капучинатор.",
    price: 2342 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2342 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 961,
    name: "Кофемашина Kitfort КТ-7472",
    brand: "Kitfort",
    image: "images/e1c7da79049eb9b4cad0af2f8781dc83.avif",
    desc: "Молотый кофе, мощность 1480 Вт, давление 19 бар, регулировка помола, капучинатор.",
    price: 1807 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1807 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 962,
    name: "Кофемашина Kitfort КТ-7374",
    brand: "Kitfort",
    image: "images/069f94cc2ed165b85e865e4ae896c203.avif",
    desc: "Кофе в зернах и молотый, мощность 1350 Вт, давление 19 бар, регулировка помола, капучинатор.",
    price: 2615 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2615 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 963,
    name: "Кофемашина Kitfort КТ-7460",
    brand: "Kitfort",
    image: "images/969a848f666ecb0cd03317fd36fdc727.avif",
    desc: "Молотый кофе, мощность 1480 Вт, давление 19 бар, регулировка помола, капучинатор.",
    price: 2307 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2307 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},

      
    ],






    // Стиралки 
    washers: [
        // LG (10 моделей)
   {
    id: 1137,
    name: "Стиральная машина LG F1096ND3",
    brand: "LG",
    image: "images/69bddc2029b6cbc82a9944daa71489e6.avif",
    desc: "6 кг, 1000 об/мин, класс A+++, инверторный мотор, 13 программ.",
    price: 1279 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1279 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1138,
    name: "Стирально-сушильная машина LG AI DD F2V9GC9W",
    brand: "LG",
    image: "images/39cc18e32b4f80e06d7c675d18dcce21.avif",
    desc: "8.5 кг, 1200 об/мин, класс A, инверторный мотор, 14 программ, сушка.",
    price: 2549 + 1000,
    memoryOptions: [
        { size: "8.5kg", price: 2549 + 1000, color: "White" }
    ],
    defaultMemory: "8.5kg"
},
{
    id: 1139,
    name: "Стиральная машина LG F2V5PS2S",
    brand: "LG",
    image: "images/28db8c8b6b0e4e550dd3eeca683d3eac.avif",
    desc: "8 кг, 1200 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1979 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1979 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1140,
    name: "Стирально-сушильная машина LG AI DD F2T5HG2S",
    brand: "LG",
    image: "images/25a642d765f2ae988be1b1ae2e29eab3.avif",
    desc: "7 кг, 1200 об/мин, класс B, инверторный мотор, 14 программ, сушка.",
    price: 2349 + 1000,
    memoryOptions: [
        { size: "7kg", price: 2349 + 1000, color: "Silver" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1141,
    name: "Стиральная машина LG F1296HDS3",
    brand: "LG",
    image: "images/2c6e430b00e84854f208eea6a1e58ecc.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 13 программ.",
    price: 1429 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1429 + 1000, color: "Silver" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1142,
    name: "Стиральная машина LG F2V5HS1W",
    brand: "LG",
    image: "images/5f885160bf4c189e3fd14170a7ce7754.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1769 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1769 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1143,
    name: "Стиральная машина LG TW4V5RS2S",
    brand: "LG",
    image: "images/3608cd1691b93478b5d91d34d9d1bcef.avif",
    desc: "10.5 кг, 1400 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 2349 + 1000,
    memoryOptions: [
        { size: "10.5kg", price: 2349 + 1000, color: "Silver" }
    ],
    defaultMemory: "10.5kg"
},
{
    id: 1144,
    name: "Стиральная машина LG F1296HDS4",
    brand: "LG",
    image: "images/d24f54d2b9ca95df0178e06262f286b1.avif",
    desc: "7 кг, 1200 об/мин, класс A, инверторный мотор, 13 программ.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1499 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1145,
    name: "Стиральная машина LG F1296HDS1",
    brand: "LG",
    image: "images/6ceb51659afe6b4c0b7c30873caf92b5.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 13 программ.",
    price: 1429 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1429 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1146,
    name: "Стиральная машина LG F2Y1HS6W",
    brand: "LG",
    image: "images/327652c9f3df9b31a938d682b2ef43e6.avif",
    desc: "7 кг, 1200 об/мин, класс A, инверторный мотор, 10 программ.",
    price: 1429 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1429 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1147,
    name: "Стиральная машина LG F2V3PS6W",
    brand: "LG",
    image: "images/4cdf85385c75588820650ad417a96ba3.avif",
    desc: "8 кг, 1200 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1699 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1699 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1148,
    name: "Стиральная машина LG AI DD F2V5GS0W",
    brand: "LG",
    image: "images/fd96ff092c2063d228c9f3054b2d2ad8.avif",
    desc: "8.5 кг, 1200 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1899 + 1000,
    memoryOptions: [
        { size: "8.5kg", price: 1899 + 1000, color: "White" }
    ],
    defaultMemory: "8.5kg"
},
{
    id: 1149,
    name: "Стиральная машина LG FH0B8LD6",
    brand: "LG",
    image: "images/4299234422c10fc906b64d6de7f0b188.avif",
    desc: "5 кг, 1000 об/мин, класс A, инверторный мотор, 13 программ.",
    price: 1199 + 1000,
    memoryOptions: [
        { size: "5kg", price: 1199 + 1000, color: "White" }
    ],
    defaultMemory: "5kg"
},
{
    id: 1150,
    name: "Стиральная машина LG F2Y1NS5W",
    brand: "LG",
    image: "images/d1b8abe171b274f6bdbfbb1a458396ef.avif",
    desc: "6 кг, 1200 об/мин, класс A, инверторный мотор, 10 программ.",
    price: 1369 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1369 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1151,
    name: "Стирально-сушильная машина LG F4V5VG2S",
    brand: "LG",
    image: "images/81df0d6fcff16cc8b92d62c2ffd14695.avif",
    desc: "9 кг, 1400 об/мин, класс A+++, инверторный мотор, 14 программ, сушка.",
    price: 2599 + 1000,
    memoryOptions: [
        { size: "9kg", price: 2599 + 1000, color: "Silver" }
    ],
    defaultMemory: "9kg"
},
{
    id: 1152,
    name: "Стиральная машина LG F2Y1NS3W",
    brand: "LG",
    image: "images/8b0dff0e1e36d73b9d7b82cdd84dc853.avif",
    desc: "6 кг, 1200 об/мин, класс A, инверторный мотор.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1299 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1153,
    name: "Стиральная машина LG F2H5HS6W",
    brand: "LG",
    image: "images/cbd304b8536d5c2c312be36ef3e809df.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1599 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1599 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1154,
    name: "Стиральная машина LG F10B8LD7",
    brand: "LG",
    image: "images/f2283e97d93fd9eba9e2633acf772dc1.avif",
    desc: "5 кг, 1000 об/мин, класс A+++, инверторный мотор, 13 программ.",
    price: 1229 + 1000,
    memoryOptions: [
        { size: "5kg", price: 1229 + 1000, color: "White" }
    ],
    defaultMemory: "5kg"
},
{
    id: 1155,
    name: "Стиральная машина LG F2Y1NS6J",
    brand: "LG",
    image: "images/feee074b21ee841a2e2475a2bafea5c9.avif",
    desc: "6 кг, 1200 об/мин, класс A, инверторный мотор, 10 программ.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1399 + 1000, color: "Silver" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1156,
    name: "Стиральная машина LG F2T9FW9W",
    brand: "LG",
    image: "images/792c056a51332407d3c89fdd39d33c75.avif",
    desc: "9 кг, 1200 об/мин, класс A+++, инверторный мотор.",
    price: 2122 + 1000,
    memoryOptions: [
        { size: "9kg", price: 2122 + 1000, color: "White" }
    ],
    defaultMemory: "9kg"
},
{
    id: 1157,
    name: "Стирально-сушильная машина LG AI DD F2T5HG0W",
    brand: "LG",
    image: "images/617238a7a49254ba6d8e9ce37484fc36.avif",
    desc: "7 кг, 1200 об/мин, класс B, инверторный мотор, 13 программ, сушка.",
    price: 2269 + 1000,
    memoryOptions: [
        { size: "7kg", price: 2269 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1158,
    name: "Стиральная машина LG F2V3HS4W",
    brand: "LG",
    image: "images/476446998852d0314286c4a44bd6f390.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1599 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1599 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1159,
    name: "Стиральная машина LG F2V5HS2S",
    brand: "LG",
    image: "images/32c4235945b1de5695232594bbb7430d.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1879 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1879 + 1000, color: "Silver" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1160,
    name: "Стиральная машина LG F1296WDS1",
    brand: "LG",
    image: "images/dc4d11643fce1babff4101a6e97906f5.avif",
    desc: "6.5 кг, 1200 об/мин, класс A, инверторный мотор, 13 программ.",
    price: 1377 + 1000,
    memoryOptions: [
        { size: "6.5kg", price: 1377 + 1000, color: "White" }
    ],
    defaultMemory: "6.5kg"
},



        // HAIER (10 моделей)
 {
    id: 1113,
    name: "Стирально-сушильная машина Haier HWD80-BP14929A",
    brand: "HAIER",
    image: "images/ba6c5401755be4a69bf8c96de4b2f8a8.avif",
    desc: "8 кг, 1400 об/мин, класс B, инверторный мотор, 15 программ, сушка.",
    price: 2030 + 1000,
    memoryOptions: [
        { size: "8kg", price: 2030 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1114,
    name: "Стиральная машина Haier HW65-BP129301A",
    brand: "HAIER",
    image: "images/9c03bdff34dc27e5c90f9219ea9a8927.avif",
    desc: "6.5 кг, 1200 об/мин, класс A+++, инверторный мотор, 15 программ.",
    price: 1376 + 1000,
    memoryOptions: [
        { size: "6.5kg", price: 1376 + 1000, color: "White" }
    ],
    defaultMemory: "6.5kg"
},
{
    id: 1115,
    name: "Стиральная машина Haier HW90-B14979S",
    brand: "HAIER",
    image: "images/4e95ea57b99f3e9846aea5a340ec9c65.avif",
    desc: "9 кг, 1400 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 2129 + 1000,
    memoryOptions: [
        { size: "9kg", price: 2129 + 1000, color: "White" }
    ],
    defaultMemory: "9kg"
},
{
    id: 1116,
    name: "Стиральная машина Haier HW90-B14979",
    brand: "HAIER",
    image: "images/a0c978b19bc07281154ec748a89126fe.avif",
    desc: "9 кг, 1400 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 2099 + 1000,
    memoryOptions: [
        { size: "9kg", price: 2099 + 1000, color: "White" }
    ],
    defaultMemory: "9kg"
},
{
    id: 1117,
    name: "Стиральная машина Haier HW65-BP129302A",
    brand: "HAIER",
    image: "images/36aeff767f12b0ff4cd8801e1f992749.avif",
    desc: "6.5 кг, 1200 об/мин, класс A+++, инверторный мотор, 15 программ.",
    price: 1429 + 1000,
    memoryOptions: [
        { size: "6.5kg", price: 1429 + 1000, color: "White" }
    ],
    defaultMemory: "6.5kg"
},
{
    id: 1118,
    name: "Стиральная машина Haier HW80-BP14979S",
    brand: "HAIER",
    image: "images/cf5fc2791b9ff421f1f5c13eddaa8e70.avif",
    desc: "8 кг, 1400 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1965 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1965 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1119,
    name: "Стиральная машина Haier HW60-BP12929ASE",
    brand: "HAIER",
    image: "images/68f0419cfd678920f7ac4da20966c1d2.avif",
    desc: "6 кг, 1200 об/мин, класс A+++, инверторный мотор, 15 программ.",
    price: 1358 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1358 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1120,
    name: "Стиральная машина Haier HW60-BP12919BS",
    brand: "HAIER",
    image: "images/7bb6892cc29384d8d9749cfe9d4ad831.avif",
    desc: "6 кг, 1200 об/мин, класс A+++, инверторный мотор, 10 программ.",
    price: 1289 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1289 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1121,
    name: "Стирально-сушильная машина Haier HWD70-BP14929B",
    brand: "HAIER",
    image: "images/5b26a4154a970b641fc75ae035a7d1b5.avif",
    desc: "7 кг, 1400 об/мин, класс B, инверторный мотор, 15 программ, сушка.",
    price: 1840 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1840 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1122,
    name: "Стиральная машина Haier HW50-BP1026",
    brand: "HAIER",
    image: "images/76de074e76d137244862b116d7eeb377.avif",
    desc: "5 кг, 1000 об/мин, класс A+++, инверторный мотор, 12 программ.",
    price: 1735 + 1000,
    memoryOptions: [
        { size: "5kg", price: 1735 + 1000, color: "White" }
    ],
    defaultMemory: "5kg"
},
{
    id: 1123,
    name: "Стиральная машина Haier HW70-BP12969BE",
    brand: "HAIER",
    image: "images/01dfc5786cb21fd44eb2c3c2b844fc5c.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 12 программ.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1499 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1124,
    name: "Стиральная машина Haier HW70-BP12919S",
    brand: "HAIER",
    image: "images/cbb6772f6a3f879571716047e5d04fdb.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 10 программ.",
    price: 1360 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1360 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1125,
    name: "Стирально-сушильная машина Haier HWD80-BP14959A",
    brand: "HAIER",
    image: "images/41ce23f7072ccf5fd7c72bbd0440cb6d.avif",
    desc: "8 кг, 1400 об/мин, класс B, инверторный мотор, 12 программ, сушка.",
    price: 2799 + 1000,
    memoryOptions: [
        { size: "8kg", price: 2799 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1126,
    name: "Стирально-сушильная машина Haier HWD70-BP14929A",
    brand: "HAIER",
    image: "images/e6ba116074d4cc24cf445f8cfeaaf95f.avif",
    desc: "7 кг, 1400 об/мин, класс B, инверторный мотор, 15 программ, сушка.",
    price: 1840 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1840 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1127,
    name: "Стиральная машина Haier HW60-BP12919AS",
    brand: "HAIER",
    image: "images/836f626cf4f29cb01c3b299dda66f5b9.avif",
    desc: "6 кг, 1200 об/мин, класс A+++, инверторный мотор, 10 программ.",
    price: 1289 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1289 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1128,
    name: "Стиральная машина Haier HW70-BP12959AE",
    brand: "HAIER",
    image: "images/1d08401eebdbbc51f3ba0311f9781538.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 12 программ.",
    price: 1475 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1475 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1129,
    name: "Стиральная машина Haier HW100-BD14378",
    brand: "HAIER",
    image: "images/2548ae040c791e478257aceda2263de6.avif",
    desc: "10 кг, 1400 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 2770 + 1000,
    memoryOptions: [
        { size: "10kg", price: 2770 + 1000, color: "White" }
    ],
    defaultMemory: "10kg"
},
{
    id: 1130,
    name: "Стиральная машина Haier HW90-BP14929AS",
    brand: "HAIER",
    image: "images/1ea4c924858400ff9b7b1c22560db402.avif",
    desc: "9 кг, 1400 об/мин, класс A+++, инверторный мотор, 15 программ.",
    price: 1890 + 1000,
    memoryOptions: [
        { size: "9kg", price: 1890 + 1000, color: "White" }
    ],
    defaultMemory: "9kg"
},
{
    id: 1131,
    name: "Стиральная машина Haier HW60-BP12929BSE",
    brand: "HAIER",
    image: "images/366b600a793bfaeecb6eb70894bcc82f.avif",
    desc: "6 кг, 1200 об/мин, класс A+++, инверторный мотор, 15 программ.",
    price: 1310 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1310 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1132,
    name: "Стирально-сушильная машина HAIER HWD80-BP14959B",
    brand: "HAIER",
    image: "images/87db7ac2884fcc9427329d2222203325.avif",
    desc: "8 кг, 1400 об/мин, класс B, инверторный мотор, 12 программ, сушка.",
    price: 2390 + 1000,
    memoryOptions: [
        { size: "8kg", price: 2390 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1133,
    name: "Стиральная машина Haier HW70-BP12959BSE",
    brand: "HAIER",
    image: "images/77040bd4a57a138b99cde69cfaeede32.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 12 программ.",
    price: 1540 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1540 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1134,
    name: "Стирально-сушильная машина Haier HWD100-BD1499U1",
    brand: "HAIER",
    image: "images/6771d4e995d2604f50d21e968cc08354.avif",
    desc: "10 кг, 1400 об/мин, класс B, инверторный мотор, 14 программ, сушка.",
    price: 4910 + 1000,
    memoryOptions: [
        { size: "10kg", price: 4910 + 1000, color: "White" }
    ],
    defaultMemory: "10kg"
},
{
    id: 1135,
    name: "Стиральная машина Haier HW80-B14979",
    brand: "HAIER",
    image: "images/93948453f299de9489feef9084998597.avif",
    desc: "8 кг, 1400 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 2155 + 1000,
    memoryOptions: [
        { size: "8kg", price: 2155 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1136,
    name: "Стиральная машина Haier HW80-BP14979",
    brand: "HAIER",
    image: "images/ba03ab64a12347b0ccee1ad18280c45c.avif",
    desc: "8 кг, 1400 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1944 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1944 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},

        // ATLANT (10 моделей)
{
    id: 1089,
    name: "Стиральная машина ATLANT СМА 60У105-00",
    brand: "ATLANT",
    image: "images/45a24fc1e2c5061f674b0aaf25014966.avif",
    desc: "6 кг, 1000 об/мин, класс A++, коллекторный мотор, 11 программ.",
    price: 859 + 1000,
    memoryOptions: [
        { size: "6kg", price: 859 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1090,
    name: "Стиральная машина ATLANT СМА 40М105-00",
    brand: "ATLANT",
    image: "images/4a7399d0987294fbb6064847b36f956c.avif",
    desc: "4 кг, 1000 об/мин, класс A+, коллекторный мотор, 11 программ.",
    price: 799 + 1000,
    memoryOptions: [
        { size: "4kg", price: 799 + 1000, color: "White" }
    ],
    defaultMemory: "4kg"
},
{
    id: 1091,
    name: "Стиральная машина ATLANT СМА 50У105-00",
    brand: "ATLANT",
    image: "images/128f63f92e501337698482fc04400d3d.avif",
    desc: "5 кг, 1000 об/мин, класс A+, коллекторный мотор, 11 программ.",
    price: 849 + 1000,
    memoryOptions: [
        { size: "5kg", price: 849 + 1000, color: "White" }
    ],
    defaultMemory: "5kg"
},
{
    id: 1092,
    name: "Стиральная машина ATLANT СМА 70У1214-01",
    brand: "ATLANT",
    image: "images/03b5e1af682bce82a42a5f8ee488a730.avif",
    desc: "7 кг, 1200 об/мин, класс A++, коллекторный мотор, 18 программ.",
    price: 1099 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1099 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1093,
    name: "Стиральная машина ATLANT СМА 60У1013-02",
    brand: "ATLANT",
    image: "images/12fa4ff4243566945189f0925faee63d.avif",
    desc: "6 кг, 1000 об/мин, класс A+++, коллекторный мотор, 16 программ.",
    price: 999 + 1000,
    memoryOptions: [
        { size: "6kg", price: 999 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1094,
    name: "Стиральная машина ATLANT СМА-70У1214-С-01",
    brand: "ATLANT",
    image: "images/79888a8b2e2867a23ed4e774f3c1b9b5.avif",
    desc: "7 кг, 1200 об/мин, класс A++, коллекторный мотор, 18 программ.",
    price: 1215 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1215 + 1000, color: "Silver" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1095,
    name: "Стиральная машина ATLANT СМА 60У1214-С-01",
    brand: "ATLANT",
    image: "images/ca5d4608489e4688daf0a36d8097db1d.avif",
    desc: "6 кг, 1200 об/мин, класс A++, коллекторный мотор, 18 программ.",
    price: 1233 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1233 + 1000, color: "Silver" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1096,
    name: "Стиральная машина ATLANT СМА 60У1213-02",
    brand: "ATLANT",
    image: "images/e481a9716a33c78ac1167082752205da.avif",
    desc: "6 кг, 1200 об/мин, класс A+++, коллекторный мотор, 16 программ.",
    price: 1109 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1109 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1097,
    name: "Стиральная машина ATLANT СМА 60У1218-T-01",
    brand: "ATLANT",
    image: "images/3d267f19eec934648b937162f9497331.avif",
    desc: "6 кг, 1200 об/мин, класс A+++, инверторный мотор, 12 программ.",
    price: 1170 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1170 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1098,
    name: "Стиральная машина ATLANT СМА 60У1210-00",
    brand: "ATLANT",
    image: "images/9604336e71013f0d90614c216da8512c.avif",
    desc: "6 кг, 1200 об/мин, класс A++, стандартный мотор, 16 программ.",
    price: 1049 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1049 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1099,
    name: "Стиральная машина ATLANT СМА-60C1010-00",
    brand: "ATLANT",
    image: "images/e5bab45584c2e3af3b6835ae4a70de87.avif",
    desc: "6 кг, 1000 об/мин, класс A++, коллекторный мотор, 16 программ.",
    price: 969 + 1000,
    memoryOptions: [
        { size: "6kg", price: 969 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1100,
    name: "Стиральная машина ATLANT СМА 60У1214-01",
    brand: "ATLANT",
    image: "images/053ebe7c918a26ac96261897d2af9877.avif",
    desc: "6 кг, 1200 об/мин, класс A+++, коллекторный мотор, 18 программ.",
    price: 1009 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1009 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1101,
    name: "Стиральная машина ATLANT СМА 70С105-00",
    brand: "ATLANT",
    image: "images/34e9ae951215857a3f004a70f2c8c607.avif",
    desc: "7 кг, 1000 об/мин, класс A+++, коллекторный мотор, 11 программ.",
    price: 969 + 1000,
    memoryOptions: [
        { size: "7kg", price: 969 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1102,
    name: "Стиральная машина ATLANT СМА 80С1214-01",
    brand: "ATLANT",
    image: "images/3d3e9edabbbb10db9f335b2ea2447ce0.avif",
    desc: "8 кг, 1200 об/мин, класс A+++, коллекторный мотор, 18 программ.",
    price: 1245 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1245 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1103,
    name: "Стиральная машина ATLANT СМА-60У107-000",
    brand: "ATLANT",
    image: "images/38c90df151a8c6b27b7d19895a56c869.avif",
    desc: "6 кг, 1000 об/мин, класс A++, коллекторный мотор, 15 программ.",
    price: 965 + 1000,
    memoryOptions: [
        { size: "6kg", price: 965 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1104,
    name: "Стиральная машина автоматическая ATLANT СМА 80С1414-С-02",
    brand: "ATLANT",
    image: "images/04914727dea076a6bf91e7a6e86a99f5.avif",
    desc: "8 кг, 1400 об/мин, класс A+++, коллекторный мотор, 18 программ.",
    price: 1423 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1423 + 1000, color: "Silver" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1105,
    name: "Стиральная машина ATLANT СМА 70У1213-01",
    brand: "ATLANT",
    image: "images/157bf69ae180512073b58a9fc8a3713f.avif",
    desc: "7 кг, 1200 об/мин, класс A+, коллекторный мотор, 16 программ.",
    price: 1075 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1075 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1106,
    name: "Стиральная машина автоматическая ATLANT СМА 80С1214-СА-02",
    brand: "ATLANT",
    image: "images/17e4d4e7bccdc105fcb3e1406484a08e.avif",
    desc: "8 кг, 1200 об/мин, класс A+++, коллекторный мотор, 19 программ.",
    price: 1289 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1289 + 1000, color: "Silver" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1107,
    name: "Стиральная машина ATLANT СМА 60У1018-Т-00",
    brand: "ATLANT",
    image: "images/0e97cfad0ce7e086644796ae34d0ac5c.avif",
    desc: "6 кг, 1000 об/мин, класс A+++, инверторный мотор, 13 программ.",
    price: 1125 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1125 + 1000, color: "White" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1108,
    name: "Стиральная машина ATLANT СМА 80С1418-Т-00",
    brand: "ATLANT",
    image: "images/423f7d938a2158693245505b97cac296.avif",
    desc: "8 кг, 1400 об/мин, инверторный мотор, 12 программ.",
    price: 1422 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1422 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1109,
    name: "Стиральная машина ATLANT СМА-70C107-000",
    brand: "ATLANT",
    image: "images/4bf28f027d3464a71de804dcf1765bdc.avif",
    desc: "7 кг, 1000 об/мин, класс A++, коллекторный мотор, 15 программ.",
    price: 1022 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1022 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1110,
    name: "Стиральная машина ATLANT СМА 70С1214-А-02",
    brand: "ATLANT",
    image: "images/03c3ad599b1a7ceab177c47bd1ee77ea.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, коллекторный мотор, 18 программ.",
    price: 1227 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1227 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1111,
    name: "Стиральная машина автоматическая ATLANT СМА 60У1214-СА-02",
    brand: "ATLANT",
    image: "images/584efb286682a5b4cb808e9756a8626a.avif",
    desc: "6 кг, 1200 об/мин, класс A+++, коллекторный мотор, 18 программ.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "6kg", price: 1299 + 1000, color: "Silver" }
    ],
    defaultMemory: "6kg"
},
{
    id: 1112,
    name: "Стиральная машина ATLANT СМА 70У1214-СА-02",
    brand: "ATLANT",
    image: "images/c41a54d5a563031d23027ad8373e5479.avif",
    desc: "7 кг, 1200 об/мин, класс A++, коллекторный мотор, 18 программ.",
    price: 1352 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1352 + 1000, color: "Silver" }
    ],
    defaultMemory: "7kg"
},
//SAMSUNG
    {
    id: 1065,
    name: "Стиральная машина Samsung WW80AG6L28WELP",
    brand: "SAMSUNG",
    image: "images/d9459b57ad07172d655500900b333b80.avif",
    desc: "8 кг, 1200 об/мин, класс A+++, инверторный мотор.",
    price: 2259 + 1000,
    memoryOptions: [
        { size: "8kg", price: 2259 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1066,
    name: "Стиральная машина Samsung WW80AG6S28AELP",
    brand: "SAMSUNG",
    image: "images/d0d5d59338a12263981d9e38d791c790.avif",
    desc: "8 кг, 1200 об/мин, класс A+++, инверторный мотор, 22 программы.",
    price: 1959 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1959 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1067,
    name: "Стиральная машина Samsung WW70AGAS22AELD",
    brand: "SAMSUNG",
    image: "images/5b0569c8a5e8c9d88b9c69c7a230bac5.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1899 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1899 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1068,
    name: "Стиральная машина Samsung WW70AG6S23AXLP",
    brand: "SAMSUNG",
    image: "images/d1a7264eae4789ab662018f5a4f1d789.avif",
    desc: "7 кг, 1200 об/мин, инверторный мотор, 22 программы.",
    price: 1859 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1859 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1069,
    name: "Стиральная машина Samsung WW80AG6L28BBLP",
    brand: "SAMSUNG",
    image: "images/загружено.avif",
    desc: "8 кг, 1200 об/мин, класс A+++, инверторный мотор.",
    price: 2359 + 1000,
    memoryOptions: [
        { size: "8kg", price: 2359 + 1000, color: "Black" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1070,
    name: "Стиральная машина Samsung WW70AGAS25AXLP",
    brand: "SAMSUNG",
    image: "images/51617db80578c8766a01afa76168f0fa.avif",
    desc: "7 кг, 1200 об/мин, класс A++, инверторный мотор, 14 программы.",
    price: 1699 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1699 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1071,
    name: "Стирально-сушильная машина Samsung WD90DG5G34BBLP",
    brand: "SAMSUNG",
    image: "images/735f7eb575b276d2f047d81a49d225c1.avif",
    desc: "9 кг, 1400 об/мин, инверторный мотор, 14 программ, сушка.",
    price: 2959 + 1000,
    memoryOptions: [
        { size: "9kg", price: 2959 + 1000, color: "Black" }
    ],
    defaultMemory: "9kg"
},
{
    id: 1072,
    name: "Стиральная машина SAMSUNG WW80AGAS21AELP",
    brand: "SAMSUNG",
    image: "images/2d34293e944f1987d2d04cda1e298b71.avif",
    desc: "8 кг, 1200 об/мин, класс A, инверторный мотор, 14 программ.",
    price: 1999 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1999 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1073,
    name: "Стиральная машина Samsung WW70AG5S20CXLP",
    brand: "SAMSUNG",
    image: "images/5c3dd15c3a6a7bee5572116d1f6ecb3e.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1769 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1769 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1074,
    name: "Стиральная машина SAMSUNG WW90DG6U34LELP",
    brand: "SAMSUNG",
    image: "images/704b4c51361ce3bdcfeec421843f062a.avif",
    desc: "9 кг, 1400 об/мин, класс A, инверторный мотор, 23 программы.",
    price: 2599 + 1000,
    memoryOptions: [
        { size: "9kg", price: 2599 + 1000, color: "White" }
    ],
    defaultMemory: "9kg"
},
{
    id: 1075,
    name: "Стиральная машина Samsung WW70AG6S23ANLP",
    brand: "SAMSUNG",
    image: "images/8bbe8d852cd4cf3173d55eeb2dc91589.avif",
    desc: "7 кг, 1200 об/мин, класс A+++, инверторный мотор, 22 программы.",
    price: 1969 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1969 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1076,
    name: "Стиральная машина Samsung WW80AG6S28ABLP",
    brand: "SAMSUNG",
    image: "images/115b683e9b70dba14dda211912d432c9.avif",
    desc: "8 кг, 1200 об/мин, класс A+++, инверторный мотор, 22 программы.",
    price: 2129 + 1000,
    memoryOptions: [
        { size: "8kg", price: 2129 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1077,
    name: "Стиральная машина SAMSUNG WW80AGAS21AXLP",
    brand: "SAMSUNG",
    image: "images/20fa02f395267401a285ff74fe91e943.avif",
    desc: "8 кг, 1200 об/мин, класс A+++, инверторный мотор, 14 программ.",
    price: 1949 + 1000,
    memoryOptions: [
        { size: "8kg", price: 1949 + 1000, color: "White" }
    ],
    defaultMemory: "8kg"
},
{
    id: 1078,
    name: "Стиральная машина Samsung WW65AG4S21CE/LD",
    brand: "SAMSUNG",
    image: "images/1d165a9f3caf0de0326ed1e78554a9aa.avif",
    desc: "6.5 кг, 1200 об/мин, класс A, инверторный мотор, 12 программ.",
    price: 1599 + 1000,
    memoryOptions: [
        { size: "6.5kg", price: 1599 + 1000, color: "White" }
    ],
    defaultMemory: "6.5kg"
},
{
    id: 1079,
    name: "Стиральная машина SAMSUNG WW90DG5U34ABLP",
    brand: "SAMSUNG",
    image: "images/1de20e9ac165f497905cd7e2024f1dbb.avif",
    desc: "9 кг, 1400 об/мин, класс A, инверторный мотор, 23 программы.",
    price: 2199 + 1000,
    memoryOptions: [
        { size: "9kg", price: 2199 + 1000, color: "White" }
    ],
    defaultMemory: "9kg"
},
{
    id: 1080,
    name: "Стирально-сушильная машина SAMSUNG WD18DB8995BZLD",
    brand: "SAMSUNG",
    image: "images/28c23145f141f2593b2b84cf084e2cb2.avif",
    desc: "18 кг, 1000 об/мин, инверторный мотор, сушка.",
    price: 11799 + 1000,
    memoryOptions: [
        { size: "18kg", price: 11799 + 1000, color: "Black" }
    ],
    defaultMemory: "18kg"
},
{
    id: 1081,
    name: "Стирально-сушильная машина Samsung WD11DB8B85GHLP",
    brand: "SAMSUNG",
    image: "images/7271dc70dd361b6e63752d14d75f4e7e.avif",
    desc: "11 кг, 1400 об/мин, инверторный мотор, сушка.",
    price: 3399 + 1000,
    memoryOptions: [
        { size: "11kg", price: 3399 + 1000, color: "White" }
    ],
    defaultMemory: "11kg"
},
{
    id: 1082,
    name: "Стиральная машина SAMSUNG WW70AG4S21VELD",
    brand: "SAMSUNG",
    image: "images/df0be6e2a4afd08a194df54d51750550.avif",
    desc: "7 кг, 1200 об/мин, класс A, инверторный мотор, 14 программ.",
    price: 1669 + 1000,
    memoryOptions: [
        { size: "7kg", price: 1669 + 1000, color: "White" }
    ],
    defaultMemory: "7kg"
},
{
    id: 1083,
    name: "Стиральная машина SAMSUNG WW11CG604CLBLP",
    brand: "SAMSUNG",
    image: "images/e6c03e8ff57bba4ab7ea1b0823a8e10e.avif",
    desc: "11 кг, 1400 об/мин, класс A, инверторный мотор, 24 программы.",
    price: 2539 + 1000,
    memoryOptions: [
        { size: "11kg", price: 2539 + 1000, color: "Black" }
    ],
    defaultMemory: "11kg"
},
{
    id: 1084,
    name: "Стирально-сушильная машина Samsung WD90DG5G34BELP",
    brand: "SAMSUNG",
    image: "images/eb255ef7ae88d8f2938b93d5a9efdd23.avif",
    desc: "9 кг, 1400 об/мин, инверторный мотор, сушка.",
    price: 2999 + 1000,
    memoryOptions: [
        { size: "9kg", price: 2999 + 1000, color: "White" }
    ],
    defaultMemory: "9kg"
},
{
    id: 1085,
    name: "Стирально-сушильная машина Samsung WD11DG6B85BBLP",
    brand: "SAMSUNG",
    image: "images/a404dee63e7bd4ef4a0044c1952188c2.avif",
    desc: "11 кг, 1400 об/мин, класс A, инверторный мотор, сушка.",
    price: 3199 + 1000,
    memoryOptions: [
        { size: "11kg", price: 3199 + 1000, color: "Black" }
    ],
    defaultMemory: "11kg"
},
{
    id: 1086,
    name: "Стиральная машина SAMSUNG WW11CG604CLELP",
    brand: "SAMSUNG",
    image: "images/ccc9b1ad8ec47279f7e3d4ea60a4341d.avif",
    desc: "11 кг, 1400 об/мин, класс A, инверторный мотор.",
    price: 2599 + 1000,
    memoryOptions: [
        { size: "11kg", price: 2599 + 1000, color: "White" }
    ],
    defaultMemory: "11kg"
},
{
    id: 1087,
    name: "Стиральная машина Samsung WW65AG4S20CXLP",
    brand: "SAMSUNG",
    image: "images/2ef6cfae3c70e7dc852b7b5dfa138546.avif",
    desc: "6.5 кг, 1200 об/мин, класс A+++, инверторный мотор, 12 программ.",
    price: 1679 + 1000,
    memoryOptions: [
        { size: "6.5kg", price: 1679 + 1000, color: "White" }
    ],
    defaultMemory: "6.5kg"
},
{
    id: 1088,
    name: "Стирально-сушильная машина Samsung WD11DG6B85BELP",
    brand: "SAMSUNG",
    image: "images/5f796fda9a36f6c19e6a67f7d2b26709.avif",
    desc: "11 кг, 1400 об/мин, класс A, инверторный мотор, сушка.",
    price: 3099 + 1000,
    memoryOptions: [
        { size: "11kg", price: 3099 + 1000, color: "White" }
    ],
    defaultMemory: "11kg"
},

    ],

 headphones: [
        // Apple (10 моделей)
     {
    id: 1245,
    name: "Беспроводные наушники Apple AirPods 4 (MXP63LL/A)",
    brand: "Apple",
    image: "images/4b14f6fcd3c76802a5adfa05d7f0177b.avif",
    desc: "Вставные, True wireless, 5 ч работы, USB Type-C, без шумоподавления.",
    price: 479,
    memoryOptions: [
        { size: "Standard", price: 479, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1246,
    name: "Наушники Apple AirPods Pro 2 (MTJV3ZA/A) с разъемом USB Type-C",
    brand: "Apple",
    image: "images/0a614d60438c0b09dcdd3e9af8db49d2.avif",
    desc: "Внутриканальные, True wireless, 6 ч работы, USB Type-C, активное шумоподавление.",
    price: 759,
    memoryOptions: [
        { size: "Standard", price: 759, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1247,
    name: "Беспроводные наушники Apple AirPods 4 ANC (MXP93ZA/A)",
    brand: "Apple",
    image: "images/98c813ebd8a3e62956410a339be6694e.avif",
    desc: "Вставные, True wireless, 5 ч работы, USB Type-C, активное шумоподавление.",
    price: 699,
    memoryOptions: [
        { size: "Standard", price: 699, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1248,
    name: "Наушники Apple AirPods Pro 3 (MFHP4ZA/A)",
    brand: "Apple",
    image: "images/88a558dfd8512094aeb913c573c3c417.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, активное шумоподавление.",
    price: 1019,
    memoryOptions: [
        { size: "Standard", price: 1019, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1249,
    name: "Наушники Apple AirPods Pro 2 (MTJV3RU/A) с разъемом USB Type-C",
    brand: "Apple",
    image: "images/ef95df4f7d04d6ddfbe77df4d30a5d8f.avif",
    desc: "Внутриканальные, True wireless, 6 ч работы, USB Type-C, активное шумоподавление.",
    price: 759,
    memoryOptions: [
        { size: "Standard", price: 759, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1250,
    name: "Наушники Apple AirPods Pro 3 (MFHP4ZP/A)",
    brand: "Apple",
    image: "images/a8ec3f056e6ad219fea23e8cb71610b1.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, активное шумоподавление.",
    price: 1019,
    memoryOptions: [
        { size: "Standard", price: 1019, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1251,
    name: "Наушники Apple AirPods Pro 2 (MTJV3LL/A) с разъемом USB Type-C",
    brand: "Apple",
    image: "images/3e63086d104571133d088e39f000d386.avif",
    desc: "Внутриканальные, True wireless, 6 ч работы, USB Type-C, активное шумоподавление.",
    price: 759,
    memoryOptions: [
        { size: "Standard", price: 759, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1252,
    name: "Беспроводные наушники Apple AirPods 4 ANC (MXP93LL/A)",
    brand: "Apple",
    image: "images/56bcc35f91e9f5932bbae8a4fe08ea6c.avif",
    desc: "Вставные, True wireless, 5 ч работы, USB Type-C, активное шумоподавление.",
    price: 699,
    memoryOptions: [
        { size: "Standard", price: 699, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1253,
    name: "Наушники Apple AirPods 3rd generation With MagSafe (MME73AM/A)",
    brand: "Apple",
    image: "images/99fb16109c2118e8807c14ab4e42dc2c.avif",
    desc: "Вставные, True wireless, 6 ч работы, Lightning, без шумоподавления.",
    price: 499,
    memoryOptions: [
        { size: "Standard", price: 499, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1254,
    name: "Беспроводные наушники Apple AirPods 3 Lightning With MagSafe (MME73ZP/A)",
    brand: "Apple",
    image: "images/4c3847efbcd4942e709c0fed582f5275.avif",
    desc: "Вставные, True wireless, 6 ч работы, Lightning, без шумоподавления.",
    price: 499,
    memoryOptions: [
        { size: "Standard", price: 499, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1255,
    name: "Беспроводные наушники Apple AirPods 4 ANC (MXP93ZE/A)",
    brand: "Apple",
    image: "images/53408e3ed93acef70b25875dd463f323.avif",
    desc: "Вставные, True wireless, 5 ч работы, USB Type-C, активное шумоподавление.",
    price: 699,
    memoryOptions: [
        { size: "Standard", price: 699, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1256,
    name: "Наушники Apple AirPods 3rd generation With MagSafe (MME73ZA/A)",
    brand: "Apple",
    image: "images/1577970decc9c39e71d19adc14752b05.avif",
    desc: "Вставные, True wireless, 6 ч работы, Lightning, без шумоподавления.",
    price: 799,
    memoryOptions: [
        { size: "Standard", price: 799, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1257,
    name: "Беспроводные наушники Apple AirPods 4 ANC (MXP93HN/A)",
    brand: "Apple",
    image: "images/0346be3dc6e2183cbf7a062c71afb541.avif",
    desc: "Вставные, True wireless, 5 ч работы, USB Type-C, активное шумоподавление.",
    price: 699,
    memoryOptions: [
        { size: "Standard", price: 699, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1258,
    name: "Наушники Apple EarPods MWTY3ZM/A (с разъёмом Lightning)",
    brand: "Apple",
    image: "images/7fc544eae393d51920cca4011c01d82c.avif",
    desc: "Вставные, проводные, Lightning, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 89,
    memoryOptions: [
        { size: "Standard", price: 89*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1259,
    name: "Наушники Apple AirPods 3 Lightning (MPNY3CH/A)",
    brand: "Apple",
    image: "images/19c03b68b98c469c0fc6e70ba064ad7d.avif",
    desc: "Вставные, True wireless, 6 ч работы, Lightning, без шумоподавления.",
    price: 449,
    memoryOptions: [
        { size: "Standard", price: 449, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1260,
    name: "Беспроводные наушники Apple AirPods 4 ANC (MXP93ZP/A)",
    brand: "Apple",
    image: "images/0948be80d578777b71a428a755729bb4.avif",
    desc: "Вставные, True wireless, 5 ч работы, USB Type-C, активное шумоподавление.",
    price: 699,
    memoryOptions: [
        { size: "Standard", price: 699, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1261,
    name: "Беспроводные наушники Apple AirPods Pro 2 (MTJV3ZE/A) с разъемом USB Type-C",
    brand: "Apple",
    image: "images/0529a0b5d3a76d1d5eb98bc42ca7b7db.avif",
    desc: "Внутриканальные, True wireless, 6 ч работы, USB Type-C, активное шумоподавление.",
    price: 759,
    memoryOptions: [
        { size: "Standard", price: 759, color: "White" }
    ],
    defaultMemory: "Standard"
},

        // JBL (10 моделей)
  {
    id: 1221,
    name: "Наушники JBL Tune 520BT (черный)",
    brand: "JBL",
    image: "images/23c0363abe6a08b6a7a244588d5bd824.avif",
    desc: "Накладные, беспроводные, 57 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 139,
    memoryOptions: [
        { size: "Standard", price: 139*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1222,
    name: "Наушники JBL Tune 720BT (черный)",
    brand: "JBL",
    image: "images/6b3bf19fc54cb1fe2447e86303a4d731.avif",
    desc: "Мониторные, беспроводные, 76 ч работы, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 179,
    memoryOptions: [
        { size: "Standard", price: 179*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1223,
    name: "Наушники JBL Tune 520BT (сиреневый)",
    brand: "JBL",
    image: "images/b269fc4daec8d9685cfa4fe6a65061f3.avif",
    desc: "Накладные, беспроводные, 57 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 139,
    memoryOptions: [
        { size: "Standard", price: 139*2, color: "Lilac" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1224,
    name: "Наушники JBL Wave Beam 2 (черный)",
    brand: "JBL",
    image: "images/821bc4e8593fc2c3e9857a7a908b8c8f.avif",
    desc: "Внутриканальные, True wireless, 10 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 219,
    memoryOptions: [
        { size: "Standard", price: 219*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1225,
    name: "Наушники JBL Wave Buds (JBLWBUDSBLK) черный",
    brand: "JBL",
    image: "images/d6aa3e6340ebb44f7f8cdc5ecffe5440.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 159,
    memoryOptions: [
        { size: "Standard", price: 159*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1226,
    name: "Наушники JBL Tune 770NC (сиреневый)",
    brand: "JBL",
    image: "images/dfeb2ab0fa32ec2adf53f601c428c016.avif",
    desc: "Мониторные, беспроводные, 70 ч работы, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 299,
    memoryOptions: [
        { size: "Standard", price: 299*2, color: "Lilac" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1227,
    name: "Наушники JBL Wave Flex 2 (черный)",
    brand: "JBL",
    image: "images/07fb6882faaf1b8b439abc4519990876.avif",
    desc: "Вставные, True wireless, 10 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 199,
    memoryOptions: [
        { size: "Standard", price: 199*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1228,
    name: "Наушники JBL Tune 520BT (JBLT520BTBLU) темно-синий",
    brand: "JBL",
    image: "images/7fc14fb91dbb00c603c8e6d74039da49.avif",
    desc: "Накладные, беспроводные, 57 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 139,
    memoryOptions: [
        { size: "Standard", price: 139*2, color: "Dark Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1229,
    name: "Наушники JBL Wave Buds 2 (белый)",
    brand: "JBL",
    image: "images/ddf4a8803b2847db92e239cdd9a1a569.avif",
    desc: "Внутриканальные, True wireless, 10 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 225,
    memoryOptions: [
        { size: "Standard", price: 225*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1230,
    name: "Наушники JBL Wave Buds (JBLWBUDSWHT) белый",
    brand: "JBL",
    image: "images/a9acca2c8a7ca4b71eb3491e416bd84b.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 159,
    memoryOptions: [
        { size: "Standard", price: 159*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1231,
    name: "Наушники JBL Wave Flex (черный)",
    brand: "JBL",
    image: "images/dce9097c30e79f4f11ded0d47731a974.avif",
    desc: "Вставные, True wireless, 8 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 179,
    memoryOptions: [
        { size: "Standard", price: 179*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1232,
    name: "Наушники JBL T500 (синий)",
    brand: "JBL",
    image: "images/28b75328f604915c9b31c0965bbf07b3.avif",
    desc: "Накладные, проводные, 3.5 мм джек, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 109,
    memoryOptions: [
        { size: "Standard", price: 109*2, color: "Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1233,
    name: "Наушники JBL Tune 770NC (белый)",
    brand: "JBL",
    image: "images/fe77042c5fe9824d4825a202ea62befa.avif",
    desc: "Мониторные, беспроводные, 70 ч работы, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 299,
    memoryOptions: [
        { size: "Standard", price: 299*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1234,
    name: "Наушники JBL Tune 520BT (белый)",
    brand: "JBL",
    image: "images/383da25236e47ad313ee73e2f3126602.avif",
    desc: "Накладные, беспроводные, 57 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 139,
    memoryOptions: [
        { size: "Standard", price: 139*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1235,
    name: "Наушники JBL Wave Beam (JBLWBEAMBLK) черный",
    brand: "JBL",
    image: "images/ceddfd78f8d7985eb25b8e6f1f9a71ad.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 199,
    memoryOptions: [
        { size: "Standard", price: 199*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1236,
    name: "Наушники JBL Tune 520BT (темно-синий)",
    brand: "JBL",
    image: "images/1d549f0059698748669c705f246ef2c0.avif",
    desc: "Накладные, беспроводные, 57 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 139,
    memoryOptions: [
        { size: "Standard", price: 139*2, color: "Dark Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1237,
    name: "Наушники JBL Tune Flex Ghost (JBLTFLEXGWHTCN) белый",
    brand: "JBL",
    image: "images/532e8eeba4b5f00809407bbdc8027196.avif",
    desc: "Вставные, True wireless, 8 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 269,
    memoryOptions: [
        { size: "Standard", price: 269*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1238,
    name: "Наушники JBL Tune 520BT (JBLT520BTBLK) черный",
    brand: "JBL",
    image: "images/b7b9c71ddb53603d323e71b9f2e08d2a.avif",
    desc: "Накладные, беспроводные, 57 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 139,
    memoryOptions: [
        { size: "Standard", price: 139*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1239,
    name: "Наушники JBL T500 (черный)",
    brand: "JBL",
    image: "images/14bca700145e8b6bba3ce2a495fdfdf6.avif",
    desc: "Накладные, проводные, 3.5 мм джек, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 109,
    memoryOptions: [
        { size: "Standard", price: 109*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1240,
    name: "Наушники JBL Tune 280 TWS NC2 (черный)",
    brand: "JBL",
    image: "images/b2436ac9ce093b29f5516c592aaa6bba.avif",
    desc: "Внутриканальные, True wireless, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 219,
    memoryOptions: [
        { size: "Standard", price: 219*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1241,
    name: "Наушники JBL Tune Flex (черный)",
    brand: "JBL",
    image: "images/73e0b376d8c778dee897ef04390f6d72.avif",
    desc: "Вставные, True wireless, 8 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 269,
    memoryOptions: [
        { size: "Standard", price: 269*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1242,
    name: "Наушники JBL Wave Beam 2 (белый)",
    brand: "JBL",
    image: "images/d37a57eafaaf8036a443c53c6d547c88.avif",
    desc: "Внутриканальные, True wireless, 10 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 219,
    memoryOptions: [
        { size: "Standard", price: 219*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1243,
    name: "Наушники JBL Tune 720BT (белый)",
    brand: "JBL",
    image: "images/8c0d61893aee93a7042582b939d9162c.avif",
    desc: "Мониторные, беспроводные, 76 ч работы, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 179,
    memoryOptions: [
        { size: "Standard", price: 179*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1244,
    name: "Наушники JBL Tour Pro+ (JBLTOURPROPTWSBKCN) черный",
    brand: "JBL",
    image: "images/fa05aa4e36d944faf855eae2b96b994a.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 319,
    memoryOptions: [
        { size: "Standard", price: 319*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},

        // Xiaomi (10 моделей)
{
    id: 1197,
    name: "Беспроводные наушники Redmi Buds 6 Play Black (M2420E1/BHR8776GL)",
    brand: "Xiaomi",
    image: "images/9d954700e1ee41bdd4fd50ef9f0d0a41.avif",
    desc: "Внутриканальные, True wireless, 7.5 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 39,
    memoryOptions: [
        { size: "Standard", price: 39*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1198,
    name: "Наушники Xiaomi Redmi Buds 6 M2429E1/BHR9251GL (черный)",
    brand: "Xiaomi",
    image: "images/ddd2c504ec8a99211b8f22fd1e0b3ee7.avif",
    desc: "Внутриканальные, True wireless, 10 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 159,
    memoryOptions: [
        { size: "Standard", price: 159*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1199,
    name: "Беспроводные наушники Redmi Buds 6 Lite Black (M2349E1/BHR8653GL)",
    brand: "Xiaomi",
    image: "images/20d15f9e349ed1f853766c6b903eaf37.avif",
    desc: "Внутриканальные, True wireless, 7 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 79,
    memoryOptions: [
        { size: "Standard", price: 79*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1200,
    name: "Беспроводные наушники Xiaomi Redmi Buds 6 Active Black BHR8396GL (M2344E1)",
    brand: "Xiaomi",
    image: "images/782782ccf0ec08c76b455610f78bfd22.avif",
    desc: "Вставные, True wireless, 6 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 59,
    memoryOptions: [
        { size: "Standard", price: 59*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1201,
    name: "Беспроводные наушники Redmi Buds 6 Play White (M2420E1/BHR8773GL)",
    brand: "Xiaomi",
    image: "images/ab3fccdea2b412ba9912b171c7665577.avif",
    desc: "Внутриканальные, True wireless, 7.5 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 33,
    memoryOptions: [
        { size: "Standard", price: 33*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1202,
    name: "Наушники Xiaomi Redmi Buds 6 Pro M2430E1/BHR9317GL (сиреневый)",
    brand: "Xiaomi",
    image: "images/00e164b78589e055051881f63f72a0c8.avif",
    desc: "Внутриканальные, True wireless, 9.5 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 259,
    memoryOptions: [
        { size: "Standard", price: 259*2, color: "Lilac" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1203,
    name: "Наушники Xiaomi Redmi Buds 6 M2429E1/BHR9250GL (белый)",
    brand: "Xiaomi",
    image: "images/00e164b78589e055051881f63f72a0c8.avif",
    desc: "Внутриканальные, True wireless, 10 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 159,
    memoryOptions: [
        { size: "Standard", price: 159*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1204,
    name: "Беспроводные наушники Xiaomi Redmi Buds 6 Active White BHR8391GL (M2344E1)",
    brand: "Xiaomi",
    image: "images/72271b359a0a916c48f81e236f9eb291 (1).avif",
    desc: "Вставные, True wireless, 6 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 59,
    memoryOptions: [
        { size: "Standard", price: 59*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1205,
    name: "Беспроводные наушники Redmi Buds 6 Lite White (M2349E1/BHR8655GL)",
    brand: "Xiaomi",
    image: "images/9e282d1564c7e877392db5b651c2fcb1.avif",
    desc: "Внутриканальные, True wireless, 7 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 79,
    memoryOptions: [
        { size: "Standard", price: 79*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1206,
    name: "Наушники Xiaomi Redmi Buds 8 Lite M2539E1 (черный)",
    brand: "Xiaomi",
    image: "images/8152bd7ae73968d9cdb18b5fc72d1597.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 99,
    memoryOptions: [
        { size: "Standard", price: 99*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1207,
    name: "Беспроводные наушники Redmi Buds 6 Play Pink (BHR8775GL/M2420E1)",
    brand: "Xiaomi",
    image: "images/0653cbedd3b67a3a91c4597b06a7dc88.avif",
    desc: "Внутриканальные, True wireless, 7.5 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 39,
    memoryOptions: [
        { size: "Standard", price: 39*2, color: "Pink" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1208,
    name: "Наушники Xiaomi Type-C Earphone White (M2413E1/BHR8931GL)",
    brand: "Xiaomi",
    image: "images/56da0365fc7ad826edf4f99a27c08629.avif",
    desc: "Внутриканальные, проводные, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 23,
    memoryOptions: [
        { size: "Standard", price: 23*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1209,
    name: "Беспроводные наушники Redmi Buds 6 Lite Blue (M2349E1/BHR8660GL)",
    brand: "Xiaomi",
    image: "images/b6544c730389369883cc353b77adacfb.avif",
    desc: "Внутриканальные, True wireless, 7 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 79,
    memoryOptions: [
        { size: "Standard", price: 79*2, color: "Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1210,
    name: "Беспроводные наушники Xiaomi Redmi Buds 6 Active Pink BHR8395GL (M2344E1)",
    brand: "Xiaomi",
    image: "images/c43767e379d4a642bce5fa9ee0382ea4.avif",
    desc: "Вставные, True wireless, 6 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 59,
    memoryOptions: [
        { size: "Standard", price: 59*2, color: "Pink" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1211,
    name: "Гарнитура XIAOMI Mi In-Ear Headphones Basic Black (ZBW4354TY)",
    brand: "Xiaomi",
    image: "images/2fa5e7e505d94c7dc58f907543229b85.avif",
    desc: "Внутриканальные, проводные, 3.5 мм джек, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 25,
    memoryOptions: [
        { size: "Standard", price: 25*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1212,
    name: "Наушники Xiaomi Type-C Earphone Black (M2413E1/BHR8930GL)",
    brand: "Xiaomi",
    image: "images/8eae5765dd19f137f9c48c198435e1fb.avif",
    desc: "Внутриканальные, проводные, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 23,
    memoryOptions: [
        { size: "Standard", price: 23*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1213,
    name: "Беспроводные наушники Redmi Buds 6 Play Blue (M2420E1/BHR9283GL)",
    brand: "Xiaomi",
    image: "images/fbb7d5d70858db97edb7fb2fed21d540.avif",
    desc: "Внутриканальные, True wireless, 7.5 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 39,
    memoryOptions: [
        { size: "Standard", price: 39*2, color: "Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1214,
    name: "Наушники Xiaomi Mi In-Ear Headfones Basic Silver (ZBW4355T / HSEJ03JY)",
    brand: "Xiaomi",
    image: "images/6a1913c0a78ff8091e66d7ece32eb777.avif",
    desc: "Внутриканальные, проводные, 3.5 мм джек, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 25,
    memoryOptions: [
        { size: "Standard", price: 25*2, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1215,
    name: "Наушники Xiaomi Redmi Buds 6 Pro M2430E1/BHR9310GL (белый)",
    brand: "Xiaomi",
    image: "images/07a9293e80c357e6f5f155cff1693ea5.avif",
    desc: "Внутриканальные, True wireless, 9.5 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 259,
    memoryOptions: [
        { size: "Standard", price: 259*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1216,
    name: "Наушники Xiaomi Redmi Buds 6 M2429E1/BHR9245GL (зеленый)",
    brand: "Xiaomi",
    image: "images/6175a1fcd219115a62471b53be097960.avif",
    desc: "Внутриканальные, True wireless, 10 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 159,
    memoryOptions: [
        { size: "Standard", price: 159*2, color: "Green" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1217,
    name: "Беспроводные наушники Xiaomi Redmi Buds 6 Active Blue BHR8394GL (M2344E1)",
    brand: "Xiaomi",
    image: "images/58bfe7977b853149c5415c31d3d24778.avif",
    desc: "Вставные, True wireless, 6 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 59,
    memoryOptions: [
        { size: "Standard", price: 59*2, color: "Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1218,
    name: "Наушники Xiaomi OpenWear Stereo Pro OpenWear Stereo Pro M2503E1 BHR080FGL (золотистый)",
    brand: "Xiaomi",
    image: "images/2aa20375b242638c6fb7938e49ec0a8d.avif",
    desc: "Вставные, True wireless, 8.5 ч работы, USB Type-C, 20 Гц - 40 000 Гц, без шумоподавления.",
    price: 585,
    memoryOptions: [
        { size: "Standard", price: 585*2, color: "Gold" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1219,
    name: "Наушники Xiaomi Buds 5 Pro BT BHR9642GL (белый)",
    brand: "Xiaomi",
    image: "images/c061458ed7c4b1f13a80b188bef68a18.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, 15 Гц - 55 000 Гц, активное шумоподавление.",
    price: 803,
    memoryOptions: [
        { size: "Standard", price: 803, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1220,
    name: "Наушники Xiaomi Redmi Buds 8 Lite M2539E1 (белый)",
    brand: "Xiaomi",
    image: "images/363dda3cfbcd22c2e81bf2d34bcdf376.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 99,
    memoryOptions: [
        { size: "Standard", price: 99*2, color: "White" }
    ],
    defaultMemory: "Standard"
},

        // Samsung (10 моделей)
     {
    id: 1187,
    name: "Наушники Samsung Galaxy Buds Core (черный)",
    brand: "Samsung",
    image: "images/d801859394f783bbbc14832b196fadf0.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, активное шумоподавление.",
    price: 179,
    memoryOptions: [
        { size: "Standard", price: 179*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1188,
    name: "Наушники Samsung Galaxy Buds 3 FE (SM-R420NZKACIS) черный",
    brand: "Samsung",
    image: "images/bc97c40e15f4a9361ce1dddd359d95da.avif",
    desc: "Внутриканальные, True wireless, 8.5 ч работы, USB Type-C, активное шумоподавление.",
    price: 299,
    memoryOptions: [
        { size: "Standard", price: 299*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1189,
    name: "Наушники Samsung Galaxy Buds 3 FE (SM-R420NZAACIS) серый",
    brand: "Samsung",
    image: "images/53a964d2897724bad9361789f042e423.avif",
    desc: "Внутриканальные, True wireless, 8.5 ч работы, USB Type-C, активное шумоподавление.",
    price: 299,
    memoryOptions: [
        { size: "Standard", price: 299*2, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1190,
    name: "Наушники Samsung Galaxy Buds 4 SM-R540NZWACIS (белый)",
    brand: "Samsung",
    image: "images/79f4668beaededba71f9f27c1e921b2f.avif",
    desc: "Внутриканальные, True wireless, 6 ч работы, USB Type-C, активное шумоподавление.",
    price: 499,
    memoryOptions: [
        { size: "Standard", price: 499*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1191,
    name: "Наушники Samsung Galaxy Buds 4 Pro SM-R640NZKACIS (черный)",
    brand: "Samsung",
    image: "images/2716fdafb0bae4c7817f45ca6349347d.avif",
    desc: "Внутриканальные, True wireless, 7 ч работы, USB Type-C, активное шумоподавление.",
    price: 699,
    memoryOptions: [
        { size: "Standard", price: 699*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1192,
    name: "Наушники Samsung Galaxy Buds 4 SM-R540NZKACIS (черный)",
    brand: "Samsung",
    image: "images/f2a63e2a07730dc01ec3c7352c225b2c.avif",
    desc: "Внутриканальные, True wireless, 6 ч работы, USB Type-C, активное шумоподавление.",
    price: 499,
    memoryOptions: [
        { size: "Standard", price: 499*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1193,
    name: "Наушники Samsung Galaxy Buds 3 (SM-R530NZWACIS) White",
    brand: "Samsung",
    image: "images/d3a8d1de26a352ab574533c55d2fd0a5.avif",
    desc: "Вставные, True wireless, 6 ч работы, USB Type-C, активное шумоподавление.",
    price: 479,
    memoryOptions: [
        { size: "Standard", price: 479*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1194,
    name: "Наушники Samsung Galaxy Buds 4 Pro SM-R640NZWACIS (белый)",
    brand: "Samsung",
    image: "images/197cd0187a606907346bc7340e818c4e.avif",
    desc: "Внутриканальные, True wireless, 7 ч работы, USB Type-C, активное шумоподавление.",
    price: 699,
    memoryOptions: [
        { size: "Standard", price: 699*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1195,
    name: "Наушники Samsung Galaxy Buds 3 Pro (SM-R630NZAACIS) Silver",
    brand: "Samsung",
    image: "images/2af282e31c888d6551dba3a81849d27b.avif",
    desc: "Внутриканальные, True wireless, 7 ч работы, USB Type-C, активное шумоподавление, 20 Гц - 20 000 Гц.",
    price: 639,
    memoryOptions: [
        { size: "Standard", price: 639*2, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1196,
    name: "Наушники Samsung Galaxy Buds Core (белый)",
    brand: "Samsung",
    image: "images/ec18dc2daa84da3aa10306d2e26178ac.avif",
    desc: "Внутриканальные, True wireless, 8 ч работы, USB Type-C, активное шумоподавление.",
    price: 179,
    memoryOptions: [
        { size: "Standard", price: 179*2, color: "White" }
    ],
    defaultMemory: "Standard"
},



        // MARSHALL (10 моделей)
      {
    id: 1178,
    name: "Наушники MARSHALL MAJOR V (черный)",
    brand: "MARSHALL",
    image: "images/f7393a85b488e3f19bb343d5bff5f14e.avif",
    desc: "Накладные, беспроводные, 100 ч работы, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 349,
    memoryOptions: [
        { size: "Standard", price: 349*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1179,
    name: "Наушники Marshall Major V (коричневый)",
    brand: "MARSHALL",
    image: "images/4b182cae64495b3f11fdc131ca3af9e4.avif",
    desc: "Накладные, беспроводные, 100 ч работы, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 349,
    memoryOptions: [
        { size: "Standard", price: 349*2, color: "Brown" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1180,
    name: "Наушники Marshall Major V (кремовый)",
    brand: "MARSHALL",
    image: "images/ece7c2ea6aa7a67496459cdbf9bfdce3.avif",
    desc: "Накладные, беспроводные, 100 ч работы, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 349,
    memoryOptions: [
        { size: "Standard", price: 349*2, color: "Cream" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1181,
    name: "Наушники Marshall Major IV (коричневый)",
    brand: "MARSHALL",
    image: "images/ad8c56b0e31d0c62802755a6f974984c.avif",
    desc: "Накладные, беспроводные, 80 ч работы, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 299,
    memoryOptions: [
        { size: "Standard", price: 299*2, color: "Brown" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1182,
    name: "Наушники Marshall Major IV",
    brand: "MARSHALL",
    image: "images/21c7fa59c9571bdba41bcb79114c340b.avif",
    desc: "Накладные, беспроводные, 80 ч работы, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 299,
    memoryOptions: [
        { size: "Standard", price: 299*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1183,
    name: "Наушники Marshall Major V (синий)",
    brand: "MARSHALL",
    image: "images/88d71e36b3a10fdf9dab605b14118315.avif",
    desc: "Накладные, беспроводные, 100 ч работы, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 349,
    memoryOptions: [
        { size: "Standard", price: 349*2, color: "Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1184,
    name: "Наушники Marshall Minor IV (черный)",
    brand: "MARSHALL",
    image: "images/0ce8f5ee7e34d92c0f161eae02849fd5.avif",
    desc: "Вставные, True wireless, 7 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 459,
    memoryOptions: [
        { size: "Standard", price: 459*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1185,
    name: "Наушники Marshall Minor III (черный)",
    brand: "MARSHALL",
    image: "images/b4d56a4b5bee3f05d48d6025bb1176c2.avif",
    desc: "Вставные, True wireless, 5 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 389,
    memoryOptions: [
        { size: "Standard", price: 389*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1186,
    name: "Наушники Marshall Motif II ANC",
    brand: "MARSHALL",
    image: "images/a5b7416bde679086d307ba7b7f26249d.avif",
    desc: "Внутриканальные, True wireless, 6 ч работы, USB Type-C, 20 Гц - 20 000 Гц, активное шумоподавление.",
    price: 599,
    memoryOptions: [
        { size: "Standard", price: 599*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},

        // Sony (10 моделей)
{
    id: 1161,
    name: "Наушники Sony WH-CH520 (черный)",
    brand: "Sony",
    image: "images/5d19322a62d1bf6f0935e15e97202ace.avif",
    desc: "Накладные, беспроводные, 40 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 179,
    memoryOptions: [
        { size: "Standard", price: 179*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1162,
    name: "Наушники Sony WH-CH520 (бежевый)",
    brand: "Sony",
    image: "images/d7900d574f83fca6311ff647f500c487.avif",
    desc: "Накладные, беспроводные, 40 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 179,
    memoryOptions: [
        { size: "Standard", price: 179*2, color: "Beige" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1163,
    name: "Наушники SONY WH-CH520 (белый)",
    brand: "Sony",
    image: "images/ae21fe5093e4adb24db101b692c09ea0.avif",
    desc: "Накладные, беспроводные, 40 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 179,
    memoryOptions: [
        { size: "Standard", price: 179*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1164,
    name: "Наушники Sony WH-1000XM6 (серый)",
    brand: "Sony",
    image: "images/32bb87d1da2560cc1edb159e7e51525f.avif",
    desc: "Мониторные, беспроводные, 40 ч работы, шумоподавление, 3.5 мм джек, USB Type-C, 4 Гц - 40 000 Гц.",
    price: 1399,
    memoryOptions: [
        { size: "Standard", price: 1399*2, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1165,
    name: "Наушники SONY WH-CH520 (синий)",
    brand: "Sony",
    image: "images/2423ad90ea2ec45d7d1502e9bb7c29cc.avif",
    desc: "Накладные, беспроводные, 40 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 179,
    memoryOptions: [
        { size: "Standard", price: 179*2, color: "Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1166,
    name: "Наушники с микрофоном Sony WH-1000XM4 (черный)",
    brand: "Sony",
    image: "images/49a3f1c7193c9dbc1fd06d528c1cc90b.avif",
    desc: "Мониторные, беспроводные, 38 ч работы, шумоподавление, 3.5 мм джек, USB Type-C, 4 Гц - 40 000 Гц.",
    price: 899,
    memoryOptions: [
        { size: "Standard", price: 899*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1167,
    name: "Наушники Sony WH-1000XM6 (черный)",
    brand: "Sony",
    image: "images/925f6cca08d418796f9ce5638f5cc431.avif",
    desc: "Мониторные, беспроводные, 40 ч работы, шумоподавление, 3.5 мм джек, USB Type-C, 4 Гц - 40 000 Гц.",
    price: 1399,
    memoryOptions: [
        { size: "Standard", price: 1399*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1168,
    name: "Наушники Sony WH-1000XM5 (черный)",
    brand: "Sony",
    image: "images/a9e4e3cf6802d642d649e87c5314cc4c.avif",
    desc: "Мониторные, беспроводные, 30 ч работы, шумоподавление, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц.",
    price: 1099,
    memoryOptions: [
        { size: "Standard", price: 1099*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1169,
    name: "Наушники Sony Inzone H3 MDR-G300 (белый)",
    brand: "Sony",
    image: "images/94f020a1bcc4d0e957ec9ec68e6702b9.avif",
    desc: "Мониторные, проводные, 3.5 мм джек, USB Type-A, 10 Гц - 20 000 Гц, без шумоподавления.",
    price: 303,
    memoryOptions: [
        { size: "Standard", price: 303*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1170,
    name: "Наушники Sony WF-1000XM5 (серебристый)",
    brand: "Sony",
    image: "images/03916c0ee7275b0e54a0960247299892.avif",
    desc: "Внутриканальные, True wireless, 12 ч работы, шумоподавление, USB Type-C, 20 Гц - 40 000 Гц.",
    price: 1019,
    memoryOptions: [
        { size: "Standard", price: 1019*2, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1171,
    name: "Наушники Sony WH-1000XM6 (темно-синий)",
    brand: "Sony",
    image: "images/b82e033210262c58882b36186199ff8b.avif",
    desc: "Мониторные, беспроводные, 40 ч работы, шумоподавление, 3.5 мм джек, USB Type-C, 4 Гц - 40 000 Гц.",
    price: 1399,
    memoryOptions: [
        { size: "Standard", price: 1399*2, color: "Dark Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1172,
    name: "Наушники Sony WF-C710N (белый)",
    brand: "Sony",
    image: "images/667742c48d10f69612a8cf08779cc3b7.avif",
    desc: "Внутриканальные, True wireless, 12 ч работы, шумоподавление, USB Type-C, 20 Гц - 20 000 Гц.",
    price: 400,
    memoryOptions: [
        { size: "Standard", price: 400*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1173,
    name: "Наушники SONY MDR-ZX110AP (белый)",
    brand: "Sony",
    image: "images/4355684a05db9058abe424b06491726d.avif",
    desc: "Накладные, проводные, 3.5 мм джек, 12 Гц - 22 000 Гц, без шумоподавления.",
    price: 69,
    memoryOptions: [
        { size: "Standard", price: 69*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1174,
    name: "Наушники Sony WH-1000XM5 (белый)",
    brand: "Sony",
    image: "images/6bb709bc4b6637491f11586c36cb3c86.avif",
    desc: "Мониторные, беспроводные, 30 ч работы, шумоподавление, 3.5 мм джек, USB Type-C, 20 Гц - 20 000 Гц.",
    price: 1283,
    memoryOptions: [
        { size: "Standard", price: 1283*2, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1175,
    name: "Наушники Sony WI-OE610",
    brand: "Sony",
    image: "images/7efa9f185fd7065012e3ea35d93120e1.avif",
    desc: "Накладные, беспроводные, 10 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 529,
    memoryOptions: [
        { size: "Standard", price: 529*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1176,
    name: "Наушники Sony MDR-ZX110AP (черный)",
    brand: "Sony",
    image: "images/d3980a6ef3a58909c9f45d5a2b381d88.avif",
    desc: "Накладные, проводные, 3.5 мм джек, 12 Гц - 22 000 Гц, без шумоподавления.",
    price: 69,
    memoryOptions: [
        { size: "Standard", price: 69*2, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1177,
    name: "Наушники SONY WH-CH520B (черный)",
    brand: "Sony",
    image: "images/1d99f4e1169b41e207d65932c4f2d88b.avif",
    desc: "Накладные, беспроводные, 50 ч работы, USB Type-C, 20 Гц - 20 000 Гц, без шумоподавления.",
    price: 179,
    memoryOptions: [
        { size: "Standard", price: 179 *2, color: "Black" }
    ],
    defaultMemory: "Standard"
},

    ],

    tablets: [
        // === Apple iPad (10 моделей) ===
{
    id: 1334,
    name: "Планшет Apple iPad 11 2025 Wi-Fi 128GB A3354 (MD3Y4LL/A) Silver + Адаптер питания Red Line BS-01",
    brand: "APPLE",
    image: "images/e49b853ff7774aa2ad4f6379287e282e.avif",
    desc: "11\" IPS, 6/128 ГБ, Apple A16 Bionic, iPadOS 18, Wi-Fi.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1399 + 1000, color: "Silver" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1335,
    name: "Планшет Apple iPad 11 2025 Wi-Fi 6GB/128GB A3354 Pink + Адаптер питания",
    brand: "APPLE",
    image: "images/aae622cb73a451bdf3e9b9219b07ec81.avif",
    desc: "11\" IPS, 6/128 ГБ, Apple A16 Bionic, iPadOS 18, Wi-Fi.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1399 + 1000, color: "Pink" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1336,
    name: "Планшет Apple iPad Air 11 2025 Wi-Fi A3266 8GB/128GB MCA04ZA/A (фиолетовый)+ Адаптер питания Red Line BS-01 16A",
    brand: "APPLE",
    image: "images/e4775e5994a68716481d134aee984c60.avif",
    desc: "11\" IPS, 8/128 ГБ, Apple M3, iPadOS 18, Wi-Fi, 7606 мАч.",
    price: 2199 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 2199 + 1000, color: "Purple" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1337,
    name: "Планшет Apple iPad Air 11 2025 Wi-Fi A3266 8GB/128GB MC9Y4ZA/A (сияющая звезда)+ Адаптер питания Red Line BS-01 16A",
    brand: "APPLE",
    image: "images/8320f37e28a7a2b1d49311487ad3f5d7.avif",
    desc: "11\" IPS, 8/128 ГБ, Apple M3, iPadOS 18, Wi-Fi, 7606 мАч.",
    price: 2199 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 2199 + 1000, color: "Starlight" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1338,
    name: "Планшет Apple iPad Air 11 2025 Wi-Fi 128GB A3266 128GB MC9X4ZA/A (голубой) + Адаптер питания Red Line BS-01 16A",
    brand: "APPLE",
    image: "images/9b3c2173d6793d70bb88e86047d08512.avif",
    desc: "11\" IPS, 8/128 ГБ, Apple M3, iPadOS 18, Wi-Fi, 7606 мАч.",
    price: 2199 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 2199 + 1000, color: "Blue" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1339,
    name: "Планшет Apple iPad Air 11 2025 Wi-Fi A3266 8GB/128GB Space Gray + Адаптер питания",
    brand: "APPLE",
    image: "images/5ce0d53a51fefecd56702abc0df35491.avif",
    desc: "11\" IPS, 8/128 ГБ, Apple M3, iPadOS 18, Wi-Fi, 7606 мАч.",
    price: 2199 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 2199 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1340,
    name: "Планшет Apple iPad 11 2025 Wi-Fi 128GB A3354 (MD4A4ZP/A) Blue + Адаптер питания",
    brand: "APPLE",
    image: "images/0e74b64c9a4489c35a2f7aeeaf199c22.avif",
    desc: "11\" IPS, 6/128 ГБ, Apple A16 Bionic, iPadOS 18, Wi-Fi.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1399 + 1000, color: "Blue" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1341,
    name: "Планшет Apple iPad 11 2025 Wi-Fi 128GB A3354 (MD4A4LL/A) Blue + Адаптер питания Red Line BS-01",
    brand: "APPLE",
    image: "images/0e74b64c9a4489c35a2f7aeeaf199c22.avif",
    desc: "11\" IPS, 6/128 ГБ, Apple A16 Bionic, iPadOS 18, Wi-Fi.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1399 + 1000, color: "Blue" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1342,
    name: "Планшет Apple iPad 10.2\" A2602 64GB (MK2K3LL/A) серый космос",
    brand: "APPLE",
    image: "images/21a66ce6ff14f83700805bbf3273d990.avif",
    desc: "10.2\" IPS, 3/64 ГБ, Apple A13 Bionic, iPadOS 15, Wi-Fi.",
    price: 1159 + 1000,
    memoryOptions: [
        { size: "3GB/64GB", price: 1159 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "3GB/64GB"
},
{
    id: 1343,
    name: "Планшет Apple iPad 10 Wi-Fi 64GB Blue (MCM84NF/A) A2696",
    brand: "APPLE",
    image: "images/fce3ddfaa1997571942daf5828948599.avif",
    desc: "10.9\" IPS, 4/64 ГБ, Apple A14 Bionic, iOS 16, Wi-Fi.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "4GB/64GB", price: 1299 + 1000, color: "Blue" }
    ],
    defaultMemory: "4GB/64GB"
},
{
    id: 1344,
    name: "Планшет Apple iPad 10 Wi-Fi 64GB Silver (MPQ03ZA/A) A2696",
    brand: "APPLE",
    image: "images/ad364ef632b1a574cd20bb5bb7654470.avif",
    desc: "10.9\" IPS, 4/64 ГБ, Apple A14 Bionic, iOS 16, Wi-Fi.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "4GB/64GB", price: 1299 + 1000, color: "Silver" }
    ],
    defaultMemory: "4GB/64GB"
},
{
    id: 1345,
    name: "Планшет Apple iPad 10.2\" Wi-Fi 64Gb (MK2K3ZP/A) A2602 Space Grey",
    brand: "APPLE",
    image: "images/213aa03fb1dfd35b4c3f10738a4ceea2.avif",
    desc: "10.2\" IPS, 3/64 ГБ, Apple A13 Bionic, iPadOS 15, Wi-Fi.",
    price: 1159 + 1000,
    memoryOptions: [
        { size: "3GB/64GB", price: 1159 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "3GB/64GB"
},
{
    id: 1346,
    name: "Планшет Apple iPad Air 11 2024 Wi-Fi A2902 (MUWC3ZP/A) 128GB Space Gray + Адаптер питания",
    brand: "APPLE",
    image: "images/213aa03fb1dfd35b4c3f10738a4ceea2.avif",
    desc: "11\" IPS, 8/128 ГБ, Apple M2, iPadOS 17, Wi-Fi.",
    price: 2199 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 2199 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1347,
    name: "Планшет Apple iPad 10.2\" A2602 64GB (MK2L3LL/A) серебристый",
    brand: "APPLE",
    image: "images/cf28098b354c062a4627b2a3cc0e5391.avif",
    desc: "10.2\" IPS, 3/64 ГБ, Apple A13 Bionic, iPadOS 15, Wi-Fi.",
    price: 1159 + 1000,
    memoryOptions: [
        { size: "3GB/64GB", price: 1159 + 1000, color: "Silver" }
    ],
    defaultMemory: "3GB/64GB"
},
{
    id: 1348,
    name: "Планшет Apple iPad 9 10.2\" A2602 64GB (серебристый) + адаптер сетевой универсальный NO:008",
    brand: "APPLE",
    image: "images/47732866ec62e642342d8486e282ccdb.avif",
    desc: "10.2\" IPS, 3/64 ГБ, Apple A13 Bionic, iPadOS 15, Wi-Fi.",
    price: 1159 + 1000,
    memoryOptions: [
        { size: "3GB/64GB", price: 1159 + 1000, color: "Silver" }
    ],
    defaultMemory: "3GB/64GB"
},
{
    id: 1349,
    name: "Планшет Apple iPad 10.2\" A2602 64GB (MK2K3KN/A) серый космос",
    brand: "APPLE",
    image: "images/380242bce7fe2025dd5751da1cab39fc.avif",
    desc: "10.2\" IPS, 3/64 ГБ, Apple A13 Bionic, iPadOS 15, Wi-Fi.",
    price: 1159 + 1000,
    memoryOptions: [
        { size: "3GB/64GB", price: 1159 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "3GB/64GB"
},
{
    id: 1350,
    name: "Планшет Apple iPad 10.2\" A2602 64GB (MK2L3FD/A) серебристый",
    brand: "APPLE",
    image: "images/64e0327b38c0c824d7de6eee9528cc44.avif",
    desc: "10.2\" IPS, 3/64 ГБ, Apple A13 Bionic, iPadOS 15, Wi-Fi.",
    price: 1159 + 1000,
    memoryOptions: [
        { size: "3GB/64GB", price: 1159 + 1000, color: "Silver" }
    ],
    defaultMemory: "3GB/64GB"
},

        // === Samsung Galaxy Tab (10 моделей) ===
     {
    id: 1310,
    name: "Планшет Samsung Galaxy Tab A11+ Wi-Fi SM-X230 6GB/128GB (серый)",
    brand: "SAMSUNG",
    image: "images/8c6e055403615bd7ebf443105f6b5208.avif",
    desc: "11\" TFT, 6/128 ГБ, MediaTek Dimensity 7300, Android 15, Wi-Fi.",
    price: 799 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 799 + 1000, color: "Gray" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1311,
    name: "Планшет Samsung Galaxy Tab A9+ Wi-Fi 64GB (темно-синий)",
    brand: "SAMSUNG",
    image: "images/cd2965cd69c386065cfdbdba01ec80e9.avif",
    desc: "11\" TFT, 4/64 ГБ, Snapdragon 695, Android 13, Wi-Fi, 7040 мАч.",
    price: 549 + 1000,
    memoryOptions: [
        { size: "4GB/64GB", price: 549 + 1000, color: "Dark Blue" }
    ],
    defaultMemory: "4GB/64GB"
},
{
    id: 1312,
    name: "Планшет Samsung Galaxy Tab A11+ Wi-Fi SM-X230 8GB/256GB (серый)",
    brand: "SAMSUNG",
    image: "images/11ba9e3aa5a290f9a0e60a4b78830585.avif",
    desc: "11\" TFT, 8/256 ГБ, MediaTek Dimensity 7300, Android 15, Wi-Fi.",
    price: 949 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 949 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1313,
    name: "Планшет Samsung Galaxy Tab A11+ Wi-Fi SM-X230 6GB/128GB (серебристый)",
    brand: "SAMSUNG",
    image: "images/adc5795c30d71c443dc019a46eaf8ef4.avif",
    desc: "11\" TFT, 6/128 ГБ, MediaTek Dimensity 7300, Android 15, Wi-Fi, 7040 мАч.",
    price: 799 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 799 + 1000, color: "Silver" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1314,
    name: "Планшет Samsung Galaxy Tab S9+ 5G SM-X816 12GB/512GB (бежевый)",
    brand: "SAMSUNG",
    image: "images/c7c2a86a6f23928017947dfba1ceebf3.avif",
    desc: "12.4\" AMOLED, 12/512 ГБ, Snapdragon 8 Gen2, Android 13, 5G.",
    price: 4799 + 1000,
    memoryOptions: [
        { size: "12GB/512GB", price: 4799 + 1000, color: "Beige" }
    ],
    defaultMemory: "12GB/512GB"
},
{
    id: 1315,
    name: "Планшет Samsung Galaxy Tab A11+ 5G SM-X236 8GB/256GB (серый)",
    brand: "SAMSUNG",
    image: "images/032b6f2b1af058ca80724251906be652.avif",
    desc: "11\" TFT, 8/256 ГБ, MediaTek Dimensity 7300, Android 15, 5G, 7040 мАч.",
    price: 999 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 999 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1316,
    name: "Планшет Samsung Galaxy Tab S9 Wi-Fi SM-X710 8GB/128GB (серый)",
    brand: "SAMSUNG",
    image: "images/3da22e77ee29c89b5e9296313c19a903.avif",
    desc: "11\" AMOLED, 8/128 ГБ, Snapdragon 8 Gen2, Android 13, Wi-Fi.",
    price: 1999 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 1999 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1317,
    name: "Планшет Samsung Galaxy Tab A9+ Wi-Fi 64GB (серебристый)",
    brand: "SAMSUNG",
    image: "images/42823f17caac5c09ab1aef70b61d2424.avif",
    desc: "11\" TFT, 4/64 ГБ, Snapdragon 695, Android 13, Wi-Fi, 7040 мАч.",
    price: 549 + 1000,
    memoryOptions: [
        { size: "4GB/64GB", price: 549 + 1000, color: "Silver" }
    ],
    defaultMemory: "4GB/64GB"
},
{
    id: 1318,
    name: "Планшет Samsung Galaxy Tab S10 Lite Wi-Fi SM-X400 6GB/128GB (серый)",
    brand: "SAMSUNG",
    image: "images/ac76228f48e957fd44c8ab7dc52c05a4.avif",
    desc: "10.9\" PLS, 6/128 ГБ, Exynos 1380, Android 15, Wi-Fi.",
    price: 1149 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1149 + 1000, color: "Gray" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1319,
    name: "Планшет Samsung Galaxy Tab A11+ 5G SM-X236 8GB/256GB (серебристый)",
    brand: "SAMSUNG",
    image: "images/e1f63fc52004fd056a386af738c0afe8.avif",
    desc: "11\" TFT, 8/256 ГБ, MediaTek Dimensity 7300, Android 15, 4G LTE, 7040 мАч.",
    price: 999 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 999 + 1000, color: "Silver" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1320,
    name: "Планшет SAMSUNG Galaxy Tab S9 FE 5G SM-X516 6GB/128GB (графит)",
    brand: "SAMSUNG",
    image: "images/3eec56b4f7c90b9d68138a181d0d9729.avif",
    desc: "10.9\" IPS, 6/128 ГБ, Exynos 1380, Android 13, 5G.",
    price: 1699 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1699 + 1000, color: "Graphite" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1321,
    name: "Планшет Samsung Galaxy Tab A11+ 5G SM-X236 6GB/128GB (серый)",
    brand: "SAMSUNG",
    image: "images/86106e2b762daebf120876af588865fc.avif",
    desc: "11\" TFT, 6/128 ГБ, MediaTek Dimensity 7300, Android 15, 5G, 7040 мАч.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 899 + 1000, color: "Gray" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1322,
    name: "Планшет Samsung Galaxy Tab A8 LTE 64GB (SM-X205NZAESKZ) темно-серый",
    brand: "SAMSUNG",
    image: "images/19fd8c68b3f3ec6ec552140105c04775.avif",
    desc: "10.5\" TFT, 4/64 ГБ, UniSoc Tiger T618, Android 11, 4G LTE, 7040 мАч.",
    price: 759 + 1000,
    memoryOptions: [
        { size: "4GB/64GB", price: 759 + 1000, color: "Dark Gray" }
    ],
    defaultMemory: "4GB/64GB"
},
{
    id: 1323,
    name: "Планшет Samsung Galaxy Tab S10 Lite Wi-Fi SM-X400 6GB/128GB (серебристый)",
    brand: "SAMSUNG",
    image: "images/87c12f6c83f128fcea29fe608d238c0b.avif",
    desc: "10.9\" PLS, 6/128 ГБ, Exynos 1380, Android 15, Wi-Fi, 8000 мАч.",
    price: 1149 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1149 + 1000, color: "Silver" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1324,
    name: "Планшет Samsung Galaxy Tab A7 Lite LTE 32GB (SM-T225NZAASKZ) темно-серый",
    brand: "SAMSUNG",
    image: "images/17eec8875dce4c79024d6cb6f942d620.avif",
    desc: "8.7\" TFT, 3/32 ГБ, MediaTek MT8768T, Android 11, 4G LTE, 5100 мАч.",
    price: 559 + 1000,
    memoryOptions: [
        { size: "3GB/32GB", price: 559 + 1000, color: "Dark Gray" }
    ],
    defaultMemory: "3GB/32GB"
},
{
    id: 1325,
    name: "Планшет SAMSUNG Galaxy Tab A11 LTE (SM-X135) 8GB/128GB серебро",
    brand: "SAMSUNG",
    image: "images/b4231f89f77f23b8c9b88e0914effb61.avif",
    desc: "8.7\" TFT, 8/128 ГБ, MediaTek Helio G99, Android 15, 4G LTE.",
    price: 749 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 749 + 1000, color: "Silver" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1326,
    name: "Планшет Samsung Galaxy Tab S9 Wi-Fi SM-X710 12GB/256GB (серый)",
    brand: "SAMSUNG",
    image: "images/06f142e30d7615f93843ff5c16ad4342.avif",
    desc: "11\" AMOLED, 12/256 ГБ, Snapdragon 8 Gen2, Android 13, Wi-Fi.",
    price: 2399 + 1000,
    memoryOptions: [
        { size: "12GB/256GB", price: 2399 + 1000, color: "Gray" }
    ],
    defaultMemory: "12GB/256GB"
},
{
    id: 1327,
    name: "Планшет Samsung Galaxy Tab S9 Wi-Fi SM-X710 12GB/256GB (бежевый)",
    brand: "SAMSUNG",
    image: "images/6a2c6664fd379cc247a08e841f541ef5.avif",
    desc: "11\" AMOLED, 12/256 ГБ, Snapdragon 8 Gen2, Android 13, Wi-Fi.",
    price: 2399 + 1000,
    memoryOptions: [
        { size: "12GB/256GB", price: 2399 + 1000, color: "Beige" }
    ],
    defaultMemory: "12GB/256GB"
},
{
    id: 1328,
    name: "Планшет Samsung Galaxy Tab A11+ 5G SM-X236 6GB/128GB (серебристый)",
    brand: "SAMSUNG",
    image: "images/766cc5270c8ed40303e422274806f8db.avif",
    desc: "11\" TFT, 6/128 ГБ, MediaTek Dimensity 7300, Android 15, 4G LTE, 7040 мАч.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 899 + 1000, color: "Silver" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1329,
    name: "Планшет Samsung Galaxy Tab S9 Wi-Fi SM-X710 8GB/128GB (бежевый)",
    brand: "SAMSUNG",
    image: "images/766cc5270c8ed40303e422274806f8db.avif",
    desc: "11\" AMOLED, 8/128 ГБ, Snapdragon 8 Gen2, Android 13, Wi-Fi, 8400 мАч.",
    price: 1999 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 1999 + 1000, color: "Beige" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1330,
    name: "Планшет Samsung Galaxy Tab A11+ Wi-Fi SM-X230 8GB/256GB (серебристый)",
    brand: "SAMSUNG",
    image: "images/132bd7a62565ed41682b252126984ddd.avif",
    desc: "11\" TFT, 8/256 ГБ, MediaTek Dimensity 7300, Android 15, Wi-Fi, 7040 мАч.",
    price: 949 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 949 + 1000, color: "Silver" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1331,
    name: "Планшет SAMSUNG Galaxy Tab S9 FE+ Wi-Fi SM-X610 8GB/128GB (графит)",
    brand: "SAMSUNG",
    image: "images/827f5071697a307a1ff3d6cacee0bc89.avif",
    desc: "12.4\" IPS, 8/128 ГБ, Exynos 1380, Android 13, Wi-Fi.",
    price: 1899 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 1899 + 1000, color: "Graphite" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1332,
    name: "Планшет Samsung Galaxy Tab S9 5G SM-X716 8GB/128GB (серый)",
    brand: "SAMSUNG",
    image: "images/e754efec8e00df3e2b478dbb155195bc.avif",
    desc: "11\" AMOLED, 8/128 ГБ, Snapdragon 8 Gen2, Android 13, 5G, 8400 мАч.",
    price: 2499 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 2499 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1333,
    name: "Планшет SAMSUNG Galaxy Tab S9 FE+ Wi-Fi SM-X610 8GB/128GB (серебристый)",
    brand: "SAMSUNG",
    image: "images/077813b17e806714bc2ff5c23cf482a3.avif",
    desc: "12.4\" IPS, 8/128 ГБ, Exynos 1380, Android 13, Wi-Fi, 10090 мАч.",
    price: 1899 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 1899 + 1000, color: "Silver" }
    ],
    defaultMemory: "8GB/128GB"
},

        // === Xiaomi Pad (10 моделей) ===
   
{
    id: 1287,
    name: "Планшет Xiaomi Redmi Pad 2 Pro 6GB/128GB Lavender Purple EU",
    brand: "XIAOMI",
    image: "images/573b58e52a17662c42bd857b3fdda3cd.avif",
    desc: "12.1\" IPS, 6/128 ГБ, Snapdragon 7s Gen4, Android 15, Wi-Fi, 12000 мАч.",
    price: 1099 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1099 + 1000, color: "Lavender Purple" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1288,
    name: "Планшет Xiaomi Redmi Pad 2 Pro 5G 8GB/256GB Graphite Gray EU",
    brand: "XIAOMI",
    image: "images/fc63ffa8be43d89b666470da8b94ef91.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7s Gen4, Android 15, 5G, 12000 мАч.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1499 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1289,
    name: "Планшет Xiaomi Redmi Pad Pro 5G 8GB/256GB Graphite Gray EU",
    brand: "XIAOMI",
    image: "images/7e0ab23e19632fad9c122b5a25be3932.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7s Gen2, Android 14, 5G.",
    price: 999 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 999 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1290,
    name: "Планшет Xiaomi Redmi Pad 2 8GB/256GB Graphite Gray RU",
    brand: "XIAOMI",
    image: "images/c34d8a83650f32dcaf9f44ca8faf1ddf.avif",
    desc: "11\" IPS, 8/256 ГБ, MediaTek Helio G100-Ultra, Android 15, Wi-Fi, 9000 мАч.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 899 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1291,
    name: "Планшет Xiaomi Redmi Pad 2 4G 8GB/256GB Graphite Gray EU",
    brand: "XIAOMI",
    image: "images/0735f34a0287634caac8009c75627378.avif",
    desc: "11\" IPS, 8/256 ГБ, MediaTek Helio G100-Ultra, Android 15, 4G LTE, 9000 мАч.",
    price: 999 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 999 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1292,
    name: "Планшет Xiaomi Redmi Pad 2 Pro 5G 8GB/256GB Graphite Gray RU",
    brand: "XIAOMI",
    image: "images/0820019b3b8e2b030ace853b0b83c42f.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7s Gen4, Android 15, 5G, 12000 мАч.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1499 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1293,
    name: "Планшет Xiaomi Redmi Pad 2 8GB/256GB Graphite Gray EU",
    brand: "XIAOMI",
    image: "images/44ff5623ced7408a250dfc313a0e3666.avif",
    desc: "11\" IPS, 8/256 ГБ, MediaTek Helio G100-Ultra, Android 15, Wi-Fi, 9000 мАч.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 899 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1294,
    name: "Планшет Xiaomi Redmi Pad 2 Pro 6GB/128GB Silver EU",
    brand: "XIAOMI",
    image: "images/a6add3d09227b55809c0aea8684b79ed.avif",
    desc: "12.1\" IPS, 6/128 ГБ, Snapdragon 7s Gen4, Android 15, Wi-Fi, 12000 мАч.",
    price: 1099 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1099 + 1000, color: "Silver" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1295,
    name: "Планшет Xiaomi Redmi Pad 2 Pro 5G 8GB/256GB Silver EU",
    brand: "XIAOMI",
    image: "images/adf637ddb7c43af0c1322491b64817e2.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7s Gen4, Android 15, 5G, 12000 мАч.",
    price: 1499 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1499 + 1000, color: "Silver" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1296,
    name: "Планшет Xiaomi Redmi Pad 2 Pro 8GB/256GB Silver RU",
    brand: "XIAOMI",
    image: "images/afe50b8e3b7e8d0b7a6eeaa5fe76e647.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7s Gen4, Android 15, Wi-Fi, 12000 мАч.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1299 + 1000, color: "Silver" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1297,
    name: "Планшет Xiaomi Redmi Pad 2 Pro 8GB/256GB Graphite Gray EU",
    brand: "XIAOMI",
    image: "images/eb1618c2c814020e2adf2536ec66a4b8.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7s Gen4, Android 15, Wi-Fi, 12000 мАч.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1299 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1298,
    name: "Планшет Xiaomi Redmi Pad SE 6GB/128GB RU (серый)",
    brand: "XIAOMI",
    image: "images/27ae3887f645f70368c7964a88498108.avif",
    desc: "11\" IPS, 6/128 ГБ, Snapdragon 680, Android 13, Wi-Fi, 8000 мАч.",
    price: 599 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 599 + 1000, color: "Gray" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1299,
    name: "Планшет Xiaomi Redmi Pad Pro 6GB/128GB Ocean Blue RU",
    brand: "XIAOMI",
    image: "images/27ae3887f645f70368c7964a88498108.avif",
    desc: "12.1\" IPS, 6/128 ГБ, Snapdragon 7s Gen2, Android 14, Wi-Fi, 10000 мАч.",
    price: 999 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 999 + 1000, color: "Ocean Blue" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1300,
    name: "Планшет Xiaomi Pad 7 8GB/128GB (темно-серый)",
    brand: "XIAOMI",
    image: "images/c405852087702d4677bef37e60ac2457.avif",
    desc: "11.2\" IPS, 8/128 ГБ, Snapdragon 7+ Gen3, Android 15, Wi-Fi.",
    price: 1599 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 1599 + 1000, color: "Dark Gray" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1301,
    name: "Планшет Xiaomi Pad 7 Pro 8GB/128GB (темно-серый)",
    brand: "XIAOMI",
    image: "images/14b27948da3647f0dd27ccec4a4fd4ac.avif",
    desc: "11.2\" IPS, 8/128 ГБ, Snapdragon 8s Gen3, Android 15, Wi-Fi.",
    price: 1999 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 1999 + 1000, color: "Dark Gray" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1302,
    name: "Планшет Xiaomi Redmi Pad Pro 8GB/256GB Graphite Gray RU",
    brand: "XIAOMI",
    image: "images/cd616f5e87985335668e3bc7929b0616.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7s Gen2, Android 14, Wi-Fi.",
    price: 1099 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1099 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1303,
    name: "Планшет Xiaomi Pad 7 8GB/256GB (темно-серый)",
    brand: "XIAOMI",
    image: "images/6a6832be0f10a92d651273cf6083503c.avif",
    desc: "11.2\" IPS, 8/256 ГБ, Snapdragon 7+ Gen3, Android 15, Wi-Fi.",
    price: 1799 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1799 + 1000, color: "Dark Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1304,
    name: "Планшет Xiaomi Redmi Pad 2 Pro 6GB/128GB Graphite Gray EU",
    brand: "XIAOMI",
    image: "images/e7a022cb0db841eea643b85232176da6.avif",
    desc: "12.1\" IPS, 6/128 ГБ, Snapdragon 7s Gen4, Android 15, Wi-Fi, 12000 мАч.",
    price: 1099 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1099 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1305,
    name: "Планшет Xiaomi Redmi Pad 2 Pro 8GB/256GB Lavender Purple EU",
    brand: "XIAOMI",
    image: "images/d8a1e3fadbfae254e9926e4a55dd8591.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7s Gen4, Android 15, Wi-Fi, 12000 мАч.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1299 + 1000, color: "Lavender Purple" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1306,
    name: "Планшет Xiaomi Pad 7 Pro 8GB/256GB (темно-серый)",
    brand: "XIAOMI",
    image: "images/3b275d364150f7d4f9e23af441705801.avif",
    desc: "11.2\" IPS, 8/256 ГБ, Snapdragon 8s Gen3, Android 15, Wi-Fi.",
    price: 2199 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 2199 + 1000, color: "Dark Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1307,
    name: "Планшет Xiaomi Redmi Pad 2 4G 8GB/256GB Graphite Gray RU",
    brand: "XIAOMI",
    image: "images/fe3b63b4a3b7789da7190698c9ac61a4.avif",
    desc: "11\" IPS, 8/256 ГБ, MediaTek Helio G100-Ultra, Android 15, 4G LTE, 9000 мАч.",
    price: 999 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 999 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1308,
    name: "Планшет Xiaomi Redmi Pad 2 Pro 5G 6GB/128GB Graphite Gray EU",
    brand: "XIAOMI",
    image: "images/0ff8dcb7aac60b19d41c48636c4741a3.avif",
    desc: "12.1\" IPS, 6/128 ГБ, Snapdragon 7s Gen4, Android 15, 5G, 12000 мАч.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 1299 + 1000, color: "Graphite Gray" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1309,
    name: "Планшет Xiaomi Pad 7 8GB/256GB (зеленый)",
    brand: "XIAOMI",
    image: "images/cff03f5d328691b269a9299436f2ee76.avif",
    desc: "11.2\" IPS, 8/256 ГБ, Snapdragon 7+ Gen3, Android 15, Wi-Fi.",
    price: 1799 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1799 + 1000, color: "Green" }
    ],
    defaultMemory: "8GB/256GB"
},



   //honor 
      {
    id: 1262,
    name: "Планшет Honor Pad X9a LTE (ELN2-L29) 8GB/256GB Gray",
    brand: "Honor",
    image: "images/494dfd069ec059df11adb8a86b1e3636.avif",
    desc: "11.5\" IPS, 8/256 ГБ, Snapdragon 685, Android 15, 4G LTE.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 899 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1263,
    name: "Планшет Honor Pad X9a (ELN2-W29) 8GB/256GB Gray",
    brand: "Honor",
    image: "images/494dfd069ec059df11adb8a86b1e3636.avif",
    desc: "11.5\" IPS, 8/256 ГБ, Snapdragon 685, Android 15, Wi-Fi.",
    price: 799 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 799 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1264,
    name: "Планшет Honor Pad X9a (ELN2-W29) 6GB/128GB Gray",
    brand: "Honor",
    image: "images/494dfd069ec059df11adb8a86b1e3636.avif",
    desc: "11.5\" IPS, 6/128 ГБ, Snapdragon 685, Android 15, Wi-Fi.",
    price: 699 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 699 + 1000, color: "Gray" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1265,
    name: "Планшет Honor Pad 10 8GB/256GB 5G HEY3-N09 Gray (5301APED)",
    brand: "Honor",
    image: "images/b6838ff83cc3a868a830df27e60f0f25.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7 Gen3, Android 15, 5G.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1399 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1266,
    name: "Планшет Honor Pad X7 (JMS-L09) 4GB/128GB Gray",
    brand: "Honor",
    image: "images/788a97af63d2f644196fb3876c5c01a7.avif",
    desc: "8.7\" IPS, 4/128 ГБ, Snapdragon 680, Android 15, 4G LTE, 7020 мАч.",
    price: 499 + 1000,
    memoryOptions: [
        { size: "4GB/128GB", price: 499 + 1000, color: "Gray" }
    ],
    defaultMemory: "4GB/128GB"
},
{
    id: 1267,
    name: "Планшет Honor Pad 10 8GB/256GB 5G HEY3-N09 Gray (5301APCK) + клавиатура",
    brand: "Honor",
    image: "images/a37b59d1dfbcd61bc181ad7c584d6d50.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7 Gen3, Android 15, 5G, в комплекте клавиатура.",
    price: 1649 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1649 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1268,
    name: "Планшет Honor Pad 10 8GB/128GB HEY3-W00 Gray (5301ANNW)",
    brand: "Honor",
    image: "images/a37b59d1dfbcd61bc181ad7c584d6d50.avif",
    desc: "12.1\" IPS, 8/128 ГБ, Snapdragon 7 Gen3, Android 15, Wi-Fi.",
    price: 1099 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 1099 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1269,
    name: "Планшет Honor Pad X7 (JMS-W09) 4GB/128GB Gray",
    brand: "Honor",
    image: "images/26ed2210b524e299958e3f4c0d63df63.avif",
    desc: "8.7\" IPS, 4/128 ГБ, Snapdragon 680, Android 15, Wi-Fi, 7020 мАч.",
    price: 449 + 1000,
    memoryOptions: [
        { size: "4GB/128GB", price: 449 + 1000, color: "Gray" }
    ],
    defaultMemory: "4GB/128GB"
},
{
    id: 1270,
    name: "Планшет Honor MagicPad 2 ROD2-W09 12GB/256GB Black (5301AKHW) + клавиатура и стилус",
    brand: "Honor",
    image: "images/636701be07516d773c4b6ea546b739d8.avif",
    desc: "12.3\" OLED, 12/256 ГБ, Snapdragon 8s Gen3, Android 14, Wi-Fi, 10050 мАч, в комплекте клавиатура и стилус.",
    price: 2699 + 1000,
    memoryOptions: [
        { size: "12GB/256GB", price: 2699 + 1000, color: "Black" }
    ],
    defaultMemory: "12GB/256GB"
},
{
    id: 1271,
    name: "Планшет Honor Pad X9a LTE (ELN2-L29) 6GB/128GB Gray",
    brand: "Honor",
    image: "images/e26375e646847467b9c2fc29421a46ab.avif",
    desc: "11.5\" IPS, 6/128 ГБ, Snapdragon 685, Android 15, 4G LTE.",
    price: 799 + 1000,
    memoryOptions: [
        { size: "6GB/128GB", price: 799 + 1000, color: "Gray" }
    ],
    defaultMemory: "6GB/128GB"
},
{
    id: 1272,
    name: "Планшет Honor Pad X8b NDL2-W09 6GB/256GB (космический серый)",
    brand: "Honor",
    image: "images/b66279acf13e7ab5198e14cd934b4ca5 (1).avif",
    desc: "11\" IPS, 6/256 ГБ, Snapdragon 680, Android 16, Wi-Fi, 10100 мАч.",
    price: 799 + 1000,
    memoryOptions: [
        { size: "6GB/256GB", price: 799 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "6GB/256GB"
},
{
    id: 1273,
    name: "Планшет Honor Pad X8b NDL2-W09 4GB/128GB (космический серый)",
    brand: "Honor",
    image: "images/b66279acf13e7ab5198e14cd934b4ca5 (1).avif",
    desc: "11\" IPS, 4/128 ГБ, Snapdragon 680, Android 16, Wi-Fi, 10100 мАч.",
    price: 699 + 1000,
    memoryOptions: [
        { size: "4GB/128GB", price: 699 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "4GB/128GB"
},
{
    id: 1274,
    name: "Планшет HONOR Pad V9 Wi-Fi 8GB/256GB (серый, с чехлом и стилусом)",
    brand: "Honor",
    image: "images/b85dad2d5cee2055ae7e783022c44a72.avif",
    desc: "11.5\" LCD, 8/256 ГБ, MediaTek Dimensity 8350 Elite, Android 15, Wi-Fi, 10100 мАч, в комплекте чехол и стилус.",
    price: 2099 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 2099 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1275,
    name: "Планшет Honor Pad 10 8GB/128GB 5G HEY3-N09 Gray (5301APCJ)",
    brand: "Honor",
    image: "images/923c13f327fdb1a2c4539964ee8a2072.avif",
    desc: "12.1\" IPS, 8/128 ГБ, Snapdragon 7 Gen3, Android 15, 5G.",
    price: 1299 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 1299 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1276,
    name: "Планшет Honor Pad 10 8GB/256GB HEY3-W00 Gray (5301ANNY)",
    brand: "Honor",
    image: "images/923c13f327fdb1a2c4539964ee8a2072.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 7 Gen3, Android 15, Wi-Fi, 10100 мАч.",
    price: 1199 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1199 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1277,
    name: "Планшет Honor Pad 9 5G (HEY2-N09) 8GB/128GB (космический серый)",
    brand: "Honor",
    image: "images/a8ad6fa8067809ba0046e56dc7a8056c.avif",
    desc: "12.1\" IPS, 8/128 ГБ, Snapdragon 6 Gen1, Android 13, 5G.",
    price: 1099 + 1000,
    memoryOptions: [
        { size: "8GB/128GB", price: 1099 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "8GB/128GB"
},
{
    id: 1278,
    name: "Планшет Honor Pad X9 LTE (ELN-L09) 4GB/128GB Space Gray",
    brand: "Honor",
    image: "images/e0e4fd285f77ef6fa1ee136e72097fa8.avif",
    desc: "11.5\" IPS, 4/128 ГБ, Snapdragon 685, Android 13, 4G LTE, 7250 мАч.",
    price: 859 + 1000,
    memoryOptions: [
        { size: "4GB/128GB", price: 859 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "4GB/128GB"
},
{
    id: 1279,
    name: "Планшет Honor Pad X8a (NDL-W09) 4GB/128GB (серый)",
    brand: "Honor",
    image: "images/ee224826f7e6cb1e082b39cedfd3e62b.avif",
    desc: "11\" IPS, 4/128 ГБ, Snapdragon 680, Android 14, Wi-Fi, 8300 мАч.",
    price: 549 + 1000,
    memoryOptions: [
        { size: "4GB/128GB", price: 549 + 1000, color: "Gray" }
    ],
    defaultMemory: "4GB/128GB"
},
{
    id: 1280,
    name: "Планшет Honor Pad X9 LTE (ELN-L09) 4GB/64GB Space Gray",
    brand: "Honor",
    image: "images/267b9e7e7d865bce0446e769b74c589c.avif",
    desc: "11.5\" IPS, 4/64 ГБ, Snapdragon 685, Android 13, 4G LTE.",
    price: 659 + 1000,
    memoryOptions: [
        { size: "4GB/64GB", price: 659 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "4GB/64GB"
},
{
    id: 1281,
    name: "Планшет Honor Pad X8a (NDL-L09) 4GB/64GB LTE Space Grey",
    brand: "Honor",
    image: "images/64674431b810bde4be5ab308ee349ab3.avif",
    desc: "11\" IPS, 4/64 ГБ, Snapdragon 680, Android 14, 4G LTE.",
    price: 699 + 1000,
    memoryOptions: [
        { size: "4GB/64GB", price: 699 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "4GB/64GB"
},
{
    id: 1282,
    name: "Планшет HONOR Pad V9 Wi-Fi 8GB/256GB (серый)",
    brand: "Honor",
    image: "images/9094198b6b18a202c4334d989e831202.avif",
    desc: "11.5\" LCD, 8/256 ГБ, MediaTek Dimensity 8350 Elite, Android 15, Wi-Fi, 10100 мАч.",
    price: 1799 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1799 + 1000, color: "Gray" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1283,
    name: "Планшет HONOR Pad V9 Wi-Fi 8GB/256GB (белый)",
    brand: "Honor",
    image: "images/9094198b6b18a202c4334d989e831202.avif",
    desc: "11.5\" LCD, 8/256 ГБ, MediaTek Dimensity 8350 Elite, Android 15, Wi-Fi.",
    price: 1799 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 1799 + 1000, color: "White" }
    ],
    defaultMemory: "8GB/256GB"
},
{
    id: 1284,
    name: "Планшет Honor Pad X8a (NDL-L09) 4GB/128GB LTE Space Grey",
    brand: "Honor",
    image: "images/60762821cdba71141a8231f89e55d14d.avif",
    desc: "11\" IPS, 4/128 ГБ, Snapdragon 680, Android 14, 4G LTE, 8300 мАч.",
    price: 599 + 1000,
    memoryOptions: [
        { size: "4GB/128GB", price: 599 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "4GB/128GB"
},
{
    id: 1285,
    name: "Планшет Honor Pad 9 (HEY2-W09) Wi-Fi 8GB/256GB (космический серый)",
    brand: "Honor",
    image: "images/79cd3a416259bcf9e5c55f7bfa3512ed.avif",
    desc: "12.1\" IPS, 8/256 ГБ, Snapdragon 6 Gen1, Android 13, Wi-Fi, 8300 мАч.",
    price: 999 + 1000,
    memoryOptions: [
        { size: "8GB/256GB", price: 999 + 1000, color: "Space Gray" }
    ],
    defaultMemory: "8GB/256GB"
},

      
    ],

    vacuums: [
        // === Вертикальные пылесосы (10 моделей разных брендов) ===
      

        // === Dreame (10 моделей) ===
      {
    id: 1487,
    name: "Беспроводной пылесос Dreame Cordless Vacuum Cleaner R10s Pro (VZV23A)",
    brand: "Dreame",
    image: "images/b96449e78c5cc633cc254362d73b46c5.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 425 Вт, аккумулятор, сила всасывания 20 кПа.",
    price: 749 + 1000,
    memoryOptions: [
        { size: "Standard", price: 749 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1488,
    name: "Вертикальный беспроводной моющий пылесос Dreame H13 Pro Plus Mix Wet and Dry Vacuum",
    brand: "Dreame",
    image: "images/fa9cfe6c630bbae64b8fdb5dbbedd918.avif",
    desc: "Моющий, влажная и сухая уборка, контейнер, 250 Вт, аккумулятор, сила всасывания 18 кПа.",
    price: 1269 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1269 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1489,
    name: "Беспроводной пылесос Dreame Cordless Vacuum Cleaner R20 Aqua (VTV21A)",
    brand: "Dreame",
    image: "images/e819c5207cf774597354446f662d9b85.avif",
    desc: "Вертикальный, влажная и сухая уборка, контейнер, 570 Вт, аккумулятор, сила всасывания 27 кПа.",
    price: 1259 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1259 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1490,
    name: "Вертикальный моющий пылесос Dreame H14 Dual Wet and Dry Vacuum (HHV25A)",
    brand: "Dreame",
    image: "images/c4627e205a09a2d17efb82a5d0089885.avif",
    desc: "Вертикальный, всасывание жидкостей, влажная и сухая уборка, контейнер, 380 Вт, аккумулятор, сила всасывания 18 кПа.",
    price: 2275 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2275 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1491,
    name: "Беспроводной пылесос Dreame Cordless Vacuum Cleaner Z20 Aqua Cycle (VZV66A)",
    brand: "Dreame",
    image: "images/41b50da221ddc1691a3f3217fc4b939c.avif",
    desc: "Вертикальный, влажная и сухая уборка, контейнер, 715 Вт, аккумулятор, сила всасывания 25 кПа.",
    price: 1829 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1829 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1492,
    name: "Вертикальный моющий пылесос Dreame H12 Dual FlexReach Wet and Dry Vacuum (HHV31A)",
    brand: "Dreame",
    image: "images/загружено (1).webp",
    desc: "Вертикальный, всасывание жидкостей, влажная и сухая уборка, контейнер, 400 Вт, аккумулятор, сила всасывания 23 кПа.",
    price: 1957 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1957 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1493,
    name: "Беспроводной пылесос для сухой и влажной уборки Dreame G10 Pro Wet and Dry Vacuum (HHR20A)",
    brand: "Dreame",
    image: "images/fe58a79aabf7d3897eafbd04dce4874d.avif",
    desc: "Вертикальный, влажная и сухая уборка, контейнер, 250 Вт, аккумулятор, сила всасывания 16 кПа.",
    price: 649 + 1000,
    memoryOptions: [
        { size: "Standard", price: 649 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1494,
    name: "Беспроводной пылесос для сухой и влажной уборки Dreame G10 Wet and Dry Vacuum (HHR12A)",
    brand: "Dreame",
    image: "images/5f873f578b6dfbf992319880ee518f03.avif",
    desc: "Вертикальный, всасывание жидкостей, влажная и сухая уборка, контейнер, 170 Вт, аккумулятор.",
    price: 590 + 1000,
    memoryOptions: [
        { size: "Standard", price: 590 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1495,
    name: "Вертикальный моющий пылесос Dreame G10 Combo Wet and Dry Vacuum (HHV11A)",
    brand: "Dreame",
    image: "images/8fb3de879d34a96f5b33b8626a766c43.avif",
    desc: "Вертикальный, всасывание жидкостей, влажная и сухая уборка, контейнер, 200 Вт, аккумулятор, сила всасывания 16 кПа.",
    price: 1118 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1118 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1496,
    name: "Вертикальный моющий пылесос Dreame H15 Pro Heat wet and dry Vacuum Cleaner (HHR48A)",
    brand: "Dreame",
    image: "images/c822ac9c930e499d5c763058d3445fd2.avif",
    desc: "Вертикальный, всасывание жидкостей, влажная и сухая уборка, контейнер, 400 Вт, аккумулятор, сила всасывания 22 кПа.",
    price: 1999 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1999 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1497,
    name: "Пылесос Dreame Cordless Vacuum Cleaner Z20 Essential VZV24A",
    brand: "Dreame",
    image: "images/96738e9012f2ba88944af33c7452a3a4.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 540 Вт, аккумулятор, сила всасывания 24 кПа.",
    price: 1343 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1343 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1498,
    name: "Беспроводной пылесос Dreame Cordless Vacuum Cleaner R10s Essential (VZV29A)",
    brand: "Dreame",
    image: "images/fe7aa331ce177b01572160e5c6a953bb.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 310 Вт, аккумулятор, сила всасывания 19 кПа.",
    price: 509 + 1000,
    memoryOptions: [
        { size: "Standard", price: 509 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1499,
    name: "Беспроводной пылесос Dreame Cordless Vacuum Cleaner Z30 Aqua Cycle (VZV77B)",
    brand: "Dreame",
    image: "images/2f79a1c8ad41a8c3a077fc079720fdeb.avif",
    desc: "Вертикальный, всасывание жидкостей, влажная и сухая уборка, контейнер, 855 Вт, аккумулятор, сила всасывания 28 кПа.",
    price: 1899 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1899 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1500,
    name: "Беспроводной пылесос Dreame Cordless Vacuum Cleaner R10s Aqua (VZV25A)",
    brand: "Dreame",
    image: "images/5782466c6e354f2361b55f6165e161b7.avif",
    desc: "Вертикальный, влажная и сухая уборка, контейнер, 350 Вт, аккумулятор.",
    price: 969 + 1000,
    memoryOptions: [
        { size: "Standard", price: 969 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1501,
    name: "Вертикальный моющий пылесос Dreame Cordless Vacuum Cleaner Z20 Aqua Cycle Station (VZV36B)",
    brand: "Dreame",
    image: "images/cf4f8f14091abe97987a456414e3e4fe.avif",
    desc: "Вертикальный, всасывание жидкостей, влажная и сухая уборка, контейнер, 715 Вт, аккумулятор, сила всасывания 25 кПа.",
    price: 2367 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2367 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1502,
    name: "Пылесос Dreame G12 Wet and Dry Vacuum HHR32A",
    brand: "Dreame",
    image: "images/e5f81d1f0f5470b4435b10402574f39e.avif",
    desc: "Вертикальный, всасывание жидкостей, влажная и сухая уборка, контейнер, 315 Вт, аккумулятор, сила всасывания 25 кПа.",
    price: 1399 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1399 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1503,
    name: "Вертикальный моющий пылесос Dreame H12 Pro Flex Reach Wet and Dry Vacuum (HHR44A)",
    brand: "Dreame",
    image: "images/5755be0a4b1662c34701d62a24b6f4a7.avif",
    desc: "Вертикальный, всасывание жидкостей, влажная и сухая уборка, контейнер, 400 Вт, аккумулятор, сила всасывания 18 кПа.",
    price: 1563 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1563 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1504,
    name: "Пылесос Dreame Station Cordless Vacuum Cleaner Z40(VZV33A)",
    brand: "Dreame",
    image: "images/bfa387594f854f3b7fc3ce2298ac0091.avif",
    desc: "Вертикальный, влажная и сухая уборка, контейнер, 855 Вт, аккумулятор.",
    price: 2888 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2888 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},

      
        // === Samsung пылесосы (10 моделей) ===
    {
    id: 1463,
    name: "Пылесос SAMSUNG VC20M251AWB/EV",
    brand: "SAMSUNG",
    image: "images/d435046846a928806495215928a9336f.avif",
    desc: "Стандартный, сухая уборка, мешок, 2000 Вт, сеть.",
    price: 289 + 1000,
    memoryOptions: [
        { size: "Standard", price: 289 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1464,
    name: "Вертикальный пылесос SAMSUNG VS20B75ACR5/EV",
    brand: "SAMSUNG",
    image: "images/6bd149497aecbf454b3fa8a4255f52fb.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 550 Вт, аккумулятор.",
    price: 1097 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1097 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1465,
    name: "Пылесос SAMSUNG VC20M2589JD/EV",
    brand: "SAMSUNG",
    image: "images/c5a0ce9a702497d0991a4f7fb488a7d6.avif",
    desc: "Стандартный, сухая уборка, контейнер/мешок, 2000 Вт, сеть.",
    price: 359 + 1000,
    memoryOptions: [
        { size: "Standard", price: 359 + 1000, color: "Red" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1466,
    name: "Пылесос Samsung Jet 85 Pro VS20C8527TB/EV",
    brand: "SAMSUNG",
    image: "images/82a17f6e14ad14e26a669bfc781788ab.avif",
    desc: "Вертикальный, влажная и сухая уборка, контейнер, 580 Вт, аккумулятор.",
    price: 1376 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1376 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1467,
    name: "Пылесос SAMSUNG VCC885HH3P/XEV",
    brand: "SAMSUNG",
    image: "images/2c2290ee26549189928d3950c8bb7b65.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2200 Вт, сеть.",
    price: 419 + 1000,
    memoryOptions: [
        { size: "Standard", price: 419 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1468,
    name: "Пылесос SAMSUNG VCC8835V37/XEV",
    brand: "SAMSUNG",
    image: "images/003ede68747060163f38aa8dfca3b2e7.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2200 Вт, сеть.",
    price: 379 + 1000,
    memoryOptions: [
        { size: "Standard", price: 379 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1469,
    name: "Вертикальный пылесос SAMSUNG VS20C8522TN/EV",
    brand: "SAMSUNG",
    image: "images/9c234a9d687fbccd5b0328631b9e27b0.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 580 Вт, аккумулятор.",
    price: 1199 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1199 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1470,
    name: "Пылесос SAMSUNG VC18M2150SG/EV",
    brand: "SAMSUNG",
    image: "images/e39adbec76d260a9559d63230b4dba32.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1800 Вт, сеть.",
    price: 319 + 1000,
    memoryOptions: [
        { size: "Standard", price: 319 + 1000, color: "Green" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1471,
    name: "Пылесос SAMSUNG VCC4520S3S/XEV",
    brand: "SAMSUNG",
    image: "images/17726cf0b32548a733515933eb5d322d.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1600 Вт, сеть.",
    price: 233 + 1000,
    memoryOptions: [
        { size: "Standard", price: 233 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1472,
    name: "Пылесос SAMSUNG VCC4520S36/XEV",
    brand: "SAMSUNG",
    image: "images/cf4cb306ad938bbe2bb54528feb9df50.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1600 Вт, сеть.",
    price: 229 + 1000,
    memoryOptions: [
        { size: "Standard", price: 229 + 1000, color: "Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1473,
    name: "Пылесос SAMSUNG VC18M31A0HP/EV",
    brand: "SAMSUNG",
    image: "images/04bb7c344ac1a97e5ee2fb51c8423913.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1800 Вт, сеть.",
    price: 359 + 1000,
    memoryOptions: [
        { size: "Standard", price: 359 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1474,
    name: "Пылесос SAMSUNG VC21K5170HG/EV",
    brand: "SAMSUNG",
    image: "images/5214ccdb2caccb7028afd2190245b79e.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2100 Вт, сеть.",
    price: 519 + 1000,
    memoryOptions: [
        { size: "Standard", price: 519 + 1000, color: "Red" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1475,
    name: "Пылесос SAMSUNG VS80F28DLP/EV",
    brand: "SAMSUNG",
    image: "images/0207e8bbad8d3805b9b77393649a9f22.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 770 Вт, аккумулятор.",
    price: 2199 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2199 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1476,
    name: "Пылесос SAMSUNG VCC4581V3K/XEV",
    brand: "SAMSUNG",
    image: "images/4fded3aecd2f7eb7c9d0f5ed09901f7b.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 279 + 1000,
    memoryOptions: [
        { size: "Standard", price: 279 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1477,
    name: "Пылесос SAMSUNG VC18M2110SB/EV",
    brand: "SAMSUNG",
    image: "images/cd3f2a4a679f3eba0d12702dd25f3cac.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1800 Вт, сеть.",
    price: 296 + 1000,
    memoryOptions: [
        { size: "Standard", price: 296 + 1000, color: "Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1478,
    name: "Пылесос SAMSUNG VC18M21C0VR/EV",
    brand: "SAMSUNG",
    image: "images/7656c09ff234eae1a49650190222ff68.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1800 Вт, сеть.",
    price: 334 + 1000,
    memoryOptions: [
        { size: "Standard", price: 334 + 1000, color: "Red" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1479,
    name: "Пылесос Samsung VCC8837V3P/XEV",
    brand: "SAMSUNG",
    image: "images/0b6cd799bec74c1bde92ac047cd53b99.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2200 Вт, сеть.",
    price: 379 + 1000,
    memoryOptions: [
        { size: "Standard", price: 379 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1480,
    name: "Пылесос SAMSUNG VCC5241S3K/XEV",
    brand: "SAMSUNG",
    image: "images/d64733811d28bf5eae5576b1147c1c1f.avif",
    desc: "Стандартный, сухая уборка, мешок, 1800 Вт, сеть.",
    price: 256 + 1000,
    memoryOptions: [
        { size: "Standard", price: 256 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1481,
    name: "Пылесос SAMSUNG VCC4140V3A/XEV",
    brand: "SAMSUNG",
    image: "images/be5e21d6e3bf45e15d4236783663b2cb.avif",
    desc: "Стандартный, сухая уборка, мешок, 1600 Вт, сеть.",
    price: 239 + 1000,
    memoryOptions: [
        { size: "Standard", price: 239 + 1000, color: "Blue" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1482,
    name: "Пылесос SAMSUNG VCC5251V3R/XEV",
    brand: "SAMSUNG",
    image: "images/1a8cf1906213fb552c4672952ee34b73.avif",
    desc: "Стандартный, сухая уборка, мешок, 1800 Вт, сеть.",
    price: 275 + 1000,
    memoryOptions: [
        { size: "Standard", price: 275 + 1000, color: "Red" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1483,
    name: "Пылесос SAMSUNG VC18M21A0SB/EV",
    brand: "SAMSUNG",
    image: "images/708f375f508c5759fab34760924ef579.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1800 Вт, сеть.",
    price: 310 + 1000,
    memoryOptions: [
        { size: "Standard", price: 310 + 1000, color: "Silver" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1484,
    name: "Пылесос SAMSUNG VS90F40DEK/EV",
    brand: "SAMSUNG",
    image: "images/7b76b8cca07035662c260e1c4890cd5c.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 1050 Вт, аккумулятор.",
    price: 2999 + 1000,
    memoryOptions: [
        { size: "Standard", price: 2999 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1485,
    name: "Пылесос SAMSUNG VC15K4116VR/EV",
    brand: "SAMSUNG",
    image: "images/1b4b47a953742b1efdc11223fc81ed98.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1500 Вт, сеть.",
    price: 399 + 1000,
    memoryOptions: [
        { size: "Standard", price: 399 + 1000, color: "Red" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1486,
    name: "Пылесос SAMSUNG VC18M31B0HN/EV",
    brand: "SAMSUNG",
    image: "images/5aea3fef7ba559103d7ca0e2c9cf360f.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1800 Вт, сеть.",
    price: 360 + 1000,
    memoryOptions: [
        { size: "Standard", price: 360 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},

        // === Karcher (10 моделей) ===
      {
    id: 1439,
    name: "Пылесос Karcher SE 4 Plus 1.081-170.0",
    brand: "Karcher",
    image: "images/0c2cec60367f83be1b301db11fb78d53.avif",
    desc: "Моющий, всасывание жидкостей, влажная и сухая уборка, контейнер, 1000 Вт, сеть.",
    price: 762 + 1000,
    memoryOptions: [
        { size: "Standard", price: 762 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1440,
    name: "Пылесос Karcher VC 3 (1.198-051.0)",
    brand: "Karcher",
    image: "images/65a844f6dd980512a589ea7d51b4f28e.avif",
    desc: "Стандартный, сухая уборка, контейнер, 700 Вт, сеть.",
    price: 312 + 1000,
    memoryOptions: [
        { size: "Standard", price: 312 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1441,
    name: "Пылесос Karcher WD 3 V-17/4/20 1.628-130.0",
    brand: "Karcher",
    image: "images/a04f6fad30f9c5138c29296b29004b1e.avif",
    desc: "Промышленный, всасывание жидкостей и сухая уборка, контейнер/мешок, 1000 Вт, сеть.",
    price: 227 + 1000,
    memoryOptions: [
        { size: "Standard", price: 227 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1442,
    name: "Пылесос Karcher KWD 3 S V-17/4/20 Anniversary Edition 1.628-449.0",
    brand: "Karcher",
    image: "images/21c935dfec33db2ba0dd02febce182d6.avif",
    desc: "Промышленный, всасывание жидкостей и сухая уборка, контейнер/мешок, 1000 Вт, сеть.",
    price: 271 + 1000,
    memoryOptions: [
        { size: "Standard", price: 271 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1443,
    name: "Промышленный пылесос KARCHER WD 3 (1.628-190.0)",
    brand: "Karcher",
    image: "images/a4bc858848db89085881d03ad4dbcd8d.avif",
    desc: "Промышленный, всасывание жидкостей и сухая уборка, контейнер/мешок, 1000 Вт, сеть.",
    price: 345 + 1000,
    memoryOptions: [
        { size: "Standard", price: 345 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1444,
    name: "Пылесос Karcher CVH 2 1.198-330.0",
    brand: "Karcher",
    image: "images/13c713f7756692a0d5d0ec8e5ef1138f.avif",
    desc: "Портативный, сухая уборка, контейнер, 70 Вт, аккумулятор.",
    price: 138 + 1000,
    memoryOptions: [
        { size: "Standard", price: 138 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1445,
    name: "Пылесос Karcher WD 3 P V-17/4/20 1.628-170.0",
    brand: "Karcher",
    image: "images/4afc59ca357115d83bc77064d01479f3.avif",
    desc: "Промышленный, всасывание жидкостей и сухая уборка, контейнер/мешок, 1000 Вт, сеть.",
    price: 304 + 1000,
    memoryOptions: [
        { size: "Standard", price: 304 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1446,
    name: "Пылесос моющий KARCHER SE 6 Signature Line (1.081-190.0)",
    brand: "Karcher",
    image: "images/8f279f3b39480d51a993e3c6685e6741.avif",
    desc: "Моющий, всасывание жидкостей, влажная и сухая уборка, контейнер, 1000 Вт, сеть.",
    price: 987 + 1000,
    memoryOptions: [
        { size: "Standard", price: 987 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1447,
    name: "Пылесос моющий KARCHER 1.081-150.0 SE 4",
    brand: "Karcher",
    image: "images/ab0916e22195d873f696c8c721c83681.avif",
    desc: "Моющий, всасывание жидкостей, влажная и сухая уборка, контейнер, 1000 Вт, сеть.",
    price: 665 + 1000,
    memoryOptions: [
        { size: "Standard", price: 665 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1448,
    name: "Пылесос Karcher SE 3 Compact Home 1.081-530.0",
    brand: "Karcher",
    image: "images/6592da188ac9cdf7987c15507fa3e9f7.avif",
    desc: "Моющий, всасывание жидкостей, влажная уборка, контейнер, 500 Вт, сеть.",
    price: 521 + 1000,
    memoryOptions: [
        { size: "Standard", price: 521 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1449,
    name: "Пылесос Karcher FCV 4 Natural N 1.056-133.0",
    brand: "Karcher",
    image: "images/ea023c0e33e5ff48b6d8d49e70ca7398.avif",
    desc: "Вертикальный, всасывание жидкостей, влажная уборка, контейнер, 180 Вт, аккумулятор.",
    price: 915 + 1000,
    memoryOptions: [
        { size: "Standard", price: 915 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1450,
    name: "Пылесос моющий KARCHER 1.081-533.0 SE 3 Compact Floor *EU",
    brand: "Karcher",
    image: "images/dee3967821383b2c3813084fd73641f0.avif",
    desc: "Моющий, влажная уборка, контейнер, 500 Вт, сеть.",
    price: 594 + 1000,
    memoryOptions: [
        { size: "Standard", price: 594 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1451,
    name: "Пылесос Karcher CVH 3 Plus 1.198-350.0",
    brand: "Karcher",
    image: "images/c282394ffd083ad5fcf4f0d41d2d81fb.avif",
    desc: "Портативный, сухая уборка, контейнер, 70 Вт, аккумулятор.",
    price: 239 + 1000,
    memoryOptions: [
        { size: "Standard", price: 239 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1452,
    name: "Пылесос сухой и влажной уборки KARCHER WD 4 S V-20/5/22 (1.628-260.0)",
    brand: "Karcher",
    image: "images/6b92483d30240d7cd2a1ffb2f8c259e4.avif",
    desc: "Промышленный, всасывание жидкостей и сухая уборка, контейнер/мешок, 1000 Вт, сеть.",
    price: 395 + 1000,
    memoryOptions: [
        { size: "Standard", price: 395 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1453,
    name: "Пылесос KARCHER VC 2 1.198-030.0",
    brand: "Karcher",
    image: "images/02929d709e8c5d81cc725d46d9b22ca2.avif",
    desc: "Стандартный, сухая уборка, контейнер/мешок, 1100 Вт, сеть.",
    price: 270 + 1000,
    memoryOptions: [
        { size: "Standard", price: 270 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1454,
    name: "Электрошвабра Karcher FC 7 Cordless Plus (1.055-710.0)",
    brand: "Karcher",
    image: "images/65ea7bbcd0421b185b0eaee4e6d48461.avif",
    desc: "Электрошвабра, всасывание жидкостей, влажная уборка, контейнер, аккумулятор.",
    price: 1724 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1724 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1455,
    name: "Пылесос Karcher WD 3 S V-17/4/20 1.628-135.0",
    brand: "Karcher",
    image: "images/ded42055390586bad73b467326608b62.avif",
    desc: "Промышленный, всасывание жидкостей и сухая уборка, контейнер/мешок, 1000 Вт, сеть.",
    price: 272 + 1000,
    memoryOptions: [
        { size: "Standard", price: 272 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1456,
    name: "Пылесос Karcher WD 3 V-17/6/20 CAR 1.628-115.0",
    brand: "Karcher",
    image: "images/1d8306feea5d07123f83a78aebf588a7.avif",
    desc: "Промышленный, всасывание жидкостей, контейнер/мешок, 1000 Вт, сеть.",
    price: 285 + 1000,
    memoryOptions: [
        { size: "Standard", price: 285 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1457,
    name: "Пылесос KARCHER VC 3 Plus (1.198-050.0)",
    brand: "Karcher",
    image: "images/aa78e8f6ead739cc3af7af75e2194e80.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1100 Вт, сеть.",
    price: 286 + 1000,
    memoryOptions: [
        { size: "Standard", price: 286 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1458,
    name: "Пылесос сухой уборки Karcher VC 6 Cordless ourFamily Battery Plus*EU (1.198-677.0)",
    brand: "Karcher",
    image: "images/2bba6ea3d930bd03ace2b70adde2337a.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 250 Вт, аккумулятор.",
    price: 799 + 1000,
    memoryOptions: [
        { size: "Standard", price: 799 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1459,
    name: "Промышленный пылесос KARCHER WD 2 Plus (1.628-000.0)",
    brand: "Karcher",
    image: "images/ba4f13a48d335bb77415982362936a42.avif",
    desc: "Промышленный, всасывание жидкостей и сухая уборка, контейнер/мешок, 1000 Вт, сеть.",
    price: 195 + 1000,
    memoryOptions: [
        { size: "Standard", price: 195 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1460,
    name: "Пылесос KARCHER WD 3 V-17/4/20 *EU 1.628-127.0",
    brand: "Karcher",
    image: "images/0ab7bc53196333fb2bec3ab1713ef8c3.avif",
    desc: "Промышленный, всасывание жидкостей и сухая уборка, контейнер/мешок, 1000 Вт, сеть.",
    price: 228 + 1000,
    memoryOptions: [
        { size: "Standard", price: 228 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1461,
    name: "Пылесос KARCHER VC 3 Floor (1.198-059.0)",
    brand: "Karcher",
    image: "images/a96a55b072d460302eb9660e8a8da8b7.avif",
    desc: "Стандартный, сухая уборка, контейнер, 700 Вт, сеть.",
    price: 402 + 1000,
    memoryOptions: [
        { size: "Standard", price: 402 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1462,
    name: "Паропылесос Karcher SV 7 1.439-490.0",
    brand: "Karcher",
    image: "images/5ae5cf5c6074ea0a09638561e14e6c6e.avif",
    desc: "Паровой, паровая уборка, аквафильтр, 2200 Вт, сеть.",
    price: 1881 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1881 + 1000, color: "Yellow" }
    ],
    defaultMemory: "Standard"
},

        // === LG пылесосы (10 моделей) ===
{
    id: 1417,
    name: "Пылесос LG CordZero A9N-CORE",
    brand: "LG",
    image: "images/1f399c0f19eeaa65c3960122adf30aee.avif",
    desc: "Вертикальный, сухая уборка, контейнер, аккумулятор.",
    price: 821 + 1000,
    memoryOptions: [
        { size: "Standard", price: 821 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1418,
    name: "Пылесос LG A9N-Masterx",
    brand: "LG",
    image: "images/e9ff1d8efcf3f005310120dcd1993b91.avif",
    desc: "Вертикальный, влажная и сухая уборка, контейнер, 450 Вт, аккумулятор.",
    price: 1122 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1122 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1419,
    name: "Пылесос LG CordZero A9K-PRO1",
    brand: "LG",
    image: "images/23167c6fb0d1fa87627d1e4ea8b6bab9.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 590 Вт, аккумулятор.",
    price: 1346 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1346 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1420,
    name: "Пылесос LG VC5420NHTG",
    brand: "LG",
    image: "images/b15aff6fde3a8116106807658b261ba6.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 329 + 1000,
    memoryOptions: [
        { size: "Standard", price: 329 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1421,
    name: "Пылесос LG VC73188NELR",
    brand: "LG",
    image: "images/bd41339542367382994d369cd9cc83ac.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1800 Вт, сеть.",
    price: 398 + 1000,
    memoryOptions: [
        { size: "Standard", price: 398 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1422,
    name: "Пылесос LG VC83209UHAS",
    brand: "LG",
    image: "images/941fbe4ec3a64ec2593d558012c777ac.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 479 + 1000,
    memoryOptions: [
        { size: "Standard", price: 479 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1423,
    name: "Пылесос LG VK69662N",
    brand: "LG",
    image: "images/b3ff356855ca25bc2b8120e65dcdc92f.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1600 Вт, сеть.",
    price: 239 + 1000,
    memoryOptions: [
        { size: "Standard", price: 239 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1424,
    name: "Пылесос LG VK89309H",
    brand: "LG",
    image: "images/896031b9f79a2a392d684dfec38c8b75.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 434 + 1000,
    memoryOptions: [
        { size: "Standard", price: 434 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1425,
    name: "Пылесос LG VC83209UHA",
    brand: "LG",
    image: "images/72fac6ac57bc7bdfdcf2ada641209a5d.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 480 + 1000,
    memoryOptions: [
        { size: "Standard", price: 480 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1426,
    name: "Пылесос LG VC5420NNTS",
    brand: "LG",
    image: "images/f97be2bc4eba4103777057661810dd8e.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 299 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1427,
    name: "Пылесос LG VC5320NNTR",
    brand: "LG",
    image: "images/f56cc6ce2f8cd4138855f81efe2636ff.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 299 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1428,
    name: "Пылесос LG VK89383HU",
    brand: "LG",
    image: "images/ad1f3dda488f8a82f80032dd08a71d38.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1800 Вт, сеть.",
    price: 443 + 1000,
    memoryOptions: [
        { size: "Standard", price: 443 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1429,
    name: "Пылесос LG VC83109UHAQ",
    brand: "LG",
    image: "images/398e4bd7b406ab8690ccbdac5921b27d.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 544 + 1000,
    memoryOptions: [
        { size: "Standard", price: 544 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1430,
    name: "Пылесос LG VC5316NNDR",
    brand: "LG",
    image: "images/e0412aac450234f4c2631108d250aef3.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1600 Вт, сеть.",
    price: 256 + 1000,
    memoryOptions: [
        { size: "Standard", price: 256 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1431,
    name: "Пылесос LG VC5420NHTCG",
    brand: "LG",
    image: "images/498125de5d15e18189fbbbaa5b5a8ba2.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 342 + 1000,
    memoryOptions: [
        { size: "Standard", price: 342 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1432,
    name: "Пылесос LG VC5420NHTW",
    brand: "LG",
    image: "images/47665bc607192998c9a67ee2cc5f3dd8.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 329 + 1000,
    memoryOptions: [
        { size: "Standard", price: 329 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1433,
    name: "Пылесос LG VC5420NNTG",
    brand: "LG",
    image: "images/696fa253234339b9332d4353112b19a4.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 299 + 1000,
    memoryOptions: [
        { size: "Standard", price: 299 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1434,
    name: "Пылесос LG VC73189NHTS",
    brand: "LG",
    image: "images/5ac0f176347786d42c6ce6ab4bf9f5a4.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1800 Вт, сеть.",
    price: 378 + 1000,
    memoryOptions: [
        { size: "Standard", price: 378 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1435,
    name: "Пылесос LG VK89609HQ",
    brand: "LG",
    image: "images/db66da8551b51b7d35918c975550d118.avif",
    desc: "Стандартный, сухая уборка, контейнер, 2000 Вт, сеть.",
    price: 599 + 1000,
    memoryOptions: [
        { size: "Standard", price: 599 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1436,
    name: "Пылесос LG VC5316NNTR",
    brand: "LG",
    image: "images/b815ebd88edf17dddac818f7bde8e556.avif",
    desc: "Стандартный, сухая уборка, контейнер, 1600 Вт, сеть.",
    price: 259 + 1000,
    memoryOptions: [
        { size: "Standard", price: 259 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1437,
    name: "Пылесос LG A9LSLIM",
    brand: "LG",
    image: "images/dc5f0f243a1fb9f23826dc88e948686e.avif",
    desc: "Вертикальный, сухая уборка, контейнер, аккумулятор.",
    price: 711 + 1000,
    memoryOptions: [
        { size: "Standard", price: 711 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1438,
    name: "Пылесос вертикальный LG A9N-SOLO",
    brand: "LG",
    image: "images/33c5610a1aae60e6c3ede72719a224d1.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 480 Вт, аккумулятор.",
    price: 749 + 1000,
    memoryOptions: [
        { size: "Standard", price: 749 + 1000, color: "Gray" }
    ],
    defaultMemory: "Standard"
},

        // === Xiaomi пылесосы (10 моделей) ===
      {
    id: 1412,
    name: "Вертикальный моющий пылесос Xiaomi Truclean W20 Wet Dry Vacuum BHR8833EU (C305HW)",
    brand: "Xiaomi",
    image: "images/f98e87fa88505c32325468f1ea050b0c.avif",
    desc: "Вертикальный, влажная и сухая уборка, всасывание жидкостей, контейнер, 200 Вт, аккумулятор, сила всасывания 15 кПа.",
    price: 599 + 1000,
    memoryOptions: [
        { size: "Standard", price: 599 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1413,
    name: "Пылесос Xiaomi Vacuum Cleaner G20 Max (D206) (BHR8828EU)",
    brand: "Xiaomi",
    image: "images/7aa87a0552815c2f8b84972b00c275ff.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 520 Вт, аккумулятор, сила всасывания 25 кПа.",
    price: 830 + 1000,
    memoryOptions: [
        { size: "Standard", price: 830 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1414,
    name: "Пылесос Xiaomi Vacuum Cleaner G20 BHR8831EU (D205)",
    brand: "Xiaomi",
    image: "images/c3dc9c0d4b16a1ee3d671c8640f610e0.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 460 Вт, аккумулятор, сила всасывания 25 кПа.",
    price: 657 + 1000,
    memoryOptions: [
        { size: "Standard", price: 657 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1415,
    name: "Пылесос Xiaomi Truclean W30 Pro Wet Dry Vacuum E303HW (BHR08GYEU)",
    brand: "Xiaomi",
    image: "images/411b9f6a1a4352d25997b96cf109995f.avif",
    desc: "Вертикальный, влажная и сухая уборка, всасывание жидкостей, контейнер, 300 Вт, аккумулятор, сила всасывания 18 кПа.",
    price: 1065 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1065 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1416,
    name: "Пылесос Xiaomi Vacuum Cleaner G30 Max E203 (BHR08C6EU)",
    brand: "Xiaomi",
    image: "images/a65e0e88361a494998b348847eda87c0.avif",
    desc: "Вертикальный, сухая уборка, контейнер, 700 Вт, аккумулятор, сила всасывания 25 кПа.",
    price: 1199 + 1000,
    memoryOptions: [
        { size: "Standard", price: 1199 + 1000, color: "White" }
    ],
    defaultMemory: "Standard"
},

    ],
    airfryers: [
        // Xiaomi (10 моделей)
      {
    id: 1405,
    name: "Аэрогриль Xiaomi Dual Zone Air Fryer 10L (Black) (MAF-D1001) BHR07SGEU",
    brand: "XIAOMI",
    image: "images/0b1d6d6aadb54d106eecc285dca87fb4 (1).avif",
    desc: "3.5 л + 6.5 л, 2700 Вт, 2 нагревательных элемента, 2 чаши.",
    price: 599 + 1000,
    memoryOptions: [
        { size: "3.5L+6.5L", price: 599 + 1000, color: "Black" }
    ],
    defaultMemory: "3.5L+6.5L"
},
{
    id: 1406,
    name: "Аэрогриль XIAOMI Air Fryer 6.5 L BHR083NEU (MAF-W6501) Black",
    brand: "XIAOMI",
    image: "images/2f2c96f8b2e10445f53eba1fe53f041a (1).avif",
    desc: "6.5 л, 1700 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 359 + 1000,
    memoryOptions: [
        { size: "6.5L", price: 359 + 1000, color: "Black" }
    ],
    defaultMemory: "6.5L"
},
{
    id: 1407,
    name: "Аэрогриль XIAOMI Air Fryer 6.5 L BHR083MEU (MAF-W6501) White",
    brand: "XIAOMI",
    image: "images/c3de92ce1c64946d804aa0d60ec32efe (1).avif",
    desc: "6.5 л, 1700 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 359 + 1000,
    memoryOptions: [
        { size: "6.5L", price: 359 + 1000, color: "White" }
    ],
    defaultMemory: "6.5L"
},
{
    id: 1408,
    name: "Аэрогриль XIAOMI Smart Double Stack Air Fryer 12L BHR0883EU (MAF-DS1201)",
    brand: "XIAOMI",
    image: "images/3c2cda1e011affedddfa1a9add9f2cce (1).avif",
    desc: "6 л, 2800 Вт, 2 нагревательных элемента, 2 чаши.",
    price: 699 + 1000,
    memoryOptions: [
        { size: "6L", price: 699 + 1000, color: "Black" }
    ],
    defaultMemory: "6L"
},
{
    id: 1409,
    name: "Аэрофритюрница Xiaomi Smart Air Fryer 6.5L White (MAF10) BHR7358EU",
    brand: "XIAOMI",
    image: "images/cf454c96f32a7b2bfcd710af1fcbbe1e.avif",
    desc: "6.5 л, 1800 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 489 + 1000,
    memoryOptions: [
        { size: "6.5L", price: 489 + 1000, color: "White" }
    ],
    defaultMemory: "6.5L"
},
{
    id: 1410,
    name: "Аэрогриль Xiaomi Air Fryer Essential 6L BHR8588EU (MAF13)",
    brand: "XIAOMI",
    image: "images/4f5f75c20e19fea13e87d1aabec1eb76.avif",
    desc: "6 л, 1550 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 329 + 1000,
    memoryOptions: [
        { size: "6L", price: 329 + 1000, color: "Black" }
    ],
    defaultMemory: "6L"
},
{
    id: 1411,
    name: "Аэрофритюрница Xiaomi Smart Air Fryer 6.5L Black (MAF10) BHR7357EU",
    brand: "XIAOMI",
    image: "images/835bde3d830b9871cbeccf5a0fcde159.avif",
    desc: "6.5 л, 1800 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 489 + 1000,
    memoryOptions: [
        { size: "6.5L", price: 489 + 1000, color: "Black" }
    ],
    defaultMemory: "6.5L"
},

        // TEFAL (10 моделей)
      {
    id: 1387,
    name: "Аэрогриль TEFAL EY505D15",
    brand: "TEFAL",
    image: "images/fc40db33f3e0555a36bdfaa7ebf192e8.avif",
    desc: "4.2 л, 1550 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 549 + 1000,
    memoryOptions: [
        { size: "4.2L", price: 549 + 1000, color: "Black" }
    ],
    defaultMemory: "4.2L"
},
{
    id: 1388,
    name: "Аэрогриль TEFAL EY145810",
    brand: "TEFAL",
    image: "images/529103304c44d909d08158d2dd8a0f87.avif",
    desc: "3 л, 1300 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 399 + 1000,
    memoryOptions: [
        { size: "3L", price: 399 + 1000, color: "Black" }
    ],
    defaultMemory: "3L"
},
{
    id: 1389,
    name: "Аэрогриль Tefal EY9228E0",
    brand: "TEFAL",
    image: "images/0f3e6a5270d4aaef1a3ab582a61f4452.avif",
    desc: "9 л, 2700 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "9L", price: 899 + 1000, color: "Black" }
    ],
    defaultMemory: "9L"
},
{
    id: 1390,
    name: "Аэрогриль TEFAL EY245AE0",
    brand: "TEFAL",
    image: "images/2bf033445b83fd8d1c7cea7929c4bdbb.avif",
    desc: "5 л, 1550 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 519 + 1000,
    memoryOptions: [
        { size: "5L", price: 519 + 1000, color: "Black" }
    ],
    defaultMemory: "5L"
},
{
    id: 1391,
    name: "Аэрогриль Tefal Easy Fry Infrared EY831GE0",
    brand: "TEFAL",
    image: "images/a17437672fb78b677aa249e00071fb01.avif",
    desc: "7 л, 2200 Вт, 2 нагревательных элемента, 1 чаша.",
    price: 839 + 1000,
    memoryOptions: [
        { size: "7L", price: 839 + 1000, color: "Gray" }
    ],
    defaultMemory: "7L"
},
{
    id: 1392,
    name: "Аэрогриль Tefal Dual Easy Fry & Grill EY905D",
    brand: "TEFAL",
    image: "images/73daf29d852a09a25bdd82b0917093e1.avif",
    desc: "3.1 л + 5.2 л, 2700 Вт, 2 нагревательных элемента, 2 чаши.",
    price: 987 + 1000,
    memoryOptions: [
        { size: "3.1L+5.2L", price: 987 + 1000, color: "Black" }
    ],
    defaultMemory: "3.1L+5.2L"
},
{
    id: 1393,
    name: "Аэрогриль Tefal Easy Fry & Grill XXL Inox EY801D15",
    brand: "TEFAL",
    image: "images/dfdaf60520fbefd919c46198366eba84.avif",
    desc: "6.5 л, 1830 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 832 + 1000,
    memoryOptions: [
        { size: "6.5L", price: 832 + 1000, color: "Silver" }
    ],
    defaultMemory: "6.5L"
},
{
    id: 1394,
    name: "Аэрогриль TEFAL EY8328E0",
    brand: "TEFAL",
    image: "images/1b67cfaa7a19bc53798639d3d60533a7.avif",
    desc: "7 л, 2200 Вт, 1 чаша.",
    price: 839 + 1000,
    memoryOptions: [
        { size: "7L", price: 839 + 1000, color: "Black" }
    ],
    defaultMemory: "7L"
},
{
    id: 1395,
    name: "Аэрогриль TEFAL EY832HE0",
    brand: "TEFAL",
    image: "images/3b47bdc464bfcf3bdc45cc5bbcfdc27f.avif",
    desc: "7 л, 2200 Вт, 1 чаша.",
    price: 945 + 1000,
    memoryOptions: [
        { size: "7L", price: 945 + 1000, color: "Black" }
    ],
    defaultMemory: "7L"
},
{
    id: 1396,
    name: "Аэрогриль TEFAL EY401D15",
    brand: "TEFAL",
    image: "images/af66930916d3e31a63c46231092293d0.avif",
    desc: "4.2 л, 1500 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 469 + 1000,
    memoryOptions: [
        { size: "4.2L", price: 469 + 1000, color: "Black" }
    ],
    defaultMemory: "4.2L"
},
{
    id: 1397,
    name: "Аэрогриль Tefal EY111B15",
    brand: "TEFAL",
    image: "images/fb5b2a2c203bb1c1ab6354fa432fa02d.avif",
    desc: "4.2 л, 1400 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 445 + 1000,
    memoryOptions: [
        { size: "4.2L", price: 445 + 1000, color: "Black" }
    ],
    defaultMemory: "4.2L"
},
{
    id: 1398,
    name: "Аэрогриль TEFAL EY245B10",
    brand: "TEFAL",
    image: "images/d9bc2afcb7075f211c7c25498f0e0799.avif",
    desc: "5 л, 1500 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 534 + 1000,
    memoryOptions: [
        { size: "5L", price: 534 + 1000, color: "Black" }
    ],
    defaultMemory: "5L"
},
{
    id: 1399,
    name: "Аэрогриль TEFAL EY9428E0",
    brand: "TEFAL",
    image: "images/69f89ef5ffd5cbd02c857415f54fde76.avif",
    desc: "4.5 л + 6.5 л, 2700 Вт, 2 чаши.",
    price: 1581 + 1000,
    memoryOptions: [
        { size: "4.5L+6.5L", price: 1581 + 1000, color: "Black" }
    ],
    defaultMemory: "4.5L+6.5L"
},
{
    id: 1400,
    name: "Аэрогриль TEFAL Easy Fry Silence EY5568E0",
    brand: "TEFAL",
    image: "images/9567ffc766fa80f324085c3d63f1cec3.avif",
    desc: "5 л, 1670 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 899 + 1000,
    memoryOptions: [
        { size: "5L", price: 899 + 1000, color: "Black" }
    ],
    defaultMemory: "5L"
},
{
    id: 1401,
    name: "Аэрогриль TEFAL EY245GE0",
    brand: "TEFAL",
    image: "images/682d1a018379bcc29ca7368c67925ffc.avif",
    desc: "5 л, 1500 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 559 + 1000,
    memoryOptions: [
        { size: "5L", price: 559 + 1000, color: "Gray" }
    ],
    defaultMemory: "5L"
},
{
    id: 1402,
    name: "Аэрогриль TEFAL EY5528E0",
    brand: "TEFAL",
    image: "images/620fb41f03af7365d24f15469624e6de.avif",
    desc: "5 л, 1400 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 744 + 1000,
    memoryOptions: [
        { size: "5L", price: 744 + 1000, color: "Black" }
    ],
    defaultMemory: "5L"
},
{
    id: 1403,
    name: "Аэрогриль Tefal Easy Fry Far-Infrared Vision EY8218F0",
    brand: "TEFAL",
    image: "images/41bdc6108820ff0a17cffce473857c32.avif",
    desc: "6 л, 1835 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 579 + 1000,
    memoryOptions: [
        { size: "6L", price: 579 + 1000, color: "Black" }
    ],
    defaultMemory: "6L"
},
{
    id: 1404,
    name: "Аэрогриль TEFAL EY5728E1",
    brand: "TEFAL",
    image: "images/f67f84cb5215cbc9c7f78bc754dc322d.avif",
    desc: "5 л, 1400 Вт, 1 чаша.",
    price: 1204 + 1000,
    memoryOptions: [
        { size: "5L", price: 1204 + 1000, color: "Black" }
    ],
    defaultMemory: "5L"
},

        // KITFORT (10 моделей)
     {
    id: 1363,
    name: "Аэрогриль Kitfort KT-2284",
    brand: "KITFORT",
    image: "images/ceaf2632c8e858cb191293ee717b9914.avif",
    desc: "1800 Вт.",
    price: 269 + 1000,
    memoryOptions: [
        { size: "Standard", price: 269 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1364,
    name: "Аэрогриль Kitfort KT-2239",
    brand: "KITFORT",
    image: "images/39d25b7177efd3f8342590ee090ef32b (1).avif",
    desc: "4.5 л, 1700 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 359 + 1000,
    memoryOptions: [
        { size: "4.5L", price: 359 + 1000, color: "Black" }
    ],
    defaultMemory: "4.5L"
},
{
    id: 1365,
    name: "Аэрогриль KITFORT КТ-8107",
    brand: "KITFORT",
    image: "images/22de3a0e24e85a17c6f50a3fabb964e6 (1).avif",
    desc: "6.5 л, 1350 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 269 + 1000,
    memoryOptions: [
        { size: "6.5L", price: 269 + 1000, color: "Black" }
    ],
    defaultMemory: "6.5L"
},
{
    id: 1366,
    name: "Аэрогриль Kitfort КТ-8159",
    brand: "KITFORT",
    image: "images/1b7a83ac8000d4f25ffc8652184fca16.avif",
    desc: "7 л, 1800 Вт, 1 чаша.",
    price: 384 + 1000,
    memoryOptions: [
        { size: "7L", price: 384 + 1000, color: "Black" }
    ],
    defaultMemory: "7L"
},
{
    id: 1367,
    name: "Аэрогриль Kitfort KT-2222",
    brand: "KITFORT",
    image: "images/b33e6aeb138fc6bd53e482b90add1f13.avif",
    desc: "3.3 л, 1500 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 230 + 1000,
    memoryOptions: [
        { size: "3.3L", price: 230 + 1000, color: "Black" }
    ],
    defaultMemory: "3.3L"
},
{
    id: 1368,
    name: "Аэрогриль Kitfort KT-2215",
    brand: "KITFORT",
    image: "images/1a1675b910cd05a47330c7476c0fd30d.avif",
    desc: "4.5 л, 1500 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 384 + 1000,
    memoryOptions: [
        { size: "4.5L", price: 384 + 1000, color: "Black" }
    ],
    defaultMemory: "4.5L"
},
{
    id: 1369,
    name: "Аэрогриль Kitfort KT-2220",
    brand: "KITFORT",
    image: "images/167702be6e6d174098be06ddcd16c858.avif",
    desc: "6 л, 1800 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 413 + 1000,
    memoryOptions: [
        { size: "6L", price: 413 + 1000, color: "Black" }
    ],
    defaultMemory: "6L"
},
{
    id: 1370,
    name: "Аэрогриль Kitfort KT-8150",
    brand: "KITFORT",
    image: "images/edf3766fdadace387e87d69e7c9955d7.avif",
    desc: "2850 Вт.",
    price: 384 + 1000,
    memoryOptions: [
        { size: "Standard", price: 384 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1371,
    name: "Аэрогриль Kitfort КТ-2261",
    brand: "KITFORT",
    image: "images/0650f1145b7f6d058b174ab36a72f8fb.avif",
    desc: "3.1 л + 5.1 л, 2700 Вт, 2 нагревательных элемента, 2 чаши.",
    price: 423 + 1000,
    memoryOptions: [
        { size: "3.1L+5.1L", price: 423 + 1000, color: "Black" }
    ],
    defaultMemory: "3.1L+5.1L"
},
{
    id: 1372,
    name: "Аэрогриль Kitfort KT-2247",
    brand: "KITFORT",
    image: "images/a03ef3453f9e49dd4689458453c79151.avif",
    desc: "4 л, 2850 Вт, 2 нагревательных элемента, 2 чаши.",
    price: 546 + 1000,
    memoryOptions: [
        { size: "4L", price: 546 + 1000, color: "Black" }
    ],
    defaultMemory: "4L"
},
{
    id: 1373,
    name: "Аэрогриль Kitfort KT-2217",
    brand: "KITFORT",
    image: "images/040efa0783e226d762b3475eb27b5cae.avif",
    desc: "4.5 л, 1500 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 312 + 1000,
    memoryOptions: [
        { size: "4.5L", price: 312 + 1000, color: "Black" }
    ],
    defaultMemory: "4.5L"
},
{
    id: 1374,
    name: "Аэрогриль Kitfort КТ-8106",
    brand: "KITFORT",
    image: "images/6fc2654857d56e601cd12fcdf8724323.avif",
    desc: "3.2 л, 1500 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 246 + 1000,
    memoryOptions: [
        { size: "3.2L", price: 246 + 1000, color: "Black" }
    ],
    defaultMemory: "3.2L"
},
{
    id: 1375,
    name: "Аэрогриль Kitfort KT-2263",
    brand: "KITFORT",
    image: "images/0585c82933d60aaa7593ee8f5863cab8.avif",
    desc: "1800 Вт.",
    price: 269 + 1000,
    memoryOptions: [
        { size: "Standard", price: 269 + 1000, color: "Black" }
    ],
    defaultMemory: "Standard"
},
{
    id: 1376,
    name: "Аэрогриль Kitfort КТ-2250",
    brand: "KITFORT",
    image: "images/e3933021e4a0056cf1b65f55a56afba6.avif",
    desc: "4.5 л, 1750 Вт, 2 нагревательных элемента, 2 чаши.",
    price: 429 + 1000,
    memoryOptions: [
        { size: "4.5L", price: 429 + 1000, color: "Black" }
    ],
    defaultMemory: "4.5L"
},
{
    id: 1377,
    name: "Аэрогриль Kitfort КТ-8147",
    brand: "KITFORT",
    image: "images/5072564569d6064c8b1becd419fe8b05.avif",
    desc: "4 л, 1800 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 370 + 1000,
    memoryOptions: [
        { size: "4L", price: 370 + 1000, color: "Black" }
    ],
    defaultMemory: "4L"
},
{
    id: 1378,
    name: "Аэрогриль Kitfort KT-2221",
    brand: "KITFORT",
    image: "images/7b2f0273d1feab2e0ed79748c5f1923c.avif",
    desc: "3.3 л, 1500 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 257 + 1000,
    memoryOptions: [
        { size: "3.3L", price: 257 + 1000, color: "Black" }
    ],
    defaultMemory: "3.3L"
},
{
    id: 1379,
    name: "Аэрогриль 4 в 1 Kitfort КТ-8152",
    brand: "KITFORT",
    image: "images/4a1f9ef192f1117d7b9ca926fe88156c.avif",
    desc: "20 л, 1250 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 442 + 1000,
    memoryOptions: [
        { size: "20L", price: 442 + 1000, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 1380,
    name: "Аэрогриль Kitfort КТ-2290",
    brand: "KITFORT",
    image: "images/904436d132dd7857daa233158ce4c15e.avif",
    desc: "8 л, 2000 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 528 + 1000,
    memoryOptions: [
        { size: "8L", price: 528 + 1000, color: "Black" }
    ],
    defaultMemory: "8L"
},
{
    id: 1381,
    name: "Аэрогриль KITFORT КТ-8151",
    brand: "KITFORT",
    image: "images/d6af9162ba9bd91269748a628cfa606b.avif",
    desc: "7 л, 1700 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 506 + 1000,
    memoryOptions: [
        { size: "7L", price: 506 + 1000, color: "Black" }
    ],
    defaultMemory: "7L"
},
{
    id: 1382,
    name: "Аэрогриль Kitfort KT-2231",
    brand: "KITFORT",
    image: "images/d93004fab3b785cec66e99889570d155.avif",
    desc: "5 л, 1700 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 312 + 1000,
    memoryOptions: [
        { size: "5L", price: 312 + 1000, color: "Black" }
    ],
    defaultMemory: "5L"
},
{
    id: 1383,
    name: "Аэрогриль Kitfort KT-2235",
    brand: "KITFORT",
    image: "images/973b4e6f01cfe93dc0e9040fd91c3c0c.avif",
    desc: "3.5 л, 1300 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 230 + 1000,
    memoryOptions: [
        { size: "3.5L", price: 230 + 1000, color: "Black" }
    ],
    defaultMemory: "3.5L"
},
{
    id: 1384,
    name: "Аэрогриль Kitfort КТ-2295",
    brand: "KITFORT",
    image: "images/877d4f91d1028e4eac3d8fd5ef143e56.avif",
    desc: "4.5 л, 1700 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 348 + 1000,
    memoryOptions: [
        { size: "4.5L", price: 348 + 1000, color: "Black" }
    ],
    defaultMemory: "4.5L"
},
{
    id: 1385,
    name: "Аэрогриль Kitfort KT-2227",
    brand: "KITFORT",
    image: "images/e77123a94240fd1e1ae435a3334c3022.avif",
    desc: "3.5 л, 1500 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 335 + 1000,
    memoryOptions: [
        { size: "3.5L", price: 335 + 1000, color: "Black" }
    ],
    defaultMemory: "3.5L"
},
{
    id: 1386,
    name: "Аэрогриль Kitfort KT-2218-1",
    brand: "KITFORT",
    image: "images/1049b9cf4114a08605333a81eb8c0a52.avif",
    desc: "5 л, 1400 Вт, 1 нагревательный элемент, 1 чаша.",
    price: 373 + 1000,
    memoryOptions: [
        { size: "5L", price: 373 + 1000, color: "Black" }
    ],
    defaultMemory: "5L"
},

     
        // DEERMA (10 моделей)
 {
    id: 1351,
    name: "Аэрогриль Dreame AF10 Black",
    brand: "Dreame",
    image: "images/8e3ceaf1b8b183e8b461892fc98764c2 (1).avif",
    desc: "7.6 л, 2800 Вт, 2 нагревательных элемента, 1 чаша.",
    price: 499 + 1000,
    memoryOptions: [
        { size: "7.6L", price: 499 + 1000, color: "Black" }
    ],
    defaultMemory: "7.6L"
},
{
    id: 1352,
    name: "Аэрогриль Dreame Air Fryer AF30 Black",
    brand: "Dreame",
    image: "images/172060d5b0529ac9c3430978b1ce3a95 (1).avif",
    desc: "7 л, 2300 Вт, 2 нагревательных элемента, 1 чаша.",
    price: 599 + 1000,
    memoryOptions: [
        { size: "7L", price: 599 + 1000, color: "Black" }
    ],
    defaultMemory: "7L"
},
{
    id: 1353,
    name: "Аэрогриль Dreame Air Fryer AF30 White",
    brand: "Dreame",
    image: "images/7ac720b8cc9e9c49c91a6627fa49964f (1).avif",
    desc: "7 л, 2300 Вт, 2 нагревательных элемента, 1 чаша.",
    price: 599 + 1000,
    memoryOptions: [
        { size: "7L", price: 599 + 1000, color: "White" }
    ],
    defaultMemory: "7L"
},
{
    id: 1354,
    name: "Аэрогриль Dreame Air Fryer DZ30 (черный)",
    brand: "Dreame",
    image: "images/6ad89ecaa269c9ab3108429755c0a01a.avif",
    desc: "5.5 л, 3000 Вт, 2 нагревательных элемента, 2 чаши.",
    price: 639 + 1000,
    memoryOptions: [
        { size: "5.5L", price: 639 + 1000, color: "Black" }
    ],
    defaultMemory: "5.5L"
},
{
    id: 1355,
    name: "Аэрофритюрница Dreame PT60 Grey RU",
    brand: "Dreame",
    image: "images/801c9aeb4eff0a251acf01f5ebc2543e.avif",
    desc: "2.5 л + 4.5 л, 1500 Вт, 2 чаши.",
    price: 619 + 1000,
    memoryOptions: [
        { size: "2.5L+4.5L", price: 619 + 1000, color: "Gray" }
    ],
    defaultMemory: "2.5L+4.5L"
},
{
    id: 1356,
    name: "Аэрофритюрница Dreame Air Fryer PT60 Green RU",
    brand: "Dreame",
    image: "images/a16da0979af5f411bff30854db5c4217.avif",
    desc: "2.5 л + 4.5 л, 1500 Вт, 2 чаши.",
    price: 619 + 1000,
    memoryOptions: [
        { size: "2.5L+4.5L", price: 619 + 1000, color: "Green" }
    ],
    defaultMemory: "2.5L+4.5L"
},

       
    ]
};

// --- КОНФИГУРАЦИЯ TELEGRAM БОТА ---
const telegramConfig = {
    botToken: '8556332290:AAFfUTPTVdPQXp_nWEyclh9c8iDjYtI9rlY',
    chatId: '-1003665752910',
    botUsername: 'ГаджетМирБот'
};

// --- ЛОГИКА ПРИЛОЖЕНИЯ ---
let currentCategory = '';
let currentProduct = null;
let currentSort = 'default';
let currentFilteredItems = [];
let currentMemoryOption = null;
let currentGpuOption = null;

// Функция для показа уведомления о Telegram
function showTelegramNotification() {
    const existingNotification = document.querySelector('.telegram-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'telegram-notification';
    notification.innerHTML = `
        <i class="fab fa-telegram"></i>
        <div class="telegram-notification-content">
            <h4>Заказ принят!</h4>
            <p>Мы скоро свяжемся с вами для подтверждения заказа</p>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Функция для отправки заказа в Telegram
async function sendOrderToTelegram(orderData) {
    try {
        const message = `
🛒 *Новый заказ из ГаджетМир*

📦 *Товар:* ${orderData.productName}
💾 *Память:* ${orderData.memory || 'Стандартная'}
🎮 *Видеокарта:* ${orderData.gpu || 'Стандартная'}
💰 *Цена:* ${orderData.price} Br
👤 *Имя:* ${orderData.customerName}
📞 *Телефон:* ${orderData.customerPhone}
🏙️ *Город:* ${orderData.customerCity}
⏰ *Когда:* ${orderData.purchaseTiming}
🕐 *Время заказа:* ${new Date().toLocaleString('ru-RU')}

_Заказ ожидает обработки._
        `;

        const response = await fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: telegramConfig.chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const result = await response.json();

        if (result.ok) {
            console.log('Заказ принят:', result);
            return true;
        } else {
            console.error('Ошибка отправки в Telegram:', result);
            return false;
        }
    } catch (error) {
        console.error('Ошибка при отправке в Telegram:', error);
        return false;
    }
}

// Функция для скрытия всех страниц
function hideAll() {
    const pages = document.querySelectorAll('.main-content');
    pages.forEach(page => page.classList.remove('active'));
}

// Функция для показа главной страницы
function showHome() {
    hideAll();
    document.getElementById('homePage').classList.add('active');
}

// Функция для получения иконки категории
function getCategoryIcon(catId) {
    const icons = {
        tvs: 'tv',
        phones: 'mobile-alt',
        laptops: 'laptop',
        microwaves: 'micro',
        fridges: 'snowflake',
        dishwashers: 'faucet',
        coffee: 'coffee',
        vacuums: 'vacuum-cleaner',
        washers: 'tint',
        headphones: 'headphones',
        tablets: 'tablet-alt',
        airfryers: 'wind'
    };
    return icons[catId] || 'box';
}

// Функция для рендеринга фильтров сортировки
function renderSortFilters() {
    const sortFilters = document.getElementById('sortFilters');
    sortFilters.innerHTML = `
        <div class="sort-filter ${currentSort === 'default' ? 'active' : ''}" data-sort="default">
            <i class="fas fa-sort"></i> <span>По умолчанию</span>
        </div>
        <div class="sort-filter ${currentSort === 'price-asc' ? 'active' : ''}" data-sort="price-asc">
            <i class="fas fa-sort-amount-down-alt"></i> <span>Цена (возр)</span>
        </div>
        <div class="sort-filter ${currentSort === 'price-desc' ? 'active' : ''}" data-sort="price-desc">
            <i class="fas fa-sort-amount-up"></i> <span>Цена (убыв)</span>
        </div>
        <div class="sort-filter ${currentSort === 'name' ? 'active' : ''}" data-sort="name">
            <i class="fas fa-sort-alpha-down"></i> <span>Название</span>
        </div>
    `;

    document.querySelectorAll('.sort-filter').forEach(el => {
        el.addEventListener('click', function (e) {
            e.stopPropagation();
            currentSort = this.dataset.sort;
            applySort(currentSort);

            document.querySelectorAll('.sort-filter').forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Функция для применения сортировки
function applySort(sortType) {
    if (!currentFilteredItems || currentFilteredItems.length === 0) return;

    let sortedItems = [...currentFilteredItems];

    if (currentCategory === 'phones' && currentMemoryOption) {
        sortedItems = sortedItems.map(item => {
            if (item.memoryOptions) {
                const memoryOption = item.memoryOptions.find(m => m.size === currentMemoryOption);
                if (memoryOption) {
                    return { ...item, price: memoryOption.price };
                }
            }
            return item;
        });
    } else if (currentCategory === 'laptops' && currentMemoryOption && currentGpuOption) {
        sortedItems = sortedItems.map(item => {
            if (item.memoryOptions) {
                const memoryOption = item.memoryOptions.find(m => m.size === currentMemoryOption);
                if (memoryOption) {
                    let price = memoryOption.price;
                    // Корректировка цены в зависимости от видеокарты
                    if (currentGpuOption) {
                        const gpuMultiplier = {
                           'RTX 3050': 0.85,
    'RTX 3050 Ti': 0.95,
    'RTX 3060': 1.1,
    'RTX 3070': 1.4,
    'RTX 3070 Ti': 1.55,
    'RTX 3080': 1.8,
    'RTX 3080 Ti': 2.0,
    'RTX 3090': 2.2,
    'RTX 3090 Ti': 2.4,
    'RTX 4050': 1.05,
    'RTX 4060': 1.3,
    'RTX 4070': 1.7,
    'RTX 4080': 2.1,
    'RTX 4090': 2.6,
    'RTX 5050': 1.2,
    'RTX 5060': 1.5,
    'RTX 5070': 1.85,
    'RTX 5070 Ti': 2.05,
    'RTX 5080': 2.4,
    'RTX 5090': 2.9
                        };
                        price = Math.round(price * (gpuMultiplier[currentGpuOption] || 1.0));
                    }
                    return { ...item, price: price };
                }
            }
            return item;
        });
    }

    switch (sortType) {
        case 'price-asc':
            sortedItems.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedItems.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedItems.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }

    renderProducts(sortedItems);
}

// Функция для рендеринга товаров
function renderProducts(items) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (!items || items.length === 0) {
        grid.innerHTML = '<div class="empty-result"><i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 15px;"></i><h3>Товары не найдены</h3><p>Попробуйте изменить параметры поиска</p></div>';
        return;
    }

    grid.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';

        let price = item.price;
        let memoryHtml = '';

        if (item.memoryOptions && item.memoryOptions.length > 0) {
            const defaultOption = item.memoryOptions.find(m => m.size === item.defaultMemory) || item.memoryOptions[0];
            price = defaultOption.price;

            memoryHtml = '<div class="product-memory-selector">';
            item.memoryOptions.slice(0, 3).forEach(option => {
                const isActive = option.size === (currentMemoryOption || item.defaultMemory);
                memoryHtml += `<span class="product-memory-chip ${isActive ? 'active' : ''}" data-memory="${option.size}" data-product-id="${item.id}">${option.size}</span>`;
            });
            if (item.memoryOptions.length > 3) {
                memoryHtml += `<span class="product-memory-chip">+${item.memoryOptions.length - 3}</span>`;
            }
            memoryHtml += '</div>';
        }

        card.innerHTML = `
            <div class="product-img"><img src="${item.image}" alt="${item.name}"></div>
            <div class="product-info">
                <div class="product-category">${item.brand || 'Бренд'}</div>
                <div class="product-name">${item.name}</div>
                ${memoryHtml}
                <div class="product-price">
                    <span class="price">${price} Br</span>
                </div>
            </div>
        `;

        card.addEventListener('click', function (e) {
            if (e.target.classList.contains('product-memory-chip') && !e.target.innerText.startsWith('+')) {
                e.stopPropagation();
                const memory = e.target.dataset.memory;
                currentMemoryOption = memory;

                document.querySelectorAll(`.product-memory-chip[data-product-id="${item.id}"]`).forEach(chip => {
                    chip.classList.remove('active');
                });
                e.target.classList.add('active');

                if (item.memoryOptions) {
                    const selectedOption = item.memoryOptions.find(m => m.size === memory);
                    if (selectedOption) {
                        const priceElement = e.target.closest('.product-card').querySelector('.price');
                        if (priceElement) {
                            priceElement.textContent = `${selectedOption.price} Br`;
                        }
                    }
                }
            } else {
                showProduct(item, currentCategory);
            }
        });

        grid.appendChild(card);
    });
}

// Функция для показа категории
function showCategory(categoryId) {
    hideAll();
    currentCategory = categoryId;
    document.getElementById('categoryPage').classList.add('active');

    const category = categories.find(c => c.id === categoryId);
    document.getElementById('categoryTitle').innerHTML = `<i class="fas fa-${getCategoryIcon(categoryId)}"></i> ${category.name}`;

    currentFilteredItems = products[categoryId] || [];

    const brandFilterContainer = document.getElementById('brandFilters');
    brandFilterContainer.innerHTML = '';

    const filters = categoryFilters[categoryId] || ["Все"];
    filters.forEach(filter => {
        const filterEl = document.createElement('span');
        filterEl.className = 'brand-filter' + (filter === "Все" ? ' active' : '');
        filterEl.textContent = filter;
        filterEl.addEventListener('click', function (e) {
            e.stopPropagation();
            document.querySelectorAll('.brand-filter').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            applyFilter(filter, categoryId);
        });
        brandFilterContainer.appendChild(filterEl);
    });

    renderSortFilters();
    applySort(currentSort);
}

// Функция для применения фильтра
function applyFilter(filter, categoryId) {
    if (filter === "Все" || filter === "Все смартфоны" || filter === "Все ноутбуки" ||
        filter === "Все микроволновки" || filter === "Все холодильники" || filter === "Все посудомойки" ||
        filter === "Все кофемашины" || filter === "Все пылесосы" || filter === "Все стиральные машины" ||
        filter === "Все наушники" || filter === "Все планшеты" || filter === "Все аэрогрили") {
        currentFilteredItems = products[categoryId] || [];
    } else {
        currentFilteredItems = (products[categoryId] || []).filter(p =>
            p.brand && p.brand.includes(filter)
        );
    }

    renderProducts(currentFilteredItems);
}

// Функция для показа товара
function showProduct(product, categoryId) {
    hideAll();
    currentProduct = product;
    currentCategory = categoryId;
    document.getElementById('productPage').classList.add('active');

    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailCat').textContent = product.brand || 'Бренд';
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailDesc').textContent = product.desc;

    // Сброс селекторов
    document.getElementById('memorySelectorContainer').style.display = 'none';
    document.getElementById('gpuSelectorContainer').style.display = 'none';

    if (product.memoryOptions && product.memoryOptions.length > 0) {
        document.getElementById('memorySelectorContainer').style.display = 'block';
        renderMemoryOptions(product);

        const defaultOption = product.memoryOptions.find(m => m.size === product.defaultMemory) || product.memoryOptions[0];
        document.getElementById('detailPrice').innerHTML = `${defaultOption.price} <span>Br</span>`;
        currentMemoryOption = defaultOption.size;

        // Для игровых ноутбуков добавляем выбор видеокарты
        if (categoryId === 'laptops' &&
            (product.brand.includes('Игровые') || product.brand.includes('ASUS ROG') ||
                product.brand.includes('MSI Gaming') || product.brand.includes('THUNDEROBOT') ||
                product.brand.includes('Lenovo LOQ') || product.brand.includes('Asus TUF Gaming'))) {
            document.getElementById('gpuSelectorContainer').style.display = 'block';
            renderGpuOptions(product);

            // Установка стандартной видеокарты
            currentGpuOption = 'RTX 4060';
            const defaultGpuOption = document.querySelector('.gpu-option');
            if (defaultGpuOption) defaultGpuOption.classList.add('active');
        }
    } else {
        document.getElementById('detailPrice').innerHTML = `${product.price} <span>Br</span>`;
        currentMemoryOption = null;
        currentGpuOption = null;
    }
}

// Функция для рендеринга опций памяти
function renderMemoryOptions(product) {
    const container = document.getElementById('memoryOptions');
    container.innerHTML = '';

    product.memoryOptions.forEach(option => {
        const el = document.createElement('div');
        el.className = 'memory-option' + (option.size === product.defaultMemory ? ' active' : '');
        el.dataset.memory = option.size;
        el.innerHTML = `${option.size} <span class="price-suffix">${option.price} Br</span>`;

        el.addEventListener('click', function (e) {
            e.stopPropagation();

            document.querySelectorAll('.memory-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            currentMemoryOption = this.dataset.memory;
            const selectedOption = product.memoryOptions.find(m => m.size === currentMemoryOption);
            if (selectedOption) {
                let price = selectedOption.price;
                // Учитываем видеокарту, если она выбрана
                if (currentGpuOption) {
                    const gpuMultiplier = {
                       'RTX 3050': 0.85,
    'RTX 3050 Ti': 0.95,
    'RTX 3060': 1.1,
    'RTX 3070': 1.4,
    'RTX 3070 Ti': 1.55,
    'RTX 3080': 1.8,
    'RTX 3080 Ti': 2.0,
    'RTX 3090': 2.2,
    'RTX 3090 Ti': 2.4,
    'RTX 4050': 1.05,
    'RTX 4060': 1.3,
    'RTX 4070': 1.7,
    'RTX 4080': 2.1,
    'RTX 4090': 2.6,
    'RTX 5050': 1.2,
    'RTX 5060': 1.5,
    'RTX 5070': 1.85,
    'RTX 5070 Ti': 2.05,
    'RTX 5080': 2.4,
    'RTX 5090': 2.9
                    };
                    price = Math.round(price * (gpuMultiplier[currentGpuOption] || 1.0));
                }
                document.getElementById('detailPrice').innerHTML = `${price} <span>Br</span>`;
            }
        });

        container.appendChild(el);
    });

    document.getElementById('basePriceInfo').innerHTML = `* От ${product.memoryOptions[0].price} Br (${product.memoryOptions[0].size})`;
}

// Функция для рендеринга опций видеокарты
function renderGpuOptions(product) {
    const container = document.getElementById('gpuOptions');
    container.innerHTML = '';

    const gpuOptions = [
        'RTX 3050', 'RTX 3050 Ti', 'RTX 3060', 'RTX 3070', 'RTX 3070 Ti', 'RTX 3080', 'RTX 3080 Ti', 'RTX 3090', 'RTX 3090 Ti',
        'RTX 4050', 'RTX 4060', 'RTX 4070', 'RTX 4080', 'RTX 4090',
        'RTX 5050', 'RTX 5060', 'RTX 5070', 'RTX 5070 Ti', 'RTX 5080', 'RTX 5090'
    ];

    gpuOptions.forEach(gpu => {
        const el = document.createElement('div');
        el.className = 'gpu-option' + (gpu === 'RTX 4060' ? ' active' : '');
        el.dataset.gpu = gpu;
        el.textContent = gpu;

        el.addEventListener('click', function (e) {
            e.stopPropagation();

            document.querySelectorAll('.gpu-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            currentGpuOption = this.dataset.gpu;

            // Обновляем цену с учетом выбранной видеокарты и памяти
            if (currentProduct && currentMemoryOption) {
                const memoryOption = currentProduct.memoryOptions.find(m => m.size === currentMemoryOption);
                if (memoryOption) {
                    const gpuMultiplier = {
                     'RTX 3050': 0.85,
    'RTX 3050 Ti': 0.95,
    'RTX 3060': 1.1,
    'RTX 3070': 1.4,
    'RTX 3070 Ti': 1.55,
    'RTX 3080': 1.8,
    'RTX 3080 Ti': 2.0,
    'RTX 3090': 2.2,
    'RTX 3090 Ti': 2.4,
    'RTX 4050': 1.05,
    'RTX 4060': 1.3,
    'RTX 4070': 1.7,
    'RTX 4080': 2.1,
    'RTX 4090': 2.6,
    'RTX 5050': 1.2,
    'RTX 5060': 1.5,
    'RTX 5070': 1.85,
    'RTX 5070 Ti': 2.05,
    'RTX 5080': 2.4,
    'RTX 5090': 2.9
                    };
                    const newPrice = Math.round(memoryOption.price * (gpuMultiplier[currentGpuOption] || 1.0));
                    document.getElementById('detailPrice').innerHTML = `${newPrice} <span>Br</span>`;
                }
            }
        });

        container.appendChild(el);
    });
}
    // Обработчики кнопок "На главную"
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) homeBtn.onclick = () => { resetApplicationState(); showHome(); };
    
    const homeBtnCategory = document.getElementById('goToHomeBtnCategory');
    if (homeBtnCategory) homeBtnCategory.onclick = () => { resetApplicationState(); showHome(); };
    
    const homeBtnProduct = document.getElementById('goToHomeBtnProduct');
    if (homeBtnProduct) homeBtnProduct.onclick = () => { resetApplicationState(); showHome(); };
    
    const homeBtnOrder = document.getElementById('goToHomeBtnOrder');
    if (homeBtnOrder) homeBtnOrder.onclick = () => { resetApplicationState(); showHome(); };
    
    const homeBtnDelivery = document.getElementById('goToHomeBtnDelivery');
    if (homeBtnDelivery) homeBtnDelivery.onclick = () => { resetApplicationState(); showHome(); };
    
    const homeBtnWarranty = document.getElementById('goToHomeBtnWarranty');
    if (homeBtnWarranty) homeBtnWarranty.onclick = () => { resetApplicationState(); showHome(); };
    
    const homeBtnPayment = document.getElementById('goToHomeBtnPayment');
    if (homeBtnPayment) homeBtnPayment.onclick = () => { resetApplicationState(); showHome(); };
// Функция для показа страницы заказа
function showOrderPage() {
    if (!currentProduct) return;

    hideAll();
    document.getElementById('orderPage').classList.add('active');

    document.getElementById('orderImg').src = currentProduct.image;

    let productName = currentProduct.name;
    let productPrice = currentProduct.price;
    let memoryText = '';
    let gpuText = '';

    if (currentProduct.memoryOptions && currentMemoryOption) {
        const selectedMemory = currentProduct.memoryOptions.find(m => m.size === currentMemoryOption);
        if (selectedMemory) {
            productName = `${currentProduct.name} (${selectedMemory.size}`;
            memoryText = selectedMemory.size;
            productPrice = selectedMemory.price;

            if (currentGpuOption) {
                productName += `, ${currentGpuOption}`;
                gpuText = currentGpuOption;

                const gpuMultiplier = {
         'RTX 3050': 0.85,
    'RTX 3050 Ti': 0.95,
    'RTX 3060': 1.1,
    'RTX 3070': 1.4,
    'RTX 3070 Ti': 1.55,
    'RTX 3080': 1.8,
    'RTX 3080 Ti': 2.0,
    'RTX 3090': 2.2,
    'RTX 3090 Ti': 2.4,
    'RTX 4050': 1.05,
    'RTX 4060': 1.3,
    'RTX 4070': 1.7,
    'RTX 4080': 2.1,
    'RTX 4090': 2.6,
    'RTX 5050': 1.2,
    'RTX 5060': 1.5,
    'RTX 5070': 1.85,
    'RTX 5070 Ti': 2.05,
    'RTX 5080': 2.4,
    'RTX 5090': 2.9
                };
                productPrice = Math.round(productPrice * (gpuMultiplier[currentGpuOption] || 1.0));
            }

            productName += `, ${selectedMemory.color || ''})`;
        }
    }

    document.getElementById('orderName').textContent = productName;
    document.getElementById('orderPrice').textContent = `${productPrice} Br`;
}

// Функции для показа информационных страниц
function showDeliveryPage() {
    hideAll();
    document.getElementById('deliveryPage').classList.add('active');
}

function showWarrantyPage() {
    hideAll();
    document.getElementById('warrantyPage').classList.add('active');
}

function showPaymentPage() {
    hideAll();
    document.getElementById('paymentPage').classList.add('active');
}

// Функция для сохранения заказа локально
function saveOrderLocally(orderData) {
    try {
        const orders = JSON.parse(localStorage.getItem('gadgetOrders') || '[]');
        orders.push({
            ...orderData,
            id: Date.now(),
            date: new Date().toISOString()
        });
        localStorage.setItem('gadgetOrders', JSON.stringify(orders));
        console.log('Заказ сохранен локально:', orderData);
    } catch (error) {
        console.error('Ошибка сохранения заказа:', error);
    }
}

// Глобальная функция для WhatsApp
window.openWhatsApp = function (phone) {
    window.open(`https://wa.me/${phone}`, '_blank');
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    init();
});

function init() {
    const menu = document.getElementById('mainMenu');
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'main-menu-item';

        // ТОЛЬКО КАРТИНКА В КРУГЛОЙ РАМКЕ - БЕЗ ИКОНОК И ОВЕРЛЕЕВ
        item.innerHTML = `
            <div class="category-image-container">
                <img src="${cat.image}" alt="${cat.name}" class="category-image">
            </div>
            <span>${cat.name}</span>
        `;

        item.onclick = () => showCategory(cat.id);
        menu.appendChild(item);
    });

    document.getElementById('homeBtn').onclick = showHome;
    document.getElementById('backToCategoryBtn').onclick = () => showCategory(currentCategory);
    document.getElementById('backToProductBtn').onclick = () => {
        document.getElementById('orderPage').classList.remove('active');
        document.getElementById('productPage').classList.add('active');
    };
    document.getElementById('goToOrderBtn').onclick = showOrderPage;

    document.getElementById('deliveryInfoBtn').onclick = showDeliveryPage;
    document.getElementById('warrantyInfoBtn').onclick = showWarrantyPage;
    document.getElementById('paymentInfoBtn').onclick = showPaymentPage;

    document.getElementById('advantageDeliveryBtn').onclick = showDeliveryPage;
    document.getElementById('advantageWarrantyBtn').onclick = showWarrantyPage;
    document.getElementById('advantagePaymentBtn').onclick = showPaymentPage;

    document.querySelector('.footer-delivery-btn').onclick = showDeliveryPage;
    document.querySelector('.footer-warranty-btn').onclick = showWarrantyPage;
    document.querySelector('.footer-payment-btn').onclick = showPaymentPage;

    document.getElementById('backFromDeliveryBtn').onclick = showHome;
    document.getElementById('backFromWarrantyBtn').onclick = showHome;
    document.getElementById('backFromPaymentBtn').onclick = showHome;

    document.getElementById('orderForm').onsubmit = async (e) => {
        e.preventDefault();

        const name = document.getElementById('customerName').value;
        const phone = document.getElementById('customerPhone').value;
        const city = document.getElementById('customerCity').value;
        const timing = document.getElementById('purchaseTiming').value;

        let productName = currentProduct.name;
        let productPrice = currentProduct.price;
        let memoryText = '';
        let gpuText = '';

        if (currentProduct.memoryOptions && currentMemoryOption) {
            const memoryOption = currentProduct.memoryOptions.find(m => m.size === currentMemoryOption);
            if (memoryOption) {
                productName = `${currentProduct.name} (${memoryOption.size}`;
                memoryText = memoryOption.size;
                productPrice = memoryOption.price;

                if (currentGpuOption) {
                    productName += `, ${currentGpuOption}`;
                    gpuText = currentGpuOption;

                    const gpuMultiplier = {
                       'RTX 3050': 0.85,
    'RTX 3050 Ti': 0.95,
    'RTX 3060': 1.1,
    'RTX 3070': 1.4,
    'RTX 3070 Ti': 1.55,
    'RTX 3080': 1.8,
    'RTX 3080 Ti': 2.0,
    'RTX 3090': 2.2,
    'RTX 3090 Ti': 2.4,
    'RTX 4050': 1.05,
    'RTX 4060': 1.3,
    'RTX 4070': 1.7,
    'RTX 4080': 2.1,
    'RTX 4090': 2.6,
    'RTX 5050': 1.2,
    'RTX 5060': 1.5,
    'RTX 5070': 1.85,
    'RTX 5070 Ti': 2.05,
    'RTX 5080': 2.4,
    'RTX 5090': 2.9
                    };
                    productPrice = Math.round(productPrice * (gpuMultiplier[currentGpuOption] || 1.0));
                }

                productName += `, ${memoryOption.color || ''})`;
            }
        }

        const orderData = {
            productName: productName,
            price: productPrice,
            memory: memoryText,
            gpu: gpuText,
            customerName: name,
            customerPhone: phone,
            customerCity: city,
            purchaseTiming: timing === 'today' ? 'Сегодня' : timing === 'tomorrow' ? 'Завтра' : 'В течение недели'
        };

        alert(`Спасибо, ${name}! Оформляем ваш заказ на "${productName}"...\nОтправляем заказ...`);

        const telegramSent = await sendOrderToTelegram(orderData);

        if (telegramSent) {
            showTelegramNotification();

            setTimeout(() => {
                alert(`✅ Заказ успешно оформлен!\n\n📦 Товар: ${productName}\n💰 Цена: ${productPrice} Br\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🏙️ Город: ${city}\n\nМы свяжемся с вами в ближайшее время для подтверждения заказа!`);
            }, 1000);
        } else {
            saveOrderLocally(orderData);
            alert(`Спасибо, ${name}! Заказ на "${productName}" успешно оформлен.\nМы свяжемся с вами по номеру ${phone} в ближайшее время.`);
        }

        document.getElementById('orderForm').reset();
        showHome();
    };
    
    

   document.getElementById('searchBtn').onclick = () => {
        const query = document.getElementById('searchInput').value.toLowerCase();
        if (query.trim() === '') return;

        let foundProducts = [];
        Object.keys(products).forEach(catId => {
            const categoryProducts = products[catId];
            categoryProducts.forEach(p => {
                if (p.name.toLowerCase().includes(query) ||
                    (p.brand && p.brand.toLowerCase().includes(query)) ||
                    p.desc.toLowerCase().includes(query)) {
                    foundProducts.push(p);
                }
            });
        });

        if (foundProducts.length > 0) {
            hideAll();
            currentCategory = 'search';
            currentFilteredItems = foundProducts;
            const page = document.getElementById('categoryPage');
            page.classList.add('active');
            document.getElementById('categoryTitle').innerHTML = `<i class="fas fa-search"></i> Результаты поиска: "${query}"`;
            document.getElementById('brandFilters').innerHTML = '<div class="brand-filter active">Все результаты</div>';
            renderSortFilters();
            applySort(currentSort);
        } else {
            alert(`По запросу "${query}" ничего не найдено. Попробуйте изменить запрос.`);
        }
    };

    // ===== ФОРМА КОНСУЛЬТАЦИИ ВНИЗУ СТРАНИЦЫ =====
        // ===== ФОРМА КОНСУЛЬТАЦИИ ВНИЗУ СТРАНИЦЫ =====
    // Прямые значения для Telegram (проверьте их правильность)
       // ===== ФОРМА КОНСУЛЬТАЦИИ ВНИЗУ СТРАНИЦЫ =====
       // ===== ФОРМА КОНСУЛЬТАЦИИ (упрощенная версия) =====
      document.getElementById('searchBtn').onclick = () => {
        const query = document.getElementById('searchInput').value.toLowerCase();
        if (query.trim() === '') return;

        let foundProducts = [];
        Object.keys(products).forEach(catId => {
            const categoryProducts = products[catId];
            categoryProducts.forEach(p => {
                if (p.name.toLowerCase().includes(query) ||
                    (p.brand && p.brand.toLowerCase().includes(query)) ||
                    p.desc.toLowerCase().includes(query)) {
                    foundProducts.push(p);
                }
            });
        });

        if (foundProducts.length > 0) {
            hideAll();
            currentCategory = 'search';
            currentFilteredItems = foundProducts;
            const page = document.getElementById('categoryPage');
            page.classList.add('active');
            document.getElementById('categoryTitle').innerHTML = `<i class="fas fa-search"></i> Результаты поиска: "${query}"`;
            document.getElementById('brandFilters').innerHTML = '<div class="brand-filter active">Все результаты</div>';
            renderSortFilters();
            applySort(currentSort);
        } else {
            alert(`По запросу "${query}" ничего не найдено. Попробуйте изменить запрос.`);
        }
    };

    // ===== ФОРМА КОНСУЛЬТАЦИИ - РАБОЧАЯ ВЕРСИЯ =====
    const consultForm = document.getElementById('consultationForm');
    
    if (consultForm) {
        consultForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Получаем данные из формы
            const name = document.getElementById('consultName').value;
            const phone = document.getElementById('consultPhone').value;
            const comment = document.getElementById('consultComment').value;
            const agree = document.getElementById('consultAgree').checked;
            
            // Проверка согласия
            if (!agree) {
                alert('Пожалуйста, подтвердите согласие на обработку персональных данных');
                return;
            }
            
            // Проверка заполнения
            if (name === '' || phone === '') {
                alert('Пожалуйста, заполните имя и телефон');
                return;
            }
            
            // Показываем сообщение пользователю
            alert(`✅ Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами по номеру ${phone} в ближайшее время!`);
            
            // Формируем сообщение для Telegram (кодируем для URL)
            const message = `📞 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ%0A%0A👤 Имя: ${name}%0A📱 Телефон: ${phone}%0A💬 Вопрос: ${comment || 'Не указан'}%0A🕐 Время: ${new Date().toLocaleString('ru-RU')}`;
            
            // Отправляем через Telegram API
            fetch(`https://api.telegram.org/bot8556332290:AAFfUTPTVdPQXp_nWEyclh9c8iDjYtI9rlY/sendMessage?chat_id=-1003665752910&text=${message}`)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        console.log('✅ Заявка отправлена в Telegram');
                    } else {
                        console.log('❌ Ошибка Telegram:', data.description);
                    }
                })
                .catch(error => {
                    console.log('Ошибка отправки:', error);
                });
            
            // Очищаем форму
            consultForm.reset();
            // ===== КНОПКА "НАВЕРХ" =====
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollToTopBtn) {
        console.log('Кнопка найдена');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
                console.log('Показываем кнопку');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Проверяем при загрузке
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        }
    } else {
        console.log('Кнопка НЕ найдена!');
    }
        });

        
        console.log('✅ Форма консультации готова к работе');
    } else {
        console.log('❌ Форма consultationForm не найдена на странице');
    }
}