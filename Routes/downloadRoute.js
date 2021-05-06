const express = require('express');
const router = express.Router();
const requests = require('requests');
const { parse } = require('node-html-parser')
const fetch = require('node-fetch')
const converter = (str) => {
    var res = str.toLowerCase();
    var replaced = res.split(' ').join('-');
    return replaced

}
router.get('/getMovieDetails/:id', (req, res) => {
    fetch('https://api.themoviedb.org/3/movie/' + req.params.id + '?api_key=7ce6f3444cda42a6506370e782b2e857&language=en-US&append_to_response=videos,credits')
        .then(resp => resp.json())
        .then(dat => {
            let responseObject = dat;
            const d = new Date(dat.release_date)
            console.log('https://yts.mx/movies/' + converter(dat.title) + '-' + d.getFullYear())
            let auth = true;
            requests('https://yts.mx/movies/' + converter(dat.title) + '-' + d.getFullYear())
                .on('data', function (chunk) {
                    const root = parse(chunk);
                    let arr = []
                    root.querySelectorAll('#movie-info p.hidden-xs a').forEach(link => {
                        arr.push({ title: link.getAttribute('title'), link: link.getAttribute('href') })
                    })
                    responseObject.downloads = arr;
                    res.json(responseObject);
                    auth = false;
                })
                .on('end', function (err) {
                    if (err) return console.log('connection closed due to errors', err);

                    if (auth) {
                        res.json({ responseObject })
                    }
                });
        })



})

module.exports = router