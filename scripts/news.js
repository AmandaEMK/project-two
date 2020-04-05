$.ajax({
    type: "GET",
    url: "https://api.smartable.ai/coronavirus/news/CA",

    // Request headers
    beforeSend: function(xhrObj) {
        xhrObj.setRequestHeader("Cache-Control", "no-cache");
        xhrObj.setRequestHeader("Subscription-Key", "d00c7834e9704372bad71fff4f715467");
        },
    })
.done(function (data) {
    console.log(data);
    let news = data.news;
    console.log(data.news);
    let articles = 0;

    let newsArticleClone = $(".newsArticleTemplate").clone();
    $(newsArticleClone).removeAttr("id");
    $("#newsArticleTemplate").remove();

    for (let i=0;i<news.length;i++) {
        let newsItem=news[i].images.url + news[i].webURl;
        
        let newsArticle = $(newsArticleClone).clone();
        console.log(newsArticle);
        $(newsArticle).find(".card-title").html(news[i].title);
        $(newsArticle).find(".card-text").html(news[i].excerpt);
        $(newsArticle).find(".card-img-top").attr("src",news[i].images.url);
        $(newsArticle).find(".time-stamp").html(news[i].publishedDateTime);
        $(newsArticle).find(".news-outlet").html(news[i].provider.name).attr("href","https://" + news[i].provider.domain);
        $(newsArticle).appendTo("#newsArticles");
        articles++;

        if (articles > 24) {
            break;
        }
    }
})

.fail(function () {
    alert("error");
});