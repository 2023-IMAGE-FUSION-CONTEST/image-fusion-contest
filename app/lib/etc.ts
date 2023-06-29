let convert = require("xml-js");

export const xmlToJson = (xml: string) => {
    const json = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 4 }));
    return json;
}

export const getImageUrl = (url: string) => {
    const imageId = url.split("=")[1];
    // const res = `20${imageId.substring(0, 2)}/${imageId.substring(2, 4)}/${imageId.substring(4, 6)}`
    return imageId;
}
