import {getImageUrl, xmlToJson} from "@/app/lib/etc";

const getAllData = async () => {
    const res = await fetch(
        "http://api.kcisa.kr/API_CCA_141/request?serviceKey=6ce8da4f-cc49-46e9-8fcf-d8df129a8912&numOfRows=100&pageNo=1",
        {
            next: { revalidate: 10 },
        }
    );

    const json = xmlToJson(await res.text()).response?.body?.items?.item;

    return json;
}

const Page = async () => {
    const data = await getAllData();

    return (
        <div>
            {
                data.map((item, index) => {
                    return (
                        <div key={item.TITLE._text} className={`px-4 py-2 border-b`}>
                            <div>{ item.TITLE._text }</div>
                            <div>{ item.DESCRIPTION._text }...</div>
                            <div>{ item.IMAGE_OBJECT._text }</div>
                            <div>{ item.URL._text }</div>
                            <div>{ getImageUrl(item.URL._text) }</div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Page;
