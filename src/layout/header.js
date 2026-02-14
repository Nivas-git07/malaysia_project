import { FiMail, FiPhone } from "react-icons/fi";

export default function Head() {
    return (
        <div className="topbar">
            <div className="container topbarFlex">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <div className="contact">

                    <span className="contactItem">
                        <FiMail className="contactIcon" />
                        malaysia@gmail.com
                    </span>

                    <span className="contactDivider">|</span>

                    <span className="contactItem">
                        <FiPhone className="contactIcon" />
                        9997776643
                    </span>

                </div>

            </div>
        </div>
    )
}