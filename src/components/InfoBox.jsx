import React from "react";
import * as Icon from "lucide-react";

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
        <div className="  infoInnerMid">
          <div className="innerContLeft">
            <div className="innerPic">
              <Icon.File size={18} />
            </div>
            <div className="innerTextCont">Know Your Legal Right</div>
          </div>

          <Icon.ArrowUpRight className="midIcon" />
        </div>

        <div className="  infoInnerMidActive">
          <div className="innerContLeft">
            <div className="innerPic">
              <Icon.UserPlus size={18} />
            </div>
            <div className="innerTextCont">Access Emergency Consultation</div>
          </div>

          <Icon.ArrowUpRight className="midIcon" />
        </div>

        <div className="  infoInnerMid">
          <div className="innerContLeft">
            <div className="innerPic">
              <Icon.Headphones size={18} />
            </div>
            <div className="innerTextCont">Instant Legal Support</div>
          </div>

          <Icon.ArrowUpRight className="midIcon" />
        </div>
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
