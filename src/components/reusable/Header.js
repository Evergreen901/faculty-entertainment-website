import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/logo/logo.svg';
import LogoFull from '../../assets/logo/logo-full.svg';

const Header = ({ isLightLogo = false, logoClick, contactClick, bgBlack = true }) => {
    const { t } = useTranslation();

    return (
        <div className="fixed top-[24px] md:top-[54px] z-[100] w-screen px-8">
            <div
                className={`max-w-[1200px] mx-auto flex justify-between items-center transition ${
                    bgBlack ? 'bg-black' : ''
                } md:bg-transparent`}
            >
                <Link to="/" onClick={logoClick} className="unselectable">
                    <img
                        src={isLightLogo ? Logo : LogoFull}
                        alt="logo"
                        className={`${!isLightLogo ? 'w-[280px]' : ''}`}
                    />
                </Link>
                <div className="gradient-btn transition text-transparent text-sm" onClick={contactClick}>
                    <span className="absolute z-[200] transition font-bold text-sm text-white">
                        {t('home.get.started')}
                    </span>
                    {t('home.get.started')}
                </div>
            </div>
        </div>
    );
};

export default Header;
