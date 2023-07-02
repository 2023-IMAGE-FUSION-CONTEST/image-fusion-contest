interface Props {
    image: string | ArrayBuffer | null,
    setImage: any
}

const InputImage = ({ image, setImage }: Props) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        if (e.target.files && e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    return (
        <div className={"flex items-center justify-center w-40 h-40"}>
            {
                image ? (
                    <div className={`relative w-full h-full`}>
                        <div
                            className={`absolute w-6 h-6 rounded-full bg-black/70 flex items-center justify-center right-1 top-1`}
                            onClick={() => {
                                setImage(null);
                            }}
                        >
                            <svg fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-4 h-4`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <img src={image.toString()} alt={"이미지"} className={`w-full h-full object-cover rounded-md`} />
                    </div>
                ) : (
                    <label className={"relative flex flex-col items-center justify-center w-full h-full border-2 border-dashed hover:bg-gray-100 hover:border-gray-300 rounded-md"}>
                        <div className={"flex flex-col items-center justify-center"}>
                            <svg fill="none" stroke="#9CA3AF" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-6 h-6`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <p className={"pt-2 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"}>
                                Select a photo
                            </p>
                        </div>
                        <input type="file" className={`absolute w-full h-full opacity-0`} onInput={handleFileChange} />
                    </label>
                )
            }
        </div>
    );
};

export default InputImage;
