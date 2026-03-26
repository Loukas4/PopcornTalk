 const FormInput = ({ label, ...otherProps}) => {
    return (
        <div className="relative my-[45px]">
            <input className="peer w-full bg-white text-gray-500 text-[18px]
           px-[10px] pt-[10px] pb-[10px] pl-[5px]
           border-b border-gray-500 outline-none" {...otherProps} />
           
            { label && (
              <label className="absolute left-[5px] top-[10px]
                text-gray-500 text-[16px] font-normal
                pointer-events-none
                transition-all duration-300 ease-in
                peer-focus:-top-[14px]
                peer-focus:text-[12px]
                peer-focus:text-black"    
                >
                    {label}
                </label>
                )}
        </div>
    );
};

export default FormInput;