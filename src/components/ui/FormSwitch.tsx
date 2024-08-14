import { PropsWithChildren } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { FormControl, FormLabel, Switch } from '@chakra-ui/react'

type FormSwitchProps = {
  register: UseFormRegisterReturn
}

export const FormSwitch = ({ children, register }: PropsWithChildren<FormSwitchProps>) => (
  <FormControl>
    <FormLabel>{children}</FormLabel>

    <Switch size="lg" {...register} />
  </FormControl>
)
