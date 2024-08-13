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
import { useController, Control, FieldValues, Path } from 'react-hook-form'

type FormSliderProps<T extends FieldValues> = SliderProps & {
  name: Path<T>
  control: Control<T>
  getLabel: (value?: string | number) => string
}

export const FormSlider = <T extends FieldValues>({
  name,
  control,
  getLabel,
  ...rest
}: FormSliderProps<T>) => {
  const {
    field: { ref, onChange, value },
  } = useController({
    name,
    control,
  })

  return (
    <Box>
      <Text>{getLabel(value)}</Text>

      <Slider ref={ref} value={value} onChange={onChange} {...rest}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>

        <SliderThumb />
      </Slider>

      <Input
        type="number"
        value={value}
        onChange={(e) => {
          onChange(Number(e.target.value))
        }}
        mt={2}
      />
    </Box>
  )
}
