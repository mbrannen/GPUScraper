const request = require('request-promise')
const cheerio = require('cheerio')

const URL = 'https://www.imdb.com/title/tt0092099/';

(async () => {

     const response = await request(
         {
            uri: URL,
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache',
                'dnt': '1',
                'pragma': 'no-cache',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
            },
            //MAY OR MAY NOT BE NEEDED.  DEPENDS ON SITE TECH AND RESPONSE MODULE MIGHT HANDLE THAT ALREADY
            gzip:true
         })

     //console.log(response)

    let $ = cheerio.load(response)
    let title = $('div[class="title_wrapper"] > h1').text().trim()
    let releaseDate = $('a[title="See more release dates"]').text().trim()
    let rating = $('span[itemprop="ratingValue"]').text()
    let ratingTotals = $('div[class="imdbRating"] > a').text()
    let poster = $('div[class="poster"] > a > img').attr('src')

     console.log(title)
     console.log(releaseDate)
     console.log(`${rating}-${ratingTotals}`)
     console.log(poster)

})()