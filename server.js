const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // Servir arquivos estáticos

app.get('/getDownloadLink', (req, res) => {
    const url = req.query.url;
    const format = req.query.format || 'mp4';

    if (!url) {
        return res.status(400).send('URL é necessária');
    }

    exec(`yt-dlp -f best --get-url ${url}`, (err, stdout, stderr) => {
        if (err || !stdout) {
            return res.status(500).send('Erro ao obter o link de download');
        }

        const downloadUrl = stdout.trim();
        res.json({ downloadUrl });
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Certifique-se de ter esse arquivo na raiz do projeto
});