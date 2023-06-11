
const Banner = () => {
    return (
        <div className="relative m-4">
            <div
                className="bg-cover bg-center h-80 sm:h-80"
                style={{
                    backgroundImage: "url('https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1380&t=st=1686507841~exp=1686508441~hmac=c97b692caa5d7130ad38eb19eb3575bee29d2efef8008bab2085a76d885dfdfb')",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                            Grab Up to 50% Off
                        </h1>
                        <p className="text-white text-xl sm:text-2xl lg:text-3xl">
                            On Selected Headphones
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

