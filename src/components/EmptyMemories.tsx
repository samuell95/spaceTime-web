export function EmptyMemories() {
  return (
    <div className="flex h-full items-center justify-center p-16 ">
      <p className="w-[360px] text-center leading-relaxed">
        {' '}
        Você ainda não registrou nenhuma lembraça, comece a{' '}
        <a href="/memories/new" className="underline hover:text-gray-50">
          criar agora!
        </a>
      </p>
    </div>
  )
}
