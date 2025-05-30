import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { StarWrapper } from "./styled/StyledWrapper";

interface IRating {
  rating: number;
}

export const Rating = ({ rating }: IRating) => {
  const stars = Array(5).fill(0);
  return (
    <StarWrapper direction="row">
      {stars.map((_, index) => {
        const full = index < Math.floor(rating);
        const half = rating - index >= 0.5 && rating - index < 1;
        return full ? (
          <FaStar key={index} size={20} color="#F2C265" />
        ) : half ? (
          <FaStarHalfAlt key={index} size={20} color="#F2C265" />
        ) : (
          <FaRegStar key={index} size={20} color="#5a5959" />
        );
      })}
    </StarWrapper>
  );
};
