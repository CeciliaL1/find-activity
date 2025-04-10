import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface ISliderProps {
  type: string;
  text: string;
  min: number;
  max: number;
}

export const SliderPicker = ({ text, type, min, max }: ISliderProps) => {
  const [value, setValue] = useState<number[]>([min, max]);

  const handleSlider = (range: number[]) => {
    setValue(range);
    localStorage.setItem(type, JSON.stringify(value));
  };
  return (
    <>
      <div>
        <h4>
          {text} {value[0]} - {value[1]}
        </h4>
        <RangeSlider
          min={min}
          max={max}
          defaultValue={[min, max]}
          onInput={handleSlider}
          className="custom-slider"
        />
      </div>
    </>
  );
};
