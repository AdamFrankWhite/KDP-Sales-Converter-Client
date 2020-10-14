import React from "react";
export default function About() {
    return (
        <section id="about">
            {/* <div className="content-frame"> */}
            <h3>About</h3>
            <p>
                Frustrated by the lack of clarity of Kindle author royalty
                reports, with different currencies making it hard to calculate
                royalties at a glance, we created a simple app to convert
                royalties to a chosen currency. The front end is built using
                React, using a currency converter API and React Hooks for a
                smooth user experience. On the back end, a simple Express
                server, hosted on Heroku, uses an external API to conver an
                .xlsx upload to JSON, which the React front end visualises in
                table format.
            </p>
            {/* </div> */}
        </section>
    );
}
