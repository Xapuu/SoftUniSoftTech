/**
 * Created by Hary on 6.4.2017 г..
 */
const Article = require('mongoose').model('Article');

module.exports = {
    loadNews: (req, res) => {


        Article.find({}).sort({date:-1}).limit(6).populate('author').then(articles => {

            mainArticle = articles[0];


            for (let index = 1; index<6;index++){
                articles[index].content= articles[index].content.substring(0,200)+"...";
            }

                articles.shift();
                res.render('news/newsBrowser',{
                    articles, mainArticle}

                );





        });


    },

    loadMultyNews: (req,res) => {



      Article.find({}).sort({date:-1}).then(articles =>{

          let currentPage = parseInt(req.params.page);

          console.log(req);

          console.log(currentPage);

          let lastPage = Math.ceil(articles.length/10);

          let currentPageValue = (currentPage>lastPage?lastPage:currentPage<1?1:currentPage)*10;


              let kurec = articles.slice(currentPageValue-10 ,currentPageValue);

              let pages = {firstPage:1,prevPage:currentPage-1 < 1?currentPage:currentPage-1,currentPage:currentPage>lastPage?lastPage:currentPage<1?1:currentPage
                  ,nextPage:currentPage+1>lastPage?lastPage:currentPage+1,lastPage:lastPage}

              res.render('news/multyNewsBrowser',{kurec, pages});




      });

    },

    wantedPage: (req,res)=>{
        let targetPage= req.body.searchedPage;
        res.redirect('/news/multyNewsBrowser/'+targetPage);
    }

};


