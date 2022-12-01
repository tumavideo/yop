import { NextResponse } from 'next/server'
// import { useSession } from 'next-auth/react'

export async function middleware(request) {
  // const { data: session } = useSession()
  const url = request.nextUrl.clone()
  if (null) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }
}
