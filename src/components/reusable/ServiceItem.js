const ServiceItem = ({ service, index }) => {
    return (
        <div className="border-b-[1px] py-8 border-[#FFFFFF50] cursor-pointer service-item transition !duration-500 relative">
            <div className="flex items-center">
                <span className="gradient-text text-[12px] font-black opacity-0 transition-all !duration-500 w-0">
                    {`00${index + 1}`.slice(-2)}
                </span>
                <p className="text-md md:text-[20px] font-bold opacity-30 transition-all !duration-500">
                    {service.title}
                </p>
            </div>
            <div className="detail-text text-sm transition-all max-h-0 opacity-0 transition !duration-500">
                {service.text}
            </div>
        </div>
    );
};

export default ServiceItem;
