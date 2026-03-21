import SignUpForm from "../sign-up-form/sign-up-form";
import SignInForm from "../sign-in-form/sign-in-form";


    const Authentication = () => {
    return (
        <div className="flex w-[900px] justify-between my-[170px] mx-auto">
            
            <div className="fixed inset-0 bg-[url('/popcornimage.png')] 
                bg-repeat bg-[length:150px] 
                opacity-10 mix-blend-multiply 
                pointer-events-none z-0">
            </div>
            <h1 className="text-6xl font-black drop-shadow-xl absolute inset-x-95 top-10 h-16 ">🍿 PopcornTalk 🍿</h1>
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
};

export default Authentication;