//Fix zeros missing in date on news

function addLeadingZeroes(n) {
    if(n < 10) {
        return "0" + n;
    }
    return n;
}

$.ajax({
    type: "GET",
    url: "https://api.smartable.ai/coronavirus/news/GB",

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
        let newsArticle = $(newsArticleClone).clone();
        console.log(newsArticle);
        $(newsArticle).find(".card-title").html(news[i].title);
        $(newsArticle).find(".card-text").html(news[i].excerpt);
        $(newsArticle).find(".card-img-top").attr("src",news[i].images[0].url);
        $(newsArticle).find(".article-url").attr("href",news[i].webUrl);
        let date = new Date(news[i].publishedDateTime);
        let dateString = date.getFullYear() + "-" + addLeadingZeroes(date.getMonth()+1) + "-" + addLeadingZeroes(date.getDate()) + " " + addLeadingZeroes(date.getHours()) + ":" + addLeadingZeroes(date.getMinutes());
        $(newsArticle).find(".time-stamp").html(dateString);
        $(newsArticle).find(".news-outlet").html(news[i].provider.name).attr("href","https://" + news[i].provider.domain);
        $(newsArticle).appendTo("#newsArticles");
        articles++;

        if (articles > 5) {
            break;
        }
    }
})

.fail(function () {
    document.write("Error: News could not be loaded");
});