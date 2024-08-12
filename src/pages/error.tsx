import {
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ErrorKey } from 'api/errors'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Route } from 'constants/common/routes'
import { serverSideTranslations } from '../utils/i18n'

const Error = () => {
  const router = useRouter()
  const errorMessageQuery =
    router.query?.errorMessage instanceof Array
      ? router.query?.errorMessage[0]
      : router.query?.errorMessage || 'Unknown'
  const errorMessage = errorMessageQuery as keyof typeof ErrorKey
  const { t } = useTranslation(['common', 'error'])

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              {t('common:Error')}
            </Heading>
            {errorMessage ? (
              <Text>{t(`error:${errorMessage}`, { defaultValue: t('error:Unknown') })}</Text>
            ) : (
              ''
            )}
            <HStack spacing="1" justify="center">
              <Text color="muted">{t('common:GoBack')}</Text>
              <Link passHref href={Route.Base}>
                <Button variant="link" colorScheme="blue">
                  {t('common:Home')}
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => ({
  props: { ...(await serverSideTranslations(context, ['common', 'error'])) },
})

export default Error
