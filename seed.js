const axios = require('axios').default;
const fs = require('fs');

const query = `https://cataas.com/api/cats?limit=20`;
axios.get(query).then(({ data }) => {
  for (let index = 0; index < data.length; index++) {
    const cat = data[index];
    axios.get(`https://cataas.com/cat/${cat.id}`, { responseType: 'arraybuffer' }).then(({ data, headers }) => {
      const extension = headers['content-type'].split('/')[1];
      fs.writeFileSync(`${__dirname}/cats/${cat.id}.${extension}`, data);
      console.log(index + 1)
    });
  }
}).catch((err) => console.log(err));