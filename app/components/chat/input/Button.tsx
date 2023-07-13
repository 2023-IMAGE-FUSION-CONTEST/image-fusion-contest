const Button = ({ handleOnClick }: { handleOnClick: Function }) => {
    return (
        <button
            className="w-12 h-full bg-fuchsia-700 text-2xl"
            onClick={e => handleOnClick(e)}
        >
            ▶
        </button>
    );
};

export default Button;
