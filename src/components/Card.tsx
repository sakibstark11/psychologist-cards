import React from "react";
import { Figure } from "react-bootstrap";
import { Image } from "../App";
import hiddenImage from "../assets/hidden/black.png";

const HEIGHT = 726/5;
const WIDTH = 500/5;

interface ImageCardProps {
    image: Image;
    onDragStart: (
        e: React.DragEvent<HTMLElement>,
        src: string,
        width: number,
        height: number
    ) => void;
    onCardClick: (id: string) => void;
}

const Card: React.FC<ImageCardProps> = ({
    image,
    onDragStart,
    onCardClick,
}) => {
    return (
        <Figure
            onDragStart={(e: React.DragEvent<HTMLElement>) =>
                onDragStart(e, image.src, WIDTH, HEIGHT)
            }
            onClick={() => onCardClick(image.id)}
        >
            <Figure.Image
                width={WIDTH}
                height={HEIGHT}
                src={image.hidden ? hiddenImage : image.src}
                fluid={false}
            />
        </Figure>
    );
};

export default Card;
