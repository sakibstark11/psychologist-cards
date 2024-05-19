import { Button, Form, Image, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import BrandIcon from "../assets/icon.png";

interface NavBarProps {
    hideAllCards: boolean;
    toggleAllCardShow: () => void;
    shuffleCards: () => void;
    removeAllCards: () => void;
}
const NavBar: React.FC<NavBarProps> = ({
    toggleAllCardShow,
    hideAllCards,
    shuffleCards,
    removeAllCards,
}) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="primary">
            <Container>
                <Navbar.Brand href="/">
                    <Stack gap={2} direction="horizontal">
                        <Image
                            src={BrandIcon}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        KZ Psycho Cards
                    </Stack>
                </Navbar.Brand>
                <Stack direction="horizontal" gap={2}>
                    <Form.Check
                        type="switch"
                        label="Hide all cards"
                        onChange={() => toggleAllCardShow()}
                        checked={hideAllCards}
                    />
                    <Button onClick={() => shuffleCards()}>Shuffle</Button>
                    <Button variant="warning" onClick={() => removeAllCards()}>
                        Empty Deck
                    </Button>
                </Stack>
            </Container>
        </Navbar>
    );
};

export default NavBar;
