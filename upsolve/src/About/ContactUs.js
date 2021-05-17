import React, { useState,useRef } from 'react'
import { AddFeedback } from '../Api/feedback.api';
import {Webhook,MessageBuilder} from 'discord-webhook-node';

export default function ContactUs() {

    const [loading,setloading] = useState(false);
    const name = useRef("");
    const email = useRef("");
    const feedback = useRef("");
    const hook = new Webhook('https://discord.com/api/webhooks/843801563846934539/wRQ0qTMn-i-6_M4lN2X60O5Q5kE6UMCW3Fk1brDWh0wVBd_QAZzXe5f6rW6FvYsdM-vA');
    hook.setUsername('Upsolve Feedback');
    

    let HandleSubmit = async (e)=>{
        e.preventDefault();
        setloading(true);
        if(name.current.value === "" || email.current.value === "" || feedback.current.value === ""){
            setloading(false);
            return;
        }
        let response = await AddFeedback(name.current.value,email.current.value,feedback.current.value);
        const msg = new MessageBuilder().setTitle(name.current.value+' has provided a Feedback').addField('Feedback',feedback.current.value).addField('Email',email.current.value)
        name.current.value = "";
        email.current.value = "";
        feedback.current.value = "";
        setloading(false);

        

        hook.send(msg);

    }

    return (
        <section className="col-12 mt-5">
            <h1 className="text-center mb-5 team-section-title">Help Us To Improve</h1>
            <form disabled={loading} className="d-flex justify-content-between align-items-center flex-column col-lg-6 col-md-6 col-10 mx-auto feedback-form mb-5" style={{rowGap: "1rem"}} onSubmit={(e) => {HandleSubmit(e)}}>
                <input type="text" ref={name} required placeholder="Name" className="w-50"></input>
                <input type="email" required ref={email} placeholder="Email" className="w-50"></input>
                <textarea rows="3" required ref={feedback} placeholder="Feedback" className="w-50"></textarea>
                <button type="submit" className="btn btn-primary text-center">{loading ? "Submitting.." : "Submit"}</button>
            </form>
        </section>
    )
}
