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
    tvs: ["Все", "LG", "Samsung", "TCL", "HAIER", "Xiaomi", "KIVI", "Philips", "Hisense", "Sharp", "Panasonic"],
    phones: ["Все смартфоны", "iPhone", "Samsung", "Xiaomi", "HONOR", "HUAWEI",  "POCO", "Vivo", "Realme"],
    laptops: ["Все ноутбуки", "Игровые", "Ультрабуки", "MacBook", "ASUS","ASUS TUF Gaming", "LENOVO", "HONOR", "HP", "THUNDEROBOT"],
    microwaves: ["Все микроволновки", "Samsung", "LG", "Panasonic", "Haier", "Bosch", "Maunfeld", "Hyundai"],
    fridges: ["Все холодильники", "LG", "Beko", "ATLANT", "Haier", "TECHNO", "Samsung", "Midea"],
    dishwashers: ["Все посудомойки", "Haier", "Korting", "Bosch", "Maunfeld", "Hotpoint", "Weissgauff", "Electrolux"],
    coffee: ["Все кофемашины", "DeLonghi", "NIVONA", "PHILIPS", "POLARIS", "Krups", "JURA", "SIEMENS", "Kitfort"],
    vacuums: ["Все пылесосы", "Вертикальные", "Моющие", "Dreame", "SAMSUNG", "Karcher", "LG", "Xiaomi", "Моющие вертикальные"],
    washers: ["Все стиральные машины", "LG", "HAIER", "ATLANT", "SAMSUNG", ],
    headphones: ["Все наушники", "Apple", "JBL", "Xiaomi", "Samsung", ],
    tablets: ["Все планшеты", "Apple", "Недорогие", "Samsung", "Xiaomi"],
    airfryers: ["Все аэрогрили", "Xiaomi", "TEFAL", "KITFORT", "Dreame"]
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
        { id: 101, name: "Телевизор Samsung UE50CU7100UXRU 50\" 4K UHD", price: 1850, brand: "Samsung", image: "https://imgproxy.onliner.by/VdeOX-Lj6-dTr21v0ID9D2GfJsygfpG7DgassbecURc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjEyNzc0ODI1/YTViODg4ZDlmYjEx/MjE4YTU2YjgzYjcu/anBn", desc: "Кристально чистое изображение 4K. Smart TV, Wi-Fi, HDR 10+. Идеальный выбор для дома." },
        { id: 102, name: "Телевизор Samsung QE65Q80CAT 65\" 4K QLED", price: 3200, brand: "Samsung", image: "https://imgproxy.onliner.by/_wPGV4gmYqzOn_c3cJ0HAgrUNb96pFwf3olCGJ22sPM/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvY2YzYWQ4MWNj/MzdhNDc3ODkzZmM5/ZTZhNmU1YTlkMzYu/anBn", desc: "Квантовые точки, Object Tracking Sound, игровой хаб 2.0, 4K AI процессор." },
        { id: 103, name: "Телевизор Samsung UE43T5300AU 43\" Full HD", price: 850, brand: "Samsung", image: "https://imgproxy.onliner.by/nTcizeRaZ6WjOJeNPpw8L_XdDpjBALdMLqxDxDTEPlg/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZDBlODUyOTA5/OGZjNzg2ODJhMWZk/MTE0MTg5ZjE2N2Yu/anBn", desc: "PurColor, микро затемнение, цифровой чип HyperReal." },
        { id: 104, name: "Телевизор Samsung QE55QN90CAT 55\" Neo QLED 4K", price: 3800, brand: "Samsung", image: "https://imgproxy.onliner.by/A_0clniK4MKEcYuzxWL9LX3RYgzowF-bZuzvJYDyRyU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVjZjNkYzc2/M2Y3ZDViNjZiY2Qy/ZWIxMjlmMmZjYjAu/anBlZw", desc: "Mini LED подсветка, Neural Quantum Processor, Dolby Atmos." },
        { id: 105, name: "Телевизор Samsung UE75CU7170U 75\" 4K UHD", price: 2900, brand: "Samsung", image: "https://imgproxy.onliner.by/jRW6O5MQJGTJuDHt7Po66nop08Ya8mLjaRLKUWqafSU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVkYWIzNmYz/YTg3MWE5ODU0MTli/NDc5Mjg5NTI5Nzgu/anBlZw", desc: "AirSlim дизайн, Crystal Processor 4K, Smart Hub." },
        { id: 106, name: "Телевизор Samsung QLED Q80C 50\" 4K", price: 2100, brand: "Samsung", image: "https://imgproxy.onliner.by/NLHuAeZQKOPc0bvBDacUp5686VVogR0Z282oFt14mXs/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTY3YTg0N2E5/NGRhMzFhZmJhMmJk/YTFiMDYwN2I4ZWUu/anBlZw", desc: "Direct Full Array, Quantum HDR, Motion Xcelerator Turbo+" },
        { id: 107, name: "Телевизор Samsung UE32T4300AU 32\" HD", price: 550, brand: "Samsung", image: "https://formulatv.ru/images/catalog/televizory/philips-50pus8808.jpg", desc: "Компактный телевизор, Wide Color Enhancer, ConnectShare." },
        { id: 108, name: "Телевизор Samsung QE85Q70CAT 85\" 4K QLED", price: 6200, brand: "Samsung", image: "https://imgproxy.onliner.by/p4LDg5rk3CQWQDmIORhBErPqMNvE476Mdp5-bpReNIE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTA3NjA1ZTMy/OTcyZDAwYTZiMzRk/OTE1MmZkMjEwOTAu/anBn", desc: "Quantum HDR, AirSlim дизайн, Real Game Enhancer+" },
        { id: 109, name: "Телевизор Samsung UE43AU8000U 43\" 4K", price: 1350, brand: "Samsung", image: "https://imgproxy.onliner.by/_ph21NEq8vc7JBHGp4RZjR2U3uUaHQUVICxIzZ7iyZU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjk2Yjc2Nzg1/NmM4ZjRlZmRhNzZh/YTI2YmI0NGQ3Yzgu/anBlZw", desc: "Crystal Display, Supreme UHD Dimming, Adaptive Sound." },
        { id: 110, name: "Телевизор Samsung QE55S90CAT 55\" OLED 4K", price: 3500, brand: "Samsung", image: "https://sk.panasonic.com/wp-content/uploads/2024/04/TX-55MX800E_001.jpg.webp", desc: "OLED с квантовыми точками, Quantum HDR OLED, Real Depth Enhancer." },

        //KIVI
        // KIVI (10 моделей с реальными названиями, ценами и фотографиями)
        { id: 1101, name: "Телевизор KIVI 40H700GU 40\" Smart TV (2024)", price: 899, brand: "KIVI", image: "https://showtime.ua/content/images/48/390x390l80br50/44193460569259.webp", desc: "40 дюймов, HD Ready, Smart TV (Google TV), DVB-T2/C/S2, два динамика 16 Вт, Bluetooth, Wi-Fi" },
        { id: 1102, name: "Телевизор KIVI 43H700GU 43\" 4K UHD Smart TV", price: 1199, brand: "KIVI", image: "https://images.5element.by/resize/cf6/cf64e27badd6abf090c5f61157028583/246_246_1/0d0149c185d87202e9720bb81d0c5c67.jpg", desc: "43 дюйма, 4K Ultra HD, Smart TV (Google TV), HDR10, HLG, DVB-T2/C/S2, Bluetooth 5.0, Wi-Fi" },
        { id: 1103, name: "Телевизор KIVI 43U750NB 50\" 4K UHD Smart TV", price: 1499, brand: "KIVI", image: "https://images.5element.by/resize/3e9/3e96e4a637ef33c83672b2f6702690e3/246_246_1/59a273e8a6fabc854cacfed08294dbbf.jpg", desc: "50 дюймов, 4K Ultra HD, Smart TV (Google TV), HDR10, HLG, Dolby Audio, DVB-T2/C/S2, 3 HDMI" },
        { id: 1104, name: "Телевизор KIVI 55H700GU 55\" 4K UHD Smart TV", price: 1799, brand: "KIVI", image: "https://images.5element.by/resize/fcf/fcf78c1008a1a9bd543a4718ccb7844c/246_246_1/407ac3b3d24d75f005bb61d4319403fc.jpg", desc: "43 дюймов, 4K Ultra HD, Smart TV (Google TV), HDR10, HLG, Dolby Audio, DVB-T2/C/S2, 3 HDMI, 2 USB" },
        { id: 1105, name: "Телевизор KIVI 65U710KB 65\" 4K UHD Smart TV", price: 2499, brand: "KIVI", image: "https://imgproxy.onliner.by/JO9x914japYQiP6RtHhalQk22f3JLuTdKJ_gX0Weqk4/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYWQ4NzlhOWM0/OTFiNDdjYTNiODg2/OTQwZjc0OWVhZTYu/anBlZw", desc: "65 дюймов, 4K Ultra HD, Smart TV (Google TV), HDR10, HLG, Dolby Audio, DVB-T2/C/S2, 3 HDMI, 2 USB" },
        { id: 1106, name: "Телевизор KIVI 50U750NB 50\" 4K UHD Smart TV", price: 1599, brand: "KIVI", image: "https://imgproxy.onliner.by/8BHIleEkbbNqL-uYC-6v7qDcDaBpiiB3w2mzzZcTc0g/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZWJkZDM4ODRl/ZTRkMDU4NTQ2MDY0/MWRkYWE2MDdhNzcu/anBlZw", desc: "50 дюймов, 4K Ultra HD, Smart TV, HDR10, Bluetooth, голосовое управление, тонкий металлический корпус" },
        { id: 1107, name: "Телевизор KIVI 55U750NB 55\" 4K UHD Smart TV", price: 1499, brand: "KIVI", image: "https://images.5element.by/resize/f80/f80d4d0900e9f225034b26d107de3546/600_600_1/ca327b71e5d4546ea2eedf232754bd40.jpg", desc: "55 дюймов, 4K Ultra HD, Smart TV, HDR10, Bluetooth 5.0, голосовое управление, металлический корпус" },
        { id: 1108, name: "Телевизор KIVI 43F750NB 43\" Full HD Smart TV", price: 1099, brand: "KIVI", image: "https://imgproxy.onliner.by/vYS8GkX9jOgPth4NFaiDyMUL2XO2FnmJS6r7hJpsp4k/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvODY1YjNhZmQx/YmQ3MzJjMDllODhi/M2YzMzI3YmFhYjUu/anBlZw", desc: "43 дюйма, Full HD, Smart TV, DVB-T2/C/S2, Bluetooth, Wi-Fi, два динамика 16 Вт" },
        { id: 1109, name: "Телевизор KIVI 32H700GU 32\" HD Ready Smart TV", price: 699, brand: "KIVI", image: "https://imgproxy.onliner.by/XIGySjrdjW9N8RkVk6hrnLZKODh18Ds7qfuSQ2CYl1A/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYWU5OTU5Nzdm/MGNiNTk1NDg1NmU1/Yjc4NjJiODUzYmYu/anBlZw", desc: "32 дюйма, HD Ready, Smart TV (Google TV), DVB-T2/C, два динамика 12 Вт, Wi-Fi" },
        { id: 1110, name: "Телевизор KIVI 65U750NB 65\" 4K UHD Smart TV", price: 2799, brand: "KIVI", image: "https://imgproxy.onliner.by/87e8TTsvlc8LETr52iVK41YOTKzB6pERJJwbMTXErYY/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjY5MWU3M2Yz/ZjgzNTRkNjAyZTZh/YjlhMzRmM2I3ZTMu/anBlZw", desc: "65 дюймов, 4K Ultra HD, Smart TV, HDR10, Bluetooth 5.0, голосовое управление, премиальный дизайн" },
        // LG (10 моделей)
    

        { id: 111, name: "Телевизор LG 55QNED86A6A", price: 3699, brand: "LG", image: "https://imgproxy.onliner.by/6_9Jv8kJRCYmYMjVWh6cdXD-EXZ_xgbn1HK9nDan_Zw/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNmQwYzUyZTlm/M2NiNjNlOTcwMDYx/ODQyZWJiZDcwM2Mu/anBn" },
        { id: 112, name: "Телевизор LG 65NANO80A6B", price: 2899, brand: "LG", image: "https://images.5element.by/resize/f81/f81f9121cf7b0cc0c12ef9f2f8f7cd39/600_600_1/99f945dcc145966444136e17d3b03e29.jpg" },
        { id: 113, name: "Телевизор LG 55NANO80A6B", price: 2499, brand: "LG", image: "https://images.5element.by/resize/ca0/ca0386445d3964752be82efe9195ac2a/600_600_1/1a682379ce4aeb876fe1817832d723c6.jpg" },
        { id: 114, name: "Телевизор LG 65QNED86A6A", price: 5299, brand: "LG", image: "https://imgproxy.onliner.by/K_fO6p7HAE6TwaHKzmVs5B0Sar1qM7HSEjh_5YkPf7w/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMTQyYTE3NWVj/ODBmNDQzNDIwZDVj/MmUwODJiMjg0ZDYu/anBn" },
        { id: 115, name: "Телевизор LG 50NANO80A6B", price: 1625, brand: "LG", image: "https://imgproxy.onliner.by/sxO02H4E5c0U8U5IR2fRqh1nYF0jiiOEarAoKXBrKss/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMDBlMTA5YzQ4/ODc3YmRhMmM4MDE1/OWI3MjZhMzY4Zjku/anBn" },
        { id: 116, name: "Телевизор LG 50UA73006LA", price: 1599, brand: "LG", image: "https://imgproxy.onliner.by/_oGuQRTK_fKjy_cAIUdROezjFWvuxUv5BGH3lQmK7OY/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMWU5ZmU0YzBj/NDFkNGJiYmRiMmFj/ZTUxOTg1MDJlYmUu/cG5n" },
        { id: 117, name: "Телевизор LG 32LQ63006LA", price: 909, brand: "LG", image: "https://imgproxy.onliner.by/mrkB2j5N5_07SrWKBEmJYKqAaN3AniAuznuDcvPpgzA/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMDBmNmQ3Y2U4/YWJlOWM2Y2RmZmY1/YmU1OGI3MGFkODUu/anBlZw" },
        { id: 118, name: "Телевизор LG 55UA73006LA", price: 1899, brand: "LG", image: "https://imgproxy.onliner.by/_oGuQRTK_fKjy_cAIUdROezjFWvuxUv5BGH3lQmK7OY/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMWU5ZmU0YzBj/NDFkNGJiYmRiMmFj/ZTUxOTg1MDJlYmUu/cG5n" },
        { id: 119, name: "Телевизор LG 43UA73006LA", price: 1279, brand: "LG", image: "https://images.5element.by/resize/100/10076434805e67883eb8b11d4c8bad49/600_600_1/b0ab7316da3c65ee690c95c97b1a1bb1.jpg" },
        { id: 120, name: "Телевизор LG 32LQ63506LA", price: 919, brand: "LG", image: "https://imgproxy.onliner.by/mrkB2j5N5_07SrWKBEmJYKqAaN3AniAuznuDcvPpgzA/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMDBmNmQ3Y2U4/YWJlOWM2Y2RmZmY1/YmU1OGI3MGFkODUu/anBlZw" },
        // Sony (10 моделей)
        { id: 121, name: "Телевизор Sony BRAVIA KD-65X80K 65\" 4K", price: 3100, brand: "Sony", image: "https://imgproxy.onliner.by/NLHuAeZQKOPc0bvBDacUp5686VVogR0Z282oFt14mXs/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTY3YTg0N2E5/NGRhMzFhZmJhMmJk/YTFiMDYwN2I4ZWUu/anBlZw", desc: "Процессор X1 4K HDR, технология Triluminos Pro, режим Netflix Calibrated." },
        { id: 122, name: "Телевизор Sony XR-55A80L 55\" OLED 4K", price: 4800, brand: "Sony", image: "https://imgproxy.onliner.by/VdeOX-Lj6-dTr21v0ID9D2GfJsygfpG7DgassbecURc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjEyNzc0ODI1/YTViODg4ZDlmYjEx/MjE4YTU2YjgzYjcu/anBn", desc: "Cognitive Processor XR, XR OLED Contrast, Acoustic Surface Audio." },
        { id: 123, name: "Телевизор Sony XR-75X95L 75\" Mini LED 4K", price: 6500, brand: "Sony", image: "https://formulatv.ru/images/catalog/televizory/philips-50pus8808.jpg", desc: "XR Backlight Master Drive, XR Contrast Booster, XR Triluminos Max." },
        { id: 124, name: "Телевизор Sony KD-43X85K 43\" 4K", price: 1450, brand: "Sony", image: "https://imgproxy.onliner.by/HFKMpLtpjbae6WtzsGTL2pncE-_5ATzNQqFxFFk1dBc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNzhkZjk3MDIx/MTRjZTU1MjQ2NmE5/YmU1NTFlYzJkN2Uu/anBlZw", desc: "Процессор X1, Motionflow XR 200Hz, игровой режим с VRR." },
        { id: 125, name: "Телевизор Sony XR-65A95L 65\" QD-OLED 4K", price: 7200, brand: "Sony", image: "https://imgproxy.onliner.by/jRW6O5MQJGTJuDHt7Po66nop08Ya8mLjaRLKUWqafSU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVkYWIzNmYz/YTg3MWE5ODU0MTli/NDc5Mjg5NTI5Nzgu/anBlZw", desc: "QD-OLED панель, Cognitive Processor XR, XR Triluminos Max." },
        { id: 126, name: "Телевизор Sony KD-50X75K 50\" 4K", price: 1700, brand: "Sony", image: "https://imgproxy.onliner.by/p4LDg5rk3CQWQDmIORhBErPqMNvE476Mdp5-bpReNIE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTA3NjA1ZTMy/OTcyZDAwYTZiMzRk/OTE1MmZkMjEwOTAu/anBn", desc: "4K HDR, Google TV, Voice Remote, Ambient Optimization." },
        { id: 127, name: "Телевизор Sony XR-85X95L 85\" Mini LED 4K", price: 9500, brand: "Sony", image: "https://imgproxy.onliner.by/_ph21NEq8vc7JBHGp4RZjR2U3uUaHQUVICxIzZ7iyZU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjk2Yjc2Nzg1/NmM4ZjRlZmRhNzZh/YTI2YmI0NGQ3Yzgu/anBlZw", desc: "XR Backlight Master Drive, XR 4K Upscaling, XR Sound." },
        { id: 128, name: "Телевизор Sony KD-32W800L 32\" HD", price: 750, brand: "Sony", image: "https://sk.panasonic.com/wp-content/uploads/2024/04/TX-55MX800E_001.jpg.webp", desc: "Компактный телевизор, X-Reality PRO, Clear Phase, Bass Reflex." },
        { id: 129, name: "Телевизор Sony XR-55X90L 55\" 4K", price: 2900, brand: "Sony", image: "https://imgproxy.onliner.by/cdaofQjX7D85k56Tar9dPUDeEPw9Pf4Di13c5_6R3uc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNmQwYmUyM2E1/NWY4NmQzNGNmZTU0/YjU4ZjkwODllNmIu/anBlZw", desc: "XR Cognitive Processor, XR 4K Upscaling, XR Motion Clarity." },
        { id: 130, name: "Телевизор Sony XR-77A80L 77\" OLED 4K", price: 8900, brand: "Sony", image: "https://imgproxy.onliner.by/2lOenDWG4WX9QNgT-c-LAv7aE3MYfwzSkUt59RLyqzE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjgyYzdhNDM0/NzFkYjU0MDU5NWI1/MzFkYjk0NWZlMTcu/anBlZw", desc: "OLED большой диагонали, Cognitive Processor XR, Acoustic Surface Audio." },

        // Philips (10 моделей)
        { id: 131, name: "Телевизор Philips 50PUS8808 50\" 4K Ambilight", price: 4200, brand: "Philips", image: "https://formulatv.ru/images/catalog/televizory/philips-50pus8808.jpg", desc: "Технология Ambilight для погружения, P5 AI процессор, Android TV." },
        { id: 132, name: "Телевизор Philips 65OLED908 65\" OLED+ 4K", price: 5900, brand: "Philips", image: "https://imgproxy.onliner.by/VdeOX-Lj6-dTr21v0ID9D2GfJsygfpG7DgassbecURc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjEyNzc0ODI1/YTViODg4ZDlmYjEx/MjE4YTU2YjgzYjcu/anBn", desc: "OLED+ с Ambilight, P5 AI Perfect Picture, 7-сторонний Ambilight." },
        { id: 133, name: "Телевизор Philips 43PUS7906 43\" 4K", price: 1450, brand: "Philips", image: "https://imgproxy.onliner.by/nTcizeRaZ6WjOJeNPpw8L_XdDpjBALdMLqxDxDTEPlg/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZDBlODUyOTA5/OGZjNzg2ODJhMWZk/MTE0MTg5ZjE2N2Yu/anBn", desc: "Ambilight 3-сторонний, P5 Perfect Picture, Android TV." },
        { id: 134, name: "Телевизор Philips 55PUS8807 55\" 4K", price: 2800, brand: "Philips", image: "https://imgproxy.onliner.by/A_0clniK4MKEcYuzxWL9LX3RYgzowF-bZuzvJYDyRyU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVjZjNkYzc2/M2Y3ZDViNjZiY2Qy/ZWIxMjlmMmZjYjAu/anBlZw", desc: "Ambilight с LED-лентой, P5 AI, Dolby Atmos, IMAX Enhanced." },
        { id: 135, name: "Телевизор Philips 70PUS8506 70\" 4K", price: 3500, brand: "Philips", image: "https://imgproxy.onliner.by/jRW6O5MQJGTJuDHt7Po66nop08Ya8mLjaRLKUWqafSU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVkYWIzNmYz/YTg3MWE5ODU0MTli/NDc5Mjg5NTI5Nzgu/anBlZw", desc: "4-сторонний Ambilight, P5 Perfect Picture, Micro Dimming Premium." },
        { id: 136, name: "Телевизор Philips 48OLED707 48\" OLED 4K", price: 3200, brand: "Philips", image: "https://imgproxy.onliner.by/p4LDg5rk3CQWQDmIORhBErPqMNvE476Mdp5-bpReNIE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTA3NjA1ZTMy/OTcyZDAwYTZiMzRk/OTE1MmZkMjEwOTAu/anBn", desc: "OLED экран, P5 AI, Ambilight, Perfect Natural Motion." },
        { id: 137, name: "Телевизор Philips 32PHS6807 32\" HD", price: 650, brand: "Philips", image: "https://imgproxy.onliner.by/_ph21NEq8vc7JBHGp4RZjR2U3uUaHQUVICxIzZ7iyZU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjk2Yjc2Nzg1/NmM4ZjRlZmRhNzZh/YTI2YmI0NGQ3Yzgu/anBlZw", desc: "Компактный телевизор, Pixel Plus HD, Micro Dimming." },
        { id: 138, name: "Телевизор Philips 75PUS8807 75\" 4K", price: 5200, brand: "Philips", image: "https://sk.panasonic.com/wp-content/uploads/2024/04/TX-55MX800E_001.jpg.webp", desc: "Ambilight 4-сторонний, P5 AI Perfect Picture, 120 Гц." },
        { id: 139, name: "Телевизор Philips 65PUS8807 65\" 4K", price: 3800, brand: "Philips", image: "https://imgproxy.onliner.by/2lOenDWG4WX9QNgT-c-LAv7aE3MYfwzSkUt59RLyqzE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjgyYzdhNDM0/NzFkYjU0MDU5NWI1/MzFkYjk0NWZlMTcu/anBlZw", desc: "The One, P5 Perfect Picture, Dolby Vision, Dolby Atmos." },
        { id: 140, name: "Телевизор Philips 85PUS8807 85\" 4K", price: 6800, brand: "Philips", image: "https://imgproxy.onliner.by/HFKMpLtpjbae6WtzsGTL2pncE-_5ATzNQqFxFFk1dBc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNzhkZjk3MDIx/MTRjZTU1MjQ2NmE5/YmU1NTFlYzJkN2Uu/anBlZw", desc: "Гигантский экран 85\", Ambilight, P5 AI, 100 Гц." },

        // Xiaomi (10 моделей)
        { id: 141, name: "Телевизор Xiaomi TV A2 43\" 4K", price: 1300, brand: "Xiaomi", image: "https://imgproxy.onliner.by/A_0clniK4MKEcYuzxWL9LX3RYgzowF-bZuzvJYDyRyU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVjZjNkYzc2/M2Y3ZDViNjZiY2Qy/ZWIxMjlmMmZjYjAu/anBlZw", desc: "Безрамочный дизайн, Android TV, поддержка Dolby Vision. Отличный бюджетный выбор." },
        { id: 142, name: "Телевизор Xiaomi TV P1 55\" 4K", price: 1250, brand: "Xiaomi", image: "https://imgproxy.onliner.by/_kj_M5JVejO3Z-_RELEEnSkWJozNLetTzOPwEm-vDKA/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYWU4NGFhZmM3/NWVkMmQ3OWUzNGY5/MjhlMDExZTIxZGUu/anBlZw", desc: "Двойной динамик 24W, поддержка Dolby Audio, тонкий металлический корпус." },
        { id: 143, name: "Телевизор Xiaomi TV Q2 65\" QLED 4K", price: 2200, brand: "Xiaomi", image: "https://imgproxy.onliner.by/VdeOX-Lj6-dTr21v0ID9D2GfJsygfpG7DgassbecURc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjEyNzc0ODI1/YTViODg4ZDlmYjEx/MjE4YTU2YjgzYjcu/anBn", desc: "QLED технология, 120 Гц, Dolby Vision IQ, Google TV." },
        { id: 144, name: "Телевизор Xiaomi TV A Pro 55\" 4K", price: 1500, brand: "Xiaomi", image: "https://imgproxy.onliner.by/nTcizeRaZ6WjOJeNPpw8L_XdDpjBALdMLqxDxDTEPlg/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZDBlODUyOTA5/OGZjNzg2ODJhMWZk/MTE0MTg5ZjE2N2Yu/anBn", desc: "4K UHD, MEMC, металлический корпус, PatchWall." },
        { id: 145, name: "Телевизор Xiaomi Mi TV 5 55\" 4K", price: 1700, brand: "Xiaomi", image: "https://formulatv.ru/images/catalog/televizory/philips-50pus8808.jpg", desc: "QLED, HDR10+, MEMC, процессор Amlogic." },
        { id: 146, name: "Телевизор Xiaomi TV A2 50\" 4K", price: 1450, brand: "Xiaomi", image: "https://imgproxy.onliner.by/jRW6O5MQJGTJuDHt7Po66nop08Ya8mLjaRLKUWqafSU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVkYWIzNmYz/YTg3MWE5ODU0MTli/NDc5Mjg5NTI5Nzgu/anBlZw", desc: "Android TV 11, 2 ГБ RAM, 16 ГБ ROM, Dolby Audio." },
        { id: 147, name: "Телевизор Xiaomi TV P1E 65\" 4K", price: 1950, brand: "Xiaomi", image: "https://imgproxy.onliner.by/p4LDg5rk3CQWQDmIORhBErPqMNvE476Mdp5-bpReNIE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTA3NjA1ZTMy/OTcyZDAwYTZiMzRk/OTE1MmZkMjEwOTAu/anBn", desc: "4K HDR, MEMC, голосовое управление, Chromecast." },
        { id: 148, name: "Телевизор Xiaomi Mi TV 5 Pro 75\" 4K", price: 3800, brand: "Xiaomi", image: "https://imgproxy.onliner.by/_ph21NEq8vc7JBHGp4RZjR2U3uUaHQUVICxIzZ7iyZU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjk2Yjc2Nzg1/NmM4ZjRlZmRhNzZh/YTI2YmI0NGQ3Yzgu/anBlZw", desc: "QLED, 120 Гц, Dolby Vision, Harmon Kardon звук." },
        { id: 149, name: "Телевизор Xiaomi TV A2 32\" HD", price: 750, brand: "Xiaomi", image: "https://sk.panasonic.com/wp-content/uploads/2024/04/TX-55MX800E_001.jpg.webp", desc: "Компактный телевизор, Android TV, голосовой поиск." },
        { id: 150, name: "Телевизор Xiaomi TV Q1 55\" QLED", price: 1900, brand: "Xiaomi", image: "https://imgproxy.onliner.by/2lOenDWG4WX9QNgT-c-LAv7aE3MYfwzSkUt59RLyqzE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjgyYzdhNDM0/NzFkYjU0MDU5NWI1/MzFkYjk0NWZlMTcu/anBlZw", desc: "QLED, Dolby Vision, MEMC, металлический корпус." },

        // Hisense (10 моделей)
        { id: 151, name: "Телевизор Hisense 55U7K 55\" ULED 4K", price: 1800, brand: "Hisense", image: "https://imgproxy.onliner.by/p4LDg5rk3CQWQDmIORhBErPqMNvE476Mdp5-bpReNIE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTA3NjA1ZTMy/OTcyZDAwYTZiMzRk/OTE1MmZkMjEwOTAu/anBn", desc: "Мини-LED подсветка, 144 Гц для игр, Dolby Vision IQ, IMAX Enhanced." },
        { id: 152, name: "Телевизор Hisense 65U8KQ 65\" Mini-LED 4K", price: 3200, brand: "Hisense", image: "https://imgproxy.onliner.by/VdeOX-Lj6-dTr21v0ID9D2GfJsygfpG7DgassbecURc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjEyNzc0ODI1/YTViODg4ZDlmYjEx/MjE4YTU2YjgzYjcu/anBn", desc: "Mini-LED Pro, Hi-View Engine, 144 Гц, Dolby Vision IQ." },
        { id: 153, name: "Телевизор Hisense 50A6K 50\" 4K", price: 1250, brand: "Hisense", image: "https://imgproxy.onliner.by/nTcizeRaZ6WjOJeNPpw8L_XdDpjBALdMLqxDxDTEPlg/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZDBlODUyOTA5/OGZjNzg2ODJhMWZk/MTE0MTg5ZjE2N2Yu/anBn", desc: "4K UHD, DTS Virtual-X, VIDAA U6, Game Mode Plus." },
        { id: 154, name: "Телевизор Hisense 75U7KQ 75\" ULED 4K", price: 4100, brand: "Hisense", image: "https://formulatv.ru/images/catalog/televizory/philips-50pus8808.jpg", desc: "ULED, Mini-LED, 144 Гц, Quantum Dot, Dolby Vision IQ." },
        { id: 155, name: "Телевизор Hisense 43A6K 43\" 4K", price: 1150, brand: "Hisense", image: "https://imgproxy.onliner.by/jRW6O5MQJGTJuDHt7Po66nop08Ya8mLjaRLKUWqafSU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVkYWIzNmYz/YTg3MWE5ODU0MTli/NDc5Mjg5NTI5Nzgu/anBlZw", desc: "4K UHD, HDR10, Game Mode, VIDAA Smart TV." },
        { id: 156, name: "Телевизор Hisense 85U7KQ 85\" ULED 4K", price: 5800, brand: "Hisense", image: "https://imgproxy.onliner.by/p4LDg5rk3CQWQDmIORhBErPqMNvE476Mdp5-bpReNIE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTA3NjA1ZTMy/OTcyZDAwYTZiMzRk/OTE1MmZkMjEwOTAu/anBn", desc: "ULED, Mini-LED, 144 Гц, Full Array Local Dimming." },
        { id: 157, name: "Телевизор Hisense 58A6K 58\" 4K", price: 1550, brand: "Hisense", image: "https://imgproxy.onliner.by/_ph21NEq8vc7JBHGp4RZjR2U3uUaHQUVICxIzZ7iyZU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjk2Yjc2Nzg1/NmM4ZjRlZmRhNzZh/YTI2YmI0NGQ3Yzgu/anBlZw", desc: "4K UHD, HDR10, DTS Virtual-X, VIDAA." },
        { id: 158, name: "Телевизор Hisense 100U7KQ 100\" ULED 4K", price: 9500, brand: "Hisense", image: "https://sk.panasonic.com/wp-content/uploads/2024/04/TX-55MX800E_001.jpg.webp", desc: "Гигантский экран 100\", ULED, Mini-LED, 144 Гц." },
        { id: 159, name: "Телевизор Hisense 65A6K 65\" 4K", price: 1650, brand: "Hisense", image: "https://imgproxy.onliner.by/2lOenDWG4WX9QNgT-c-LAv7aE3MYfwzSkUt59RLyqzE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjgyYzdhNDM0/NzFkYjU0MDU5NWI1/MzFkYjk0NWZlMTcu/anBlZw", desc: "4K UHD, Dolby Vision, Game Mode, VIDAA." },
        { id: 160, name: "Телевизор Hisense 55U8KQ 55\" Mini-LED", price: 2800, brand: "Hisense", image: "https://imgproxy.onliner.by/HFKMpLtpjbae6WtzsGTL2pncE-_5ATzNQqFxFFk1dBc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNzhkZjk3MDIx/MTRjZTU1MjQ2NmE5/YmU1NTFlYzJkN2Uu/anBlZw", desc: "Mini-LED Pro, Quantum Dot, 144 Гц, IMAX Enhanced." },

        // TCL (10 моделей)
        { id: 161, name: "Телевизор TCL 65C647 QLED 65\" 4K", price: 2400, brand: "TCL", image: "https://imgproxy.onliner.by/nTcizeRaZ6WjOJeNPpw8L_XdDpjBALdMLqxDxDTEPlg/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZDBlODUyOTA5/OGZjNzg2ODJhMWZk/MTE0MTg5ZjE2N2Yu/anBn", desc: "Технология QLED для ярких цветов. Google TV, голосовое управление." },
        { id: 162, name: "Телевизор TCL 40S5400 40\" Full HD", price: 690, brand: "TCL", image: "https://imgproxy.onliner.by/X9dvpt6yGvpoE-Aoyn2zp46npHWbhJUkj8osN3W0D1o/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNDkxYmQwOTk1/OWZhM2UyOTVkYzAw/NDA5OGNhYzA1NzEu/anBn", desc: "Безрамочный дизайн, HDR10, Micro Dimming, режим Sport Mode." },
        { id: 163, name: "Телевизор TCL 55C845 QD-Mini LED 55\" 4K", price: 3800, brand: "TCL", image: "https://formulatv.ru/images/catalog/televizory/philips-50pus8808.jpg", desc: "QD-Mini LED, 2000 нит, 144 Гц, Google TV, ONKYO звук." },
        { id: 164, name: "Телевизор TCL 75C845 QD-Mini LED 75\" 4K", price: 5900, brand: "TCL", image: "https://imgproxy.onliner.by/jRW6O5MQJGTJuDHt7Po66nop08Ya8mLjaRLKUWqafSU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVkYWIzNmYz/YTg3MWE5ODU0MTli/NDc5Mjg5NTI5Nzgu/anBlZw", desc: "QD-Mini LED, Quantum Dot, 144 Гц, Google TV." },
        { id: 165, name: "Телевизор TCL 50P735 50\" 4K", price: 1450, brand: "TCL", image: "https://imgproxy.onliner.by/es58EaUsX-a1UpY9qsB86kQbLPzpQmLCW8cEbjYI8sY/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVhZDJhNDNk/NzFkMmZiM2M4OTY5/NDNkMjE0YjlmNTEu/anBlZw", desc: "4K HDR, Micro Dimming, Google TV, Dolby Atmos." },
        { id: 166, name: "Телевизор TCL 65P735 65\" 4K", price: 1950, brand: "TCL", image: "https://imgproxy.onliner.by/_ph21NEq8vc7JBHGp4RZjR2U3uUaHQUVICxIzZ7iyZU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjk2Yjc2Nzg1/NmM4ZjRlZmRhNzZh/YTI2YmI0NGQ3Yzgu/anBlZw", desc: "4K UHD, HDR10, Google Assistant, MEMC." },
        { id: 167, name: "Телевизор TCL 85C845 QD-Mini LED 85\" 4K", price: 8200, brand: "TCL", image: "https://sk.panasonic.com/wp-content/uploads/2024/04/TX-55MX800E_001.jpg.webp", desc: "QD-Mini LED гигант, 2000 нит, 144 Гц, ONKYO 2.1." },
        { id: 168, name: "Телевизор TCL 43P735 43\" 4K", price: 1150, brand: "TCL", image: "https://imgproxy.onliner.by/2lOenDWG4WX9QNgT-c-LAv7aE3MYfwzSkUt59RLyqzE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjgyYzdhNDM0/NzFkYjU0MDU5NWI1/MzFkYjk0NWZlMTcu/anBlZw", desc: "4K HDR, Google TV, Dolby Vision, Game Master." },
        { id: 169, name: "Телевизор TCL 98C845 QD-Mini LED 98\" 4K", price: 12500, brand: "TCL", image: "https://imgproxy.onliner.by/HFKMpLtpjbae6WtzsGTL2pncE-_5ATzNQqFxFFk1dBc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNzhkZjk3MDIx/MTRjZTU1MjQ2NmE5/YmU1NTFlYzJkN2Uu/anBlZw", desc: "Флагманский 98\", QD-Mini LED, 5000 зон затемнения." },
        { id: 170, name: "Телевизор TCL 55P735 55\" 4K", price: 1650, brand: "TCL", image: "https://imgproxy.onliner.by/cdaofQjX7D85k56Tar9dPUDeEPw9Pf4Di13c5_6R3uc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNmQwYmUyM2E1/NWY4NmQzNGNmZTU0/YjU4ZjkwODllNmIu/anBlZw", desc: "4K HDR, Micro Dimming, Google TV, Dolby Atmos." },

        // Haier (10 моделей)
        { id: 171, name: "Телевизор Haier 50 Smart TV S1", price: 1750, brand: "HAIER", image: "https://imgproxy.onliner.by/jRW6O5MQJGTJuDHt7Po66nop08Ya8mLjaRLKUWqafSU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVkYWIzNmYz/YTg3MWE5ODU0MTli/NDc5Mjg5NTI5Nzgu/anBlZw", desc: "HQLED экран, Android 11, голосовое управление Google Assistant." },
        { id: 172, name: "Телевизор Haier 65 S8 65\" 4K QLED", price: 2800, brand: "HAIER", image: "https://imgproxy.onliner.by/VdeOX-Lj6-dTr21v0ID9D2GfJsygfpG7DgassbecURc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjEyNzc0ODI1/YTViODg4ZDlmYjEx/MjE4YTU2YjgzYjcu/anBn", desc: "QLED, HDR10+, MEMC, Android TV, Harman Kardon звук." },
        { id: 173, name: "Телевизор Haier 55 S7 55\" 4K", price: 1950, brand: "HAIER", image: "https://formulatv.ru/images/catalog/televizory/philips-50pus8808.jpg", desc: "4K UHD, Micro Dimming, Android 11, Dolby Audio." },
        { id: 174, name: "Телевизор Haier 43 S5 43\" 4K", price: 1350, brand: "HAIER", image: "https://imgproxy.onliner.by/nTcizeRaZ6WjOJeNPpw8L_XdDpjBALdMLqxDxDTEPlg/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZDBlODUyOTA5/OGZjNzg2ODJhMWZk/MTE0MTg5ZjE2N2Yu/anBn", desc: "4K UHD, HDR10, Android TV, Bluetooth." },
        { id: 175, name: "Телевизор Haier 75 S8 75\" 4K QLED", price: 4200, brand: "HAIER", image: "https://imgproxy.onliner.by/jRW6O5MQJGTJuDHt7Po66nop08Ya8mLjaRLKUWqafSU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVkYWIzNmYz/YTg3MWE5ODU0MTli/NDc5Mjg5NTI5Nzgu/anBlZw", desc: "QLED большой, MEMC, Android TV, голосовое управление." },
        { id: 176, name: "Телевизор Haier 65 S5 65\" 4K", price: 2200, brand: "HAIER", image: "https://imgproxy.onliner.by/p4LDg5rk3CQWQDmIORhBErPqMNvE476Mdp5-bpReNIE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTA3NjA1ZTMy/OTcyZDAwYTZiMzRk/OTE1MmZkMjEwOTAu/anBn", desc: "4K UHD, HDR10, Android TV, Game Mode." },
        { id: 177, name: "Телевизор Haier 50 S3 50\" 4K", price: 1150, brand: "HAIER", image: "https://imgproxy.onliner.by/_ph21NEq8vc7JBHGp4RZjR2U3uUaHQUVICxIzZ7iyZU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjk2Yjc2Nzg1/NmM4ZjRlZmRhNzZh/YTI2YmI0NGQ3Yzgu/anBlZw", desc: "4K HDR, Android TV, Bluetooth, Google Assistant." },
        { id: 178, name: "Телевизор Haier 43 S3 43\" 4K", price: 950, brand: "HAIER", image: "https://sk.panasonic.com/wp-content/uploads/2024/04/TX-55MX800E_001.jpg.webp", desc: "4K UHD, HDR10, Android TV, Wi-Fi." },
        { id: 179, name: "Телевизор Haier 55 S5 55\" 4K", price: 1650, brand: "HAIER", image: "https://imgproxy.onliner.by/2lOenDWG4WX9QNgT-c-LAv7aE3MYfwzSkUt59RLyqzE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjgyYzdhNDM0/NzFkYjU0MDU5NWI1/MzFkYjk0NWZlMTcu/anBlZw", desc: "4K UHD, HDR10, Android TV, Dolby Audio." },
        { id: 180, name: "Телевизор Haier 65 S3 65\" 4K", price: 1850, brand: "HAIER", image: "https://imgproxy.onliner.by/HFKMpLtpjbae6WtzsGTL2pncE-_5ATzNQqFxFFk1dBc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNzhkZjk3MDIx/MTRjZTU1MjQ2NmE5/YmU1NTFlYzJkN2Uu/anBlZw", desc: "4K UHD, Android TV, MEMC, голосовое управление." },

        // Sharp (10 моделей)
        { id: 181, name: "Телевизор Sharp 43BL2EA 43\" Full HD", price: 750, brand: "Sharp", image: "https://imgproxy.onliner.by/_ph21NEq8vc7JBHGp4RZjR2U3uUaHQUVICxIzZ7iyZU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjk2Yjc2Nzg1/NmM4ZjRlZmRhNzZh/YTI2YmI0NGQ3Yzgu/anBlZw", desc: "Энергоэффективный LED телевизор, Smart TV, два динамика по 10 Вт." },
        { id: 182, name: "Телевизор Sharp 55FN2EA 55\" 4K", price: 1450, brand: "Sharp", image: "https://imgproxy.onliner.by/VdeOX-Lj6-dTr21v0ID9D2GfJsygfpG7DgassbecURc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjEyNzc0ODI1/YTViODg4ZDlmYjEx/MjE4YTU2YjgzYjcu/anBn", desc: "4K UHD, HDR10, Aquos Net+, Google Assistant." },
        { id: 183, name: "Телевизор Sharp 65FN2EA 65\" 4K", price: 1950, brand: "Sharp", image: "https://formulatv.ru/images/catalog/televizory/philips-50pus8808.jpg", desc: "4K HDR, Aquos Smooth, Google TV, Bluetooth." },
        { id: 184, name: "Телевизор Sharp 50FN2EA 50\" 4K", price: 1250, brand: "Sharp", image: "https://imgproxy.onliner.by/nTcizeRaZ6WjOJeNPpw8L_XdDpjBALdMLqxDxDTEPlg/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZDBlODUyOTA5/OGZjNzg2ODJhMWZk/MTE0MTg5ZjE2N2Yu/anBn", desc: "4K UHD, HDR10, Smart TV, голосовое управление." },
        { id: 185, name: "Телевизор Sharp 75FN2EA 75\" 4K", price: 3800, brand: "Sharp", image: "https://imgproxy.onliner.by/jRW6O5MQJGTJuDHt7Po66nop08Ya8mLjaRLKUWqafSU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVkYWIzNmYz/YTg3MWE5ODU0MTli/NDc5Mjg5NTI5Nzgu/anBlZw", desc: "Большой 4K телевизор, HDR10, Aquos Net+." },
        { id: 186, name: "Телевизор Sharp 43BL5EA 43\" Full HD", price: 850, brand: "Sharp", image: "https://imgproxy.onliner.by/p4LDg5rk3CQWQDmIORhBErPqMNvE476Mdp5-bpReNIE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTA3NjA1ZTMy/OTcyZDAwYTZiMzRk/OTE1MmZkMjEwOTAu/anBn", desc: "HD Ready, Smart TV, USB PVR, CI+ слот." },
        { id: 187, name: "Телевизор Sharp 55BL5EA 55\" 4K", price: 1550, brand: "Sharp", image: "https://imgproxy.onliner.by/_ph21NEq8vc7JBHGp4RZjR2U3uUaHQUVICxIzZ7iyZU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjk2Yjc2Nzg1/NmM4ZjRlZmRhNzZh/YTI2YmI0NGQ3Yzgu/anBlZw", desc: "4K UHD, Aquos Smooth, HDR10, Smart TV." },
        { id: 188, name: "Телевизор Sharp 65BL5EA 65\" 4K", price: 2100, brand: "Sharp", image: "https://sk.panasonic.com/wp-content/uploads/2024/04/TX-55MX800E_001.jpg.webp", desc: "4K HDR, Micro Dimming, Google TV, Bluetooth." },
        { id: 189, name: "Телевизор Sharp 32BL2EA 32\" HD", price: 550, brand: "Sharp", image: "https://imgproxy.onliner.by/2lOenDWG4WX9QNgT-c-LAv7aE3MYfwzSkUt59RLyqzE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjgyYzdhNDM0/NzFkYjU0MDU5NWI1/MzFkYjk0NWZlMTcu/anBlZw", desc: "Компактный телевизор, HD Ready, Smart TV." },
        { id: 190, name: "Телевизор Sharp 50BL5EA 50\" 4K", price: 1350, brand: "Sharp", image: "https://imgproxy.onliner.by/HFKMpLtpjbae6WtzsGTL2pncE-_5ATzNQqFxFFk1dBc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNzhkZjk3MDIx/MTRjZTU1MjQ2NmE5/YmU1NTFlYzJkN2Uu/anBlZw", desc: "4K UHD, Aquos Smooth, HDR10, Smart TV." },

        // Panasonic (10 моделей)
        { id: 191, name: "Телевизор Panasonic TX-55MX800 55\" 4K", price: 1950, brand: "Panasonic", image: "https://sk.panasonic.com/wp-content/uploads/2024/04/TX-55MX800E_001.jpg.webp", desc: "Режим Filmmaker Mode, поддержка HDR10+, технология HCX Pro AI." },
        { id: 192, name: "Телевизор Panasonic TX-65LZ2000 65\" OLED 4K", price: 6200, brand: "Panasonic", image: "https://imgproxy.onliner.by/VdeOX-Lj6-dTr21v0ID9D2GfJsygfpG7DgassbecURc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjEyNzc0ODI1/YTViODg4ZDlmYjEx/MjE4YTU2YjgzYjcu/anBn", desc: "Master OLED Pro, HCX Pro AI, 360° Soundscape Pro." },
        { id: 193, name: "Телевизор Panasonic TX-49MX650 49\" 4K", price: 1550, brand: "Panasonic", image: "https://formulatv.ru/images/catalog/televizory/philips-50pus8808.jpg", desc: "4K HDR, HCX Processor, my Home Screen 7.0." },
        { id: 194, name: "Телевизор Panasonic TX-43MX650 43\" 4K", price: 1250, brand: "Panasonic", image: "https://imgproxy.onliner.by/nTcizeRaZ6WjOJeNPpw8L_XdDpjBALdMLqxDxDTEPlg/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZDBlODUyOTA5/OGZjNzg2ODJhMWZk/MTE0MTg5ZjE2N2Yu/anBn", desc: "4K HDR, HCX Processor, Dolby Audio." },
        { id: 195, name: "Телевизор Panasonic TX-75MX940 75\" 4K", price: 5200, brand: "Panasonic", image: "https://imgproxy.onliner.by/jRW6O5MQJGTJuDHt7Po66nop08Ya8mLjaRLKUWqafSU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVkYWIzNmYz/YTg3MWE5ODU0MTli/NDc5Mjg5NTI5Nzgu/anBlZw", desc: "4K HDR, HCX Pro AI, 120 Гц, Dolby Atmos." },
        { id: 196, name: "Телевизор Panasonic TX-55LZ2000 55\" OLED", price: 5200, brand: "Panasonic", image: "https://imgproxy.onliner.by/p4LDg5rk3CQWQDmIORhBErPqMNvE476Mdp5-bpReNIE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZTA3NjA1ZTMy/OTcyZDAwYTZiMzRk/OTE1MmZkMjEwOTAu/anBn", desc: "Master OLED, HCX Pro AI, 360° Soundscape." },
        { id: 197, name: "Телевизор Panasonic TX-65MX940 65\" 4K", price: 3800, brand: "Panasonic", image: "https://imgproxy.onliner.by/_ph21NEq8vc7JBHGp4RZjR2U3uUaHQUVICxIzZ7iyZU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZjk2Yjc2Nzg1/NmM4ZjRlZmRhNzZh/YTI2YmI0NGQ3Yzgu/anBlZw", desc: "4K HDR, HCX Pro AI, 120 Гц, Game Mode." },
        { id: 198, name: "Телевизор Panasonic TX-43MS520 43\" Full HD", price: 850, brand: "Panasonic", image: "https://sk.panasonic.com/wp-content/uploads/2024/04/TX-55MX800E_001.jpg.webp", desc: "Full HD, HDR10, my Home Screen, USB HDD." },
        { id: 199, name: "Телевизор Panasonic TX-32MS520 32\" HD", price: 650, brand: "Panasonic", image: "https://imgproxy.onliner.by/2lOenDWG4WX9QNgT-c-LAv7aE3MYfwzSkUt59RLyqzE/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjgyYzdhNDM0/NzFkYjU0MDU5NWI1/MzFkYjk0NWZlMTcu/anBlZw", desc: "Компактный телевизор, HD Ready, Smart TV." },
        { id: 200, name: "Телевизор Panasonic TX-50MX650 50\" 4K", price: 1650, brand: "Panasonic", image: "https://imgproxy.onliner.by/HFKMpLtpjbae6WtzsGTL2pncE-_5ATzNQqFxFFk1dBc/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNzhkZjk3MDIx/MTRjZTU1MjQ2NmE5/YmU1NTFlYzJkN2Uu/anBlZw", desc: "4K HDR, HCX Processor, my Home Screen 7.0." }
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
            { size: "256GB", price: 6299, color: "Silver" },
            { size: "512GB", price: 6899, color: "Silver" },
            { size: "1TB", price: 7699, color: "Silver" }
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
            { size: "256GB", price: 6019, color: "Deep Blue" },
            { size: "512GB", price: 6359, color: "Deep Blue" },
            { size: "1TB", price: 7199, color: "Deep Blue" }
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
            { size: "256GB", price: 6009, color: "Cosmic Orange" },
            { size: "512GB", price: 6239, color: "Cosmic Orange" },
            { size: "1TB", price: 6899, color: "Cosmic Orange" }
        ],
        defaultMemory: "256GB"
    },

    // === iPhone 17 Pro (флагман 2026, меньший размер) ===
    {
        id: 1004,
        name: "Смартфон Apple iPhone 17 Pro 256GB (черный)",
        brand: "iPhone",
        image: "https://shop.mts.by/upload/resize_cache/webp/iblock/ad3/823tmkf3k7ogpnz2bw445pua49sh6huo/270_520_1/iPhone-17-Pro-Max-blue-1.webp",
        desc: "Чип A19 Pro, 6.3-дюймовый дисплей Super Retina XDR 120 Гц, тройная камера 48 МП, титановый корпус, iOS 26.",
        memoryOptions: [
            { size: "256GB", price: 5599, color: "Titanium Black" },
            { size: "512GB", price: 6199, color: "Titanium Black" },
            { size: "1TB", price: 6999, color: "Titanium Black" }
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
            { size: "256GB", price: 5599, color: "Natural Titanium" },
            { size: "512GB", price: 6199, color: "Natural Titanium" },
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
            { size: "256GB", price: 5599, color: "Desert Titanium" },
            { size: "512GB", price: 6199, color: "Desert Titanium" },
            { size: "1TB", price: 6999, color: "Desert Titanium" }
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
            { size: "128GB", price: 4599, color: "Starlight" },
            { size: "256GB", price: 4999, color: "Starlight" },
            { size: "512GB", price: 5799, color: "Starlight" }
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
            { size: "128GB", price: 4599, color: "Blue" },
            { size: "256GB", price: 4999, color: "Blue" },
            { size: "512GB", price: 5799, color: "Blue" }
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
            { size: "128GB", price: 4599, color: "Pink" },
            { size: "256GB", price: 4999, color: "Pink" },
            { size: "512GB", price: 5799, color: "Pink" }
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
            { size: "128GB", price: 5099, color: "LightGold" },
            { size: "256GB", price: 5499, color: "LightGold" },
            { size: "512GB", price: 6299, color: "LightGold" }
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
            { size: "128GB", price: 5099, color: "Black" },
            { size: "256GB", price: 5499, color: "Black" },
            { size: "512GB", price: 6299, color: "Black" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 16 Pro Max (2024) ===
   
    {
        id: 1014,
        name: "Смартфон Apple iPhone 16 Pro Max 256GB (Desert Titanium)",
        brand: "iPhone",
        image: "https://images.5element.by/resize/50d/50d2bd61c16ec196cb21828adec94e15/246_246_1/df87e1ec08796dbd68a46d8930538bb0.jpg",
        desc: "Чип A18 Pro, 6.9-дюймовый дисплей, тройная камера 48 МП, титановый корпус, кнопка Capture Button, iOS 18.",
        memoryOptions: [
            { size: "256GB", price: 5899, color: "Desert Titanium" },
            { size: "512GB", price: 6499, color: "Desert Titanium" },
            { size: "1TB", price: 7299, color: "Desert Titanium" }
        ],
        defaultMemory: "256GB"
    },
    
    {
        id: 1016,
        name: "Смартфон Apple iPhone 16 Pro Max 256GB (Black Titanium)",
        brand: "iPhone",
        image: "https://images.5element.by/resize/b24/b24a4e2125e1f5f322225f6046cf9d75/246_246_1/ec0653d5348325465bbdec1639a91ab8.jpg",
        desc: "Чип A18 Pro, 6.9-дюймовый дисплей, тройная камера 48 МП, титановый корпус, кнопка Capture Button, iOS 18.",
        memoryOptions: [
            { size: "256GB", price: 5899, color: "Black Titanium" },
            { size: "512GB", price: 6499, color: "Black Titanium" },
            { size: "1TB", price: 7299, color: "Black Titanium" }
        ],
        defaultMemory: "256GB"
    },

    // === iPhone 16 Pro (2024) ===

    {
        id: 1018,
        name: "Смартфон Apple iPhone 16 Pro 256GB (Desert Titanium)",
        brand: "iPhone",
        image: "https://images.5element.by/resize/70b/70bd28d595d1640dbd7012cced66dbbf/246_246_1/f91962e27a390fe39bf6a612353284ef.jpg",
        desc: "Чип A18 Pro, 6.3-дюймовый дисплей, тройная камера 48 МП, титановый корпус, кнопка Capture Button, iOS 18.",
        memoryOptions: [
            { size: "256GB", price: 5299, color: "Desert Titanium" },
            { size: "512GB", price: 5899, color: "Desert Titanium" },
            { size: "1TB", price: 6599, color: "Desert Titanium" }
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1019,
        name: "Смартфон Apple iPhone 16 Pro 256GB (White Titanium)",
        brand: "iPhone",
        image: "https://images.5element.by/resize/965/9652d924c1814a3a43e346a6173b10da/246_246_1/ab512c060b3b413878e8cf1d6a7c8f62.jpg",
        desc: "Чип A18 Pro, 6.3-дюймовый дисплей, тройная камера 48 МП, титановый корпус, кнопка Capture Button, iOS 18.",
        memoryOptions: [
            { size: "256GB", price: 5299, color: "White Titanium" },
            { size: "512GB", price: 5899, color: "White Titanium" },
            { size: "1TB", price: 6599, color: "White Titanium" }
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1020,
        name: "Смартфон Apple iPhone 16 Pro 256GB (Black Titanium)",
        brand: "iPhone",
        image: "https://images.5element.by/resize/b24/b24a4e2125e1f5f322225f6046cf9d75/246_246_1/ec0653d5348325465bbdec1639a91ab8.jpg",
        desc: "Чип A18 Pro, 6.3-дюймовый дисплей, тройная камера 48 МП, титановый корпус, кнопка Capture Button, iOS 18.",
        memoryOptions: [
            { size: "256GB", price: 5299, color: "Black Titanium" },
            { size: "512GB", price: 5899, color: "Black Titanium" },
            { size: "1TB", price: 6599, color: "Black Titanium" }
        ],
        defaultMemory: "256GB"
    },

    // === iPhone 16 (2024) ===
    {
        id: 1021,
        name: "Смартфон Apple iPhone 16 128GB (Ultramarine)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-128gb-ultramarin_1.jpg",
        desc: "Чип A18, 6.1-дюймовый дисплей, камера 48 МП, кнопка Action Button, аккумулятор 3561 мАч, iOS 18.",
        memoryOptions: [
            { size: "128GB", price: 3899, color: "Ultramarine" },
            { size: "256GB", price: 4299, color: "Ultramarine" },
            { size: "512GB", price: 4899, color: "Ultramarine" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1022,
        name: "Смартфон Apple iPhone 16 128GB (Pink)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-128gb-rozovyj_1.jpg",
        desc: "Чип A18, 6.1-дюймовый дисплей, камера 48 МП, кнопка Action Button, аккумулятор 3561 мАч, iOS 18.",
        memoryOptions: [
            { size: "128GB", price: 3899, color: "Pink" },
            { size: "256GB", price: 4299, color: "Pink" },
            { size: "512GB", price: 4899, color: "Pink" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1023,
        name: "Смартфон Apple iPhone 16 128GB (Teal)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-128gb-biryuzovyj_1.jpg",
        desc: "Чип A18, 6.1-дюймовый дисплей, камера 48 МП, кнопка Action Button, аккумулятор 3561 мАч, iOS 18.",
        memoryOptions: [
            { size: "128GB", price: 3899, color: "Teal" },
            { size: "256GB", price: 4299, color: "Teal" },
            { size: "512GB", price: 4899, color: "Teal" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1024,
        name: "Смартфон Apple iPhone 16 128GB (Black)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/smartfon-apple-iphone-16-128gb-chernyj_1.jpg",
        desc: "Чип A18, 6.1-дюймовый дисплей, камера 48 МП, кнопка Action Button, аккумулятор 3561 мАч, iOS 18.",
        memoryOptions: [
            { size: "128GB", price: 3899, color: "Black" },
            { size: "256GB", price: 4299, color: "Black" },
            { size: "512GB", price: 4899, color: "Black" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1025,
        name: "Смартфон Apple iPhone 16 128GB (White)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-256gb-belyj_1.jpg",
        desc: "Чип A18, 6.1-дюймовый дисплей, камера 48 МП, кнопка Action Button, аккумулятор 3561 мАч, iOS 18.",
        memoryOptions: [
            { size: "128GB", price: 3899, color: "White" },
            { size: "256GB", price: 4299, color: "White" },
            { size: "512GB", price: 4899, color: "White" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 16 Plus (2024) ===
    {
        id: 1026,
        name: "Смартфон Apple iPhone 16 Plus 128GB (Ultramarine)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-plus-128gb-ultramarin_1.jpg",
        desc: "Чип A18, 6.7-дюймовый дисплей, двойная камера 48 МП, кнопка Action Button, аккумулятор 4323 мАч, iOS 18.",
        memoryOptions: [
            { size: "128GB", price: 4399, color: "Ultramarine" },
            { size: "256GB", price: 4799, color: "Ultramarine" },
            { size: "512GB", price: 5499, color: "Ultramarine" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1027,
        name: "Смартфон Apple iPhone 16 Plus 128GB (Pink)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-16-plus-128gb-rozovyj_1.jpg",
        desc: "Чип A18, 6.7-дюймовый дисплей, двойная камера 48 МП, кнопка Action Button, аккумулятор 4323 мАч, iOS 18.",
        memoryOptions: [
            { size: "128GB", price: 4399, color: "Pink" },
            { size: "256GB", price: 4799, color: "Pink" },
            { size: "512GB", price: 5499, color: "Pink" }
        ],
        defaultMemory: "128GB"
    },
   

    // === iPhone 15 Pro Max (2023) ===
    {
        id: 1029,
        name: "Смартфон Apple iPhone 15 Pro Max 256GB (Natural Titanium)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-pro-max-256gb-prirodnyj-titan_1.jpg",
        desc: "Чип A17 Pro, 6.7-дюймовый дисплей, тройная камера 48 МП, титановый корпус, USB-C, iOS 17.",
        memoryOptions: [
            { size: "256GB", price: 5199, color: "Natural Titanium" },
            { size: "512GB", price: 5799, color: "Natural Titanium" },
            { size: "1TB", price: 6499, color: "Natural Titanium" }
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1030,
        name: "Смартфон Apple iPhone 15 Pro Max 256GB (Blue Titanium)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-pro-max-256gb-sinij-titan_1.jpg",
        desc: "Чип A17 Pro, 6.7-дюймовый дисплей, тройная камера 48 МП, титановый корпус, USB-C, iOS 17.",
        memoryOptions: [
            { size: "256GB", price: 5199, color: "Blue Titanium" },
            { size: "512GB", price: 5799, color: "Blue Titanium" },
            { size: "1TB", price: 6499, color: "Blue Titanium" }
        ],
        defaultMemory: "256GB"
    },

    // === iPhone 15 Pro (2023) ===
    {
        id: 1031,
        name: "Смартфон Apple iPhone 15 Pro 256GB (Natural Titanium)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-pro-128gb-prirodnyj-titan_1.jpg",
        desc: "Чип A17 Pro, 6.1-дюймовый дисплей, тройная камера 48 МП, титановый корпус, USB-C, iOS 17.",
        memoryOptions: [
            { size: "256GB", price: 4699, color: "Natural Titanium" },
            { size: "512GB", price: 5299, color: "Natural Titanium" },
            { size: "1TB", price: 5999, color: "Natural Titanium" }
        ],
        defaultMemory: "256GB"
    },
    {
        id: 1032,
        name: "Смартфон Apple iPhone 15 Pro 256GB (Black Titanium)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-pro-128gb-chernyj-titan_1.jpg",
        desc: "Чип A17 Pro, 6.1-дюймовый дисплей, тройная камера 48 МП, титановый корпус, USB-C, iOS 17.",
        memoryOptions: [
            { size: "256GB", price: 4699, color: "Black Titanium" },
            { size: "512GB", price: 5299, color: "Black Titanium" },
            { size: "1TB", price: 5999, color: "Black Titanium" }
        ],
        defaultMemory: "256GB"
    },

    // === iPhone 15 (2023) ===
    {
        id: 1033,
        name: "Смартфон Apple iPhone 15 128GB (Black)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-128gb-chernyj_1.jpg",
        desc: "Чип A16 Bionic, 6.1-дюймовый дисплей, камера 48 МП, USB-C, Dynamic Island, iOS 17.",
        memoryOptions: [
            { size: "128GB", price: 3299, color: "Black" },
            { size: "256GB", price: 3699, color: "Black" },
            { size: "512GB", price: 4299, color: "Black" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1034,
        name: "Смартфон Apple iPhone 15 128GB (Blue)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-256gb-goluboj_1.jpg",
        desc: "Чип A16 Bionic, 6.1-дюймовый дисплей, камера 48 МП, USB-C, Dynamic Island, iOS 17.",
        memoryOptions: [
            { size: "128GB", price: 3299, color: "Blue" },
            { size: "256GB", price: 3699, color: "Blue" },
            { size: "512GB", price: 4299, color: "Blue" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1035,
        name: "Смартфон Apple iPhone 15 128GB (Green)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-256gb-zelenyj_1.jpg",
        desc: "Чип A16 Bionic, 6.1-дюймовый дисплей, камера 48 МП, USB-C, Dynamic Island, iOS 17.",
        memoryOptions: [
            { size: "128GB", price: 3299, color: "Green" },
            { size: "256GB", price: 3699, color: "Green" },
            { size: "512GB", price: 4299, color: "Green" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 15 Plus (2023) ===
    {
        id: 1036,
        name: "Смартфон Apple iPhone 15 Plus 128GB (Black)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-plus-128gb-chernyj_1.jpg",
        desc: "Чип A16 Bionic, 6.7-дюймовый дисплей, камера 48 МП, USB-C, Dynamic Island, iOS 17.",
        memoryOptions: [
            { size: "128GB", price: 3799, color: "Black" },
            { size: "256GB", price: 4199, color: "Black" },
            { size: "512GB", price: 4799, color: "Black" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1037,
        name: "Смартфон Apple iPhone 15 Plus 128GB (Blue)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-15-plus-256gb-goluboj_1.jpg",
        desc: "Чип A16 Bionic, 6.7-дюймовый дисплей, камера 48 МП, USB-C, Dynamic Island, iOS 17.",
        memoryOptions: [
            { size: "128GB", price: 3799, color: "Blue" },
            { size: "256GB", price: 4199, color: "Blue" },
            { size: "512GB", price: 4799, color: "Blue" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone SE (2022) ===
    {
        id: 1038,
        name: "Смартфон Apple iPhone SE (2022) 64GB (Midnight)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-se-2022-64gb-polnochnyj_1.jpg",
        desc: "Чип A15 Bionic, 4.7-дюймовый дисплей, камера 12 МП, Touch ID, 5G, iOS 15.",
        memoryOptions: [
            { size: "64GB", price: 1899, color: "Midnight" },
            { size: "128GB", price: 2099, color: "Midnight" },
            { size: "256GB", price: 2499, color: "Midnight" }
        ],
        defaultMemory: "64GB"
    },
    {
        id: 1039,
        name: "Смартфон Apple iPhone SE (2022) 64GB (Starlight)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-se-2022-64gb-zvezdnyj_1.jpg",
        desc: "Чип A15 Bionic, 4.7-дюймовый дисплей, камера 12 МП, Touch ID, 5G, iOS 15.",
        memoryOptions: [
            { size: "64GB", price: 1899, color: "Starlight" },
            { size: "128GB", price: 2099, color: "Starlight" },
            { size: "256GB", price: 2499, color: "Starlight" }
        ],
        defaultMemory: "64GB"
    },
    {
        id: 1040,
        name: "Смартфон Apple iPhone SE (2022) 64GB (RED)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-se-2022-128gb-product-red_1.jpg",
        desc: "Чип A15 Bionic, 4.7-дюймовый дисплей, камера 12 МП, Touch ID, 5G, iOS 15.",
        memoryOptions: [
            { size: "64GB", price: 1899, color: "RED" },
            { size: "128GB", price: 2099, color: "RED" },
            { size: "256GB", price: 2499, color: "RED" }
        ],
        defaultMemory: "64GB"
    },

    // === iPhone 14 (2022) ===
    {
        id: 1041,
        name: "Смартфон Apple iPhone 14 128GB (Midnight)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-14-128gb-polunochnyj_1.jpg",
        desc: "Чип A15 Bionic, 6.1-дюймовый дисплей, камера 12 МП, 5G, iOS 16.",
        memoryOptions: [
            { size: "128GB", price: 2799, color: "Midnight" },
            { size: "256GB", price: 3199, color: "Midnight" },
            { size: "512GB", price: 3799, color: "Midnight" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1042,
        name: "Смартфон Apple iPhone 14 128GB (Purple)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-14-128gb-fioletovyj_1.jpg",
        desc: "Чип A15 Bionic, 6.1-дюймовый дисплей, камера 12 МП, 5G, iOS 16.",
        memoryOptions: [
            { size: "128GB", price: 2799, color: "Purple" },
            { size: "256GB", price: 3199, color: "Purple" },
            { size: "512GB", price: 3799, color: "Purple" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 14 Plus (2022) ===
    {
        id: 1043,
        name: "Смартфон Apple iPhone 14 Plus 128GB (Midnight)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-14-plus-128gb-polunochnyj_1.jpg",
        desc: "Чип A15 Bionic, 6.7-дюймовый дисплей, камера 12 МП, 5G, iOS 16.",
        memoryOptions: [
            { size: "128GB", price: 3299, color: "Midnight" },
            { size: "256GB", price: 3699, color: "Midnight" },
            { size: "512GB", price: 4299, color: "Midnight" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1044,
        name: "Смартфон Apple iPhone 14 Plus 128GB (Purple)",
        brand: "iPhone",
        image: "https://i-center.by/images/b/apple-iphone-14-plus-128gb-fioletovyj_1.jpg",
        desc: "Чип A15 Bionic, 6.7-дюймовый дисплей, камера 12 МП, 5G, iOS 16.",
        memoryOptions: [
            { size: "128GB", price: 3299, color: "Purple" },
            { size: "256GB", price: 3699, color: "Purple" },
            { size: "512GB", price: 4299, color: "Purple" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 13 (2021) ===
    {
        id: 1045,
        name: "Смартфон Apple iPhone 13 128GB (Midnight)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A15 Bionic, 6.1-дюймовый дисплей, камера 12 МП, 5G, iOS 15.",
        memoryOptions: [
            { size: "128GB", price: 2399, color: "Midnight" },
            { size: "256GB", price: 2799, color: "Midnight" },
            { size: "512GB", price: 3399, color: "Midnight" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1046,
        name: "Смартфон Apple iPhone 13 128GB (Blue)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-blue-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A15 Bionic, 6.1-дюймовый дисплей, камера 12 МП, 5G, iOS 15.",
        memoryOptions: [
            { size: "128GB", price: 2399, color: "Blue" },
            { size: "256GB", price: 2799, color: "Blue" },
            { size: "512GB", price: 3399, color: "Blue" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1047,
        name: "Смартфон Apple iPhone 13 128GB (Pink)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A15 Bionic, 6.1-дюймовый дисплей, камера 12 МП, 5G, iOS 15.",
        memoryOptions: [
            { size: "128GB", price: 2399, color: "Pink" },
            { size: "256GB", price: 2799, color: "Pink" },
            { size: "512GB", price: 3399, color: "Pink" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 13 mini (2021) ===
    {
        id: 1048,
        name: "Смартфон Apple iPhone 13 mini 128GB (Midnight)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-midnight-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A15 Bionic, 5.4-дюймовый дисплей, камера 12 МП, 5G, iOS 15, компактный дизайн.",
        memoryOptions: [
            { size: "128GB", price: 2099, color: "Midnight" },
            { size: "256GB", price: 2499, color: "Midnight" },
            { size: "512GB", price: 3099, color: "Midnight" }
        ],
        defaultMemory: "128GB"
    },
    {
        id: 1049,
        name: "Смартфон Apple iPhone 13 mini 128GB (Blue)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A15 Bionic, 5.4-дюймовый дисплей, камера 12 МП, 5G, iOS 15, компактный дизайн.",
        memoryOptions: [
            { size: "128GB", price: 2099, color: "Blue" },
            { size: "256GB", price: 2499, color: "Blue" },
            { size: "512GB", price: 3099, color: "Blue" }
        ],
        defaultMemory: "128GB"
    },

    // === iPhone 12 (2020) ===
    {
        id: 1050,
        name: "Смартфон Apple iPhone 12 64GB (Black)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A14 Bionic, 6.1-дюймовый дисплей, камера 12 МП, 5G, MagSafe, iOS 14.",
        memoryOptions: [
            { size: "64GB", price: 1799, color: "Black" },
            { size: "128GB", price: 1999, color: "Black" },
            { size: "256GB", price: 2399, color: "Black" }
        ],
        defaultMemory: "64GB"
    },
    {
        id: 1051,
        name: "Смартфон Apple iPhone 12 64GB (Purple)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-purple-select-2021?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A14 Bionic, 6.1-дюймовый дисплей, камера 12 МП, 5G, MagSafe, iOS 14.",
        memoryOptions: [
            { size: "64GB", price: 1799, color: "Purple" },
            { size: "128GB", price: 1999, color: "Purple" },
            { size: "256GB", price: 2399, color: "Purple" }
        ],
        defaultMemory: "64GB"
    },

    // === iPhone 12 mini (2020) ===
    {
        id: 1052,
        name: "Смартфон Apple iPhone 12 mini 64GB (Black)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-black-select-2020?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A14 Bionic, 5.4-дюймовый дисплей, камера 12 МП, 5G, MagSafe, iOS 14, компактный.",
        memoryOptions: [
            { size: "64GB", price: 1599, color: "Black" },
            { size: "128GB", price: 1799, color: "Black" },
            { size: "256GB", price: 2199, color: "Black" }
        ],
        defaultMemory: "64GB"
    },
    {
        id: 1053,
        name: "Смартфон Apple iPhone 12 mini 64GB (Blue)",
        brand: "iPhone",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-blue-select-2020?wid=512&hei=512&fmt=png-alpha",
        desc: "Чип A14 Bionic, 5.4-дюймовый дисплей, камера 12 МП, 5G, MagSafe, iOS 14, компактный.",
        memoryOptions: [
            { size: "64GB", price: 1599, color: "Blue" },
            { size: "128GB", price: 1799, color: "Blue" },
            { size: "256GB", price: 2199, color: "Blue" }
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
                { size: "256GB", price: 4500, color: "Titanium Black" },
                { size: "512GB", price: 5000, color: "Titanium Black" },
                { size: "1TB", price: 5800, color: "Titanium Black" }
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
                { size: "256GB", price: 3500, color: "Cobalt Violet" },
                { size: "512GB", price: 3900, color: "Cobalt Violet" }
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
                { size: "128GB", price: 2700, color: "Amber Yellow" },
                { size: "256GB", price: 3000, color: "Amber Yellow" }
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
                { size: "128GB", price: 1600, color: "Awesome Blue" },
                { size: "256GB", price: 1850, color: "Awesome Blue" }
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
                { size: "128GB", price: 1200, color: "Awesome Lilac" },
                { size: "256GB", price: 1450, color: "Awesome Lilac" }
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
                { size: "256GB", price: 6800, color: "Silver Shadow" },
                { size: "512GB", price: 7400, color: "Silver Shadow" },
                { size: "1TB", price: 8200, color: "Silver Shadow" }
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
                { size: "256GB", price: 4900, color: "Blue" },
                { size: "512GB", price: 5500, color: "Blue" }
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
                { size: "128GB", price: 2200, color: "Mint" },
                { size: "256GB", price: 2500, color: "Mint" }
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
                { size: "256GB", price: 3300, color: "Black" },
                { size: "512GB", price: 3600, color: "Black" },
                { size: "1TB", price: 4100, color: "Black" }
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
                { size: "256GB", price: 2600, color: "White" },
                { size: "512GB", price: 2900, color: "White" }
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
                { size: "256GB", price: 2100, color: "Alpine Blue" },
                { size: "512GB", price: 2400, color: "Alpine Blue" }
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
                { size: "128GB", price: 1000, color: "Midnight Black" },
                { size: "256GB", price: 1200, color: "Midnight Black" },
                { size: "512GB", price: 1400, color: "Midnight Black" }
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
                { size: "128GB", price: 750, color: "Ice Blue" },
                { size: "256GB", price: 900, color: "Ice Blue" }
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
                { size: "256GB", price: 1800, color: "Black" },
                { size: "512GB", price: 2100, color: "Black" }
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
                { size: "256GB", price: 1400, color: "Yellow" },
                { size: "512GB", price: 1650, color: "Yellow" }
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
                { size: "128GB", price: 650, color: "Black" },
                { size: "256GB", price: 800, color: "Black" }
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
                { size: "128GB", price: 350, color: "Navy Blue" },
                { size: "256GB", price: 450, color: "Navy Blue" }
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
                { size: "256GB", price: 4900, color: "Black" },
                { size: "512GB", price: 5500, color: "Black" },
                { size: "1TB", price: 6200, color: "Black" }
            ],
            defaultMemory: "512GB"
        },

        // === HONOR (10 МОДЕЛЕЙ) - уже есть 10, оставляем как есть ===
        {
            id: 1031,
            name: "Смартфон HONOR Magic6 Pro 512GB (Black)",
            brand: "HONOR",
            image: "https://img.honor.com/eu/pub/media/catalog/product/h/n/hn6-pro-meigui.jpg?width=600&height=600&canvas=600,600",
            desc: "Snapdragon 8 Gen 3, 180-нит экран, камера 200 МП, 5600 мАч, 100 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 3400, color: "Black" },
                { size: "512GB", price: 3800, color: "Black" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1032,
            name: "Смартфон HONOR 200 Pro 512GB (Green)",
            brand: "HONOR",
            image: "https://img.honor.com/eu/pub/media/catalog/product/h/o/honor200pro-512gb-green-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Портретный режим Studio Harcourt, Snapdragon 8s Gen 3, 5200 мАч, 100 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 2500, color: "Green" },
                { size: "512GB", price: 2900, color: "Green" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1033,
            name: "Смартфон HONOR X9b 256GB (Orange)",
            brand: "HONOR",
            image: "https://img.honor.com/eu/pub/media/catalog/product/h/o/honorx9b-orange-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Ударопрочный экран, 108 МП камера, 5800 мАч, AMOLED 120 Гц.",
            memoryOptions: [
                { size: "256GB", price: 1300, color: "Orange" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1034,
            name: "Смартфон HONOR 90 256GB (Emerald Green)",
            brand: "HONOR",
            image: "https://img.honor.com/eu/pub/media/catalog/product/h/o/honor90-green-01.jpg?width=600&height=600&canvas=600,600",
            desc: "AMOLED экран 120 Гц, камера 200 МП, Snapdragon 7 Gen 1, 66 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 1700, color: "Emerald Green" },
                { size: "512GB", price: 2000, color: "Emerald Green" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1035,
            name: "Смартфон HONOR X8a 128GB (Midnight Black)",
            brand: "HONOR",
            image: "https://img.honor.com/eu/pub/media/catalog/product/h/o/honorx8a-black-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Бюджетный смартфон, 6.7-дюймовый экран, камера 100 МП, 4500 мАч.",
            memoryOptions: [
                { size: "128GB", price: 550, color: "Midnight Black" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1036,
            name: "Смартфон HONOR Magic V2 512GB (Black)",
            brand: "HONOR",
            image: "https://img.honor.com/eu/pub/media/catalog/product/m/a/magicv2-black-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Складной смартфон, 7.92-дюймовый OLED 120 Гц, Snapdragon 8 Gen 2, 16 ГБ RAM.",
            memoryOptions: [
                { size: "512GB", price: 5900, color: "Black" },
                { size: "1TB", price: 6600, color: "Black" }
            ],
            defaultMemory: "512GB"
        },
        {
            id: 1037,
            name: "Смартфон HONOR Magic5 Pro 256GB (Blue)",
            brand: "HONOR",
            image: "https://img.honor.com/eu/pub/media/catalog/product/h/o/honormagic5pro-blue-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Snapdragon 8 Gen 2, тройная камера 50+50+50 МП, 5100 мАч, IP68.",
            memoryOptions: [
                { size: "256GB", price: 2900, color: "Blue" },
                { size: "512GB", price: 3300, color: "Blue" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1038,
            name: "Смартфон HONOR 70 256GB (Black)",
            brand: "HONOR",
            image: "https://img.honor.com/eu/pub/media/catalog/product/h/o/honor70-black-01.jpg?width=600&height=600&canvas=600,600",
            desc: "AMOLED экран 120 Гц, камера 54 МП, Snapdragon 778G+, 66 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 1450, color: "Black" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1039,
            name: "Смартфон HONOR X7b 128GB (Silver)",
            brand: "HONOR",
            image: "https://img.honor.com/eu/pub/media/catalog/product/h/o/honorx7b-silver-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Бюджетный смартфон, экран 90 Гц, камера 108 МП, аккумулятор 6000 мАч.",
            memoryOptions: [
                { size: "128GB", price: 500, color: "Silver" },
                { size: "256GB", price: 650, color: "Silver" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1040,
            name: "Смартфон HONOR 90 Lite 256GB (Cyan)",
            brand: "HONOR",
            image: "https://img.honor.com/eu/pub/media/catalog/product/h/o/honor90lite-cyan-01.jpg?width=600&height=600&canvas=600,600",
            desc: "6.7-дюймовый экран 90 Гц, тройная камера 100 МП, 4500 мАч, 35 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 850, color: "Cyan" }
            ],
            defaultMemory: "256GB"
        },

        // === HUAWEI (10 МОДЕЛЕЙ) - добавляем недостающие ===
        {
            id: 1041,
            name: "Смартфон HUAWEI Pura 70 Ultra 1TB (Green)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/pura70-ultra/img/pura70-ultra-kv-green.png",
            desc: "Камера Ultra Lighting 50 МП, выдвижной объектив, HarmonyOS 4.2, 5050 мАч, 100 Вт зарядка.",
            memoryOptions: [
                { size: "512GB", price: 5200, color: "Green" },
                { size: "1TB", price: 5900, color: "Green" }
            ],
            defaultMemory: "512GB"
        },
        {
            id: 1042,
            name: "Смартфон HUAWEI Pura 70 Pro 512GB (White)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/pura70-pro/img/pura70-pro-kv-white.png",
            desc: "50 МП Ultra Lighting камера, 100 Вт зарядка, IP68, HarmonyOS 4.2.",
            memoryOptions: [
                { size: "256GB", price: 3800, color: "White" },
                { size: "512GB", price: 4200, color: "White" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1043,
            name: "Смартфон HUAWEI Pura 70 256GB (Black)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/pura70/img/pura70-kv-black.png",
            desc: "Камера 50 МП, 6.6-дюймовый OLED 120 Гц, 4900 мАч, 66 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 2900, color: "Black" },
                { size: "512GB", price: 3300, color: "Black" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1044,
            name: "Смартфон HUAWEI Mate 60 Pro 512GB (Black)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/mate60-pro/img/mate60-pro-black.png",
            desc: "Флагманский смартфон, спутниковая связь, Kirin 9000s, 5000 мАч, 88 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 4100, color: "Black" },
                { size: "512GB", price: 4600, color: "Black" },
                { size: "1TB", price: 5300, color: "Black" }
            ],
            defaultMemory: "512GB"
        },
        {
            id: 1045,
            name: "Смартфон HUAWEI Nova 12s 256GB (Blue)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/nova12s/img/nova12s-kv-blue.png",
            desc: "6.7-дюймовый OLED, 66 Вт SuperCharge, HarmonyOS 4.0.",
            memoryOptions: [
                { size: "256GB", price: 1600, color: "Blue" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1046,
            name: "Смартфон HUAWEI Nova 12 SE 256GB (Green)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/nova12se/img/nova12se-green.png",
            desc: "6.67-дюймовый OLED 90 Гц, камера 108 МП, 4500 мАч, 66 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 1250, color: "Green" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1047,
            name: "Смартфон HUAWEI P60 Pro 512GB (Rococo Pearl)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/p60-pro/img/p60-pro-pearl.png",
            desc: "Камера 48 МП с переменной диафрагмой, 6.67-дюймовый OLED 120 Гц, 4815 мАч.",
            memoryOptions: [
                { size: "256GB", price: 3100, color: "Rococo Pearl" },
                { size: "512GB", price: 3600, color: "Rococo Pearl" }
            ],
            defaultMemory: "256GB"
        },
        {
            id: 1048,
            name: "Смартфон HUAWEI Mate X3 512GB (Dark Green)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/mate-x3/img/mate-x3-green.png",
            desc: "Складной смартфон, 7.85-дюймовый OLED 120 Гц, IPX8, 4800 мАч, 66 Вт зарядка.",
            memoryOptions: [
                { size: "512GB", price: 6800, color: "Dark Green" },
                { size: "1TB", price: 7500, color: "Dark Green" }
            ],
            defaultMemory: "512GB"
        },
        {
            id: 1049,
            name: "Смартфон HUAWEI Nova Y91 128GB (Black)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/nova-y91/img/nova-y91-black.png",
            desc: "Бюджетный смартфон, 6.95-дюймовый экран, аккумулятор 7000 мАч, 22.5 Вт зарядка.",
            memoryOptions: [
                { size: "128GB", price: 550, color: "Black" },
                { size: "256GB", price: 700, color: "Black" }
            ],
            defaultMemory: "128GB"
        },
        {
            id: 1050,
            name: "Смартфон HUAWEI Enjoy 70 128GB (Blue)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/enjoy70/img/enjoy70-blue.png",
            desc: "6.75-дюймовый экран, камера 48 МП, аккумулятор 6000 мАч, HarmonyOS.",
            memoryOptions: [
                { size: "128GB", price: 400, color: "Blue" }
            ],
            defaultMemory: "128GB"
        },
        // Добавляем еще 1 модель Huawei до 10 (Mate 60)
        {
            id: 1050_1,
            name: "Смартфон HUAWEI Mate 60 256GB (Silver)",
            brand: "HUAWEI",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/mate60/img/mate60-silver.png",
            desc: "Kirin 9000s, 6.69-дюймовый OLED 120 Гц, тройная камера 50 МП, 4750 мАч.",
            memoryOptions: [
                { size: "256GB", price: 3300, color: "Silver" },
                { size: "512GB", price: 3800, color: "Silver" }
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
                { size: "256GB", price: 3800, color: "Blue" },
                { size: "512GB", price: 4300, color: "Blue" }
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
                { size: "256GB", price: 3100, color: "Black" },
                { size: "512GB", price: 3600, color: "Black" }
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
                { size: "256GB", price: 1450, color: "Red" }
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
                { size: "256GB", price: 1250 }
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
                { size: "128GB", price: 900, color: "Gold" },
                { size: "256GB", price: 1050, color: "Gold" }
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
                { size: "128GB", price: 650, color: "Black" },
                { size: "256GB", price: 800, color: "Black" }
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
                { size: "256GB", price: 5500, color: "Blue" },
                { size: "512GB", price: 6100, color: "Blue" }
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
                { size: "256GB", price: 1400, color: "Black" }
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
                { size: "64GB", price: 400, color: "Blue" },
                { size: "128GB", price: 500, color: "Blue" }
            ],
            defaultMemory: "64GB"
        },
        {
            id: 1070,
            name: "Смартфон Vivo X80 Pro 512GB (Orange)",
            brand: "Vivo",
            image: "https://bludiode.com/36569-large_default/vivo-x80-pro-12gb512gb-orange.jpg",
            desc: "ZEISS камера, Snapdragon 8 Gen 1, 6.78-дюймовый AMOLED 120 Гц, 80 Вт зарядка.",
            memoryOptions: [
                { size: "256GB", price: 2900, color: "Orange" },
                { size: "512GB", price: 3400, color: "Orange" }
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
                { size: "256GB", price: 2100, color: "Blue" },
                { size: "512GB", price: 2500, color: "Blue" }
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
                { size: "256GB", price: 2300, color: "Silver" },
                { size: "512GB", price: 2700, color: "Silver" }
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
                { size: "256GB", price: 1650, color: "Bluevy" },
                { size: "512GB", price: 1950, color: "Blue" }
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
                { size: "256GB", price: 1500, color: "Green" },
                { size: "512GB", price: 1800, color: "Green" }
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
                { size: "128GB", price: 550, color: "Black" },
                { size: "256GB", price: 700, color: "Black" }
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
                { size: "128GB", price: 450, color: "Gold" }
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
                { size: "256GB", price: 2100, color: "Silver" },
                { size: "512GB", price: 2500, color: "Silver" }
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
                { size: "128GB", price: 600, color: "Blue" },
                { size: "256GB", price: 750, color: "Blue" }
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
                { size: "64GB", price: 250, color: "Blue" },
                { size: "128GB", price: 320, color: "Blue" }
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
                { size: "256GB", price: 2800, color: "White" },
                { size: "512GB", price: 3300, color: "White" }
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
                { size: "36GB/1TB", price: 7200, color: "Space Black" },
                { size: "48GB/1TB", price: 8200, color: "Space Black" },
                { size: "64GB/2TB", price: 9500, color: "Space Black" },
                { size: "128GB/4TB", price: 12500, color: "Space Black" }
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
                { size: "18GB/512GB", price: 5400, color: "Silver" },
                { size: "36GB/1TB", price: 6400, color: "Silver" },
                { size: "48GB/2TB", price: 7600, color: "Silver" }
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
                { size: "8GB/256GB", price: 3900, color: "Midnight" },
                { size: "16GB/512GB", price: 4700, color: "Midnight" },
                { size: "24GB/1TB", price: 5500, color: "Midnight" }
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
                { size: "18GB/512GB", price: 5900, color: "Space Gray" },
                { size: "36GB/1TB", price: 6900, color: "Space Gray" },
                { size: "48GB/2TB", price: 8200, color: "Space Gray" }
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
                { size: "8GB/256GB", price: 3200, color: "Starlight" },
                { size: "16GB/512GB", price: 3900, color: "Starlight" },
                { size: "24GB/1TB", price: 4700, color: "Starlight" }
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
                { size: "36GB/1TB", price: 6700, color: "Space Black" },
                { size: "48GB/1TB", price: 7500, color: "Space Black" },
                { size: "64GB/2TB", price: 8900, color: "Space Black" }
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
                { size: "8GB/256GB", price: 3500, color: "Silver" },
                { size: "16GB/512GB", price: 4300, color: "Silver" },
                { size: "24GB/1TB", price: 5100, color: "Silver" }
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
                { size: "32GB/1TB", price: 12000, color: "Silver" },
                { size: "64GB/2TB", price: 7200, color: "Silver" },
                { size: "96GB/4TB", price: 9200, color: "Silver" }
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
                { size: "8GB/256GB", price: 3400, color: "Gold" },
                { size: "16GB/512GB", price: 4100, color: "Gold" },
                { size: "24GB/1TB", price: 4900, color: "Gold" }
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
                { size: "16GB/512GB", price: 4500, color: "Space Gray" },
                { size: "32GB/1TB", price: 5500, color: "Space Gray" },
                { size: "32GB/2TB", price: 6500, color: "Space Gray" }
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
                { size: "32GB/1TB", price: 8200, color: "Black" },
                { size: "64GB/2TB", price: 9500, color: "Black" },
                { size: "64GB/4TB", price: 11200, color: "Black" }
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
                { size: "16GB/1TB", price: 4800, color: "Eclipse Gray" },
                { size: "32GB/1TB", price: 5500, color: "Eclipse Gray" },
                { size: "32GB/2TB", price: 6200, color: "Eclipse Gray" }
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
                { size: "32GB/1TB", price: 5200, color: "Black" },
                { size: "64GB/2TB", price: 6200, color: "Black" },
                { size: "64GB/4TB", price: 7200, color: "Black" }
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
                { size: "16GB/512GB", price: 2900, color: "Jaeger Gray" },
                { size: "32GB/1TB", price: 3500, color: "Jaeger Gray" },
                { size: "32GB/2TB", price: 4100, color: "Jaeger Gray" }
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
                { size: "16GB/1TB", price: 3600, color: "Scandinavian White" },
                { size: "32GB/1TB", price: 4300, color: "Scandinavian White" },
                { size: "32GB/2TB", price: 5000, color: "Scandinavian White" }
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
                { size: "16GB/1TB", price: 4100, color: "Black" },
                { size: "32GB/1TB", price: 4800, color: "Black" },
                { size: "32GB/2TB", price: 5500, color: "Black" }
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
                { size: "16GB/512GB", price: 2100, color: "Silver" },
                { size: "16GB/1TB", price: 2500, color: "Silver" },
                { size: "24GB/1TB", price: 3000, color: "Silver" }
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
                { size: "16GB/512GB", price: 3400, color: "Black" },
                { size: "32GB/1TB", price: 4100, color: "Black" },
                { size: "32GB/2TB", price: 4800, color: "Black" }
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
        { size: "16GB/512GB", price: 3499, color: "Black" }
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
        { size: "16GB/1TB", price: 6999, color: "Black" }
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
        { size: "16GB/1TB", price: 5050, color: "Black" }
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
        { size: "16GB/1TB", price: 4099, color: "Black" }
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
        { size: "16GB/512GB", price: 3799, color: "Black" }
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
        { size: "16GB/512GB", price: 4670, color: "Black" }
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
        { size: "16GB/1TB", price: 4266, color: "Black" }
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
        { size: "16GB/512GB", price: 4641, color: "Black" }
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
        { size: "16GB/512GB", price: 3691, color: "Black" }
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
        { size: "16GB/1TB", price: 6588, color: "Black" }
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
        { size: "16GB/1TB", price: 5537, color: "Black" }
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
        { size: "16GB/512GB", price: 4761, color: "Black" }
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
        { size: "16GB/1TB", price: 5501, color: "Black" }
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
        { size: "16GB/512GB", price: 4888, color: "Black" }
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
        { size: "16GB/512GB", price: 4877, color: "Black" }
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
        { size: "16GB/1TB", price: 5946, color: "Black" }
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
        { size: "16GB/1TB", price: 5999, color: "Black" }
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
        { size: "16GB/1TB", price: 6910, color: "Black" }
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
        { size: "16GB/1TB", price: 4299, color: "Black" }
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
        { size: "16GB/1TB", price: 4499, color: "Black" }
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
        { size: "16GB/512GB", price: 3999, color: "Black" }
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
        { size: "16GB/512GB", price: 4599, color: "Black" }
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
        { size: "16GB/512GB", price: 3599, color: "Black" }
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
        { size: "16GB/512GB", price: 5399, color: "Black" }
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
                { size: "32GB/1TB", price: 6800, color: "Carbon Black" },
                { size: "64GB/2TB", price: 7900, color: "Carbon Black" },
                { size: "64GB/4TB", price: 9200, color: "Carbon Black" }
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
                { size: "16GB/512GB", price: 5100, color: "Black" },
                { size: "32GB/1TB", price: 6900, color: "Black" },
                { size: "32GB/2TB", price: 7700, color: "Black" }
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
                { size: "16GB/1TB", price: 3900, color: "Storm Grey" },
                { size: "32GB/1TB", price: 4600, color: "Storm Grey" },
                { size: "32GB/2TB", price: 5300, color: "Storm Grey" }
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
                { size: "16GB/512GB", price: 3400, color: "Storm Grey" },
                { size: "32GB/1TB", price: 4100, color: "Storm Grey" },
                { size: "32GB/2TB", price: 4800, color: "Storm Grey" }
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
                { size: "16GB/512GB", price: 2800, color: "Black" },
                { size: "32GB/1TB", price: 3500, color: "Black" },
                { size: "32GB/2TB", price: 4200, color: "Black" }
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
                { size: "16GB/1TB", price: 3100, color: "Dual Tone" },
                { size: "32GB/1TB", price: 3800, color: "Dual Tone" },
                { size: "32GB/2TB", price: 4500, color: "Dual Tone" }
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
                { size: "16GB/512GB", price: 2600, color: "White" },
                { size: "16GB/1TB", price: 3000, color: "White" },
                { size: "32GB/1TB", price: 3500, color: "White" }
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
                { size: "16GB/512GB", price: 1900, color: "Arctic Grey" },
                { size: "16GB/1TB", price: 2300, color: "Arctic Grey" }
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
                { size: "16GB/1TB", price: 4700, color: "Shadow Black" },
                { size: "32GB/1TB", price: 5500, color: "Shadow Black" },
                { size: "32GB/2TB", price: 6300, color: "Shadow Black" }
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
                { size: "16GB/1TB", price: 2900, color: "Silver" },
                { size: "32GB/1TB", price: 3500, color: "Silver" },
                { size: "32GB/2TB", price: 4200, color: "Silver" }
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
                { size: "32GB/512GB", price: 4100, color: "Black" },
                { size: "64GB/1TB", price: 5200, color: "Black" },
                { size: "64GB/2TB", price: 6200, color: "Black" }
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
                { size: "16GB/512GB", price: 2100, color: "Blue" },
                { size: "16GB/1TB", price: 2500, color: "Blue" },
                { size: "32GB/1TB", price: 3000, color: "Blue" }
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
                { size: "8GB/256GB", price: 950, color: "Silver" }
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
                { size: "16GB/512GB", price: 1400, color: "Silver" },
                { size: "16GB/1TB", price: 1800, color: "Silver" }
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
                { size: "32GB/1TB", price: 5800, color: "Black" },
                { size: "32GB/2TB", price: 6600, color: "Black" },
                { size: "64GB/2TB", price: 7600, color: "Black" }
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
        { size: "16GB/512GB", price: 2899, color: "Black" }
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
        { size: "16GB/512GB", price: 3999, color: "Black" }
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
        { size: "16GB/512GB", price: 4299, color: "Black" }
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
        { size: "32GB/1TB", price: 6999, color: "Black" }
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
        { size: "32GB/1TB", price: 7499, color: "Black" }
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
        { size: "16GB/1TB", price: 4899, color: "Black" }
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
        { size: "16GB/512GB", price: 3499, color: "Black" }
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
        { size: "16GB/1TB", price: 4799, color: "Black" }
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
        { size: "16GB/1TB", price: 6199, color: "Black" }
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
        { size: "32GB/1TB", price: 12255, color: "Black" }
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
        { size: "16GB/512GB", price: 1999, color: "Gray" }
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
        { size: "16GB/512GB", price: 2299, color: "Gray" }
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
        { size: "16GB/512GB", price: 2699, color: "Gray" }
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
        { size: "16GB/512GB", price: 2399, color: "Gray" }
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
        { size: "16GB/1TB", price: 3539, color: "Silver" }
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
        { size: "16GB/1TB", price: 3702, color: "Gray" }
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
        { size: "16GB/512GB", price: 4381, color: "Gray" }
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
        { size: "16GB/512GB", price: 3189, color: "Silver" }
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
        { size: "32GB/1TB", price: 6999, color: "Silver" }
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
        { size: "8GB/512GB", price: 1999, color: "Silver" }
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
        { size: "24GB/1TB", price: 4499, color: "Gray" }
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
        { size: "24GB/1TB", price: 4499, color: "Gray" }
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
        { size: "32GB/1TB", price: 7999, color: "Black" }
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
        { size: "8GB/512GB", price: 1699, color: "Gray" }
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
        { size: "8GB/512GB", price: 1784, color: "Silver" }
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
        { size: "32GB/1TB", price: 6199, color: "Silver" }
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
        { size: "16GB/1TB", price: 3799, color: "Gray" }
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
        { size: "32GB/1TB", price: 5499, color: "Silver" }
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
        { size: "16GB/256GB", price: 2999, color: "Midnight" }
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
        { size: "16GB/256GB", price: 2999, color: "Starlight" }
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
        { size: "16GB/256GB", price: 3899, color: "Midnight" }
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
        { size: "16GB/512GB", price: 2491, color: "Gray" }
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
        { size: "16GB/512GB", price: 4199, color: "Midnight" }
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
        { size: "16GB/256GB", price: 4999, color: "Silver" }
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
        { size: "16GB/512GB", price: 3761, color: "Gray" }
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
        { size: "16GB/512GB", price: 3599, color: "Gray" }
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
        { size: "32GB/1TB", price: 5399, color: "Gray" }
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
        { size: "16GB/512GB", price: 2899, color: "Gray" }
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
        { size: "16GB/1TB", price: 2299, color: "Gray" }
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
        { size: "16GB/512GB", price: 1899, color: "Gray" }
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
        { size: "16GB/512GB", price: 2549, color: "Gray" }
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
        { size: "16GB/512GB", price: 6999, color: "Silver" }
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
        { size: "16GB/256GB", price: 3899, color: "Silver" }
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
        { size: "16GB/256GB", price: 3899, color: "Space Gray" }
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
        { size: "16GB/512GB", price: 6999, color: "Silver" }
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
        { size: "16GB/256GB", price: 3899, color: "Silver" }
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
        { size: "16GB/256GB", price: 5680, color: "Midnight" }
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
        { size: "16GB/1TB", price: 3539, color: "Silver" }
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
        { size: "16GB/512GB", price: 4710, color: "Black" }
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
        { size: "16GB/512GB", price: 4049, color: "Gray" }
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
        { size: "16GB/512GB", price: 2844, color: "Gray" }
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
        { size: "32GB/1TB", price: 10340, color: "Black" }
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
                { size: "16GB/1TB", price: 4200, color: "Black" },
                { size: "32GB/1TB", price: 4900, color: "Black" }
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
                { size: "16GB/1TB", price: 3800, color: "White" },
                { size: "32GB/1TB", price: 4500, color: "White" }
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
                { size: "32GB/1TB", price: 5100, color: "Black" },
                { size: "32GB/2TB", price: 5900, color: "Black" }
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
    price: 359,
    memoryOptions: [
        { size: "23L", price: 359, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 676,
    name: "Микроволновая печь Samsung MS23K3614AW/BW",
    brand: "Samsung",
    image: "images/8e85a87ac63a985883faca477d63328b.avif",
    desc: "23 л, мощность 800 Вт, механическое управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 399,
    memoryOptions: [
        { size: "23L", price: 399, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 677,
    name: "Микроволновая печь Samsung MS23A7013AB/BW",
    brand: "Samsung",
    image: "images/8f014d77c3676c79b018a47770462b14.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, керамика, диаметр тарелки 288 мм, встраиваемая.",
    price: 739,
    memoryOptions: [
        { size: "23L", price: 739, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 678,
    name: "Микроволновая печь Samsung MG23K3515AW/BW",
    brand: "Samsung",
    image: "images/1ebdfe7b220df7960ad8bb5535f48ef5.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 479,
    memoryOptions: [
        { size: "23L", price: 479, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 679,
    name: "Микроволновая печь Samsung MS23T5018AC/BW",
    brand: "Samsung",
    image: "images/d3a28e0007353860fb537914585e780f.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 489,
    memoryOptions: [
        { size: "23L", price: 489, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 680,
    name: "Микроволновая печь встраиваемая SAMSUNG MG22M8054AK/BW",
    brand: "Samsung",
    image: "images/fb703fe8f62e30a73fcb1ff73b0ad5ac.avif",
    desc: "22 л, мощность 850 Вт, электронное управление, гриль, биокерамическое покрытие, диаметр тарелки 255 мм, встраиваемая.",
    price: 949,
    memoryOptions: [
        { size: "22L", price: 949, color: "Black" }
    ],
    defaultMemory: "22L"
},
{
    id: 681,
    name: "Микроволновая печь Samsung MS23A7118AK/BW",
    brand: "Samsung",
    image: "images/dad8f1d03bc6c0aa6137ab8c3aa41052.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, керамика, диаметр тарелки 288 мм, встраиваемая.",
    price: 929,
    memoryOptions: [
        { size: "23L", price: 929, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 682,
    name: "Встраиваемая микроволновая печь Samsung MS23A7118AW/BW",
    brand: "Samsung",
    image: "images/3e71d5370e12b8bb145fae4a9ef2e64a.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, встраиваемая.",
    price: 899,
    memoryOptions: [
        { size: "23L", price: 899, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 683,
    name: "Микроволновая печь Samsung MS23K3614AK/BW черный",
    brand: "Samsung",
    image: "images/b8d60a5e7a9fe48812595cb47bedf688.avif",
    desc: "23 л, мощность 800 Вт, механическое управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 399,
    memoryOptions: [
        { size: "23L", price: 399, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 684,
    name: "Микроволновая печь Samsung MS23K3513AS/BW",
    brand: "Samsung",
    image: "images/3a67226b03ab40f26ba71d2e6e119d1a.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 449,
    memoryOptions: [
        { size: "23L", price: 449, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 685,
    name: "Микроволновая печь Samsung MG23T5018AK/BW",
    brand: "Samsung",
    image: "images/4a48f2fea9edaa7e4b8b930511406331.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 529,
    memoryOptions: [
        { size: "23L", price: 529, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 686,
    name: "Микроволновая печь Samsung MG23T5018AN/BW",
    brand: "Samsung",
    image: "images/8b5f09fea091dd01573bf4202545a21a.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 509,
    memoryOptions: [
        { size: "23L", price: 509, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 687,
    name: "Микроволновая печь Samsung MG23DG4524ATBW",
    brand: "Samsung",
    image: "images/1b6415f09e95c404c642661eb36761a0.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 529,
    memoryOptions: [
        { size: "23L", price: 529, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 688,
    name: "Микроволновая печь Samsung MG23K3513AK/BW",
    brand: "Samsung",
    image: "images/34774f2fb1860a3df6050155c9ee0890.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 495,
    memoryOptions: [
        { size: "23L", price: 495, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 689,
    name: "Микроволновая печь SAMSUNG MC28H5013AK/BW",
    brand: "Samsung",
    image: "images/b5d0e7f5336e14134e0ac3d114cd41de.avif",
    desc: "28 л, мощность 900 Вт, электронное управление, гриль, конвекция, биокерамика, диаметр тарелки 320 мм, отдельностоящая.",
    price: 679,
    memoryOptions: [
        { size: "28L", price: 679, color: "Black" }
    ],
    defaultMemory: "28L"
},
{
    id: 690,
    name: "Микроволновая печь встраиваемая SAMSUNG MG22M8074AT/BW",
    brand: "Samsung",
    image: "images/228c886b546cd3bed890fb1e4708ef34.avif",
    desc: "22 л, мощность 850 Вт, электронное управление, гриль, биокерамическое покрытие, диаметр тарелки 255 мм, встраиваемая.",
    price: 949,
    memoryOptions: [
        { size: "22L", price: 949, color: "White" }
    ],
    defaultMemory: "22L"
},
{
    id: 691,
    name: "Микроволновая печь встраиваемая SAMSUNG MQ8000M (MS22M8054AK/BW)",
    brand: "Samsung",
    image: "images/727050202d3c3c006dd3b5d95b80851e.avif",
    desc: "22 л, мощность 850 Вт, электронное управление, биокерамическое покрытие, диаметр тарелки 255 мм, встраиваемая.",
    price: 949,
    memoryOptions: [
        { size: "22L", price: 949, color: "Black" }
    ],
    defaultMemory: "22L"
},
{
    id: 692,
    name: "Микроволновая печь Samsung MG30T5018AK/BW",
    brand: "Samsung",
    image: "images/cac905abb602d3e15a67678188f41746.avif",
    desc: "30 л, мощность 900 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 318 мм, отдельностоящая.",
    price: 649,
    memoryOptions: [
        { size: "30L", price: 649, color: "Black" }
    ],
    defaultMemory: "30L"
},
{
    id: 693,
    name: "Микроволновая печь Samsung MG23DG4524AGBW",
    brand: "Samsung",
    image: "images/6c8f8e41be03edd0cb5abc098d377155.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 529,
    memoryOptions: [
        { size: "23L", price: 529, color: "Gray" }
    ],
    defaultMemory: "23L"
},
{
    id: 694,
    name: "Микроволновая печь Samsung MS32DG4504AGBW",
    brand: "Samsung",
    image: "images/b9a6db7b02eda7ff7b8731a57949e6fc.avif",
    desc: "32 л, мощность 800 Вт, электронное управление, биокерамика, отдельностоящая.",
    price: 579,
    memoryOptions: [
        { size: "32L", price: 579, color: "Gray" }
    ],
    defaultMemory: "32L"
},
{
    id: 695,
    name: "Встраевамая микроволновая печь Samsung MG23A7013AA/BW",
    brand: "Samsung",
    image: "images/8c714d1d3c7c8b389bba220a30c34075.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, керамика, диаметр тарелки 288 мм, встраиваемая.",
    price: 979,
    memoryOptions: [
        { size: "23L", price: 979, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 696,
    name: "Микроволновая печь Samsung MS23T5018AG/BW",
    brand: "Samsung",
    image: "images/7d80ba0dfd41d2fd5dfda2a1bc42ac25.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 489,
    memoryOptions: [
        { size: "23L", price: 489, color: "Gray" }
    ],
    defaultMemory: "23L"
},
{
    id: 697,
    name: "Микроволновая печь Samsung MS23DG4504ATBW",
    brand: "Samsung",
    image: "images/b781264461354f11a2e587dd6e658a01.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 489,
    memoryOptions: [
        { size: "23L", price: 489, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 698,
    name: "Микроволновая печь Samsung MG23K3515AK/BW",
    brand: "Samsung",
    image: "images/820aa8daddc04baf60f1f5e4fa635358.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, биокерамика, диаметр тарелки 288 мм, отдельностоящая.",
    price: 499,
    memoryOptions: [
        { size: "23L", price: 499, color: "Black" }
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
    price: 316,
    memoryOptions: [
        { size: "20L", price: 316, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 652,
    name: "Микроволновая печь LG MS2042DY",
    brand: "LG",
    image: "images/d48f0c7373ed5e9399368809b4702153.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, легкоочищаемое покрытие, диаметр тарелки 245 мм, отдельностоящая.",
    price: 316,
    memoryOptions: [
        { size: "20L", price: 316, color: "Yellow" }
    ],
    defaultMemory: "20L"
},
{
    id: 653,
    name: "Микроволновая печь LG MS2042DB",
    brand: "LG",
    image: "images/f3ffa3b80aadf9f1bc9625af645c9398.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, легкоочищаемое покрытие, диаметр тарелки 245 мм, отдельностоящая.",
    price: 316,
    memoryOptions: [
        { size: "20L", price: 316, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 654,
    name: "Микроволновая печь LG MS2032GAS",
    brand: "LG",
    image: "images/01ae2d051744f14cab50afe307e28e69.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, диаметр тарелки 245 мм, отдельностоящая.",
    price: 408,
    memoryOptions: [
        { size: "20L", price: 408, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 655,
    name: "Микроволновая печь с технологией Smart Inverter LG MW23R35GIB",
    brand: "LG",
    image: "images/a6572e785816c32098198b99b876ac03.avif",
    desc: "23 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 469,
    memoryOptions: [
        { size: "23L", price: 469, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 656,
    name: "Микроволновая печь с технологией Smart Inverter LG MS2596CIT",
    brand: "LG",
    image: "images/f4813ece9c333202365dbe99f423c624.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 552,
    memoryOptions: [
        { size: "25L", price: 552, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 657,
    name: "Микроволновая печь LG MS20R42D",
    brand: "LG",
    image: "images/406c0465be5d9cc44ee6dcb156c9e1ac.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, легкоочищаемое покрытие, диаметр тарелки 245 мм, отдельностоящая.",
    price: 317,
    memoryOptions: [
        { size: "20L", price: 317, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 658,
    name: "Микроволновая печь LG MW23D35GIH",
    brand: "LG",
    image: "images/5ec329ee578cfca80b87be38fabd808e.avif",
    desc: "23 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 469,
    memoryOptions: [
        { size: "23L", price: 469, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 659,
    name: "Микроволновая печь LG MH6336GIB",
    brand: "LG",
    image: "images/ff810d95b68f6d399b61a42fdb826750.avif",
    desc: "23 л, мощность 1000 Вт, электронное управление, гриль, эмаль, диаметр тарелки 292 мм, отдельностоящая.",
    price: 509,
    memoryOptions: [
        { size: "23L", price: 509, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 660,
    name: "Микроволновая печь LG MW23R35GIH",
    brand: "LG",
    image: "images/bce447f97ebf79a59c163efd95970526.avif",
    desc: "23 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 485,
    memoryOptions: [
        { size: "23L", price: 485, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 661,
    name: "Микроволновая печь LG MW25R35GISL",
    brand: "LG",
    image: "images/304938cd040abb88465d81494c4ba996.avif",
    desc: "25 л, мощность 1150 Вт, электронное управление, инвертор, антибактериальное покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 575,
    memoryOptions: [
        { size: "25L", price: 575, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 662,
    name: "Микроволновая печь LG MS2535GIS",
    brand: "LG",
    image: "images/92ebcdc3f47bb1f71a8dff4a64810147.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 534,
    memoryOptions: [
        { size: "25L", price: 534, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 663,
    name: "Микроволновая печь LG MS2044V",
    brand: "LG",
    image: "images/a543d1084ae1b7abae42966eb924fb21.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 317,
    memoryOptions: [
        { size: "20L", price: 317, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 664,
    name: "Микроволновая печь с технологией Smart Inverter LG MH63M38GISW",
    brand: "LG",
    image: "images/05d9f052464fbfdf93f922536894759e.avif",
    desc: "23 л, мощность 1000 Вт, сенсорное управление, инвертор, гриль, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 504,
    memoryOptions: [
        { size: "23L", price: 504, color: "White" }
    ],
    defaultMemory: "23L"
},
{
    id: 665,
    name: "Микроволновая печь LG MW25R35GIS",
    brand: "LG",
    image: "images/665c9d07e63b9b8b536ab1846417535a.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 563,
    memoryOptions: [
        { size: "25L", price: 563, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 666,
    name: "Микроволновая печь LG MW23W35GIB",
    brand: "LG",
    image: "images/035be05cc8707c5a219ef3d886dbb93a.avif",
    desc: "23 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 478,
    memoryOptions: [
        { size: "23L", price: 478, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 667,
    name: "Микроволновая печь LG MH6032GAS",
    brand: "LG",
    image: "images/9a60fb41c778d76776128257c2fe2152.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, гриль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 438,
    memoryOptions: [
        { size: "20L", price: 438, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 668,
    name: "Микроволновая печь LG MB65W65DIR",
    brand: "LG",
    image: "images/e434b1114d1cd3cfbc8ab4c6735cb207 (1).avif",
    desc: "25 л, мощность 1000 Вт, электронное управление, гриль, антибактериальное покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 621,
    memoryOptions: [
        { size: "25L", price: 621, color: "White" }
    ],
    defaultMemory: "25L"
},
{
    id: 669,
    name: "Микроволновая печь LG MJ3966ACT",
    brand: "LG",
    image: "images/0fb69732fb6dde3f560f58bf31c8886b.avif",
    desc: "39 л, мощность 1100 Вт, сенсорное управление, гриль, конвекция, легкоочищаемое покрытие, диаметр тарелки 360 мм, отдельностоящая.",
    price: 999,
    memoryOptions: [
        { size: "39L", price: 999, color: "Black" }
    ],
    defaultMemory: "39L"
},
{
    id: 670,
    name: "Микроволновая печь LG MW25R35GISH",
    brand: "LG",
    image: "images/da21a6831330abae71565819d7fc4664.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, инвертор, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 561,
    memoryOptions: [
        { size: "25L", price: 561, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 671,
    name: "Микроволновая печь LG MS2535GISH",
    brand: "LG",
    image: "images/f070216f1af2384b049d285ffaffa8e7.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 539,
    memoryOptions: [
        { size: "25L", price: 539, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 672,
    name: "Микроволновая печь LG MJ3965BIS",
    brand: "LG",
    image: "images/146dc22d5a3666532403c200e63b83c4.avif",
    desc: "39 л, мощность 1100 Вт, сенсорное управление, гриль, конвекция, легкоочищаемое покрытие, диаметр тарелки 360 мм, отдельностоящая.",
    price: 1266,
    memoryOptions: [
        { size: "39L", price: 1266, color: "Black" }
    ],
    defaultMemory: "39L"
},
{
    id: 673,
    name: "Встраиваемая микроволновая печь LG MS2595CIST",
    brand: "LG",
    image: "images/9f9f79af8c7db137d29c4f59fdba88c0.avif",
    desc: "25 л, мощность 1150 Вт, электронное управление, антибактериальное покрытие, эмаль, диаметр тарелки 292 мм, встраиваемая.",
    price: 889,
    memoryOptions: [
        { size: "25L", price: 889, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 674,
    name: "Микроволновая печь с технологией Smart Inverter LG MB65R95DIS",
    brand: "LG",
    image: "images/44d87f6441747e51f52e32c6b70186f2.avif",
    desc: "25 л, мощность 1000 Вт, сенсорное управление, инвертор, гриль, легкоочищаемое покрытие, диаметр тарелки 292 мм, отдельностоящая.",
    price: 603,
    memoryOptions: [
        { size: "25L", price: 603, color: "Black" }
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
    price: 715,
    memoryOptions: [
        { size: "20L", price: 715, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 646,
    name: "Микроволновая печь Panasonic NN-C69MSZPE",
    brand: "Panasonic",
    image: "images/1b4bebb0fa7941f9812595fd173ee627.avif",
    desc: "30 л, мощность 1000 Вт, электронное управление, гриль, конвекция, нержавеющая сталь, диаметр тарелки 315 мм, отдельностоящая.",
    price: 1395,
    memoryOptions: [
        { size: "30L", price: 1395, color: "Silver" }
    ],
    defaultMemory: "30L"
},
{
    id: 647,
    name: "Микроволновая печь Panasonic NN-CS89LBZPE",
    brand: "Panasonic",
    image: "images/a16b8e108c7ee689b741724deef6adc5.avif",
    desc: "31 л, мощность 1000 Вт, электронное управление, нержавеющая сталь, отдельностоящая.",
    price: 4162,
    memoryOptions: [
        { size: "31L", price: 4162, color: "Black" }
    ],
    defaultMemory: "31L"
},
{
    id: 648,
    name: "Микроволновая печь Panasonic NN-SD36HBZPE",
    brand: "Panasonic",
    image: "images/dbbf9b89076a68a7084d838ea7dfafd9.avif",
    desc: "23 л, мощность 1000 Вт, электронное управление, эмаль, диаметр тарелки 285 мм, отдельностоящая.",
    price: 892,
    memoryOptions: [
        { size: "23L", price: 892, color: "Black" }
    ],
    defaultMemory: "23L"
},
{
    id: 649,
    name: "Микроволновая печь PANASONIC NN-GD38HSZPE",
    brand: "Panasonic",
    image: "images/0ce1da028820f996e3dba318c5e77ade.avif",
    desc: "23 л, мощность 1000 Вт, электронное управление, гриль, эмаль, диаметр тарелки 285 мм, отдельностоящая.",
    price: 801,
    memoryOptions: [
        { size: "23L", price: 801, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 650,
    name: "Микроволновая печь PANASONIC NN-GT264MZPE",
    brand: "Panasonic",
    image: "images/b1f82b880eea4b5b044a572b80778e6a.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 559,
    memoryOptions: [
        { size: "20L", price: 559, color: "Silver" }
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
    price: 1066,
    memoryOptions: [
        { size: "25L", price: 1066, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 630,
    name: "Встраиваемая микроволновая печь Haier HMX-BTG259W",
    brand: "Haier",
    image: "images/25a1d986bcc4d708d6b073940d47169c.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1069,
    memoryOptions: [
        { size: "25L", price: 1069, color: "White" }
    ],
    defaultMemory: "25L"
},
{
    id: 631,
    name: "Микроволновая печь Haier HMX-BPG259B",
    brand: "Haier",
    image: "images/695bc2fce3f76bfdd07163256869c7d5.avif",
    desc: "25 л, мощность 900 Вт, сенсорное управление, гриль, конвекция, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1246,
    memoryOptions: [
        { size: "25L", price: 1246, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 632,
    name: "Микроволновая печь Haier HMB-MM207SA",
    brand: "Haier",
    image: "images/e51303dbef348b6330e4e9adbbab8cab.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 293,
    memoryOptions: [
        { size: "20L", price: 293, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 633,
    name: "Микроволновая печь Haier HMB-MM207WA",
    brand: "Haier",
    image: "images/add9550a30d9b22e5cd91df195993773.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 273,
    memoryOptions: [
        { size: "20L", price: 273, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 634,
    name: "Микроволновая печь Haier HMX-BTG259LX",
    brand: "Haier",
    image: "images/9ad0dba8c57eb1c597310e50d81d7113.avif",
    desc: "25 л, мощность 900 Вт, сенсорное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1016,
    memoryOptions: [
        { size: "25L", price: 1016, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 635,
    name: "Микроволновая печь Haier HMB-DM208SA",
    brand: "Haier",
    image: "images/255a916dd74640a0d2f4381f4db0d72e.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 342,
    memoryOptions: [
        { size: "20L", price: 342, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 636,
    name: "Микроволновая печь Haier HMB-DM208BA",
    brand: "Haier",
    image: "images/33cd415e79cfa42c08bbb3ad8054584a.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 323,
    memoryOptions: [
        { size: "20L", price: 323, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 637,
    name: "Микроволновая печь Haier HMB-MM208SA",
    brand: "Haier",
    image: "images/077b6d274840b1e3546fb8dee70ea7da.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 313,
    memoryOptions: [
        { size: "20L", price: 313, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 638,
    name: "Микроволновая печь Haier HMB-MM208BA",
    brand: "Haier",
    image: "images/9c09e9d76959e385594c1af6975255ed.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 295,
    memoryOptions: [
        { size: "20L", price: 295, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 639,
    name: "Встраиваемая микроволновая печь Haier HMX-BDC399B",
    brand: "Haier",
    image: "images/384e081be32d5618c0aabf66d48b71e9.avif",
    desc: "40 л, мощность 900 Вт, электронное управление, гриль, конвекция, эмаль, встраиваемая.",
    price: 2291,
    memoryOptions: [
        { size: "40L", price: 2291, color: "Black" }
    ],
    defaultMemory: "40L"
},
{
    id: 640,
    name: "Микроволновая печь Haier HMB-DG208SA",
    brand: "Haier",
    image: "images/6f041cbcabe55ae3dfdc40184cc3988b.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 362,
    memoryOptions: [
        { size: "20L", price: 362, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 641,
    name: "Встраиваемая микроволновая печь Haier HMX-BDC399W",
    brand: "Haier",
    image: "images/4ad50e3467cd679287ccb1551ac923f4.avif",
    desc: "40 л, мощность 900 Вт, электронное управление, гриль, конвекция, эмаль, встраиваемая.",
    price: 2064,
    memoryOptions: [
        { size: "40L", price: 2064, color: "White" }
    ],
    defaultMemory: "40L"
},
{
    id: 642,
    name: "Микроволновая печь Haier HMX-BTG207X",
    brand: "Haier",
    image: "images/6b0a5d412581394e6fa3b15630e82015.avif",
    desc: "20 л, мощность 700 Вт, сенсорное управление, гриль, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 931,
    memoryOptions: [
        { size: "20L", price: 931, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 643,
    name: "Встраиваемая микроволновая печь Haier HMX-BDG259LX",
    brand: "Haier",
    image: "images/d30931d88df9890d7174d7e8682c8f9f.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 832,
    memoryOptions: [
        { size: "25L", price: 832, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 644,
    name: "Микроволновая печь Haier HMG-DG207BA",
    brand: "Haier",
    image: "images/0f7f8d4311944f31f87b0aba3a41baab.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, гриль, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 563,
    memoryOptions: [
        { size: "20L", price: 563, color: "Black" }
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
    price: 1095,
    memoryOptions: [
        { size: "20L", price: 1095, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 610,
    name: "Встраиваемая микроволновая печь Bosch BFL554MB0",
    brand: "Bosch",
    image: "images/9e7d4a30edbe65843a4af0c1fb993156.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1392,
    memoryOptions: [
        { size: "25L", price: 1392, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 611,
    name: "Микроволновая печь Bosch BFL520MB0",
    brand: "Bosch",
    image: "images/a11067e5c4de0eac3a5bfc2fd570a004.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 1102,
    memoryOptions: [
        { size: "20L", price: 1102, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 612,
    name: "Микроволновая печь Bosch BFL523MB3",
    brand: "Bosch",
    image: "images/9d0d10d20fa511e760d6af1b2f6e5427.avif",
    desc: "20 л, мощность 800 Вт, сенсорное управление, эмаль, диаметр тарелки 270 мм, встраиваемая.",
    price: 838,
    memoryOptions: [
        { size: "20L", price: 838, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 613,
    name: "Микроволновая печь Bosch BFL524MW0",
    brand: "Bosch",
    image: "images/6eb0a36910f91fa536d9c0bacf48c6e8.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 1225,
    memoryOptions: [
        { size: "20L", price: 1225, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 614,
    name: "Встраиваемая микроволновая печь Bosch BFL524MS0",
    brand: "Bosch",
    image: "images/97139555b8097a6e85dc41a549a72c7c.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 1083,
    memoryOptions: [
        { size: "20L", price: 1083, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 615,
    name: "Встраиваемая микроволновая печь Bosch BFL520MS0",
    brand: "Bosch",
    image: "images/2aa7052242322a9a224a4c6f0bc74673.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 880,
    memoryOptions: [
        { size: "20L", price: 880, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 616,
    name: "Встраиваемая микроволновая печь Bosch BEL554MB0",
    brand: "Bosch",
    image: "images/0441400d9e5ec25f7c016e821f4d9168.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1316,
    memoryOptions: [
        { size: "25L", price: 1316, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 617,
    name: "Встраиваемая микроволновая печь Bosch BFL7221B1",
    brand: "Bosch",
    image: "images/ae7e4c557be85225e68e3baf2b72a65e.avif",
    desc: "21 л, мощность 900 Вт, электронное управление, нержавеющая сталь, без поворотного стола, встраиваемая.",
    price: 2755,
    memoryOptions: [
        { size: "21L", price: 2755, color: "Black" }
    ],
    defaultMemory: "21L"
},
{
    id: 618,
    name: "Встраиваемая микроволновая печь Bosch BFL623MB3",
    brand: "Bosch",
    image: "images/93eb944e1a7b74ff233ce52210bc4337.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 270 мм, встраиваемая.",
    price: 977,
    memoryOptions: [
        { size: "20L", price: 977, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 619,
    name: "Встраиваемая микроволновая печь Bosch BEL554MS0",
    brand: "Bosch",
    image: "images/280481cb15b5288a40d0f9aa9e9a7a6a.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1762,
    memoryOptions: [
        { size: "25L", price: 1762, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 620,
    name: "Встраиваемая микроволновая печь Bosch BEL653MW3",
    brand: "Bosch",
    image: "images/2c813e5bed071fabdf27a1d19379f1e5.avif",
    desc: "25 л, мощность 800 Вт, сенсорное управление, гриль, эмаль, диаметр тарелки 290 мм, встраиваемая.",
    price: 1152,
    memoryOptions: [
        { size: "25L", price: 1152, color: "White" }
    ],
    defaultMemory: "25L"
},
{
    id: 621,
    name: "Встраиваемая микроволновая печь Bosch BFL7221W1",
    brand: "Bosch",
    image: "images/1df25b6cefcc106477b09d0f42f6dfa1.avif",
    desc: "21 л, мощность 900 Вт, электронное управление, нержавеющая сталь, без поворотного стола, встраиваемая.",
    price: 2934,
    memoryOptions: [
        { size: "21L", price: 2934, color: "White" }
    ],
    defaultMemory: "21L"
},
{
    id: 622,
    name: "Встраиваемая микроволновая печь Bosch BEL7321B1",
    brand: "Bosch",
    image: "images/6f8d4cc24be1bb4c5194e1968e5ec195.avif",
    desc: "21 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, встраиваемая.",
    price: 3021,
    memoryOptions: [
        { size: "21L", price: 3021, color: "Black" }
    ],
    defaultMemory: "21L"
},
{
    id: 623,
    name: "Встраиваемая микроволновая печь Bosch BFR7221B1",
    brand: "Bosch",
    image: "images/7bb321a1a6f2446383992e94677eea16.avif",
    desc: "21 л, мощность 900 Вт, электронное управление, нержавеющая сталь, встраиваемая.",
    price: 2741,
    memoryOptions: [
        { size: "21L", price: 2741, color: "Black" }
    ],
    defaultMemory: "21L"
},
{
    id: 624,
    name: "Встраиваемая микроволновая печь Bosch BEL623MD3",
    brand: "Bosch",
    image: "images/0ccbe394bd55f1490c64adb83295191e.avif",
    desc: "20 л, мощность 800 Вт, сенсорное управление, гриль, эмаль, диаметр тарелки 270 мм, встраиваемая.",
    price: 1259,
    memoryOptions: [
        { size: "20L", price: 1259, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 625,
    name: "Микроволновая печь Bosch BFL523MW3",
    brand: "Bosch",
    image: "images/f49a97debd948659192fbeb4a727271f.avif",
    desc: "20 л, мощность 800 Вт, сенсорное управление, эмаль, диаметр тарелки 270 мм, встраиваемая.",
    price: 1288,
    memoryOptions: [
        { size: "20L", price: 1288, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 626,
    name: "Встраиваемая микроволновая печь Bosch BFL623MW3",
    brand: "Bosch",
    image: "images/b13867e1d6934875f2d6994261c61820.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 270 мм, встраиваемая.",
    price: 1377,
    memoryOptions: [
        { size: "20L", price: 1377, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 627,
    name: "Встраиваемая микроволновая печь Bosch BFL524MB2",
    brand: "Bosch",
    image: "images/bb1c40265a7890b2e7c2e93e886e735a.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 1581,
    memoryOptions: [
        { size: "20L", price: 1581, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 628,
    name: "Микроволновая печь Bosch BFL623MS3",
    brand: "Bosch",
    image: "images/9e79866e3cd13c0c033000b1acde5beb.avif",
    desc: "20 л, мощность 800 Вт, сенсорное управление, эмаль, диаметр тарелки 270 мм, встраиваемая.",
    price: 1428,
    memoryOptions: [
        { size: "20L", price: 1428, color: "Silver" }
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
    price: 541,
    memoryOptions: [
        { size: "20L", price: 541, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 586,
    name: "Микроволновая печь MAUNFELD MFSMO.20.7SGB",
    brand: "Maunfeld",
    image: "images/7b952dee43b84b43b9504e499fa3723c.avif",
    desc: "20 л, мощность 700 Вт, сенсорное управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 269,
    memoryOptions: [
        { size: "20L", price: 269, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 587,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO820SGB10",
    brand: "Maunfeld",
    image: "images/ed74336c415e2231bea938cbcb0e44cc.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 535,
    memoryOptions: [
        { size: "20L", price: 535, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 588,
    name: "Встраиваемая микроволновая печь MAUNFELD JBMO155SGB02",
    brand: "Maunfeld",
    image: "images/1cd092339ea2bdfc62bdfaf8068c60dd.webp",
    desc: "15 л, мощность 600 Вт, электронное управление, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 364,
    memoryOptions: [
        { size: "15L", price: 364, color: "Silver" }
    ],
    defaultMemory: "15L"
},
{
    id: 589,
    name: "Встраиваемая микроволновая печь MAUNFELD XBMO251GB Glossy",
    brand: "Maunfeld",
    image: "images/ffab850d603b92ee180626d0787c54b5.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, конвекция, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 699,
    memoryOptions: [
        { size: "25L", price: 699, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 590,
    name: "Встраиваемая микроволновая печь MAUNFELD XBMO202S",
    brand: "Maunfeld",
    image: "images/e194275e4a60d17cb1681582c08a64e1.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 270 мм, встраиваемая.",
    price: 459,
    memoryOptions: [
        { size: "20L", price: 459, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 591,
    name: "Микроволновая печь MAUNFELD MBMO.20.1PGB",
    brand: "Maunfeld",
    image: "images/5a71101a40d6ee6088ed080a50d2db38.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 444,
    memoryOptions: [
        { size: "20L", price: 444, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 592,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO925SGB11",
    brand: "Maunfeld",
    image: "images/b46d74723726a6ea8229f7393637f9ef.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 753,
    memoryOptions: [
        { size: "25L", price: 753, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 593,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO.25.7GG",
    brand: "Maunfeld",
    image: "images/801c5b8c2c45b245977b3625a0a4d4fc.avif",
    desc: "25 л, мощность 900 Вт, сенсорное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 784,
    memoryOptions: [
        { size: "25L", price: 784, color: "Gray" }
    ],
    defaultMemory: "25L"
},
{
    id: 594,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO349GB201",
    brand: "Maunfeld",
    image: "images/dd7af81856cf5f331f678d4e85969988.avif",
    desc: "34 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 345 мм, встраиваемая.",
    price: 928,
    memoryOptions: [
        { size: "34L", price: 928, color: "Black" }
    ],
    defaultMemory: "34L"
},
{
    id: 595,
    name: "Микроволновая печь MAUNFELD JFSMO.20.5.ERIB",
    brand: "Maunfeld",
    image: "images/6982e4ebf6ac20432d7760985073d2e6.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, гриль, нержавеющая сталь, без поворотного стола, отдельностоящая.",
    price: 421,
    memoryOptions: [
        { size: "20L", price: 421, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 596,
    name: "Встраиваемая микроволновая печь MAUNFELD XBMO252GB Glossy",
    brand: "Maunfeld",
    image: "images/984c312a3c01d52dac60a7a545befe53.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, конвекция, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 852,
    memoryOptions: [
        { size: "25L", price: 852, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 597,
    name: "Микроволновая печь MAUNFELD MBMO349GB",
    brand: "Maunfeld",
    image: "images/91565f36d0dbe2cb9ca4e15f22944808.avif",
    desc: "34 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 345 мм, встраиваемая.",
    price: 911,
    memoryOptions: [
        { size: "34L", price: 911, color: "Black" }
    ],
    defaultMemory: "34L"
},
{
    id: 598,
    name: "Встраиваемая микроволновая печь MAUNFELD XBMO252GB Matt",
    brand: "Maunfeld",
    image: "images/3ed9ba1573b99a87ce61f8f3789adc08.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, конвекция, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 914,
    memoryOptions: [
        { size: "25L", price: 914, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 599,
    name: "Микроволновая печь MAUNFELD MBMO349DGB",
    brand: "Maunfeld",
    image: "images/10546de090d5079ff809841cf87c4b3e.avif",
    desc: "34 л, сенсорное управление, гриль, нержавеющая сталь, диаметр тарелки 345 мм, встраиваемая.",
    price: 958,
    memoryOptions: [
        { size: "34L", price: 958, color: "Black" }
    ],
    defaultMemory: "34L"
},
{
    id: 600,
    name: "Встраиваемая микроволновая печь MAUNFELD JBMO155GB01",
    brand: "Maunfeld",
    image: "images/JBMO155Gb01_1-90.png",
    desc: "15 л, мощность 600 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 337,
    memoryOptions: [
        { size: "15L", price: 337, color: "Black" }
    ],
    defaultMemory: "15L"
},
{
    id: 601,
    name: "Микроволновая печь ретро MAUNFELD JFSMO.20.5.GRBG",
    brand: "Maunfeld",
    image: "images/633dbabd5e46f3f85e6528027a8e266f.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, гриль, нержавеющая сталь, отдельностоящая, ретро дизайн.",
    price: 418,
    memoryOptions: [
        { size: "20L", price: 418, color: "Green" }
    ],
    defaultMemory: "20L"
},
{
    id: 602,
    name: "Микроволновая печь ретро MAUNFELD JFSMO.20.5.GRIB",
    brand: "Maunfeld",
    image: "images/cadd26893e3e6219687b6d9cf1d63f5f.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, гриль, нержавеющая сталь, отдельностоящая, ретро дизайн.",
    price: 411,
    memoryOptions: [
        { size: "20L", price: 411, color: "Red" }
    ],
    defaultMemory: "20L"
},
{
    id: 603,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO.25.7GB",
    brand: "Maunfeld",
    image: "images/e69e6f3a0ae91cda1d9452892972c1da.avif",
    desc: "25 л, мощность 900 Вт, сенсорное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 784,
    memoryOptions: [
        { size: "25L", price: 784, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 604,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO.20.8GW",
    brand: "Maunfeld",
    image: "images/aba84af7e90937d6dc58ca8a232816f7.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 255 мм, встраиваемая.",
    price: 556,
    memoryOptions: [
        { size: "20L", price: 556, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 605,
    name: "Микроволновая печь MAUNFELD MBMO.20.1PGB2",
    brand: "Maunfeld",
    image: "images/7aacc43b0016ccfaa9834d5e0be6463c.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 449,
    memoryOptions: [
        { size: "20L", price: 449, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 606,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO820SGW09",
    brand: "Maunfeld",
    image: "images/d0eea2b0556b2d7f5ba20cc95148f890.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 556,
    memoryOptions: [
        { size: "20L", price: 556, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 607,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO349GW",
    brand: "Maunfeld",
    image: "images/53a7ba82b9a6ef9468826ca6223cbc37.avif",
    desc: "34 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 345 мм, встраиваемая.",
    price: 956,
    memoryOptions: [
        { size: "34L", price: 956, color: "White" }
    ],
    defaultMemory: "34L"
},
{
    id: 608,
    name: "Встраиваемая микроволновая печь MAUNFELD MBMO.20.1PGW",
    brand: "Maunfeld",
    image: "images/5ab976110c6c8060761fb6148adea2c0.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 449,
    memoryOptions: [
        { size: "20L", price: 449, color: "White" }
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
    price: 181,
    memoryOptions: [
        { size: "20L", price: 181, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 562,
    name: "Микроволновая печь Hyundai HYM-M2042",
    brand: "Hyundai",
    image: "images/14ff037bed2d21841988b4b131ba2d89.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 189,
    memoryOptions: [
        { size: "20L", price: 189, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 563,
    name: "Микроволновая печь Hyundai HYM-M2044",
    brand: "Hyundai",
    image: "images/530aa3b0778d7c92ccab9775d7919ea3.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 171,
    memoryOptions: [
        { size: "20L", price: 171, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 564,
    name: "Микроволновая печь Hyundai HYM-D3002",
    brand: "Hyundai",
    image: "images/ec7075e37c89c2ed71007354b27181db.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 269,
    memoryOptions: [
        { size: "20L", price: 269, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 565,
    name: "Микроволновая печь Hyundai HYM-M2093",
    brand: "Hyundai",
    image: "images/4c2a2de4c9ec110dbb6acdae57b29f33.avif",
    desc: "19 л, мощность 700 Вт, механическое управление, эмалированная сталь, диаметр тарелки 245 мм, отдельностоящая.",
    price: 229,
    memoryOptions: [
        { size: "19L", price: 229, color: "White" }
    ],
    defaultMemory: "19L"
},
{
    id: 566,
    name: "Микроволновая печь Hyundai HYM-D3007",
    brand: "Hyundai",
    image: "images/d42eb7edb9ec1112d56a183eba603ae4.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, эмаль, диаметр тарелки 270 мм, отдельностоящая.",
    price: 390,
    memoryOptions: [
        { size: "23L", price: 390, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 567,
    name: "Микроволновая печь Hyundai HYM-M2058",
    brand: "Hyundai",
    image: "images/8c329a21a1e0011f3d1364334cf6d45c.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 248,
    memoryOptions: [
        { size: "20L", price: 248, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 568,
    name: "Микроволновая печь Hyundai HYM-M2059",
    brand: "Hyundai",
    image: "images/8577c845631ef090ed03f4afead91a94.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмалированная сталь, диаметр тарелки 255 мм, отдельностоящая.",
    price: 231,
    memoryOptions: [
        { size: "20L", price: 231, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 569,
    name: "Микроволновая печь Hyundai HYM-M2045 (черный)",
    brand: "Hyundai",
    image: "images/32e389e688983df99999717d62b0a610.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, черный цвет, отдельностоящая.",
    price: 190,
    memoryOptions: [
        { size: "20L", price: 190, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 570,
    name: "Микроволновая Печь Hyundai HYM-D3026",
    brand: "Hyundai",
    image: "images/d1a87c104c6c62ed0a1dc085e1e5bd4d.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 358,
    memoryOptions: [
        { size: "20L", price: 358, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 571,
    name: "Микроволновая печь Hyundai HYM-D3034",
    brand: "Hyundai",
    image: "images/e7859ffb79952c05188e397931a89c4f.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, эмаль, диаметр тарелки 245 мм, отдельностоящая.",
    price: 355,
    memoryOptions: [
        { size: "20L", price: 355, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 572,
    name: "Микроволновая печь Hyundai HYM-D2074",
    brand: "Hyundai",
    image: "images/08d9d0c66309bb9b68a4ed8aa79f556c.avif",
    desc: "20 л, мощность 700 Вт, электронное управление, эмаль, отдельностоящая.",
    price: 298,
    memoryOptions: [
        { size: "20L", price: 298, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 573,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2040 BG (черный)",
    brand: "Hyundai",
    image: "images/d9847ff9aa08642be94c53222d6e20a7.avif",
    desc: "20 л, мощность 800 Вт, электронное управление, гриль, эмаль, диаметр тарелки 245 мм, встраиваемая.",
    price: 669,
    memoryOptions: [
        { size: "20L", price: 669, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 574,
    name: "Встраиваемая микроволновая печь HYUNDAI HBW 2030S BG (черный)",
    brand: "Hyundai",
    image: "images/d64901cbbf6c534f28219fcabe80bcef.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, гриль, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 649,
    memoryOptions: [
        { size: "20L", price: 649, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 575,
    name: "Микроволновая печь Hyundai HYM-M2062",
    brand: "Hyundai",
    image: "images/59a9bc41305339ceb5f96e7d70086121.avif",
    desc: "23 л, мощность 800 Вт, электронное управление, гриль, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 378,
    memoryOptions: [
        { size: "23L", price: 378, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 576,
    name: "Встраиваемая микроволновая печь HYUNDAI HBW 2030S WG (белый)",
    brand: "Hyundai",
    image: "images/f5e2bb7d37d3870e38c7bf8f48d8a421.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, гриль, нержавеющая сталь, диаметр тарелки 245 мм, встраиваемая.",
    price: 639,
    memoryOptions: [
        { size: "20L", price: 639, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 577,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2030 BG (черный)",
    brand: "Hyundai",
    image: "images/64064b0cc604922c55fbe577722e315b.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, гриль, эмаль, диаметр тарелки 245 мм, встраиваемая.",
    price: 669,
    memoryOptions: [
        { size: "20L", price: 669, color: "Black" }
    ],
    defaultMemory: "20L"
},
{
    id: 578,
    name: "Микроволновая печь Hyundai HYM-M2064",
    brand: "Hyundai",
    image: "images/3e1a9c4c6908396286ada35762dfd3b8.avif",
    desc: "20 л, мощность 700 Вт, механическое управление, эмаль, диаметр тарелки 255 мм, отдельностоящая.",
    price: 239,
    memoryOptions: [
        { size: "20L", price: 239, color: "White" }
    ],
    defaultMemory: "20L"
},
{
    id: 579,
    name: "Микроволновая печь Hyundai HYM-D3044",
    brand: "Hyundai",
    image: "images/c152eef70bc37f6ff92e5f9c0724ea2d.avif",
    desc: "23 л, мощность 700 Вт, электронное управление, эмаль, диаметр тарелки 270 мм, отдельностоящая.",
    price: 449,
    memoryOptions: [
        { size: "23L", price: 449, color: "Silver" }
    ],
    defaultMemory: "23L"
},
{
    id: 580,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2560 WG (белый)",
    brand: "Hyundai",
    image: "images/5ed3942a07e3cc32f4aa5dcc0934d555.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, эмаль, диаметр тарелки 315 мм, встраиваемая.",
    price: 899,
    memoryOptions: [
        { size: "25L", price: 899, color: "White" }
    ],
    defaultMemory: "25L"
},
{
    id: 581,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2544 IX (серебристый)",
    brand: "Hyundai",
    image: "images/47bc6d36303bd0c9e21ce1cd1dfd792a.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, эмаль, диаметр тарелки 315 мм, встраиваемая.",
    price: 759,
    memoryOptions: [
        { size: "25L", price: 759, color: "Silver" }
    ],
    defaultMemory: "25L"
},
{
    id: 582,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2560 BG (черный)",
    brand: "Hyundai",
    image: "images/3c8648ef15d777198e08755cf8f2f527.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, эмаль, диаметр тарелки 315 мм, встраиваемая.",
    price: 979,
    memoryOptions: [
        { size: "25L", price: 979, color: "Black" }
    ],
    defaultMemory: "25L"
},
{
    id: 583,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2030 IX (нержавеющая сталь)",
    brand: "Hyundai",
    image: "images/b059d1cae145673f9cb163af5265eca8.avif",
    desc: "20 л, мощность 800 Вт, механическое управление, гриль, эмаль, диаметр тарелки 245 мм, встраиваемая.",
    price: 649,
    memoryOptions: [
        { size: "20L", price: 649, color: "Silver" }
    ],
    defaultMemory: "20L"
},
{
    id: 584,
    name: "Встраиваемая микроволновая печь Hyundai HBW 2544 WG белый",
    brand: "Hyundai",
    image: "images/242117ab449dc3c7621fd07c6fa6d61c.avif",
    desc: "25 л, мощность 900 Вт, электронное управление, гриль, нержавеющая сталь, диаметр тарелки 315 мм, встраиваемая.",
    price: 1059,
    memoryOptions: [
        { size: "25L", price: 1059, color: "White" }
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
    price: 6249,
    memoryOptions: [
        { size: "694L", price: 6249, color: "Black" }
    ],
    defaultMemory: "694L"
},
{
    id: 809,
    name: "Холодильник LG DoorCooling+ GA-B509CBTL",
    brand: "LG",
    image: "images/95d629a8485e6c958dbd33aaf573dee0.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 203 см.",
    price: 2623,
    memoryOptions: [
        { size: "384L", price: 2623, color: "Black" }
    ],
    defaultMemory: "384L"
},
{
    id: 810,
    name: "Холодильник LG DoorCooling+ GA-B509CMUM",
    brand: "LG",
    image: "images/4535fe403d0160d3930a95bdedf8a9ba.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, серебристый, высота 203 см.",
    price: 2753,
    memoryOptions: [
        { size: "384L", price: 2753, color: "Silver" }
    ],
    defaultMemory: "384L"
},
{
    id: 811,
    name: "Холодильник LG DoorCooling+ GA-B509CQWL",
    brand: "LG",
    image: "images/dce6db851f0f4ac0abe17781ac4593c7.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, белый, высота 203 см.",
    price: 2299,
    memoryOptions: [
        { size: "384L", price: 2299, color: "White" }
    ],
    defaultMemory: "384L"
},
{
    id: 812,
    name: "Холодильник LG DoorCooling+ GA-B509MLSL",
    brand: "LG",
    image: "images/1347f9630e1de9e0e19b7212d8892701.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, графитовый, высота 203 см.",
    price: 2449,
    memoryOptions: [
        { size: "384L", price: 2449, color: "Graphite" }
    ],
    defaultMemory: "384L"
},
{
    id: 813,
    name: "Холодильник LG GA-B419SLGL",
    brand: "LG",
    image: "images/aca873fdc7c288290efb01a28055ce02.avif",
    desc: "302 л (223 л + 79 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, темный графит, высота 190.6 см.",
    price: 2049,
    memoryOptions: [
        { size: "302L", price: 2049, color: "Dark Graphite" }
    ],
    defaultMemory: "302L"
},
{
    id: 814,
    name: "Холодильник LG DoorCоoling+ GC-B509QG9M",
    brand: "LG",
    image: "images/721a8875d38ad1a56782923d7a8946aa.avif",
    desc: "387 л (277 л + 110 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, бежевый, высота 203 см.",
    price: 3670,
    memoryOptions: [
        { size: "387L", price: 3670, color: "Beige" }
    ],
    defaultMemory: "387L"
},
{
    id: 815,
    name: "Холодильник LG DoorCooling+ GA-B459SMQM",
    brand: "LG",
    image: "images/90299a3f3e35c421640fee38000ec64b.avif",
    desc: "341 л (234 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, серебристый, высота 186 см.",
    price: 2299,
    memoryOptions: [
        { size: "341L", price: 2299, color: "Silver" }
    ],
    defaultMemory: "341L"
},
{
    id: 816,
    name: "Холодильник LG DoorCooling+ GA-B509CMTL",
    brand: "LG",
    image: "images/806508be0bbc7ce2c75c8bcbfa8a8fca.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, серебристый, высота 203 см.",
    price: 2650,
    memoryOptions: [
        { size: "384L", price: 2650, color: "Silver" }
    ],
    defaultMemory: "384L"
},
{
    id: 817,
    name: "Холодильник LG GA-B419SQGL",
    brand: "LG",
    image: "images/af96b553b125d20aad41ebae150cebb1.avif",
    desc: "302 л (223 л + 79 л), полный No Frost, инверторный компрессор, электронное управление, белый, высота 190.7 см.",
    price: 1999,
    memoryOptions: [
        { size: "302L", price: 1999, color: "White" }
    ],
    defaultMemory: "302L"
},
{
    id: 818,
    name: "Холодильник LG DoorCooling+ GA-B459SQQM",
    brand: "LG",
    image: "images/1af685082a54584c71c99f5ef3ddc1ce.avif",
    desc: "341 л (234 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, белый, высота 186 см.",
    price: 2272,
    memoryOptions: [
        { size: "341L", price: 2272, color: "White" }
    ],
    defaultMemory: "341L"
},
{
    id: 819,
    name: "Холодильник LG DoorCooling+ GC-B569PMCM",
    brand: "LG",
    image: "images/ab2050f3497bd3439eaa0bca84db1609.avif",
    desc: "451 л (329 л + 122 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, серебристый, высота 185 см.",
    price: 3421,
    memoryOptions: [
        { size: "451L", price: 3421, color: "Silver" }
    ],
    defaultMemory: "451L"
},
{
    id: 820,
    name: "Холодильник LG DoorCooling+ GA-B509CEQM",
    brand: "LG",
    image: "images/533fcf26fe9b2feae547ca0bfbee8ca2.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, бежевый, высота 203 см.",
    price: 2561,
    memoryOptions: [
        { size: "384L", price: 2561, color: "Beige" }
    ],
    defaultMemory: "384L"
},
{
    id: 821,
    name: "Холодильник LG GA-B509CQCL",
    brand: "LG",
    image: "images/1ff5f49a1c3f431eea772a132246c78b.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, электронное управление, белый, высота 203 см.",
    price: 2240,
    memoryOptions: [
        { size: "384L", price: 2240, color: "White" }
    ],
    defaultMemory: "384L"
},
{
    id: 822,
    name: "Холодильник LG GC-L257CBEV",
    brand: "LG",
    image: "images/8b912481cbbcf5610d74303d460e320e.avif",
    desc: "674 л (424 л + 250 л), полный No Frost, инверторный компрессор, электронное управление, серый, высота 179 см.",
    price: 6385,
    memoryOptions: [
        { size: "674L", price: 6385, color: "Gray" }
    ],
    defaultMemory: "674L"
},
{
    id: 823,
    name: "Холодильник LG GC-V22FFBMB",
    brand: "LG",
    image: "images/947317b7423af7aaf6745bbb91e4697b.avif",
    desc: "458 л (315 л + 143 л), полный No Frost, инверторный компрессор, электронное управление, черный, высота 178.7 см.",
    price: 5499,
    memoryOptions: [
        { size: "458L", price: 5499, color: "Black" }
    ],
    defaultMemory: "458L"
},
{
    id: 824,
    name: "Холодильник LG DoorCooling+ GC-B459AQQW",
    brand: "LG",
    image: "images/264c314181fc04f4942e3fec3423ccd7.avif",
    desc: "344 л (234 л + 110 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, белый, высота 186 см.",
    price: 2350,
    memoryOptions: [
        { size: "344L", price: 2350, color: "White" }
    ],
    defaultMemory: "344L"
},
{
    id: 825,
    name: "Холодильник LG DoorCooling+ GA-B509SVUM",
    brand: "LG",
    image: "images/f8eb3bfe2a6778d1a476ca6309fda86b.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, белый, высота 203 см.",
    price: 2760,
    memoryOptions: [
        { size: "384L", price: 2760, color: "White" }
    ],
    defaultMemory: "384L"
},
{
    id: 826,
    name: "Холодильник LG DoorCooling+ GA-B509SAUM",
    brand: "LG",
    image: "images/6b811e231e84a3bcace610bb69302f74.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, серебристый, высота 203 см.",
    price: 2799,
    memoryOptions: [
        { size: "384L", price: 2799, color: "Silver" }
    ],
    defaultMemory: "384L"
},
{
    id: 827,
    name: "Холодильник LG DoorCooling+ GA-B459MLSL",
    brand: "LG",
    image: "images/872d7f18be1386a6e9983fb60ae0c8f7.avif",
    desc: "341 л (234 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, графитовый, высота 186 см.",
    price: 2149,
    memoryOptions: [
        { size: "341L", price: 2149, color: "Graphite" }
    ],
    defaultMemory: "341L"
},
{
    id: 828,
    name: "Холодильник LG GC-X24FFCBB",
    brand: "LG",
    image: "images/18fe7c40832f140651f7ae00af90fa51.avif",
    desc: "570 л (371 л + 199 л), полный No Frost, инверторный компрессор, электронное управление, черный, высота 179.2 см.",
    price: 7699,
    memoryOptions: [
        { size: "570L", price: 7699, color: "Black" }
    ],
    defaultMemory: "570L"
},
{
    id: 829,
    name: "Холодильник LG GC-B257KEHW",
    brand: "LG",
    image: "images/15a9a84de6e858625a013f789e0a256c.avif",
    desc: "658 л (422 л + 206 л), полный No Frost, инверторный компрессор, электронное управление, бежевый, высота 179 см.",
    price: 4949,
    memoryOptions: [
        { size: "658L", price: 4949, color: "Beige" }
    ],
    defaultMemory: "658L"
},
{
    id: 830,
    name: "Холодильник LG GC-B509AEMW",
    brand: "LG",
    image: "images/3c1482f3e6c735d37eff4e48cba97e9d.avif",
    desc: "387 л (277 л + 110 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, бежевый, высота 203 см.",
    price: 2849,
    memoryOptions: [
        { size: "387L", price: 2849, color: "Beige" }
    ],
    defaultMemory: "387L"
},
{
    id: 831,
    name: "Холодильник LG DoorCooling+ GA-B509SEUM",
    brand: "LG",
    image: "images/3a67e25b478bc2e85e6fbe31502be4b4.avif",
    desc: "384 л (277 л + 107 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, бежевый, высота 203 см.",
    price: 2699,
    memoryOptions: [
        { size: "384L", price: 2699, color: "Beige" }
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
    price: 2148,
    memoryOptions: [
        { size: "300L", price: 2148, color: "Anthracite" }
    ],
    defaultMemory: "300L"
},
{
    id: 786,
    name: "Холодильник Beko RCNK335E20VW",
    brand: "Beko",
    image: "images/403f126819e3686613749b95a1172c44.avif",
    desc: "300 л (200 л + 100 л), полный No Frost, стандартный компрессор, электронное управление, белый, высота 201 см.",
    price: 1547,
    memoryOptions: [
        { size: "300L", price: 1547, color: "White" }
    ],
    defaultMemory: "300L"
},
{
    id: 787,
    name: "Холодильник BEKO BCNE400I35ZS",
    brand: "Beko",
    image: "images/1d4d000506126654028932a5c4417901.avif",
    desc: "355 л (280 л + 75 л), полный No Frost, зона свежести, электронное управление, белый, высота 194 см.",
    price: 3413,
    memoryOptions: [
        { size: "355L", price: 3413, color: "White" }
    ],
    defaultMemory: "355L"
},
{
    id: 788,
    name: "Холодильник Beko HarvestFresh CNMV5335E20VXR",
    brand: "Beko",
    image: "images/d5d43a8508c4d660663eaea0b772e60d.avif",
    desc: "300 л (200 л + 100 л), полный No Frost, зона свежести, электронное управление, антрацит, высота 201 см.",
    price: 1671,
    memoryOptions: [
        { size: "300L", price: 1671, color: "Anthracite" }
    ],
    defaultMemory: "300L"
},
{
    id: 789,
    name: "Холодильник Beko RCNK310E20VS",
    brand: "Beko",
    image: "images/20cb2abe2280592be86f03298c2c6b6d.avif",
    desc: "276 л (200 л + 76 л), полный No Frost, стандартный компрессор, электронное управление, серебристый, высота 184 см.",
    price: 1505,
    memoryOptions: [
        { size: "276L", price: 1505, color: "Silver" }
    ],
    defaultMemory: "276L"
},
{
    id: 790,
    name: "Холодильник Beko B3RCNK402HX KZ RU",
    brand: "Beko",
    image: "images/4f5c7668f83820161d56896832a75704.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, зона свежести, электронное управление, нержавеющая сталь, высота 201 см.",
    price: 1779,
    memoryOptions: [
        { size: "357L", price: 1779, color: "Stainless Steel" }
    ],
    defaultMemory: "357L"
},
{
    id: 791,
    name: "Холодильник Beko B5RCNK363ZXBR KZ RU",
    brand: "Beko",
    image: "images/82e2a98e2bce730b9dc890c243b936a2.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, антрацит, высота 186 см.",
    price: 1835,
    memoryOptions: [
        { size: "320L", price: 1835, color: "Anthracite" }
    ],
    defaultMemory: "320L"
},
{
    id: 792,
    name: "Холодильник Beko B3R0CNK362HW RU",
    brand: "Beko",
    image: "images/66509a9c319d45a52fc8b88d22305aba.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, электронное управление, белый, высота 186 см.",
    price: 1676,
    memoryOptions: [
        { size: "320L", price: 1676, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 793,
    name: "Холодильник Beko B3RCNK362HS KZ RU",
    brand: "Beko",
    image: "images/3a65b79eae33057ec2a0ad1dc868c53d.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, серебристый, высота 186 см.",
    price: 1849,
    memoryOptions: [
        { size: "320L", price: 1849, color: "Silver" }
    ],
    defaultMemory: "320L"
},
{
    id: 794,
    name: "Холодильник BEKO B3R1CNK363HXBR",
    brand: "Beko",
    image: "images/3758580c2e5ce96114ec1e359fc9e20a.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, инверторный компрессор, сенсорное управление, темная сталь, высота 186 см.",
    price: 1808,
    memoryOptions: [
        { size: "320L", price: 1808, color: "Dark Steel" }
    ],
    defaultMemory: "320L"
},
{
    id: 795,
    name: "Холодильник Beko B3DRCNK402HW KZ RU",
    brand: "Beko",
    image: "images/03b3c7f611808ca4598d3fe9030afd00.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, зона свежести, электронное управление, белый, высота 201 см.",
    price: 1837,
    memoryOptions: [
        { size: "357L", price: 1837, color: "White" }
    ],
    defaultMemory: "357L"
},
{
    id: 796,
    name: "Холодильник Beko B3RCNK362HX",
    brand: "Beko",
    image: "images/ba36cd6141b083fd0895873f6973ac6c.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, зона свежести, электронное управление, нержавеющая сталь, высота 186 см.",
    price: 1843,
    memoryOptions: [
        { size: "320L", price: 1843, color: "Stainless Steel" }
    ],
    defaultMemory: "320L"
},
{
    id: 797,
    name: "Холодильник Beko B5RCNK403ZW RU",
    brand: "Beko",
    image: "images/da76658716db59203cd056cee1e2a969.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, белый, высота 201 см.",
    price: 2148,
    memoryOptions: [
        { size: "357L", price: 2148, color: "White" }
    ],
    defaultMemory: "357L"
},
{
    id: 798,
    name: "Холодильник Beko B5RCNK403ZWB KZ RU",
    brand: "Beko",
    image: "images/647ada5580a38600dba245bc7df5d230.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 201 см.",
    price: 2180,
    memoryOptions: [
        { size: "357L", price: 2180, color: "Black" }
    ],
    defaultMemory: "357L"
},
{
    id: 799,
    name: "Холодильник Beko RCNK310E20VW",
    brand: "Beko",
    image: "images/951b0d14a86b7239cb8b5adf10ebfe02.avif",
    desc: "276 л (200 л + 76 л), полный No Frost, стандартный компрессор, электронное управление, белый, высота 184 см.",
    price: 1499,
    memoryOptions: [
        { size: "276L", price: 1499, color: "White" }
    ],
    defaultMemory: "276L"
},
{
    id: 800,
    name: "Холодильник Beko B5RCNK363ZWB KZ RU",
    brand: "Beko",
    image: "images/6301e5622c116b07a4f7bb68772926dc.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 186 см.",
    price: 1872,
    memoryOptions: [
        { size: "320L", price: 1872, color: "Black" }
    ],
    defaultMemory: "320L"
},
{
    id: 801,
    name: "Холодильник Beko B3DRCNK402HXBR",
    brand: "Beko",
    image: "images/fe7e50b5c2473dcb08d03e76f137a53b.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, антрацит, высота 201 см.",
    price: 1817,
    memoryOptions: [
        { size: "357L", price: 1817, color: "Anthracite" }
    ],
    defaultMemory: "357L"
},
{
    id: 802,
    name: "Холодильник BEKO B3DRCNK362HW",
    brand: "Beko",
    image: "images/caebc50273b4591ad944c8f6c0d59e57.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, зона свежести, электронное управление, белый, высота 186 см.",
    price: 1799,
    memoryOptions: [
        { size: "320L", price: 1799, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 803,
    name: "Холодильник Beko HarvestFresh B1RCNK402W RU",
    brand: "Beko",
    image: "images/9298fb0e746ad5da058fe6ff199430f2.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 201 см.",
    price: 1621,
    memoryOptions: [
        { size: "357L", price: 1621, color: "White" }
    ],
    defaultMemory: "357L"
},
{
    id: 804,
    name: "Холодильник BEKO B3R1CNK363HW",
    brand: "Beko",
    image: "images/aaaa0bd3e1e56e1318628babfee905b1.avif",
    desc: "320 л (220 л + 100 л), полный No Frost, инверторный компрессор, сенсорное управление, белый, высота 186 см.",
    price: 1608,
    memoryOptions: [
        { size: "320L", price: 1608, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 805,
    name: "Холодильник BEKO RDSK240M00W",
    brand: "Beko",
    image: "images/dd8c8322b43386309e3acbe1a714fd94.avif",
    desc: "223 л (177 л + 46 л), без No Frost, стандартный компрессор, механическое управление, белый, высота 145.8 см.",
    price: 1079,
    memoryOptions: [
        { size: "223L", price: 1079, color: "White" }
    ],
    defaultMemory: "223L"
},
{
    id: 806,
    name: "Холодильник BEKO B3R0CNK332HXBR",
    brand: "Beko",
    image: "images/3ec3157a244ff0a80c1b662173bf5253.avif",
    desc: "300 л (200 л + 100 л), полный No Frost, стандартный компрессор, электронное управление, черный, высота 201 см.",
    price: 1839,
    memoryOptions: [
        { size: "300L", price: 1839, color: "Black" }
    ],
    defaultMemory: "300L"
},
{
    id: 807,
    name: "Холодильник-морозильник BEKO B5RCNK403ZX BIO",
    brand: "Beko",
    image: "images/03fa21fa5512b04e390517b055d2f201.avif",
    desc: "357 л (257 л + 100 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 201 см.",
    price: 2190,
    memoryOptions: [
        { size: "357L", price: 2190, color: "Stainless Steel" }
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
    price: 1659,
    memoryOptions: [
        { size: "329L", price: 1659, color: "White" }
    ],
    defaultMemory: "329L"
},
{
    id: 762,
    name: "Холодильник ATLANT XM-4008-022",
    brand: "ATLANT",
    image: "images/9e31eec8d5ab9277748a586540fabd9a.avif",
    desc: "226 л (163 л + 63 л), без No Frost, стандартный компрессор, электромеханическое управление, высота 142 см.",
    price: 1099,
    memoryOptions: [
        { size: "226L", price: 1099, color: "White" }
    ],
    defaultMemory: "226L"
},
{
    id: 763,
    name: "Холодильник ATLANT XM-4625-109-ND",
    brand: "ATLANT",
    image: "images/62cf77a29b6fa32d7363392aa02ad4cc.avif",
    desc: "336 л (211 л + 125 л), полный No Frost, зона свежести, сенсорное управление, белый, высота 206.8 см.",
    price: 1999,
    memoryOptions: [
        { size: "336L", price: 1999, color: "White" }
    ],
    defaultMemory: "336L"
},
{
    id: 764,
    name: "Холодильник ATLANT ХМ-4624-101",
    brand: "ATLANT",
    image: "images/3ecfae4501e2d1acc356f748d01565c0.avif",
    desc: "347 л (228 л + 119 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 196.8 см.",
    price: 1399,
    memoryOptions: [
        { size: "347L", price: 1399, color: "White" }
    ],
    defaultMemory: "347L"
},
{
    id: 765,
    name: "Встраиваемый холодильник ATLANT ХМ-4319-101",
    brand: "ATLANT",
    image: "images/468c9c23db27056a2d761a6d04a2c64e.avif",
    desc: "245 л (175 л + 70 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 178.5 см, встраиваемый.",
    price: 1686,
    memoryOptions: [
        { size: "245L", price: 1686, color: "White" }
    ],
    defaultMemory: "245L"
},
{
    id: 766,
    name: "Холодильник ATLANT ХМ-4625-101",
    brand: "ATLANT",
    image: "images/7e26b41249d0065006a01cc494687781.avif",
    desc: "364 л (205 л + 159 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 206.8 см.",
    price: 1519,
    memoryOptions: [
        { size: "364L", price: 1519, color: "White" }
    ],
    defaultMemory: "364L"
},
{
    id: 767,
    name: "Холодильник ATLANT XM-6023-031",
    brand: "ATLANT",
    image: "images/cb5a8c1db32ed7dd1e5f72b2626ffbae.avif",
    desc: "340 л (201 л + 139 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 195 см.",
    price: 1486,
    memoryOptions: [
        { size: "340L", price: 1486, color: "White" }
    ],
    defaultMemory: "340L"
},
{
    id: 768,
    name: "Холодильник ATLANT ХМ-4625-181",
    brand: "ATLANT",
    image: "images/40b6e76d66dd5d13b3ecc252fc433b2e.avif",
    desc: "378 л (205 л + 159 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, серебристый, высота 206.8 см.",
    price: 1782,
    memoryOptions: [
        { size: "378L", price: 1782, color: "Silver" }
    ],
    defaultMemory: "378L"
},
{
    id: 769,
    name: "Холодильник ATLANT MXM-2835-90",
    brand: "ATLANT",
    image: "images/884a40ebbd77125af3fa6b22f5a41446.avif",
    desc: "272 л (202 л + 70 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 163 см.",
    price: 1126,
    memoryOptions: [
        { size: "272L", price: 1126, color: "White" }
    ],
    defaultMemory: "272L"
},
{
    id: 770,
    name: "Холодильник ATLANT XM-4010-022",
    brand: "ATLANT",
    image: "images/f88dd89b60b2ed812e9bc8c161d2cb55.avif",
    desc: "264 л (163 л + 101 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 161 см.",
    price: 1215,
    memoryOptions: [
        { size: "264L", price: 1215, color: "White" }
    ],
    defaultMemory: "264L"
},
{
    id: 771,
    name: "Холодильник ATLANT ХМ-4619-101",
    brand: "ATLANT",
    image: "images/6727effc99db6e496d3737996798b724.avif",
    desc: "301 л (182 л + 119 л), без No Frost, стандартный компрессор, электронное управление, белый, высота 176.8 см.",
    price: 1356,
    memoryOptions: [
        { size: "301L", price: 1356, color: "White" }
    ],
    defaultMemory: "301L"
},
{
    id: 772,
    name: "Холодильник ATLANT ХМ-4625-151",
    brand: "ATLANT",
    image: "images/2c53260db301d03943087cb052a8ecbb.avif",
    desc: "364 л (205 л + 159 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, черный, высота 206.8 см.",
    price: 1646,
    memoryOptions: [
        { size: "364L", price: 1646, color: "Black" }
    ],
    defaultMemory: "364L"
},
{
    id: 773,
    name: "Холодильник ATLANT ХМ-4621-101",
    brand: "ATLANT",
    image: "images/atlant-hm-4621-101-nl.webp",
    desc: "324 л (205 л + 119 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 186.8 см.",
    price: 1399,
    memoryOptions: [
        { size: "324L", price: 1399, color: "White" }
    ],
    defaultMemory: "324L"
},
{
    id: 774,
    name: "Холодильник ATLANT ХМ-4423-000-N",
    brand: "ATLANT",
    image: "images/a890c65b316b47eebb9dd77341133e5c.avif",
    desc: "292 л (181 л + 111 л), полный No Frost, стандартный компрессор, электронное управление, высота 196.5 см.",
    price: 1827,
    memoryOptions: [
        { size: "292L", price: 1827, color: "White" }
    ],
    defaultMemory: "292L"
},
{
    id: 775,
    name: "Холодильник ATLANT MXM-2835-08 СЕРЕБРИСТЫЙ",
    brand: "ATLANT",
    image: "images/fa0dfac11e8cf395e2e3423fb85a48c9.avif",
    desc: "272 л (202 л + 70 л), без No Frost, стандартный компрессор, электромеханическое управление, серебристый, высота 163 см.",
    price: 1179,
    memoryOptions: [
        { size: "272L", price: 1179, color: "Silver" }
    ],
    defaultMemory: "272L"
},
{
    id: 776,
    name: "Холодильник ATLANT ХМ-6621-109",
    brand: "ATLANT",
    image: "images/9523a9ec5107ba329ddab6f3bd948820.avif",
    desc: "324 л (205 л + 119 л), без No Frost, зона свежести, электронное управление, белый, высота 186.8 см.",
    price: 1688,
    memoryOptions: [
        { size: "324L", price: 1688, color: "White" }
    ],
    defaultMemory: "324L"
},
{
    id: 777,
    name: "Холодильник Atlant XM-4621-109-ND",
    brand: "ATLANT",
    image: "images/b4dd9d45bedf6a391eb77dc39cbdae65.avif",
    desc: "305 л (211 л + 94 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 186.8 см.",
    price: 1709,
    memoryOptions: [
        { size: "305L", price: 1709, color: "White" }
    ],
    defaultMemory: "305L"
},
{
    id: 778,
    name: "Холодильник ATLANT MX-2822-80",
    brand: "ATLANT",
    image: "images/a58d0f26559673cde57350ab712b75c7.avif",
    desc: "205 л (175 л + 30 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 131 см.",
    price: 899,
    memoryOptions: [
        { size: "205L", price: 899, color: "White" }
    ],
    defaultMemory: "205L"
},
{
    id: 779,
    name: "Холодильник ATLANT XM-4012-022",
    brand: "ATLANT",
    image: "images/7b69408f55561cfc2483bd31e4921ce7.avif",
    desc: "302 л (201 л + 101 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 176 см.",
    price: 1259,
    memoryOptions: [
        { size: "302L", price: 1259, color: "White" }
    ],
    defaultMemory: "302L"
},
{
    id: 780,
    name: "Холодильник ATLANT XM-4623-109-ND",
    brand: "ATLANT",
    image: "images/6610e5b98238c30adb88ed00c0de1c9a.avif",
    desc: "312 л (187 л + 125 л), полный No Frost, стандартный компрессор, электронное управление, белый, высота 196.8 см.",
    price: 1749,
    memoryOptions: [
        { size: "312L", price: 1749, color: "White" }
    ],
    defaultMemory: "312L"
},
{
    id: 781,
    name: "Холодильник ATLANT XM-4208-000",
    brand: "ATLANT",
    image: "images/8707ddcdde5edf1d96b5f14c5572999e.avif",
    desc: "173 л (131 л + 42 л), без No Frost, стандартный компрессор, электромеханическое управление, белый, высота 142.5 см.",
    price: 1089,
    memoryOptions: [
        { size: "173L", price: 1089, color: "White" }
    ],
    defaultMemory: "173L"
},
{
    id: 782,
    name: "Холодильник ATLANT XM-4626-109-ND",
    brand: "ATLANT",
    image: "images/c76c1ff6f13d258b0533f1b8449625db.avif",
    desc: "348 л (254 л + 94 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 206.8 см.",
    price: 1999,
    memoryOptions: [
        { size: "348L", price: 1999, color: "White" }
    ],
    defaultMemory: "348L"
},
{
    id: 783,
    name: "Холодильник ATLANT ХМ-4524-040-ND",
    brand: "ATLANT",
    image: "images/2405b4f1f8c956e5e6d19546452ffc1b.avif",
    desc: "371 л (271 л + 100 л), полный No Frost, стандартный компрессор, электронное управление, нержавеющая сталь, высота 196 см.",
    price: 2078,
    memoryOptions: [
        { size: "371L", price: 2078, color: "Stainless Steel" }
    ],
    defaultMemory: "371L"
},
{
    id: 784,
    name: "Холодильник ATLANT ХМ-4624-181",
    brand: "ATLANT",
    image: "images/fbb61165ef5cde1e840e8c57df9f6224.avif",
    desc: "347 л (228 л + 119 л), без No Frost, стандартный компрессор, зона свежести, электронное управление, серебристый, высота 196.8 см.",
    price: 1608,
    memoryOptions: [
        { size: "347L", price: 1608, color: "Silver" }
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
    price: 2900,
    memoryOptions: [
        { size: "400L", price: 2900, color: "Stainless Steel" }
    ],
    defaultMemory: "400L"
},
{
    id: 738,
    name: "Холодильник HAIER C2F636CFRGU1",
    brand: "Haier",
    image: "images/d4efe3b602d8bca18aa95c78b7eb08e4.avif",
    desc: "364 л (256 л + 108 л), полный No Frost, зона свежести, сенсорное управление, серебристый, высота 190.5 см.",
    price: 2282,
    memoryOptions: [
        { size: "364L", price: 2282, color: "Silver" }
    ],
    defaultMemory: "364L"
},
{
    id: 739,
    name: "Холодильник Haier C4F740CDBGU1",
    brand: "Haier",
    image: "images/74b11d248c738f90c34bfbfd05f774cf.avif",
    desc: "401 л (286 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, графитовый, высота 200 см.",
    price: 3048,
    memoryOptions: [
        { size: "401L", price: 3048, color: "Graphite" }
    ],
    defaultMemory: "401L"
},
{
    id: 740,
    name: "Холодильник Haier C4F640CWU1",
    brand: "Haier",
    image: "images/26994a63df8d2f64465ef1c28cbb8ff0.avif",
    desc: "400 л (285 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, белый, высота 200 см.",
    price: 2636,
    memoryOptions: [
        { size: "400L", price: 2636, color: "White" }
    ],
    defaultMemory: "400L"
},
{
    id: 741,
    name: "Встраиваемый холодильник-морозильник Haier BCF5261WRU",
    brand: "Haier",
    image: "images/8edc0a26ae12ca4caa2351e5600cbaa2.avif",
    desc: "261 л (185 л + 76 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, белый, высота 177.2 см, встраиваемый.",
    price: 3565,
    memoryOptions: [
        { size: "261L", price: 3565, color: "White" }
    ],
    defaultMemory: "261L"
},
{
    id: 742,
    name: "Холодильник Haier MSR115L",
    brand: "Haier",
    image: "images/cbe7d9863f3f8e36edd03ff142323982.avif",
    desc: "91 л (8 л морозильник), без No Frost, стандартный компрессор, механическое управление, белый, высота 83.2 см.",
    price: 799,
    memoryOptions: [
        { size: "91L", price: 799, color: "White" }
    ],
    defaultMemory: "91L"
},
{
    id: 743,
    name: "Холодильник Haier C2F637CFMVU1",
    brand: "Haier",
    image: "images/086f87785346a79559a0bae2189b4b80.avif",
    desc: "386 л (278 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 199.8 см.",
    price: 2567,
    memoryOptions: [
        { size: "386L", price: 2567, color: "Stainless Steel" }
    ],
    defaultMemory: "386L"
},
{
    id: 744,
    name: "Холодильник HAIER CEF535ASD",
    brand: "Haier",
    image: "images/1b6b1ce1aee05565ea83e87b308e542a.avif",
    desc: "346 л (241 л + 105 л), полный No Frost, стандартный компрессор, электронное управление, серебристый, высота 190 см.",
    price: 1933,
    memoryOptions: [
        { size: "346L", price: 1933, color: "Silver" }
    ],
    defaultMemory: "346L"
},
{
    id: 745,
    name: "Холодильник Haier C4F740CLBGU1",
    brand: "Haier",
    image: "images/28fa5b72429a8d7ae3e231c0890f641d.avif",
    desc: "401 л (286 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, коричневый, высота 200 см.",
    price: 2970,
    memoryOptions: [
        { size: "401L", price: 2970, color: "Brown" }
    ],
    defaultMemory: "401L"
},
{
    id: 746,
    name: "Холодильник HAIER A4F639CGGU1",
    brand: "Haier",
    image: "images/0f476c4e6071334d4d78ec6ee70c2179.avif",
    desc: "388 л (285 л + 103 л), полный No Frost, инверторный компрессор, электронное управление, золотистый, высота 200 см.",
    price: 2835,
    memoryOptions: [
        { size: "388L", price: 2835, color: "Gold" }
    ],
    defaultMemory: "388L"
},
{
    id: 747,
    name: "Холодильник Haier HRF-600DB7RU",
    brand: "Haier",
    image: "images/e3841d6d47a01e803a396c920223bd91.avif",
    desc: "598 л (388 л + 210 л), полный No Frost, инверторный компрессор, электронное управление, черный, высота 177.5 см.",
    price: 4660,
    memoryOptions: [
        { size: "598L", price: 4660, color: "Black" }
    ],
    defaultMemory: "598L"
},
{
    id: 748,
    name: "Холодильник HAIER HTF-456DM6RU",
    brand: "Haier",
    image: "images/8a9c48e05f21574dfda15f1a128c646f.avif",
    desc: "456 л (316 л + 140 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, нержавеющая сталь, высота 180 см.",
    price: 4254,
    memoryOptions: [
        { size: "456L", price: 4254, color: "Stainless Steel" }
    ],
    defaultMemory: "456L"
},
{
    id: 749,
    name: "Холодильник Haier C2F637CWMVU1",
    brand: "Haier",
    image: "images/5175da0267144f80e06c9002e5893690.avif",
    desc: "386 л (278 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 199.8 см.",
    price: 2425,
    memoryOptions: [
        { size: "386L", price: 2425, color: "White" }
    ],
    defaultMemory: "386L"
},
{
    id: 750,
    name: "Холодильник Haier C2F636CRRGU1",
    brand: "Haier",
    image: "images/93557ed1da2206193ee764313d08e1a9.avif",
    desc: "364 л (256 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, сенсорное управление, красный, высота 190.5 см.",
    price: 2505,
    memoryOptions: [
        { size: "364L", price: 2505, color: "Red" }
    ],
    defaultMemory: "364L"
},
{
    id: 751,
    name: "Холодильник Haier C4F640CCGU1",
    brand: "Haier",
    image: "images/918c42ea542c92cda1bdebcaca2b24b6.avif",
    desc: "400 л (285 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, бежевый, высота 200 см.",
    price: 2580,
    memoryOptions: [
        { size: "400L", price: 2580, color: "Beige" }
    ],
    defaultMemory: "400L"
},
{
    id: 752,
    name: "Холодильник Haier C2F637CCGU1",
    brand: "Haier",
    image: "images/851a4d376edb20748d09970aecd8a2cd.avif",
    desc: "386 л (278 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, бежевый, высота 199.8 см.",
    price: 2519,
    memoryOptions: [
        { size: "386L", price: 2519, color: "Beige" }
    ],
    defaultMemory: "386L"
},
{
    id: 753,
    name: "Холодильник Haier C2F636CWRGU1",
    brand: "Haier",
    image: "images/1bc8b08e8e10e8555098937a5fef1871.avif",
    desc: "364 л (256 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 190.5 см.",
    price: 2222,
    memoryOptions: [
        { size: "364L", price: 2222, color: "White" }
    ],
    defaultMemory: "364L"
},
{
    id: 754,
    name: "Холодильник Haier C4F740CBXGU1",
    brand: "Haier",
    image: "images/8726b754d10e6e2a81900e2591bd8adf.avif",
    desc: "401 л (286 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, черная нержавеющая сталь, высота 200 см.",
    price: 3014,
    memoryOptions: [
        { size: "401L", price: 3014, color: "Black Stainless Steel" }
    ],
    defaultMemory: "401L"
},
{
    id: 755,
    name: "Холодильник Haier HB18FGSAAARU",
    brand: "Haier",
    image: "images/37c1c0c850d18d908b2358238846d14a.avif",
    desc: "508 л (351 л + 157 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 190 см.",
    price: 6461,
    memoryOptions: [
        { size: "508L", price: 6461, color: "Stainless Steel" }
    ],
    defaultMemory: "508L"
},
{
    id: 756,
    name: "Холодильник HAIER CEF535AWD",
    brand: "Haier",
    image: "images/66c9b8190ed47cd8cb835fc5ca8c2bf2.avif",
    desc: "346 л (241 л + 105 л), полный No Frost, стандартный компрессор, электронное управление, белый, высота 190 см.",
    price: 1863,
    memoryOptions: [
        { size: "346L", price: 1863, color: "White" }
    ],
    defaultMemory: "346L"
},
{
    id: 757,
    name: "Холодильник HAIER HRF-541DM7RU",
    brand: "Haier",
    image: "images/e04c87e06a637bfe60faf0a7101f949d.avif",
    desc: "504 л (337 л + 167 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, серебристый, высота 177.5 см.",
    price: 4252,
    memoryOptions: [
        { size: "504L", price: 4252, color: "Silver" }
    ],
    defaultMemory: "504L"
},
{
    id: 758,
    name: "Холодильник Haier C2F636CCRGU1",
    brand: "Haier",
    image: "images/8ea20f2f92f20a2202d1de9cda70c074.avif",
    desc: "364 л (256 л + 108 л), полный No Frost, стандартный компрессор, зона свежести, сенсорное управление, бежевый, высота 190.5 см.",
    price: 2315,
    memoryOptions: [
        { size: "364L", price: 2315, color: "Beige" }
    ],
    defaultMemory: "364L"
},
{
    id: 759,
    name: "Холодильник Haier HTF-425DM7RU",
    brand: "Haier",
    image: "images/f7151e9313d47b90b73de2ea21360a94.avif",
    desc: "425 л (308 л + 117 л), полный No Frost, инверторный компрессор, электронное управление, серебристый, высота 181.5 см.",
    price: 4130,
    memoryOptions: [
        { size: "425L", price: 4130, color: "Silver" }
    ],
    defaultMemory: "425L"
},
{
    id: 760,
    name: "Холодильник HAIER A4F739CBXGU1",
    brand: "Haier",
    image: "images/5d6bc504fff89110dc475bdae233f0d9.avif",
    desc: "389 л (286 л + 103 л), полный No Frost, инверторный компрессор, электронное управление, черный, высота 200 см.",
    price: 3485,
    memoryOptions: [
        { size: "389L", price: 3485, color: "Black" }
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
    price: 2099,
    memoryOptions: [
        { size: "436L", price: 2099, color: "Black" }
    ],
    defaultMemory: "436L"
},
{
    id: 722,
    name: "Холодильник TECHNO DE2-34",
    brand: "TECHNO",
    image: "images/df43ba22f3f64b51280adc3d0d18e279.avif",
    desc: "250 л (183 л + 62 л), без No Frost, электронное управление, белый, высота 180 см.",
    price: 1018,
    memoryOptions: [
        { size: "250L", price: 1018, color: "White" }
    ],
    defaultMemory: "250L"
},
{
    id: 723,
    name: "Холодильник TECHNO DF1-11S",
    brand: "TECHNO",
    image: "images/0cdbbd0eb8a18d3f92f940a38b4aa60d.avif",
    desc: "92 л, без No Frost, стандартный компрессор, механическое управление, белый, высота 85 см.",
    price: 442,
    memoryOptions: [
        { size: "92L", price: 442, color: "White" }
    ],
    defaultMemory: "92L"
},
{
    id: 724,
    name: "Холодильник TECHNO FS4-36 BI",
    brand: "TECHNO",
    image: "images/68e826557e2a20bd09d48a4875f4dd01.avif",
    desc: "300 л (185 л + 115 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 186 см.",
    price: 1921,
    memoryOptions: [
        { size: "300L", price: 1921, color: "Black" }
    ],
    defaultMemory: "300L"
},
{
    id: 725,
    name: "Холодильник TECHNO FF4-73 SS",
    brand: "TECHNO",
    image: "images/6361c7821fcf85c9dc19b6579bee0bc7.avif",
    desc: "512 л (364 л + 148 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 190.6 см.",
    price: 3114,
    memoryOptions: [
        { size: "512L", price: 3114, color: "Stainless Steel" }
    ],
    defaultMemory: "512L"
},
{
    id: 726,
    name: "Встраиваемый холодильник TECHNO DE2-34.BI",
    brand: "TECHNO",
    image: "images/Group-186.webp",
    desc: "250 л (185 л + 65 л), без No Frost, стандартный компрессор, электронное управление, белый, высота 178 см, встраиваемый.",
    price: 1516,
    memoryOptions: [
        { size: "250L", price: 1516, color: "White" }
    ],
    defaultMemory: "250L"
},
{
    id: 727,
    name: "Холодильник TECHNO FF4-73 BI",
    brand: "TECHNO",
    image: "images/f61e2c98f8a647ae4c588ddce9592941.avif",
    desc: "512 л (364 л + 148 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 190.6 см.",
    price: 3114,
    memoryOptions: [
        { size: "512L", price: 3114, color: "Black" }
    ],
    defaultMemory: "512L"
},
{
    id: 728,
    name: "Холодильник TECHNO FN2-47S SS",
    brand: "TECHNO",
    image: "images/954e339e82d33735ef9610d47adf8e70.avif",
    desc: "342 л (245 л + 97 л), полный No Frost, линейный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 193.5 см.",
    price: 1654,
    memoryOptions: [
        { size: "342L", price: 1654, color: "Stainless Steel" }
    ],
    defaultMemory: "342L"
},
{
    id: 729,
    name: "Холодильник TECHNO DD2-27",
    brand: "TECHNO",
    image: "images/f673d01df25a336cd0c65f1f998597c3.avif",
    desc: "207 л (141 л + 66 л), No Frost только в холодильной камере, механическое управление, белый, высота 151 см.",
    price: 1043,
    memoryOptions: [
        { size: "207L", price: 1043, color: "White" }
    ],
    defaultMemory: "207L"
},
{
    id: 730,
    name: "Холодильник TECHNO FF4-65",
    brand: "TECHNO",
    image: "images/c4b92a392820bf5081be8f3a7c6c8927.avif",
    desc: "491 л (419 л + 72 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, темно-серый, высота 190.5 см.",
    price: 2955,
    memoryOptions: [
        { size: "491L", price: 2955, color: "Dark Gray" }
    ],
    defaultMemory: "491L"
},
{
    id: 731,
    name: "Холодильник TECHNO FN2-46S",
    brand: "TECHNO",
    image: "images/118f9e2d23b54eab5826f78be3864f27.avif",
    desc: "320 л (225 л + 95 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 184 см.",
    price: 1508,
    memoryOptions: [
        { size: "320L", price: 1508, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 732,
    name: "Холодильник TECHNO FN2-31 (серебристый)",
    brand: "TECHNO",
    image: "images/af1450da6c98f48a509bafc61f8081b1.avif",
    desc: "247 л (165 л + 82 л), полный No Frost, стандартный компрессор, механическое управление, серебристый, высота 180 см.",
    price: 1560,
    memoryOptions: [
        { size: "247L", price: 1560, color: "Silver" }
    ],
    defaultMemory: "247L"
},
{
    id: 733,
    name: "Холодильник TECHNO FN2-47S BI",
    brand: "TECHNO",
    image: "images/ae02e93f30845e7a8ef62ee1f7269b87.avif",
    desc: "342 л (245 л + 97 л), полный No Frost, линейный компрессор, зона свежести, электронное управление, черный, высота 193.5 см.",
    price: 1932,
    memoryOptions: [
        { size: "342L", price: 1932, color: "Black" }
    ],
    defaultMemory: "342L"
},
{
    id: 734,
    name: "Холодильник TECHNO DF1-20N",
    brand: "TECHNO",
    image: "images/df120n_techno__9752668_822bb3c063bbe60a904a4b87d6315416.webp",
    desc: "128 л (110 л), без No Frost, механическое управление, белый, высота 114.5 см.",
    price: 778,
    memoryOptions: [
        { size: "128L", price: 778, color: "White" }
    ],
    defaultMemory: "128L"
},
{
    id: 735,
    name: "Холодильник TECHNO FN2-43",
    brand: "TECHNO",
    image: "images/8c291dd863539e19c0dd74cc3375164d.avif",
    desc: "319 л (243 л + 76 л), полный No Frost, электронное управление, белый, высота 201 см.",
    price: 1576,
    memoryOptions: [
        { size: "319L", price: 1576, color: "White" }
    ],
    defaultMemory: "319L"
},
{
    id: 736,
    name: "Холодильник TECHNO EF1-16",
    brand: "TECHNO",
    image: "images/7b79bb901e3c83f20e3552e7d9e02d9b.avif",
    desc: "109 л (95 л + 14 л), без No Frost, стандартный компрессор, механическое управление, белый, высота 85 см.",
    price: 730,
    memoryOptions: [
        { size: "109L", price: 730, color: "White" }
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
    price: 9549,
    memoryOptions: [
        { size: "646L", price: 9549, color: "Black" }
    ],
    defaultMemory: "646L"
},
{
    id: 711,
    name: "Холодильник Samsung RB30A30N0SA/WT",
    brand: "Samsung",
    image: "images/8378296fa475b7014fbeb9a2bb196cdb.avif",
    desc: "311 л (213 л + 98 л), полный No Frost, инверторный компрессор, электронное управление, серебристый, высота 178 см.",
    price: 1839,
    memoryOptions: [
        { size: "311L", price: 1839, color: "Silver" }
    ],
    defaultMemory: "311L"
},
{
    id: 712,
    name: "Холодильник SAMSUNG RF48A4000B4/WT",
    brand: "Samsung",
    image: "images/7ea8be9aa2072363148cf88a59887bfd.avif",
    desc: "468 л (328 л + 140 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, черный, высота 179.3 см.",
    price: 5499,
    memoryOptions: [
        { size: "468L", price: 5499, color: "Black" }
    ],
    defaultMemory: "468L"
},
{
    id: 713,
    name: "Холодильник Samsung RF65DB970012WR",
    brand: "Samsung",
    image: "images/ea356e0fea14f0262517764dd2ed5053.avif",
    desc: "551 л (362 л + 189 л), полный No Frost, инверторный компрессор, сенсорное управление, белый, высота 185.3 см.",
    price: 13990,
    memoryOptions: [
        { size: "551L", price: 13990, color: "White" }
    ],
    defaultMemory: "551L"
},
{
    id: 714,
    name: "Холодильник Samsung RS70F65Q1TWR",
    brand: "Samsung",
    image: "images/6dea7ae8fdeb47afaa986eb522898e51.avif",
    desc: "647 л (418 л + 229 л), полный No Frost, инверторный компрессор, сенсорное управление, нержавеющая сталь, высота 178 см.",
    price: 6839,
    memoryOptions: [
        { size: "647L", price: 6839, color: "Stainless Steel" }
    ],
    defaultMemory: "647L"
},
{
    id: 715,
    name: "Холодильник SAMSUNG RF48A4000M9/WT",
    brand: "Samsung",
    image: "images/a5b2af6c58ff8da04fcc1149ce59c5fd.avif",
    desc: "468 л (328 л + 140 л), полный No Frost, инверторный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 179.3 см.",
    price: 5499,
    memoryOptions: [
        { size: "468L", price: 5499, color: "Stainless Steel" }
    ],
    defaultMemory: "468L"
},
{
    id: 716,
    name: "Холодильник Samsung RS90F65D1FWR",
    brand: "Samsung",
    image: "images/bd355832774a24126317d2d168edb07d.avif",
    desc: "594 л (392 л + 202 л), полный No Frost, инверторный компрессор, сенсорное управление, черный, высота 178.6 см.",
    price: 10369,
    memoryOptions: [
        { size: "594L", price: 10369, color: "Black" }
    ],
    defaultMemory: "594L"
},
{
    id: 717,
    name: "Холодильник Samsung RS70F65Q1FWR",
    brand: "Samsung",
    image: "images/b47179f84f5663cd416b923c716bf8f1.avif",
    desc: "647 л (418 л + 229 л), полный No Frost, инверторный компрессор, сенсорное управление, черный, высота 178 см.",
    price: 6879,
    memoryOptions: [
        { size: "647L", price: 6879, color: "Black" }
    ],
    defaultMemory: "647L"
},
{
    id: 718,
    name: "Холодильник Samsung RS80F65M1WWR",
    brand: "Samsung",
    image: "images/b70ec109a0e7387c53b6aef3073508ad.avif",
    desc: "646 л (417 л + 229 л), полный No Frost, инверторный компрессор, сенсорное управление, белый, высота 178.6 см.",
    price: 9169,
    memoryOptions: [
        { size: "646L", price: 9169, color: "White" }
    ],
    defaultMemory: "646L"
},
{
    id: 719,
    name: "Холодильник Samsung RS80F65M1BWR",
    brand: "Samsung",
    image: "images/a4910213d799fc966815e493ed619d8e.avif ",
    desc: "646 л (417 л + 229 л), полный No Frost, инверторный компрессор, сенсорное управление, черный, высота 178.6 см.",
    price: 9169,
    memoryOptions: [
        { size: "646L", price: 9169, color: "Black" }
    ],
    defaultMemory: "646L"
},
{
    id: 720,
    name: "Холодильник SAMSUNG RF65DG90B0SRWR",
    brand: "Samsung",
    image: "images/cafc353a870b49654660c370227b29eb.avif",
    desc: "602 л (399 л + 203 л), полный No Frost, инверторный компрессор, электронное управление, нержавеющая сталь, высота 183 см.",
    price: 11999,
    memoryOptions: [
        { size: "602L", price: 11999, color: "Stainless Steel" }
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
    price: 2409,
    memoryOptions: [
        { size: "360L", price: 2409, color: "Black" }
    ],
    defaultMemory: "360L"
},
{
    id: 700,
    name: "Холодильник Midea MDRB521MIE28OD",
    brand: "Midea",
    image: "images/d6169973ae190364afc83010c4ac556e.avif",
    desc: "360 л (256 л + 104 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, черный, высота 201.8 см.",
    price: 2046,
    memoryOptions: [
        { size: "360L", price: 2046, color: "Black" }
    ],
    defaultMemory: "360L"
},
{
    id: 701,
    name: "Холодильник-морозильник Midea MDRF692MIE46",
    brand: "Midea",
    image: "images/e23ed680276ffef36aa6c6aa993230d0.avif",
    desc: "531 л (357 л + 174 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, темный металлик, высота 189.8 см.",
    price: 4507,
    memoryOptions: [
        { size: "531L", price: 4507, color: "Dark Metallic" }
    ],
    defaultMemory: "531L"
},
{
    id: 702,
    name: "Холодильник Midea MDRF692MIE28",
    brand: "Midea",
    image: "images/ce6074d092ebb3456b761cad3c11c136.avif",
    desc: "531 л (347 л + 174 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, темная нержавеющая сталь, высота 189.8 см.",
    price: 4485,
    memoryOptions: [
        { size: "531L", price: 4485, color: "Dark Stainless Steel" }
    ],
    defaultMemory: "531L"
},
{
    id: 703,
    name: "Холодильник Midea MDRS791MIE46",
    brand: "Midea",
    image: "images/58607ea27a7b13e2032c0adda53e81f6.avif",
    desc: "604 л (384 л + 220 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, нержавеющая сталь, высота 177.5 см.",
    price: 4028,
    memoryOptions: [
        { size: "604L", price: 4028, color: "Stainless Steel" }
    ],
    defaultMemory: "604L"
},
{
    id: 704,
    name: "Холодильник Midea MDRB470MGF01OM",
    brand: "Midea",
    image: "images/bcd07d2c854d73f5e655f15be84325b3.avif",
    desc: "320 л (216 л + 104 л), полный No Frost, стандартный компрессор, зона свежести, сенсорное управление, белый, высота 185 см.",
    price: 1964,
    memoryOptions: [
        { size: "320L", price: 1964, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 705,
    name: "Холодильник-морозильник Midea MDRB470MGF01O",
    brand: "Midea",
    image: "images/99fe64daaec60be8966bcf28fb3e841c.avif",
    desc: "320 л (216 л + 104 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, белый, высота 185 см.",
    price: 1955,
    memoryOptions: [
        { size: "320L", price: 1955, color: "White" }
    ],
    defaultMemory: "320L"
},
{
    id: 706,
    name: "Холодильник Midea MDRB470MGF46O",
    brand: "Midea",
    image: "images/48ef22fdeec809359b561a744338b9f4.avif",
    desc: "320 л (216 л + 104 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, нержавеющая сталь, высота 185 см.",
    price: 1899,
    memoryOptions: [
        { size: "320L", price: 1899, color: "Stainless Steel" }
    ],
    defaultMemory: "320L"
},
{
    id: 707,
    name: "Холодильник-морозильник Midea MDRB470MGF46OM",
    brand: "Midea",
    image: "images/087a9e00864c6098c4f1b200af56170d.avif",
    desc: "320 л (216 л + 104 л), полный No Frost, стандартный компрессор, зона свежести, электронное управление, серебристый, высота 185 см.",
    price: 1829,
    memoryOptions: [
        { size: "320L", price: 1829, color: "Silver" }
    ],
    defaultMemory: "320L"
},
{
    id: 708,
    name: "Холодильник Midea MDRF692MIE22",
    brand: "Midea",
    image: "images/78a79990e50a90c2d9d321a36a48f4c3.avif",
    desc: "531 л (357 л + 174 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, черный, высота 189.8 см.",
    price: 4861,
    memoryOptions: [
        { size: "531L", price: 4861, color: "Black" }
    ],
    defaultMemory: "531L"
},
{
    id: 709,
    name: "Холодильник Midea MDRB521MIE46ODM",
    brand: "Midea",
    image: "images/c7b7933a2f533ca4c2353661b1c8c4d1.avif",
    desc: "360 л (256 л + 104 л), полный No Frost, инверторный компрессор, зона свежести, сенсорное управление, нержавеющая сталь, высота 201.8 см.",
    price: 2277,
    memoryOptions: [
        { size: "360L", price: 2277, color: "Stainless Steel" }
    ],
    defaultMemory: "360L"
},

      
    ],

    dishwashers: [
        // Korting (10 моделей)
       ,

        // Haier (10 моделей)
      ,

        // Bosch (10 моделей)
        {
            id: 14021,
            name: "Посудомоечная машина Bosch SMV25BX01R",
            price: 1800,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Встраиваемая 60 см, тихий двигатель EcoSilence Drive, защита от протечек, 5 программ, 12 комплектов."
        },
        {
            id: 14022,
            name: "Посудомоечная машина Bosch SPV2HKX1ER",
            price: 1300,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Узкая 45 см, 9 комплектов, 4 программы, инверторный мотор EcoSilence Drive."
        },
        {
            id: 14023,
            name: "Посудомоечная машина Bosch SMV46MX00R",
            price: 2100,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Полноразмерная 60 см, 13 комплектов, 6 программ, ActiveWater, VarioSpeed."
        },
        {
            id: 14024,
            name: "Посудомоечная машина Bosch SMI46XS00R",
            price: 1900,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Встраиваемая 60 см, 13 комплектов, 5 программ, EcoSilence Drive, стеклянная панель."
        },
        {
            id: 14025,
            name: "Посудомоечная машина Bosch SPV4HMX1ER",
            price: 1450,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Узкая 45 см, 10 комплектов, 5 программ, инверторный мотор, PerfectDry."
        },
        {
            id: 14026,
            name: "Посудомоечная машина Bosch SMV4HVX1ER",
            price: 2000,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Полноразмерная 60 см, 14 комплектов, 6 программ, инверторный мотор, Home Connect."
        },
        {
            id: 14027,
            name: "Посудомоечная машина Bosch SKS41E11RU",
            price: 1100,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500",
            desc: "Настольная, 6 комплектов, 4 программы, компактная, немецкое качество."
        },
        {
            id: 14028,
            name: "Посудомоечная машина Bosch SMV6ZCX1ER",
            price: 2300,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Премиум 60 см, 14 комплектов, 7 программ, EcoSilence Drive, Zeolith-сушка."
        },
        {
            id: 14029,
            name: "Посудомоечная машина Bosch SPV5HMX1ER",
            price: 1550,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Узкая 45 см, 10 комплектов, 6 программ, инверторный мотор, VarioSpeed."
        },
        {
            id: 14030,
            name: "Посудомоечная машина Bosch SMV5HVX1ER",
            price: 1850,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Встраиваемая 60 см, 13 комплектов, 5 программ, EcoSilence Drive, ActiveWater."
        },

        // MAUNFELD (10 моделей)
        {
            id: 14031,
            name: "Посудомоечная машина Maunfeld MLP-06IM",
            price: 880,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500",
            desc: "Настольная, 6 комплектов, 7 программ, инверторный мотор, дисплей, отложенный старт."
        },
        {
            id: 14032,
            name: "Посудомоечная машина Maunfeld MLP-45IM",
            price: 1050,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Узкая 45 см, 10 комплектов, 6 программ, инверторный мотор, класс A++."
        },
        {
            id: 14033,
            name: "Посудомоечная машина Maunfeld MLP-60IM",
            price: 1200,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Полноразмерная 60 см, 14 комплектов, 7 программ, инверторный мотор, дисплей."
        },
        {
            id: 14034,
            name: "Посудомоечная машина Maunfeld MLP-06IM White",
            price: 880,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500",
            desc: "Настольная белая, 6 комплектов, 7 программ, инверторный мотор."
        },
        {
            id: 14035,
            name: "Посудомоечная машина Maunfeld MLP-45IM Silver",
            price: 1050,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Узкая 45 см серебристая, 10 комплектов, 6 программ, инверторный мотор."
        },
        {
            id: 14036,
            name: "Посудомоечная машина Maunfeld MLP-60IM Inox",
            price: 1250,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Полноразмерная 60 см нержавейка, 14 комплектов, 8 программ, инвертор."
        },
        {
            id: 14037,
            name: "Посудомоечная машина Maunfeld MLP-06IM Pro",
            price: 950,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500",
            desc: "Настольная, 6 комплектов, 8 программ, инвертор, дисплей, быстрая мойка."
        },
        {
            id: 14038,
            name: "Посудомоечная машина Maunfeld MLP-45IM Pro",
            price: 1150,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Узкая 45 см, 10 комплектов, 7 программ, инвертор, 5 температур."
        },
        {
            id: 14039,
            name: "Посудомоечная машина Maunfeld MLP-60IM Pro",
            price: 1350,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Полноразмерная 60 см, 15 комплектов, 8 программ, инвертор, сушка."
        },
        {
            id: 14040,
            name: "Посудомоечная машина Maunfeld MLP-45IM Black",
            price: 1100,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Узкая 45 см черная, 10 комплектов, 6 программ, инверторный мотор."
        },

        // HOTPOINT (10 моделей)
        {
    id: 866,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 2D85 DWT",
    brand: "Hotpoint",
    image: "images/d8e0cfc5ee3b3061c30b5f6fb395943a.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A, луч на полу, встраиваемая.",
    price: 1499,
    memoryOptions: [
        { size: "Full Size", price: 1499, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 867,
    name: "Посудомоечная машина Hotpoint HI 5D83 DWT",
    brand: "Hotpoint",
    image: "images/e2c7259b1b9945278a88df24071025c1.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A, луч на полу.",
    price: 1899,
    memoryOptions: [
        { size: "Full Size", price: 1899, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 868,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 2D86 D",
    brand: "Hotpoint",
    image: "images/bd423bf19c332e7a68f535730c55fdac.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, луч на полу, встраиваемая.",
    price: 1549,
    memoryOptions: [
        { size: "Full Size", price: 1549, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 869,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 1D67",
    brand: "Hotpoint",
    image: "images/402333604e2dc8c6504369c130622a33.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1189,
    memoryOptions: [
        { size: "Full Size", price: 1189, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 870,
    name: "Посудомоечная машина Hotpoint HI 5D69 AWSM",
    brand: "Hotpoint",
    image: "images/7c121d3775beebaa15cd4ea7dd4dcec9.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A++, луч на полу.",
    price: 1819,
    memoryOptions: [
        { size: "Full Size", price: 1819, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 871,
    name: "Встраиваемая посудомоечная машина Hotpoint HI 4C56W",
    brand: "Hotpoint",
    image: "images/898d93abcbf86fcf86f34489bcb0cdcb.avif",
    desc: "Вентиляционная сушка, защита от протечек, 5 программ, класс A+, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1239,
    memoryOptions: [
        { size: "Full Size", price: 1239, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 872,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 2D87 D",
    brand: "Hotpoint",
    image: "images/da7b7bd403bfa9ce919bf952aff45965.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A, луч на полу, встраиваемая.",
    price: 1399,
    memoryOptions: [
        { size: "Full Size", price: 1399, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 873,
    name: "Встраиваемая посудомоечная машина Hotpoint HI 4C66",
    brand: "Hotpoint",
    image: "images/29ee47ef171ebebb1640d4c02776559c.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1449,
    memoryOptions: [
        { size: "Full Size", price: 1449, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 874,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 1C56W",
    brand: "Hotpoint",
    image: "images/9485f636690cb6ea0ed19ba9c7a773bf.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1139,
    memoryOptions: [
        { size: "Full Size", price: 1139, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 875,
    name: "Встраиваемая посудомоечная машина Hotpoint HI 5D84 DW",
    brand: "Hotpoint",
    image: "images/30fea047a1963c272dd270dd71aea33f.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 8 программ, класс A, луч на полу, без автооткрывания, встраиваемая.",
    price: 1749,
    memoryOptions: [
        { size: "Full Size", price: 1749, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 876,
    name: "Встраиваемая посудомоечная машина Hotpoint HI 4D66",
    brand: "Hotpoint",
    image: "images/f64d7e72d9ddcacfcb163575705e54b0.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1409,
    memoryOptions: [
        { size: "Full Size", price: 1409, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 877,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 2C69 S",
    brand: "Hotpoint",
    image: "images/878408bb8dfcd2aac6b3a8ac2d572d14.avif",
    desc: "Конденсационная сушка, защита от протечек, 8 программ, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1919,
    memoryOptions: [
        { size: "Full Size", price: 1919, color: "Silver" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 878,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 6D59",
    brand: "Hotpoint",
    image: "images/8fa94fae9100f3d05dfda20ba7957027.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 1159,
    memoryOptions: [
        { size: "Full Size", price: 1159, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 879,
    name: "Встраиваемая посудомоечная машина Hotpoint HI 4D66 DW",
    brand: "Hotpoint",
    image: "images/dfbbdbf661a2acae2d846f5467493da8.avif",
    desc: "Вентиляционная сушка, автооткрывание двери, защита от протечек, 6 программ, класс A, луч на полу, без третьего короба, встраиваемая.",
    price: 1849,
    memoryOptions: [
        { size: "Full Size", price: 1849, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 880,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 1C69",
    brand: "Hotpoint",
    image: "images/cbb309245d487cfce6546239aa64d2bb.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 1449,
    memoryOptions: [
        { size: "Full Size", price: 1449, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 881,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 1C55 D",
    brand: "Hotpoint",
    image: "images/ab91ea523b6f6e9de4a5a7b14508c6dd.avif",
    desc: "Сушка с открыванием дверцы, третий короб, защита от протечек корпуса, 5 программ, класс A, без автооткрывания, без луча на полу, встраиваемая.",
    price: 1099,
    memoryOptions: [
        { size: "Full Size", price: 1099, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 882,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 6C59",
    brand: "Hotpoint",
    image: "images/c157e4cc2aa4ab7728ce25b94ab81067.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 989,
    memoryOptions: [
        { size: "Full Size", price: 989, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 883,
    name: "Посудомоечная машина HOTPOINT HI 5D85 DW",
    brand: "Hotpoint",
    image: "images/62d7a05df3288b51485cce0f0afef69e.avif",
    desc: "Активная вентиляция, автооткрывание двери, защита от протечек, 8 программ, класс A, луч на полу, без третьего короба.",
    price: 1479,
    memoryOptions: [
        { size: "Full Size", price: 1479, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 884,
    name: "Встраиваемая посудомоечная машина Hotpoint HIS 2D86 W",
    brand: "Hotpoint",
    image: "images/79fa9e05fb84c0e9459810abb5cdcacc.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, класс A, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1299,
    memoryOptions: [
        { size: "Full Size", price: 1299, color: "White" }
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
    price: 999,
    memoryOptions: [
        { size: "Full Size", price: 999, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 857,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 6038 D Autoopen",
    brand: "Weissgauff",
    image: "images/5949882b5ad6efcd37ba1c0b3fb04113.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 8 программ, класс A++, луч на полу, встраиваемая.",
    price: 1199,
    memoryOptions: [
        { size: "Full Size", price: 1199, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 858,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 4525 Infolight",
    brand: "Weissgauff",
    image: "images/d328e0bc3d383e3e6980d0dbb9f3df9b.avif",
    desc: "Конденсационная сушка, защита от протечек, 5 программ, класс A++, луч на полу, без автооткрывания, без третьего короба, встраиваемая.",
    price: 899,
    memoryOptions: [
        { size: "Full Size", price: 899, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 859,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 6026 D",
    brand: "Weissgauff",
    image: "images/0bef2d76e636f221ab29f13b4aaa82c6.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, класс A++, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 899,
    memoryOptions: [
        { size: "Full Size", price: 899, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 860,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 4536 D Infolight",
    brand: "Weissgauff",
    image: "images/7dc28895d7e57402eddda7bbe721b082.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 6 программ, класс A++, луч на полу, без автооткрывания, встраиваемая.",
    price: 1099,
    memoryOptions: [
        { size: "Full Size", price: 1099, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 861,
    name: "Посудомоечная машина Weissgauff BDW 4535 Autoopen Timer Floor",
    brand: "Weissgauff",
    image: "images/beed7e8030b068e3410cda15c924f10d.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 5 программ, класс A+++, проекция дисплея на пол.",
    price: 1199,
    memoryOptions: [
        { size: "Full Size", price: 1199, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 862,
    name: "Посудомоечная машина Weissgauff BDW 6035",
    brand: "Weissgauff",
    image: "images/ba63e2d25004bbf0bb7e161292a1d7f7.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 5 программ, класс A++, без автооткрывания, без луча на полу.",
    price: 1449,
    memoryOptions: [
        { size: "Full Size", price: 1449, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 863,
    name: "Встраиваемая посудомоечная машина WEISSGAUFF BDW4543D",
    brand: "Weissgauff",
    image: "images/69a43ed3fce67eff1205b7d24f87d0ec.avif",
    desc: "Конденсационная сушка, защита от протечек, 7 программ, класс A+, без автооткрывания, без третьего короба, без луча на полу, встраиваемая.",
    price: 1128,
    memoryOptions: [
        { size: "Full Size", price: 1128, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 864,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 4536 D",
    brand: "Weissgauff",
    image: "images/a5854a3f7d005b309a74fa14ad9319ea.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, 6 программ, класс A++, без автооткрывания, без луча на полу, встраиваемая.",
    price: 1042,
    memoryOptions: [
        { size: "Full Size", price: 1042, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 865,
    name: "Встраиваемая посудомоечная машина Weissgauff BDW 6136 D Inverter AutoOpen Infolight",
    brand: "Weissgauff",
    image: "images/2e66032ec63f223011cec310feb82c46.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, 6 программ, класс A+++, луч на полу, инвертор, встраиваемая.",
    price: 2075,
    memoryOptions: [
        { size: "Full Size", price: 2075, color: "White" }
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
    price: 1731,
    memoryOptions: [
        { size: "Full Size", price: 1731, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 833,
    name: "Встраиваемая посудомоечная машина Electrolux EES848200L",
    brand: "Electrolux",
    image: "images/4bca21bb09142ca7c840a1b12f7082d4.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс E, встраиваемая.",
    price: 1744,
    memoryOptions: [
        { size: "Full Size", price: 1744, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 834,
    name: "Посудомоечная машина Electrolux EEA17200L",
    brand: "Electrolux",
    image: "images/0dfb2f566e4d47616cca877cab7916f3.avif",
    desc: "Конденсационная сушка, автооткрывание двери, защита от протечек, 5 программ, без третьего короба, без луча на полу.",
    price: 1257,
    memoryOptions: [
        { size: "Full Size", price: 1257, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 835,
    name: "Встраиваемая посудомоечная машина Electrolux EEM48300L",
    brand: "Electrolux",
    image: "images/3aaac9bb3c2fda5623eb6525e869da5a.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, встраиваемая.",
    price: 1648,
    memoryOptions: [
        { size: "Full Size", price: 1648, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 836,
    name: "Встраиваемая посудомоечная машина Electrolux AirDry 300 KEAC3200L",
    brand: "Electrolux",
    image: "images/a88ddc51fc5ad217e5f33944034d492c.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, встраиваемая.",
    price: 1463,
    memoryOptions: [
        { size: "Full Size", price: 1463, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 837,
    name: "Встраиваемая посудомоечная машина Electrolux EEA23200L",
    brand: "Electrolux",
    image: "images/78f8bdb28fc0973953faff98a0da0fa2.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 6 программ, класс E, встраиваемая.",
    price: 1383,
    memoryOptions: [
        { size: "Full Size", price: 1383, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 838,
    name: "Посудомоечная машина ELECTROLUX EEA43211L",
    brand: "Electrolux",
    image: "images/e00e77bbe204720e41daf3eefd8821c2.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс E.",
    price: 1599,
    memoryOptions: [
        { size: "Full Size", price: 1599, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 839,
    name: "Встраиваемая посудомоечная машина Electrolux EES47320L",
    brand: "Electrolux",
    image: "images/aa40c34d6d2aab16b6a5d28fa8df2036.avif",
    desc: "Конденсационная сушка, автооткрывание двери, защита от протечек, луч на полу, 8 программ, класс A+++, без третьего короба, встраиваемая.",
    price: 1654,
    memoryOptions: [
        { size: "Full Size", price: 1654, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 840,
    name: "Встраиваемая посудомоечная машина Electrolux EEM48221L",
    brand: "Electrolux",
    image: "images/48f4d9202c660c51dee16894d8918b90.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс A++, встраиваемая.",
    price: 2499,
    memoryOptions: [
        { size: "Full Size", price: 2499, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 841,
    name: "Встраиваемая посудомоечная машина Electrolux EEM48320L",
    brand: "Electrolux",
    image: "images/da59c194c37cbb66e6fae214f4ad44c4.avif",
    desc: "Конденсационная сушка, автооткрывание двери, защита от протечек, луч на полу, 7 программ, класс A+++ (новый D), без третьего короба, встраиваемая.",
    price: 2099,
    memoryOptions: [
        { size: "Full Size", price: 2099, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 842,
    name: "Встраиваемая посудомоечная машина Electrolux EEM69310L",
    brand: "Electrolux",
    image: "images/e470fca1b440e28221448fc2ab78d641.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, встраиваемая.",
    price: 2795,
    memoryOptions: [
        { size: "Full Size", price: 2795, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 843,
    name: "Встраиваемая посудомоечная машина Electrolux EEA12100L",
    brand: "Electrolux",
    image: "images/980ee5f2f135a5046cdd08d02e6ea867.avif",
    desc: "Конденсационная сушка, автооткрывание двери, защита от протечек, 5 программ, класс A, без третьего короба, без луча на полу, встраиваемая.",
    price: 1385,
    memoryOptions: [
        { size: "Full Size", price: 1385, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 844,
    name: "Посудомоечная машина ELECTROLUX EES27200L",
    brand: "Electrolux",
    image: "images/445a2b503aca62487ae103cafae33fb4.avif",
    desc: "Сушка с открыванием дверцы, автооткрывание двери, защита от протечек, 5 программ, класс E, без третьего короба.",
    price: 1606,
    memoryOptions: [
        { size: "Full Size", price: 1606, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 845,
    name: "Посудомоечная машина Electrolux EEC87400W",
    brand: "Electrolux",
    image: "images/28bddf8f9ed5b139f0e55e4e15d76923.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс A+++ (новый D).",
    price: 4440,
    memoryOptions: [
        { size: "Full Size", price: 4440, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 846,
    name: "Посудомоечная машина Electrolux EEA71210L",
    brand: "Electrolux",
    image: "images/7afddc2c7bc96da36bed8fda4cb2d201.avif",
    desc: "Сушка AirDry, автооткрывание двери, защита от протечек, 5 программ, без третьего короба, без луча на полу.",
    price: 1499,
    memoryOptions: [
        { size: "Full Size", price: 1499, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 847,
    name: "Встраиваемая посудомоечная машина Electrolux EEQ47210L",
    brand: "Electrolux",
    image: "images/791adf23c3ed4b9aefa38815ece5d24c.avif",
    desc: "Конденсационная сушка, защита от протечек, луч на полу, 8 программ, без автооткрывания, без третьего короба, встраиваемая.",
    price: 1746,
    memoryOptions: [
        { size: "Full Size", price: 1746, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 848,
    name: "Встраиваемая посудомоечная машина Electrolux EEM63310L",
    brand: "Electrolux",
    image: "images/0faf36f87df46b23ffe47c4858742bab.avif",
    desc: "Сушка с теплообменником, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, встраиваемая.",
    price: 2555,
    memoryOptions: [
        { size: "Full Size", price: 2555, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 849,
    name: "Встраиваемая посудомоечная машина Electrolux KEMB3301L",
    brand: "Electrolux",
    image: "images/6f51605e888972e61344e6ca6e5e1059.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, луч на полу, 8 программ, без автооткрывания, встраиваемая.",
    price: 2586,
    memoryOptions: [
        { size: "Full Size", price: 2586, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 850,
    name: "Встраиваемая посудомоечная машина Electrolux EEM43200L",
    brand: "Electrolux",
    image: "images/загружено.webp",
    desc: "Конденсационная сушка, третий короб, защита от протечек, луч на полу, 8 программ, класс E, без автооткрывания, встраиваемая.",
    price: 2169,
    memoryOptions: [
        { size: "Full Size", price: 2169, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 851,
    name: "Встраиваемая посудомоечная машина Electrolux EEG62300L",
    brand: "Electrolux",
    image: "images/0936149ffa91c3f912fa934e2b486061.avif",
    desc: "Конденсационная сушка, защита от протечек, луч на полу, 8 программ, без автооткрывания, без третьего короба, встраиваемая.",
    price: 2199,
    memoryOptions: [
        { size: "Full Size", price: 2199, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 852,
    name: "Посудомоечная машина Electrolux EEA727200L",
    brand: "Electrolux",
    image: "images/54f45669d79865ad582b808cc200906a.avif",
    desc: "Конденсационная сушка, защита от протечек, 6 программ, класс A++, без автооткрывания, без третьего короба, без луча на полу.",
    price: 1484,
    memoryOptions: [
        { size: "Full Size", price: 1484, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 853,
    name: "Встраиваемая посудомоечная машина Electrolux EEM69410W",
    brand: "Electrolux",
    image: "images/439a7e0c83889b81e6846b9a742ae2df.avif",
    desc: "Конденсационная сушка, третий короб, защита от протечек, луч на полу, 8 программ, без автооткрывания, встраиваемая.",
    price: 3001,
    memoryOptions: [
        { size: "Full Size", price: 3001, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 854,
    name: "Встраиваемая посудомоечная машина Electrolux EEA23210L",
    brand: "Electrolux",
    image: "images/7e32a1b0ffc67c71f590070ed044d54a.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 6 программ, класс E, встраиваемая.",
    price: 1682,
    memoryOptions: [
        { size: "Full Size", price: 1682, color: "White" }
    ],
    defaultMemory: "Full Size"
},
{
    id: 855,
    name: "Посудомоечная машина Electrolux EEC87315L",
    brand: "Electrolux",
    image: "images/cb971b3f917cddf9ad780c605efe0024.avif",
    desc: "Конденсационная сушка, автооткрывание двери, третий короб, защита от протечек, луч на полу, 8 программ, класс D.",
    price: 4091,
    memoryOptions: [
        { size: "Full Size", price: 4091, color: "White" }
    ],
    defaultMemory: "Full Size"
},

    ],

    coffee: [
        // DeLonghi (10 моделей)
        {
            id: 15001,
            name: "Кофемашина DeLonghi Magnifica S ECAM 22.110.B",
            price: 1350,
            brand: "DeLonghi",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, приготовление эспрессо и капучино, встроенная кофемолка, 13 степеней помола, 1.8л бак."
        },
        {
            id: 15002,
            name: "Кофемашина DeLonghi Magnifica Evo ECAM 290.81.B",
            price: 1650,
            brand: "DeLonghi",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, LatteCrema система, 7 рецептов, сенсорный экран, 2 чашки одновременно."
        },
        {
            id: 15003,
            name: "Кофемашина DeLonghi Primadonna Soul ECAM 610.75",
            price: 2800,
            brand: "DeLonghi",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Премиум, сенсорный экран, LatteCrema, 18 рецептов, Wi-Fi, цветной дисплей."
        },
        {
            id: 15004,
            name: "Кофемашина DeLonghi Dedica EC 685.BK",
            price: 750,
            brand: "DeLonghi",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, компактная, 15 бар давления, металлический корпус, подогрев чашек."
        },
        {
            id: 15005,
            name: "Кофемашина DeLonghi Magnifica XS ECAM 23.120.B",
            price: 1450,
            brand: "DeLonghi",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, встроенная кофемолка, капучинатор, 1.8л, съемный заварной блок."
        },
        {
            id: 15006,
            name: "Кофемашина DeLonghi Autentica ETAM 29.660.B",
            price: 1900,
            brand: "DeLonghi",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, компактная, LatteCrema, 9 рецептов, цветной дисплей."
        },
        {
            id: 15007,
            name: "Кофемашина DeLonghi Magnifica Start ECAM 220.80.B",
            price: 1550,
            brand: "DeLonghi",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 4 рецепта, ручной капучинатор, 13 степеней помола."
        },
        {
            id: 15008,
            name: "Кофемашина DeLonghi La Specialista Arte EC9155.B",
            price: 1700,
            brand: "DeLonghi",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, встроенная кофемолка, система для темперовки, паровой бойлер."
        },
        {
            id: 15009,
            name: "Кофемашина DeLonghi Eletta Explore ECAM 450.86.S",
            price: 2400,
            brand: "DeLonghi",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, холодные кофейные напитки, LatteCrema, 16 рецептов."
        },
        {
            id: 15010,
            name: "Кофемашина DeLonghi Magnifica S ECAM 21.117.B",
            price: 1250,
            brand: "DeLonghi",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, встроенная кофемолка, 1.8л, 13 степеней помола, подогрев чашек."
        },

        // NIVONA (10 моделей)
        {
            id: 15011,
            name: "Кофемашина NIVONA Cafe Romantica 880",
            price: 1400,
            brand: "NIVONA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 напитков, керамические жернова, 2.2л бак, капучинатор."
        },
        {
            id: 15012,
            name: "Кофемашина NIVONA Easy Cappuccino 870",
            price: 1200,
            brand: "NIVONA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 напитков, керамические жернова, съемный заварной блок."
        },
        {
            id: 15013,
            name: "Кофемашина NIVONA Cafe Premium 890",
            price: 1600,
            brand: "NIVONA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 напитков, 2.2л, керамические жернова, цветной дисплей."
        },
        {
            id: 15014,
            name: "Кофемашина NIVONA Cafe Perfetto 870",
            price: 1250,
            brand: "NIVONA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 напитков, керамические жернова, 1.8л бак."
        },
        {
            id: 15015,
            name: "Кофемашина NIVONA Cafe Edition 880",
            price: 1450,
            brand: "NIVONA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 напитков, керамические жернова, 2.2л, черный цвет."
        },
        {
            id: 15016,
            name: "Кофемашина NIVONA Cafe Romantica 870",
            price: 1300,
            brand: "NIVONA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 напитков, керамические жернова, капучинатор."
        },
        {
            id: 15017,
            name: "Кофемашина NIVONA Cafe Premium 880",
            price: 1500,
            brand: "NIVONA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 напитков, керамические жернова, 2.2л, серебристый."
        },
        {
            id: 15018,
            name: "Кофемашина NIVONA Cafe Edition 870",
            price: 1350,
            brand: "NIVONA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 напитков, керамические жернова, 1.8л, дизайн."
        },
        {
            id: 15019,
            name: "Кофемашина NIVONA Easy Espresso 860",
            price: 1100,
            brand: "NIVONA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 4 напитка, керамические жернова, компактная."
        },
        {
            id: 15020,
            name: "Кофемашина NIVONA Cafe Perfetto 880",
            price: 1350,
            brand: "NIVONA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 напитков, керамические жернова, 2.2л, белый цвет."
        },

        // PHILIPS (10 моделей)
        {
            id: 15021,
            name: "Кофемашина Philips EP1220/00 Series 1200",
            price: 1250,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=500",
            desc: "Автоматическая, сенсорный дисплей, классический капучинатор, керамические жернова, 2л бак."
        },
        {
            id: 15022,
            name: "Кофемашина Philips EP3246/70 Series 3200 LatteGo",
            price: 1650,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=500",
            desc: "Автоматическая, LatteGo система, 5 напитков, керамические жернова, 1.8л."
        },
        {
            id: 15023,
            name: "Кофемашина Philips EP5447/90 Series 5400 LatteGo",
            price: 2100,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=500",
            desc: "Автоматическая, 8 напитков, LatteGo, сенсорный экран, Wi-Fi."
        },
        {
            id: 15024,
            name: "Кофемашина Philips EP2220/40 Series 2200",
            price: 1350,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=500",
            desc: "Автоматическая, классический капучинатор, керамические жернова, 1.8л."
        },
        {
            id: 15025,
            name: "Кофемашина Philips EP3360/30 Series 3300 LatteGo",
            price: 1700,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=500",
            desc: "Автоматическая, LatteGo, 5 напитков, сенсорный дисплей."
        },
        {
            id: 15026,
            name: "Кофемашина Philips EP3243/70 Series 3200 LatteGo",
            price: 1600,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=500",
            desc: "Автоматическая, LatteGo, 5 напитков, керамические жернова."
        },
        {
            id: 15027,
            name: "Кофемашина Philips EP2230/40 Series 2200",
            price: 1400,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=500",
            desc: "Автоматическая, классический капучинатор, 4 напитка, 2л бак."
        },
        {
            id: 15028,
            name: "Кофемашина Philips EP5447/50 Series 5400 LatteGo",
            price: 2150,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=500",
            desc: "Автоматическая, 8 напитков, LatteGo, сенсорный экран, Wi-Fi."
        },
        {
            id: 15029,
            name: "Кофемашина Philips EP3241/50 Series 3200",
            price: 1500,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=500",
            desc: "Автоматическая, 4 напитка, классический капучинатор, керамические жернова."
        },
        {
            id: 15030,
            name: "Кофемашина Philips EP3361/30 Series 3300",
            price: 1650,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1524350876685-274059332603?w=500",
            desc: "Автоматическая, LatteGo, 5 напитков, цветной дисплей, 2.2л."
        },

        // POLARIS (10 моделей)
        {
            id: 15031,
            name: "Кофемашина Polaris PCM 1521E",
            price: 650,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 15 бар давления, металлический корпус, подогрев чашек, 1.4л."
        },
        {
            id: 15032,
            name: "Кофемашина Polaris PCM 1512E",
            price: 550,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 15 бар, 1.2л, компактная, паровой капучинатор."
        },
        {
            id: 15033,
            name: "Кофемашина Polaris PCM 1526E",
            price: 750,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар давления, термоблок, 1.7л, подогрев чашек."
        },
        {
            id: 15034,
            name: "Кофемашина Polaris PCM 1531E",
            price: 850,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 19 бар, 1.8л, манометр, профессиональный капучинатор."
        },
        {
            id: 15035,
            name: "Кофемашина Polaris PCM 1535E",
            price: 900,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID контроль температуры, подогрев чашек."
        },
        {
            id: 15036,
            name: "Кофемашина Polaris PCM 1511E",
            price: 500,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 15 бар, 1.2л, компактная, пластиковый корпус."
        },
        {
            id: 15037,
            name: "Кофемашина Polaris PCM 1527E",
            price: 780,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 19 бар, 1.5л, металлический корпус, капучинатор."
        },
        {
            id: 15038,
            name: "Кофемашина Polaris PCM 1532E",
            price: 880,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, дисплей, манометр, подогрев чашек."
        },
        {
            id: 15039,
            name: "Кофемашина Polaris PCM 1522E",
            price: 680,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 15 бар, 1.4л, металлический корпус, быстрый нагрев."
        },
        {
            id: 15040,
            name: "Кофемашина Polaris PCM 1536E",
            price: 950,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID, предварительное смачивание, профессиональная."
        },

        // Krups (10 моделей)
        {
            id: 15041,
            name: "Кофемашина Krups EA8708 Evidence Plus",
            price: 1900,
            brand: "Krups",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 15 рецептов, керамические жернова, LatteMax, 2.3л бак."
        },
        {
            id: 15042,
            name: "Кофемашина Krups EA817 Evidence One",
            price: 1500,
            brand: "Krups",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2л, капучинатор."
        },
        {
            id: 15043,
            name: "Кофемашина Krups EA891D Evidence Eco Design",
            price: 2100,
            brand: "Krups",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 17 рецептов, керамические жернова, LatteMax, дисплей."
        },
        {
            id: 15044,
            name: "Кофемашина Krups EA8298 Espresseria Automatic",
            price: 1300,
            brand: "Krups",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 7 рецептов, керамические жернова, 1.8л."
        },
        {
            id: 15045,
            name: "Кофемашина Krups EA894D Evidence Plus Black",
            price: 1950,
            brand: "Krups",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 15 рецептов, керамические жернова, LatteMax, черный."
        },
        {
            id: 15046,
            name: "Кофемашина Krups EA8708 Evidence Silver",
            price: 1900,
            brand: "Krups",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 15 рецептов, керамические жернова, серебристый."
        },
        {
            id: 15047,
            name: "Кофемашина Krups EA817E Evidence One",
            price: 1550,
            brand: "Krups",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2л."
        },
        {
            id: 15048,
            name: "Кофемашина Krups EA894F Evidence Pro",
            price: 2200,
            brand: "Krups",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 17 рецептов, керамические жернова, сенсорный экран."
        },
        {
            id: 15049,
            name: "Кофемашина Krups EA829F Espresseria",
            price: 1350,
            brand: "Krups",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 7 рецептов, керамические жернова, компактная."
        },
        {
            id: 15050,
            name: "Кофемашина Krups EA8910 Evidence Eco",
            price: 2050,
            brand: "Krups",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 17 рецептов, керамические жернова, эко-дизайн."
        },

        // JURA (10 моделей)
        {
            id: 15051,
            name: "Кофемашина JURA E8 (EA) Black",
            price: 3200,
            brand: "JURA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 16 рецептов, керамические жернова P.A.G., 2.4л, цветной дисплей."
        },
        {
            id: 15052,
            name: "Кофемашина JURA D6 (EA) Silver",
            price: 2100,
            brand: "JURA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 рецептов, керамические жернова, 1.9л, дисплей."
        },
        {
            id: 15053,
            name: "Кофемашина JURA E6 (EA) Black",
            price: 2800,
            brand: "JURA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 12 рецептов, керамические жернова, 2.2л, сенсорный экран."
        },
        {
            id: 15054,
            name: "Кофемашина JURA S8 (EA) Silver",
            price: 3800,
            brand: "JURA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Премиум, 22 рецепта, керамические жернова, 2.8л, сенсорный экран."
        },
        {
            id: 15055,
            name: "Кофемашина JURA Z10 (EA) White",
            price: 4800,
            brand: "JURA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Флагман, 30 рецептов, холодные напитки, 3D технология, сенсорный экран."
        },
        {
            id: 15056,
            name: "Кофемашина JURA E8 (EA) Silver",
            price: 3200,
            brand: "JURA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 16 рецептов, керамические жернова, 2.4л, серебристый."
        },
        {
            id: 15057,
            name: "Кофемашина JURA ENA 8 (EA) Black",
            price: 2400,
            brand: "JURA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Компактная, 12 рецептов, керамические жернова, 1.1л, дисплей."
        },
        {
            id: 15058,
            name: "Кофемашина JURA D4 (EA) Piano Black",
            price: 1900,
            brand: "JURA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 рецептов, керамические жернова, 1.9л."
        },
        {
            id: 15059,
            name: "Кофемашина JURA WE8 (EA) Black",
            price: 3400,
            brand: "JURA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Для 2 чашек, 18 рецептов, керамические жернова, 2.4л, дисплей."
        },
        {
            id: 15060,
            name: "Кофемашина JURA GIGA 10 (EA) Silver",
            price: 6500,
            brand: "JURA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Профессиональная, 32 рецепта, 2 кофемолки, 5л, сенсорный экран."
        },

        // SIEMENS (10 моделей)
        {
            id: 15061,
            name: "Кофемашина Siemens EQ.6 plus s100 TE651209RW",
            price: 2200,
            brand: "SIEMENS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 15 рецептов, керамические жернова, молочная система, 2.3л."
        },
        {
            id: 15062,
            name: "Кофемашина Siemens EQ.3 s300 TK14001",
            price: 1300,
            brand: "SIEMENS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 рецептов, керамические жернова, 1.7л, капучинатор."
        },
        {
            id: 15063,
            name: "Кофемашина Siemens EQ.9 plus s700 TI9559X1RW",
            price: 3800,
            brand: "SIEMENS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Премиум, 26 рецептов, керамические жернова, 2.4л, сенсорный экран, Wi-Fi."
        },
        {
            id: 15064,
            name: "Кофемашина Siemens EQ.6 plus s500 TE657509RW",
            price: 2600,
            brand: "SIEMENS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 18 рецептов, керамические жернова, молочная система, 2.3л."
        },
        {
            id: 15065,
            name: "Кофемашина Siemens EQ.5 s400 TE515509RW",
            price: 1800,
            brand: "SIEMENS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2.2л, дисплей."
        },
        {
            id: 15066,
            name: "Кофемашина Siemens EQ.3 s200 TK14201",
            price: 1400,
            brand: "SIEMENS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 рецептов, керамические жернова, 1.7л."
        },
        {
            id: 15067,
            name: "Кофемашина Siemens EQ.6 plus s300 TE651201RW",
            price: 2100,
            brand: "SIEMENS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 12 рецептов, керамические жернова, 2.3л."
        },
        {
            id: 15068,
            name: "Кофемашина Siemens EQ.9 plus s800 TI9618X9RW",
            price: 4200,
            brand: "SIEMENS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Премиум, 28 рецептов, керамические жернова, 2.5л, сенсорный экран."
        },
        {
            id: 15069,
            name: "Кофемашина Siemens EQ.5 s200 TE503509RW",
            price: 1600,
            brand: "SIEMENS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 рецептов, керамические жернова, 2.2л."
        },
        {
            id: 15070,
            name: "Кофемашина Siemens EQ.6 plus s100 TE651509RW",
            price: 2000,
            brand: "SIEMENS",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2.3л, дисплей."
        },

        // Kitfort (10 моделей)
        {
            id: 15071,
            name: "Кофемашина Kitfort KT-737",
            price: 450,
            brand: "Kitfort",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар давления, 1.3л, металлический корпус, паровой капучинатор."
        },
        {
            id: 15072,
            name: "Кофемашина Kitfort KT-730",
            price: 380,
            brand: "Kitfort",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.2л, компактная, стальной термоблок."
        },
        {
            id: 15073,
            name: "Кофемашина Kitfort KT-739",
            price: 520,
            brand: "Kitfort",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.5л, манометр, подогрев чашек, профессиональный капучинатор."
        },
        {
            id: 15074,
            name: "Кофемашина Kitfort KT-745",
            price: 600,
            brand: "Kitfort",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.6л, PID контроль, дисплей, предварительное смачивание."
        },
        {
            id: 15075,
            name: "Кофемашина Kitfort KT-732",
            price: 420,
            brand: "Kitfort",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.2л, быстрый нагрев, капучинатор, черный."
        },
        {
            id: 15076,
            name: "Кофемашина Kitfort KT-738",
            price: 480,
            brand: "Kitfort",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.4л, металлический корпус, подогрев чашек."
        },
        {
            id: 15077,
            name: "Кофемашина Kitfort KT-749",
            price: 650,
            brand: "Kitfort",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID, дисплей, профессиональный капучинатор."
        },
        {
            id: 15078,
            name: "Кофемашина Kitfort KT-733",
            price: 400,
            brand: "Kitfort",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.2л, компактная, быстрый нагрев."
        },
        {
            id: 15079,
            name: "Кофемашина Kitfort KT-742",
            price: 550,
            brand: "Kitfort",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.5л, манометр, подогрев чашек, серебристый."
        },
        {
            id: 15080,
            name: "Кофемашина Kitfort KT-750",
            price: 700,
            brand: "Kitfort",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID, сенсорный экран, профессиональная."
        },

        // RED Solution (10 моделей)
        {
            id: 15081,
            name: "Кофемашина RED Solution RCM-1501",
            price: 550,
            brand: "RED Solution",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.3л, металлический корпус, паровой капучинатор."
        },
        {
            id: 15082,
            name: "Кофемашина RED Solution RCM-1502",
            price: 600,
            brand: "RED Solution",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.5л, манометр, подогрев чашек, дисплей."
        },
        {
            id: 15083,
            name: "Кофемашина RED Solution RCM-1503",
            price: 480,
            brand: "RED Solution",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.2л, компактная, быстрый нагрев."
        },
        {
            id: 15084,
            name: "Кофемашина RED Solution RCM-1504",
            price: 650,
            brand: "RED Solution",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.6л, PID контроль, дисплей, подогрев чашек."
        },
        {
            id: 15085,
            name: "Кофемашина RED Solution RCM-1505",
            price: 700,
            brand: "RED Solution",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID, манометр, профессиональный капучинатор."
        },
        {
            id: 15086,
            name: "Кофемашина RED Solution RCM-1506",
            price: 520,
            brand: "RED Solution",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.3л, металлический корпус, быстрый нагрев."
        },
        {
            id: 15087,
            name: "Кофемашина RED Solution RCM-1507",
            price: 580,
            brand: "RED Solution",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.5л, манометр, дисплей, серебристый."
        },
        {
            id: 15088,
            name: "Кофемашина RED Solution RCM-1508",
            price: 630,
            brand: "RED Solution",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.6л, PID, подогрев чашек, капучинатор."
        },
        {
            id: 15089,
            name: "Кофемашина RED Solution RCM-1509",
            price: 680,
            brand: "RED Solution",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID, сенсорный экран, профессиональная."
        },
        {
            id: 15090,
            name: "Кофемашина RED Solution RCM-1510",
            price: 720,
            brand: "RED Solution",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.9л, PID, дисплей, подогрев чашек, профессиональная."
        },

        // SAECO (10 моделей)
        {
            id: 15091,
            name: "Кофемашина SAECO PicoBaristo SM5573/10",
            price: 2400,
            brand: "SAECO",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 12 рецептов, керамические жернова, молочная система, 2.2л."
        },
        {
            id: 15092,
            name: "Кофемашина SAECO Xelsis SM7684/00",
            price: 3800,
            brand: "SAECO",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Премиум, 22 рецепта, керамические жернова, сенсорный экран, Wi-Fi."
        },
        {
            id: 15093,
            name: "Кофемашина SAECO GranAroma SM6580/10",
            price: 2800,
            brand: "SAECO",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 16 рецептов, керамические жернова, 2.2л, цветной дисплей."
        },
        {
            id: 15094,
            name: "Кофемашина SAECO Lirika Plus SM3085/10",
            price: 1600,
            brand: "SAECO",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 рецептов, керамические жернова, 1.8л."
        },
        {
            id: 15095,
            name: "Кофемашина SAECO Aulika EVO Top HSC",
            price: 4200,
            brand: "SAECO",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Профессиональная, 18 рецептов, для офиса, 5л, 2 кофемолки."
        },
        {
            id: 15096,
            name: "Кофемашина SAECO PicoBaristo SM5473/10",
            price: 2200,
            brand: "SAECO",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2.2л."
        },
        {
            id: 15097,
            name: "Кофемашина SAECO Xelsis SM7685/00",
            price: 3900,
            brand: "SAECO",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Премиум, 24 рецепта, керамические жернова, сенсорный экран."
        },
        {
            id: 15098,
            name: "Кофемашина SAECO GranAroma SM6585/10",
            price: 2900,
            brand: "SAECO",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 18 рецептов, керамические жернова, 2.2л."
        },
        {
            id: 15099,
            name: "Кофемашина SAECO Lirika SM3082/10",
            price: 1500,
            brand: "SAECO",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 рецептов, керамические жернова, 1.8л."
        },
        {
            id: 15100,
            name: "Кофемашина SAECO Aulika EVO",
            price: 4000,
            brand: "SAECO",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Профессиональная, 16 рецептов, для офиса, 4.5л."
        },

        // Bosch (10 моделей)
        {
            id: 15101,
            name: "Кофемашина Bosch VeroCafe 300 TIS30321RW",
            price: 1200,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 4 рецепта, керамические жернова, 1.7л, капучинатор."
        },
        {
            id: 15102,
            name: "Кофемашина Bosch VeroCafe 800 TIS80559RW",
            price: 2100,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 12 рецептов, керамические жернова, 2.3л, молочная система."
        },
        {
            id: 15103,
            name: "Кофемашина Bosch VeroCafe 600 TIS60751RW",
            price: 1700,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 рецептов, керамические жернова, 2.2л, дисплей."
        },
        {
            id: 15104,
            name: "Кофемашина Bosch VeroAroma 300 TIS30121RW",
            price: 1000,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 3 рецепта, керамические жернова, 1.7л."
        },
        {
            id: 15105,
            name: "Кофемашина Bosch VeroCafe 700 TIS70351RW",
            price: 1900,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2.3л, дисплей."
        },
        {
            id: 15106,
            name: "Кофемашина Bosch VeroCafe 500 TIS50559RW",
            price: 1500,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 рецептов, керамические жернова, 2.2л."
        },
        {
            id: 15107,
            name: "Кофемашина Bosch VeroCafe 800 TIS80159RW",
            price: 2200,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 14 рецептов, керамические жернова, 2.3л, сенсорный экран."
        },
        {
            id: 15108,
            name: "Кофемашина Bosch VeroAroma 200 TIS20121RW",
            price: 900,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 3 рецепта, керамические жернова, 1.5л."
        },
        {
            id: 15109,
            name: "Кофемашина Bosch VeroCafe 600 TIS60159RW",
            price: 1600,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 рецептов, керамические жернова, 2.2л."
        },
        {
            id: 15110,
            name: "Кофемашина Bosch VeroCafe 700 TIS70159RW",
            price: 1800,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 рецептов, керамические жернова, 2.3л."
        },

        // GRUNDIG (10 моделей)
        {
            id: 15111,
            name: "Кофемашина Grundig VSS 4010",
            price: 850,
            brand: "GRUNDIG",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.5л, металлический корпус, паровой капучинатор."
        },
        {
            id: 15112,
            name: "Кофемашина Grundig VSS 4020",
            price: 950,
            brand: "GRUNDIG",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.6л, манометр, подогрев чашек, дисплей."
        },
        {
            id: 15113,
            name: "Кофемашина Grundig VSS 4030",
            price: 1050,
            brand: "GRUNDIG",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 рецептов, керамические жернова, 2л, капучинатор."
        },
        {
            id: 15114,
            name: "Кофемашина Grundig VSS 6010",
            price: 1400,
            brand: "GRUNDIG",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 рецептов, керамические жернова, 2.2л, дисплей."
        },
        {
            id: 15115,
            name: "Кофемашина Grundig VSS 6020",
            price: 1550,
            brand: "GRUNDIG",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2.3л, молочная система."
        },
        {
            id: 15116,
            name: "Кофемашина Grundig VSS 4015",
            price: 900,
            brand: "GRUNDIG",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.5л, металлический корпус, дисплей."
        },
        {
            id: 15117,
            name: "Кофемашина Grundig VSS 4025",
            price: 1000,
            brand: "GRUNDIG",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.6л, PID контроль, подогрев чашек."
        },
        {
            id: 15118,
            name: "Кофемашина Grundig VSS 6030",
            price: 1700,
            brand: "GRUNDIG",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 12 рецептов, керамические жернова, 2.3л, цветной дисплей."
        },
        {
            id: 15119,
            name: "Кофемашина Grundig VSS 6040",
            price: 1850,
            brand: "GRUNDIG",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 14 рецептов, керамические жернова, 2.4л, молочная система."
        },
        {
            id: 15120,
            name: "Кофемашина Grundig VSS 6050",
            price: 2000,
            brand: "GRUNDIG",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 16 рецептов, керамические жернова, 2.5л, сенсорный экран."
        },

        // Итальянские (10 моделей)
        {
            id: 15121,
            name: "Кофемашина DeLonghi La Specialista Arte EC9155.MB",
            price: 1700,
            brand: "Итальянские",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская, рожковая, встроенная кофемолка, система темперовки, паровой бойлер."
        },
        {
            id: 15122,
            name: "Кофемашина Saeco Aulika IPS",
            price: 3800,
            brand: "Итальянские",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская профессиональная, для офиса, 2 кофемолки, 5л, сенсорный экран."
        },
        {
            id: 15123,
            name: "Кофемашина Gaggia Classic Pro",
            price: 1300,
            brand: "Итальянские",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская рожковая, профессиональный помп, коммерческий паровой рычаг."
        },
        {
            id: 15124,
            name: "Кофемашина La Pavoni Europiccola",
            price: 1900,
            brand: "Итальянские",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская ручная, рычажная, латунный бойлер, винтажный дизайн, ручная работа."
        },
        {
            id: 15125,
            name: "Кофемашина DeLonghi Dedica EC 685.M",
            price: 750,
            brand: "Итальянские",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская рожковая, компактная, 15 бар, металлический корпус."
        },
        {
            id: 15126,
            name: "Кофемашина Gaggia Magenta Prestige",
            price: 1600,
            brand: "Итальянские",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 12 рецептов, керамические жернова, Optiaroma."
        },
        {
            id: 15127,
            name: "Кофемашина La Cimbali M21 Casa",
            price: 2400,
            brand: "Итальянские",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская рожковая, E61 группа, теплообменник, профессиональная для дома."
        },
        {
            id: 15128,
            name: "Кофемашина DeLonghi Magnifica S ECAM 22.110.SB",
            price: 1350,
            brand: "Итальянские",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 13 степеней помола, капучинатор, 1.8л."
        },
        {
            id: 15129,
            name: "Кофемашиna Saeco PicoBaristo SM5473/10",
            price: 2200,
            brand: "Итальянские",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 10 рецептов, керамические жернова."
        },
        {
            id: 15130,
            name: "Кофемашина Gaggia Brera",
            price: 1200,
            brand: "Итальянские",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 5 рецептов, керамические жернова, компактная."
        },

        // KAFFIT COM (10 моделей)
        {
            id: 15131,
            name: "Кофемашина KAFFIT COM 5000",
            price: 900,
            brand: "KAFFIT COM",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.5л, металлический корпус, капучинатор, подогрев чашек."
        },
        {
            id: 15132,
            name: "Кофемашина KAFFIT COM 5100",
            price: 1050,
            brand: "KAFFIT COM",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.6л, манометр, PID контроль, дисплей."
        },
        {
            id: 15133,
            name: "Кофемашина KAFFIT COM 5200",
            price: 1150,
            brand: "KAFFIT COM",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID, профессиональный капучинатор, подогрев чашек."
        },
        {
            id: 15134,
            name: "Кофемашина KAFFIT COM 5300",
            price: 1250,
            brand: "KAFFIT COM",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 5 рецептов, керамические жернова, 2л, дисплей."
        },
        {
            id: 15135,
            name: "Кофемашина KAFFIT COM 5400",
            price: 1450,
            brand: "KAFFIT COM",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 7 рецептов, керамические жернова, 2.2л, молочная система."
        },
        {
            id: 15136,
            name: "Кофемашина KAFFIT COM 5500",
            price: 1350,
            brand: "KAFFIT COM",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID, сенсорный экран, профессиональная."
        },
        {
            id: 15137,
            name: "Кофемашина KAFFIT COM 5600",
            price: 1550,
            brand: "KAFFIT COM",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 рецептов, керамические жернова, 2.3л, цветной дисплей."
        },
        {
            id: 15138,
            name: "Кофемашина KAFFIT COM 5700",
            price: 1650,
            brand: "KAFFIT COM",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2.4л, молочная система."
        },
        {
            id: 15139,
            name: "Кофемашина KAFFIT COM 5800",
            price: 1750,
            brand: "KAFFIT COM",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 12 рецептов, керамические жернова, 2.5л, сенсорный экран."
        },
        {
            id: 15140,
            name: "Кофемашина KAFFIT COM 5900",
            price: 1850,
            brand: "KAFFIT COM",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 14 рецептов, керамические жернова, 2.6л, Wi-Fi."
        },

        // Встраиваемые (10 моделей)
        {
            id: 15141,
            name: "Встраиваемая кофемашина Siemens CI36FP01",
            price: 2900,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Встраиваемая, автоматическая, 10 рецептов, керамические жернова, 2.3л."
        },
        {
            id: 15142,
            name: "Встраиваемая кофемашина Bosch CTL636ES1",
            price: 3200,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Встраиваемая, автоматическая, 12 рецептов, керамические жернова, 2.4л, Wi-Fi."
        },
        {
            id: 15143,
            name: "Встраиваемая кофемашина Gaggenau CM 450",
            price: 5500,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Премиум встраиваемая, 16 рецептов, керамические жернова, 2.5л, сенсорный экран."
        },
        {
            id: 15144,
            name: "Встраиваемая кофемашина Neff C731G2N0",
            price: 2800,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Встраиваемая, автоматическая, 8 рецептов, керамические жернова, 2.2л."
        },
        {
            id: 15145,
            name: "Встраиваемая кофемашина AEG CE3000-M",
            price: 2400,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Встраиваемая, автоматическая, 6 рецептов, керамические жернова, 2л."
        },
        {
            id: 15146,
            name: "Встраиваемая кофемашина Siemens CI36FP02",
            price: 3000,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Встраиваемая, 12 рецептов, керамические жернова, 2.3л, дисплей."
        },
        {
            id: 15147,
            name: "Встраиваемая кофемашина Bosch CTL736ES1",
            price: 3400,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Встраиваемая, 14 рецептов, керамические жернова, 2.4л, сенсорный экран."
        },
        {
            id: 15148,
            name: "Встраиваемая кофемашина Gaggenau CM 451",
            price: 5800,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Премиум, 18 рецептов, керамические жернова, 2.6л, сенсорный экран."
        },
        {
            id: 15149,
            name: "Встраиваемая кофемашина Neff C771G2N0",
            price: 2900,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Встраиваемая, 10 рецептов, керамические жернова, 2.2л, дисплей."
        },
        {
            id: 15150,
            name: "Встраиваемая кофемашина AEG CE4000-M",
            price: 2600,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Встраиваемая, 8 рецептов, керамические жернова, 2.2л."
        },

        // Maunfeld (10 моделей)
        {
            id: 15151,
            name: "Кофемашина Maunfeld MC-201",
            price: 550,
            brand: "Maunfeld",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.3л, металлический корпус, паровой капучинатор."
        },
        {
            id: 15152,
            name: "Кофемашина Maunfeld MC-202",
            price: 620,
            brand: "Maunfeld",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.5л, манометр, подогрев чашек, дисплей."
        },
        {
            id: 15153,
            name: "Кофемашина Maunfeld MC-203",
            price: 700,
            brand: "Maunfeld",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.6л, PID контроль, дисплей, капучинатор."
        },
        {
            id: 15154,
            name: "Кофемашина Maunfeld MC-204",
            price: 780,
            brand: "Maunfeld",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID, профессиональный капучинатор, подогрев чашек."
        },
        {
            id: 15155,
            name: "Кофемашина Maunfeld MC-205",
            price: 850,
            brand: "Maunfeld",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 4 рецепта, керамические жернова, 2л, дисплей."
        },
        {
            id: 15156,
            name: "Кофемашина Maunfeld MC-206",
            price: 950,
            brand: "Maunfeld",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 5 рецептов, керамические жернова, 2.2л, молочная система."
        },
        {
            id: 15157,
            name: "Кофемашина Maunfeld MC-207",
            price: 1050,
            brand: "Maunfeld",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 рецептов, керамические жернова, 2.3л, цветной дисплей."
        },
        {
            id: 15158,
            name: "Кофемашина Maunfeld MC-208",
            price: 1150,
            brand: "Maunfeld",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 7 рецептов, керамические жернова, 2.4л, молочная система."
        },
        {
            id: 15159,
            name: "Кофемашина Maunfeld MC-209",
            price: 1250,
            brand: "Maunfeld",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 рецептов, керамические жернова, 2.5л, сенсорный экран."
        },
        {
            id: 15160,
            name: "Кофемашина Maunfeld MC-210",
            price: 1350,
            brand: "Maunfeld",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2.6л, Wi-Fi."
        },

        // РЕДМОНД (10 моделей)
        {
            id: 15161,
            name: "Кофемашина РЕДМОНД RCM-1502",
            price: 650,
            brand: "РЕДМОНД",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.5л, металлический корпус, паровой капучинатор."
        },
        {
            id: 15162,
            name: "Кофемашина РЕДМОНД RCM-1503",
            price: 720,
            brand: "РЕДМОНД",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.6л, манометр, подогрев чашек, дисплей."
        },
        {
            id: 15163,
            name: "Кофемашина РЕДМОНД RCM-1504",
            price: 800,
            brand: "РЕДМОНД",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID контроль, дисплей, капучинатор."
        },
        {
            id: 15164,
            name: "Кофемашина РЕДМОНД RCM-1505",
            price: 880,
            brand: "РЕДМОНД",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.9л, PID, профессиональный капучинатор, подогрев чашек."
        },
        {
            id: 15165,
            name: "Кофемашина РЕДМОНД RCM-1506",
            price: 950,
            brand: "РЕДМОНД",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 4 рецепта, керамические жернова, 2л, дисплей."
        },
        {
            id: 15166,
            name: "Кофемашина РЕДМОНД RCM-1507",
            price: 1050,
            brand: "РЕДМОНД",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 5 рецептов, керамические жернова, 2.2л, молочная система."
        },
        {
            id: 15167,
            name: "Кофемашина РЕДМОНД RCM-1508",
            price: 1150,
            brand: "РЕДМОНД",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 рецептов, керамические жернова, 2.3л, цветной дисплей."
        },
        {
            id: 15168,
            name: "Кофемашина РЕДМОНД RCM-1509",
            price: 1250,
            brand: "РЕДМОНД",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 7 рецептов, керамические жернова, 2.4л, молочная система."
        },
        {
            id: 15169,
            name: "Кофемашина РЕДМОНД RCM-1510",
            price: 1350,
            brand: "РЕДМОНД",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 рецептов, керамические жернова, 2.5л, сенсорный экран."
        },
        {
            id: 15170,
            name: "Кофемашина РЕДМОНД RCM-1511",
            price: 1450,
            brand: "РЕДМОНД",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2.6л, Wi-Fi."
        },

        // DeLonghi Rivelia (10 моделей)
        {
            id: 15171,
            name: "Кофемашина DeLonghi Rivelia ECAM 550.55.SB",
            price: 2100,
            brand: "DeLonghi Rivelia",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 12 рецептов, система Bean Switch, 2.2л, сенсорный экран."
        },
        {
            id: 15172,
            name: "Кофемашина DeLonghi Rivelia ECAM 550.75.W",
            price: 2300,
            brand: "DeLonghi Rivelia",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 14 рецептов, Bean Switch, 2.3л, цветной дисплей, Wi-Fi."
        },
        {
            id: 15173,
            name: "Кофемашина DeLonghi Rivelia ECAM 560.55.SB",
            price: 2400,
            brand: "DeLonghi Rivelia",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 16 рецептов, Bean Switch, 2.4л, сенсорный экран."
        },
        {
            id: 15174,
            name: "Кофемашина DeLonghi Rivelia ECAM 560.75.W",
            price: 2500,
            brand: "DeLonghi Rivelia",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 18 рецептов, Bean Switch, 2.5л, Wi-Fi, приложение."
        },
        {
            id: 15175,
            name: "Кофемашина DeLonghi Rivelia ECAM 570.55.SB",
            price: 2600,
            brand: "DeLonghi Rivelia",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 20 рецептов, Bean Switch, 2.6л, сенсорный экран."
        },
        {
            id: 15176,
            name: "Кофемашина DeLonghi Rivelia ECAM 570.75.W",
            price: 2700,
            brand: "DeLonghi Rivelia",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 22 рецепта, Bean Switch, 2.7л, Wi-Fi."
        },
        {
            id: 15177,
            name: "Кофемашина DeLonghi Rivelia ECAM 580.55.SB",
            price: 2800,
            brand: "DeLonghi Rivelia",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 24 рецепта, Bean Switch, 2.8л, сенсорный экран."
        },
        {
            id: 15178,
            name: "Кофемашина DeLonghi Rivelia ECAM 580.75.W",
            price: 2900,
            brand: "DeLonghi Rivelia",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 26 рецептов, Bean Switch, 2.9л, Wi-Fi."
        },
        {
            id: 15179,
            name: "Кофемашина DeLonghi Rivelia ECAM 590.55.SB",
            price: 3000,
            brand: "DeLonghi Rivelia",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 28 рецептов, Bean Switch, 3л, сенсорный экран."
        },
        {
            id: 15180,
            name: "Кофемашина DeLonghi Rivelia ECAM 590.75.W",
            price: 3100,
            brand: "DeLonghi Rivelia",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 30 рецептов, Bean Switch, 3.1л, Wi-Fi, премиум."
        },

        // GAGGIA (10 моделей)
        {
            id: 15181,
            name: "Кофемашина GAGGIA Classic Pro",
            price: 1300,
            brand: "GAGGIA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская рожковая, профессиональный помп, коммерческий паровой рычаг."
        },
        {
            id: 15182,
            name: "Кофемашина GAGGIA Magenta Prestige",
            price: 1600,
            brand: "GAGGIA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 12 рецептов, керамические жернова, Optiaroma."
        },
        {
            id: 15183,
            name: "Кофемашина GAGGIA Brera",
            price: 1200,
            brand: "GAGGIA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 5 рецептов, керамические жернова, компактная."
        },
        {
            id: 15184,
            name: "Кофемашина GAGGIA Naviglio",
            price: 1400,
            brand: "GAGGIA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 7 рецептов, керамические жернова, 2.2л."
        },
        {
            id: 15185,
            name: "Кофемашина GAGGIA Cadorna Prestige",
            price: 1800,
            brand: "GAGGIA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 14 рецептов, керамические жернова, 2.4л."
        },
        {
            id: 15186,
            name: "Кофемашина GAGGIA Velasca Prestige",
            price: 1700,
            brand: "GAGGIA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 10 рецептов, керамические жернова, 2.3л."
        },
        {
            id: 15187,
            name: "Кофемашина GAGGIA Anima Prestige",
            price: 1500,
            brand: "GAGGIA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 8 рецептов, керамические жернова, 2.2л."
        },
        {
            id: 15188,
            name: "Кофемашина GAGGIA Baby Class",
            price: 900,
            brand: "GAGGIA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская рожковая, компактная, 15 бар, паровой капучинатор."
        },
        {
            id: 15189,
            name: "Кофемашина GAGGIA Titanium",
            price: 2200,
            brand: "GAGGIA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 16 рецептов, керамические жернова, 2.5л."
        },
        {
            id: 15190,
            name: "Кофемашина GAGGIA Accademia",
            price: 2500,
            brand: "GAGGIA",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Итальянская автоматическая, 18 рецептов, керамические жернова, 2.6л, сенсорный экран."
        },

        // WEISSGAUFF (10 моделей)
        {
            id: 15191,
            name: "Кофемашина WEISSGAUFF CM-550",
            price: 850,
            brand: "WEISSGAUFF",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.5л, металлический корпус, паровой капучинатор."
        },
        {
            id: 15192,
            name: "Кофемашина WEISSGAUFF CM-560",
            price: 950,
            brand: "WEISSGAUFF",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.6л, манометр, подогрев чашек, дисплей."
        },
        {
            id: 15193,
            name: "Кофемашина WEISSGAUFF CM-570",
            price: 1050,
            brand: "WEISSGAUFF",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.8л, PID контроль, дисплей, капучинатор."
        },
        {
            id: 15194,
            name: "Кофемашина WEISSGAUFF CM-580",
            price: 1150,
            brand: "WEISSGAUFF",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Рожковая, 20 бар, 1.9л, PID, профессиональный капучинатор, подогрев чашек."
        },
        {
            id: 15195,
            name: "Кофемашина WEISSGAUFF CM-590",
            price: 1250,
            brand: "WEISSGAUFF",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 4 рецепта, керамические жернова, 2л, дисплей."
        },
        {
            id: 15196,
            name: "Кофемашина WEISSGAUFF CM-600",
            price: 1350,
            brand: "WEISSGAUFF",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 5 рецептов, керамические жернова, 2.2л, молочная система."
        },
        {
            id: 15197,
            name: "Кофемашина WEISSGAUFF CM-610",
            price: 1450,
            brand: "WEISSGAUFF",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 6 рецептов, керамические жернова, 2.3л, цветной дисплей."
        },
        {
            id: 15198,
            name: "Кофемашина WEISSGAUFF CM-620",
            price: 1550,
            brand: "WEISSGAUFF",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 7 рецептов, керамические жернова, 2.4л, молочная система."
        },
        {
            id: 15199,
            name: "Кофемашина WEISSGAUFF CM-630",
            price: 1650,
            brand: "WEISSGAUFF",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 8 рецептов, керамические жернова, 2.5л, сенсорный экран."
        },
        {
            id: 15200,
            name: "Кофемашина WEISSGAUFF CM-640",
            price: 1750,
            brand: "WEISSGAUFF",
            image: "https://images.unsplash.com/photo-1517080315886-2246fa48227b?w=500",
            desc: "Автоматическая, 10 рецептов, керамические жернова, 2.6л, Wi-Fi."
        }
    ],

    washers: [
        // LG (10 моделей)
        {
            id: 10001,
            name: "Стиральная машина LG F2J3HS0W",
            price: 1300,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, пар Steam, инверторный мотор Direct Drive, узкая, 1200 об/мин."
        },
        {
            id: 10002,
            name: "Стиральная машина LG F2V5HS0W",
            price: 1450,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор Direct Drive, 6 Motion, технология Steam, 1200 об/мин."
        },
        {
            id: 10003,
            name: "Стиральная машина LG FH0B8ND1",
            price: 1600,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8.5 кг, инверторный мотор Direct Drive, AI DD, 1400 об/мин, интеллектуальная диагностика."
        },
        {
            id: 10004,
            name: "Стиральная машина LG FH4G1JCH6N",
            price: 1750,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор Direct Drive, технология TurboWash, 1400 об/мин."
        },
        {
            id: 10005,
            name: "Стиральная машина LG F2J6HS0W",
            price: 1350,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, инверторный мотор, 6 Motion, 1200 об/мин, защита от протечек."
        },
        {
            id: 10006,
            name: "Стиральная машина LG FH2G1JDG0N",
            price: 1850,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, AI DD, TurboWash 360, 1400 об/мин, паровая обработка."
        },
        {
            id: 10007,
            name: "Стиральная машина LG F4R9JYP2W",
            price: 2200,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, инверторный мотор, AI DD, TurboWash 2.0, 1600 об/мин."
        },
        {
            id: 10008,
            name: "Стиральная машина LG F2M5HS6W",
            price: 1500,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 6 Motion, 1200 об/мин, стирка паром."
        },
        {
            id: 10009,
            name: "Стиральная машина LG FH4G1JCH4N",
            price: 1650,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8.5 кг, инверторный мотор, AI DD, TurboWash, 1400 об/мин."
        },
        {
            id: 10010,
            name: "Стиральная машина LG F2V9GW9P",
            price: 1950,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор, AI DD, TurboWash 2.0, 1400 об/мин, Steam+."
        },

        // Недорогие (10 моделей)
        {
            id: 10011,
            name: "Стиральная машина Beko WRS 55P1 B",
            price: 750,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, узкая, 1000 об/мин, 15 программ, класс A++."
        },
        {
            id: 10012,
            name: "Стиральная машина Indesit IWUB 4085",
            price: 700,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 4 кг, узкая, 800 об/мин, 15 программ, защита от протечек."
        },
        {
            id: 10013,
            name: "Стиральная машина Candy CS4 1051DB1/2",
            price: 800,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 16 программ, инверторный мотор."
        },
        {
            id: 10014,
            name: "Стиральная машина Atlant 50У107",
            price: 650,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 18 программ, надежная и простая."
        },
        {
            id: 10015,
            name: "Стиральная машина Weissgauff WMD 414 D",
            price: 850,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 4 кг, 1400 об/мин, инверторный мотор, 15 программ."
        },
        {
            id: 10016,
            name: "Стиральная машина Haier HW60-BP10929B",
            price: 900,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1000 об/мин, инверторный мотор, 15 программ, пар."
        },
        {
            id: 10017,
            name: "Стиральная машина Midea MWM 601",
            price: 600,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1000 об/мин, 10 программ, механическое управление."
        },
        {
            id: 10018,
            name: "Стиральная машина Bosch WLR 205 M",
            price: 950,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 10 программ, защита от протечек."
        },
        {
            id: 10019,
            name: "Стиральная машина Gorenje W 65Z03/S",
            price: 850,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 18 программ, класс A++."
        },
        {
            id: 10020,
            name: "Стиральная машина Vestel WMA 614 L",
            price: 550,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1400 об/мин, 10 программ, доступная цена."
        },

        // HAIER (10 моделей)
        {
            id: 10021,
            name: "Стиральная машина Haier HW80-BP14929",
            price: 1400,
            brand: "HAIER",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1400 об/мин, барабан Pillow, программа освежения паром."
        },
        {
            id: 10022,
            name: "Стиральная машина Haier HW70-BP12929",
            price: 1300,
            brand: "HAIER",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, инверторный мотор, 1200 об/мин, 15 программ, стирка паром."
        },
        {
            id: 10023,
            name: "Стиральная машина Haier HW90-B14929",
            price: 1600,
            brand: "HAIER",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор, 1400 об/мин, технология ABT, 16 программ."
        },
        {
            id: 10024,
            name: "Стиральная машина Haier HW100-B14939",
            price: 1750,
            brand: "HAIER",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, инверторный мотор, 1400 об/мин, паровая обработка, интеллектуальное управление."
        },
        {
            id: 10025,
            name: "Стиральная машина Haier HW60-BP10929B",
            price: 950,
            brand: "HAIER",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, инверторный мотор, 1000 об/мин, 15 программ, узкая."
        },
        {
            id: 10026,
            name: "Стиральная машина Haier HW80-B14959",
            price: 1550,
            brand: "HAIER",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1400 об/мин, программа быстрой стирки 15 мин."
        },
        {
            id: 10027,
            name: "Стиральная машина Haier HW70-12829",
            price: 1150,
            brand: "HAIER",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, 16 программ, защита от протечек."
        },
        {
            id: 10028,
            name: "Стиральная машина Haier HW90-B14959",
            price: 1700,
            brand: "HAIER",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор, 1400 об/мин, технология I-TIME, 16 программ."
        },
        {
            id: 10029,
            name: "Стиральная машина Haier HW80-B14939",
            price: 1500,
            brand: "HAIER",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1400 об/мин, барабан Pillow, пар."
        },
        {
            id: 10030,
            name: "Стиральная машина Haier HW100-B14959",
            price: 1850,
            brand: "HAIER",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, инверторный мотор, 1400 об/мин, AI интеллект, 16 программ."
        },

        // ATLANT (10 моделей)
        {
            id: 10031,
            name: "Стиральная машина Атлант 60У1210",
            price: 750,
            brand: "ATLANT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1000 об/мин, 18 программ, электронное управление, надежность."
        },
        {
            id: 10032,
            name: "Стиральная машина Атлант 70У1210",
            price: 850,
            brand: "ATLANT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1000 об/мин, 18 программ, электронное управление, класс A++."
        },
        {
            id: 10033,
            name: "Стиральная машина Атлант 50У107",
            price: 650,
            brand: "ATLANT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 18 программ, механическое управление, надежная."
        },
        {
            id: 10034,
            name: "Стиральная машина Атлант 60У1218",
            price: 800,
            brand: "ATLANT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1000 об/мин, 22 программы, электронное управление, защита от протечек."
        },
        {
            id: 10035,
            name: "Стиральная машина Атлант 70У1218",
            price: 900,
            brand: "ATLANT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1000 об/мин, 22 программы, отложенный старт, класс A++."
        },
        {
            id: 10036,
            name: "Стиральная машина Атлант 50У1210",
            price: 700,
            brand: "ATLANT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 16 программ, компактная, надежная."
        },
        {
            id: 10037,
            name: "Стиральная машина Атлант 60У108",
            price: 720,
            brand: "ATLANT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 800 об/мин, 16 программ, механическое управление."
        },
        {
            id: 10038,
            name: "Стиральная машина Атлант 70У108",
            price: 820,
            brand: "ATLANT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 800 об/мин, 16 программ, простота и надежность."
        },
        {
            id: 10039,
            name: "Стиральная машина Атлант 50У1218",
            price: 750,
            brand: "ATLANT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 22 программы, электронное управление."
        },
        {
            id: 10040,
            name: "Стиральная машина Атлант 80У1210",
            price: 950,
            brand: "ATLANT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1000 об/мин, 18 программ, увеличенная загрузка."
        },

        // SAMSUNG (10 моделей)
        {
            id: 10041,
            name: "Стиральная машина Samsung WW90T754ABH",
            price: 2100,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор, 1400 об/мин, AI Control, AddWash, технология EcoBubble."
        },
        {
            id: 10042,
            name: "Стиральная машина Samsung WW80T554AAW",
            price: 1700,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1400 об/мин, EcoBubble, Digital Inverter."
        },
        {
            id: 10043,
            name: "Стиральная машина Samsung WW70T4040CE",
            price: 1300,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, EcoBubble, защита от протечек, 12 программ."
        },
        {
            id: 10044,
            name: "Стиральная машина Samsung WW95T754ABH",
            price: 2300,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9.5 кг, инверторный мотор, 1400 об/мин, AI Control, AddWash, EcoBubble+."
        },
        {
            id: 10045,
            name: "Стиральная машина Samsung WW80T534AAW",
            price: 1550,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1200 об/мин, EcoBubble, гигиена паром."
        },
        {
            id: 10046,
            name: "Стиральная машина Samsung WW60T4040CE",
            price: 1150,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1200 об/мин, EcoBubble, 12 программ, узкая."
        },
        {
            id: 10047,
            name: "Стиральная машина Samsung WW10T754ABH",
            price: 2500,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, инверторный мотор, 1400 об/мин, AI Control, AddWash, EcoBubble+."
        },
        {
            id: 10048,
            name: "Стиральная машина Samsung WW90T554AAW",
            price: 1900,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор, 1400 об/мин, EcoBubble, 14 программ."
        },
        {
            id: 10049,
            name: "Стиральная машина Samsung WW70T554AAW",
            price: 1500,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, инверторный мотор, 1400 об/мин, EcoBubble, интеллектуальное управление."
        },
        {
            id: 10050,
            name: "Стиральная машина Samsung WW80T4040CE",
            price: 1400,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, EcoBubble, 12 программ, отсрочка старта."
        },

        // С сушкой (10 моделей)
        {
            id: 10051,
            name: "Стиральная машина с сушкой LG F4R9JYP2W",
            price: 2800,
            brand: "С сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, сушка 6 кг, инверторный мотор, AI DD, 1600 об/мин, TurboWash 2.0."
        },
        {
            id: 10052,
            name: "Стиральная машина с сушкой Samsung WD10T754ABH",
            price: 2900,
            brand: "С сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, сушка 6 кг, AI Control, AddWash, EcoBubble, 1400 об/мин."
        },
        {
            id: 10053,
            name: "Стиральная машина с сушкой Bosch WDU 28590",
            price: 3200,
            brand: "С сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, сушка 5 кг, инверторный мотор, 1400 об/мин, AutoDry."
        },
        {
            id: 10054,
            name: "Стиральная машина с сушкой Haier HW100-B14959S",
            price: 2400,
            brand: "С сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, сушка 6 кг, инверторный мотор, 1400 об/мин, паровая обработка."
        },
        {
            id: 10055,
            name: "Стиральная машина с сушкой LG FH4G1JCH6N",
            price: 2100,
            brand: "С сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, сушка 4 кг, инверторный мотор, 1400 об/мин, TurboWash."
        },
        {
            id: 10056,
            name: "Стиральная машина с сушкой Samsung WD90T754ABH",
            price: 2600,
            brand: "С сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, сушка 5 кг, AI Control, AddWash, EcoBubble, 1400 об/мин."
        },
        {
            id: 10057,
            name: "Стиральная машина с сушкой Siemens WD14U661",
            price: 3100,
            brand: "С сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, сушка 5 кг, инверторный мотор, 1400 об/мин, i-Dos."
        },
        {
            id: 10058,
            name: "Стиральная машина с сушкой Electrolux EW9W161B",
            price: 2700,
            brand: "С сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, сушка 5 кг, инверторный мотор, 1600 об/мин, технология UltraMix."
        },
        {
            id: 10059,
            name: "Стиральная машина с сушкой Midea MWD 801",
            price: 1500,
            brand: "С сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, сушка 4 кг, 1400 об/мин, 15 программ, доступная."
        },
        {
            id: 10060,
            name: "Стиральная машина с сушкой Candy CS4 1082D3",
            price: 1300,
            brand: "С сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, сушка 4 кг, 1000 об/мин, 16 программ, Mix Power System."
        },

        // Bosch (10 моделей)
        {
            id: 10061,
            name: "Стиральная машина Bosch WLR 245 M",
            price: 1600,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, инверторный мотор EcoSilence Drive, 15 программ, защита от протечек."
        },
        {
            id: 10062,
            name: "Стиральная машина Bosch WGA 142X0",
            price: 2100,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1400 об/мин, инверторный мотор, SpeedPerfect, ActiveWater."
        },
        {
            id: 10063,
            name: "Стиральная машина Bosch WLR 205 M",
            price: 1400,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1000 об/мин, 10 программ, защита от протечек, надежность."
        },
        {
            id: 10064,
            name: "Стиральная машина Bosch WGA 252X0",
            price: 2300,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1400 об/мин, инверторный мотор, AutoDry, 15 программ."
        },
        {
            id: 10065,
            name: "Стиральная машина Bosch WLR 225 M",
            price: 1750,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, инверторный мотор, SpeedPerfect, 14 программ."
        },
        {
            id: 10066,
            name: "Стиральная машина Bosch WGA 142XV",
            price: 2000,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1400 об/мин, инверторный мотор, VarioPerfect, ActiveWater."
        },
        {
            id: 10067,
            name: "Стиральная машина Bosch WLO 245 M",
            price: 1550,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, 12 программ, защита от протечек, класс A++."
        },
        {
            id: 10068,
            name: "Стиральная машина Bosch WGA 242X0",
            price: 1900,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, инверторный мотор, EcoSilence Drive, 15 программ."
        },
        {
            id: 10069,
            name: "Стиральная машина Bosch WLR 265 M",
            price: 1850,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1400 об/мин, инверторный мотор, SpeedPerfect, 14 программ."
        },
        {
            id: 10070,
            name: "Стиральная машина Bosch WGA 122X0",
            price: 1450,
            brand: "Bosch",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1200 об/мин, инверторный мотор, 12 программ, компактная."
        },

        // BEKO (10 моделей)
        {
            id: 10071,
            name: "Стиральная машина Beko WRS 55P1 B",
            price: 750,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 15 программ, класс A++, надежная."
        },
        {
            id: 10072,
            name: "Стиральная машина Beko WUE 6612 XW",
            price: 850,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1200 об/мин, 15 программ, AquaWave, защита от протечек."
        },
        {
            id: 10073,
            name: "Стиральная машина Beko WUE 7512 XW",
            price: 950,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, 15 программ, AquaWave, Fast+."
        },
        {
            id: 10074,
            name: "Стиральная машина Beko WRS 44P1 B",
            price: 650,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 4 кг, 1000 об/мин, 13 программ, компактная, доступная."
        },
        {
            id: 10075,
            name: "Стиральная машина Beko WUE 8512 XW",
            price: 1050,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, 15 программ, AquaWave, SteamCure."
        },
        {
            id: 10076,
            name: "Стиральная машина Beko WRS 55P2 B",
            price: 800,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 16 программ, защита от протечек."
        },
        {
            id: 10077,
            name: "Стиральная машина Beko WUE 7511 XW",
            price: 900,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, 15 программ, AquaWave, 14 программ."
        },
        {
            id: 10078,
            name: "Стиральная машина Beko WRS 54P1 B",
            price: 720,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 15 программ, класс A++."
        },
        {
            id: 10079,
            name: "Стиральная машина Beko WUE 9512 XW",
            price: 1150,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1200 об/мин, 15 программ, AquaWave, SteamCure."
        },
        {
            id: 10080,
            name: "Стиральная машина Beko WUE 6611 XW",
            price: 820,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1200 об/мин, 15 программ, защита от протечек."
        },

        // С вертикальной загрузкой (10 моделей)
        {
            id: 10081,
            name: "Стиральная машина с вертикальной загрузкой LG T80BMW",
            price: 1400,
            brand: "С вертикальной загрузкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 700 об/мин, 6 Motion, Smart Diagnosis."
        },
        {
            id: 10082,
            name: "Стиральная машина с вертикальной загрузкой Samsung WA80T5260BY",
            price: 1450,
            brand: "С вертикальной загрузкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 700 об/мин, EcoBubble, Wobble технология, 12 программ."
        },
        {
            id: 10083,
            name: "Стиральная машина с вертикальной загрузкой Bosch WOR 16155",
            price: 1700,
            brand: "С вертикальной загрузкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1000 об/мин, инверторный мотор, 12 программ, ActiveWater."
        },
        {
            id: 10084,
            name: "Стиральная машина с вертикальной загрузкой Electrolux EWT 1364 HDW",
            price: 1300,
            brand: "С вертикальной загрузкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1300 об/мин, 14 программ, Aqua Control, Time Manager."
        },
        {
            id: 10085,
            name: "Стиральная машина с вертикальной загрузкой Zanussi ZWT 7101",
            price: 1100,
            brand: "С вертикальной загрузкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1000 об/мин, 12 программ, защита от протечек."
        },
        {
            id: 10086,
            name: "Стиральная машина с вертикальной загрузкой Whirlpool TDLR 70210",
            price: 1250,
            brand: "С вертикальной загрузкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1000 об/мин, 14 программ, 6-й чувство."
        },
        {
            id: 10087,
            name: "Стиральная машина с вертикальной загрузкой Indesit ITW D 71051",
            price: 950,
            brand: "С вертикальной загрузкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1000 об/мин, 12 программ, защита от протечек."
        },
        {
            id: 10088,
            name: "Стиральная машина с вертикальной загрузкой Hotpoint-Ariston WMTF 742 H",
            price: 1150,
            brand: "С вертикальной загрузкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1000 об/мин, 14 программ, инверторный мотор."
        },
        {
            id: 10089,
            name: "Стиральная машина с вертикальной загрузкой Gorenje WT 62113",
            price: 1050,
            brand: "С вертикальной загрузкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1100 об/мин, 15 программ, Energy class A++."
        },
        {
            id: 10090,
            name: "Стиральная машина с вертикальной загрузкой Candy CTD 8126",
            price: 850,
            brand: "С вертикальной загрузкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, 16 программ, Mix Power System."
        },

        // Фронтальные (10 моделей)
        {
            id: 10091,
            name: "Стиральная машина фронтальная LG F2J3HS0W",
            price: 1300,
            brand: "Фронтальные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, инверторный мотор, 1200 об/мин, 6 Motion, Steam."
        },
        {
            id: 10092,
            name: "Стиральная машина фронтальная Samsung WW80T554AAW",
            price: 1550,
            brand: "Фронтальные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1200 об/мин, EcoBubble, 14 программ."
        },
        {
            id: 10093,
            name: "Стиральная машина фронтальная Bosch WGA 142X0",
            price: 2100,
            brand: "Фронтальные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1400 об/мин, SpeedPerfect, ActiveWater."
        },
        {
            id: 10094,
            name: "Стиральная машина фронтальная Haier HW80-B14929",
            price: 1400,
            brand: "Фронтальные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1400 об/мин, барабан Pillow, пар."
        },
        {
            id: 10095,
            name: "Стиральная машина фронтальная Electrolux EW6F4823W",
            price: 1600,
            brand: "Фронтальные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, 14 программ, Aqua Control, Time Manager."
        },
        {
            id: 10096,
            name: "Стиральная машина фронтальная Indesit BWE 81284",
            price: 1100,
            brand: "Фронтальные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, 16 программ, защита от протечек."
        },
        {
            id: 10097,
            name: "Стиральная машина фронтальная Beko WUE 7512 XW",
            price: 950,
            brand: "Фронтальные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, 15 программ, AquaWave, Fast+."
        },
        {
            id: 10098,
            name: "Стиральная машина фронтальная Midea MWM 801",
            price: 800,
            brand: "Фронтальные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1000 об/мин, 15 программ, доступная цена."
        },
        {
            id: 10099,
            name: "Стиральная машина фронтальная Atlant 70У1210",
            price: 850,
            brand: "Фронтальные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1000 об/мин, 18 программ, электронное управление."
        },
        {
            id: 10100,
            name: "Стиральная машина фронтальная Gorenje W 75Z02/S",
            price: 900,
            brand: "Фронтальные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 5 кг, 1000 об/мин, 18 программ, класс A++."
        },

        // Инверторные (10 моделей)
        {
            id: 10101,
            name: "Стиральная машина инверторная LG F2V5HS0W",
            price: 1450,
            brand: "Инверторные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор Direct Drive, 6 Motion, Steam, 1200 об/мин."
        },
        {
            id: 10102,
            name: "Стиральная машина инверторная Samsung WW90T754ABH",
            price: 2100,
            brand: "Инверторные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор Digital Inverter, AI Control, AddWash."
        },
        {
            id: 10103,
            name: "Стиральная машина инверторная Bosch WGA 142X0",
            price: 2100,
            brand: "Инверторные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор EcoSilence Drive, 1400 об/мин."
        },
        {
            id: 10104,
            name: "Стиральная машина инверторная Haier HW80-B14929",
            price: 1400,
            brand: "Инверторные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1400 об/мин, барабан Pillow."
        },
        {
            id: 10105,
            name: "Стиральная машина инверторная Electrolux EW9W161B",
            price: 2700,
            brand: "Инверторные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор, 1600 об/мин, UltraMix, с сушкой."
        },
        {
            id: 10106,
            name: "Стиральная машина инверторная Midea MWD 801",
            price: 1500,
            brand: "Инверторные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1400 об/мин, с сушкой."
        },
        {
            id: 10107,
            name: "Стиральная машина инверторная Whirlpool FSCR 90420",
            price: 1800,
            brand: "Инверторные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор, 1400 об/мин, 6-й чувство."
        },
        {
            id: 10108,
            name: "Стиральная машина инверторная Siemens WM14W761",
            price: 2400,
            brand: "Инверторные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор, 1400 об/мин, i-Dos, SpeedPerfect."
        },
        {
            id: 10109,
            name: "Стиральная машина инверторная Candy CS4 1082D3",
            price: 1300,
            brand: "Инверторные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1000 об/мин, с сушкой, Mix Power."
        },
        {
            id: 10110,
            name: "Стиральная машина инверторная LG FH4G1JCH6N",
            price: 1750,
            brand: "Инверторные",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор, TurboWash, 1400 об/мин."
        },

        // LG с сушкой (10 моделей)
        {
            id: 10111,
            name: "Стиральная машина LG с сушкой F4R9JYP2W",
            price: 2800,
            brand: "LG с сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, сушка 6 кг, инверторный мотор, AI DD, TurboWash 2.0, 1600 об/мин."
        },
        {
            id: 10112,
            name: "Стиральная машина LG с сушкой FH4G1JCH6N",
            price: 2100,
            brand: "LG с сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, сушка 4 кг, инверторный мотор, TurboWash, 1400 об/мин."
        },
        {
            id: 10113,
            name: "Стиральная машина LG с сушкой F2V9GW9P",
            price: 2400,
            brand: "LG с сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, сушка 5 кг, инверторный мотор, AI DD, Steam+, 1400 об/мин."
        },
        {
            id: 10114,
            name: "Стиральная машина LG с сушкой FH2G1JDG0N",
            price: 2300,
            brand: "LG с сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, сушка 5 кг, AI DD, TurboWash 360, 1400 об/мин."
        },
        {
            id: 10115,
            name: "Стиральная машина LG с сушкой F4V9RWP2W",
            price: 2950,
            brand: "LG с сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 11 кг, сушка 7 кг, инверторный мотор, AI DD, 1600 об/мин."
        },
        {
            id: 10116,
            name: "Стиральная машина LG с сушкой F2J6HS0W",
            price: 1700,
            brand: "LG с сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, сушка 3 кг, инверторный мотор, 6 Motion, 1200 об/мин."
        },
        {
            id: 10117,
            name: "Стиральная машина LG с сушкой FH0B8ND1",
            price: 2000,
            brand: "LG с сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8.5 кг, сушка 4.5 кг, инверторный мотор, AI DD, 1400 об/мин."
        },
        {
            id: 10118,
            name: "Стиральная машина LG с сушкой F4R8JYP2W",
            price: 2600,
            brand: "LG с сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, сушка 5 кг, инверторный мотор, TurboWash, 1600 об/мин."
        },
        {
            id: 10119,
            name: "Стиральная машина LG с сушкой F2M5HS6W",
            price: 1850,
            brand: "LG с сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, сушка 4 кг, инверторный мотор, 6 Motion, Steam, 1200 об/мин."
        },
        {
            id: 10120,
            name: "Стиральная машина LG с сушкой F4R9JYP3W",
            price: 2900,
            brand: "LG с сушкой",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10.5 кг, сушка 6.5 кг, инверторный мотор, AI DD, TurboWash 2.0."
        },

        // ELECTROLUX (10 моделей)
        {
            id: 10121,
            name: "Стиральная машина Electrolux EW6F4823W",
            price: 1600,
            brand: "ELECTROLUX",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, 14 программ, Aqua Control, Time Manager."
        },
        {
            id: 10122,
            name: "Стиральная машина Electrolux EW7F4843W",
            price: 1850,
            brand: "ELECTROLUX",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1400 об/мин, 14 программ, Aqua Control, SteamCare."
        },
        {
            id: 10123,
            name: "Стиральная машина Electrolux EW9W161B",
            price: 2700,
            brand: "ELECTROLUX",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, сушка 5 кг, инверторный мотор, 1600 об/мин, UltraMix."
        },
        {
            id: 10124,
            name: "Стиральная машина Electrolux EWT 1364 HDW",
            price: 1300,
            brand: "ELECTROLUX",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1300 об/мин, 14 программ, Aqua Control, вертикальная."
        },
        {
            id: 10125,
            name: "Стиральная машина Electrolux EW6F4923W",
            price: 1750,
            brand: "ELECTROLUX",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1200 об/мин, 15 программ, Aqua Control, Time Manager."
        },
        {
            id: 10126,
            name: "Стиральная машина Electrolux EW7F4943W",
            price: 1950,
            brand: "ELECTROLUX",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1400 об/мин, 15 программ, SteamCare, Aqua Control."
        },
        {
            id: 10127,
            name: "Стиральная машина Electrolux EW8F4843W",
            price: 2100,
            brand: "ELECTROLUX",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1400 об/мин, инверторный мотор, SteamCare, 16 программ."
        },
        {
            id: 10128,
            name: "Стиральная машина Electrolux EW6F4723W",
            price: 1500,
            brand: "ELECTROLUX",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, 14 программ, Aqua Control, узкая."
        },
        {
            id: 10129,
            name: "Стиральная машина Electrolux EW7F4743W",
            price: 1700,
            brand: "ELECTROLUX",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1400 об/мин, 14 программ, SteamCare, Time Manager."
        },
        {
            id: 10130,
            name: "Стиральная машина Electrolux EW9F4843W",
            price: 2300,
            brand: "ELECTROLUX",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1400 об/мин, инверторный мотор, SteamCare, UltraMix."
        },

        // Midea (10 моделей)
        {
            id: 10131,
            name: "Стиральная машина Midea MWM 801",
            price: 800,
            brand: "Midea",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1000 об/мин, 15 программ, доступная, надежная."
        },
        {
            id: 10132,
            name: "Стиральная машина Midea MWD 801",
            price: 1500,
            brand: "Midea",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, сушка 4 кг, инверторный мотор, 1400 об/мин, 16 программ."
        },
        {
            id: 10133,
            name: "Стиральная машина Midea MWM 701",
            price: 700,
            brand: "Midea",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1000 об/мин, 12 программ, бюджетный выбор."
        },
        {
            id: 10134,
            name: "Стиральная машина Midea MWD 901",
            price: 1700,
            brand: "Midea",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, сушка 5 кг, инверторный мотор, 1400 об/мин, 16 программ."
        },
        {
            id: 10135,
            name: "Стиральная машина Midea MWM 601",
            price: 600,
            brand: "Midea",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1000 об/мин, 10 программ, механическое управление."
        },
        {
            id: 10136,
            name: "Стиральная машина Midea MWD 1001",
            price: 1900,
            brand: "Midea",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, сушка 6 кг, инверторный мотор, 1400 об/мин, 18 программ."
        },
        {
            id: 10137,
            name: "Стиральная машина Midea MWM 902",
            price: 950,
            brand: "Midea",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1200 об/мин, 15 программ, инверторный мотор."
        },
        {
            id: 10138,
            name: "Стиральная машина Midea MWD 702",
            price: 1400,
            brand: "Midea",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, сушка 3 кг, инверторный мотор, 1400 об/мин."
        },
        {
            id: 10139,
            name: "Стиральная машина Midea MWM 802",
            price: 850,
            brand: "Midea",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, 14 программ, защита от протечек."
        },
        {
            id: 10140,
            name: "Стиральная машина Midea MWD 1201",
            price: 2200,
            brand: "Midea",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 12 кг, сушка 7 кг, инверторный мотор, 1600 об/мин, AI."
        },

        // С оплатой по частям (10 моделей)
        {
            id: 10141,
            name: "Стиральная машина LG F2J3HS0W (рассрочка)",
            price: 1300,
            brand: "С оплатой по частям",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, инверторный мотор, Steam, 6 Motion, 1200 об/мин. Возможна оплата частями."
        },
        {
            id: 10142,
            name: "Стиральная машина Samsung WW80T554AAW (рассрочка)",
            price: 1550,
            brand: "С оплатой по частям",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, EcoBubble, 14 программ. Рассрочка 0-0-6."
        },
        {
            id: 10143,
            name: "Стиральная машина Bosch WGA 142X0 (рассрочка)",
            price: 2100,
            brand: "С оплатой по частям",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, SpeedPerfect, 1400 об/мин. Оплата частями."
        },
        {
            id: 10144,
            name: "Стиральная машина Haier HW80-B14929 (рассрочка)",
            price: 1400,
            brand: "С оплатой по частям",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, барабан Pillow, пар. Рассрочка без переплат."
        },
        {
            id: 10145,
            name: "Стиральная машина LG с сушкой F4R9JYP2W (рассрочка)",
            price: 2800,
            brand: "С оплатой по частям",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, сушка 6 кг, AI DD, TurboWash 2.0. Платите частями."
        },
        {
            id: 10146,
            name: "Стиральная машина Electrolux EW9W161B (рассрочка)",
            price: 2700,
            brand: "С оплатой по частям",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, сушка 5 кг, инверторный мотор, UltraMix. Рассрочка."
        },
        {
            id: 10147,
            name: "Стиральная машина Beko WUE 7512 XW (рассрочка)",
            price: 950,
            brand: "С оплатой по частям",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+. Доступна рассрочка."
        },
        {
            id: 10148,
            name: "Стиральная машина Atlant 70У1210 (рассрочка)",
            price: 850,
            brand: "С оплатой по частям",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1000 об/мин, 18 программ. Возможна оплата частями."
        },
        {
            id: 10149,
            name: "Стиральная машина Midea MWD 801 (рассрочка)",
            price: 1500,
            brand: "С оплатой по частям",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, сушка 4 кг, инверторный мотор. Рассрочка 0-0-3."
        },
        {
            id: 10150,
            name: "Стиральная машина Candy CS4 1082D3 (рассрочка)",
            price: 1300,
            brand: "С оплатой по частям",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, сушка 4 кг, 1000 об/мин, Mix Power. Платите частями."
        },

        // HOTPOINT (10 моделей)
        {
            id: 10151,
            name: "Стиральная машина Hotpoint RST 722 ST S",
            price: 1100,
            brand: "HOTPOINT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, 16 программ, защита от протечек, инверторный мотор."
        },
        {
            id: 10152,
            name: "Стиральная машина Hotpoint RSW 822 ST S",
            price: 1250,
            brand: "HOTPOINT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, 16 программ, инверторный мотор, пар."
        },
        {
            id: 10153,
            name: "Стиральная машина Hotpoint RST 622 ST S",
            price: 950,
            brand: "HOTPOINT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1200 об/мин, 16 программ, узкая, надежная."
        },
        {
            id: 10154,
            name: "Стиральная машина Hotpoint RSW 922 ST S",
            price: 1400,
            brand: "HOTPOINT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1200 об/мин, 16 программ, инверторный мотор, Steam."
        },
        {
            id: 10155,
            name: "Стиральная машина Hotpoint RST 722 ST W",
            price: 1050,
            brand: "HOTPOINT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, 16 программ, белая, защита от протечек."
        },
        {
            id: 10156,
            name: "Стиральная машина Hotpoint RSW 822 ST W",
            price: 1200,
            brand: "HOTPOINT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, 16 программ, инверторный мотор, белая."
        },
        {
            id: 10157,
            name: "Стиральная машина Hotpoint RST 622 ST W",
            price: 900,
            brand: "HOTPOINT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1200 об/мин, 16 программ, узкая, белая."
        },
        {
            id: 10158,
            name: "Стиральная машина Hotpoint RSW 922 ST W",
            price: 1350,
            brand: "HOTPOINT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1200 об/мин, 16 программ, инверторный мотор, белая."
        },
        {
            id: 10159,
            name: "Стиральная машина Hotpoint RST 822 ST S",
            price: 1150,
            brand: "HOTPOINT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, 16 программ, инверторный мотор, серебристая."
        },
        {
            id: 10160,
            name: "Стиральная машина Hotpoint RSW 1022 ST S",
            price: 1550,
            brand: "HOTPOINT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, 1200 об/мин, 16 программ, инверторный мотор, Steam."
        },

        // Toshiba (10 моделей)
        {
            id: 10161,
            name: "Стиральная машина Toshiba TWH-100M2",
            price: 1450,
            brand: "Toshiba",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, 1200 об/мин, инверторный мотор, 16 программ, Great Waves."
        },
        {
            id: 10162,
            name: "Стиральная машина Toshiba TWH-80M2",
            price: 1300,
            brand: "Toshiba",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, инверторный мотор, 16 программ, Great Waves."
        },
        {
            id: 10163,
            name: "Стиральная машина Toshiba TWH-70M2",
            price: 1150,
            brand: "Toshiba",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, инверторный мотор, 15 программ, узкая."
        },
        {
            id: 10164,
            name: "Стиральная машина Toshiba TWH-100S2",
            price: 1550,
            brand: "Toshiba",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, 1400 об/мин, инверторный мотор, 16 программ, S-DD Inverter."
        },
        {
            id: 10165,
            name: "Стиральная машина Toshiba TWH-80S2",
            price: 1400,
            brand: "Toshiba",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1400 об/мин, инверторный мотор, 16 программ, S-DD Inverter."
        },
        {
            id: 10166,
            name: "Стиральная машина Toshiba TWH-90M2",
            price: 1400,
            brand: "Toshiba",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1200 об/мин, инверторный мотор, 16 программ, Great Waves."
        },
        {
            id: 10167,
            name: "Стиральная машина Toshiba TWH-70S2",
            price: 1250,
            brand: "Toshiba",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1400 об/мин, инверторный мотор, 15 программ, S-DD Inverter."
        },
        {
            id: 10168,
            name: "Стиральная машина Toshiba TWH-120M2",
            price: 1700,
            brand: "Toshiba",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 12 кг, 1200 об/мин, инверторный мотор, 18 программ, Great Waves."
        },
        {
            id: 10169,
            name: "Стиральная машина Toshiba TWH-90S2",
            price: 1500,
            brand: "Toshiba",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1400 об/мин, инверторный мотор, 16 программ, S-DD Inverter."
        },
        {
            id: 10170,
            name: "Стиральная машина Toshiba TWH-120S2",
            price: 1850,
            brand: "Toshiba",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 12 кг, 1400 об/мин, инверторный мотор, 18 программ, S-DD Inverter."
        },

        // С прямым приводом (10 моделей)
        {
            id: 10171,
            name: "Стиральная машина с прямым приводом LG F2J3HS0W",
            price: 1300,
            brand: "С прямым приводом",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, Direct Drive, 6 Motion, Steam, 1200 об/мин, тихая работа."
        },
        {
            id: 10172,
            name: "Стиральная машина с прямым приводом LG F2V5HS0W",
            price: 1450,
            brand: "С прямым приводом",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, Direct Drive, 6 Motion, Steam, 1200 об/мин, 10 лет гарантии."
        },
        {
            id: 10173,
            name: "Стиральная машина с прямым приводом LG FH0B8ND1",
            price: 1600,
            brand: "С прямым приводом",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8.5 кг, Direct Drive, AI DD, 1400 об/мин, интеллектуальная."
        },
        {
            id: 10174,
            name: "Стиральная машина с прямым приводом LG FH4G1JCH6N",
            price: 1750,
            brand: "С прямым приводом",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, Direct Drive, TurboWash, 1400 об/мин, AI DD."
        },
        {
            id: 10175,
            name: "Стиральная машина с прямым приводом LG F4R9JYP2W",
            price: 2800,
            brand: "С прямым приводом",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, Direct Drive, AI DD, TurboWash 2.0, 1600 об/мин, с сушкой."
        },
        {
            id: 10176,
            name: "Стиральная машина с прямым приводом LG F2M5HS6W",
            price: 1500,
            brand: "С прямым приводом",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, Direct Drive, 6 Motion, Steam, 1200 об/мин."
        },
        {
            id: 10177,
            name: "Стиральная машина с прямым приводом LG F2V9GW9P",
            price: 1950,
            brand: "С прямым приводом",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, Direct Drive, AI DD, Steam+, 1400 об/мин."
        },
        {
            id: 10178,
            name: "Стиральная машина с прямым приводом LG FH2G1JDG0N",
            price: 1850,
            brand: "С прямым приводом",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, Direct Drive, AI DD, TurboWash 360, 1400 об/мин."
        },
        {
            id: 10179,
            name: "Стиральная машина с прямым приводом LG F4R8JYP2W",
            price: 2600,
            brand: "С прямым приводом",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, Direct Drive, TurboWash, 1600 об/мин, с сушкой."
        },
        {
            id: 10180,
            name: "Стиральная машина с прямым приводом LG F2J6HS0W",
            price: 1350,
            brand: "С прямым приводом",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, Direct Drive, 6 Motion, 1200 об/мин, тихая."
        },

        // MAUNFELD (10 моделей)
        {
            id: 10181,
            name: "Стиральная машина Maunfeld MWM-7108",
            price: 950,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1000 об/мин, 15 программ, инверторный мотор, класс A++."
        },
        {
            id: 10182,
            name: "Стиральная машина Maunfeld MWM-8108",
            price: 1050,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1000 об/мин, 15 программ, инверторный мотор, защита от протечек."
        },
        {
            id: 10183,
            name: "Стиральная машина Maunfeld MWM-6108",
            price: 850,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1000 об/мин, 14 программ, узкая, доступная."
        },
        {
            id: 10184,
            name: "Стиральная машина Maunfeld MWM-9108",
            price: 1150,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1000 об/мин, 16 программ, инверторный мотор, большой люк."
        },
        {
            id: 10185,
            name: "Стиральная машина Maunfeld MWM-7120",
            price: 1100,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, 15 программ, инверторный мотор, Steam."
        },
        {
            id: 10186,
            name: "Стиральная машина Maunfeld MWM-8120",
            price: 1200,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1200 об/мин, 15 программ, инверторный мотор, Steam."
        },
        {
            id: 10187,
            name: "Стиральная машина Maunfeld MWM-6120",
            price: 950,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 6 кг, 1200 об/мин, 14 программ, узкая, Steam."
        },
        {
            id: 10188,
            name: "Стиральная машина Maunfeld MWM-9120",
            price: 1350,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, 1200 об/мин, 16 программ, инверторный мотор, Steam."
        },
        {
            id: 10189,
            name: "Стиральная машина Maunfeld MWM-10120",
            price: 1500,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 10 кг, 1200 об/мин, 16 программ, инверторный мотор, Steam."
        },
        {
            id: 10190,
            name: "Стиральная машина Maunfeld MWM-8140",
            price: 1300,
            brand: "MAUNFELD",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1400 об/мин, 16 программ, инверторный мотор, AI."
        },

        // Встраиваемые (10 моделей)
        {
            id: 10191,
            name: "Встраиваемая стиральная машина Bosch WIW 24340",
            price: 2300,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, инверторный мотор, VarioPerfect, ActiveWater, полностью встраиваемая."
        },
        {
            id: 10192,
            name: "Встраиваемая стиральная машина Siemens WI 14W541",
            price: 2400,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1400 об/мин, инверторный мотор, SpeedPerfect, i-Dos."
        },
        {
            id: 10193,
            name: "Встраиваемая стиральная машина Electrolux EW7F4843W",
            price: 1950,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1400 об/мин, SteamCare, Aqua Control, Time Manager."
        },
        {
            id: 10194,
            name: "Встраиваемая стиральная машина LG F4V9RWP2W",
            price: 2950,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 11 кг, инверторный мотор, AI DD, 1600 об/мин, с сушкой."
        },
        {
            id: 10195,
            name: "Встраиваемая стиральная машина Samsung WW80T554AAW",
            price: 1650,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, инверторный мотор, 1200 об/мин, EcoBubble, AddWash."
        },
        {
            id: 10196,
            name: "Встраиваемая стиральная машина Whirlpool FSCR 90420",
            price: 1900,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 9 кг, инверторный мотор, 1400 об/мин, 6-й чувство."
        },
        {
            id: 10197,
            name: "Встраиваемая стиральная машина Miele WWI 860",
            price: 3500,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 8 кг, 1600 об/мин, инверторный мотор, TwinDos, премиум."
        },
        {
            id: 10198,
            name: "Встраиваемая стиральная машина AEG L7WBE741R",
            price: 2700,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, сушка 4 кг, 1400 об/мин, ProSteam, ÖKOMix."
        },
        {
            id: 10199,
            name: "Встраиваемая стиральная машина Hotpoint RST 722 ST S",
            price: 1200,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, 16 программ, инверторный мотор."
        },
        {
            id: 10200,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "Встраиваемые",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        // INDESIT
        {
            id: 10221,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "INDESIT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10222,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "INDESIT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10223,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "INDESIT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10224,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "INDESIT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10225,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "INDESIT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10226,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "INDESIT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10227,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "INDESIT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10228,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "INDESIT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10229,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "INDESIT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 102210,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "INDESIT",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        //CANDY
        {
            id: 10221,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "CANDY",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10222,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "CANDY",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10223,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "CANDY",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10224,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "CANDY",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10225,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "CANDY",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10226,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "CANDY",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10227,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "CANDY",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10228,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "CANDY",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 10229,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "CANDY",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        },
        {
            id: 102210,
            name: "Встраиваемая стиральная машина Beko WUE 7512 XW",
            price: 1050,
            brand: "CANDY",
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500",
            desc: "Загрузка 7 кг, 1200 об/мин, AquaWave, Fast+, доступная."
        }
    ],

    headphones: [
        // Apple (10 моделей)
        {
            id: 11001,
            name: "Наушники Apple AirPods Pro 2 (USB-C)",
            price: 950,
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "Активное шумоподавление, режим прозрачности, кейс с MagSafe, чип H2, пространственное аудио."
        },
        {
            id: 11002,
            name: "Наушники Apple AirPods Max (Silver)",
            price: 2100,
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "Полноразмерные, активное шумоподавление, пространственное аудио, чип H1, сетчатый чехол Smart Case."
        },
        {
            id: 11003,
            name: "Наушники Apple AirPods 3 (Lightning)",
            price: 650,
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "Пространственное аудио, адаптивный эквалайзер, защита от пота и воды, до 30 часов работы."
        },
        {
            id: 11004,
            name: "Наушники Apple AirPods Pro 2 (Lightning)",
            price: 900,
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "Активное шумоподавление, режим прозрачности, кейс с Lightning, чип H2."
        },
        {
            id: 11005,
            name: "Наушники Apple AirPods Max (Space Gray)",
            price: 2100,
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "Полноразмерные, активное шумоподавление, пространственное аудио, алюминиевые чашки."
        },
        {
            id: 11006,
            name: "Наушники Apple AirPods 2 (Lightning)",
            price: 400,
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "Чип H1, голосовой вызов Siri, до 24 часов работы с кейсом, беспроводная зарядка."
        },
        {
            id: 11007,
            name: "Наушники Apple AirPods Max (Green)",
            price: 2100,
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "Полноразмерные, активное шумоподавление, пространственное аудио, зеленый цвет."
        },
        {
            id: 11008,
            name: "Наушники Apple AirPods Pro 2 (USB-C) with MagSafe",
            price: 980,
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "Активное шумоподавление, режим прозрачности, кейс с MagSafe и динамиком."
        },
        {
            id: 11009,
            name: "Наушники Apple AirPods Max (Sky Blue)",
            price: 2100,
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "Полноразмерные, активное шумоподавление, пространственное аудио, голубой цвет."
        },
        {
            id: 11010,
            name: "Наушники Apple AirPods 3 (MagSafe)",
            price: 670,
            brand: "Apple",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "Пространственное аудио, адаптивный эквалайзер, кейс с MagSafe, до 30 часов работы."
        },

        // JBL (10 моделей)
        {
            id: 11011,
            name: "Наушники JBL Tune 510BT Black",
            price: 150,
            brand: "JBL",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Беспроводные накладные, до 40 часов работы, знаменитый бас JBL Pure Bass, быстрая зарядка."
        },
        {
            id: 11012,
            name: "Наушники JBL Live 660NC",
            price: 350,
            brand: "JBL",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Активное шумоподавление, до 50 часов работы, адаптивный звук, технология Smart Ambient."
        },
        {
            id: 11013,
            name: "Наушники JBL Tune 760NC",
            price: 280,
            brand: "JBL",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Активное шумоподавление, до 55 часов работы, JBL Pure Bass, складные, мультипоинт."
        },
        {
            id: 11014,
            name: "Наушники JBL Quantum 100",
            price: 120,
            brand: "JBL",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Проводные игровые, объемный звук JBL QuantumSOUND, поворотный микрофон, легкие."
        },
        {
            id: 11015,
            name: "Наушники JBL Reflect Aero TWS",
            price: 400,
            brand: "JBL",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Спортивные TWS, защита IP68, адаптивный шумоподавление, до 24 часов работы."
        },
        {
            id: 11016,
            name: "Наушники JBL Tune 230NC TWS",
            price: 250,
            brand: "JBL",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Беспроводные внутриканальные, активное шумоподавление, до 40 часов с кейсом."
        },
        {
            id: 11017,
            name: "Наушники JBL Club 950NC",
            price: 450,
            brand: "JBL",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Активное шумоподавление, звук от профессиональных диджеев, до 30 часов работы."
        },
        {
            id: 11018,
            name: "Наушники JBL Endurance Peak 3",
            price: 280,
            brand: "JBL",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Спортивные TWS, защита IP68, крючки TwistLock, до 50 часов работы."
        },
        {
            id: 11019,
            name: "Наушники JBL Quantum 800",
            price: 350,
            brand: "JBL",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Беспроводные игровые, объемный звук, активное шумоподавление, съемный микрофон."
        },
        {
            id: 11020,
            name: "Наушники JBL Tune 520BT",
            price: 170,
            brand: "JBL",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Беспроводные накладные, до 57 часов работы, JBL Pure Bass, быстрая зарядка."
        },

        // Xiaomi (10 моделей)
        {
            id: 11021,
            name: "Наушники Xiaomi Redmi Buds 4 Pro",
            price: 180,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление до 43 дБ, до 36 часов работы, Bluetooth 5.3."
        },
        {
            id: 11022,
            name: "Наушники Xiaomi Mi True Wireless Earphones 2 Basic",
            price: 80,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Беспроводные, Bluetooth 5.0, до 20 часов работы, сенсорное управление."
        },
        {
            id: 11023,
            name: "Наушники Xiaomi Redmi Buds 3 Lite",
            price: 60,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Бюджетные TWS, защита от брызг IP54, до 18 часов работы, Bluetooth 5.2."
        },
        {
            id: 11024,
            name: "Наушники Xiaomi Mi ANC Type-C",
            price: 70,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, активное шумоподавление, Type-C, алюминиевый корпус."
        },
        {
            id: 11025,
            name: "Наушники Xiaomi Redmi Buds 4 Lite",
            price: 90,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, Bluetooth 5.3, до 24 часов работы, защита IP54, быстрая зарядка."
        },
        {
            id: 11026,
            name: "Наушники Xiaomi Mi Headphones Comfort",
            price: 130,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные беспроводные, до 60 часов работы, складные, 40мм драйверы."
        },
        {
            id: 11027,
            name: "Наушники Xiaomi Redmi Buds 5 Pro",
            price: 220,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, гибридное шумоподавление до 52 дБ, до 38 часов работы, Hi-Res Audio."
        },
        {
            id: 11028,
            name: "Наушники Xiaomi Mi True Wireless Earphones 2S",
            price: 110,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Беспроводные, поддержка LHDC, до 24 часов работы, беспроводная зарядка."
        },
        {
            id: 11029,
            name: "Наушники Xiaomi Redmi Buds 5",
            price: 150,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление до 46 дБ, до 40 часов работы, Bluetooth 5.3."
        },
        {
            id: 11030,
            name: "Наушники Xiaomi Mi Basic Headphones",
            price: 50,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные внутриканальные, 3.5mm разъем, пульт управления, надежные."
        },

        // Samsung (10 моделей)
        {
            id: 11031,
            name: "Наушники Samsung Galaxy Buds2 Pro",
            price: 400,
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, интеллектуальное шумоподавление, 24 бит Hi-Fi звук, 360-аудио, защита IPX7."
        },
        {
            id: 11032,
            name: "Наушники Samsung Galaxy Buds FE",
            price: 220,
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 30 часов работы, эргономичный дизайн."
        },
        {
            id: 11033,
            name: "Наушники Samsung Galaxy Buds2",
            price: 280,
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 29 часов работы, динамики 2-сторонние."
        },
        {
            id: 11034,
            name: "Наушники Samsung Galaxy Buds Live",
            price: 250,
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, открытый тип, активное шумоподавление, до 21 часа работы, фасолевидный дизайн."
        },
        {
            id: 11035,
            name: "Наушники Samsung Galaxy Buds Pro",
            price: 320,
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, интеллектуальное шумоподавление, звук AKG, защита IPX7, до 28 часов."
        },
        {
            id: 11036,
            name: "Наушники Samsung Galaxy Buds+",
            price: 200,
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, звук AKG, до 22 часов работы, быстрая зарядка, окружающий звук."
        },
        {
            id: 11037,
            name: "Наушники Samsung Galaxy Buds2 Pro Graphite",
            price: 400,
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, интеллектуальное шумоподавление, 24 бит Hi-Fi, гранитовый цвет."
        },
        {
            id: 11038,
            name: "Наушники Samsung Galaxy Buds2 Lavender",
            price: 280,
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, лавандовый цвет, до 29 часов работы."
        },
        {
            id: 11039,
            name: "Наушники Samsung Galaxy Buds Live Bronze",
            price: 250,
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, открытый тип, активное шумоподавление, бронзовый цвет."
        },
        {
            id: 11040,
            name: "Наушники Samsung Galaxy Buds Pro Phantom Black",
            price: 320,
            brand: "Samsung",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, интеллектуальное шумоподавление, звук AKG, черный цвет."
        },

        // HUAWEI (10 моделей)
        {
            id: 11041,
            name: "Наушники HUAWEI FreeBuds Pro 3",
            price: 450,
            brand: "HUAWEI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, интеллектуальное шумоподавление до 47 дБ, звук высокой четкости, до 31 часа работы."
        },
        {
            id: 11042,
            name: "Наушники HUAWEI FreeBuds 5i",
            price: 200,
            brand: "HUAWEI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 28 часов работы, Hi-Res Audio, быстрая зарядка."
        },
        {
            id: 11043,
            name: "Наушники HUAWEI FreeBuds SE 2",
            price: 120,
            brand: "HUAWEI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 40 часов работы, Bluetooth 5.3, легкие, быстрая зарядка USB-C."
        },
        {
            id: 11044,
            name: "Наушники HUAWEI FreeBuds 4",
            price: 280,
            brand: "HUAWEI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS открытого типа, активное шумоподавление, до 22 часов работы, эргономичные."
        },
        {
            id: 11045,
            name: "Наушники HUAWEI FreeBuds Pro 2",
            price: 380,
            brand: "HUAWEI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, интеллектуальное шумоподавление, звук Devialet, до 30 часов работы."
        },
        {
            id: 11046,
            name: "Наушники HUAWEI FreeBuds 5",
            price: 320,
            brand: "HUAWEI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, эргономичный дизайн, активное шумоподавление, до 30 часов работы."
        },
        {
            id: 11047,
            name: "Наушники HUAWEI FreeBuds Lite",
            price: 150,
            brand: "HUAWEI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 12 часов работы, защита от пота, эргономичный дизайн."
        },
        {
            id: 11048,
            name: "Наушники HUAWEI FreeBuds Studio",
            price: 500,
            brand: "HUAWEI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Полноразмерные, активное шумоподавление, до 24 часов работы, динамики 40мм."
        },
        {
            id: 11049,
            name: "Наушники HUAWEI FreeBuds Pro 3 Silver",
            price: 450,
            brand: "HUAWEI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, интеллектуальное шумоподавление, звук высокой четкости, серебристый."
        },
        {
            id: 11050,
            name: "Наушники HUAWEI FreeBuds 5i Blue",
            price: 200,
            brand: "HUAWEI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 28 часов работы, синий цвет."
        },

        // MARSHALL (10 моделей)
        {
            id: 11051,
            name: "Наушники MARSHALL Major IV",
            price: 350,
            brand: "MARSHALL",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные беспроводные, до 80 часов работы, беспроводная зарядка, фирменный звук Marshall."
        },
        {
            id: 11052,
            name: "Наушники MARSHALL Monitor II A.N.C.",
            price: 550,
            brand: "MARSHALL",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Полноразмерные, активное шумоподавление, до 30 часов работы, Bluetooth 5.0."
        },
        {
            id: 11053,
            name: "Наушники MARSHALL Mid ANC",
            price: 450,
            brand: "MARSHALL",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные, активное шумоподавление, до 30 часов работы, складные."
        },
        {
            id: 11054,
            name: "Наушники MARSHALL Minor III",
            price: 280,
            brand: "MARSHALL",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 25 часов работы, беспроводная зарядка, фирменный звук."
        },
        {
            id: 11055,
            name: "Наушники MARSHALL Motif A.N.C.",
            price: 400,
            brand: "MARSHALL",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 20 часов работы, защита IPX5."
        },
        {
            id: 11056,
            name: "Наушники MARSHALL Major IV Black",
            price: 350,
            brand: "MARSHALL",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные беспроводные, до 80 часов работы, черный цвет."
        },
        {
            id: 11057,
            name: "Наушники MARSHALL Monitor III",
            price: 580,
            brand: "MARSHALL",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Полноразмерные, до 70 часов работы, складные, Bluetooth 5.2."
        },
        {
            id: 11058,
            name: "Наушники MARSHALL Mid Bluetooth",
            price: 380,
            brand: "MARSHALL",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные, до 30 часов работы, складные, фирменный дизайн."
        },
        {
            id: 11059,
            name: "Наушники MARSHALL Minor II",
            price: 220,
            brand: "MARSHALL",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Внутриканальные, до 12 часов работы, магнитное крепление."
        },
        {
            id: 11060,
            name: "Наушники MARSHALL Motif II",
            price: 420,
            brand: "MARSHALL",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 30 часов работы, защита IPX7."
        },

        // Sony (10 моделей)
        {
            id: 11061,
            name: "Наушники Sony WH-1000XM5",
            price: 850,
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Полноразмерные, премиальное шумоподавление, до 30 часов работы, LDAC, Multipoint."
        },
        {
            id: 11062,
            name: "Наушники Sony WF-1000XM5",
            price: 700,
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, интегрированный процессор V2, шумоподавление, до 24 часов работы."
        },
        {
            id: 11063,
            name: "Наушники Sony WH-1000XM4",
            price: 650,
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Полноразмерные, интеллектуальное шумоподавление, до 30 часов, LDAC, Speak-to-Chat."
        },
        {
            id: 11064,
            name: "Наушники Sony WF-1000XM4",
            price: 550,
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, процессор V1, шумоподавление, до 24 часов работы, защита IPX4."
        },
        {
            id: 11065,
            name: "Наушники Sony WH-CH720N",
            price: 350,
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Полноразмерные, активное шумоподавление, до 50 часов работы, Multipoint."
        },
        {
            id: 11066,
            name: "Наушники Sony WH-XB910N",
            price: 450,
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Полноразмерные, усиленные басы, шумоподавление, до 30 часов работы."
        },
        {
            id: 11067,
            name: "Наушники Sony WF-C700N",
            price: 300,
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 15 часов работы, легкие."
        },
        {
            id: 11068,
            name: "Наушники Sony WH-CH520",
            price: 180,
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные, до 50 часов работы, быстрая зарядка, Multipoint."
        },
        {
            id: 11069,
            name: "Наушники Sony INZONE H9",
            price: 550,
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Игровые беспроводные, шумоподавление, пространственный звук, 2.4 ГГц."
        },
        {
            id: 11070,
            name: "Наушники Sony SRS-NS7",
            price: 600,
            brand: "Sony",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные для ТВ, Dolby Atmos, Bluetooth, до 12 часов работы."
        },

        // Проводные (10 моделей)
        {
            id: 11071,
            name: "Наушники проводные Sennheiser HD 599",
            price: 500,
            brand: "Проводные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Открытые полноразмерные, 6.3 мм и 3.5 мм, трансдьюсеры 38мм, для аудиофилов."
        },
        {
            id: 11072,
            name: "Наушники проводные Beyerdynamic DT 770 PRO",
            price: 450,
            brand: "Проводные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Закрытые студийные, 80 Ом, мягкие амбушюры, профессиональный звук."
        },
        {
            id: 11073,
            name: "Наушники проводные Audio-Technica ATH-M50x",
            price: 400,
            brand: "Проводные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Студийные мониторы, складные, 3 съемных кабеля, отличная детализация."
        },
        {
            id: 11074,
            name: "Наушники проводные AKG K702",
            price: 480,
            brand: "Проводные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Открытые, для критического прослушивания, плоский звук, съемный кабель."
        },
        {
            id: 11075,
            name: "Наушники проводные Philips Fidelio X2HR",
            price: 380,
            brand: "Проводные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Открытые полноразмерные, 50мм драйверы, велюровые амбушюры."
        },
        {
            id: 11076,
            name: "Наушники проводные Shure SRH440",
            price: 250,
            brand: "Проводные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Студийные, складные, отличная детализация, для записи и мониторинга."
        },
        {
            id: 11077,
            name: "Наушники проводные Sony MDR-7506",
            price: 300,
            brand: "Проводные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Легендарные студийные, складные, 40мм драйверы, отличная детализация."
        },
        {
            id: 11078,
            name: "Наушники проводные Koss Porta Pro",
            price: 150,
            brand: "Проводные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Складные, легендарный звук, регулируемое оголовье, для любых устройств."
        },
        {
            id: 11079,
            name: "Наушники проводные Grado SR80e",
            price: 320,
            brand: "Проводные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Открытые, живой звук, 44мм драйверы, ручная сборка в Бруклине."
        },
        {
            id: 11080,
            name: "Наушники проводные JBL Tune 500",
            price: 70,
            brand: "Проводные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные, складные, JBL Pure Bass, 3.5мм разъем, пульт."
        },

        // True wireless (10 моделей)
        {
            id: 11081,
            name: "Наушники True wireless Sony WF-1000XM5",
            price: 700,
            brand: "True wireless",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, премиальное шумоподавление, процессор V2, LDAC, до 24 часов."
        },
        {
            id: 11082,
            name: "Наушники True wireless Bose QuietComfort Ultra Earbuds",
            price: 750,
            brand: "True wireless",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, лучшее шумоподавление, пространственный звук, до 24 часов работы."
        },
        {
            id: 11083,
            name: "Наушники True wireless Samsung Galaxy Buds2 Pro",
            price: 400,
            brand: "True wireless",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, интеллектуальное шумоподавление, 24 бит Hi-Fi, 360-аудио."
        },
        {
            id: 11084,
            name: "Наушники True wireless Apple AirPods Pro 2",
            price: 950,
            brand: "True wireless",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
            desc: "TWS, активное шумоподавление, чип H2, пространственное аудио."
        },
        {
            id: 11085,
            name: "Наушники True wireless HUAWEI FreeBuds Pro 3",
            price: 450,
            brand: "True wireless",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, интеллектуальное шумоподавление, звук высокой четкости."
        },
        {
            id: 11086,
            name: "Наушники True wireless JBL Live Pro 2 TWS",
            price: 350,
            brand: "True wireless",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, адаптивное шумоподавление, до 40 часов работы, JBL Pure Bass."
        },
        {
            id: 11087,
            name: "Наушники True wireless Nothing Ear (2)",
            price: 280,
            brand: "True wireless",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, прозрачный дизайн, LHDC 5.0."
        },
        {
            id: 11088,
            name: "Наушники True wireless Sennheiser Momentum True Wireless 3",
            price: 550,
            brand: "True wireless",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, адаптивное шумоподавление, звук высокой четкости, 7мм динамики."
        },
        {
            id: 11089,
            name: "Наушники True wireless Xiaomi Redmi Buds 4 Pro",
            price: 180,
            brand: "True wireless",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление до 43 дБ, до 36 часов работы."
        },
        {
            id: 11090,
            name: "Наушники True wireless Anker Soundcore Liberty 4",
            price: 300,
            brand: "True wireless",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, адаптивное шумоподавление, пространственный звук, до 28 часов."
        },

        // HONOR (10 моделей)
        {
            id: 11091,
            name: "Наушники HONOR Earbuds 3 Pro",
            price: 380,
            brand: "HONOR",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, кохлеарный вибратор, активное шумоподавление, до 24 часов работы."
        },
        {
            id: 11092,
            name: "Наушники HONOR Choice Earbuds X5",
            price: 120,
            brand: "HONOR",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 28 часов работы, Bluetooth 5.3, быстрая зарядка, легкие."
        },
        {
            id: 11093,
            name: "Наушники HONOR Choice Earbuds X3 Lite",
            price: 90,
            brand: "HONOR",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 24 часов работы, Bluetooth 5.2, защита от брызг."
        },
        {
            id: 11094,
            name: "Наушники HONOR Earbuds 2 Lite",
            price: 150,
            brand: "HONOR",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 32 часов работы, быстрая зарядка."
        },
        {
            id: 11095,
            name: "Наушники HONOR Choice Earbuds X5 Pro",
            price: 160,
            brand: "HONOR",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 30 часов работы, Bluetooth 5.3."
        },
        {
            id: 11096,
            name: "Наушники HONOR Earbuds 3i",
            price: 200,
            brand: "HONOR",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 28 часов работы, 10мм драйверы."
        },
        {
            id: 11097,
            name: "Наушники HONOR Choice Earbuds X3",
            price: 110,
            brand: "HONOR",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 24 часов работы, Bluetooth 5.2, эргономичный дизайн."
        },
        {
            id: 11098,
            name: "Наушники HONOR Sport Pro",
            price: 130,
            brand: "HONOR",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS спортивные, защита IP55, до 18 часов работы, крючки для ушей."
        },
        {
            id: 11099,
            name: "Наушники HONOR Earbuds X6",
            price: 140,
            brand: "HONOR",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 40 часов работы, Bluetooth 5.3, быстрая зарядка 10 мин = 4 часа."
        },
        {
            id: 11100,
            name: "Наушники HONOR Choice Earbuds X5 White",
            price: 120,
            brand: "HONOR",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 28 часов работы, Bluetooth 5.3, белый цвет."
        },

        // QCY (10 моделей)
        {
            id: 11101,
            name: "Наушники QCY HT05 MeloBuds",
            price: 100,
            brand: "QCY",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление до 40 дБ, до 24 часов работы, 10мм драйверы."
        },
        {
            id: 11102,
            name: "Наушники QCY T13",
            price: 50,
            brand: "QCY",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 40 часов работы, 7.2мм драйверы, Bluetooth 5.1, быстрая зарядка."
        },
        {
            id: 11103,
            name: "Наушники QCY HT07 ArcBuds",
            price: 120,
            brand: "QCY",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 24 часов работы, пространственный звук."
        },
        {
            id: 11104,
            name: "Наушники QCY T17",
            price: 60,
            brand: "QCY",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 40 часов работы, 10мм драйверы, эргономичный дизайн."
        },
        {
            id: 11105,
            name: "Наушники QCY HT02 ArcBuds Lite",
            price: 90,
            brand: "QCY",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 20 часов работы, Bluetooth 5.2."
        },
        {
            id: 11106,
            name: "Наушники QCY T20",
            price: 70,
            brand: "QCY",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 30 часов работы, 10мм драйверы, защита IPX5."
        },
        {
            id: 11107,
            name: "Наушники QCY HT05 Pro",
            price: 130,
            brand: "QCY",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление до 45 дБ, до 30 часов, 11мм драйверы."
        },
        {
            id: 11108,
            name: "Наушники QCY T18 MeloBuds",
            price: 110,
            brand: "QCY",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 28 часов работы, 10мм драйверы."
        },
        {
            id: 11109,
            name: "Наушники QCY T13 ANC",
            price: 80,
            brand: "QCY",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 35 часов работы, Bluetooth 5.3."
        },
        {
            id: 11110,
            name: "Наушники QCY Crossky GTR",
            price: 150,
            brand: "QCY",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS открытого типа, до 70 часов работы, вращающиеся наушники."
        },

        // Soundcore (10 моделей)
        {
            id: 11111,
            name: "Наушники Soundcore Liberty 4 NC",
            price: 250,
            brand: "Soundcore",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, адаптивное шумоподавление до 50 дБ, до 50 часов работы, LDAC."
        },
        {
            id: 11112,
            name: "Наушники Soundcore Life P3i",
            price: 130,
            brand: "Soundcore",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 36 часов работы, 10мм драйверы."
        },
        {
            id: 11113,
            name: "Наушники Soundcore Space A40",
            price: 220,
            brand: "Soundcore",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, адаптивное шумоподавление, до 50 часов работы, Hi-Res Audio."
        },
        {
            id: 11114,
            name: "Наушники Soundcore Life Q35",
            price: 280,
            brand: "Soundcore",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Полноразмерные, активное шумоподавление, до 60 часов работы, LDAC."
        },
        {
            id: 11115,
            name: "Наушники Soundcore Liberty 4",
            price: 300,
            brand: "Soundcore",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, адаптивное шумоподавление, пространственный звук, до 28 часов."
        },
        {
            id: 11116,
            name: "Наушники Soundcore Life P2i",
            price: 90,
            brand: "Soundcore",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 30 часов работы, 10мм драйверы, защита IPX7."
        },
        {
            id: 11117,
            name: "Наушники Soundcore Space Q45",
            price: 350,
            brand: "Soundcore",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Полноразмерные, адаптивное шумоподавление, до 65 часов, LDAC."
        },
        {
            id: 11118,
            name: "Наушники Soundcore Life U2",
            price: 70,
            brand: "Soundcore",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Затылочные беспроводные, до 20 часов работы, защита от пота."
        },
        {
            id: 11119,
            name: "Наушники Soundcore Liberty Air 2 Pro",
            price: 260,
            brand: "Soundcore",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 26 часов работы, 11мм драйверы."
        },
        {
            id: 11120,
            name: "Наушники Soundcore Sport X10",
            price: 200,
            brand: "Soundcore",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS спортивные, крючки для ушей, защита IPX7, до 32 часов."
        },

        // HOCO (10 моделей)
        {
            id: 11121,
            name: "Наушники HOCO ES31",
            price: 40,
            brand: "HOCO",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 15 часов работы, Bluetooth 5.0, сенсорное управление."
        },
        {
            id: 11122,
            name: "Наушники HOCO ES40",
            price: 60,
            brand: "HOCO",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 20 часов работы, Bluetooth 5.1, LED индикация зарядки."
        },
        {
            id: 11123,
            name: "Наушники HOCO ES50",
            price: 80,
            brand: "HOCO",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 24 часов работы, Bluetooth 5.2, кейс с дисплеем."
        },
        {
            id: 11124,
            name: "Наушники HOCO ES60",
            price: 100,
            brand: "HOCO",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 25 часов работы, Bluetooth 5.3."
        },
        {
            id: 11125,
            name: "Наушники HOCO E19",
            price: 30,
            brand: "HOCO",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 12 часов работы, Bluetooth 5.0, компактный кейс."
        },
        {
            id: 11126,
            name: "Наушники HOCO E22",
            price: 35,
            brand: "HOCO",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 15 часов работы, Bluetooth 5.1, эргономичный дизайн."
        },
        {
            id: 11127,
            name: "Наушники HOCO E28",
            price: 45,
            brand: "HOCO",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 18 часов работы, Bluetooth 5.2, сенсорное управление."
        },
        {
            id: 11128,
            name: "Наушники HOCO E33",
            price: 50,
            brand: "HOCO",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 20 часов работы, Bluetooth 5.3, быстрая зарядка."
        },
        {
            id: 11129,
            name: "Наушники HOCO E36",
            price: 55,
            brand: "HOCO",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 22 часов работы, Bluetooth 5.3, кейс с дисплеем."
        },
        {
            id: 11130,
            name: "Наушники HOCO E45",
            price: 70,
            brand: "HOCO",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 24 часов работы, Bluetooth 5.3."
        },

        // Вставные (10 моделей)
        {
            id: 11131,
            name: "Наушники вставные Apple EarPods (Lightning)",
            price: 80,
            brand: "Вставные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, разъем Lightning, пульт управления, отличный микрофон."
        },
        {
            id: 11132,
            name: "Наушники вставные Apple EarPods (3.5mm)",
            price: 80,
            brand: "Вставные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, 3.5мм разъем, пульт управления, эргономичный дизайн."
        },
        {
            id: 11133,
            name: "Наушники вставные JBL Tune 110",
            price: 60,
            brand: "Вставные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, JBL Pure Bass, 9мм драйверы, плоский кабель."
        },
        {
            id: 11134,
            name: "Наушники вставные Sennheiser CX 300S",
            price: 130,
            brand: "Вставные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, мощные басы, шумоподавление, смарт-пульт."
        },
        {
            id: 11135,
            name: "Наушники вставные Sony MDR-EX15LP",
            price: 40,
            brand: "Вставные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, 9мм драйверы, 4 цвета, легкие и удобные."
        },
        {
            id: 11136,
            name: "Наушники вставные Xiaomi Mi Basic Headphones",
            price: 50,
            brand: "Вставные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, 3.5мм, пульт управления, надежные и доступные."
        },
        {
            id: 11137,
            name: "Наушники вставные Panasonic RP-HJE125",
            price: 45,
            brand: "Вставные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, 10.7мм драйверы, сильные басы, 5 цветов."
        },
        {
            id: 11138,
            name: "Наушники вставные Samsung EO-IG955",
            price: 70,
            brand: "Вставные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные Type-C, звук AKG, пульт управления, плетеный кабель."
        },
        {
            id: 11139,
            name: "Наушники вставные Huawei AM115",
            price: 35,
            brand: "Вставные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные 3.5мм, эргономичные, надежные, пульт управления."
        },
        {
            id: 11140,
            name: "Наушники вставные Philips SHE3505",
            price: 55,
            brand: "Вставные",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, 8.6мм драйверы, мощные басы, плоский кабель."
        },

        // С USB Type-C (10 моделей)
        {
            id: 11141,
            name: "Наушники с USB Type-C Samsung EO-IG955",
            price: 70,
            brand: "С USB Type-C",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные Type-C, звук AKG, пульт управления, плетеный кабель."
        },
        {
            id: 11142,
            name: "Наушники с USB Type-C Google Pixel USB-C Earbuds",
            price: 90,
            brand: "С USB Type-C",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, адаптивный звук, быстрая пара с Pixel, компактные."
        },
        {
            id: 11143,
            name: "Наушники с USB Type-C Xiaomi Mi ANC Type-C",
            price: 70,
            brand: "С USB Type-C",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, активное шумоподавление, алюминиевый корпус."
        },
        {
            id: 11144,
            name: "Наушники с USB Type-C Huawei FreeLace Pro",
            price: 280,
            brand: "С USB Type-C",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Затылочные беспроводные, активное шумоподавление, быстрая зарядка USB-C."
        },
        {
            id: 11145,
            name: "Наушники с USB Type-C OnePlus Type-C Bullets",
            price: 60,
            brand: "С USB Type-C",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, 9.2мм драйверы, пульт, легкий алюминиевый корпус."
        },
        {
            id: 11146,
            name: "Наушники с USB Type-C Huawei AM116",
            price: 40,
            brand: "С USB Type-C",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные Type-C, цифровой звук, пульт управления, доступные."
        },
        {
            id: 11147,
            name: "Наушники с USB Type-C Sony MDR-EX15LP Type-C",
            price: 50,
            brand: "С USB Type-C",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные Type-C, 9мм драйверы, легкие, удобные."
        },
        {
            id: 11148,
            name: "Наушники с USB Type-C JBL Tune 115BT",
            price: 140,
            brand: "С USB Type-C",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Затылочные беспроводные, USB-C зарядка, JBL Pure Bass, до 8 часов."
        },
        {
            id: 11149,
            name: "Наушники с USB Type-C Xiaomi Mi Basic Headphones Type-C",
            price: 60,
            brand: "С USB Type-C",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные Type-C, цифровой аудиочип, пульт управления."
        },
        {
            id: 11150,
            name: "Наушники с USB Type-C Belkin RockStar",
            price: 80,
            brand: "С USB Type-C",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Адаптер-сплиттер Type-C, позволяет заряжать и слушать музыку одновременно."
        },

        // Nothing (10 моделей)
        {
            id: 11151,
            name: "Наушники Nothing Ear (2)",
            price: 280,
            brand: "Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, прозрачный дизайн, LHDC 5.0, до 36 часов."
        },
        {
            id: 11152,
            name: "Наушники Nothing Ear (1)",
            price: 230,
            brand: "Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, прозрачный дизайн, до 34 часов."
        },
        {
            id: 11153,
            name: "Наушники Nothing Ear (stick)",
            price: 200,
            brand: "Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, открытый тип, прозрачный дизайн, кейс-стик, до 22 часов."
        },
        {
            id: 11154,
            name: "Наушники Nothing Ear (a)",
            price: 240,
            brand: "Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, прозрачный дизайн, до 42 часов."
        },
        {
            id: 11155,
            name: "Наушники Nothing Ear (3)",
            price: 300,
            brand: "Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, прозрачный дизайн, LDAC, до 40 часов."
        },
        {
            id: 11156,
            name: "Наушники Nothing Ear (2) Black",
            price: 280,
            brand: "Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, прозрачный дизайн, черный цвет."
        },
        {
            id: 11157,
            name: "Наушники Nothing Ear (2) White",
            price: 280,
            brand: "Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, прозрачный дизайн, белый цвет."
        },
        {
            id: 11158,
            name: "Наушники Nothing Ear (stick) White",
            price: 200,
            brand: "Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, открытый тип, прозрачный дизайн, кейс-стик, белый."
        },
        {
            id: 11159,
            name: "Наушники Nothing Ear (a) Yellow",
            price: 240,
            brand: "Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, прозрачный дизайн, желтый цвет."
        },
        {
            id: 11160,
            name: "Наушники Nothing Ear (a) Black",
            price: 240,
            brand: "Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, прозрачный дизайн, черный цвет."
        },

        // PANASONIC (10 моделей)
        {
            id: 11161,
            name: "Наушники Panasonic RP-HJE125",
            price: 45,
            brand: "PANASONIC",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные внутриканальные, 10.7мм драйверы, сильные басы, 5 цветов."
        },
        {
            id: 11162,
            name: "Наушники Panasonic RP-HTX7",
            price: 150,
            brand: "PANASONIC",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные, винтажный дизайн, 40мм драйверы, 6 цветов."
        },
        {
            id: 11163,
            name: "Наушники Panasonic RP-HJE118",
            price: 50,
            brand: "PANASONIC",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные внутриканальные, 10.7мм драйверы, эргономичные, 4 цвета."
        },
        {
            id: 11164,
            name: "Наушники Panasonic RP-HF300",
            price: 120,
            brand: "PANASONIC",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные, складные, 30мм драйверы, легкие, 5 цветов."
        },
        {
            id: 11165,
            name: "Наушники Panasonic RP-HJE265",
            price: 60,
            brand: "PANASONIC",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные внутриканальные, эргономичные, 10.7мм драйверы."
        },
        {
            id: 11166,
            name: "Наушники Panasonic RP-HTX80",
            price: 180,
            brand: "PANASONIC",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные, стильный дизайн, 40мм драйверы, съемный кабель."
        },
        {
            id: 11167,
            name: "Наушники Panasonic RP-HJE155",
            price: 55,
            brand: "PANASONIC",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные внутриканальные, 10.7мм драйверы, 3 цвета."
        },
        {
            id: 11168,
            name: "Наушники Panasonic RP-HF410",
            price: 140,
            brand: "PANASONIC",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные беспроводные, до 24 часов работы, Bluetooth, складные."
        },
        {
            id: 11169,
            name: "Наушники Panasonic RP-HJE190",
            price: 70,
            brand: "PANASONIC",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные внутриканальные, мощные басы, 10.7мм драйверы."
        },
        {
            id: 11170,
            name: "Наушники Panasonic RP-HTX7B",
            price: 200,
            brand: "PANASONIC",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные беспроводные, винтажный дизайн, до 30 часов работы."
        },

        // CMF by Nothing (10 моделей)
        {
            id: 11171,
            name: "Наушники CMF by Nothing Buds Pro",
            price: 180,
            brand: "CMF by Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление до 45 дБ, до 39 часов работы, дизайн CMF."
        },
        {
            id: 11172,
            name: "Наушники CMF by Nothing Buds",
            price: 130,
            brand: "CMF by Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 35 часов работы, 10мм драйверы, эргономичный дизайн."
        },
        {
            id: 11173,
            name: "Наушники CMF by Nothing Buds Pro Orange",
            price: 180,
            brand: "CMF by Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, оранжевый цвет, до 39 часов."
        },
        {
            id: 11174,
            name: "Наушники CMF by Nothing Buds Blue",
            price: 130,
            brand: "CMF by Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 35 часов работы, синий цвет, 10мм драйверы."
        },
        {
            id: 11175,
            name: "Наушники CMF by Nothing Buds Pro Black",
            price: 180,
            brand: "CMF by Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, черный цвет, до 39 часов."
        },
        {
            id: 11176,
            name: "Наушники CMF by Nothing Buds Light Grey",
            price: 130,
            brand: "CMF by Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 35 часов работы, светло-серый цвет, 10мм драйверы."
        },
        {
            id: 11177,
            name: "Наушники CMF by Nothing Buds Pro Lite",
            price: 160,
            brand: "CMF by Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 36 часов, легкий дизайн."
        },
        {
            id: 11178,
            name: "Наушники CMF by Nothing Buds Dark Grey",
            price: 130,
            brand: "CMF by Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 35 часов работы, темно-серый цвет, Bluetooth 5.3."
        },
        {
            id: 11179,
            name: "Наушники CMF by Nothing Buds Pro 2",
            price: 200,
            brand: "CMF by Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, пространственный звук, до 43 часов."
        },
        {
            id: 11180,
            name: "Наушники CMF by Nothing Buds 2",
            price: 150,
            brand: "CMF by Nothing",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 38 часов работы, 10мм драйверы, улучшенный звук."
        },

        // Haylou (10 моделей)
        {
            id: 11181,
            name: "Наушники Haylou Moripods Pro",
            price: 90,
            brand: "Haylou",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 30 часов работы, Bluetooth 5.3."
        },
        {
            id: 11182,
            name: "Наушники Haylou GT6",
            price: 60,
            brand: "Haylou",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 24 часов работы, 12мм драйверы, Bluetooth 5.1."
        },
        {
            id: 11183,
            name: "Наушники Haylou GT7",
            price: 70,
            brand: "Haylou",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 25 часов работы, 10мм драйверы, игровой режим."
        },
        {
            id: 11184,
            name: "Наушники Haylou Moripods",
            price: 70,
            brand: "Haylou",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 24 часов работы, 12мм драйверы, сенсорное управление."
        },
        {
            id: 11185,
            name: "Наушники Haylou GT5",
            price: 50,
            brand: "Haylou",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 20 часов работы, 6мм драйверы, компактные."
        },
        {
            id: 11186,
            name: "Наушники Haylou S35",
            price: 120,
            brand: "Haylou",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные беспроводные, до 60 часов работы, складные, Bluetooth 5.2."
        },
        {
            id: 11187,
            name: "Наушники Haylou GT8",
            price: 80,
            brand: "Haylou",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 28 часов работы, 10мм драйверы, защита IPX5."
        },
        {
            id: 11188,
            name: "Наушники Haylou GT3",
            price: 45,
            brand: "Haylou",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 16 часов работы, 6мм драйверы, доступные."
        },
        {
            id: 11189,
            name: "Наушники Haylou Moripods Lite",
            price: 80,
            brand: "Haylou",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 20 часов работы, 12мм драйверы, легкий дизайн."
        },
        {
            id: 11190,
            name: "Наушники Haylou GT1 XR",
            price: 55,
            brand: "Haylou",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 24 часов работы, 7.2мм драйверы, Bluetooth 5.0."
        },

        // XIAOMI (еще 10 моделей для дополнения до 10 - уже есть 10, но добавим еще для полноты)
        {
            id: 11191,
            name: "Наушники Xiaomi Mi True Wireless Earphones 2",
            price: 100,
            brand: "XIAOMI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 24 часов работы, 14.2мм драйверы, Bluetooth 5.0."
        },
        {
            id: 11192,
            name: "Наушники Xiaomi Mi True Wireless Earphones 2C",
            price: 90,
            brand: "XIAOMI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 20 часов работы, 14.2мм драйверы, быстрая зарядка."
        },
        {
            id: 11193,
            name: "Наушники Xiaomi Mi Neckband Bluetooth Pro",
            price: 120,
            brand: "XIAOMI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Затылочные, активное шумоподавление, до 20 часов работы."
        },
        {
            id: 11194,
            name: "Наушники Xiaomi Mi Sport Bluetooth",
            price: 80,
            brand: "XIAOMI",
            image: "https://unsplash.com/photos/YUu9UAcOKZ4?w=500",
            desc: "Затылочные спортивные, до 10 часов работы, защита от пота."
        },
        {
            id: 11195,
            name: "Наушники Xiaomi Mi Bluetooth Headphones",
            price: 130,
            brand: "XIAOMI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Накладные, до 30 часов работы, складные, 40мм драйверы."
        },
        {
            id: 11196,
            name: "Наушники Xiaomi Mi True Wireless Earphones 3",
            price: 140,
            brand: "XIAOMI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, активное шумоподавление, до 32 часов работы, Hi-Res Audio."
        },
        {
            id: 11197,
            name: "Наушники Xiaomi Mi Compact Bluetooth Speaker",
            price: 110,
            brand: "XIAOMI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Гарнитура, до 8 часов работы, легкая, удобная."
        },
        {
            id: 11198,
            name: "Наушники Xiaomi Mi Dual Driver Earphones",
            price: 150,
            brand: "XIAOMI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, 2 драйвера, Hi-Res Audio, плетеный кабель."
        },
        {
            id: 11199,
            name: "Наушники Xiaomi Mi In-Ear Headphones Pro HD",
            price: 130,
            brand: "XIAOMI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "Проводные, металлический корпус, 10мм драйверы."
        },
        {
            id: 11200,
            name: "Наушники Xiaomi Mi Wireless Earphones",
            price: 95,
            brand: "XIAOMI",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
            desc: "TWS, до 15 часов работы, эргономичные, сенсорное управление."
        }
    ],

    tablets: [
        // === Apple iPad (10 моделей) ===
        {
            id: 1201,
            name: "Планшет Apple iPad Pro 13 M4 256GB Wi-Fi (Silver)",
            price: 5200,
            brand: "Apple",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-silver-202405?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип M4, 13-дюймовый дисплей Ultra Retina XDR, 256 ГБ, поддержка Apple Pencil Pro, Face ID, Thunderbolt."
        },
        {
            id: 1202,
            name: "Планшет Apple iPad Pro 11 M4 256GB Wi-Fi (Space Black)",
            price: 4500,
            brand: "Apple",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-wifi-spaceblack-202405?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип M4, 11-дюймовый дисплей Ultra Retina XDR, 256 ГБ, поддержка Apple Pencil Pro, Face ID."
        },
        {
            id: 1203,
            name: "Планшет Apple iPad Air 13 M2 128GB Wi-Fi (Blue)",
            price: 3600,
            brand: "Apple",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-13-select-wifi-blue-202405?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип M2, 13-дюймовый дисплей Liquid Retina, 128 ГБ, поддержка Apple Pencil Pro, Touch ID."
        },
        {
            id: 1204,
            name: "Планшет Apple iPad Air 11 M2 128GB Wi-Fi (Purple)",
            price: 3100,
            brand: "Apple",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-11-select-wifi-purple-202405?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип M2, 11-дюймовый дисплей Liquid Retina, 128 ГБ, поддержка Apple Pencil Pro, Touch ID."
        },
        {
            id: 1205,
            name: "Планшет Apple iPad 10.9 2022 64GB Wi-Fi (Silver)",
            price: 2100,
            brand: "Apple",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-select-wifi-silver-202210?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип A14 Bionic, 10.9-дюймовый дисплей Liquid Retina, 64 ГБ, Touch ID, USB-C."
        },
        {
            id: 1206,
            name: "Планшет Apple iPad 10.9 2022 256GB Wi-Fi (Blue)",
            price: 2600,
            brand: "Apple",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-select-wifi-blue-202210?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип A14 Bionic, 10.9-дюймовый дисплей Liquid Retina, 256 ГБ, Touch ID, USB-C."
        },
        {
            id: 1207,
            name: "Планшет Apple iPad mini 7 8.3 128GB Wi-Fi (Purple)",
            price: 2800,
            brand: "Apple",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-wifi-purple-202410?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип A17 Pro, 8.3-дюймовый дисплей Liquid Retina, 128 ГБ, поддержка Apple Pencil Pro, Touch ID."
        },
        {
            id: 1208,
            name: "Планшет Apple iPad mini 7 8.3 256GB Wi-Fi (Starlight)",
            price: 3300,
            brand: "Apple",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-wifi-starlight-202410?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип A17 Pro, 8.3-дюймовый дисплей Liquid Retina, 256 ГБ, поддержка Apple Pencil Pro."
        },
        {
            id: 1209,
            name: "Планшет Apple iPad Pro 12.9 M2 1TB Wi-Fi (Silver)",
            price: 5800,
            brand: "Apple",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-9-select-wifi-silver-202210?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип M2, 12.9-дюймовый дисплей Liquid Retina XDR, 1 ТБ, ProMotion, Face ID."
        },
        {
            id: 1210,
            name: "Планшет Apple iPad Pro 11 M2 512GB Wi-Fi (Space Gray)",
            price: 4800,
            brand: "Apple",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-wifi-spacegray-202210?wid=512&hei=512&fmt=png-alpha",
            desc: "Чип M2, 11-дюймовый дисплей Liquid Retina, 512 ГБ, ProMotion, Face ID, Thunderbolt."
        },

        // === Samsung Galaxy Tab (10 моделей) ===
        {
            id: 1211,
            name: "Планшет Samsung Galaxy Tab S9 Ultra 12/256GB (Graphite)",
            price: 4200,
            brand: "Samsung",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-x910nzaaser/gallery/ru-galaxy-tab-s9-ultra-x910-sm-x910nzaaser-539191916?$650_519_PNG$",
            desc: "Экран Dynamic AMOLED 2X 14.6\", 120 Гц, Snapdragon 8 Gen 2, 12 ГБ RAM, S Pen в комплекте, IP68."
        },
        {
            id: 1212,
            name: "Планшет Samsung Galaxy Tab S9+ 12/256GB (Beige)",
            price: 3600,
            brand: "Samsung",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-x810nzaaser/gallery/ru-galaxy-tab-s9-plus-x810-sm-x810nzaaser-539191902?$650_519_PNG$",
            desc: "Экран Dynamic AMOLED 2X 12.4\", 120 Гц, Snapdragon 8 Gen 2, 12 ГБ RAM, S Pen, IP68."
        },
        {
            id: 1213,
            name: "Планшет Samsung Galaxy Tab S9 8/128GB (Graphite)",
            price: 2900,
            brand: "Samsung",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-x710nzaaser/gallery/ru-galaxy-tab-s9-x710-sm-x710nzaaser-539191882?$650_519_PNG$",
            desc: "Экран Dynamic AMOLED 2X 11\", 120 Гц, Snapdragon 8 Gen 2, 8 ГБ RAM, S Pen, IP68."
        },
        {
            id: 1214,
            name: "Планшет Samsung Galaxy Tab S8 Ultra 12/256GB (Graphite)",
            price: 3800,
            brand: "Samsung",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-x900nzaaser/gallery/ru-galaxy-tab-s8-ultra-x900-sm-x900nzaaser-532901123?$650_519_PNG$",
            desc: "Экран Super AMOLED 14.6\", 120 Гц, Snapdragon 8 Gen 1, 12 ГБ RAM, S Pen в комплекте."
        },
        {
            id: 1215,
            name: "Планшет Samsung Galaxy Tab S8+ 8/128GB (Silver)",
            price: 3100,
            brand: "Samsung",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-x800nzaaser/gallery/ru-galaxy-tab-s8-plus-x800-sm-x800nzaaser-532901069?$650_519_PNG$",
            desc: "Экран Super AMOLED 12.4\", 120 Гц, Snapdragon 8 Gen 1, 8 ГБ RAM, S Pen."
        },
        {
            id: 1216,
            name: "Планшет Samsung Galaxy Tab A9+ 4/64GB (Silver)",
            price: 850,
            brand: "Samsung",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-x210nzaaser/gallery/ru-galaxy-tab-a9-plus-x210-sm-x210nzaaser-540399316?$650_519_PNG$",
            desc: "Экран 11\" TFT, 90 Гц, 4 ГБ RAM, 64 ГБ, четыре динамика, Android 13."
        },
        {
            id: 1217,
            name: "Планшет Samsung Galaxy Tab A9+ 8/128GB (Graphite)",
            price: 1050,
            brand: "Samsung",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-x210nzaaser/gallery/ru-galaxy-tab-a9-plus-x210-sm-x210nzaaser-540399324?$650_519_PNG$",
            desc: "Экран 11\" TFT, 90 Гц, 8 ГБ RAM, 128 ГБ, четыре динамика, Android 13."
        },
        {
            id: 1218,
            name: "Планшет Samsung Galaxy Tab S6 Lite 4/64GB (Angora Blue)",
            price: 950,
            brand: "Samsung",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-p610nzaaser/gallery/ru-galaxy-tab-s6-lite-p610-sm-p610nzaaser-532901234?$650_519_PNG$",
            desc: "Экран 10.4\" TFT, S Pen в комплекте, 4 ГБ RAM, 64 ГБ, металлический корпус."
        },
        {
            id: 1219,
            name: "Планшет Samsung Galaxy Tab S9 FE+ 8/128GB (Gray)",
            price: 1600,
            brand: "Samsung",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-x610nzaaser/gallery/ru-galaxy-tab-s9-fe-plus-x610-sm-x610nzaaser-541175424?$650_519_PNG$",
            desc: "Экран 12.4\" LCD, 90 Гц, Exynos 1380, 8 ГБ RAM, S Pen, IP68."
        },
        {
            id: 1220,
            name: "Планшет Samsung Galaxy Tab S9 FE 6/128GB (Silver)",
            price: 1300,
            brand: "Samsung",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-x510nzaaser/gallery/ru-galaxy-tab-s9-fe-x510-sm-x510nzaaser-541175408?$650_519_PNG$",
            desc: "Экран 10.9\" LCD, 90 Гц, Exynos 1380, 6 ГБ RAM, S Pen, IP68."
        },

        // === Xiaomi Pad (10 моделей) ===
        {
            id: 1221,
            name: "Планшет Xiaomi Pad 6S Pro 12.4 8/256GB (Black)",
            price: 1800,
            brand: "Xiaomi",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1708594937.33734655!400x400!85.png",
            desc: "Экран 12.4\" 144 Гц, Snapdragon 8 Gen 2, 8 ГБ RAM, 256 ГБ, HyperOS, 10000 мАч."
        },
        {
            id: 1222,
            name: "Планшет Xiaomi Pad 6 6/128GB (Gray)",
            price: 1200,
            brand: "Xiaomi",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1708594924.99468247!400x400!85.png",
            desc: "Экран 11\" 144 Гц, Snapdragon 870, 6 ГБ RAM, 128 ГБ, четыре динамика, HyperOS."
        },
        {
            id: 1223,
            name: "Планшет Xiaomi Pad 5 6/128GB (Gray)",
            price: 950,
            brand: "Xiaomi",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1695385268.23763542!400x400!85.png",
            desc: "Экран 11\" 120 Гц, Snapdragon 860, 6 ГБ RAM, 128 ГБ, четыре динамика, MIUI."
        },
        {
            id: 1224,
            name: "Планшет Xiaomi Redmi Pad SE 4/128GB (Gray)",
            price: 600,
            brand: "Xiaomi",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1705909337.04231686!400x400!85.png",
            desc: "Экран 11\" 90 Гц, Snapdragon 680, 4 ГБ RAM, 128 ГБ, 8000 мАч, HyperOS."
        },
        {
            id: 1225,
            name: "Планшет Xiaomi Redmi Pad 4/128GB (Graphite Gray)",
            price: 550,
            brand: "Xiaomi",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1705909338.44867642!400x400!85.png",
            desc: "Экран 10.61\" 90 Гц, Helio G99, 4 ГБ RAM, 128 ГБ, 8000 мАч, четыре динамика."
        },
        {
            id: 1226,
            name: "Планшет Xiaomi Pad 6 Pro 8/256GB (Black)",
            price: 1600,
            brand: "Xiaomi",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1714375635.4533486!400x400!85.png",
            desc: "Экран 11\" 144 Гц, Snapdragon 8+ Gen 1, 8 ГБ RAM, 256 ГБ, 67 Вт зарядка."
        },
        {
            id: 1227,
            name: "Планшет Xiaomi Pad 5 Pro 6/128GB (Black)",
            price: 1400,
            brand: "Xiaomi",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1704264159.0335363!400x400!85.png",
            desc: "Экран 11\" 120 Гц, Snapdragon 870, 6 ГБ RAM, 128 ГБ, 8600 мАч, HyperOS."
        },
        {
            id: 1228,
            name: "Планшет Xiaomi Redmi Pad Pro 6/128GB (Mint Green)",
            price: 800,
            brand: "Xiaomi",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1705909335.64798664!400x400!85.png",
            desc: "Экран 12.1\" 120 Гц, Snapdragon 7s Gen 2, 6 ГБ RAM, 128 ГБ, 10000 мАч."
        },
        {
            id: 1229,
            name: "Планшет Xiaomi Pad 6 Max 14 8/256GB (Silver)",
            price: 2200,
            brand: "Xiaomi",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1698758641.53316425!400x400!85.png",
            desc: "Экран 14\" 120 Гц, Snapdragon 8+ Gen 1, 8 ГБ RAM, 256 ГБ, 10000 мАч, 67 Вт."
        },
        {
            id: 1230,
            name: "Планшет Xiaomi Mi Pad 4 4/64GB (Black)",
            price: 400,
            brand: "Xiaomi",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1720098756.36557745!400x400!85.png",
            desc: "Экран 8\" Full HD, Snapdragon 660, 4 ГБ RAM, 64 ГБ, MIUI, компактный."
        },

        // === Huawei MatePad (10 моделей) ===
        {
            id: 1231,
            name: "Планшет Huawei MatePad Pro 13.2 12/512GB (Black)",
            price: 3800,
            brand: "Huawei",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-pro-13-2/img/kv.png",
            desc: "Экран 13.2\" OLED 120 Гц, Kirin 9000s, 12 ГБ RAM, 512 ГБ, HarmonyOS, стилус в комплекте."
        },
        {
            id: 1232,
            name: "Планшет Huawei MatePad Pro 11 8/256GB (White)",
            price: 2900,
            brand: "Huawei",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-pro-11-2024/img/kv.png",
            desc: "Экран 11\" OLED 120 Гц, Snapdragon 888, 8 ГБ RAM, 256 ГБ, HarmonyOS, стилус."
        },
        {
            id: 1233,
            name: "Планшет Huawei MatePad Air 8/128GB (Blue)",
            price: 2100,
            brand: "Huawei",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-air/img/kv.png",
            desc: "Экран 11.5\" 144 Гц, Snapdragon 888, 8 ГБ RAM, 128 ГБ, HarmonyOS, 8300 мАч."
        },
        {
            id: 1234,
            name: "Планшет Huawei MatePad 11.5 8/128GB (Gray)",
            price: 1500,
            brand: "Huawei",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-11-5-2024/img/kv.png",
            desc: "Экран 11.5\" 120 Гц, Snapdragon 7 Gen 1, 8 ГБ RAM, 128 ГБ, HarmonyOS, 7700 мАч."
        },
        {
            id: 1235,
            name: "Планшет Huawei MatePad 11 6/128GB (Matte Gray)",
            price: 1400,
            brand: "Huawei",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-11-2023/img/kv.png",
            desc: "Экран 11\" 120 Гц, Snapdragon 865, 6 ГБ RAM, 128 ГБ, HarmonyOS, стилус."
        },
        {
            id: 1236,
            name: "Планшет Huawei MatePad SE 4/64GB (Blue)",
            price: 700,
            brand: "Huawei",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-se-11-2024/img/kv.png",
            desc: "Экран 11\" Full HD, Snapdragon 680, 4 ГБ RAM, 64 ГБ, HarmonyOS, 7700 мАч."
        },
        {
            id: 1237,
            name: "Планшет Huawei MatePad Pro 12.6 8/256GB (Gray)",
            price: 3200,
            brand: "Huawei",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-pro-12-6-2022/img/kv.png",
            desc: "Экран 12.6\" OLED, Kirin 9000E, 8 ГБ RAM, 256 ГБ, HarmonyOS, стилус."
        },
        {
            id: 1238,
            name: "Планшет Huawei MatePad 10.4 4/128GB (Silver)",
            price: 950,
            brand: "Huawei",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-10-4-2022/img/kv.png",
            desc: "Экран 10.4\" 2K, Kirin 710A, 4 ГБ RAM, 128 ГБ, HarmonyOS, детский режим."
        },
        {
            id: 1239,
            name: "Планшет Huawei MatePad Paper 4/64GB (Black)",
            price: 1100,
            brand: "Huawei",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-paper/img/kv.png",
            desc: "Экран E-Ink 10.3\", 4 ГБ RAM, 64 ГБ, HarmonyOS, стилус для заметок."
        },
        {
            id: 1240,
            name: "Планшет Huawei MatePad T 3/32GB (Blue)",
            price: 450,
            brand: "Huawei",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-t-10s/img/kv.png",
            desc: "Экран 9.7\" HD, 3 ГБ RAM, 32 ГБ, HarmonyOS, для учебы и развлечений."
        },

        // === Honor Pad (10 моделей) ===
        {
            id: 1241,
            name: "Планшет Honor Pad 9 8/256GB (Space Gray)",
            price: 1100,
            brand: "Honor",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad9-space-gray-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Экран 12.1\" 120 Гц, Snapdragon 6 Gen 1, 8 ГБ RAM, 256 ГБ, MagicOS, 8300 мАч."
        },
        {
            id: 1242,
            name: "Планшет Honor Pad X9 4/128GB (Blue)",
            price: 750,
            brand: "Honor",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad-x9-blue-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Экран 11.5\" 120 Гц, Snapdragon 680, 4 ГБ RAM, 128 ГБ, MagicOS, 7250 мАч."
        },
        {
            id: 1243,
            name: "Планшет Honor Pad 8 6/128GB (Blue)",
            price: 950,
            brand: "Honor",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad8-blue-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Экран 12\" 2K, Snapdragon 680, 6 ГБ RAM, 128 ГБ, MagicUI, 8 динамиков."
        },
        {
            id: 1244,
            name: "Планшет Honor Pad X8 4/64GB (Blue)",
            price: 550,
            brand: "Honor",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad-x8-blue-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Экран 10.4\" 2K, MediaTek MT8786, 4 ГБ RAM, 64 ГБ, MagicUI, 5100 мАч."
        },
        {
            id: 1245,
            name: "Планшет Honor Pad V8 Pro 8/256GB (Blue)",
            price: 1600,
            brand: "Honor",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad-v8-pro-blue-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Экран 12.1\" 144 Гц, Dimensity 8100, 8 ГБ RAM, 256 ГБ, MagicOS, стилус."
        },
        {
            id: 1246,
            name: "Планшет Honor Pad V7 Pro 6/128GB (Gold)",
            price: 1400,
            brand: "Honor",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad-v7-pro-gold-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Экран 11\" 120 Гц, Dimensity 1300T, 6 ГБ RAM, 128 ГБ, MagicUI, стилус."
        },
        {
            id: 1247,
            name: "Планшет Honor Pad 9 Pro 8/256GB (Space Gray)",
            price: 1300,
            brand: "Honor",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad9-pro-gray-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Экран 12.1\" 120 Гц, Dimensity 8100, 8 ГБ RAM, 256 ГБ, MagicOS, 10050 мАч."
        },
        {
            id: 1248,
            name: "Планшет Honor Pad X8a 4/64GB (Gray)",
            price: 500,
            brand: "Honor",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad-x8a-gray-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Экран 11\" Full HD, MediaTek MT8786, 4 ГБ RAM, 64 ГБ, MagicOS, 8300 мАч."
        },
        {
            id: 1249,
            name: "Планшет Honor Pad SE 4/64GB (Blue)",
            price: 450,
            brand: "Honor",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad-se-blue-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Экран 10.4\" 2K, Snapdragon 680, 4 ГБ RAM, 64 ГБ, MagicOS, 5100 мАч."
        },
        {
            id: 1250,
            name: "Планшет Honor Pad V8 8/128GB (Blue)",
            price: 1200,
            brand: "Honor",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad-v8-blue-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Экран 11\" 120 Гц, Dimensity 8020, 8 ГБ RAM, 128 ГБ, MagicOS, стилус."
        },

        // === Teclast (10 моделей) ===
        {
            id: 1251,
            name: "Планшет Teclast T50 Pro 8/256GB (Gray)",
            price: 800,
            brand: "Teclast",
            image: "https://img.teclast.com/images/t50pro-gray-01.jpg",
            desc: "Экран 11\" 2K, Unisoc T616, 8 ГБ RAM, 256 ГБ, Android 14, 4G LTE."
        },
        {
            id: 1252,
            name: "Планшет Teclast M50 6/128GB (Blue)",
            price: 600,
            brand: "Teclast",
            image: "https://img.teclast.com/images/m50-blue-01.jpg",
            desc: "Экран 10.1\" Full HD, Unisoc T606, 6 ГБ RAM, 128 ГБ, Android 13, 4G."
        },
        {
            id: 1253,
            name: "Планшет Teclast T60 8/256GB (Gray)",
            price: 750,
            brand: "Teclast",
            image: "https://img.teclast.com/images/t60-gray-01.jpg",
            desc: "Экран 12\" 2K, Unisoc T616, 8 ГБ RAM, 256 ГБ, Android 14, 4G, 8000 мАч."
        },
        {
            id: 1254,
            name: "Планшет Teclast P30HD 4/64GB (Gray)",
            price: 400,
            brand: "Teclast",
            image: "https://img.teclast.com/images/p30hd-gray-01.jpg",
            desc: "Экран 10.1\" Full HD, Unisoc T618, 4 ГБ RAM, 64 ГБ, Android 12, 4G."
        },
        {
            id: 1255,
            name: "Планшет Teclast T40 Pro 6/128GB (Blue)",
            price: 550,
            brand: "Teclast",
            image: "https://img.teclast.com/images/t40pro-blue-01.jpg",
            desc: "Экран 10.4\" 2K, Unisoc T618, 6 ГБ RAM, 128 ГБ, Android 12, 4G LTE."
        },
        {
            id: 1256,
            name: "Планшет Teclast T50 8/256GB (Gray)",
            price: 700,
            brand: "Teclast",
            image: "https://img.teclast.com/images/t50-gray-01.jpg",
            desc: "Экран 11\" 2K, Unisoc T616, 8 ГБ RAM, 256 ГБ, Android 13, 4G."
        },
        {
            id: 1257,
            name: "Планшет Teclast M40 Pro 4/64GB (Blue)",
            price: 450,
            brand: "Teclast",
            image: "https://img.teclast.com/images/m40pro-blue-01.jpg",
            desc: "Экран 10.1\" Full HD, Unisoc T618, 4 ГБ RAM, 64 ГБ, Android 11, 4G."
        },
        {
            id: 1258,
            name: "Планшет Teclast P85T 4/64GB (Gray)",
            price: 350,
            brand: "Teclast",
            image: "https://img.teclast.com/images/p85t-gray-01.jpg",
            desc: "Экран 8.5\" HD, Unisoc T606, 4 ГБ RAM, 64 ГБ, Android 13, компактный."
        },
        {
            id: 1259,
            name: "Планшет Teclast T65 Max 8/256GB (Gray)",
            price: 900,
            brand: "Teclast",
            image: "https://img.teclast.com/images/t65max-gray-01.jpg",
            desc: "Экран 12.5\" 2K, Unisoc T616, 8 ГБ RAM, 256 ГБ, Android 14, 10000 мАч."
        },
        {
            id: 1260,
            name: "Планшет Teclast M50 Pro 8/128GB (Blue)",
            price: 650,
            brand: "Teclast",
            image: "https://img.teclast.com/images/m50pro-blue-01.jpg",
            desc: "Экран 10.4\" 2K, Unisoc T616, 8 ГБ RAM, 128 ГБ, Android 13, 4G LTE."
        },

        // === TCL Tab (10 моделей) ===
        {
            id: 1261,
            name: "Планшет TCL Tab 10 NXTPAPER 5G 4/64GB (Gray)",
            price: 750,
            brand: "TCL",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-10-nxtpaper-5g/kv.png",
            desc: "Экран 10.4\" NXTPAPER 2K, MediaTek Kompanio 800T, 4 ГБ RAM, 64 ГБ, 5G."
        },
        {
            id: 1262,
            name: "Планшет TCL Tab 10L 3/32GB (Blue)",
            price: 400,
            brand: "TCL",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-10l/kv.png",
            desc: "Экран 10.1\" HD, MediaTek MT8768, 3 ГБ RAM, 32 ГБ, Android 12, для детей."
        },
        {
            id: 1263,
            name: "Планшет TCL Tab 11 4/128GB (Gray)",
            price: 550,
            brand: "TCL",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-11/kv.png",
            desc: "Экран 11\" 2K, MediaTek Helio P60T, 4 ГБ RAM, 128 ГБ, Android 12, 4G."
        },
        {
            id: 1264,
            name: "Планшет TCL Tab 8 LE 3/32GB (Blue)",
            price: 300,
            brand: "TCL",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-8-le/kv.png",
            desc: "Экран 8\" HD, MediaTek MT8766, 3 ГБ RAM, 32 ГБ, Android 12, компактный."
        },
        {
            id: 1265,
            name: "Планшет TCL Tab 10S 4/64GB (Silver)",
            price: 500,
            brand: "TCL",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-10s/kv.png",
            desc: "Экран 10.1\" Full HD, MediaTek Helio P22T, 4 ГБ RAM, 64 ГБ, 4G LTE."
        },
        {
            id: 1266,
            name: "Планшет TCL Tab 10 NXTPAPER 4/64GB (Gray)",
            price: 650,
            brand: "TCL",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-10-nxtpaper/kv.png",
            desc: "Экран 10.4\" NXTPAPER 2K, MediaTek Helio P60T, 4 ГБ RAM, 64 ГБ, 4G."
        },
        {
            id: 1267,
            name: "Планшет TCL Tab Pro 5G 6/128GB (Gray)",
            price: 950,
            brand: "TCL",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-pro-5g/kv.png",
            desc: "Экран 12.2\" 2K, Qualcomm Snapdragon 480, 6 ГБ RAM, 128 ГБ, 5G, стилус."
        },
        {
            id: 1268,
            name: "Планшет TCL Tab 10L Pro 4/64GB (Blue)",
            price: 450,
            brand: "TCL",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-10l-pro/kv.png",
            desc: "Экран 10.1\" HD, MediaTek MT8768, 4 ГБ RAM, 64 ГБ, Android 13, детский."
        },
        {
            id: 1269,
            name: "Планшет TCL Tab 11 Pro 6/128GB (Gray)",
            price: 700,
            brand: "TCL",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-11-pro/kv.png",
            desc: "Экран 11\" 2K, MediaTek Kompanio 800T, 6 ГБ RAM, 128 ГБ, 4G, стилус."
        },
        {
            id: 1270,
            name: "Планшет TCL Tab 7 2/32GB (Blue)",
            price: 250,
            brand: "TCL",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-7/kv.png",
            desc: "Экран 7\" HD, MediaTek MT8321, 2 ГБ RAM, 32 ГБ, Android 11 Go, компактный."
        },

        // === Lenovo Tab (10 моделей) ===
        {
            id: 1271,
            name: "Планшет Lenovo Tab P12 Pro 8/256GB (Storm Grey)",
            price: 1800,
            brand: "Lenovo",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8Mjg0MTYwfGltYWdlL3BuZ3xoNTMvaDk5LzE0MjU2Nzg5MDEyNzM0LnBuZ3w4YjVlN2Q4ZjUwYjY3YzA5NzUxZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Экран 12.6\" AMOLED 120 Гц, Snapdragon 870, 8 ГБ RAM, 256 ГБ, стилус в комплекте."
        },
        {
            id: 1272,
            name: "Планшет Lenovo Tab P11 Pro Gen 2 6/128GB (Storm Grey)",
            price: 1300,
            brand: "Lenovo",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTU2NDIwfGltYWdlL3BuZ3hoZWMvaDc4LzE0MjU2Nzg5MzQwNTAyLnBuZ3w4Y2Y5ZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Экран 11.2\" OLED 120 Гц, MediaTek Kompanio 1300T, 6 ГБ RAM, 128 ГБ, стилус."
        },
        {
            id: 1273,
            name: "Планшет Lenovo Tab P11 5G 4/128GB (Slate Grey)",
            price: 900,
            brand: "Lenovo",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTg5MjQwfGltYWdlL3BuZ3hoMzIvaDk5LzE0MjU2Nzg5NjY4MjU0LnBuZ3w4Y2Y5ZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Экран 11\" 2K, Snapdragon 750G, 4 ГБ RAM, 128 ГБ, 5G, Android 12."
        },
        {
            id: 1274,
            name: "Планшет Lenovo Tab M10 Plus 3rd Gen 4/64GB (Frost Blue)",
            price: 550,
            brand: "Lenovo",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjU2NzgwfGltYWdlL3BuZ3xoNTMvaDk5LzE0MjU2Nzg5OTk2MjU0LnBuZ3w4YjVlN2Q4ZjUwYjY3YzA5NzUxZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Экран 10.6\" 2K, MediaTek Helio G80, 4 ГБ RAM, 64 ГБ, Android 12."
        },
        {
            id: 1275,
            name: "Планшет Lenovo Tab M9 3/32GB (Arctic Grey)",
            price: 350,
            brand: "Lenovo",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTQ1NzgwfGltYWdlL3BuZ3hoZWMvaDc4LzE0MjU2Nzg5MDQwNTAyLnBuZ3w4Y2Y5ZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Экран 9\" HD, MediaTek Helio G80, 3 ГБ RAM, 32 ГБ, Android 12, компактный."
        },
        {
            id: 1276,
            name: "Планшет Lenovo Tab P12 8/256GB (Storm Grey)",
            price: 1500,
            brand: "Lenovo",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTY3ODkwfGltYWdlL3BuZ3hoZWMvaDc4LzE0MjU2Nzg5MTQwNTAyLnBuZ3w4Y2Y5ZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Экран 12.7\" 3K, Dimensity 7050, 8 ГБ RAM, 256 ГБ, Android 13, 10200 мАч."
        },
        {
            id: 1277,
            name: "Планшет Lenovo Tab M8 4th Gen 3/32GB (Iron Grey)",
            price: 300,
            brand: "Lenovo",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTkyMzQwfGltYWdlL3BuZ3hoZWMvaDc4LzE0MjU2Nzg5MjQwNTAyLnBuZ3w4Y2Y5ZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Экран 8\" HD, MediaTek A22, 3 ГБ RAM, 32 ГБ, Android 12 Go, детский."
        },
        {
            id: 1278,
            name: "Планшет Lenovo Yoga Tab 13 8/256GB (Shadow Black)",
            price: 1600,
            brand: "Lenovo",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjA0NTYwfGltYWdlL3BuZ3hoZWMvaDc4LzE0MjU2Nzg5MzQwNTAyLnBuZ3w4Y2Y5ZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Экран 13\" 2K, Snapdragon 870, 8 ГБ RAM, 256 ГБ, встроенная подставка, HDMI in."
        },
        {
            id: 1279,
            name: "Планшет Lenovo Tab P11 Plus 4/128GB (Slate Grey)",
            price: 800,
            brand: "Lenovo",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTU2NzgwfGltYWdlL3BuZ3hoZWMvaDc4LzE0MjU2Nzg5NDQwNTAyLnBuZ3w4Y2Y5ZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Экран 11\" 2K, MediaTek Helio G90T, 4 ГБ RAM, 128 ГБ, Android 11."
        },
        {
            id: 1280,
            name: "Планшет Lenovo Tab M10 HD 2nd Gen 2/32GB (Platinum Grey)",
            price: 280,
            brand: "Lenovo",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTc4OTAwfGltYWdlL3BuZ3hoZWMvaDc4LzE0MjU2Nzg5NTQwNTAyLnBuZ3w4Y2Y5ZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Экран 10.1\" HD, MediaTek P22T, 2 ГБ RAM, 32 ГБ, Android 10, детский режим."
        },

        // === Blackview Tab (10 моделей) ===
        {
            id: 1281,
            name: "Планшет Blackview Tab 18 8/256GB (Gray)",
            price: 700,
            brand: "Blackview",
            image: "https://img.blackview.com/products/tab18/tab18-gray-01.jpg",
            desc: "Экран 12\" 2K, MediaTek Helio G99, 8 ГБ RAM, 256 ГБ, Android 13, 8800 мАч."
        },
        {
            id: 1282,
            name: "Планшет Blackview Tab 16 8/256GB (Blue)",
            price: 600,
            brand: "Blackview",
            image: "https://img.blackview.com/products/tab16/tab16-blue-01.jpg",
            desc: "Экран 11\" 2K, Unisoc T616, 8 ГБ RAM, 256 ГБ, Android 13, 4G LTE."
        },
        {
            id: 1283,
            name: "Планшет Blackview Tab 13 6/128GB (Gray)",
            price: 500,
            brand: "Blackview",
            image: "https://img.blackview.com/products/tab13/tab13-gray-01.jpg",
            desc: "Экран 10.1\" Full HD, Unisoc T618, 6 ГБ RAM, 128 ГБ, Android 12, 4G."
        },
        {
            id: 1284,
            name: "Планшет Blackview Tab 11 Pro 6/128GB (Blue)",
            price: 450,
            brand: "Blackview",
            image: "https://img.blackview.com/products/tab11pro/tab11pro-blue-01.jpg",
            desc: "Экран 10.4\" 2K, Unisoc T618, 6 ГБ RAM, 128 ГБ, Android 12, 4G, 7680 мАч."
        },
        {
            id: 1285,
            name: "Планшет Blackview Tab 10 4/64GB (Gray)",
            price: 350,
            brand: "Blackview",
            image: "https://img.blackview.com/products/tab10/tab10-gray-01.jpg",
            desc: "Экран 10.1\" Full HD, Unisoc SC9863A, 4 ГБ RAM, 64 ГБ, Android 11, 4G."
        },
        {
            id: 1286,
            name: "Планшет Blackview Tab 8E 3/32GB (Blue)",
            price: 250,
            brand: "Blackview",
            image: "https://img.blackview.com/products/tab8e/tab8e-blue-01.jpg",
            desc: "Экран 8\" HD, Unisoc SC9832E, 3 ГБ RAM, 32 ГБ, Android 11 Go, компактный."
        },
        {
            id: 1287,
            name: "Планшет Blackview Tab 17 Pro 8/256GB (Gray)",
            price: 650,
            brand: "Blackview",
            image: "https://img.blackview.com/products/tab17pro/tab17pro-gray-01.jpg",
            desc: "Экран 11.5\" 2K, MediaTek Helio G99, 8 ГБ RAM, 256 ГБ, Android 13, 4G."
        },
        {
            id: 1288,
            name: "Планшет Blackview Tab 15 6/128GB (Blue)",
            price: 550,
            brand: "Blackview",
            image: "https://img.blackview.com/products/tab15/tab15-blue-01.jpg",
            desc: "Экран 10.5\" 2K, Unisoc T616, 6 ГБ RAM, 128 ГБ, Android 12, 4G, 8200 мАч."
        },
        {
            id: 1289,
            name: "Планшет Blackview Tab 12 4/64GB (Gray)",
            price: 400,
            brand: "Blackview",
            image: "https://img.blackview.com/products/tab12/tab12-gray-01.jpg",
            desc: "Экран 10.1\" Full HD, Unisoc T310, 4 ГБ RAM, 64 ГБ, Android 11, 4G LTE."
        },
        {
            id: 1290,
            name: "Планшет Blackview Tab 70 3/32GB (Blue)",
            price: 200,
            brand: "Blackview",
            image: "https://img.blackview.com/products/tab70/tab70-blue-01.jpg",
            desc: "Экран 7\" HD, Unisoc SC9832E, 3 ГБ RAM, 32 ГБ, Android 11 Go, компактный."
        },

        // === Игровые планшеты (10 моделей разных брендов) ===
        {
            id: 1291,
            name: "Планшет Apple iPad Pro 13 M4 для игр",
            price: 5200,
            brand: "Игровые",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-silver-202405?wid=512&hei=512&fmt=png-alpha",
            desc: "Игровой планшет, чип M4, 120 Гц, графика для тяжелых игр, 1 ТБ."
        },
        {
            id: 1292,
            name: "Планшет Samsung Galaxy Tab S9 Ultra для игр",
            price: 4200,
            brand: "Игровые",
            image: "https://images.samsung.com/is/image/samsung/p6pim/ru/sm-x910nzaaser/gallery/ru-galaxy-tab-s9-ultra-x910-sm-x910nzaaser-539191916?$650_519_PNG$",
            desc: "Игровой планшет, Snapdragon 8 Gen 2, 120 Гц, 14.6\", 12 ГБ RAM."
        },
        {
            id: 1293,
            name: "Планшет Xiaomi Pad 6S Pro для игр",
            price: 1800,
            brand: "Игровые",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1708594937.33734655!400x400!85.png",
            desc: "Игровой планшет, Snapdragon 8 Gen 2, 144 Гц, 12.4\", 8 ГБ RAM."
        },
        {
            id: 1294,
            name: "Планшет Lenovo Legion Y700 8/128GB",
            price: 1100,
            brand: "Игровые",
            image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTc4OTAwfGltYWdlL3BuZ3hoZWMvaDc4LzE0MjU2Nzg5NTQwNTAyLnBuZ3w4Y2Y5ZjU4YjQwYzU4YzVhOQ/w512",
            desc: "Игровой планшет 8.8\", Snapdragon 870, 120 Гц, 8 ГБ RAM, 128 ГБ, JBL звук."
        },
        {
            id: 1295,
            name: "Планшет Redmi Pad Pro для игр",
            price: 800,
            brand: "Игровые",
            image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1705909335.64798664!400x400!85.png",
            desc: "Игровой планшет, Snapdragon 7s Gen 2, 120 Гц, 12.1\", 6 ГБ RAM."
        },
        {
            id: 1296,
            name: "Планшет Huawei MatePad Pro 13.2 для игр",
            price: 3800,
            brand: "Игровые",
            image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/tablets/matepad-pro-13-2/img/kv.png",
            desc: "Игровой планшет, Kirin 9000s, 120 Гц, 13.2\" OLED, 12 ГБ RAM."
        },
        {
            id: 1297,
            name: "Планшет Honor Pad 9 Pro для игр",
            price: 1300,
            brand: "Игровые",
            image: "https://img.honor.com/eu/pub/media/catalog/product/p/a/pad9-pro-gray-01.jpg?width=600&height=600&canvas=600,600",
            desc: "Игровой планшет, Dimensity 8100, 120 Гц, 12.1\", 8 ГБ RAM."
        },
        {
            id: 1298,
            name: "Планшет Teclast T60 для игр",
            price: 750,
            brand: "Игровые",
            image: "https://img.teclast.com/images/t60-gray-01.jpg",
            desc: "Игровой планшет, Unisoc T616, 12\" 2K, 8 ГБ RAM, 256 ГБ, 4G."
        },
        {
            id: 1299,
            name: "Планшет Blackview Tab 18 для игр",
            price: 700,
            brand: "Игровые",
            image: "https://img.blackview.com/products/tab18/tab18-gray-01.jpg",
            desc: "Игровой планшет, Helio G99, 12\" 2K, 8 ГБ RAM, 256 ГБ, 8800 мАч."
        },
        {
            id: 1300,
            name: "Планшет TCL Tab Pro 5G для игр",
            price: 950,
            brand: "Игровые",
            image: "https://www.tcl.com/content/dam/tcl/products/tablets/tab-pro-5g/kv.png",
            desc: "Игровой планшет, Snapdragon 480, 12.2\" 2K, 6 ГБ RAM, 128 ГБ, 5G."
        }
    ],

    vacuums: [
        // === Вертикальные пылесосы (10 моделей разных брендов) ===
        {
            id: 901,
            name: "Вертикальный пылесос Dyson V15 Detect Absolute",
            price: 2900,
            brand: "Вертикальные",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Лазерная подсветка пыли, пьезо-датчик, мощное всасывание 240 аВт, до 60 мин работы."
        },
        {
            id: 902,
            name: "Вертикальный пылесос Samsung Jet 90 Complete",
            price: 2100,
            brand: "Вертикальные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Цифровой инверторный мотор, 200 Вт всасывание, 5-слойная фильтрация, 2 аккумулятора."
        },
        {
            id: 903,
            name: "Вертикальный пылесос Xiaomi Mi G10 Plus",
            price: 850,
            brand: "Вертикальные",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Мощность 150 аВт, до 65 мин работы, HEPA фильтр, LCD дисплей, съемный аккумулятор."
        },
        {
            id: 904,
            name: "Вертикальный пылесос LG CordZero A9K-MAX",
            price: 1900,
            brand: "Вертикальные",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Инверторный мотор Smart Inverter, 200 Вт, 2 аккумулятора, зарядная станция с функцией очистки."
        },
        {
            id: 905,
            name: "Вертикальный пылесос Philips 8000 Series XC8149",
            price: 1100,
            brand: "Вертикальные",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Технология PowerCyclone 8, 150 Вт, до 65 мин, съемный аккумулятор, HEPA фильтр."
        },
        {
            id: 906,
            name: "Вертикальный пылесос Dreame T20",
            price: 950,
            brand: "Вертикальные",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Мощность 190 аВт, до 65 мин, OLED дисплей, HEPA фильтр, лазерная подсветка."
        },
        {
            id: 907,
            name: "Вертикальный пылесос Tefal X-Force Flex 11.60",
            price: 1200,
            brand: "Вертикальные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Технология Flex, 200 Вт, до 45 мин, 2 режима, HEPA фильтр."
        },
        {
            id: 908,
            name: "Вертикальный пылесос Bosch Unlimited 7 BCS71111",
            price: 900,
            brand: "Вертикальные",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Мощность 100 Вт, до 40 мин, съемный аккумулятор, HEPA фильтр, насадка для щелей."
        },
        {
            id: 909,
            name: "Вертикальный пылесос Deerma VC20",
            price: 350,
            brand: "Вертикальные",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Мощность 120 Вт, до 30 мин, съемный аккумулятор, 2 режима, HEPA фильтр."
        },
        {
            id: 910,
            name: "Вертикальный пылесос Karcher VC 6",
            price: 650,
            brand: "Вертикальные",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Мощность 150 Вт, до 40 мин, съемный аккумулятор, HEPA фильтр, насадка для пола."
        },

        // === Моющие пылесосы (10 моделей разных брендов) ===
        {
            id: 911,
            name: "Моющий пылесос Karcher SE 4001",
            price: 1200,
            brand: "Моющие",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Экстрактор для сухой и влажной уборки, 1400 Вт, 18 л, уборка жидкостей."
        },
        {
            id: 912,
            name: "Моющий пылесос Thomas Aqua Pet & Family",
            price: 950,
            brand: "Моющие",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Аквафильтр, 1600 Вт, 4 л для воды, насадки для мебели и щелей."
        },
        {
            id: 913,
            name: "Моющий пылесос Zelmer Aquawelt 34Z010",
            price: 600,
            brand: "Моющие",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Аквафильтр, 1400 Вт, 2 л для воды, 5 ступеней фильтрации, насадки."
        },
        {
            id: 914,
            name: "Моющий пылесос Miele Blizzard CX1 Excellence",
            price: 1400,
            brand: "Моющие",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Вихревая технология, 890 Вт, 2 л контейнер, HEPA фильтр, насадки."
        },
        {
            id: 915,
            name: "Моющий пылесос Philips SpeedPro Max Aqua",
            price: 800,
            brand: "Моющие",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "2-в-1 вертикальный и моющий, 350 Вт, до 50 мин, съемный аккумулятор."
        },
        {
            id: 916,
            name: "Моющий пылесос VAX SpotWash Home",
            price: 550,
            brand: "Моющие",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Портативный моющий пылесос для пятен, 700 Вт, 4 л бак, насадки."
        },
        {
            id: 917,
            name: "Моющий пылесос Bissell CrossWave X7",
            price: 1100,
            brand: "Моющие",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Моет и пылесосит одновременно, 560 Вт, до 30 мин, самоочистка."
        },
        {
            id: 918,
            name: "Моющий пылесос Tineco Floor One S5",
            price: 950,
            brand: "Моющие",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Смарт-пылесос для пола, iLoop технология, до 35 мин, самоочистка."
        },
        {
            id: 919,
            name: "Моющий пылесос Hyla EST",
            price: 3200,
            brand: "Моющие",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Аквафильтр, 900 Вт, 5 л, очистка воздуха, ароматизация, премиум."
        },
        {
            id: 920,
            name: "Моющий пылесос Samsung VS20B95993W",
            price: 1800,
            brand: "Моющие",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Вертикальный моющий, 200 Вт, 2 аккумулятора, зарядная станция с очисткой."
        },

        // === Dreame (10 моделей) ===
        {
            id: 921,
            name: "Робот-пылесос Dreame L10s Pro Ultra",
            price: 1800,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Лазерная навигация, 5500 Па, моет, самоочистка, сушка, подогрев воды."
        },
        {
            id: 922,
            name: "Робот-пылесос Dreame Bot W10 Pro",
            price: 1400,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Моющий робот, 4000 Па, самоочистка, 3D навигация, 5200 мАч."
        },
        {
            id: 923,
            name: "Вертикальный пылесос Dreame T30",
            price: 850,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Мощность 190 аВт, до 65 мин, OLED дисплей, HEPA, лазерная подсветка."
        },
        {
            id: 924,
            name: "Робот-пылесос Dreame D9 Max",
            price: 750,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Лазерная навигация, 4000 Па, 5200 мАч, 150 мин работы, приложение."
        },
        {
            id: 925,
            name: "Вертикальный пылесос Dreame H12 Pro",
            price: 1100,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Моющий вертикальный, 9000 Па, самоочистка, сушка, до 35 мин."
        },
        {
            id: 926,
            name: "Робот-пылесос Dreame F9",
            price: 550,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Гироскопическая навигация, 2500 Па, 5200 мАч, 150 мин, приложение."
        },
        {
            id: 927,
            name: "Вертикальный пылесос Dreame V16",
            price: 950,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Мощность 210 аВт, до 85 мин, LCD дисплей, лазерная подсветка."
        },
        {
            id: 928,
            name: "Робот-пылесос Dreame L20 Ultra",
            price: 2400,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Флагманский робот, 7000 Па, моет, самоочистка, сушка, подогрев воды."
        },
        {
            id: 929,
            name: "Вертикальный пылесос Dreame V11",
            price: 700,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Мощность 150 аВт, до 60 мин, LED дисплей, HEPA, 5 ступеней фильтрации."
        },
        {
            id: 930,
            name: "Робот-пылесос Dreame Z10 Pro",
            price: 1050,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Лазерная навигация, 4000 Па, самоочистка, 5200 мАч, моет."
        },

        // === Недорогие пылесосы (10 моделей разных брендов) ===
        {
            id: 931,
            name: "Пылесос Polaris PVB 1835",
            price: 150,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Бюджетный пылесос, 1800 Вт, циклонный фильтр, контейнер 2 л, насадки."
        },
        {
            id: 932,
            name: "Пылесос VITEK VT-1833",
            price: 180,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Циклонный фильтр, 2000 Вт, контейнер 2 л, регулятор мощности, насадки."
        },
        {
            id: 933,
            name: "Пылесос Scarlett SC-1086",
            price: 120,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Бюджетный пылесос, 1600 Вт, контейнер 1.5 л, циклонная система, насадки."
        },
        {
            id: 934,
            name: "Пылесос Mystery MVC-1832",
            price: 140,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Циклонный фильтр, 1800 Вт, контейнер 2 л, регулятор мощности, насадки."
        },
        {
            id: 935,
            name: "Пылесос Deerma DX700",
            price: 200,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Вертикальный беспроводной, 400 Вт, до 25 мин, циклонный фильтр, HEPA."
        },
        {
            id: 936,
            name: "Пылесос Kitfort KT-524",
            price: 220,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Вертикальный беспроводной, 120 Вт, до 30 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 937,
            name: "Пылесос Hyundai H-VC301",
            price: 160,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Циклонный фильтр, 2000 Вт, контейнер 2 л, регулятор мощности, насадки."
        },
        {
            id: 938,
            name: "Пылесос Supra VCS-1698",
            price: 130,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Бюджетный пылесос, 1600 Вт, контейнер 1.5 л, циклонная система."
        },
        {
            id: 939,
            name: "Пылесос Saturn ST-VC7219",
            price: 110,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Пылесос с мешком, 1800 Вт, мешок 3 л, регулятор мощности, насадки."
        },
        {
            id: 940,
            name: "Пылесос BBK BV1202",
            price: 170,
            brand: "Недорогие",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Циклонный фильтр, 2000 Вт, контейнер 2 л, HEPA фильтр, насадки."
        },

        // === Samsung пылесосы (10 моделей) ===
        {
            id: 941,
            name: "Робот-пылесос Samsung Jet Bot+ VR50T95731W",
            price: 2100,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Лазерная навигация, 30 Вт всасывание, LiDAR, моет, самоочистка, SmartThings."
        },
        {
            id: 942,
            name: "Вертикальный пылесос Samsung Jet 90 Complete",
            price: 2100,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Цифровой инверторный мотор, 200 Вт всасывание, 5-слойная фильтрация, 2 аккумулятора."
        },
        {
            id: 943,
            name: "Робот-пылесос Samsung POWERbot R7070",
            price: 1100,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Циклонный фильтр, 10 Вт всасывание, FullView Sensor, SmartThings."
        },
        {
            id: 944,
            name: "Вертикальный пылесос Samsung Jet 75 Complete",
            price: 1600,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Инверторный мотор, 150 Вт всасывание, 2 аккумулятора, зарядная станция."
        },
        {
            id: 945,
            name: "Пылесос Samsung SC4520",
            price: 350,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Циклонный фильтр, 2000 Вт, контейнер 1.5 л, насадки для пола и щелей."
        },
        {
            id: 946,
            name: "Вертикальный пылесос Samsung Bespoke Jet AI",
            price: 2800,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Флагманский вертикальный, 280 Вт, AI, зарядная станция с самоочисткой."
        },
        {
            id: 947,
            name: "Робот-пылесос Samsung POWERbot R7200",
            price: 1300,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Циклонный фильтр, 20 Вт, Edge Clean Master, SmartThings, моет."
        },
        {
            id: 948,
            name: "Пылесос Samsung SC8839",
            price: 450,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Циклонный фильтр, 2200 Вт, контейнер 2 л, HEPA фильтр, насадки."
        },
        {
            id: 949,
            name: "Вертикальный пылесос Samsung Jet 60",
            price: 900,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Инверторный мотор, 100 Вт всасывание, до 40 мин, съемный аккумулятор."
        },
        {
            id: 950,
            name: "Робот-пылесос Samsung Jet Bot AI+",
            price: 2600,
            brand: "SAMSUNG",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "AI распознавание объектов, LiDAR, самоочистка, моет, SmartThings."
        },

        // === Karcher (10 моделей) ===
        {
            id: 951,
            name: "Пылесос Karcher VC 6 Cordless",
            price: 650,
            brand: "Karcher",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Вертикальный беспроводной, 150 Вт, до 40 мин, HEPA, насадка для пола."
        },
        {
            id: 952,
            name: "Моющий пылесос Karcher SE 4001",
            price: 1200,
            brand: "Karcher",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Экстрактор для сухой и влажной уборки, 1400 Вт, 18 л, уборка жидкостей."
        },
        {
            id: 953,
            name: "Пылесос Karcher WD 3",
            price: 450,
            brand: "Karcher",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Пылесос для сухой и влажной уборки, 1000 Вт, 17 л, выдув, насадки."
        },
        {
            id: 954,
            name: "Пылесос Karcher VC 4 Cordless",
            price: 550,
            brand: "Karcher",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Вертикальный беспроводной, 120 Вт, до 30 мин, HEPA, 2 в 1."
        },
        {
            id: 955,
            name: "Пылесос Karcher WD 5",
            price: 650,
            brand: "Karcher",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Сухая и влажная уборка, 1800 Вт, 25 л, выдув, система фильтрации."
        },
        {
            id: 956,
            name: "Пылесос Karcher VC 2",
            price: 350,
            brand: "Karcher",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Циклонный фильтр, 700 Вт, контейнер 0.9 л, насадки, компактный."
        },
        {
            id: 957,
            name: "Моющий пылесос Karcher Puzzi 10.8",
            price: 900,
            brand: "Karcher",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Портативный моющий пылесос, 10.8 В, для пятен и обивки."
        },
        {
            id: 958,
            name: "Пылесос Karcher WD 6",
            price: 750,
            brand: "Karcher",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Сухая и влажная уборка, 1800 Вт, 30 л, выдув, насадки для пола."
        },
        {
            id: 959,
            name: "Пылесос Karcher VC 5",
            price: 500,
            brand: "Karcher",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Циклонный фильтр, 800 Вт, контейнер 1.2 л, насадки, HEPA."
        },
        {
            id: 960,
            name: "Пылесос Karcher NT 22/1",
            price: 850,
            brand: "Karcher",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Профессиональный пылесос, 1380 Вт, 22 л, сухая уборка, насадки."
        },

        // === Вертикальные с влажным типом уборки (10 моделей) ===
        {
            id: 961,
            name: "Вертикальный пылесос Tineco Floor One S5",
            price: 950,
            brand: "Вертикальные с влажным типом уборки",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Смарт-пылесос для пола, iLoop технология, до 35 мин, самоочистка."
        },
        {
            id: 962,
            name: "Вертикальный пылесос Dreame H12 Pro",
            price: 1100,
            brand: "Вертикальные с влажным типом уборки",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Моющий вертикальный, 9000 Па, самоочистка, сушка, до 35 мин."
        },
        {
            id: 963,
            name: "Вертикальный пылесос Roborock Dyad Pro",
            price: 1200,
            brand: "Вертикальные с влажным типом уборки",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Моющий пылесос, 17 000 Па, самоочистка, сушка, до 35 мин."
        },
        {
            id: 964,
            name: "Вертикальный пылесос Hizero F803",
            price: 1300,
            brand: "Вертикальные с влажным типом уборки",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Уникальная технология разделения мусора и воды, до 60 мин."
        },
        {
            id: 965,
            name: "Вертикальный пылесос Philips SpeedPro Max Aqua",
            price: 800,
            brand: "Вертикальные с влажным типом уборки",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "2-в-1 вертикальный и моющий, 350 Вт, до 50 мин, съемный аккумулятор."
        },
        {
            id: 966,
            name: "Вертикальный пылесос Bissell CrossWave X7",
            price: 1100,
            brand: "Вертикальные с влажным типом уборки",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Моет и пылесосит одновременно, 560 Вт, до 30 мин, самоочистка."
        },
        {
            id: 967,
            name: "Вертикальный пылесос Karcher FC 7",
            price: 800,
            brand: "Вертикальные с влажным типом уборки",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Напольная электрическая щетка, 460 Вт, 2 ролика, до 120 мин."
        },
        {
            id: 968,
            name: "Вертикальный пылесос Vileda Windomatic Pro",
            price: 700,
            brand: "Вертикальные с влажным типом уборки",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Моющий пылесос, 120 Вт, до 30 мин, съемный аккумулятор, насадки."
        },
        {
            id: 969,
            name: "Вертикальный пылесос Xiaomi Mi Handheld Wet and Dry",
            price: 600,
            brand: "Вертикальные с влажным типом уборки",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Моющий вертикальный, 150 Вт, до 30 мин, самоочистка, LED дисплей."
        },
        {
            id: 970,
            name: "Вертикальный пылесос Midea H7",
            price: 550,
            brand: "Вертикальные с влажным типом уборки",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Моющий вертикальный, 200 Вт, до 35 мин, самоочистка, HEPA."
        },

        // === Вертикальные беспроводные (10 моделей разных брендов) ===
        {
            id: 971,
            name: "Вертикальный беспроводной пылесос Dyson V15 Detect",
            price: 2900,
            brand: "Вертикальные беспроводные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Беспроводной, 240 аВт, до 60 мин, лазерная подсветка, LCD дисплей."
        },
        {
            id: 972,
            name: "Вертикальный беспроводной пылесос Samsung Jet 90",
            price: 2100,
            brand: "Вертикальные беспроводные",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Беспроводной, 200 Вт всасывание, 2 аккумулятора, зарядная станция."
        },
        {
            id: 973,
            name: "Вертикальный беспроводной пылесос Xiaomi G10 Plus",
            price: 850,
            brand: "Вертикальные беспроводные",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Беспроводной, 150 аВт, до 65 мин, LCD дисплей, HEPA, съемный аккумулятор."
        },
        {
            id: 974,
            name: "Вертикальный беспроводной пылесос LG CordZero A9K",
            price: 1900,
            brand: "Вертикальные беспроводные",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Беспроводной, 200 Вт, 2 аккумулятора, зарядная станция с функцией очистки."
        },
        {
            id: 975,
            name: "Вертикальный беспроводной пылесос Philips 8000 Series",
            price: 1100,
            brand: "Вертикальные беспроводные",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Беспроводной, 150 Вт, до 65 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 976,
            name: "Вертикальный беспроводной пылесос Dreame T30",
            price: 850,
            brand: "Вертикальные беспроводные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Беспроводной, 190 аВт, до 65 мин, OLED, лазерная подсветка."
        },
        {
            id: 977,
            name: "Вертикальный беспроводной пылесос Bosch Unlimited 7",
            price: 900,
            brand: "Вертикальные беспроводные",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Беспроводной, 100 Вт, до 40 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 978,
            name: "Вертикальный беспроводной пылесос Tefal X-Force Flex",
            price: 1200,
            brand: "Вертикальные беспроводные",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Беспроводной, 200 Вт, до 45 мин, технология Flex, HEPA."
        },
        {
            id: 979,
            name: "Вертикальный беспроводной пылесос Karcher VC 6",
            price: 650,
            brand: "Вертикальные беспроводные",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Беспроводной, 150 Вт, до 40 мин, HEPA, насадка для пола."
        },
        {
            id: 980,
            name: "Вертикальный беспроводной пылесос Deerma VC20",
            price: 350,
            brand: "Вертикальные беспроводные",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Беспроводной, 120 Вт, до 30 мин, съемный аккумулятор, HEPA."
        },

        // === Polaris (10 моделей) ===
        {
            id: 981,
            name: "Пылесос Polaris PVB 1835",
            price: 150,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Циклонный фильтр, 1800 Вт, контейнер 2 л, регулятор мощности, насадки."
        },
        {
            id: 982,
            name: "Вертикальный пылесос Polaris PVCS 1825",
            price: 350,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Вертикальный беспроводной, 120 Вт, до 30 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 983,
            name: "Робот-пылесос Polaris PVCR 1025",
            price: 450,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Робот-пылесос, 25 Вт, до 120 мин, навигация по датчикам, приложение."
        },
        {
            id: 984,
            name: "Пылесос Polaris PVB 1850",
            price: 200,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Циклонный фильтр, 2000 Вт, контейнер 2.5 л, регулятор мощности, HEPA."
        },
        {
            id: 985,
            name: "Вертикальный пылесос Polaris PVCS 1920",
            price: 400,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Вертикальный беспроводной, 150 Вт, до 35 мин, 2 режима, HEPA."
        },
        {
            id: 986,
            name: "Робот-пылесос Polaris PVCR 0726",
            price: 300,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Робот-пылесос, 20 Вт, до 100 мин, навигация по датчикам, пульт."
        },
        {
            id: 987,
            name: "Пылесос Polaris PVB 1605",
            price: 120,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Циклонный фильтр, 1600 Вт, контейнер 1.5 л, регулятор мощности."
        },
        {
            id: 988,
            name: "Вертикальный пылесос Polaris PVCS 1720",
            price: 300,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Вертикальный беспроводной, 100 Вт, до 25 мин, съемный аккумулятор."
        },
        {
            id: 989,
            name: "Робот-пылесос Polaris PVCR 0930",
            price: 550,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Робот-пылесос с влажной уборкой, 30 Вт, до 150 мин, приложение."
        },
        {
            id: 990,
            name: "Пылесос Polaris PVB 2005",
            price: 250,
            brand: "POLARIS",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Циклонный фильтр, 2200 Вт, контейнер 3 л, HEPA, регулятор мощности."
        },

        // === Dyson (10 моделей) ===
        {
            id: 991,
            name: "Вертикальный пылесос Dyson V15 Detect Absolute",
            price: 2900,
            brand: "DYSON",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Лазерная подсветка пыли, пьезо-датчик, мощное всасывание 240 аВт, до 60 мин работы."
        },
        {
            id: 992,
            name: "Вертикальный пылесос Dyson V11 Absolute Pro",
            price: 2400,
            brand: "DYSON",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "LCD дисплей, 185 аВт, до 60 мин, 3 режима, HEPA, насадки."
        },
        {
            id: 993,
            name: "Вертикальный пылесос Dyson V8 Absolute",
            price: 1600,
            brand: "DYSON",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "115 аВт, до 40 мин, 2 режима, HEPA, насадки для пола и щелей."
        },
        {
            id: 994,
            name: "Вертикальный пылесос Dyson V12 Detect Slim",
            price: 2100,
            brand: "DYSON",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Лазерная подсветка, 150 аВт, до 50 мин, LCD дисплей, легкий."
        },
        {
            id: 995,
            name: "Пылесос Dyson Ball Animal 3",
            price: 1400,
            brand: "DYSON",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Проводной пылесос для животных, 200 Вт всасывание, технология Ball."
        },
        {
            id: 996,
            name: "Вертикальный пылесос Dyson Outsize Absolute+",
            price: 3200,
            brand: "DYSON",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Увеличенный контейнер, 260 аВт, до 60 мин, 2 аккумулятора."
        },
        {
            id: 997,
            name: "Вертикальный пылесос Dyson V10 Absolute",
            price: 1800,
            brand: "DYSON",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "140 аВт, до 60 мин, 3 режима, HEPA, насадки для всех поверхностей."
        },
        {
            id: 998,
            name: "Пылесос Dyson Cinetic Big Ball Animal",
            price: 1600,
            brand: "DYSON",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Проводной пылесос, технология Cinetic, самоочистка, HEPA."
        },
        {
            id: 999,
            name: "Вертикальный пылесос Dyson V7 Motorhead",
            price: 1100,
            brand: "DYSON",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "100 аВт, до 30 мин, 2 режима, насадки для пола и щелей."
        },
        {
            id: 1000,
            name: "Вертикальный пылесос Dyson Gen5detect",
            price: 3500,
            brand: "DYSON",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Новейший флагман, 280 аВт, до 70 мин, лазер, LCD дисплей, HEPA."
        },

        // === LG пылесосы (10 моделей) ===
        {
            id: 1001,
            name: "Вертикальный пылесос LG CordZero A9K-MAX",
            price: 1900,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Инверторный мотор Smart Inverter, 200 Вт, 2 аккумулятора, зарядная станция с функцией очистки."
        },
        {
            id: 1002,
            name: "Робот-пылесос LG R9 MAX",
            price: 1700,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Лазерная навигация, 80 Вт всасывание, моет, SmartThinQ, 2 аккумулятора."
        },
        {
            id: 1003,
            name: "Вертикальный пылесос LG CordZero A9K-CORE",
            price: 1400,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Инверторный мотор, 160 Вт, 2 аккумулятора, зарядная станция, насадки."
        },
        {
            id: 1004,
            name: "Робот-пылесос LG R8",
            price: 1200,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Лазерная навигация, 60 Вт всасывание, моет, SmartThinQ, приложение."
        },
        {
            id: 1005,
            name: "Вертикальный пылесос LG CordZero A9K-ULTRA",
            price: 2200,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Флагманский вертикальный, 220 Вт, 2 аккумулятора, станция с самоочисткой."
        },
        {
            id: 1006,
            name: "Пылесос LG VK89581HU",
            price: 550,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Проводной пылесос, 2000 Вт, контейнер 2 л, циклонный фильтр, насадки."
        },
        {
            id: 1007,
            name: "Робот-пылесос LG R7",
            price: 800,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Навигация по датчикам, 40 Вт всасывание, моет, SmartThinQ, приложение."
        },
        {
            id: 1008,
            name: "Вертикальный пылесос LG CordZero A9K-PRIME",
            price: 1650,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Инверторный мотор, 180 Вт, 2 аккумулятора, зарядная станция."
        },
        {
            id: 1009,
            name: "Пылесос LG VK89185HU",
            price: 450,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Проводной пылесос, 1800 Вт, контейнер 1.5 л, циклонный фильтр, HEPA."
        },
        {
            id: 1010,
            name: "Робот-пылесос LG R5",
            price: 600,
            brand: "LG",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Навигация по датчикам, 30 Вт всасывание, моет, SmartThinQ, приложение."
        },

        // === Xiaomi пылесосы (10 моделей) ===
        {
            id: 1011,
            name: "Робот-пылесос Xiaomi Robot Vacuum S10",
            price: 850,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Лазерная навигация LDS, мощность 4000 Па, сухая и влажная уборка."
        },
        {
            id: 1012,
            name: "Вертикальный пылесос Xiaomi Mi G10 Plus",
            price: 850,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Мощность 150 аВт, до 65 мин работы, HEPA фильтр, LCD дисплей, съемный аккумулятор."
        },
        {
            id: 1013,
            name: "Робот-пылесос Xiaomi Mi Robot Vacuum Mop 2 Pro",
            price: 750,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Лазерная навигация, 3000 Па, моет, приложение Mi Home, 5200 мАч."
        },
        {
            id: 1014,
            name: "Вертикальный пылесос Xiaomi Mi G9",
            price: 600,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Мощность 120 аВт, до 50 мин, HEPA, 2 режима, съемный аккумулятор."
        },
        {
            id: 1015,
            name: "Робот-пылесос Xiaomi Robot Vacuum X10+",
            price: 1600,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Самоочистка, лазерная навигация, 4000 Па, моет, сушка, 4 л пылесборник."
        },
        {
            id: 1016,
            name: "Вертикальный пылесос Xiaomi Mi G11",
            price: 950,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Мощность 185 аВт, до 65 мин, OLED дисплей, лазерная подсветка."
        },
        {
            id: 1017,
            name: "Робот-пылесос Xiaomi Mi Robot Vacuum Mop 2",
            price: 550,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Гироскопическая навигация, 2200 Па, моет, приложение Mi Home."
        },
        {
            id: 1018,
            name: "Вертикальный пылесос Xiaomi Mi G10",
            price: 700,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Мощность 140 аВт, до 60 мин, HEPA, 2 режима, съемный аккумулятор."
        },
        {
            id: 1019,
            name: "Робот-пылесос Xiaomi Robot Vacuum S20",
            price: 950,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Лазерная навигация, 4000 Па, моет, 3D навигация, приложение."
        },
        {
            id: 1020,
            name: "Вертикальный пылесос Xiaomi Mi Handheld Vacuum",
            price: 400,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Ручной пылесос, 130 Вт, до 30 мин, HEPA, насадки, компактный."
        },

        // === Моющие вертикальные пылесосы (10 моделей) ===
        {
            id: 1021,
            name: "Моющий вертикальный пылесос Dreame H12 Pro",
            price: 1100,
            brand: "Моющие вертикальные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Моющий вертикальный, 9000 Па, самоочистка, сушка, до 35 мин."
        },
        {
            id: 1022,
            name: "Моющий вертикальный пылесос Tineco Floor One S5",
            price: 950,
            brand: "Моющие вертикальные",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Смарт-пылесос для пола, iLoop технология, до 35 мин, самоочистка."
        },
        {
            id: 1023,
            name: "Моющий вертикальный пылесос Roborock Dyad Pro",
            price: 1200,
            brand: "Моющие вертикальные",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Моющий пылесос, 17 000 Па, самоочистка, сушка, до 35 мин."
        },
        {
            id: 1024,
            name: "Моющий вертикальный пылесос Hizero F803",
            price: 1300,
            brand: "Моющие вертикальные",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Уникальная технология разделения мусора и воды, до 60 мин."
        },
        {
            id: 1025,
            name: "Моющий вертикальный пылесос Bissell CrossWave X7",
            price: 1100,
            brand: "Моющие вертикальные",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Моет и пылесосит одновременно, 560 Вт, до 30 мин, самоочистка."
        },
        {
            id: 1026,
            name: "Моющий вертикальный пылесос Karcher FC 7",
            price: 800,
            brand: "Моющие вертикальные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Напольная электрическая щетка, 460 Вт, 2 ролика, до 120 мин."
        },
        {
            id: 1027,
            name: "Моющий вертикальный пылесос Philips SpeedPro Max Aqua",
            price: 800,
            brand: "Моющие вертикальные",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "2-в-1 вертикальный и моющий, 350 Вт, до 50 мин, съемный аккумулятор."
        },
        {
            id: 1028,
            name: "Моющий вертикальный пылесос Vileda Windomatic Pro",
            price: 700,
            brand: "Моющие вертикальные",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Моющий пылесос, 120 Вт, до 30 мин, съемный аккумулятор, насадки."
        },
        {
            id: 1029,
            name: "Моющий вертикальный пылесос Xiaomi Mi Handheld Wet and Dry",
            price: 600,
            brand: "Моющие вертикальные",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Моющий вертикальный, 150 Вт, до 30 мин, самоочистка, LED дисплей."
        },
        {
            id: 1030,
            name: "Моющий вертикальный пылесос Midea H7",
            price: 550,
            brand: "Моющие вертикальные",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Моющий вертикальный, 200 Вт, до 35 мин, самоочистка, HEPA."
        },

        // === Tefal (10 моделей) ===
        {
            id: 1031,
            name: "Вертикальный пылесос Tefal X-Force Flex 11.60",
            price: 1200,
            brand: "Tefal",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Технология Flex, 200 Вт, до 45 мин, 2 режима, HEPA фильтр."
        },
        {
            id: 1032,
            name: "Вертикальный пылесос Tefal Air Force 360 Flex",
            price: 950,
            brand: "Tefal",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "360° поворотная насадка, 150 Вт, до 40 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1033,
            name: "Вертикальный пылесос Tefal X-Force Flex 15.60",
            price: 1400,
            brand: "Tefal",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Флагманский вертикальный, 220 Вт, до 55 мин, технология Flex, LED дисплей."
        },
        {
            id: 1034,
            name: "Вертикальный пылесос Tefal Air Force Light",
            price: 700,
            brand: "Tefal",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Легкий вертикальный, 120 Вт, до 35 мин, 2 режима, HEPA, съемный аккумулятор."
        },
        {
            id: 1035,
            name: "Пылесос Tefal Easy Bag Compact",
            price: 350,
            brand: "Tefal",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Компактный пылесос с мешком, 750 Вт, мешок 3 л, насадки, HEPA."
        },
        {
            id: 1036,
            name: "Вертикальный пылесос Tefal X-Force Power 11.60",
            price: 1000,
            brand: "Tefal",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Мощность 180 Вт, до 45 мин, 2 аккумулятора, HEPA, насадки."
        },
        {
            id: 1037,
            name: "Вертикальный пылесос Tefal Air Force Compact",
            price: 600,
            brand: "Tefal",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Компактный вертикальный, 100 Вт, до 30 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1038,
            name: "Пылесос Tefal Silent Force EC",
            price: 450,
            brand: "Tefal",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Тихий пылесос, 800 Вт, контейнер 1.5 л, циклонный фильтр, HEPA."
        },
        {
            id: 1039,
            name: "Вертикальный пылесос Tefal X-Force Flex 14.60",
            price: 1300,
            brand: "Tefal",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Технология Flex, 200 Вт, до 50 мин, 2 аккумулятора, LED дисплей."
        },
        {
            id: 1040,
            name: "Вертикальный пылесос Tefal Air Force 360",
            price: 800,
            brand: "Tefal",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "360° поворотная насадка, 130 Вт, до 35 мин, HEPA, съемный аккумулятор."
        },

        // === Автомобильные пылесосы (10 моделей разных брендов) ===
        {
            id: 1041,
            name: "Автомобильный пылесос Xiaomi Car Vacuum Cleaner",
            price: 150,
            brand: "Автомобильные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Беспроводной автомобильный, 120 Вт, до 20 мин, USB-C зарядка, HEPA."
        },
        {
            id: 1042,
            name: "Автомобильный пылесос Black+Decker Dustbuster",
            price: 200,
            brand: "Автомобильные",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Беспроводной, 10.8 В, до 15 мин, насадки для щелей, компактный."
        },
        {
            id: 1043,
            name: "Автомобильный пылесос Karcher VC 3",
            price: 250,
            brand: "Автомобильные",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Беспроводной, 10.8 В, до 20 мин, HEPA, насадки, сумка для хранения."
        },
        {
            id: 1044,
            name: "Автомобильный пылесос Bosch UniversalCar",
            price: 220,
            brand: "Автомобильные",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Проводной, 400 Вт, 4 м кабель, насадки для салона, HEPA."
        },
        {
            id: 1045,
            name: "Автомобильный пылесос Deerma VC20 Car",
            price: 120,
            brand: "Автомобильные",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Беспроводной, 120 Вт, до 15 мин, USB-C, насадки, HEPA."
        },
        {
            id: 1046,
            name: "Автомобильный пылесос Kitfort KT-531",
            price: 180,
            brand: "Автомобильные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Беспроводной, 12 В, до 20 мин, насадки для щелей, HEPA."
        },
        {
            id: 1047,
            name: "Автомобильный пылесос Makita DVC750L",
            price: 450,
            brand: "Автомобильные",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Аккумуляторный, 18 В, до 30 мин, для авто и дома, HEPA."
        },
        {
            id: 1048,
            name: "Автомобильный пылесос Dyson Car+Boat",
            price: 600,
            brand: "Автомобильные",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Беспроводной, 100 аВт, до 20 мин, насадки для авто, HEPA."
        },
        {
            id: 1049,
            name: "Автомобильный пылесос Midea MVC-20C",
            price: 160,
            brand: "Автомобильные",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Проводной, 120 Вт, 4 м кабель, насадки, компактный, HEPA."
        },
        {
            id: 1050,
            name: "Автомобильный пылесос Hyundai H-VC202",
            price: 140,
            brand: "Автомобильные",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Проводной, 120 Вт, 3.5 м кабель, насадки, HEPA, компактный."
        },

        // === KITFORT (10 моделей) ===
        {
            id: 1051,
            name: "Вертикальный пылесос Kitfort KT-524",
            price: 220,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Вертикальный беспроводной, 120 Вт, до 30 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1052,
            name: "Робот-пылесос Kitfort KT-533",
            price: 400,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Робот-пылесос, 25 Вт, до 120 мин, навигация по датчикам, пульт."
        },
        {
            id: 1053,
            name: "Пылесос Kitfort KT-517",
            price: 180,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Циклонный фильтр, 2000 Вт, контейнер 2 л, регулятор мощности, HEPA."
        },
        {
            id: 1054,
            name: "Вертикальный пылесос Kitfort KT-537",
            price: 280,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Вертикальный беспроводной, 150 Вт, до 35 мин, 2 режима, HEPA."
        },
        {
            id: 1055,
            name: "Робот-пылесос Kitfort KT-531",
            price: 350,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Робот-пылесос с влажной уборкой, 25 Вт, до 100 мин, пульт."
        },
        {
            id: 1056,
            name: "Пылесос Kitfort KT-503",
            price: 150,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Циклонный фильтр, 1800 Вт, контейнер 1.5 л, регулятор мощности."
        },
        {
            id: 1057,
            name: "Вертикальный пылесос Kitfort KT-549",
            price: 320,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Вертикальный беспроводной, 180 Вт, до 40 мин, LCD дисплей, HEPA."
        },
        {
            id: 1058,
            name: "Робот-пылесос Kitfort KT-544",
            price: 450,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Робот-пылесос с лазерной навигацией, 30 Вт, до 150 мин, приложение."
        },
        {
            id: 1059,
            name: "Пылесос Kitfort KT-525",
            price: 200,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Циклонный фильтр, 2200 Вт, контейнер 2.5 л, HEPA, насадки."
        },
        {
            id: 1060,
            name: "Вертикальный пылесос Kitfort KT-558",
            price: 380,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Вертикальный беспроводной, 200 Вт, до 45 мин, 2 аккумулятора, HEPA."
        },

        // === Строительные пылесосы (10 моделей разных брендов) ===
        {
            id: 1061,
            name: "Строительный пылесос Karcher WD 3",
            price: 450,
            brand: "Строительные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Сухая и влажная уборка, 1000 Вт, 17 л, выдув, насадки для строительной пыли."
        },
        {
            id: 1062,
            name: "Строительный пылесос Makita VC2512",
            price: 600,
            brand: "Строительные",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Профессиональный, 1050 Вт, 25 л, HEPA, автоочистка фильтра."
        },
        {
            id: 1063,
            name: "Строительный пылесос Bosch GAS 15",
            price: 550,
            brand: "Строительные",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Сухая и влажная уборка, 1100 Вт, 15 л, насадки для инструментов."
        },
        {
            id: 1064,
            name: "Строительный пылесос Metabo ASA 25 L PC",
            price: 650,
            brand: "Строительные",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Профессиональный, 1200 Вт, 25 л, HEPA, автоочистка, для бетонной пыли."
        },
        {
            id: 1065,
            name: "Строительный пылесос DeWalt DWV902M",
            price: 800,
            brand: "Строительные",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Профессиональный, 1100 Вт, 20 л, HEPA, автоочистка, для инструментов."
        },
        {
            id: 1066,
            name: "Строительный пылесос Einhell TC-VC 18/15 Li",
            price: 500,
            brand: "Строительные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Аккумуляторный, 18 В, 15 л, сухая и влажная уборка, насадки."
        },
        {
            id: 1067,
            name: "Строительный пылесос Starmix 1425",
            price: 950,
            brand: "Строительные",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Профессиональный, 1400 Вт, 25 л, HEPA, автоочистка, для бетонной пыли."
        },
        {
            id: 1068,
            name: "Строительный пылесос Festool CLEANTEC CT 26",
            price: 1500,
            brand: "Строительные",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Премиум профессиональный, 1200 Вт, 26 л, HEPA, автоочистка, Bluetooth."
        },
        {
            id: 1069,
            name: "Строительный пылесос Stanley ST-DS20",
            price: 400,
            brand: "Строительные",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Сухая и влажная уборка, 1000 Вт, 20 л, насадки, для строительной пыли."
        },
        {
            id: 1070,
            name: "Строительный пылесос Hitachi RP20Y",
            price: 550,
            brand: "Строительные",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Профессиональный, 1000 Вт, 20 л, HEPA, автоочистка, для инструментов."
        },

        // === Вертикальные с сухим типом уборки (10 моделей разных брендов) ===
        {
            id: 1071,
            name: "Вертикальный пылесос Dyson V15 Detect Absolute",
            price: 2900,
            brand: "Вертикальные с сухим типом уборки",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Сухая уборка, лазерная подсветка, 240 аВт, до 60 мин, HEPA."
        },
        {
            id: 1072,
            name: "Вертикальный пылесос Samsung Jet 90",
            price: 2100,
            brand: "Вертикальные с сухим типом уборки",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Сухая уборка, инверторный мотор, 200 Вт, 2 аккумулятора, HEPA."
        },
        {
            id: 1073,
            name: "Вертикальный пылесос Xiaomi G10 Plus",
            price: 850,
            brand: "Вертикальные с сухим типом уборки",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Сухая уборка, 150 аВт, до 65 мин, LCD дисплей, HEPA."
        },
        {
            id: 1074,
            name: "Вертикальный пылесос LG CordZero A9K-MAX",
            price: 1900,
            brand: "Вертикальные с сухим типом уборки",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Сухая уборка, инверторный мотор, 200 Вт, 2 аккумулятора, станция."
        },
        {
            id: 1075,
            name: "Вертикальный пылесос Philips 8000 Series",
            price: 1100,
            brand: "Вертикальные с сухим типом уборки",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Сухая уборка, 150 Вт, до 65 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1076,
            name: "Вертикальный пылесос Dreame T30",
            price: 850,
            brand: "Вертикальные с сухим типом уборки",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Сухая уборка, 190 аВт, до 65 мин, OLED, лазерная подсветка."
        },
        {
            id: 1077,
            name: "Вертикальный пылесос Bosch Unlimited 7",
            price: 900,
            brand: "Вертикальные с сухим типом уборки",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Сухая уборка, 100 Вт, до 40 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1078,
            name: "Вертикальный пылесос Tefal X-Force Flex 11.60",
            price: 1200,
            brand: "Вертикальные с сухим типом уборки",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Сухая уборка, 200 Вт, до 45 мин, технология Flex, HEPA."
        },
        {
            id: 1079,
            name: "Вертикальный пылесос Karcher VC 6",
            price: 650,
            brand: "Вертикальные с сухим типом уборки",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Сухая уборка, 150 Вт, до 40 мин, HEPA, насадка для пола."
        },
        {
            id: 1080,
            name: "Вертикальный пылесос Deerma VC20",
            price: 350,
            brand: "Вертикальные с сухим типом уборки",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Сухая уборка, 120 Вт, до 30 мин, съемный аккумулятор, HEPA."
        },

        // === DEERMA (10 моделей) ===
        {
            id: 1081,
            name: "Вертикальный пылесос Deerma VC20",
            price: 350,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Вертикальный беспроводной, 120 Вт, до 30 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1082,
            name: "Робот-пылесос Deerma RM 300",
            price: 300,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Робот-пылесос, 20 Вт, до 100 мин, навигация по датчикам, пульт."
        },
        {
            id: 1083,
            name: "Вертикальный пылесос Deerma DX700",
            price: 200,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Вертикальный беспроводной, 400 Вт, до 25 мин, циклонный фильтр, HEPA."
        },
        {
            id: 1084,
            name: "Робот-пылесос Deerma RM 400",
            price: 400,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Робот-пылесос с влажной уборкой, 25 Вт, до 120 мин, приложение."
        },
        {
            id: 1085,
            name: "Вертикальный пылесос Deerma VC30",
            price: 450,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Вертикальный беспроводной, 150 Вт, до 35 мин, HEPA, 2 режима."
        },
        {
            id: 1086,
            name: "Робот-пылесос Deerma RM 500",
            price: 500,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Робот-пылесос с лазерной навигацией, 30 Вт, до 150 мин, приложение."
        },
        {
            id: 1087,
            name: "Вертикальный пылесос Deerma VC40",
            price: 550,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Вертикальный беспроводной, 180 Вт, до 40 мин, LCD дисплей, HEPA."
        },
        {
            id: 1088,
            name: "Ручной пылесос Deerma DX118C",
            price: 150,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Ручной автомобильный пылесос, 120 Вт, до 20 мин, USB-C, HEPA."
        },
        {
            id: 1089,
            name: "Робот-пылесос Deerma RM 600",
            price: 600,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Робот-пылесос с лазерной навигацией, 35 Вт, до 180 мин, приложение."
        },
        {
            id: 1090,
            name: "Вертикальный пылесос Deerma VC50",
            price: 650,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Вертикальный беспроводной, 200 Вт, до 45 мин, 2 аккумулятора, HEPA."
        },

        // === BOSCH пылесосы (10 моделей) ===
        {
            id: 1091,
            name: "Вертикальный пылесос Bosch Unlimited 7 BCS71111",
            price: 900,
            brand: "BOSCH",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Вертикальный беспроводной, 100 Вт, до 40 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1092,
            name: "Робот-пылесос Bosch Smart Home",
            price: 1200,
            brand: "BOSCH",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Робот-пылесос с лазерной навигацией, 50 Вт, до 120 мин, приложение."
        },
        {
            id: 1093,
            name: "Пылесос Bosch BGL8SIL2",
            price: 450,
            brand: "BOSCH",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Проводной пылесос, 700 Вт, контейнер 1.5 л, HEPA, насадки."
        },
        {
            id: 1094,
            name: "Вертикальный пылесос Bosch Unlimited 6",
            price: 700,
            brand: "BOSCH",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Вертикальный беспроводной, 80 Вт, до 35 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1095,
            name: "Пылесос Bosch BGL8PRO1",
            price: 550,
            brand: "BOSCH",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Проводной пылесос, 800 Вт, контейнер 2 л, HEPA, насадки для животных."
        },
        {
            id: 1096,
            name: "Вертикальный пылесос Bosch Unlimited 8",
            price: 1100,
            brand: "BOSCH",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Вертикальный беспроводной, 120 Вт, до 50 мин, 2 аккумулятора, HEPA."
        },
        {
            id: 1097,
            name: "Робот-пылесос Bosch Smart Home Pro",
            price: 1500,
            brand: "BOSCH",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Робот-пылесос с лазерной навигацией, 60 Вт, до 150 мин, моет, приложение."
        },
        {
            id: 1098,
            name: "Пылесос Bosch BGS41POW2",
            price: 400,
            brand: "BOSCH",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Проводной пылесос, 650 Вт, мешок 4 л, HEPA, насадки."
        },
        {
            id: 1099,
            name: "Вертикальный пылесос Bosch Unlimited 5",
            price: 600,
            brand: "BOSCH",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Вертикальный беспроводной, 70 Вт, до 30 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1100,
            name: "Пылесос Bosch BGL8VAC1",
            price: 500,
            brand: "BOSCH",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Проводной пылесос, 750 Вт, контейнер 1.8 л, HEPA, насадки."
        },

        // === THOMAS (10 моделей) ===
        {
            id: 1101,
            name: "Моющий пылесос Thomas Aqua Pet & Family",
            price: 950,
            brand: "THOMAS",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Аквафильтр, 1600 Вт, 4 л для воды, насадки для мебели и щелей."
        },
        {
            id: 1102,
            name: "Моющий пылесос Thomas DryBOX+",
            price: 800,
            brand: "THOMAS",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Аквафильтр, 1400 Вт, 2 л для воды, насадки, HEPA."
        },
        {
            id: 1103,
            name: "Моющий пылесос Thomas Perfect Air",
            price: 700,
            brand: "THOMAS",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Аквафильтр, 1400 Вт, 2 л для воды, очистка воздуха, насадки."
        },
        {
            id: 1104,
            name: "Моющий пылесос Thomas Multi Clean",
            price: 850,
            brand: "THOMAS",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Аквафильтр, 1500 Вт, 3 л для воды, насадки для всех поверхностей."
        },
        {
            id: 1105,
            name: "Моющий пылесос Thomas PRO 15",
            price: 1100,
            brand: "THOMAS",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Профессиональный аквафильтр, 1700 Вт, 5 л для воды, насадки, HEPA."
        },
        {
            id: 1106,
            name: "Моющий пылесос Thomas Aqua+",
            price: 750,
            brand: "THOMAS",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Аквафильтр, 1400 Вт, 2.5 л для воды, насадки, HEPA."
        },
        {
            id: 1107,
            name: "Моющий пылесос Thomas Pet & Family PRO",
            price: 1050,
            brand: "THOMAS",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Аквафильтр для животных, 1600 Вт, 4 л для воды, насадки, HEPA."
        },
        {
            id: 1108,
            name: "Моющий пылесос Thomas TWIN",
            price: 650,
            brand: "THOMAS",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Аквафильтр, 1300 Вт, 1.8 л для воды, компактный, насадки."
        },
        {
            id: 1109,
            name: "Моющий пылесос Thomas Smart",
            price: 900,
            brand: "THOMAS",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Аквафильтр, 1500 Вт, 3 л для воды, сенсорное управление, насадки."
        },
        {
            id: 1110,
            name: "Моющий пылесос Thomas Design",
            price: 950,
            brand: "THOMAS",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Аквафильтр, 1500 Вт, 3 л для воды, стильный дизайн, насадки."
        },

        // === PHILIPS пылесосы (10 моделей) ===
        {
            id: 1111,
            name: "Вертикальный пылесос Philips 8000 Series XC8149",
            price: 1100,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Технология PowerCyclone 8, 150 Вт, до 65 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1112,
            name: "Вертикальный пылесос Philips SpeedPro Max Aqua",
            price: 800,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "2-в-1 вертикальный и моющий, 350 Вт, до 50 мин, съемный аккумулятор."
        },
        {
            id: 1113,
            name: "Робот-пылесос Philips HomeRun 2000",
            price: 1200,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Лазерная навигация, 50 Вт всасывание, моет, приложение, 2.5 ч работы."
        },
        {
            id: 1114,
            name: "Вертикальный пылесос Philips 7000 Series",
            price: 900,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "PowerCyclone 7, 130 Вт, до 55 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1115,
            name: "Пылесос Philips PowerPro Compact",
            price: 350,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Циклонный фильтр, 700 Вт, контейнер 1.5 л, HEPA, насадки."
        },
        {
            id: 1116,
            name: "Вертикальный пылесос Philips SpeedPro",
            price: 600,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "PowerCyclone 5, 100 Вт, до 40 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1117,
            name: "Робот-пылесос Philips HomeRun 3000",
            price: 1500,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Лазерная навигация, 60 Вт всасывание, моет, самоочистка, приложение."
        },
        {
            id: 1118,
            name: "Пылесос Philips Performer Ultimate",
            price: 450,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Циклонный фильтр, 800 Вт, контейнер 2 л, HEPA, насадки."
        },
        {
            id: 1119,
            name: "Вертикальный пылесос Philips 6000 Series",
            price: 700,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "PowerCyclone 6, 110 Вт, до 45 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1120,
            name: "Ручной пылесос Philips MiniVac",
            price: 200,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Ручной автомобильный, 100 Вт, до 20 мин, USB-C, насадки."
        },

        // === Haier пылесосы (10 моделей) ===
        {
            id: 1121,
            name: "Вертикальный пылесос Haier HVC-620",
            price: 500,
            brand: "Haier",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Вертикальный беспроводной, 120 Вт, до 35 мин, съемный аккумулятор, HEPA."
        },
        {
            id: 1122,
            name: "Робот-пылесос Haier HR-400",
            price: 600,
            brand: "Haier",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Робот-пылесос с лазерной навигацией, 30 Вт, до 120 мин, приложение."
        },
        {
            id: 1123,
            name: "Пылесос Haier HVC-310",
            price: 300,
            brand: "Haier",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Проводной пылесос, 1800 Вт, контейнер 2 л, HEPA, насадки."
        },
        {
            id: 1124,
            name: "Вертикальный пылесос Haier HVC-720",
            price: 650,
            brand: "Haier",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Вертикальный беспроводной, 150 Вт, до 40 мин, 2 режима, HEPA."
        },
        {
            id: 1125,
            name: "Робот-пылесос Haier HR-500 Pro",
            price: 800,
            brand: "Haier",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Робот-пылесос с лазерной навигацией, 40 Вт, до 150 мин, моет, приложение."
        },
        {
            id: 1126,
            name: "Вертикальный пылесос Haier HVC-820",
            price: 750,
            brand: "Haier",
            image: "https://images.unsplash.com/photo-1597855322744-245c36868673?w=500",
            desc: "Вертикальный беспроводной, 180 Вт, до 45 мин, LCD дисплей, HEPA."
        },
        {
            id: 1127,
            name: "Пылесос Haier HVC-330",
            price: 350,
            brand: "Haier",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Проводной пылесос, 2000 Вт, контейнер 2.5 л, HEPA, насадки."
        },
        {
            id: 1128,
            name: "Робот-пылесос Haier HR-300",
            price: 500,
            brand: "Haier",
            image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500",
            desc: "Робот-пылесос, 25 Вт, до 100 мин, навигация по датчикам, пульт."
        },
        {
            id: 1129,
            name: "Вертикальный пылесос Haier HVC-920",
            price: 850,
            brand: "Haier",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
            desc: "Вертикальный беспроводной, 200 Вт, до 50 мин, 2 аккумулятора, HEPA."
        },
        {
            id: 1130,
            name: "Ручной пылесос Haier HVC-120",
            price: 180,
            brand: "Haier",
            image: "https://images.unsplash.com/photo-1558317374-a3594743e466?w=500",
            desc: "Ручной автомобильный, 100 Вт, до 20 мин, USB-C, насадки."
        }
    ],
    airfryers: [
        // Xiaomi (10 моделей)
        {
            id: 13001,
            name: "Аэрогриль Xiaomi Mi Smart Air Fryer 3.5L",
            price: 300,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Умное управление со смартфона, готовка без масла, 3.5л, OLED-дисплей, 12 программ, приложение Mi Home."
        },
        {
            id: 13002,
            name: "Аэрогриль Xiaomi Mi Smart Air Fryer Pro 4L",
            price: 380,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4л, управление со смартфона, 360° технология, 100 рецептов в приложении, 1500 Вт."
        },
        {
            id: 13003,
            name: "Аэрогриль Xiaomi Mi Smart Air Fryer 3.5L White",
            price: 300,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Белый цвет, OLED-дисплей, 12 программ, управление через Mi Home, 3.5л."
        },
        {
            id: 13004,
            name: "Аэрогриль Xiaomi Mi Smart Air Fryer 5.5L",
            price: 450,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Большой объем 5.5л, сенсорный экран, 12 программ, синхронизация с приложением."
        },
        {
            id: 13005,
            name: "Аэрогриль Xiaomi Mi Smart Air Fryer 3.5L Black",
            price: 300,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Черный цвет, OLED-дисплей, 12 программ, управление со смартфона."
        },
        {
            id: 13006,
            name: "Аэрогриль Xiaomi Mi Smart Air Fryer Pro 4L White",
            price: 380,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Белый цвет, 4л, 1500 Вт, управление через приложение, 360° технология."
        },
        {
            id: 13007,
            name: "Аэрогриль Xiaomi Mi Smart Air Fryer Pro 4L Black",
            price: 380,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Черный цвет, 4л, 1500 Вт, 12 программ, 100 рецептов в приложении."
        },
        {
            id: 13008,
            name: "Аэрогриль Xiaomi Mi Smart Air Fryer 5.5L White",
            price: 450,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Белый цвет, 5.5л, сенсорный экран, 12 программ, управление со смартфона."
        },
        {
            id: 13009,
            name: "Аэрогриль Xiaomi Mi Smart Air Fryer 5.5L Black",
            price: 450,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Черный цвет, 5.5л, сенсорный экран, 12 программ, синхронизация с Mi Home."
        },
        {
            id: 13010,
            name: "Аэрогриль Xiaomi Mi Smart Air Fryer 3.5L Pro",
            price: 330,
            brand: "Xiaomi",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Улучшенная версия, 3.5л, OLED-дисплей, 15 программ, Wi-Fi подключение."
        },

        // TEFAL (10 моделей)
        {
            id: 13011,
            name: "Аэрогриль Tefal Easy Fry Dual 8.3L",
            price: 550,
            brand: "TEFAL",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Две независимые корзины по 4.15л, синхронизация окончания готовки, 8 программ, мощность 2200 Вт."
        },
        {
            id: 13012,
            name: "Аэрогриль Tefal Easy Fry 4.2L",
            price: 380,
            brand: "TEFAL",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.2л, 8 программ, сенсорное управление, технология для хрустящей корочки."
        },
        {
            id: 13013,
            name: "Аэрогриль Tefal Easy Fry Max 6.5L",
            price: 480,
            brand: "TEFAL",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 8 программ, сенсорное управление, для большой семьи."
        },
        {
            id: 13014,
            name: "Аэрогриль Tefal ActiFry Genius XL 1.7kg",
            price: 650,
            brand: "TEFAL",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Мешалка в комплекте, готовка до 1.7 кг картофеля, 12 программ, пароварка."
        },
        {
            id: 13015,
            name: "Аэрогриль Tefal Easy Fry Grill 4.2L",
            price: 420,
            brand: "TEFAL",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "С функцией гриля, 4.2л, 8 программ, съемная решетка для гриля."
        },
        {
            id: 13016,
            name: "Аэрогриль Tefal ActiFry 2in1 1.2kg",
            price: 520,
            brand: "TEFAL",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "2 в 1: аэрогриль и мешалка, до 1.2 кг картофеля, 12 программ."
        },
        {
            id: 13017,
            name: "Аэрогриль Tefal Easy Fry Dual Easy Clean 8.3L",
            price: 580,
            brand: "TEFAL",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Две корзины, съемные покрытия для легкой очистки, 8 программ."
        },
        {
            id: 13018,
            name: "Аэрогриль Tefal Easy Fry Precision 5.5L",
            price: 450,
            brand: "TEFAL",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Точный контроль температуры, 5.5л, 8 программ, сенсорный экран."
        },
        {
            id: 13019,
            name: "Аэрогриль Tefal ActiFry Genius 1.5kg",
            price: 600,
            brand: "TEFAL",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Готовка до 1.5 кг, 12 программ, приложение с рецептами, мешалка."
        },
        {
            id: 13020,
            name: "Аэрогриль Tefal Easy Fry Compact 3.4L",
            price: 320,
            brand: "TEFAL",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Компактный, 3.4л, 8 программ, для маленькой кухни, 1400 Вт."
        },

        // KITFORT (10 моделей)
        {
            id: 13021,
            name: "Аэрогриль Kitfort KT-2241",
            price: 450,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Сенсорное управление, смотровое окно, объем 6.4 литра, 8 программ, 1500 Вт."
        },
        {
            id: 13022,
            name: "Аэрогриль Kitfort KT-2213",
            price: 350,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Объем 5л, механическое управление, 60 минут таймер, 1300 Вт."
        },
        {
            id: 13023,
            name: "Аэрогриль Kitfort KT-2227",
            price: 380,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Объем 5.5л, сенсорное управление, 8 программ, смотровое окно, 1500 Вт."
        },
        {
            id: 13024,
            name: "Аэрогриль Kitfort KT-2254",
            price: 520,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Двойной аэрогриль, две корзины по 3.2л, независимое управление, 8 программ."
        },
        {
            id: 13025,
            name: "Аэрогриль Kitfort KT-2222",
            price: 300,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Объем 3.5л, механическое управление, компактный, 1200 Вт."
        },
        {
            id: 13026,
            name: "Аэрогриль Kitfort KT-2251",
            price: 480,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Объем 7л, сенсорное управление, 12 программ, смотровое окно, 1700 Вт."
        },
        {
            id: 13027,
            name: "Аэрогриль Kitfort KT-2219",
            price: 330,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Объем 4.2л, механическое управление, таймер, 1400 Вт."
        },
        {
            id: 13028,
            name: "Аэрогриль Kitfort KT-2256",
            price: 550,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Объем 8л, сенсорное управление, 10 программ, ротационная корзина."
        },
        {
            id: 13029,
            name: "Аэрогриль Kitfort KT-2231",
            price: 400,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Объем 5.5л, сенсорное управление, 8 программ, смотровое окно."
        },
        {
            id: 13030,
            name: "Аэрогриль Kitfort KT-2216",
            price: 280,
            brand: "KITFORT",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Объем 3.2л, механическое управление, компактный, 1000 Вт."
        },

        // Dreame (10 моделей)
        {
            id: 13031,
            name: "Аэрогриль Dreame A1",
            price: 350,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, умное управление, 12 программ, Wi-Fi, синхронизация с приложением Dreame."
        },
        {
            id: 13032,
            name: "Аэрогриль Dreame A1 Pro",
            price: 420,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, сенсорный экран, 15 программ, управление со смартфона, 1700 Вт."
        },
        {
            id: 13033,
            name: "Аэрогриль Dreame A2",
            price: 380,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5л, 12 программ, OLED-дисплей, быстрый нагрев, Wi-Fi."
        },
        {
            id: 13034,
            name: "Аэрогриль Dreame A1 Lite",
            price: 300,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, 8 программ, компактный, механическое управление."
        },
        {
            id: 13035,
            name: "Аэрогриль Dreame A2 Pro",
            price: 450,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, сенсорный экран, 15 программ, 1800 Вт, Wi-Fi."
        },
        {
            id: 13036,
            name: "Аэрогриль Dreame A1 Max",
            price: 480,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7л, 15 программ, смотровое окно, 1800 Вт, умное управление."
        },
        {
            id: 13037,
            name: "Аэрогриль Dreame A1 White",
            price: 350,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Белый цвет, 4.5л, 12 программ, Wi-Fi, управление с телефона."
        },
        {
            id: 13038,
            name: "Аэрогриль Dreame A1 Black",
            price: 350,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Черный цвет, 4.5л, 12 программ, Wi-Fi, синхронизация с приложением."
        },
        {
            id: 13039,
            name: "Аэрогриль Dreame A2 Dual",
            price: 550,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Две независимые корзины по 4л, 15 программ, 2000 Вт, Wi-Fi."
        },
        {
            id: 13040,
            name: "Аэрогриль Dreame A1 Pro Max",
            price: 490,
            brand: "Dreame",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6л, 15 программ, сенсорный экран, 1800 Вт, умные рецепты."
        },

        // REDMOND (10 моделей)
        {
            id: 13041,
            name: "Аэрогриль REDMOND RAG-241",
            price: 320,
            brand: "REDMOND",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, 1500 Вт, Ready for Sky."
        },
        {
            id: 13042,
            name: "Аэрогриль REDMOND RAG-242",
            price: 350,
            brand: "REDMOND",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорное управление, 1600 Вт, приложение."
        },
        {
            id: 13043,
            name: "Аэрогриль REDMOND RAG-243",
            price: 380,
            brand: "REDMOND",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, сенсорный экран, 1700 Вт, управление со смартфона."
        },
        {
            id: 13044,
            name: "Аэрогриль REDMOND RAG-240",
            price: 300,
            brand: "REDMOND",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, механическое управление, 1300 Вт, компактный."
        },
        {
            id: 13045,
            name: "Аэрогриль REDMOND RAG-244",
            price: 400,
            brand: "REDMOND",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 10 программ, смотровое окно, 1600 Вт, Ready for Sky."
        },
        {
            id: 13046,
            name: "Аэрогриль REDMOND RAG-245",
            price: 420,
            brand: "REDMOND",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 12 программ, сенсорный экран, 1700 Вт, Wi-Fi."
        },
        {
            id: 13047,
            name: "Аэрогриль REDMOND RAG-246",
            price: 450,
            brand: "REDMOND",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 8л, 12 программ, смотровое окно, 1800 Вт, приложение."
        },
        {
            id: 13048,
            name: "Аэрогриль REDMOND RAG-247",
            price: 350,
            brand: "REDMOND",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, 1500 Вт."
        },
        {
            id: 13049,
            name: "Аэрогриль REDMOND RAG-248",
            price: 480,
            brand: "REDMOND",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7л, 12 программ, сенсорный экран, 1800 Вт, умные рецепты."
        },
        {
            id: 13050,
            name: "Аэрогриль REDMOND RAG-249",
            price: 380,
            brand: "REDMOND",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, механическое управление, 1600 Вт."
        },

        // RED SOLUTION (10 моделей)
        {
            id: 13051,
            name: "Аэрогриль RED Solution RFS-401",
            price: 280,
            brand: "RED SOLUTION",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, механическое управление, 1400 Вт."
        },
        {
            id: 13052,
            name: "Аэрогриль RED Solution RFS-402",
            price: 320,
            brand: "RED SOLUTION",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорное управление, 1500 Вт."
        },
        {
            id: 13053,
            name: "Аэрогриль RED Solution RFS-403",
            price: 350,
            brand: "RED SOLUTION",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, сенсорный экран, 1600 Вт."
        },
        {
            id: 13054,
            name: "Аэрогриль RED Solution RFS-404",
            price: 300,
            brand: "RED SOLUTION",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, механическое управление, компактный, 1300 Вт."
        },
        {
            id: 13055,
            name: "Аэрогриль RED Solution RFS-405",
            price: 380,
            brand: "RED SOLUTION",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 10 программ, смотровое окно, 1600 Вт."
        },
        {
            id: 13056,
            name: "Аэрогриль RED Solution RFS-406",
            price: 400,
            brand: "RED SOLUTION",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 12 программ, сенсорный экран, 1700 Вт."
        },
        {
            id: 13057,
            name: "Аэрогриль RED Solution RFS-407",
            price: 420,
            brand: "RED SOLUTION",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 8л, 12 программ, смотровое окно, 1800 Вт."
        },
        {
            id: 13058,
            name: "Аэрогриль RED Solution RFS-408",
            price: 340,
            brand: "RED SOLUTION",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, 1500 Вт."
        },
        {
            id: 13059,
            name: "Аэрогриль RED Solution RFS-409",
            price: 360,
            brand: "RED SOLUTION",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорное управление, 1550 Вт."
        },
        {
            id: 13060,
            name: "Аэрогриль RED Solution RFS-410",
            price: 390,
            brand: "RED SOLUTION",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7л, 10 программ, сенсорный экран, 1700 Вт."
        },

        // HYUNDAI (10 моделей)
        {
            id: 13061,
            name: "Аэрогриль Hyundai HY-3508",
            price: 280,
            brand: "HYUNDAI",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, механическое управление, 1300 Вт, компактный."
        },
        {
            id: 13062,
            name: "Аэрогриль Hyundai HY-4508",
            price: 320,
            brand: "HYUNDAI",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, 1500 Вт."
        },
        {
            id: 13063,
            name: "Аэрогриль Hyundai HY-5508",
            price: 350,
            brand: "HYUNDAI",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорный экран, 1600 Вт."
        },
        {
            id: 13064,
            name: "Аэрогриль Hyundai HY-6508",
            price: 380,
            brand: "HYUNDAI",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, сенсорный экран, 1700 Вт."
        },
        {
            id: 13065,
            name: "Аэрогриль Hyundai HY-7508",
            price: 420,
            brand: "HYUNDAI",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7.5л, 12 программ, сенсорный экран, 1800 Вт."
        },
        {
            id: 13066,
            name: "Аэрогриль Hyundai HY-3509",
            price: 290,
            brand: "HYUNDAI",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, механическое управление, смотровое окно, 1400 Вт."
        },
        {
            id: 13067,
            name: "Аэрогриль Hyundai HY-4510",
            price: 330,
            brand: "HYUNDAI",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, смотровое окно."
        },
        {
            id: 13068,
            name: "Аэрогриль Hyundai HY-5510",
            price: 360,
            brand: "HYUNDAI",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 10 программ, сенсорный экран, смотровое окно."
        },
        {
            id: 13069,
            name: "Аэрогриль Hyundai HY-6510",
            price: 400,
            brand: "HYUNDAI",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 12 программ, сенсорный экран, смотровое окно."
        },
        {
            id: 13070,
            name: "Аэрогриль Hyundai HY-7510",
            price: 440,
            brand: "HYUNDAI",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7.5л, 12 программ, сенсорный экран, смотровое окно, 1800 Вт."
        },

        // PHILIPS (10 моделей)
        {
            id: 13071,
            name: "Аэрогриль Philips HD9252/90",
            price: 480,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, технология Rapid Air, 7 программ, 1500 Вт, сенсорное управление."
        },
        {
            id: 13072,
            name: "Аэрогриль Philips HD9280/90",
            price: 550,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, технология Twin Turbo, 7 программ, приложение NutriU."
        },
        {
            id: 13073,
            name: "Аэрогриль Philips HD9270/90",
            price: 520,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, технология Rapid Air, 7 программ, сенсорный экран."
        },
        {
            id: 13074,
            name: "Аэрогриль Philips HD9200/90",
            price: 420,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4л, технология Rapid Air, 7 программ, 1400 Вт."
        },
        {
            id: 13075,
            name: "Аэрогриль Philips HD9255/90",
            price: 500,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5л, технология Twin Turbo, 7 программ, приложение."
        },
        {
            id: 13076,
            name: "Аэрогриль Philips HD9220/20",
            price: 380,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, технология Rapid Air, 6 программ, 1300 Вт."
        },
        {
            id: 13077,
            name: "Аэрогриль Philips HD9650/90",
            price: 650,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7л, технология Fat Removal, 8 программ, 2000 Вт."
        },
        {
            id: 13078,
            name: "Аэрогриль Philips HD9285/90",
            price: 580,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6л, технология Twin Turbo, 8 программ, приложение NutriU."
        },
        {
            id: 13079,
            name: "Аэрогриль Philips HD9212/90",
            price: 400,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4л, технология Rapid Air, 6 программ, 1400 Вт."
        },
        {
            id: 13080,
            name: "Аэрогриль Philips HD9880/90",
            price: 750,
            brand: "PHILIPS",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 8л, технология Twin Turbo, 10 программ, Wi-Fi, приложение."
        },

        // Grundig (10 моделей)
        {
            id: 13081,
            name: "Аэрогриль Grundig AF 5530",
            price: 380,
            brand: "Grundig",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, 1500 Вт, немецкое качество."
        },
        {
            id: 13082,
            name: "Аэрогриль Grundig AF 6530",
            price: 420,
            brand: "Grundig",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорный экран, 1600 Вт."
        },
        {
            id: 13083,
            name: "Аэрогриль Grundig AF 7530",
            price: 460,
            brand: "Grundig",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, сенсорный экран, 1700 Вт."
        },
        {
            id: 13084,
            name: "Аэрогриль Grundig AF 3530",
            price: 340,
            brand: "Grundig",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, механическое управление, 1400 Вт, компактный."
        },
        {
            id: 13085,
            name: "Аэрогриль Grundig AF 8530",
            price: 500,
            brand: "Grundig",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7.5л, 12 программ, сенсорный экран, 1800 Вт."
        },
        {
            id: 13086,
            name: "Аэрогриль Grundig AF 5540",
            price: 400,
            brand: "Grundig",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, смотровое окно, 1500 Вт."
        },
        {
            id: 13087,
            name: "Аэрогриль Grundig AF 6540",
            price: 440,
            brand: "Grundig",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, смотровое окно, 1600 Вт."
        },
        {
            id: 13088,
            name: "Аэрогриль Grundig AF 7540",
            price: 480,
            brand: "Grundig",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, смотровое окно, 1700 Вт."
        },
        {
            id: 13089,
            name: "Аэрогриль Grundig AF 5540 Dual",
            price: 550,
            brand: "Grundig",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Две корзины по 4.5л, независимое управление, 2000 Вт."
        },
        {
            id: 13090,
            name: "Аэрогриль Grundig AF 9540",
            price: 600,
            brand: "Grundig",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 9л, 15 программ, сенсорный экран, 2000 Вт, Wi-Fi."
        },

        // Roome (10 моделей)
        {
            id: 13091,
            name: "Аэрогриль Roome Air Fryer 3.5L",
            price: 250,
            brand: "Roome",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, механическое управление, 1300 Вт, компактный дизайн."
        },
        {
            id: 13092,
            name: "Аэрогриль Roome Air Fryer 4.5L",
            price: 290,
            brand: "Roome",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, 1500 Вт."
        },
        {
            id: 13093,
            name: "Аэрогриль Roome Air Fryer 5.5L",
            price: 320,
            brand: "Roome",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорный экран, 1600 Вт."
        },
        {
            id: 13094,
            name: "Аэрогриль Roome Air Fryer 6.5L",
            price: 350,
            brand: "Roome",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, сенсорный экран, 1700 Вт."
        },
        {
            id: 13095,
            name: "Аэрогриль Roome Air Fryer 3.5L Pro",
            price: 270,
            brand: "Roome",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, 6 программ, сенсорное управление, 1400 Вт."
        },
        {
            id: 13096,
            name: "Аэрогриль Roome Air Fryer 4.5L Pro",
            price: 310,
            brand: "Roome",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, смотровое окно, 1500 Вт."
        },
        {
            id: 13097,
            name: "Аэрогриль Roome Air Fryer 5.5L Pro",
            price: 340,
            brand: "Roome",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, смотровое окно, 1600 Вт."
        },
        {
            id: 13098,
            name: "Аэрогриль Roome Air Fryer 6.5L Pro",
            price: 370,
            brand: "Roome",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, смотровое окно, 1700 Вт."
        },
        {
            id: 13099,
            name: "Аэрогриль Roome Air Fryer Dual 8L",
            price: 450,
            brand: "Roome",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Две корзины по 4л, независимое управление, 2000 Вт."
        },
        {
            id: 13100,
            name: "Аэрогриль Roome Air Fryer 7.5L",
            price: 390,
            brand: "Roome",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7.5л, 12 программ, сенсорный экран, 1800 Вт."
        },

        // Аэрофритюрницы (10 моделей)
        {
            id: 13101,
            name: "Аэрофритюрница Philips HD9252/90",
            price: 480,
            brand: "Аэрофритюрницы",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Технология Rapid Air, 4.5л, 7 программ, готовка без масла, сенсорное управление."
        },
        {
            id: 13102,
            name: "Аэрофритюрница Tefal Easy Fry 4.2L",
            price: 380,
            brand: "Аэрофритюрницы",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.2л, 8 программ, технология для хрустящей корочки."
        },
        {
            id: 13103,
            name: "Аэрофритюрница Xiaomi Mi Smart Air Fryer 3.5L",
            price: 300,
            brand: "Аэрофритюрницы",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Умное управление, 3.5л, 12 программ, Wi-Fi, приложение Mi Home."
        },
        {
            id: 13104,
            name: "Аэрофритюрница Kitfort KT-2241",
            price: 450,
            brand: "Аэрофритюрницы",
            image: "https://images.unsplash.com/photo-1626162985141-8eb8df9324d5?w=500",
            desc: "Объем 6.4л, смотровое окно, 8 программ, сенсорное управление."
        },
        {
            id: 13105,
            name: "Аэрофритюрница REDMOND RAG-242",
            price: 350,
            brand: "Аэрофритюрницы",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорное управление, приложение Ready for Sky."
        },
        {
            id: 13106,
            name: "Аэрофритюрница Grundig AF 5530",
            price: 380,
            brand: "Аэрофритюрницы",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, немецкое качество."
        },
        {
            id: 13107,
            name: "Аэрофритюрница Hyundai HY-5508",
            price: 350,
            brand: "Аэрофритюрницы",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорный экран, 1600 Вт."
        },
        {
            id: 13108,
            name: "Аэрофритюрница Dreame A1",
            price: 350,
            brand: "Аэрофритюрницы",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 12 программ, Wi-Fi, умное управление."
        },
        {
            id: 13109,
            name: "Аэрофритюрница RED Solution RFS-403",
            price: 350,
            brand: "Аэрофритюрницы",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, сенсорный экран, 1600 Вт."
        },
        {
            id: 13110,
            name: "Аэрофритюрница Roome Air Fryer 5.5L",
            price: 320,
            brand: "Аэрофритюрницы",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорный экран, доступная цена."
        },

        // DEERMA (10 моделей)
        {
            id: 13111,
            name: "Аэрогриль Deerma EO330",
            price: 280,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, механическое управление, 1300 Вт, компактный."
        },
        {
            id: 13112,
            name: "Аэрогриль Deerma EO340",
            price: 310,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, 1500 Вт."
        },
        {
            id: 13113,
            name: "Аэрогриль Deerma EO350",
            price: 340,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорный экран, 1600 Вт."
        },
        {
            id: 13114,
            name: "Аэрогриль Deerma EO360",
            price: 370,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, сенсорный экран, 1700 Вт."
        },
        {
            id: 13115,
            name: "Аэрогриль Deerma EO370",
            price: 400,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7.5л, 12 программ, сенсорный экран, 1800 Вт."
        },
        {
            id: 13116,
            name: "Аэрогриль Deerma EO330 Pro",
            price: 300,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, 6 программ, сенсорное управление, 1400 Вт."
        },
        {
            id: 13117,
            name: "Аэрогриль Deerma EO340 Pro",
            price: 330,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, смотровое окно, 1500 Вт."
        },
        {
            id: 13118,
            name: "Аэрогриль Deerma EO350 Pro",
            price: 360,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, смотровое окно, 1600 Вт."
        },
        {
            id: 13119,
            name: "Аэрогриль Deerma EO360 Pro",
            price: 390,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, смотровое окно, 1700 Вт."
        },
        {
            id: 13120,
            name: "Аэрогриль Deerma EO380 Dual",
            price: 480,
            brand: "DEERMA",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Две корзины по 4л, независимое управление, 2000 Вт."
        },

        // Brayer (10 моделей)
        {
            id: 13121,
            name: "Аэрогриль Brayer BR1073",
            price: 260,
            brand: "Brayer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, механическое управление, 1300 Вт, компактный."
        },
        {
            id: 13122,
            name: "Аэрогриль Brayer BR1074",
            price: 290,
            brand: "Brayer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, 1500 Вт."
        },
        {
            id: 13123,
            name: "Аэрогриль Brayer BR1075",
            price: 320,
            brand: "Brayer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорный экран, 1600 Вт."
        },
        {
            id: 13124,
            name: "Аэрогриль Brayer BR1076",
            price: 350,
            brand: "Brayer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, сенсорный экран, 1700 Вт."
        },
        {
            id: 13125,
            name: "Аэрогриль Brayer BR1077",
            price: 380,
            brand: "Brayer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7.5л, 12 программ, сенсорный экран, 1800 Вт."
        },
        {
            id: 13126,
            name: "Аэрогриль Brayer BR1073 Pro",
            price: 280,
            brand: "Brayer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, 6 программ, сенсорное управление, 1400 Вт."
        },
        {
            id: 13127,
            name: "Аэрогриль Brayer BR1074 Pro",
            price: 310,
            brand: "Brayer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, смотровое окно, 1500 Вт."
        },
        {
            id: 13128,
            name: "Аэрогриль Brayer BR1075 Pro",
            price: 340,
            brand: "Brayer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, смотровое окно, 1600 Вт."
        },
        {
            id: 13129,
            name: "Аэрогриль Brayer BR1076 Pro",
            price: 370,
            brand: "Brayer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, смотровое окно, 1700 Вт."
        },
        {
            id: 13130,
            name: "Аэрогриль Brayer BR1080 Dual",
            price: 450,
            brand: "Brayer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Две корзины по 4.5л, независимое управление, 2000 Вт."
        },

        // BEKO (10 моделей)
        {
            id: 13131,
            name: "Аэрогриль Beko AF 5020",
            price: 300,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, 1500 Вт."
        },
        {
            id: 13132,
            name: "Аэрогриль Beko AF 6020",
            price: 330,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорный экран, 1600 Вт."
        },
        {
            id: 13133,
            name: "Аэрогриль Beko AF 7020",
            price: 360,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, сенсорный экран, 1700 Вт."
        },
        {
            id: 13134,
            name: "Аэрогриль Beko AF 8020",
            price: 400,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7.5л, 12 программ, сенсорный экран, 1800 Вт."
        },
        {
            id: 13135,
            name: "Аэрогриль Beko AF 4020",
            price: 270,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, механическое управление, 1300 Вт."
        },
        {
            id: 13136,
            name: "Аэрогриль Beko AF 5021",
            price: 320,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, смотровое окно, 1500 Вт."
        },
        {
            id: 13137,
            name: "Аэрогриль Beko AF 6021",
            price: 350,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, смотровое окно, 1600 Вт."
        },
        {
            id: 13138,
            name: "Аэрогриль Beko AF 7021",
            price: 380,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, смотровое окно, 1700 Вт."
        },
        {
            id: 13139,
            name: "Аэрогриль Beko AF 8021",
            price: 420,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7.5л, 12 программ, смотровое окно, 1800 Вт."
        },
        {
            id: 13140,
            name: "Аэрогриль Beko AF 9020 Dual",
            price: 500,
            brand: "BEKO",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Две корзины по 4.5л, независимое управление, 2000 Вт."
        },

        // Pioneer (10 моделей)
        {
            id: 13141,
            name: "Аэрогриль Pioneer PA-2020",
            price: 260,
            brand: "Pioneer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, механическое управление, 1300 Вт, компактный."
        },
        {
            id: 13142,
            name: "Аэрогриль Pioneer PA-3030",
            price: 290,
            brand: "Pioneer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, сенсорное управление, 1500 Вт."
        },
        {
            id: 13143,
            name: "Аэрогриль Pioneer PA-4040",
            price: 320,
            brand: "Pioneer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, сенсорный экран, 1600 Вт."
        },
        {
            id: 13144,
            name: "Аэрогриль Pioneer PA-5050",
            price: 350,
            brand: "Pioneer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, сенсорный экран, 1700 Вт."
        },
        {
            id: 13145,
            name: "Аэрогриль Pioneer PA-6060",
            price: 380,
            brand: "Pioneer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 7.5л, 12 программ, сенсорный экран, 1800 Вт."
        },
        {
            id: 13146,
            name: "Аэрогриль Pioneer PA-2020 Pro",
            price: 280,
            brand: "Pioneer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 3.5л, 6 программ, сенсорное управление, 1400 Вт."
        },
        {
            id: 13147,
            name: "Аэрогриль Pioneer PA-3030 Pro",
            price: 310,
            brand: "Pioneer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 4.5л, 8 программ, смотровое окно, 1500 Вт."
        },
        {
            id: 13148,
            name: "Аэрогриль Pioneer PA-4040 Pro",
            price: 340,
            brand: "Pioneer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 5.5л, 8 программ, смотровое окно, 1600 Вт."
        },
        {
            id: 13149,
            name: "Аэрогриль Pioneer PA-5050 Pro",
            price: 370,
            brand: "Pioneer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Объем 6.5л, 10 программ, смотровое окно, 1700 Вт."
        },
        {
            id: 13150,
            name: "Аэрогриль Pioneer PA-7070 Dual",
            price: 460,
            brand: "Pioneer",
            image: "https://images.unsplash.com/photo-1585514695394-46328373b9e4?w=500",
            desc: "Две корзины по 4.5л, независимое управление, 2000 Вт."
        }
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
                            'RTX 3050': 1.0,
                            'RTX 3050 Ti': 1.1,
                            'RTX 3060': 1.3,
                            'RTX 3070': 1.6,
                            'RTX 3070 Ti': 1.8,
                            'RTX 3080': 2.1,
                            'RTX 3080 Ti': 2.3,
                            'RTX 3090': 2.6,
                            'RTX 3090 Ti': 2.8,
                            'RTX 4050': 1.2,
                            'RTX 4060': 1.5,
                            'RTX 4070': 1.9,
                            'RTX 4080': 2.4,
                            'RTX 4090': 3.0,
                            'RTX 5050': 1.4,
                            'RTX 5060': 1.7,
                            'RTX 5070': 2.1,
                            'RTX 5070 Ti': 2.3,
                            'RTX 5080': 2.7,
                            'RTX 5090': 3.3
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
                        'RTX 3050': 1.0,
                        'RTX 3050 Ti': 1.1,
                        'RTX 3060': 1.3,
                        'RTX 3070': 1.6,
                        'RTX 3070 Ti': 1.8,
                        'RTX 3080': 2.1,
                        'RTX 3080 Ti': 2.3,
                        'RTX 3090': 2.6,
                        'RTX 3090 Ti': 2.8,
                        'RTX 4050': 1.2,
                        'RTX 4060': 1.5,
                        'RTX 4070': 1.9,
                        'RTX 4080': 2.4,
                        'RTX 4090': 3.0,
                        'RTX 5050': 1.4,
                        'RTX 5060': 1.7,
                        'RTX 5070': 2.1,
                        'RTX 5070 Ti': 2.3,
                        'RTX 5080': 2.7,
                        'RTX 5090': 3.3
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
                        'RTX 3050': 1.0,
                        'RTX 3050 Ti': 1.1,
                        'RTX 3060': 1.3,
                        'RTX 3070': 1.6,
                        'RTX 3070 Ti': 1.8,
                        'RTX 3080': 2.1,
                        'RTX 3080 Ti': 2.3,
                        'RTX 3090': 2.6,
                        'RTX 3090 Ti': 2.8,
                        'RTX 4050': 1.2,
                        'RTX 4060': 1.5,
                        'RTX 4070': 1.9,
                        'RTX 4080': 2.4,
                        'RTX 4090': 3.0,
                        'RTX 5050': 1.4,
                        'RTX 5060': 1.7,
                        'RTX 5070': 2.1,
                        'RTX 5070 Ti': 2.3,
                        'RTX 5080': 2.7,
                        'RTX 5090': 3.3
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
                    'RTX 3050': 1.0,
                    'RTX 3050 Ti': 1.1,
                    'RTX 3060': 1.3,
                    'RTX 3070': 1.6,
                    'RTX 3070 Ti': 1.8,
                    'RTX 3080': 2.1,
                    'RTX 3080 Ti': 2.3,
                    'RTX 3090': 2.6,
                    'RTX 3090 Ti': 2.8,
                    'RTX 4050': 1.2,
                    'RTX 4060': 1.5,
                    'RTX 4070': 1.9,
                    'RTX 4080': 2.4,
                    'RTX 4090': 3.0,
                    'RTX 5050': 1.4,
                    'RTX 5060': 1.7,
                    'RTX 5070': 2.1,
                    'RTX 5070 Ti': 2.3,
                    'RTX 5080': 2.7,
                    'RTX 5090': 3.3
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
                        'RTX 3050': 1.0,
                        'RTX 3050 Ti': 1.1,
                        'RTX 3060': 1.3,
                        'RTX 3070': 1.6,
                        'RTX 3070 Ti': 1.8,
                        'RTX 3080': 2.1,
                        'RTX 3080 Ti': 2.3,
                        'RTX 3090': 2.6,
                        'RTX 3090 Ti': 2.8,
                        'RTX 4050': 1.2,
                        'RTX 4060': 1.5,
                        'RTX 4070': 1.9,
                        'RTX 4080': 2.4,
                        'RTX 4090': 3.0,
                        'RTX 5050': 1.4,
                        'RTX 5060': 1.7,
                        'RTX 5070': 2.1,
                        'RTX 5070 Ti': 2.3,
                        'RTX 5080': 2.7,
                        'RTX 5090': 3.3
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
}