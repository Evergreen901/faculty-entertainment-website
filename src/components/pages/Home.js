import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import Lottie from 'react-lottie';
import { Widget } from 'react-typeform-embed';
import useWidth from '../../hooks/useWidth';
import { CompanySlider, ExternalLink, Header, ServiceItem } from '../reusable';
import { fourChallenges, services, projects, coInvestors, executives } from '../../config/constants';
import BackImage1 from '../../assets/png/back1.png';
import BackImage2 from '../../assets/png/back2.png';
import BackImage3 from '../../assets/png/back3.png';
import BackImage4 from '../../assets/png/back4.png';
import EntertainmentText from '../../assets/animation/Entertainment.gif';
import RightPlaceText from '../../assets/animation/Right Place.gif';
import ExecutivesText from '../../assets/animation/Executives.gif';
import TurnUpVolumeText from '../../assets/animation/Volume.gif';
import OutstandingText from '../../assets/animation/Outstanding.gif';
import ExpertiseText from '../../assets/animation/Expertise.gif';
import EnterSVG from '../../assets/svg/enter.svg';
import ExclamationSVG from '../../assets/svg/icon-exclamation.svg';
import UnderlineSVG from '../../assets/svg/icon-underline.svg';
import ArrowSVG from '../../assets/svg/arrow-icon.svg';
import DiploVideo from '../../assets/animation/diplo.mp4';

var lastScroll = 0;

const Home = () => {
    const { t } = useTranslation();
    const mainRef = useRef();
    const secondRef = useRef();
    const thirdRef = useRef();
    const fourthRef = useRef();
    const fifthRef = useRef();
    const sixthRef = useRef();
    const seventhRef = useRef();
    const [page, setPage] = useState(0);
    const [selectedChallenge, setChallenge] = useState(-1);
    const windowWidth = useWidth();
    const [swipe, setSwipe] = useState({});
    const scrollCache = windowWidth > 768 ? 1300 : 1300;

    // contact form
    const [step, setStep] = useState(0);
    const videoRef = useRef();

    const moveUp = () => {
        if (page === 1) setPage(0);
        if (page === 2) {
            if (thirdRef.current.scrollTop <= 0) {
                setPage(1);
            }
        }
        if (page === 3) {
            if (fourthRef.current.scrollTop <= 0) setPage(2);
        }
        if (page === 4) {
            if (fifthRef.current.scrollTop <= 0) {
                setPage(3);
            }
        }
        if (page === 5) {
            if (sixthRef.current.scrollTop <= 0) {
                setPage(4);
            }
        }
        if (page === 6) {
            if (seventhRef.current.scrollTop <= 0) {
                setPage(5);
            }
        }
        if (page === 7) {
            setPage(6);
        }
    };

    const moveDown = () => {
        const vw = document.documentElement.clientWidth;
        // const vh = document.documentElement.clientHeight;

        if (!page) setPage(1);
        if (page === 1) {
            setPage(2);
        }
        if (page === 2) {
            if (
                (vw > 768 && thirdRef.current.scrollHeight > thirdRef.current.clientHeight) ||
                thirdRef.current.scrollHeight <= thirdRef.current.clientHeight + thirdRef.current.scrollTop
            ) {
                setPage(3);
            }
        }
        if (page === 3) {
            if (
                Math.abs(
                    fourthRef.current.scrollHeight - fourthRef.current.clientHeight - fourthRef.current.scrollTop
                ) <= 50
            ) {
                setPage(4);
            }
        }
        if (page === 4) {
            if (
                Math.abs(fifthRef.current.scrollHeight - fifthRef.current.clientHeight - fifthRef.current.scrollTop) <=
                50
            ) {
                setPage(5);
            }
        }
        if (page === 5) {
            if (
                Math.abs(sixthRef.current.scrollHeight - sixthRef.current.clientHeight - sixthRef.current.scrollTop) <=
                50
            ) {
                setPage(6);
            }
        }
        if (page === 6) {
            if (
                Math.abs(
                    seventhRef.current.scrollHeight - seventhRef.current.clientHeight - seventhRef.current.scrollTop
                ) <= 50
            ) {
                setPage(7);
            }
        }
    };

    const keyDownHandler = (e) => {
        const timestamp = new Date().getTime();
        if (lastScroll && timestamp < lastScroll + (page === 3 && windowWidth > 768 ? scrollCache : scrollCache)) {
            return;
        }

        lastScroll = timestamp;

        if (e.key === 'ArrowDown' && page < 7) {
            setPage((prev) => prev + 1);
        }

        if (e.key === 'ArrowUp' && page > 0) {
            setPage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };

        // eslint-disable-next-line
    }, [page]);

    if (videoRef.current) videoRef.current.play();

    return (
        <div
            className="w-screen min-h-screen relative overflow-hidden touch-none"
            ref={mainRef}
            onWheel={(e) => {
                const timestamp = new Date().getTime();
                if (lastScroll && timestamp < lastScroll + scrollCache) return;

                lastScroll = timestamp;
                if (e.deltaY > 0) {
                    moveDown();
                } else if (e.deltaY < 0) {
                    moveUp();
                }
            }}
            onTouchStart={(e) => {
                const touch = e.touches[0];
                setSwipe({ x: touch.clientX, y: touch.clientY });
            }}
            onTouchMove={(e) => {
                if (e.changedTouches && e.changedTouches.length) {
                    setSwipe({
                        ...swipe,
                        swiping: true,
                    });
                }
            }}
            onTouchEnd={(e) => {
                const touch = e.changedTouches[0];
                setSwipe({});
                if (swipe.swiping) {
                    const timestamp = new Date().getTime();
                    if (lastScroll && timestamp < lastScroll + scrollCache) {
                        return;
                    }

                    lastScroll = timestamp;
                    const deltaY = Math.abs(touch.clientY - swipe.y);
                    const deltaX = Math.abs(touch.clientX - swipe.x);

                    if (deltaX > deltaY) return;
                    if (swipe.y > touch.clientY + 50) {
                        moveDown();
                    } else if (swipe.y < touch.clientY - 50) {
                        moveUp();
                    }
                }
            }}
        >
            <Header
                isLightLogo={windowWidth <= 768}
                logoClick={() => setPage(0)}
                contactClick={() => {
                    setPage(7);
                    setStep(1);
                }}
                bgBlack={page !== 7 && page !== 0 && page !== 1}
            />
            <section
                className={`overscroll-y-contain w-screen h-screen relative transition duration-1000 overflow-visible ${
                    page === 0 ? 'opacity-100' : 'opacity-0 h-0'
                }`}
            >
                <img
                    className={`w-full h-[80vh] -top-[20vh] object-right-bottom md:top-0 md:w-full md:h-full object-cover ${
                        page === 0 ? 'absolute' : 'fixed'
                    }`}
                    src={BackImage1}
                    alt="background"
                />
                <div
                    className={`${
                        page === 0 ? 'absolute' : 'fixed'
                    } w-[70vw] h-full bg-gradient-to-r from-[#000] to-transparent hidden md:block`}
                />
                <div
                    className={`${
                        page === 0 ? 'absolute' : 'fixed'
                    } w-[20vw] h-full right-0 bg-gradient-to-l from-[#000] to-transparent hidden mb:block`}
                />
                <div
                    className={`${
                        page === 0 ? 'absolute' : 'fixed'
                    } w-full h-[30vh] bg-gradient-to-b from-[#000] to-transparent`}
                />
                <div
                    className={`${
                        page === 0 ? 'absolute' : 'fixed'
                    } w-full h-[30vh] top-[31vh] md:top-[unset] md:bottom-0 bg-gradient-to-t from-[#000] to-transparent`}
                />
                <div className="w-full h-full px-8 relative ">
                    <div className="max-w-[1200px] mx-auto h-screen grid md:grid-cols-2 items-end">
                        <div className="md:col-span-1 pb-[15vh] md:pb-[10vh]">
                            <h1 className="relative text-[40px] max-w-[300px] leading-[50px] mobile:max-w-[500px] mobile:leading-[60px] md:max-w-[100vw] md:text-[53px] md:leading-[65px] font-bold md:whitespace-pre">
                                {t('home.title1')}
                                <div className="w-[300px] md:w-[400px] h-[60px] inline-block relative">
                                    <img
                                        className="absolute -top-[60px] -left-[10px] md:-top-[80px] md:left-[0px]"
                                        src={EntertainmentText}
                                        alt="entertainment"
                                    />
                                </div>
                            </h1>
                            <p className="max-w-[320px] md:max-w-[420px] text-sm leading-[24px] mt-4 md:mt-8">
                                {t('home.text1')}
                            </p>
                            <div
                                className="gradient-text text-sm font-black w-fit mt-10 md:mt-[60px] cursor-pointer hover:opacity-20 transition duration-500 relative z-[100]"
                                onClick={() => setPage(1)}
                            >
                                {t('home.find.out.more')}
                            </div>
                        </div>
                        <div className="hidden col-span-1 pb-[10vh] pr-8 md:flex flex-col items-end">
                            <div className="flex flex-col text-sm">
                                <p className="w-fit font-bold">{t('home.position1')}</p>
                                <p className="w-fit">{t('home.supported.by')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className={`overscroll-y-contain w-screen min-h-screen md:h-screen relative transition duration-1000 overflow-visible ${
                    page === 1 || page === 2 ? 'opacity-100' : 'min-h-0 !h-0 opacity-0 pointer-events-none'
                } ${page === 0 ? '-top-[100vh]' : 'top-0'}`}
                ref={secondRef}
            >
                <div
                    className={`w-screen h-screen z-10 transition-all duration-1000 ${
                        page === 2 ? 'fixed opacity-0' : 'absolute opacity-100'
                    } ${page === 3 ? 'absolute opacity-0' : ''}`}
                >
                    <img
                        className={`w-screen h-[80vh] -top-[10vh] object-cover md:top-0 md:h-full md:object-contain absolute md:ml-[20vw] second-section-image transition ${
                            page === 2 ? 'opacity-0' : 'opacity-100'
                        }`}
                        src={BackImage2}
                        alt="background"
                    />
                    <div className="absolute w-full h-full mix-blend-color bg-black transition-all" />
                    <div className="absolute w-full h-full bg-gradient-to-r from-[#000000C0] to-transparent transition-all" />
                    <div className="absolute w-[20vw] h-full right-0 bg-gradient-to-l from-[#000] to-transparent hidden md:block transition-all" />
                    <div className="absolute w-full h-[30vh] bg-gradient-to-b from-[#000] to-transparent transition-all" />
                    <div className="absolute w-full h-[70vh] bottom-[30vh] md:bottom-0 bg-gradient-to-t from-[#000] to-transparent transition-all" />
                </div>
                <div
                    className={`w-full h-full px-8 z-20 transition-all transition duration-1000 ${
                        page === 2 || page === 3 ? 'absolute -top-[100vh]' : 'absolute -top-0'
                    }`}
                >
                    <div className="max-w-[1200px] mx-auto h-screen grid md:grid-cols-2 items-end relative">
                        <div className="md:col-span-1 pb-[10vh] md:pb-[20vh] md:pl-[170px]">
                            <h1 className="text-[40px] md:text-[53px] font-bold relative">
                                {t('home.title2')}
                                <div className="w-[80%] h-[80px] inline-block" />
                                <img
                                    className="absolute max-w-[300px] w-[80%] top-[20px] -left-[10px]"
                                    src={RightPlaceText}
                                    alt="Right Place"
                                />
                            </h1>
                            <p className="max-w-[357px] md:max-w-[420px] text-sm leading-[24px] mt-8">
                                {t('home.text2')}
                            </p>
                            <p className="max-w-[380px] text-sm font-bold leading-[24px] mt-8">{t('home.text3')}</p>
                        </div>
                        <div
                            className={`hidden col-span-1 pb-[10vh] pr-8 md:flex flex-col items-end transition ${
                                page !== 1 ? 'opacity-0' : 'opacity-100'
                            }`}
                        >
                            <div className="flex flex-col text-sm">
                                <p className="w-fit font-bold">{t('home.position2')}</p>
                                <p className="w-fit">{t('home.supported.by')}</p>
                            </div>
                        </div>
                        {(windowWidth >= 768 || (thirdRef.current && thirdRef.current.scrollTop === 0)) && (
                            <div
                                className={`absolute bg-gradient-to-b from-yellow-100 to-red-100 w-[1px] left-[2vw] md:left-[180px] transition-all !duration-[1000ms] ${
                                    page === 1
                                        ? 'h-[20vh] -bottom-[15vh] md:h-[200px] md:-bottom-[150px]'
                                        : 'h-[5vh] -bottom-[35vh] md:h-[50px] md:-bottom-[250px]'
                                }`}
                            />
                        )}
                    </div>
                </div>
                <div
                    className={`w-full h-screen px-8 pb-10 md:pb-0 z-10 transition-all transition duration-1000 overflow-y-scroll md:overflow-hidden ${
                        page === 2 || page === 3 ? 'absolute top-0' : 'absolute top-[100vh]'
                    }`}
                    ref={thirdRef}
                >
                    <div className="max-w-[900px] pb-[15vh] pt-[25vh] md:pb-0 md:pt-[150px] mx-auto min-h-screen items-end relative">
                        <p className="text-md text-white font-bold md:pl-4">{t('home.four.challenges')}</p>
                        <div
                            className={`md:hidden absolute bg-gradient-to-b from-yellow-100 to-red-100 w-[1px] left-[2vw] md:left-[180px] transition-all !duration-[1000ms] h-[5vh] top-[30vh]`}
                        />
                        <div className="mt-[10vh] md:mt-[100px]">
                            {fourChallenges.map((item, index) => (
                                <div className="overflow-hidden" key={item.title}>
                                    <div
                                        className={`cursor-pointer px-8 bg-[#151515] flex flex-col mobile:flex-row md:items-center w-full rounded-[5px] transition-all duration-500 ease-in-out ${
                                            index !== selectedChallenge && selectedChallenge >= 0
                                                ? 'max-h-0 opacity-0'
                                                : 'max-h-[40vh] md:max-h-[100px] mt-[14px] py-[20px] opacity-100'
                                        }`}
                                        onClick={(e) => {
                                            setChallenge(index === selectedChallenge ? -1 : index);
                                        }}
                                    >
                                        <div className="">
                                            <p className="text-sm md:text-md font-bold">{item.title}</p>
                                            <p className="text-sm md:text-md">{item.category}</p>
                                        </div>
                                        <div className="flex items-center mt-6 mobile:mt-0 mobile:ml-auto">
                                            <span className="gradient-text-vertical font-black text-[12px] md:text-sm">
                                                {item.tag}
                                            </span>
                                            <div className="relative bg-gradient-to-b from-yellow-100 to-red-100 w-[14px] h-[2px] ml-8">
                                                <div
                                                    className={`absolute bg-gradient-to-b from-yellow-100 to-red-100 transition-all ${
                                                        index !== selectedChallenge
                                                            ? 'w-[2px] h-[14px] left-[6px] -top-[6px]'
                                                            : 'w-[14px] h-[2px] left-0 top-0'
                                                    } `}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`bg-black px-[16px] md:px-[32px] transition-all duration-500 ease-in-out ${
                                            index === selectedChallenge
                                                ? 'max-h-[500px] py-[16px] md:py-[42px] '
                                                : 'max-h-0'
                                        }`}
                                    >
                                        <p className="text-sm md:text-md italic whitespace-pre-line">{item.text}</p>
                                        <div className="gradient-btn transition text-transparent text-sm md:text-md w-fit mt-10">
                                            <span className="absolute z-[200] transition font-bold text-sm md:text-md text-white">
                                                {item.ask}
                                            </span>
                                            {item.ask}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section
                className={`overscroll-y-contain overflow-visible w-screen h-screen relative transition duration-1000 touch-none ${
                    page === 3 ? 'opacity-100' : 'h-0 opacity-0 pointer-events-none'
                } ${page === 2 ? '-top-[100vh] ' : 'top-[0vh]'}`}
            >
                <div
                    className={`transition absolute w-full ${
                        page === 3 ? 'h-full opacity-100' : 'h-[100vh] opacity-0'
                    }`}
                >
                    <img
                        className="hidden md:block absolute h-[85vh] -right-[0vw] max-h-[50vw] bottom-0 opacity-70 transition"
                        src={BackImage3}
                        alt="background"
                    />
                    <div className="hidden md:block absolute w-full h-[20vh] bottom-[0vh] bg-gradient-to-t from-[#000] to-transparent" />
                    <div className="hidden md:block absolute w-full h-[100vh] bg-black mix-blend-color" />
                </div>
                <div
                    className={`w-full h-full px-8 relative ${
                        page === 3 ? 'overflow-y-scroll md:overflow-visible' : 'overflow-visible'
                    } hide-scrollbar`}
                    ref={fourthRef}
                >
                    <div className="max-w-[1200px] mx-auto h-screen">
                        <div className="w-full h-full relative">
                            <h1 className="pt-[25vh] md:pt-[150px] relative text-[24px] leading-[28px] md:text-[36px] md:leading-[42px] font-semibold text-center  z-[10]">
                                Faculty Entertainment works with the
                                <div className="w-[150px] md:w-[200px] h-[28px] md:h-[40px] inline-block relative">
                                    <img
                                        src={ExecutivesText}
                                        alt="executives"
                                        className="absolute -top-[28px] md:-top-[35px]"
                                    />
                                </div>
                                <br className="block" />
                                who seek advice, investment, & operational support in:
                            </h1>
                            <div className="flex flex-wrap justify-center max-w-[600px] md:max-w-[800px] mt-12 pb-[20vh] md:pb-0 mx-auto md:mx-0">
                                {executives.map((item, index) => (
                                    <div
                                        key={item.text}
                                        className="px-4 py-4 mobile:py-8 mobile:px-12 flex flex-col items-center h-[160px] md:h-[250px] justify-end"
                                    >
                                        <img
                                            src={item.icon}
                                            alt={`${item.text} logo`}
                                            className={`max-h-[60px] max-w-[60px] mobile:max-h-[100px] mobile:max-w-[100px] ${
                                                index === 2 ? 'pb-2 mobile:pb-4' : ''
                                            }`}
                                        />
                                        <div className="flex items-center h-[60px] mobile:h-[80px] pt-4 mobile:pt-8">
                                            <p className="font-bold text-sm mobile:text-xl whitespace-pre text-center">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="md:flex flex-col text-sm absolute right-0 bottom-[40px] hidden items-end">
                                <p className="w-fit font-bold">{t('home.position3')}</p>
                                <p className="w-fit">{t('home.supported.by')}</p>
                            </div>
                        </div>
                        {/* <CardSlider sliderRef={sliderRef} /> */}
                    </div>
                </div>
            </section>
            <section
                className={`overscroll-y-contain w-screen h-screen relative transition duration-1000 overflow-y-scroll md:overflow-visible ${
                    page === 4 ? 'opacity-100' : 'h-0 opacity-0 pointer-events-none'
                }  ${page === 3 ? '-top-[100vh] ' : 'top-0'}`}
            >
                <div
                    className={`w-full h-full px-8 relative ${
                        page === 4 ? 'overflow-y-scroll md:overflow-visible' : 'overflow-visible'
                    } hide-scrollbar`}
                    ref={fifthRef}
                >
                    <div className="max-w-[1200px] mx-auto md:min-h-screen justify-center pb-[20vh] md:pb-[80px] pt-[10vh] md:pt-[120px]">
                        <div className="md:grid md:grid-cols-12">
                            <div className="md:col-span-5">
                                <h1 className="relative text-[24px] leading-[32px] md:text-[34px] md:leading-[42px] font-bold mt-24">
                                    <img
                                        src={TurnUpVolumeText}
                                        alt="turn up the volume"
                                        className="max-w-[300px] mobile:max-w-[400px] absolute -top-[80px] mobile:-top-[110px] -left-[20px]"
                                    />
                                    <br />
                                    with expertise where
                                    <br />
                                    you need it most
                                </h1>
                                <p className="text-sm leading-[22px] mt-[40px] max-w-[400px]">
                                    {t('home.services.text')}
                                </p>
                            </div>
                            <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-12">
                                <div className="flex flex-col">
                                    {services.map(
                                        (service, index) =>
                                            index < 5 && (
                                                <ServiceItem service={service} index={index} key={service.title} />
                                            )
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    {services.map(
                                        (service, index) =>
                                            index > 4 && (
                                                <ServiceItem service={service} index={index} key={service.title} />
                                            )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className={`overscroll-y-contain w-screen h-screen relative transition duration-1000 ${
                    page === 5 ? 'opacity-100' : 'h-0 opacity-0 pointer-events-none'
                }  ${page === 4 ? '-top-[100vh] ' : 'top-0'}`}
            >
                <div
                    className={`w-screen md:w-full h-full px-8 relative ${
                        page === 5 ? 'overflow-y-scroll' : 'overflow-visible'
                    }  hide-scrollbar`}
                    ref={sixthRef}
                >
                    <div className="max-w-[100vw] md:max-w-[1300px] mx-auto min-h-screen flex flex-col pt-[20vh] pb-[20vh] md:pb-[40px] md:pt-[120px]">
                        <h1 className="relative text-center text-[24px] leading-[32px] md:text-[34px] md:leading-[36px] font-bold">
                            Meet just a few of our
                            <div className="inline-block w-[200px] h-[40px] relative ml-2">
                                <img src={OutstandingText} alt="outstanding" className="absolute -top-[30px]" />
                            </div>
                            <br />
                            VIPs, MVPs, Clients & Partners
                        </h1>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10 mt-8">
                            <div className="w-full relative md:overflow-visible">
                                <div className="w-full flex items-center">
                                    <p className="text-sm opacity-50 bg-black -top-[8px]">Projects</p>
                                    <div className="bg-[#FFFFFF80] h-[1px] w-full ml-4" />
                                </div>
                                <div className="absolute w-20 h-full -left-[92px] top-0 hidden laptop:flex flex-col pt-6">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="w-full h-[140px] bg-[#151515] mt-3" />
                                    ))}
                                </div>
                                <div className="absolute w-20 h-full -left-[92px] top-0 bg-gradient-to-r from-black to-transparent hidden laptop:block" />
                                <div className="grid grid-cols-3 gap-x-3 gap-y-3 relative mt-4">
                                    {projects.map((project, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#151515] h-[12vh] md:h-[140px] project-item relative cursor-pointer p-4 flex flex-col justify-between"
                                        >
                                            {windowWidth <= 768 ? (
                                                <ExternalLink
                                                    to={project.link ?? 'https://faculty.group'}
                                                    className="w-full h-full absolute flex items-center justify-center image-wrapper transition !duration-500 left-0 top-0"
                                                >
                                                    <img
                                                        src={project.icon}
                                                        alt="project icon"
                                                        className="max-w-[60%] max-h-[50%]"
                                                    />
                                                </ExternalLink>
                                            ) : (
                                                <div className="w-full h-full absolute flex items-center justify-center image-wrapper transition !duration-500 left-0 top-0">
                                                    <img
                                                        src={project.icon}
                                                        alt="project icon"
                                                        className="max-w-[60%] max-h-[50%]"
                                                    />
                                                </div>
                                            )}
                                            <div className="max-h-[80%] overflow-y-hidden custom-scrollbar transition !duration-500 opacity-0 mask-area pointer-events-none md:pointer-events-auto">
                                                <p className="text-[12px]">{project.text}</p>
                                            </div>
                                            <ExternalLink
                                                to={project.link ?? 'https://faculty.group'}
                                                className="text-[12px] transition duration-500 opacity-0 hover:!opacity-30 hidden md:block"
                                            >
                                                Visit Site
                                            </ExternalLink>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full relative mt-8 md:mt-0">
                                <div className="w-full flex items-center">
                                    <p className="text-sm opacity-50 bg-black -top-[8px] whitespace-nowrap">
                                        Co-Investors and Partners
                                    </p>
                                    <div className="bg-[#FFFFFF80] h-[1px] w-full ml-4" />
                                </div>
                                <div className="absolute w-20 h-full -right-[92px] top-0 hidden laptop:flex flex-col pt-6">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="w-full h-[140px] bg-[#151515] mt-3" />
                                    ))}
                                </div>
                                <div className="absolute w-20 h-full -right-[92px] top-0 bg-gradient-to-l from-black to-transparent hidden laptop:block" />
                                <div className="grid grid-cols-3 gap-x-3 gap-y-3 relative mt-4">
                                    {coInvestors.map((project, index) => (
                                        <ExternalLink
                                            key={index}
                                            to={project.link ?? 'https://faculty.group'}
                                            className="bg-[#151515] h-[12vh] md:h-[140px] project-item relative cursor-pointer flex items-center justify-center"
                                        >
                                            <img
                                                src={project.icon}
                                                alt="project icon"
                                                className="max-w-[60%] max-h-[50%]"
                                            />
                                        </ExternalLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="mt-10 text-center opacity-30 text-sm">{t('home.partners.disclaimer')}</p>
                        <div className="max-w-[1200px] w-full h-[60px] md:h-[80px] flex justify-center mt-4 md:mt-auto mx-auto">
                            <img className="h-full" src={ArrowSVG} alt="arrow icon" />
                        </div>
                    </div>
                </div>
            </section>
            <section
                className={`overscroll-y-contain w-screen h-screen relative transition duration-1000 ${
                    page === 6 ? 'opacity-100' : 'h-0 opacity-0 pointer-events-none'
                }  ${page === 5 ? '-top-[100vh] ' : 'top-0'}`}
            >
                <div
                    className={`w-full h-full px-[5vw] md:px-8 relative ${
                        page === 6 ? 'overflow-clip ' : 'overflow-visible'
                    }  hide-scrollbar`}
                    ref={seventhRef}
                >
                    <div className="max-w-[1400px] mx-auto min-h-screen md:pt-[120px] md:pb-[0px]">
                        <h1 className="text-center text-[24px] leading-[32px] md:text-[34px] md:leading-[36px] font-bold pt-[20vh] md:pt-0">
                            Your success requires <br className="block md:hidden" />
                            deep
                            <br className="hidden md:block" />
                            <div className="inline-block w-[120px] md:w-[150px] h-[30px] md:h-[40px] relative ml-2 md:ml-0 md:mr-2">
                                <img src={ExpertiseText} alt="outstanding" className="absolute -top-[15px]" />
                            </div>
                            <br className="block md:hidden" />
                            in multiple disciplines
                        </h1>
                        <p className="text-sm md:text-md text-center mt-6 max-w-[500px] mx-auto">
                            {t('home.companies.text')}
                        </p>
                        <CompanySlider />
                    </div>
                </div>
            </section>
            <section
                className={`w-screen h-screen relative transition duration-1000 ${
                    page === 7 ? 'opacity-100' : 'h-0 opacity-0 -top-[100vh] pointer-events-none'
                }`}
            >
                {windowWidth > 768 ? (
                    // <img
                    //     className="w-screen h-screen object-cover absolute"
                    //     src={BackImage4}
                    //     alt="background"
                    // />
                    <video autoPlay muted loop className={`w-screen h-screen object-cover absolute`} ref={videoRef}>
                        <source src={DiploVideo} />
                    </video>
                ) : (
                    <div className="w-screen h-screen absolute flex justify-end">
                        <img
                            className="w-auto max-w-[unset] h-screen relative -mr-[40vw]"
                            src={BackImage4}
                            alt="background"
                        />
                        {/* <video autoPlay muted loop className={`w-auto max-w-[unset] h-screen relative -mr-[60vw]`}>
                            <source src={DiploVideo} />
                        </video> */}
                    </div>
                )}
                <div className="absolute w-screen h-screen bg-black mix-blend-color" />
                <div
                    className={`absolute w-screen top-[0vh] md:top-unset h-screen bg-gradient-to-r from-black to-transparent hidden md:block`}
                />
                <div
                    className={`absolute w-screen top-[50vh] h-[50vh] bg-gradient-to-t from-black to-transparent block md:hidden`}
                />
                <div className="absolute w-screen h-[40vh] bg-gradient-to-b from-black to-transparent" />
                <div className="w-full h-full px-8 relative ">
                    <div className="max-w-[1200px] mx-auto h-screen">
                        {step === 0 && (
                            <div className="w-full h-full flex flex-col justify-center items-center relative">
                                <h1 className="text-[60px] leading-[72px] md:leading-[120px] md:text-[80px] font-bold text-center w-fit relative">
                                    Let's get
                                    <br className="block md:hidden" /> started
                                    <img
                                        className="absolute h-[70px] md:h-[110px] w-[40px] bottom-[10px] md:bottom-[30px] -right-[25px] md:-right-[45px]"
                                        src={ExclamationSVG}
                                        alt="exclamation mark"
                                    />
                                    <img
                                        className="absolute h-[30px] w-[180px md:w-[230px] -bottom-[30px] md:bottom-[0px] right-[35px]"
                                        src={UnderlineSVG}
                                        alt="exclamation mark"
                                    />
                                </h1>
                                <div className="flex items-center mt-12 md:mt-10">
                                    <div
                                        className="bg-gradient-to-r from-red-100 to-yellow-100 rounded-[32px] px-8 py-3 text-[#000000] font-black text-sm transition !duration-500 hover:opacity-70 cursor-pointer whitespace-nowrap"
                                        onClick={() => setStep(1)}
                                    >
                                        Next Steps
                                    </div>
                                    <img className="hidden md:block ml-8 mt-1" src={EnterSVG} alt="press enter" />
                                    <span className="hidden md:block text-sm md:text-md opacity-60 ml-2 whitespace-nowrap">
                                        Press Enter
                                    </span>
                                </div>
                                <div className="absolute bottom-8 left-0 w-full flex justify-center md:justify-between items-center">
                                    <p className="text-sm opacity-70 text-center md:text-left">
                                        Copyright © 2022 Faculty Entertainment. All Rights Reserved
                                    </p>
                                    <div className="hidden md:flex flex-col text-sm">
                                        <p className="w-fit font-bold">{t('home.position4')}</p>
                                        <p className="w-fit">{t('home.supported.by')}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="max-w-[1200px] mx-auto w-full h-full relative">
                            <div className="mx-auto w-full h-full flex flex-col justify-center">
                                {/* <h1 className="text-xl md:text-2xl lg:text-4xl font-bold md:font-extrabold whitespace-pre-line">
                                    {t(`contact.question${step}`)}
                                </h1>

                                {step === 1 && (
                                    <div className="flex flex-col items-start md:items-end md:flex-row">
                                        <input
                                            type="text"
                                            value={name || ''}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="custom-input mt-8 w-full"
                                            onKeyDown={name ? enterHandler : void 0}
                                        />
                                        <PrimaryButton
                                            text="Next"
                                            className={`!px-14 opacity-100 mt-8 md:mt-0 md:ml-8`}
                                            onClick={onNext}
                                            disabled={!name}
                                        />
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="flex flex-col items-start md:items-end md:flex-row">
                                        <input
                                            type="text"
                                            value={email || ''}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="custom-input mt-8 w-full"
                                            onKeyDown={email ? enterHandler : void 0}
                                        />
                                        <PrimaryButton
                                            text="Next"
                                            className={`!px-14 opacity-100 mt-8 md:mt-0 md:ml-8`}
                                            onClick={onNext}
                                            disabled={!email}
                                        />
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="flex flex-col items-start md:items-end md:flex-row">
                                        <input
                                            type="text"
                                            value={project || ''}
                                            onChange={(e) => setProject(e.target.value)}
                                            placeholder="Enter your project/company"
                                            className="custom-input mt-8 w-full"
                                            onKeyDown={email ? enterHandler : void 0}
                                        />
                                        <PrimaryButton
                                            text="Next"
                                            className={`!px-14 opacity-100 mt-8 md:mt-0 md:ml-8`}
                                            onClick={onNext}
                                            disabled={!project}
                                        />
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="flex flex-col items-start md:items-end md:flex-row">
                                        <textarea
                                            value={message || ''}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Enter your message"
                                            className="custom-input mt-8 !h-[200px]"
                                        />
                                        <PrimaryButton
                                            text="Submit"
                                            className="!px-14 mt-8 md:mt-0 md:ml-8"
                                            onClick={handleSubmit}
                                            disabled={!message || loading}
                                            isLoading={loading}
                                        />
                                        <GoogleReCaptcha onVerify={(token) => setToken(token)} />
                                    </div>
                                )}
                                <div className="-mt-8 md:mt-32">
                                    {step > 0 && lastStep > 0 && (
                                        <NavButtonGroup
                                            className="float-right"
                                            onNext={onNext}
                                            onPrev={onPrev}
                                            prevDisabled={step < 2}
                                            nextDisabled={step >= lastStep}
                                        />
                                    )}
                                </div> */}
                                {/* <Widget
                                    id="tjoPBa1V"
                                    style={{
                                        width: '100%',
                                        height: 'calc(100vh - 200px)',
                                        maxHeight: '700px',
                                    }}
                                    options={{
                                        opacity: 0,
                                    }}
                                    className="my-form"
                                /> */}
                                <Widget
                                    id="tjoPBa1V"
                                    style={{
                                        width: '100%',
                                        height: 'calc(100vh - 200px)',
                                        maxHeight: '700px',
                                    }}
                                    opacity={0}
                                />
                            </div>
                            <div className="absolute bottom-8 left-0 w-full flex justify-center md:justify-between items-center">
                                <p className="text-sm opacity-70 text-center md:text-left">
                                    Copyright © 2022 Faculty Entertainment. All Rights Reserved
                                </p>
                                <div className="hidden md:flex flex-col text-sm">
                                    <p className="w-fit font-bold">{t('home.position4')}</p>
                                    <p className="w-fit">{t('home.supported.by')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
