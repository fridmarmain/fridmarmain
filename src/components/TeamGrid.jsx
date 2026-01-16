import "../styles/team-grid.css";
import { TeamCard } from "./TeamCard"; // Use this if you put it in a separate file

const TeamGrid = ({ members, title = "Meet Our Team" }) => {
  if (!members || members.length === 0) return null;

  return (
    <section className="team-grid-section">
      <div className="container">
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

        <div className="members-wrapper">
          {members.map((member, index) => (
            /* We use the reusable card here */
            <TeamCard key={member.slug} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
