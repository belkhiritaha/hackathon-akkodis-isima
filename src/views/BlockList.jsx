import React from 'react';
import '../style/BlockList.css'; // You can define your own CSS styles for the block list
import NavBar from "../UI/Navbar";
import Footer from "../UI/Footer";
const BlockList = ({}) => {
  return (
    <>
    <NavBar />
    <div className="block-list">
      {blocks.map((block, index) => (
        <div key={index} className="block">
          <img src={block.image} alt="Block" className="block-image" />
          <div className="block-description">{block.description}</div>
          <button className="block-button">{block.buttonText}</button>
        </div>
      ))}
    </div>
    <Footer />
    </>
  );
};

const blocks = [
{
    image: 'images/blabla.png',
    description: 'Les conducteurs qui covoiturent contribuent à économiser des émissions carbones* en covoiturant chaque jour pour aller travailler !',
    buttonText: 'Je découvre les offres',
},
{
    image: 'images/sncf.png',
    description: 'Le saviez-vous ? Votre voyage en train émet en moyenne 30 fois moins de gaz à effet de serre que si vous étiez seul dans votre voiture. Quant au fret ferroviaire, il est 9 fois moins polluant que la route.',
    buttonText: 'Je découvre les offres',
},

{
    image: 'images/michelin.png',
    description: 'Depuis le premier pneu MICHELIN Energy Saver conçu pour réduire la consommation de carburant, jusqu\'à des innovations de long terme comme le pneu VISION doté d\'une bande roulement renouvelable et biodégradable, innover et travailler pour réduire notre impact sur la planète a toujours été au coeur des préoccupations de Michelin. ',
    buttonText: 'Je découvre les offres',
},
];

export default BlockList;
