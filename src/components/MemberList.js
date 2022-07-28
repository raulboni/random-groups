import { useState } from "react";
//assets
import deleteIcon from "../assets/delete-icon.svg";
//styles
import styles from "./MemberList.module.css";

const MemberList = ({ members, setMembers }) => {
  return (
    <ul className={styles.memberlist}>
      {typeof members[0] === "string" //if its an ungrouped list of members do this
        ? members.map((m, i) => (
            <li key={i}>
              {m}

              <img
                className={styles["delete-icon"]}
                src={deleteIcon}
                onClick={() => {
                  let filtered = members.filter((member) => member !== m);
                  setMembers(filtered);
                }}
              />
            </li>
          ))
        : members.map(
            // if its a list of groups do this
            (m, i) => (
              <li className={styles["random-group"]} key={i}>
                <h3>{`Grupo ${i + 1}`}</h3>
                {m.map((sm, si) => (
                  <p key={si}>{[` ${sm}`]}</p>
                ))}
              </li>
            )
          )}
    </ul>
  );
};

export default MemberList;
