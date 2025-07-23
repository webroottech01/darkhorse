"use client";

import React from "react";
import CountUp from "react-countup";

const counters = [
  { end: 100, suffix: "%", label: "Fast & Secure <br />Delivery Options" },
  { end: 20, suffix: "+", label: "Certified & Trusted <br />Suppliers" },
  { end: 90, suffix: "%", label: "Customer <br /> Satisfaction Rate" },
  { end: 100, suffix: "+", label: "Educational <br /> Resources on Canna" },
];

const CounterArea = () => {
  return (
    <div className="rts-counter-area">
      <div className="container-3">
        <div className="row">
          <div className="col-lg-12">
            <div className="counter-area-main-wrapper">
              {counters.map((item, index) => (
                <div className="single-counter-area" key={index}>
                  <h2 className="title">
                    <CountUp end={item.end} duration={2.5} enableScrollSpy scrollSpyDelay={500} />
                    {item.suffix}
                  </h2>
                  <p dangerouslySetInnerHTML={{ __html: item.label }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterArea;
