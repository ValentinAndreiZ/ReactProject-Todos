import React from 'react';

const SortingBar = ({moveCompletedBottom, moveCompletedBottomSwitcher}) => {
    return (
        <div className="sortingBar-container">
           <button 
           className="ui blue button massive"
           onClick={moveCompletedBottomSwitcher} 
           >{moveCompletedBottom === false ? 'Completed bottom' : 'Original list'}
           </button>
        </div>
    )
}

export default SortingBar;