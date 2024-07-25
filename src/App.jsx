/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-key */
import { useState } from "react";

function App() {
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);
  const [checked, setChecked] = useState([]);

  function handleLeftFull(left) {
    setRight(right.concat(left));
    setLeft([]);
  }

  function handleRightFull(right) {
    setLeft(left.concat(right));
    setRight([]);
  }

  function handleToggle(item) {
    const checkIndex = checked.indexOf(item);
    const newIndex = [...checked];

    if (checkIndex === -1) {
      newIndex.push(item);
    } else {
      newIndex.splice(checkIndex, 1);
    }
    setChecked(newIndex);
  }

  console.log(`checked`, checked);

  // This function is checking ki agar left state ke elements checked state me hai to ye ek array return kr raha hai un elements ki,

  // same right ke sath bhi check krenge

  function insetsection(stateToCheck, checked) {
    return checked.filter((value) => stateToCheck.indexOf(value) !== -1);
  }

  // function to check which elements are remain in left state after transfer, 
  // matlab jo checked array me the unko remove kr denge
  // isse wo elements nikal aayenge jo left state me hain aur checked me nahi hain, qki hume ab whi elements show krne hain left box me, checked ko remove krne ke bad me.

  function removeChecked(stateToCheck, checked){
    return stateToCheck.filter((value) => checked.indexOf(value) === -1);
  }
  console.log("remove", removeChecked(left,checked));

  let leftChecked = insetsection(left, checked);
  let rightChecked = insetsection(right, checked);

  console.log("leftChecked",leftChecked);

  // fucn for handling left selected checkboxes

  function handleCheckedLeft(){
    setRight(right.concat(leftChecked));
    setLeft(removeChecked(left, checked));
    setChecked(removeChecked(leftChecked,checked));
  }

  function handleCheckedRight(){

    setLeft(left.concat(rightChecked));
    setRight(removeChecked(right, checked));
    setChecked(removeChecked(rightChecked, checked))
          

  }


  function renderData(data) {
    return (
      <div>
        <ul>
          {data.map((item, index) => {
            return (
              <div className="flex gap-5">
                <input
                  type="checkbox"
                  checked={checked.indexOf(item) !== -1}
                  key={index + 1}
                  className="w-10 m-2"
                  onChange={() => handleToggle(item)}
                />
                <li key={index} className="text-lg" className="text-3xl">
                  List Item {item + 1}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center p-5">
        <div className="w-[75%] border-2 flex gap-4 p-5 bg-green-300 items-center">
          <div className="border-2 p-5 w-[45%] bg-amber-500">
            {renderData(left)};
          </div>

          <div className="flex flex-col gap-4">
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded-lg text-2xl"
              onClick={() => handleLeftFull(left)}
            >
              &gt;&gt;
            </button>

            <button
              className="px-2 py-1 bg-blue-500 text-white rounded-lg text-2xl"
              onClick={handleCheckedLeft}
            >
              &gt;
            </button>
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded-lg text-2xl"
              onClick={handleCheckedRight}
            >
              &lt;
            </button>
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded-lg text-2xl"
              onClick={() => handleRightFull(right)}
            >
              &lt;&lt;
            </button>
          </div>
          <div className="border-2 p-5 w-[45%] bg-amber-500">
            {renderData(right)};
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
