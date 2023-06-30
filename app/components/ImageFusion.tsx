"use client";

import { useState } from "react";
import InputImage from "@/app/components/InputImage";

const ImageFusion = () => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    return (
        <div className={`mt-4`}>
            <div className={`text-2xl`}>이미지 합성</div>
            <InputImage image={image} setImage={setImage} />
        </div>
    );
};

export default ImageFusion;
