import { useEffect, useState } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 0 60px;
`;

const CarouselImg = styled.img`
    max-width: 1000px;
    max-height: 1000px;
    width: 100%;
    height: auto;
    opacity: 0;
    transition: 2s;
    &.loaded{
        opacity: 1;
    }
`;

const CarouselButtonContainer = styled.div`
    display: flex;
    align-content: center;
    flex-direction: row;
    margin-top: 15px;
`;

const CarouselButton = styled.button`
    color: white;
    background-color: #797979;
    padding: 8px;
    margin: 0 100px 0 100px;
    &:hover{
        background-color: #a7a7a7; 
    }
`;

function Carousel({ images, autoPlay, showButtons }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(autoPlay || showButtons) {
            const interval = setInterval(() => {
                selectNewImage(selectedIndex, images);
            }, 2000);
            return () => clearInterval(interval);
        }  
    })

    const selectNewImage = (index: number, images: string[], next = true) => {
        setLoaded(false);
        setTimeout(() => {
            const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
            const nextIndex = next ? condition ? selectedIndex + 1 : 0 : condition ? selectedIndex - 1 : images.length - 1;
            setSelectedImage(images[nextIndex]);
            setSelectedIndex(nextIndex);
        }, 500);
    };

    const previous = () => {
        selectNewImage(selectedIndex, images, false);
    };

    const next = () => {
        selectNewImage(selectedIndex, images);
    };

    return (
        <>
        <CarouselContainer>
            <CarouselImg src={(`src/assets/img/${selectedImage}`)} alt="Gentleman" className={loaded ? "loaded" : ""} onLoad={() => setLoaded(true)}/>
                <CarouselButtonContainer>
                    {
                        showButtons ? (
                        <>
                            <CarouselButton onClick={previous}>{'<'}</CarouselButton>
                            <CarouselButton onClick={next}>{'>'}</CarouselButton>
                        </>
                        ) : (
                        <></>
                    )}
                </CarouselButtonContainer>
        </CarouselContainer>
        </>
    );     
}

export default Carousel;
