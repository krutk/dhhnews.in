import React from 'react'

const welcome = () => {
    return (
        <div className="w-full h-min flex flex-col justify-start items-center lg:p-[100px] md:py-[80px] md:px-[40px] py-[60px] px-[20px] bg-yellow-500 overflow-hidden relative content-center flex-nowrap gap-0 rounded-0"
            style={{
                backgroundColor: "transparent",
                backgroundImage: "radial-gradient(rgb(0, 0, 0) 1px, transparent 1px), radial-gradient(rgb(0, 0, 0) 1px, rgb(255, 182, 0) 1px)",
                backgroundPosition: "0 0, 30px 30px",
                backgroundSize: "60px 60px",
                borderRadius: 0
            }}>
            <div className='w-full h-min flex flex-col justify-start max-w-[1000px] gap-[40px] overflow-visible relative p-0 content-start flex-nowrap'>
                <div className='w-full h-auto whitespace-pre-wrap word-break overflow-visible relative font-normal lg:text-5xl md:text-[40px] text-[32px] text-left '>Welcome to DHHNews.in!</div>
                <div className='w-full h-min flex flex-col justify-center items-center max-w-[600px] overflow-hidden flex-grow-1 flex-shrink-0 flex-basis-0 relative p-0 content-center flex-nowrap gap-[40px] text-[20px] '>
                    <div className='  '>Are you ready to get the freshest updates on Desi Hip Hop? We’ve got you covered! DHHNews.in is your one-stop platform for all things desi and hip hop.</div>
                    <div>From underground rap battles to mainstream bangers, we bring you the latest news, interviews, and reviews in the vibrant world of desi hip hop. Stay ahead of the curve and be the first to know what’s happening in this constantly evolving scene.</div>
                    <div>Enjoy the spiciest desi flavors and the hottest hip hop collaborations without having to sign up just to view. We believe in giving power to the people, so go ahead and explore the site without any restrictions!</div>
                </div>
            </div>
        </div>
    )
}

export default welcome