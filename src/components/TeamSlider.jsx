"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { TeamCard } from "./TeamCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/team-grid.css";

const TeamSlider = ({ members }) => {
  if (!members || members.length === 0) return null;

  return (
    <section className="team-slider-section" style={{ padding: "80px 0" }}>
      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}
      >
        <div className="SideHeader">
          <h3>Strategy That Delivers</h3>
        </div>
        <div className="sectionHeader">
          <div className="sectionHeaderRight">
            <h2 className="mainHeader">Our Team</h2>
            <h3>Meet the specialists</h3>
          </div>

          <div className="sectionHeaderleft">
            <p>
              Clear counsel, zero legalese. From the courtroom to social media,
              meet the team moving your case forward.
            </p>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={members.length > 4} // Only loop if you have enough members
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="teamSwiper"
        >
          {members.map((member, index) => (
            <SwiperSlide
              key={member.slug || index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TeamCard member={member} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSlider;
