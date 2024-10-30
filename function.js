// MenuOpsi.js

let menuList = [
    { nama: "Pizza", stok: 16, harga: 50000 },
    { nama: "Sushi", stok: 19, harga: 80000 },
    { nama: "Ramen", stok: 23, harga: 70000 },
    {nama: "Burger", stok: 17, harga: 37000},
];

function createMenu(nama, stok, harga) {
    const menuBaru = { nama, stok, harga };
    menuList.push(menuBaru);
    return menuBaru;
}

function readMenu() {
    return menuList;
}

function updateMenu(index, updateData) {
    if (menuList[index]) {
        menuList[index] = {...menuList[index],...updateData };
        return menuList[index];
    } else {
        return null;
    }
}

function deleteMenu(nama) {
    const index = menuList.findIndex(menu => menu.nama === nama);
    if (index !== -1) {
        return menuList.splice(index, 1)[0];
    } else {
        return null;
    }
}

module.exports = { createMenu, readMenu, updateMenu, deleteMenu };
