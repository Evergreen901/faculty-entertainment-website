import { useEffect } from 'react';
import { executives } from '../../config/constants';

const CardSlider = ({ sliderRef }) => {
    useEffect(() => {
        let isDown = false;
        let startX;
        let scrollLeft;

        sliderRef.current?.addEventListener('mousedown', (e) => {
            isDown = true;
            sliderRef.current.classList.add('active');
            startX = e.pageX - sliderRef.current.offsetLeft;
            scrollLeft = sliderRef.current.scrollLeft;
        });
        sliderRef.current?.addEventListener('mouseleave', () => {
            isDown = false;
            sliderRef.current.classList.remove('active');
        });
        sliderRef.current?.addEventListener('mouseup', () => {
            isDown = false;
            sliderRef.current.classList.remove('active');
        });
        sliderRef.current?.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - sliderRef.current.offsetLeft;
            const walk = (x - startX) * 1; //scroll-fast
            sliderRef.current.scrollLeft = scrollLeft - walk;
        });
    });

    return (
        <div
            className="absolute w-screen h-[50vh] md:h-screen flex flex-col justify-center top-[50vh] md:top-0 left-0 overflow-x-scroll hide-scrollbar overflow-y-hidden scroll-auto"
            ref={sliderRef}
        >
            <div className="h-[40vh] md:h-[420px] flex gap-x-8 w-fit pl-[30vw] md:pl-[90vw] pr-[20vw] relative">
                <div className="absolute w-[50%] h-full bg-black left-[50%] z-[20]" />
                {executives.map((item) => (
                    <div
                        key={item.text}
                        className="rounded-xl bg-[#F9F9F910] backdrop-blur-[12px] w-[30vh] md:w-[320px] h-full relative overflow-hidden flex flex-col justify-center items-center z-[100]"
                    >
                        <div className="absolute w-full h-full card-overlay" />
                        <div className="h-[130px] flex items-end">
                            <img src={item.icon} alt="card icon" className="h-[100px] max-w-[100px]" />
                        </div>
                        <p className="font-bold text-xl mt-12">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardSlider;
