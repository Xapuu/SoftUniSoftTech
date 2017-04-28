/**
 * Created by Hary on 6.4.2017 г..
 */
const Article = require('mongoose').model('Article');

module.exports = {
    loadNews: (req, res) => {


        Article.find({}).sort({date: -1}).limit(5).populate('author').then(articles => {


            for (let index = 0; index < articles.length; index++) {
                articles[index].content = articles[index].content.substring(0, 200) + "...";
            }


            res.render('news/newsBrowser', {
                    articles
                }
            );


        });


    },

    loadMultyNews: (req, res) => {


        Article.find({}).sort({date: -1}).then(articles => {



            let currentPage = parseInt(req.params.page);



            let lastPage = Math.ceil(articles.length / 10);

            let currentPageValue = (currentPage > lastPage ? lastPage : currentPage < 1 ? 1 : currentPage) * 10;


            let kurec = articles.slice(currentPageValue - 10, currentPageValue);

            kurec.map(kurec => {
                kurec.content = kurec.content.substring(0, 200);
            })

            let pages = {
                firstPage: 1,
                prevPage: currentPage - 1 < 1 ? currentPage : currentPage - 1,
                currentPage: currentPage > lastPage ? lastPage : currentPage < 1 ? 1 : currentPage
                ,
                nextPage: currentPage + 1 > lastPage ? lastPage : currentPage + 1,
                lastPage: lastPage
            }

            if (kurec) {
                res.render('news/multyNewsBrowser', {kurec, pages});
            } else {
                res.render('news/multyNewsBrowser');
            }


        });

    },

    wantedPage: (req, res) => {
        let targetPage = req.body.searchedPage;
        res.redirect('/news/multyNewsBrowser/' + targetPage);
    }

};


