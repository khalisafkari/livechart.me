const axios = require('axios');
const cheerio = require('cheerio');

var data = []
axios.get('https://www.livechart.me').then(res=>{
  const $ = cheerio.load(res.data);
  $('.chart .anime').each((index,item)=>{
      const $element = $(item);
      if($element.find('.anime-card .poster-container .episode-countdown time').attr('data-timestamp')){
        data.push({
          title:{
            en:$element.attr('data-romaji'),
            jp:$element.attr('data-japanese')
          },
          image:$element.find('.anime-card .poster-container img').attr('src'),
          episode:{
            next_epiosode:$element.find('.anime-card .poster-container .episode-countdown').text(),
            countdown:$element.find('.anime-card .poster-container .episode-countdown time').attr('data-timestamp')
          }
        })
      }
      

  })
  console.log(data)
})