import { Buffer } from 'buffer'
import type { HttpRequest, InvocationContext } from '@azure/functions'

export type ClientPrincipalClaim = {
  typ: string
  val: string
}

export type ClientPrincipal = {
  userId?: string
  identityProvider?: string
  userDetails?: string
  userRoles?: string[]
  claims?: ClientPrincipalClaim[]
}

export type PrincipalInfo = {
  isAuthenticated: boolean
  userId?: string
  name?: string
}

const getClaimValue = (claims: ClientPrincipalClaim[] | undefined, keys: string[]): string | undefined => {
  if (!claims?.length) {
    return undefined
  }

  for (const key of keys) {
    const claim = claims.find((entry) => entry.typ === key)
    if (claim?.val) {
      return claim.val
    }
  }

  return undefined
}

export const parseClientPrincipal = (request: HttpRequest, context: InvocationContext): PrincipalInfo => {
  const principalHeader = request.headers.get('x-ms-client-principal')

  if (!principalHeader) {
    context.log('No client principal header present')
    return { isAuthenticated: false }
  }

  try {
    const decoded = Buffer.from(principalHeader, 'base64').toString('utf8')
    const principal = JSON.parse(decoded) as ClientPrincipal

    const name =
      principal.userDetails ??
      getClaimValue(principal.claims, [
        'name',
        'preferred_username',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
      ])

    const userId =
      principal.userId ??
      getClaimValue(principal.claims, [
        'http://schemas.microsoft.com/identity/claims/objectidentifier',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
        'sub',
      ])

    if (!userId) {
      context.log('Authenticated principal missing object identifier claim')
      return { isAuthenticated: false }
    }

    return { isAuthenticated: true, userId, name }
  } catch (error) {
    context.log('Failed to parse client principal', error)
    return { isAuthenticated: false }
  }
}
