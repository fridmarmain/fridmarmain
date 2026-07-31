import "../styles/team-grid.css";
import { TeamCard } from "./TeamCard";

const TeamGrid = ({ headerData, members }) => {
  if (!members || members.length === 0) return null;

  const sideHeader = headerData?.sideHeader || "Strategy That Delivers";
  const mainHeader = headerData?.mainHeader || "Our Team";
  const subHeader = headerData?.subHeader || "Meet the specialists";
  const description =
    headerData?.description ||
    "Clear counsel, zero legalese. From the courtroom to social media, meet the team moving your case forward.";

  return (
    <section className="team-grid-section">
      <div className="container">
        <div className="SideHeader">
          <h3>{sideHeader}</h3>
        </div>
        <div className="sectionHeader">
          <div className="sectionHeaderRight">
            <h2 className="mainHeader">{mainHeader}</h2>
            <h3>{subHeader}</h3>
          </div>
          <div className="sectionHeaderleft">
            <p>{description}</p>
          </div>
        </div>

        <div className="members-wrapper">
          {members.map((member, index) => (
            <TeamCard
              key={member.slug || index}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
