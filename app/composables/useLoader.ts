export const useLoader = () => {
  return useState<boolean>('loader', () => true)
}