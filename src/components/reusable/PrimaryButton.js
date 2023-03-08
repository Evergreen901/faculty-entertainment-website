import { Loading180Ring } from '../../assets/loading';

const PrimaryButton = ({ text, className, clickHandler, isLoading = false, ...rest }) => {
    return (
        <button
            className={`text-white text-[16px] px-8 py-[11px] rounded-full transition btn-primary ${className} ${
                isLoading ? 'flex items-center justify-center' : ''
            }`}
            onClick={clickHandler}
            {...rest}
        >
            {isLoading && (
                <div className="relative z-10 mr-2">
                    <Loading180Ring width={24} height={24} fill="white" />
                </div>
            )}
            <span className="relative z-10 font-semibold">{text}</span>
        </button>
    );
};

export default PrimaryButton;
