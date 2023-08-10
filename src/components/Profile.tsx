import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { getUser } from '@/lib/auth'

export function Profile() {
  const { avatarUrl, name } = getUser()
  return (
    <div className="flex items-center gap-3 text-left ">
      <Image
        src={avatarUrl}
        alt="Foto de perfil do usuario"
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />

      <p className="flex max-w-[140px] gap-3 text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          <LogOut />
        </a>
      </p>
    </div>
  )
}
