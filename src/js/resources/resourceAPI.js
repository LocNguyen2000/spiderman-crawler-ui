const BASE_API = {
    CRAWLER: "http://localhost:4000/crawler/",
    CRAWLER_OVERVIEW: "http://localhost:4000/crawler/healthcheck",
    CRAWLER_NEW_CODE: "http://localhost:4000/crawler/newCrawlerCode",
    CRAWLER_CODE(code){
        return `http://localhost:4000/crawler/${code}`
    },
    CRAWLER_SLT_CODE(code){
        return `http://localhost:4000/crawler/selectors/${code}`
    },
    CRAWLER_SLT_EXTRACT(code){
        return `http://localhost:4000/crawler/record/${code}`
    },
    CRAWLER_DATA_EXTRACT(code){
        return `http://localhost:4000/crawler/scrape/${code}`
    }
}
export default BASE_API;