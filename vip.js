
app.get('/VIP', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM vippelanggan');
        res.json(results);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


// Route to create multiple users
app.post('/create-vip', async (req, res) => {
    const users = req.body; // Expecting an array of user objects

    try {
        const promises = users.map(user => {
            const { Nama, Usia, Negara, Level } = user;
            return connection.query('INSERT INTO vippelanggan (Nama, Usia, Negara, Level) VALUES (?, ?, ?, ?)', [Nama, Usia, Negara, Level]);
        });

        // Wait for all insertions to complete
        await Promise.all(promises);
        res.status(201).json({ message: '===Daftar Pelanggan VIP===' });
    } catch (err) {
        console.error('Error creating users:', err);
        res.status(500).json({ error: 'Failed to create users' });
    }
});

