import React, { useRef, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Cards from "./components/Cards";
import Canvas from "./components/Canvas";
import { KonvaEventObject } from "konva/lib/Node";
import NavBar from "./components/NavBar";

export interface Image {
    src: string;
    hidden: boolean;
    id: string;
}

export interface CardImage extends Image {
    width: number;
    height: number;
    x?: number;
    y?: number;
}

interface DropEvent extends React.DragEvent<HTMLDivElement> {
    dataTransfer: DataTransfer;
}

const App: React.FC = () => {
    const dragUrl = useRef<string>();
    const dragSize = useRef<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    const stageRef = useRef<any>();
    const [images, setImages] = useState<CardImage[]>([]);
    const [availableImages, setAvailableImages] = useState<Image[]>(
        Object.values(
            import.meta.glob("./assets/cards/*", {
                eager: true,
                import: "default",
            })
        ).map((image) => ({
            src: image as string,
            hidden: false,
            id: image as string,
        }))
    );
    const [hideAllCards, setHideAllCards] = useState<boolean>(false);

    const handleDragStart = (
        _: unknown,
        src: string,
        width: number,
        height: number
    ) => {
        dragUrl.current = src;
        dragSize.current = { width, height };
    };

    const handleDrop = (e: DropEvent) => {
        e.preventDefault();
        stageRef.current && stageRef.current.setPointersPositions(e);
        setImages(
            images.concat([
                {
                    id: `${dragUrl.current!}-${images.length}`,
                    ...stageRef.current.getPointerPosition(),
                    src: dragUrl.current!,
                    width: dragSize.current.width,
                    height: dragSize.current.height,
                },
            ])
        );
    };
    const removeAllCards = () => {
        setImages([]);
    };
    const toggleCardShow = (id: string) => {
        setAvailableImages((prev) => {
            const card = prev.find((card) => card.id === id);
            if (hideAllCards && card && card.hidden === true) {
                setHideAllCards(false);
            } else {
                const remainingHiddenImages = availableImages.filter(
                    (image) => image.hidden === false
                );
                if (remainingHiddenImages.length === 1) {
                    setHideAllCards(true);
                }
            }

            return prev.map((image) => {
                return image.id === id
                    ? {
                          ...image,
                          hidden: !image.hidden,
                      }
                    : image;
            });
        });
    };

    const handleDragEnd = (e: KonvaEventObject<DragEvent>, id: string) => {
        const x = e.target.x();
        const y = e.target.y();
        const stage = stageRef.current;

        if (x < 0 || y < 0 || x > stage.width() || y > stage.height()) {
            setImages(images.filter((image) => image.id !== id));
        } else {
            const updatedImages = images.map((image) => {
                if (image.id === id) {
                    return {
                        ...image,
                        x: e.target.x(),
                        y: e.target.y(),
                    };
                }
                return image;
            });
            setImages(updatedImages);
        }
    };

    const toggleAllCardShow = () => {
        setHideAllCards(!hideAllCards);
        setAvailableImages((prev) =>
            prev.map((image) => ({
                ...image,
                hidden: !hideAllCards,
            }))
        );
    };

    const shuffleCards = () => {
        const newArray = [...availableImages];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        setAvailableImages(newArray);
    };

    return (
        <>
            <NavBar
                hideAllCards={hideAllCards}
                toggleAllCardShow={toggleAllCardShow}
                shuffleCards={shuffleCards}
                removeAllCards={removeAllCards}
            />
            <Container fluid>
                <Stack gap={2} direction="vertical" style={{}}>
                    <Stack>
                        <h5>Drop a card here</h5>
                        <Canvas
                            images={images}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnd={handleDragEnd}
                            stageRef={stageRef}
                        />
                    </Stack>
                    <Stack direction="vertical">
                        <h5>Drag a card from here</h5>
                        <Stack direction="horizontal" gap={2}></Stack>
                        <Stack
                            direction="horizontal"
                            gap={2}
                            style={{ overflow: "scroll" }}
                        >
                            <Cards
                                cards={availableImages}
                                onDragStart={handleDragStart}
                                onCardClick={toggleCardShow}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
};

export default App;
