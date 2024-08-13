import { PropsWithChildren } from 'react'
import { Switch, FormLabel, FormControl, SwitchProps } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

type FormSwitchProps = {
  register: UseFormRegisterReturn
}

export const FormSwitch = ({ children, register }: PropsWithChildren<FormSwitchProps>) => (
  <FormControl>
    <FormLabel>{children}</FormLabel>

    <Switch size="lg" {...register} />
  </FormControl>
)
