import { toast } from 'sonner'

export function useFeatureToast() {
  const showFeatureNotAvailable = () => {
    toast.info('Funcionalidade em construção', {
      description: 'Esta funcionalidade estará disponível em breve.'
    })
  }

  return { showFeatureNotAvailable }
}