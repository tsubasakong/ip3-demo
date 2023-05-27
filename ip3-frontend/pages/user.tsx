import { GetServerSideProps } from 'next'
import { DefaultSession } from 'next-auth'
import { getSession, signOut } from 'next-auth/react'
import Layout from '../components/Layout'

// gets a prop from getServerSideProps
export default function User({ user }: DefaultSession) {
  return (
    <div>
      <h4>User session:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button
        onClick={async () => {
          signOut()
        }}
      >
        Sign out
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: { user: session.user },
  }
}

User.Layout = Layout
