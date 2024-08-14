import {
  HStack,
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderProps as ChakraSliderProps,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react'

type SliderProps = ChakraSliderProps & {
  formattedMin?: string
  formattedMax?: string
}

export const Slider = ({ min, max, formattedMin, formattedMax, ...props }: SliderProps) => (
  <VStack gap={0}>
    <ChakraSlider min={min} max={max} focusThumbOnChange={false} {...props}>
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
    </ChakraSlider>

    <HStack w="full" justifyContent="space-between">
      <Text>{formattedMin ?? min}</Text>

      <Text>{formattedMax ?? max}</Text>
    </HStack>
  </VStack>
)
