import React, { useState } from "react";
import "./styles.css";

const rowLength = 7;

export default function App() {
  const [openEditor, setOpenEditor] = useState({ openIndex: [] });

  const arr = new Array(42).fill("beep boop", 0);

  const dayArray = arr.map((i, index) => {
    let weekNo = `week${Math.ceil((index + 1) / rowLength)}`;
    return (
      <Day
        day={i}
        weekNo={weekNo}
        index={index}
        openEditor={openEditor}
        setOpenEditor={setOpenEditor}
      />
    );
  });

  const splitDayArray = arg => {
    let innerArr = arg;
    let memo = [];
    const slicer = innerArr => {
      if (innerArr.length === 0) return memo;
      for (let day of innerArr) {
        if (innerArr.indexOf(day) + 1 === rowLength) {
          let arr = innerArr.slice(0, innerArr.indexOf(day) + 1);
          memo.push(arr);
          slicer(innerArr.slice(innerArr.indexOf(day) + 1));
        }
      }
      return memo;
    };
    return slicer(innerArr);
  };

  const splitArray = splitDayArray(dayArray);

  const weeks = splitArray.map((i, index) => {
    return (
      <Week
        weekNo={`week${index + 1}`}
        setOpenEditor={setOpenEditor}
        openEditor={openEditor}
      >
        {i}
      </Week>
    );
  });

  return (
    <div className="App">
      <WeekContainer>{weeks}</WeekContainer>
    </div>
  );
}

const Week = ({ weekNo, children, openEditor, setOpenEditor }) => {
  return (
    <div>
      {children}
      {openEditor.openIndex.includes(weekNo) ? (
        <Editor click={setOpenEditor} />
      ) : (
        React.Fragment
      )}
    </div>
  );
};

const WeekContainer = React.memo(props => {
  return <div>{props.children}</div>;
});

const Day = props => {
  const week = props.weekNo;
  const handleItemClick = weekNo => {
    const isClosing = props.openEditor.openIndex.includes(
      props.index + 1 && !weekNo
    );
    console.log(isClosing);
    return isClosing
      ? props.setOpenEditor({ openIndex: ["none", 0] })
      : props.setOpenEditor({ openIndex: [weekNo, props.index + 1] });
  };

  return (
    <button onClick={() => handleItemClick(week)}>{props.day || "butt"}</button>
  );
};

const Editor = props => (
  <div style={{ backgroundColor: "blue", height: "80px", width: "300px" }}>
    <button onClick={() => props.click({ openIndex: ["none", 0] })}>x</button>
  </div>
);
