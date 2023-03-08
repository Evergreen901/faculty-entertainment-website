import { useEffect, useRef } from 'react';
import { companies } from '../../config/constants';
import { ArrowButtonIcon } from '../../assets/icons';
import useWidth from '../../hooks/useWidth';
import ExternalLink from './ExternalLink';

const CompanySlider = () => {
    const sliderRef = useRef();
    const windowWidth = useWidth();

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

    const moveLeft = () => {
        if (sliderRef.current.scrollLeft === 0) {
            sliderRef.current.scrollLeft = sliderRef.current.scrollWidth;
            return;
        }

        const vw = document.documentElement.clientWidth;
        sliderRef.current.scrollLeft -= windowWidth < 768 ? vw * 0.9 : 550;
    };

    const moveRight = () => {
        if (sliderRef.current.scrollLeft + sliderRef.current.clientWidth === sliderRef.current.scrollWidth) {
            sliderRef.current.scrollLeft = 0;
            return;
        }

        const vw = document.documentElement.clientWidth;
        sliderRef.current.scrollLeft += windowWidth < 768 ? vw * 0.9 : 550;
    };

    return (
        <div className="w-full mt-4 md:mt-8">
            <div
                className="w-full cursor-pointer overflow-x-scroll overflow-y-hidden hide-scrollbar mask-area-horizontal scroll-smooth"
                ref={sliderRef}
            >
                <div className="flex gap-x-3 md:gap-x-6 w-fit md:pl-12">
                    {companies.map((company) => (
                        <ExternalLink to={company.link} key={company.label} className="relative py-[3vh] md:py-12">
                            <div
                                className="absolute h-[80vw] w-[80vw] left-[0vw] -top-[2vh] md:h-[460px] md:w-[460px] md:-right-24 md:-top-12 radial-gradient blur-[12px] rounded-full"
                                style={{
                                    background: company.background,
                                }}
                            />
                            <div className="relative bg-[#FFFFFF15] backdrop-blur-xl h-[30vh] md:h-[260px] w-[90vw] md:w-[460px] rounded-xl flex justify-center items-center">
                                <img src={company.icon} alt="company logo" className="max-h-[60px]" />
                                <span className="absolute px-4 py-2 rounded-[16px] left-6 top-6 text-[10px] md:text-[12px] bg-[#FFFFFF20]">
                                    {company.label}
                                </span>
                            </div>
                        </ExternalLink>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center gap-x-8 my-4 md:mt-8 md:mb-8 overflow-hidden">
                <div className="rotate-180 transition cursor-pointer svg-wrapper" onClick={moveLeft}>
                    <ArrowButtonIcon fill="white" width={32} height={32} />
                </div>
                <div className="transition cursor-pointer" onClick={moveRight}>
                    <ArrowButtonIcon fill="white" width={32} height={32} />
                </div>
            </div>
        </div>
    );
};

export default CompanySlider;
