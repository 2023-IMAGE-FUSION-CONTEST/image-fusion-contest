export interface ArtworkType {
    id: number,
    title: string,
    description: string,
    year_of_mfg: string,
    type: "oriental" | "western" | "calligraphy" | "culture" | "engraving" | "",
    author: string,
    url: string,
    image: string,
    blurDataURL: string,
    imageSize: { width: number, height: number }
}

export type PaintingType = "한국화" | "서양화" | "문인화" | "판화" | "서예";
