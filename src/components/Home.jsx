import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const { colonies } = useSelector((state) => state.user) || [];
  console.log(useSelector(state => state))
  const { error } = useSelector((state) => state.colony);

  useEffect(() => {
    // dispatch(fetchJoinedColonies());
  }, [dispatch]);

  const clickHandler = () => {
    // dispatch(fetchJoinedColonies());
  };

  return (
    <div>
      <button onClick={clickHandler}>Click ME</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {colonies &&
          colonies.map((colony, index) => (
            <div key={index}>
              <img src={colony.colonyPicture} className="bg-black w-10 h-10 rounded-full" alt="" />
              <li key={index}>
                {colony.colonyName} {colony.nativeTokenSymbol}
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Home;
