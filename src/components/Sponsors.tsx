import styled from "styled-components";

const SponsorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  grid-gap: 30px; 
  margin: 30px 0; 
  padding: 0 15px;

  @media screen and (max-width: 760px) and (min-width: 500px) {
    grid-gap: 35px;
    padding: 0 1px;
    margin-right: 30px;
  }
`;

const SponsorImage = styled.img`
  width: 75%; 
  height: auto; 
  object-fit: cover;

  @media screen and (max-width: 1188px) and (min-width: 761px) {
    width: 100%;
  }

  @media screen and (max-width: 760px) and (min-width: 500px) {
    width: 140%;
  }
`;

const Title = styled.h1`
  font-weight: 300, bold;
  font-size: 4.5rem;
  padding: 10px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Sponsors = () => {
  return (
    <Container>
        <Title>Patrocinadores</Title>
        <SponsorGrid>
            <SponsorImage src="src/assets/img/sponsor1.png" alt="Patrocinador 1" />
            <SponsorImage src="src/assets/img/sponsor2.png" alt="Patrocinador 2" />
            <SponsorImage src="src/assets/img/sponsor3.png" alt="Patrocinador 3" />
            <SponsorImage src="src/assets/img/sponsor4.png" alt="Patrocinador 4" />
            <SponsorImage src="src/assets/img/sponsor5.png" alt="Patrocinador 5" />
            <SponsorImage src="src/assets/img/sponsor6.png" alt="Patrocinador 6" />
            <SponsorImage src="src/assets/img/sponsor7.png" alt="Patrocinador 7" />
            <SponsorImage src="src/assets/img/sponsor8.png" alt="Patrocinador 8" />
        </SponsorGrid>
    </Container>
  );
};

export default Sponsors;