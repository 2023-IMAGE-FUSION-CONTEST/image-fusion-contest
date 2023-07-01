"use client";

import {useEffect, useState} from "react";
import InputImage from "@/app/components/InputImage";
import Image from "next/image";

const ImageFusion = ({ baseImage }: { baseImage: string | null | undefined }) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);

    useEffect(() => {
        setResultImage(null);
    }, [baseImage, image]);

    return (
        <div className={`mt-4`}>
            <div className={`text-2xl`}>이미지 합성</div>
            <div className={`flex flex-row gap-4`}>
                <InputImage image={image} setImage={setImage} />
                <div
                    className={`flex justify-center items-center p-1 bg-black text-white w-20 h-8 rounded-xl cursor-pointer`}
                    onClick={() => {
                        const data = {
                            "fn_index": 5,
                            "data": [
                                "Image",
                                "Image",
                                "Nothing",
                                "Nothing",
                                "Nothing",
                                "",
                                "",
                                "",
                                "",
                                "",
                                baseImage,
                                image,
                                null,
                                null,
                                null,
                                1,
                                1,
                                1,
                                1,
                                1,
                                5,
                                1,
                                0,
                                30
                            ]
                        };

                        const res = fetch("https://port-0-image-fusion-contest-backend-7xwyjq992lljjt5bow.sel4.cloudtype.app/api/image-fusion", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })
                            .then(res => res.json()).then(res => {
                                setResultImage(res.data[0][0].name);
                            });
                    }}
                >
                    생성
                </div>
            </div>
            {
                resultImage && (
                    <Image
                        src={`https://demo.70e9f1a0f18a49a29a0cd16c9e0750df.lambdaspaces.com/file=${resultImage}`}
                        alt={resultImage}
                        width={500}
                        height={500}
                    />
                )
            }
        </div>
    );
};

export default ImageFusion;
