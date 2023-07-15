'use client';

import {useChatToggle, useSelectedArtwork} from "@/app/store/state";

const FloatingButton = () => {
    const toggle = useChatToggle(state => state.change);
    const artworkSelected = useSelectedArtwork(state => state.selected);

    return (
        <>
            {
                artworkSelected && (
                    <div
                        className={`
                            fixed
                            left-10
                            bottom-10
                            w-16
                            h-16
                            bg-purple-800
                            z-50
                            rounded-full
                            flex
                            justify-center
                            items-center
                            shadow-xl
                        `}
                        onClick={toggle}
                    >
                        <div className={`relative`}>
                            <div>
                                <svg fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-10 h-10`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                </svg>
                            </div>
                            <div className={`absolute top-0`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="w-10 h-10"
                                    color="#372feb"
                                    viewBox="0 0 48 48"
                                >
                                    <g fill="#fff" fillOpacity="0.15" filter="url(#filter0_f)">
                                        <path d="M19.846 20.154c0 2.294-.606 4.154-2.423 4.154-1.817 0-2.423-1.86-2.423-4.154C15 17.86 15.606 16 17.423 16c1.817 0 2.423 1.86 2.423 4.154zM24 29.846c-2.799 0-4.24-2.263-4.69-3.862-.148-.531.292-.984.844-.984h7.692c.552 0 .993.453.843.984-.449 1.599-1.89 3.862-4.689 3.862zM30.577 24.308c1.817 0 2.423-1.86 2.423-4.154C33 17.86 32.394 16 30.577 16c-1.818 0-2.423 1.86-2.423 4.154 0 2.294.605 4.154 2.423 4.154z"></path>
                                    </g>
                                    <path
                                        fill="#372feb"
                                        d="M19.846 19.154c0 2.294-.606 4.154-2.423 4.154-1.817 0-2.423-1.86-2.423-4.154C15 16.86 15.606 15 17.423 15c1.817 0 2.423 1.86 2.423 4.154z"
                                    ></path>
                                    <path
                                        fill="#17113F"
                                        fillOpacity="0.7"
                                        d="M19.846 19.154c0 2.294-.606 4.154-2.423 4.154-1.817 0-2.423-1.86-2.423-4.154C15 16.86 15.606 15 17.423 15c1.817 0 2.423 1.86 2.423 4.154z"
                                    ></path>
                                    <path
                                        fill="#372feb"
                                        d="M24 28.846c-2.799 0-4.24-2.263-4.69-3.862-.148-.531.292-.984.844-.984h7.692c.552 0 .993.453.843.984-.449 1.599-1.89 3.862-4.689 3.862z"
                                    ></path>
                                    <path
                                        fill="#17113F"
                                        fillOpacity="0.7"
                                        d="M24 28.846c-2.799 0-4.24-2.263-4.69-3.862-.148-.531.292-.984.844-.984h7.692c.552 0 .993.453.843.984-.449 1.599-1.89 3.862-4.689 3.862z"
                                    ></path>
                                    <path
                                        fill="#372feb"
                                        d="M30.577 23.308c1.817 0 2.423-1.86 2.423-4.154C33 16.86 32.394 15 30.577 15c-1.818 0-2.423 1.86-2.423 4.154 0 2.294.605 4.154 2.423 4.154z"
                                    ></path>
                                    <path
                                        fill="#17113F"
                                        fillOpacity="0.7"
                                        d="M30.577 23.308c1.817 0 2.423-1.86 2.423-4.154C33 16.86 32.394 15 30.577 15c-1.818 0-2.423 1.86-2.423 4.154 0 2.294.605 4.154 2.423 4.154z"
                                    ></path>
                                    <defs>
                                        <filter
                                            id="filter0_f"
                                            width="22"
                                            height="17.846"
                                            x="13"
                                            y="14"
                                            colorInterpolationFilters="sRGB"
                                            filterUnits="userSpaceOnUse"
                                        >
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                            <feBlend
                                                in="SourceGraphic"
                                                in2="BackgroundImageFix"
                                                result="shape"
                                            ></feBlend>
                                            <feGaussianBlur
                                                result="effect1_foregroundBlur"
                                                stdDeviation="1"
                                            ></feGaussianBlur>
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
};

export default FloatingButton;
