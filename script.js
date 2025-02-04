document.getElementById('downloadButton').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoLink').value;
    const format = document.querySelector('input[name="format"]:checked').value; // MP4 ou MP3

    if (!videoUrl) {
        alert('Por favor, insira um link válido!');
        return;
    }

    try {
        const response = await fetch(`/getDownloadLink?url=${encodeURIComponent(videoUrl)}&format=${format}`);
        const data = await response.json();

        if (data.downloadUrl) {
            const a = document.createElement('a');
            a.href = data.downloadUrl;
            a.download = ''; // Força o navegador a baixar o arquivo
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('Erro ao obter link de download.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao processar o download.');
    }
});
