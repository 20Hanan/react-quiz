function FinishScreen({points,maxPossiblePoints,highscore}) {
const percentage = points / maxPossiblePoints*100;
let emoji;
if(percentage===100) emoji = "🥇";
if(100>percentage>=80) emoji="🎉"
if(80>percentage>=50) emoji="🙃";
if(50>percentage>0) emoji='🤨';
if(percentage===0) emoji='🤦‍♂️';


    return (
      <>
        <p className="result">
          {" "}
          <span>{emoji}</span> you scored <strong>{points}</strong> out of{" "}
          {maxPossiblePoints}({Math.ceil(percentage)}%)
        </p>
        <p className="highscore">(highscore :{highscore} points)</p>
      </>
    );
}

export default FinishScreen
 