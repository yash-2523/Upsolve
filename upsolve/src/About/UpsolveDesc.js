import React from 'react'

export default function UpsolveDesc() {
    return (
        <section className="col-12 d-flex flex-lg-row flex-md-row flex-column-reverse justify-content-evenly align-items-center py-5 mt-5 mb-5" style={{minHeight: '70vh',rowGap: '2rem'}}>
            <div className="col-lg-5 col-md-6 col-11 mx-auto text-light upsolve-text">
            Upsolve is at your rescue!

            Upsolve is a platform designed to help you improve your competitive programming skills while also keeping a track of your progress.

            It is particularly developed to boost your programming skills by presenting you with progressively tougher challenges each time. Gradually raising the bar can significantly strengthen your skill set.

            The star of the platform is "Upsolve Streak". Solving an Upsolve problem everyday adds to your streak count and helps you maintain it. 

            A leaderboard based on the streak counts is maintained to keep you on your toes (or keyboards)

            And there's a lot more. Nothing can stop you now. Sign up to unlock your full potential! 
            </div>
            <img src="UpsolveLogoTest.png" className="col-lg-5 col-md-6 col-11 mx-auto upsolve-image" style={{height: "70%"}}></img>
        </section>
    )
}
