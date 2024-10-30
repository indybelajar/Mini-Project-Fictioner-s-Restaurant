// Nama = Indy Agustin
// NIM = 2410512106
const {
    createMenu,
    readMenu,
    updateMenu,
    deleteMenu
} = require('./MenuOpsi.js');

console.log("===Daftar Menu Restoran===");
console.log(readMenu());

console.log("\n===Menambah Menu Baru===")
const menuBaru = createMenu("Oyster", 12, 120000);
console.log("Menu berhasil ditambahkan: ", menuBaru);

console.log("\n===Mengupdate Stok Menu")
const menuUpdate ={ stok: 19, harga: 147000};
const updatedMenu = updateMenu(4, menuUpdate);
console.log("Stok Menu yang diupdate: ", updatedMenu);

console.log("\n===Menghapus Menu===");
const menuDelete = deleteMenu("Burger");
console.log("Menu berhasil dihapus: ", menuDelete);

console.log("\n===Daftar Menu Restoran===");
console.log(readMenu());
