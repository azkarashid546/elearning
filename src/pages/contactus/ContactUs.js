import React from "react";

const ContactUs = () => {
  return (
    <>
      <main>
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-xl-6">
              <div className="row row-cols-md-2 g-4">
                <div
                  className="aos-item"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="aos-item__inner">
                    <div className="hvr-shutter-out-horizontal d-block p-3">
                      <div className="d-flex justify-content-start">
                        <i className="fa-solid fa-envelope h3 pe-2 text-primary"></i>
                        <span className="h5">Email</span>
                      </div>
                      <span>azkarashid196@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div
                  className="aos-item"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="aos-item__inner">
                    <div className="hvr-shutter-out-horizontal d-block p-3">
                      <div className="d-flex justify-content-start">
                        <i className="fa-solid fa-phone h3 pe-2 text-primary"></i>
                        <span className="h5">Phone</span>
                      </div>
                      <span>+923055358098</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="aos-item mt-4"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="aos-item__inner">
                  <div className="hvr-shutter-out-horizontal d-block p-3">
                    <div className="d-flex justify-content-start">
                      <i className="fa-solid fa-location-pin h3 pe-2 text-primary"></i>
                      <span className="h5">Office Location</span>
                    </div>
                    <span>Lalazar Canal View House # 312</span>
                  </div>
                </div>
              </div>
              <div
                className="aos-item mt-4"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="w-100 aos-item__inner">
                  <iframe
                    className="hvr-shadow"
                    width="100%"
                    height="345"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.maps.ie/distance-area-calculator.html">
                      measure acres/hectares on map
                    </a>
                  </iframe>
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              <h2 className="pb-4">Leave a Message</h2>
              <div className="row g-4">
                <div className="col-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-transparent"
                    id="firstName"
                    placeholder="John"
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-transparent"
                    id="lastName"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control bg-transparent"
                  id="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control bg-transparent"
                  id="phone"
                  placeholder="+1234567890"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label ">
                  Country
                </label>
                <select className="form-select bg-transparent select-dark-options" id="country">
                  <option value="1">USA</option>
                  <option value="2">Non-USA</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control bg-transparent "
                  id="message"
                  rows="3"
                ></textarea>
              </div>
              <button type="button" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactUs;
