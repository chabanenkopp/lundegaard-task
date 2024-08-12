import React from 'react'
import { Spinner as ChakraSpinner, Stack } from '@chakra-ui/react'
import { transparentize } from 'polished'
import { Colors } from 'theme/constants'

export const Spinner = () => (
  <Stack
    w="100%"
    h="100%"
    alignItems="center"
    justifyContent="center"
    pos="absolute"
    bg={transparentize(0.3, Colors.brand.white)}
  >
    <ChakraSpinner
      size="xl"
      thickness="5px"
      color="brand.crabNebula"
      emptyColor={transparentize(0.7, Colors.brand.crabNebula)}
    />
  </Stack>
)
