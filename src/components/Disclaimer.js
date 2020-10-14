import React, { useState } from "react";

export default function Disclaimer() {
    const [disclaimer, toggleDisclaimer] = useState(false);
    return (
        <section id="disclaimer">
            <div className="content-frame">
                <h3 onClick={() => toggleDisclaimer(!disclaimer)}>
                    Disclaimer
                    <i
                        className={
                            disclaimer
                                ? "rotate fa fa-chevron-circle-down"
                                : "fa fa-chevron-circle-down"
                        }
                    ></i>
                </h3>
                <div
                    className={
                        disclaimer ? "disclaimer-cont-show" : "disclaimer-cont"
                    }
                >
                    <p>
                        We do not take liability for any loss or damage
                        including without limitation, indirect or consequential
                        loss or damage, or any loss or damage whatsoever arising
                        out of, or in connection with the use of the website. We
                        put every effort in keeping the website up and running
                        at all times. However, we cannot take responsibility for
                        and will not be liable for, the website being
                        temporarily unavailable due to technical issues that
                        would be beyond our control.
                    </p>
                    <p>
                        Please note that the calculations displayed by this tool
                        may not be 100% accurate, correct and/or complete and
                        that they are intended solely for general information
                        and education purposes. You should not take any action
                        on the basis of the information provided by this
                        application as it should NOT be considered as a
                        substitute for any professional financial service or
                        advice. The creator of this calculator is in no way
                        liable of any actions that might be taken by users.
                    </p>
                </div>
            </div>
        </section>
    );
}
