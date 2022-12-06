import './App.css';
import { useState, useEffect } from 'react';
import { colors } from './Colors';
import Navbar from './Navbar';

const App = () => {
  /*Left gradient*/
  const [colorOne, setColorOne] = useState('');
  /*Right gradient*/
  const [colorTwo, setColorTwo] = useState('');
  /*Left gradient when adding new gradient*/
  const [fromColor, setFromColor] = useState('#fff');
  /*Right gradient when adding new gradient */
  const [toColor, setToColor] = useState('#000');
  const [colorName, setColorName] = useState('');
  /*Default state of the colors list */
  const [list, setList] = useState(colors);
  /*id for newly added gradient*/
  const [newId, setNewId] = useState(colors.length);
  /*counter that determines gradient to display */
  let [counter, setCounter] = useState(0);
  const [showCssModal, setShowCssModal] = useState(false);
  const [showGradientModal, setShowGradientModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleAdd = () => {
    setNewId(newId + 1);
    const updatedList = list.concat({
      id: newId,
      colorOne: fromColor,
      colorTwo: toColor,
      name: colorName,
    });
    setList(updatedList);
    setCounter(newId);
    setShowGradientModal(false);
  };
  const handleNext = () => {
    setCounter((counter += 1));
    counter === list.length ? setCounter(1) : setCounter(counter);
  };
  const handlePrev = () => {
    setCounter((counter -= 1));
    counter === -1 || counter === 0
      ? setCounter(list.length - 1)
      : setCounter(counter);
  };

  useEffect(() => {
    setColorOne(list[counter].colorOne);
    setColorTwo(list[counter].colorTwo);
  }, [counter, list]);
  return (
    <div className='App'>
      <Navbar
        colorOne={colorOne}
        colorTwo={colorTwo}
        showCssModal={showCssModal}
        setShowCssModal={setShowCssModal}
        showGradientModal={showGradientModal}
        setShowGradientModal={setShowGradientModal}
        fromColor={fromColor}
        toColor={toColor}
        setFromColor={setFromColor}
        setToColor={setToColor}
        handleAdd={handleAdd}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
      />
      <div
        className='gradient-body'
        style={{
          background: `${colorOne}`,
          background: `-webkit-linear-gradient(to right, ${colorOne}, ${colorTwo})`,
          background: `linear-gradient(to right, ${colorOne}, ${colorTwo})`,
        }}>
        <div className={`${showOverlay ? 'overlay' : 'off-screen'}`}>
          <div className='pallete-container'>
            {list.map((item) => {
              return (
                <div
                  key={item.id}
                  className='pallete'
                  style={{
                    background: `${item.colorOne}`,
                    background: `-webkit-linear-gradient(to right, ${item.colorOne}, ${item.colorTwo})`,
                    background: `linear-gradient(to right, ${item.colorOne}, ${item.colorTwo})`,
                  }}></div>
              );
            })}
          </div>
        </div>
        <div className='buttons'>
          <div className='prev'>
            <span onClick={handlePrev}>prev</span>
          </div>
          <div className='next'>
            <span onClick={handleNext}>next</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
