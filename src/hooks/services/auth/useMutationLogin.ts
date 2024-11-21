import { useMutation } from '@tanstack/react-query'
import userService from 'src/services/user.service'
import { LoginUserBody } from 'src/types/user/user.api.type'

export default function useMutationLogin() {
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: ({ user }: { user: LoginUserBody }) => userService.login(user)
  })

  return {
    loginMutate: mutate,
    isPendingLogin: isPending,
    isSuccessLogin: isSuccess,
    isErrorLogin: isError
  }
}
