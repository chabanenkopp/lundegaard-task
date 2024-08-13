import { useState } from 'react'
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderProps,
  Text,
  Input,
} from '@chakra-ui/react'
import validator from 'validator'
import { useController, Control, FieldValues, Path } from 'react-hook-form'

export type OnInputBlurProps = { value: number; min: number; max: number }

type FormSliderProps<T extends FieldValues> = SliderProps & {
  name: Path<T>
  control: Control<T>
  renderLabel: (value?: string | number) => string
  onInputBlur: (props: OnInputBlurProps) => number
}

export const FormSlider = <T extends FieldValues>({
  name,
  control,
  min = 100,
  max = 1000,
  onInputBlur,
  renderLabel,
  ...props
}: FormSliderProps<T>) => {
  const {
    field: { ref, onChange, value },
  } = useController({
    name,
    control,
  })

  const [inputValue, setInputValue] = useState<string>(value)

  const handleOnSliderChange = (sliderValue: number) => {
    onChange(sliderValue)
    setInputValue(String(sliderValue))
  }

  const handleOnInputChange = (value: string) => {
    /**
     * We need to allow an empty string to make it easier for the user to edit
     * the input value.
     */
    if (!value) {
      setInputValue('')
      return
    }

    const isValid = validator.isInt(value, {
      allow_leading_zeroes: false,
    })

    if (isValid) {
      setInputValue(value)
    }
  }

  return (
    <Box>
      <Text>{renderLabel(value)}</Text>

      <Slider
        ref={ref}
        value={value}
        onChange={handleOnSliderChange}
        min={min}
        max={max}
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
          const formattedValue = onInputBlur({ value: Number(e.target.value), min, max })

          onChange(formattedValue)
          setInputValue(String(formattedValue))
        }}
        mt={2}
      />
    </Box>
  )
}
