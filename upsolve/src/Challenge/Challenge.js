import React from 'react';
import NavigationMenu from '../NavigationMenu';
import ChallengeContent from './ChallengeContent';
import AuthGaurd from '../authGaurd';

function Challenge() {
    return(
        <div>
            <AuthGaurd>
                <NavigationMenu></NavigationMenu>

                <ChallengeContent></ChallengeContent>
            </AuthGaurd>
        </div>
    )
}

export default Challenge;