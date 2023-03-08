import { ArrowButtonIcon } from '../../assets/icons';

const NavButtonGroup = ({
    className,
    onPrev,
    onNext,
    isVertical = false,
    prevDisabled = false,
    nextDisabled = false,
}) => {
    return (
        <div className={`grid grid-cols-2 gap-x-2 w-16 ${className}`}>
            <button
                className={`transition !duration-500 ${isVertical ? '-rotate-90' : 'rotate-180'} w-6 h-6 ${
                    !prevDisabled ? 'hover:opacity-60 transition' : ''
                }`}
                onClick={onPrev}
                disabled={prevDisabled}
            >
                <ArrowButtonIcon fill={!prevDisabled ? '' : '#888888'} />
            </button>
            <button
                className={`transition !duration-500 ${isVertical ? 'rotate-90' : ''} w-6 h-6  ${
                    !nextDisabled ? 'hover:opacity-60 transition' : ''
                }`}
                onClick={onNext}
                disabled={nextDisabled}
            >
                <ArrowButtonIcon fill={!nextDisabled ? '' : '#888888'} />
            </button>
        </div>
    );
};

export default NavButtonGroup;
