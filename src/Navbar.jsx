import React from 'react';
import './navbar.css';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRight,
  faPlusCircle,
  faClipboard,
  faHamburger,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactModal from 'react-modal';
import { CopyBlock, dracula } from 'react-code-blocks';

const Navbar = ({
  colorOne,
  colorTwo,
  showCssModal,
  setShowCssModal,
  showGradientModal,
  setShowGradientModal,
  fromColor,
  setFromColor,
  toColor,
  setToColor,
  handleAdd,
  showOverlay,
  setShowOverlay,
}) => {
  const handleOpenCssModal = () => {
    setShowCssModal(true);
  };
  const handleCloseCssModal = () => {
    setShowCssModal(false);
  };
  const handleOpenGradientModal = () => {
    setShowGradientModal(true);
  };
  const handleCloseGradientModal = () => {
    setShowGradientModal(false);
  };
  const handleShowAll = () => {
    setShowOverlay(true);
  };
  const handleCloseAll = () => {
    setShowOverlay(false);
  };
  const codeBlock = `
  background: ${colorOne}; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, ${colorOne}, ${colorTwo}); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, ${colorOne}, ${colorTwo}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */`;
  return (
    <div className='navbar'>
      <div className='top-nav'>
        <nav>
          <div className='logo'>
            <span>Logo</span>
          </div>
          <div className='swatch'>
            <span>
              <span
                className='left-color'
                style={{ backgroundColor: `${colorOne}` }}></span>
              {colorOne}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
            <span>
              <span
                className='right-color'
                style={{ backgroundColor: `${colorTwo}` }}></span>
              {colorTwo}
            </span>
          </div>
          <div className='social'>
            <a href='#'>
              Source Code: <FontAwesomeIcon icon={faGithub} className='icon' />
            </a>
            <a href='#'>
              Follow Me:{' '}
              <FontAwesomeIcon icon={faTwitter} className='icon twitter' />
            </a>
          </div>
        </nav>
      </div>
      <div className='bottom-nav'>
        <div className='bottom-nav-content'>
          <div className='viewall'>
            {showOverlay ? (
              <>
                <FontAwesomeIcon
                  className='clickable'
                  onClick={handleCloseAll}
                  icon={faClose}
                />
                <span className='clickable' onClick={handleCloseAll}>
                  View all gradients
                </span>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  className='clickable'
                  onClick={handleShowAll}
                  icon={faHamburger}
                />
                <span className='clickable' onClick={handleShowAll}>
                  View all gradients
                </span>
              </>
            )}
          </div>
          <div className='action-btns'>
            <button className='add' onClick={handleOpenGradientModal}>
              Add gradient <FontAwesomeIcon icon={faPlusCircle} />
            </button>
            <ReactModal
              ariaHideApp={false}
              style={{
                overlay: {
                  backgroundColor: 'rgba(22, 21, 21, 0.222)',
                  zIndex: '20',
                },
              }}
              isOpen={showGradientModal}>
              <button className='close-icon' onClick={handleCloseGradientModal}>
                <FontAwesomeIcon icon={faClose} />
              </button>
              <div className='add-gradient'>
                <h2>Add Gradient</h2>
                <label htmlFor='from'>From:</label>
                <div className='from-input'>
                  <input
                    id='from'
                    type='text'
                    onChange={(e) => setFromColor(e.target.value)}
                    placeholder='e.g: #fff'
                  />
                  <span
                    className='from-color'
                    style={{ backgroundColor: `${fromColor}` }}></span>
                </div>
                <label htmlFor='to'>To:</label>
                <div className='to-input'>
                  <input
                    id='to'
                    type='text'
                    onChange={(e) => setToColor(e.target.value)}
                    placeholder='e.g: #000'
                  />
                  <span
                    className='to-color'
                    style={{ backgroundColor: `${toColor}` }}></span>
                </div>
                <button onClick={handleAdd}>Save</button>
              </div>
            </ReactModal>

            <button className='copy' onClick={handleOpenCssModal}>
              copy CSS <FontAwesomeIcon icon={faClipboard} />
            </button>
            <ReactModal
              ariaHideApp={false}
              isOpen={showCssModal}
              style={{
                overlay: {
                  backgroundColor: 'rgba(22, 21, 21, 0.222)',
                  zIndex: '20',
                },
              }}>
              <button className='close-icon' onClick={handleCloseCssModal}>
                <FontAwesomeIcon icon={faClose} />
              </button>
              <div className='copy-css'>
                <h2>Copy CSS code</h2>
                <CopyBlock
                  text={codeBlock}
                  language='javascript'
                  theme={dracula}
                  wrapLines
                />
                <button
                  onClick={(e) => {
                    navigator.clipboard.writeText(codeBlock);
                    handleCloseCssModal();
                  }}>
                  Copy to Clipboard
                </button>
              </div>
            </ReactModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
