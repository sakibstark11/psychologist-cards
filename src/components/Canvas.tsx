import { Stage, Layer } from "react-konva";
import CanvasCard from "./CanvasCard";
import { Col } from "react-bootstrap";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageType } from "konva/lib/Stage";
import { LegacyRef } from "react";

interface Image {
    id: string;
    src: string;
    x?: number;
    y?: number;
    width: number;
    height: number;
    hidden: boolean;
}

interface CanvasProps {
    images: Image[];
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: KonvaEventObject<DragEvent>, id: string) => void; // Replace 'any' with a specific type if possible
    stageRef: LegacyRef<StageType>; // Replace 'any' with a specific type if possible
}

const Canvas: React.FC<CanvasProps> = ({
    images,
    onDrop,
    onDragOver,
    onDragEnd,
    stageRef,
}) => {
    return (
        <Col
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
                border: "1px solid grey",
                borderRadius: "2px",
            }}
        >
            <Stage
                ref={stageRef}
                width={window.innerWidth * 0.982}
                height={window.innerHeight * 0.6}
            >
                <Layer>
                    {images.map((image) => (
                        <CanvasCard
                            key={image.id}
                            image={image}
                            onDragEnd={onDragEnd}
                        />
                    ))}
                </Layer>
            </Stage>
        </Col>
    );
};

export default Canvas;
