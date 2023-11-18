import React, {useState} from 'react';
import Card from './Card'; // Adjust the path as per your project structure

const CardGrid = ({ cards }) => {
    const [activeCardTitle, setActiveCardTitle] = useState('');

    const handleToggle = (title) => {
        setActiveCardTitle(prevTitle => prevTitle === title ? '' : title);
    };
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // This will create three columns
            gap: '1rem', // Adjust the gap to your preference
            padding: '1rem' // Adjust the padding to your preference
          }}>
            {cards.map((card, index) => (
                <Card key={index} title={card.title} isGraphShown={card.title === activeCardTitle} onToggle={() => handleToggle(card.title)} />
            ))}
        </div>
    );
};

export default CardGrid;
