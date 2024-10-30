import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

let connection;

async function initializeDatabaseConnection() {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'MiniProject'
    });
}

app.get('/', (req, res) => {
    res.send("===Selamat datang di Fictioner's Restaurant===");
});

app.get('/users', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM Menu');
        res.json(results);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/create-users', async (req, res) => {
    const users = req.body;
    try {
        const promises = users.map(user => {
            const { Menu_Makanan, Stok, Harga, Rating } = user;
            return connection.query('INSERT INTO Menu (Menu_Makanan, Stok, Harga, Rating) VALUES (?, ?, ?, ?)', [Menu_Makanan, Stok, Harga, Rating]);
        });

        await Promise.all(promises);
        res.status(201).json({ message: '===Menambah Menu Baru===' });
    } catch (err) {
        console.error('Error creating users:', err);
        res.status(500).json({ error: 'Failed to create users' });
    }
});

app.put('/update-users', async (req, res) => {
    const users = req.body;

    try {
        const promises = users.map(user => {
            const { Menu_Makanan, Stok, Harga, Rating } = user;
            return connection.query('UPDATE Menu SET Stok = ?, Harga = ?, Rating = ? WHERE Menu_Makanan = ?', [Stok, Harga, Rating, Menu_Makanan]);
        });

        await Promise.all(promises);
        res.status(200).json({ message: '====Mengupdate Daftar Menu===' });
    } catch (err) {
        console.error('Error updating users:', err);
        res.status(500).json({ error: 'Failed to update users' });
    }
});

app.delete('/delete-users', async (req, res) => {
    const users = req.body;

    try {
        const promises = users.map(user => {
            const { Menu_Makanan } = user;
            return connection.query('DELETE FROM Menu WHERE Menu_Makanan = ?', [Menu_Makanan]);
        });

        await Promise.all(promises);
        res.status(200).json({ message: '===Menghapus Menu Restoran===' });
    } catch (err) {
        console.error('Error deleting users:', err);
        res.status(500).json({ error: 'Failed to delete users' });
    }
});

app.get('/VIP', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM vippelanggan');
        res.json(results);
    } catch (err) {
        console.error('Error fetching VIP:', err);a
        res.status(500).json({ error: 'Failed to fetch VIP' });
    }
});

app.post('/create-vip', async (req, res) => {
    const users = req.body;

    try {
        const promises = users.map(user => {
            const { Nama, Usia, Negara, Level } = user;
            return connection.query('INSERT INTO vippelanggan (Nama, Usia, Negara, Level) VALUES (?, ?, ?, ?)', [Nama, Usia, Negara, Level]);
        });

        await Promise.all(promises);
        res.status(201).json({ message: '===Daftar Pelanggan VIP===' });
    } catch (err) {
        console.error('Error creating VIP:', err);
        res.status(500).json({ error: 'Failed to create VIP' });
    }
});

app.put('/update-vip', async (req, res) => {
    const users = req.body;

    try {
        const promises = users.map(user => {
            const { Nama, Usia, Negara, Level } = user;
            return connection.query('UPDATE vippelanggan SET Usia = ?, Negara = ?, Level = ? WHERE Nama = ?', [Usia, Negara, Level, Nama]);
        });

        await Promise.all(promises);
        res.status(200).json({ message: '===Daftar Pelanggan VIP Terupdate===' });
    } catch (err) {
        console.error('Error updating VIP:', err);
        res.status(500).json({ error: 'Failed to update VIP' });
    }
});

app.delete('/delete-vip', async (req, res) => {
    const users = req.body;

    try {
        const promises = users.map(user => {
            const { Nama } = user;
            return connection.query('DELETE FROM vippelanggan WHERE Nama = ?', [Nama]);
        });
        await Promise.all(promises);
        res.status(200).json({ message: '===Hapus Daftar VIP===' });
    } catch (err) {
        console.error('Error deleting VIP:', err);
        res.status(500).json({ error: 'Failed to delete VIP' });
    }
});

app.get('/blacklist', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM Blacklist');
        res.json(results);
    } catch (err) {
        console.error('Error fetching blacklist:', err);
        res.status(500).json({ error: 'Failed to fetch blacklist' });
    }
});

app.post('/create-blacklist', async (req, res) => {
    const users = req.body;

    try {
        const promises = users.map(user => {
            const { Nama, Usia, Alasan_Blacklist } = user;
            return connection.query('INSERT INTO Blacklist (Nama, Usia, Alasan_Blacklist) VALUES (?, ?, ?)', [Nama, Usia, Alasan_Blacklist]);
        });

        await Promise.all(promises);
        res.status(201).json({ message: '===Daftar Blacklist Baru===' });
    } catch (err) {
        console.error('Error creating blacklist:', err);
        res.status(500).json({ error: 'Failed to create blacklist' });
    }
});
app.put('/update-blacklist', async (req, res) => {
    console.log('Incoming request body:', req.body); // Log the incoming request
    const users = req.body;

    try {
        const promises = users.map(user => {
            const { Nama, Usia, Alasan_Blacklist } = user;
            return connection.query('UPDATE Blacklist SET Usia = ?, Alasan_Blacklist = ? WHERE Nama = ?', [Usia, Alasan_Blacklist, Nama]);
        });
        await Promise.all(promises);
        res.status(200).json({ message: '===Update Blacklist===' });
    } catch (err) {
        console.error('Error updating blacklist:', err);
        res.status(500).json({ error: 'Failed to update blacklist', details: err.message });
    }
});

app.delete('/delete-blacklist', async (req, res) => {
    const users = req.body;

    try {
        // Menggunakan `user.Nama` sebagai parameter query
        const promises = users.map(user => {
            const { Nama } = user;
            return connection.query('DELETE FROM blacklist WHERE Nama = ?', [Nama]);
        });

        await Promise.all(promises);
        res.status(200).json({ message: '===Menghapus Data Blacklist===' });
    } catch (err) {
        console.error('Error deleting blacklist:', err);
        res.status(500).json({ error: 'Failed to delete blacklist' });
    }
});

process.on('SIGINT', async () => {
    await connection.end();
    console.log('MySQL connection closed.');
    process.exit(0);
});

const PORT = 3001;
initializeDatabaseConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error initializing database connection:', err);
        process.exit(1);
    });
