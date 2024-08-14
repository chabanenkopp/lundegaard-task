import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'

export const Slider = (props: SliderProps) => (
  <ChakraSlider focusThumbOnChange={false} {...props}>
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
)
