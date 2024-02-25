import styled from "styled-components"

const TestimonialWrapper = styled.div`
  padding: 2rem;
  margin: 8px;
  position: relative;
  background-color: #e8e4e6; 
  transition: var(--ts);
  border-radius: var(--br);
  font-size: 15px;
  &:hover{
    transform: translateY(-5px);
  }
`;

const TestimonialContainer = styled.div`
    margin: 10px;
`;

const Blockquote = styled.div`
`;

const TestimonialsName = styled.p`
    color: var(--clr-primary-text);
    line-height: 1.5;
    font-weight: bold;
    &:last-child{
        font-style: italic;
        text-align: right;
        margin-top: 2rem;
        font-size: 1.4rem;
    }
`;


function Testimonial({ desc, name }) {
  return (
    <TestimonialWrapper className="testimonial">
      <TestimonialContainer>
        <Blockquote>{desc}</Blockquote>
        <TestimonialsName>{name}</TestimonialsName>
      </TestimonialContainer>
    </TestimonialWrapper>
  )
}

export default Testimonial