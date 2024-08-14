import { GetServerSidePropsContext } from 'next'
import { Home } from 'routes/Home/Home'
import { serverSideTranslations } from 'utils/i18n'

export const getServerSideProps = async (context: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(context, ['common'])),
  },
})

export default Home
