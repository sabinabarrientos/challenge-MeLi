import { useEffect } from "react"

export function usePageTitle(title: string) {
    return useEffect(() => {
        const prevTitle = document.title
        document.title = title
        return () => { document.title = prevTitle }
    }, [title])
}
