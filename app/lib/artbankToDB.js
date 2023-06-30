let axios = require("axios");
let cheerio = require("cheerio");
let prisma = require("@prisma/client");
let prismaClient = new prisma.PrismaClient();

const artbankToDB = async (url) => {
    await axios.get(url).then(async (res) => {
        const $ = cheerio.load(res.data);
        const title = $('div.gallery_view > div.pic_top > div.spec > dl > dt#artNmVal').text();
        const etc = $('div.gallery_view > div.pic_top > div.spec > dl > dd > table > tbody > tr > td');
        const data = etc.toArray().map((ch) => {
            if (ch.firstChild && !ch.firstChild.data) {
                return ch.firstChild.children[0].data
            } else if (ch.firstChild && ch.firstChild.data) {
                return ch.firstChild.data
            } else {
                return ""
            }
        });

        const author = data[0];
        const type = data[2];
        const year_of_mfg = data[3].replace(/[^0-9]/g, "");
        const imageUrl = $('div.gallery_view > div.pic_top > div.pic > img').attr().src;
        const description = $('div.info > div#artDescVal').text();

        await prismaClient.Artwork.create({
            data: {
                title: title,
                author: author,
                type: type,
                year_of_mfg: year_of_mfg,
                description: description,
                image: imageUrl,
                url: url
            }
        })

        console.log(`[${title}], [${author}], [${type}], [${year_of_mfg}], [${imageUrl}]`);
        console.log(description);
    })
}

const getArtbankData = async () => {
    const url = "http://api.kcisa.kr/API_CCA_141/request?serviceKey=6ce8da4f-cc49-46e9-8fcf-d8df129a8912&numOfRows=7094&pageNo=1";
    await axios.get(url).then(async (res) => {
        const data = res.data.response.body.items.item;
        for (let i = 0; i < data.length; i++) {
            const url = data[i].URL.replace(" ", "");
            await artbankToDB(url);
        }
    })
}

getArtbankData();
// artbankToDB("http://www.artbank.go.kr/home/art/productDetail.do?artId=190128000028938");
