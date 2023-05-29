import React from 'react'
import Header from '../components/layout/Header'

export default function Govt() {
  return (
    <>
      <Header />
      <section id="programs">
        <div className="container">
          <div className="flag-badge d-flex mb-5">
            <img src="assets/images/__flag.svg" alt="zambia rise logo" />
            <h1 className="my-auto">Govt Programs</h1>
          </div>

          <div className="row">
            <div className="col-md-4">
              <a href="https://www.napsa.co.zm/" target="_blank">
                <img
                  className="img-fluid"
                  src="assets/images/pro-1.jpg"
                  alt="govt-1"
                />
              </a>
              <a href="https://www.napsa.co.zm/" target="_blank">
                <img
                  className="mt-3 img-fluid w-50"
                  src="assets/images/pro-logo-2.png"
                  alt="pro-1"
                />
              </a>
            </div>

            <div className="col-md-4">
              <a href="https://www.ceec.org.zm/" target="_blank">
                <img
                  className="img-fluid"
                  src="assets/images/pro-2.jpg"
                  alt="govt-1"
                />
              </a>
              <a href="https://www.ceec.org.zm/">
                <img
                  className="mt-3 img-fluid w-50"
                  src="assets/images/pro-logo-1.png"
                  alt="pro-1"
                />
              </a>
            </div>

            <div className="col-md-4">
              <a href="https://www.mlgrd.gov.zm/wp-content/uploads/2022/04/CDF-GUIDELINES-2.pdf">
                <img
                  className="img-fluid"
                  src="assets/images/pro-3.jpg"
                  alt="govt-1"
                />
              </a>
              <a href="https://www.mlgrd.gov.zm/wp-content/uploads/2022/04/CDF-GUIDELINES-2.pdf">
                <img
                  className="mt-3 img-fluid w-50"
                  src="assets/images/pro-logo-3.png"
                  alt="pro-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
