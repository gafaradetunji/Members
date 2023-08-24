import './globals.css'
import 'material-icons/iconfont/material-icons.css'
import type { Metadata } from 'next'
import { MemberProvider } from '@/context/context'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={``}><MemberProvider>{children}</MemberProvider></body>
    </html>
  )
}
