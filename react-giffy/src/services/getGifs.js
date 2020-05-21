const apiKey = "dIJrma20pSU6ymMwWnDbiaT7NFHeAGVa"

export default function getGifs({keyword = "simpson"}){
    const apiURL = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=10&offset=0&rating=G&lang=en`;
    fetch(apiURL)
      .then(res => res.json())
      .then(response => {
        const { data } = response
        const gifs = data.map(image => {
            const {images, title, id } = image;
            const {url} = images.downsized_medium;
            return { title, id, url };
        });
        return gifs;
      });
};