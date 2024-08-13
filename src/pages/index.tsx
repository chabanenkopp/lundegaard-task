import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'utils/i18n'
import { Home } from 'routes/Home/Home'

export const getServerSideProps = async (context: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(context, ['common'])),
  },
})

export default Home
