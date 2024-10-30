
// Route to fetch users
app.get('/users', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM Menu');
        res.json(results);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Route to create multiple users
app.post('/create-users', async (req, res) => {
    const users = req.body; // Expecting an array of user objects

    try {
        const promises = users.map(user => {
            const { Menu_Makanan, Stok, Harga, Rating } = user;
            return connection.query('INSERT INTO Menu (Menu_Makanan, Stok, Harga, Rating) VALUES (?, ?, ?, ?)', [Menu_Makanan, Stok, Harga, Rating]);
        });

        // Wait for all insertions to complete
        await Promise.all(promises);
        res.status(201).json({ message: 'Users created successfully' });
    } catch (err) {
        console.error('Error creating users:', err);
        res.status(500).json({ error: 'Failed to create users' });
    }
});


// Route to update multiple users
try {
    const promises = users.map(user => {
        const { Menu_Makanan, Stok, Harga, Rating } = user; // Ambil data dari user
        return connection.query('UPDATE menu SET Stok = ?, Harga = ?, Rating = ? WHERE Menu_Makanan = ?', [Stok, Harga, Rating, Menu_Makanan]);
    });

    // Tunggu semua pembaruan selesai
    await Promise.all(promises);
    res.status(200).json({ message: 'Users updated successfully' });
} catch (err) {
    console.error('Error updating users:', err);
    res.status(500).json({ error: 'Failed to update users' });
}

try {
    const promises = users.map(user => {
        const { Menu_Makanan } = user; // hanya butuh Menu_Makanan untuk menghapus
        return connection.query('DELETE FROM menu WHERE Menu_Makanan = ?', [Menu_Makanan]);
    });

    // Tunggu semua penghapusan selesai
    await Promise.all(promises);
    res.status(200).json({ message: 'Users deleted successfully' });
} catch (err) {
    console.error('Error deleting users:', err);
    res.status(500).json({ error: 'Failed to delete users' });
}
