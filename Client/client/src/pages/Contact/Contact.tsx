
import { Container } from "react-bootstrap";
import "../../styles/Contact/Contact.css";


const Contact = () => {
  return (
    <>
      {/* ===== CONTACT SECTION ===== */}
      <section className="home-contact-section">
        <Container>
          <div className="home-contact-panel">

            <div className="home-contact-form-wrap">
              <p className="home-contact-eyebrow">CONTACT NOW</p>
              <h2>Have Question? Write a Message</h2>

              <form className="home-contact-form">
                <div className="home-contact-fields">
                  <input
                    type="text"
                    placeholder="Full Name"
                    aria-label="Full Name"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    aria-label="Email Address"
                  />

                  <input
                    type="tel"
                    placeholder="Contact Number"
                    aria-label="Contact Number"
                  />

                  <input
                    type="text"
                    placeholder="Subject"
                    aria-label="Subject"
                  />
                </div>

                <textarea
                  placeholder="Message"
                  aria-label="Message"
                ></textarea>

                <button type="submit">
                  Submit <span>&rsaquo;</span>
                </button>

                <p className="home-contact-note">
                  We hate spam, and we respect your privacy.
                </p>
              </form>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;