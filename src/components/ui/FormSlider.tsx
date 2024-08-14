import { useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import {
  Box,
  Input,
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'

export type OnInputBlurProps = { value: number; min: number; max: number }
export type OnInputChangeProps = { value: string; onChange: (value: string) => void }

type FormSliderProps<T extends FieldValues> = SliderProps & {
  name: Path<T>
  control: Control<T>
  renderLabel: (value: number) => string
  onInputBlur: (props: OnInputBlurProps) => number
  onInputChange: (props: OnInputChangeProps) => void
}

export const FormSlider = <T extends FieldValues>({
  name,
  control,
  min = 100,
  max = 1000,
  renderLabel,
  onInputBlur,
  onInputChange,
  ...props
}: FormSliderProps<T>) => {
  const { field } = useController({
    name,
    control,
  })

  const [inputValue, setInputValue] = useState<string>(field.value)
  const [sliderValue, setSliderValue] = useState<number>(Number(field.value))

  const handleOnSliderChange = (currentValue: number) => {
    setSliderValue(currentValue)
    setInputValue(String(currentValue))
  }

  const handleOnInputChange = (currentValue: string) => {
    onInputChange({ value: currentValue, onChange: setInputValue })
  }

  const handleOnInputBlur = (currentValue: number) => {
    const formattedValue = onInputBlur({ value: Number(currentValue), min, max })
    /**
     * We update the `react-hook-form` state with the final value only on blur.
     */
    field.onChange(formattedValue)
    setSliderValue(formattedValue)
    setInputValue(String(formattedValue))
  }

  return (
    <Box>
      <Text>{renderLabel(field.value)}</Text>

      <Slider
        value={sliderValue}
        onChange={handleOnSliderChange}
        /**
         * We update the `react-hook-form` state only after the user releases
         * the slider thumb. This also serves as a debounce tool.
         */
        onChangeEnd={field.onChange}
        min={min}
        max={max}
        focusThumbOnChange={false}
        {...props}
      >
        <SliderTrack>
          <SliderFilledTrack bg="brand.crabNebulaLight" />
        </SliderTrack>

        <SliderThumb
          boxSize={6}
          /**
           * Removes chakra's native blue outline applied on focus.
           */
          _focus={{
            boxShadow: 'var(--chakra-shadows-base)',
          }}
        />
      </Slider>

      <Input
        value={inputValue}
        onChange={(e) => {
          handleOnInputChange(e.target.value)
        }}
        onBlur={(e) => {
          handleOnInputBlur(Number(e.target.value))
        }}
        mt={2}
      />
    </Box>
  )
}
