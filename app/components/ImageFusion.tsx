"use client";

import {useEffect, useState} from "react";
import InputImage from "@/app/components/InputImage";
import Image from "next/image";

const CustomInput = ({ min, max, step, value, onChange }: { min: number, max: number, step: number, value: number, onChange: any }) => {
    return (
        <input
            type={"range"}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            className={`
                w-64
                appearance-none
                bg-transparent
                z-50
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:bg-purple-700
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-2
                [&::-webkit-slider-thumb]:h-2
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:drop-shadow
                [&::-webkit-slider-thumb]:cursor-ew-resize
                [&::-webkit-slider-thumb]:scale-[2]
                [&::-webkit-slider-thumb]:hover:scale-[2.5]
                [&::-webkit-slider-thumb]:transform
                [&::-webkit-slider-thumb]:duration-300
            `}
        />
    );
}

const ImageFusion = ({ baseImage, imageUrl }: { baseImage: string | null | undefined, imageUrl: string }) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [image1Strength, setImage1Strength] = useState<number>(1);
    const [image2Strength, setImage2Strength] = useState<number>(1);
    const [cfgScale, setCfgScale] = useState<number>(1);
    const [seed, setSeed] = useState<number>(0);
    const [steps, setSteps] = useState<number>(30);

    useEffect(() => {
        setResultImage(null);
        setLoading(false);
        setError(false);
    }, [baseImage, image]);

    const handleClick = () => {
        if (!baseImage || !image) {
            setError(true);
            return;
        }

        if (loading) return;

        setLoading(true);

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
                image1Strength,
                image2Strength,
                1,
                1,
                1,
                cfgScale,
                1,
                seed,
                steps
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
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div className={`mt-4`}>
            <div className={`text-2xl`}>이미지 합성</div>
            <div className={`border border-purple-700 rounded-xl mt-4`}>
                <div className={`mt-8 flex flex-row items-center justify-between px-10`}>
                    <div className={`relative w-40 h-40 flex items-center justify-center rounded-md overflow-hidden`}>
                        <Image src={imageUrl} alt={"image.png"} fill={true} className={`object-cover`} />
                    </div>

                    <div className={`${loading && "animate-spin"}`}>
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-10 h-10`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>

                    <InputImage image={image} setImage={setImage} />
                </div>

                <div className={`mt-10 px-6 flex flex-col gap-3`}>
                    <div>
                        <div className={`block font-base text-neutral-700 text-xl`}>이미지 1 강도</div>
                        <div className={`flex flex-row justify-between items-center`}>
                            <div className={`flex flex-row gap-4 mt-2`}>
                                <div className={`w-4`}>0</div>
                                <CustomInput min={0} max={5} step={0.05} value={image1Strength} onChange={(e: any) => setImage1Strength(Number(e.currentTarget.value))} />
                                <div className={`w-4 ml-1`}>5</div>
                            </div>
                            <div className={`w-20 h-7 text-sm text-purple-900 border border-purple-700 rounded-lg flex items-center justify-center`}>{ image1Strength }</div>
                        </div>
                    </div>
                    <div>
                        <div className={`block font-base text-neutral-700 text-xl`}>이미지 2 강도</div>
                        <div className={`flex flex-row justify-between items-center`}>
                            <div className={`flex flex-row gap-4 mt-2`}>
                                <div className={`w-4`}>0</div>
                                <CustomInput min={0} max={5} step={0.05} value={image2Strength} onChange={(e: any) => setImage2Strength(Number(e.currentTarget.value))} />
                                <div className={`w-4 ml-1`}>5</div>
                            </div>
                            <div className={`w-20 h-7 text-sm text-purple-900 border border-purple-700 rounded-lg flex items-center justify-center`}>{ image2Strength }</div>
                        </div>
                    </div>
                    <div>
                        <div className={`block font-base text-neutral-700 text-xl`}>CFG 스케일</div>
                        <div className={`flex flex-row justify-between items-center`}>
                            <div className={`flex flex-row gap-4 mt-2`}>
                                <div className={`w-4`}>1</div>
                                <CustomInput min={1} max={10} step={0.5} value={cfgScale} onChange={(e: any) => setCfgScale(Number(e.currentTarget.value))} />
                                <div className={`w-4 ml-1`}>10</div>
                            </div>
                            <div className={`w-20 h-7 text-sm text-purple-900 border border-purple-700 rounded-lg flex items-center justify-center`}>{ cfgScale }</div>
                        </div>
                    </div>
                    <div>
                        <div className={`block font-base text-neutral-700 text-xl`}>시드</div>
                        <div className={`flex flex-row justify-between items-center`}>
                            <div className={`flex flex-row gap-4 mt-2`}>
                                <div className={`w-4`}>0</div>
                                <CustomInput min={0} max={10000} step={1} value={seed} onChange={(e: any) => setSeed(Number(e.currentTarget.value))} />
                                <div className={`w-4 ml-1`}>10000</div>
                            </div>
                            <div className={`w-20 h-7 text-sm text-purple-900 border border-purple-700 rounded-lg flex items-center justify-center`}>{ seed }</div>
                        </div>
                    </div>
                    <div>
                        <div className={`block font-base text-neutral-700 text-xl`}>스텝</div>
                        <div className={`flex flex-row justify-between items-center`}>
                            <div className={`flex flex-row gap-4 mt-2`}>
                                <div className={`w-4`}>10</div>
                                <CustomInput min={10} max={100} step={5} value={steps} onChange={(e: any) => setSteps(Number(e.currentTarget.value))} />
                                <div className={`w-4 ml-1`}>100</div>
                            </div>
                            <div className={`w-20 h-7 text-sm text-purple-900 border border-purple-700 rounded-lg flex items-center justify-center`}>{ steps }</div>
                        </div>
                    </div>
                    <div
                        className={`flex justify-center items-center p-1 bg-purple-700 text-white w-full h-10 rounded-xl cursor-pointer mt-6`}
                        onClick={handleClick}
                    >
                        생성
                    </div>
                    {
                        error ? (
                            <div className={`flex items-center justify-end w-full h-6 text-red-500 text-sm`}>* 업로드할 이미지를 선택해주세요.</div>
                        ) : (
                            <div className={`h-6 text-red-500 text-sm`} />
                        )
                    }

                    <div className={`mt-2 my-6 flex justify-center items-center`}>
                        {
                            resultImage ? (
                                <div className={`relative w-full h-[28rem] overflow-hidden`}>
                                    <Image
                                        src={`https://demo.70e9f1a0f18a49a29a0cd16c9e0750df.lambdaspaces.com/file=${resultImage}`}
                                        alt={resultImage}
                                        fill={true}
                                        className={`object-cover rounded-xl`}
                                    />
                                </div>
                            ) : (
                                <div className={`w-full h-[28rem] bg-zinc-200 rounded-xl animate-pulse`} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageFusion;
