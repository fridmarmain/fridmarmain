import React from "react";
import * as Icon from "lucide-react";
import Link from "next/link";

function InfoBox() {
  return (
    <>
      <div className="info-box  ">
        <div className="infoInner">
          <div className="innerPic"></div>
          <div className="innerTextCont">
            <div className="innerlineTop"></div>
            <div className="innerlineBottom"></div>
          </div>

          <Icon.ArrowUpRight className="midIcon" />
        </div>

        <Link href="/practice" className="  infoInnerMid">
          <div className="innerContLeft">
            <div className="innerPic">
              <Icon.File size={18} />
            </div>
            <div className="innerTextCont">Know Your Legal Right</div>
          </div>

          <Icon.ArrowUpRight className="midIcon" />
        </Link>

        <a href="#contactSection" className="  infoInnerMidActive">
          <div className="innerContLeft">
            <div className="innerPic">
              <Icon.UserPlus size={18} />
            </div>
            <div className="innerTextCont">Access Emergency Consultation</div>
          </div>

          <Icon.ArrowUpRight className="midIcon" />
        </a>

        <a href="#intake" className="  infoInnerMid">
          <div className="innerContLeft">
            <div className="innerPic">
              <Icon.Headphones size={18} />
            </div>
            <div className="innerTextCont">Instant Legal Support</div>
          </div>

          <Icon.ArrowUpRight className="midIcon" />
        </a>
        <div className="infoInner">
          <div className="innerPic"></div>
          <div className="innerTextCont">
            <div className="innerlineTop"></div>
            <div className="innerlineBottom"></div>
          </div>
          <Icon.ArrowUpRight className="midIcon" />
        </div>
      </div>
    </>
  );
}

export default InfoBox;
