import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { CardImage } from "../App";
import { KonvaEventObject } from "konva/lib/Node";

interface ImageProps {
    image: CardImage;
    onDragEnd: (e: KonvaEventObject<DragEvent>, id: string) => void;
}

const CanvasCard: React.FC<ImageProps> = ({ image, onDragEnd }) => {
    const [img] = useImage(image.src);

    return (
        <Image
            image={img}
            x={image.x}
            y={image.y}
            width={image.width}
            height={image.height}
            draggable
            offsetX={image.width / 2}
            offsetY={image.height / 2}
            onDragEnd={(e) => onDragEnd(e, image.id)}
        />
    );
};

export default CanvasCard;
