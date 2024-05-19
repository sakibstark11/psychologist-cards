import Card from "./Card";
import { Image } from "../App";

interface CardsProps {
    cards: Image[];
    onDragStart: (
        e: React.DragEvent<HTMLElement>,
        src: string,
        width: number,
        height: number
    ) => void;
    onCardClick: (id: string) => void;
}

const Cards: React.FC<CardsProps> = ({ cards, onDragStart, onCardClick }) => {
    return (
        <>
            {cards.map((card) => (
                <Card
                    image={card}
                    onDragStart={onDragStart}
                    onCardClick={onCardClick}
                />
            ))}
        </>
    );
};

export default Cards;
