import React from 'react'
import NavigationMenu from '../NavigationMenu'
import ContactUs from './ContactUs'
import Team from './Team'
import UpsolveDesc from './UpsolveDesc'

export default function AboutPage() {
    return (
        <>
            <NavigationMenu></NavigationMenu>
            <UpsolveDesc></UpsolveDesc>
            <Team></Team>
            <ContactUs></ContactUs>
        </>
    )
}
