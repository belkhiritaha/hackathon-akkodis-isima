import React from 'react';
import '../style/BlockList.css'; // You can define your own CSS styles for the block list
import NavBar from "../UI/Navbar";
import Footer from "../UI/Footer";
import { useSearchParams } from 'react-router-dom';

const partenaires = [
    {
        image: "/images/Logo-1.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, arcu eget fermentum aliquam, quam libero ultricies nun",
        link: "https://www.google.com/",
        name: "Partenaire 1",
        offer_image: "/images/Logo-1.png",
        offer_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, arcu eget fermentum aliquam, quam libero ultricies nun",
        offer_price: "10€",
    },
    {
        image: "/images/Logo-2.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, arcu eget fermentum aliquam, quam libero ultricies nun",
        link: "https://www.google.com/",
        name: "Partenaire 2",
        offer_image: "/images/Logo-2.png",
        offer_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, arcu eget fermentum aliquam, quam libero ultricies nun",
        offer_price: "10€",
    },
    {
        image: "/images/Logo-3.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, arcu eget fermentum aliquam, quam libero ultricies nun",
        link: "https://www.google.com/",
        name: "Partenaire 3",
        offer_image: "/images/Logo-3.png",
        offer_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, arcu eget fermentum aliquam, quam libero ultricies nun",
        offer_price: "10€",
    },
];


const Partenaire = (props) => {
    return (
        <>
            <NavBar />
            <div className="block-list" style={{ marginTop: "100px", marginBottom: "100px" }}>
                <div className="container fluid">
                    <h1 style={{ color: "rgb(123,145,86,1)" }}>{partenaires[props.id].name}</h1>
                </div>
                <div className="block">
                    <img src={partenaires[props.id].image} alt="Block" className="block-image" />
                    <div className="block-description">{partenaires[props.id].description}</div>
                    <button className="block-button"><a href={partenaires[props.id].link}>Je découvre les offres</a></button>
                </div>
                <div className="container fluid">
                    <h1 style={{ color: "rgb(123,145,86,1)" }}>Nos offres</h1>
                </div>
                <div className="block">
                    <img src={partenaires[props.id].offer_image} alt="Block" className="block-image" />
                    <div className="block-description">{partenaires[props.id].offer_description}</div>
                    <button className="block-button">{partenaires[props.id].offer_price}</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

const BlockList = ({ }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    if (!id) {
        return (
            <>
                <NavBar />
                <div className="block-list" style={{ marginTop: "100px", marginBottom: "100px" }}>
                    <div className="container fluid">
                        <h1 style={{ color: "rgb(123,145,86,1)" }}>Nos partenaires</h1>
                    </div>
                    {blocks.map((block, index) => (
                        <div key={index} className="block">
                            <img src={block.image} alt="Block" className="block-image" />
                            <div className="block-description">{block.description}</div>
                            <button className="block-button" onClick={() => setSearchParams({ id: index })}>{block.buttonText}</button>
                        </div>
                    ))}
                </div>
                <Footer />
            </>
        );
    }
    else {
        return (
            <>
                <Partenaire id={id} />
            </>
        );
    }
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
