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

        <Link href="/practice/construction-law" className="  infoInnerMid">
          <div className="innerContLeft">
            <div className="innerPic">
              <Icon.File size={18} />
            </div>
            <div className="innerTextCont"> Construction Law Services</div>
          </div>

          <Icon.ArrowUpRight className="midIcon" />
        </Link>

        <a
          href="https://calendly.com/fridmar/meet-with-mey"
          className="  infoInnerMidActive"
        >
          <div className="innerContLeft">
            <div className="innerPic">
              <Icon.UserPlus size={18} />
            </div>
            <div className="innerTextCont">Access a lawyer</div>
          </div>

          <Icon.ArrowUpRight className="midIcon" />
        </a>

        <a href="/resources" className="  infoInnerMid">
          <div className="innerContLeft">
            <div className="innerPic">
              <Icon.Book size={18} />
            </div>
            <div className="innerTextCont"> Legal Resources & Insights</div>
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
