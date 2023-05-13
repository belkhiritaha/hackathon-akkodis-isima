import React from 'react';
import '../style/BlockList.css'; // You can define your own CSS styles for the block list

const BlockList = ({}) => {
  return (
    <div className="block-list">
      {blocks.map((block, index) => (
        <div key={index} className="block">
          <img src={block.image} alt="Block" className="block-image" />
          <div className="block-description">{block.description}</div>
          <button className="block-button">{block.buttonText}</button>
        </div>
      ))}
    </div>
  );
};

const blocks = [
{
    image: 'images/blabla.png',
    description: 'Description 1',
    buttonText: 'Button 1',
},
{
    image: 'images/carrefour.jpg',
    description: 'Description 3',
    buttonText: 'Button ',
},

{
    image: 'images/sncf.png',
    description: 'Description 2',
    buttonText: 'Button 2',
},
];

export default BlockList;
