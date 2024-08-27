import { auth } from '@/authentication/auth'
import SessionData from '@/components/sessionData/session-data'
import React from 'react'

const ChatPage = async () => {
  const session = await auth()
  return (
    <div>
      <h1>Chat page</h1>
      <SessionData session={session} />
    </div>
  )
}

export default ChatPage
